'use client';
import React from 'react';
import { problems } from '@/data/sistema-scale';

export default function SistemaScaleProblemsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            El caos operativo está frenando tu crecimiento
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Estos problemas cuestan dinero real cada día y limitan tu capacidad de escalar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="bg-gray-800/80 border border-gray-700/50 rounded-2xl p-8 text-center hover:border-orange-500/50 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4">{problem.title}</h3>
              <p className="text-gray-400 leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-orange-400 mb-4">💸 El Costo Real del Caos Operativo</h3>
          <p className="text-gray-300 text-lg">
            Un líder de equipo desorganizado pierde <strong>$2,000+ mensuales</strong> en ineficiencias, 
            proyectos retrasados y oportunidades perdidas. Sin un sistema, nunca podrás escalar realmente.
          </p>
        </div>
      </div>
    </section>
  );
} 