import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type ProductRequestBody = {
  name?: string;
  email?: string;
  productName?: string;
  message?: string;
  searchQuery?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      { error: 'Missing Supabase environment variables' },
      { status: 500 }
    );
  }

  const body = (await request.json()) as ProductRequestBody;
  const name = body.name?.trim() || '';
  const email = body.email?.trim() || '';
  const productName = body.productName?.trim() || '';
  const note = body.message?.trim() || '';
  const searchQuery = body.searchQuery?.trim() || '';

  if (!name || !email || !productName) {
    return NextResponse.json(
      { error: 'Name, email, and requested product are required' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const requestMessage = [
    `Product Request: ${productName}`,
    note ? `Details: ${note}` : '',
    searchQuery ? `Search Query: ${searchQuery}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const { error: insertError } = await supabase.from('contact_messages').insert([
    {
      name,
      email,
      message: requestMessage,
    },
  ]);

  if (insertError) {
    return NextResponse.json(
      { error: `Failed to save request: ${insertError.message}` },
      { status: 500 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.PRODUCT_REQUEST_NOTIFY_EMAIL;
  const fromEmail = process.env.PRODUCT_REQUEST_FROM_EMAIL || 'BukBao <onboarding@resend.dev>';

  let emailSent = false;

  if (resendApiKey && notifyEmail) {
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notifyEmail],
          subject: `New Product Request: ${productName}`,
          text: [
            `A customer requested a product.`,
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Product: ${productName}`,
            searchQuery ? `Search Query: ${searchQuery}` : '',
            note ? `Details: ${note}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
        }),
      });

      emailSent = emailResponse.ok;
    } catch {
      emailSent = false;
    }
  }

  return NextResponse.json({
    ok: true,
    emailSent,
  });
}
