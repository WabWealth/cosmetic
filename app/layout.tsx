'use client';

import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
