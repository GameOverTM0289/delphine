import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/home/HeroSlider';
import ProductCard from '@/components/product/ProductCard';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

async function getHomeData() {
  try {
    const [slides, featuredProducts] = await Promise.all([
      prisma.heroSlide.findMany({
        where: { isActive: true },
        orderBy: { position: 'asc' },
      }),
      prisma.product.findMany({
        where: { featured: true, isActive: true },
        include: { images: true, variants: true },
        take: 4,
      }),
    ]);

    return { slides, featuredProducts };
  } catch (error) {
    console.error('Database error:', error);
    return { slides: [], featuredProducts: [] };
  }
}

export default async function HomePage() {
  const { slides, featuredProducts } = await getHomeData();

  const heroSlides = slides.length > 0 ? slides : [
    {
      id: '1',
      title: 'Summer Collection',
      subtitle: 'New Arrivals',
      description: 'Timeless elegance meets Mediterranean spirit',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    },
  ];

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Featured Products */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Curated Selection</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4">Featured Pieces</h2>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-500">New arrivals coming soon...</p>
          )}
          
          <div className="text-center mt-14">
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-[0.15em] uppercase border border-charcoal-700 text-charcoal-700 hover:bg-charcoal-700 hover:text-ivory-100 transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Shop By Category</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4">Our Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'Bikinis', slug: 'bikinis', image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80', desc: 'Two-piece perfection' },
              { name: 'One Pieces', slug: 'one-pieces', image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80', desc: 'Elegant sophistication' },
            ].map((cat) => (
              <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="group relative aspect-[4/5] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-ivory-100">
                  <span className="text-xs tracking-[0.2em] uppercase mb-2">{cat.desc}</span>
                  <h3 className="font-display text-3xl font-light mb-4">{cat.name}</h3>
                  <span className="text-xs tracking-[0.15em] uppercase border-b border-ivory-100 pb-1 group-hover:border-transparent transition-colors">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-4 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"
                alt="Mediterranean lifestyle"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="Beach atmosphere"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Our Philosophy</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-16">What We Stand For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: 'Sustainability', desc: 'Eco-conscious materials and ethical production for a better tomorrow.' },
              { title: 'Quality', desc: 'Premium Italian fabrics crafted with meticulous attention to detail.' },
              { title: 'Inclusivity', desc: 'Designs that celebrate every body, because beauty knows no size.' },
            ].map((value) => (
              <div key={value.title}>
                <div className="w-12 h-px bg-stone-300 mx-auto mb-8" />
                <h3 className="font-display text-xl text-charcoal-800 mb-4">{value.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&q=80"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:py-8">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4 mb-8">Born by the Sea</h2>
              <div className="space-y-6 text-stone-600 leading-relaxed">
                <p>
                  Delphine was born from a love of the Mediterranean—its crystal-clear waters, 
                  sun-drenched coastlines, and timeless elegance that has inspired artists and 
                  travelers for centuries.
                </p>
                <p>
                  Our name comes from the Greek word for dolphin, symbolizing grace, 
                  intelligence, and the pure joy of moving freely through water.
                </p>
                <p>
                  Each piece is crafted to make you feel confident, comfortable, 
                  and connected to the beauty of the sea.
                </p>
              </div>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-10 py-4 mt-10 text-xs font-medium tracking-[0.15em] uppercase bg-charcoal-800 text-ivory-100 hover:bg-charcoal-900 transition-colors"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram / Social Proof */}
      <section className="py-20 md:py-28 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-stone-500">@delphineswimwear</span>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal-800 mt-4">Follow Our Journey</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
              'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80',
              'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=400&q=80',
              'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&q=80',
            ].map((img, i) => (
              <a key={i} href="#" className="relative aspect-square overflow-hidden group">
                <Image src={img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-colors flex items-center justify-center">
                  <span className="text-ivory-100 opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-widest uppercase">View</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-charcoal-800 text-ivory-100">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light mb-4">Stay Connected</h2>
          <p className="text-sm text-stone-400 mb-10">
            Be the first to know about new collections and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-transparent border border-charcoal-600 text-ivory-100 placeholder:text-stone-500 focus:outline-none focus:border-stone-400 transition-colors text-sm"
            />
            <button type="submit" className="px-8 py-4 bg-ivory-100 text-charcoal-800 text-xs font-medium tracking-[0.15em] uppercase hover:bg-ivory-200 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
