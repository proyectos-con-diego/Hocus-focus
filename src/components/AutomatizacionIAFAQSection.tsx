'use client';
import React, { useState } from 'react';
import { faqs } from '@/data/automatizacion-ia';

export default function AutomatizacionIAFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleFAQToggle = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-400">
            Resolvemos las dudas más comunes sobre automatización para negocios tradicionales
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                className="w-full text-left bg-gray-800 hover:bg-gray-700 rounded-xl p-6 transition-all duration-300 border border-gray-700 hover:border-purple-500/70"
                onClick={() => handleFAQToggle(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <span className={`text-purple-400 text-2xl transform transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-45' : ''
                  }`}>+</span>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="bg-gray-700/50 rounded-b-xl p-6 border-l-4 border-purple-500 mx-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 