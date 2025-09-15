'use client';
import React, { useState } from 'react';

const faqs = [
  {
    question: "¿Qué incluye la sesión de diagnóstico de $35?",
    answer: "Incluye una sesión de 45–60 minutos para conocer tu negocio y, en las siguientes 48 horas, un documento con el análisis, un roadmap personalizado y la propuesta de implementación con presupuesto. El monto se descuenta si decides avanzar con el proyecto."
  },
  {
    question: "¿Cuál es la diferencia entre tus servicios y los asistentes virtuales IA?",
    answer: "Los servicios son proyectos personalizados que implemento contigo. Los asistentes IA son productos listos para usar, diseñados para ayudarte en tu día a día."
  },
  {
    question: "¿De verdad se pueden ahorrar 8–20 horas semanales?",
    answer: "Sí, el rango depende de cuántos procesos automatices. Lo mínimo que se suele liberar son 8 horas semanales (facturación, correos, seguimiento básico), y con sistemas más completos se llega a 20+."
  },
  {
    question: "¿Necesito conocimientos técnicos para usar tus sistemas?",
    answer: "No. Yo me encargo de configurarlos y entregártelos listos. Tú solo los usas con explicaciones claras y soporte inicial."
  },
  {
    question: "¿Qué pasa después de implementar?",
    answer: "Siempre incluyo capacitación 1:1 y 30 días de soporte directo para que no te quedes solo."
  }
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Preguntas Frecuentes</h2>
        <p className="text-center text-gray-400 mb-12">Las dudas que tendría yo si estuviera en tu lugar</p>
        <div className="space-y-4">
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
    </section>
  );
} 