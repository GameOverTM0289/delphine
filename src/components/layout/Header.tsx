'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/store/cart';
import CartDrawer from '@/components/cart/CartDrawer';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { data: session } = useSession();
  const { items, isCartOpen, toggleCart } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-ivory-100/95 backdrop-blur-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`w-5 h-px bg-charcoal-700 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-5 h-px bg-charcoal-700 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px bg-charcoal-700 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium tracking-widest uppercase text-charcoal-700 hover:text-charcoal-900 transition-colors link-elegant"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="font-display text-3xl md:text-4xl lg:text-[42px] text-charcoal-800 tracking-wide">
                Delphine
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              {/* Account */}
              {session ? (
                <div className="relative group">
                  <button className="text-charcoal-700 hover:text-charcoal-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-ivory-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      <Link href="/account" className="block px-4 py-2 text-xs tracking-wider uppercase text-charcoal-600 hover:bg-ivory-200 transition-colors">
                        Account
                      </Link>
                      {session.user?.role === 'ADMIN' && (
                        <Link href="/admin" className="block px-4 py-2 text-xs tracking-wider uppercase text-charcoal-600 hover:bg-ivory-200 transition-colors">
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-xs tracking-wider uppercase text-charcoal-600 hover:bg-ivory-200 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="text-charcoal-700 hover:text-charcoal-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative text-charcoal-700 hover:text-charcoal-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-charcoal-800 text-ivory-100 text-[10px] flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-ivory-100 transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-96 py-8' : 'max-h-0'}`}>
          <nav className="container-luxury flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-charcoal-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
    </>
  );
}
