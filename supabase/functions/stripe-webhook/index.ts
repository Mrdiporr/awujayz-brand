import Stripe from 'npm:stripe@18.5.0';
import { z } from 'npm:zod@4.6.7';
import { corsHeaders, getServiceClient, getStripeClient, jsonResponse } from '../_shared/stripe.ts';

type CheckoutSession = Stripe.Checkout.Session;
const checkoutMetadataSchema = z.object({ order_id: z.string().uuid(), brand: z.literal('magic-potion') });

function orderIdFromEvent(event: Stripe.Event): string | null {
  const object = event.data.object as CheckoutSession;
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
    if (payload.length > 1_000_000) return jsonResponse({ error: 'Webhook payload is too large.' }, 413);
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
    ]);
    if (!supportedEvents.has(event.type)) return jsonResponse({ received: true, ignored: true });

    const orderId = orderIdFromEvent(event);
    if (!orderId) {
      return jsonResponse({ received: true, ignored: true });
    }
    const session = event.data.object as CheckoutSession;
    const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : null;
    const shipping = session.shipping_details;
    const address = shipping?.address;
    const shippingAddress = address
      ? [shipping.name, address.line1, address.line2, address.city, address.state, address.postal_code, address.country].filter(Boolean).join(', ').slice(0, 1000)
      : null;
    const { data: result, error: processError } = await admin.rpc('process_stripe_checkout_event', {
      p_event_id: event.id,
      p_event_type: event.type,
      p_order_id: orderId,
      p_session_id: session.id,
      p_payment_intent_id: paymentIntentId,
      p_amount_subtotal: session.amount_subtotal,
      p_amount_total: session.amount_total,
      p_currency: session.currency,
      p_tax_amount: session.total_details?.amount_tax ?? 0,
      p_shipping_address: shippingAddress,
      p_customer_name: session.customer_details?.name ?? null,
      p_customer_email: session.customer_details?.email ?? null,
      p_customer_phone: session.customer_details?.phone ?? null,
    });
    if (processError) throw processError;
    if (result === 'mismatch') {
      console.error('Stripe session does not match its stored order.');
      return jsonResponse({ error: 'Payment details do not match this order.' }, 400);
    }
    return jsonResponse({ received: true, result });
  } catch (error) {
    console.error('stripe-webhook error:', error instanceof Error ? error.message : 'unknown error');
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      return jsonResponse({ error: 'Invalid webhook signature.' }, 400);
    }
    return jsonResponse({ error: 'Webhook processing failed. Stripe may retry this event.' }, 500);
  }
});