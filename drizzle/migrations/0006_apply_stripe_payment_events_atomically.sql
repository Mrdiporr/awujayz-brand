CREATE OR REPLACE FUNCTION public.process_stripe_checkout_event(
  p_event_id text,
  p_event_type text,
  p_order_id uuid,
  p_session_id text,
  p_payment_intent_id text,
  p_amount_subtotal bigint,
  p_amount_total bigint,
  p_currency text,
  p_tax_amount bigint,
  p_shipping_address text,
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text
)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  target_order public.orders%ROWTYPE;
  inserted_event_id uuid;
BEGIN
  IF p_event_id IS NULL OR p_event_id !~ '^evt_[A-Za-z0-9]+$' THEN
    RAISE EXCEPTION 'Invalid Stripe event ID';
  END IF;
  IF p_event_type NOT IN (
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'checkout.session.async_payment_failed',
    'checkout.session.expired'
  ) THEN
    RAISE EXCEPTION 'Unsupported Stripe event type';
  END IF;

  INSERT INTO public.stripe_webhook_events (event_id, event_type)
  VALUES (p_event_id, p_event_type)
  ON CONFLICT (event_id) DO NOTHING
  RETURNING id INTO inserted_event_id;

  IF inserted_event_id IS NULL THEN
    RETURN 'duplicate';
  END IF;

  SELECT * INTO target_order
  FROM public.orders
  WHERE id = p_order_id AND brand = 'magic-potion'
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN 'ignored';
  END IF;

  IF p_event_type IN ('checkout.session.completed', 'checkout.session.async_payment_succeeded') THEN
    IF p_amount_subtotal IS DISTINCT FROM round(target_order.total * 100)::bigint
       OR p_amount_total IS NULL
       OR p_amount_total < p_amount_subtotal
       OR lower(coalesce(p_currency, '')) <> lower(target_order.currency)
       OR target_order.stripe_checkout_session_id IS DISTINCT FROM p_session_id THEN
      RETURN 'mismatch';
    END IF;

    IF target_order.payment_status <> 'paid' THEN
      UPDATE public.orders
      SET payment_status = 'paid',
          status = CASE WHEN status IN ('processing', 'shipped', 'completed') THEN status ELSE 'paid' END,
          stripe_payment_intent_id = p_payment_intent_id,
          payment_reference = p_payment_intent_id,
          stripe_event_id = p_event_id,
          tax_amount = greatest(coalesce(p_tax_amount, 0), 0)::numeric / 100,
          shipping_address = coalesce(nullif(left(trim(p_shipping_address), 1000), ''), shipping_address),
          customer_name = coalesce(nullif(left(trim(p_customer_name), 200), ''), customer_name),
          customer_email = coalesce(nullif(left(lower(trim(p_customer_email)), 320), ''), customer_email),
          customer_phone = coalesce(nullif(left(trim(p_customer_phone), 50), ''), customer_phone)
      WHERE id = target_order.id;
    END IF;
    RETURN 'processed';
  END IF;

  IF target_order.stripe_checkout_session_id IS DISTINCT FROM p_session_id THEN
    RETURN 'mismatch';
  END IF;

  IF p_event_type = 'checkout.session.async_payment_failed' THEN
    UPDATE public.orders
    SET payment_status = 'failed', stripe_event_id = p_event_id
    WHERE id = target_order.id AND payment_status = 'unpaid';
  ELSIF p_event_type = 'checkout.session.expired' THEN
    UPDATE public.orders
    SET status = 'cancelled', stripe_event_id = p_event_id
    WHERE id = target_order.id AND payment_status = 'unpaid' AND status = 'pending';
  END IF;

  RETURN 'processed';
END;
$$;

REVOKE ALL ON FUNCTION public.process_stripe_checkout_event(text, text, uuid, text, text, bigint, bigint, text, bigint, text, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.process_stripe_checkout_event(text, text, uuid, text, text, bigint, bigint, text, bigint, text, text, text, text) TO service_role;