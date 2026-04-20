'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [instantSignIn, setInstantSignIn] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRateLimited(false);

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { error, session } = await signUp(email, password, { name });
      if (error) {
        if (error.message?.toLowerCase().includes('rate limit')) {
          setRateLimited(true);
          setError(
            'Too many signup emails sent. Wait a moment, or use Sign in if this account was already created.'
          );
        } else {
          setError(error.message);
        }
      } else {
        // If email confirmation is disabled in Supabase, signup returns a session immediately.
        if (session) {
          setInstantSignIn(true);
          setTimeout(() => {
            router.push('/');
            router.refresh();
          }, 1200);
          return;
        }

        setSuccess(true);
        // Redirect to sign in after a moment
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div 
        className="min-h-screen relative flex items-center justify-center px-4 py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/70 via-purple-900/70 to-pink-900/70" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 text-center max-w-md relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UserPlus className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-6">
            Please check your email to verify your account before signing in.
          </p>
          <p className="text-sm text-gray-500">Redirecting to sign in...</p>
        </motion.div>
      </div>
    );
  }

  if (instantSignIn) {
    return (
      <div
        className="min-h-screen relative flex items-center justify-center px-4 py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/70 via-purple-900/70 to-pink-900/70" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 text-center max-w-md relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UserPlus className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600 mb-6">Your account is ready. Logging you in...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center px-4 py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1920&q=80)',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-pink-900/70 via-purple-900/70 to-pink-900/70" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join bukbao and start shopping</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              {error}
              {rateLimited && email && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => router.push(`/auth/signin?email=${encodeURIComponent(email)}`)}
                    className="text-pink-700 hover:text-pink-800 font-semibold underline"
                  >
                    Go to Sign in with this email
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
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
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-pink-600 hover:text-pink-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

