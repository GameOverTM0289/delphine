'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils';

const slides = [
  {
    id: 1,
    title: 'Mediterranean Summer',
    subtitle: 'New Collection 2024',
    description: 'Dive into elegance with our latest swimwear collection',
    image: '/images/hero/hero-1.jpg',
    cta: { text: 'Shop Collection', href: '/collections/mediterranean-summer' },
  },
  {
    id: 2,
    title: 'Sustainable Luxury',
    subtitle: 'Eco-Friendly Fashion',
    description: 'Made with recycled ocean plastics and sustainable materials',
    image: '/images/hero/hero-2.jpg',
    cta: { text: 'Learn More', href: '/sustainability' },
  },
  {
    id: 3,
    title: 'Summer Essentials',
    subtitle: 'Best Sellers',
    description: 'Discover our most loved pieces for your next getaway',
    image: '/images/hero/hero-3.jpg',
    cta: { text: 'Shop Now', href: '/shop' },
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    const duration = 6000; // 6 seconds per slide
    const interval = 50; // Update progress every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(slide.image)}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center z-20">
            <div className="container-custom">
              <div className="max-w-xl">
                <span
                  className={`inline-block text-ocean-300 text-sm uppercase tracking-widest mb-4 ${
                    index === currentSlide ? 'animate-fade-up' : ''
                  }`}
                  style={{ animationDelay: '0.1s' }}
                >
                  {slide.subtitle}
                </span>
                <h1
                  className={`font-display text-5xl md:text-6xl lg:text-7xl text-white font-medium mb-6 leading-tight ${
                    index === currentSlide ? 'animate-fade-up' : ''
                  }`}
                  style={{ animationDelay: '0.2s' }}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-lg text-white/80 mb-8 ${
                    index === currentSlide ? 'animate-fade-up' : ''
                  }`}
                  style={{ animationDelay: '0.3s' }}
                >
                  {slide.description}
                </p>
                <Link
                  href={slide.cta.href}
                  className={`btn-outline-white ${
                    index === currentSlide ? 'animate-fade-up' : ''
                  }`}
                  style={{ animationDelay: '0.4s' }}
                >
                  {slide.cta.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative w-12 h-1 bg-white/30 rounded-full overflow-hidden"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-75 ${
                index === currentSlide ? '' : index < currentSlide ? 'w-full' : 'w-0'
              }`}
              style={{
                width: index === currentSlide ? `${progress}%` : index < currentSlide ? '100%' : '0%',
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs uppercase tracking-widest rotate-90 origin-center translate-x-6">
          Scroll
        </span>
        <div className="w-px h-12 bg-white/30 overflow-hidden">
          <div className="w-full h-full bg-white animate-[slideDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
