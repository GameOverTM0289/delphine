'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { generateOrderNumber } from '@/lib/utils';

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    setOrderNumber(generateOrderNumber());
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white pt-20 pb-16">
      <div className="container-narrow text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-checkmark">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="heading-2 mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-2">Your order has been placed successfully.</p>
        {orderNumber && (
          <p className="text-sm text-gray-500 mb-8">Order Number: <span className="font-mono font-medium text-gray-900">{orderNumber}</span></p>
        )}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 max-w-md mx-auto">
          <h2 className="font-medium mb-4">What happens next?</h2>
          <ul className="text-sm text-gray-600 space-y-3 text-left">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
              <span>You will receive an order confirmation email shortly.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
              <span>We will notify you when your order ships.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
              <span>Track your package with the link in your shipping email.</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
