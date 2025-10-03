'use client';
import React, { useState, useEffect } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';
import Link from 'next/link';
// Removed direct Sanity import - using API route instead

// Función para obtener clases de color de categoría
function getCategoryColorClasses(category: string) {
  switch (category) {
    case "Economía y finanzas":
      return {
        gradient: "from-blue-500 to-cyan-500",
        text: "text-blue-400",
      };
    case "Desarrollo personal":
      return {
        gradient: "from-green-500 to-emerald-500",
        text: "text-green-400",
      };
    case "Proyectos y productos":
      return {
        gradient: "from-yellow-500 to-orange-500",
        text: "text-yellow-400",
      };
    case "Inteligencia artificial":
      return {
        gradient: "from-purple-500 to-blue-500",
        text: "text-purple-400",
      };
    case "Marketing y empresa":
      return {
        gradient: "from-pink-500 to-rose-500",
        text: "text-pink-400",
      };
    case "Productividad":
      return {
        gradient: "from-purple-500 to-pink-600",
        text: "text-purple-400",
      };
    case "Management":
      return {
        gradient: "from-blue-500 to-cyan-600",
        text: "text-blue-400",
      };
    case "TDAH":
      return {
        gradient: "from-green-500 to-emerald-600",
        text: "text-green-400",
      };
    default:
      return {
        gradient: "from-gray-500 to-gray-600",
        text: "text-gray-400",
      };
  }
}

// Función para calcular el tiempo de lectura
function calculateReadingTime(body: any): number {
  if (!Array.isArray(body)) return 1;
  const words = body.reduce((total: number, block: any) => {
    if (block._type === "block" && block.children) {
      return total + block.children.reduce((blockTotal: number, child: any) => {
        return blockTotal + (child.text || "").split(/\s+/).length;
      }, 0);
    }
    return total;
  }, 0);
  return Math.max(1, Math.ceil(words / 200));
}

// Función para icono y color del tiempo de lectura
function getReadingContext(minutes: number) {
  if (minutes <= 2) return { icon: '⚡', color: 'text-green-400', label: 'Tip rápido' };
  if (minutes <= 5) return { icon: '⏱️', color: 'text-blue-400', label: 'Lectura corta' };
  if (minutes <= 10) return { icon: '📖', color: 'text-purple-400', label: 'Lectura media' };
  return { icon: '🔥', color: 'text-pink-400', label: 'Lectura larga' };
}

interface ProductRelatedArticlesProps {
  productSlug: string;
  productColor: string;
}

