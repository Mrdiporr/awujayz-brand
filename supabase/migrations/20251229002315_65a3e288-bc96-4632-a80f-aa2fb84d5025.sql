-- Add explicit DELETE policy for inquiries table (admins only)
CREATE POLICY "Only admins can delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));