'use client';
import React, { useState, useEffect } from 'react';
import { products } from '@/data/products';
import styles from '@/app/productos/productos.module.css';

interface ProductsHeroSectionProps {
  onProductClick: (slug: string) => void;
}

export default function ProductsHeroSection({ onProductClick }: ProductsHeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.querySelector('[data-section="products"]');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20">
      <div className="max-w-7xl mx-auto px-5 py-10" style={{ maxWidth: '1400px' }}>
        <div className="relative min-h-screen flex items-center justify-between gap-16">
          {/* Background gradient effect */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)', zIndex: 1 }} />
          
          {/* Hero Content - Left Side */}
          <div className="relative z-10 flex-1 max-w-2xl" style={{ zIndex: 10 }}>
            {/* Brand Tag */}
            <div 
              className="inline-flex items-center rounded-full px-6 py-3 mb-10 text-sm font-semibold"
              style={{
                background: 'rgba(139, 69, 196, 0.2)',
                border: '1px solid rgba(139, 69, 196, 0.3)',
                borderRadius: '25px',
                boxShadow: '0 4px 15px rgba(139, 69, 196, 0.2)'
              }}
            >
              <span className="mr-3 text-lg">⚡</span>
              Sistemas de Productividad en Notion
            </div>

            {/* Main Heading */}
            <h1 
              className="text-6xl md:text-7xl font-black mb-8 leading-tight tracking-tight"
              style={{
                fontSize: '4.8rem',
                fontWeight: 900,
                marginBottom: '30px',
                lineHeight: 1.1,
                letterSpacing: '-2px',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              Mascotas Virtuales de{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(45deg, #e91e63, #9c27b0, #673ab7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Productividad
              </span>{' '}
              Especializadas
            </h1>

            {/* Description */}
            <p 
              className="text-xl opacity-90 mb-8 leading-relaxed max-w-lg"
              style={{
                fontSize: '1.3rem',
                opacity: 0.9,
                marginBottom: '30px',
                lineHeight: 1.6,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                maxWidth: '520px'
              }}
            >
              7 sistemas <span className="text-purple-300 font-semibold">listos para usar</span> que transforman caos en productividad. Dashboards, bases de datos y flujos optimizados que <span className="text-pink-300 font-semibold">funcionan desde el minuto uno</span>.
            </p>

            {/* CTA Button */}
            <div className="mb-8">
              <button 
                onClick={scrollToProducts}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform duration-300 animate-pulse-glow relative overflow-hidden"
                style={{
                  boxShadow: '0 0 32px 0 #ec489955, 0 8px 32px 0 #0008',
                }}
              >
                <span className="relative z-10">🚀 Ver sistemas disponibles</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-40 blur-lg animate-glow" />
              </button>
            </div>

            {/* Stats */}
            <div 
              className="flex gap-12 mb-12"
              style={{ gap: '50px', marginBottom: '50px' }}
            >
              <div className="text-left">
                <div 
                  className="text-4xl font-black mb-2"
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '8px',
                    textShadow: '0 0 20px rgba(76, 175, 80, 0.3)'
                  }}
                >
                  7
                </div>
                <div className="text-sm opacity-70 font-medium" style={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>Sistemas Especializados</div>
              </div>
              <div className="text-left">
                <div 
                  className="text-4xl font-black mb-2"
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '8px',
                    textShadow: '0 0 20px rgba(76, 175, 80, 0.3)'
                  }}
                >
                  100%
                </div>
                <div className="text-sm opacity-70 font-medium" style={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>Pago Único</div>
              </div>
              <div className="text-left">
                <div 
                  className="text-4xl font-black mb-2"
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 900,
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '8px',
                    textShadow: '0 0 20px rgba(76, 175, 80, 0.3)'
                  }}
                >
                  24/7
                </div>
                <div className="text-sm opacity-70 font-medium" style={{ fontSize: '1rem', opacity: 0.7, fontWeight: 500 }}>Acceso Inmediato</div>
              </div>
            </div>
          </div>

          {/* Mascot Section - Right Side */}
          <div 
            className="relative flex-1 flex items-center justify-center max-w-lg"
            style={{ zIndex: 5, maxWidth: '500px' }}
          >
            <div className="relative" style={{ width: '400px', height: '400px' }}>
              {/* Mascot Slides */}
              {products.map((product, index) => (
                <div
                  key={index}
                  className="absolute inset-0 transition-all duration-1000 ease-in-out"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: index === currentSlide ? 1 : 0,
                    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: index === currentSlide ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)'
                  }}
                >
                                     <div 
                     className={`rounded-full flex items-center justify-center relative overflow-hidden ${product.gradientClass} ${styles['mascot-float']}`}
                     style={{ 
                       width: '350px', 
                       height: '350px', 
                       fontSize: '180px',
                       border: '8px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
                     }}
                   >
                    {/* Rotating gradient effect */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'conic-gradient(transparent, rgba(255, 255, 255, 0.1), transparent)',
                        zIndex: 1,
                        animation: 'rotate 8s linear infinite'
                      }}
                    />
                    {/* Shine effect */}
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), transparent)',
                        borderRadius: '50%',
                        zIndex: 2
                      }}
                    />
                    {/* Emoji */}
                    <span 
                      className="relative drop-shadow-lg"
                      style={{
                        position: 'relative',
                        zIndex: 3,
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                      }}
                    >
                      {product.emoji}
                    </span>
                  </div>
                </div>
              ))}

              {/* Mascot Info */}
              <div 
                className="absolute text-center transition-opacity duration-500"
                style={{
                  position: 'absolute',
                  bottom: '-80px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  opacity: currentSlide >= 0 ? 1 : 0,
                  transition: 'all 0.5s ease'
                }}
              >
                <div 
                  className="text-xl font-bold mb-2 text-white"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#fff'
                  }}
                >
                  {products[currentSlide]?.name}
                </div>
                <div 
                  className="text-sm opacity-70 max-w-72"
                  style={{
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    maxWidth: '280px'
                  }}
                >
                  {products[currentSlide]?.description}
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
          0% { box-shadow: 0 0 32px 0 #ec489955, 0 8px 32px 0 #0008; }
          100% { box-shadow: 0 0 64px 8px #ec489999, 0 8px 32px 0 #0008; }
        }
      `}</style>
    </div>
  );
} 