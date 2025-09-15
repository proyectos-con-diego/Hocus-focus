'use client';
import React from 'react';
import { comparisonData } from '@/data/sistema-scale';

export default function SistemaScaleComparisonSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-800 via-purple-500/10 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ordenar tu operación suele ser caro y lento
          </h2>
          <p className="text-xl text-gray-400">
            La mayoría de empresas que buscan salir del caos se enfrentan a estas alternativas:
          </p>
        </div>
        
        <div className="bg-gray-800/80 border border-purple-500/30 rounded-3xl p-8 backdrop-blur-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-orange-400 font-bold text-lg">Alternativa</th>
                <th className="text-left p-4 text-orange-400 font-bold text-lg">Costo</th>
                <th className="text-left p-4 text-orange-400 font-bold text-lg">Tiempo</th>
                <th className="text-left p-4 text-orange-400 font-bold text-lg">Seguimiento</th>
                <th className="text-left p-4 text-orange-400 font-bold text-lg">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-700/30 ${
                    index === comparisonData.length - 1 ? 'bg-orange-500/10 border border-orange-500/30' : ''
                  }`}
                >
                  <td className={`p-4 ${index === comparisonData.length - 1 ? 'text-orange-400 font-bold' : 'text-gray-300'}`}>
                    {index === comparisonData.length - 1 ? <strong>{item.alternative}</strong> : item.alternative}
                  </td>
                  <td className={`p-4 ${index === comparisonData.length - 1 ? 'text-orange-400 font-bold' : 'text-gray-300'}`}>
                    {index === comparisonData.length - 1 ? <strong>{item.cost}</strong> : item.cost}
                  </td>
                  <td className={`p-4 ${index === comparisonData.length - 1 ? 'text-orange-400 font-bold' : 'text-gray-300'}`}>
                    {index === comparisonData.length - 1 ? <strong>{item.time}</strong> : item.time}
                  </td>
                  <td className={`p-4 ${index === comparisonData.length - 1 ? 'text-orange-400 font-bold' : 'text-gray-300'}`}>
                    {index === comparisonData.length - 1 ? <strong>{item.followUp}</strong> : item.followUp}
                  </td>
                  <td className={`p-4 ${index === comparisonData.length - 1 ? 'text-orange-400 font-bold' : 'text-gray-300'}`}>
                    {index === comparisonData.length - 1 ? <strong>{item.result}</strong> : item.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg text-emerald-400 font-semibold">
            👉 SCALE: Una alternativa más accesible y práctica, por menos de una quinta parte del costo tradicional y con resultados mucho más rápidos.
          </p>
        </div>
      </div>
    </section>
  );
} 