'use client';
import React, { useState, useEffect } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';
import Link from 'next/link';

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
        gradient: "from-purple-500 to-pink-500",
        text: "text-purple-400",
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

// Importar la función centralizada del sistema de blog
import { getReadingContext } from '@/data/blog';

export default function BlogSection({ hoverColor }: { hoverColor?: string }) {
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', subscribeNewsletter: true });
  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'newsletter',
    source: 'blog-newsletter'
  });

  useEffect(() => {
    setLoadingArticles(true);
    fetch('/api/articles')
      .then(response => response.json())
      .then((data: any) => {
        // Verificar que data.articles existe y es un array
        if (data.success && Array.isArray(data.articles)) {
          setLatestArticles(data.articles.slice(0, 3)); // Tomar solo los primeros 3
        } else {
          console.warn('No se encontraron artículos:', data);
          setLatestArticles([]);
        }
        setLoadingArticles(false);
      })
      .catch(error => {
        console.error('Error loading articles:', error);
        setLatestArticles([]);
        setLoadingArticles(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/notion-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'homepage'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('¡Gracias! Te has suscrito exitosamente.');
        setFormData({ name: '', email: '', subscribeNewsletter: true });
      } else {
        setSubmitMessage(result.error || 'Error al suscribirse');
      }
    } catch (error) {
      setSubmitMessage('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Últimos artículos</h2>
        <p className="text-center text-gray-400 mb-12">Reflexiones y metodologías que he desarrollado</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loadingArticles ? (
            <div className="col-span-3 text-center text-gray-500 py-16">Cargando artículos...</div>
          ) : latestArticles.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 py-16">No hay artículos publicados aún.</div>
          ) : (
            latestArticles.map((a) => {
              const category = a.categories && a.categories[0]?.title;
              const colorClasses = getCategoryColorClasses(category);
              const publishedDate = a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' }) : '';
              const readingTime = calculateReadingTime(a.body);
              const context = getReadingContext(readingTime);
              return (
                <Link key={a._id} href={a.slug ? `/blog/${a.slug}` : "#"} className="group">
                  <article className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-cyan-400/30">
                    {/* Franja de color - desaparece en hover */}
                    <div className={`h-2 bg-gradient-to-r ${colorClasses.gradient} group-hover:opacity-0 transition-opacity duration-300`}></div>
                    {/* Imagen del artículo */}
                    {a.mainImage ? (
                      <img src={typeof a.mainImage === 'string' ? a.mainImage : a.mainImage.asset?.url} alt={a.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                    ) : (
                      <img src="/blog-default.png" alt="Imagen por defecto del blog" className="w-full h-48 object-cover opacity-80 group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        {/* Etiqueta de categoría estilo pill */}
                        <span className={`text-xs font-semibold bg-gray-900/60 px-3 py-1 rounded-full border border-gray-700/40 ${colorClasses.text} group-hover:scale-105 transition-transform duration-300`}>{category || 'Sin categoría'}</span>
                        <span className={`flex items-center gap-1 text-xs font-semibold ${context.color} group-hover:scale-105 transition-transform duration-300`}>
                          <span>{context.icon}</span>
                          <span>{readingTime} min</span>
                        </span>
                      </div>
                      <h3 className={`font-bold text-lg text-white mb-2 transition-colors duration-300 ${hoverColor ? '' : 'group-hover:text-cyan-400'}`}
                        style={hoverColor ? { transition: 'color 0.3s', color: 'white' } : {}}
                        onMouseEnter={hoverColor ? (e => (e.currentTarget as HTMLElement).style.color = hoverColor) : undefined}
                        onMouseLeave={hoverColor ? (e => (e.currentTarget as HTMLElement).style.color = 'white') : undefined}
                      >
                        {a.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {a.excerpt || ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start">
                          <span className="text-xs text-gray-500 mb-0.5">{publishedDate}</span>
                          <span className="text-xs text-gray-400 font-medium">Por {a.author?.name || a.author || "Diego Gonzalez"}</span>
                        </div>
                        <span className={`${context.color} text-xs font-medium bg-gray-700/50 px-2 py-1 rounded-md border border-gray-600/30 group-hover:scale-105 transition-transform duration-300`}>
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
        <div id="newsletter-banner" className="relative max-w-6xl mx-auto mt-16 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
            boxShadow: '0 0 0 4px #a21caf55, 0 0 40px 8px #a21caf33'
          }} />
          <div className="relative bg-[#181a2a] bg-opacity-90 rounded-3xl text-center py-16 px-12">
            <div className="max-w-4xl mx-auto">
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
              <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-6 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full md:w-1/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
                    placeholder="Tu nombre" 
                    required
                  />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full md:w-2/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
                    placeholder="Tu mejor email" 
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.subscribeNewsletter}
                  className="px-10 py-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 whitespace-nowrap"
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
      </div>
    </section>
  );
} 