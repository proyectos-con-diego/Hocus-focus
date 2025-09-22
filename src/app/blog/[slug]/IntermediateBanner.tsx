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

  // View tracking
  React.useEffect(() => {
    if (!containerRef.current) return;
    try {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            try { trackEvent({ action: 'view_intermediate_banner', category: 'Blog', label: post?.relatedProduct?.slug?.current || 'rotating' }); } catch {}
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } catch {}
  }, [post?.relatedProduct?.slug?.current]);

  return (
    <div ref={containerRef} className="my-12" data-testid="intermediate-banner">
      <AdIndicator />
      {post.relatedProduct ? (
        <ProductBannerIntermedio product={post.relatedProduct} />
      ) : (
        <RotatingProductBanner />
      )}
    </div>
  );
}
