"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sanityClient } from '@/sanity/sanity';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

export default function ArticulosSobreMiV2() {
  const [articulos, setArticulos] = useState<any[]>([]);
  
  // Estado para el formulario de newsletter
  const [formData, setFormData] = useState({ name: '', email: '', subscribeNewsletter: true });
  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'newsletter',
    source: 'blog-newsletter'
  });
  const [loading, setLoading] = useState(true);

  // Función para obtener colores por categoría (igual que en productos)
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
          gradient: "from-indigo-500 to-purple-500",
          text: "text-indigo-400",
        };
      case "Hábitos":
        return {
          gradient: "from-green-500 to-teal-500",
          text: "text-green-400",
        };
      default:
        return {
          gradient: "from-gray-500 to-gray-600",
          text: "text-gray-400",
        };
    }
  }

  // Función para calcular tiempo de lectura
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

  // Función para obtener contexto de lectura
  function getReadingContext(minutes: number) {
    if (minutes <= 2) return { icon: '⚡', color: 'text-green-400', label: 'Tip rápido' };
    if (minutes <= 5) return { icon: '⏱️', color: 'text-blue-400', label: 'Lectura corta' };
    if (minutes <= 10) return { icon: '📖', color: 'text-purple-400', label: 'Lectura media' };
    return { icon: '🔥', color: 'text-pink-400', label: 'Lectura larga' };
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post" && defined(slug.current) && (isHidden != true)] | order(publishedAt desc)[0...3] {
        _id,
        title,
        excerpt,
        categories[]->{title},
        readTime,
        publishedAt,
        "slug": slug.current,
        "mainImage": mainImage.asset->url,
        body,
        author->{name}
      }`;
      const posts = await sanityClient.fetch(query);
      console.log('Posts from Sanity:', posts); // Debug
      setArticulos(posts.map((post: any) => ({
        ...post,
        category: post.categories?.[0]?.title || 'Sin categoría',
        published: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Reciente',
      })));
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Función para manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await fetch('/api/notion-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'sobre-mi'
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
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Mis Últimos Artículos</h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">Reflexiones y metodologías que he desarrollado</p>
        </div>
        {loading ? (
          <div className="text-center text-gray-400 py-12">Cargando artículos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulos.map((a) => {
              const colorClasses = getCategoryColorClasses(a.category);
              const readingTime = calculateReadingTime(a.body);
              const context = getReadingContext(readingTime);
              
              return (
                <Link key={a._id} href={`/blog/${a.slug}`} className="group">
                  <article className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105 border border-gray-700 cursor-pointer">
                    {/* Franja de color */}
                    <div className={`h-2 bg-gradient-to-r ${colorClasses.gradient}`}></div>
                    {/* Imagen del artículo */}
                    {a.mainImage ? (
                      <img src={a.mainImage} alt={a.title} className="w-full h-48 object-cover" loading="lazy" />
                    ) : (
                      <img src="/blog-default.png" alt="Imagen por defecto del blog" className="w-full h-48 object-cover opacity-80" loading="lazy" />
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        {/* Etiqueta de categoría estilo pill */}
                        <span className={`text-xs font-semibold bg-gray-900/60 px-3 py-1 rounded-full border border-gray-700/40 ${colorClasses.text}`}>
                          {a.category}
                        </span>
                        <span className={`flex items-center gap-1 text-xs font-semibold ${context.color}`}>
                          <span>{context.icon}</span>
                          <span>{readingTime} min</span>
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                        {a.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{a.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start">
                          <span className="text-xs text-gray-500 mb-0.5">{a.published}</span>
                          <span className="text-xs text-gray-400 font-medium">Por {a.author?.name || a.author || "Diego Gonzalez"}</span>
                        </div>
                        <span className={`${context.color} text-xs font-medium bg-gray-700/50 px-2 py-1 rounded-md border border-gray-600/30`}>
                          {context.label}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
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

      {/* Botón Ver Todos los Artículos */}
      <div className="text-center mt-12">
        <Link href="/blog" className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Ver Todos los Artículos
        </Link>
      </div>
    </section>
  );
} 