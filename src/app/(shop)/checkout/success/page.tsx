'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear cart on success
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main max-w-lg text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-8 bg-black rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-display text-2xl md:text-3xl mb-4">Thank You</h1>
        <p className="text-body mb-2">Your order has been placed successfully.</p>
        
        {orderNumber && (
          <p className="text-sm text-charcoal-600 mb-8">
            Order number: <span className="font-medium text-black">{orderNumber}</span>
          </p>
        )}

        <p className="text-body text-sm mb-10">
          We&apos;ve sent a confirmation email with your order details.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/account" className="btn-outline">
            View Orders
          </Link>
        </div>
      </div>
    </main>
  );
}
