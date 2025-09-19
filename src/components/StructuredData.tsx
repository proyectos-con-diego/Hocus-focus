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
  "description": "Asistentes de IA especializados para optimizar tu productividad y automatizar procesos",
  "url": "https://diegogonzalezvaccaro.com/productos",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Asistentes de IA",
    "description": "Colección de asistentes virtuales especializados en diferentes áreas de productividad"
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
