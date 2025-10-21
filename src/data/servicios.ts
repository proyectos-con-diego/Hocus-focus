export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  badge: string;
  badgeColor: string;
  icon: string;
  title: string;
  targetAudience: string;
  description: string;
  originalPrice: string;
  currentPrice: string;
  features: string[];
  buttonColor: string;
  buttonText: string;
  url: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  service: string;
  avatar: string;
  avatarColor: string;
  quote: string;
  result: string;
}

export interface CaseStudySection {
  problem: {
    title: string;
    description: string;
    items: string[];
  };
  solution: {
    title: string;
    description: string;
    items: string[];
  };
  implementation: {
    title: string;
    items: string[];
  };
  results: {
    title: string;
    metrics: Array<{
      name: string;
      before: string;
      after: string;
      percentage: string;
      unit: string;
      width: string;
    }>;
  };
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
  badge: '📋 Lista de espera - Únete para acceso prioritario',
  title: '¿Pierdes tiempo en',
  subtitle: 'tareas',
  description: 'Después de 10+ años optimizando procesos, he creado la metodología exacta que uso para recuperar 20+ horas semanales. Ahora quiero compartirla contigo.',
  features: [
    'Atención 1:1 personalizada',
    'Precio de lanzamiento',
    'Garantía total'
  ]
};

// FAQ data
export const faqData: FAQ[] = [
  {
    question: "¿Cuánto tiempo toma completar un proyecto?",
    answer: "Los proyectos suelen durar entre 4 y 8 semanas, según la complejidad. Todo inicia con una sesión de diagnóstico de 45–60 minutos, y en un máximo de 48 horas te entrego un documento con el análisis completo, un roadmap y el presupuesto detallado."
  },
  {
    question: "¿Qué incluye exactamente el diagnóstico de $35?",
    answer: "Incluye una sesión de 45–60 minutos para conocer tu negocio y, en las siguientes 48 horas, un documento con el análisis, un roadmap personalizado y la propuesta de implementación con presupuesto. El monto se descuenta si decides avanzar con el proyecto."
  },
  {
    question: "¿Trabajas con empresas de cualquier tamaño?",
    answer: "Desde emprendedores individuales hasta empresas medianas. Lo importante no es el tamaño, sino la disposición a crecer y optimizar procesos de forma estratégica."
  },
  {
    question: "¿Ofreces garantía de resultados?",
    answer: "Sí. Cada servicio tiene garantías concretas: un plan de marketing accionable, un sistema SCALE funcional o una automatización que libera 8–15 horas semanales. Si no cumplo lo acordado, no pagas."
  },
  {
    question: "¿Qué pasa después del diagnóstico?",
    answer: "Recibes un documento con análisis, roadmap y propuesta. Si decides avanzar, aplicamos el descuento de $35 y arrancamos de inmediato con la implementación siguiendo el cronograma acordado."
  }
];

// Services data
export const servicesData: Service[] = [
  {
    id: 'plan-marketing',
    badge: 'CONVERT',
    badgeColor: 'from-orange-500 to-red-500',
    icon: '📊',
    title: 'Plan de Marketing',
    targetAudience: 'Para emprendedores que necesitan claridad total',
    description: 'Genera más leads y clientes con una estrategia clara. → Avanza con confianza, sin improvisar.',
    originalPrice: '$120',
    currentPrice: '$35',
    features: [
      'Plan detallado en 2-3 semanas',
      'Metodología probada que funciona',
      'Coordinación completa opcional'
    ],
    buttonColor: 'from-orange-500 to-red-500',
    buttonText: 'Ver Detalle del Servicio',
    url: '/servicios/plan-marketing'
  },
  {
    id: 'sistema-scale',
    badge: 'SCALE',
    badgeColor: 'from-orange-500 to-red-500',
    icon: '🏢',
    title: 'Sistema SCALE',
    targetAudience: 'Para líderes con equipos de 3-15 personas',
    description: 'Escala tu negocio con un sistema digital organizado. → Delega sin dolores de cabeza.',
    originalPrice: '$120',
    currentPrice: '$35',
    features: [
      'Visibilidad 24/7 de equipo y proyectos',
      'Procesos listos para delegar',
      'Decisiones basadas en datos reales'
    ],
    buttonColor: 'from-orange-500 to-red-500',
    buttonText: 'Ver Detalle del Servicio',
    url: '/servicios/sistema-scale'
  },
  {
    id: 'automatizacion-ia',
    badge: 'IA',
    badgeColor: 'from-purple-500 to-blue-500',
    icon: '🤖',
    title: 'Automatización IA',
    targetAudience: 'Para consultores y servicios profesionales',
    description: 'Automatiza 3 procesos clave y ahorra 8–15h semanales. → Gana tiempo para clientes y crecimiento.',
    originalPrice: '$120',
    currentPrice: '$35',
    features: [
      '8-15 horas semanales liberadas',
      'Automatizaciones que funcionan 24/7',
      'Supera a competencia tradicional'
    ],
    buttonColor: 'from-purple-500 to-blue-500',
    buttonText: 'Ver Detalle del Servicio',
    url: '/servicios/automatizacion-ia'
  }
];

