"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
// Removed: import { sanityClient } from "@/sanity/sanity";
import { Article, Category, articlesQuery, categoriesQuery } from "@/data/blog";
import HeaderGlass from '../../components/HeaderGlass';
import BlogHeroSection from '@/components/BlogHeroSection';
import BlogSearchFilters from '@/components/BlogSearchFilters';
import BlogArticlesList from '@/components/BlogArticlesList';
import BlogNewsletterSection from '@/components/BlogNewsletterSection';
import LeadMagnetBanner from "@/components/LeadMagnetBanner";
import RotatingServiceBanner from "@/components/RotatingServiceBanner";
import { event as trackEvent } from "@/lib/analytics";

export default function BlogNuevoClient() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(10);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  // Manejo de errores global
  const handleError = useCallback((errorMessage: string, error?: any) => {
    console.error('Error in BlogNuevoClient:', error);
    setError(errorMessage);
    
    // Auto-clear error after 8 seconds
    setTimeout(() => {
      setError(null);
    }, 8000);
  }, []);

  // Función de fetch con retry y manejo de errores mejorado
  const fetchData = useCallback(async (isRetry = false) => {
    if (isRetry) {
      setRetryCount(prev => prev + 1);
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching articles from API...');
      
      // Usar la API route en lugar de Sanity directamente
      const [articlesResponse, categoriesResponse] = await Promise.all([
        fetch('/api/articles'),
        fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'categories' })
        })
      ]);

      if (!articlesResponse.ok) {
        throw new Error(`Error fetching articles: ${articlesResponse.status}`);
      }
      
      if (!categoriesResponse.ok) {
        throw new Error(`Error fetching categories: ${categoriesResponse.status}`);
      }

      const [articlesData, categoriesData] = await Promise.all([
        articlesResponse.json(),
        categoriesResponse.json()
      ]);

      console.log('📊 Articles data received:', articlesData);
      console.log('📊 Categories data received:', categoriesData);

      // Validación de datos
      if (!articlesData.success || !Array.isArray(articlesData.articles)) {
        throw new Error('Formato de artículos inválido');
      }
      
      if (!categoriesData.success || !Array.isArray(categoriesData.categories)) {
        throw new Error('Formato de categorías inválido');
      }

      setArticles(articlesData.articles);
      setCategories(categoriesData.categories);
      setRetryCount(0); // Reset retry count on success
      
    } catch (err) {
      console.error('Error fetching blog data:', err);
      
      if (retryCount < 3 && !isRetry) {
        // Retry logic
        setTimeout(() => {
          fetchData(true);
        }, 2000 * (retryCount + 1)); // Exponential backoff
      } else {
        handleError(
          'No se pudieron cargar los artículos. Por favor, intenta de nuevo más tarde.',
          err
        );
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount, handleError]);

  // Manejo de cambio de categoría con validación
  const handleCategoryChange = useCallback((category: string) => {
    try {
      if (!category || typeof category !== 'string') {
        throw new Error('Categoría inválida');
      }
      try { trackEvent({ action: 'click_filter_category', category: 'Blog', label: category }); } catch {}
      setSelectedCategory(category);
      setVisibleCount(10); // Reset visible count when changing category
    } catch (error) {
      handleError('Error al cambiar categoría', error);
    }
  }, [handleError]);

  // Manejo de búsqueda con debounce
  const handleSearchChange = useCallback((searchTerm: string) => {
    try {
      if (typeof searchTerm !== 'string') {
        throw new Error('Término de búsqueda inválido');
      }
      try { trackEvent({ action: 'search_blog', category: 'Blog', label: searchTerm }); } catch {}
      setSearch(searchTerm);
      setVisibleCount(10); // Reset visible count when searching
    } catch (error) {
      handleError('Error en la búsqueda', error);
    }
  }, [handleError]);

  // Cargar más artículos con manejo de errores
  const handleLoadMore = useCallback(() => {
    try {
      try { trackEvent({ action: 'click_load_more', category: 'Blog', label: `visibles_${visibleCount + 10}` }); } catch {}
      setIsLoadingMore(true);
      setVisibleCount((c) => c + 10);
    } catch (error) {
      handleError('Error al cargar más artículos', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [handleError, visibleCount]);

  // Navegación por teclado
  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      try {
        action();
      } catch (error) {
        handleError('Error al procesar la acción', error);
      }
    }
  }, [handleError]);

  // Filtro por categoría y búsqueda optimizado con useMemo
  const filteredArticles = useMemo(() => {
    try {
      return articles.filter((a) => {
        const matchesCategory = selectedCategory === "Todos" || a.category === selectedCategory;
        const matchesSearch = search === "" || a.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    } catch (error) {
      console.error('Error filtering articles:', error);
      return [];
    }
  }, [articles, selectedCategory, search]);

  const articlesToShow = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  // Efecto inicial
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Track view of newsletter section
  useEffect(() => {
    const el = document.querySelector('[data-section="newsletter"]');
    if (!el) return;
    try {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try { trackEvent({ action: 'view_newsletter', category: 'Blog', label: 'newsletter_section' }); } catch {}
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(el as Element);
      return () => observer.disconnect();
    } catch {}
  }, []);

  // Scroll to top when category or search changes
  useEffect(() => {
    const topElement = document.getElementById('top');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCategory, search]);

  return (
    <div 
      className="bg-black min-h-screen text-gray-300"
      role="main"
      aria-label="Blog de Diego Gonzalez Vaccaro"
      data-testid="blog-page"
    >
      {/* Header Glass */}
      <HeaderGlass 
        pageTitle="🪄 Hocus Focus"
        showGhostLogo={false}
        customLinks={[
          { href: '/productos', label: 'Asistentes IA' },
          { href: '/servicios', label: 'Servicios' },
          { href: '/sobre-mi', label: 'Sobre Mí' }
        ]}
        ctaButton={{
          text: "📩 Suscríbete",
          onClick: () => {
            try { trackEvent({ action: 'click_header_subscribe', category: 'Blog', label: 'header_cta' }); } catch {}
            const newsletterSection = document.querySelector('[data-section="newsletter"]');
            if (newsletterSection) {
              newsletterSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      />

      {/* Error Display */}
      {error && (
        <div 
          className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 mb-4 mx-4 rounded-lg sticky top-0 z-50"
          role="alert"
          aria-live="assertive"
          data-testid="error-message"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <span className="font-semibold">Error:</span> {error}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fetchData(true)}
                className="text-xs text-red-400 hover:text-red-300 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label="Reintentar cargar artículos"
                data-testid="retry-button"
                onKeyDown={(e) => handleKeyDown(e, () => fetchData(true))}
                tabIndex={0}
              >
                Reintentar
              </button>
              <button
                onClick={() => setError(null)}
                className="text-xs text-red-400 hover:text-red-300 ml-2 underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label="Cerrar mensaje de error"
                data-testid="close-error"
                onKeyDown={(e) => handleKeyDown(e, () => setError(null))}
                tabIndex={0}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        role="banner"
        aria-labelledby="blog-hero-title"
        data-testid="blog-hero-section"
      >
        <BlogHeroSection />
      </section>
      
      <div className="max-w-7xl mx-auto px-6" id="top">
        {/* Search and Filters */}
        <section 
          role="search"
          aria-label="Búsqueda y filtros de artículos"
          data-testid="search-filters-section"
        >
          <BlogSearchFilters 
            search={search}
            setSearch={handleSearchChange}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            categories={categories}
          />
        </section>

        {/* Main Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-12 mb-16">
          {/* Columna de artículos */}
          <main 
            className="flex-1"
            role="main"
            aria-label="Lista de artículos del blog"
            data-testid="articles-main"
          >
            <BlogArticlesList 
              articles={articlesToShow} 
              loading={loading}
              data-testid="articles-list"
            />
            
            {/* Botón Ver más - Solo en móvil, después de los artículos */}
            <div className="lg:hidden">
              {visibleCount < filteredArticles.length && !loading && (
                <section 
                  className="text-center mt-12"
                  role="region"
                  aria-label="Cargar más artículos"
                  data-testid="load-more-section-mobile"
                >
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={isLoadingMore ? "Cargando más artículos..." : "Cargar más artículos"}
                    data-testid="load-more-button-mobile"
                    onKeyDown={(e) => handleKeyDown(e, handleLoadMore)}
                  >
                    {isLoadingMore ? "Cargando..." : "Ver más"}
                  </button>
                </section>
              )}
            </div>
          </main>
          
          {/* Sidebar */}
          <aside 
            className="w-full lg:w-[300px] flex flex-col gap-8 flex-shrink-0"
            role="complementary"
            aria-label="Contenido adicional"
            data-testid="blog-sidebar"
          >
            <div data-testid="lead-magnet-banner">
              <LeadMagnetBanner />
            </div>
            <div 
              className="sticky top-8"
              data-testid="rotating-service-banner"
            >
              <RotatingServiceBanner />
            </div>
          </aside>
        </div>
        
        {/* Botón Ver más - Solo en desktop, después del sidebar */}
        <div className="hidden lg:block">
          {visibleCount < filteredArticles.length && !loading && (
            <section 
              className="text-center mt-12"
              role="region"
              aria-label="Cargar más artículos"
              data-testid="load-more-section-desktop"
            >
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-label={isLoadingMore ? "Cargando más artículos..." : "Cargar más artículos"}
                data-testid="load-more-button-desktop"
                onKeyDown={(e) => handleKeyDown(e, handleLoadMore)}
              >
                {isLoadingMore ? "Cargando..." : "Ver más"}
              </button>
            </section>
          )}
        </div>
        
        {/* Newsletter Section */}
        <section 
          role="region"
          aria-label="Suscripción al newsletter"
          data-testid="newsletter-section"
          data-section="newsletter"
        >
          <BlogNewsletterSection />
        </section>

        {/* Back to top */}
        <section 
          className="text-center my-10"
          role="navigation"
          aria-label="Navegación"
          data-testid="back-to-top-section"
        >
          <a 
            href="/" 
            className="text-purple-400 text-sm font-medium hover:text-pink-400 inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded"
            aria-label="Volver a la página de inicio"
            data-testid="back-to-home-link"
            onKeyDown={(e) => handleKeyDown(e, () => window.location.href = '/')}
          >
            <span className="mr-1" aria-hidden="true">←</span>Volver al inicio
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer 
        className="bg-black border-t border-gray-700 py-8 px-6 mt-10"
        role="contentinfo"
        aria-label="Información de contacto y derechos de autor"
        data-testid="blog-footer"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm" data-testid="blog-copyright">
            © 2025 Diego González Vaccaro. Compartiendo lo que he aprendido optimizando procesos.
          </p>
        </div>
      </footer>

      {/* Skip to Content Link (Accessibility) */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        data-testid="skip-to-content"
      >
        Saltar al contenido principal
      </a>

      {/* Loading More Indicator */}
      {isLoadingMore && (
        <div 
          className="fixed bottom-4 right-4 bg-blue-900/20 border border-blue-500/30 text-blue-300 px-3 py-2 rounded text-sm"
          role="status"
          aria-live="polite"
          data-testid="loading-more-indicator"
        >
          Cargando más artículos...
        </div>
      )}
    </div>
  );
} 