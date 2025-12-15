'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, getImageUrl, SHIPPING } from '@/lib/utils';

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

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

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const freeShippingRemaining = SHIPPING.FREE_THRESHOLD - subtotal;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-display text-xl font-medium">Shopping Bag</h2>
            <button
              onClick={closeCart}
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress */}
          {subtotal > 0 && freeShippingRemaining > 0 && (
            <div className="px-4 py-3 bg-ocean-50">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-ocean-700">
                  Add {formatPrice(freeShippingRemaining)} for free shipping
                </span>
                <span className="text-ocean-600 font-medium">
                  {Math.round((subtotal / SHIPPING.FREE_THRESHOLD) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-ocean-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-ocean-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / SHIPPING.FREE_THRESHOLD) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {subtotal >= SHIPPING.FREE_THRESHOLD && (
            <div className="px-4 py-3 bg-green-50 text-green-700 text-sm font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              You&apos;ve unlocked free shipping! 🎉
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-medium mb-2">Your bag is empty</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Looks like you haven&apos;t added anything yet.
                </p>
                <button onClick={closeCart} className="btn-primary">
                  Start Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-4 pb-4 border-b border-gray-100">
                    <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={getImageUrl(item.productImage)}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-1">{item.productName}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{item.variantName}</p>
                      <p className="text-sm font-medium mt-2">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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
            <div className="border-t border-gray-100 p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Shipping & taxes calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn-primary w-full py-3"
              >
                Checkout
              </Link>
              <button
                onClick={closeCart}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors py-2"
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
