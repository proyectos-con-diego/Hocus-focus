'use client';
import React from 'react';
import { caseStudies } from '@/data/automatizacion-ia';

export default function AutomatizacionIACaseStudiesSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-emerald-500/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Casos de Éxito Reales
          </h2>
          <p className="text-xl text-gray-400">
            Negocios tradicionales que automatizaron y transformaron su operación
          </p>
        </div>
        
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-800/80 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-2xl text-white font-bold">
                  {study.initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white">{study.name}</h4>
                  <p className="text-gray-400">{study.business}</p>
                </div>
                <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                  {study.industry}
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-gray-700/50 rounded-xl p-6 text-center">
                    <div className="text-3xl font-black text-purple-400 mb-2">{metric.number}</div>
                    <div className="text-gray-400 text-sm">{metric.label}</div>
                  </div>
                ))}
              </div>
              
              <blockquote className="italic text-lg text-gray-300 border-l-4 border-purple-500 pl-6">
                {study.quote}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 