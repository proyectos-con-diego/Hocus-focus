// ===== AD MANAGER - LÓGICA COMPARTIDA PARA BANNERS =====

import { 
  getAdConfig, 
  getAdConfigByName, 
  getStatusColor, 
  getStatusText,
  adsConfig,
  type AdConfig 
} from '@/data/ads-config';

export interface ProductData {
  nombre: string;
  slug: { current: string };
  descripcion?: string | null;
  imagen?: any;
  estado?: string;
}

export class AdManager {
  private productData: ProductData;
  private adConfig: AdConfig | null;

  constructor(productData: ProductData) {
    this.productData = productData;
    this.adConfig = this.getAdConfig();
  }

  // Obtener configuración del producto
  private getAdConfig(): AdConfig | null {
    // Debug: Log para ver qué datos están llegando
    console.log('🔍 AdManager.getAdConfig Debug:', {
      slugFromSanity: this.productData.slug.current,
      nombreFromSanity: this.productData.nombre,
      availableSlugs: Object.keys(adsConfig),
      availableNames: Object.values(adsConfig).map(c => c.productName)
    });
    
    // Intentar por slug primero
    let config = getAdConfig(this.productData.slug.current);
    console.log('🔍 Config encontrada por slug:', config);
    
    // Si no se encuentra por slug, intentar por nombre
    if (!config) {
      config = getAdConfigByName(this.productData.nombre);
      console.log('🔍 Config encontrada por nombre:', config);
    }
    
    return config;
  }

  // Obtener icono del producto
  getIcon(): string {
    if (this.adConfig) {
      return this.adConfig.icon;
    }
    
    // Fallback a iconos hardcodeados si no hay configuración
    const icons: { [key: string]: string } = {
      'Automatizaciones ia': '🚀',
      'Vinxi': '🦊',
      'Grilla Viralis': '🦗',
      'OKRo': '🐼',
      'Plan de marketing': '📈',
      'Sistema Scale': '⚡',
      'default': '🎯'
    };
    
    return icons[this.productData.nombre] || icons.default;
  }

  // Obtener descripción del producto
  getDescription(): string {
    if (this.adConfig) {
      return this.adConfig.description;
    }
    
    // Fallback a descripciones hardcodeadas
    const descriptions: { [key: string]: string } = {
      'Automatizaciones ia': 'Implementa sistemas inteligentes en tu negocio',
      'Vinxi': 'Sistema de gestión de proyectos todo-en-uno',
      'Grilla Viralis': 'Herramienta de marketing viral y crecimiento',
      'OKRo': 'Convierte metas en logros reales',
      'Plan de marketing': 'Estrategia completa de marketing digital',
      'Sistema Scale': 'Sistema de escalabilidad empresarial',
      'default': 'Optimiza tu productividad empresarial'
    };
    
    return descriptions[this.productData.nombre] || descriptions.default;
  }

  // Obtener pregunta del producto (para banner intermedio)
  getQuestion(): string {
    if (this.adConfig) {
      return this.adConfig.question;
    }
    
    // Fallback a preguntas hardcodeadas
    const questions: { [key: string]: string } = {
      'Automatizaciones ia': '¿Necesitas automatizar tu negocio?',
      'Vinxi': '¿Quieres organizar tu productividad?',
      'Grilla Viralis': '¿Buscas hacer crecer tu marca?',
      'OKRo': '¿Quieres convertir metas en logros?',
      'Plan de marketing': '¿Tu marketing está desorganizado?',
      'Sistema Scale': '¿Quieres escalar tu negocio?',
      'default': '¿Quieres optimizar tu productividad?'
    };
    
    return questions[this.productData.nombre] || questions.default;
  }

