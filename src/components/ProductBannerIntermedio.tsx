import Link from 'next/link';
import { event as trackEvent } from '../lib/analytics';

interface ProductBannerIntermedioProps {
  product: {
    nombre: string;
    slug: { current: string };
    descripcion?: string | null;
    imagen?: any;
    estado?: string;
  };
}

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': '/Personajes/Imagenes-Agentes/Okro/Cabeza/okro-cabeza-frontal.png',
    'Grilla Viralis': '/Personajes/Imagenes-Agentes/Grilla/Cabeza/Grilla-cabeza-frontal.png',
    'Jaime Daily': '/Personajes/Imagenes-Agentes/Jaime/Cabeza/Jaime-cabeza-frontal.png',
    'Lee Der': '/Personajes/Imagenes-Agentes/Lee-Navio/Cabeza/Lee-cabeza-frontal.png',
    'Bafet': '/Personajes/Imagenes-Agentes/Bafet/Cabeza/Bafet-cabeza-frontal.png',
    'Midas': '/Personajes/Imagenes-Agentes/Midas/Cabeza/Midas-cabeza-frontal.png',
    'Vinxi': '/Personajes/Imagenes-Agentes/Vinxi/Cabeza/Vinxi-frontal.png'
  };
  
  return imageMapping[productName] || productName;
}

