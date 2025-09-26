import React from 'react';

interface StructuredDataProps {
  data: any;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Structured data para página principal
export const homePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Diego Gonzalez Vaccaro",
  "jobTitle": "Especialista en Optimización y Automatización",
  "description": "Transformo tu caos diario en sistemas automatizados que funcionan 24/7. Especialista en optimización de procesos, productividad y automatización con IA.",
  "url": "https://diegogonzalezvaccaro.com",
  "sameAs": [
    "https://twitter.com/diegogonzalezv",
    "https://linkedin.com/in/diegogonzalezvaccaro"
  ],
  "knowsAbout": [
    "Optimización de procesos",
    "Automatización con IA",
    "Productividad",
    "Sistemas de gestión",
    "Tecnología"
  ],
  "offers": {
    "@type": "Service",
    "name": "Consultoría en Optimización y Automatización",
    "description": "Servicios de consultoría para optimizar procesos empresariales y implementar automatizaciones con IA"
  }
};

// Structured data para página de productos
export const productsPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Productos | Diego Gonzalez Vaccaro",
  "description": "Agentes de IA especializados para optimizar tu productividad y automatizar procesos",
  "url": "https://diegogonzalezvaccaro.com/productos",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Agentes de IA",
    "description": "Colección de agentes virtuales especializados en diferentes áreas de productividad"
  }
};

// Structured data para página de servicios
export const servicesPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Servicios de Optimización y Automatización",
  "description": "Servicios profesionales de consultoría en optimización de procesos y automatización con IA",
  "provider": {
    "@type": "Person",
    "name": "Diego Gonzalez Vaccaro"
  },
  "serviceType": "Consultoría en Productividad",
  "areaServed": "España",
  "availableLanguage": "es"
};

// Structured data para página de blog
export const blogPageStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog | Diego Gonzalez Vaccaro",
  "description": "Reflexiones, metodologías y casos reales sobre optimización de procesos, productividad y tecnología",
  "url": "https://diegogonzalezvaccaro.com/blog",
  "publisher": {
    "@type": "Person",
    "name": "Diego Gonzalez Vaccaro"
  },
  "inLanguage": "es-ES"
};

// Structured data para Plan de Marketing
export const planMarketingStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Plan de Marketing | Diego Gonzalez Vaccaro",
  "description": "Genera más leads y clientes con una estrategia clara. Para emprendedores que necesitan claridad total en su marketing digital.",
  "url": "https://diegogonzalezvaccaro.com/servicios/plan-marketing",
  "provider": {
    "@type": "Person",
    "name": "Diego Gonzalez Vaccaro",
    "jobTitle": "Especialista en Marketing Digital y Optimización"
  },
  "serviceType": "Consultoría en Marketing Digital",
  "areaServed": "España",
  "availableLanguage": "es",
  "offers": {
    "@type": "Offer",
    "name": "Plan de Marketing Personalizado",
    "description": "Plan detallado en 2-3 semanas con metodología probada que funciona",
    "price": "35",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01"
  },
  "category": "Marketing Digital",
  "audience": {
    "@type": "Audience",
    "audienceType": "Emprendedores y pequeñas empresas"
  }
};

// Structured data para Sistema SCALE
export const sistemaScaleStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sistema SCALE | Diego Gonzalez Vaccaro",
  "description": "Escala tu negocio con un sistema digital organizado. Para líderes con equipos de 3-15 personas que quieren delegar sin dolores de cabeza.",
  "url": "https://diegogonzalezvaccaro.com/servicios/sistema-scale",
  "provider": {
    "@type": "Person",
    "name": "Diego Gonzalez Vaccaro",
    "jobTitle": "Especialista en Optimización de Procesos"
  },
  "serviceType": "Consultoría en Gestión Empresarial",
  "areaServed": "España",
  "availableLanguage": "es",
  "offers": {
    "@type": "Offer",
    "name": "Sistema SCALE para Escalamiento",
    "description": "Visibilidad 24/7 de equipo y proyectos, procesos listos para delegar, decisiones basadas en datos reales",
    "price": "35",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01"
  },
  "category": "Gestión Empresarial",
  "audience": {
    "@type": "Audience",
    "audienceType": "Líderes y directivos de equipos medianos"
  }
};

// Structured data para Automatización IA
export const automatizacionIAStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Automatización IA | Diego Gonzalez Vaccaro",
  "description": "Automatiza 3 procesos clave y ahorra 8–15h semanales. Para consultores y servicios profesionales que quieren ganar tiempo para clientes y crecimiento.",
  "url": "https://diegogonzalezvaccaro.com/servicios/automatizacion-ia",
  "provider": {
    "@type": "Person",
    "name": "Diego Gonzalez Vaccaro",
    "jobTitle": "Especialista en Automatización con IA"
  },
  "serviceType": "Consultoría en Automatización",
  "areaServed": "España",
  "availableLanguage": "es",
  "offers": {
    "@type": "Offer",
    "name": "Automatización con Inteligencia Artificial",
    "description": "8-15 horas semanales liberadas, automatizaciones que funcionan 24/7, supera a competencia tradicional",
    "price": "35",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01"
  },
  "category": "Automatización e IA",
  "audience": {
    "@type": "Audience",
    "audienceType": "Consultores y servicios profesionales"
  }
};
