import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}
