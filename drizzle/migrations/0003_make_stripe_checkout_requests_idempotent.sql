ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS checkout_request_id text;

CREATE UNIQUE INDEX IF NOT EXISTS orders_checkout_request_id_unique_idx
  ON public.orders (checkout_request_id)
  WHERE checkout_request_id IS NOT NULL;

COMMENT ON COLUMN public.orders.checkout_request_id IS 'Client-generated idempotency token for a single checkout attempt.';