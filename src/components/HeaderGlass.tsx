'use client';

import { useState } from 'react';
import { useDynamicGradient } from '../hooks/useDynamicGradient';

interface HeaderGlassProps {
  pageTitle: string;
  pageDescription?: string;
  showGhostLogo?: boolean;
  customLinks?: Array<{
    href: string;
    label: string;
  }>;
  ctaButton?: {
    text: string;
    onClick: () => void;
    icon?: string;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
    icon?: string;
  };
}

export default function HeaderGlass({ 
  pageTitle, 
  pageDescription, 
  showGhostLogo = false,
  customLinks,
  ctaButton,
  secondaryButton
}: HeaderGlassProps) {
  const { handleMouseMove, handleMouseLeave } = useDynamicGradient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Links por defecto si no se proporcionan
  const defaultLinks = [
            { href: '/productos', label: 'Agentes IA' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/blog', label: 'Blog' },
            { href: '/sobre-mi', label: 'Sobre Mí' }
  ];

  const links = customLinks || defaultLinks;

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-[20px] bg-black/40 border-b border-cyan-400/20 shadow-lg shadow-cyan-400/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-5 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo y Menú Hamburguesa */}
        <div className="flex items-center gap-3">
          {/* Menú Hamburguesa - Solo en mobile y solo si hay enlaces */}
          {links.length > 0 && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
              aria-label="Abrir menú de navegación"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          )}
          
          <a 
            href="/" 
            className="flex items-center transition-all duration-300 cursor-pointer hover:opacity-80"
          >
            <img 
              src="/Logo-Hocuz-Focuz/Hocuz-Focuz-Logo-corto.png" 
              alt="Hocuz Focuz Logo" 
              className="h-12 sm:h-14 w-auto"
            />
          </a>
        </div>

        {/* Navegación */}
        <div className="hidden md:flex gap-6 lg:gap-8">
          {links.map((link) => {
            // Si el enlace es interno (empieza con #), usar scroll suave
            if (link.href.startsWith('#')) {
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    if (element) {
                      const headerHeight = 80; // Altura aproximada del header
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </button>
              );
            }
            
            // Si es un enlace externo, usar comportamiento normal
            return (
              <a 
                key={link.href}
                href={link.href} 
                className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-sm sm:text-base"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Botón CTA */}
        <div className="flex items-center gap-3">
          {/* Botón Secundario */}
          {secondaryButton && (
            <button 
              className="bg-transparent border border-cyan-400/50 text-cyan-400 font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 hover:translate-y-[-2px]"
              onClick={secondaryButton.onClick}
            >
              {secondaryButton.icon && <span className="mr-2">{secondaryButton.icon}</span>}
              {secondaryButton.text}
            </button>
          )}

          {/* Botón CTA Principal */}
          {ctaButton ? (
            <button 
              className="bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-cyan-400/30"
              onClick={ctaButton.onClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {ctaButton.icon && <span className="mr-2">{ctaButton.icon}</span>}
              {ctaButton.text}
            </button>
          ) : (
            <button 
              className="bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-cyan-400/30"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              🚀 Contactar
            </button>
          )}
        </div>
      </nav>

      {/* Menú Móvil Desplegable - Solo si hay enlaces */}
      {isMobileMenuOpen && links.length > 0 && (
        <div className="md:hidden bg-black/95 backdrop-blur-[20px] border-t border-cyan-400/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col space-y-4">
              {/* Enlaces de navegación */}
              {links.map((link) => {
                // Si el enlace es interno (empieza con #), usar scroll suave
                if (link.href.startsWith('#')) {
                  return (
                    <button
                      key={link.href}
                      onClick={() => {
                        const element = document.querySelector(link.href);
                        if (element) {
                          const headerHeight = 80;
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                          window.scrollTo({
                            top: elementPosition,
                            behavior: 'smooth'
                          });
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-white/80 hover:text-cyan-400 transition-colors duration-300 text-lg py-2 bg-transparent border-none cursor-pointer"
                    >
                      {link.label}
                    </button>
                  );
                }
                
                // Si es un enlace externo, usar comportamiento normal
                return (
                  <a 
                    key={link.href}
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white/80 hover:text-cyan-400 transition-colors duration-300 text-lg py-2"
                  >
                    {link.label}
                  </a>
                );
              })}
              
              {/* Espaciado adicional */}
              <div className="pt-4 border-t border-cyan-400/20">
                {/* Espacio reservado para mantener el espaciado original */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Descripción de la página (opcional) */}
      {pageDescription && (
        <div className="border-t border-cyan-400/10 bg-black/30 backdrop-blur-[10px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 py-3">
            <p className="text-cyan-200/80 text-sm text-center">
              {pageDescription}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
