'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSlider from '@/components/home/HeroSlider';
import ProductCard from '@/components/product/ProductCard';

// Animated Section Component
function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
}

// Parallax Image Component
function ParallaxImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      setOffset(scrollProgress * 50 - 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-100"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      />
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample hero slides
  const heroSlides = [
    {
      id: '1',
      title: 'Summer Collection',
      subtitle: 'New Arrivals 2024',
      description: 'Timeless elegance meets Mediterranean spirit',
      buttonText: 'Shop Now',
      buttonLink: '/shop',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    },
    {
      id: '2',
      title: 'Coastal Dreams',
      subtitle: 'Limited Edition',
      description: 'Crafted with sustainable materials',
      buttonText: 'Explore',
      buttonLink: '/collections',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
    },
  ];

  // Sample featured products with working images
  const featuredProducts = [
    {
      id: '1',
      name: 'Riviera Bikini',
      slug: 'riviera-bikini',
      description: 'Classic two-piece with modern elegance',
      price: 129,
      images: [{ url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=600&q=80', alt: 'Riviera Bikini' }],
      variants: [{ id: '1', price: 129 }],
    },
    {
      id: '2',
      name: 'Côte d\'Azur One-Piece',
      slug: 'cote-dazur-one-piece',
      description: 'Sophisticated silhouette',
      price: 159,
      images: [{ url: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=600&q=80', alt: 'Côte d\'Azur One-Piece' }],
      variants: [{ id: '2', price: 159 }],
    },
    {
      id: '3',
      name: 'Sardinia Wrap',
      slug: 'sardinia-wrap',
      description: 'Effortless beach cover',
      price: 89,
      images: [{ url: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=600&q=80', alt: 'Sardinia Wrap' }],
      variants: [{ id: '3', price: 89 }],
    },
    {
      id: '4',
      name: 'Amalfi Triangle',
      slug: 'amalfi-triangle',
      description: 'Timeless triangle cut',
      price: 119,
      images: [{ url: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80', alt: 'Amalfi Triangle' }],
      variants: [{ id: '4', price: 119 }],
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Featured Products */}
      <section className="py-24 md:py-32 bg-ivory-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-warm-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-stone-200/30 to-transparent rounded-full blur-2xl" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
          <AnimatedSection className="text-center mb-20">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-stone-500 block mb-4">
              Curated Selection
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mb-4">
              Featured Pieces
            </h2>
            <div className="w-16 h-px bg-charcoal-300 mx-auto" />
          </AnimatedSection>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
            {featuredProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-16" delay={400}>
            <Link 
              href="/shop" 
              className="group inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase text-charcoal-700 hover:text-charcoal-900 transition-colors"
            >
              <span>View All Products</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 md:py-32 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-stone-500 block mb-4">
              Shop By Category
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800">
              Our Collections
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { 
                name: 'Bikinis', 
                slug: 'bikinis', 
                image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800&q=80', 
                desc: 'Two-piece perfection',
                count: '24 Styles'
              },
              { 
                name: 'One Pieces', 
                slug: 'one-pieces', 
                image: 'https://images.unsplash.com/photo-1520981825232-ece5fae45120?w=800&q=80', 
                desc: 'Elegant sophistication',
                count: '18 Styles'
              },
            ].map((cat, index) => (
              <AnimatedSection key={cat.slug} delay={index * 150}>
                <Link 
                  href={`/shop?category=${cat.slug}`} 
                  className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden block"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8 md:p-12 text-ivory-100">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-ivory-200/80 mb-2">{cat.count}</span>
                    <span className="text-xs tracking-[0.2em] uppercase mb-3 opacity-80">{cat.desc}</span>
                    <h3 className="font-display text-3xl md:text-4xl font-light mb-6">{cat.name}</h3>
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase border-b border-ivory-100/50 pb-1 group-hover:border-ivory-100 transition-colors">
                      Explore
                      <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section with Parallax */}
      <section className="py-4 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 gap-4">
            <AnimatedSection className="relative aspect-[4/5] overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"
                alt="Mediterranean lifestyle"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
            </AnimatedSection>
            <AnimatedSection delay={200} className="relative aspect-[4/5] overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="Beach atmosphere"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 md:py-32 bg-ivory-100 relative">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-charcoal-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-charcoal-900 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-charcoal-900 rounded-full" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <AnimatedSection>
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-stone-500 block mb-4">
              Our Philosophy
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mb-20">
              What We Stand For
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { 
                title: 'Sustainability', 
                desc: 'Eco-conscious materials and ethical production for a better tomorrow.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                title: 'Quality', 
                desc: 'Premium Italian fabrics crafted with meticulous attention to detail.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              },
              { 
                title: 'Inclusivity', 
                desc: 'Designs that celebrate every body, because beauty knows no size.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 150}>
                <div className="text-charcoal-400 flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl text-charcoal-800 mb-4">{value.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{value.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 md:py-32 bg-ivory-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <AnimatedSection className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
              <Image
                src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&q=80"
                alt="Our story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            </AnimatedSection>
            <AnimatedSection delay={200} className="lg:py-8 order-1 lg:order-2">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-stone-500 block mb-4">
                Our Story
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mb-8">
                Born by the Sea
              </h2>
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
                className="inline-flex items-center gap-3 mt-10 text-xs font-medium tracking-[0.2em] uppercase text-charcoal-700 hover:text-charcoal-900 transition-colors group"
              >
                <span>Discover More</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Instagram / Social Proof */}
      <section className="py-24 md:py-32 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <AnimatedSection className="text-center mb-16">
            <a 
              href="https://instagram.com/delphine.swimwear" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-[0.25em] uppercase text-stone-500 hover:text-charcoal-700 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @delphine.swimwear
            </a>
            <h2 className="font-display text-4xl md:text-5xl font-light text-charcoal-800 mt-4">
              Follow Our Journey
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
              'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80',
              'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=400&q=80',
              'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&q=80',
            ].map((img, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <a 
                  href="https://instagram.com/delphine.swimwear" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square overflow-hidden group block"
                >
                  <Image 
                    src={img} 
                    alt="" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-all duration-500 flex items-center justify-center">
                    <svg 
                      className="w-8 h-8 text-ivory-100 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                    </svg>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
