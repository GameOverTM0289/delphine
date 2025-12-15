import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import prisma from '@/lib/db/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
  params: { slug: string };
}

const categoryImages: Record<string, string> = {
  'bikinis': 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=1920&q=80',
  'one-pieces': 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=1920&q=80',
};

async function getCategoryData(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          include: {
            images: { orderBy: { position: 'asc' } },
            variants: true,
          },
          orderBy: [
            { featured: 'desc' },
            { createdAt: 'desc' },
          ],
        },
      },
    });

    return category;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const category = await getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  const heroImage = categoryImages[params.slug] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80';

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src={heroImage}
          alt={category.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/40" />
        <div className="relative text-center text-ivory-100 z-10 px-6">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-ivory-200">Collection</span>
          <h1 className="font-display text-4xl md:text-5xl font-light mt-4">{category.name}</h1>
          {category.description && (
            <p className="text-sm text-ivory-200 mt-4 max-w-md mx-auto">{category.description}</p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-20 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <ol className="flex items-center justify-center gap-2 text-xs text-stone-500">
              <li><Link href="/" className="hover:text-charcoal-700 transition-colors">Home</Link></li>
              <li>/</li>
              <li><Link href="/collections" className="hover:text-charcoal-700 transition-colors">Collections</Link></li>
              <li>/</li>
              <li className="text-charcoal-700">{category.name}</li>
            </ol>
          </nav>

          {/* Product Count */}
          <p className="text-xs text-stone-500 text-center mb-10">
            {category.products.length} {category.products.length === 1 ? 'piece' : 'pieces'}
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {category.products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500 mb-6">No products in this collection yet.</p>
              <Link href="/shop" className="px-8 py-3 bg-charcoal-800 text-ivory-100 text-xs tracking-widest uppercase">
                Shop All
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
