'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import HeaderGlass from '../../components/HeaderGlass';
import HeroSection from '../../components/HeroSection';
import ProductCard from '@/components/ProductCard';
import ProductsTestimonialsSection from '@/components/ProductsTestimonialsSection';
import ProductsFAQSection from '@/components/ProductsFAQSection';
import { products } from '@/data/products';
import StructuredData, { productsPageStructuredData } from '@/components/StructuredData';
import BlogNewsletterSection from '../../components/BlogNewsletterSection';
import { event as trackEvent } from '@/lib/analytics';

export default function ProductosNuevoPage() {
  const router = useRouter();
  const animationTimeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const hasTrackedNewsletterView = useRef(false);

  const handleProductClick = (slug: string) => {
    try {
      trackEvent({ action: 'product_click', category: 'Productos', label: slug });
    } catch {}
    router.push(`/productos/${slug}`);
  };

  // Animación de entrada escalonada simplificada sin hooks personalizados
  useEffect(() => {
    const cards = document.querySelectorAll('.product-card');
    
    // Limpiar timeouts anteriores
    animationTimeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    animationTimeoutRefs.current = [];

    const animateCard = (card: Element, index: number) => {
      const cardElement = card as HTMLElement;
      cardElement.style.opacity = '0';
      cardElement.style.transform = 'translateY(30px)';
      
      const timeout = setTimeout(() => {
        cardElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        cardElement.style.opacity = '1';
        cardElement.style.transform = 'translateY(0)';
      }, index * 100 + 200); // Reducido de 150ms a 100ms para mejor performance
      
      animationTimeoutRefs.current.push(timeout);
    };

    // Aplicar animación directamente sin debounce
    cards.forEach((card, index) => {
      animateCard(card, index);
    });

    // Cleanup function optimizada
    return () => {
      animationTimeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      animationTimeoutRefs.current = [];
    };
  }, []);

  // Track: vista del bloque de newsletter
  useEffect(() => {
    const el = document.getElementById('newsletter');
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasTrackedNewsletterView.current) {
        hasTrackedNewsletterView.current = true;
        try {
          trackEvent({ action: 'view_newsletter', category: 'Productos', label: 'newsletter_section' });
        } catch {}
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="text-white overflow-x-hidden bg-black">
      <StructuredData data={productsPageStructuredData} />
      {/* SEO: ItemList con productos */}
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: products.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `https://diegogonzalezvaccaro.com/productos/${p.slug}`,
          item: {
            '@type': 'Product',
            name: p.nombre,
            description: p.descripcion,
            url: `https://diegogonzalezvaccaro.com/productos/${p.slug}`,
          },
        })),
      }} />
      {/* Header Glass */}
      <HeaderGlass 
        pageTitle="🪄 Hocus Focus"
        showGhostLogo={false}
        customLinks={[
          { href: '#productos', label: 'Asistentes IA' },
          { href: '#como-funciona', label: '¿Cómo funciona?' },
          { href: '#testimonios', label: 'Testimonios' },
          { href: '#faq', label: 'FAQ' }
        ]}
        ctaButton={{
          text: "📩 Suscríbete",
          onClick: () => {
            try { trackEvent({ action: 'click_header_subscribe', category: 'Productos', label: 'header_cta' }); } catch {}
            const newsletter = document.getElementById('newsletter');
            if (newsletter) {
              newsletter.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      />

      {/* Hero Section */}
      <HeroSection 
        title="Asistentes IA que te hacen la vida más fácil"
        subtitle=""
        description="Trabaja en equipo con asistentes digitales que se integran a tu rutina y te ayudan a avanzar más rápido cada día. Amarás llevarlos contigo."
        ctaText="🚀 Ver asistentes IA"
        ctaOnClick={() => {
          try { trackEvent({ action: 'click_hero_cta', category: 'Productos', label: 'ver_asistentes' }); } catch {}
          const productsSection = document.querySelector('[data-section="products"]');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        imageSrc="/Retratos pets/Vinxi/Vinxi retrato.png"
        imageAlt="Vinxi - Mascota IA trabajando"
      />

      {/* Products Section */}
      <div id="productos" className="container mx-auto px-5 py-10" style={{ maxWidth: '1300px' }} data-section="products">
        <div className="mb-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontSize: '2.8rem', fontWeight: 800 }}>
              Asistentes IA para hábitos, proyectos, finanzas y más
            </h2>
            <p className="text-xl opacity-80" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
              Cada una resuelve un problema específico de tu vida digital
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-5" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '40px', 
            paddingTop: '20px' 
          }}>
            {products.map((product, index) => (
              <ProductCard 
                key={product.slug}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="como-funciona" className="py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-2 text-white">¿Cómo funcionan?</h2>
          <p className="text-center text-gray-400 mb-12">Proceso simple para empezar con tus asistentes</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Elige tu asistente</h3>
              <p className="text-gray-400">Selecciona el asistente que mejor se adapte a tus necesidades actuales</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Configuración personalizada</h3>
              <p className="text-gray-400">Adapta el asistente a tu estilo de vida y objetivos específicos</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Resultados inmediatos</h3>
              <p className="text-gray-400">Comienza a ver mejoras en tus hábitos y productividad desde el primer día</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonios">
        <ProductsTestimonialsSection />
      </div>

      {/* BANNER CTA DE PRODUCTOS-NUEVO */}
      <section className="py-20 px-6 bg-gradient-to-r relative overflow-hidden" style={{
        background: 'linear-gradient(to right, #7c3aed, #4c1d95)'
      }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight">¿Listo para transformar tu productividad?</h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            <span>Únete a cientos de personas que ya están viendo resultados con mis asistentes de IA.</span><br />
            <span className="text-purple-300 font-semibold">Empieza gratis hoy mismo.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300">
              🚀 Ver todos los asistentes
            </button>
            <button className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white hover:text-purple-900 transition-all duration-300">
              📞 Agendar consulta gratuita
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div id="faq">
        <ProductsFAQSection />
      </div>

      {/* Newsletter Section al final */}
      <div id="newsletter" className="max-w-7xl mx-auto px-6">
        <BlogNewsletterSection />
      </div>

      {/* Navegación de regreso */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <a 
              href="/"
              className="inline-flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
            >
              <span className="text-xl">←</span> Volver al inicio
            </a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="py-8 px-6 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Diego Gonzalez Vaccaro. Empezando mi aventura como consultor independiente.
          </p>
        </div>
      </footer>
    </div>
  );
} 