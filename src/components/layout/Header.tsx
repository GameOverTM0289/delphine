'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import CartDrawer from '@/components/cart/CartDrawer';
import WishlistDrawer from '@/components/wishlist/WishlistDrawer';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// Pages that have dark hero backgrounds (need light text initially)
const darkHeroPages = ['/', '/about', '/contact', '/sustainability'];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Check if current page has a dark hero
  const hasDarkHero = darkHeroPages.includes(pathname);
  const useLightText = hasDarkHero && !scrolled;

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [pathname]);

  const cartItemCount = mounted ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const wishlistItemCount = mounted ? wishlistItems.length : 0;

  // Text colors based on page and scroll state
  const textColorClass = useLightText ? 'text-white' : 'text-charcoal-800';
  const logoColorClass = useLightText ? 'text-white' : 'text-charcoal-800';
  const iconColorClass = useLightText 
    ? 'text-white/90 hover:text-white' 
    : 'text-charcoal-700 hover:text-charcoal-900';
  const menuBarClass = useLightText ? 'bg-white' : 'bg-charcoal-700';

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);
  const handleWishlistOpen = () => setIsWishlistOpen(true);
  const handleWishlistClose = () => setIsWishlistOpen(false);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-ivory-100/95 backdrop-blur-md py-3 md:py-4 shadow-sm' 
            : hasDarkHero 
              ? 'bg-transparent py-4 md:py-6' 
              : 'bg-ivory-100/95 backdrop-blur-md py-3 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-px ${menuBarClass} transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-5 h-px ${menuBarClass} transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px ${menuBarClass} transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium tracking-widest uppercase ${textColorClass} transition-colors duration-300 hover:opacity-70`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className={`font-display text-xl sm:text-2xl md:text-3xl ${logoColorClass} transition-colors duration-300`}>
                Delphine
              </span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
              {/* Account */}
              {session ? (
                <div className="relative group">
                  <button className={`${iconColorClass} transition-colors duration-300`} aria-label="Account">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-ivory-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
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
                <Link href="/login" className={`hidden sm:block ${iconColorClass} transition-colors duration-300`} aria-label="Login">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Wishlist */}
              <button
                onClick={handleWishlistOpen}
                className={`relative ${iconColorClass} transition-colors duration-300`}
                aria-label="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-charcoal-800 text-ivory-100 text-[10px] flex items-center justify-center rounded-full">
                    {wishlistItemCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={handleCartOpen}
                className={`relative ${iconColorClass} transition-colors duration-300`}
                aria-label="Shopping bag"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-charcoal-800 text-ivory-100 text-[10px] flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-0 top-[57px] bg-ivory-100 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <nav className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-lg tracking-wider text-charcoal-800 hover:text-charcoal-600 transition-colors border-b border-stone-200"
              >
                {link.label}
              </Link>
            ))}
            {!session && (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-lg tracking-wider text-charcoal-800 hover:text-charcoal-600 transition-colors border-b border-stone-200"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={handleWishlistClose} />
    </>
  );
}
