import Link from 'next/link';
import { getReadingContext } from '@/data/blog';

interface BlogHeroProps {
  title: string;
  excerpt?: string;
  author?: {
    name?: string;
    image?: any;
  };
  publishedAt: string;
  readingTime?: number;
  categories?: Array<{ title: string }>;
  mainImageUrl: string;
}

export default function BlogHero({
  title,
  excerpt,
  author,
  publishedAt,
  readingTime,
  categories,
  mainImageUrl
}: BlogHeroProps) {
  // Formatear fecha
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })
    : 'Fecha no disponible';

  return (
    <section className="relative h-[60vh] flex overflow-hidden" aria-label="Encabezado del artículo">
      {/* Imagen de fondo con overlay */}
      <div 
        className="hero-image absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mainImageUrl})`,
        }}
        role="img"
        aria-label={`Imagen de fondo para el artículo: ${title}`}
      />
      
      {/* Overlay más claro para dar protagonismo a la imagen */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/70" />
      
      {/* Contenido del hero */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              {/* Categorías */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories?.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  {title}
                </h1>
                {excerpt && (
                  <p className="text-xl text-gray-200 leading-relaxed max-w-3xl">
                    {excerpt}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">
                {author?.name ? author.name[0] : 'A'}
              </div>
              <div>
                <div className="font-semibold text-white text-base leading-tight">
                  <Link 
                    href="/sobre-mi"
                    className="hover:text-purple-300 transition-colors duration-300 cursor-pointer"
                  >
                    {author?.name || 'Autor'}
                  </Link>
                </div>
                <div className="text-gray-300 text-sm mt-0.5">
                  {formattedDate}
                  {readingTime && (
                    <>
                      {' '}• <span className={`${getReadingContext(readingTime).color} font-medium`}>
                        <span className="mr-1">{getReadingContext(readingTime).icon}</span>
                        {readingTime} min
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 