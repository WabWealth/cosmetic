'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { supabase, Product } from '@/lib/supabase';
import { ArrowLeft, ShoppingBag, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .maybeSingle();

    if (data) {
      setProduct(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link href="/shop">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Shop
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/shop">
            <motion.button
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-8 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Shop</span>
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-2xl">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 left-6">
                {product.featured && (
                  <motion.div
                    className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Featured
                  </motion.div>
                )}
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {product.category && (
              <motion.div
                className="inline-block mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-semibold text-pink-600 uppercase tracking-wider border border-pink-200">
                  {product.category}
                </span>
              </motion.div>
            )}

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {product.name}
            </motion.h1>

            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-gray-600 ml-2">(4.9 / 5.0)</span>
            </motion.div>

            {product.description && (
              <motion.p
                className="text-lg text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {product.description}
              </motion.p>
            )}

            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-5xl font-bold text-gradient mb-2">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-sm text-gray-500">Free shipping on orders over $50</p>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center gap-2 glow-pink"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag className="w-5 h-5" />
                Buy Now
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-12 p-6 glass-card rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h3 className="font-semibold text-gray-800 mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  Premium quality ingredients
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  Cruelty-free and vegan
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  Dermatologically tested
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                  30-day money-back guarantee
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
