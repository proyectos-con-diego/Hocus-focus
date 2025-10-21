'use client';

import dynamic from 'next/dynamic';
import { getProductBannerConfig } from '../../../data/product-banners-config';
import Link from 'next/link';
import { useEffect } from 'react';
import { event as trackEvent } from '../../../lib/analytics';

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': 'okro-panda',
    'Grilla Viralis': 'Grilla',
    'Jaime Daily': 'Jaime-Daily',
    'Navio': 'Navio-Lobo',
    'Bafet': 'Bafet',
    'Midas': 'Midas',
    'Vinxi': 'Vinxi',
    'Mythos': 'Mythos'
  };
  
  return imageMapping[productName] || productName;
}

// Importaciones dinámicas para componentes cliente
const ParallaxEffect = dynamic(() => import('./ParallaxEffect'), { ssr: false });
const ArticleContent = dynamic(() => import('./ArticleContent'), { ssr: false });

interface BlogWrapperProps {
  post: any;
  firstHalf: any[];
  secondHalf: any[];
  children: React.ReactNode;
}

export default function BlogWrapper({ post, firstHalf, secondHalf, children }: BlogWrapperProps) {
  // Determinar qué producto/servicio mostrar en los banners
  // Producto relacionado → Producto específico
  // Sin producto → Plan SCALE
  const productSlug = post.relatedProduct?.slug?.current || 'sistema-scale';
  const productConfig = getProductBannerConfig(productSlug);

  // Track vista de artículo
  useEffect(() => {
    try { trackEvent({ action: 'view_article', category: 'Blog', label: post?.slug?.current || '' }); } catch {}
  }, [post?.slug?.current]);

  // Scroll depth tracking (25/50/75/100)
  useEffect(() => {
    try {
      const fired: Record<number, boolean> = { 25: false, 50: false, 75: false, 100: false } as any;
      const onScroll = () => {
        const doc = document.documentElement;
        const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        const height = doc.scrollHeight - doc.clientHeight;
        if (height <= 0) return;
        const pct = Math.min(100, Math.round((scrollTop / height) * 100));
        [25, 50, 75, 100].forEach((mark) => {
          if (!fired[mark] && pct >= mark) {
            try { trackEvent({ action: 'scroll_depth', category: 'Blog', label: String(mark) }); } catch {}
            fired[mark] = true;
          }
        });
        if (fired[25] && fired[50] && fired[75] && fired[100]) {
          window.removeEventListener('scroll', onScroll as any);
        }
      };
      window.addEventListener('scroll', onScroll as any, { passive: true } as any);
      return () => window.removeEventListener('scroll', onScroll as any);
    } catch {}
  }, []);

  return (
    <>
      <ParallaxEffect />
      {children}
      
      {/* Banner superior después del hero - Solo el contenedor interior */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          {/* Solo el banner con gradiente, sin contenedor exterior gris */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4 md:p-6 border border-purple-500/30">
            <div className="text-gray-400 text-xs mb-3 font-medium tracking-wide uppercase">PUBLICIDAD</div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* Imagen del animalito */}
              <div className="flex-shrink-0 order-1 md:order-1">
                <img 
                  src={`/Cabezas-pets/${getPetImageName(productConfig.name)}.png`}
                  alt={`${productConfig.name} mascota`}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  onError={(e) => {
                    // Fallback al emoji si la imagen no carga
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'text-3xl md:text-4xl';
                    fallback.textContent = productConfig.emoji;
                    target.parentNode?.insertBefore(fallback, target);
                  }}
                />
              </div>
              
              {/* Contenido del banner */}
              <div className="flex-1 min-w-0 order-2 md:order-2 text-center md:text-left">
                <h3 className="text-white font-semibold text-base md:text-lg mb-2 leading-tight">
                  {productConfig.title}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm mb-2 leading-relaxed">
                  {productConfig.description}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-gray-400">
                  <span>{productConfig.metrics}</span>
                </div>
              </div>
              
              {/* Botón CTA */}
              <div className="flex-shrink-0 order-3 md:order-3 w-full md:w-auto">
                <a 
                  href={productConfig.ctaLink} 
                  onClick={() => { try { trackEvent({ action: 'click_article_banner_cta', category: 'Blog', label: productSlug }); } catch {} }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap w-full md:w-auto text-center block"
                >
                  {productConfig.ctaText}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Layout principal optimizado - Un solo contenedor central */}
        <div className="max-w-7xl mx-auto px-6 bg-transparent" style={{ background: 'transparent !important' }}>
          <div className="flex flex-col lg:flex-row gap-8 bg-transparent" style={{ background: 'transparent !important' }}>
            {/* Columna principal del contenido - Fondo transparente para quitar el efecto gris azulado */}
            <div className="flex-1 lg:flex-[2] bg-transparent" data-testid="main-content" style={{ background: 'transparent !important' }}>
              <section className="mb-4 bg-transparent" data-testid="article-content" style={{ background: 'transparent !important' }}>
                <ArticleContent 
                  post={post} 
                  firstHalf={firstHalf} 
                  secondHalf={secondHalf} 
                />
              </section>
              
              {/* Share buttons con iconos reales */}
              <div className="mt-8 mb-8">
                <h3 className="text-white font-semibold mb-4 text-lg">COMPARTIR ESTE ARTÍCULO</h3>
                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-600/30">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Tarjeta "Sobre el autor" más compacta */}
              <div className="mt-8 mb-8">
                <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-xl p-6 border border-gray-600/40 backdrop-blur-sm">
                  <div className="text-gray-400 text-xs mb-3 font-medium tracking-wide uppercase">EL AUTOR</div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-lg flex-shrink-0">
                      {post.author?.name ? post.author.name[0] : 'D'}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg mb-1">{post.author?.name || 'Diego Gonzalez'}</h4>
                      <p className="text-gray-300 text-sm mb-1">Especialista en productividad y desarrollo profesional</p>
                      <p className="text-gray-400 text-xs mb-3">Ayudando a profesionales a maximizar su potencial con IA y automatización</p>
                      <Link 
                        href="/sobre-mi"
                        className="inline-block text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300 underline decoration-purple-400/30 hover:decoration-purple-300/60"
                      >
                        Conoce más sobre mí →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar optimizado - Solo el contenedor interior con gradiente */}
            <aside className="w-full lg:w-[320px] flex-shrink-0">
              {/* Banner sticky - Solo el contenedor interior */}
              <div className="sticky top-8 z-0">
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-5 border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={`/Cabezas-pets/${getPetImageName(productConfig.name)}.png`}
                      alt={`${productConfig.name} mascota`}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        // Fallback al emoji si la imagen no carga
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.className = 'text-4xl';
                        fallback.textContent = productConfig.emoji;
                        target.parentNode?.insertBefore(fallback, target);
                      }}
                    />
                    <div>
                      <h4 className="text-white font-semibold">{productConfig.name}</h4>
                      <p className="text-gray-300 text-sm">Solución profesional</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{productConfig.description}</p>
                  <a 
                    href={productConfig.ctaLink} 
                    onClick={() => { try { trackEvent({ action: 'click_article_sidebar_cta', category: 'Blog', label: productSlug }); } catch {} }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 block text-center"
                  >
                    {productConfig.ctaText}
                  </a>
                </div>
              </div>
              
              {/* Lead magnet - Solo el contenedor interior */}
              <div className="mt-6 relative z-10">
                <div className="bg-gray-800 rounded-lg p-6 border border-pink-500/30">
                  <h3 className="text-white font-semibold mb-3 text-lg">Guía de Productividad</h3>
                  <p className="text-gray-300 text-sm mb-4">Recibe mis mejores reflexiones directamente en tu email.</p>
                  <div className="space-y-2 mb-4 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Recuperar 10+ horas semanales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Automatizar tareas repetitivas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Estrategias de IA para negocios</span>
                    </div>
                  </div>
                  <input 
                    type="email" 
                    placeholder="Tu email" 
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white text-sm mb-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                    Suscribirme
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
