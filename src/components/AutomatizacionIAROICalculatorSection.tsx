'use client';
import React, { useState } from 'react';
import { roiCalculatorDefaults } from '@/data/automatizacion-ia';

export default function AutomatizacionIAROICalculatorSection() {
  const [hours, setHours] = useState(roiCalculatorDefaults.defaultHours);
  const [rate, setRate] = useState(roiCalculatorDefaults.defaultRate);

  // Calcular ROI
  const weeklyROI = hours * rate * roiCalculatorDefaults.automationEfficiency;
  const monthlyROI = weeklyROI * 4;
  const yearlyROI = weeklyROI * 52;
  const paybackDays = Math.ceil(roiCalculatorDefaults.investment / (weeklyROI / 7));

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-purple-500/10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/80 border border-purple-500/30 rounded-3xl p-12 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white mb-4">🧮 Calculadora de Ahorro</h2>
            <p className="text-gray-400">Descubre cuánto dinero podrías ahorrar automatizando tus procesos manuales</p>
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-300 font-semibold mb-2">
              ¿Cuántas horas semanales dedicas a tareas repetitivas?
            </label>
            <input
              type="range"
              min="5"
              max="25"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-purple-400 font-bold text-lg mt-2">{hours} horas/semana</div>
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-300 font-semibold mb-2">
              ¿Cuánto vale tu hora de trabajo? (USD)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-purple-400 font-bold text-lg mt-2">${rate}/hora</div>
          </div>
          
          <div className="bg-gray-700/50 rounded-2xl p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">${weeklyROI.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Ahorros Semanales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">${monthlyROI.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Ahorros Mensuales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">${yearlyROI.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Ahorros Anuales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">{paybackDays} días</div>
                <div className="text-gray-400 text-sm">Recuperación de Inversión</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 