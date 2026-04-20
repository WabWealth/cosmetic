'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus, CreditCard, Sparkles, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [processing, setProcessing] = useState(false);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + ((item.product.price_cents / 100) * item.quantity), 0);
  };

  const handleCheckout = async () => {
    setProcessing(true);
    
    console.log('🟢 [CHECKOUT] Starting checkout process...');
    console.log('🟢 [CHECKOUT] Cart items:', cartItems);
    
    try {
      const requestBody = {
        items: cartItems.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price_cents / 100,
          quantity: item.quantity,
          image: item.product.image_url,
        })),
      };
      
      console.log('🟢 [CHECKOUT] Sending request to API:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('🟢 [CHECKOUT] Response status:', response.status);
      console.log('🟢 [CHECKOUT] Response ok:', response.ok);
      
      const contentType = response.headers.get('content-type') || '';
      const responseData = contentType.includes('application/json')
        ? await response.json()
        : {
            error: 'Checkout API returned a non-JSON response',
            details: `Status ${response.status}. Make sure your deployment has STRIPE_SECRET_KEY configured.`,
          };
      console.log('🟢 [CHECKOUT] Response data:', responseData);

      if (!response.ok) {
        console.error('❌ [CHECKOUT] API returned error:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        });
        alert(`Error: ${responseData.error || responseData.details || 'Failed to create checkout session'}`);
        setProcessing(false);
        return;
      }

      const { sessionId, url, error: responseError } = responseData;
      
      if (responseError) {
        console.error('❌ [CHECKOUT] Error in response:', responseData);
        alert(`Error: ${responseError}`);
        setProcessing(false);
        return;
      }

      // Use the checkout URL directly (new Stripe.js approach)
      if (url) {
        console.log('🟢 [CHECKOUT] Checkout URL received:', url);
        console.log('🟢 [CHECKOUT] Redirecting to Stripe checkout...');
        window.location.href = url;
        return; // Don't set processing to false, let the redirect happen
      }

      // Fallback: if no URL but we have sessionId, construct the URL
      if (sessionId) {
        console.log('🟢 [CHECKOUT] Session ID received (no URL), constructing checkout URL...');
        // This shouldn't happen with the new API, but just in case
        const checkoutUrl = `https://checkout.stripe.com/pay/${sessionId}`;
        console.log('🟢 [CHECKOUT] Redirecting to:', checkoutUrl);
        window.location.href = checkoutUrl;
        return;
      }

      console.error('❌ [CHECKOUT] No session URL or ID in response:', responseData);
      alert('Error: No checkout URL received from server');
      setProcessing(false);
    } catch (error: any) {
      console.error('❌ [CHECKOUT] Error in checkout process:');
      console.error('❌ [CHECKOUT] Error type:', error?.constructor?.name);
      console.error('❌ [CHECKOUT] Error message:', error?.message);
      console.error('❌ [CHECKOUT] Full error:', error);
      console.error('❌ [CHECKOUT] Stack trace:', error?.stack);
      alert(`Something went wrong: ${error?.message || 'Please try again.'}`);
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-pink-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
              <span className="text-gradient">Your Cart is Empty</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Add some beautiful products to your cart to get started
            </p>
            <motion.a
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              Continue Shopping
            </motion.a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-pink-200/50 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <ShoppingBag className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-gray-700">
              Secure Checkout
            </span>
          </motion.div>

          <h1 className="text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            <span className="text-gradient">Checkout</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your order and complete your purchase
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Items</h2>
              
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {item.product.description}
                      </p>
                      <p className="text-lg font-bold text-gradient mt-1">
                        ${(item.product.price_cents / 100).toFixed(2)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      
                      <span className="w-12 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      
                      <motion.button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gradient">
                        ${((item.product.price_cents / 100) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <motion.button
                      onClick={() => removeItem(item.product.id)}
                      className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${((item.product.price_cents / 100) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-gradient">${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                onClick={handleCheckout}
                disabled={processing || cartItems.length === 0}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: processing ? 1 : 1.02, y: processing ? 0 : -2 }}
                whileTap={{ scale: processing ? 1 : 0.98 }}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Payment
                  </>
                )}
              </motion.button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure payment powered by Stripe
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