export default function ProductRelatedArticles({ productSlug, productColor }: ProductRelatedArticlesProps) {
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  
  // Estado para el formulario de newsletter
  const [formData, setFormData] = useState({ name: '', email: '', subscribeNewsletter: true });
  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'newsletter',
    source: 'blog-newsletter'
  });

  useEffect(() => {
    setLoadingArticles(true);
    
    // Fetch articles from API route instead of direct Sanity query
    fetch('/api/articles')
      .then(response => response.json())
      .then(data => {
        if (data.success && data.articles) {
          // Filter articles related to this product
          const related = data.articles.filter((article: any) => 
            article.relatedProduct && article.relatedProduct.slug === productSlug
          ).slice(0, 6);
          setRelatedArticles(related);
        } else {
          setRelatedArticles([]);
        }
        setLoadingArticles(false);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setRelatedArticles([]);
        setLoadingArticles(false);
      });
  }, [productSlug]);

  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🔥 ProductRelatedArticles: handleSubmit llamado!', { formData, isSubmitting });
    e.preventDefault();
    console.log('🚀 ProductRelatedArticles: Enviando formulario...', { formData });
    
    try {
      const success = await submitToMake({
        name: formData.name,
        email: formData.email,
        subscribeNewsletter: formData.subscribeNewsletter
      });

      console.log('✅ ProductRelatedArticles: Resultado:', success);

      if (success) {
        setFormData({ name: '', email: '', subscribeNewsletter: true });
      }
    } catch (error) {
      console.error('❌ ProductRelatedArticles: Error:', error);
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Artículos Relacionados</h2>
        <p className="text-center text-gray-400 mb-12">Más contenido sobre este producto</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loadingArticles ? (
            <div className="col-span-full text-center text-gray-500 py-16">Cargando artículos...</div>
          ) : relatedArticles.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-16">No hay artículos relacionados aún.</div>
          ) : (
            relatedArticles.map((article) => {
              const category = article.categories && article.categories[0]?.title;
              const colorClasses = getCategoryColorClasses(category);
              const readingTime = calculateReadingTime(article.body);
              const context = getReadingContext(readingTime);
              return (
                <Link key={article._id} href={article.slug ? `/blog/${article.slug}` : "#"} className="group"
                  onMouseEnter={(e) => {
                    const titleElement = e.currentTarget.querySelector('h3') as HTMLElement;
                    if (titleElement) {
                      titleElement.style.color = productColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    const titleElement = e.currentTarget.querySelector('h3') as HTMLElement;
                    if (titleElement) {
                      titleElement.style.color = '#ffffff';
                    }
                  }}>
                  <article className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 cursor-pointer"
                    style={{
                      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 0 ${productColor}40, 0 25px 50px -12px ${productColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
                    }}>
                    {/* Franja de color */}
                    <div className={`h-2 bg-gradient-to-r ${colorClasses.gradient}`}></div>
                    {/* Imagen del artículo */}
                    {article.mainImage ? (
                      <img src={typeof article.mainImage === 'string' ? article.mainImage : article.mainImage.asset?.url} alt={article.title} className="w-full h-48 object-cover" loading="lazy" />
                    ) : (
                      <img src="/blog-default.png" alt="Imagen por defecto del blog" className="w-full h-48 object-cover opacity-80" loading="lazy" />
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        {/* Etiqueta de categoría estilo pill */}
                        <span className={`text-xs font-semibold bg-gray-900/60 px-3 py-1 rounded-full border border-gray-700/40 ${colorClasses.text}`}>{category || 'Sin categoría'}</span>
                        <span className={`flex items-center gap-1 text-xs font-semibold ${context.color}`}>
                          <span>{context.icon}</span>
                          <span>{readingTime} min</span>
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt || ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start">
                          <span className="text-xs text-gray-500 mb-0.5">
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Reciente'}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">Por {article.author?.name || article.author || "Diego Gonzalez"}</span>
                        </div>
                        <span className={`${context.color} text-xs font-medium bg-gray-700/50 px-2 py-1 rounded-md border border-gray-600/30`}>
                          {context.label}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
        {/* Banner de suscripción con fondo oscuro y glow degradado */}
        <div className="relative max-w-6xl mx-auto mt-16 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
            boxShadow: '0 0 0 4px #a21caf55, 0 0 40px 8px #a21caf33'
          }} />
          <div className="relative bg-[#181a2a] bg-opacity-90 rounded-3xl text-center py-16 px-12">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
              <span className="text-4xl md:text-5xl">🎁</span> <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Suscríbete y recibe recursos exclusivos</span>
            </h3>
            <p className="text-white/90 mb-10 text-lg max-w-3xl mx-auto leading-relaxed">
              Artículos y recursos sobre productividad, IA y optimización, sin ruido innecesario.
            </p>
            
            {submitMessage && (
              <div className={`w-full max-w-4xl mx-auto mb-6 p-4 rounded-xl text-center font-medium ${
                submitMessage.includes('Gracias') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-6 max-w-4xl mx-auto" role="form" aria-label="Formulario de suscripción al newsletter">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full md:w-1/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
                  placeholder="Tu nombre" 
                  aria-label="Nombre para suscripción"
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full md:w-2/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
                  placeholder="Tu mejor email" 
                  aria-label="Email para suscripción"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.subscribeNewsletter}
                className="px-10 py-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 whitespace-nowrap"
                aria-label="Suscribirse al newsletter"
              >
                {isSubmitting ? 'Suscribiendo...' : 'Suscribirme'}
              </button>
            </form>
            
            <div className="flex items-start space-x-3 mt-6 max-w-4xl mx-auto">
              <input
                type="checkbox"
                id="subscribeNewsletter"
                name="subscribeNewsletter"
                checked={formData.subscribeNewsletter}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-pink-500 bg-white/10 border-white/20 rounded focus:ring-pink-400/50 focus:ring-2"
              />
            <label htmlFor="subscribeNewsletter" className="text-sm text-white/80 leading-relaxed">
              Quiero recibir artículos y recursos exclusivos en mi email.
            </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 