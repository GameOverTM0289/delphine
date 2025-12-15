import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts } from '@/lib/data/products';

export default function FeaturedProducts() {
  const products = getFeaturedProducts(4);

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-ocean-600 text-sm uppercase tracking-widest mb-2 block">
              Curated Selection
            </span>
            <h2 className="heading-2">Featured Products</h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-gray-700 hover:text-ocean-600 transition-colors underline-animate inline-flex items-center gap-2"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
