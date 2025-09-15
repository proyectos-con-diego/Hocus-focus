import { urlFor } from '@/sanity/sanity';
import Link from 'next/link';
import { products } from '@/data/products';

interface ProductRelatedAdProps {
  product: {
    nombre: string;
    slug: { current: string };
    descripcion?: string;
    imagen?: {
      asset?: {
        _ref: string;
      };
    };
    estado?: string;
  };
  variant?: 'banner' | 'sidebar' | 'sidebar-long' | 'inline';
  className?: string;
}

export default function ProductRelatedAd({ product, variant = 'banner', className = '' }: ProductRelatedAdProps) {
  if (!product) {
    return null;
  }

  // Función para obtener el emoji del producto
  const getProductEmoji = (productName: string) => {
    const foundProduct = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    return foundProduct?.emoji || '📦';
  };

  // Función para obtener la línea poderosa del producto
  const getProductTagline = (productName: string) => {
    const foundProduct = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    return foundProduct?.description || 'Solución profesional';
  };

  // Función para determinar la URL correcta según el tipo de producto/servicio
  const getProductLink = (slug: string) => {
    const serviceSlugs = ['automatizaciones-ia', 'automatizacion-ia', 'sistema-scale', 'plan-de-marketing', 'plan-marketing'];
    
    if (serviceSlugs.includes(slug)) {
      // Mapear slugs de Sanity a slugs de carpetas
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

  // Función para determinar el texto correcto del botón
  const getProductLinkText = (slug: string) => {
    const serviceSlugs = ['automatizaciones-ia', 'automatizacion-ia', 'sistema-scale', 'plan-de-marketing', 'plan-marketing'];
    return serviceSlugs.includes(slug) ? 'Ver servicio' : 'Ver producto';
  };

  // Determinar el color del estado
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

  // Renderizar según el tipo de anuncio
  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 shadow-lg ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-purple-400 font-medium">Producto relacionado</span>
          <span className="text-xs text-gray-400">Anuncio</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-lg bg-gray-700 flex items-center justify-center text-4xl">
              {getProductEmoji(product.nombre)}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white">{product.nombre}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.estado)}`}>
                {getStatusText(product.estado)}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              {getProductTagline(product.nombre)}
            </p>
            {product.descripcion && (
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {product.descripcion}
              </p>
            )}
            <Link
              href={getProductLink(product.slug.current)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 hover:scale-105"
            >
              {getProductLinkText(product.slug.current)}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-gray-800 rounded-lg p-4 border border-gray-700 shadow-sm h-[300px] flex flex-col ${className}`}>
        <div className="text-center mb-3">
          <span className="text-xs text-purple-400 font-medium uppercase tracking-wide">Producto relacionado</span>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          {/* Icono y título */}
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">{getProductEmoji(product.nombre)}</div>
            <h4 className="text-lg font-bold text-white mb-2">{product.nombre}</h4>
            <p className="text-gray-300 text-sm mb-2 leading-relaxed">
              {getProductTagline(product.nombre)}
            </p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.estado)} mb-3`}>
              {getStatusText(product.estado)}
            </span>
          </div>
          
          {product.descripcion && (
            <p className="text-gray-300 text-sm text-center mb-6 leading-relaxed line-clamp-3">
              {product.descripcion}
            </p>
          )}
          
          <Link
            href={getProductLink(product.slug.current)}
            className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center"
          >
            {getProductLinkText(product.slug.current)}
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar-long') {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-sm h-[600px] flex flex-col ${className}`}>
        <div className="text-center mb-4">
          <span className="text-xs text-purple-400 font-medium">Producto relacionado</span>
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Icono del producto */}
          <div className="text-center mb-4">
            <div className="text-7xl mb-4">{getProductEmoji(product.nombre)}</div>
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">{product.nombre}</h3>
              <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                {getProductTagline(product.nombre)}
              </p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.estado)} mb-4`}>
                {getStatusText(product.estado)}
              </span>
              {product.descripcion && (
                <p className="text-gray-300 text-sm mb-6 line-clamp-4 leading-relaxed">
                  {product.descripcion}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <Link
                href={getProductLink(product.slug.current)}
                className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-center"
              >
                {getProductLinkText(product.slug.current)} completo
              </Link>
              
              <div className="text-center">
                <p className="text-gray-500 text-xs">¿Te interesa este producto?</p>
                <p className="text-gray-400 text-xs">Haz clic para conocer más detalles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant inline
  return (
    <div className={`bg-gray-800/50 rounded-lg p-4 border border-gray-600 ${className}`}>
      <div className="flex items-center gap-3">
        {product.imagen && (
          <img
            src={urlFor(product.imagen).width(80).height(80).url()}
            alt={product.nombre}
            className="w-[80px] h-[80px] rounded-lg object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white">{product.nombre}</h4>
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(product.estado)}`}>
              {getStatusText(product.estado)}
            </span>
          </div>
          {product.descripcion && (
            <p className="text-gray-400 text-xs line-clamp-1">
              {product.descripcion}
            </p>
          )}
        </div>
        <Link
          href={getProductLink(product.slug.current)}
          className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
        >
          {getProductLinkText(product.slug.current).replace('Ver ', '')}
        </Link>
      </div>
    </div>
  );
} 