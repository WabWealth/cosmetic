import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  console.log('🔵 [STRIPE API] Request received');

  // Check environment variables early and return JSON (not HTML error pages).
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

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-09-30.clover',
  });

  console.log('🔵 [STRIPE API] Environment check:', {
    hasStripeKey: !!stripeSecretKey,
    stripeKeyPrefix: stripeSecretKey ? stripeSecretKey.substring(0, 20) + '...' : 'MISSING',
    siteUrl: siteUrl || 'MISSING',
  });

  try {
    const { items } = await request.json();
    console.log('🔵 [STRIPE API] Items received:', JSON.stringify(items, null, 2));

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('❌ [STRIPE API] No items provided');
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      );
    }

    // Validate items structure
    const validatedItems = items.map((item: any) => {
      if (!item.name || !item.price || !item.quantity) {
        throw new Error(`Invalid item structure: ${JSON.stringify(item)}`);
      }
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    console.log('🔵 [STRIPE API] Creating Stripe checkout session...');
    console.log('🔵 [STRIPE API] Success URL:', `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
    console.log('🔵 [STRIPE API] Cancel URL:', `${siteUrl}/checkout/cancel`);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: validatedItems,
      mode: 'payment',
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      metadata: {
        items: JSON.stringify(items),
      },
      customer_email: undefined, // You can add customer email collection if needed
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'], // Add more countries as needed
      },
    });

    console.log('✅ [STRIPE API] Session created successfully:', {
      sessionId: session.id,
      url: session.url,
    });

    // Return both sessionId and url for compatibility
    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('❌ [STRIPE API] Error creating checkout session:');
    console.error('❌ [STRIPE API] Error type:', error?.constructor?.name);
    console.error('❌ [STRIPE API] Error message:', error?.message);
    console.error('❌ [STRIPE API] Error code:', error?.code);
    console.error('❌ [STRIPE API] Error statusCode:', error?.statusCode);
    console.error('❌ [STRIPE API] Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('❌ [STRIPE API] Stack trace:', error?.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to create checkout session',
        details: error?.message || 'Unknown error',
        code: error?.code || 'UNKNOWN',
      },
      { status: 500 }
    );
  }
}
