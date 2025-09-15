'use client';
import React from 'react';
import { included, implementationOptions } from '@/data/plan-marketing';

export default function PlanMarketingIncludedSection() {
  return (
    <section className="included-section py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="section-header text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-extrabold text-white mb-4">
            Qué Incluye Tu Plan de Marketing
          </h2>
          <p className="section-subtitle text-lg text-gray-400 max-w-xl mx-auto">
            Estrategia completa + opciones de implementación coordinada para resultados reales
          </p>
        </div>
        <div className="included-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {included.map((item, i) => (
            <div 
              key={i} 
              className="included-item bg-gray-800/60 border border-gray-600 rounded-lg p-6 flex items-start gap-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-gray-800/80"
            >
              <div className="check-icon text-emerald-400 text-2xl mt-1">✅</div>
              <div className="item-content flex-1">
                <h4 className="text-white font-bold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <div className="value-tag bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-3 py-1 rounded-full text-xs font-semibold ml-auto">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        
        {/* Implementación Opcional */}
        <div className="implementation-section mt-16 text-center">
          <div className="implementation-container bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="implementation-title text-red-500 text-2xl font-bold mb-2">
              🚀 Implementación Opcional Coordinada
            </h3>
            <p className="implementation-description text-gray-200 mb-4">
              ¿Quieres que coordine la implementación completa? Te presento opciones transparentes desde el inicio:
            </p>
            <div className="implementation-grid grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {implementationOptions.map((opt, i) => (
                <div key={i} className="implementation-option bg-gray-700/50 rounded-lg p-4">
                  <div className={`option-name text-lg font-bold mb-1 ${opt.color}`}>{opt.name}</div>
                  <div className="option-price text-gray-400 text-sm">{opt.price}</div>
                </div>
              ))}
            </div>
            <p className="implementation-note text-gray-400 text-xs mt-4">
              * Costos transparentes incluidos en tu estrategia - Tú decides si implementas solo o conmigo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 