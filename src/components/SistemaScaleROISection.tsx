'use client';
import React from 'react';
import { roiData } from '@/data/sistema-scale';

export default function SistemaScaleROISection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-emerald-500/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            ROI Comprobado: Tu Inversión Se Paga Sola
          </h2>
          <p className="text-xl text-gray-400">
            Datos reales de ahorro y beneficios que obtienen los clientes con el Sistema SCALE
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roiData.map((roi, index) => (
            <div key={index} className="bg-gray-800/80 border border-gray-700/50 rounded-3xl p-12 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">{roi.title}</h3>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {roi.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="bg-gray-700/50 rounded-xl p-6">
                    <div className="text-3xl font-black text-orange-400 mb-2">{metric.value}</div>
                    <div className="text-gray-400 text-sm">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                <h4 className="text-orange-400 font-bold mb-2">Beneficio en 6 meses: {roi.benefit.amount}</h4>
                <p className="text-gray-300 text-sm">{roi.benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 