  // Obtener solución del producto (para banner intermedio)
  getSolution(): string {
    if (this.adConfig) {
      return this.adConfig.solution;
    }
    
    // Fallback a soluciones hardcodeadas
    const solutions: { [key: string]: string } = {
      'Automatizaciones ia': 'Descubre cómo la IA puede transformar tus procesos',
      'Vinxi': 'Sistema todo-en-uno para gestionar proyectos eficientemente',
      'Grilla Viralis': 'Herramientas virales para escalar tu presencia digital',
      'OKRo': 'Metodología probada para alcanzar objetivos reales',
      'Plan de marketing': 'Estrategia completa para duplicar tus leads',
      'Sistema Scale': 'Metodología probada para escalar tu negocio',
      'default': 'Soluciones inteligentes para optimizar tu trabajo'
    };
    
    return solutions[this.productData.nombre] || solutions.default;
  }

  // Obtener URL del producto
  getUrl(): string {
    if (this.adConfig) {
      console.log('🔍 getUrl: Usando configuración centralizada:', this.adConfig.url);
      return this.adConfig.url;
    }
    
    console.log('🔍 getUrl: Usando fallback para slug:', this.productData.slug.current);
    
    // Fallback a lógica de URLs
    const slug = this.productData.slug.current;
    const serviceSlugs = ['automatizaciones-ia', 'automatizacion-ia', 'sistema-scale', 'plan-de-marketing', 'plan-marketing'];
    
    if (serviceSlugs.includes(slug)) {
      const slugMapping: { [key: string]: string } = {
        'automatizaciones-ia': 'automatizacion-ia',
        'automatizacion-ia': 'automatizacion-ia',
        'plan-de-marketing': 'plan-marketing',
        'plan-marketing': 'plan-marketing'
      };
      
      const mappedSlug = slugMapping[slug] || slug;
      const url = `/servicios/${mappedSlug}`;
      console.log('🔍 getUrl: URL generada para servicio:', url);
      return url;
    }
    
    const url = `/productos/${slug}`;
    console.log('🔍 getUrl: URL generada para producto:', url);
    return url;
  }

  // Obtener texto del CTA
  getCtaText(): string {
    if (this.adConfig) {
      console.log('🔍 getCtaText: Usando configuración centralizada:', this.adConfig.ctaText);
      return this.adConfig.ctaText;
    }
    
    console.log('🔍 getCtaText: Usando fallback para slug:', this.productData.slug.current);
    
    // Fallback a lógica de CTA
    const slug = this.productData.slug.current;
    const serviceSlugs = ['automatizaciones-ia', 'automatizacion-ia', 'sistema-scale', 'plan-de-marketing', 'plan-marketing'];
    const ctaText = serviceSlugs.includes(slug) ? 'Ver servicio' : 'Ver producto';
    console.log('🔍 getCtaText: CTA generado:', ctaText);
    return ctaText;
  }

  // Obtener color del estado
  getStatusColor(): string {
    const estado = this.productData.estado || this.adConfig?.estado;
    return getStatusColor(estado);
  }

  // Obtener texto del estado
  getStatusText(): string {
    const estado = this.productData.estado || this.adConfig?.estado;
    return getStatusText(estado);
  }

  // Verificar si es un servicio
  isService(): boolean {
    if (this.adConfig) {
      return this.adConfig.isService;
    }
    
    const slug = this.productData.slug.current;
    const serviceSlugs = ['automatizaciones-ia', 'automatizacion-ia', 'sistema-scale', 'plan-de-marketing', 'plan-marketing'];
    return serviceSlugs.includes(slug);
  }

  // Obtener datos del producto
  getProductData(): ProductData {
    return this.productData;
  }

  // Obtener configuración completa
  getAdConfigData(): AdConfig | null {
    return this.adConfig;
  }

  // Debug: Log de información
  debug(): void {
    console.log('🔍 AdManager Debug:', {
      productData: this.productData,
      adConfig: this.adConfig,
      icon: this.getIcon(),
      description: this.getDescription(),
      url: this.getUrl(),
      ctaText: this.getCtaText(),
      isService: this.isService(),
      // Debug adicional
      slugFromSanity: this.productData.slug.current,
      nombreFromSanity: this.productData.nombre,
      configFound: !!this.adConfig,
      configSource: this.adConfig ? 'ads-config.ts' : 'fallback'
    });
  }
} 