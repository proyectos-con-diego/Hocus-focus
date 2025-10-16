export interface Problem {
  icon: string;
  title: string;
  desc: string;
}

export interface TimelineItem {
  week: string;
  title: string;
  desc: string;
}

export interface AutomationCatalog {
  icon: string;
  title: string;
  difficulty: string;
  desc: string;
  idealFor: string;
}

export interface CaseStudy {
  initials: string;
  name: string;
  business: string;
  industry: string;
  metrics: Array<{
    number: string;
    label: string;
  }>;
  quote: string;
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

export interface PricingData {
  badge: string;
  title: string;
  price: string;
  normalPrice: string;
  paymentTerms: string;
  guarantee: {
    title: string;
    description: string;
  };
  features: string[];
  benefits: string[];
}

// Hero section data
export const heroData: HeroData = {
  badge: '📋 Lista de espera - Únete para acceso prioritario',
  title: '¿Y si tuvieras un empleado que trabaja 24/7 sin sueldo?',
  subtitle: 'Automatizo 3 procesos clave de tu negocio tradicional usando IA, ahorrándote 8-15 horas semanales sin complicaciones técnicas',
  features: [
    'Negocios tradicionales automatizados',
    '8-15h promedio ahorradas por semana',
    'ROI visible en 60-90 días'
  ],
  guarantee: '💎 Sin complicaciones técnicas - Te entrego todo funcionando'
};

// Problems data
export const problems: Problem[] = [
  {
    icon: "🔄",
    title: "Procesos Manuales Eternos",
    desc: "Facturas, propuestas, seguimiento de clientes... todo lo haces a mano. Tu tiempo se va en trabajo repetitivo que no genera valor."
  },
  {
    icon: "💰",
    title: "Costos Operativos Altos",
    desc: "Cada hora perdida en tareas manuales es dinero que no entra. Los errores humanos te cuestan clientes y credibilidad."
  },
  {
    icon: "📈",
    title: "No Puedes Escalar",
    desc: "Quieres crecer pero no puedes contratar más personal. Cada nuevo cliente significa más trabajo manual para ti."
  },
  {
    icon: "⏰",
    title: "Sin Tiempo para Estrategia",
    desc: "Pasas tanto tiempo en lo operativo que no puedes enfocarte en hacer crecer realmente tu negocio."
  },
  {
    icon: "📊",
    title: "Sin Datos, Sin Control",
    desc: "No tienes métricas claras ni reportes automáticos. Tomas decisiones \"a ciegas\" sin datos reales."
  },
  {
    icon: "🏃‍♂️",
    title: "Competencia Digital",
    desc: "Tus competidores usan IA y automatización. Te están superando en velocidad y eficiencia."
  }
];

// Timeline data
export const timeline: TimelineItem[] = [
  {
    week: "S1",
    title: "Auditoría & Diagnóstico",
    desc: "Analizamos tu negocio e identificamos todos los procesos que puedes automatizar para máximo impacto."
  },
  {
    week: "S2",
    title: "Setup Básico + Plan",
    desc: "Configuramos todas las herramientas y seleccionamos las 3 automatizaciones más valiosas para tu negocio."
  },
  {
    week: "S3",
    title: "Primera Automatización",
    desc: "Implementamos tu primera automatización y la probamos con datos reales hasta que funcione perfectamente."
  },
  {
    week: "S4",
    title: "Segunda Automatización",
    desc: "Agregamos la segunda automatización e integramos todo el sistema para que trabaje en conjunto."
  },
  {
    week: "S5",
    title: "Tercera Automatización",
    desc: "Completamos el sistema con la tercera automatización y optimizamos todo el flujo de trabajo."
  },
  {
    week: "S6",
    title: "Entrega & Training",
    desc: "Testing final, documentación completa y training personalizado para que domines tu nuevo sistema."
  }
];

// Automation catalog data
export const automationCatalog: AutomationCatalog[] = [
  {
    icon: "🗂️",
    title: "Sistema de Seguimiento de Proyectos",
    difficulty: "Más Fácil",
    desc: "Gestión automática de proyectos, tareas y deadlines con notificaciones inteligentes que mantienen todo bajo control sin esfuerzo manual.",
    idealFor: "Consultores, agencias, servicios profesionales, construcción"
  },
  {
    icon: "📊",
    title: "Dashboard de Métricas Automatizado",
    difficulty: "Muy Fácil",
    desc: "Reportes automáticos de ventas, finanzas y KPIs que se actualizan solos, dándote visibilidad total de tu negocio en tiempo real.",
    idealFor: "Cualquier negocio con ventas, retail, restaurantes"
  },
  {
    icon: "🧾",
    title: "Sistema de Facturas Automáticas",
    difficulty: "Fácil",
    desc: "Genera y envía facturas automáticamente, rastrea pagos y envía recordatorios. Nunca más olvides facturar o perseguir pagos.",
    idealFor: "Freelancers, servicios profesionales, pequeño retail"
  },
  {
    icon: "📝",
    title: "Propuestas Comerciales Automáticas",
    difficulty: "Muy Fácil",
    desc: "Genera propuestas personalizadas en minutos con IA, incluyendo precios, términos y condiciones adaptados a cada cliente automáticamente.",
    idealFor: "Empresas B2B, consultores, servicios especializados"
  },
  {
    icon: "📧",
    title: "Respuesta Automática de Emails",
    difficulty: "Fácil",
    desc: "IA que responde emails automáticamente con contexto personalizado, filtra consultas importantes y programa citas sin tu intervención.",
    idealFor: "Atención al cliente, soporte, ventas, servicios"
  },
  {
    icon: "📱",
    title: "Automatización de Redes Sociales",
    difficulty: "Intermedio",
    desc: "Creación y programación automática de contenido para redes sociales adaptado a tu marca, con horarios optimizados para máximo engagement.",
    idealFor: "Retail, restaurantes, servicios locales, e-commerce"
  },
  {
    icon: "👥",
    title: "Filtrado Automático de Candidatos",
    difficulty: "Avanzado",
    desc: "IA que analiza CVs automáticamente, clasifica candidatos por idoneidad y programa entrevistas solo con los mejores perfiles.",
    idealFor: "Empresas en crecimiento, RRHH, agencias de empleo"
  }
];

// Case studies data
export const caseStudies: CaseStudy[] = [
  {
    initials: "CM",
    name: "Carlos Méndez",
    business: "Despacho Contable Tradicional",
    industry: "Servicios Profesionales",
    metrics: [
      { number: "18h", label: "Ahorradas por Semana" },
      { number: "85%", label: "Procesos Automatizados" },
      { number: "40%", label: "Más Clientes" },
      { number: "45 días", label: "ROI Completo" }
    ],
    quote: "\"Antes tardaba 4 horas haciendo facturas y persiguiendo pagos cada día. Ahora todo es automático: facturas, recordatorios, reportes. Pasé de atender 20 clientes a 28 sin contratar personal. Mi stress bajó y mis ingresos subieron 40%.\""
  },
  {
    initials: "AR",
    name: "Ana Rodríguez",
    business: "Consultora en Recursos Humanos",
    industry: "Consultoría",
    metrics: [
      { number: "15h", label: "Ahorradas por Semana" },
      { number: "90%", label: "CVs Filtrados Automáticamente" },
      { number: "3x", label: "Más Procesos de Selección" },
      { number: "30 días", label: "Tiempo de ROI" }
    ],
    quote: "\"Revisar 200 CVs me tomaba días completos. Ahora la IA los filtra en minutos y solo reviso los mejores 10. Tripliqué mi capacidad de procesos de selección y mis clientes están encantados con la rapidez y calidad.\""
  },
  {
    initials: "LP",
    name: "Luis Pérez",
    business: "Empresa de Construcción Familiar",
    industry: "Construcción",
    metrics: [
      { number: "22h", label: "Ahorradas por Semana" },
      { number: "100%", label: "Seguimiento Automatizado" },
      { number: "60%", label: "Menos Retrasos" },
      { number: "21 días", label: "Recuperación Inversión" }
    ],
    quote: "\"Gestionar 8 obras simultáneas era un caos total. Ahora tengo seguimiento automático de cada proyecto, alertas de deadlines y reportes de progreso. Reduje retrasos 60% y puedo manejar más proyectos con la misma tranquilidad.\""
  }
];

// FAQ data
export const faqs: FAQ[] = [
  {
    question: "¿De verdad necesito un diagnóstico si ya sé qué tareas me quitan tiempo?",
    answer: "Justamente ahí está el problema: saber qué te quita tiempo no siempre significa saber cómo automatizarlo. En la sesión identificamos qué procesos son viables, cuánto ahorrarías y cómo implementarlo paso a paso."
  },
  {
    question: "¿Qué recibo exactamente en la sesión de $35?",
    answer: "En esta sesión de 60 minutos obtendrás claridad total sobre cómo ahorrar tiempo en tu negocio. Identificaremos juntos los tres procesos más repetitivos y automatizables, y te entregaré un roadmap inicial con pasos concretos para los próximos 30 días. Además, recibirás recomendaciones personalizadas según tu tipo de negocio, junto con la grabación y mis notas de la sesión, para que no pierdas ningún detalle y puedas aplicarlo de inmediato."
  },
  {
    question: "¿Cuándo empiezo a notar resultados?",
    answer: "La primera automatización funciona en la semana 3. En 6 semanas tienes el sistema completo operativo. La mayoría de clientes siente el alivio inmediato desde la primera automatización implementada."
  },
  {
    question: "¿Hay costos ocultos además de los $35?",
    answer: "No. El diagnóstico cuesta $35 y no hay pagos extra. Si decides implementar, algunas herramientas tienen planes básicos de $20–40/mes, que se pagan solas con 2–3 horas ahorradas."
  },
  {
    question: "¿Esto sirve para mi tipo de negocio?",
    answer: "Sí, si tu negocio repite tareas administrativas. He trabajado con consultores, despachos, restaurantes, retail y servicios profesionales. Mientras más manual sea tu operación, más impacto tiene."
  },
  {
    question: "¿Necesito conocimientos técnicos para usar las automatizaciones?",
    answer: "¡Para nada! Te entrego todo configurado y funcionando. Incluye training personalizado donde te enseño paso a paso cómo usar cada automatización. Si sabes usar email y WhatsApp, puedes usar tus automatizaciones."
  }
];

// Pricing data
export const pricingData: PricingData = {
  badge: "BETA - Solo 5 Cupos Disponibles",
  title: "AUTOMATE STARTER",
  price: "$800",
  normalPrice: "Valor normal: $1,200",
  paymentTerms: "💳 Pago único • 🏦 Planes de pago disponibles",
  guarantee: {
    title: "🛡️ Garantía de Funcionamiento Total",
    description: "Si en 30 días tus automatizaciones no funcionan perfectamente y no ahorras al menos 8 horas semanales, te devuelvo el 100% de tu dinero."
  },
  features: [
    "Auditoría completa de procesos automatizables",
    "Setup básico de todas las herramientas necesarias",
    "3 automatizaciones implementadas y funcionando",
    "Documentación completa de cada sistema",
    "Training personalizado de 45 minutos",
    "1 mes de soporte técnico incluido"
  ],
  benefits: [
    "✅ Inicio en 3-5 días hábiles",
    "✅ Primera automatización en 2 semanas",
    "✅ Sistema completo en 6 semanas"
  ]
};

// ROI calculator default values
export const roiCalculatorDefaults = {
  defaultHours: 12,
  defaultRate: 25,
  automationEfficiency: 0.8, // 80% de automatización
  investment: 800
}; 