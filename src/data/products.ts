export interface Product {
  name: string;
  description: string;
  emoji: string;
  gradientClass: string;
  slug: string;
  originalPrice: string;
  currentPrice: string;
  discount: string;
  beneficioDestacado: string;
  badge: string;
  isPopular?: boolean;
  isBeta?: boolean;
}

export const products: Product[] = [
  { 
    name: "Jaime Daily", 
    description: "Sistema de gestión de hábitos y rutinas diarias",
    emoji: "🐔",
    gradientClass: "bg-gradient-to-br from-green-500 to-emerald-600",
    slug: "jaime-daily",
    originalPrice: "$9.99",
    currentPrice: "$5.99",
    discount: "-40%",
    beneficioDestacado: "Tu compañero de rutinas",
    badge: "hábitos"
  },
  { 
    name: "Vinxi", 
    description: "Sistema de gestión de proyectos todo-en-uno",
    emoji: "🦊",
    gradientClass: "bg-gradient-to-br from-blue-500 to-cyan-500",
    slug: "vinxi",
    originalPrice: "$30.00",
    currentPrice: "$9.99",
    discount: "-67%",
    beneficioDestacado: "Ideas organizadas y accesibles",
    badge: "proyectos",
    isPopular: true
  },
  { 
    name: "Grilla Viralis", 
    description: "Base de datos para gestión de múltiples clientes",
    emoji: "🦗",
    gradientClass: "bg-gradient-to-br from-green-500 to-green-600",
    slug: "grilla-viralis",
    originalPrice: "$99.00",
    currentPrice: "$29.00",
    discount: "-71%",
    beneficioDestacado: "Todo tu contenido en un lugar",
    badge: "contenido"
  },
  { 
    name: "Midas", 
    description: "Dashboard financiero y seguimiento de gastos",
    emoji: "🐷",
    gradientClass: "bg-gradient-to-br from-orange-500 to-orange-600",
    slug: "midas",
    originalPrice: "$20.00",
    currentPrice: "$8.99",
    discount: "-55%",
    beneficioDestacado: "Claridad total de tu dinero",
    badge: "finanzas"
  },
  { 
    name: "OKRo", 
    description: "Sistema de seguimiento de objetivos y resultados",
    emoji: "🐼",
    gradientClass: "bg-gradient-to-br from-blue-600 to-blue-500",
    slug: "okro",
    originalPrice: "$99.00",
    currentPrice: "$29.00",
    discount: "-71%",
    beneficioDestacado: "Metas claras, resultados visibles",
    badge: "objetivos"
  },
  { 
    name: "Bafet", 
    description: "Dashboard de monitoreo y análisis crypto",
    emoji: "🐸",
    gradientClass: "bg-gradient-to-br from-purple-500 to-pink-500",
    slug: "bafet",
    originalPrice: "$59.00",
    currentPrice: "Próximamente",
    discount: "Beta",
    beneficioDestacado: "Rendimiento en tiempo real",
    badge: "crypto",
    isBeta: true
  },
  { 
    name: "Navio", 
    description: "Sistema colaborativo para equipos y proyectos",
    emoji: "🐺",
    gradientClass: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    slug: "navio-360",
    originalPrice: "$35.00",
    currentPrice: "Próximado",
    discount: "Beta",
    beneficioDestacado: "Visibilidad total del equipo",
    badge: "colaboración"
  }
];

export const testimonials = [
  {
    name: "María S.",
    role: "Emprendedora • 3 meses usando Jaime Daily",
    avatar: "M",
    avatarColor: "#4caf50",
    quote: "Jaime Daily cambió completamente mi rutina matutina. En 30 días logré establecer 3 hábitos nuevos que llevaba años intentando mantener.",
    result: "Resultado: 3 hábitos nuevos establecidos, +2 horas productivas al día"
  },
  {
    name: "Carlos R.",
    role: "Freelancer • 2 meses usando Midas",
    avatar: "C",
    avatarColor: "#ff9800",
    quote: "Midas organizó completamente mis finanzas. Ahora sé exactamente dónde va mi dinero y he ahorrado 30% más que antes.",
    result: "Resultado: 30% más de ahorro, control total de gastos"
  },
  {
    name: "Laura G.",
    role: "Diseñadora • 1 mes usando Vinxi",
    avatar: "L",
    avatarColor: "#2196f3",
    quote: "Vinxi me ayudó a organizar mis proyectos creativos y no perder ninguna idea importante. Ahora avanzo mucho más rápido.",
    result: "Resultado: +5 proyectos terminados, cero ideas perdidas"
  },
  {
    name: "Esteban P.",
    role: "Ingeniero • 2 semanas usando Grilla Viralis",
    avatar: "E",
    avatarColor: "#9c27b0",
    quote: "Grilla Viralis hizo que cuidar mis plantas fuera sencillo y divertido. ¡Hasta mi familia se sumó al reto!",
    result: "Resultado: jardín más sano, +3 plantas nuevas en casa"
  }
];

export const faqs = [
  {
    question: "¿Cómo funcionan los agentes de IA?",
    answer: "Son sistemas en Notion, compuestos por dashboards y bases de datos interconectadas que te ayudan a organizar información, dar recordatorios y automatizar tareas específicas.\n\nCada sistema puede ir acompañado de un bot conversacional con personalidad propia, entrenado para entender ese entorno y guiarte en su uso. Así, lo complejo se convierte en procesos simples y veloces, adaptados a tu día a día."
  },
  {
    question: "¿Puedo usar varios agentes a la vez?",
    answer: "¡Absolutamente! Puedes usar múltiples agentes simultáneamente. Cada uno está diseñado para resolver un problema específico, por lo que muchos usuarios combinan varios para crear un ecosistema completo de productividad personalizado."
  },
  {
    question: "¿Qué incluye la versión gratuita?",
    answer: "La mayoría incluye una versión MINI gratuita con funciones básicas y sin conexión a la IA. Esto te permite probar el sistema antes de decidir si quieres acceder a todas las funcionalidades avanzadas de las versiones superiores."
  },
  {
    question: "¿Hay garantía de resultados?",
    answer: "Sí, siempre que lo uses. Cada asistente ofrece **resultados garantizados según su propósito** (ejemplo: claridad financiera con Midas, hábitos sostenibles con Jaime, proyectos organizados con Vinxi)."
  },
  {
    question: "¿Los agentes funcionan en móvil?",
    answer: "Sí, todos los agentes funcionan en **la app de Notion**, para que gestiones tus sistemas desde cualquier lugar con conexión a internet.\n\nY si cuentas con una versión **IA**, también podrás **conversar directamente con tu asistente a través de la app de ChatGPT**, usando lenguaje natural para sacarle aún más provecho."
  }
]; 