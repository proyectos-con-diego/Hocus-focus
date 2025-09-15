'use client';
import React from 'react';
import { automationCatalog } from '@/data/automatizacion-ia';

export default function AutomatizacionIACatalogSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Catálogo de Automatizaciones
          </h2>
          <p className="text-xl text-gray-400">
            Escoge 3 de estas 7 automatizaciones probadas para transformar tu negocio
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {automationCatalog.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-800/80 border border-purple-500/30 rounded-2xl p-8 hover:-translate-y-2 hover:border-purple-500/70 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    {item.difficulty}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">{item.desc}</p>
              <div className="bg-gray-700/50 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="text-purple-400 font-semibold text-sm mb-1">Ideal para:</div>
                <div className="text-gray-300 text-sm">{item.idealFor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 