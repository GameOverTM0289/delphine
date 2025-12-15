'use client';

import { useState } from 'react';
import { validateEmail } from '@/lib/utils';
import PhoneInput from '@/components/ui/PhoneInput';
import { FormField, Input, Select, Textarea } from '@/components/ui/FormField';

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', phoneCountry: 'AL', phonePrefix: '+355', subject: 'General Inquiry', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error || 'Invalid';
    if (!formData.message.trim()) newErrors.message = 'Required';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="heading-2 mb-4">Message Sent!</h1>
          <p className="text-gray-600 mb-8">We will get back to you within 24 hours.</p>
          <button onClick={() => setStatus('idle')} className="btn-primary">Send Another</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Contact Us</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">We would love to hear from you.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="heading-3 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4"><div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center"><span className="text-xl">📧</span></div><div><h3 className="font-medium mb-1">Email</h3><p className="text-gray-600">hello@delphineswimwear.com</p></div></div>
                <div className="flex items-start gap-4"><div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center"><span className="text-xl">📱</span></div><div><h3 className="font-medium mb-1">Phone</h3><p className="text-gray-600">+355 69 123 4567</p></div></div>
                <div className="flex items-start gap-4"><div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center"><span className="text-xl">📍</span></div><div><h3 className="font-medium mb-1">Address</h3><p className="text-gray-600">Tirana, Albania</p></div></div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="heading-4 mb-6">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="First Name" error={errors.firstName} required><Input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} error={!!errors.firstName} /></FormField>
                  <FormField label="Last Name" error={errors.lastName} required><Input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} error={!!errors.lastName} /></FormField>
                </div>
                <FormField label="Email" error={errors.email} required><Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} error={!!errors.email} /></FormField>
                <FormField label="Phone" helpText="Optional"><PhoneInput value={formData.phone} onChange={(v, c, p) => setFormData({...formData, phone: v, phoneCountry: c, phonePrefix: p})} defaultCountry="AL" /></FormField>
                <FormField label="Subject"><Select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}><option>General Inquiry</option><option>Order Support</option><option>Returns</option><option>Other</option></Select></FormField>
                <FormField label="Message" error={errors.message} required><Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="How can we help?" rows={5} error={!!errors.message} /></FormField>
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">{status === 'loading' ? 'Sending...' : 'Send Message'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
