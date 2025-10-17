'use client';
import React, { useState, useEffect } from 'react';
import { heroData } from '../data/plan-marketing';
import StableRotatingHeadline from './StableRotatingHeadline';

export default function PlanMarketingHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const titles = [
    "¿Tu marketing parece más un gasto que una inversión?",
    "¿Cansado de probar tácticas sin ver resultados claros?",
    "¿Sigues sin tener leads consistentes cada mes?",
    "¿No sabes cuánto invertir ni en qué canales?",
    "¿Sientes que tu negocio ya creció, pero tu marketing se quedó atrás?"
  ];

  useEffect(() => {
    // Simular carga de datos para evitar layout shift
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero relative min-h-screen flex items-center px-6 py-12 bg-gradient-to-br from-red-500/15 via-purple-600/15 to-blue-500/15">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[30%] top-[40%] w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute right-[10%] top-[20%] w-80 h-80 bg-purple-500/20 rounded-full blur-2xl" />
      </div>
      <div className="hero-content relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge con altura fija para evitar layout shift */}
        <div className="urgency-badge-container mb-8" style={{ minHeight: '3rem' }}>
          {isLoaded ? (
            <div className="urgency-badge bg-gradient-to-r from-red-500/20 to-red-700/30 border border-red-500/40 rounded-full px-6 py-3 inline-block animate-pulse">
              <p className="text-red-300 text-sm font-bold uppercase tracking-wider">{heroData.badge}</p>
            </div>
          ) : (
            <div className="urgency-badge bg-gray-700/30 border border-gray-600/40 rounded-full px-6 py-3 inline-block">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">Cargando...</p>
            </div>
          )}
        </div>
        <StableRotatingHeadline
          phrases={titles}
          intervalMs={3000}
          className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight text-center"
        />
        <p className="hero-subtitle text-xl md:text-2xl text-gray-200 mb-8 font-medium">
          {heroData.subtitle}
        </p>
        <div className="social-proof flex flex-wrap justify-center items-center gap-6 mb-8">
          {heroData.features.map((feature: string, index: number) => (
            <div key={index} className="proof-item flex items-center gap-2 text-emerald-400 font-semibold">
              <span>✅</span> {feature}
            </div>
          ))}
        </div>
        <div className="cta-container mb-4">
          <button 
            onClick={() => {
              const element = document.getElementById('diagnostico');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-primary px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full font-extrabold text-lg text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-block uppercase tracking-wider"
          >
            🚀 QUIERO MI DIAGNÓSTICO DE MARKETING
          </button>
          <p className="guarantee-text text-purple-300 text-sm font-semibold mt-4">
            {heroData.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
} 