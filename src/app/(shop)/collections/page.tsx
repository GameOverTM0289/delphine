import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export default async function CollectionsPage() {
  const categories = await getCategories();

  const allCategories = [
    { 
      name: 'Bikinis', 
      slug: 'bikinis', 
      image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80',
      description: 'Two-piece swimwear perfection',
    },
    { 
      name: 'One Pieces', 
      slug: 'one-pieces', 
      image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80',
      description: 'Elegant one-piece swimsuits',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Shop By Category</span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mt-4">Collections</h1>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 md:py-20 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allCategories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/collections/${cat.slug}`}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-ivory-100">
                  <span className="text-xs tracking-[0.2em] uppercase mb-2">{cat.description}</span>
                  <h2 className="font-display text-3xl font-light mb-4">{cat.name}</h2>
                  <span className="text-xs tracking-[0.15em] uppercase border-b border-ivory-100 pb-1 group-hover:border-transparent transition-colors">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
