'use client';
import React from 'react';
import { problems } from '@/data/plan-marketing';

export default function PlanMarketingProblemsSection() {
  return (
    <section className="problem-section py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="section-header text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-extrabold text-white mb-4">
            Tu marketing actual tiene estos problemas críticos
          </h2>
          <p className="section-subtitle text-lg text-gray-400 max-w-xl mx-auto">
            Estos errores te hacen perder oportunidades y dinero todos los días
          </p>
        </div>
        <div className="problems-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, i) => (
            <div 
              key={i} 
              className="problem-card bg-gray-800/80 border border-gray-600 rounded-xl p-8 text-center transition-all duration-300 hover:border-red-500/50 hover:-translate-y-1"
            >
              <div className="problem-icon text-4xl mb-2">{problem.icon}</div>
              <h3 className="problem-title text-lg font-bold text-white mb-2">{problem.title}</h3>
              <p className="problem-description text-gray-400">{problem.desc}</p>
            </div>
          ))}
        </div>
        <div className="cost-highlight bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center mt-12">
          <h3 className="text-red-500 text-2xl font-bold mb-2">💔 El Costo Real de un Marketing Desorganizado</h3>
          <p className="text-gray-200 text-lg">
            Un negocio sin estrategia de marketing clara pierde <strong>$3,000+ mensualmente</strong> en oportunidades perdidas, presupuesto mal invertido y tiempo desperdiciado. Eso son <strong>$36,000 anuales</strong> que podrían estar generando leads reales.
          </p>
        </div>
      </div>
    </section>
  );
} 