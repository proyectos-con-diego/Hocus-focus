import ProductRelatedAd from '@/components/ProductRelatedAd';
import RotatingServiceBanner from '@/components/RotatingServiceBanner';
import LeadMagnetBanner from '@/components/LeadMagnetBanner';
import LeadMagnetOptimized from '@/components/LeadMagnetOptimized';

interface BlogSidebarProps {
  relatedProduct?: any;
}

export default function BlogSidebar({ relatedProduct }: BlogSidebarProps) {
  return (
    <aside className="w-full lg:w-[320px] relative flex-shrink-0 mt-8 lg:mt-0">
      {/* Banner sticky de servicios o producto relacionado */}
      <div className="sticky top-8 z-10 bg-gray-900/95 backdrop-blur-sm rounded-2xl p-2">
        {relatedProduct ? (
          <ProductRelatedAd product={relatedProduct} variant="sidebar" />
        ) : (
          <RotatingServiceBanner />
        )}
      </div>
      
      {/* Lead magnet optimizado */}
      <div className="relative z-20 mt-8">
        <LeadMagnetOptimized 
          variant="inline"
          trigger="scroll"
          scrollThreshold={50}
        />
      </div>

      {/* Lead magnet original como respaldo */}
      <div className="relative z-20 mt-8">
        <LeadMagnetBanner />
      </div>
    </aside>
  );
} 