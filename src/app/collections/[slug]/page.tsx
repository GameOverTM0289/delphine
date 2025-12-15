import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/product/ProductCard';
import { getCollectionBySlug, getProductsByCollection } from '@/lib/data/products';

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const products = getProductsByCollection(params.slug);

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] mt-16">
        <Image src={collection.image} alt={collection.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-xs tracking-[0.3em] uppercase opacity-80">Collection</span>
            <h1 className="heading-1 mt-2">{collection.name}</h1>
          </div>
        </div>
      </section>

      <section className="py-8 border-b border-black/10">
        <div className="container-custom">
          <nav className="text-sm text-black/50 mb-4">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-black">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{collection.name}</span>
          </nav>
          <p className="body-text text-black/70 max-w-2xl">{collection.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <p className="text-sm text-black/50 mb-8">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 4} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-black/50 mb-4">No products in this collection yet.</p>
              <Link href="/shop" className="btn-primary">View All Products</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
