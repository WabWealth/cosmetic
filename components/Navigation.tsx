'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles className="w-8 h-8 text-pink-600" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              LuxeBeauty
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="relative">
                <motion.span
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-pink-600'
                      : 'text-gray-700 hover:text-pink-600'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
