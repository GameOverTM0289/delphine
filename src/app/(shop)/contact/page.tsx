'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-ivory-100">
        <div className="container-luxury text-center">
          <span className="label animate-fade-down">Get in Touch</span>
          <h1 className="heading-display mt-4 animate-fade-up">Contact</h1>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-ivory-200">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Contact Info - Left */}
            <div className="animate-slide-right">
              <h2 className="heading-2 mb-12">We&apos;d love to hear from you</h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="label mb-3">Email</h3>
                  <a href="mailto:hello@delphineswimwear.com" className="font-display text-xl text-charcoal-700 link-elegant">
                    hello@delphineswimwear.com
                  </a>
                </div>
                
                <div>
                  <h3 className="label mb-3">Phone</h3>
                  <a href="tel:+35569123456" className="font-display text-xl text-charcoal-700 link-elegant">
                    +355 69 123 4567
                  </a>
                </div>
                
                <div>
                  <h3 className="label mb-3">Location</h3>
                  <p className="font-display text-xl text-charcoal-700">
                    Tirana, Albania
                  </p>
                </div>
                
                <div>
                  <h3 className="label mb-3">Hours</h3>
                  <p className="body text-stone-500">
                    Monday – Friday<br />
                    9:00 AM – 6:00 PM CET
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="mt-16 pt-10 border-t border-stone-300">
                <h3 className="label mb-6">Follow Us</h3>
                <div className="flex gap-6">
                  <a href="#" className="body-sm text-stone-500 hover:text-charcoal-700 transition-colors tracking-widest uppercase">
                    Instagram
                  </a>
                  <a href="#" className="body-sm text-stone-500 hover:text-charcoal-700 transition-colors tracking-widest uppercase">
                    Pinterest
                  </a>
                  <a href="#" className="body-sm text-stone-500 hover:text-charcoal-700 transition-colors tracking-widest uppercase">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Form - Right */}
            <div className="animate-slide-left">
              <div className="bg-ivory-100 p-10 lg:p-12">
                <h3 className="heading-3 mb-10">Send a Message</h3>
                
                <form className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label block mb-3">First Name</label>
                      <input 
                        type="text" 
                        className="input-elegant"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="label block mb-3">Last Name</label>
                      <input 
                        type="text" 
                        className="input-elegant"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="label block mb-3">Email</label>
                    <input 
                      type="email" 
                      className="input-elegant"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="label block mb-3">Subject</label>
                    <select 
                      className="input-elegant bg-transparent appearance-none cursor-pointer"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Returns & Exchanges</option>
                      <option>Wholesale</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label block mb-3">Message</label>
                    <textarea 
                      className="input-elegant resize-none"
                      rows={5}
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
