'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How do I find my size?',
    answer: 'We recommend checking our Size Guide for detailed measurements. Our swimwear generally fits true to size. If you\'re between sizes, we suggest sizing up for a more relaxed fit.',
  },
  {
    question: 'What materials do you use?',
    answer: 'We use premium Italian fabrics including 80% Recycled Polyamide and 20% Elastane. Our materials offer UPF 50+ sun protection and are resistant to chlorine and salt water.',
  },
  {
    question: 'How should I care for my swimwear?',
    answer: 'Hand wash in cold water after each use. Avoid wringing or twisting. Lay flat to dry away from direct sunlight. Do not use bleach or fabric softener.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship worldwide. Delivery times vary by location: 1-2 days for Albania, 3-5 days for Europe, 5-7 days for USA & Canada, and 7-14 days for the rest of the world.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached. For hygiene reasons, items with removed hygiene seals cannot be returned.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a confirmation email with a tracking number. Use this number on our shipping partner\'s website to track your package.',
  },
  {
    question: 'Do you offer gift wrapping?',
    answer: 'Yes, we offer complimentary gift wrapping on all orders. Simply select the gift wrap option at checkout and include a personalized message.',
  },
  {
    question: 'How can I contact customer service?',
    answer: 'You can reach us at hello@delphineswimwear.com or call +355 69 444 4818. Our team is available Monday to Friday, 9am to 6pm CET.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-cream pt-28 pb-20">
      <div className="container-main max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-display text-3xl md:text-4xl mb-4">FAQ</h1>
          <p className="text-body">
            Find answers to commonly asked questions.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-sm font-medium pr-4">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-6 text-body text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <p className="text-body mb-6">Still have questions?</p>
          <a href="mailto:hello@delphineswimwear.com" className="btn-outline">
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
