'use client';
import React, { useState } from 'react';
import { faqsData } from '@/data/sobre-mi';

export default function SobreMiFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          <span className="text-white">Preguntas</span>{' '}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Frecuentes
          </span>
        </h2>
        <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Las dudas que tendría yo si estuviera en tu lugar
        </p>
        <div className="space-y-4">
          {faqsData.map((faq, idx) => (
            <div key={idx}>
              <button
                className="w-full text-left bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:from-gray-700/50 hover:to-gray-800/50 rounded-xl p-6 transition-all duration-300 border border-gray-700/50 hover:border-cyan-400/50"
                onClick={() => toggleFAQ(idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <span className={`text-cyan-400 text-2xl transform transition-transform duration-300 ${openFAQ === idx ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-700/30 backdrop-blur-sm rounded-b-xl p-6 border-l-4 border-cyan-400 mx-4">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 