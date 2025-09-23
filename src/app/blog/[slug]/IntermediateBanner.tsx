'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { event as trackEvent } from '../../../lib/analytics';

// Importaciones dinámicas para el banner intermedio
const AdIndicator = dynamic(() => import('@/components/AdIndicator'), { ssr: false });
const ProductBannerIntermedio = dynamic(() => import('@/components/ProductBannerIntermedio'), { ssr: false });
const RotatingProductBanner = dynamic(() => import('@/components/RotatingProductBanner'), { ssr: false });

interface IntermediateBannerProps {
  post: any;
}

export default function IntermediateBanner({ post }: IntermediateBannerProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Determinar qué producto/servicio mostrar en el banner intermedio
  // Producto relacionado → Producto específico
  // Sin producto → Plan SCALE
  let productToShow = post.relatedProduct;
  let trackingLabel = post?.relatedProduct?.slug?.current || 'sistema-scale';
  
  if (!productToShow) {
    // Crear un objeto de producto ficticio para el Sistema SCALE
    productToShow = {
      nombre: 'Sistema SCALE',
      slug: { current: 'sistema-scale' },
      descripcion: 'Transformación digital organizada y eficiente en 30 días.',
      estado: 'disponible'
    };
    trackingLabel = 'sistema-scale';
  }

  // View tracking
  React.useEffect(() => {
    if (!containerRef.current) return;
    try {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            try { trackEvent({ action: 'view_intermediate_banner', category: 'Blog', label: trackingLabel }); } catch {}
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } catch {}
  }, [trackingLabel]);

  return (
    <div ref={containerRef} className="my-12" data-testid="intermediate-banner">
      <AdIndicator />
      {productToShow ? (
        <ProductBannerIntermedio product={productToShow} />
      ) : (
        <RotatingProductBanner />
      )}
    </div>
  );
}
