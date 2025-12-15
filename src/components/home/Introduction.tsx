import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils';

export default function Introduction() {
  return (
    <section className="section bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative animate-fade-up">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={getImageUrl('/images/about/intro.jpg')}
                alt="Delphine Swimwear craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-ocean-100 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-coral-100 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <span className="text-ocean-600 text-sm uppercase tracking-widest mb-4 block">
              Our Story
            </span>
            <h2 className="heading-2 mb-6">
              Crafted for the <span className="text-gradient">Mediterranean Soul</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Born from a love of the sea and a passion for sustainable fashion, 
                Delphine creates swimwear that celebrates the beauty of the Mediterranean lifestyle.
              </p>
              <p>
                Each piece is thoughtfully designed in Albania and crafted using recycled ocean 
                plastics and eco-friendly materials. We believe luxury and sustainability should go hand in hand.
              </p>
              <p>
                Our designs draw inspiration from the azure waters, golden beaches, and timeless 
                elegance of coastal destinations from the Albanian Riviera to the Greek islands.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <div className="font-display text-3xl font-medium text-ocean-600 mb-1">50K+</div>
                <div className="text-sm text-gray-500">Bottles Recycled</div>
              </div>
              <div>
                <div className="font-display text-3xl font-medium text-ocean-600 mb-1">100%</div>
                <div className="text-sm text-gray-500">Sustainable</div>
              </div>
              <div>
                <div className="font-display text-3xl font-medium text-ocean-600 mb-1">15+</div>
                <div className="text-sm text-gray-500">Countries</div>
              </div>
            </div>

            <Link href="/about" className="btn-primary">
              Learn Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
