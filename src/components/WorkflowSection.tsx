import React from 'react';

const workflowSteps = [
  {
    number: 1,
    title: "Diagnóstico",
    description: "Conversamos 30-45 min sobre tu situación y objetivos"
  },
  {
    number: 2,
    title: "Propuesta Personalizada",
    description: "Recibes un plan de acción y presupuesto a medida"
  },
  {
    number: 3,
    title: "Implementación",
    description: "Trabajo personalmente en tu proyecto, sin intermediarios"
  },
  {
    number: 4,
    title: "Capacitación 1:1",
    description: "Te enseño todo paso a paso para que lo aproveches al máximo"
  },
  {
    number: 5,
    title: "Soporte Directo",
    description: "Tienes acceso a soporte directo conmigo durante 30 días"
  }
];

export default function WorkflowSection() {
  return (
    <section className="py-16 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Cómo trabajo contigo</h2>
        <p className="text-center text-gray-400 mb-10">Proceso claro y personalizado para que sepas qué esperar en cada etapa</p>
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0 relative">
          
          {workflowSteps.map((step, index) => (
            <div key={step.number} className="relative z-10 flex-1 flex flex-col items-center md:items-start mb-10 md:mb-0 text-center md:text-left">
              <div className="flex flex-col items-center md:flex-row md:items-center mb-3">
                <div className="w-14 h-14 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl md:text-lg md:mr-3 mb-2 md:mb-0">
                  {step.number}
                </div>
                <span className="font-semibold text-white text-xl md:text-lg">{step.title}</span>
              </div>
              <div className="text-gray-400 text-base md:text-sm">{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 