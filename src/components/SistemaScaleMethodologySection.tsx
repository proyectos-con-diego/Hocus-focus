'use client';
import React from 'react';
import { scaleMethodology } from '@/data/sistema-scale';

export default function SistemaScaleMethodologySection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Metodología SCALE
          </h2>
          <p className="text-xl text-gray-400">
            El sistema de 5 pilares que convierte el caos en operación profesional
          </p>
        </div>
        
        <div className="bg-gray-800/80 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-sm">
          <h3 className="text-4xl font-black text-white text-center mb-4">SCALE</h3>
          <p className="text-xl text-purple-300 text-center mb-12">
            5 pilares integrados para digitalizar y centralizar tu negocio
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {scaleMethodology.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-700/50 rounded-2xl p-8 text-center border-2 border-transparent hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-4xl text-orange-400 font-black mb-4">{item.letter}</div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 