import { PortableText } from '@portabletext/react';
import ShareButtons from '@/components/ShareButtons';
import RelatedArticles from '@/components/RelatedArticles';
import AuthorSection from '@/components/AuthorSection';
import ProductBannerIntermedio from '@/components/ProductBannerIntermedio';
import RotatingProductBanner from '@/components/RotatingProductBanner';
import AdIndicator from '@/components/AdIndicator';
import EngagementTracker from '@/components/EngagementTracker';
import SmartCTA from '@/components/SmartCTA';
import CommentsSection from '@/components/CommentsSection';
import AdvancedMonetization from '@/components/AdvancedMonetization';

interface BlogContentProps {
  body: any[];
  title: string;
  author?: {
    name?: string;
    image?: any;
    bio?: string;
  };
  slug: string;
  categories?: Array<{ title: string }>;
  relatedProduct?: any;
  components: any;
}

export default function BlogContent({
  body,
  title,
  author,
  slug,
  categories,
  relatedProduct,
  components
}: BlogContentProps) {
  // Dividir el contenido en dos mitades para insertar el anuncio intermedio
  const blocks = Array.isArray(body) ? body : [];
  const mid = Math.ceil(blocks.length / 2);
  const firstHalf = blocks.slice(0, mid);
  const secondHalf = blocks.slice(mid);

  // Productos para monetización
  const products = relatedProduct ? [relatedProduct] : [
    {
      nombre: 'Plan de marketing',
      slug: { current: 'plan-marketing' },
      descripcion: 'Estrategia completa de marketing digital',
      estado: 'disponible'
    },
    {
      nombre: 'Vinxi',
      slug: { current: 'vinxi' },
      descripcion: 'Herramienta de automatización',
      estado: 'disponible'
    },
    {
      nombre: 'Sistema Scale',
      slug: { current: 'sistema-scale' },
      descripcion: 'Sistema de escalabilidad empresarial',
      estado: 'disponible'
    }
  ];

  return (
    <div className="flex-1 lg:flex-[2] min-w-0">
      {/* TEST: Div de prueba para verificar que BlogContent se renderiza */}
      <div className="bg-red-500 text-white p-4 mb-4 rounded-lg">
        🚀 TEST: BlogContent se está renderizando correctamente!
      </div>

      {/* Engagement Tracker */}
      <EngagementTracker 
        articleId={slug}
        onEngagementUpdate={(data) => {
          console.log('Engagement actualizado:', data);
        }}
      />

      {/* Contenido del artículo dividido */}
      <section className="mb-4">
        <article 
          className="prose prose-lg max-w-none text-gray-100 bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700 prose-headings:text-white prose-h1:text-white prose-h2:text-blue-400 prose-h3:text-blue-300 prose-p:text-gray-200 prose-li:text-gray-200 prose-strong:text-white prose-blockquote:border-purple-500 prose-blockquote:bg-gray-700/50 prose-blockquote:text-gray-300" 
          role="article" 
          aria-labelledby="article-title"
        >
          <PortableText value={firstHalf} components={components} />
          
          {/* Banner intermedio con producto relacionado */}
          <div className="my-12">
            <AdIndicator />
            {relatedProduct ? (
              <ProductBannerIntermedio product={relatedProduct} />
            ) : (
              <RotatingProductBanner />
            )}
          </div>
          
          <PortableText value={secondHalf} components={components} />
          
          {/* Smart CTA flotante */}
          {relatedProduct && (
            <SmartCTA 
              product={relatedProduct}
              variant="floating"
              trigger="scroll"
            />
          )}
          
          <div className="mt-6 mb-4">
            <ShareButtons title={title} />
          </div>
        </article>
      </section>

      {/* Sistema de monetización avanzado */}
      <AdvancedMonetization 
        products={products}
        articleCategory={categories?.[0]?.title || undefined}
      />

      {/* Sección de comentarios */}
      <CommentsSection 
        articleId={slug}
        articleTitle={title}
      />

      {/* Artículos relacionados */}
      <RelatedArticles currentSlug={slug} categories={categories || []} />

      {/* Tarjeta "Sobre el autor" después de artículos relacionados */}
      <div className="mt-4">
        <AuthorSection 
          author={{
            name: author?.name || 'Diego Gonzalez',
            image: author?.image,
            bio: author?.bio,
            slug: 'sobre-mi'
          }}
        />
      </div>
    </div>
  );
} 