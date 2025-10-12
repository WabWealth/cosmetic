import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  category: string | null;
  featured: boolean;
  created_at: string;
};

export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
};
