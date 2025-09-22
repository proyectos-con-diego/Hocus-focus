'use client';
import React from 'react';
import { heroData } from '../data/automatizacion-ia';
import StableRotatingHeadline from './StableRotatingHeadline';

export default function AutomatizacionIAHeroSection() {
  const titles = [
    "¿Y si tuvieras un empleado que trabaja 24/7 sin sueldo?",
    "¿Cuántas horas pierdes cada semana en tareas repetitivas?",
    "¿Y si tus facturas, propuestas y correos se enviaran solos?",
    "¿Qué harías con 8 horas extra cada semana?",
    "¿Tu negocio depende demasiado de tu tiempo?",
    "¿Y si pudieras enfocarte solo en clientes y olvidarte de lo operativo?"
  ];

  // Rotación con componente estable

  return (
    <section className="relative min-h-screen flex items-center px-6 py-8 bg-gradient-to-br from-purple-500/15 via-indigo-500/15 to-blue-500/15">
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent" style={{
        background: 'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)'
      }}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/30 border border-purple-500/40 rounded-full px-6 py-3 mb-8 inline-block animate-pulse">
          <p className="text-purple-300 text-sm font-bold uppercase tracking-wider">{heroData.badge}</p>
        </div>
        
        <StableRotatingHeadline
          phrases={titles}
          intervalMs={3000}
          className="text-5xl md:text-6xl font-black mb-6 leading-tight text-white text-center"
        />
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
          {heroData.subtitle}
        </p>
        
        <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
          {heroData.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span>✅</span> {feature}
            </div>
          ))}
        </div>
        
        <div className="mb-8">
          <a 
            href="#diagnostico" 
            className="inline-block px-12 py-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full font-black text-xl text-white uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-purple-500/40"
          >
            🤖 Quiero Automatizar Mi Negocio
          </a>
          <p className="text-purple-300 text-sm font-semibold mt-4">
            {heroData.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
} 