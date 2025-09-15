import React from 'react';
import { testimonials } from '@/data/products';
import StarRating from './StarRating';

export default function ProductsTestimonialsSection() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 text-white">Lo que dicen mis usuarios</h2>
        <p className="text-center text-gray-400 mb-12">Resultados reales de personas que usan mis asistentes</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-[#23243a]/80 border border-white/10 rounded-2xl p-8 text-left backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-purple-700/40 hover:to-pink-600/30"
            >
              <div className="flex items-center mb-5">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4"
                  style={{ background: testimonial.avatarColor }}
                >
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  <StarRating rating={5} size="sm" className="mt-1" />
                </div>
              </div>
              <div className="italic text-gray-200 mb-4 opacity-90">{testimonial.quote}</div>
              <div className="font-semibold text-green-400 text-sm">{testimonial.result}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 