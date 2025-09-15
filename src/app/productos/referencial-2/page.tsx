"use client";
import React, { useState } from "react";
import Link from "next/link";
import FAQAccordion from '../../../components/FAQAccordion';
import PackStickyBanner from '../../../components/PackStickyBanner';
import PackStickyBannerInferior from '../../../components/PackStickyBannerInferior';
import { sanityClient } from "@/sanity/sanity";

export default function JaimeDailyPage() {
  const [activeTab, setActiveTab] = useState('features');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Estado para los artículos reales
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  React.useEffect(() => {
    setLoadingArticles(true);
    const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      categories[]->{title},
      excerpt,
      publishedAt,
      readTime,
      author->{name},
      mainImage,
      body
    }`;
    sanityClient.fetch(query).then((data) => {
      setLatestArticles(data);
      setLoadingArticles(false);
    });
  }, []);

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

  // Función para obtener el color de hover según el producto (Jaime Daily)
  function getProductHoverColor() {
    return 'group-hover:text-green-400';
  }

  // Función para obtener el gradiente del avatar según el producto (Jaime Daily)
  function getProductAvatarGradient() {
    return 'from-green-500 to-emerald-500';
  }

  // Preguntas frecuentes específicas para Jaime Daily
  const productFaqs = [
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
    }
  ];

  return (
    <div className="font-sans bg-black text-gray-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-green-900/20 via-emerald-900/10 to-green-900/20">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6 inline-block">
                <p className="text-green-300 text-sm font-semibold">🧠 Desarrollo personal</p>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
                  Jaime Daily
                </span>
                <br />
                <span className="text-white">Hábitos inteligentes</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Para personas que buscan mejorar su disciplina y autoconocimiento día a día. 
                Sistema 3 en 1 que combina seguimiento de hábitos, eliminación de comportamientos negativos 
                y desarrollo de habilidades en Notion.
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Sistema completo 3 en 1</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Automatización diaria</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Pago único</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-2xl transform rotate-6 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🏋️‍♂️</div>
                    <div className="text-white font-bold text-2xl mb-2">Jaime Daily</div>
                    <div className="text-green-100 text-sm">Hábitos inteligentes</div>
                    <div className="mt-4 text-3xl font-bold text-white">$5.99</div>
                    <div className="text-green-100 text-sm">pago único</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-6 bg-gray-900/30 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('features')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'features' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              ¿Es para mí?
            </button>
            <button 
              onClick={() => setActiveTab('how-it-works')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'how-it-works' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Cómo funciona
            </button>
            <button 
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'testimonials' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Testimonios
            </button>
            <button 
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'faq' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
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
                <p className="text-xl text-gray-400">Todo lo que Jaime Daily puede hacer por ti</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1 */}
                <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="text-4xl mb-4">🏃‍♂️</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Sistema de Seguimiento Triple</h3>
                  <p className="text-gray-400 mb-4">
                    Gestiona hábitos diarios, elimina comportamientos negativos y desarrolla nuevas habilidades desde una interfaz unificada con progreso visual en tiempo real.
                  </p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Tablero de hábitos positivos</li>
                    <li>• Sistema de "batallas" contra malos hábitos</li>
                    <li>• Tablero intermitente para habilidades</li>
                    <li>• Progreso visual en tiempo real</li>
                  </ul>
                </div>
                {/* 2 */}
                <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Gamificación Inteligente</h3>
                  <p className="text-gray-400 mb-4">
                    Sistema de reconocimientos que va desde 1 semana hasta 4 meses de consistencia, con contadores automáticos que se reinician estratégicamente para mantener la motivación.
                  </p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Insignias desbloqueables por tiempo</li>
                    <li>• Contadores de rachas automáticos</li>
                    <li>• Reinicio inteligente tras interrupciones</li>
                    <li>• Motivación visual constante</li>
                  </ul>
                </div>
                {/* 3 */}
                <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Automatización Diaria</h3>
                  <p className="text-gray-400 mb-4">
                    Progreso automático, nuevas páginas de diario cada día, y dashboards que se mantienen al día para que te concentres solo en ejecutar tus hábitos.
                  </p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Nuevas páginas de diario automáticas</li>
                    <li>• Dashboards que se actualizan solos</li>
                    <li>• Progreso calculado automáticamente</li>
                    <li>• Sin mantenimiento manual</li>
                  </ul>
                </div>
                {/* 4 */}
                <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-white mb-3">Diario Integrado</h3>
                  <p className="text-gray-400 mb-4">
                    Registro automático de pensamientos, calificación diaria y seguimiento de progreso con plantillas pre-configuradas para maximizar tu autoconocimiento.
                  </p>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Páginas diarias automáticas</li>
                    <li>• Sistema de calificación por estrellas</li>
                    <li>• Plantillas de reflexión</li>
                    <li>• Seguimiento de pensamientos y progreso</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* How It Works Tab */}
          {activeTab === 'how-it-works' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-white">Cómo funciona Jaime Daily</h2>
                <p className="text-xl text-gray-400">Así es como Jaime Daily te ayuda día a día</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Paso 1 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-3xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Configura tus objetivos</h3>
                  <p className="text-gray-400">
                    Define los hábitos que quieres construir, las habilidades que deseas desarrollar y los comportamientos que necesitas eliminar.
                  </p>
                </div>
                {/* Paso 2 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-3xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Registra tu progreso</h3>
                  <p className="text-gray-400">
                    Marca tus actividades diarias manteniendo las cifras en verde y utiliza el sistema de batallas para combatir hábitos negativos.
                  </p>
                </div>
                {/* Paso 3 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-3xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Observa tu transformación</h3>
                  <p className="text-gray-400">
                    Analiza patrones, desbloquea insignias de reconocimiento y mantén rachas que te motiven a seguir avanzando hacia tus metas.
                  </p>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Las reglas son simples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">🎯 Mantén el enfoque</h4>
                    <p className="text-gray-300 mb-4">
                      Mantén tu tablero con las cifras en verde marcando las actividades a diario. 
                      La consistencia visual te ayuda a mantener el momentum.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>• Marca solo actividades completadas</li>
                      <li>• Las cifras verdes indican progreso</li>
                      <li>• La honestidad es clave para el éxito</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">📝 Reflexiona a diario</h4>
                    <p className="text-gray-300 mb-4">
                      El diario integrado se crea automáticamente cada día. Registra tus pensamientos, 
                      califica tu día y observa patrones en tu comportamiento.
                    </p>
                    <ul className="text-gray-400 text-sm space-y-2">
                      <li>• Páginas automáticas cada día</li>
                      <li>• Sistema de calificación por estrellas</li>
                      <li>• Registro de progreso y reflexiones</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-white">Lo que dicen mis usuarios</h2>
                <p className="text-xl text-gray-400">Resultados reales de personas que usan Jaime Daily</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <div className="font-semibold text-white text-lg">María S.</div>
                          <div className="text-gray-400">Emprendedora • 3 meses usando Jaime Daily</div>
                        </div>
                      </div>
                      <blockquote className="text-gray-300 text-lg italic leading-relaxed mb-4">
                        "Jaime Daily cambió completamente mi rutina matutina. En 30 días logré establecer 3 hábitos nuevos que llevaba años intentando mantener."
                      </blockquote>
                      <div className="text-sm text-gray-400">
                        <strong>Resultado:</strong> 3 hábitos nuevos establecidos, +2 horas productivas al día
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">A</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <div className="font-semibold text-white text-lg">Ana L.</div>
                          <div className="text-gray-400">Estudiante • 2 meses usando Jaime Daily</div>
                        </div>
                      </div>
                      <blockquote className="text-gray-300 text-lg italic leading-relaxed mb-4">
                        "Como estudiante, siempre luché con la procrastinación. Jaime Daily me ayudó a crear una rutina de estudio que realmente funciona."
                      </blockquote>
                      <div className="text-sm text-gray-400">
                        <strong>Resultado:</strong> 4 horas de estudio diarias, notas mejoradas 25%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">R</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <div className="font-semibold text-white text-lg">Roberto M.</div>
                          <div className="text-gray-400">Ejecutivo • 4 meses usando Jaime Daily</div>
                        </div>
                      </div>
                      <blockquote className="text-gray-300 text-lg italic leading-relaxed mb-4">
                        "Con mi trabajo exigente, nunca tenía tiempo para ejercicio. Jaime Daily me ayudó a encontrar 30 minutos diarios para entrenar."
                      </blockquote>
                      <div className="text-sm text-gray-400">
                        <strong>Resultado:</strong> 30 min de ejercicio diario, -8kg en 4 meses
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">L</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <div className="font-semibold text-white text-lg">Laura P.</div>
                          <div className="text-gray-400">Freelancer • 6 meses usando Jaime Daily</div>
                        </div>
                      </div>
                      <blockquote className="text-gray-300 text-lg italic leading-relaxed mb-4">
                        "Como freelancer, la disciplina es crucial. Jaime Daily me ayudó a crear una rutina de trabajo que maximiza mi productividad."
                      </blockquote>
                      <div className="text-sm text-gray-400">
                        <strong>Resultado:</strong> +40% de ingresos, mejor balance trabajo-vida
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="py-8">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold mb-4 text-white">Preguntas Frecuentes sobre Jaime Daily</h2>
                <p className="text-xl text-gray-400">Resuelve tus dudas antes de empezar</p>
              </div>
              <div className="max-w-3xl mx-auto mt-10 space-y-4">
                {productFaqs.map((faq, idx) => (
                  <div key={idx}>
                    <button
                      className="w-full text-left bg-gray-800 rounded-xl p-6 transition-all duration-300 border border-gray-700 hover:border-green-500 focus:outline-none"
                      onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                        <span className={`text-green-400 text-2xl transform transition-transform duration-300 ${openFAQ === idx ? 'rotate-45' : ''}`}>+</span>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}> 
                      <div className="bg-gray-700/50 rounded-b-xl p-6 border-l-4 border-green-500 mx-4 text-left">
                        <p className="text-gray-300 text-left">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-gray-900/20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Planes y precios</h2>
            <p className="text-xl text-gray-400">Elige el plan que mejor se adapte a tus necesidades</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* MINI */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 relative flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                GRATIS
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 mt-4">Jaime Daily MINI</h3>
              <p className="text-gray-400 mb-6">Básica para novatos</p>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-green-400">$0</span>
                  <span className="text-lg text-gray-500">Siempre gratis</span>
                </div>
              </div>
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Seguimiento de hábitos básico
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Sistema de batallas incluido
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Acceso móvil via Notion
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-gray-500 mr-2">✗</span> Tablero de habilidades
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-gray-500 mr-2">✗</span> Diario integrado
                </div>
              </div>
              <div className="mt-auto pt-2">
                <button className="w-full py-3 border-2 border-green-500 text-green-400 rounded-lg font-bold hover:bg-green-500 hover:text-white transition-all duration-300">
                  📝 Acceder Versión Gratuita
                </button>
              </div>
            </div>
            {/* PRO */}
            <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 relative flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                MÁS POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 mt-4">Jaime Daily PRO</h3>
              <p className="text-gray-400 mb-6">Robusto y Poderoso</p>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-green-400">$5.99</span>
                  <span className="text-sm text-gray-400 line-through">$9.99</span>
                </div>
                <div className="text-sm text-green-400 font-semibold">40% OFF - PAGO ÚNICO</div>
              </div>
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Sistema completo 3 en 1
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Automatización diaria
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Gamificación con insignias
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Diario personal integrado
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Acceso móvil optimizado
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Configuración guiada paso a paso
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Soporte por email incluido
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-2">✓</span> Sin suscripciones mensuales
                </div>
              </div>
              <div className="mt-auto pt-2">
                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-bold text-white hover:scale-105 transition-transform duration-300">
                  🚀 Comprar Jaime Daily PRO
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 text-center mt-8">
            <p className="text-gray-400 text-sm italic">
              Ambas versiones requieren una cuenta gratuita de Notion para funcionar
            </p>
          </div>
        </div>
        
        {/* Banner pegado en la esquina inferior derecha */}
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-10">
          <PackStickyBanner />
        </div>
      </section>

      {/* Banner sticky inferior - Estilo alternativo */}
      <PackStickyBannerInferior packs={[]} />

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight">
            ¿Listo para transformar tus hábitos?
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Únete a miles de personas que ya han cambiado sus vidas con Jaime Daily.
            <br />
            <span className="text-green-300 font-semibold">Empieza gratis hoy mismo.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300">
              🚀 Probar Jaime Daily Gratis
            </button>
            <button className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white hover:text-green-900 transition-all duration-300">
              📞 Agendar consulta gratuita
            </button>
          </div>
        </div>
      </section>

      {/* Artículos Relacionados */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Artículos Relacionados</h2>
          <p className="text-center text-gray-400 mb-12">Más contenido sobre desarrollo personal y productividad</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingArticles ? (
              <div className="col-span-full text-center text-gray-500 py-16">Cargando artículos...</div>
            ) : latestArticles.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-16">No hay artículos publicados aún.</div>
            ) : (
              latestArticles.map((a) => {
                const category = a.categories && a.categories[0]?.title;
                const colorClasses = getCategoryColorClasses(category);
                const publishedDate = a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' }) : '';
                const readingTime = calculateReadingTime(a.body);
                const context = getReadingContext(readingTime);
                return (
                  <Link key={a._id} href={a.slug ? `/blog/${a.slug}` : "#"} className="group">
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-700 cursor-pointer">
                      {/* Franja de color */}
                      <div className={`h-2 bg-gradient-to-r ${colorClasses.gradient}`}></div>
                      {a.mainImage && (
                        <img src={typeof a.mainImage === 'string' ? a.mainImage : a.mainImage.asset?.url} alt={a.title} className="w-full h-48 object-cover rounded-t-2xl mb-0" loading="lazy" />
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          {/* Etiqueta de categoría estilo pill */}
                          <span className={`text-xs font-semibold bg-gray-900/60 px-3 py-1 rounded-full border border-gray-700/40 ${colorClasses.text}`}>{category || 'Sin categoría'}</span>
                          <span className={`flex items-center gap-1 text-xs font-semibold ${context.color}`}>
                            <span>{context.icon}</span>
                            <span>{readingTime} min</span>
                          </span>
                        </div>
                        <h3 className={`font-bold text-lg text-white mb-2 ${getProductHoverColor()} transition-colors duration-300`}>
                          {a.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {a.excerpt || ''}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500">{a.author?.name || 'Diego G. Vaccaro'}</span>
                          </div>
                          <span className={`${context.color} text-xs font-medium bg-gray-700/50 px-2 py-1 rounded-md border border-gray-600/30`}>
                            {context.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Back to Products */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Link 
            href="/productos"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-300"
          >
            ← Volver a productos
          </Link>
        </div>
      </section>
    </div>
  );
} 