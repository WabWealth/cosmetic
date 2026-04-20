# Stripe Payment Integration Setup

This document explains how to set up the Stripe payment integration for the BukBao cosmetics site.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Stripe Setup Steps

1. **Create a Stripe Account**
   - Go to [stripe.com](https://stripe.com) and create an account
   - Complete the account setup process

2. **Get Your API Keys**
   - In your Stripe Dashboard, go to "Developers" > "API keys"
   - Copy your "Publishable key" (starts with `pk_test_`)
   - Copy your "Secret key" (starts with `sk_test_`)
   - Add these to your `.env.local` file

3. **Configure Webhooks (Optional)**
   - In Stripe Dashboard, go to "Developers" > "Webhooks"
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`

## Features Implemented

### Checkout Flow
- **Checkout Page** (`/checkout`): Displays cart items with quantity selectors
- **Payment Processing**: Uses Stripe Checkout for secure payment handling
- **Success Page** (`/checkout/success`): Confirms successful payment
- **Cancel Page** (`/checkout/cancel`): Handles cancelled payments

### Key Components
- **Product Display**: Shows product images, names, descriptions, and prices
- **Quantity Management**: Users can adjust quantities with +/- buttons
- **Total Calculation**: Real-time total calculation
- **Responsive Design**: Mobile-friendly checkout experience
- **BukBao Styling**: Consistent with site's pink-purple theme

### Security Features
- **Server-side Processing**: Payment processing happens on the server
- **Environment Variables**: Sensitive keys stored securely
- **Input Validation**: Proper validation of cart items and quantities
- **Error Handling**: Comprehensive error handling and user feedback

## Testing

1. **Test Mode**: Use Stripe test keys for development
2. **Test Cards**: Use Stripe's test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`

## Production Deployment

1. **Switch to Live Keys**: Replace test keys with live keys
2. **Update Site URL**: Change `NEXT_PUBLIC_SITE_URL` to your production domain
3. **Configure Webhooks**: Set up production webhooks
4. **Test Thoroughly**: Test all payment flows in production

## File Structure

```
app/
├── checkout/
│   ├── page.tsx              # Main checkout page
│   ├── success/
│   │   └── page.tsx          # Success page
│   └── cancel/
│       └── page.tsx          # Cancel page
└── api/
    └── create-checkout-session/
        └── route.ts          # Stripe checkout session API
```

## Navigation

The checkout link has been added to the main navigation menu for easy access.

## Support

For issues with the Stripe integration:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure Stripe keys are valid and active
4. Check Stripe Dashboard for payment logs
