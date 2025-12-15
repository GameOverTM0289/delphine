'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  const itemCount = mounted ? getItemCount() : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="font-display text-2xl md:text-3xl tracking-tight">
            Delphine
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm tracking-wide hover:text-black/60 transition-colors">
              Shop
            </Link>
            <Link href="/collections" className="text-sm tracking-wide hover:text-black/60 transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-sm tracking-wide hover:text-black/60 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm tracking-wide hover:text-black/60 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2 -mr-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-black/10">
            <div className="flex flex-col gap-4">
              <Link href="/shop" className="text-sm tracking-wide" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </Link>
              <Link href="/collections" className="text-sm tracking-wide" onClick={() => setMobileMenuOpen(false)}>
                Collections
              </Link>
              <Link href="/about" className="text-sm tracking-wide" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="text-sm tracking-wide" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
