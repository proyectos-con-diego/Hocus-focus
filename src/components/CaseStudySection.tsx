'use client';
import React from 'react';
import { caseStudyData } from '@/data/servicios';

export default function CaseStudySection() {
  return (
    <section className="case-study py-20 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3 text-center">Caso de Estudio Real</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 text-center">Transformamos la presencia digital de una empresa local</p>
        <div className="bg-gray-800/80 rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700 backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Problema, Solución, Implementación */}
            <div>
              <div className="mb-6 p-5 rounded-xl bg-red-500/10 border border-red-500/30">
                <h4 className="text-lg font-bold text-red-300 mb-2 flex items-center gap-2">
                  {caseStudyData.problem.title}
                </h4>
                <p className="text-gray-200 mb-2">{caseStudyData.problem.description}</p>
                <ul className="text-sm text-red-200 list-disc pl-5">
                  {caseStudyData.problem.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6 p-5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <h4 className="text-lg font-bold text-blue-300 mb-2 flex items-center gap-2">
                  {caseStudyData.solution.title}
                </h4>
                <p className="text-gray-200 mb-2">{caseStudyData.solution.description}</p>
                <ul className="text-sm text-blue-200 list-disc pl-5">
                  {caseStudyData.solution.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6 p-5 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <h4 className="text-lg font-bold text-yellow-300 mb-2 flex items-center gap-2">
                  {caseStudyData.implementation.title}
                </h4>
                <ul className="text-sm text-yellow-200 list-disc pl-5">
                  {caseStudyData.implementation.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Resultados */}
            <div className="flex flex-col gap-8 justify-center">
              <h4 className="text-2xl font-bold text-green-400 mb-2">{caseStudyData.results.title}</h4>
              {caseStudyData.results.metrics.map((metric, index) => (
                <div key={index} className="bg-gray-900/80 rounded-xl p-5 border border-gray-700 mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white">{metric.name}</span>
                    <span className="font-bold text-green-400">{metric.percentage}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-400">{metric.before}</div>
                      <div className="text-xs text-gray-400">Antes</div>
                    </div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full" 
                        style={{ width: metric.width }} 
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">{metric.after}</div>
                      <div className="text-xs text-gray-400">Después</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{metric.unit}</div>
                </div>
              ))}
              <div className="text-center mt-4">
                <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition">
                  🚀 Quiero resultados similares
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 