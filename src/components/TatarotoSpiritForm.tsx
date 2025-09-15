'use client';
import React from 'react';

export default function TatarotoSpiritForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔮</div>
          <h2 className="text-4xl font-bold text-white mb-2">
            TATAROTO <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Spirit</span>
          </h2>
          <p className="text-blue-300 text-xl mb-4">Oráculo sabio del presente</p>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Usa el tarot como espejo simbólico para iluminar lo que hoy no ves con claridad.
          </p>
        </div>
        
        <div className="w-full">
          <iframe
            src="https://tally.so/embed/meGRBq"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Formulario Tataroto Spirit"
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
