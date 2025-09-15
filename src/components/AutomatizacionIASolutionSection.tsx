'use client';
import React from 'react';
import { timeline } from '@/data/automatizacion-ia';

export default function AutomatizacionIASolutionSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-800 via-purple-500/10 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Proceso de Automatización en 6 Semanas
          </h2>
          <p className="text-xl text-gray-400">
            Te entrego 3 automatizaciones funcionando, sin complicaciones técnicas
          </p>
        </div>
        
        <div className="bg-gray-800/80 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-sm">
          <h3 className="text-4xl font-black text-white text-center mb-4">AUTOMATE STARTER</h3>
          <p className="text-xl text-purple-300 text-center mb-12">
            De manual a automatizado en 6 semanas
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className="bg-gray-700/50 rounded-2xl p-8 text-center border-2 border-transparent hover:border-purple-500/50 transition-all duration-300 relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.week}
                </div>
                <h4 className="text-lg font-bold text-white mb-2 mt-4">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 