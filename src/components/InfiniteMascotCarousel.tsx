'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../app/home-carousel.module.css';

const timelineMascots = [
  {
    name: "Jaime Daily",
    emoji: "🐔",
    category: "Hábitos",
    gradientClass: styles['mascot-jaime'],
    isPopular: true,
    slug: "jaime-daily"
  },
  {
    name: "Midas",
    emoji: "🐷",
    category: "Finanzas",
    gradientClass: styles['mascot-midas'],
    isPopular: false,
    slug: "midas"
  },
  {
    name: "Vinxi",
    emoji: "🦊",
    category: "Organización",
    gradientClass: styles['mascot-vinxi'],
    isPopular: false,
    slug: "vinxi"
  },
  {
    name: "Grilla",
    emoji: "🦗",
    category: "Contenido",
    gradientClass: styles['mascot-grilla'],
    isPopular: false,
    slug: "grilla-viralis"
  },
  {
    name: "OKRO",
    emoji: "🐼",
    category: "Objetivos",
    gradientClass: styles['mascot-okro'],
    isPopular: false,
    slug: "okro"
  },
  {
    name: "Bafet",
    emoji: "🐸",
    category: "Crypto",
    gradientClass: styles['mascot-bafet'],
    isPopular: false,
    slug: "bafet"
  },
  {
    name: "Lee Der",
    emoji: "🐺",
    category: "Colaboración",
    gradientClass: styles['mascot-navio'],
    isPopular: false,
    slug: "navio-360"
  }
];

export default function InfiniteMascotCarousel() {
  const router = useRouter();

  const handleTimelineClick = (index: number) => {
    const mascot = timelineMascots[index];
    router.push(`/productos/${mascot.slug}`);
  };

  return (
    <section className="py-16 bg-black">
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Agentes IA destacados</h2>
          <p className="text-lg text-center text-gray-300 opacity-80 max-w-2xl mx-auto">
            Asistentes de IA con personalidad y propósito, creados para ayudarte a lograr más cada día.
          </p>
        </div>
        
        {/* Timeline Container */}
        <div 
          className={`relative w-full py-10 overflow-hidden ${styles['timeline-container']}`}
          onMouseEnter={(e) => {
            const timeline = e.currentTarget.querySelector(`.${styles['timeline-scroll']}`) as HTMLElement;
            if (timeline) {
              timeline.style.animationPlayState = 'paused';
            }
          }}
          onMouseLeave={(e) => {
            const timeline = e.currentTarget.querySelector(`.${styles['timeline-scroll']}`) as HTMLElement;
            if (timeline) {
              timeline.style.animationPlayState = 'running';
            }
          }}
        >
          <div className={`flex items-center relative ${styles['timeline-scroll']}`}>
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
                <div className={`w-30 h-30 rounded-full flex items-center justify-center text-6xl border-4 mb-4 transition-all duration-400 relative shadow-lg ${mascot.gradientClass}`} style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '60px',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.borderColor = 'rgba(156, 39, 176, 0.6)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                }}>
                  {mascot.emoji}
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
                <div className={`w-30 h-30 rounded-full flex items-center justify-center text-6xl border-4 mb-4 transition-all duration-400 relative shadow-lg ${mascot.gradientClass}`} style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '60px',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.borderColor = 'rgba(156, 39, 176, 0.6)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                }}>
                  {mascot.emoji}
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
                <div className={`w-30 h-30 rounded-full flex items-center justify-center text-6xl border-4 mb-4 transition-all duration-400 relative shadow-lg ${mascot.gradientClass}`} style={{
                  width: '120px',
                  height: '120px',
                  fontSize: '60px',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.borderColor = 'rgba(156, 39, 176, 0.6)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                }}>
                  {mascot.emoji}
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
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center mt-10">
            <Link
              href="/productos"
              className="px-8 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl hover:scale-105 transition-transform duration-300 animate-pulse-glow relative overflow-hidden"
              style={{
                boxShadow: '0 0 32px 0 #a21caf55, 0 8px 32px 0 #0008',
              }}
            >
              <span className="relative z-10">🤖 Ver agentes</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-40 blur-lg animate-glow" />
            </Link>
          </div>
        </div>
        <style jsx>{`
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
            0% { box-shadow: 0 0 32px 0 #a21caf55, 0 8px 32px 0 #0008; }
            100% { box-shadow: 0 0 64px 8px #a21caf99, 0 8px 32px 0 #0008; }
          }
        `}</style>
      </div>
    </section>
  );
} 