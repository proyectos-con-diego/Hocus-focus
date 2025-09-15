'use client';
import React from 'react';

export default function SistemaScaleQuePasaDespuesSection() {
  const handleDiagnosticoClick = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            👉 El diagnóstico es solo el inicio.
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Con el diagnóstico no solo entiendes tu situación, también defines el siguiente paso.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Option 1: DIY */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8 text-center hover:border-emerald-500/30 transition-all duration-300">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-2xl font-bold text-white mb-4">Ejecutar el roadmap con tu equipo interno</h3>
            <p className="text-gray-400 mb-6">
              Implementa las recomendaciones con tu equipo. Tienes el documento detallado, el roadmap y la grabación de la sesión como guía.
            </p>
            <div className="text-emerald-400 font-semibold">
              💡 Inversión: Solo el diagnóstico de $35
            </div>
          </div>

          {/* Option 2: Plan Completo */}
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/30 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all duration-300">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-2xl font-bold text-white mb-4">Sistema SCALE Completo</h3>
            <p className="text-gray-400 mb-6">
              Escalar conmigo al Sistema SCALE: implementación en 30 días, acompañamiento completo y centralización garantizada.
            </p>
            <div className="text-orange-400 font-semibold">
              💡 Inversión: Plan completo + descuento del diagnóstico
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 rounded-2xl p-8 text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">💡 Valor del diagnóstico garantizado</h3>
          <p className="text-lg text-gray-300 mb-4">
            El valor del diagnóstico se descuenta si decides avanzar conmigo en el plan completo.
          </p>
          <div className="text-emerald-400 font-semibold text-lg">
            Nunca pierdes tu inversión inicial
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            ¿Listo para empezar con claridad?
          </h3>
          <button
            onClick={handleDiagnosticoClick}
            className="px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full font-black text-xl text-white shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-orange-500/40 uppercase tracking-wider"
          >
            🔴 Agendar diagnóstico
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Sesión de 60 minutos • Roadmap personalizado • Solo $35
          </p>
        </div>
      </div>
    </section>
  );
}
