import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Product } from '@/lib/supabase';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: string, newQty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // persist to localStorage so refresh keeps the cart
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bukbao_cart');
      if (saved) setCartItems(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('bukbao_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const found = prev.find(i => i.product.id === product.id);
      if (found) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, newQty: number) => {
    setCartItems(prev =>
      prev.map(i => i.product.id === id ? { ...i, quantity: Math.max(1, newQty) } : i)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(i => i.product.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, i) => sum + (i.product.price_cents / 100) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
