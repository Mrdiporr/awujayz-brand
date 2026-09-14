CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand TEXT NOT NULL DEFAULT 'magic-potion' CHECK (brand = 'magic-potion'),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'failed', 'refunded')),
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    shipping NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (shipping >= 0),
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    currency TEXT NOT NULL DEFAULT 'usd',
    payment_reference TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view orders" ON public.orders FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin')) WITH CHECK (private.has_role(auth.uid(), 'admin'));

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    selected_size TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0 AND quantity <= 20),
    unit_price NUMERIC(10,2) NOT NULL CHECK (unit_price >= 0),
    line_total NUMERIC(10,2) NOT NULL CHECK (line_total >= 0),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view order items" ON public.order_items FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    actor_email TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    brand TEXT,
    before_data JSONB,
    after_data JSONB,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);
CREATE INDEX orders_status_idx ON public.orders (status);
CREATE INDEX order_items_order_id_idx ON public.order_items (order_id);
CREATE INDEX audit_logs_created_at_idx ON public.audit_logs (created_at DESC);
CREATE INDEX audit_logs_entity_idx ON public.audit_logs (entity_type, entity_id);
CREATE INDEX inquiries_created_at_idx ON public.inquiries (created_at DESC);
CREATE INDEX inquiries_status_idx ON public.inquiries (status);
CREATE INDEX products_created_at_idx ON public.products (created_at DESC);
CREATE INDEX menu_items_category_idx ON public.menu_items (category);

CREATE OR REPLACE FUNCTION private.audit_row_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor_id UUID := auth.uid();
  actor_email_value TEXT;
  before_value JSONB;
  after_value JSONB;
  entity_uuid UUID;
  brand_value TEXT;
BEGIN
  IF actor_id IS NOT NULL THEN
    SELECT email INTO actor_email_value FROM auth.users WHERE id = actor_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    before_value := to_jsonb(OLD);
    after_value := NULL;
    entity_uuid := OLD.id;
    brand_value := before_value ->> 'brand';
  ELSE
    before_value := CASE WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END;
    after_value := to_jsonb(NEW);
    entity_uuid := NEW.id;
    brand_value := after_value ->> 'brand';
  END IF;

  INSERT INTO public.audit_logs (actor_user_id, actor_email, action, entity_type, entity_id, brand, before_data, after_data)
  VALUES (actor_id, actor_email_value, TG_OP, TG_TABLE_NAME, entity_uuid, brand_value, before_value, after_value);

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION private.audit_row_change() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.audit_row_change() TO postgres, service_role;

CREATE TRIGGER audit_inquiries_changes AFTER INSERT OR UPDATE OR DELETE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION private.audit_row_change();
CREATE TRIGGER audit_products_changes AFTER INSERT OR UPDATE OR DELETE ON public.products FOR EACH ROW EXECUTE FUNCTION private.audit_row_change();
CREATE TRIGGER audit_menu_items_changes AFTER INSERT OR UPDATE OR DELETE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION private.audit_row_change();
CREATE TRIGGER audit_services_changes AFTER INSERT OR UPDATE OR DELETE ON public.services FOR EACH ROW EXECUTE FUNCTION private.audit_row_change();
CREATE TRIGGER audit_user_roles_changes AFTER INSERT OR UPDATE OR DELETE ON public.user_roles FOR EACH ROW EXECUTE FUNCTION private.audit_row_change();
CREATE TRIGGER audit_orders_changes AFTER INSERT OR UPDATE OR DELETE ON public.orders FOR EACH ROW EXECUTE FUNCTION private.audit_row_change();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION private.update_updated_at_column();

ALTER TABLE public.inquiries REPLICA IDENTITY FULL;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'inquiries'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
  END IF;
END;
$$;