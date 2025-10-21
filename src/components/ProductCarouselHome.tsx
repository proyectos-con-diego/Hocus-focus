"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';

// Función helper para mapear nombres de productos a rutas de imágenes de personajes
function getPetImageName(productName: string, view: 'lateral' | 'frontal' = 'lateral'): string {
  const imageMapping: { [key: string]: { lateral: string; frontal: string } } = {
    'OKRo': {
      lateral: '/personajes/Imagenes Agentes/Okro/Cabeza/Okro agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Okro/Cabeza/okro agente frontal.png'
    },
    'Grilla Viralis': {
      lateral: '/personajes/Imagenes Agentes/Grilla/Cabeza/Grilla agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Grilla/Cabeza/Grilla agente frontal.png'
    },
    'Jaime Daily': {
      lateral: '/personajes/Imagenes Agentes/Jaime/Cabeza/Jaime agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Jaime/Cabeza/Jaime agente frontal.png'
    },
    'Navio': {
      lateral: '/personajes/Imagenes Agentes/Lee - Navio/Cabeza/Lee agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Lee - Navio/Cabeza/Lee agente frontal.png'
    },
    'Bafet': {
      lateral: '/personajes/Imagenes Agentes/Bafet/Cabeza/Bafet agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Bafet/Cabeza/Bafet agente frontal.png'
    },
    'Midas': {
      lateral: '/personajes/Imagenes Agentes/Midas/Cabeza/Midas agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Midas/Cabeza/Midas agente frontal.png'
    },
    'Vinxi': {
      lateral: '/personajes/Imagenes Agentes/Vinxi/Cabeza/Vinxi agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Vinxi/Cabeza/Vinxi agente frontal.png'
    },
    'Mythos': {
      lateral: '/personajes/Imagenes Agentes/Mythos/Cabeza/Mythos agente lateral.png',
      frontal: '/personajes/Imagenes Agentes/Mythos/Cabeza/Mythos agente frontal.png'
    }
  };
  
  const agentImages = imageMapping[productName];
  if (!agentImages) return productName;
  
  return view === 'frontal' ? agentImages.frontal : agentImages.lateral;
}

// Mapear productos a formato de mascotas para el carrusel
const timelineMascots = products.map(product => ({
  name: product.name,
  emoji: product.emoji,
  category: getCategoryFromSlug(product.slug),
  gradientBg: getGradientFromProduct(product),
  isPopular: product.isPopular || false,
  slug: product.slug
}));

// Función para obtener categoría basada en el slug
function getCategoryFromSlug(slug: string): string {
  const categoryMap: { [key: string]: string } = {
    'jaime-daily': 'Hábitos',
    'midas': 'Finanzas', 
    'vinxi': 'Organización',
    'grilla-viralis': 'Contenido',
    'okro': 'Objetivos',
    'bafet': 'Crypto',
    'navio-360': 'Colaboración'
  };
  return categoryMap[slug] || 'Producto';
}

// Función para obtener gradiente basado en el producto
function getGradientFromProduct(product: any): string {
  const gradientMap: { [key: string]: string } = {
    'jaime-daily': 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    'midas': 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    'vinxi': 'linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)',
    'grilla-viralis': 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
    'okro': 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
    'bafet': 'linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)',
    'navio-360': 'linear-gradient(135deg, #607d8b 0%, #00bcd4 100%)'
  };
  return gradientMap[product.slug] || 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
}

