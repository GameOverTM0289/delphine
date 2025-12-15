import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/data/products';

export default function ShopPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Shop All</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">
            Discover our complete collection of elegant swimwear designed for the modern woman.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
