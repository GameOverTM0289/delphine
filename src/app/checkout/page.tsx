'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, STORE_CONFIG } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shipping = subtotal >= STORE_CONFIG.freeShippingThreshold ? 0 : STORE_CONFIG.standardShipping;
  const tax = (subtotal + shipping) * STORE_CONFIG.taxRate;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <section className="section mt-16">
        <div className="container-narrow text-center">
          <h1 className="heading-2 mb-4">Your cart is empty</h1>
          <p className="body-text text-black/70 mb-8">Add some items to your cart to checkout.</p>
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section mt-16">
      <div className="container-custom">
        <h1 className="heading-2 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-4 mb-6">Contact Information</h2>
            <form className="space-y-4">
              <input type="email" className="input-field" placeholder="Email" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" className="input-field" placeholder="First name" />
                <input type="text" className="input-field" placeholder="Last name" />
              </div>
              <input type="text" className="input-field" placeholder="Address" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" className="input-field" placeholder="City" />
                <input type="text" className="input-field" placeholder="Postal code" />
              </div>
              <input type="text" className="input-field" placeholder="Phone" />
              <button type="submit" className="btn-primary w-full mt-6">Place Order</button>
            </form>
          </div>

          <div className="bg-cream p-6">
            <h2 className="heading-4 mb-6">Order Summary</h2>
            <ul className="divide-y divide-black/10">
              {items.map((item) => (
                <li key={`${item.productId}-${item.colorId}-${item.sizeId}`} className="py-4 flex gap-4">
                  <div className="relative w-16 h-20 bg-white flex-shrink-0">
                    <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.productName}</p>
                    <p className="text-xs text-black/60">{item.colorName} / {item.sizeName}</p>
                  </div>
                  <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="border-t border-black/10 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (20%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t border-black/10">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
