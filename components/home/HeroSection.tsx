'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-pink-200/50 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-gray-700">
              Premium Beauty Collection
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-7xl md:text-8xl font-bold mb-6 font-[family-name:var(--font-playfair)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <span className="text-gradient">Elevate Your</span>
          <br />
          <span className="text-gray-800">Natural Beauty</span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          Discover luxurious cosmetics crafted with the finest ingredients
          to enhance your radiance and confidence
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <Link href="/shop">
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-shadow flex items-center gap-2 glow-pink"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Collection
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              className="px-8 py-4 bg-white/70 backdrop-blur-sm text-gray-700 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-pink-300 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {[
            { number: '100+', label: 'Premium Products' },
            { number: '50K+', label: 'Happy Customers' },
            { number: '100%', label: 'Natural Ingredients' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
            >
              <div className="text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
