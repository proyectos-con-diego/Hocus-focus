'use client';
import React, { useState, useEffect } from 'react';
import StableRotatingHeadline from './StableRotatingHeadline';
import { heroData } from '../data/sistema-scale';

export default function SistemaScaleHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const titles = [
    "¿Tu equipo trabaja en el caos?",
    "¿Tu negocio crece más lento de lo que debería?",
    "¿Tu equipo depende de ti para todo?",
    "¿Sigues apagando incendios en lugar de liderar?",
    "¿Tu equipo trabaja mucho pero avanza poco?",
    "¿El desorden interno ya te está costando clientes?"
  ];

  useEffect(() => {
    // Simular carga de datos para evitar layout shift
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center px-6 py-8 bg-gradient-to-br from-orange-500/15 via-purple-500/15 to-blue-500/15">
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent" style={{
        background: 'radial-gradient(circle at 30% 40%, rgba(245, 158, 11, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)'
      }}></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge con altura fija para evitar layout shift */}
        <div className="urgency-badge-container mb-8" style={{ minHeight: '3rem' }}>
          {isLoaded ? (
            <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/30 border border-orange-500/40 rounded-full px-6 py-3 inline-block animate-pulse">
              <p className="text-orange-300 text-sm font-bold uppercase tracking-wider">{heroData.badge}</p>
            </div>
          ) : (
            <div className="bg-gray-700/30 border border-gray-600/40 rounded-full px-6 py-3 inline-block">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Cargando...</p>
            </div>
          )}
        </div>
        
        <StableRotatingHeadline
          phrases={titles}
          intervalMs={3000}
          className="text-5xl md:text-6xl font-black mb-6 leading-tight text-white text-center"
        />
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
          Organiza tu equipo de y detecta lo que frena tu crecimiento.
        </p>
        
        <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <span>✅</span> Visibilidad real de tu negocio
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <span>✅</span> Plan de acción inmediato
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <span>✅</span> Escalabilidad garantizada
          </div>
        </div>
        
        <div className="mb-8">
          <button 
            onClick={() => {
              const element = document.getElementById('diagnostico');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-block px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-black text-xl text-white uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-orange-500/40"
          >
            🚀 QUIERO MI DIAGNÓSTICO SCALE
          </button>
          <p className="text-purple-300 text-sm font-semibold mt-4">
            💎 Garantía: Un plan concreto para implementar SCALE o te devuelvo el 100%.
          </p>
        </div>
      </div>
    </section>
  );
} 