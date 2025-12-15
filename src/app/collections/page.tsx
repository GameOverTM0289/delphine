import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/lib/data/products';

export default function CollectionsPage() {
  return (
    <>
      <section className="bg-cream py-16 md:py-24 mt-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Collections</h1>
          <p className="body-text-lg text-black/70 max-w-xl mx-auto">
            Explore our curated collections inspired by the Mediterranean.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <span className="text-xs tracking-[0.3em] uppercase opacity-80 mb-2">
                    {collection.productCount} Products
                  </span>
                  <h2 className="heading-2 text-center mb-2">{collection.name}</h2>
                  <p className="text-center text-white/80 max-w-sm mb-6">{collection.description}</p>
                  <span className="btn-outline-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
