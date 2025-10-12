import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

export default async function FeaturedProducts() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (!products || products.length === 0) {
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
            Handpicked luxury products to elevate your beauty routine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
