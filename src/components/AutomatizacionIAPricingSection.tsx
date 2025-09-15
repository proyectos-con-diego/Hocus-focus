'use client';
import React from 'react';

export default function AutomatizacionIAPricingSection() {
  const handleDiagnosticoClick = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-purple-900 via-purple-600 to-blue-900 relative">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-gray-800/90 border-2 border-purple-500/50 rounded-3xl p-12 backdrop-blur-xl shadow-2xl">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-bold text-sm uppercase mb-8 inline-block">
            🚀 SOLO 5 CUPOS DISPONIBLES ESTE MES
          </div>
          
          <h2 className="text-3xl font-black text-white mb-8 text-center">
            DIAGNÓSTICO DE AUTOMATIZACIÓN
          </h2>
          
          <div className="mb-8">
            <div className="text-6xl font-black text-white text-center mb-2">$35</div>
            <p className="text-gray-400 text-center">Valor real: $300</p>
            <p className="text-gray-300 text-center mt-2">🗓️ Sesión 1:1 · 60 minutos · Vía Zoom</p>
          </div>
          
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-8">
            <h4 className="text-emerald-400 font-bold mb-2">🔒 Garantía de Claridad</h4>
            <p className="text-gray-300 text-sm">
              Si al terminar la sesión no obtienes claridad sobre cómo ahorrar al menos 8 horas semanales, te devuelvo el 100% de tu dinero.
            </p>
          </div>
          
          <div className="mb-8">
            <h4 className="text-white text-xl font-bold mb-6">✅ Todo Incluido en Tu Paquete:</h4>
            
            <div className="space-y-4">
              <div className="bg-gray-700/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
                <div className="text-emerald-400 text-xl">✅</div>
                <div className="text-gray-300 text-sm">Auditoría express de tus tareas repetitivas</div>
              </div>
              <div className="bg-gray-700/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
                <div className="text-emerald-400 text-xl">✅</div>
                <div className="text-gray-300 text-sm">Identificación de las 3 automatizaciones con mayor impacto inmediato</div>
              </div>
              <div className="bg-gray-700/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
                <div className="text-emerald-400 text-xl">✅</div>
                <div className="text-gray-300 text-sm">Roadmap inicial con pasos concretos para los próximos 30 días</div>
              </div>
              <div className="bg-gray-700/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
                <div className="text-emerald-400 text-xl">✅</div>
                <div className="text-gray-300 text-sm">Recomendaciones personalizadas según tu tipo de negocio</div>
              </div>
              <div className="bg-gray-700/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
                <div className="text-emerald-400 text-xl">✅</div>
                <div className="text-gray-300 text-sm">Grabación + notas de la sesión</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleDiagnosticoClick}
            className="w-full px-12 py-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full font-black text-xl text-white uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-purple-500/40 mb-8"
          >
            👉 QUIERO MI DIAGNÓSTICO DE AUTOMATIZACIÓN
          </button>
          
          <div className="text-center text-gray-400 text-sm space-y-1">
            <p>✔ Inicio en 3–5 días hábiles</p>
            <p>✔ Roadmap accionable en 2 semanas</p>
            <p>✔ El costo del diagnóstico se descuenta si avanzas al plan Automate Starter</p>
          </div>
        </div>
      </div>
    </section>
  );
} 