export interface Problem {
  icon: string;
  title: string;
  desc: string;
}

export interface ScaleMethodology {
  letter: string;
  title: string;
  desc: string;
}

export interface PainSolution {
  pain: string;
  solution: string;
  result: string;
}

export interface TimelineItem {
  number: string;
  title: string;
  desc: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  guarantee: string;
}

export interface ROIData {
  title: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  benefit: {
    amount: string;
    description: string;
  };
}

export interface PackageData {
  badge: string;
  title: string;
  oldPrice: string;
  currentPrice: string;
  savings: string;
  paymentTerms: string;
  features: string[];
  guarantee: {
    title: string;
    description: string;
  };
}

// Hero section data
export const heroData: HeroData = {
  badge: '📋 Lista de espera - Únete para acceso prioritario',
  title: '¿Tu equipo trabaja en el caos?',
  subtitle: 'Convierte tu negocio desorganizado en una operación profesional con el Sistema SCALE que funciona',
  features: [
    'Líderes de equipos organizados',
    'Visibilidad total garantizada',
    'Sistema funcionando en 30 días'
  ],
  guarantee: '💎 Garantía: Un plan concreto para implementar SCALE o te devuelvo el 100%.'
};

// Problems data
export const problems: Problem[] = [
  {
    icon: "🔍",
    title: "No Sabes Qué Hace Tu Equipo",
    desc: "\"¿En qué están trabajando?\" \"¿Cuándo estará listo?\" \"¿Quién está sobrecargado?\" Vives preguntando porque no tienes visibilidad."
  },
  {
    icon: "⏰",
    title: "Proyectos Siempre Retrasados",
    desc: "Los deadlines se pasan, los clientes se molestan, y tu reputación se daña. No tienes sistema para detectar problemas antes de que sea tarde."
  },
  {
    icon: "📋",
    title: "Reuniones Interminables",
    desc: "Pasas horas en reuniones para saber qué está pasando. Tu tiempo de liderazgo se consume en microgestión en lugar de estrategia."
  },
  {
    icon: "💼",
    title: "No Puedes Delegar",
    desc: "Todo depende de ti porque solo tú sabes cómo se hacen las cosas. Esto limita tu crecimiento y te convierte en cuello de botella."
  },
  {
    icon: "🧠",
    title: "Decisiones \"A Ciegas\"",
    desc: "No tienes datos reales para tomar decisiones. Todo es intuición y \"feeling\", lo que genera errores costosos e incertidumbre."
  },
  {
    icon: "📊",
    title: "Imagen Poco Profesional",
    desc: "Clientes y prospectos notan tu desorganización. Esto afecta tu credibilidad y capacidad de cerrar proyectos grandes."
  }
];

// SCALE methodology data
export const scaleMethodology: ScaleMethodology[] = [
  {
    letter: "S",
    title: "Sistema Digital Centralizado",
    desc: "Todo tu negocio en un solo lugar: proyectos, equipo, clientes, métricas y recursos accesibles 24/7."
  },
  {
    letter: "C",
    title: "Control Total de Operaciones",
    desc: "Visibilidad completa de qué hace cada persona, progreso en tiempo real y alertas automáticas de problemas."
  },
  {
    letter: "A",
    title: "Automatización de Procesos",
    desc: "Procesos documentados y automatizados que funcionan sin ti. Reduce reuniones y elimina microgestión."
  },
  {
    letter: "L",
    title: "Liderazgo Basado en Datos",
    desc: "Métricas automatizadas y dashboards ejecutivos para tomar decisiones informadas, no intuiciones."
  },
  {
    letter: "E",
    title: "Escalabilidad Inmediata",
    desc: "Sistema listo para crecer. Contrata equipo sin miedo al caos, delega con confianza total."
  }
];

// Pain solutions data
export const painSolutions: PainSolution[] = [
  {
    pain: "\"No sé qué hace mi equipo\"",
    solution: "Dashboard de proyectos en tiempo real",
    result: "Visibilidad 24/7 de todo el equipo"
  },
  {
    pain: "\"Proyectos siempre se retrasan\"",
    solution: "Sistema de seguimiento automático",
    result: "Alertas tempranas de problemas"
  },
  {
    pain: "\"Reuniones interminables\"",
    solution: "Procesos documentados y automatizados",
    result: "-50% tiempo en reuniones"
  },
  {
    pain: "\"No puedo delegar nada\"",
    solution: "Templates y procesos estandarizados",
    result: "Delegación inmediata y segura"
  },
  {
    pain: "\"Decisiones sin datos\"",
    solution: "Métricas automatizadas y reportes",
    result: "Decisiones basadas en información real"
  }
];

