import Link from 'next/link';
import { event as trackEvent } from '@/lib/analytics';

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
    'OKRo': 'okro panda',
    'Grilla Viralis': 'Grilla',
    'Jaime Daily': 'Jaime Daily',
    'Navio': 'Navio | Lobo',
    'Bafet': 'Bafet',
    'Midas': 'Midas',
    'Vinxi': 'Vinxi',
    'Mythos': 'Mythos'
  };
  
  return imageMapping[productName] || productName;
}

export default function ProductBannerIntermedio({ product }: ProductBannerIntermedioProps) {
  const getProductIcon = (productName: string) => {
    const icons: { [key: string]: string } = {
      'Plan de Marketing CONVERT': '📊',
      'Automatizaciones ia': '⚡',
      'Vinxi': '🦊',
      'Grilla Viralis': '🦗',
      'OKRo': '🐼',
      'Bafet': '🐸',
      'Midas': '🐷',
      'Jaime Daily': '🐔',
      'default': '🚀'
    };
    
    return icons[productName] || icons.default;
  };

  const getProductQuestion = (productName: string) => {
    const questions: { [key: string]: string } = {
      'Plan de Marketing CONVERT': '¿Listo para transformar tu marketing?',
      'Automatizaciones ia': '¿Necesitas automatizar tu negocio?',
      'Vinxi': '¿Quieres organizar tu productividad?',
      'Grilla Viralis': '¿Buscas hacer crecer tu marca?',
      'OKRo': '¿Quieres convertir metas en logros?',
      'Bafet': '¿Quieres analizar el mercado crypto?',
      'Midas': '¿Quieres controlar tus finanzas personales?',
      'Jaime Daily': '¿Quieres crear hábitos inteligentes?',
      'default': '¿Quieres optimizar tu productividad?'
    };
    
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

  const getProductLinkText = (slug: string) => {
    const serviceSlugs = ['automatizaciones-ia', 'automatizacion-ia', 'sistema-scale', 'plan-de-marketing', 'plan-marketing'];
    if (slug === 'plan-marketing') {
      return 'Ver detalles';
    }
    return serviceSlugs.includes(slug) ? 'Ver servicio' : 'Ver producto';
  };

  return (
    <div className="product-banner-intermedio">
      <div className="banner-content">
        <div className="banner-icon">
          <img 
            src={`/Cabezas pets/${getPetImageName(product.nombre)}.png`}
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
          <p>{product.descripcion || 'Descubre cómo este producto puede ayudarte'}</p>
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