import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function stripeErrorParts(error: unknown): { message: string; code: string } {
  if (error && typeof error === 'object') {
    const e = error as Record<string, unknown>;
    const raw = e.raw as Record<string, unknown> | undefined;
    const message =
      (typeof e.message === 'string' && e.message) ||
      (typeof raw?.message === 'string' && raw.message) ||
      (typeof (raw?.error as Record<string, unknown> | undefined)?.message === 'string' &&
        String((raw?.error as { message: string }).message)) ||
      'Stripe request failed — see server logs.';
    const code =
      (typeof e.code === 'string' && e.code) ||
      (typeof e.type === 'string' && e.type) ||
      (typeof raw?.code === 'string' && raw.code) ||
      'UNKNOWN';
    return { message, code };
  }
  return { message: String(error), code: 'UNKNOWN' };
}

export async function POST(request: NextRequest) {
  console.log('🔵 [STRIPE API] Request received');

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get('origin') ||
    new URL(request.url).origin;

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        error: 'Missing STRIPE_SECRET_KEY',
        details: 'Set STRIPE_SECRET_KEY in your deployment environment variables.',
      },
      { status: 500 }
    );
  }

  const trimmedKey = stripeSecretKey.trim();
  if (!/^sk_(test|live)_/.test(trimmedKey)) {
    return NextResponse.json(
      {
        error: 'Invalid STRIPE_SECRET_KEY format',
        details:
          'Stripe secret keys must start with sk_test_ or sk_live_ (from Stripe Dashboard → Developers → API keys → Secret key). If you see sk_ctest_, that is a typo — use sk_test_. Do not use the Publishable key (pk_) here.',
        code: 'INVALID_KEY_PREFIX',
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(trimmedKey);

  console.log('🔵 [STRIPE API] Environment check:', {
    hasStripeKey: !!stripeSecretKey,
    stripeKeyPrefix: stripeSecretKey ? stripeSecretKey.substring(0, 12) + '...' : 'MISSING',
    siteUrl: siteUrl || 'MISSING',
  });

  try {
    const { items } = await request.json();
    console.log('🔵 [STRIPE API] Items received:', JSON.stringify(items, null, 2));

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('❌ [STRIPE API] No items provided');
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const safeImageUrl = (url: unknown): string[] => {
      if (typeof url !== 'string' || !url.trim()) return [];
      try {
        const u = new URL(url);
        if (u.protocol === 'https:') return [url];
      } catch {
        /* ignore */
      }
      return [];
    };

    const validatedItems = items.map((item: any) => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error(`Invalid item structure: ${JSON.stringify(item)}`);
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: safeImageUrl(item.image),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    console.log('🔵 [STRIPE API] Creating Stripe checkout session...');
    console.log('🔵 [STRIPE API] Success URL:', `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
    console.log('🔵 [STRIPE API] Cancel URL:', `${siteUrl}/checkout/cancel`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: validatedItems,
      mode: 'payment',
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: {
        item_ids: items
          .map((i: { id?: string }) => i.id)
          .filter(Boolean)
          .slice(0, 20)
          .join(','),
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
    });

    console.log('✅ [STRIPE API] Session created successfully:', {
      sessionId: session.id,
      url: session.url,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: unknown) {
    const { message, code } = stripeErrorParts(error);
    console.error('❌ [STRIPE API] Error creating checkout session:', message, code);

    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: message,
        code,
      },
      { status: 500 }
    );
  }
}
