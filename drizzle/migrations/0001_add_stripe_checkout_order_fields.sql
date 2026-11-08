ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS stripe_product_id text,
  ADD COLUMN IF NOT EXISTS stripe_price_id text,
  ADD COLUMN IF NOT EXISTS stripe_price_amount numeric(10,2);

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id text,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text,
  ADD COLUMN IF NOT EXISTS stripe_event_id text;

CREATE UNIQUE INDEX IF NOT EXISTS products_stripe_product_id_unique_idx
  ON public.products (stripe_product_id)
  WHERE stripe_product_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS products_stripe_price_id_unique_idx
  ON public.products (stripe_price_id)
  WHERE stripe_price_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS orders_stripe_checkout_session_id_unique_idx
  ON public.orders (stripe_checkout_session_id)
  WHERE stripe_checkout_session_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS orders_stripe_payment_intent_id_unique_idx
  ON public.orders (stripe_payment_intent_id)
  WHERE stripe_payment_intent_id IS NOT NULL;

COMMENT ON COLUMN public.products.stripe_product_id IS 'Stripe catalog product used to track Magic Potion purchases.';
COMMENT ON COLUMN public.products.stripe_price_id IS 'Current Stripe price synchronized from the trusted catalog price.';
COMMENT ON COLUMN public.products.stripe_price_amount IS 'Amount represented by the current Stripe price, used to detect catalog price changes.';
COMMENT ON COLUMN public.orders.stripe_checkout_session_id IS 'Stripe Checkout Session associated with this order.';
COMMENT ON COLUMN public.orders.stripe_payment_intent_id IS 'Stripe PaymentIntent associated with this order.';
COMMENT ON COLUMN public.orders.stripe_event_id IS 'Most recently processed Stripe event for idempotent order updates.';