'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Plus, Package, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'skincare',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Convert price to cents for database storage
    const priceInCents = Math.round(parseFloat(formData.price) * 100);

    // Destructure to exclude 'price' from formData since database only has 'price_cents'
    const { price, ...restFormData } = formData;

    const { error } = await supabase.from('products').insert([
      {
        ...restFormData,
        price_cents: priceInCents,
        currency: 'USD', // Add currency field
      },
    ]);

    setLoading(false);

    if (!error) {
      setSuccess(true);
      setFormData({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: 'skincare',
        featured: false,
      });
      setTimeout(() => {
        setSuccess(false);
        router.push('/shop');
      }, 2000);
    } else {
      console.error('Error adding product:', error);
      alert(`Failed to add product: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-600 to-purple-600 rounded-3xl mb-6 shadow-lg glow-pink"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Package className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            <span className="text-gradient">Admin Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600">
            Add new products to your premium collection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            className="glass-card p-8 md:p-12 rounded-3xl shadow-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Product Name
              </label>
              <motion.input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="Radiant Glow Serum"
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>
              <motion.textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors resize-none"
                placeholder="Luxurious vitamin C serum that brightens..."
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Price ($)
                </label>
                <motion.input
                  type="number"
                  id="price"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                  placeholder="89.99"
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Category
                </label>
                <motion.select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors appearance-none"
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="skincare">Skincare</option>
                  <option value="makeup">Makeup</option>
                  <option value="fragrance">Fragrance</option>
                  <option value="haircare">Haircare</option>
                  <option value="bodycare">Bodycare</option>
                </motion.select>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label
                htmlFor="image_url"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Image URL
              </label>
              <motion.input
                type="url"
                id="image_url"
                required
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
                placeholder="https://images.pexels.com/..."
                whileFocus={{ scale: 1.01 }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Use high-quality images from Pexels or similar stock photo sites
              </p>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-6 h-6 rounded-lg border-2 border-gray-200 text-pink-600 focus:ring-pink-500 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <label
                htmlFor="featured"
                className="text-sm font-semibold text-gray-700 cursor-pointer"
              >
                Feature this product on homepage
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-shadow flex items-center justify-center gap-2 glow-pink disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  Adding Product...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add Product
                </>
              )}
            </motion.button>
          </form>

          {success && (
            <motion.div
              className="mt-6 p-4 glass-card rounded-2xl flex items-center gap-3 text-green-700"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
            >
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-medium">
                Product added successfully! Redirecting to shop...
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Preview Section */}
        <motion.div
          className="glass-card p-8 md:p-12 rounded-3xl shadow-2xl sticky top-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview</h2>
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
            {formData.image_url ? (
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={formData.image_url}
                  alt={formData.name || 'Product preview'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x500?text=Invalid+URL';
                  }}
                />
                {formData.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <span className="text-6xl">💄</span>
              </div>
            )}
            
            <div className="p-6">
              {formData.category && (
                <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
                  {formData.category}
                </span>
              )}
              
              <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-2">
                {formData.name || 'Product Name'}
              </h3>
              
              {formData.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {formData.description}
                </p>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-3xl font-bold text-gradient">
                  ${formData.price || '0.00'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>

        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}
