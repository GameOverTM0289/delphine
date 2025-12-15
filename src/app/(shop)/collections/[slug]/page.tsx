import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { getCollectionBySlug, getProductsByCollection } from '@/lib/data/products';

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();
  const products = getProductsByCollection(params.slug);

  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">{collection.name}</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">{collection.description}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-custom">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products in this collection yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
