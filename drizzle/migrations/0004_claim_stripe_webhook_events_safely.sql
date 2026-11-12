ALTER TABLE public.stripe_webhook_events
  ADD COLUMN IF NOT EXISTS processing_at timestamp with time zone;

CREATE OR REPLACE FUNCTION public.claim_stripe_webhook_event(p_event_id text, p_event_type text)
RETURNS boolean
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  stored_event public.stripe_webhook_events%ROWTYPE;
BEGIN
  INSERT INTO public.stripe_webhook_events (event_id, event_type)
  VALUES (p_event_id, p_event_type)
  ON CONFLICT (event_id) DO NOTHING;

  SELECT * INTO stored_event
  FROM public.stripe_webhook_events
  WHERE event_id = p_event_id
  FOR UPDATE;

  IF stored_event.processed_at IS NOT NULL THEN
    RETURN false;
  END IF;

  IF stored_event.processing_at IS NOT NULL
     AND stored_event.processing_at > now() - interval '5 minutes' THEN
    RETURN false;
  END IF;

  UPDATE public.stripe_webhook_events
  SET processing_at = now()
  WHERE event_id = p_event_id;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_stripe_webhook_event(text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_stripe_webhook_event(text, text) TO service_role;