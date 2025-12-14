'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlistStore } from '@/lib/store/wishlist';
import { formatPrice, getImageUrl } from '@/lib/utils';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { items, removeItem } = useWishlistStore();

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
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal-200">
            <h2 className="text-display text-lg">Wishlist ({items.length})</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:text-black transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-charcoal-500 mb-6">Your wishlist is empty</p>
                <button onClick={onClose} className="btn-outline">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-4">
                    <Link 
                      href={`/products/${item.productSlug}`} 
                      onClick={onClose}
                      className="relative w-20 aspect-[3/4] bg-ivory-200 flex-shrink-0 overflow-hidden"
                    >
                      <Image
                        src={getImageUrl(item.productImage) || 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <Link 
                          href={`/products/${item.productSlug}`} 
                          onClick={onClose}
                          className="text-sm text-black hover:opacity-70 transition-opacity block mb-1"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-xs text-charcoal-600">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/products/${item.productSlug}`}
                          onClick={onClose}
                          className="text-xs tracking-wider uppercase text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-xs tracking-wider uppercase text-charcoal-400 hover:text-black transition-colors"
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
            <div className="border-t border-charcoal-200 px-6 py-6">
              <Link
                href="/shop"
                onClick={onClose}
                className="block w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase text-center hover:bg-charcoal-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
