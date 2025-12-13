import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/home/HeroSlider';
import prisma from '@/lib/db/prisma';
import { getImageUrl } from '@/lib/utils';

async function getHomeData() {
  const [slides, collections] = await Promise.all([
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { position: 'asc' },
    }),
    prisma.collection.findMany({
      where: { featured: true, isActive: true },
      take: 3,
    }),
  ]);

  return { slides, collections };
}

export default async function HomePage() {
  const { slides, collections } = await getHomeData();

  const heroSlides = slides.length > 0 ? slides : [
    {
      id: '1',
      title: 'Summer Collection',
      subtitle: 'New Arrivals',
      description: 'Timeless elegance meets Mediterranean spirit',
      buttonText: 'Discover',
      buttonLink: '/shop',
      image: '/images/hero/slide-1.jpg',
    },
  ];

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Collection Preview - No Prices */}
      <section className="section">
        <div className="container-luxury">
          <div className="text-center mb-16 animate-fade-up">
            <span className="label">The Collection</span>
            <h2 className="heading-1 mt-4">Curated Pieces</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {[
              { name: 'Bikinis', image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600', slug: 'bikinis' },
              { name: 'One Pieces', image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=600', slug: 'one-pieces' },
              { name: 'Cover Ups', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600', slug: 'cover-ups' },
            ].map((item, index) => (
              <Link 
                key={item.slug}
                href={`/collections/${item.slug}`}
                className="group animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover img-zoom"
                  />
                </div>
                <h3 className="font-display text-xl text-charcoal-800 text-center">{item.name}</h3>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-16 animate-fade-up delay-500">
            <Link href="/shop" className="btn-outline">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Images - Like Loro Piana */}
      <section className="section-sm bg-ivory-200">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden animate-fade-up">
              <Image
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800"
                alt="Mediterranean lifestyle"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden animate-fade-up delay-200">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
                alt="Beach atmosphere"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values - Elegant Minimal */}
      <section className="section bg-ivory-100">
        <div className="container-narrow text-center">
          <span className="label animate-fade-down">Our Philosophy</span>
          <h2 className="heading-1 mt-4 mb-16 animate-fade-up">What We Stand For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                title: 'Sustainability',
                description: 'Eco-conscious materials and ethical production for a better tomorrow.',
              },
              {
                title: 'Quality',
                description: 'Premium Italian fabrics crafted with meticulous attention to detail.',
              },
              {
                title: 'Inclusivity',
                description: 'Designs that celebrate every body, because beauty knows no size.',
              },
            ].map((value, index) => (
              <div 
                key={value.title} 
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="divider mb-8" />
                <h3 className="font-display text-xl text-charcoal-800 mb-4">{value.title}</h3>
                <p className="body text-stone-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden animate-slide-right">
              <Image
                src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
            <div className="lg:pl-8 animate-slide-left">
              <span className="label">Our Story</span>
              <h2 className="heading-1 mt-4 mb-8">Born by the Sea</h2>
              <div className="space-y-6 body-lg">
                <p>
                  Delphine was born from a love of the Mediterranean—its crystal-clear waters, 
                  sun-drenched coastlines, and timeless elegance.
                </p>
                <p>
                  Our name comes from the Greek word for dolphin, symbolizing grace, 
                  intelligence, and the joy of moving freely through water.
                </p>
              </div>
              <Link href="/about" className="btn-primary mt-10 inline-flex">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Newsletter */}
      <section className="py-24 bg-charcoal-800 text-ivory-100">
        <div className="container-narrow text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light mb-4">Stay Connected</h2>
          <p className="body text-stone-300 mb-10 max-w-md mx-auto">
            Be the first to know about new collections and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-6 py-4 bg-transparent border border-stone-600 text-ivory-100 placeholder:text-stone-500 focus:outline-none focus:border-ivory-100 transition-colors text-sm"
            />
            <button type="submit" className="px-8 py-4 bg-ivory-100 text-charcoal-800 text-xs font-medium tracking-widest uppercase hover:bg-ivory-200 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
