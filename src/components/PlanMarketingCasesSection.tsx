'use client';
import React from 'react';
import { cases } from '@/data/plan-marketing';

export default function PlanMarketingCasesSection() {
  return (
    <section className="cases-section py-20 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="section-header text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl font-extrabold text-white mb-4">
            Casos de Éxito Reales
          </h2>
          <p className="section-subtitle text-lg text-emerald-300 max-w-xl mx-auto">
            Resultados verificables de clientes que aplicaron la Metodología CONVERT
          </p>
        </div>
        {cases.map((caseStudy, i) => (
          <div key={i} className="case-card bg-gray-800/80 border border-gray-600 rounded-2xl p-12 mb-12 backdrop-blur-md">
            <div className="case-header flex flex-col md:flex-row items-center gap-6 mb-8 text-center md:text-left">
              <div className={`case-avatar w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white ${caseStudy.avatarStyle}`}>
                {caseStudy.avatar}
              </div>
              <div className="case-info flex-1">
                <h4 className="text-white text-xl font-bold mb-1">{caseStudy.title}</h4>
                <p className="text-gray-400">{caseStudy.subtitle}</p>
              </div>
              <div className={`case-industry ${caseStudy.industryColor} px-4 py-2 rounded-full text-sm font-semibold`}>
                {caseStudy.industry}
              </div>
            </div>
            <div className="results-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {caseStudy.metrics.map((metric, j) => (
                <div key={j} className="result-metric text-center bg-gray-700/50 rounded-lg p-6">
                  <div className="metric-number text-2xl md:text-3xl font-extrabold text-emerald-400 mb-1">
                    {metric.number}
                  </div>
                  <div className="metric-label text-gray-400 text-xs md:text-sm">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
            <blockquote className="case-quote italic text-lg text-gray-200 border-l-4 border-emerald-400 pl-6 my-8">
              "{caseStudy.quote}"
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
} 