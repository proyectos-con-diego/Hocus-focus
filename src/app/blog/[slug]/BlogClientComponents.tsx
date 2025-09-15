'use client';

import { useEffect } from 'react';

interface BlogClientComponentsProps {
  post: any;
  firstHalf: any[];
  secondHalf: any[];
}

export default function BlogClientComponents({ post, firstHalf, secondHalf }: BlogClientComponentsProps) {
  useEffect(() => {
    // Banner superior después del hero
    const bannerSuperiorContainer = document.querySelector('.bg-black .max-w-7xl.mx-auto.px-6.mb-8');
    if (bannerSuperiorContainer) {
      const bannerSuperior = document.createElement('div');
      bannerSuperior.innerHTML = `
        <div class="ad-indicator"></div>
        ${post.relatedProduct ? 
          `<div class="product-banner-superior" data-product='${JSON.stringify(post.relatedProduct)}'></div>` : 
          '<div class="subtle-ad-space" data-size="728x90" data-type="banner"></div>'
        }
      `;
      bannerSuperiorContainer.appendChild(bannerSuperior);
    }

    // Sidebar
    const sidebarContainer = document.querySelector('aside');
    if (sidebarContainer) {
      const sidebar = document.createElement('div');
      sidebar.innerHTML = `
        <div class="sticky top-8 z-10">
          ${post.relatedProduct ? 
            `<div class="product-related-ad" data-product='${JSON.stringify(post.relatedProduct)}' data-variant="sidebar"></div>` : 
            '<div class="rotating-service-banner"></div>'
          }
        </div>
        <div class="relative z-20 mt-6">
          <div class="lead-magnet-banner"></div>
        </div>
      `;
      sidebarContainer.appendChild(sidebar);
    }

    // Share buttons y secciones después del artículo
    const mainContent = document.querySelector('[data-testid="main-content"]');
    if (mainContent) {
      const afterArticle = document.createElement('div');
      afterArticle.innerHTML = `
        <div class="mt-6 mb-4">
          <div class="share-buttons" data-title="${post.title}"></div>
        </div>
        <div class="related-articles" data-current-slug="${post.slug.current}" data-categories='${JSON.stringify(post.categories)}'></div>
        <div class="mt-4">
          <div class="author-section" data-author='${JSON.stringify({
            name: post.author?.name || 'Diego Gonzalez',
            image: post.author?.image,
            bio: post.author?.bio,
            slug: 'sobre-mi'
          })}'></div>
        </div>
      `;
      mainContent.appendChild(afterArticle);
    }
  }, [post, firstHalf, secondHalf]);

  return null; // Este componente no renderiza nada visible, solo inserta elementos en el DOM
}
