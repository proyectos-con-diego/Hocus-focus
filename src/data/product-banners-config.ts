// Configuración de productos para banners de ads
// Este archivo contiene toda la información necesaria para personalizar
// los banners según el producto relacionado con cada artículo
// 
// ⚠️  IMPORTANTE: UBICACIÓN REAL DE LOS BANNERS EN ARTÍCULOS DE BLOG
// 
// Los anuncios en artículos de blog NO se manejan desde este archivo de configuración.
// Los banners reales se definen en:
// 
// 📍 BANNER SUPERIOR: src/app/blog/[slug]/BlogWrapper.tsx (línea ~67)
//    - Clase CSS: product-banner-superior
//    - Imagen del animalito: className="w-16 h-16 object-contain" (64px × 64px)
//    - Fallback emoji: text-4xl (36px)
// 
// 📍 BANNER LATERAL STICKY: src/app/blog/[slug]/BlogWrapper.tsx (línea ~165)
//    - Ubicación: Sidebar del artículo
//    - Imagen del animalito: className="w-16 h-16 object-contain" (64px × 64px)
//    - Fallback emoji: text-4xl (36px)
// 
// 📍 BANNER INTERMEDIO: src/components/ProductBannerIntermedio.tsx
//    - Clase CSS: product-banner-intermedio
//    - Imagen del animalito: className="w-16 h-16 object-contain" (64px × 64px)
//    - Fallback emoji: text-4xl (36px)
// 
// ❌ COMPONENTES QUE NO SE USAN EN ARTÍCULOS DE BLOG:
//    - src/components/ads/BannerSuperior.tsx (solo emojis, no imágenes)
//    - src/components/ProductBannerSuperior.tsx (no se renderiza)
//    - src/components/PackStickyBanner.tsx (solo en páginas de productos)
// 
// 🔧 PARA MODIFICAR TAMAÑOS DE IMÁGENES EN ARTÍCULOS DE BLOG:
//    1. Editar BlogWrapper.tsx para banners superior y lateral sticky
//    2. Editar ProductBannerIntermedio.tsx para banner intermedio
//    3. NO editar los componentes de ads/ ni ProductBannerSuperior.tsx
// 
// 📱 TAMAÑOS ACTUALES DE IMÁGENES EN ARTÍCULOS DE BLOG:
//    - Banner superior: 64px × 64px (w-16 h-16)
//    - Banner lateral sticky: 64px × 64px (w-16 h-16)
//    - Banner intermedio: 64px × 64px (w-16 h-16)
//    - Fallbacks emoji: 36px (text-4xl)
// 
// ================================================================

export interface ProductBannerConfig {
  name: string;
  slug: string;
  emoji: string;
  color: string;
  gradient: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  metrics?: string;
}

