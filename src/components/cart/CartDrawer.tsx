'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, cn, STORE_CONFIG } from '@/lib/utils';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
  const freeShippingThreshold = STORE_CONFIG.freeShippingThreshold;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transition-transform duration-300 flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/10">
          <h2 className="heading-4">Your Cart</h2>
          <button onClick={closeCart} className="p-2 hover:bg-cream transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-cream">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-sm text-center">🎉 You&apos;ve unlocked <strong>free shipping!</strong></p>
            ) : (
              <>
                <p className="text-sm text-center mb-2">
                  Add <strong>{formatPrice(amountToFreeShipping)}</strong> more for free shipping
                </p>
                <div className="h-1 bg-black/10 rounded-full overflow-hidden">
                  <div className="h-full bg-black transition-all duration-300" style={{ width: `${progressToFreeShipping}%` }} />
                </div>
              </>
            )}
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <svg className="w-16 h-16 text-black/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-black/60 mb-4">Your cart is empty</p>
              <button onClick={closeCart} className="btn-primary btn-sm">Continue Shopping</button>
            </div>
          ) : (
            <ul className="divide-y divide-black/5">
              {items.map((item) => (
                <li key={`${item.productId}-${item.colorId}-${item.sizeId}`} className="p-6">
                  <div className="flex gap-4">
                    <Link href={`/products/${item.productSlug}`} onClick={closeCart} className="relative w-20 h-24 bg-cream flex-shrink-0">
                      <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.productSlug}`} onClick={closeCart} className="font-medium text-sm hover:underline line-clamp-1">
                        {item.productName}
                      </Link>
                      <p className="text-xs text-black/60 mt-1">{item.colorName} / {item.sizeName}</p>
                      <p className="text-sm font-medium mt-2">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-black/20">
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorId, item.sizeId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-cream transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorId, item.sizeId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-cream transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.colorId, item.sizeId)}
                          className="text-xs text-black/60 hover:text-black underline"
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
          <div className="border-t border-black/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-black/60 text-center">Shipping & taxes calculated at checkout</p>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">Checkout</Link>
            <button onClick={closeCart} className="btn-outline w-full">Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}
