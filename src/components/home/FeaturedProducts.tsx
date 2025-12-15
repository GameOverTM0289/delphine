import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/data/products';

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-black/60">Curated Selection</span>
          <h2 className="heading-2 mt-3">Featured Pieces</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-outline">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
