import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type CheckoutItem = { productId: string; quantity: number; selectedSize: string };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) return json({ error: 'Checkout is not configured' }, 500);

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  try {
    const body = await request.json() as {
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      shippingAddress?: string;
      items?: CheckoutItem[];
    };
    const customerName = body.customerName?.trim();
    const customerEmail = body.customerEmail?.trim().toLowerCase();
    const shippingAddress = body.shippingAddress?.trim();
    const items = body.items ?? [];

    if (!customerName || customerName.length > 200 || !customerEmail || !/^\S+@\S+\.\S+$/.test(customerEmail) || !shippingAddress || shippingAddress.length > 1000) {
      return json({ error: 'Please provide a valid name, email, and shipping address.' }, 400);
    }
    if (!items.length || items.length > 50) return json({ error: 'Your bag is empty or too large.' }, 400);
    if (items.some((item) => !item.productId || !item.selectedSize || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20)) {
      return json({ error: 'One or more cart items are invalid.' }, 400);
    }

    const productIds = [...new Set(items.map((item) => item.productId))];
    const { data: products, error: productsError } = await admin
      .from('products')
      .select('id, name, price, in_stock')
      .in('id', productIds);
    if (productsError) throw productsError;
    if (!products || products.length !== productIds.length || products.some((product) => !product.in_stock)) {
      return json({ error: 'One or more products are unavailable. Please refresh your bag.' }, 409);
    }

    const productMap = new Map(products.map((product) => [product.id, product]));
    const orderItems = items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) throw new Error('Product not found');
      const unitPrice = Number(product.price);
      return {
        product_id: product.id,
        product_name: product.name,
        selected_size: item.selectedSize,
        quantity: item.quantity,
        unit_price: unitPrice,
        line_total: unitPrice * item.quantity,
      };
    });
    const subtotal = orderItems.reduce((sum, item) => sum + item.line_total, 0);
    const { data: order, error: orderError } = await admin.from('orders').insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: body.customerPhone?.trim() || null,
      shipping_address: shippingAddress,
      subtotal,
      shipping: 0,
      total: subtotal,
      payment_status: 'unpaid',
      status: 'pending',
    }).select('id').single();
    if (orderError || !order) throw orderError ?? new Error('Unable to create order');

    const { error: itemsError } = await admin.from('order_items').insert(orderItems.map((item) => ({ ...item, order_id: order.id })));
    if (itemsError) {
      await admin.from('orders').delete().eq('id', order.id);
      throw itemsError;
    }
    return json({ orderId: order.id, total: subtotal, paymentStatus: 'unpaid' }, 201);
  } catch (error) {
    console.error('create-order error', error);
    return json({ error: 'We could not save your order. Please try again.' }, 500);
  }
});