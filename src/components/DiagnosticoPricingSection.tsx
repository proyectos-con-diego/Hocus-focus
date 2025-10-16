'use client';
import React, { useState, useEffect } from 'react';
import { diagnosticoPricingData, diagnosticoBonuses } from '@/data/plan-marketing';

export default function DiagnosticoPricingSection() {
  const [timer, setTimer] = useState({ days: 7, hours: 14, minutes: 23, seconds: 45 });

  useEffect(() => {
    const deadline = Date.now() + 7*24*60*60*1000 + 14*60*60*1000 + 23*60*1000 + 45*1000;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(deadline - now, 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimer({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDiagnosticoClick = () => {
    const formSection = document.getElementById('formulario');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="diagnostico-pricing" className="pricing-section py-20 bg-gradient-to-br from-gray-900 to-black relative">
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="pricing-container relative z-10 max-w-2xl mx-auto">
        <div className="pricing-card bg-gray-800/90 border-2 border-red-500/50 rounded-3xl p-12 text-center backdrop-blur-xl shadow-2xl">
          <div className="pricing-badge bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-3 rounded-full font-bold text-sm uppercase mb-8 inline-block">
            {diagnosticoPricingData.badge}
          </div>
          <h2 className="pricing-title text-white text-2xl font-bold mb-4">{diagnosticoPricingData.title}</h2>
          
          <div className="price-container mb-6">
            <div className="price-comparison flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-2">
              <span className="price-old text-xl text-gray-400 line-through">{diagnosticoPricingData.oldPrice}</span>
              <span className="price-save bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                Ahorras {diagnosticoPricingData.savings}
              </span>
            </div>
            <div className="price-main text-5xl font-black text-white mb-2">{diagnosticoPricingData.currentPrice}</div>
          </div>
          
          <div className="payment-terms text-gray-200 mb-6">{diagnosticoPricingData.paymentTerms}</div>
          
          <div className="guarantee-box bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 my-6">
            <h4 className="text-emerald-400 font-bold mb-2">{diagnosticoPricingData.guarantee.title}</h4>
            <p className="text-gray-200 text-sm">{diagnosticoPricingData.guarantee.description}</p>
          </div>
          
          {/* Timer */}
          <div className="countdown-timer bg-black/80 rounded-xl p-6 my-6 text-center">
            <div className="timer-title text-red-500 font-bold mb-2">⏰ Oferta Expira En:</div>
            <div className="timer-display flex justify-center gap-4">
              <div className="timer-unit bg-gray-800 rounded-lg p-4 min-w-[60px]">
                <div className="timer-number text-white text-2xl font-bold">
                  {String(timer.days).padStart(2, '0')}
                </div>
                <div className="timer-label text-gray-400 text-xs uppercase">Días</div>
              </div>
              <div className="timer-unit bg-gray-800 rounded-lg p-4 min-w-[60px]">
                <div className="timer-number text-white text-2xl font-bold">
                  {String(timer.hours).padStart(2, '0')}
                </div>
                <div className="timer-label text-gray-400 text-xs uppercase">Horas</div>
              </div>
              <div className="timer-unit bg-gray-800 rounded-lg p-4 min-w-[60px]">
                <div className="timer-number text-white text-2xl font-bold">
                  {String(timer.minutes).padStart(2, '0')}
                </div>
                <div className="timer-label text-gray-400 text-xs uppercase">Min</div>
              </div>
              <div className="timer-unit bg-gray-800 rounded-lg p-4 min-w-[60px]">
                <div className="timer-number text-white text-2xl font-bold">
                  {String(timer.seconds).padStart(2, '0')}
                </div>
                <div className="timer-label text-gray-400 text-xs uppercase">Seg</div>
              </div>
            </div>
          </div>
          
          {/* Bonos */}
          <div className="bonuses-section my-8">
            <h4 className="bonuses-title text-white text-xl font-bold mb-6">🎁 Bonos Limitados (Solo 5 cupos)</h4>
            {diagnosticoBonuses.map((bonus, i) => (
              <div key={i} className="bonus-item bg-gray-700/50 border border-purple-500/30 rounded-lg p-4 mb-2 flex justify-between items-center">
                <div className="bonus-content flex-1">
                  <h5 className="text-white font-semibold mb-1">{bonus.title}</h5>
                  <p className="text-gray-400 text-sm">{bonus.desc}</p>
                </div>
                <div className="bonus-value bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  {bonus.value}
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-value bg-red-500/10 border border-red-500/30 rounded-xl p-6 my-6">
            <h4 className="text-red-500 text-lg font-bold mb-2">💰 Valor Total del Paquete: {diagnosticoPricingData.totalValue}</h4>
            <p className="text-gray-200">
              Hoy pagas solo <strong>{diagnosticoPricingData.currentPrice}</strong> - Ahorras {diagnosticoPricingData.totalSavings}
            </p>
          </div>
          
          <button 
            onClick={handleDiagnosticoClick}
            className="btn-primary pricing-cta w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full font-extrabold text-lg text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-block uppercase tracking-wider my-4"
            aria-label="Reservar diagnóstico de marketing"
          >
            🚀 SÍ, QUIERO MI DIAGNÓSTICO
          </button>
          
          <div className="pricing-features text-center text-gray-400 text-sm mt-4">
            {diagnosticoPricingData.features.map((feature, index) => (
              <p key={index}>{feature}</p>
            ))}
          </div>
          
          {/* Footnote */}
          <div className="footnote text-center text-gray-500 text-xs mt-6">
            {diagnosticoPricingData.footnote}
          </div>
        </div>
      </div>
    </section>
  );
}
