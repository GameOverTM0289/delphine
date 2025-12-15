import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Introduction from '@/components/home/Introduction';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import CoreValues from '@/components/home/CoreValues';
import InstagramFeed from '@/components/home/InstagramFeed';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Introduction />
      <FeaturedCollections />
      <CoreValues />
      <InstagramFeed />
    </>
  );
}
