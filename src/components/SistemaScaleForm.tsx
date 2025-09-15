'use client';
import React from 'react';

export default function SistemaScaleForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📈</div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Diagnóstico <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">SCALE</span>
          </h2>
          <p className="text-green-300 text-xl mb-4">Sistema de Escalamiento</p>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Evalúa tu negocio y descubre cómo implementar un sistema que crezca contigo.
          </p>
        </div>
        <div className="w-full">
          <iframe
            src="https://tally.so/embed/3jKvda"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Formulario Diagnóstico SCALE"
            className="rounded-xl"
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Al completar el diagnóstico, recibirás un plan personalizado de escalamiento
          </p>
        </div>
      </div>
    </div>
  );
}
