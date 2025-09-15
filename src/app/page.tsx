'use client';
import React, { useState } from "react";
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


export default function DiegoPersonalSite() {
  const [leadMagnetOpen, setLeadMagnetOpen] = useState(false);

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
      {/* Header Glass */}
      <HeaderGlass 
        pageTitle="🪄 Hocus Focus"
        showGhostLogo={false}
        customLinks={[
          { href: '/productos', label: 'Asistentes IA' },
          { href: '/servicios', label: 'Servicios' },
          { href: '/blog', label: 'Blog' },
          { href: '/sobre-mi', label: 'Sobre Mí' }
        ]}
        ctaButton={{
          text: "📩 Suscríbete",
          onClick: () => {
            const articlesSection = document.querySelector('[data-section="articles"]');
            if (articlesSection) {
              articlesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      />

      {/* Hero Section */}
      <HeroSection 
        title="Ahorra entre 8 y 20 horas semanales"
        subtitle="eliminando tareas manuales"
        description="Transforma tu caos en procesos claros y automatizados para que avances más rápido, sin perder energía en lo repetitivo."
        ctaText="🚀 Ver servicios"
        ctaOnClick={() => {
          const servicesSection = document.querySelector('[data-section="services"]');
          if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
                            secondaryCtaText="Ver Asistentes IA"
        secondaryCtaOnClick={() => {
          const assistantsSection = document.querySelector('[data-section="assistants"]');
          if (assistantsSection) {
            assistantsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        imageSrc="/Retratos pets/Okro/okro retrato.png"
        imageAlt="OKRo - Sistema automatizado trabajando"
      />

      {/* Case Study */}
      <CaseStudySection />

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