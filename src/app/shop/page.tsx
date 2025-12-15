'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/lib/data/products';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'bikini', name: 'Bikinis' },
  { id: 'one-piece', name: 'One Pieces' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <section className="bg-cream py-16 md:py-24 mt-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Shop</h1>
          <p className="body-text-lg text-black/70 max-w-xl mx-auto">
            Discover our collection of Mediterranean-inspired swimwear.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-black/10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'text-sm tracking-wide transition-colors',
                  activeCategory === category.id ? 'text-black font-medium' : 'text-black/50 hover:text-black'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          <p className="text-sm text-black/50 mb-8">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
