'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDynamicGradient } from './useDynamicGradient';
import HeaderGlass from '../../components/HeaderGlass';
import { spirits } from '../../data/spirits';
import Link from 'next/link';
import { event as trackEvent } from '../../lib/analytics';
import { useMakeWebhook } from '../../hooks/useMakeWebhook';

// La interfaz Spirit se importa desde ../../data/spirits

interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Los datos de spirits ahora se importan desde ../../data/spirits

const features: FeatureItem[] = [
  {
    id: 'personalizacion',
    icon: '🎭',
    title: 'Personalización Etérea',
    description: 'Cada Spirit se adapta a tu estilo único, como un fantasma que aprende tus preferencias.'
  },
  {
    id: 'presencia',
    icon: '🌟',
    title: 'Presencia Invisible',
    description: 'Trabajo silencioso pero efectivo. Nuestros GPTs operan sin interrupciones.'
  },
  {
    id: 'privacidad',
    icon: '🔒',
    title: 'Privacidad Fantasmal',
    description: 'Tus datos permanecen en las sombras, protegidos por encriptación de otro mundo.'
  },
  {
    id: 'evolucion',
    icon: '⚙️',
    title: 'Evolución Continua',
    description: 'Como verdaderos espíritus, nuestros GPTs evolucionan y se perfeccionan constantemente.'
  }
];

const faqData: FAQItem[] = [
  {
    id: '1',
    question: '¿Qué es un Spirit?',
    answer: 'Un bot conversacional especializado que te ofrece orientación y claridad en temas específicos. Te ayuda a ordenar ideas, encontrar enfoques y descubrir el siguiente paso.'
  },
  {
    id: '3',
    question: '¿Necesito conocimientos técnicos para usarlos?',
    answer: 'Para nada. Si sabes escribir un mensaje, sabes usar un Spirit.'
  },
  {
    id: '5',
    question: '¿Puedo personalizar mi Spirit?',
    answer: 'Cada Spirit viene con conocimientos predefinidos. Aunque irá adaptándose a tu estilo de conversación, es probable que al abrir nuevos chats, la configuración inicial de su "vida pasada" prevalezca.'
  },
  {
    id: '7',
    question: '¿Cuánto cuestan?',
    answer: 'Son gratuitos. Solo requieren una pequeña ofrenda simbólica: completar un formulario sencillo.'
  },
  {
    id: '9',
    question: '¿Cómo se diferencian de ChatGPT normal?',
    answer: 'Un Spirit es como un ChatGPT con vida pasada: ya tiene conocimientos, tono y enfoques configurados para un propósito específico. No partes de cero, entras a hablar con un especialista fantasmagórico en su tema.'
  },
  {
    id: '2',
    question: '¿En qué se diferencia de las Agentes IA?',
    answer: 'Las Agentes IA son agentes que interactúan con herramientas externas como Notion o Excel. En cambio, los Spirits son espíritus conversacionales: te asesoran, inspiran y guían en tiempo real, pero no ejecutan tareas fuera del chat.'
  },
  {
    id: '4',
    question: '¿Pueden acceder a mis datos?',
    answer: 'Nosotros (Hocuz Focuz) no podemos acceder a tus datos. Estos quedan almacenados en los servidores de OpenAI y están regidos por sus políticas de privacidad.'
  }
];

