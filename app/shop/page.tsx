'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { Sparkles, Database, Search, X } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Helper function to convert cents to dollars
  const formatPrice = (priceCents: number) => {
    return (priceCents / 100).toFixed(2);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setProducts([]);
    }
    setLoading(false);
  };

  const testSupabaseConnection = async () => {
    try {
      console.log('🔍 Testing Supabase connection...');
      
      // Check environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      console.log('Environment check:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey,
        urlLength: supabaseUrl?.length || 0,
        keyLength: supabaseKey?.length || 0,
        url: supabaseUrl,
        key: supabaseKey?.substring(0, 20) + '...'
      });
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('❌ Missing environment variables!');
        alert('Missing Supabase environment variables. Check console for details.');
        return;
      }
      
      console.log('✅ Environment variables found, testing network connectivity...');
      
      // Test 1: Direct fetch to Supabase REST API
      try {
        const testUrl = `${supabaseUrl}/rest/v1/products?select=*&limit=1`;
        console.log('🌐 Testing direct fetch to:', testUrl);
        
        const response = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log('📡 Direct fetch response:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Direct fetch failed:', errorText);
          alert(`Network error: ${response.status} ${response.statusText}`);
          return;
        }
        
        const data = await response.json();
        console.log('✅ Direct fetch successful:', data);
        
      } catch (fetchErr) {
        console.error('💥 Direct fetch exception:', fetchErr);
        alert(`Network error: ${fetchErr instanceof Error ? fetchErr.message : 'Unknown error'}`);
        return;
      }
      
      console.log('✅ Network connectivity confirmed, testing Supabase client...');
      
      // Test 2: Supabase client test
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        console.log('📊 Supabase client result:', { 
          data: data?.length || 0, 
          error: error?.message || 'No error',
          fullError: error
        });
        
        if (error) {
          console.error('❌ Supabase client error:', error);
          alert(`Supabase error: ${error.message}`);
        } else {
          console.log('✅ Supabase client successful! Data count:', data?.length || 0);
          alert(`Supabase connected! Found ${data?.length || 0} products.`);
        }
      } catch (clientErr) {
        console.error('💥 Supabase client exception:', clientErr);
        alert(`Supabase client error: ${clientErr instanceof Error ? clientErr.message : 'Unknown error'}`);
      }
      
    } catch (err) {
      console.error('💥 Connection test failed:', err);
      alert(`Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const categories: string[] = ['all', ...Array.from(new Set(products.map(p => p.category).filter((cat): cat is string => cat !== null)))];

  const filteredProducts = products.filter(p => {
    // Filter by category
    const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

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
            Explore our curated collection of premium beauty essentials
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-full border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-white shadow-sm"
            />
            {searchQuery && (
              <motion.button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Debug Button */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            onClick={testSupabaseConnection}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Database className="w-4 h-4" />
            Test Supabase Connection
          </motion.button>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
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
