'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  tagline?: string; // Nueva prop para el lema manuscrito
  ctaText: string;
  ctaOnClick: () => void;
  ctaIcon?: string;
  secondaryCtaText?: string;
  secondaryCtaOnClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
  centered?: boolean; // Nueva prop para activar el diseño centrado
  gradientColors?: {
    from: string;
    via?: string;
    to: string;
  };
  textGradient?: {
    from: string;
    via?: string;
    to: string;
  };
}

export default function HeroSection({
  title,
  subtitle,
  description,
  tagline,
  ctaText,
  ctaOnClick,
  ctaIcon = "🚀",
  secondaryCtaText,
  secondaryCtaOnClick,
  imageSrc,
  imageAlt,
  centered = false,
  gradientColors = {
    from: "from-[#0c0c0c]",
    via: "via-[#1a1a2e]",
    to: "to-[#16213e]"
  },
  textGradient = {
    from: "from-white",
    via: "via-cyan-400",
    to: "to-purple-600"
  }
}: HeroSectionProps) {
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, delay: string, duration: string}>>([]);


  useEffect(() => {
    // Crear menos partículas y más ligeras
    const particleCount = 8;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${Math.random() * 2 + 2}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="pt-32 pb-20 relative min-h-screen flex items-center">
      {/* Partículas de fondo (contenidas al section) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-cyan-400/40 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              transition: 'transform 300ms ease, opacity 300ms ease'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        {centered ? (
          // Diseño centrado para HOME
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent leading-tight"
              >
                <div className="block">
                  <span className="bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent">
                    HOCUZ
                  </span>
                </div>
                <div className="block">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    FOCUZ
                  </span>
                </div>
              </motion.h1>
              
              {/* Lema manuscrito */}
              {tagline && (
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-normal mb-8 text-gray-400 leading-relaxed font-amatic-sc"
                >
                  {tagline}
                </motion.h2>
              )}
              
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white/90 leading-tight"
              >
                {title}
                {subtitle && (
                  <>
                    <br />
                    <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {subtitle}
                    </span>
                  </>
                )}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
              
              {/* Botones CTA centrados */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                {/* Botón Principal */}
                <button 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-pink-500/30 w-full sm:w-auto"
                  onClick={ctaOnClick}
                >
                  {ctaText}
                </button>
                
                {/* Botón Secundario */}
                {secondaryCtaText && secondaryCtaOnClick && (
                  <button 
                    className="bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 font-semibold text-lg sm:text-xl px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 hover:scale-110 transform w-full sm:w-auto"
                    onClick={secondaryCtaOnClick}
                  >
                    {secondaryCtaText}
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        ) : (
          // Diseño original para productos y servicios
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contenido del Hero */}
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent leading-tight"
              >
                {title}
                {subtitle && (
                  <>
                    <br className="hidden md:block" />
                    <span className="block md:inline bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {subtitle}
                    </span>
                  </>
                )}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 leading-relaxed max-w-2xl"
              >
                {description}
              </motion.p>
              
              {/* Botones CTA */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              >
                {/* Botón Principal */}
                <button 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-pink-500/30 w-full sm:w-auto"
                  onClick={ctaOnClick}
                >
                  {ctaText}
                </button>
                
                {/* Botón Secundario */}
                {secondaryCtaText && secondaryCtaOnClick && (
                  <button 
                    className="bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-110 transform w-full sm:w-auto"
                    onClick={secondaryCtaOnClick}
                  >
                    {secondaryCtaText}
                  </button>
                )}
              </motion.div>
            </div>

            {/* Imagen del Hero (opcional) */}
            {imageSrc && (
              <div className="relative flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative"
                >
                  {/* Efecto de brillo simplificado */}
                  <div className="absolute inset-0 rounded-full"
                    style={{
                      opacity: 0.35,
                      background: 'radial-gradient(closest-side, rgba(34,211,238,0.25), transparent 70%)'
                    }}
                  />
                  
                  {/* Imagen principal */}
                  <img
                    src={imageSrc}
                    alt={imageAlt || "Hero Image"}
                    loading="eager"
                    decoding="async"
                    className="relative z-10 w-full h-auto max-w-md mx-auto lg:max-w-lg xl:max-w-xl object-contain bg-transparent transition-transform duration-500 will-change-transform hover:scale-105"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.3))',
                      mixBlendMode: 'multiply',
                      transform: 'translateZ(0)'
                    }}
                  />
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
} 