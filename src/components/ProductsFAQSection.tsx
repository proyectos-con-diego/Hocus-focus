'use client';
import React, { useState } from 'react';
import { faqs } from '@/data/products';

export default function ProductsFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Preguntas Frecuentes</h2>
        <p className="text-center text-gray-400 mb-12">Todo lo que necesitas saber sobre mis asistentes</p>
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <button
                className="w-full text-left bg-gray-800 hover:bg-gray-700 rounded-xl p-6 transition-all duration-300 border border-gray-700 hover:border-purple-500/50"
                onClick={() => toggleFAQ(idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  <span className={`text-purple-400 text-2xl transform transition-transform duration-300 ${openFAQ === idx ? 'rotate-45' : ''}`}>+</span>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-gray-700/50 rounded-b-xl p-6 border-l-4 border-purple-500 mx-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 