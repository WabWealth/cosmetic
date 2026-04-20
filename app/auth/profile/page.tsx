'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Mail, LogOut, Settings, ShoppingBag, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/signin');
    }
  }, [user, authLoading, router]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push('/');
    router.refresh();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <User className="w-10 h-10 text-pink-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          {/* User Info */}
          <div className="space-y-6 mb-8">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
              </div>
              {user.user_metadata?.name && (
                <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-lg font-semibold text-gray-800">{user.user_metadata.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/shop">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 cursor-pointer"
                >
                  <ShoppingBag className="w-8 h-8 text-pink-600 mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-1">Continue Shopping</h3>
                  <p className="text-sm text-gray-600">Browse our products</p>
                </motion.div>
              </Link>
              <Link href="/checkout">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100 cursor-pointer"
                >
                  <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-1">View Cart</h3>
                  <p className="text-sm text-gray-600">Check your items</p>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Sign Out Button */}
          <motion.button
            onClick={handleSignOut}
            disabled={signingOut}
            whileHover={{ scale: signingOut ? 1 : 1.02 }}
            whileTap={{ scale: signingOut ? 1 : 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signingOut ? (
              <>
                <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                Signing out...
              </>
            ) : (
              <>
                <LogOut className="w-5 h-5" />
                Sign Out
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

