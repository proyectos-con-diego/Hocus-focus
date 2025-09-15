'use client';
import React from 'react';
import { statsData } from '@/data/sobre-mi';

interface StatsSectionProps {
  colorScheme?: 'purple' | 'orange';
  noBackground?: boolean;
}

export default function StatsSection({ colorScheme = 'purple', noBackground = false }: StatsSectionProps) {
  const isOrange = colorScheme === 'orange';
  
  return (
    <section className={`py-20 ${noBackground ? '' : `bg-gradient-to-br from-gray-900 ${isOrange ? 'via-orange-500/5' : 'via-purple-500/5'} to-gray-900`}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Mis Logros</h2>
          <p className="text-xl text-gray-400">Resultados que hablan por sí mismos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 text-center ${isOrange ? 'hover:border-orange-500/30' : 'hover:border-purple-500/30'} transition-all duration-300`}
            >
              <div className={`text-4xl font-bold ${isOrange ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-gradient-to-r from-pink-500 to-purple-500'} bg-clip-text text-transparent mb-2`}>{stat.number}</div>
              <div className="text-white font-semibold mb-2">{stat.title}</div>
              <div className="text-gray-400 text-sm">{stat.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 