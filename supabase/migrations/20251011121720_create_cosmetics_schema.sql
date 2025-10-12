/*
  # Cosmetics E-commerce Database Schema

  ## Overview
  Creates the database structure for a luxury cosmetics e-commerce platform with products and contact messages.

  ## New Tables
  
  ### `products`
  Stores all product information for the cosmetics shop
  - `id` (uuid, primary key) - Unique identifier for each product
  - `name` (text, required) - Product name
  - `description` (text) - Detailed product description
  - `price` (numeric, required) - Product price in dollars
  - `image_url` (text, required) - URL to product image
  - `category` (text) - Product category (e.g., skincare, makeup, fragrance)
  - `featured` (boolean, default false) - Whether product is featured on homepage
  - `created_at` (timestamptz) - Timestamp when product was added

  ### `contact_messages`
  Stores customer inquiries submitted through the contact form
  - `id` (uuid, primary key) - Unique identifier for each message
  - `name` (text, required) - Sender's name
  - `email` (text, required) - Sender's email address
  - `message` (text, required) - Message content
  - `created_at` (timestamptz) - Timestamp when message was received

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Products: Public read access, no write access (admin will use service role)
  - Contact messages: Public insert only, no read access (admin will use service role)

  ## Notes
  - All timestamps default to current time
  - UUIDs are auto-generated
  - Prices stored as numeric for precision
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image_url text NOT NULL,
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

-- Enable RLS
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

-- Insert sample products for demonstration
INSERT INTO products (name, description, price, image_url, category, featured) VALUES
  ('Radiant Glow Serum', 'Luxurious vitamin C serum that brightens and revitalizes your skin with natural botanical extracts', 89.99, 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800', 'skincare', true),
  ('Velvet Rose Lipstick', 'Long-lasting matte lipstick with intense pigmentation and nourishing formula', 34.99, 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', true),
  ('Diamond Eye Palette', 'Professional eyeshadow palette with 12 versatile shades for day to night looks', 68.00, 'https://images.pexels.com/photos/2533258/pexels-photo-2533258.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', true),
  ('Midnight Bloom Perfume', 'Enchanting fragrance with notes of jasmine, vanilla, and amber', 125.00, 'https://images.pexels.com/photos/3781548/pexels-photo-3781548.jpeg?auto=compress&cs=tinysrgb&w=800', 'fragrance', true),
  ('Hydra Boost Moisturizer', 'Intensive hydrating cream with hyaluronic acid and ceramides', 72.50, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800', 'skincare', false),
  ('Golden Hour Highlighter', 'Luminous powder highlighter for a natural sun-kissed glow', 42.00, 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', false),
  ('Silk Touch Foundation', 'Buildable coverage foundation with a natural, flawless finish', 58.00, 'https://images.pexels.com/photos/3785715/pexels-photo-3785715.jpeg?auto=compress&cs=tinysrgb&w=800', 'makeup', false),
  ('Pearl Essence Face Mask', 'Rejuvenating sheet mask infused with pearl extract and collagen', 18.99, 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800', 'skincare', false);