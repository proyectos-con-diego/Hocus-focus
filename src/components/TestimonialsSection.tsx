import React from 'react';
import StarRating from './StarRating';

const testimonials = [
  {
    name: "María S.",
    role: "Emprendedora • 3 meses usando Jaime Daily",
    text: "Jaime Daily cambió completamente mi rutina matutina. En 30 días logré establecer 3 hábitos nuevos que llevaba años intentando mantener.",
    result: "3 hábitos nuevos establecidos, +2 horas productivas al día",
    color: '#4caf50',
    initial: 'M',
    rating: 5
  },
  {
    name: "Carlos R.",
    role: "Freelancer • 2 meses usando Midas",
    text: "Midas organizó completamente mis finanzas. Ahora sé exactamente dónde va mi dinero y he ahorrado 30% más que antes.",
    result: "30% más de ahorro, control total de gastos",
    color: '#ff9800',
    initial: 'C',
    rating: 5
  },
  {
    name: "Laura G.",
    role: "Diseñadora • 1 mes usando Vinxi",
    text: "Vinxi me ayudó a organizar mis proyectos creativos y no perder ninguna idea importante. Ahora avanzo mucho más rápido.",
    result: "+5 proyectos terminados, cero ideas perdidas",
    color: '#2196f3',
    initial: 'L',
    rating: 5
  },
  {
    name: "Esteban P.",
    role: "Ingeniero • 2 semanas usando Grilla Viralis",
    text: "Grilla Viralis hizo que cuidar mis plantas fuera sencillo y divertido. ¡Hasta mi familia se sumó al reto!",
    result: "jardín más sano, +3 plantas nuevas en casa",
    color: '#9c27b0',
    initial: 'E',
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#181a2a] to-[#10101a]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 text-white">Lo que dicen mis usuarios</h2>
        <p className="text-center text-gray-400 mb-12">Resultados reales de personas que usan mis agentes</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#23243a]/80 border border-white/10 rounded-2xl p-8 text-left backdrop-blur-md transition-all duration-300 hover:border-purple-400/30">
              <div className="flex items-center mb-5">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4" 
                  style={{background: testimonial.color}}
                >
                  {testimonial.initial}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  <StarRating rating={testimonial.rating} size="sm" className="mt-1" />
                </div>
              </div>
              <div className="italic text-gray-200 mb-4 opacity-90">{testimonial.text}</div>
              <div className="font-semibold text-green-400 text-sm">Resultado: {testimonial.result}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 