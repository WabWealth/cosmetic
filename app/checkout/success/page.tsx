'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In a real app, you would fetch order details from your backend
      // For now, we'll simulate a successful order
      setTimeout(() => {
        setOrderDetails({
          id: sessionId,
          total: 156.98,
          items: [
            { name: 'Radiant Glow Serum', quantity: 1, price: 89.99 },
            { name: 'Velvet Rose Lipstick', quantity: 2, price: 34.99 },
          ],
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Processing your order...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-green-200/50 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Payment Successful
            </span>
          </motion.div>

          <h1 className="text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            <span className="text-gradient">Thank You!</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your order has been confirmed and payment processed successfully
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Confirmation */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-pink-600" />
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
            </div>

            {orderDetails ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono text-sm text-gray-800">
                    #{orderDetails.id.slice(-8).toUpperCase()}
                  </span>
                </div>

                <div className="space-y-3">
                  {orderDetails.items.map((item: any, index: number) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center py-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <div>
                        <span className="text-gray-800 font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">× {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-gradient">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Order details will be sent to your email</p>
              </div>
            )}
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h2>
            
            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Order Confirmation</h3>
                  <p className="text-gray-600 text-sm">
                    You'll receive an email confirmation with your order details
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Processing</h3>
                  <p className="text-gray-600 text-sm">
                    We'll prepare your order for shipment within 1-2 business days
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Shipping</h3>
                  <p className="text-gray-600 text-sm">
                    You'll receive tracking information once your order ships
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Support */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <p className="text-gray-600 mb-4">
            Questions about your order? We're here to help!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
