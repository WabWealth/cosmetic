'use client';

import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutCancelPage() {
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
            className="w-24 h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <XCircle className="w-12 h-12 text-orange-600" />
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-orange-200/50 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">
              Payment Cancelled
            </span>
          </motion.div>

          <h1 className="text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            <span className="text-gradient">Payment Cancelled</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What Happened */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What Happened?</h2>
            
            <div className="space-y-4">
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-sm">!</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Payment Cancelled</h3>
                  <p className="text-gray-600 text-sm">
                    You cancelled the payment process or there was an issue with the payment
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">No Charges Made</h3>
                  <p className="text-gray-600 text-sm">
                    Your payment method was not charged and your order was not processed
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">?</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Need Help?</h3>
                  <p className="text-gray-600 text-sm">
                    If you experienced technical issues, please contact our support team
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="bg-white rounded-3xl shadow-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What Would You Like To Do?</h2>
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
              >
                <Link
                  href="/checkout"
                  className="block w-full p-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl font-semibold text-center hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Try Checkout Again
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                <Link
                  href="/shop"
                  className="block w-full p-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-semibold text-center hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    Continue Shopping
                  </div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 }}
              >
                <Link
                  href="/contact"
                  className="block w-full p-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold text-center hover:bg-gray-200 transition-all"
                >
                  Contact Support
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 p-4 bg-blue-50 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.4 }}
            >
              <h3 className="font-semibold text-blue-800 mb-2">Having Payment Issues?</h3>
              <p className="text-blue-700 text-sm">
                If you're experiencing recurring payment problems, please check your payment method 
                or try a different card. Our support team is always ready to help!
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Help */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-gray-600 mb-4">
            Need assistance with your order or payment?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all"
            >
              Get Support
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Learn More About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
