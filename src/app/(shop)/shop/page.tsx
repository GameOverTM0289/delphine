import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import prisma from '@/lib/db/prisma';

async function getData() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: true,
        category: true,
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    }),
    prisma.category.findMany(),
  ]);

  return { products, categories };
}

export default async function ShopPage() {
  const { products, categories } = await getData();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">The Collection</span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mt-4">Shop All</h1>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 md:py-16 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link 
              href="/shop"
              className="px-6 py-2 text-xs font-medium tracking-widest uppercase border border-charcoal-700 bg-charcoal-700 text-ivory-100"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat.id}
                href={`/collections/${cat.slug}`}
                className="px-6 py-2 text-xs font-medium tracking-widest uppercase border border-stone-400 text-charcoal-700 hover:border-charcoal-700 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Product Count */}
          <p className="text-xs text-stone-500 text-center mb-10">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
          
          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
