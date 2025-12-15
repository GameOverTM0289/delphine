'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { formatPrice, SHIPPING, TAX_RATE, getImageUrl, validateEmail, validatePhone } from '@/lib/utils';
import PhoneInput from '@/components/ui/PhoneInput';
import { FormField, Input, Select } from '@/components/ui/FormField';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postalCode: string;
  phonePrefix: string;
  phoneCountry: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
}

const countries = [
  { code: 'AL', name: 'Albania' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BA', name: 'Bosnia & Herzegovina' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'XK', name: 'Kosovo' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'MT', name: 'Malta' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'TR', name: 'Turkey' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'AL',
    postalCode: '',
    phonePrefix: '+355',
    phoneCountry: 'AL',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shipping = shippingMethod === 'express' ? SHIPPING.EXPRESS : (subtotal >= SHIPPING.FREE_THRESHOLD ? 0 : SHIPPING.STANDARD);
  const tax = (subtotal + shipping) * TAX_RATE;
  const total = subtotal + shipping + tax;

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'email':
        const emailValidation = validateEmail(value);
        return emailValidation.valid ? undefined : emailValidation.error;
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.length < 2) return 'First name must be at least 2 characters';
        return undefined;
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.length < 2) return 'Last name must be at least 2 characters';
        return undefined;
      case 'address':
        if (!value.trim()) return 'Address is required';
        if (value.length < 5) return 'Please enter a valid address';
        return undefined;
      case 'city':
        if (!value.trim()) return 'City is required';
        return undefined;
      case 'country':
        if (!value) return 'Country is required';
        return undefined;
      case 'postalCode':
        if (!value.trim()) return 'Postal code is required';
        return undefined;
      case 'phone':
        const phoneValidation = validatePhone(value, formData.phoneCountry);
        return phoneValidation.valid ? undefined : phoneValidation.error;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormData)[] = ['email', 'firstName', 'lastName', 'address', 'city', 'country', 'postalCode', 'phone'];
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field as keyof FormErrors] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handlePhoneChange = (value: string, countryCode: string, prefix: string) => {
    setFormData((prev) => ({ ...prev, phone: value, phoneCountry: countryCode, phonePrefix: prefix }));
    if (touched.phone) {
      const phoneValidation = validatePhone(value, countryCode);
      setErrors((prev) => ({ ...prev, phone: phoneValidation.valid ? undefined : phoneValidation.error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach((key) => { allTouched[key] = true; });
    setTouched(allTouched);
    if (!validateForm()) {
      const firstErrorField = document.querySelector('.input-error, .error-message');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    router.push('/checkout/success');
  };

  if (items.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="heading-2 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some beautiful swimwear to get started.</p>
          <Link href="/shop" className="btn-primary">Browse Collection</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
            <Link href="/" className="font-display text-2xl font-medium">Delphine</Link>
            <div className="w-32" />
          </div>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="heading-2 text-center mb-8 lg:mb-12">Checkout</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 bg-ocean-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                  <h2 className="heading-5">Contact Information</h2>
                </div>
                <FormField label="Email Address" error={touched.email ? errors.email : undefined} required>
                  <Input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} onBlur={() => handleBlur('email')} placeholder="your@email.com" error={touched.email && !!errors.email} autoComplete="email" />
                </FormField>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 bg-ocean-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                  <h2 className="heading-5">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="First Name" error={touched.firstName ? errors.firstName : undefined} required>
                    <Input type="text" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} onBlur={() => handleBlur('firstName')} placeholder="John" error={touched.firstName && !!errors.firstName} autoComplete="given-name" />
                  </FormField>
                  <FormField label="Last Name" error={touched.lastName ? errors.lastName : undefined} required>
                    <Input type="text" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} onBlur={() => handleBlur('lastName')} placeholder="Doe" error={touched.lastName && !!errors.lastName} autoComplete="family-name" />
                  </FormField>
                </div>
                <FormField label="Address" error={touched.address ? errors.address : undefined} required>
                  <Input type="text" value={formData.address} onChange={(e) => updateField('address', e.target.value)} onBlur={() => handleBlur('address')} placeholder="Street address" error={touched.address && !!errors.address} autoComplete="street-address" />
                </FormField>
                <FormField label="Apartment, suite, etc." helpText="Optional">
                  <Input type="text" value={formData.apartment} onChange={(e) => updateField('apartment', e.target.value)} placeholder="Apt 4B" autoComplete="address-line2" />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="City" error={touched.city ? errors.city : undefined} required>
                    <Input type="text" value={formData.city} onChange={(e) => updateField('city', e.target.value)} onBlur={() => handleBlur('city')} placeholder="Tirana" error={touched.city && !!errors.city} autoComplete="address-level2" />
                  </FormField>
                  <FormField label="Country" error={touched.country ? errors.country : undefined} required>
                    <Select value={formData.country} onChange={(e) => updateField('country', e.target.value)} onBlur={() => handleBlur('country')} error={touched.country && !!errors.country} autoComplete="country">
                      <option value="">Select country</option>
                      {countries.map((country) => (<option key={country.code} value={country.code}>{country.name}</option>))}
                    </Select>
                  </FormField>
                  <FormField label="Postal Code" error={touched.postalCode ? errors.postalCode : undefined} required>
                    <Input type="text" value={formData.postalCode} onChange={(e) => updateField('postalCode', e.target.value)} onBlur={() => handleBlur('postalCode')} placeholder="1001" error={touched.postalCode && !!errors.postalCode} autoComplete="postal-code" />
                  </FormField>
                </div>
                <FormField label="Phone Number" error={touched.phone ? errors.phone : undefined} helpText="For delivery updates" required>
                  <PhoneInput value={formData.phone} onChange={handlePhoneChange} defaultCountry="AL" error={touched.phone ? errors.phone : undefined} placeholder="69 123 4567" />
                </FormField>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 bg-ocean-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                  <h2 className="heading-5">Shipping Method</h2>
                </div>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-ocean-500 bg-ocean-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${shippingMethod === 'standard' ? 'border-ocean-500' : 'border-gray-300'}`}>
                      {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-ocean-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Standard Shipping</p>
                      <p className="text-sm text-gray-500">5-7 business days</p>
                    </div>
                    <span className="font-medium">{subtotal >= SHIPPING.FREE_THRESHOLD ? <span className="text-green-600">Free</span> : formatPrice(SHIPPING.STANDARD)}</span>
                  </label>
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-ocean-500 bg-ocean-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${shippingMethod === 'express' ? 'border-ocean-500' : 'border-gray-300'}`}>
                      {shippingMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-ocean-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Express Shipping</p>
                      <p className="text-sm text-gray-500">2-3 business days</p>
                    </div>
                    <span className="font-medium">{formatPrice(SHIPPING.EXPRESS)}</span>
                  </label>
                </div>
              </div>

              <div className="bg-gradient-to-r from-ocean-50 to-ocean-100/50 rounded-2xl p-6 border border-ocean-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ocean-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-ocean-900 mb-1">Demo Mode</h3>
                    <p className="text-sm text-ocean-700">This is a demo store. No real payment will be processed.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="heading-5 mb-6">Order Summary</h2>
                <ul className="divide-y divide-gray-100 mb-6 max-h-[320px] overflow-y-auto scrollbar-thin">
                  {items.map((item) => (
                    <li key={item.variantId} className="py-4 flex gap-4">
                      <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={getImageUrl(item.productImage)} alt={item.productName} fill className="object-cover" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-ocean-600 text-white text-xs flex items-center justify-center rounded-full font-medium">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{item.productName}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.variantName}</p>
                        <p className="text-sm font-medium text-gray-900 mt-2">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Discount code" className="input-field flex-1" />
                    <button type="button" className="btn-outline px-4">Apply</button>
                  </div>
                </div>
                <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Shipping</span><span className="font-medium">{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Tax (20%)</span><span className="font-medium">{formatPrice(tax)}</span></div>
                  <div className="flex justify-between text-lg font-medium pt-3 border-t border-gray-100"><span>Total</span><span>{formatPrice(total)}</span></div>
                </div>
                <button type="submit" disabled={loading} className="btn-ocean w-full mt-6 py-4 text-base font-medium">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      Processing...
                    </span>
                  ) : `Place Order • ${formatPrice(total)}`}
                </button>
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-100 text-gray-500 text-xs">
                  <span>🔒 Secure</span>
                  <span>↩️ Easy Returns</span>
                  <span>🚚 Fast Shipping</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
