'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlistStore } from '@/lib/store/wishlist';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, getImageUrl } from '@/lib/utils';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { items, removeItem } = useWishlistStore();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-charcoal-900/50 z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-ivory-100 z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-charcoal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="font-display text-xl">Wishlist</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:text-charcoal-900 transition-colors"
              aria-label="Close wishlist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="body text-stone-500 mb-2">Your wishlist is empty</p>
                <p className="body-sm text-stone-400 mb-6">Save items you love to your wishlist</p>
                <button onClick={onClose} className="btn-outline">
                  <span>Continue Shopping</span>
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-4 group">
                    <Link 
                      href={`/products/${item.productSlug}`} 
                      onClick={onClose}
                      className="relative w-24 aspect-[3/4] bg-ivory-200 flex-shrink-0 overflow-hidden"
                    >
                      <Image
                        src={getImageUrl(item.productImage)}
                        alt={item.productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <Link 
                          href={`/products/${item.productSlug}`} 
                          onClick={onClose}
                          className="font-display text-sm text-charcoal-800 hover:text-charcoal-600 transition-colors block mb-1"
                        >
                          {item.productName}
                        </Link>
                        <p className="body-sm text-charcoal-700">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/products/${item.productSlug}`}
                          onClick={onClose}
                          className="text-xs tracking-wider uppercase text-charcoal-600 hover:text-charcoal-800 underline underline-offset-4 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-xs tracking-wider uppercase text-stone-400 hover:text-charcoal-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 px-6 py-6">
              <Link
                href="/shop"
                onClick={onClose}
                className="btn-primary w-full py-4"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
