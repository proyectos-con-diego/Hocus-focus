import Link from 'next/link';

interface ProductBannerSuperiorProps {
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

export default function ProductBannerSuperior({ product }: ProductBannerSuperiorProps) {
  const getProductIcon = (productName: string) => {
    const icons: { [key: string]: string } = {
      'Automatizaciones ia': '🚀',
      'Vinxi': '🦊',
      'Grilla Viralis': '🦗',
      'OKRo': '🐼',
      'default': '⚡'
    };
    
    return icons[productName] || icons.default;
  };

  const getProductDescription = (productName: string) => {
    const descriptions: { [key: string]: string } = {
      'Automatizaciones ia': 'Implementa sistemas inteligentes en tu negocio',
      'Vinxi': 'Sistema de gestión de proyectos todo-en-uno',
      'Grilla Viralis': 'Herramienta de marketing viral y crecimiento',
      'OKRo': 'Convierte metas en logros reales',
      'default': 'Optimiza tu productividad empresarial'
    };
    
    return descriptions[productName] || descriptions.default;
  };

  // Determinar el color del estado (mismo estilo que ProductRelatedAd)
  const getStatusColor = (estado?: string) => {
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

  // Determinar el texto del estado
  const getStatusText = (estado?: string) => {
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

  return (
    <div className="product-banner-superior">
      <div className="banner-content-superior">
        <div className="banner-icon-superior">
          <img 
            src={`/Cabezas pets/${getPetImageName(product.nombre)}.png`}
            alt={`${product.nombre} mascota`}
            className="w-16 h-16 object-contain"
            style={{ 
              width: '96px !important', 
              height: '96px !important',
              minWidth: '96px',
              minHeight: '96px'
            }}
            onError={(e) => {
              // Fallback al emoji si la imagen no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.className = 'text-5xl';
              fallback.textContent = getProductIcon(product.nombre);
              target.parentNode?.insertBefore(fallback, target);
            }}
          />
        </div>
        <div className="banner-text-superior">
          <div className="banner-title-row">
            <h3>{product.nombre}</h3>
            {product.estado && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.estado)} hidden md:inline-block`}>
                {getStatusText(product.estado)}
              </span>
            )}
          </div>
          <p>{getProductDescription(product.nombre)}</p>
          {product.estado && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.estado)} md:hidden mt-2`}>
              {getStatusText(product.estado)}
            </span>
          )}
        </div>
        <Link 
          href={`/productos/${product.slug.current}`}
          className="banner-cta-superior"
        >
          Ver producto
        </Link>
      </div>
    </div>
  );
} 