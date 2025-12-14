'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('sent');
    setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80"
          alt="Contact us"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal-900/50" />
        <div className="relative text-center text-ivory-100 z-10 px-6">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-ivory-200">Get in Touch</span>
          <h1 className="font-display text-4xl md:text-5xl font-light mt-4">Contact</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28 bg-ivory-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal-800 mb-10">
                We&apos;d love to hear from you
              </h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-3">Email</h3>
                  <a 
                    href="mailto:hello@delphineswimwear.com" 
                    className="font-display text-xl text-charcoal-700 hover:text-charcoal-900 transition-colors"
                  >
                    hello@delphineswimwear.com
                  </a>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-3">Phone</h3>
                  <a 
                    href="tel:+35569123456" 
                    className="font-display text-xl text-charcoal-700 hover:text-charcoal-900 transition-colors"
                  >
                    +355 69 123 4567
                  </a>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-3">Location</h3>
                  <p className="font-display text-xl text-charcoal-700">Tirana, Albania</p>
                </div>
                
                <div>
                  <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-3">Hours</h3>
                  <p className="text-sm text-stone-600">
                    Monday – Friday<br />
                    9:00 AM – 6:00 PM CET
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="mt-14 pt-10 border-t border-stone-300">
                <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500 mb-6">Follow Us</h3>
                <div className="flex gap-6">
                  {['Instagram', 'Pinterest', 'Facebook'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="text-xs tracking-widest uppercase text-stone-500 hover:text-charcoal-700 transition-colors"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-ivory-100 p-8 md:p-12">
              <h3 className="font-display text-xl text-charcoal-800 mb-8">Send a Message</h3>
              
              {status === 'sent' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-2 border-charcoal-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-charcoal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display text-xl text-charcoal-800 mb-2">Message Sent</h4>
                  <p className="text-sm text-stone-500">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-medium tracking-widest uppercase text-stone-500 block mb-3">First Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-stone-300 text-charcoal-700 placeholder-stone-400 focus:outline-none focus:border-charcoal-700 transition-colors"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium tracking-widest uppercase text-stone-500 block mb-3">Last Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-stone-300 text-charcoal-700 placeholder-stone-400 focus:outline-none focus:border-charcoal-700 transition-colors"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium tracking-widest uppercase text-stone-500 block mb-3">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-stone-300 text-charcoal-700 placeholder-stone-400 focus:outline-none focus:border-charcoal-700 transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium tracking-widest uppercase text-stone-500 block mb-3">Subject</label>
                    <select 
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-stone-300 text-charcoal-700 focus:outline-none focus:border-charcoal-700 transition-colors appearance-none cursor-pointer"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Returns & Exchanges</option>
                      <option>Wholesale</option>
                      <option>Press</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium tracking-widest uppercase text-stone-500 block mb-3">Message</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="How can we help?"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-stone-300 text-charcoal-700 placeholder-stone-400 focus:outline-none focus:border-charcoal-700 transition-colors resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-charcoal-800 text-ivory-100 text-xs font-medium tracking-widest uppercase hover:bg-charcoal-900 transition-colors disabled:opacity-50"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
