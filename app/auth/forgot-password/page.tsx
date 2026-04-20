'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-10 text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
          </p>
          <Link
            href="/auth/signin"
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Sparkles className="w-8 h-8 text-pink-600" />
              </motion.div>
              <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                bukbao
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </motion.button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="text-pink-600 hover:text-pink-700 font-semibold"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

