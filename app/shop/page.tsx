'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Sparkles } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const categories: string[] = ['all', ...Array.from(new Set(products.map(p => p.category).filter((cat): cat is string => cat !== null)))];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-pink-200/50 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-gray-700">
              Premium Collection
            </span>
          </motion.div>

          <h1 className="text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            <span className="text-gradient">Shop All Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of luxury beauty essentials
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg glow-pink'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-pink-300'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
