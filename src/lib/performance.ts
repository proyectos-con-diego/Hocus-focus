// Utilidades para monitoreo de performance

export const measurePerformance = (name: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const duration = end - start;
      
      // Log para desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
      }
      
      // Enviar a analytics si está disponible
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: name,
          value: Math.round(duration),
          event_category: 'Performance',
        });
      }
      
      return duration;
    };
  }
  
  return () => 0;
};

// Función para medir Core Web Vitals
export const measureCoreWebVitals = () => {
  if (typeof window !== 'undefined' && 'web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

// Función para precargar recursos críticos
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/fonts/geist-sans.woff2',
    '/fonts/geist-mono.woff2',
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};
