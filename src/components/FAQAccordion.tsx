"use client";
import React, { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  accentColor?: string; // Ejemplo: 'purple', 'green', etc.
}

const colorMap: Record<string, { icon: string; left: string; ring: string }> = {
  purple: {
    icon: "text-purple-400",
    left: "border-purple-500",
    ring: "focus:ring-purple-500/40",
  },
  green: {
    icon: "text-green-400",
    left: "border-green-500",
    ring: "focus:ring-green-500/40",
  },
  yellow: {
    icon: "text-yellow-400",
    left: "border-yellow-500",
    ring: "focus:ring-yellow-500/40",
  },
};

export default function FAQAccordion({ faqs, accentColor = "purple" }: FAQAccordionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const accent = colorMap[accentColor] || colorMap.purple;

  const toggleFAQ = (idx: number) => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <button
              className={`w-full text-left bg-gray-800 rounded-xl p-6 transition-all duration-300 border border-gray-700 hover:border-purple-500/50 focus:border-purple-500/70 focus:outline-none focus:ring-2 ${accent.ring}`}
              onClick={() => toggleFAQ(idx)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <span className={`text-2xl ${accent.icon} transform transition-transform duration-300 ${openFAQ === idx ? 'rotate-45' : ''}`}>{openFAQ === idx ? '×' : '+'}</span>
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className={`bg-gray-700/50 rounded-b-xl p-6 mx-4 text-left`}>
                <p className="text-gray-300 text-left">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 