export interface Spirit {
  id: string;
  slug: string;
  name: string;
  icon: string;
  subtitle: string;
  description: string;
  buttonText: string;
  category: string;
  features: string[];
  useCases: string[];
  benefits: string[];
  testimonials?: {
    name: string;
    role: string;
    text: string;
    result: string;
  }[];
}

export const spirits: Spirit[] = [
  {
    id: 'vinxi',
    slug: 'vinxi-spirit',
    name: 'VINXI Spirit',
    icon: '🦊',
    subtitle: 'Espectro con TDAH',
    description: 'Cuando las ideas te persiguen como enjambres y no sabes por dónde empezar, este fantasma te las atrapa, las ordena y te devuelve un plan claro para que avances sin perder el ritmo.',
    buttonText: 'Planificación',
    category: 'Productividad',
    features: [
      'Sistema de prioridades P1-P5',
      'Modo Enfoque para proyectos específicos',
      'Vista Timeline con deadlines claros',
      'Botones de ayuda rápida',
      'Etiquetas inteligentes para conexiones',
      'Funciona perfecto en móvil'
    ],
    useCases: [
      'Gestionar múltiples proyectos simultáneos',
      'Organizar ideas dispersas en planes accionables',
      'Mantener el enfoque en tareas prioritarias',
      'Coordinar equipos con deadlines claros',
      'Capturar y estructurar pensamientos fugaces'
    ],
    benefits: [
      '3 proyectos terminados al mes',
      '+40% de ingresos por mejor organización',
      '-50% tiempo en reuniones',
      '+25% productividad del equipo',
      '0 retrasos en entregas'
    ],
    testimonials: [
      {
        name: 'Marina López',
        role: 'Diseñadora • 3 meses usando Vinxi',
        text: 'El Modo Enfoque cambió mi vida. Antes saltaba entre mil proyectos, ahora termino lo que empiezo. Las etiquetas me ayudan a conectar ideas de diferentes clientes.',
        result: '3 proyectos terminados al mes, +40% de ingresos'
      },
      {
        name: 'Carlos Mendoza',
        role: 'Emprendedor • 4 meses usando Vinxi',
        text: 'El sistema de prioridades P1-P5 es genial. Ya no pierdo tiempo decidiendo qué hacer. Todo está claro y mi equipo sabe exactamente qué es urgente.',
        result: '-50% tiempo en reuniones, +25% productividad del equipo'
      }
    ]
  },
  {
    id: 'grilla',
    slug: 'grilla-spirit',
    name: 'GRILLA Spirit',
    icon: '🐜',
    subtitle: 'El alma del público',
    description: 'Si tu feed parece un tablero Ouija descontrolado, este fantasma lo alinea con tu propósito. Convierte tu lluvia de ideas en una estrategia de contenido con rumbo y resultados.',
    buttonText: 'Estrategia',
    category: 'Marketing',
    features: [
      'Análisis de audiencia automatizado',
      'Calendario de contenido inteligente',
      'Generación de ideas basada en tendencias',
      'Métricas de engagement en tiempo real',
      'Optimización de horarios de publicación',
      'Integración con redes sociales'
    ],
    useCases: [
      'Crear estrategias de contenido consistentes',
      'Identificar qué contenido genera más engagement',
      'Planificar publicaciones con anticipación',
      'Analizar el comportamiento de tu audiencia',
      'Optimizar el timing de tus publicaciones'
    ],
    benefits: [
      'Contenido más relevante para tu audiencia',
      'Mayor engagement en redes sociales',
      'Estrategia de contenido coherente',
      'Ahorro de tiempo en planificación',
      'Mejores resultados de marketing'
    ]
  },
  {
    id: 'okro',
    slug: 'okro-spirit',
    name: 'OKRO Spirit',
    icon: '🐼',
    subtitle: 'Fantasma del norte',
    description: 'Cuando tus metas viven flotando en el limbo, este espíritu les da cuerpo y dirección. Te ayuda a definir objetivos claros y alcanzables con OKRs.',
    buttonText: 'Metas',
    category: 'Gestión',
    features: [
      'Definición de OKRs paso a paso',
      'Seguimiento de progreso automático',
      'Alertas de milestones importantes',
      'Dashboard de resultados visual',
      'Integración con herramientas de equipo',
      'Reportes de rendimiento semanales'
    ],
    useCases: [
      'Establecer objetivos claros para tu equipo',
      'Medir el progreso hacia metas importantes',
      'Alinear esfuerzos individuales con objetivos organizacionales',
      'Identificar obstáculos en el camino hacia las metas',
      'Celebrar logros y ajustar estrategias'
    ],
    benefits: [
      'Objetivos claros y medibles',
      'Mayor alineación del equipo',
      'Mejor toma de decisiones basada en datos',
      'Progreso visible hacia metas importantes',
      'Cultura de resultados y accountability'
    ]
  },
  {
    id: 'tataroto',
    slug: 'tataroto-spirit',
    name: 'TATAROTO Spirit',
    icon: '🔮',
    subtitle: 'Oráculo sabio del presente',
    description: 'Tataroto es un Spirit que usa el tarot como espejo simbólico. Te acompaña con cartas, preguntas y reflexiones que iluminan lo que hoy no ves con claridad.',
    buttonText: 'Reflexión',
    category: 'Desarrollo Personal',
    features: [
      'Convertir confusión en claridad - Cuando no sabés qué preguntar, Tataroto abre caminos con tiradas simbólicas.',
      'Reformular tus dudas - Convierte preguntas ansiosas o cerradas en consultas más potentes y reflexivas.',
      'Explorar nuevas perspectivas - Usa cartas, metáforas y símbolos para ayudarte a ver lo que está oculto en tu presente.'
    ],
    useCases: [
      'Prompt: "¿Mi ex volverá?" - Resultado: Reformulación hacia: "¿Qué necesito comprender sobre este vínculo y mi deseo de volver?"',
      'Prompt: "No sé qué preguntar, pero me siento confundido." - Resultado: Tirada exploratoria que abre con: "¿Qué energía interna tengo disponible hoy?"',
      'Prompt: "Estoy bloqueado en una decisión de trabajo." - Resultado: Tirada con 2–3 cartas que muestran obstáculos, recursos y dirección.',
      'Prompt: "Quiero ver qué parte de mí necesita más atención ahora." - Resultado: Carta simbólica interpretada con metáforas y preguntas de autoconciencia.'
    ],
    benefits: [
      'Mayor claridad en la toma de decisiones',
      'Desarrollo de la intuición personal',
      'Mejor autoconocimiento',
      'Perspectivas más amplias de las situaciones',
      'Conexión con la sabiduría interior'
    ]
  },
  {
    id: 'cryptopher',
    slug: 'cryptopher-spirit',
    name: 'CRYPTOPHER Spirit',
    icon: '₿',
    subtitle: 'Fantasma de las velas',
    description: 'Si las criptos se sienten como un laberinto oscuro, este espíritu ilumina el pre-mercado con análisis claros y señales clave. Te da una visión más ordenada antes de decidir.',
    buttonText: 'Trading',
    category: 'Finanzas',
    features: [
      'Análisis técnico automatizado',
      'Señales de entrada y salida',
      'Gestión de riesgo personalizada',
      'Portfolio tracker integrado',
      'Alertas de mercado en tiempo real',
      'Educación sobre trading y criptos'
    ],
    useCases: [
      'Tomar decisiones de trading informadas',
      'Gestionar el riesgo de tu portfolio',
      'Identificar oportunidades de mercado',
      'Aprender sobre análisis técnico',
      'Mantener disciplina en el trading'
    ],
    benefits: [
      'Decisiones de trading más informadas',
      'Mejor gestión del riesgo',
      'Reducción de pérdidas emocionales',
      'Aprendizaje continuo sobre mercados',
      'Portfolio más equilibrado'
    ]
  },
  {
    id: 'nosferatu',
    slug: 'nosferatu-spirit',
    name: 'NOSFERATU Spirit',
    icon: '🧛',
    subtitle: 'El vampiro de los pixeles',
    description: 'Cuando trabajas con NFTs o variaciones visuales, este espíritu extrae la esencia de cada imagen para que puedas replicarla y transformarla sin perder su identidad.',
    buttonText: 'NFTs',
    category: 'Arte Digital',
    features: [
      'Análisis de características visuales',
      'Generación de variaciones coherentes',
      'Preservación de identidad artística',
      'Herramientas de edición avanzadas',
      'Biblioteca de estilos y patrones',
      'Exportación en múltiples formatos'
    ],
    useCases: [
      'Crear colecciones de NFTs coherentes',
      'Generar variaciones de diseños existentes',
      'Mantener la identidad visual en series',
      'Optimizar imágenes para diferentes plataformas',
      'Desarrollar estilos artísticos únicos'
    ],
    benefits: [
      'Colecciones de NFTs más coherentes',
      'Mayor eficiencia en la creación artística',
      'Preservación de la identidad visual',
      'Mejor calidad de exportación',
      'Desarrollo de estilos únicos'
    ]
  },
  {
    id: 'promptify',
    slug: 'promptify-spirit',
    name: 'PROMPTIFY Spirit',
    icon: '✨',
    subtitle: 'Alma redactora',
    description: 'Si tus prompts no despiertan la magia que esperas, este fantasma te ayuda a afinarlos, estructurarlos y hacerlos irresistibles para que tus bots den su mejor versión.',
    buttonText: 'Prompts',
    category: 'IA',
    features: [
      'Optimización automática de prompts',
      'Biblioteca de prompts efectivos',
      'Análisis de resultados de IA',
      'Templates personalizables',
      'A/B testing de prompts',
      'Integración con ChatGPT y otras IAs'
    ],
    useCases: [
      'Mejorar la calidad de respuestas de IA',
      'Crear prompts más efectivos y claros',
      'Optimizar el uso de herramientas de IA',
      'Desarrollar estilos de comunicación consistentes',
      'Maximizar el valor de las interacciones con IA'
    ],
    benefits: [
      'Respuestas de IA más relevantes y útiles',
      'Ahorro de tiempo en la creación de prompts',
      'Mejor comunicación con herramientas de IA',
      'Resultados más consistentes y predecibles',
      'Mayor productividad con herramientas de IA'
    ]
  }
];

export const getSpiritBySlug = (slug: string): Spirit | undefined => {
  return spirits.find(spirit => spirit.slug === slug);
};

export const getAllSpiritSlugs = (): string[] => {
  return spirits.map(spirit => spirit.slug);
};
