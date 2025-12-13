'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, SHIPPING, TAX_RATE, getImageUrl } from '@/lib/utils';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email || '',
        firstName: session.user.firstName || '',
        lastName: session.user.lastName || '',
      }));
    }
  }, [session]);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shipping = shippingMethod === 'express' ? SHIPPING.EXPRESS : (subtotal >= SHIPPING.FREE_THRESHOLD ? 0 : SHIPPING.STANDARD);
  const tax = (subtotal + shipping) * TAX_RATE;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-ivory-100">
        <h1 className="heading-2 mb-6">Your bag is empty</h1>
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    router.push('/checkout/success');
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-ivory-200 pt-24 pb-16">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/shop" className="body-sm text-stone-500 hover:text-charcoal-700 transition-colors flex items-center gap-2">
            <span>←</span> Continue Shopping
          </Link>
          <Link href="/" className="font-display text-2xl text-charcoal-800">Delphine</Link>
          <div className="w-24" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Form */}
          <div className="space-y-10">
            {/* Contact */}
            <div className="bg-ivory-100 p-8">
              <h2 className="label mb-6">Contact</h2>
              <input
                type="email"
                required
                placeholder="Email address"
                className="input-elegant"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </div>

            {/* Shipping Address */}
            <div className="bg-ivory-100 p-8">
              <h2 className="label mb-6">Shipping Address</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" required placeholder="First name" className="input-elegant" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} />
                  <input type="text" required placeholder="Last name" className="input-elegant" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} />
                </div>
                <input type="text" required placeholder="Address" className="input-elegant" value={formData.address} onChange={(e) => updateField('address', e.target.value)} />
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" required placeholder="City" className="input-elegant" value={formData.city} onChange={(e) => updateField('city', e.target.value)} />
                  <input type="text" required placeholder="Postal code" className="input-elegant" value={formData.postalCode} onChange={(e) => updateField('postalCode', e.target.value)} />
                </div>
                <input type="tel" required placeholder="Phone" className="input-elegant" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-ivory-100 p-8">
              <h2 className="label mb-6">Shipping Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === 'standard' ? 'border-charcoal-700 bg-ivory-200' : 'border-stone-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border-2 ${shippingMethod === 'standard' ? 'border-charcoal-700 bg-charcoal-700' : 'border-stone-400'}`}>
                      {shippingMethod === 'standard' && <div className="w-full h-full rounded-full bg-ivory-100 scale-50" />}
                    </div>
                    <div>
                      <p className="body text-charcoal-700">Standard</p>
                      <p className="body-sm text-stone-500">5-7 business days</p>
                    </div>
                  </div>
                  <span className="body text-charcoal-700">{subtotal >= SHIPPING.FREE_THRESHOLD ? 'Free' : formatPrice(SHIPPING.STANDARD)}</span>
                </label>
                <label className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === 'express' ? 'border-charcoal-700 bg-ivory-200' : 'border-stone-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border-2 ${shippingMethod === 'express' ? 'border-charcoal-700 bg-charcoal-700' : 'border-stone-400'}`}>
                      {shippingMethod === 'express' && <div className="w-full h-full rounded-full bg-ivory-100 scale-50" />}
                    </div>
                    <div>
                      <p className="body text-charcoal-700">Express</p>
                      <p className="body-sm text-stone-500">2-3 business days</p>
                    </div>
                  </div>
                  <span className="body text-charcoal-700">{formatPrice(SHIPPING.EXPRESS)}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right - Summary */}
          <div>
            <div className="bg-ivory-100 p-8 sticky top-24">
              <h2 className="label mb-8">Order Summary</h2>
              
              <ul className="divide-y divide-stone-200 mb-8">
                {items.map((item) => (
                  <li key={item.variantId} className="py-4 flex gap-4">
                    <div className="relative w-20 aspect-[3/4] bg-ivory-200 flex-shrink-0">
                      <Image src={getImageUrl(item.productImage)} alt={item.productName} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal-700 text-ivory-100 text-[10px] flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="body text-charcoal-700 truncate">{item.productName}</p>
                      <p className="body-sm text-stone-500 mt-1">{item.variantName}</p>
                      <p className="body text-charcoal-700 mt-2">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 body text-stone-600 border-t border-stone-200 pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal-700">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-charcoal-700">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="text-charcoal-700">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-stone-200">
                  <span className="font-display text-lg text-charcoal-800">Total</span>
                  <span className="font-display text-lg text-charcoal-800">{formatPrice(total)}</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full mt-8 py-4">
                {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
              </button>

              <p className="body-sm text-stone-400 text-center mt-6">
                This is a demo store. No payment will be processed.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
