'use client';
import React, { useEffect, useState } from "react";
import HeaderGlass from "../components/HeaderGlass";
import HeroSection from "../components/HeroSection";
import CaseStudySection from "../components/CaseStudySection";
import ServicesSection from "../components/ServicesSection";
import LeadMagnetModal from "../components/LeadMagnetModal";
import ProductCarouselHome from "../components/ProductCarouselHome";
import TestimonialsSection from "../components/TestimonialsSection";
import WorkflowSection from "../components/WorkflowSection";

import AboutMeBanner from "../components/AboutMeBanner";
import BlogSection from "../components/BlogSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import StructuredData, { homePageStructuredData } from "../components/StructuredData";
import { event as trackEvent } from "../lib/analytics";
// import TestForm from "../components/TestForm"; // Eliminado


export default function DiegoPersonalSite() {
  const [leadMagnetOpen, setLeadMagnetOpen] = useState(false);

  useEffect(() => {
    // Track view of newsletter banner if present
    const banner = document.querySelector('#newsletter-banner');
    if (!banner) return;
    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              try { trackEvent({ action: 'view_newsletter', category: 'Home', label: 'newsletter_banner' }); } catch {}
              observer.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      observer.observe(banner as Element);
      return () => observer.disconnect();
    } catch {}
  }, []);

  const handleWhatsAppClick = () => {
    try {
      const phoneNumber = '+5491112345678'; // Reemplazar con tu número real
      const message = encodeURIComponent('Hola Diego! Vi tu sitio web y me interesa saber más sobre tus servicios.');
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error al abrir WhatsApp:', error);
      // Fallback: copiar número al portapapeles
      navigator.clipboard.writeText('+5491112345678');
      alert('Número copiado al portapapeles');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div 
      className="font-sans bg-black text-gray-300 min-h-screen"
      role="main"
      aria-label="Sitio web personal de Diego Gonzalez Vaccaro"
    >
      <StructuredData data={homePageStructuredData} />
      {/* Header Glass */}
      <HeaderGlass 
        pageTitle="🪄 Hocuz Focuz"
        showGhostLogo={false}
        customLinks={[
          { href: '/productos', label: 'Agentes IA' },
          { href: '/servicios', label: 'Servicios' },
          { href: '/blog', label: 'Blog' },
          { href: '/sobre-mi', label: 'Sobre Mí' }
        ]}
        ctaButton={{
          text: "📩 Suscríbete",
          onClick: () => {
            try { trackEvent({ action: 'click_header_subscribe', category: 'Home', label: 'header_cta' }); } catch {}
            const newsletterBanner = document.querySelector('#newsletter-banner');
            if (newsletterBanner) {
              const headerHeight = 80;
              const elementPosition = newsletterBanner.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
              });
            }
          }
        }}
      />

      {/* Hero Section */}
      <HeroSection 
        title="La magia de las automatizaciones"
        subtitle="Ahorra entre 8 y 20 horas semanales eliminando tareas manuales"
        description=""
        ctaText="🚀 Ver servicios"
        ctaOnClick={() => {
          try { trackEvent({ action: 'click_hero_cta', category: 'Home', label: 'ver_servicios' }); } catch {}
          const servicesSection = document.querySelector('[data-section="services"]');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        secondaryCtaText="Ver Agentes IA"
        secondaryCtaOnClick={() => {
          try { trackEvent({ action: 'click_hero_cta', category: 'Home', label: 'ver_agentes_ia' }); } catch {}
          const assistantsSection = document.querySelector('[data-section="assistants"]');
          if (assistantsSection) {
            assistantsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        centered={true}
      />

      {/* Case Study */}
      <CaseStudySection 
        onResultsClick={() => {
          try { trackEvent({ action: 'click_case_study_cta', category: 'Home', label: 'ver_servicios_desde_case_study' }); } catch {}
          const servicesSection = document.querySelector('[data-section="services"]');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* ServicesSection: Cómo puedo ayudarte */}
      <div 
        data-section="services"
        id="services-section"
        data-testid="services-section"
      >
        <ServicesSection />
      </div>

      {/* Workflow Section: Cómo trabajo contigo */}
      <WorkflowSection />

      {/* Testimonios */}
      <TestimonialsSection />

      {/* Carrusel de productos IA */}
      <ProductCarouselHome />



      {/* About Me Banner */}
      <AboutMeBanner />

      {/* Blog */}
      <div 
        data-section="articles"
        id="articles-section"
        data-testid="articles-section"
      >
        <BlogSection />
      </div>

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Lead Magnet Modal */}
      <LeadMagnetModal 
        isOpen={leadMagnetOpen} 
        onClose={() => setLeadMagnetOpen(false)} 
      />

      {/* WhatsApp Button */}
      <div 
        className="fixed bottom-6 right-6 z-40"
        data-testid="whatsapp-button-container"
      >
        <button 
          onClick={handleWhatsAppClick}
          onKeyDown={(e) => handleKeyDown(e, handleWhatsAppClick)}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce focus:outline-none focus:ring-4 focus:ring-green-500/50"
          aria-label="Contactar por WhatsApp"
          role="button"
          tabIndex={0}
          data-testid="whatsapp-button"
        >
          <span className="text-white text-2xl" aria-hidden="true">💬</span>
        </button>
      </div>
    </div>
  );
}