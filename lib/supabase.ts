import { createClient } from '@supabase/supabase-js';

// ✅ Use your real environment variables directly
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ Create the actual Supabase client (no placeholders, no mock)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Define your Product type
export type Product = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
  image_url?: string;
  category?: string | null;
  featured?: boolean;
  created_at?: string;
};

// ✅ Define your ContactMessage type
export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
};
