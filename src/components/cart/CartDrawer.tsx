'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, SHIPPING, getImageUrl } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

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

  const subtotal = getSubtotal();
  const freeShippingRemaining = Math.max(0, SHIPPING.FREE_THRESHOLD - subtotal);

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="font-display text-xl">Shopping Bag</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:text-charcoal-900 transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress */}
          {subtotal > 0 && subtotal < SHIPPING.FREE_THRESHOLD && (
            <div className="px-6 py-4 bg-ivory-200">
              <div className="flex items-center justify-between mb-2">
                <span className="body-sm text-stone-600">
                  {formatPrice(freeShippingRemaining)} away from free shipping
                </span>
                <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="h-1 bg-stone-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-charcoal-700 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min((subtotal / SHIPPING.FREE_THRESHOLD) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {subtotal >= SHIPPING.FREE_THRESHOLD && (
            <div className="px-6 py-4 bg-green-50">
              <div className="flex items-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="body-sm font-medium">You&apos;ve unlocked free shipping!</span>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border border-stone-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="body text-stone-500 mb-2">Your bag is empty</p>
                <p className="body-sm text-stone-400 mb-6">Add your favorite items to get started</p>
                <button onClick={onClose} className="btn-outline">
                  <span>Continue Shopping</span>
                </button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4 group">
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
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/products/${item.productSlug}`} 
                        onClick={onClose}
                        className="font-display text-sm text-charcoal-800 hover:text-charcoal-600 transition-colors block mb-1"
                      >
                        {item.productName}
                      </Link>
                      <p className="body-sm text-stone-500 mb-3">{item.variantName}</p>
                      
                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-stone-300">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-charcoal-600 hover:bg-stone-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-charcoal-600 hover:bg-stone-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        {/* Price & Remove */}
                        <div className="text-right">
                          <p className="body-sm text-charcoal-700 mb-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="body-sm text-stone-400 hover:text-charcoal-700 underline transition-colors"
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
            <div className="border-t border-stone-200 px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="body text-charcoal-700">Subtotal</span>
                <span className="font-display text-lg text-charcoal-800">{formatPrice(subtotal)}</span>
              </div>
              <p className="body-sm text-stone-500 mb-6">
                Shipping and taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="btn-primary w-full py-4 text-center"
              >
                <span>Checkout</span>
              </Link>
              <button
                onClick={onClose}
                className="w-full py-3 mt-3 text-xs tracking-wider uppercase text-charcoal-600 hover:text-charcoal-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
