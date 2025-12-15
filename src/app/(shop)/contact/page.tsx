'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80"
          alt="Contact"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center text-white z-10 px-6">
          <p className="text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h1 className="text-display text-4xl md:text-5xl">Contact</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Info */}
            <div>
              <h2 className="text-display text-2xl mb-8">We&apos;d Love to Hear From You</h2>
              <p className="text-body mb-10">
                Whether you have a question about our products, need help with an order, 
                or just want to say hello, we&apos;re here for you.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase mb-2">Email</h3>
                  <a href="mailto:hello@delphineswimwear.com" className="text-body hover:text-black transition-colors">
                    hello@delphineswimwear.com
                  </a>
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase mb-2">Phone</h3>
                  <a href="tel:+355694444818" className="text-body hover:text-black transition-colors">
                    +355 69 444 4818
                  </a>
                </div>
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase mb-2">Instagram</h3>
                  <a 
                    href="https://instagram.com/delphine.swimwear" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-body hover:text-black transition-colors"
                  >
                    @delphine.swimwear
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="input-minimal"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="input-minimal"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="input-minimal"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="input-minimal resize-none"
                  />
                </div>
                
                {status === 'success' && (
                  <p className="text-sm text-green-600">Thank you! We&apos;ll be in touch soon.</p>
                )}
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
