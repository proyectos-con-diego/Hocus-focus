'use client';
import React, { useState } from 'react';
import { faqs } from '@/data/plan-marketing';

export default function PlanMarketingFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="faq-section py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="section-header text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-extrabold text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="section-subtitle text-lg text-gray-400 max-w-xl mx-auto">
            Resolvemos las dudas más comunes sobre el Plan de Marketing
          </p>
        </div>
        <div className="faq-container">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item mb-4">
              <button
                className={`faq-button w-full text-left bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer transition-all duration-300 flex justify-between items-center ${
                  openFAQ === i ? 'bg-gray-700 border-red-500/50' : 'hover:bg-gray-700 hover:border-red-500/50'
                }`}
                onClick={() => toggleFAQ(i)}
              >
                <div className="faq-header flex justify-between items-center w-full">
                  <h3 className="faq-question text-lg font-semibold text-white pr-4">{faq.q}</h3>
                  <span className={`faq-icon text-red-500 text-2xl transition-transform duration-300 ${
                    openFAQ === i ? 'rotate-45' : ''
                  }`}>+</span>
                </div>
              </button>
              <div className={`faq-content overflow-hidden transition-all duration-300 ${
                openFAQ === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="faq-answer bg-gray-700/50 rounded-b-xl p-6 border-l-4 border-red-500 mx-4">
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 