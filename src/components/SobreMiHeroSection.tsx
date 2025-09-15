'use client';
import React, { useRef, useEffect, useCallback } from 'react';
import { heroData } from '@/data/sobre-mi';

interface SobreMiHeroSectionProps {
  onGoToContact: () => void;
}

export default function SobreMiHeroSection({ onGoToContact }: SobreMiHeroSectionProps) {
  const scrollToServices = () => {
    const servicesSection = document.querySelector('[data-section="services"]');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToArticles = () => {
    const articlesSection = document.querySelector('[data-section="articles"]');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const quoteRef = useRef<HTMLQuoteElement>(null);
  
  useEffect(() => {
    if (!quoteRef.current) return;
    
    const quote = quoteRef.current;
    let i = 0;
    quote.textContent = '';
    
    function typeWriter() {
      if (i < heroData.quote.length) {
        quote.textContent += heroData.quote.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }
    
    const timer = setTimeout(typeWriter, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-20 px-6 overflow-hidden" style={{ background: '#111' }}>
      {/* Overlay de gradiente de color */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-500/10 via-amber-400/10 to-purple-800/5" />
      {/* Overlay oscuro para contraste */}
      <div className="absolute inset-0 z-0 bg-black/80" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="max-w-xl mx-auto lg:mx-0">
            <div className="inline-block bg-orange-500/15 border border-orange-500/30 rounded-xl px-4 py-2 mb-5 backdrop-blur">
              <p className="text-amber-200 text-xs font-semibold">{heroData.badge}</p>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
                {heroData.title}
              </span>
              <br />
              <span className="text-white">{heroData.subtitle}</span>
            </h1>
            
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-400/10 border-l-4 border-orange-500 rounded-xl py-6 px-8 mb-8 backdrop-blur">
              <blockquote 
                ref={quoteRef} 
                className="text-amber-200 italic text-lg lg:text-xl min-h-[1.5em]" 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={scrollToServices}
                className="px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transform transition-all duration-300 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white animate-pulse-glow relative overflow-hidden"
                style={{
                  boxShadow: '0 0 32px 0 #f9731655, 0 8px 32px 0 #0008',
                }}
              >
                <span className="relative z-10">🚀 Ver servicios</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 opacity-40 blur-lg animate-glow" />
              </button>
              <button 
                onClick={scrollToArticles}
                className="px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 group relative overflow-hidden border-orange-500 text-orange-500"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  📝 Suscribirme al boletín
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                  aria-hidden="true"
                />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              {heroData.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2 text-green-400">✓</span>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl transform rotate-6 animate-pulse opacity-30" />
              <div className="relative bg-gradient-to-br from-amber-400 to-yellow-300 rounded-2xl p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 w-80 h-80">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full flex items-center justify-center text-6xl text-white font-bold mb-6 border-4 border-white/20 shadow-lg mx-auto">
                    DG
                  </div>
                  <div className="text-gray-900 font-extrabold text-2xl mb-2">Diego González</div>
                  <div className="text-gray-700 font-semibold text-lg">Optimizador de Procesos</div>
                </div>
              </div>
            </div>
          </div>
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
          0% { box-shadow: 0 0 32px 0 #f9731655, 0 8px 32px 0 #0008; }
          100% { box-shadow: 0 0 64px 8px #f9731699, 0 8px 32px 0 #0008; }
        }
      `}</style>
    </section>
  );
} 