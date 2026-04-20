import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default async function FeaturedProducts() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  // Use mock data if no real products are available
  const featuredProducts = products || [
    {
      id: '1',
      name: 'Hydrating Serum',
      description: 'Deep moisturizing serum with hyaluronic acid for radiant skin',
      price: 45.99,
      image_url: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop',
      category: 'skincare',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Vitamin C Brightening Cream',
      description: 'Powerful vitamin C cream to brighten and even skin tone',
      price: 52.50,
      image_url: 'https://images.unsplash.com/photo-1599305090596-fe684ba8291c?w=500&h=500&fit=crop',
      category: 'skincare',
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Anti-Aging Night Cream',
      description: 'Luxurious night cream with retinol for youthful skin',
      price: 89.99,
      image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop',
      category: 'skincare',
      featured: true,
      created_at: new Date().toISOString()
    }
  ];

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-gray-800">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked premium products to elevate your beauty routine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product: Product, index: number) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
