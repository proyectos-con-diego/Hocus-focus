import { useCallback, useMemo } from 'react';

interface UseBlogOptimizationProps {
  body: any;
  title: string;
  categories: any[];
}

export function useBlogOptimization({ body, title, categories }: UseBlogOptimizationProps) {
  // Memoizar el cálculo del tiempo de lectura
  const readingTime = useMemo(() => {
    if (!Array.isArray(body)) return null;
    
    const wordCount = body.reduce((total: number, block: any) => {
      if (block._type === "block" && block.children) {
        const blockWords = block.children.reduce((blockTotal: number, child: any) => {
          return blockTotal + (child.text || "").split(/\s+/).length;
        }, 0);
        return total + blockWords;
      }
      return total;
    }, 0);
    
    return Math.max(1, Math.ceil(wordCount / 200));
  }, [body]);

  // Memoizar las categorías formateadas
  const formattedCategories = useMemo(() => {
    return categories?.map(cat => cat.title).join(', ') || '';
  }, [categories]);

  // Memoizar el título optimizado para SEO
  const seoTitle = useMemo(() => {
    return `${title} | Diego Gonzalez Vaccaro`;
  }, [title]);

  // Función optimizada para generar metadatos
  const generateMetadata = useCallback(() => {
    return {
      title: seoTitle,
      description: `Artículo sobre ${formattedCategories}`,
      keywords: formattedCategories,
      readingTime,
    };
  }, [seoTitle, formattedCategories, readingTime]);

  // Función optimizada para generar breadcrumbs
  const generateBreadcrumbs = useCallback(() => {
    return [
      { name: 'Inicio', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: categories?.[0]?.title || 'Artículo', href: '#' },
      { name: title, href: '#' },
    ];
  }, [categories, title]);

  return {
    readingTime,
    formattedCategories,
    seoTitle,
    generateMetadata,
    generateBreadcrumbs,
  };
} 