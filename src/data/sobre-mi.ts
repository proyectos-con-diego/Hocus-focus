export interface Tab {
  id: string;
  label: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  quote: string;
  color: string;
  gradient: string;
}

export interface WorkStep {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Philosophy {
  icon: string;
  title: string;
  description: string;
  highlight: string;
}

export interface Project {
  badge: string;
  badgeText: string;
  status: string;
  title: string;
  description: string;
}

export interface ContactOption {
  icon: string;
  title: string;
  description: string;
  action: string;
  actionType: 'button' | 'link';
  actionUrl?: string;
}

export interface Stat {
  number: string;
  title: string;
  subtitle: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Tabs data
export const tabs: Tab[] = [
  { id: 'historia', label: 'Mi Historia' },
  { id: 'enfoque', label: 'Cómo Trabajo' },
  { id: 'filosofia', label: 'En qué Creo' },
  { id: 'proyectos', label: 'Otros Proyectos' },
  { id: 'contacto', label: 'Conectemos' },
];

// Timeline data
export const timelineData: TimelineItem[] = [
  {
    year: '2015',
    title: 'El Despertar',
    description: 'Era el típico "multitasker" que creía que estar ocupado = ser productivo. Trabajaba 12+ horas diarias sintiendo que el tiempo se me escapaba.',
    quote: '😰 "¿Por qué nunca tengo tiempo para lo importante?"',
    color: 'from-orange-500 to-amber-500',
    gradient: 'from-orange-500 via-amber-400 to-yellow-400'
  },
  {
    year: '2018',
    title: 'El Gran Fracaso',
    description: '8 meses, noches hasta las 3am, relaciones sacrificadas, ahorros perdidos. El proyecto fracasó rotundamente. No era el producto, era mi falta de sistemas.',
    quote: '💔 "Trabajar duro sin sistemas es trabajar tonto"',
    color: 'from-red-500 to-red-700',
    gradient: 'from-red-500 via-red-600 to-red-700'
  },
  {
    year: '2019',
    title: 'El Cambio',
    description: 'Empecé a estudiar sistemas, automatización y optimización. Implementé mi primera metodología y recuperé 10 horas semanales en el primer mes.',
    quote: '🚀 "Los sistemas son la diferencia entre el éxito y el fracaso"',
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-500 via-emerald-400 to-green-400'
  },
  {
    year: '2023',
    title: 'El Impacto',
    description: 'Ayudé a más de 50 personas a recuperar tiempo y optimizar sus procesos. Mi metodología se convirtió en productos que realmente funcionan.',
    quote: '💎 "El tiempo es el recurso más valioso que tenemos"',
    color: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-500 via-blue-600 to-blue-700'
  }
];

// Work steps data
export const workSteps: WorkStep[] = [
  {
    icon: '🔍',
    title: '1. Análisis Profundo',
    description: 'Identifico exactamente dónde pierdes tiempo y qué procesos pueden ser automatizados o optimizados.',
    features: [
      'Mapeo de procesos actuales',
      'Identificación de cuellos de botella',
      'Análisis de tiempo por actividad'
    ]
  },
  {
    icon: '⚡',
    title: '2. Implementación',
    description: 'Diseño e implemento sistemas personalizados que se adaptan a tu forma de trabajar.',
    features: [
      'Sistemas a medida',
      'Automatización inteligente',
      'Integración con herramientas existentes'
    ]
  },
  {
    icon: '📈',
    title: '3. Resultados',
    description: 'Monitoreo el progreso y ajusto los sistemas para maximizar tu productividad.',
    features: [
      'Seguimiento de métricas',
      'Optimización continua',
      'Soporte personalizado'
    ]
  }
];

// Philosophy data
export const philosophyData: Philosophy[] = [
  {
    icon: '🎯',
    title: 'Simplicidad Efectiva',
    description: 'Los mejores sistemas son los que realmente usas. Me enfoco en crear soluciones simples pero poderosas.',
    highlight: '✓ Si no me funciona por 6+ meses, no lo enseño'
  },
  {
    icon: '🧪',
    title: 'Experimentación Constante',
    description: 'Pruebo herramientas, leo artículos, fallo rápido y aprendo más rápido. La mejora es un proceso continuo.',
    highlight: '⚡ Iteración > Perfección'
  },
  {
    icon: '🤝',
    title: 'Independencia Real',
    description: 'Mi objetivo no es crear dependencia, sino enseñarte sistemas autosuficientes que puedas mantener.',
    highlight: '🤝 Si ya no me necesitas, hice bien mi trabajo'
  },
  {
    icon: '💎',
    title: 'Resultados Medibles',
    description: 'No trabajo con promesas vacías. Todo lo que hago debe generar resultados tangibles y medibles.',
    highlight: '📊 Métricas claras, resultados reales'
  }
];

// Projects data
export const projectsData: Project[] = [
  {
    badge: 'E-COMMERCE',
    badgeText: 'Tienda online - Productos disponibles',
    status: 'Activo',
    title: 'GoodFellas',
    description: 'E-commerce de polos divertidos inspirados en memes. Diseños únicos y humor que conecta con la cultura digital actual.'
  },
  {
    badge: 'TAROT',
    badgeText: 'Blog activo - Actualizaciones semanales',
    status: 'Activo',
    title: 'Mystical Insights',
    description: 'Blog sobre tarot práctico donde comparto interpretaciones, lecturas y consejos para aplicar la sabiduría del tarot en la vida cotidiana.'
  }
];

// Contact options data
export const contactOptions: ContactOption[] = [
  {
    icon: '☕',
    title: 'Charla de 30 minutos',
    description: 'Conversemos sobre tus desafíos específicos y cómo puedo ayudarte a optimizar tus procesos.',
    action: 'Agendar Charla',
    actionType: 'button'
  },
  {
    icon: '📧',
    title: 'Email Directo',
    description: 'Si prefieres escribir, envíame un email con tus preguntas y te respondo personalmente.',
    action: 'Enviar Email',
    actionType: 'link',
    actionUrl: 'mailto:hola@diegogonzalez.com'
  }
];

// Stats data
export const statsData: Stat[] = [
  {
    number: '50+',
    title: 'Personas Ayudadas',
    subtitle: 'Clientes que han recuperado tiempo'
  },
  {
    number: '20+',
    title: 'Horas Recuperadas',
    subtitle: 'Por semana en promedio'
  },
  {
    number: '10+',
    title: 'Años de Experiencia',
    subtitle: 'Optimizando procesos'
  },
  {
    number: '100%',
    title: 'Garantía',
    subtitle: 'Satisfacción garantizada'
  }
];

// FAQ data
export const faqsData: FAQ[] = [
  {
    question: '¿Qué te diferencia de otros consultores?',
    answer: 'No me defino solo como consultor. Soy un marketero con mentalidad de ingeniero: combino estrategia de negocio con sistemas y automatizaciones de IA. Eso me permite no solo planear campañas o procesos, sino también construir las herramientas que los hacen funcionar.'
  },
  {
    question: '¿Cómo sé si tu servicio es para mí?',
    answer: 'Si eres un profesional o un equipo que siente que trabaja demasiado pero avanza demasiado poco, probablemente sí. Mis sistemas están pensados para quienes quieren menos fricción, más resultados: desde creativos independientes hasta empresas que buscan escalar.'
  },
  {
    question: '¿De verdad necesito IA para mis procesos?',
    answer: 'No siempre. La IA no es un requisito obligatorio, pero sí es algo que cualquier profesional o equipo debería estar explorando hoy. En muchos casos, puede agilizar tareas que tú o tus colaboradores hacen todos los días, liberando tiempo para lo que realmente importa.\n\nMás que un reemplazo de las personas, la IA debe verse como un potenciador de las posibilidades humanas: una herramienta que amplifica lo que puedes lograr. La meta no es tener más IA, sino más tiempo y claridad.'
  },
  {
    question: '¿Qué pasa si no veo resultados?',
    answer: 'Entonces ajustamos. No vendo soluciones cerradas, sino procesos que evolucionan contigo. He aprendido (muchas veces a golpes) que lo importante no es la idea, sino lo que logra en la práctica.'
  },
  {
    question: '¿Cuánto tiempo toma completar un proyecto?',
    answer: 'Depende del nivel de personalización, pero en promedio entre 4 y 8 semanas. El proceso empieza con un diagnóstico breve (45–60 minutos) y termina con un roadmap claro, fechas concretas y resultados medibles.'
  }
];

// Hero section data
export const heroData = {
  badge: '🔥 10+ años optimizando procesos',
  title: 'Hola, soy Diego.',
  subtitle: 'Recuperé 20+ horas semanales.',
  quote: 'Solía perder 3+ horas diarias en tareas que ahora toman minutos.',
  features: [
    'Trabajo contigo personalmente',
    'Precios early access',
    'Garantía total'
  ]
}; 