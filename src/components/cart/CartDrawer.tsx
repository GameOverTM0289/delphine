'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, getImageUrl } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

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

  const subtotal = getSubtotal();

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
            <h2 className="text-display text-lg">Bag ({items.length})</h2>
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
                <p className="text-charcoal-500 mb-6">Your bag is empty</p>
                <button onClick={onClose} className="btn-outline">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4">
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
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/products/${item.productSlug}`} 
                        onClick={onClose}
                        className="text-sm text-black hover:opacity-70 transition-opacity block mb-1"
                      >
                        {item.productName}
                      </Link>
                      <p className="text-xs text-charcoal-500 mb-3">{item.variantName}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-charcoal-300">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-charcoal-600 hover:bg-charcoal-100 transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="w-7 h-7 flex items-center justify-center text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-charcoal-600 hover:bg-charcoal-100 transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-black mb-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-xs text-charcoal-400 hover:text-black underline transition-colors"
                          >
                            Remove
                          </button>
                        </div>
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-charcoal-700">Subtotal</span>
                <span className="text-base text-black">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-charcoal-500 mb-6">
                Shipping calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full py-4 bg-black text-white text-xs tracking-[0.2em] uppercase text-center hover:bg-charcoal-800 transition-colors"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
