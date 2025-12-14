import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db/prisma';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

async function getData() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: {
      images: { orderBy: { position: 'asc' } },
      variants: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return { products };
}

const placeholderImages = [
  'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80',
  'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=600&q=80',
  'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=600&q=80',
  'https://images.unsplash.com/photo-1584374232938-8ba5e6ee5365?w=600&q=80',
  'https://images.unsplash.com/photo-1594046243098-0fceea9d451e?w=600&q=80',
];

export default async function ShopPage() {
  const { products } = await getData();

  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      {/* Header */}
      <section className="pb-12 md:pb-16">
        <div className="container-main text-center">
          <h1 className="text-display text-3xl md:text-4xl mb-4">Shop</h1>
          <p className="text-body max-w-md mx-auto">
            Discover our collection of timeless swimwear.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <div className="container-main">
          {/* Filter tabs - only Bikinis and One Pieces */}
          <div className="flex items-center justify-center gap-8 mb-12 border-b border-charcoal-200 pb-4">
            <button className="text-xs tracking-[0.15em] uppercase text-black border-b-2 border-black pb-2 -mb-[18px]">
              All
            </button>
            <Link href="/collections/bikinis" className="text-xs tracking-[0.15em] uppercase text-charcoal-500 hover:text-black transition-colors pb-2 -mb-[18px]">
              Bikinis
            </Link>
            <Link href="/collections/one-pieces" className="text-xs tracking-[0.15em] uppercase text-charcoal-500 hover:text-black transition-colors pb-2 -mb-[18px]">
              One Pieces
            </Link>
          </div>

          {/* Product count */}
          <p className="text-xs text-charcoal-500 text-center mb-10">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14 max-w-5xl mx-auto">
            {products.map((product, index) => {
              const imageUrl = product.images?.[0]?.url || placeholderImages[index % placeholderImages.length];
              const hoverImageUrl = product.images?.[1]?.url || imageUrl;
              
              // Get unique colors
              const colors = product.variants
                ?.filter((v: { colorHex?: string | null }) => v.colorHex)
                .reduce((acc: { hex: string }[], v: { colorHex?: string | null }) => {
                  if (!acc.find(c => c.hex === v.colorHex)) {
                    acc.push({ hex: v.colorHex || '' });
                  }
                  return acc;
                }, [])
                .slice(0, 4) || [];

              return (
                <Link 
                  key={product.id} 
                  href={`/products/${product.slug}`}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 mb-4">
                    <Image
                      src={imageUrl.startsWith('http') ? imageUrl : placeholderImages[index % placeholderImages.length]}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <Image
                      src={hoverImageUrl.startsWith('http') ? hoverImageUrl : imageUrl.startsWith('http') ? imageUrl : placeholderImages[index % placeholderImages.length]}
                      alt={product.name}
                      fill
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  {/* Product info */}
                  <div className="text-center">
                    <h3 className="text-sm md:text-base text-black mb-2 group-hover:opacity-70 transition-opacity">
                      {product.name}
                    </h3>
                    <p className="text-xs text-charcoal-600 mb-3">
                      {formatPrice(product.price)}
                    </p>

                    {/* Color dots */}
                    {colors.length > 0 && (
                      <div className="flex items-center justify-center gap-1.5">
                        {colors.map((c: { hex: string }, i: number) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full border border-charcoal-200"
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-charcoal-500 mb-6">No products available yet.</p>
              <p className="text-body text-sm">Check back soon for our new collection.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
