-- Run this SQL in your Supabase SQL Editor to allow product inserts
-- This adds an INSERT policy to the products table

CREATE POLICY "Anyone can insert products"
  ON products
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- If you want to restrict to authenticated users only, use this instead:
-- CREATE POLICY "Authenticated users can insert products"
--   ON products
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (true);








