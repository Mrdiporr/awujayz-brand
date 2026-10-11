DROP POLICY IF EXISTS "Anyone can view menu items" ON public.menu_items;
CREATE POLICY "Anyone can view available menu items"
ON public.menu_items
FOR SELECT
TO public
USING (is_available IS TRUE);

DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view in-stock products"
ON public.products
FOR SELECT
TO public
USING (in_stock IS TRUE);

DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
TO public
USING (is_active IS TRUE);