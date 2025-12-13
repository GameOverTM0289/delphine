'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  image?: string | null;
}

interface HeroSliderProps {
  slides: Slide[];
}

const defaultImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
  'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1920&q=80',
];

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, slides.length, goToSlide]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

  if (slides.length === 0) return null;

  const getImageUrl = (slide: Slide, index: number) => {
    if (slide.image && slide.image.startsWith('http')) {
      return slide.image;
    }
    return defaultImages[index % defaultImages.length];
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal-900">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={getImageUrl(slide, index)}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal-900/40" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-ivory-100">
          <div 
            className={`transition-all duration-700 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {slides[current].subtitle && (
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-ivory-200 mb-4 block">
                {slides[current].subtitle}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              {slides[current].title}
            </h1>
            {slides[current].description && (
              <p className="text-base md:text-lg text-ivory-200 max-w-lg mx-auto mb-10 font-light">
                {slides[current].description}
              </p>
            )}
            {slides[current].buttonText && slides[current].buttonLink && (
              <Link 
                href={slides[current].buttonLink!}
                className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-[0.15em] uppercase border border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800 transition-all duration-300"
              >
                {slides[current].buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-px transition-all duration-500 ${
                index === current ? 'w-12 bg-ivory-100' : 'w-6 bg-ivory-100/50 hover:bg-ivory-100/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-3 z-20">
        <span 
          className="text-[10px] tracking-[0.2em] uppercase text-ivory-200"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-ivory-100/30 relative overflow-hidden">
          <div className="absolute top-0 w-full h-4 bg-ivory-100 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
