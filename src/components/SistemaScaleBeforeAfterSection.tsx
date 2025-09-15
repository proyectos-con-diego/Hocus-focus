'use client';
import React from 'react';
import { painSolutions } from '@/data/sistema-scale';

export default function SistemaScaleBeforeAfterSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Del Caos al Control: Transformación Real
          </h2>
          <p className="text-xl text-gray-400">
            Cómo el Sistema SCALE resuelve cada problema específico de tu negocio
          </p>
        </div>
        
        <div className="bg-gray-800/80 border border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-6 text-orange-400 font-bold text-lg">Pain Point del Líder</th>
                <th className="text-left p-6 text-orange-400 font-bold text-lg">Solución SCALE</th>
                <th className="text-left p-6 text-orange-400 font-bold text-lg">Resultado Inmediato</th>
              </tr>
            </thead>
            <tbody>
              {painSolutions.map((item, index) => (
                <tr key={index} className="border-b border-gray-700/30">
                  <td className="p-6 text-red-400 italic">{item.pain}</td>
                  <td className="p-6 text-emerald-400 font-semibold">{item.solution}</td>
                  <td className="p-6 text-purple-400 font-semibold">{item.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
} 