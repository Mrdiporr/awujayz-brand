ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS tax_amount numeric(10,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0);

COMMENT ON COLUMN public.orders.tax_amount IS 'Tax amount reported by the confirmed Stripe Checkout Session.';