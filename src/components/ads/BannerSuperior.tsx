import Link from 'next/link';
import { getAdConfig } from '@/data/ads-config';

interface BannerSuperiorProps {
  productSlug: string;
  productName?: string;
  productEstado?: string;
  className?: string;
}

export default function BannerSuperior({ 
  productSlug, 
  productName, 
  productEstado, 
  className = '' 
}: BannerSuperiorProps) {
  const adConfig = getAdConfig(productSlug);
  
  if (!adConfig) {
    console.warn(`No se encontró configuración para el producto: ${productSlug}`);
    return null;
  }

  const displayName = productName || adConfig.productName;
  const displayEstado = productEstado || 'disponible';

  return (
    <div className={`product-banner-superior ${className}`}>
      <div className="banner-content-superior">
        <div className="banner-icon-superior">
          {adConfig.icon}
        </div>
        <div className="banner-text-superior">
          <div className="banner-title-row">
            <h3>{displayName}</h3>
            {displayEstado && (
              <span className="px-2 py-1 rounded-full text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/30 hidden md:inline-block">
                {displayEstado}
              </span>
            )}
          </div>
          <p>{adConfig.description}</p>
          {displayEstado && (
            <span className="px-2 py-1 rounded-full text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/30 md:hidden mt-2">
              {displayEstado}
            </span>
          )}
        </div>
        <Link 
          href={adConfig.url}
          className="banner-cta-superior"
        >
          {adConfig.ctaText}
        </Link>
      </div>
    </div>
  );
} 