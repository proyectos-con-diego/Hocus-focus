// ===== CONFIGURACIÓN CENTRALIZADA DE ADS =====
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

export interface AdConfig {
  productName: string;
  slug: string;
  icon: string;
  description: string;
  question: string;
  solution: string;
  ctaText: string;
  url: string;
  isService: boolean;
  estado?: string;
  categoria?: string;
}

export const adsConfig: { [key: string]: AdConfig } = {
  'automatizaciones-ia': {
    productName: 'Automatizaciones ia',
    slug: 'automatizaciones-ia',
    icon: '🚀',
    description: 'Implementa sistemas inteligentes en tu negocio',
    question: '¿Necesitas automatizar tu negocio?',
    solution: 'Descubre cómo la IA puede transformar tus procesos',
    ctaText: 'Ver servicio',
    url: '/servicios/automatizacion-ia',
    isService: true,
    estado: 'disponible',
    categoria: 'automatizacion'
  },
  'automatizacion-ia': {
    productName: 'Automatizaciones ia',
    slug: 'automatizacion-ia',
    icon: '🚀',
    description: 'Implementa sistemas inteligentes en tu negocio',
    question: '¿Necesitas automatizar tu negocio?',
    solution: 'Descubre cómo la IA puede transformar tus procesos',
    ctaText: 'Ver servicio',
    url: '/servicios/automatizacion-ia',
    isService: true,
    estado: 'disponible',
    categoria: 'automatizacion'
  },
  'plan-de-marketing': {
    productName: 'Plan de marketing',
    slug: 'plan-de-marketing',
    icon: '📈',
    description: 'Estrategia completa de marketing digital',
    question: '¿Tu marketing está desorganizado?',
    solution: 'Estrategia completa para duplicar tus leads',
    ctaText: 'Ver servicio',
    url: '/servicios/plan-marketing',
    isService: true,
    estado: 'disponible',
    categoria: 'marketing'
  },
  'plan-marketing': {
    productName: 'Plan de marketing',
    slug: 'plan-marketing',
    icon: '📈',
    description: 'Estrategia completa de marketing digital',
    question: '¿Tu marketing está desorganizado?',
    solution: 'Estrategia completa para duplicar tus leads',
    ctaText: 'Ver servicio',
    url: '/servicios/plan-marketing',
    isService: true,
    estado: 'disponible',
    categoria: 'marketing'
  },
  'sistema-scale': {
    productName: 'Sistema Scale',
    slug: 'sistema-scale',
    icon: '⚡',
    description: 'Sistema de escalabilidad empresarial',
    question: '¿Quieres escalar tu negocio?',
    solution: 'Metodología probada para escalar tu negocio',
    ctaText: 'Ver servicio',
    url: '/servicios/sistema-scale',
    isService: true,
    estado: 'disponible',
    categoria: 'escalabilidad'
  },
  'vinxi': {
    productName: 'Vinxi',
    slug: 'vinxi',
    icon: '🦊',
    description: 'Sistema de gestión de proyectos todo-en-uno',
    question: '¿Quieres organizar tu productividad?',
    solution: 'Sistema todo-en-uno para gestionar proyectos eficientemente',
    ctaText: 'Ver producto',
    url: '/productos/vinxi',
    isService: false,
    estado: 'disponible',
    categoria: 'productividad'
  },
  'grilla-viralis': {
    productName: 'Grilla Viralis',
    slug: 'grilla-viralis',
    icon: '🦗',
    description: 'Herramienta de marketing viral y crecimiento',
    question: '¿Buscas hacer crecer tu marca?',
    solution: 'Herramientas virales para escalar tu presencia digital',
    ctaText: 'Ver producto',
    url: '/productos/grilla-viralis',
    isService: false,
    estado: 'en-desarrollo',
    categoria: 'marketing'
  },
  'okro': {
    productName: 'OKRo',
    slug: 'okro',
    icon: '🐼',
    description: 'Convierte metas en logros reales',
    question: '¿Quieres convertir metas en logros?',
    solution: 'Metodología probada para alcanzar objetivos reales',
    ctaText: 'Ver producto',
    url: '/productos/okro',
    isService: false,
    estado: 'proximamente',
    categoria: 'productividad'
  }
};

// Función para obtener configuración por slug
export const getAdConfig = (slug: string): AdConfig | null => {
  return adsConfig[slug] || null;
};

// Función para obtener configuración por nombre de producto
export const getAdConfigByName = (productName: string): AdConfig | null => {
  console.log('🔍 getAdConfigByName Debug:', {
    searchingFor: productName,
    searchingForLength: productName.length,
    searchingForChars: productName.split('').map((char, i) => ({ char, code: char.charCodeAt(0), index: i })),
    availableNames: Object.values(adsConfig).map(c => c.productName),
    availableNamesWithLengths: Object.values(adsConfig).map(c => ({ name: c.productName, length: c.productName.length })),
    exactMatch: Object.values(adsConfig).find(c => c.productName === productName),
    caseInsensitiveMatch: Object.values(adsConfig).find(
      config => config.productName.toLowerCase() === productName.toLowerCase()
    )
  });
  
  const config = Object.values(adsConfig).find(
    config => config.productName.toLowerCase() === productName.toLowerCase()
  );
  return config || null;
};

// Función para obtener todos los slugs disponibles
export const getAllAdSlugs = (): string[] => {
  return Object.keys(adsConfig);
};

// Función para obtener todas las configuraciones
export const getAllAdConfigs = (): AdConfig[] => {
  return Object.values(adsConfig);
};

// Función para obtener configuración por categoría
export const getAdConfigsByCategory = (categoria: string): AdConfig[] => {
  return Object.values(adsConfig).filter(config => config.categoria === categoria);
};

// Función para obtener configuración por estado
export const getAdConfigsByStatus = (estado: string): AdConfig[] => {
  return Object.values(adsConfig).filter(config => config.estado === estado);
};

// Función para obtener solo servicios
export const getServiceConfigs = (): AdConfig[] => {
  return Object.values(adsConfig).filter(config => config.isService);
};

// Función para obtener solo productos
export const getProductConfigs = (): AdConfig[] => {
  return Object.values(adsConfig).filter(config => !config.isService);
};

// Función para obtener el color del estado
export const getStatusColor = (estado?: string): string => {
  switch (estado) {
    case 'disponible':
      return 'text-green-400 bg-green-400/10 border-green-400/30';
    case 'en-desarrollo':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    case 'proximamente':
      return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  }
};

// Función para obtener el texto del estado
export const getStatusText = (estado?: string): string => {
  switch (estado) {
    case 'disponible':
      return 'Disponible';
    case 'en-desarrollo':
      return 'En desarrollo';
    case 'proximamente':
      return 'Próximamente';
    default:
      return 'Estado no definido';
  }
}; 