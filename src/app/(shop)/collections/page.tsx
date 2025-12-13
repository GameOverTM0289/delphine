import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db/prisma';
import { getImageUrl } from '@/lib/utils';

async function getCollections() {
  return prisma.collection.findMany({
    where: { isActive: true },
    include: { _count: { select: { products: true } } },
  });
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <>
      <section className="bg-cream-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Collections</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">
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
                  src={getImageUrl(collection.image || '')}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white">
                  <span className="text-sm tracking-wider opacity-80 mb-2">
                    {collection._count.products} Products
                  </span>
                  <h2 className="heading-3 text-center mb-2">{collection.name}</h2>
                  <p className="text-center text-white/80 max-w-sm mb-4">{collection.description}</p>
                  <span className="btn-outline-white btn-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore Collection
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {collections.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No collections available yet.</p>
              <Link href="/shop" className="btn-primary">View All Products</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
