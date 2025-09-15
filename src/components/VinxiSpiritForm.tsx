'use client';
import React from 'react';

export default function VinxiSpiritForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦊</div>
          <h2 className="text-4xl font-bold text-white mb-2">
            VINXI <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Spirit</span>
          </h2>
          <p className="text-blue-300 text-xl mb-4">Espectro con TDAH</p>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Organiza tus ideas dispersas en planes claros y accionables.
          </p>
        </div>
        
        <div className="w-full">
          <iframe
            src="https://tally.so/embed/w4Z2LA"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Formulario Vinxi Spirit"
            className="rounded-xl"
          />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Al completar el formulario, recibirás el enlace directo a tu Spirit personalizado
          </p>
        </div>
      </div>
    </div>
  );
}
