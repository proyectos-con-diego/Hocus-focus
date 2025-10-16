'use client';
import React from 'react';

export default function SistemaScalePackageSection() {
  const handleDiagnosticoClick = () => {
    // Scroll to form
    const formSection = document.getElementById('formulario');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="package" className="py-20 px-6 bg-gradient-to-br from-purple-900 via-orange-600 to-blue-900 relative">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-gray-800/90 border-2 border-orange-500/50 rounded-3xl p-12 backdrop-blur-xl shadow-2xl">
          {/* Badge superior */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-bold text-sm uppercase mb-8 inline-block">
            👉 CLARIDAD INMEDIATA
          </div>
          
          {/* Encabezado principal */}
          <h2 className="text-3xl font-black text-white mb-4 text-center">
            Diagnóstico SCALE Estratégico
          </h2>
          
          <div className="text-center mb-6">
            <p className="text-gray-400 text-lg mb-2">Consultoría organizacional: $250–$600</p>
            <p className="text-emerald-400 text-xl font-semibold">Hoy solo $35 💸</p>
          </div>
          
          {/* Precio grande en el centro */}
          <div className="text-center mb-8">
            <div className="text-6xl font-black text-white mb-2">$35</div>
            <div className="text-gray-300 text-lg">🗓 Pago único • Sesión de 60 min</div>
          </div>
          
          {/* Checklist de beneficios */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 text-gray-300">
              <span className="text-emerald-400 text-xl mt-1">✅</span>
              <span><strong>Sesión 1:1 de 60 minutos para conocer a fondo tu operación</strong></span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <span className="text-emerald-400 text-xl mt-1">✅</span>
              <span><strong>Identificación de cuellos de botella y puntos de fricción en tu negocio</strong></span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <span className="text-emerald-400 text-xl mt-1">✅</span>
              <span><strong>Claridad sobre cómo centralizar la información y el control en un solo sistema</strong></span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <span className="text-emerald-400 text-xl mt-1">✅</span>
              <span><strong>Detección de oportunidades de automatización y digitalización</strong></span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <span className="text-emerald-400 text-xl mt-1">✅</span>
              <span><strong>Documento posterior con diagnóstico, roadmap inicial y presupuesto de implementación</strong></span>
            </div>
            <div className="flex items-start gap-3 text-gray-300">
              <span className="text-emerald-400 text-xl mt-1">✅</span>
              <span><strong>Grabación de la sesión + notas de referencia</strong></span>
            </div>
          </div>
          
          {/* Garantía */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-8">
            <h4 className="text-emerald-400 font-bold mb-2">🔒 Garantía de Claridad</h4>
            <p className="text-gray-300 text-sm">
              Si después del diagnóstico no obtienes un plan claro sobre cómo ordenar y centralizar tu operación con SCALE, te devuelvo el 100%.
            </p>
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={handleDiagnosticoClick}
            className="w-full px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-black text-xl text-white uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-orange-500/40 mb-8"
          >
            🚀 SÍ, QUIERO MI DIAGNÓSTICO
          </button>
          
          {/* Mini badges debajo del botón */}
          <div className="text-center text-gray-400 text-sm space-y-1">
            <p>✅ Claridad inmediata en 60 min</p>
            <p>✅ Roadmap accionable para 30 días</p>
            <p>✅ Descontable si avanzas al plan SCALE completo</p>
          </div>
        </div>
      </div>
    </section>
  );
} 