import { memo } from 'react';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from './PortableTextComponents';

interface MemoizedBlogContentProps {
  body: any;
  title: string;
  author: any;
  slug: string;
  categories: any[];
  relatedProduct: any;
}

const MemoizedBlogContent = memo(function BlogContent({
  body,
  title,
  author,
  slug,
  categories,
  relatedProduct
}: MemoizedBlogContentProps) {
  return (
    <article className="flex-1 max-w-4xl mx-auto">
      {/* Contenido principal del artículo */}
      <div className="prose prose-invert prose-lg max-w-none">
        <PortableText 
          value={body} 
          components={portableTextComponents}
        />
      </div>
      
      {/* Metadata del artículo */}
      <footer className="mt-12 pt-8 border-t border-gray-700">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <span>Autor: {author?.name || 'Anónimo'}</span>
          <span>•</span>
          <span>Categorías: {categories?.map(cat => cat.title).join(', ')}</span>
          <span>•</span>
          <span>Slug: {slug}</span>
        </div>
      </footer>
    </article>
  );
});

export default MemoizedBlogContent; 