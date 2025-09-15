'use client';
import React from 'react';

export default function PlanMarketingForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Diagnóstico <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">CONVERT</span>
          </h2>
          <p className="text-red-300 text-xl mb-4">Plan de Marketing</p>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Reserva tu plan de marketing personalizado y transforma tu estrategia de conversión.
          </p>
        </div>
        <div className="w-full">
          <iframe
            src="https://tally.so/embed/w89MOP"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Formulario Diagnóstico CONVERT"
            className="rounded-xl"
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Al completar el formulario, te contactaré en las próximas 2 horas para coordinar tu llamada estratégica
          </p>
        </div>
      </div>
    </div>
  );
}