export const productBannersConfig: { [key: string]: ProductBannerConfig } = {
  'jaime-daily': {
    name: 'Jaime Daily',
    slug: 'jaime-daily',
    emoji: '🐔',
    color: '#22c55e',
    gradient: 'linear-gradient(45deg, #22c55e, #10b981)',
    title: 'Jaime Daily - Seguimiento de hábitos',
    description: 'Transforma tu vida diaria y convierte tus hábitos en tu mejor aliado.',
    ctaText: 'Ver detalles',
    ctaLink: '/productos/jaime-daily',
    metrics: '⭐ 4.9/5 • 500+ clientes'
  },
  'vinxi': {
    name: 'Vinxi',
    slug: 'vinxi',
    emoji: '🦊',
    color: '#3b82f6',
    gradient: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
    title: 'Vinxi - Organizador de Productividad',
    description: 'Transforma el caos en claridad y potencia tu creatividad con un sistema único.',
    ctaText: 'Ver detalles',
    ctaLink: '/productos/vinxi',
    metrics: '⭐ 4.8/5 • 300+ proyectos'
  },
  'grilla-viralis': {
    name: 'Grilla Viralis',
    slug: 'grilla-viralis',
    emoji: '🦗',
    color: '#22c55e',
    gradient: 'linear-gradient(45deg, #22c55e, #16a34a)',
    title: 'Grilla Viralis - Crecimiento digital',
    description: 'Transforma el caos creativo en una estrategia organizada.',
    ctaText: 'Ver detalles',
    ctaLink: '/productos/grilla-viralis',
    metrics: '⭐ 4.7/5 • 200+ marcas'
  },
  'okro': {
    name: 'OKRo',
    slug: 'okro',
    emoji: '🐼',
    color: '#2563eb',
    gradient: 'linear-gradient(45deg, #2563eb, #3b82f6)',
    title: 'OKRo - Metas y logros',
    description: 'Convierte objetivos en resultados concretos y claros',
    ctaText: 'Ver detalles',
    ctaLink: '/productos/okro',
    metrics: '⭐ 4.9/5 • 400+ objetivos'
  },
  'midas': {
    name: 'Midas',
    slug: 'midas',
    emoji: '🐷',
    color: '#f97316',
    gradient: 'linear-gradient(45deg, #f97316, #ea580c)',
    title: 'Midas - Finanzas personales',
    description: 'Transforma el caos financiero en tranquilidad y control total.',
    ctaText: 'Ver detalles',
    ctaLink: '/productos/midas',
    metrics: '⭐ 4.8/5 • 250+ usuarios'
  },
  'bafet': {
    name: 'Bafet',
    slug: 'bafet',
    emoji: '🐸',
    color: '#a855f7',
    gradient: 'linear-gradient(45deg, #a855f7, #ec4899)',
    title: 'Bafet - Análisis Crypto',
    description: 'Transforma tus inversiones en decisiones claras y estratégicas.',
    ctaText: 'Ver detalles',
    ctaLink: '/productos/bafet',
    metrics: '🚀 Beta • Próximamente'
  },
  'navio-360': {
    name: 'Lee Der',
    slug: 'navio-360',
    emoji: '🐺',
    color: '#06b6d4',
    gradient: 'linear-gradient(45deg, #06b6d4, #0891b2)',
    title: 'Navío 360 - Gestión de equipos',
    description: 'Convierte el caos en claridad y potencia tu equipo al máximo.',
    ctaText: 'Ver detalles',
    ctaLink: '/productos/navio-360',
    metrics: '🚀 Beta • Próximamente'
  },
  'automatizacion-ia': {
    name: 'AUTOMATE - Automatizaciones iA',
    slug: 'automatizacion-ia',
    emoji: '🤖',
    color: '#8b5cf6',
    gradient: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
    title: 'AUTOMATE - Automatizaciones iA',
    description: 'Implementa sistemas inteligentes en tu negocio y multiplica tu productividad',
    ctaText: 'Ver detalles',
    ctaLink: '/servicios/automatizacion-ia',
    metrics: '⭐ 4.9/5 • 500+ clientes'
  },
  'plan-marketing': {
    name: 'CONVERT - Plan de Marketing',
    slug: 'plan-marketing',
    emoji: '📊',
    color: '#ef4444',
    gradient: 'linear-gradient(45deg, #ef4444, #dc2626)',
    title: 'CONVERT - Plan de Marketing',
    description: 'Transforma tu marketing y multiplica tus clientes con una estrategia clara y efectiva.',
    ctaText: 'Ver detalles',
    ctaLink: '/servicios/plan-marketing',
    metrics: '⭐ 4.9/5 • 200+ estrategias'
  },
  'sistema-scale': {
    name: 'SCALE - Agilidad digital',
    slug: 'sistema-scale',
    emoji: '🏢',
    color: '#f97316',
    gradient: 'linear-gradient(45deg, #f97316, #ea580c)',
    title: 'SCALE - Agilidad digital',
    description: 'Transforma tu negocio en una operación eficiente y escalable en 30 días.',
    ctaText: 'Ver detalles',
    ctaLink: '/servicios/sistema-scale',
    metrics: '⭐ 4.9/5 • 150+ empresas'
  }
};

// Función helper para obtener configuración de banner por slug
export function getProductBannerConfig(productSlug: string): ProductBannerConfig {
  const config = productBannersConfig[productSlug];
  
  if (!config) {
    // Configuración por defecto si no se encuentra el producto
    return {
      name: 'Producto Destacado',
      slug: 'default',
      emoji: '🚀',
      color: '#8b5cf6',
      gradient: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
      title: 'Producto Destacado',
      description: 'Soluciones inteligentes para optimizar tu trabajo y alcanzar tus objetivos',
      ctaText: 'Ver detalles',
      ctaLink: '/productos',
      metrics: '⭐ 4.9/5 • 500+ clientes'
    };
  }
  
  return config;
}

// Función helper para obtener configuración por nombre del producto
export function getProductBannerConfigByName(productName: string): ProductBannerConfig {
  const normalizedName = productName.toLowerCase().replace(/\s+/g, '-');
  
  // Buscar por slug normalizado
  for (const [slug, config] of Object.entries(productBannersConfig)) {
    if (slug === normalizedName || config.name.toLowerCase() === productName.toLowerCase()) {
      return config;
    }
  }
  
  // Si no se encuentra, devolver configuración por defecto
  return getProductBannerConfig('default');
}

// Lista de todos los productos disponibles
export const availableProducts = Object.keys(productBannersConfig);

// Función para validar si un producto existe
export function isValidProduct(productSlug: string): boolean {
  return productSlug in productBannersConfig;
}
