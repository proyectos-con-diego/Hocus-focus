'use client';
import React from 'react';
import Link from 'next/link';
import { event as trackEvent } from '@/lib/analytics';
import { Article } from '@/data/blog';
import { 
  getTagClass, 
  calculateReadingTime, 
  getReadingContext, 
  formatDate, 
  getArticleExcerpt 
} from '@/data/blog';

interface BlogArticleCardProps {
  article: Article;
}

export default function BlogArticleCard({ article }: BlogArticleCardProps) {
  const readingTime = calculateReadingTime(article.body);
  const context = getReadingContext(readingTime);
  const formattedDate = formatDate(article.publishedAt);
  const excerpt = getArticleExcerpt(article);

  return (
    <Link
      href={article.slug ? `/blog/${article.slug}` : "#"}
      onClick={() => { try { trackEvent({ action: 'click_article_card', category: 'Blog', label: article.slug || 'sin_slug' }); } catch {} }}
      className="block group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-0 transition-all duration-300 relative cursor-pointer hover:bg-gray-700/70 hover:border-cyan-400/30 hover:scale-105 hover:shadow-2xl min-h-[260px] flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-8"
      style={{ textDecoration: 'none' }}
    >
      {/* Imagen principal */}
      {article.mainImage ? (
        <img
          src={article.mainImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-2xl mb-0 group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <img
          src="/blog-default.png"
          alt="Imagen por defecto del blog"
          className="w-full h-48 object-cover rounded-t-2xl mb-0 opacity-80 group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      )}
      
      <div className="p-8 flex-1 flex flex-col">
        {/* Header enriquecido */}
        <div className="flex justify-between items-start mb-4">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getTagClass(article.category)} group-hover:scale-105 transition-transform duration-300`}>
            {article.category || "Sin categoría"}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-lg">{context.icon}</span>
            <span className={`${context.color} font-medium`}>{readingTime} min</span>
          </div>
        </div>
        
        {/* Título y badge explicativo */}
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
          {article.title}
        </h3>
        <p className="text-gray-400 mb-6 text-sm">{excerpt}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500 mb-0.5">{formattedDate}</span>
            <span className="text-xs text-gray-400 font-medium">Por {article.author || "Autor"}</span>
          </div>
          <span className={`${context.color} text-xs font-medium bg-gray-700/50 px-2 py-1 rounded-md border border-gray-600/30 group-hover:scale-105 transition-transform duration-300`}>
            {context.label}
          </span>
        </div>
      </div>
    </Link>
  );
} 