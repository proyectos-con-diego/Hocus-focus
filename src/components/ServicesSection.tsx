'use client';
import React from "react";
import Link from "next/link";
import { servicesData } from '@/data/servicios';

export default function ServicesSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Cómo puedo ayudarte</h2>
          <p className="text-xl text-gray-400 mb-4">Soluciones prácticas y personalizadas para tu negocio. Reserva tu diagnóstico y recibe un plan de acción claro.</p>
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-3 inline-block">
            <span className="text-purple-300 font-semibold">⚡ 70% OFF - Solo 2025</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <Link key={service.id} href={service.url} className="block group">
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/30 transition-all duration-300 group-hover:scale-105 flex flex-col">
                {/* Badge en esquina superior derecha */}
                <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${service.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {service.badge}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.buttonColor} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                  {service.icon}
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
                <div className="space-y-2 mb-6 flex-1">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                {/* CTA Button - Ahora está pegado al fondo */}
                <div className={`w-full px-6 py-3 bg-gradient-to-r ${service.buttonColor} text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 transform block text-center mt-auto`}>
                  {service.buttonText}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 