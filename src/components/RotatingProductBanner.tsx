"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { event as trackEvent } from '../lib/analytics';

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': '/Personajes/Imagenes-Agentes/Okro/Cabeza/okro-cabeza-frontal.png',
    'Grilla Viralis': '/Personajes/Imagenes-Agentes/Grilla/Cabeza/Grilla-cabeza-frontal.png',
    'Jaime Daily': '/Personajes/Imagenes-Agentes/Jaime/Cabeza/Jaime-cabeza-frontal.png',
    'Lee Der': '/Personajes/Imagenes-Agentes/Lee-Navio/Cabeza/Lee-cabeza-frontal.png',
    'Bafet': '/Personajes/Imagenes-Agentes/Bafet/Cabeza/Bafet-cabeza-frontal.png',
    'Midas': '/Personajes/Imagenes-Agentes/Midas/Cabeza/Midas-cabeza-frontal.png',
    'Vinxi': '/Personajes/Imagenes-Agentes/Vinxi/Cabeza/Vinxi-frontal.png'
  };
  
  return imageMapping[productName] || productName;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  status: string;
}

const products: Product[] = [
                    {
                    id: 'jaime',
                    name: 'Jaime Daily',
                    slug: 'jaime-daily',
                    description: 'Transforma tu vida diaria y establece hábitos duraderos con un sistema único y efectivo.',
                    icon: '🐔',
                    color: 'text-green-400',
                    bgColor: 'bg-green-500/10',
                    status: 'Disponible'
                  },
  {
    id: 'vinxi',
    name: 'Vinxi',
    slug: 'vinxi',
    description: 'Transforma el caos creativo en claridad organizada para maximizar tu productividad.',
    icon: '🦊',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    status: 'Disponible'
  },
  {
    id: 'grilla',
    name: 'Grilla Viralis',
    slug: 'grilla-viralis',
    description: 'Transforma tu proceso creativo en una estrategia organizada y sin estrés.',
    icon: '🦗',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    status: 'Disponible'
  },
  {
    id: 'okro',
    name: 'OKRo',
    slug: 'okro',
    description: 'Transforma objetivos en resultados medibles para que enfoques tu energía donde importa.',
    icon: '🐼',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    status: 'Disponible'
  }
];

export default function RotatingProductBanner() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Rotación automática cada 6 segundos
  useEffect(() => {
    if (isHovered) return; // Pausar rotación cuando el usuario hace hover
    
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentProduct = products[currentProductIndex];

  return (
    <div className="my-6">
      <div 
        className="bg-gradient-to-r from-gray-900/60 to-gray-800/60 border border-gray-700/40 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Borde con glow púrpura→azul→rosa siempre visible */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20"></div>
        
        {/* Contenido principal */}
        <div className="relative z-10">
        <div className="text-gray-400 text-xs mb-3 font-medium tracking-wide uppercase">PRODUCTO DESTACADO</div>
        {/* Contenido directo en el banner exterior (sin recuadro interior) */}
        <div className="text-center px-2 py-2 md:px-4 md:py-4">
          {/* Imagen de la mascota y título */}
          <div className="flex justify-center mb-4">
            <img 
                                  src={getPetImageName(currentProduct.name)}
              alt={`${currentProduct.name} mascota`}
              className="w-24 h-24 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'text-4xl';
                fallback.textContent = currentProduct.icon;
                target.parentNode?.insertBefore(fallback, target);
              }}
            />
          </div>
          <h4 className={`text-xl font-bold ${currentProduct.color} mb-3`}>
            {currentProduct.name}
          </h4>
          
          {/* Descripción */}
          <p className="text-gray-300 text-sm mb-5 leading-relaxed max-w-sm mx-auto">
            {currentProduct.description}
          </p>
          
          {/* Botón CTA */}
          <Link
            href={`/productos/${currentProduct.slug}`}
            onClick={() => { try { trackEvent({ action: 'click_rotating_product_cta', category: 'Blog', label: currentProduct.slug }); } catch {} }}
            className={`inline-block px-8 py-3 ${currentProduct.bgColor} ${currentProduct.color} rounded-xl font-semibold hover:opacity-90 transition-all duration-300 border border-current/20 hover:scale-105 hover:shadow-lg`}
          >
            Ver producto
          </Link>
        </div>
        
        {/* Indicadores de rotación mejorados */}
        <div className="flex justify-center gap-3 mt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                try { trackEvent({ action: 'click_rotating_product_indicator', category: 'Blog', label: String(index) }); } catch {}
                setCurrentProductIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentProductIndex === index 
                  ? 'bg-purple-400 opacity-100 shadow-lg shadow-purple-400/50' 
                  : 'bg-gray-600 opacity-50 hover:opacity-75'
              }`}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
} 