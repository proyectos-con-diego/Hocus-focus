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
  let productToShow = post.relatedProduct;
  let trackingLabel = post?.relatedProduct?.slug?.current || 'rotating';
  
  // Si el artículo tiene categoría "Marketing y empresa", mostrar Plan de Marketing CONVERT
  const isMarketingArticle = post.categories?.some((cat: any) => 
    cat?.title === 'Marketing y empresa' || cat?.name === 'Marketing y empresa'
  );
  
  if (isMarketingArticle) {
    // Crear un objeto de producto ficticio para el Plan de Marketing CONVERT
    productToShow = {
      nombre: 'Plan de Marketing CONVERT',
      slug: { current: 'plan-marketing' },
      descripcion: 'Potencia tus resultados con Marketing CONVERT.',
      estado: 'disponible'
    };
    trackingLabel = 'plan-marketing';
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
