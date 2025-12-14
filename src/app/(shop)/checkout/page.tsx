'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, getImageUrl } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'AL',
  });

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-cream">
        <div className="w-6 h-6 border border-charcoal-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-cream pt-28 pb-20">
        <div className="container-main max-w-lg text-center">
          <h1 className="text-display text-2xl mb-6">Your bag is empty</h1>
          <p className="text-body mb-8">Add some items to proceed to checkout.</p>
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const subtotal = getSubtotal();
  const shipping = 8.99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create order and initiate POK payment
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            name: item.productName,
          })),
          shipping: formData,
          subtotal,
          shippingCost: shipping,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // If POK returns a redirect URL, redirect to it
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        // Fallback: go to success page
        clearCart();
        router.push(`/checkout/success?order=${data.orderNumber}`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main">
        <h1 className="text-display text-2xl md:text-3xl text-center mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Left: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-sm tracking-wider uppercase mb-6">Contact</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="input-minimal w-full"
                />
              </div>

              <div>
                <h2 className="text-sm tracking-wider uppercase mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="input-minimal"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="input-minimal"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input-minimal w-full"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="input-minimal"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="input-minimal"
                    />
                  </div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="input-minimal w-full"
                  >
                    <option value="AL">Albania</option>
                    <option value="XK">Kosovo</option>
                    <option value="MK">North Macedonia</option>
                    <option value="ME">Montenegro</option>
                    <option value="RS">Serbia</option>
                    <option value="IT">Italy</option>
                    <option value="GR">Greece</option>
                    <option value="DE">Germany</option>
                    <option value="AT">Austria</option>
                    <option value="CH">Switzerland</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-minimal w-full"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Pay with POK'}
              </button>

              <p className="text-xs text-charcoal-500 text-center">
                Secure payment powered by POK
              </p>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:pl-8 lg:border-l border-charcoal-200">
            <h2 className="text-sm tracking-wider uppercase mb-6">Order Summary</h2>
            
            <ul className="space-y-4 mb-8">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <div className="relative w-16 h-20 bg-ivory-200 flex-shrink-0">
                    <Image
                      src={getImageUrl(item.productImage) || 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=400'}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal-700 text-white text-xs flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-black truncate">{item.productName}</p>
                    <p className="text-xs text-charcoal-500">{item.variantName}</p>
                  </div>
                  <p className="text-sm text-black">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>

            <div className="space-y-3 py-4 border-t border-charcoal-200">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
            </div>

            <div className="flex justify-between py-4 border-t border-charcoal-200">
              <span className="text-base">Total</span>
              <span className="text-base font-medium">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
