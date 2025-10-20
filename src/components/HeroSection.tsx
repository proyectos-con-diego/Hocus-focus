'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText: string;
  ctaOnClick: () => void;
  ctaIcon?: string;
  secondaryCtaText?: string;
  secondaryCtaOnClick?: () => void;
  imageSrc?: string;
  imageAlt?: string;
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
  ctaText,
  ctaOnClick,
  ctaIcon = "🚀",
  secondaryCtaText,
  secondaryCtaOnClick,
  imageSrc,
  imageAlt,
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
        <div className="flex flex-col items-center text-center">
          {/* Contenido del Hero centrado */}
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
            
            <motion.h2 
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
            </motion.h2>
            
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
      </div>
    </section>
  );
} 