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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, slides.length, goToSlide]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 6000);
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
          className={`absolute inset-0 transition-all duration-1500 ease-out ${
            index === current 
              ? 'opacity-100 z-10 scale-100' 
              : 'opacity-0 z-0 scale-105'
          }`}
          style={{ transitionDuration: '1.5s' }}
        >
          <Image
            src={getImageUrl(slide, index)}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* Multiple gradient overlays for depth */}
          <div className="absolute inset-0 bg-charcoal-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-charcoal-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/30 via-transparent to-charcoal-900/30" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-ivory-100">
          <div 
            className={`transition-all duration-1000 ${
              isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
            style={{ transitionDelay: isTransitioning ? '0ms' : '300ms' }}
          >
            {slides[current].subtitle && (
              <span 
                className={`text-xs font-medium tracking-[0.3em] uppercase text-ivory-200/90 mb-6 block transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                {slides[current].subtitle}
              </span>
            )}
            <h1 
              className={`font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '700ms', textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
            >
              {slides[current].title}
            </h1>
            {slides[current].description && (
              <p 
                className={`text-base md:text-lg text-ivory-200/80 max-w-lg mx-auto mb-10 font-light transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '900ms' }}
              >
                {slides[current].description}
              </p>
            )}
            {slides[current].buttonText && slides[current].buttonLink && (
              <div
                className={`transition-all duration-700 ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                <Link 
                  href={slides[current].buttonLink!}
                  className="group inline-flex items-center justify-center px-12 py-5 text-xs font-medium tracking-[0.2em] uppercase border border-ivory-100/80 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800 transition-all duration-500 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {slides[current].buttonText}
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-[2px] transition-all duration-700 overflow-hidden ${
                index === current ? 'w-16' : 'w-8 hover:w-12'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="absolute inset-0 bg-ivory-100/30" />
              <span 
                className={`absolute inset-0 bg-ivory-100 transform origin-left transition-transform duration-700 ${
                  index === current ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-4 z-20">
        <span className="text-ivory-100 font-display text-2xl">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="w-8 h-px bg-ivory-100/50" />
        <span className="text-ivory-100/50 text-sm">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-4 z-20">
        <span 
          className="text-[10px] tracking-[0.25em] uppercase text-ivory-200/70"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
        <div className="w-px h-16 bg-ivory-100/20 relative overflow-hidden">
          <div 
            className="absolute top-0 w-full bg-ivory-100"
            style={{
              height: '30%',
              animation: 'scrollIndicator 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Side Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => goToSlide(current === 0 ? slides.length - 1 : current - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-ivory-100/30 text-ivory-100/70 hover:border-ivory-100 hover:text-ivory-100 transition-all duration-300 hidden md:flex"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((current + 1) % slides.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center border border-ivory-100/30 text-ivory-100/70 hover:border-ivory-100 hover:text-ivory-100 transition-all duration-300 hidden md:flex"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <style jsx>{`
        @keyframes scrollIndicator {
          0%, 100% {
            transform: translateY(-100%);
            opacity: 0;
          }
          30%, 70% {
            opacity: 1;
          }
          50% {
            transform: translateY(250%);
          }
        }
      `}</style>
    </section>
  );
}
