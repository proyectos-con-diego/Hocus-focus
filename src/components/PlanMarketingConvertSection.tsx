'use client';
import React from 'react';
import { convertSteps } from '@/data/plan-marketing';

export default function PlanMarketingConvertSection() {
  return (
    <section className="solution-section py-20 bg-gradient-to-br from-gray-900 via-purple-600/10 to-gray-900">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="section-header text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-extrabold text-white mb-4">
            Metodología CONVERT
          </h2>
          <p className="section-subtitle text-lg text-purple-300 max-w-xl mx-auto">
            Mi sistema de 6 pasos basado en +10 años transformando estrategias de marketing
          </p>
        </div>
        <div className="methodology-container bg-gray-800/80 border border-purple-500/30 rounded-2xl p-12 backdrop-blur-md">
          <h3 className="methodology-title text-3xl font-extrabold text-white text-center mb-2">CONVERT</h3>
          <p className="methodology-subtitle text-purple-300 text-center mb-8">
            6 fases para transformar tu marketing de amateur a profesional
          </p>
          <div className="steps-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {convertSteps.map((step, i) => (
              <div 
                key={i} 
                className="step-card bg-gray-700/50 rounded-xl p-8 text-center relative border-2 border-transparent transition-all duration-300 hover:border-purple-500/50"
              >
                <div className="step-number absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {i+1}
                </div>
                <div className="step-letter text-3xl text-purple-400 font-extrabold mb-2">{step.letter}</div>
                <h4 className="step-title text-lg font-bold text-white mb-1">{step.title}</h4>
                <p className="step-description text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 