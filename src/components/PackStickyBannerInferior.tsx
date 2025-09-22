"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pack {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: string[];
  emojis: string[];
  price: string;
  oldPrice: string;
  color: string;
  bgColor: string;
  gradient: string;
}

interface PackStickyBannerInferiorProps {
  packs?: Pack[];
}

// Packs por defecto para cuando no se pasan props (página experimental)
const defaultPacks: Pack[] = [
  {
    id: 'okro-vinxi',
    name: 'OKRo + Vinxi',
    slug: 'okro-vinxi',
    description: 'Objetivos claros + Proyectos organizados',
    products: ['OKRo', 'Vinxi'],
    emojis: ['🐼', '🦊'],
    price: '$39',
    oldPrice: '$58',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    gradient: 'from-blue-500/95 to-cyan-600/95'
  },
  {
    id: 'okro-grilla',
    name: 'OKRo + Grilla',
    slug: 'okro-grilla',
    description: 'Objetivos claros + Contenido viral',
    products: ['OKRo', 'Grilla Viralis'],
    emojis: ['🐼', '🦗'],
    price: '$39',
    oldPrice: '$58',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    gradient: 'from-green-500/95 to-emerald-600/95'
  },
  {
    id: 'jaime-vinxi',
    name: 'Jaime + Vinxi',
    slug: 'jaime-vinxi',
    description: 'Hábitos inteligentes + Proyectos organizados',
    products: ['Jaime Daily', 'Vinxi'],
    emojis: ['🐔', '🦊'],
    price: '$29',
    oldPrice: '$44',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    gradient: 'from-purple-500/95 to-pink-600/95'
  },
  {
    id: 'vinxi-okro',
    name: 'Vinxi + OKRo',
    slug: 'vinxi-okro',
    description: 'Proyectos organizados + Objetivos claros',
    products: ['Vinxi', 'OKRo'],
    emojis: ['🦊', '🐼'],
    price: '$39',
    oldPrice: '$58',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    gradient: 'from-cyan-500/95 to-blue-600/95'
  },
  {
    id: 'grilla-okro',
    name: 'Grilla + OKRo',
    slug: 'grilla-okro',
    description: 'Contenido viral + Objetivos claros',
    products: ['Grilla Viralis', 'OKRo'],
    emojis: ['🦗', '🐼'],
    price: '$39',
    oldPrice: '$58',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    gradient: 'from-emerald-500/95 to-teal-600/95'
  }
];

export default function PackStickyBannerInferior({ packs = defaultPacks }: PackStickyBannerInferiorProps) {
  const [currentPackIndex, setCurrentPackIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile al montar el componente
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Establecer estado inicial según dispositivo
  useEffect(() => {
    setIsMinimized(isMobile);
  }, [isMobile]);

  // Si no hay packs, no mostrar nada
  if (!packs || packs.length === 0) {
    return null;
  }

  // Rotación automática cada 6 segundos
  useEffect(() => {
    if (isHovered || isMinimized || packs.length <= 1) return; // Pausar rotación cuando el usuario hace hover, está minimizado, o solo hay 1 pack
    
    const interval = setInterval(() => {
      setCurrentPackIndex((prev) => (prev + 1) % packs.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered, isMinimized, packs.length]);

  const currentPack = packs[currentPackIndex];

  // Si está minimizado, mostrar solo un botón pequeño
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className={`bg-gradient-to-r ${currentPack.gradient} text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300 animate-pulse`}
        >
          🎁 Ver packs
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full z-50 bg-gradient-to-r ${currentPack.gradient} backdrop-blur-sm border-t border-white/20 shadow-2xl transition-all duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Contenido del pack */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Icono y título */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl animate-bounce">🎁</div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {currentPack.name}
                </h3>
                <p className="text-amber-100 text-sm">
                  {currentPack.description}
                </p>
              </div>
            </div>

            {/* Productos del pack */}
            <div className="hidden md:flex items-center space-x-2">
              {currentPack.emojis.map((emoji, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
                    <span className="text-lg">{emoji}</span>
                    <span className="text-white font-medium text-sm">{currentPack.products[index]}</span>
                  </div>
                  {index < currentPack.emojis.length - 1 && (
                    <span className="text-white font-bold text-lg">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Precio y ahorro */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="text-center">
                <div className="text-white font-bold text-xl">
                  {currentPack.price}
                </div>
                <div className="text-amber-100 text-sm line-through">
                  {currentPack.oldPrice}
                </div>
              </div>
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Pago único
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-3">
            <Link href={`/packs/${currentPack.slug}`}>
              <button className="bg-white text-purple-600 font-bold px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Ver pack
              </button>
            </Link>
            
            {/* Botón minimizar */}
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white hover:text-amber-200 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Indicadores de pack */}
        {packs.length > 1 && (
          <div className="flex justify-center space-x-2 mt-2">
            {packs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPackIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPackIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 