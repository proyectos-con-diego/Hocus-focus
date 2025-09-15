'use client';
import React from 'react';

export default function SistemaScaleDiagnosticoSection() {
  const handleDiagnosticoClick = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="diagnostico" className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            👉 Primero, un diagnóstico estratégico
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Antes de transformar tu operación, necesitas ver con claridad qué la está frenando. Por eso el primer paso es una sesión estratégica de 60 minutos donde analizamos tu situación y definimos un plan.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: What's Included */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Incluye:</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-xl mt-1">✅</span>
                <div>
                  <h4 className="text-white font-semibold">Auditoría express de tu operación actual</h4>
                  <p className="text-gray-400 text-sm">Análisis rápido pero profundo de tu situación actual</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-xl mt-1">✅</span>
                <div>
                  <h4 className="text-white font-semibold">Identificación de cuellos de botella y oportunidades de mejora</h4>
                  <p className="text-gray-400 text-sm">Enfoque en lo que realmente está frenando tu crecimiento</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-xl mt-1">✅</span>
                <div>
                  <h4 className="text-white font-semibold">Roadmap inicial con pasos concretos para tu operación</h4>
                  <p className="text-gray-400 text-sm">Plan de acción inmediato y ejecutable</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-xl mt-1">✅</span>
                <div>
                  <h4 className="text-white font-semibold">Recomendaciones personalizadas según tu industria</h4>
                  <p className="text-gray-400 text-sm">Estrategias adaptadas a tu sector y situación</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-xl mt-1">✅</span>
                <div>
                  <h4 className="text-white font-semibold">Sesión 1:1 por Zoom (grabación incluida)</h4>
                  <p className="text-gray-400 text-sm">60 minutos de consultoría personalizada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pricing & CTA */}
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/20 rounded-2xl p-8 text-center">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-2xl text-gray-400 line-through">$300</span>
                <span className="text-4xl font-black text-white">$35</span>
              </div>
              <div className="text-gray-400 text-sm">Sesión de diagnóstico</div>
              <div className="text-sm text-emerald-400 mt-1">Ahorras $265</div>
            </div>
            
            <button
              onClick={handleDiagnosticoClick}
              className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-700 rounded-full font-black text-lg text-white shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-orange-500/40 uppercase tracking-wider"
            >
              🔴 QUIERO MI DIAGNÓSTICO SCALE
            </button>
            
            <p className="text-xs text-gray-500 mt-4">
              Sesión de 60 minutos • Roadmap personalizado • Recomendaciones específicas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
