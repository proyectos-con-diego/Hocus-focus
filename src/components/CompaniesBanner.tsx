'use client';
import React from 'react';

export default function CompaniesBanner() {
  const companies = [
    { name: 'Rayo', logo: '/Empresas/1. Rayo.png' },
    { name: 'SPH', logo: '/Empresas/2. SPH.png' },
    { name: 'BEAT', logo: '/Empresas/3. BEAT.png' },
    { name: 'Rextie', logo: '/Empresas/4. Rextie.png' }
  ];

  return (
    <section className="py-8 bg-gray-900/20 border-y border-gray-800/50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm mb-4">Han confiado en mi trabajo:</p>
        <div className="flex justify-center items-center gap-16 opacity-70 flex-wrap">
          {companies.map((company, index) => (
            <img 
              key={index}
              src={company.logo} 
              alt={`Logo ${company.name}`} 
              className="h-28 w-auto grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300" 
            />
          ))}
        </div>
      </div>
    </section>
  );
} 