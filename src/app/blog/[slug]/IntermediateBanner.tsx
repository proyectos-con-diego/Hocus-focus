'use client';

import dynamic from 'next/dynamic';

// Importaciones dinámicas para el banner intermedio
const AdIndicator = dynamic(() => import('@/components/AdIndicator'), { ssr: false });
const ProductBannerIntermedio = dynamic(() => import('@/components/ProductBannerIntermedio'), { ssr: false });
const RotatingProductBanner = dynamic(() => import('@/components/RotatingProductBanner'), { ssr: false });

interface IntermediateBannerProps {
  post: any;
}

export default function IntermediateBanner({ post }: IntermediateBannerProps) {
  return (
    <div className="my-12" data-testid="intermediate-banner">
      <AdIndicator />
      {post.relatedProduct ? (
        <ProductBannerIntermedio product={post.relatedProduct} />
      ) : (
        <RotatingProductBanner />
      )}
    </div>
  );
}
