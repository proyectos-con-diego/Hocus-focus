'use client';
import React from 'react';

export default function AutomatizacionIAEjemplosSection() {
  const ejemplos = [
    {
      icon: "💳",
      title: "Facturación y recordatorios",
      antes: "Pasas 2 horas semanales emitiendo facturas y persiguiendo pagos atrasados.",
      despues: "Un bot genera y envía facturas automáticamente, y recuerda a tus clientes pagar a tiempo."
    },
    {
      icon: "📧",
      title: "Respuesta de correos",
      antes: "Te saturas respondiendo las mismas consultas una y otra vez.",
      despues: "Un bot responde automáticamente con información personalizada y agenda reuniones por ti."
    },
    {
      icon: "📄",
      title: "Selección de candidatos",
      antes: "Revisas decenas de CVs manualmente para encontrar a los mejores perfiles.",
      despues: "Un bot analiza y te entrega solo los 5 más adecuados para entrevistar."
    },
    {
      icon: "📑",
      title: "Propuestas comerciales",
      antes: "Tardas horas en armar propuestas para cada cliente.",
      despues: "Un bot genera propuestas personalizadas en minutos con precios y condiciones listas para enviar."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            👉 Así es como la automatización puede ahorrarte horas cada semana
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            Cada negocio tiene procesos distintos, pero los problemas suelen ser los mismos: tareas repetitivas que consumen tu tiempo y frenan tu crecimiento.
          </p>
        </div>
        
        {/* Ejemplos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ejemplos.map((ejemplo, index) => (
            <div 
              key={index} 
              className="bg-gray-800/80 border border-purple-500/30 rounded-2xl p-8 hover:-translate-y-2 hover:border-purple-500/70 transition-all duration-300"
            >
              {/* Header con ícono y título */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-2xl">
                  {ejemplo.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{ejemplo.title}</h3>
              </div>
              
              {/* Antes/Después */}
              <div className="space-y-4">
                {/* Antes */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-red-400 text-lg">❌</span>
                    <span className="text-red-400 font-semibold text-sm">Antes:</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{ejemplo.antes}</p>
                </div>
                
                {/* Después */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-400 text-lg">✅</span>
                    <span className="text-emerald-400 font-semibold text-sm">Después:</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{ejemplo.despues}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
