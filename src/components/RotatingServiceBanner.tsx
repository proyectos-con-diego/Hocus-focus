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
    id: 'automatizacion-ia',
    name: 'AUTOMATE',
    slug: 'automatizacion-ia',
    description: 'Implementa sistemas inteligentes en tu negocio y multiplica tu productividad',
    icon: '🤖',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10'
  },
  {
    id: 'sistema-scale',
    name: 'SCALE',
    slug: 'sistema-scale',
    description: 'Transforma tu negocio en una operación eficiente y escalable en 30 días.',
    icon: '🏢',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10'
  },
  {
    id: 'plan-marketing',
    name: 'CONVERT',
    slug: 'plan-marketing',
    description: 'Transforma tu marketing y multiplica tus clientes con una estrategia clara y efectiva.',
    icon: '📊',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10'
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
      className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 shadow-xl hover:shadow-2xl transition-all duration-500 h-[400px] flex flex-col relative overflow-hidden group max-w-sm md:max-w-md mx-auto"
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
          <div className="text-center mb-4">
            <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
              {currentService.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
              {currentService.id === 'automatizacion-ia' ? (
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">AUTOMATE</span>
              ) : currentService.id === 'sistema-scale' ? (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">SCALE</span>
              ) : currentService.id === 'plan-marketing' ? (
                <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">CONVERT</span>
              ) : (
                <span className={currentService.color}>{currentService.name}</span>
              )}
            </h3>
            <p className="text-gray-400 text-sm font-medium">
              {currentService.id === 'automatizacion-ia' ? 'Automatizaciones iA' :
               currentService.id === 'sistema-scale' ? 'Agilidad digital' :
               currentService.id === 'plan-marketing' ? 'Plan de Marketing' :
               'Solución profesional'}
            </p>
          </div>

          {/* Descripción mejorada */}
          <p className="text-gray-200 text-sm text-center mb-4 leading-relaxed px-2">
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
              currentServiceIndex === 0 ? 'bg-purple-400 opacity-100 shadow-lg shadow-purple-400/50' : 'bg-gray-600 opacity-50 hover:bg-gray-500'
            }`}
          />
          <button
            onClick={() => { try { trackEvent({ action: 'click_rotating_service_indicator', category: 'Blog', label: '1' }); } catch {} ; setCurrentServiceIndex(1); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentServiceIndex === 1 ? 'bg-orange-400 opacity-100 shadow-lg shadow-orange-400/50' : 'bg-gray-600 opacity-50 hover:bg-gray-500'
            }`}
          />
          <button
            onClick={() => { try { trackEvent({ action: 'click_rotating_service_indicator', category: 'Blog', label: '2' }); } catch {} ; setCurrentServiceIndex(2); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentServiceIndex === 2 ? 'bg-red-400 opacity-100 shadow-lg shadow-red-400/50' : 'bg-gray-600 opacity-50 hover:bg-gray-500'
            }`}
          />
        </div>
      </div>
    </div>
  );
} 