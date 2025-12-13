import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import prisma from '@/lib/db/prisma';
import { getImageUrl } from '@/lib/utils';

interface CollectionPageProps {
  params: { slug: string };
}

async function getCollection(slug: string) {
  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
        include: { images: true, variants: true },
      },
    },
  });

  // Also check if it's a category slug
  if (!collection) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          include: { images: true, variants: true },
        },
      },
    });

    if (category) {
      return {
        ...category,
        isCategory: true,
      };
    }
  }

  return collection;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = await getCollection(params.slug);

  if (!collection) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] pt-20">
        <Image
          src={getImageUrl(collection.image || '')}
          alt={collection.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-sm tracking-[0.3em] uppercase opacity-80">Collection</span>
            <h1 className="heading-1 mt-2">{collection.name}</h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb & Description */}
      <section className="py-8 border-b">
        <div className="container-custom">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-gray-900">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{collection.name}</span>
          </nav>
          {collection.description && (
            <p className="text-gray-600 max-w-2xl">{collection.description}</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container-custom">
          <p className="text-sm text-gray-500 mb-8">
            {collection.products.length} product{collection.products.length !== 1 ? 's' : ''}
          </p>
          {collection.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {collection.products.map((product: any, index: number) => (
                <ProductCard key={product.id} product={product} priority={index < 4} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No products in this collection yet.</p>
              <Link href="/shop" className="btn-primary">View All Products</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
