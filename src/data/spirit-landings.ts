export interface SpiritLanding {
  id: string;
  description: string;
  buttonText: string;
  features: string[];
  useCases: string[];
}

export const spiritLandings: SpiritLanding[] = [
  {
    id: 'vinxi',
    description: 'Convierte tus ideas dispersas en pasos simples para avanzar sin abrumarte.',
    buttonText: '🦊 Obtener Vinxi Spirit Gratis',
    features: [
      'Convierte ruido en claridad - Transforma listas interminables y pensamientos caóticos en un plan simple y accionable.',
      'Te acompaña según tu estado - Modo rápido, guiado o emocional: Vinxi adapta su ayuda a lo que realmente necesitas en el momento.',
      'Te libera de la carga mental - Deja de pensar en TODO a la vez. Vinxi te muestra solo lo esencial para avanzar sin abrumarte.'
    ],
    useCases: [
      'Prompt: "Tengo muchas ideas mezcladas, no sé por dónde empezar." - Resultado: Un plan dividido en: Hoy, Esta semana, Más adelante.',
      'Prompt: "Quiero lanzar un nuevo proyecto, pero no sé cómo estructurarlo." - Resultado: Guía paso a paso: objetivo, primeros pasos, microtareas claras.',
      'Prompt: "Estoy bloqueado, me siento paralizado." - Resultado: Microrutina de 3 pasos para desbloquearte y retomar energía.',
      'Prompt: "Tengo que concentrarme en algo importante ya." - Resultado: Mini plan express para ganar foco inmediato.',
      'Prompt: "No tengo sistema para organizarme." - Resultado: Sugerencia para empezar con **Vinxi JR**, la plantilla gratuita en Notion.'
    ]
  },
  {
    id: 'grilla',
    description: 'Grilla Spirit transforma frases sueltas y ocurrencias en contenidos con propósito, fáciles de sostener en el tiempo.',
    buttonText: '📣 Obtener Grilla Spirit Gratis',
    features: [
      'Convierte ideas en publicaciones - Te ayuda a bajar pensamientos dispersos a posts concretos y listos para publicar.',
      'Diseña planes de contenido realistas - Estructura pilares, formatos y frecuencia sin exigencias imposibles.',
      'Hace liviano el proceso de crear - Te acompaña a construir constancia sin sentir que las redes son una carga.'
    ],
    useCases: [
      'Prompt: "Tengo una frase y no sé si sirve como post." - Resultado: Versión lista con hook, desarrollo y cierre adaptado a la red elegida.',
      'Prompt: "Quiero armar mi plan de contenidos para Instagram." - Resultado: Guía paso a paso: propósito, público, pilares y frecuencia realista.',
      'Prompt: "Tengo muchas ideas pero no sé cómo ordenarlas." - Resultado: Sugerencia de organización por pilares y redes, con ejemplos de publicaciones.',
      'Prompt: "Me cuesta ser constante." - Resultado: Mini estrategia con formatos fáciles de sostener y recordatorios de que la constancia es más importante que la perfección.',
      'Prompt: "Quiero consejos rápidos para mi próximo post en LinkedIn." - Resultado: 2–3 ganchos posibles y un borrador express del post.'
    ]
  },
  {
    id: 'okro',
    description: 'OKRO Spirit convierte aspiraciones difusas en objetivos claros y medibles, para que avances sin perder el rumbo.',
    buttonText: '🎯 Obtener OKRO Spirit Gratis',
    features: [
      'Transforma deseos en objetivos - Te ayuda a pasar de "quiero crecer" a metas claras y accionables.',
      'Define resultados que importan - No tareas sueltas, sino logros medibles que marcan la diferencia.',
      'Te mantiene enfocado - Distingue entre ruido y avances reales para que tu esfuerzo tenga sentido.'
    ],
    useCases: [
      'Prompt: "Quiero mejorar mi presencia en redes sociales." - Resultado: Objetivo formulado en positivo + 3 resultados clave medibles (ej. publicaciones, interacciones, leads).',
      'Prompt: "Ya tengo este objetivo: vender más. ¿Está bien escrito?" - Resultado: Revisión del objetivo y reformulación para que sea claro y motivador, con métricas asociadas.',
      'Prompt: "Necesito un plan para organizar las metas de mi equipo." - Resultado: Guía paso a paso para convertir metas de equipo en OKRs fáciles de seguir.',
      'Prompt: "Quiero lanzar un producto, pero no sé cómo fijar objetivos." - Resultado: Objetivo inspirador y 2–4 resultados clave concretos (ej. fecha de lanzamiento, primeros usuarios, ingresos iniciales).',
      'Prompt: "Tengo varios OKRs armados, pero no sé si son buenos." - Resultado: Revisión crítica con sugerencias de mejora + validación de métricas.'
    ]
  },
  {
    id: 'cryptopher',
    description: 'CRYPTOPHER Spirit te muestra el pulso del mercado en BTC, ETH y más, con datos claros y explicaciones fáciles de entender.',
    buttonText: '💰 Invocar a CRYPTOPHER Spirit',
    features: [
      'Ver lo esencial sin perderte en cifras - Te traduce las señales del mercado en ideas claras y accionables.',
      'Entender qué pasa detrás del precio - Muestra cómo se mueven las monedas y qué significan esos cambios.',
      'Conectar con el contexto real - Te da una mirada amplia: desde noticias y emociones del mercado hasta comparaciones simples con otras inversiones.'
    ],
    useCases: [
      'Prompt: "Explícame cómo está Bitcoin hoy." - Resultado: Un panorama claro del precio actual, si está subiendo o bajando, y qué significa a corto plazo.',
      'Prompt: "¿Qué debo mirar antes de comprar Ethereum?" - Resultado: Señales básicas sobre movimientos, actividad de usuarios y nivel de riesgo.',
      'Prompt: "¿Cómo está el ánimo de la gente con Bitcoin?" - Resultado: Resumen del sentimiento actual: miedo, confianza o expectativa, explicado en lenguaje simple.'
    ]
  },
  {
    id: 'nosferatu',
    description: 'Nosferatu Spirit transforma una idea suelta en una colección NFT coherente, escalable y lista para el minteo.',
    buttonText: '🦇 Obtener Nosferatu Spirit Gratis',
    features: [
      'Diseña universos con identidad propia - De un concepto inicial, crea estética, paleta y rarezas que sostienen la colección.',
      'Genera bases técnicas listas para usar - Produce JSONs válidos para marketplaces y prompts de render consistentes.',
      'Te da la visión de un director creativo - Cierra con una Biblia Visual que asegura estilo, coherencia y escalabilidad.'
    ],
    useCases: [
      'Prompt: "Quiero crear una colección de pandas con máscaras futuristas." - Resultado: Sistema creativo con paleta de colores, poses y distribución de rarezas.',
      'Prompt: "Necesito el JSON metadata de 3 prototipos para OpenSea." - Resultado: Archivos JSON simples y listos para marketplaces.',
      'Prompt: "¿Cómo escalar mi colección a 500 piezas?" - Resultado: Propuesta de rarezas, set maestro de atributos y esquema de numeración.',
      'Prompt: "Dame prompts para renderizar zorros cyberpunk." - Resultado: Prompts coherentes en estilo y técnica, adaptables a distintos generadores de imagen.',
      'Prompt: "Quiero una mini Biblia Visual para mi proyecto de unicornios." - Resultado: Documento con estética, identidad unificadora, paleta y reglas de oro.'
    ]
  },
  {
    id: 'promptify',
    description: 'Promptify Spirit convierte tus ideas vagas en instrucciones claras, listas para que la IA entregue resultados reales.',
    buttonText: '✍️ Obtener Promptify Spirit Gratis',
    features: [
      'Construye prompts desde cero - Te guía con preguntas simples hasta dejarte un prompt listo para copiar/pegar.',
      'Afina lo que ya tienes - Detecta errores, mejora la claridad y ofrece versiones alternativas.',
      'Descifra respuestas - Si solo tienes la salida, Promptify te ayuda a deducir cuál pudo ser el prompt original.'
    ],
    useCases: [
      'Prompt: "Necesito un correo persuasivo para recuperar a un cliente, pero no sé cómo pedirlo." - Resultado: Un prompt estructurado paso a paso que genera un correo convincente y profesional.',
      'Prompt: "Este es mi prompt para generar ideas de negocio. ¿Lo podés mejorar?" - Resultado: Versión optimizada, versión creativa alternativa y recordatorio clave para obtener mejores respuestas.',
      'Prompt: "Recibí esta respuesta de la IA, pero no sé cómo se generó." - Resultado: Hipótesis técnica y creativa del prompt original, con advertencias claras sobre sus limitaciones.',
      'Prompt: "Quiero crear un prompt que me ayude a preparar una presentación profesional." - Resultado: Prompt detallado con instrucciones específicas de rol, formato y estilo de salida.',
      'Prompt: "Estoy cansado de pedir lo mismo y recibir resultados mediocres." - Resultado: Prompt afinado con frases de urgencia y motivación, que fuerza a la IA a elevar el nivel de su respuesta.'
    ]
  }
];

export const getSpiritLandingById = (id: string): SpiritLanding | undefined => {
  return spiritLandings.find(landing => landing.id === id);
};
