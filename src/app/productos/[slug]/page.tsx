"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
// Removed direct Sanity import - using API route instead
import HeaderGlass from '../../../components/HeaderGlass';
import BlogSection from '../../../components/BlogSection';
import ProductRelatedArticles from '../../../components/ProductRelatedArticles';
import StarRating from '../../../components/StarRating';
import PackStickyBannerInferior from '../../../components/PackStickyBannerInferior';
import MultiStepForm from '../../../components/MultiStepForm';
import MiniFormModal from '../../../components/MiniFormModal';
import { getPacksForProduct } from '../../../data/packs';
import { event as trackEvent } from '../../../lib/analytics';

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': '/Personajes/Imagenes-Agentes/Okro/Cabeza/okro-cabeza-frontal.png',
    'Grilla Viralis': '/Personajes/Imagenes-Agentes/Grilla/Cabeza/Grilla-cabeza-frontal.png',
    'Jaime Daily': '/Personajes/Imagenes-Agentes/Jaime/Cabeza/Jaime-cabeza-frontal.png',
    'Lee Der': '/Personajes/Imagenes-Agentes/Lee-Navio/Cabeza/Lee-cabeza-frontal.png',
    'Bafet': '/Personajes/Imagenes-Agentes/Bafet/Cabeza/Bafet-cabeza-frontal.png',
    'Midas': '/Personajes/Imagenes-Agentes/Midas/Cabeza/Midas-cabeza-frontal.png',
    'Vinxi': '/Personajes/Imagenes-Agentes/Vinxi/Cabeza/Vinxi-frontal.png'
  };
  
  return imageMapping[productName] || productName;
}

// Función helper para generar planes estándar
function generateStandardPlans(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#2196f3'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente usando regex
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  const mainGradient = product.avatarBg || 'linear-gradient(45deg, #2196f3, #21cbf3)';
  
  return [
    {
      name: `${product.name} MINI`,
      badge: "GRATIS",
      description: "Básico y elemental",
      price: "$0",
      extraNote: "Siempre gratis",
      features: [
        { text: "Gestión básica de tareas", included: true },
        { text: "Prioridades simples", included: true },
        { text: "Vista de lista elemental", included: true },
        { text: "Acceso móvil básico", included: true },
        { text: "Modo Enfoque", included: false },
        { text: "Sistema completo", included: false },
        { text: "Vistas múltiples", included: false },
        { text: "Soporte prioritario", included: false }
      ],
      cta: "📝 Acceder Versión Gratuita",
      // Color del producto para el botón GRATIS
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} PRO`,
      badge: "RECOMENDADO",
      description: "Robusto y Poderoso",
      price: "$9.99",
      oldPrice: "$30",
      extraNote: "67% OFF - PAGO ÚNICO",
      features: [
        { text: "Sistema completo de gestión", included: true },
        { text: "Modo Enfoque + Pomodoro", included: true },
        { text: "Sistema inteligente", included: true },
        { text: "Vistas múltiples avanzadas", included: true },
        { text: "Etiquetas personalizadas", included: true },
        { text: "Botones de ayuda rápida", included: true },
        { text: "Zoom In/Zoom Out", included: true },
        { text: "Soporte prioritario", included: true }
      ],
      cta: "🚀 Probar " + product.name + " PRO",
      // Color del producto para el badge RECOMENDADO y botón
      badgeColor: mainColor,
      badgeGradient: mainGradient,
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },

  ];
}



// Función helper específica para Jaime Daily
function generateJaimeDailyPlans(product: any) {
  // Extraer el color principal del producto
  const mainColor = product.avatarBg ? product.avatarBg.split(' ')[2] : '#22c55e';
  const mainGradient = product.avatarBg || `linear-gradient(45deg, #22c55e, #10b981)`;
  
  return [
    {
      name: "Jaime Daily MINI",
      badge: "GRATIS",
      description: "Básica para novatos",
      price: "$0",
      extraNote: "Siempre gratis",
      features: [
        { text: "Seguimiento de hábitos básico", included: true },
        { text: "Sistema de batallas incluido", included: true },
        { text: "Acceso móvil via Notion", included: true },
        { text: "Diario integrado", included: true },
        { text: "Sin automatizaciones", included: false }
      ],
      cta: "📝 Acceder Versión Gratuita"
    },
    {
      name: "Jaime Daily PRO",
      badge: "MÁS POPULAR",
      description: "Robusto y Poderoso",
      price: "$5.99",
      oldPrice: "$9.99",
      extraNote: "40% OFF - PAGO ÚNICO",
      features: [
        { text: "Automatizaciones Notion aplicadas", included: true },
        { text: "Sistema completo 3 en 1", included: true },
        { text: "Gamificación con insignias", included: true },
        { text: "Diario personal integrado", included: true },
        { text: "Acceso móvil vía Notion", included: true },
        { text: "Tablero de habilidades", included: true }      ],
      cta: "🚀 Comprar Jaime Daily PRO",
      badgeColor: mainColor,
      badgeGradient: mainGradient,
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: "Jaime Daily Ai",
      badge: "PRÓXIMAMENTE",
      description: "Con Inteligencia Artificial",
      price: "Próximamente",
      features: [
        { text: "Todo lo de la versión PRO", included: true },
        { text: "Asistente IA personalizado", included: true },
        { text: "Análisis inteligente de patrones", included: true },
        { text: "Recomendaciones adaptativas", included: true },
        { text: "Chat conversacional integrado", included: true },
        { text: "Insights automáticos", included: true }
      ],
      cta: "🔮 Próximamente",
      badgeColor: "#9333ea",
      badgeGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      buttonColor: "#9333ea",
      buttonGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      comingSoon: true
    }
  ];
}

// Función helper específica para garantía de Jaime Daily
function generateJaimeDailyGuarantee(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#22c55e'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente (después de la coma)
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  
  return {
    title: "Garantía de progreso medible",
    description: "Tendrás evidencia visual clara de tu transformación personal, con métricas automáticas que te muestran exactamente qué tanto has avanzado en cada área de tu vida.",
    features: [
      "Progreso medible y visible",
      "Transformación documentada automáticamente",
      "Evidencia objetiva de tu crecimiento"
    ],
    borderColor: mainColor,
    checkmarkColor: mainColor
  };
}

// Función helper específica para planes de Midas
function generateMidasPlans(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#ff9800'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente usando regex
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  const mainGradient = product.avatarBg || 'linear-gradient(45deg, #ff9800, #ff6f00)';
  
  return [
    {
      name: "Midas PRO",
      badge: "RECOMENDADA",
      description: "Robusto y Poderoso",
      price: "$8.99",
      oldPrice: "$20.00",
      extraNote: "55% OFF - PAGO ÚNICO",
      features: [
        { text: "Sistema de gestión de gastos e ingresos", included: true },
        { text: "Bases interconectadas", included: true },
        { text: "Categorías personalizables", included: true },
        { text: "Automatizaciones entre bases", included: true },
        { text: "Vinculación con proyectos específicos", included: true },
        { text: "Control de gastos recurrentes", included: true },
        { text: "Objetivos de ahorro con seguimiento visual", included: true },
        { text: "Calendario integrado para planificación", included: true },
        { text: "Configuración guiada paso a paso", included: true },
        { text: "Acceso móvil vía Notion", included: true }      ],
      cta: "💰 Comprar Midas PRO",
      badgeColor: mainColor,
      badgeGradient: mainGradient,
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: "Midas Ai",
      badge: "PRÓXIMAMENTE",
      description: "Con Inteligencia Artificial",
      price: "Próximamente",
      features: [
        { text: "Todo lo de la versión PRO", included: true },
        { text: "Asistente IA personalizado", included: true },
        { text: "Análisis predictivo de gastos", included: true },
        { text: "Recomendaciones inteligentes de ahorro", included: true },
        { text: "Detección automática de patrones", included: true },
        { text: "Alertas inteligentes de presupuesto", included: true }
      ],
      cta: "🔮 Próximamente",
      badgeColor: "#9333ea",
      badgeGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      buttonColor: "#9333ea",
      buttonGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      comingSoon: true
    }
  ];
}

// Función helper específica para planes de OKRo
function generateOKRoPlans(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#1976d2'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente usando regex
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  const mainGradient = product.avatarBg || 'linear-gradient(45deg, #1976d2, #64b5f6)';
  
  return [
    {
      name: `${product.name} MINI`,
      badge: "GRATIS",
      description: "Básico para principiantes",
      price: "$0",
      extraNote: "Siempre gratis",
      features: [
        { text: "Gestión básica de OKRs", included: true },
        { text: "Plantillas estándar", included: true },
        { text: "Acceso móvil básico", included: true },
        { text: "Sistema completo de seguimiento", included: false },
        { text: "Dashboards avanzados", included: false },
        { text: "Vinculación de proyectos", included: false }
      ],
      cta: "📝 Acceder Versión Gratuita",
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} PRO`,
      badge: "RECOMENDADO",
      description: "Robusto y Poderoso",
      price: "$29.00",
      oldPrice: "$99.00",
      extraNote: "71% OFF - PAGO ÚNICO",
      features: [
        { text: "Sistema completo de gestión de OKRs", included: true },
        { text: "Dashboards visuales avanzados", included: true },
        { text: "Vinculación de proyectos", included: true },
        { text: "Seguimiento en tiempo real", included: true },
        { text: "Plantillas personalizables", included: true },
        { text: "Acceso móvil vía Notion", included: true },
        { text: "Sin suscripciones mensuales", included: true }
      ],
      cta: "🎯 Comprar OKRo PRO",
      badgeColor: mainColor,
      badgeGradient: mainGradient,
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} Ai`,
      badge: "PRÓXIMAMENTE",
      description: "Con Inteligencia Artificial",
      price: "Próximamente",
      features: [
        { text: "Todo lo de la versión PRO", included: true },
        { text: "Asistente IA personalizado", included: true },
        { text: "Análisis predictivo de OKRs", included: true },
        { text: "Recomendaciones de objetivos inteligentes", included: true },
        { text: "Seguimiento automático de progreso", included: true },
        { text: "Generación de estrategias por IA", included: true }
      ],
      cta: "🔮 Próximamente",
      badgeColor: "#9333ea",
      badgeGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      buttonColor: "#9333ea",
      buttonGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      comingSoon: true
    }
  ];
}

// Función helper específica para planes de Grilla Viralis
function generateGrillaPlans(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#4caf50'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente usando regex
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  const mainGradient = product.avatarBg || 'linear-gradient(45deg, #4caf50, #8bc34a)';
  
  return [
    {
      name: `${product.name} MINI`,
      badge: "GRATIS",
      description: "Básico para principiantes",
      price: "$0",
      extraNote: "Siempre gratis",
      features: [
        { text: "Gestión básica de contenido", included: true },
        { text: "Panel Personalizado Individual", included: true },
        { text: "Sistema zoom-in zoom-out", included: true },
        { text: "Bases interconectadas", included: true },
        { text: "Plantillas estándar", included: true },
        { text: "Acceso móvil vía Notion", included: true },
        { text: "Sistema completo de gestión", included: false },
        { text: "Automatizaciones avanzadas", included: false },
        { text: "Análisis de rendimiento", included: false }
      ],
      cta: "📝 Acceder Versión Gratuita",
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} PRO`,
      badge: "RECOMENDADO",
      description: "Robusto y Poderoso",
      price: "$29.00",
      oldPrice: "$99.00",
      extraNote: "71% OFF - PAGO ÚNICO",
      features: [
        { text: "Todo lo de la versión MINI", included: true },
        { text: "Panel Individual Avanzado", included: true },
        { text: "Sistema inteligente de prioridades", included: true },
        { text: "Métricas de progreso avanzadas", included: true },
        { text: "Sistema inteligente de prioridades", included: true },
        { text: "Automatizaciones entre bases", included: true },
        { text: "Indicadores Visuales de Progreso", included: true },
        { text: "Pipeline infinito de ideas", included: true },
        { text: "Plantillas avanzadas", included: true },
        { text: "Acceso móvil vía Notion", included: true },
        { text: "Sin suscripciones mensuales", included: true }
      ],
      cta: "🦗 Comprar Grilla Viralis PRO",
      badgeColor: mainColor,
      badgeGradient: mainGradient,
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} Ai`,
      badge: "PRÓXIMAMENTE",
      description: "Con Inteligencia Artificial",
      price: "Próximamente",
      features: [
        { text: "Todo lo de la versión PRO", included: true },
        { text: "Asistente IA personalizado", included: true },
        { text: "Generación automática de contenido", included: true },
        { text: "Análisis predictivo de engagement", included: true },
        { text: "Optimización de calendario por IA", included: true },
        { text: "Sugerencias inteligentes de distribución", included: true }
      ],
      cta: "🔮 Próximamente",
      badgeColor: "#9333ea",
      badgeGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      buttonColor: "#9333ea",
      buttonGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      comingSoon: true
    }
  ];
}

