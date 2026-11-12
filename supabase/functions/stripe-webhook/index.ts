import Stripe from 'npm:stripe@18.5.0';
import { corsHeaders, getServiceClient, getStripeClient, jsonResponse } from '../_shared/stripe.ts';

type CheckoutSession = Stripe.Checkout.Session;
type PaymentIntent = Stripe.PaymentIntent;

function orderIdFromEvent(event: Stripe.Event): string | null {
  const object = event.data.object as CheckoutSession | PaymentIntent;
  if ('metadata' in object && typeof object.metadata?.order_id === 'string') return object.metadata.order_id;
  if ('client_reference_id' in object && typeof object.client_reference_id === 'string') return object.client_reference_id;
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

    const { error: eventInsertError } = await admin.from('stripe_webhook_events').upsert({
      event_id: event.id,
      event_type: event.type,
    }, { onConflict: 'event_id', ignoreDuplicates: true });
    if (eventInsertError) throw eventInsertError;

    const { data: storedEvent, error: eventReadError } = await admin
      .from('stripe_webhook_events')
      .select('processed_at')
      .eq('event_id', event.id)
      .single();
    if (eventReadError) throw eventReadError;
    if (storedEvent.processed_at) return jsonResponse({ received: true, duplicate: true });

    const orderId = orderIdFromEvent(event);
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
            session.amount_total !== expectedTotal ||
            session.currency !== order.currency.toLowerCase()
          ) {
            console.error('Stripe session does not match the stored order.');
            return jsonResponse({ error: 'Payment details do not match this order.' }, 400);
          }
          const nextStatus = ['processing', 'shipped', 'completed'].includes(order.status) ? order.status : 'paid';
          const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
          const { error: updateError } = await admin.from('orders').update({
            payment_status: 'paid',
            status: nextStatus,
            stripe_payment_intent_id: paymentIntentId,
            payment_reference: paymentIntentId,
            stripe_event_id: event.id,
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
      const intent = event.data.object as PaymentIntent;
      const { error: updateError } = await admin.from('orders').update({
        payment_status: 'failed',
        stripe_event_id: event.id,
      }).eq('id', orderId).eq('payment_status', 'unpaid');
      if (updateError) throw updateError;
      if (intent.id.length < 8) throw new Error('Stripe payment reference is invalid.');
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