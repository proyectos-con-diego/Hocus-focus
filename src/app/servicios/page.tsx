"use client";
import React, { useState, useCallback, useEffect } from "react";
import HeaderGlass from '../../components/HeaderGlass';
import HeroSection from '../../components/HeroSection';
import CaseStudySection from '@/components/CaseStudySection';
import ServiciosSection from '@/components/ServiciosSection';
import ServiciosTestimonialsSection from '@/components/ServiciosTestimonialsSection';
import ServiciosFAQSection from '@/components/ServiciosFAQSection';
import ServiciosCTABanner from '@/components/ServiciosCTABanner';
import WorkflowSection from '@/components/WorkflowSection';

export default function ServiciosPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Manejo de errores global
  const handleError = useCallback((errorMessage: string, error?: any) => {
    console.error('Error in ServiciosPage:', error);
    setError(errorMessage);
    
    // Auto-clear error after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, []);

  // Manejo de navegación por teclado
  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      try {
        action();
      } catch (error) {
        handleError('Error al procesar la acción', error);
      }
    }
  }, [handleError]);

  // Scroll tracking para secciones activas
  useEffect(() => {
    const handleScroll = () => {
      try {
        const sections = document.querySelectorAll('[data-section]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
          const element = section as HTMLElement;
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          const sectionId = element.getAttribute('data-section');

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        });
      } catch (error) {
        console.warn('Error tracking scroll position:', error);
      }
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  // Manejo de carga de componentes
  const handleComponentLoad = useCallback((componentName: string) => {
    try {
      setIsLoading(false);
      console.log(`${componentName} loaded successfully`);
    } catch (error) {
      handleError(`Error loading ${componentName}`, error);
    }
  }, [handleError]);

  // Manejo de errores de componentes
  const handleComponentError = useCallback((componentName: string, error: any) => {
    handleError(`Error en ${componentName}`, error);
  }, [handleError]);

  return (
    <main 
      className="min-h-screen bg-black text-gray-200 font-sans"
      role="main"
      aria-label="Página de servicios de Diego Gonzalez Vaccaro"
      data-testid="servicios-page"
    >
      {/* Header Glass */}
      <HeaderGlass 
        pageTitle="🪄 Hocus Focus"
        showGhostLogo={false}
        customLinks={[
          { href: '#servicios', label: 'Servicios' },
          { href: '#workflow', label: '¿Cómo funciona?' },
          { href: '#testimonios', label: 'Testimonios' },
          { href: '#faq', label: 'FAQ' }
        ]}
                ctaButton={{
          text: "🎁 Spirits",
          onClick: () => window.location.href = '/spirit-gpts'
        }}
      />

      {/* Error Display */}
      {error && (
        <div 
          className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 mb-4 mx-4 rounded-lg sticky top-0 z-50"
          role="alert"
          aria-live="assertive"
          data-testid="error-message"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <span className="font-semibold">Error:</span> {error}
            </p>
            <button
              onClick={() => setError(null)}
              className="text-xs text-red-400 hover:text-red-300 ml-4 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label="Cerrar mensaje de error"
              data-testid="close-error"
              onKeyDown={(e) => handleKeyDown(e, () => setError(null))}
              tabIndex={0}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div 
          className="bg-blue-900/20 border border-blue-500/30 text-blue-300 px-4 py-3 mb-4 mx-4 rounded-lg"
          role="status"
          aria-live="polite"
          data-testid="loading-indicator"
        >
          <p className="text-sm">
            <span className="font-semibold">Cargando...</span> Preparando contenido
          </p>
        </div>
      )}

      {/* Hero Section */}
      <HeroSection 
        title="¿Pierdes tiempo en tareas"
        subtitle="repetitivas?"
        description="Te ayudo a crear sistemas automatizados que trabajan 24/7 mientras tú te enfocas en lo que realmente importa para tu negocio."
        ctaText="🚀 Ver servicios"
        ctaOnClick={() => {
          const servicesSection = document.querySelector('#servicios');
          if (servicesSection) {
            const headerHeight = 80;
            const elementPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }}
        imageSrc="/Retratos pets/Midas/midas retrato.png"
        imageAlt="Midas - Servicios de automatización"
      />

      {/* Case Study Section */}
      <section 
        role="region"
        aria-labelledby="case-study-title"
        data-testid="case-study-section"
        data-section="case-study"
      >
        <CaseStudySection 
          onLoad={() => handleComponentLoad('CaseStudySection')}
          onError={(error) => handleComponentError('CaseStudySection', error)}
        />
      </section>

      {/* Services Section */}
      <section 
        id="servicios"
        role="region"
        aria-labelledby="services-title"
        data-testid="services-section"
        data-section="services"
      >
        <ServiciosSection 
          onLoad={() => handleComponentLoad('ServiciosSection')}
          onError={(error) => handleComponentError('ServiciosSection', error)}
        />
      </section>

      {/* Workflow Section: Cómo trabajo contigo */}
      <section 
        id="workflow"
        role="region"
        aria-labelledby="workflow-title"
        data-testid="workflow-section"
        data-section="workflow"
      >
        <WorkflowSection />
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonios"
        role="region"
        aria-labelledby="testimonials-title"
        data-testid="testimonials-section"
        data-section="testimonials"
      >
        <ServiciosTestimonialsSection 
          onLoad={() => handleComponentLoad('ServiciosTestimonialsSection')}
          onError={(error) => handleComponentError('ServiciosTestimonialsSection', error)}
        />
      </section>

      {/* CTA Banner */}
      <section 
        role="banner"
        aria-label="Llamada a la acción"
        data-testid="cta-banner"
        data-section="cta"
      >
        <ServiciosCTABanner 
          onLoad={() => handleComponentLoad('ServiciosCTABanner')}
          onError={(error) => handleComponentError('ServiciosCTABanner', error)}
        />
      </section>

      {/* FAQ Section */}
      <section 
        id="faq"
        role="region"
        aria-labelledby="faq-title"
        data-testid="faq-section"
        data-section="faq"
      >
        <ServiciosFAQSection 
          onLoad={() => handleComponentLoad('ServiciosFAQSection')}
          onError={(error) => handleComponentError('ServiciosFAQSection', error)}
        />
      </section>
      
      {/* Footer */}
      <footer 
        className="py-8 px-6 bg-black border-t border-gray-800"
        role="contentinfo"
        aria-label="Información de contacto y derechos de autor"
        data-testid="footer"
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm" data-testid="copyright">
            © 2025 Diego Gonzalez Vaccaro. Empezando mi aventura como consultor independiente.
          </p>
        </div>
      </footer>

      {/* Skip to Content Link (Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        data-testid="skip-to-content"
      >
        Saltar al contenido principal
      </a>

      {/* Active Section Indicator (for debugging) */}
      {process.env.NODE_ENV === 'development' && activeSection && (
        <div 
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded text-xs z-40"
          data-testid="active-section-indicator"
        >
          Sección: {activeSection}
        </div>
      )}
    </main>
  );
} 