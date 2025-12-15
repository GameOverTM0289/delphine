'use client';

import { useState } from 'react';

const faqs = [
  { q: 'How do I find my size?', a: 'Check our size guide for detailed measurements. We recommend measuring yourself and comparing to our size chart.' },
  { q: 'What is your return policy?', a: 'We offer free returns within 30 days. Items must be unworn with tags attached.' },
  { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.' },
  { q: 'Are your products sustainable?', a: 'Yes! Our swimwear is made from recycled ocean plastics and sustainable materials.' },
  { q: 'How do I care for my swimwear?', a: 'Hand wash in cold water, avoid bleach, and lay flat to dry. Rinse after swimming in chlorinated or salt water.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries. International shipping rates vary by location.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">FAQ</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">Frequently asked questions.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-narrow">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center">
                  <span className="font-medium">{faq.q}</span>
                  <svg className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {open === i && <div className="px-6 pb-6 text-gray-600">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