// Testimonials data
export const testimonialsData: Testimonial[] = [
  {
    name: 'María López',
    role: 'CEO',
    company: 'Tienda Creativa',
    service: 'Plan de Marketing',
    avatar: 'M',
    avatarColor: '#4caf50',
    quote: '"El cambio fue brutal. Ahora recibimos el triple de visitas y nuestros clientes nos felicitan por la web. ¡Recomiendo 100%!"',
    result: 'Resultado: +250% tráfico, +180% conversiones'
  },
  {
    name: 'Carlos Méndez',
    role: 'Fundador',
    company: 'Soluciones Pro',
    service: 'Sistema SCALE',
    avatar: 'C',
    avatarColor: '#ff9800',
    quote: '"No solo mejoró la imagen, sino que ahora convertimos mucho más. El proceso fue claro y profesional."',
    result: 'Resultado: +180% conversiones, ROI 320%'
  },
  {
    name: 'Luciano Pérez',
    role: 'Director',
    company: 'Clínica Avanza',
    service: 'Automatización IA',
    avatar: 'L',
    avatarColor: '#2196f3',
    quote: '"La inversión se recuperó en dos meses. El sitio transmite confianza y profesionalismo. ¡Excelente trabajo!"',
    result: 'Resultado: ROI 320%, +15 horas ahorradas semanalmente'
  },
  {
    name: 'Ana Rodríguez',
    role: 'Emprendedora',
    company: '',
    service: 'Plan de Marketing',
    avatar: 'A',
    avatarColor: '#9c27b0',
    quote: '"En solo 3 semanas duplicamos nuestros leads. El proceso fue súper claro y los resultados llegaron rápido."',
    result: 'Resultado: +100% leads, +150% ventas'
  }
];

// Case study data
export const caseStudyData: CaseStudySection = {
  problem: {
    title: '😫 Problema:',
    description: 'Tenían presencia digital desactualizada y perdían clientes',
    items: [
      'Sitio web obsoleto y lento',
      'Sin presencia en redes sociales',
      'Procesos manuales ineficientes',
      'Competencia ganando mercado'
    ]
  },
  solution: {
    title: '🛠️ Solución:',
    description: 'Rediseño completo + estrategia digital integral',
    items: [
      'Nuevo sitio web responsivo y rápido',
      'Estrategia de marketing digital',
      'Automatización de procesos',
      'Optimización SEO completa'
    ]
  },
  implementation: {
    title: '⏰ Implementación:',
    items: [
      'Semana 1-2: Análisis y estrategia',
      'Semana 3-4: Diseño y desarrollo',
      'Semana 5-6: Implementación y pruebas',
      'Semana 7-8: Lanzamiento y optimización'
    ]
  },
  results: {
    title: '🎯 Resultados Impactantes:',
    metrics: [
      {
        name: 'Tráfico web',
        before: '100',
        after: '350',
        percentage: '+250%',
        unit: 'Visitas mensuales',
        width: '75%'
      },
      {
        name: 'Conversiones',
        before: '2%',
        after: '5.6%',
        percentage: '+180%',
        unit: 'Tasa de conversión',
        width: '65%'
      },
      {
        name: 'ROI',
        before: '0%',
        after: '320%',
        percentage: 'En 60 días',
        unit: 'Retorno de inversión',
        width: '90%'
      }
    ]
  }
}; 