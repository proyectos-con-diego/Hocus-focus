export interface Problem {
  icon: string;
  title: string;
  desc: string;
}

export interface ConvertStep {
  letter: string;
  title: string;
  desc: string;
}

export interface IncludedItem {
  title: string;
  desc: string;
  value: string;
}

export interface ImplementationOption {
  name: string;
  price: string;
  color: string;
}

export interface CaseStudy {
  avatar: string;
  avatarStyle: string;
  title: string;
  subtitle: string;
  industry: string;
  industryColor: string;
  metrics: Array<{
    number: string;
    label: string;
  }>;
  quote: string;
}

export interface Bonus {
  title: string;
  desc: string;
  value: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface HeroData {
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  guarantee: string;
}

// Hero section data
export const heroData: HeroData = {
  badge: '📋 Lista de espera - Únete para acceso prioritario',
  title: '¿Tu marketing parece más un gasto que una inversión?',
  subtitle: 'Haz que cada dólar invertido en marketing trabaje para ti con un sistema probado y rentable.',
  features: [
    '+10 años de experiencia',
    'Leads medibles en 90 días',
    'Implementación supervisada'
  ],
  guarantee: '💎 Garantizado: Detecta qué frena tu marketing… o te devuelvo el 100%.'
};

// Problems data
export const problems: Problem[] = [
  {
    icon: "🎯",
    title: "Sin Estrategia Clara",
    desc: "Publicas contenido aleatorio sin un plan. No sabes qué funciona, qué no, ni hacia dónde vas realmente."
  },
  {
    icon: "💸",
    title: "Presupuesto Desperdiciado",
    desc: "Gastas en herramientas, ads y contenido sin medir ROI. Tu dinero se va sin resultados claros."
  },
  {
    icon: "👥",
    title: "Audiencia Confusa",
    desc: "No tienes claro quién es tu cliente ideal. Tu mensaje no conecta y los leads no son de calidad."
  },
  {
    icon: "📊",
    title: "Sin Métricas Claras",
    desc: "No sabes qué medir ni cómo interpretar los datos. Tomas decisiones basadas en intuición, no en hechos."
  },
  {
    icon: "⚡",
    title: "Implementación Lenta",
    desc: "Tienes ideas pero no sabes cómo ejecutarlas rápido. Te quedas estancado en la planificación."
  },
  {
    icon: "🔄",
    title: "Sin Seguimiento",
    desc: "Lanzas campañas y las abandonas. No optimizas, no ajustas, no mejoras continuamente."
  }
];

// CONVERT methodology steps
export const convertSteps: ConvertStep[] = [
  { letter: "C", title: "Clarificar Situación", desc: "Auditoría completa de tu marketing actual, competencia y oportunidades reales de crecimiento." },
  { letter: "O", title: "Optimizar Mensaje", desc: "Buyer personas detallados y propuesta de valor que conecta emocionalmente con tu audiencia." },
  { letter: "N", title: "Nutrir con Estrategia", desc: "Plan de contenido estratégico y calendario editorial que educa, entretiene y convierte." },
  { letter: "V", title: "Validar Canales", desc: "Identificación de canales más rentables y estrategia específica para cada uno según tu presupuesto." },
  { letter: "E", title: "Estructurar Implementación", desc: "Roadmap detallado con timeline, costos transparentes y opciones de implementación coordinada." },
  { letter: "R", title: "Revisar y Optimizar", desc: "Seguimiento mensual, reportes unificados y optimización continua basada en resultados." },
];

// Included items data
export const included: IncludedItem[] = [
  { title: "Auditoría Completa de Marketing", desc: "Análisis profundo de tu situación actual, competencia y oportunidades específicas", value: "$200" },
  { title: "Buyer Personas Detallados", desc: "Perfiles completos de tu cliente ideal basados en datos y experiencia real", value: "$150" },
  { title: "Estrategia de Marketing Integral", desc: "Plan maestro con objetivos, timeline y estrategias específicas por canal", value: "$300" },
  { title: "Plan de Contenido Estratégico", desc: "Calendario editorial con temas, formatos y estrategia de distribución", value: "$200" },
  { title: "Roadmap de Implementación", desc: "Plan de ejecución detallado con timeline, costos y opciones de implementación", value: "$150" },
  { title: "Templates y Guías Prácticas", desc: "Herramientas listas para usar: mensajes, propuestas y materiales clave", value: "$100" },
  { title: "3 Sesiones de Seguimiento", desc: "Reuniones mensuales de 45 min para revisar avances y ajustar estrategia", value: "$300" },
  { title: "Soporte Estratégico WhatsApp", desc: "Acceso directo para consultas estratégicas durante 30 días", value: "$100" },
];

// Implementation options data
export const implementationOptions: ImplementationOption[] = [
  { name: "Básico", price: "$1,200-1,800/mes", color: "text-emerald-500" },
  { name: "Intermedio", price: "$2,500-3,500/mes", color: "text-amber-500" },
  { name: "Premium", price: "$4,000-6,000/mes", color: "text-purple-500" },
];

// Case studies data
export const cases: CaseStudy[] = [
  {
    avatar: "BT",
    avatarStyle: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    title: "Proyecto Beat (App de Movilidad)",
    subtitle: "Campañas Multicanal y Branding",
    industry: "B2C Tech",
    industryColor: "bg-emerald-500/20 text-emerald-400",
    metrics: [
      { number: "30+", label: "Influencers Coordinados" },
      { number: "1 año", label: "Programa Sostenido" },
      { number: "Top", label: "Recordación vs Uber" },
      { number: "Nacional", label: "Alcance Perú" },
    ],
    quote: "Coordiné un programa integral con más de 30 influencers durante un año completo, logrando superar en recordación de marca a Uber en Perú. La estrategia combinaba activaciones digitales con eventos presenciales."
  },
  {
    avatar: "RX",
    avatarStyle: "bg-gradient-to-br from-blue-400 to-blue-900",
    title: "Proyecto Rextie (Fintech)",
    subtitle: "Optimización de Adquisición y CRM",
    industry: "B2B/B2C Fintech",
    industryColor: "bg-emerald-500/20 text-emerald-400",
    metrics: [
      { number: "50%", label: "Reducción CAC" },
      { number: "QR", label: "Sistema Tracking" },
      { number: "+Conv", label: "Post-Captación" },
      { number: "Equipo", label: "Comercial Integrado" },
    ],
    quote: "Implementé un sistema de tracking personalizado con QRs para el equipo comercial y optimicé la narrativa de ads, reduciendo el costo de adquisición al 50%. La trazabilidad mejoró dramáticamente la conversión."
  },
  {
    avatar: "ST",
    avatarStyle: "bg-gradient-to-br from-pink-400 to-pink-800",
    title: "Consultoría Estratégica",
    subtitle: "Desarrollo de Buyer Personas",
    industry: "Múltiples Sectores",
    industryColor: "bg-emerald-500/20 text-emerald-400",
    metrics: [
      { number: "10+", label: "Años Experiencia" },
      { number: "B2B/B2C", label: "Experiencia Dual" },
      { number: "Tech", label: "Enfoque Principal" },
      { number: "360°", label: "Visión Integral" },
    ],
    quote: "Mi experiencia abarca desde startups tecnológicas hasta empresas establecidas, desarrollando buyer personas detallados y estrategias que conectan realmente con las audiencias objetivo de cada sector."
  },
];

// Bonuses data
export const bonuses: Bonus[] = [
  { title: "Análisis de Competencia Detallado", desc: "Research completo de tus 5 principales competidores", value: "$150" },
  { title: "Kit de Mensajes Personalizados", desc: "Templates de emails, propuestas y mensajes de venta listos", value: "$100" },
  { title: "Guía de Métricas y KPIs", desc: "Framework completo para medir y optimizar resultados", value: "$80" },
  { title: "Sesión Bonus de Implementación", desc: "Llamada adicional de 60 min para planificar la ejecución", value: "$120" },
];

// Diagnóstico bonuses data
export const diagnosticoBonuses: Bonus[] = [
  { title: "Informe express de tu marketing", desc: "Análisis rápido pero profundo de tu situación actual", value: "$120" },
  { title: "3 prioridades de crecimiento", desc: "Identificación de oportunidades con mayor impacto inmediato", value: "$80" },
  { title: "Roadmap inicial de 30 días", desc: "Plan de acción concreto y ejecutable", value: "$70" },
  { title: "Grabación + notas de la sesión", desc: "Acceso permanente al contenido de la consultoría", value: "$30" },
];

// FAQ data
export const faqs: FAQ[] = [
  { q: "¿Qué incluye exactamente el diagnóstico de marketing?", a: "El diagnóstico es una sesión personalizada de 60 minutos en la que revisamos a fondo tu marketing actual, identificamos los principales errores y oportunidades, y recibes un informe express con las tres prioridades clave para tu negocio. Además, te llevas un roadmap inicial de 30 días con pasos claros que puedes implementar de inmediato, junto con la grabación de la sesión para repasar los puntos tratados." },
  { q: "¿Qué diferencia hay entre el diagnóstico y el plan de marketing completo?", a: "El diagnóstico es el primer paso: te da claridad inmediata y un mapa de acción inicial. El plan completo, en cambio, es un proyecto más profundo que desarrolla todos los entregables estratégicos (buyer personas, calendario de 90 días, KPIs, acompañamiento, etc.). Piensa en el diagnóstico como la radiografía y en el plan como el tratamiento completo." },
  { q: "¿Qué pasa si después del diagnóstico decido no avanzar al plan?", a: "No hay ningún problema. El diagnóstico en sí mismo es valioso porque te da claridad, prioridades y un roadmap inicial. Si decides no continuar, igual te quedas con un plan accionable para mejorar tu marketing de inmediato. Si decides avanzar al plan completo, el costo del diagnóstico se descuenta del total." },
  { q: "¿Realmente puedo obtener valor en solo una sesión?", a: "Sí. En una hora bien enfocada podemos identificar con precisión qué está frenando tu marketing y qué acciones tienen mayor impacto a corto plazo. Los clientes suelen salir de la sesión con un nivel de claridad que no habían tenido en meses de esfuerzo disperso." },
  { q: "¿Funciona para cualquier tipo de negocio?", a: "El diagnóstico está diseñado especialmente para emprendimientos y pequeñas empresas que ya tienen un producto o servicio validado y buscan crecer. No importa si tu negocio es B2B o B2C: lo que hacemos es adaptar la metodología a tu contexto para que los pasos sean realistas y aplicables." },
  { q: "¿Qué pasa si no quedo satisfecho con el diagnóstico?", a: "Cuentas con una garantía total: si al terminar la sesión no obtienes claridad sobre qué está fallando en tu marketing y cómo empezar a resolverlo, te devuelvo el 100% de tu inversión. Así reduces cualquier riesgo y te aseguras de que tu dinero siempre esté bien invertido." },
  { q: "¿Qué necesito preparar antes de la sesión?", a: "Solo necesitas contarme brevemente tu situación actual al momento de reservar. Durante la sesión, lo ideal es que tengas a la mano datos básicos como tus canales de marketing activos, presupuesto aproximado y objetivos principales. Con esa información puedo darte un diagnóstico mucho más preciso y útil." },
];

// Pricing data
export const pricingData = {
  oldPrice: "$1,000",
  currentPrice: "$650",
  savings: "$350",
  totalValue: "$2,050",
  totalSavings: "$1,400",
  badge: "Oferta Limitada - Solo 2025",
  title: "Plan de Marketing CONVERT",
  paymentTerms: "💳 Pago único • 🏦 3 cuotas sin interés disponibles",
  guarantee: {
    title: "🛡️ Garantía de Claridad Total",
    description: "Si en 30 días no tienes claridad total sobre cómo duplicar tus leads y un plan detallado para ejecutar, te devuelvo el 100% de tu inversión. Sin preguntas."
  },
  features: [
    "✅ Estrategia completa en 2-3 semanas",
    "✅ Plan de implementación detallado",
    "✅ Claridad total garantizada en 30 días"
  ]
};

// Diagnóstico pricing data
export const diagnosticoPricingData = {
  oldPrice: "$300",
  currentPrice: "$35",
  savings: "$265",
  totalValue: "$300",
  totalSavings: "$265",
  badge: "OFERTA LIMITADA – SOLO 2025",
  title: "Diagnóstico de Marketing Estratégico",
  paymentTerms: "Sesión 1:1 (60 min) • Zoom • Grabación incluida",
  guarantee: {
    title: "🛡️ Garantía de Claridad",
    description: "Si no obtienes claridad inmediata sobre qué frena tu marketing, te devuelvo el 100%."
  },
  features: [
    "✅ Claridad inmediata en 60 minutos",
    "✅ Roadmap accionable para 30 días",
    "✅ Se descuenta si avanzas al Plan CONVERT"
  ],
  footnote: "*Cupos limitados. La sesión no incluye el plan completo; si avanzas, el costo del diagnóstico se descuenta del Plan CONVERT."
}; 