import { corsHeaders, getServiceClient, getStripeClient, jsonResponse } from '../_shared/stripe.ts';

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  try {
    const body = await request.json();
    const sessionId = body && typeof body === 'object' ? body.sessionId : null;
    if (typeof sessionId !== 'string' || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
      return jsonResponse({ error: 'Checkout reference is invalid.' }, 400);
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.order_id;
    if (typeof orderId !== 'string' || session.mode !== 'payment') {
      return jsonResponse({ error: 'This checkout reference is not valid for an order.' }, 404);
    }

    const admin = getServiceClient();
    const { data: order, error } = await admin.from('orders')
      .select('id,total,payment_status,status,stripe_checkout_session_id')
      .eq('id', orderId)
      .eq('stripe_checkout_session_id', session.id)
      .maybeSingle();
    if (error) throw error;
    if (!order) return jsonResponse({ error: 'Order not found.' }, 404);
    if (session.amount_total !== Math.round(Number(order.total) * 100) || session.currency !== 'usd') {
      return jsonResponse({ error: 'Checkout details do not match this order.' }, 409);
    }

    return jsonResponse({
      orderId: order.id,
      total: Number(order.total),
      paymentStatus: order.payment_status,
      orderStatus: order.status,
      stripePaymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error('verify-checkout error:', error instanceof Error ? error.message : 'unknown error');
    return jsonResponse({ error: 'We could not confirm this payment yet.' }, 500);
  }
});