'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    setMobileMenuOpen(false);
  }, [pathname]);

  const cartItemCount = mounted ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const wishlistItemCount = mounted ? wishlistItems.length : 0;

  const textColor = useLightText ? 'text-white' : 'text-black';
  const iconColor = useLightText ? 'text-white/80 hover:text-white' : 'text-charcoal-700 hover:text-black';
  const menuBarColor = useLightText ? 'bg-white' : 'bg-black';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? 'bg-cream/95 backdrop-blur-md py-3' 
            : hasDarkHero 
              ? 'bg-transparent py-5' 
              : 'bg-cream/95 backdrop-blur-md py-3'
        }`}
      >
        <div className="container-main">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
              aria-label="Toggle menu"
            >
              <span className={`w-5 h-px ${menuBarColor} transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-5 h-px ${menuBarColor} transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px ${menuBarColor} transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-[0.15em] uppercase ${textColor} transition-colors duration-300 hover:opacity-60`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
              {/* Mobile */}
              <div className="block md:hidden relative h-10 w-8">
                <Image
                  src="/icon.png"
                  alt="Delphine"
                  fill
                  className={`object-contain transition-all duration-300 ${useLightText ? 'brightness-0 invert' : ''}`}
                  priority
                />
              </div>
              {/* Desktop */}
              <div className="hidden md:block relative h-12 w-40 lg:h-14 lg:w-48 xl:h-16 xl:w-56">
                <Image
                  src="/logo.png"
                  alt="Delphine"
                  fill
                  className={`object-contain transition-all duration-300 ${useLightText ? 'brightness-0 invert' : ''}`}
                  priority
                />
              </div>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-4 z-50">
              {/* Account */}
              {session ? (
                <div className="relative group">
                  <button className={`${iconColor} transition-colors duration-300`} aria-label="Account">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-44 bg-cream shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      <Link href="/account" className="block px-4 py-2 text-xs tracking-wider uppercase text-charcoal-700 hover:bg-ivory-300 transition-colors">
                        Account
                      </Link>
                      {session.user?.role === 'ADMIN' && (
                        <Link href="/admin" className="block px-4 py-2 text-xs tracking-wider uppercase text-charcoal-700 hover:bg-ivory-300 transition-colors">
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-xs tracking-wider uppercase text-charcoal-700 hover:bg-ivory-300 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/login" className={`hidden sm:block ${iconColor} transition-colors duration-300`} aria-label="Login">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className={`relative ${iconColor} transition-colors duration-300`}
                aria-label="Wishlist"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                    {wishlistItemCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative ${iconColor} transition-colors duration-300`}
                aria-label="Shopping bag"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-0 top-[53px] bg-cream transition-all duration-500 z-30 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <nav className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-lg tracking-wider text-black hover:opacity-60 transition-opacity border-b border-charcoal-200"
              >
                {link.label}
              </Link>
            ))}
            {!session && (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-lg tracking-wider text-black hover:opacity-60 transition-opacity border-b border-charcoal-200"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}
