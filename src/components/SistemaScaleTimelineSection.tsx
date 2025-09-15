'use client';
import React from 'react';
import { timeline } from '@/data/sistema-scale';

export default function SistemaScaleTimelineSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tu Transformación en 30 Días
          </h2>
          <p className="text-xl text-gray-400">
            Cronograma paso a paso de cómo implementamos el Sistema SCALE en tu negocio
          </p>
        </div>
        
        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start gap-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {item.number}
              </div>
              <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl p-8 flex-1">
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 