import React from "react";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { sanityClient } from "@/sanity/sanity";

interface RelatedArticlesProps {
  currentSlug: string;
  categories: { title: string }[];
}

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: { asset: { url: string } };
  excerpt?: string;
  categories?: { title: string }[];
  publishedAt?: string;
  readTime?: number;
  author?: { name: string };
  body?: any;
}

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

// Función para icono y color del tiempo de lectura
function getReadingContext(minutes: number) {
  if (minutes <= 2) return { icon: '⚡', color: 'text-green-400', label: 'Tip rápido' };
  if (minutes <= 5) return { icon: '⏱️', color: 'text-blue-400', label: 'Lectura corta' };
  if (minutes <= 10) return { icon: '📖', color: 'text-purple-400', label: 'Lectura media' };
  return { icon: '🔥', color: 'text-pink-400', label: 'Lectura larga' };
}

export default async function RelatedArticles({ currentSlug, categories }: RelatedArticlesProps) {
  // Tomar la primera categoría (si hay)
  const mainCategory = categories && categories.length > 0 ? categories[0].title : null;

  // Consulta GROQ para traer hasta 6 artículos relacionados
  const query = `*[_type == "post" && slug.current != $slug && (isHidden != true)${mainCategory ? ' && $cat in categories[]->title' : ''}] | order(publishedAt desc)[0...6]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    categories[]->{title},
    publishedAt,
    readTime,
    author->{name},
    body
  }`;
  const params: any = { slug: currentSlug };
  if (mainCategory) params.cat = mainCategory;

  const articles: Article[] = await sanityClient.fetch(query, params);
  if (!articles || articles.length === 0) return null;

  return (
    <section className="my-12">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-2 text-white text-center">Artículos relacionados</h2>
        <p className="text-center text-gray-400 mb-10">Más reflexiones sobre productividad y desarrollo profesional</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((a) => {
            const category = a.categories && a.categories[0]?.title;
            const colorClasses = getCategoryColorClasses(category);
            const publishedDate = a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' }) : '';
            const readingTime = a.readTime || calculateReadingTime(a.body);
            const context = getReadingContext(readingTime);
            
            return (
              <TrackedLink 
                key={a._id} 
                href={`/blog/${a.slug.current}`} 
                className="group"
                action="click_related_article"
                category="Blog"
                label={a.slug.current}
              >
                <article className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 cursor-pointer hover:shadow-purple-500/20 w-full">
                  {/* Franja de color */}
                  <div className={`h-2 bg-gradient-to-r ${colorClasses.gradient}`}></div>
                  {/* Imagen del artículo */}
                  {a.mainImage ? (
                    <img src={typeof a.mainImage === 'string' ? a.mainImage : a.mainImage.asset?.url} alt={a.title} className="w-full h-48 object-cover" loading="lazy" />
                  ) : (
                    <img src="/blog-default.png" alt="Imagen por defecto del blog" className="w-full h-48 object-cover opacity-80" loading="lazy" />
                  )}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      {/* Etiqueta de categoría estilo pill */}
                      <span className={`text-xs font-semibold bg-gray-900/60 px-3 py-1 rounded-full border border-gray-700/40 ${colorClasses.text}`}>{category || 'Sin categoría'}</span>
                      <span className={`flex items-center gap-1 text-xs font-semibold ${context.color}`}>
                        <span>{context.icon}</span>
                        <span>{readingTime} min</span>
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-white mb-2 transition-colors duration-300 group-hover:text-purple-400">
                      {a.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {a.excerpt || ''}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500 mb-0.5">{publishedDate}</span>
                        <span className="text-xs text-gray-400 font-medium">Por {a.author?.name || "Diego Gonzalez"}</span>
                      </div>
                      <span className={`${context.color} text-xs font-medium bg-gray-700/50 px-2 py-1 rounded-md border border-gray-600/30`}>
                        {context.label}
                      </span>
                    </div>
                  </div>
                </article>
              </TrackedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
} 