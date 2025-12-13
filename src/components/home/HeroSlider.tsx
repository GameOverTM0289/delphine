'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const defaultImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920';

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, slides.length, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal-900">
      {/* Background Images */}
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={s.image || defaultImage}
            alt={s.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/40" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-luxury text-center text-ivory-100">
          <div 
            className={`transition-all duration-700 ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {slide.subtitle && (
              <span className="label text-ivory-200 mb-4 block">
                {slide.subtitle}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
              {slide.title}
            </h1>
            {slide.description && (
              <p className="body-lg text-ivory-200 max-w-lg mx-auto mb-10">
                {slide.description}
              </p>
            )}
            {slide.buttonText && slide.buttonLink && (
              <Link 
                href={slide.buttonLink}
                className="inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-widest uppercase border border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800 transition-all duration-500"
              >
                {slide.buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-8 h-px transition-all duration-500 ${
                index === current ? 'bg-ivory-100 w-12' : 'bg-ivory-100/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-widest uppercase text-ivory-200 writing-mode-vertical rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="w-px h-12 bg-ivory-100/30 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-ivory-100 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
