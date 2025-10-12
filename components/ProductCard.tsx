'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/supabase';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.id}`}>
        <motion.div
          className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          whileHover={{ y: -8 }}
        >
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.div
              className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="w-5 h-5 text-pink-600" />
            </motion.div>
          </div>

          <div className="p-6">
            <div className="mb-2">
              {product.category && (
                <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
                  {product.category}
                </span>
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <motion.div
                className="text-2xl font-bold text-gradient"
                whileHover={{ scale: 1.05 }}
              >
                ${product.price.toFixed(2)}
              </motion.div>

              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
              >
                View Details
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