export default function SpiritsPage() {
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, delay: string, duration: string}>>([]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    idea: '',
    name: '',
    email: '',
    subscribeNewsletter: true
  });

  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'spirit_idea',
    source: 'spirit_ideas'
  });
  const { handleMouseMove, handleMouseLeave } = useDynamicGradient();

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitToMake({
      name: formData.name,
      email: formData.email,
      idea: formData.idea,
      subscribeNewsletter: formData.subscribeNewsletter
    });

    if (success) {
      setFormData({ idea: '', name: '', email: '', subscribeNewsletter: true });
    }
  };

  const showExamples = () => {
    const examples = [
      "Un Spirit especializado en análisis de datos de marketing que pueda interpretar métricas de redes sociales y sugerir estrategias de contenido.",
      "Un GPT que ayude a emprendedores a estructurar sus ideas de negocio y crear planes de acción paso a paso.",
      "Un asistente IA para escritores que pueda ayudar con la estructura narrativa, desarrollo de personajes y corrección de estilo.",
      "Un Spirit de productividad que analice tus hábitos de trabajo y sugiera mejoras específicas para tu rutina diaria.",
      "Un GPT especializado en finanzas personales que ayude a crear presupuestos y analizar gastos de manera simple."
    ];
    
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setFormData(prev => ({ ...prev, idea: randomExample }));
    document.getElementById('spirit-idea')?.focus();
  };

  useEffect(() => {
    // Crear partículas flotantes optimizadas
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    try {
      const grid = document.getElementById('gpts');
      if (grid) {
        const obs = new IntersectionObserver((entries, o) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { try { trackEvent({ action: 'view_spirits_grid', category: 'Spirits', label: 'grid' }); } catch {} ; o.disconnect(); }
          });
        }, { threshold: 0.4 });
        obs.observe(grid);
      }
      const ideas = document.getElementById('ideas-spirits');
      if (ideas) {
        const obs2 = new IntersectionObserver((entries, o) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { try { trackEvent({ action: 'view_spirits_ideas', category: 'Spirits', label: 'ideas_section' }); } catch {} ; o.disconnect(); }
          });
        }, { threshold: 0.4 });
        obs2.observe(ideas);
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] text-white overflow-x-hidden">
      {/* Partículas de fondo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-cyan-400/50 rounded-full animate-pulse hover:scale-150 hover:bg-cyan-400 transition-all duration-300"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>

      {/* Header Glass */}
      <HeaderGlass 
        pageTitle="🪄 Hocuz Focuz"
        showGhostLogo={false}
        customLinks={[
          { href: '/servicios', label: 'Servicios' },
          { href: '#gpts', label: 'Spirits' },
          { href: '#caracteristicas', label: 'Características' },
          { href: '#faq', label: 'FAQ' }
        ]}
        ctaButton={{
          text: "🤖 Agentes IA",
          onClick: () => { try { trackEvent({ action: 'click_header_cta', category: 'Spirits', label: 'agentes_ia' }); } catch {} ; window.location.href = '/productos' }
        }}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="inicio" className="pt-32 pb-20 relative">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Contenido del Hero */}
              <div className="text-left">
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent leading-tight"
                >
                  ✨ Spirits: inteligencia<br className="hidden md:block" />
                  <span className="block md:inline">artificial con alma propia.</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 leading-relaxed max-w-2xl"
                >
                  Descubre una nueva dimensión de la inteligencia artificial. Los Spirits no son bots genéricos: tienen una esencia única para guiarte, inspirarte y devolverte claridad en cada conversación.
                </motion.p>
                <motion.button 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 active:from-pink-600 active:to-purple-700 text-white font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-pink-500/30 active:scale-95 w-full sm:w-auto relative z-10 cursor-pointer touch-manipulation"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try { trackEvent({ action: 'click_hero_cta', category: 'Spirits', label: 'explorar_spirits' }); } catch {}
                    console.log('Botón clickeado'); // Debug
                    const gptsSection = document.querySelector('#gpts');
                    console.log('Sección encontrada:', gptsSection); // Debug
                    if (gptsSection) {
                      const headerHeight = 80;
                      const elementPosition = gptsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                      console.log('Haciendo scroll a:', elementPosition); // Debug
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    } else {
                      console.error('No se encontró la sección #gpts');
                    }
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Touch end en botón'); // Debug
                    const gptsSection = document.querySelector('#gpts');
                    if (gptsSection) {
                      const headerHeight = 80;
                      const elementPosition = gptsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  🪄 Explorar Spirits
                </motion.button>
              </div>

              {/* Imagen del Ghost */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="relative"
                >
                  {/* Efecto de brillo detrás de la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
                  
                  {/* Imagen principal */}
                  <div className="relative z-10 group">
                    <img 
                      src="/ghost image.png" 
                      alt="Ghost GPT - IA Fantasmal" 
                      className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto drop-shadow-2xl filter drop-shadow-cyan-400/30 transition-all duration-500 group-hover:drop-shadow-cyan-400/50 group-hover:brightness-110 scale-x-[-1]"
                    />
                  </div>

                  {/* Partículas flotantes alrededor de la imagen */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-20 right-16 w-1.5 h-1.5 bg-purple-500/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-16 left-20 w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-purple-500/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                    
                    {/* Partículas adicionales con movimiento más complejo */}
                    <div className="absolute top-1/2 left-0 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute top-1/3 right-0 w-1.5 h-1.5 bg-purple-500/50 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                    <div className="absolute bottom-1/3 left-0 w-1 h-1 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.2s' }}></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Ghost GPTs Section */}
        <section id="gpts" className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Spirits disponibles
            </h2>
            <p className="text-lg text-center text-white/70 mb-12 sm:mb-16 max-w-3xl mx-auto">
              No hables con un bot. Conecta con un Spirit.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {spirits.map((spirit, index) => (
                <Link
                  key={spirit.id}
                  href={`/spirit-gpts/${spirit.slug}`}
                  className="group bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-400 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-400/30 relative overflow-hidden"
                  onClick={() => { try { trackEvent({ action: 'click_spirit_card', category: 'Spirits', label: spirit.slug }); } catch {} }}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {spirit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{spirit.name}</h3>
                  <p className="text-cyan-400 text-sm font-medium mb-4">{spirit.subtitle}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">{spirit.description}</p>
                  <span className="inline-block bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 px-4 py-2 rounded-full text-xs font-medium">
                    {spirit.buttonText}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo Funcionan Section */}
        <section id="como-funcionan" className="py-12">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-2 text-white"
            >
              👻 Cómo Funcionan los Spirits
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center text-gray-400 mb-12"
            >
              Proceso simple para invocar tus Spirits digitales
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold text-white mb-2">Elige tu Spirit</h3>
                <p className="text-gray-400">Explora la lista de Spirits y selecciona el que mejor encaje con lo que necesitas.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold text-white mb-2">Haz la invocación</h3>
                <p className="text-gray-400">Completa un formulario rápido (la ofrenda simbólica) para recibir el acceso.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold text-white mb-4">Empieza la conversación</h3>
                <p className="text-gray-400">Abre el chat y plantea tu primera pregunta o idea.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="py-16 sm:py-20 bg-white/2 backdrop-blur-[10px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-5">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-white"
            >
              ¿Por Qué Elegir Spirits?
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/3 backdrop-blur-[15px] rounded-2xl border border-white/5 hover:border-cyan-400/20 transition-all duration-300"
                >
                  <div className="text-5xl mb-6 text-cyan-400">{feature.icon}</div>
                  <h4 className="text-xl font-bold mb-4 text-white">{feature.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner - Servicios de Automatización IA */}
        <section className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-600/20 to-blue-500/20 backdrop-blur-[10px]"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-5 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight"
            >
              ¿Necesitas un Asistente IA 100% personalizado para tu negocio?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-white/80 mb-8 leading-relaxed"
            >
              <span>Los Spirits son solo el comienzo. Si necesitas un asistente de IA completamente adaptado a tus procesos específicos,</span><br />
              <span className="text-cyan-400 font-semibold">mi servicio de automatización IA es la solución definitiva.</span>
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => { try { trackEvent({ action: 'click_cta', category: 'Spirits', label: 'diagnostico_automatizacion' }); } catch {} ; window.location.href = '/servicios/automatizacion-ia' }}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300"
              >
                📅 Agendar una sesión de diagnóstico
              </button>
              <button 
                onClick={() => { try { trackEvent({ action: 'click_cta', category: 'Spirits', label: 'explorar_productos' }); } catch {} ; window.location.href = '/productos' }}
                className="px-10 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-full font-bold text-xl hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                🐨 Explorar Asistentes IA disponibles
              </button>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-white/60 mt-6"
            >
              ⚡ Diagnóstico de 45 minutos • Plan personalizado • 70% OFF en lanzamiento
            </motion.p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 sm:py-20 bg-white/3 backdrop-blur-[15px]">
          <div className="max-w-4xl mx-auto px-4 sm:px-5">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 text-white"
            >
              Preguntas sobre Spirits
            </motion.h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    className="w-full text-left bg-white/5 backdrop-blur-[20px] hover:bg-white/10 rounded-xl p-6 transition-all duration-300 border border-white/10 hover:border-cyan-400/50"
                    onClick={() => { try { trackEvent({ action: 'click_faq', category: 'Spirits', label: String(index) }); } catch {} ; toggleFAQ(index); }}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white pr-4 flex items-center">
                        <span className="text-cyan-400 mr-3">🪄</span>
                        {faq.question}
                      </h3>
                      <span className={`text-cyan-400 text-2xl transform transition-transform duration-300 ${openFAQ === index ? 'rotate-45' : ''}`}>+</span>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-white/10 backdrop-blur-[15px] rounded-b-xl p-6 border-l-4 border-cyan-400 mx-4">
                      <p className="text-white/70 text-base sm:text-lg leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ideas de Spirits Section */}
        <section id="ideas-spirits" className="py-16 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-pink-500/10 backdrop-blur-[10px]"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                ✨ Convoca un nuevo Spirit
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
                ¿Tienes en mente un Spirit que aún no existe? Déjalo aquí y quizá lo invoquemos pronto.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-6 sm:p-8"
            >
            {submitMessage && (
              <div className={`w-full mb-6 p-4 rounded-xl text-center font-medium ${
                submitMessage.includes('Gracias') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {submitMessage}
              </div>
            )}
            <form onSubmit={(e) => { try { trackEvent({ action: 'submit_spirit_idea', category: 'Spirits', label: 'ideas_form' }); } catch {} ; handleSubmit(e); }} className="space-y-6">

                <div>
                  <label htmlFor="spirit-idea" className="block text-sm font-medium text-white/90 mb-3">
                    👻 Breve descripción del Spirit que imaginas
                  </label>
                  <textarea
                    id="spirit-idea"
                    name="idea"
                    value={formData.idea}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={800}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 resize-none"
                    placeholder="Ejemplo: Un Spirit especializado en análisis de datos de marketing que pueda interpretar métricas de redes sociales y sugerir estrategias..."
                    required
                  />
                  <div className="text-right text-xs text-white/50 mt-1">
                    {formData.idea.length}/800 caracteres
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-3">
                    👤 Tu nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-3">
                    ✉️ Tu correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="subscribeNewsletter"
                    name="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-400/50 focus:ring-2"
                  />
                  <label htmlFor="subscribeNewsletter" className="text-sm text-white/80 leading-relaxed">
                  Quiero recibir actualizaciones sobre nuevos Spirits y contenido de IA por correo electrónico
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.idea.trim() || !formData.name.trim() || !formData.email.trim()}
                  className="w-full px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none flex items-center justify-center"
                >
                  <span className="mr-2">
                    {isSubmitting ? '⏳' : '✨'}
                  </span>
                  {isSubmitting ? 'Enviando...' : 'Enviar convocatoria'}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="py-12 sm:py-16 border-t border-white/10 text-center relative z-10 bg-white/1 backdrop-blur-[5px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-5">
          <div className="text-white/60">
            <p className="text-sm sm:text-base">&copy; 2025 Spirits. Todos los derechos reservados en todas las dimensiones.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