export default function ProductCarouselHome() {
  const router = useRouter();
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const handleTimelineClick = (index: number) => {
    const mascot = timelineMascots[index];
    router.push(`/productos/${mascot.slug}`);
  };

  return (
    <section 
      className="py-16 px-4 bg-gradient-to-br from-gray-800 via-purple-500/5 to-gray-900"
      data-section="assistants"
      id="assistants-section"
      data-testid="assistants-section"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Asistentes Virtuales</h2>
        <p className="text-lg text-center text-gray-300 opacity-80 mb-8 max-w-2xl mx-auto">
          Asistentes de IA con personalidad y propósito, creados para ayudarte a lograr más cada día.
        </p>
        
        {/* Timeline Container */}
        <div 
          className="relative w-full py-10 overflow-hidden"
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            const timeline = e.currentTarget.querySelector('.timeline-scroll') as HTMLElement;
            if (timeline) {
              timeline.style.animationPlayState = 'paused';
            }
          }}
          onMouseLeave={(e) => {
            const timeline = e.currentTarget.querySelector('.timeline-scroll') as HTMLElement;
            if (timeline) {
              timeline.style.animationPlayState = 'running';
            }
          }}
        >
          <div 
            className="flex items-center relative timeline-scroll"
            style={{
              animation: 'infiniteScroll 45s linear infinite',
              width: 'calc(300% + 100px)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Primera serie de mascotas */}
            {timelineMascots.map((mascot, index) => (
              <div
                key={`first-${index}`}
                className="flex flex-col items-center cursor-pointer transition-all duration-400 relative"
                style={{
                  minWidth: '160px',
                  margin: '0 20px'
                }}
                onClick={() => handleTimelineClick(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Mascot Avatar */}
                <div 
                  className="w-30 h-30 flex items-center justify-center mb-4 transition-all duration-400 relative"
                  style={{
                    width: '160px',
                    height: '160px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    setHoveredAgent(mascot.name);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    setHoveredAgent(null);
                  }}
                >
                  <img 
                    src={getPetImageName(mascot.name, hoveredAgent === mascot.name ? 'frontal' : 'lateral')}
                    alt={`${mascot.name} mascota`}
                    className="w-full h-full object-contain transition-all duration-300"
                    onError={(e) => {
                      // Fallback al emoji si la imagen no carga
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.style.fontSize = '60px';
                      fallback.textContent = mascot.emoji;
                      target.parentNode?.insertBefore(fallback, target);
                    }}
                  />
                </div>

                {/* Popular Badge */}
                {mascot.isPopular && (
                  <div className="absolute -top-2 -right-2 z-10" style={{
                    background: '#4caf50',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    Popular
                  </div>
                )}

                {/* Mascot Name */}
                <div className="text-xl font-bold mb-1" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {mascot.name}
                </div>

                {/* Mascot Category */}
                <div className="text-sm opacity-70" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {mascot.category}
                </div>
              </div>
            ))}

            {/* Serie duplicada para efecto infinito */}
            {timelineMascots.map((mascot, index) => (
              <div
                key={`second-${index}`}
                className="flex flex-col items-center cursor-pointer transition-all duration-400 relative"
                style={{
                  minWidth: '160px',
                  margin: '0 20px'
                }}
                onClick={() => handleTimelineClick(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Mascot Avatar */}
                <div 
                  className="w-30 h-30 flex items-center justify-center mb-4 transition-all duration-400 relative"
                  style={{
                    width: '160px',
                    height: '160px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    setHoveredAgent(mascot.name);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    setHoveredAgent(null);
                  }}
                >
                  <img 
                    src={getPetImageName(mascot.name, hoveredAgent === mascot.name ? 'frontal' : 'lateral')}
                    alt={`${mascot.name} mascota`}
                    className="w-full h-full object-contain transition-all duration-300"
                    onError={(e) => {
                      // Fallback al emoji si la imagen no carga
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.style.fontSize = '60px';
                      fallback.textContent = mascot.emoji;
                      target.parentNode?.insertBefore(fallback, target);
                    }}
                  />
                </div>

                {/* Popular Badge */}
                {mascot.isPopular && (
                  <div className="absolute -top-2 -right-2 z-10" style={{
                    background: '#4caf50',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    Popular
                  </div>
                )}

                {/* Mascot Name */}
                <div className="text-xl font-bold mb-1" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {mascot.name}
                </div>

                {/* Mascot Category */}
                <div className="text-sm opacity-70" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {mascot.category}
                </div>
              </div>
            ))}

            {/* Tercera serie para garantizar infinito */}
            {timelineMascots.map((mascot, index) => (
              <div
                key={`third-${index}`}
                className="flex flex-col items-center cursor-pointer transition-all duration-400 relative"
                style={{
                  minWidth: '160px',
                  margin: '0 20px'
                }}
                onClick={() => handleTimelineClick(index)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Mascot Avatar */}
                <div 
                  className="w-30 h-30 flex items-center justify-center mb-4 transition-all duration-400 relative"
                  style={{
                    width: '160px',
                    height: '160px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    setHoveredAgent(mascot.name);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    setHoveredAgent(null);
                  }}
                >
                  <img 
                    src={getPetImageName(mascot.name, hoveredAgent === mascot.name ? 'frontal' : 'lateral')}
                    alt={`${mascot.name} mascota`}
                    className="w-full h-full object-contain transition-all duration-300"
                    onError={(e) => {
                      // Fallback al emoji si la imagen no carga
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.style.fontSize = '60px';
                      fallback.textContent = mascot.emoji;
                      target.parentNode?.insertBefore(fallback, target);
                    }}
                  />
                </div>

                {/* Popular Badge */}
                {mascot.isPopular && (
                  <div className="absolute -top-2 -right-2 z-10" style={{
                    background: '#4caf50',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    Popular
                  </div>
                )}

                {/* Mascot Name */}
                <div className="text-xl font-bold mb-1" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {mascot.name}
                </div>

                {/* Mascot Category */}
                <div className="text-sm opacity-70" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {mascot.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón destacado */}
        <div className="flex justify-center mt-10">
          <Link
            href="/productos"
            className="px-8 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
          >
            🚀 Ver agentes
          </Link>
        </div>
        
        <style jsx>{`
          @keyframes infiniteScroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes glow {
            0% { filter: blur(8px) opacity(0.7); }
            50% { filter: blur(16px) opacity(1); }
            100% { filter: blur(8px) opacity(0.7); }
          }
          .animate-glow {
            animation: glow 2.5s infinite;
          }
          .animate-pulse-glow {
            animation: pulse 1.8s infinite alternate;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 32px 0 #ec489955, 0 8px 32px 0 #0008; }
            100% { box-shadow: 0 0 64px 8px #ec489999, 0 8px 32px 0 #0008; }
          }
          
          @media (max-width: 1024px) {
            .timeline-scroll {
              animation-duration: 40s;
            }
          }
          
          @media (max-width: 768px) {
            .timeline-scroll {
              animation-duration: 35s;
            }
          }
        `}</style>
      </div>
    </section>
  );
} 