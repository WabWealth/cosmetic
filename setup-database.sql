-- BukBao Cosmetics Database Setup
-- Run this in your Supabase SQL Editor

-- Create products table with the exact schema our code expects
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_cents integer NOT NULL,
  currency text DEFAULT 'USD',
  image_url text,
  category text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Products policies: Anyone can read products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Contact messages policies: Anyone can insert messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Insert sample products for testing
INSERT INTO products (name, description, price_cents, currency, image_url, category, featured) VALUES
  ('Radiant Glow Serum', 'Luxurious vitamin C serum that brightens and revitalizes your skin with natural botanical extracts', 8999, 'USD', 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800', 'skincare', true),
  ('Velvet Rose Lipstick', 'Long-lasting matte lipstick with intense pigmentation and nourishing formula', 3499, 'USD', 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', true),
  ('Diamond Eye Palette', 'Professional eyeshadow palette with 12 versatile shades for day to night looks', 6800, 'USD', 'https://images.pexels.com/photos/2533258/pexels-photo-2533258.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', true),
  ('Midnight Bloom Perfume', 'Enchanting fragrance with notes of jasmine, vanilla, and amber', 12500, 'USD', 'https://images.pexels.com/photos/3781548/pexels-photo-3781548.jpeg?auto=compress&cs=tinysrgb&w=800', 'fragrance', true),
  ('Hydra Boost Moisturizer', 'Intensive hydrating cream with hyaluronic acid and ceramides', 7250, 'USD', 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800', 'skincare', false),
  ('Golden Hour Highlighter', 'Luminous powder highlighter for a natural sun-kissed glow', 4200, 'USD', 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', false),
  ('Silk Touch Foundation', 'Buildable coverage foundation with a natural, flawless finish', 5800, 'USD', 'https://images.pexels.com/photos/3785715/pexels-photo-3785715.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', false),
  ('Pearl Essence Face Mask', 'Rejuvenating sheet mask infused with pearl extract and collagen', 1899, 'USD', 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800', 'skincare', false);