export default function ProductBannerIntermedio({ product }: ProductBannerIntermedioProps) {
  const getProductIcon = (productName: string) => {
    const icons: { [key: string]: string } = {
      'Plan de Marketing CONVERT': '📊',
      'Sistema SCALE': '🚀',
      'Automatizaciones ia': '⚡',
      'Vinxi': '🦊',
      'Grilla Viralis': '🦗',
      'OKRo': '🐼',
      'Bafet': '🐸',
      'Midas': '🐷',
      'Jaime Daily': '🐔',
      'default': '🚀'
    };
    
    // Buscar coincidencias parciales para nombres que puedan variar
    const normalizedName = productName?.toLowerCase() || '';
    if (normalizedName.includes('scale') || normalizedName.includes('sistema')) {
      return icons['Sistema SCALE'];
    }
    if (normalizedName.includes('marketing') || normalizedName.includes('convert')) {
      return icons['Plan de Marketing CONVERT'];
    }
    if (normalizedName.includes('automatizacion') || normalizedName.includes('automatizaciones')) {
      return icons['Automatizaciones ia'];
    }
    
    return icons[productName] || icons.default;
  };

  const getProductQuestion = (productName: string) => {
    const questions: { [key: string]: string } = {
      'Plan de Marketing CONVERT': '¿Listo para transformar tu marketing?',
      'Sistema SCALE': '¿Listo para propulsar tu negocio?',
      'Automatizaciones ia': '¿Te gustaría automatizar tu negocio?',
      'Vinxi': '¿Tu mente también es un caos?',
      'Grilla Viralis': '¿Quieres dominar tu contenido en redes?',
      'OKRo': '¿Quieres convertir tus metas en logros?',
      'Bafet': '¿Estás listo para invertir con confianza?',
      'Midas': '¿Quieres controlar tus finanzas personales?',
      'Jaime Daily': '¿Listo para cambiar tus hábitos?',
      'Lee Der': '¿Tu equipo está desorganizado?',
      'default': '¿Quieres optimizar tu productividad?'
    };
    
    // Buscar coincidencias parciales para nombres que puedan variar
    const normalizedName = productName?.toLowerCase() || '';
    if (normalizedName.includes('scale') || normalizedName.includes('sistema')) {
      return questions['Sistema SCALE'];
    }
    if (normalizedName.includes('marketing') || normalizedName.includes('convert')) {
      return questions['Plan de Marketing CONVERT'];
    }
    if (normalizedName.includes('automatizacion') || normalizedName.includes('automatizaciones')) {
      return questions['Automatizaciones ia'];
    }
    if (normalizedName.includes('bafet')) {
      return questions['Bafet'];
    }
    if (normalizedName.includes('midas')) {
      return questions['Midas'];
    }
    if (normalizedName.includes('jaime')) {
      return questions['Jaime Daily'];
    }
    if (normalizedName.includes('vinxi')) {
      return questions['Vinxi'];
    }
    if (normalizedName.includes('grilla')) {
      return questions['Grilla Viralis'];
    }
    if (normalizedName.includes('okro')) {
      return questions['OKRo'];
    }
    if (normalizedName.includes('navio')) {
      return questions['Lee Der'];
    }
    
    return questions[productName] || questions.default;
  };

  const getProductLink = (slug: string) => {
    const serviceSlugs = ['automatizaciones-ia', 'automatizacion-ia', 'sistema-scale', 'plan-de-marketing', 'plan-marketing'];
    
    if (serviceSlugs.includes(slug)) {
      const slugMapping: { [key: string]: string } = {
        'automatizaciones-ia': 'automatizacion-ia',
        'automatizacion-ia': 'automatizacion-ia',
        'plan-de-marketing': 'plan-marketing',
        'plan-marketing': 'plan-marketing'
      };
      
      const mappedSlug = slugMapping[slug] || slug;
      return `/servicios/${mappedSlug}`;
    }
    
    return `/productos/${slug}`;
  };

  const getProductDescription = (productName: string, defaultDescription?: string | null) => {
    const descriptions: { [key: string]: string } = {
      'Automatizaciones ia': 'Libera 8-15 horas semanales con Automatización IA',
      'Plan de Marketing CONVERT': 'Potencia tus resultados con Marketing CONVERT.',
      'Sistema SCALE': 'Transformación digital organizada y eficiente en 30 días.',
      'Bafet': 'Controla tus criptomonedas con Bafet.',
      'Midas': 'Midas: paz financiera sin complicaciones.',
      'Jaime Daily': 'Transforma tu vida con Jaime Daily.',
      'Vinxi': 'Transforma ideas en acción con Vinxi.',
      'Grilla Viralis': 'Simplifica tu gestión de contenidos con Grilla Viralis.',
      'OKRo': 'Transforma objetivos difusos en resultados medibles con OKRo',
      'Lee Der': 'Transforma el caos en coordinación efectiva con Lee Der'
    };
    
    // Buscar coincidencias parciales para nombres que puedan variar
    const normalizedName = productName?.toLowerCase() || '';
    if (normalizedName.includes('scale') || normalizedName.includes('sistema')) {
      return descriptions['Sistema SCALE'];
    }
    if (normalizedName.includes('marketing') || normalizedName.includes('convert')) {
      return descriptions['Plan de Marketing CONVERT'];
    }
    if (normalizedName.includes('automatizacion') || normalizedName.includes('automatizaciones')) {
      return descriptions['Automatizaciones ia'];
    }
    if (normalizedName.includes('bafet')) {
      return descriptions['Bafet'];
    }
    if (normalizedName.includes('midas')) {
      return descriptions['Midas'];
    }
    if (normalizedName.includes('jaime')) {
      return descriptions['Jaime Daily'];
    }
    if (normalizedName.includes('vinxi')) {
      return descriptions['Vinxi'];
    }
    if (normalizedName.includes('grilla')) {
      return descriptions['Grilla Viralis'];
    }
    if (normalizedName.includes('okro')) {
      return descriptions['OKRo'];
    }
    if (normalizedName.includes('navio')) {
      return descriptions['Lee Der'];
    }
    
    return descriptions[productName] || defaultDescription || 'Descubre cómo este producto puede ayudarte';
  };

  const getProductLinkText = (slug: string) => {
    // Todos los botones en páginas de artículos siempre dicen "Ver detalles"
    return 'Ver detalles';
  };

  return (
    <div className="product-banner-intermedio">
      <div className="banner-content">
        <div className="banner-icon">
          <img 
            src={getPetImageName(product.nombre)}
            alt={`${product.nombre} mascota`}
            className="w-16 h-16 object-contain"
            onError={(e) => {
              // Fallback al emoji si la imagen no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'text-4xl';
              fallback.textContent = getProductIcon(product.nombre);
              target.parentNode?.insertBefore(fallback, target);
            }}
          />
        </div>
        <div className="banner-text">
          <h3>{getProductQuestion(product.nombre)}</h3>
          <p>{getProductDescription(product.nombre, product.descripcion)}</p>
        </div>
        <Link 
          href={getProductLink(product.slug.current)}
          className="banner-cta"
          onClick={() => { try { trackEvent({ action: 'click_intermediate_banner_cta', category: 'Blog', label: product.slug.current }); } catch {} }}
        >
          {getProductLinkText(product.slug.current)}
        </Link>
      </div>
    </div>
  );
} 