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
              <a href="#" className="body-sm text-stone-500 hover:text-ivory-100 transition-colors">
                Instagram
              </a>
              <a href="#" className="body-sm text-stone-500 hover:text-ivory-100 transition-colors">
                Pinterest
              </a>
              <a href="#" className="body-sm text-stone-500 hover:text-ivory-100 transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
