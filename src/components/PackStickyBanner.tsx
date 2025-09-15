"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': 'okro panda',
    'Grilla Viralis': 'Grilla',
    'Jaime Daily': 'Jaime Daily',
    'Navio': 'Navio | Lobo',
    'Bafet': 'Bafet',
    'Midas': 'Midas',
    'Vinxi': 'Vinxi',
    'Mythos': 'Mythos'
  };
  
  return imageMapping[productName] || productName;
}

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
}

const packs: Pack[] = [
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
    bgColor: 'bg-blue-500/10'
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
    bgColor: 'bg-green-500/10'
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
    bgColor: 'bg-purple-500/10'
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
    bgColor: 'bg-cyan-500/10'
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
    bgColor: 'bg-emerald-500/10'
  }
];

export default function PackStickyBanner() {
  const [currentPackIndex, setCurrentPackIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Rotación automática cada 6 segundos
  useEffect(() => {
    if (isHovered) return; // Pausar rotación cuando el usuario hace hover
    
    const interval = setInterval(() => {
      setCurrentPackIndex((prev) => (prev + 1) % packs.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const currentPack = packs[currentPackIndex];

  return (
    <div 
      className="bg-gray-800 rounded-lg p-3 md:p-4 border border-gray-700 shadow-sm w-[200px] h-[240px] md:w-[280px] md:h-[320px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header - Altura fija */}
      <div className="text-center h-6 md:h-8 flex items-center justify-center">
        <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">Packs</span>
      </div>

      {/* Contenido principal - Altura fija */}
      <div className="flex-1 flex flex-col justify-between py-1 md:py-2">
        {/* Sección superior - Emojis y título */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-1 md:gap-2 mb-1 md:mb-2">
            {currentPack.products.map((productName, index) => (
              <div key={index} className="w-12 h-12 md:w-16 md:h-16">
                <img 
                  src={`/Cabezas pets/${getPetImageName(productName)}.png`}
                  alt={`${productName} mascota`}
                  className="w-full h-full object-contain"
                  style={{ minWidth: '48px', minHeight: '48px' }}
                  onError={(e) => {
                    // Fallback al emoji si la imagen no carga
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-3xl md:text-4xl';
                    fallback.textContent = currentPack.emojis[index];
                    target.parentNode?.insertBefore(fallback, target);
                  }}
                />
              </div>
            ))}
          </div>
          <h3 className={`text-sm md:text-lg font-bold ${currentPack.color} mb-1 md:mb-2 line-clamp-2`}>
            {currentPack.name}
          </h3>
        </div>

        {/* Sección media - Descripción */}
        <div className="text-center flex-1 flex items-center justify-center">
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-3">
            {currentPack.description}
          </p>
        </div>

        {/* Sección inferior - Precio y botón */}
        <div className="space-y-2 md:space-y-3">
          {/* Precio */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 md:gap-2">
              <span className={`text-sm md:text-lg font-bold ${currentPack.color}`}>
                {currentPack.price}
              </span>
              <span className="text-xs md:text-sm text-gray-500 line-through">
                {currentPack.oldPrice}
              </span>
            </div>
            <p className="text-xs text-green-400 font-medium">Pago único</p>
          </div>

          {/* Botón CTA */}
          <Link
            href={`/packs/${currentPack.slug}`}
            className={`block w-full px-3 md:px-4 py-1.5 md:py-2 ${currentPack.bgColor} ${currentPack.color} rounded-lg font-medium hover:opacity-80 transition-all duration-200 text-center border border-current/20 text-xs md:text-sm`}
          >
            Ver pack
          </Link>
        </div>
      </div>

      {/* Indicadores de rotación - Altura fija */}
      <div className="flex justify-center gap-1 md:gap-2 h-4 md:h-6 flex items-center">
        {packs.map((pack, index) => (
          <button
            key={pack.id}
            onClick={() => setCurrentPackIndex(index)}
            className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              currentPackIndex === index ? `${pack.color.replace('text-', 'bg-')} opacity-100` : 'bg-gray-600 opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 