// Función helper específica para planes de Vinxi
function generateVinxiPlans(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#2196f3'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente usando regex
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  const mainGradient = product.avatarBg || 'linear-gradient(45deg, #2196f3, #21cbf3)';
  
  return [
    {
      name: `${product.name} MINI`,
      badge: "GRATIS",
      description: "Básico para principiantes",
      price: "$0",
      extraNote: "Siempre gratis",
      features: [
        { text: "Bases interconectadas", included: true },
        { text: "Panel Personalizado Individual", included: true },
        { text: "Métricas básicas de productividad", included: true },
        { text: "Sistema zoom-in zoom-out", included: true },
        { text: "Plantillas básicas", included: true },
        { text: "Modo Enfoque + Pomodoro", included: true },
        { text: "Acceso móvil vía Notion", included: true },
        { text: "Automatizaciones", included: false }
      ],
      cta: "📝 Acceder Versión Gratuita",
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} PRO`,
      badge: "RECOMENDADO",
      description: "Robusto y Poderoso",
      price: "$9.99",
      oldPrice: "$30.00",
      extraNote: "67% OFF - PAGO ÚNICO",
      features: [
        { text: "Todo lo de la versión MINI", included: true },
        { text: "Automatizaciones entre bases", included: true },
        { text: "Panel Individual Avanzado", included: true },
        { text: "Mega-proyectos y Sprints", included: true },
        { text: "Métricas de progreso avanzadas", included: true },
        { text: "Sistema inteligente de prioridades", included: true },
        { text: "Modo Enfoque + Pomodoro", included: true },
        { text: "Plantillas avanzadas", included: true },
        { text: "Sistema de brainstorming", included: true },
        { text: "Botones TDAH", included: true },
        { text: "Vistas múltiples avanzadas", included: true },      ],
      cta: "🦊 Comprar Vinxi PRO",
      badgeColor: mainColor,
      badgeGradient: mainGradient,
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} Ai`,
      badge: "PRÓXIMAMENTE",
      description: "Con Inteligencia Artificial",
      price: "Próximamente",
      features: [
        { text: "Todo lo de la versión PRO", included: true },
        { text: "Asistente IA personalizado", included: true },
        { text: "Optimización automática de proyectos", included: true },
        { text: "Sugerencias inteligentes de prioridades", included: true },
        { text: "Análisis predictivo de entregas", included: true },
        { text: "Generación automática de tareas", included: true }
      ],
      cta: "🔮 Próximamente",
      badgeColor: "#9333ea",
      badgeGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      buttonColor: "#9333ea",
      buttonGradient: "linear-gradient(45deg, #9333ea, #c026d3)",
      comingSoon: true
    }
  ];
}

// Función helper específica para garantía de Midas
function generateMidasGuarantee(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#ff9800'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente (después de la coma)
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  
  return {
    title: "Garantía de claridad financiera",
    description: "Tendrás control total de tus finanzas en los primeros 15 minutos de uso, con un sistema que se adapta a tu vida real.",
    features: [
      "Claridad inmediata",
      "Sistema simple",
      "Sin ser experto"
    ],
    borderColor: mainColor,
    checkmarkColor: mainColor
  };
}

// Función helper específica para garantía de Grilla Viralis
function generateGrillaViralisGuarantee(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#4caf50'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente (después de la coma)
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  
  return {
    title: "Garantía de organización total",
    description: "Tendrás toda tu operación de contenido centralizada y organizada visualmente en un solo lugar, con mayor claridad que cualquier sistema que hayas usado antes.",
    features: [
      "Centralización completa de todos tus clientes",
      "Visibilidad total de proyectos y deadlines",
      "Procesos documentados y replicables"
    ],
    borderColor: mainColor,
    checkmarkColor: mainColor
  };
}

// Función helper específica para garantía de Vinxi
function generateVinxiGuarantee(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#2196f3'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente (después de la coma)
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  
  return {
    title: "Garantía de organización",
    description: "Tendrás todos tus proyectos centralizados y organizados visualmente en un solo lugar, con mejor claridad que tu sistema actual.",
    features: [
      "Centralización completa de proyectos",
      "Organización visual clara",
      "Configuración personalizada incluida"
    ],
    borderColor: mainColor,
    checkmarkColor: mainColor
  };
}

// Función helper para renderizar pasos de "Cómo funciona"
function renderHowItWorksSteps(product: any, mainGradient: string) {
  if (product.howItWorksDetails) {
    return product.howItWorksDetails.map((step: any, i: number) => (
      <div key={i} className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: mainGradient }}>
          <span className="text-white text-3xl font-bold">{step.step}</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
        <p className="text-gray-400">{step.description}</p>
      </div>
    ));
  } else if (product.howItWorks) {
    return product.howItWorks.map((step: string, i: number) => (
      <div key={i} className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: mainGradient }}>
          <span className="text-white text-3xl font-bold">{i + 1}</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{step}</h3>
      </div>
    ));
  }
  return null;
}

// ===== CRITERIOS ESTANDARIZADOS PARA PRODUCTOS =====

// Función helper para generar planes estándar con criterios uniformes
function generateStandardPlansWithCriteria(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#2196f3'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente usando regex
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  const mainGradient = product.avatarBg || `linear-gradient(45deg, ${mainColor}, ${mainColor})`;
  
  return [
    {
      name: `${product.name} MINI`,
      badge: "GRATIS",
      description: "Básico y elemental",
      price: "$0",
      extraNote: "Siempre gratis",
      features: [
        { text: "Funcionalidad básica", included: true },
        { text: "Acceso limitado", included: true },
        { text: "Soporte comunitario", included: true },
        { text: "Funcionalidad avanzada", included: false },
        { text: "Soporte prioritario", included: false },
        { text: "Características premium", included: false }
      ],
      cta: "📝 Acceder Versión Gratuita",
      // Color del producto para el botón GRATIS
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },
    {
      name: `${product.name} PRO`,
      badge: "RECOMENDADO",
      description: "Robusto y Poderoso",
      price: "$9.99",
      oldPrice: "$30",
      extraNote: "67% OFF - PAGO ÚNICO",
      features: [
        { text: "Funcionalidad completa", included: true },
        { text: "Acceso ilimitado", included: true },
        { text: "Soporte prioritario", included: true },
        { text: "Características avanzadas", included: true },
        { text: "Actualizaciones gratuitas", included: true },
        { text: "Integración completa", included: true }
      ],
      cta: `🚀 Probar ${product.name} PRO`,
      // Color del producto para el badge RECOMENDADO y botón
      badgeColor: mainColor,
      badgeGradient: mainGradient,
      buttonColor: mainColor,
      buttonGradient: mainGradient
    },

  ];
}

