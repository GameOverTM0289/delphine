import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/lib/data/products';
import { getImageUrl } from '@/lib/utils';

export default function CollectionsPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Collections</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">
            Each collection tells a story inspired by Mediterranean destinations.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.slug}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image src={getImageUrl(collection.image)} alt={collection.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <span className="text-sm text-white/70 mb-2">{collection.productCount} Products</span>
                  <h2 className="font-display text-3xl font-medium mb-2">{collection.name}</h2>
                  <p className="text-white/80 line-clamp-2">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
