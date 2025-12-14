'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const heroSlides = [
  {
    image: '/images/hero/slide-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    subtitle: 'Summer 2024',
    title: 'Rhythm of a Free Spirit',
    description: 'Timeless elegance meets Mediterranean spirit',
  },
  {
    image: '/images/hero/slide-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80',
    subtitle: 'New Collection',
    title: 'Coastal Dreams',
    description: 'Discover the essence of summer',
  },
  {
    image: '/images/hero/slide-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80',
    subtitle: 'Limited Edition',
    title: 'Azure Collection',
    description: 'Inspired by the Adriatic Sea',
  },
];

const collections = [
  { 
    image: '/images/collections/bikinis.jpg',
    fallback: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80',
    title: 'Bikinis',
    slug: 'bikinis',
  },
  { 
    image: '/images/collections/one-pieces.jpg',
    fallback: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=600&q=80',
    title: 'One Pieces',
    slug: 'one-pieces',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

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
      {/* ===== HERO SLIDER ===== */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.fallback}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        ))}
        
        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p 
              key={`subtitle-${currentSlide}`}
              className="text-xs tracking-[0.3em] uppercase mb-6 animate-fade-down"
            >
              {heroSlides[currentSlide].subtitle}
            </p>
            <h1 
              key={`title-${currentSlide}`}
              className="text-display text-4xl md:text-6xl lg:text-7xl font-light mb-6 animate-fade-up"
            >
              {heroSlides[currentSlide].title}
            </h1>
            <p 
              key={`desc-${currentSlide}`}
              className="text-sm md:text-base font-light tracking-wide mb-10 max-w-md mx-auto animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              {heroSlides[currentSlide].description}
            </p>
            <Link 
              href="/shop" 
              className="inline-block px-10 py-4 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 animate-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* ===== COLLECTION (2 categories: Bikinis & One Pieces) ===== */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-main">
          <div className="text-center mb-14 reveal-on-scroll">
            <p className="text-caption mb-3">The Collection</p>
            <h2 className="text-display text-3xl md:text-4xl">Curated for You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {collections.map((item, index) => (
              <Link 
                key={item.title}
                href={`/collections/${item.slug}`}
                className="group reveal-on-scroll"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <Image
                    src={item.fallback}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <h3 className="text-display text-lg md:text-xl text-center tracking-wide group-hover:opacity-70 transition-opacity duration-300">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14 reveal-on-scroll">
            <Link href="/shop" className="btn-outline">
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ARTISTIC PHOTOS (Loro Piana style) ===== */}
      <section className="bg-cream">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[85vh] overflow-hidden reveal-on-scroll">
            <Image
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80"
              alt="Mediterranean lifestyle"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-[85vh] overflow-hidden reveal-on-scroll" style={{ animationDelay: '200ms' }}>
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
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center reveal-on-scroll">
            <p className="text-caption mb-3">Our Story</p>
            <h2 className="text-display text-3xl md:text-4xl mb-8">Born by the Sea</h2>
            <p className="text-body leading-relaxed mb-5">
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
      <section className="relative h-[60vh] min-h-[450px] overflow-hidden reveal-on-scroll">
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
