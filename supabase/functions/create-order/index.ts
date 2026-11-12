import { corsHeaders, getServiceClient, getStripeClient, isUuid, jsonResponse } from '../_shared/stripe.ts';
import { totalInCents, validateCheckoutItems, type CatalogProduct } from '../_shared/checkout.ts';

const allowedOrigins = new Set([
  'https://awujayz-brand.lovable.app',
  'https://id-preview--b0555d0f-2963-4b2a-9ce3-1b095e47db6a.lovable.app',
  'http://localhost:8080',
]);

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  const origin = request.headers.get('origin');
  if (!origin || !allowedOrigins.has(origin)) return jsonResponse({ error: 'This checkout origin is not allowed.' }, 403);

  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) return jsonResponse({ error: 'Checkout details are invalid.' }, 400);

    const customerName = cleanText(body.customerName, 200);
    const customerEmail = cleanText(body.customerEmail, 320).toLowerCase();
    const customerPhone = cleanText(body.customerPhone, 50);
    const shippingAddress = cleanText(body.shippingAddress, 1000);
    const checkoutRequestId = body.checkoutRequestId;
    if (!customerName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) || !shippingAddress || !isUuid(checkoutRequestId)) {
      return jsonResponse({ error: 'Please provide a valid name, email, shipping address, and retry checkout.' }, 400);
    }

    const admin = getServiceClient();
    const stripe = getStripeClient();
    const rawItems = body.items;
    if (!Array.isArray(rawItems) || rawItems.length < 1 || rawItems.length > 50) {
      return jsonResponse({ error: 'Your bag is empty or too large.' }, 400);
    }
    const productIds = [...new Set(rawItems.map((item) => item && typeof item === 'object' ? item.productId : null).filter(isUuid))];
    if (!productIds.length || productIds.length !== new Set(rawItems.map((item) => item && typeof item === 'object' ? item.productId : null)).size) {
      return jsonResponse({ error: 'One or more cart items are invalid.' }, 400);
    }

    const { data: products, error: productError } = await admin
      .from('products')
      .select('id,name,description,category,price,in_stock,image_url,stripe_product_id,stripe_price_id,stripe_price_amount')
      .in('id', productIds);
    if (productError) throw productError;

    const catalog = (products ?? []) as unknown as (CatalogProduct & { image_url: string | null })[];
    const lines = validateCheckoutItems(rawItems, catalog);
    const total = totalInCents(lines);

    const syncedLines = [];
    for (const line of lines) {
      const { product, unitAmount } = line;
      const safeDescription = [product.category, product.description].filter(Boolean).join(' · ').slice(0, 500);
      let stripeProductId = product.stripe_product_id;
      if (stripeProductId) {
        await stripe.products.update(stripeProductId, {
          name: product.name.slice(0, 250),
          description: safeDescription || undefined,
          active: true,
        });
      } else {
        const createdProduct = await stripe.products.create({
          name: product.name.slice(0, 250),
          description: safeDescription || undefined,
          metadata: { internal_product_id: product.id, brand: 'magic-potion' },
        }, { idempotencyKey: `magic-potion-product-${product.id}` });
        stripeProductId = createdProduct.id;
      }

      let stripePriceId = product.stripe_price_id;
      const storedCents = product.stripe_price_amount === null ? null : Math.round(Number(product.stripe_price_amount) * 100);
      if (!stripePriceId || storedCents !== unitAmount) {
        const createdPrice = await stripe.prices.create({
          product: stripeProductId,
          currency: 'usd',
          unit_amount: unitAmount,
        }, { idempotencyKey: `magic-potion-price-${product.id}-${unitAmount}` });
        stripePriceId = createdPrice.id;
        if (product.stripe_price_id && product.stripe_price_id !== stripePriceId) {
          try {
            await stripe.prices.update(product.stripe_price_id, { active: false });
          } catch (error) {
            console.error('Unable to deactivate an older Stripe price:', error instanceof Error ? error.message : 'unknown error');
          }
        }
      }

      const { error: syncError } = await admin.from('products').update({
        stripe_product_id: stripeProductId,
        stripe_price_id: stripePriceId,
        stripe_price_amount: unitAmount / 100,
      }).eq('id', product.id);
      if (syncError) throw syncError;
      syncedLines.push({ ...line, stripeProductId, stripePriceId });
    }

    let { data: order, error: findError } = await admin
      .from('orders')
      .select('id,total,stripe_checkout_session_id')
      .eq('checkout_request_id', checkoutRequestId)
      .maybeSingle();
    if (findError) throw findError;
    let isNewOrder = !order;

    if (!order) {
      const { data: created, error: createError } = await admin.from('orders').insert({
        id: crypto.randomUUID(),
        brand: 'magic-potion',
        checkout_request_id: checkoutRequestId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || null,
        shipping_address: shippingAddress,
        subtotal: total / 100,
        shipping: 0,
        total: total / 100,
        currency: 'usd',
        payment_status: 'unpaid',
        status: 'pending',
      }).select('id,total,stripe_checkout_session_id').single();
      if (createError?.code === '23505') {
        const retry = await admin.from('orders').select('id,total,stripe_checkout_session_id').eq('checkout_request_id', checkoutRequestId).maybeSingle();
        if (retry.error || !retry.data) throw createError;
        order = retry.data;
        isNewOrder = false;
      } else if (createError || !created) {
        throw createError ?? new Error('Unable to save your order.');
      } else {
        order = created;
      }
    }

    if (!order) throw new Error('Unable to prepare your order.');
    if (order.stripe_checkout_session_id) {
      const existingSession = await stripe.checkout.sessions.retrieve(order.stripe_checkout_session_id);
      if (existingSession.url && existingSession.status === 'open') {
        return jsonResponse({ orderId: order.id, total: Number(order.total), url: existingSession.url });
      }
      return jsonResponse({ error: 'This checkout has already been completed or expired. Please start a new checkout.' }, 409);
    }

    if (isNewOrder) {
      const { error: itemError } = await admin.from('order_items').insert(syncedLines.map((line) => ({
        order_id: order.id,
        product_id: line.product.id,
        product_name: line.product.name,
        selected_size: line.selectedSize,
        quantity: line.quantity,
        unit_price: line.unitAmount / 100,
        line_total: line.unitAmount * line.quantity / 100,
      })));
      if (itemError) {
        await admin.from('orders').delete().eq('id', order.id);
        throw itemError;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: syncedLines.map((line) => ({ price: line.stripePriceId, quantity: line.quantity })),
      customer_email: customerEmail,
      customer_creation: 'always',
      client_reference_id: order.id,
      metadata: { order_id: order.id, brand: 'magic-potion' },
      payment_intent_data: { metadata: { order_id: order.id, brand: 'magic-potion' } },
      billing_address_collection: 'auto',
      success_url: `${origin}/magic-potion/shop?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/magic-potion/shop?payment=cancelled&order_id=${encodeURIComponent(order.id)}`,
    }, { idempotencyKey: `magic-potion-checkout-${checkoutRequestId}` });

    if (!session.url) throw new Error('Stripe did not return a Checkout link.');
    const { error: sessionSaveError } = await admin.from('orders').update({
      stripe_checkout_session_id: session.id,
    }).eq('id', order.id);
    if (sessionSaveError) throw sessionSaveError;

    return jsonResponse({ orderId: order.id, total: Number(order.total), url: session.url }, 201);
  } catch (error) {
    console.error('create-order checkout error:', error instanceof Error ? error.message : 'unknown error');
    const message = error instanceof Error ? error.message : 'We could not start checkout. Please try again.';
    return jsonResponse({ error: message.slice(0, 400) }, 500);
  }
});