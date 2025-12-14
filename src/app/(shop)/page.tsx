'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <main>
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Mediterranean Sea"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-6 animate-fade-down">
            Summer 2024
          </p>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl font-light mb-6 animate-fade-up">
            Rhythm of a Free Spirit
          </h1>
          <p className="text-sm md:text-base font-light tracking-wide mb-10 max-w-md mx-auto animate-fade-up delay-200">
            Timeless elegance meets Mediterranean spirit
          </p>
          <Link 
            href="/shop" 
            className="inline-block px-10 py-4 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 animate-fade-up delay-400"
          >
            Explore Collection
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in delay-800">
          <div className="w-px h-16 bg-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[slideDown_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* ===== COLLECTION (No prices) ===== */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-main">
          <div className="text-center mb-16 reveal-on-scroll">
            <p className="text-caption mb-4">The Collection</p>
            <h2 className="text-display text-3xl md:text-4xl">Curated for You</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { 
                image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80',
                title: 'Bikinis'
              },
              { 
                image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=600&q=80',
                title: 'One Pieces'
              },
              { 
                image: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=600&q=80',
                title: 'Cover Ups'
              },
              { 
                image: 'https://images.unsplash.com/photo-1584374232938-8ba5e6ee5365?w=600&q=80',
                title: 'Accessories'
              },
            ].map((item, index) => (
              <Link 
                key={item.title}
                href="/shop"
                className={`group reveal-on-scroll delay-${(index + 1) * 100}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-display text-sm md:text-base text-center tracking-wide group-hover:opacity-70 transition-opacity duration-300">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16 reveal-on-scroll">
            <Link href="/shop" className="btn-outline">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ARTISTIC PHOTOS (Loro Piana style) ===== */}
      <section className="py-0 bg-cream">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[90vh] overflow-hidden reveal-on-scroll">
            <Image
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80"
              alt="Mediterranean lifestyle"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[90vh] overflow-hidden reveal-on-scroll delay-200">
            <Image
              src="https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1200&q=80"
              alt="Coastal elegance"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
            <p className="text-caption mb-4">Our Story</p>
            <h2 className="text-display text-3xl md:text-4xl mb-8">Born by the Sea</h2>
            <p className="text-body leading-relaxed mb-6">
              Delphine was born from a love of the Mediterranean—its crystal-clear waters, 
              sun-drenched coastlines, and timeless elegance. Our name comes from the Greek 
              word for dolphin, symbolizing grace, freedom, and the pure joy of the sea.
            </p>
            <p className="text-body leading-relaxed mb-10">
              Each piece is crafted with care, designed to make you feel confident and 
              beautiful whether you&apos;re lounging by the pool or exploring hidden coves.
            </p>
            <Link href="/about" className="link-underline text-xs tracking-[0.2em] uppercase">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FULL WIDTH IMAGE ===== */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden reveal-on-scroll">
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80"
          alt="Beach sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="text-xs tracking-[0.3em] uppercase mb-4">New Season</p>
            <h2 className="text-display text-3xl md:text-5xl mb-8">Summer Awaits</h2>
            <Link 
              href="/shop" 
              className="inline-block px-10 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-cream transition-colors duration-500"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
