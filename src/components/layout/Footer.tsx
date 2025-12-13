'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-charcoal-800 text-ivory-100">
      {/* Newsletter */}
      <div className="border-b border-charcoal-700">
        <div className="container-luxury py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl font-light mb-3">Join the Delphine World</h3>
            <p className="body-sm text-stone-400 mb-8">
              Subscribe for exclusive access to new collections and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 bg-transparent border border-charcoal-600 text-ivory-100 placeholder:text-stone-500 focus:outline-none focus:border-stone-400 transition-colors text-sm"
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="px-8 py-3.5 bg-ivory-100 text-charcoal-800 text-xs font-medium tracking-widest uppercase hover:bg-ivory-200 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {status === 'error' && (
              <p className="text-coral-400 text-sm mt-3">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl">Delphine</Link>
            <p className="body-sm text-stone-400 mt-4 max-w-xs">
              Timeless swimwear crafted with care, inspired by the Mediterranean spirit.
            </p>
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a 
                href="mailto:hello@delphineswimwear.com" 
                className="body-sm text-stone-400 hover:text-ivory-100 transition-colors block"
              >
                hello@delphineswimwear.com
              </a>
              <a 
                href="tel:+355694444818" 
                className="body-sm text-stone-400 hover:text-ivory-100 transition-colors block"
              >
                +355 69 444 4818
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'Bikinis', 'One Pieces', 'Cover Ups', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/shop`} 
                    className="body-sm text-stone-400 hover:text-ivory-100 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Sustainability', href: '/sustainability' },
                { label: 'Contact', href: '/contact' },
                { label: 'Size Guide', href: '/size-guide' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="body-sm text-stone-400 hover:text-ivory-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-6">Customer Care</h4>
            <ul className="space-y-3">
              {[
                { label: 'Shipping', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="body-sm text-stone-400 hover:text-ivory-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-700">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="body-sm text-stone-500">
              © {new Date().getFullYear()} Delphine. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="https://instagram.com/delphine.swimwear" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-ivory-100 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-stone-500 hover:text-ivory-100 transition-colors"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-stone-500 hover:text-ivory-100 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