// Timeline data
export const timeline: TimelineItem[] = [
  {
    number: "1",
    title: "Días 1-7: Setup y Onboarding",
    desc: "Sesión 1: Analizamos tu negocio, configuramos el sistema base personalizado y establecemos la estructura inicial. Al final de la semana tienes acceso completo."
  },
  {
    number: "2",
    title: "Días 8-14: Personalización y Migración",
    desc: "Adaptamos el sistema a tus procesos específicos, migramos tus datos existentes y configuramos automatizaciones. Tu equipo empieza a usar el sistema."
  },
  {
    number: "3",
    title: "Días 15-21: Optimización y Training",
    desc: "Sesión 2: Optimizamos el flujo de trabajo, documentamos procesos clave y entrenamos a tu equipo. El sistema está funcionando a full capacidad."
  },
  {
    number: "4",
    title: "Días 22-30: Escalabilidad y Revisión",
    desc: "Sesión 3: Preparamos el sistema para escalar, creamos templates de delegación y hacemos la revisión final. Tu negocio está listo para crecer sin caos."
  }
];

// FAQ data
export const faqs: FAQ[] = [
  {
    question: "¿Qué obtengo con el diagnóstico?",
    answer: "El diagnóstico incluye una sesión 1:1 de 60 minutos, la grabación, y un documento posterior con un análisis de tu operación, la identificación de cuellos de botella, oportunidades de mejora, roadmap inicial y un presupuesto claro para implementar el sistema SCALE en tu negocio."
  },
  {
    question: "¿Esto funciona para cualquier tipo de negocio?",
    answer: "Sí. SCALE está diseñado para líderes de equipo, consultores y empresas pequeñas o medianas que necesitan centralizar sus operaciones. Nos adaptamos a tu sector y a la complejidad de tus procesos."
  },
  {
    question: "¿Necesito conocimientos técnicos?",
    answer: "No. Nuestro enfoque está en la organización y centralización de la información. La parte técnica está simplificada: nosotros te guiamos y, si decides implementar SCALE, todo se hace acompañado."
  },
  {
    question: "¿El diagnóstico ya incluye la implementación del sistema SCALE?",
    answer: "No. El diagnóstico es el primer paso: analizamos tu situación y te entregamos un plan claro. Si luego decides avanzar con la implementación, aplicamos lo visto y transformamos tu operación en 30 días."
  },
  {
    question: "¿Hay costos adicionales?",
    answer: "El diagnóstico cuesta solo $35, sin costos ocultos. Después, si decides implementar SCALE, recibirás una propuesta clara con tiempos, fases y presupuesto detallado. Tú decides si avanzar."
  },
  {
    question: "¿Qué pasa si después de la sesión no veo valor?",
    answer: "Tienes nuestra Garantía de Claridad: si al final no obtienes un diagnóstico claro y accionable sobre cómo ordenar y centralizar tu operación, te devolvemos el 100%."
  }
];

// ROI data
export const roiData: ROIData[] = [
  {
    title: "📊 Para Líderes de Equipo",
    metrics: [
      { value: "$2,167", label: "Beneficio mensual" },
      { value: "14x ROI", label: "Retorno en 6 meses" },
      { value: "2.5 semanas", label: "Recuperar inversión" },
      { value: "50% menos", label: "Menos tiempo en reuniones" }
    ],
    benefit: {
      amount: "$13,000",
      description: "Beneficio típico en 6 meses"
    }
  },
  {
    title: "📊 Para Coaches/Consultores",
    metrics: [
      { value: "$1,200", label: "Beneficio mensual" },
      { value: "8x ROI", label: "Retorno en 6 meses" },
      { value: "4.5 semanas", label: "Recuperar inversión" },
      { value: "8+ horas libres", label: "Horas liberadas al mes" }
    ],
    benefit: {
      amount: "$7,200",
      description: "Beneficio típico en 6 meses"
    }
  }
];

// Package data
export const packageData: PackageData = {
  badge: "Transformación Digital Completa",
  title: "Sistema SCALE Completo",
  oldPrice: "Software empresarial: $2,400-7,200/año",
  currentPrice: "$897",
  savings: "Ahorras hasta $6,303",
  paymentTerms: "💳 Pago único • 🏦 3 cuotas sin interés disponibles",
  features: [
    "Sistema digital personalizado para tu industria específica",
    "2-3 procesos documentados + entrenamiento para crear más",
    "Panel de control ejecutivo con métricas clave de tu negocio",
    "3 sesiones estratégicas de 60 min cada una",
    "60 días de soporte completo + revisión incluida",
    "Capacitación en metodología para crear nuevos procesos"
  ],
  guarantee: {
    title: "🛡️ Garantía de Transformación Total",
    description: "Si después de 30 días no tienes visibilidad completa de tu negocio y procesos listos para delegar, te devuelvo el 100% de tu inversión. Sin preguntas."
  }
};

// Comparison table data
export const comparisonData = [
  {
    alternative: "Desarrollar sistema interno",
    cost: "$5,000-15,000",
    time: "3-6 meses",
    followUp: "Nulo",
    result: "Incierto"
  },
  {
    alternative: "Software empresarial",
    cost: "$2,400-7,200/año",
    time: "2-4 meses setup",
    followUp: "Limitado",
    result: "Genérico"
  },
  {
    alternative: "Consultor organizacional",
    cost: "$150/hora × 30h = $4,500",
    time: "2-3 meses",
    followUp: "Limitado",
    result: "Solo consultoría"
  },
  {
    alternative: "Sistema SCALE",
    cost: "< 1/5 del costo",
    time: "30 días",
    followUp: "60 días incluidos",
    result: "Funcionando garantizado"
  }
]; 