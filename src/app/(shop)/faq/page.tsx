'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.' },
      { q: 'Do you offer free shipping?', a: 'Yes! Free standard shipping on all orders over €100 within Europe.' },
      { q: 'How can I track my order?', a: 'Once shipped, you\'ll receive an email with tracking information.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 14 days of delivery for unworn items with tags attached.' },
      { q: 'How do I exchange an item?', a: 'Start a return through your account and select "exchange" as the reason.' },
      { q: 'How long do refunds take?', a: 'Refunds are processed within 3-5 business days after we receive your return.' },
    ],
  },
  {
    category: 'Products & Sizing',
    questions: [
      { q: 'How do I find my size?', a: 'Check our Size Guide for detailed measurements. If between sizes, we recommend sizing up.' },
      { q: 'What materials do you use?', a: 'Premium Italian Lycra with UPF 50+ protection, chlorine-resistant and quick-drying.' },
      { q: 'How do I care for my swimwear?', a: 'Rinse in cold water after each use, hand wash with mild soap, lay flat to dry.' },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <>
      <section className="pt-32 pb-16 bg-ivory-100">
        <div className="container-luxury text-center">
          <span className="label animate-fade-down">Support</span>
          <h1 className="heading-display mt-4 animate-fade-up">FAQ</h1>
        </div>
      </section>

      <section className="section bg-ivory-200">
        <div className="container-narrow">
          {faqs.map((category, catIndex) => (
            <div key={category.category} className="mb-16 last:mb-0">
              <h2 className="label text-charcoal-700 mb-8">{category.category}</h2>
              <div className="space-y-2">
                {category.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={key} className="bg-ivory-100">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-display text-lg text-charcoal-800 pr-4">{item.q}</span>
                        <span className={`text-charcoal-400 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
                        <p className="px-6 pb-6 body text-stone-500">{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="mt-20 p-12 bg-charcoal-800 text-ivory-100 text-center">
            <h3 className="font-display text-2xl font-light mb-4">Still have questions?</h3>
            <p className="body text-stone-400 mb-8">Our team is here to help.</p>
            <Link href="/contact" className="btn-outline border-ivory-100 text-ivory-100 hover:bg-ivory-100 hover:text-charcoal-800">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
