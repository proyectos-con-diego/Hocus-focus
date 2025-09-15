export interface Article {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  mainImage: string;
  publishedAt: string;
  body: any[];
  excerpt: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface ReadingContext {
  icon: string;
  label: string;
  color: string;
  bg: string;
}

export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

// Hero section data
export const heroData: HeroData = {
  badge: '📝 Blog',
  title: 'Reflexiones y Metodologías',
  subtitle: 'que he desarrollado',
  description: 'Comparto lo que he aprendido en 10+ años optimizando procesos. Desde técnicas de productividad hasta casos de estudio reales.',
  features: [
    'Casos reales',
    'Metodologías probadas',
    'Sin teoría vacía'
  ]
};

// Category color mappings
export const categoryColors = {
  'Economía y finanzas': {
    tagClass: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    gradientClass: 'from-blue-500 to-cyan-500'
  },
  'Desarrollo personal': {
    tagClass: 'bg-green-500/20 border-green-500/30 text-green-400',
    gradientClass: 'from-green-500 to-emerald-500'
  },
  'Proyectos y productos': {
    tagClass: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
    gradientClass: 'from-yellow-500 to-orange-500'
  },
  'Inteligencia artificial': {
    tagClass: 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    gradientClass: 'from-purple-500 to-blue-500'
  },
  'Marketing y empresa': {
    tagClass: 'bg-pink-500/20 border-pink-500/30 text-pink-400',
    gradientClass: 'from-pink-500 to-rose-500'
  }
};

// Reading context configurations
export const readingContexts: ReadingContext[] = [
  { icon: '⚡', label: 'Tip rápido', color: 'text-green-400', bg: 'bg-green-900/30' },
  { icon: '🎯', label: 'Lectura enfocada', color: 'text-blue-400', bg: 'bg-blue-900/30' },
  { icon: '📊', label: 'Análisis completo', color: 'text-purple-400', bg: 'bg-purple-900/30' },
  { icon: '📚', label: 'Guía detallada', color: 'text-orange-400', bg: 'bg-orange-900/30' },
  { icon: '🏗️', label: 'Metodología completa', color: 'text-red-400', bg: 'bg-red-900/30' }
];

// Sanity queries
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title
}`;

export const articlesQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "category": categories[0]->title,
  "author": author->name,
  "mainImage": mainImage.asset->url,
  publishedAt,
  body,
  excerpt
}`;

// Utility functions
export function getTagClass(category: string): string {
  return categoryColors[category as keyof typeof categoryColors]?.tagClass || 
         'bg-purple-500/20 border-purple-500/30 text-purple-400';
}

export function getCategoryColor(category: string): string {
  return categoryColors[category as keyof typeof categoryColors]?.gradientClass || 
         'from-purple-500 to-pink-500';
}

export function calculateReadingTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 3;
  const wordCount = body.reduce((total: number, block: any) => {
    if (block._type === "block" && block.children) {
      const blockWords = block.children.reduce((blockTotal: number, child: any) => {
        return blockTotal + (child.text || "").split(/\s+/).length;
      }, 0);
      return total + blockWords;
    }
    return total;
  }, 0);
  return Math.max(1, Math.ceil(wordCount / 200)); // 200 palabras/min
}

export function getReadingContext(minutes: number): ReadingContext {
  if (minutes <= 2) return readingContexts[0];
  if (minutes <= 5) return readingContexts[1];
  if (minutes <= 10) return readingContexts[2];
  if (minutes <= 15) return readingContexts[3];
  return readingContexts[4];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 1) return "Hoy";
  if (diffDays <= 7) return `Hace ${diffDays} días`;
  if (diffDays <= 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export function getArticleExcerpt(article: Article): string {
  if (article.excerpt && article.excerpt.trim() !== '') {
    return article.excerpt;
  }
  
  if (article.body && Array.isArray(article.body)) {
    const block = article.body.find((b: any) => b._type === "block" && b.children && b.children.length > 0);
    if (block) {
      return block.children.map((c: any) => c.text).join(" ").slice(0, 160) + "...";
    }
  }
  
  return '';
} 