// Función helper para generar garantía estándar con criterios uniformes
function generateStandardGuaranteeWithCriteria(product: any) {
  // Extraer el color principal del producto del gradiente
  let mainColor = '#2196f3'; // Color por defecto
  if (product.avatarBg) {
    // Extraer el primer color del gradiente (después de la coma)
    const match = product.avatarBg.match(/#[a-fA-F0-9]{6}/);
    if (match) {
      mainColor = match[0];
    }
  }
  
  return {
    title: "Garantía de resultados",
    description: `Tendrás resultados claros y medibles en los primeros días de uso, con un sistema que se adapta a tus necesidades específicas.`,
    features: [
      "Resultados medibles",
      "Sistema adaptativo",
      "Soporte incluido"
    ],
    // Color del producto para el borde y checkmarks de la garantía
    borderColor: mainColor,
    checkmarkColor: mainColor
  };
}

// Función helper para generar metodología estándar con criterios uniformes
function generateStandardMethodologyWithCriteria(product: any) {
  return [
    {
      title: "Las reglas son simples",
      columns: [
        {
          subtitle: "🎯 Mantén el enfoque",
          text: "Concentra tu energía en lo que realmente importa. El sistema te ayuda a priorizar y mantener la consistencia.",
          bullets: [
            "Prioriza lo importante",
            "Mantén la consistencia",
            "Enfócate en resultados"
          ]
        },
        {
          subtitle: "📊 Mide el progreso",
          text: "No adivines: usa datos reales para tomar decisiones informadas y optimizar tu estrategia.",
          bullets: [
            "Métricas claras",
            "Análisis en tiempo real",
            "Ajustes basados en datos"
          ]
        }
      ]
    }
  ];
}

// Función helper para obtener el texto del badge según el producto
function getProductBadgeText(product: any) {
  switch (product.slug) {
    case 'okro':
      return '💼 Negocios';
    case 'vinxi':
      return '🌱 Desarrollo personal';
    case 'grilla-viralis':
      return '📈 Marketing';
    case 'jaime-daily':
      return '🌱 Desarrollo personal';
    case 'midas':
      return '💰 Finanzas personales';
    case 'bafet':
      return '💰 Finanzas personales';
    case 'navio':
      return '💼 Negocios';
    default:
      return '🏋️‍♂️ MÁS POPULAR';
  }
}

// Función helper para generar características principales estándar
function generateStandardMainFeaturesWithCriteria(product: any) {
  return [
    {
      icon: "🎯",
      title: "Enfoque estratégico",
      description: "Concentra tus esfuerzos en lo que realmente genera resultados, eliminando distracciones y optimizando tu tiempo.",
      bullets: [
        "Priorización inteligente",
        "Eliminación de ruido",
        "Optimización de tiempo"
      ]
    },
    {
      icon: "📈",
      title: "Crecimiento medible",
      description: "Mide y analiza tu progreso con métricas claras que te permiten tomar decisiones informadas.",
      bullets: [
        "Métricas en tiempo real",
        "Análisis detallado",
        "Ajustes automáticos"
      ]
    },
    {
      icon: "⚡",
      title: "Eficiencia máxima",
      description: "Automatiza procesos repetitivos y optimiza tu flujo de trabajo para lograr más con menos esfuerzo.",
      bullets: [
        "Automatización inteligente",
        "Flujos optimizados",
        "Productividad aumentada"
      ]
    },
    {
      icon: "🔄",
      title: "Adaptación continua",
      description: "El sistema se adapta a tus necesidades cambiantes, creciendo y evolucionando contigo.",
      bullets: [
        "Flexibilidad total",
        "Escalabilidad automática",
        "Evolución constante"
      ]
    },
    {
      icon: "🎨",
      title: "Experiencia personalizada",
      description: "Disfruta de una experiencia única adaptada a tu estilo de trabajo y preferencias específicas.",
      bullets: [
        "Personalización completa",
        "Interfaz intuitiva",
        "Experiencia única"
      ]
    }
  ];
}

function generateOKRoMainFeatures(product: any) {
  return [
    {
      icon: "😤",
      title: "¿Te pierdes entre mil tareas sin saber cuál importa?",
      description: "Siempre ocupado pero nunca avanzando. OKRo te da la claridad para enfocar tu energía donde más impacta.",
      bullets: [
        "Objetivos claros que realmente puedes medir",
        "Períodos definidos que te obligan a actuar",
        "Estructura simple: Objetivo → Resultado → Acción",
        "Todo en Notion, sin aprender herramientas nuevas"
      ]
    },
    {
      icon: "👥",
      title: "¿Tu equipo trabaja mucho pero no avanzan hacia lo importante?",
      description: "Equipo ocupado pero sin dirección. OKRo alinea a todos hacia los mismos objetivos con transparencia total.",
      bullets: [
        "Alineación visible de todo el equipo",
        "Cada miembro ve cómo su trabajo impacta los objetivos",
        "Eliminas trabajo en silos y duplicado",
        "Transparencia total en quién hace qué y por qué"
      ]
    },
    {
      icon: "🤯",
      title: "¿No puedes priorizar cuando tu jefe dice que todo es \"urgente\"?",
      description: "Presión imposible con recursos limitados. OKRo te da criterios objetivos para defender tus decisiones.",
      bullets: [
        "Ponderación visual del impacto real de cada proyecto",
        "Argumentos data-driven para defender tus decisiones",
        "Criterios claros cuando todo parece importante",
        "Confianza para decir \"no\" con fundamento estratégico"
      ]
    },
    {
      icon: "😩",
      title: "¿Pierdes horas cada semana en reportes y reuniones de seguimiento?",
      description: "Preparando updates en lugar de trabajar. OKRo automatiza el seguimiento para que lideres, no reportes.",
      bullets: [
        "Dashboard que se actualiza automáticamente",
        "Elimina reuniones de \"¿cómo vamos?\" repetitivas",
        "Reportes visuales listos para compartir con jefes",
        "Más tiempo para trabajo estratégico, menos admin"
      ]
    },
    {
      icon: "👀",
      title: "¿Te enteras que no van a cumplir objetivos hasta que es demasiado tarde?",
      description: "Angustia de fin de trimestre. OKRo te da visibilidad temprana para ajustar el rumbo a tiempo.",
      bullets: [
        "Alertas tempranas cuando algo se desvía",
        "Progreso visible week-over-week",
        "Predicciones basadas en tendencias actuales",
        "Tiempo para reaccionar, no solo reportar fracasos"
      ]
    }
  ];
}

// Array de productos centralizado
const products = [
  {
    name: "Jaime Daily",
    slug: "jaime-daily",
    subtitle: "Hábitos inteligentes que se adaptan a ti",
    avatar: "🐔",
    avatarBg: "linear-gradient(45deg, #22c55e, #10b981)",
    popularity: "popular",
    status: "Disponible",
    statusColor: "green",
    audience: "Para los que han probado todo… y lo han dejado todo.",
    oldPrice: "$9.99",
        price: "$5.99",
    priceDescription: "Acceso de por vida. Sin suscripciones.",
        features: [
      "Seguimiento diario",
      "Recordatorios útiles",
      "Progreso claro",
      "Versión Mini GRATIS",
    ],
    cta: "🚀 Empezar con Jaime Daily",
    ctaClass: "primary",
    ctaFinal: {
      title: "¿Cuánto tiempo más vas a esperar para cambiar?",
      description: "Cada día cuenta para construir la vida que imaginas.<br /><span class=\"text-green-300 font-semibold\">Empieza hoy</span> con Jaime Daily.",
      primary: "🌱 Empezar con Jaime Daily",
      secondary: "📞 Agendar consulta gratuita"
    },
    // Características principales específicas de Jaime Daily
    mainFeatures: [
      {
        icon: "❤️",
        title: "¿Cansado de empezar y abandonar?",
        description: "Jaime Daily hace que tus hábitos se queden contigo.",
        bullets: [
          "Solo necesitas 30 segundos al día",
          "Visual, claro y sin complicaciones",
          "Tu progreso se acumula automáticamente",
          "Funciona desde tu teléfono"
        ]
      },
      {
        icon: "🔴",
        title: "¿Los malos hábitos siempre ganan?",
        description: "Reemplaza lo automático por un sistema simple y medible.",
        bullets: [
          "Cada día sin el mal hábito es una victoria",
          "Ves tu progreso acumularse visualmente",
          "Reemplazas lo negativo con lo positivo",
          "Sin culpa, solo avance real"
        ]
      },
      {
        icon: "🤔",
        title: "¿Harto de apps que se convierten en distracción?",
        description: "Jaime Daily vive donde ya trabajas: en Notion.",
        bullets: [
          "Cero notificaciones que te molesten",
          "No hay que aprender nada nuevo",
          "Tus datos siempre son tuyos",
          "Una interfaz que ya conoces"
        ]
      },
      {
        icon: "🤔",
        title: "¿No entiendes por qué no logras cambiar?",
        description: "Descubre tus patrones y cambia de raíz.",
        bullets: [
          "Una página creada automáticamente cada día",
          "Preguntas que te ayudan a reflexionar",
          "Identificas tus patrones reales",
          "Creces como persona, no solo \"haces cosas\""
        ]
      }
    ],
    // Usar planes específicos de Jaime Daily
    get plans() { return generateJaimeDailyPlans(this); },
    // Usar garantía específica de Jaime Daily
    get guarantee() { return generateJaimeDailyGuarantee(this); },
    faqs: [
      {
        question: "¿Qué incluye exactamente Jaime Daily?",
        answer: "Jaime Daily es un sistema completo de tracking construido en Notion que incluye tres tableros especializados: seguimiento de hábitos diarios, eliminación de comportamientos negativos, y desarrollo de habilidades intermitentes. Todo integrado con automatización, gamificación y un diario personal."
      },
      {
        question: "¿Es una suscripción mensual?",
        answer: "No, Jaime Daily PRO es un pago único sin suscripciones. Una vez que lo adquieres, es tuyo para siempre. Solo necesitas una cuenta gratuita de Notion para usarlo."
      },
      {
        question: "¿Cómo funciona el sistema de tableros?",
        answer: "La versión PRO incluye tres tableros interconectados: hábitos diarios para rutinas constantes, batallas contra malos hábitos que funcionan en sentido contrario (evitar presionar botones), y actividades intermitentes para hobbies o habilidades que no requieren constancia diaria."
      },
      {
        question: "¿Necesito experiencia en Notion?",
        answer: "No es necesario, pero se recomienda familiarizarse con la plataforma para aprovechar al máximo todas las funcionalidades del sistema."
      },
      {
        question: "¿Puedo acceder desde el móvil?",
        answer: "Sí, el tracker funciona perfectamente en la app de Notion para smartphones, permitiendo actualizar tus hábitos desde cualquier lugar."
      },
      {
        question: "¿Hay alguna versión gratuita?",
        answer: "Sí, existe una versión MINI gratuita con funciones básicas que incluye los primeros dos tableros. La versión PRO desbloquea el sistema completo con todas las herramientas avanzadas. Ambas requieren solo una cuenta gratuita de Notion."
      },
      {
        question: "¿Realmente funciona o es puro marketing?",
        answer: "Mira, no te vamos a prometer que cambiarás tu vida en 7 días. Pero el sistema está basado en principios de psicología conductual comprobados: refuerzo visual, seguimiento simple, y reflexión diaria. Miles de personas ya lo usan con resultados reales."
      },
      {
        question: "¿No es esto algo que puedo hacer yo mismo en Excel?",
        answer: "Sí, podrías. Pero llevamos 6 meses perfeccionando cada detalle: colores que motivan, automatizaciones que funcionan, y un sistema de gamificación que realmente te engancha. ¿Por qué reinventar la rueda cuando puedes empezar hoy mismo?"
      }
    ],
    testimonials: [
      { name: "María S.", text: "Jaime Daily cambió completamente mi rutina matutina. En 30 días logré establecer 3 hábitos nuevos que llevaba años intentando mantener.", role: "Emprendedora", result: "3 hábitos establecidos" },
      { name: "Carlos R.", text: "Con Jaime Daily, por fin logré ser constante con el ejercicio y la lectura diaria.", role: "Desarrollador", result: "2 hábitos consolidados" },
    ],
    howItWorksDetails: [
      {
        step: "1",
        title: "Define tus hábitos",
        description: "Elige qué quieres construir, mejorar o eliminar.",
        bullets: [
          "Crea rutinas claras",
          "Establece objetivos reales",
          "Mantén todo simple"
        ]
      },
      {
        step: "2",
        title: "Registra tus avances",
        description: "Marca tu día, ve el progreso y no pierdas el hilo.",
        bullets: [
          "Registro diario",
          "Rachas visibles",
          "Feedback inmediato"
        ]
      },
      {
        step: "3",
        title: "Ajusta y mejora",
        description: "Detecta patrones y corrige lo que no funciona.",
        bullets: [
          "Insights útiles",
          "Ajustes rápidos",
          "Crecimiento constante"
        ]
      }
    ],
    howItWorksDescription: "Así es como Jaime Daily te ayuda a dejar de abandonar tus hábitos.",
    metodologia: [
      {
        title: "Es así de simple",
        columns: [
          {
            subtitle: "🎯 Mantente enfocado",
            text: "Nada de apps caóticas ni mil botones. Solo hábitos, claros y medibles.",
            bullets: [
              "Marca solo lo que hiciste",
              "Verde significa progreso",
              "La consistencia es la clave"
            ]
          },
          {
            subtitle: "✍️ Reflexiona a diario",
            text: "Tu diario automático te muestra cómo avanzas y qué necesitas cambiar.",
            bullets: [
              "Páginas creadas cada día",
              "Calificación simple por estrellas",
              "Registro de patrones y aprendizajes"
            ]
          }
        ]
      }
    ],
  },
  {
    name: "Midas",
    slug: "midas",
    subtitle: "Por fin, paz financiera",
    avatar: "🐷",
    avatarBg: "linear-gradient(45deg, #ff9800, #f57c00)",
    popularity: "popular",
    status: "Disponible",
    statusColor: "green",
    audience: "Tu gestor de finanzas personales. Paga una vez. Toma el control para siempre.",
    oldPrice: "$12.99",
    price: "$8.99",
    priceDescription: "Pago único. Sin suscripciones.",
    features: [
      "Sin caos",
      "Con claridad",
      "Para siempre",
    ],
    cta: "🚀 Comenzar con Midas",
    ctaClass: "primary",
    ctaFinal: {
      title: "¿Listo para transformar tus finanzas?",
      description: "Personas como tú ya duermen tranquilas sabiendo exactamente dónde está su dinero.<br /><span class=\"text-orange-300 font-semibold\">Tú también puedes.</span>",
      primary: "🚀 Comenzar con Midas",
      secondary: "📞 Agendar consulta gratuita"
    },
    // Usar planes específicos de Midas
    get plans() { return generateMidasPlans(this); },
    // Usar garantía específica de Midas
    get guarantee() { return generateMidasGuarantee(this); },
    faqs: [
      { question: "¿Qué incluye Midas?", answer: "Incluye análisis de gastos, planificación de presupuesto, inversiones y soporte personalizado." },
      { question: "¿Puedo probar Midas gratis?", answer: "Sí, hay una versión Mini gratuita por 7 días." },
      { question: "¿Voy a tener que dedicar horas cada día a esto?", answer: "30 segundos por cada gasto que registres. Eso es todo. Midas no te va a convertir en contador, solo te va a dar la claridad que necesitas sin robarte tiempo." },
      { question: "¿Qué pasa si no soy bueno con los números?", answer: "Perfecto, Midas es para ti. No hay fórmulas complicadas ni análisis que requieran MBA. Solo números simples: entró X, salió Y, te quedan Z. Así de fácil." },
      { question: "¿Necesito ser experto en Notion para usarlo?", answer: "Para nada. Si sabes abrir una página web, puedes usar Midas. Incluye instrucciones tan simples que hasta tu abuela podría configurarlo." }
    ],
    // Características principales específicas de Midas
    mainFeatures: [
      {
        icon: "🤔 → 😌",
        title: "¿No sabes en qué gastas tu dinero?",
        description: "Clasifica ingresos y gastos sin esfuerzo. Activa automatizaciones opcionales y deja que Midas ponga orden solo. Al fin sabrás dónde se va cada peso.",
        bullets: [
          "Clasificación automática",
          "Automatizaciones opcionales",
          "Visibilidad total",
          "Control absoluto"
        ]
      },
      {
        icon: "🤷‍♂️ → 📈",
        title: "¿Trabajas mucho pero no sabes si es rentable?",
        description: "Especial para freelancers: descubre qué proyectos realmente generan ingresos y cuáles solo te quitan tiempo. Decide con números, no con suposiciones.",
        bullets: [
          "Análisis por proyecto",
          "Métricas de rentabilidad",
          "Decisiones basadas en datos",
          "Optimización de tiempo"
        ]
      },
      {
        icon: "😱 → 🛡️",
        title: "¿Te sorprenden suscripciones olvidadas?",
        description: "Nunca más perder dinero por cobros fantasma. Midas detecta y vigila tus gastos recurrentes para que nada se te escape.",
        bullets: [
          "Detección automática",
          "Vigilancia continua",
          "Alertas preventivas",
          "Control total"
        ]
      },
      {
        icon: "😰 → 🎯",
        title: "¿Te da ansiedad no ahorrar lo suficiente?",
        description: "Fija tu meta de ahorro y ve tu progreso día a día. Midas te muestra exactamente cuánto avanzas para que duermas tranquilo.",
        bullets: [
          "Metas personalizadas",
          "Progreso visual",
          "Tranquilidad financiera",
          "Resultados claros"
        ]
      },
      {
        icon: "⏰ → ⚡",
        title: "¿No tienes tiempo para finanzas complicadas?",
        description: "30 segundos por registro. Menos tiempo del que tardas en encontrar el Wi-Fi en un café. Registro ultra-rápido sin complicaciones.",
        bullets: [
          "Registro en 30 segundos",
          "Sin complicaciones",
          "Más rápido que encontrar Wi-Fi",
          "Proceso ultra-simple"
        ]
      }
    ],
    testimonials: [
      { name: "Ana G.", text: "Midas me ayudó a ahorrar un 30% más cada mes.", role: "Diseñadora", result: "30% más de ahorro" },
    ],
    howItWorksDetails: [
      {
        step: "1",
        title: "Configura tus categorías básicas",
        description: "Define categorías simples como comida, casa, transporte. Personaliza según tu vida real, no teorías complicadas.",
        bullets: [
          "Categorías simples",
          "Personalización real",
          "Sin teorías complicadas",
          "Configuración básica"
        ]
      },
      {
        step: "2",
        title: "Establece tu objetivo de ahorro",
        description: "Fija cuánto quieres ahorrar al mes. Midas te mostrará tu progreso sin presión ni juicios.",
        bullets: [
          "Metas mensuales",
          "Progreso visible",
          "Sin presión",
          "Sin juicios"
        ]
      },
      {
        step: "3",
        title: "Registra ingresos y gastos",
        description: "Añade movimientos en segundos. Compraste algo? Lo registras. Cobraste? También. Simple y rápido.",
        bullets: [
          "Registro en segundos",
          "Proceso simple",
          "Movimientos claros",
          "Rapidez total"
        ]
      },
      {
        step: "4",
        title: "Visualiza tu control financiero",
        description: "Abre Midas y al instante sabes: cuánto tienes, cuánto puedes gastar, cómo va tu ahorro. Todo claro.",
        bullets: [
          "Control instantáneo",
          "Visibilidad total",
          "Claridad financiera",
          "Información clara"
        ]
      }
    ],
    howItWorksDescription: "Así es como Midas te da control total de tus finanzas en minutos.",
    metodologia: [
      {
        title: "Es así de simple",
        columns: [
          {
            subtitle: "📝 Registra sin filtros",
            text: "Anota todos tus movimientos sin juzgar su tamaño o importancia. Tú decides cómo categorizarlos para mantener tu sistema personal organizado.",
            bullets: [
              "Sin juicios",
              "Categorización personal",
              "Sistema organizado"
            ]
          },
          {
            subtitle: "📊 Usa las vistas estratégicamente",
            text: "Aprovecha las diferentes vistas para mantener control total: progreso mensual para metas, historial para patrones, proyectos para rentabilidad.",
            bullets: [
              "Control total",
              "Vistas múltiples",
              "Análisis estratégico"
            ]
          }
        ]
      }
    ],
  },
  {
    name: "Bafet",
    slug: "bafet",
    subtitle: "Control total de tus inversiones crypto",
    avatar: "🐸",
    avatarBg: "linear-gradient(45deg, #9c27b0, #e91e63)",
    popularity: "popular",
    status: "En desarrollo",
    statusColor: "purple",
    audience: "Para personas que buscan navegar el mundo crypto con estrategias inteligentes.",
    oldPrice: null,
    price: "Próximamente",
    features: [
      "✔ Rentabilidad clara",
      "✔ Planes simples",
      "✔ Histórico preciso"
    ],
    cta: "🔔 Únirme a la lista VIP",
    ctaClass: "tertiary",
    ctaFinal: {
      title: "¿Listo para dejar de improvisar con tus criptoinversiones?",
      description: "Con Bafet, cada orden, cada plan y cada movimiento tienen sentido.<br /><span class=\"text-purple-300 font-semibold\">Toma el control de tu trading hoy.</span>",
      primary: "🚀 Únirme a la lista VIP",
      secondary: "🎬 Ver demo"
    },
    faqs: [
      { 
        question: "¿Qué es exactamente Bafet y cómo puede ayudarme?", 
        answer: "Bafet es tu sistema de control para inversiones en criptomonedas. Te ayuda a organizar tus portafolios, fragmentar órdenes, analizar métricas avanzadas y visualizar tu progreso en un solo lugar. Con él, dejas de invertir \"a ciegas\" y pasas a tomar decisiones con datos claros y trazables." 
      },
      { 
        question: "¿Necesito experiencia previa en trading para usar Bafet?", 
        answer: "No. Bafet está diseñado para que puedas empezar desde cero, pero con las herramientas de alguien avanzado. Si ya tienes experiencia, simplemente te ayudará a trabajar de forma más ordenada y estratégica." 
      },
      { 
        question: "¿Qué diferencia a Bafet de una simple hoja de cálculo?", 
        answer: "Las hojas de cálculo solo muestran datos. Bafet los convierte en información útil: planes de trading claros, fragmentación de órdenes, métricas de análisis y un historial visual de tu progreso. Además, todo está conectado de forma automática, sin fórmulas que tengas que construir tú mismo." 
      },
      { 
        question: "¿Puedo llevar varios portafolios al mismo tiempo?", 
        answer: "Sí. Puedes crear tantos portafolios como necesites y gestionarlos en paralelo. Cada uno mantiene su propio historial de operaciones y métricas, para que nunca mezcles información ni pierdas visibilidad de tu rendimiento real." 
      },
      { 
        question: "¿Bafet tiene acceso a mis cuentas de intercambio de criptomonedas?", 
        answer: "No. Bafet no se conecta a tus exchanges ni maneja tu dinero. Toda la información se registra de forma manual para que tú tengas el control total." 
      },
      { 
        question: "¿Necesito experiencia previa con Notion?", 
        answer: "No. Bafet incluye una guía paso a paso para que puedas usarlo sin complicaciones. Aunque nunca hayas abierto Notion, en pocos minutos podrás tener todo listo y funcionando." 
      },
      { 
        question: "¿Cuándo estará disponible Bafet?", 
        answer: "Actualmente en desarrollo. Puedes unirte a la lista VIP para enterarte del lanzamiento." 
      },
    ],
    testimonials: [
      {
        name: 'María L.',
        text: 'Siempre quise invertir en criptos, pero me perdía entre hojas de cálculo y notas sueltas. Con Bafet, por primera vez siento que tengo todo bajo control. En un mes ya sé exactamente cuánto gano, cuánto pierdo y qué ajustar. No necesito adivinar: Bafet me lo muestra claro.',
        role: 'Inversionista principiante',
        result: 'Control total en un mes'
      },
      {
        name: 'Carlos R.',
        text: 'Antes usaba varias herramientas para llevar mis trades, pero nada estaba conectado. Con Bafet no solo veo mis portafolios y métricas avanzadas (como el Profit Factor), sino que además puedo ajustar mi estrategia en tiempo real. Es como tener un panel de control de trading sin complicaciones.',
        role: 'Trader independiente',
        result: 'Panel de control sin complicaciones'
      }
    ],
    mainFeatures: [
      {
        icon: "💹",
        title: "¿Tus inversiones están en hojas de cálculo caóticas?",
        description: "Olvídate de fórmulas rotas y pestañas infinitas. Con Bafet, tu portafolio se organiza solo, en un panel claro y visual.",
        bullets: [
          "Seguimiento centralizado por portafolio",
          "Histórico de resultados siempre visible",
          "Datos listos para analizar sin perder tiempo"
        ]
      },
      {
        icon: "🕒",
        title: "¿No sabes si vas ganando o perdiendo?",
        description: "No más cálculos manuales ni suposiciones. Bafet convierte tus números en métricas claras para tomar decisiones inteligentes.",
        bullets: [
          "Rentabilidad acumulada en tiempo real",
          "Métricas de riesgo y beneficio clave",
          "Visualización simple y sin tecnicismos"
        ]
      },
      {
        icon: "🎯",
        title: "¿Te cuesta ejecutar tu plan de trading?",
        description: "Bafet te ayuda a pasar de \"improvisar\" a \"operar con disciplina\". Planifica, sigue y ajusta sin perder la visión global.",
        bullets: [
          "Planes de trading por trimestre",
          "Seguimiento de objetivos de compra y venta",
          "Alertas internas para mantenerte en ruta"
        ]
      },
      {
        icon: "📉",
        title: "¿Vendes tarde o compras sin estrategia?",
        description: "Convierte la intuición en estrategia. Bafet te muestra el panorama completo antes de mover una ficha.",
        bullets: [
          "Análisis de órdenes abiertas y cerradas",
          "Timeline de movimientos y decisiones",
          "Información clave para optimizar cada entrada y salida"
        ]
      },
      {
        icon: "📊",
        title: "¿Te pierdes entre demasiadas operaciones?",
        description: "Cada inversión bajo control. Fragmenta tus órdenes, haz seguimiento a cada parte y mantén trazabilidad completa.",
        bullets: [
          "Subórdenes conectadas al plan principal",
          "Visibilidad de cada micro-movimiento",
          "Sin perder de vista el panorama global"
        ]
      }
    ],
    howItWorks: [
      "Crea tu portafolio.",
      "Define tu plan trimestral.",
      "Fragmenta y ejecuta.",
      "Analiza y ajusta.",
    ],
    howItWorksDetails: [
      {
        step: "1",
        title: "Crea tu portafolio",
        description: "Registra tus inversiones iniciales y vincula tus cuentas de trading.",
        bullets: [
          "Configuración de portafolio personalizado",
          "Vinculación con exchanges principales",
          "Registro de inversiones iniciales",
          "Seguimiento de activos en tiempo real"
        ]
      },
      {
        step: "2",
        title: "Define tu plan trimestral",
        description: "Organiza tus objetivos y órdenes en ciclos estratégicos.",
        bullets: [
          "Establecimiento de objetivos financieros",
          "Planificación de estrategias de trading",
          "Definición de ciclos trimestrales",
          "Configuración de órdenes automáticas"
        ]
      },
      {
        step: "3",
        title: "Fragmenta y ejecuta",
        description: "Divide tus órdenes en partes manejables sin perder control.",
        bullets: [
          "División inteligente de órdenes grandes",
          "Ejecución gradual para minimizar impacto",
          "Control total sobre el timing",
          "Gestión de riesgo automatizada"
        ]
      },
      {
        step: "4",
        title: "Analiza y ajusta",
        description: "Observa tus métricas en tiempo real y optimiza tu estrategia.",
        bullets: [
          "Dashboard de métricas en tiempo real",
          "Análisis de rendimiento detallado",
          "Alertas de mercado personalizadas",
          "Optimización continua de estrategias"
        ]
      }
    ],
    howItWorksDescription: "Así es como BAFET te ayuda a navegar el mundo crypto con estrategias inteligentes y control total.",
    metodologia: [
      {
        title: "Es así de simple",
        columns: [
          {
            icon: "🎯",
            title: "Invierte sin estrés",
            description: "Nada de plataformas complejas. Solo tu portafolio y las métricas que importan.",
            bullets: [
              "Registro de órdenes claro",
              "Gráficos simples de evolución",
              "Datos útiles, sin ruido"
            ]
          },
          {
            icon: "📊",
            title: "Mejora con datos",
            description: "Convierte tu inversión en una estrategia real, no en un juego de azar.",
            bullets: [
              "Métricas como Risk/Reward y Drawdown",
              "Historial de operaciones organizado",
              "Información para ajustar y crecer"
            ]
          }
        ]
      }
    ],
  },
  {
    name: "Vinxi",
    slug: "vinxi",
    subtitle: "Gestor de ideas y proyectos.",
    avatar: "🦊",
    avatarBg: "linear-gradient(45deg, #2196f3, #21cbf3)",
    popularity: "popular",
    status: "Disponible",
    statusColor: "green",
    audience: "Si tu mente es un caos de pestañas abiertas, aquí está tu botón de claridad.",
    oldPrice: "$30.00",
    price: "$9.99",
    priceDescription: "Pago único. Sin suscripciones.",
    features: [
      "✔ Ordena tus ideas",
      "✔ Planifica sin fricción",
      "✔ Ejecuta sin perder el hilo",
    ],
    cta: "🚀 Probar Vinxi Gratis",
    ctaClass: "primary",
    ctaFinal: {
      title: "¿Listo para dejar atrás el caos y enfocarte?",
      description: "Convierte tu lista infinita de ideas en un plan claro y accionable desde hoy.",
      primary: "🚀 Probar Vinxi Gratis",
      secondary: "📞 Agendar consulta gratuita"
    },
    // Usar planes específicos de Vinxi
    get plans() { return generateVinxiPlans(this); },
    // Usar garantía específica de Vinxi
    get guarantee() { return generateVinxiGuarantee(this); },
    // Características principales específicas de Vinxi
    mainFeatures: [
      {
        icon: "🧠",
        title: "¿Tu mente es un caos de ideas dispersas?",
        description: "Notas en el móvil, papelitos, apps diferentes… Cuando buscas esa idea brillante, ya se perdió. Con Vinxi, cada chispa creativa tiene su lugar.",
        bullets: [
          "Todo centralizado en una sola interfaz",
          "Zoom in/out para ver detalles o panoramas",
          "Conecta ideas entre proyectos diferentes",
          "Nunca más pierdes una inspiración valiosa"
        ]
      },
      {
        icon: "🎯",
        title: "¿Saltas de tarea en tarea sin terminar nada?",
        description: "Abres 20 pestañas, empiezas mil cosas, pero nada importante termina. La dispersión mental mata tu momentum creativo antes de empezar.",
        bullets: [
          "Modo Enfoque elimina distracciones",
          "Temporizador Pomodoro integrado",
          "Solo ves lo que importa AHORA",
          "Tu cerebro finalmente puede concentrarse"
        ]
      },
      {
        icon: "🔥",
        title: "¿Todo parece urgente, pero nada se acaba?",
        description: "\"Tengo mil cosas urgentes\" es el soundtrack de tu cabeza. Corres todo el día, pero nunca avanzas en lo que realmente importa.",
        bullets: [
          "Sistema P1-P5 para clasificar por urgencia",
          "Tú decides prioridades, no el sistema",
          "Distribuye tu energía estratégicamente",
          "Claridad visual de lo que importa de verdad"
        ]
      },
      {
        icon: "🌊",
        title: "¿Te ahogas manejando varios proyectos?",
        description: "Cliente A pide esto, proyecto B tiene deadline, idea C se olvida… Te sientes como un malabarista amateur con demasiadas pelotas en el aire.",
        bullets: [
          "Vista Timeline para todos los deadlines",
          "Etiquetas para conectar tareas",
          "Vista Atención para lo que urge hoy",
          "Control total sin perder ningún proyecto"
        ]
      },
      {
        icon: "😅",
        title: "¿La culpa productiva te persigue?",
        description: "Ese \"deberías estar haciendo más\" no te deja en paz. Trabajas, pero sientes que no es suficiente. Con Vinxi, la culpa se reemplaza con datos.",
        bullets: [
          "Registro visual de tu progreso real",
          "Celebra avances diarios concretos",
          "Elimina la culpa con evidencia",
          "Recupera el disfrute de crear"
        ]
      },
      {
        icon: "⏱",
        title: "¿Subestimas siempre el tiempo?",
        description: "\"Esto me toma 2 horas\" y terminas tardando 6. Vinxi te devuelve control sobre tu realidad y tu credibilidad.",
        bullets: [
          "Variable \"Agilidad\" para estimar tiempo real",
          "Aprende de tus patrones de estimación",
          "Mejora tu precisión con datos históricos",
          "Recupera confianza con clientes y contigo"
        ]
      }
    ],
    faqs: [
      { question: "¿Vinxi es solo para creativos?", answer: "No, es útil para cualquier persona que quiera organizar su vida de forma visual y flexible." },
      {
        question: "¿Por dónde empiezo si nunca he usado algo así?",
        answer: "Empiezas simple. Vinxi está diseñado para que veas resultados desde el primer día. Configuras lo básico en minutos, das tus primeros pasos con nuestras guías rápidas y, cuando quieras, puedes profundizar. Sin manuales eternos. Sin curva de aprendizaje imposible."
      },
      {
        question: "¿En serio otro sistema más va a funcionar?",
        answer: "Entendemos tu escepticismo. Ya probaste apps que prometían \"revolucionar tu productividad\" y aquí sigues, con el mismo caos. Vinxi no es otra app más. Es un sistema creado para mentes creativas que piensan diferente. No te obliga a cambiar tu forma de trabajar: se adapta a cómo ya piensas… y lo ordena. Vinxi no pide fe ciega: lo pruebas y tu caos empieza a tener estructura."
      },
      {
        question: "¿Vinxi decide mis prioridades automáticamente?",
        answer: "No. Y eso es precisamente lo mejor. Nadie conoce tu contexto mejor que tú. Vinxi te da un marco claro (P1-P5) para que clasifiques tus tareas según tus propios criterios. Luego convierte esas decisiones en claridad visual para que distribuyas tu energía estratégicamente."
      },
      {
        question: "¿Realmente va a eliminar esa sensación de \"todo es urgente\"?",
        answer: "Esa ansiedad de \"mil cosas compitiendo por tu atención\" no es sostenible. P1-P5 actúa como un filtro: P1 y P2 son para lo esencial, P3 y P4 para cuando tu energía baja, y P5 para lo que puede esperar. Tu cerebro deja de pelear con listas infinitas y por fin puede enfocarse."
      },
      {
        question: "¿Puedo usar Vinxi en mi móvil?",
        answer: "Sí. Vinxi está optimizado para móviles a través de Notion. Gestiona tus proyectos desde cualquier lugar, sin perderte entre menús. Abres, das clic y avanzas."
      },
      {
        question: "¿Qué son los botones de ayuda rápida?",
        answer: "Son disparadores que desbloquean tu mente en segundos. \"Iniciar mi día\", \"Motivación express\", \"Necesito concentrarme\", \"Dividir tarea enorme\" y \"Salir de la parálisis\". Un clic y dejas de pensarlo: empiezas a hacerlo."
      },
      {
        question: "¿Necesito experiencia previa con Notion?",
        answer: "No. Si sabes dar clic, sabes usar Vinxi. Incluye configuración guiada paso a paso y reglas simples. Y si ya dominas Notion, te encantará la flexibilidad extra que desbloqueas."
      }
    ],
    testimonials: [
      {
        name: "Marina López",
        role: "Diseñadora • 3 meses usando Vinxi",
        text: "El Modo Enfoque cambió mi vida. Antes saltaba entre mil proyectos, ahora termino lo que empiezo. Las etiquetas me ayudan a conectar ideas de diferentes clientes.",
        result: "3 proyectos terminados al mes, +40% de ingresos"
      },
      {
        name: "Carlos Mendoza",
        role: "Emprendedor • 4 meses usando Vinxi",
        text: "El sistema de prioridades P1-P5 es genial. Ya no pierdo tiempo decidiendo qué hacer. Todo está claro y mi equipo sabe exactamente qué es urgente.",
        result: "-50% tiempo en reuniones, +25% productividad del equipo"
      },
      {
        name: "Ana Torres",
        role: "Content Creator • 2 meses usando Vinxi",
        text: "Los botones de ayuda rápida son mi salvación. 'Dividir tarea enorme' me permite desglosar proyectos complejos sin perder la motivación. Súper útil.",
        result: "2 videos por semana consistentes, 50K suscriptores nuevos"
      },
      {
        name: "Roberto Silva",
        role: "Consultor • 6 meses usando Vinxi",
        text: "La vista Timeline me da perspectiva real de mis deadlines. Vinxi funciona perfecto en móvil, gestiono mis proyectos desde cualquier lugar.",
        result: "8 clientes simultáneos, 0 retrasos en entregas"
      }
    ],
    howItWorks: [
      "Captura tus ideas",
      "Organiza y conecta",
      "Convierte en acción",
      "Haz seguimiento sin estrés",
    ],
    howItWorksDescription: "Así es como Vinxi transforma tus ideas dispersas en proyectos claros.",
    howItWorksDetails: [
      {
        step: "1",
        title: "Captura tus ideas",
        description: "Anota todo sin filtros: desde pensamientos fugaces hasta planes completos.",
        bullets: [
          "Sin filtros",
          "Pensamientos fugaces",
          "Planes completos",
          "Vinxi guarda tu mente en orden"
        ]
      },
      {
        step: "2",
        title: "Organiza y conecta",
        description: "Clasifica tus ideas por proyectos, temas o prioridades.",
        bullets: [
          "Clasificación por proyectos",
          "Organización por temas",
          "Sistema de prioridades",
          "Del caos mental a un sistema claro y navegable"
        ]
      },
      {
        step: "3",
        title: "Convierte en acción",
        description: "Transforma tus ideas en tareas con pasos concretos.",
        bullets: [
          "Transformación de ideas",
          "Tareas concretas",
          "Pasos específicos",
          "De \"algún día\" a \"hecho\""
        ]
      },
      {
        step: "4",
        title: "Haz seguimiento sin estrés",
        description: "Monitorea tu avance, ajusta y sigue creando.",
        bullets: [
          "Monitoreo de avance",
          "Ajustes continuos",
          "Creación sin límites",
          "Sin fricción, sin perder el hilo"
        ]
      }
    ],
    metodologia: [
      {
        title: "Es así de simple",
        columns: [
          {
            subtitle: "📌 Ideas listas para usar",
            text: "Convierte cualquier pensamiento en algo tangible.",
            bullets: [
              "Captura sin límites",
              "Sin estructura rígida",
              "Guarda lo importante en segundos"
            ]
          },
          {
            subtitle: "📌 Planes que se cumplen",
            text: "Pasa de las ideas a la acción sin perder nada por el camino.",
            bullets: [
              "Vistas por proyectos",
              "Seguimiento claro y visual",
              "Todo conectado para que nada se pierda"
            ]
          }
        ]
      }
    ],
  },
  {
    name: "Grilla Viralis",
    slug: "grilla-viralis",
    subtitle: "Gestión de contenidos.",
    avatar: "🦗",
    avatarBg: "linear-gradient(45deg, #4caf50, #8bc34a)",
    popularity: "popular",
    status: "Disponible",
    statusColor: "green",
    audience: "Si tu calendario de contenidos es un desastre, aquí está tu salvavidas.",
    oldPrice: "$9.99",
    price: "$6.99",
    priceDescription: "Pago único. Sin suscripciones.",
    features: [
      "Ideas listas",
      "Publica fácil", 
      "Crece sin drama",
      "Versión Mini GRATIS",
    ],
    cta: "🚀 Probar Grilla Viralis Gratis",
    ctaClass: "primary",
    // Usar planes específicos de Grilla Viralis
    get plans() { return generateGrillaPlans(this); },
    // Usar garantía específica de Grilla Viralis
    get guarantee() { return generateGrillaViralisGuarantee(this); },
    faqs: [
      {
        question: "¿Es otra herramienta complicada que voy a abandonar en una semana?",
        answer: "No. Grilla está diseñada para personas ocupadas. Si sabes usar WhatsApp, ya sabes usar Grilla. Además, comienza con funciones básicas y crece contigo."
      },
      {
        question: "¿Qué pasa si pierdo todo mi trabajo?",
        answer: "Tu contenido vive en Notion, que tiene backup automático. Plus, puedes exportar todo en cualquier momento. Tus ideas están más seguras aquí que en notas del teléfono."
      },
      {
        question: "¿Funcionará para mi tipo de contenido específico?",
        answer: "Si creas contenido para redes sociales, blogs, YouTube, o cualquier plataforma digital, Grilla se adapta. No importa tu nicho - el sistema se moldea a tu flujo, no al revés."
      },
      {
        question: "¿Voy a depender de esto para siempre?",
        answer: "Al contrario. Grilla te enseña a organizar tu mente creativa. Incluso si dejas de usarla, habrás desarrollado hábitos de organización que te acompañarán siempre."
      }
    ],
    testimonials: [],
    mainFeatures: [
      {
        icon: "🧠",
        title: "¿Tienes miedo de quedarte sin ideas para el próximo mes?",
        description: "Adiós pánico del domingo por la noche. Pipeline infinito de contenido que fluye automáticamente.",
        bullets: [
          "Captura automática de ideas",
          "Sin pánico de domingo",
          "Flujo automático",
          "Contenido infinito"
        ]
      },
      {
        icon: "💬",
        title: "¿Cuántos compromisos tienes que no estás cumpliendo?",
        description: "Nunca más decepciones a clientes. Control total de cada compromiso: qué prometiste y qué falta.",
        bullets: [
          "Estado real de compromisos",
          "Seguimiento por cliente",
          "Sin olvidos",
          "Control total"
        ]
      },
      {
        icon: "🔄",
        title: "¿Siempre vas a depender de tu memoria para manejar todo?",
        description: "Construye un negocio que funciona sin ti. Tu conocimiento se vuelve sistema automático.",
        bullets: [
          "Documentación automática",
          "Procesos escalables",
          "Sin dependencias",
          "Sistema perfecto"
        ]
      },
      {
        icon: "📅",
        title: "¿Te vas a dormir sin saber si olvidaste algo importante?",
        description: "Duerme tranquilo. Ve instantáneamente qué necesita tu atención HOY y qué puede esperar.",
        bullets: [
          "Vista de control diario",
          "Sin ansiedad nocturna",
          "Prioridades claras",
          "Tranquilidad total"
        ]
      },
      {
        icon: "⚙️",
        title: "¿Cuántos pasos importantes se te han pasado en proyectos recurrentes?",
        description: "Nunca más olvides detalles cruciales. Proceso perfeccionado que se despliega automáticamente.",
        bullets: [
          "Proceso perfeccionado",
          "Sin detalles olvidados",
          "Despliegue automático",
          "Control de calidad"
        ]
      },
      {
        icon: "🔍",
        title: "¿Te pierdes en los detalles y olvidas la estrategia general?",
        description: "Ve tu contenido desde 30,000 pies hasta el detalle diario. Zoom estratégico, ejecución táctica.",
        bullets: [
          "Visión estratégica",
          "Zoom flexible",
          "Rumbo claro",
          "Ejecución táctica"
        ]
      }
    ],
    howItWorks: [
      "Centraliza tus ideas",
      "Planifica en tu grilla", 
      "Fragmenta y multiplica",
      "Ajusta con datos",
      "Mantén el control"
    ],
    howItWorksDescription: "Así es como conviertes ideas dispersas en contenido estratégico.",
    howItWorksDetails: [
      {
        step: "1",
        title: "Centraliza tus ideas",
        description: "Reúne todo en un solo lugar. Sin post-its, sin hojas sueltas, sin caos."
      },
      {
        step: "2", 
        title: "Planifica en tu grilla",
        description: "Organiza tu contenido en un calendario visual y entiende exactamente qué toca publicar y cuándo."
      },
      {
        step: "3",
        title: "Fragmenta y multiplica", 
        description: "Convierte una sola idea en múltiples piezas optimizadas para cada red. Publica más sin trabajar más."
      },
      {
        step: "4",
        title: "Ajusta con datos",
        description: "Mide resultados reales y afina tu estrategia con métricas que importan."
      },
      {
        step: "5",
        title: "Mantén el control",
        description: "Gestiona proyectos y clientes sin perderte en el desorden. Tu contenido siempre bajo control."
      }
    ],
    metodologia: [
      {
        title: "Es así de simple",
        columns: [
          {
            subtitle: "📌 Publica con propósito",
            text: "Enfócate en contenido que genera impacto. La grilla te ayuda a filtrar lo que suma y a descartar lo que solo llena espacio.",
            bullets: [
              "Prioriza lo importante",
              "Evita el ruido",
              "Crea con intención"
            ]
          },
          {
            subtitle: "♻️ Reutiliza sin miedo",
            text: "Convierte una sola idea en múltiples piezas de contenido sin esfuerzo extra. Haz más, sin quemarte.",
            bullets: [
              "Fragmenta en segundos",
              "Multiplica tu alcance",
              "Mantén la calidad"
            ]
          }
        ]
      }
    ],
  },
  {
    name: "Producto Ejemplo",
    slug: "producto-ejemplo",
    subtitle: "Descripción del producto",
    avatar: "🐼",
    avatarBg: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
    status: "Disponible",
    statusColor: "green",
    audience: "Para personas que buscan una solución específica.",
    oldPrice: "$19.99",
    price: "$12.99",
    features: [
      "Característica principal 1",
      "Característica principal 2",
      "Característica principal 3",
      "Versión Mini GRATIS",
    ],
    cta: "🚀 Probar Producto Ejemplo",
    ctaClass: "primary",
    // Usar criterios estandarizados
    get plans() { return generateStandardPlansWithCriteria(this); },
    get guarantee() { return generateStandardGuaranteeWithCriteria(this); },
    get mainFeatures() { return generateStandardMainFeaturesWithCriteria(this); },
    get metodologia() { return generateStandardMethodologyWithCriteria(this); },
    faqs: [
      { question: "¿Qué incluye este producto?", answer: "Incluye todas las funcionalidades principales y soporte completo." },
      { question: "¿Puedo probarlo gratis?", answer: "Sí, hay una versión gratuita disponible para que puedas probar antes de comprar." },
    ],
    testimonials: [
      { name: "Usuario E.", text: "Este producto cambió completamente mi forma de trabajar.", role: "Profesional", result: "50% más productividad" },
    ],
    howItWorks: [
      "Configura tu cuenta",
      "Personaliza tu experiencia",
      "Comienza a ver resultados",
    ],
  },
  {
    name: "OKRo",
    slug: "okro",
    subtitle: "Objetivos claros. Resultados reales.",
    avatar: "🐼",
    avatarBg: "linear-gradient(45deg, #1976d2, #64b5f6)",
    popularity: "popular",
    status: "Disponible",
    statusColor: "green",
    audience: "Dile adiós a los objetivos vagos y hola a un sistema que convierte tus OKRs en progreso medible.",
    oldPrice: "$99",
    price: "$29",
    priceDescription: "Pago único. Sin suscripciones.",
    features: [
      "✔ Prioriza con criterio",
      "✔ Mide lo que importa",
      "✔ Avanza sin perder foco"
    ],
    // Usar planes específicos de OKRo
    get plans() { return generateOKRoPlans(this); },
    get guarantee() { return generateStandardGuaranteeWithCriteria(this); },
    get mainFeatures() { return generateOKRoMainFeatures(this); },
    get metodologia() { return generateStandardMethodologyWithCriteria(this); },
    howItWorks: [
      "Define objetivos ambiciosos",
      "Establece resultados medibles",
      "Ejecuta y monitorea progreso"
    ],
    howItWorksDescription: "Así es como OKRo transforma objetivos ambiciosos en resultados concretos.",
    howItWorksDetails: [
      {
        step: "1",
        title: "Define objetivos ambiciosos",
        description: "Crea OKRs claros y medibles que desafíen a tu equipo y definan el rumbo estratégico de tu organización.",
        bullets: [
          "OKRs claros y medibles",
          "Desafíos para el equipo",
          "Rumbo estratégico definido",
          "Objetivos ambiciosos"
        ]
      },
      {
        step: "2",
        title: "Establece resultados medibles",
        description: "Define métricas específicas y fechas límite para cada resultado clave, asegurando la trazabilidad del progreso.",
        bullets: [
          "Métricas específicas",
          "Fechas límite claras",
          "Trazabilidad del progreso",
          "Resultados cuantificables"
        ]
      },
      {
        step: "3",
        title: "Ejecuta y monitorea progreso",
        description: "Vincula proyectos y tareas, ejecuta el plan y sigue el progreso en tiempo real con dashboards visuales.",
        bullets: [
          "Vinculación de proyectos",
          "Ejecución del plan",
          "Seguimiento en tiempo real",
          "Dashboards visuales"
        ]
      }
    ],

    testimonials: [
      {
        name: "Carlos M.",
        role: "Director Operaciones • 6 meses usando OKRo",
        text: "Redujimos las reuniones de follow-up 50% porque todos ven el progreso en tiempo real. Mi equipo ahora invierte ese tiempo en trabajo real, no en reportes.",
        result: "-50% reuniones de seguimiento, +12 horas productivas por semana"
      },
      {
        name: "Ana S.",
        role: "CEO Startup • 8 meses usando OKRo",
        text: "Mi equipo ahora entiende por qué priorizamos el feature X sobre Y. OKRo hace visible la conexión entre cada tarea y nuestros objetivos estratégicos.",
        result: "95% alineación equipo, decisiones 60% más rápidas"
      },
      {
        name: "Roberto L.",
        role: "VP Producto • 5 meses usando OKRo",
        text: "Ya no me sorprendo con objetivos incumplidos a último momento. OKRo me alerta cuando algo se desvía y tengo tiempo para corregir el rumbo.",
        result: "85% objetivos cumplidos vs. 40% anterior"
      },
      {
        name: "Laura P.",
        role: "Gerente Marketing • 4 meses usando OKRo",
        text: "Eliminé 3 herramientas de seguimiento y 2 horas semanales de preparación de reportes. OKRo centraliza todo sin complicaciones.",
        result: "-3 herramientas, -2 horas admin semanales, +30% claridad equipo"
      }
    ],



    faqs: [
      {
        question: "¿Qué es OKRo y para qué sirve?",
        answer: "OKRo es un sistema de gestión de OKRs (Objetivos y Resultados Clave) diseñado para equipos y freelancers. Te ayuda a definir objetivos ambiciosos, establecer resultados medibles y hacer seguimiento del progreso de forma visual e intuitiva."
      },
      {
        question: "¿Para quién está diseñado OKRo?",
        answer: "OKRo está diseñado para equipos de trabajo, freelancers, emprendedores y cualquier persona que quiera gestionar sus objetivos de forma estructurada. Es especialmente útil para startups, consultores y equipos remotos."
      },
      {
        question: "¿Qué hace diferente a OKRo de otras herramientas?",
        answer: "OKRo se destaca por su simplicidad y enfoque en la vinculación entre proyectos y OKRs. A diferencia de otras herramientas complejas, OKRo te permite conectar directamente tus tareas diarias con tus objetivos principales, con dashboards visuales claros."
      },
      {
        question: "¿Necesito experiencia en OKRs para usar OKRo?",
        answer: "No, OKRo está diseñado para ser intuitivo incluso si es tu primera vez trabajando con OKRs. Incluye plantillas predefinidas y guías que te ayudarán a crear OKRs efectivos desde el primer día."
      },

      {
        question: "¿Funciona para equipos remotos y híbridos?",
        answer: "Es ideal para equipos distribuidos. La mayor ventaja de equipos remotos es que NECESITAN visibilidad constante de objetivos y progreso. OKRo elimina la sensación de \"no sé en qué están trabajando\" y reduce reuniones de check-in innecesarias."
      },

      {
        question: "¿Cómo justifico la inversión a mi jefe?",
        answer: "$29 se paga solo eliminando 1 reunión innecesaria. Calcula: si ahorras 2 horas semanales de reuniones x tu salario por hora x 52 semanas. Probablemente estás hablando de miles de dólares en tiempo recuperado."
      },
      {
        question: "¿Funciona si mi equipo crece rápido?",
        answer: "Sí, de hecho es cuando más lo necesitas. OKRo escala de 1 persona a 100+ sin perder claridad. Nuevos miembros ven inmediatamente en qué trabajar y por qué importa, reduciendo tiempo de onboarding."
      },
      {
        question: "¿Cómo convenzo a mi equipo de usar otra herramienta más?",
        answer: "Es la preocupación #1 de todos los líderes. La diferencia es que OKRo elimina trabajo (reportes, reuniones repetitivas) en lugar de añadirlo. Funciona en Notion que probablemente ya usan. Empieza tú solo - cuando vean la claridad, van a querer acceso."
      }
    ],
    ctaFinal: {
      title: "¿Cuánto tiempo más vas a postergar tus objetivos importantes?",
      description: "Cada día que pasa sin estructura es un día más lejos de donde quieres estar. OKRo te da la claridad y el enfoque que necesitas para empezar HOY.",
      primary: "🎯 Comprar OKRo PRO",
      secondary: "📞 Agendar consulta gratuita"
    },
    cta: "🚀 Probar OKRo Gratis",
    ctaClass: "primary",
  },
  {
    name: "Lee Der",
    slug: "navio-360",
    subtitle: "Tu tablero de mando para equipos.",
    avatar: "🐺",
    avatarBg: "linear-gradient(45deg, #607d8b, #00bcd4)",
    status: "En desarrollo",
    statusColor: "purple",
    badge: "Liderazgo",
    audience: "Tareas claras, progreso visible y equipos que avanzan.",
    oldPrice: null,
    price: "Próximamente",
    features: [
      "✔ Visibilidad total",
      "✔ Líderes sin micromanagement",
      "✔ Resultados medibles"
    ],
    cta: "🔔 Únirme a la lista VIP",
    ctaClass: "tertiary",
    ctaFinal: {
      title: "¿Listo para que tu equipo navegue sin caos?",
      description: "Coordina tareas, visualiza el progreso y lidera con claridad.<br /><span class=\"text-cyan-300 font-semibold\">Tu equipo lo agradecerá.</span>",
      primary: "🚀 Únirme a la lista VIP",
      secondary: "🎬 Ver demo"
    },
    faqs: [
      { 
        question: "¿Qué es exactamente Lee Der y cómo ayuda a mi equipo?", 
        answer: "Lee Der es un sistema de gestión diseñado para equipos que quieren dejar de apagar incendios y empezar a navegar con claridad. Cada miembro tiene su propio espacio de trabajo, mientras los líderes pueden ver el panorama completo sin perder de vista los detalles. Resultado: menos caos, más visibilidad y un flujo de trabajo donde todos saben exactamente qué hacer." 
      },
      { 
        question: "¿En qué se diferencia Lee Der de otros gestores de proyectos?", 
        answer: "A diferencia de los gestores tradicionales, Lee Der no solo organiza tareas: estructura equipos. Vista individual para cada miembro, panel de control para líderes con métricas reales, y herramientas simples para colaborar sin fricción. En otras palabras, Lee Der no te abruma con funciones que no usarás: te da justo lo que tu equipo necesita para moverse más rápido." 
      },
      { 
        question: "¿Lee Der permite ver métricas de productividad de cada miembro del equipo?", 
        answer: "Sí. Lee Der muestra métricas claras sobre tareas completadas, pendientes y bloqueadas. Esto ayuda a los líderes a identificar cuellos de botella y a los miembros del equipo a priorizar sin necesidad de reuniones interminables." 
      },
      { 
        question: "¿Se pueden personalizar los tableros y las vistas de los proyectos?", 
        answer: "Totalmente. Puedes crear vistas personalizadas para enfocarte solo en lo que importa: calendario, tablero kanban, lista detallada o dashboards específicos para cada rol del equipo." 
      },
      { 
        question: "¿Lee Der guarda un historial de cambios en los proyectos?", 
        answer: "Sí. Cada cambio queda registrado para que nunca pierdas el rastro de lo que pasó, quién lo hizo y cuándo. Perfecto para equipos que necesitan claridad y responsabilidad compartida." 
      },
      { 
        question: "¿Puedo asignar tareas a varios miembros al mismo tiempo?", 
        answer: "En Lee Der, cada tarea tiene un único responsable. Esto evita que las cosas se pierdan entre varios y asegura que alguien lleve la tarea hasta el final. ¿Necesitas que dos o más personas trabajen en algo? Puedes: 1) Fragmentar la tarea en subtareas, cada una con su responsable. 2) Convertirla en proyecto, si requiere coordinación entre varias cabezas. 3) Usar automatizaciones para crear varias tareas a la vez y asignarlas a diferentes miembros en un solo clic, ideal para proyectos recurrentes con roles predefinidos. Así, en lugar de diluir la responsabilidad, Lee Der la hace clara y fácil de gestionar." 
      },
    ],
    testimonials: [
      {
        name: 'Laura P.',
        text: 'Antes de Lee Der, las tareas se quedaban flotando entre varias personas y nadie sabía quién debía terminarlas. Ahora todo tiene un dueño claro, y nuestros proyectos avanzan sin reuniones eternas. Es como pasar del caos a un tablero de control real.',
        role: 'Project Manager en una startup SaaS',
        result: 'Proyectos sin reuniones eternas'
      },
      {
        name: 'Carlos R.',
        text: 'Lo que más nos sorprendió de Lee Der fue lo simple que es. Nada de funciones que nadie usa. Solo lo esencial: tareas claras, métricas útiles y automatizaciones que nos ahorran horas. Finalmente tenemos un sistema que el equipo realmente quiere usar.',
        role: 'Líder de Marketing en una agencia digital',
        result: 'Sistema que el equipo quiere usar'
      }
    ],
    mainFeatures: [
      {
        icon: "👀",
        title: "¿Pierdes visibilidad de lo que hace tu equipo?",
        description: "Deja de depender de reportes atrasados. Lee Der te muestra en tiempo real qué está pasando, sin necesidad de perseguir a nadie.",
        bullets: [
          "Paneles claros para managers",
          "Seguimiento individual y por equipo",
          "Resultados visibles sin pedir informes"
        ]
      },
      {
        icon: "🌀",
        title: "¿Sientes que tu equipo trabaja en silos?",
        description: "Adiós a las tareas perdidas entre mensajes y hojas dispersas. Lee Der conecta a todos en un solo espacio.",
        bullets: [
          "Espacios individuales para cada miembro",
          "Proyectos compartidos y siempre sincronizados",
          "Comunicación y contexto centralizados"
        ]
      },
      {
        icon: "⏳",
        title: "¿Tardas demasiado en detectar bloqueos?",
        description: "Detecta cuellos de botella antes de que se vuelvan problemas. Con Lee Der, las alertas llegan a tiempo para actuar.",
        bullets: [
          "Alertas automáticas por tareas retrasadas",
          "Visualización de cargas de trabajo",
          "Historial de avances para tomar decisiones rápidas"
        ]
      },
      {
        icon: "🎯",
        title: "¿Los objetivos del equipo se diluyen?",
        description: "Convierte grandes metas en acciones claras y medibles. Lee Der te ayuda a mantener a todos alineados.",
        bullets: [
          "Objetivos conectados a tareas reales",
          "Métricas de progreso por miembro y por proyecto",
          "Enfoque simple y sin reuniones innecesarias"
        ]
      },
      {
        icon: "🔄",
        title: "¿La coordinación consume más tiempo que el trabajo real?",
        description: "Lee Der automatiza lo repetitivo para que tu equipo solo se concentre en avanzar.",
        bullets: [
          "Plantillas para tareas recurrentes",
          "Actualizaciones de estado con un clic",
          "Menos gestión, más ejecución"
        ]
      },
      {
        icon: "📊",
        title: "¿Te cuesta demostrar resultados al jefe o al cliente?",
        description: "Lee Der traduce el trabajo del equipo en datos claros que cualquiera entiende.",
        bullets: [
          "Reportes automáticos y visuales",
          "Métricas comparativas por período",
          "Transparencia sin esfuerzo"
        ]
      }
    ],
    howItWorks: [
      "Centraliza tareas",
      "Coordina fácil",
      "Conecta proyectos",
      "Analiza y mejora"
    ],
    howItWorksDetails: [
      {
        step: "1",
        title: "Centraliza tareas",
        description: "Cada miembro organiza su trabajo en su propio espacio conectado al equipo.",
        bullets: [
          "Espacios individuales para cada miembro",
          "Conexión automática con el equipo",
          "Organización personalizada sin perder contexto"
        ]
      },
      {
        step: "2",
        title: "Coordina fácil",
        description: "Los líderes ven el progreso en tiempo real sin reuniones innecesarias.",
        bullets: [
          "Vista en tiempo real del progreso",
          "Alertas automáticas de bloqueos",
          "Comunicación eficiente sin micromanagement"
        ]
      },
      {
        step: "3",
        title: "Conecta proyectos",
        description: "Relaciona tareas con objetivos para que nadie pierda el hilo.",
        bullets: [
          "Vinculación directa tareas-objetivos",
          "Contexto claro para cada tarea",
          "Visibilidad del impacto del trabajo"
        ]
      },
      {
        step: "4",
        title: "Analiza y mejora",
        description: "Usa vistas estratégicas para optimizar procesos y productividad.",
        bullets: [
          "Métricas de rendimiento por equipo",
          "Identificación de cuellos de botella",
          "Optimización continua de procesos"
        ]
      }
    ],
    howItWorksDescription: "Así es como Lee Der mantiene a tu equipo organizado y en curso.",
    metodologia: [
      {
        title: "Es así de simple",
        columns: [
          {
            icon: "⚓",
            title: "Colaboración sin fricción",
            description: "Sin micromanagement: claridad para líderes, autonomía para el equipo.",
            bullets: [
              "Todo en un solo lugar: tareas, proyectos y avances centralizados",
              "Seguimiento visual claro y sencillo"
            ]
          },
          {
            icon: "🧭",
            title: "Optimización constante",
            description: "Reportes útiles para mejorar procesos.",
            bullets: [
              "Ajuste rápido de prioridades",
              "Datos que ayudan a escalar resultados"
            ]
          }
        ]
      }
    ]
  },
];

function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}

