import Stripe from 'npm:stripe@18.5.0';
import { z } from 'npm:zod@4.6.7';
import { corsHeaders, getServiceClient, getStripeClient, jsonResponse } from '../_shared/stripe.ts';

type CheckoutSession = Stripe.Checkout.Session;
type PaymentIntent = Stripe.PaymentIntent;
const checkoutMetadataSchema = z.object({ order_id: z.string().uuid(), brand: z.literal('magic-potion') });

function orderIdFromEvent(event: Stripe.Event): string | null {
  const object = event.data.object as CheckoutSession | PaymentIntent;
  if ('metadata' in object && object.metadata) {
    const parsed = checkoutMetadataSchema.safeParse(object.metadata);
    if (parsed.success) return parsed.data.order_id;
  }
  if ('client_reference_id' in object && typeof object.client_reference_id === 'string' && z.string().uuid().safeParse(object.client_reference_id).success) {
    return object.client_reference_id;
  }
  return null;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const signingSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  const signature = request.headers.get('stripe-signature');
  if (!signingSecret || !signature) return jsonResponse({ error: 'Webhook signing is not configured.' }, 400);

  try {
    const payload = await request.text();
    const stripe = getStripeClient();
    const event = await stripe.webhooks.constructEventAsync(
      payload,
      signature,
      signingSecret,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
    const admin = getServiceClient();
    const supportedEvents = new Set([
      'checkout.session.completed',
      'checkout.session.async_payment_succeeded',
      'checkout.session.async_payment_failed',
      'checkout.session.expired',
      'payment_intent.payment_failed',
    ]);
    if (!supportedEvents.has(event.type)) return jsonResponse({ received: true, ignored: true });

    const { data: shouldProcess, error: claimError } = await admin.rpc('claim_stripe_webhook_event', {
      p_event_id: event.id,
      p_event_type: event.type,
    });
    if (claimError) throw claimError;
    if (!shouldProcess) return jsonResponse({ received: true, duplicate: true });

    const orderId = orderIdFromEvent(event);
    if (!orderId) {
      const { error: ignoredError } = await admin.from('stripe_webhook_events').update({ processed_at: new Date().toISOString() }).eq('event_id', event.id);
      if (ignoredError) throw ignoredError;
      return jsonResponse({ received: true, ignored: true });
    }
    if (orderId && ['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) {
      const session = event.data.object as CheckoutSession;
      if (session.payment_status === 'paid') {
        const { data: order, error: orderError } = await admin
          .from('orders')
          .select('id,total,currency,status,stripe_checkout_session_id')
          .eq('id', orderId)
          .maybeSingle();
        if (orderError) throw orderError;
        if (order) {
          const expectedTotal = Math.round(Number(order.total) * 100);
          if (
            order.stripe_checkout_session_id !== session.id ||
            (session.amount_subtotal ?? session.amount_total) !== expectedTotal ||
            session.currency !== order.currency.toLowerCase() ||
            session.amount_total === null
          ) {
            console.error('Stripe session does not match the stored order.');
            return jsonResponse({ error: 'Payment details do not match this order.' }, 400);
          }
          const nextStatus = ['processing', 'shipped', 'completed'].includes(order.status) ? order.status : 'paid';
          const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
          const shipping = session.shipping_details;
          const address = shipping?.address;
          const shippingAddress = address
            ? [shipping.name, address.line1, address.line2, address.city, address.state, address.postal_code, address.country].filter(Boolean).join(', ').slice(0, 1000)
            : '';
          const { error: updateError } = await admin.from('orders').update({
            payment_status: 'paid',
            status: nextStatus,
            stripe_payment_intent_id: paymentIntentId,
            payment_reference: paymentIntentId,
            stripe_event_id: event.id,
            tax_amount: Math.max(0, (session.total_details?.amount_tax ?? 0) / 100),
            ...(shippingAddress ? { shipping_address: shippingAddress } : {}),
            ...(session.customer_details?.name ? { customer_name: session.customer_details.name.slice(0, 200) } : {}),
            ...(session.customer_details?.email ? { customer_email: session.customer_details.email.slice(0, 320).toLowerCase() } : {}),
            ...(session.customer_details?.phone ? { customer_phone: session.customer_details.phone.slice(0, 50) } : {}),
          }).eq('id', order.id);
          if (updateError) throw updateError;
        }
      }
    } else if (orderId && event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as CheckoutSession;
      const { error: updateError } = await admin.from('orders').update({
        payment_status: 'failed',
        stripe_event_id: event.id,
      }).eq('id', orderId).eq('stripe_checkout_session_id', session.id).eq('payment_status', 'unpaid');
      if (updateError) throw updateError;
    } else if (orderId && event.type === 'checkout.session.expired') {
      const session = event.data.object as CheckoutSession;
      const { error: updateError } = await admin.from('orders').update({
        status: 'cancelled',
        stripe_event_id: event.id,
      }).eq('id', orderId).eq('stripe_checkout_session_id', session.id).eq('payment_status', 'unpaid').eq('status', 'pending');
      if (updateError) throw updateError;
    } else if (orderId && event.type === 'payment_intent.payment_failed') {
      const { error: updateError } = await admin.from('orders').update({
        payment_status: 'failed',
        stripe_event_id: event.id,
      }).eq('id', orderId).eq('payment_status', 'unpaid');
      if (updateError) throw updateError;
    }

    const { error: markProcessedError } = await admin.from('stripe_webhook_events')
      .update({ processed_at: new Date().toISOString() })
      .eq('event_id', event.id);
    if (markProcessedError) throw markProcessedError;
    return jsonResponse({ received: true });
  } catch (error) {
    console.error('stripe-webhook error:', error instanceof Error ? error.message : 'unknown error');
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      return jsonResponse({ error: 'Invalid webhook signature.' }, 400);
    }
    return jsonResponse({ error: 'Webhook processing failed. Stripe may retry this event.' }, 500);
  }
});