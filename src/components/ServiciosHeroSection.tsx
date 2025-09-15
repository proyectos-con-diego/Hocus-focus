'use client';
import React from 'react';
import { heroData } from '@/data/servicios';

export default function ServiciosHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center py-12 md:py-0">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-blue-500/20" />
      <div className="container mx-auto max-w-7xl px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Content */}
        <div>
          <div className="inline-block bg-purple-600/20 border border-purple-600/30 rounded-lg px-4 py-2 mb-6">
            <p className="text-purple-200 text-sm font-semibold">{heroData.badge}</p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {heroData.title}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {heroData.subtitle}
            </span>
            <br />
            <span className="text-white">que podrían</span>
            <br />
            <span className="text-white">automatizarse?</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            {heroData.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button 
              className="py-4 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
              onClick={() => {
                const serviciosSection = document.querySelector('[data-section="services"]');
                if (serviciosSection) {
                  serviciosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              🚀 Ver soluciones
            </button>
          </div>
          <div className="flex flex-wrap gap-6 text-base text-gray-300">
            {heroData.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="flex justify-center items-center">
          <div className="relative w-64 h-80 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-2xl rotate-6 animate-pulse" />
            <div className="relative bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-8 shadow-2xl -rotate-3 flex flex-col items-center justify-center h-full w-full transition-transform duration-500 ease-in-out hover:rotate-0">
              <div className="text-6xl animate-[float_6s_ease-in-out_infinite]">🚀</div>
              {/* Dots animados */}
              <span className="absolute top-4 left-4 w-3 h-3 rounded-full bg-yellow-400 animate-ping" />
              <span className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-green-400 animate-ping delay-200" />
              <span className="absolute top-1/2 left-2 w-3 h-3 rounded-full bg-pink-400 animate-ping delay-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 