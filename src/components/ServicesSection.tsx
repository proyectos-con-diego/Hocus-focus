'use client';
import React from 'react';
import Link from 'next/link';
import { servicesData } from '../data/servicios'; // Changed from '@/data/servicios'

export default function ServicesSection() {
  return (
    <section id="servicios" data-section="services" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Cómo puedo ayudarte</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Soluciones prácticas y personalizadas para tu negocio. Reserva tu diagnóstico y recibe un plan de acción claro.
          </p>
          <div className="inline-block bg-red-500/20 border border-red-500/30 rounded-full px-6 py-2 mb-2">
            <span className="text-red-200 font-semibold">⚡ 70% OFF - Solo 2025</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {servicesData.map((service: any, index: number) => ( // Explicitly typed 'service' and 'index'
            <div 
              key={service.id}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/30 transition-all duration-300 group-hover:scale-105 flex flex-col">
                      {/* Badge solo para SCALE (centro) */}
                      {service.id === 'sistema-scale' && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                          Popular
                        </div>
                      )}
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.buttonColor} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                {service.icon}
              </div>
              
              {/* Service Name */}
              <div className="mb-2">
                <span className={`text-xl font-bold bg-gradient-to-r ${service.badgeColor} bg-clip-text text-transparent`}>
                  {service.badge}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">{service.description}</p>
              
              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-cyan-400">{service.currentPrice}</span>
                  {service.originalPrice !== service.currentPrice && (
                    <span className="text-gray-500 line-through text-lg">{service.originalPrice}</span>
                  )}
                </div>
                <div className="text-xs text-purple-300 font-semibold mt-2">Sesión de diagnóstico (70% OFF)</div>
              </div>
              
              {/* Features - Ahora ocupa el espacio disponible */}
              <div className="mb-6 flex-1">
                <p className="text-xs text-gray-500 mb-3">Si buscas:</p>
                <div className="space-y-2">
                  {service.features.map((feature: any, idx: number) => ( // Explicitly typed 'feature' and 'idx'
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Button - Ahora está pegado al fondo */}
              <Link 
                href={service.url}
                className={`w-full px-6 py-3 bg-gradient-to-r ${service.buttonColor} text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 transform mt-auto text-center block`}
              >
                {service.buttonText}
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 