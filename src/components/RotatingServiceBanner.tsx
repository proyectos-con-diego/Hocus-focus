"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { event as trackEvent } from '../lib/analytics';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

const services: Service[] = [
  {
    id: 'automation',
    name: 'Automatización IA',
    slug: 'automatizacion-ia',
    description: 'Recupera 20+ horas semanales con automatización inteligente',
    icon: '🤖',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10'
  },
  {
    id: 'scale',
    name: 'Sistema Scale',
    slug: 'sistema-scale',
    description: 'Escala tu negocio sin perder el control',
    icon: '📈',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10'
  },
  {
    id: 'marketing',
    name: 'Plan de Marketing',
    slug: 'plan-marketing',
    description: 'Estrategia de marketing que genera resultados reales',
    icon: '🎯',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  }
];

export default function RotatingServiceBanner() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Rotación automática cada 5 segundos
  useEffect(() => {
    if (isHovered) return; // Pausar rotación cuando el usuario hace hover
    
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentService = services[currentServiceIndex];

  return (
    <div 
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 h-[320px] flex flex-col relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Borde con glow sutil - siempre visible */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header mejorado */}
        <div className="text-center mb-4">
          <span className="text-xs text-purple-400 font-medium uppercase tracking-wide bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            Servicios
          </span>
        </div>

        {/* Contenido principal centrado */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Icono y título con animación */}
          <div className="text-center mb-6">
            <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
              {currentService.icon}
            </div>
            <h3 className={`text-xl font-bold ${currentService.color} mb-3 group-hover:scale-105 transition-transform duration-300`}>
              {currentService.name}
            </h3>
          </div>

          {/* Descripción mejorada */}
          <p className="text-gray-200 text-sm text-center mb-6 leading-relaxed px-2">
            {currentService.description}
          </p>

          {/* Botón CTA mejorado */}
          <Link
            href={`/servicios/${currentService.slug}`}
            onClick={() => { try { trackEvent({ action: 'click_rotating_service_cta', category: 'Blog', label: currentService.slug }); } catch {} }}
            className={`block w-full px-4 py-3 ${currentService.bgColor} ${currentService.color} rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 text-center border border-current/20 transform`}
          >
            Ver servicio
          </Link>
        </div>

        {/* Indicadores de rotación mejorados */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => { try { trackEvent({ action: 'click_rotating_service_indicator', category: 'Blog', label: '0' }); } catch {} ; setCurrentServiceIndex(0); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentServiceIndex === 0 ? 'bg-blue-400 opacity-100 shadow-lg shadow-blue-400/50' : 'bg-gray-600 opacity-50 hover:bg-gray-500'
            }`}
          />
          <button
            onClick={() => { try { trackEvent({ action: 'click_rotating_service_indicator', category: 'Blog', label: '1' }); } catch {} ; setCurrentServiceIndex(1); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentServiceIndex === 1 ? 'bg-green-400 opacity-100 shadow-lg shadow-green-400/50' : 'bg-gray-600 opacity-50 hover:bg-gray-500'
            }`}
          />
          <button
            onClick={() => { try { trackEvent({ action: 'click_rotating_service_indicator', category: 'Blog', label: '2' }); } catch {} ; setCurrentServiceIndex(2); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentServiceIndex === 2 ? 'bg-purple-400 opacity-100 shadow-lg shadow-purple-400/50' : 'bg-gray-600 opacity-50 hover:bg-gray-500'
            }`}
          />
        </div>
      </div>
    </div>
  );
} 