export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
}

export function getMainImageUrl(mainImage: any): string {
  if (!mainImage) return '/blog-default.png';
  
  if (typeof mainImage === 'string') return mainImage;
  
  return mainImage.asset?.url || '/blog-default.png';
}

export function generateStructuredData(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || 'Artículo del blog de Diego Gonzalez Vaccaro sobre optimización, productividad y tecnología.',
    "image": getMainImageUrl(post.mainImage),
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Diego Gonzalez Vaccaro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Diego Gonzalez Vaccaro",
      "logo": {
        "@type": "ImageObject",
        "url": "https://diegogonzalezvaccaro.com/logo.png"
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://diegogonzalezvaccaro.com/blog/${post.slug.current}`
    },
    "articleSection": post.categories?.[0]?.title || "Blog",
    "keywords": post.categories?.map((cat: any) => cat.title).join(", ") || "productividad, tecnología, optimización"
  };
} 