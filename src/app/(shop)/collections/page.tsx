import Link from 'next/link';
import Image from 'next/image';

const collections = [
  { 
    name: 'Bikinis', 
    slug: 'bikinis', 
    image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80',
    count: 3,
  },
  { 
    name: 'One Pieces', 
    slug: 'one-pieces', 
    image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80',
    count: 2,
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      {/* Header */}
      <section className="pb-12 md:pb-16">
        <div className="container-main text-center">
          <h1 className="text-display text-3xl md:text-4xl mb-4">Collections</h1>
          <p className="text-body max-w-md mx-auto">
            Explore our carefully curated swimwear collections.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="pb-12">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {collections.map((collection) => (
              <Link 
                key={collection.slug} 
                href={`/collections/${collection.slug}`}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-display text-2xl md:text-3xl mb-2">{collection.name}</h2>
                    <p className="text-xs tracking-wider mb-4">{collection.count} pieces</p>
                    <span className="text-xs tracking-[0.2em] uppercase border-b border-white pb-1 group-hover:border-transparent transition-colors">
                      View Collection
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
