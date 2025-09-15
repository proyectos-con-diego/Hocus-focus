'use client';

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

  // Links por defecto si no se proporcionan
  const defaultLinks = [
            { href: '/productos', label: 'Asistentes IA' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/blog', label: 'Blog' },
            { href: '/sobre-mi', label: 'Sobre Mí' }
  ];

  const links = customLinks || defaultLinks;

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-[20px] bg-black/40 border-b border-cyan-400/20 shadow-lg shadow-cyan-400/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-5 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-2xl bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent">🪄</div>
          <a 
            href="/" 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent hover:from-cyan-300 hover:via-purple-500 hover:to-blue-500 transition-all duration-300 cursor-pointer"
          >
            Hocus Focus
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
