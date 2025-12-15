import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/lib/data/products';
import { getImageUrl } from '@/lib/utils';

export default function FeaturedCollections() {
  const featuredCollections = collections.slice(0, 3);

  return (
    <section className="section bg-sand-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-ocean-600 text-sm uppercase tracking-widest mb-2 block">
            Explore
          </span>
          <h2 className="heading-2 mb-4">Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each collection tells a story inspired by the most beautiful Mediterranean destinations.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCollections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Image
                src={getImageUrl(collection.image)}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <span className="text-sm text-white/70 mb-2">
                  {collection.productCount} Products
                </span>
                <h3 className="font-display text-2xl font-medium mb-2 group-hover:text-ocean-300 transition-colors">
                  {collection.name}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2 mb-4">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  Explore Collection
                  <svg
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link href="/collections" className="btn-outline">
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