export default function ProductoPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  
  console.log('ProductoPage - params:', params);
  console.log('ProductoPage - slug:', slug);
  
  const product = getProductBySlug(slug || "");

  console.log('ProductoPage - product:', product);

  // Los hooks deben ir ANTES de cualquier condición
  const [activeTab, setActiveTab] = useState('features');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [hasTrackedPricingView, setHasTrackedPricingView] = useState(false);
  const [hasTrackedFormView, setHasTrackedFormView] = useState(false);
  // const [isVipModalOpen, setIsVipModalOpen] = useState(false); // Deshabilitado temporalmente
  const [isMiniModalOpen, setIsMiniModalOpen] = useState(false);

  // Estado para los artículos relacionados
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // Ref para el formulario incrustado
  const formRef = useRef<HTMLDivElement>(null);

  // Función para abrir modal MINI
  const openMiniModal = () => {
    try { trackEvent({ action: 'click_mini_form', category: 'Producto', label: product?.name || 'unknown' }); } catch {}
    setIsMiniModalOpen(true);
  };

  // Función para abrir modal VIP - Deshabilitada temporalmente
  // const openVipModal = () => {
  //   try { trackEvent({ action: 'click_vip_list', category: 'Producto', label: product?.name || 'unknown' }); } catch {}
  //   setIsVipModalOpen(true);
  // };

  // Función para hacer scroll al formulario VIP incrustado
  const openVipModal = () => {
    try { trackEvent({ action: 'click_vip_list', category: 'Producto', label: product?.name || 'unknown' }); } catch {}
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Función para scroll a la sección de pricing
  const scrollToPricing = () => {
    try { trackEvent({ action: 'click_cta_pricing', category: 'Producto', label: product?.name || 'unknown' }); } catch {}
    const pricingSection = document.querySelector('[data-section="pricing"]');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Función para ir a la pestaña "Cómo funciona"
  const goToHowItWorks = () => {
    try { trackEvent({ action: 'click_demo_live', category: 'Producto', label: product?.name || 'unknown' }); } catch {}
    setActiveTab('how-it-works');
    // Hacer scroll a la sección de tabs después de un pequeño delay para que el cambio de tab se procese
    setTimeout(() => {
      const tabsSection = document.querySelector('[data-section="tabs"]');
      if (tabsSection) {
        tabsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  if (!product) {
    console.log('ProductoPage - Product not found, returning error page');
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
          <p className="text-gray-400 mb-8">El producto &quot;{slug}&quot; no existe.</p>
          {/* Espaciado reservado */}
        </div>
      </div>
    );
  }

  // Colores dinámicos
  const mainGradient = product.avatarBg;
  const mainColor = product.avatarBg.match(/#([0-9a-fA-F]{6})/g)?.[0] || '#4caf50';

  // Cargar artículos relacionados
  React.useEffect(() => {
    setLoadingArticles(true);
    
    // Fetch articles from API route instead of direct Sanity query
    fetch('/api/articles')
      .then(response => response.json())
      .then(data => {
        if (data.success && data.articles) {
          // Filter articles related to this product
          const related = data.articles.filter((article: any) => 
            article.relatedProduct && article.relatedProduct.slug === slug
          ).slice(0, 6);
          setRelatedArticles(related);
        } else {
          setRelatedArticles([]);
        }
        setLoadingArticles(false);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setRelatedArticles([]);
        setLoadingArticles(false);
      });
  }, [slug]);

  // Función para obtener clases de color de categoría
  function getCategoryColorClasses(category: string) {
    switch (category) {
      case "Economía y finanzas":
        return {
          gradient: "from-blue-500 to-cyan-500",
          text: "text-blue-400",
        };
      case "Desarrollo personal":
        return {
          gradient: "from-green-500 to-emerald-500",
          text: "text-green-400",
        };
      case "Proyectos y productos":
        return {
          gradient: "from-yellow-500 to-orange-500",
          text: "text-yellow-400",
        };
      case "Inteligencia artificial":
        return {
          gradient: "from-purple-500 to-blue-500",
          text: "text-purple-400",
        };
      case "Marketing y empresa":
        return {
          gradient: "from-pink-500 to-rose-500",
          text: "text-pink-400",
        };
      case "Productividad":
        return {
          gradient: "from-purple-500 to-pink-600",
          text: "text-purple-400",
        };
      case "Management":
        return {
          gradient: "from-indigo-500 to-purple-500",
          text: "text-indigo-400",
        };
      case "Hábitos":
        return {
          gradient: "from-green-500 to-teal-500",
          text: "text-green-400",
        };
      default:
        return {
          gradient: "from-gray-500 to-gray-600",
          text: "text-gray-400",
        };
    }
  }

  function calculateReadingTime(body: any): number {
    if (!Array.isArray(body)) return 1;
    const words = body.reduce((total: number, block: any) => {
      if (block._type === "block" && block.children) {
        return total + block.children.reduce((blockTotal: number, child: any) => {
          return blockTotal + (child.text || "").split(/\s+/).length;
        }, 0);
      }
      return total;
    }, 0);
    return Math.max(1, Math.ceil(words / 200));
  }

  function getReadingContext(minutes: number) {
    if (minutes <= 2) return { icon: '⚡', color: 'text-green-400', label: 'Tip rápido' };
    if (minutes <= 5) return { icon: '⏱️', color: 'text-blue-400', label: 'Lectura corta' };
    if (minutes <= 10) return { icon: '📖', color: 'text-purple-400', label: 'Lectura media' };
    return { icon: '🔥', color: 'text-pink-400', label: 'Lectura larga' };
  }

  console.log('ProductoPage - Rendering component for product:', product.name);

  return (
    <div className="font-sans bg-black text-gray-300 min-h-screen">
      {/* Header Glass - Simplificado para páginas de productos */}
      <HeaderGlass 
        pageTitle="🪄 Hocuz Focuz"
        showGhostLogo={false}
        customLinks={[]}
        ctaButton={{
          text: "🐨 Agentes IA",
          onClick: () => {
            window.location.href = '/productos';
          }
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-20 px-4 sm:px-6" style={{ background: `linear-gradient(to bottom right, ${mainColor}15, ${mainColor}05, ${mainColor}15)` }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              {/* Badges ocultos temporalmente */}
              {false && product.popularity === "popular" && (
                <div className="rounded-lg p-4 mb-6 inline-block" style={{ backgroundColor: mainColor + '20', border: '1px solid ' + mainColor + '30' }}>
                  <p className="text-sm font-semibold" style={{ color: mainColor }}>{getProductBadgeText(product)}</p>
                </div>
              )}
              {false && product.popularity === "beta" && (
                <div className="bg-pink-500/20 border border-pink-500/30 rounded-lg p-4 mb-6 inline-block">
                  <p className="text-pink-300 text-sm font-semibold">BETA</p>
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                <span className="bg-clip-text text-transparent" style={{ background: mainGradient, WebkitBackgroundClip: 'text' }}>
                  {product.name}
                </span>
                <br />
                <span className="text-white">{product.subtitle}</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {product.audience}
              </p>
              <div className="flex flex-wrap gap-6 text-sm mb-8">
                {(product.features || []).slice(0, 3).map((f: string, i: number) => (
                  <div className="flex items-center" key={i}>
                    {f.includes('✔') ? (
                      <span className="text-gray-300">
                        <span style={{ color: mainColor }}>✔</span>
                        {f.replace('✔', '')}
                      </span>
                    ) : (
                      <>
                        <span className="mr-2" style={{ color: mainColor }}>✓</span>
                        <span className="text-gray-300">{f}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button 
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:scale-105 transform transition-all duration-300 touch-manipulation"
                  style={{ background: mainGradient, color: '#fff' }}
                  onClick={scrollToPricing}
                >
                  {product.cta}
                </button>
                
                <button 
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-full font-semibold transition-all duration-300 group relative overflow-hidden touch-manipulation"
                  style={{ borderColor: mainColor, color: mainColor }}
                  onClick={goToHowItWorks}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    🎬 Ver demo
                  </span>
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: mainGradient }}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br rounded-2xl transform rotate-6 animate-pulse" style={{ background: mainGradient, opacity: 0.3 }}></div>
                <div className="relative bg-gradient-to-br rounded-2xl p-4 sm:p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500" style={{ background: mainGradient, minWidth: 'clamp(280px, 50vw, 480px)', maxWidth: 'clamp(320px, 60vw, 520px)' }}>
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                        <img 
                          src={getPetImageName(product.name)}
                          alt={`${product.name} mascota`}
                          className="object-contain"
                          style={{
                            width: 'clamp(200px, 40vw, 480px)',
                            height: 'clamp(200px, 40vw, 480px)',
                            maxWidth: 'none',
                            maxHeight: 'none',
                            aspectRatio: '1 / 1'
                          }}
                          loading="eager"
                          onError={(e) => {
                            // Fallback al emoji si la imagen no carga
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'text-[30rem] mb-4';
                            fallback.textContent = product.emoji;
                            target.parentNode?.insertBefore(fallback, target);
                          }}
                        />
                    </div>
                    <div className="text-white font-bold text-2xl mb-2">{product.name}</div>
                    {/* Precio oculto - Comentado para no mostrar */}
                    {/* {product.price === "Próximamente" ? (
                      <div className="mt-6 text-3xl font-extrabold text-white">Próximamente</div>
                    ) : (
                      <>
                        <div className="mt-4 text-3xl font-bold text-white">{product.price}</div>
                        {product.priceDescription && <div className="text-white/70 text-xs italic mt-1">{product.priceDescription}</div>}
                      </>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 bg-gray-900/30 border-b border-gray-800" data-section="tabs">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            <button 
              onClick={() => {
                try { trackEvent({ action: 'click_tab', category: 'Producto', label: `${product?.name || 'unknown'}_features` }); } catch {}
                setActiveTab('features');
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 touch-manipulation ${
                activeTab === 'features' 
                  ? ''
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={activeTab === 'features' ? { background: mainGradient, color: '#fff' } : {}}
            >
              ¿Es para mí?
            </button>
            <button 
              onClick={() => {
                try { trackEvent({ action: 'click_tab', category: 'Producto', label: `${product?.name || 'unknown'}_how-it-works` }); } catch {}
                setActiveTab('how-it-works');
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 touch-manipulation ${
                activeTab === 'how-it-works' 
                  ? ''
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={activeTab === 'how-it-works' ? { background: mainGradient, color: '#fff' } : {}}
            >
              Cómo funciona
            </button>
            <button 
              onClick={() => {
                try { trackEvent({ action: 'click_tab', category: 'Producto', label: `${product?.name || 'unknown'}_testimonials` }); } catch {}
                setActiveTab('testimonials');
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 touch-manipulation ${
                activeTab === 'testimonials' 
                  ? ''
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={activeTab === 'testimonials' ? { background: mainGradient, color: '#fff' } : {}}
            >
              Testimonios
            </button>
            <button 
              onClick={() => {
                try { trackEvent({ action: 'click_tab', category: 'Producto', label: `${product?.name || 'unknown'}_faq` }); } catch {}
                setActiveTab('faq');
              }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 touch-manipulation ${
                activeTab === 'faq' 
                  ? ''
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={activeTab === 'faq' ? { background: mainGradient, color: '#fff' } : {}}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Features Tab */}
          {activeTab === 'features' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 text-white">Características principales</h2>
                  {product.slug === 'jaime-daily' ? (
                    <p className="text-xl text-gray-400">Si esto te suena familiar, Jaime Daily es para ti.</p>
                  ) : (
                  <p className="text-xl text-gray-400">Todo lo que {product.name} puede hacer por ti</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.mainFeatures ? (
                    product.mainFeatures.map((feature, i) => (
                      <div key={i} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 transition-all duration-300" style={{ '--tw-border-opacity': '1' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.borderColor = mainColor + '4D'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}>
                                          <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">
                    {feature.description}
                    </p>
                    <ul className="text-gray-300 space-y-2 text-sm">
                    {feature.bullets.map((bullet, j) => (
                      <li key={j}>
                        <span style={{ color: mainColor }}>•</span> <span className="text-white">{bullet}</span>
                      </li>
                        ))}
                      </ul>
                    </div>
                    ))
                  ) : (
                    product.features.map((f, i) => (
                      <div key={i} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 transition-all duration-300" style={{ '--tw-border-opacity': '1' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.borderColor = mainColor + '4D'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}>
                      <div className="text-4xl mb-4">{product.avatar}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{f}</h3>
                      <p className="text-gray-400 mb-4">{product.subtitle}</p>
                    </div>
                    ))
                  )}
                </div>
                
                {/* Botón "Cómo funciona" */}
                <div className="text-center mt-12">
                  <button 
                    className="px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 group relative overflow-hidden"
                    style={{ borderColor: mainColor, color: mainColor }}
                    onClick={() => {
                      setActiveTab('how-it-works');
                      setTimeout(() => {
                        const tabsSection = document.querySelector('[data-section="tabs"]');
                        if (tabsSection) {
                          tabsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      📖 Cómo funciona
                    </span>
                    <span
                      className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300 rounded-full"
                      style={{ background: mainGradient }}
                    ></span>
                  </button>
                </div>
              </div>
          )}

          {/* How it works Tab */}
          {activeTab === 'how-it-works' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 text-white">Cómo funciona {product.name}</h2>
                {product.howItWorksDescription ? (
                  <p className="text-xl text-gray-400">{product.howItWorksDescription}</p>
                ) : (
                  <p className="text-xl text-gray-400">Metodología simplificada en 3 pasos</p>
                )}
                </div>
              
              {/* Pasos principales */}
              <div className={`grid grid-cols-1 gap-8 mb-12 ${
                product.howItWorksDetails?.length === 3 || product.howItWorks?.length === 3 
                  ? 'md:grid-cols-3' 
                  : product.howItWorksDetails?.length === 4 || product.howItWorks?.length === 4 
                  ? 'md:grid-cols-2 lg:grid-cols-4' 
                  : product.howItWorksDetails?.length === 5 || product.howItWorks?.length === 5 
                  ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' 
                  : 'md:grid-cols-3'
              }`}>
                {renderHowItWorksSteps(product, mainGradient)}
                    </div>

              {/* Sección de reglas */}
              {product.metodologia && product.metodologia.map((metodologia, i) => (
                <div key={i} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 mt-12">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">{metodologia.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {metodologia.columns.map((column, j) => (
                      <div key={j}>
                        <div className="flex items-center mb-3">
                          {column.icon && <span className="text-2xl mr-3">{column.icon}</span>}
                          <h4 className="text-lg font-semibold" style={{ color: mainColor }}>
                            {column.title || column.subtitle}
                          </h4>
                        </div>
                        <p className="text-gray-300 mb-4">
                          {column.description || column.text}
                        </p>
                        <ul className="text-gray-400 text-sm space-y-2">
                          {column.bullets.map((bullet, k) => (
                            <li key={k}><span style={{ color: mainColor }}>•</span> <span className="text-white">{bullet}</span></li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    </div>
                  </div>
              ))}
                </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold mb-4 text-white">Lo que dicen nuestros usuarios</h2>
                <p className="text-xl text-gray-400">Equipos reales que transformaron su productividad</p>
                </div>
              {product.testimonials?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                      {product.testimonials.map((t, i) => (
                      <div key={i} className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 transition-all duration-300" style={{ '--tw-border-opacity': '1' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.borderColor = mainColor + '4D'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}>
                    <div className="flex items-center mb-5">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-4"
                        style={{ background: mainGradient }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-lg">{t.name}</div>
                        <div className="text-gray-400 text-sm">{t.role}</div>
                        <StarRating rating={5} size="sm" className="mt-1" />
                      </div>
                    </div>
                    <div className="italic text-gray-200 mb-4 opacity-90">"{t.text}"</div>
                    <div className="font-semibold text-green-400 text-sm">Resultado: {t.result}</div>
                    </div>
                  ))}
              </div>
            ) : (
                <div className="text-center text-gray-400">Aún no hay testimonios para este producto.</div>
              )}
                              </div>
          )}

                    {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="py-8">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes sobre {product.name}</h2>
                <p className="text-xl text-gray-400">Resuelve tus dudas sobre {product.name}</p>
              </div>
              {product.faqs?.length ? (
                <div className="max-w-3xl mx-auto mt-10 space-y-4">
                  {product.faqs.map((faq, idx) => (
                    <div key={idx}>
                      <button
                        className="w-full text-left bg-gray-800 rounded-xl p-6 transition-all duration-300 border focus:outline-none"
                        style={{ 
                          borderColor: 'transparent',
                          '--tw-border-opacity': '1'
                        } as React.CSSProperties}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = mainColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'transparent';
                        }}

                        onClick={() => {
                          try { trackEvent({ action: 'click_faq', category: 'Producto', label: `${product?.name || 'unknown'}_faq_${idx}` }); } catch {}
                          setOpenFAQ(openFAQ === idx ? null : idx);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                          <span className={`text-2xl transform transition-transform duration-300 ${openFAQ === idx ? 'rotate-45' : ''}`} style={{ color: openFAQ === idx ? mainColor : '#64748b' }}>+</span>
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}> 
                        <div className="bg-gray-700/50 rounded-b-xl p-6 border-l-4 mx-4 text-left" style={{ borderColor: openFAQ === idx ? mainColor : 'transparent' }}>
                          <p className="text-gray-300 text-left">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400">Aún no hay preguntas frecuentes para este producto.</div>
              )}
            </div>
          )}
                </div>
      </section>

      {/* Pricing Section o VIP Form */}
      {product.ctaClass === 'tertiary' ? (
        // Formulario VIP Multi-Paso para productos en lista de espera
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900/30 to-gray-800/20 relative overflow-hidden" data-section="pricing">
          {/* Efectos de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Encabezado estilizado */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="text-6xl mb-4">{product.emoji}</div>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <h2 ref={formRef} className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Únete a la Lista</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  VIP
                </span>
              </h2>
              <p className="text-2xl md:text-3xl text-cyan-400 mb-4 font-medium">
                {product.name}
              </p>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Sé el primero en acceder a este producto cuando esté disponible. Recibe notificaciones exclusivas y acceso prioritario.
              </p>
            </div>
            
            {/* Formulario centrado */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <MultiStepForm
                  productName={product.name}
                  productSlug={slug}
                  productType="vip"
                  source={`product-${slug}`}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Sección de Pricing normal para productos disponibles
        <section className="py-20 px-6 bg-gray-900/20" data-section="pricing">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Planes y precios</h2>
              <p className="text-xl text-gray-400">Elige el plan que mejor se adapte a tus necesidades</p>
            </div>
          {product.plans ? (
            <div className={`grid grid-cols-1 gap-8 mx-auto ${
              product.plans.length === 1
                ? 'max-w-md'
                : product.plans.length === 2 
                ? 'md:grid-cols-2 max-w-4xl' 
                : 'md:grid-cols-3 max-w-6xl'
            }`}>
              {product.plans.map((plan, i) => (
                <div key={i} className={`bg-gray-800 rounded-xl p-8 shadow-xl border-0 transition-all duration-300 transform relative flex flex-col h-full hover:scale-105 hover:border-2 ${
                  plan.badge === 'RECOMENDADO' || plan.badge === 'RECOMENDADA' || plan.badge === 'MÁS POPULAR'
                    ? 'shadow-2xl hover:scale-105 hover:ring-2' 
                    : ''
                }`} style={{ 
                  '--hover-border-color': mainColor,
                  '--ring-color': mainColor + '50'
                } as React.CSSProperties} onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = mainColor + '80';
                  if (plan.badge === 'RECOMENDADO' || plan.badge === 'RECOMENDADA' || plan.badge === 'MÁS POPULAR') {
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${mainColor}50`;
                  }
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '';
                }}>
                  {plan.badge && (
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold text-white ${
                      plan.badge === 'GRATIS' 
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600' 
                        : plan.badge === 'RECOMENDADO' || plan.badge === 'RECOMENDADA' || plan.badge === 'MÁS POPULAR' || plan.badge === 'PRÓXIMAMENTE'
                        ? ''
                        : 'bg-gradient-to-r from-pink-500 to-purple-600'
                    }`} style={
                      plan.badge === 'RECOMENDADO' || plan.badge === 'RECOMENDADA' || plan.badge === 'MÁS POPULAR' || plan.badge === 'PRÓXIMAMENTE'
                        ? { background: (plan as any).badgeGradient || mainGradient } 
                        : plan.badge === 'PROMO'
                        ? { background: (plan as any).badgeGradient || 'linear-gradient(to right, #ec4899, #8b5cf6)' }
                        : {}
                    }>
                      {plan.badge}
                      </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-3 mt-4">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold" style={{ color: mainColor }}>{plan.price}</span>
                      {plan.oldPrice && <span className="text-sm text-gray-400 line-through">{plan.oldPrice}</span>}
                    </div>
                    {plan.extraNote && (
                      <div className="text-sm font-semibold" style={{ color: mainColor }}>{plan.extraNote}</div>
                    )}
                  </div>
                  <div className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center text-sm text-gray-300">
                        <span className={`mr-2 ${feature.included ? '' : 'text-gray-500'}`} style={{ color: feature.included ? mainColor : undefined }}>
                          {feature.included ? '✓' : '✗'}
                        </span>
                        {feature.text}
                      </div>
                    ))}
                      </div>
                  <div className="mt-auto pt-2">
                    <button className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                      plan.badge === 'GRATIS' 
                        ? 'border-2 hover:text-white' 
                        : plan.badge === 'PROMO'
                        ? 'text-white hover:scale-105 transition-transform duration-300'
                        : (plan as any).comingSoon
                        ? 'text-white cursor-not-allowed opacity-60'
                        : 'text-white hover:scale-105 transition-transform duration-300'
                    }`} style={plan.badge === 'GRATIS' ? { 
                      borderColor: (plan as any).buttonColor || mainColor, 
                      color: (plan as any).buttonColor || mainColor,
                      backgroundColor: 'transparent'
                    } : plan.badge === 'PROMO' ? { 
                      background: (plan as any).buttonGradient || 'linear-gradient(to right, #ec4899, #8b5cf6)' 
                    } : (plan as any).comingSoon ? {
                      background: (plan as any).buttonGradient || mainGradient
                    } : { 
                      background: (plan as any).buttonGradient || mainGradient 
                    }} onMouseEnter={(e) => {
                      if (plan.badge === 'GRATIS') {
                        e.currentTarget.style.backgroundColor = (plan as any).buttonColor || mainColor;
                        e.currentTarget.style.color = 'white';
                      } else if ((plan as any).comingSoon) {
                        e.currentTarget.style.opacity = '0.7';
                      }
                    }} onMouseLeave={(e) => {
                      if (plan.badge === 'GRATIS') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = (plan as any).buttonColor || mainColor;
                      } else if ((plan as any).comingSoon) {
                        e.currentTarget.style.opacity = '0.6';
                      }
                    }} onClick={(e) => {
                      if ((plan as any).comingSoon) {
                        e.preventDefault();
                        return;
                      }
                      if (plan.badge === 'GRATIS') {
                        // Para botones GRATIS, abrir modal MINI
                        openMiniModal();
                      } else {
                        // Para otros botones, usar la funcionalidad existente
                        scrollToPricing();
                      }
                    }}>
                      {plan.cta}
                    </button>
                      </div>
                    </div>
              ))}
              </div>
            ) : (
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 transition-all duration-300 transform hover:scale-105 max-w-md w-full" style={{ '--hover-border-color': mainColor } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.borderColor = mainColor + '80'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#374151'}>
                <div className="text-3xl font-bold mb-2" style={{ color: mainColor }}>{product.price}</div>
                {product.oldPrice && <div className="text-sm text-gray-400 line-through mb-2">{product.oldPrice}</div>}
                <div className="mb-4 text-gray-300">Incluye acceso a todas las funciones principales.</div>
                <button 
                  className="w-full py-3 rounded-lg font-bold text-white hover:scale-105 transition-transform duration-300" 
                  style={{ background: mainGradient }}
                  onClick={product.ctaClass === 'tertiary' ? openVipModal : scrollToPricing}
                >
                  {product.cta}
                </button>
                          </div>
                        </div>
                )}
          {(product as any).plansNote && (
            <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/30 text-center mt-8">
              <p className="text-gray-400 text-sm italic">
                {(product as any).plansNote}
              </p>
              </div>
          )}
          
          {/* Guarantee Section */}
          {product.guarantee && (
            <div className="mt-16 bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 text-center" style={{ 
              borderColor: (product.guarantee.borderColor || mainColor) + '30' 
            }}>
              <h3 className="text-2xl font-bold text-white mb-4">{product.guarantee.title}</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">{product.guarantee.description}</p>
              <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 md:gap-6">
                {product.guarantee.features.map((feature: any, index: any) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="mr-2" style={{ color: product.guarantee.checkmarkColor || mainColor }}>✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: mainGradient }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight">
            {product.ctaFinal ? product.ctaFinal.title : `¿Listo para empezar con ${product.name}?`}
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            {product.ctaFinal ? (
              <span dangerouslySetInnerHTML={{ __html: product.ctaFinal.description }} />
            ) : (
              `Únete a miles de usuarios que ya están transformando su vida con ${product.name}.`
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button 
              className="px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300" 
              style={{ background: mainGradient, color: '#fff' }}
              onClick={product.ctaClass === 'tertiary' ? openVipModal : scrollToPricing}
            >
              {product.ctaFinal ? product.ctaFinal.primary : product.cta}
            </button>
            <button 
              className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white hover:text-black transition-all duration-300"
              onClick={goToHowItWorks}
            >
              🎬 Ver demo
            </button>
          </div>
        </div>
      </section>



      {/* Artículos Relacionados */}
      <ProductRelatedArticles productSlug={slug || ""} productColor={mainColor} />

      {/* Espaciado adicional */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Espacio reservado para mantener el espaciado original */}
        </div>
      </section>

      {/* Banner sticky inferior con packs del producto */}
      <PackStickyBannerInferior packs={getPacksForProduct(product?.name || '')} />

      {/* Modal para formulario MINI */}
      <MiniFormModal
        isOpen={isMiniModalOpen}
        onClose={() => setIsMiniModalOpen(false)}
        productName={product?.name || 'Producto'}
        productSlug={slug}
      />

    </div>
  );
}