'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import HeaderGlass from '../../components/HeaderGlass';
import { motion } from 'framer-motion';
// Removed direct Sanity import - using API route instead
import CompaniesBanner from '../../components/CompaniesBanner';
import { getReadingContext } from '../../data/blog';
import SobreMiFAQSection from '../../components/SobreMiFAQSection';

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': 'okro panda',
    'Grilla Viralis': 'Grilla',
    'Jaime Daily': 'Jaime Daily',
    'Navio': 'Navio | Lobo',
    'Bafet': 'Bafet',
    'Midas': 'Midas',
    'Vinxi': 'Vinxi',
    'Mythos': 'Mythos'
  };
  
  return imageMapping[productName] || productName;
}

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
        gradient: "from-blue-500 to-cyan-600",
        text: "text-blue-400",
      };
    case "TDAH":
      return {
        gradient: "from-green-500 to-emerald-600",
        text: "text-green-400",
      };
    default:
      return {
        gradient: "from-purple-500 to-pink-500",
        text: "text-purple-400",
      };
  }
}

// Función para calcular el tiempo de lectura
function calculateReadingTime(body: any): number {
  if (!Array.isArray(body)) return 1;
  try {
    const words = body.reduce((total: number, block: any) => {
      if (block._type === "block" && block.children) {
        return total + block.children.reduce((blockTotal: number, child: any) => {
          return blockTotal + (child.text || "").split(/\s+/).length;
        }, 0);
      }
      return total;
    }, 0);
    return Math.max(1, Math.ceil(words / 200));
  } catch (error) {
    console.error('Error calculando tiempo de lectura:', error);
    return 3; // Tiempo por defecto
  }
}

export default function SobreMiExperimentalPage() {
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'superpoderes' | 'ideales'>('superpoderes');
  const [showFullJourney, setShowFullJourney] = useState(false);



  const toggleJourney = () => {
    setShowFullJourney(!showFullJourney);
  };

  // Fetch artículos de API route
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoadingArticles(true);
        setArticlesError(null);
        
        // Fetch from API route instead of direct Sanity query
        const response = await fetch('/api/articles?limit=3');
        const data = await response.json();
        
        console.log('📊 Datos recibidos de API:', data);
        
        if (data.success && data.articles) {
          setLatestArticles(data.articles);
          console.log('✅ Artículos cargados:', data.articles.length);
        } else {
          throw new Error(data.error || 'Error al obtener artículos');
        }
      } catch (err) {
        console.error('Error cargando artículos:', err);
        setArticlesError(err instanceof Error ? err.message : 'Error desconocido al cargar artículos');
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchArticles();
  }, []);

  // Datos memoizados para evitar recreaciones
  const skillsData = React.useMemo(() => [
    {
      icon: "🧠",
      title: "Cerebro Modular",
      description: "Diseño sistemas personalizados, visuales y sostenibles para mentes no-lineales, creativas o saturadas, diseñados para que confíes en ellos (y los disfrutes).",
      color: "from-cyan-400 to-blue-500",
      keyTakeaway: "→ Si tu mente es un enjambre, el sistema debe ser tu colmena."
    },
    {
      icon: "👁️",
      title: "Visión de Marketero",
      description: "Combino estructura y emoción: diseño planes de marketing con cabeza fría pero contenido con personalidad. Porque un embudo sin historia no convierte, y una historia sin foco no escala.",
      color: "from-yellow-400 to-orange-500",
      keyTakeaway: "→ Las ideas se recuerdan por lo que dicen, pero se miden por lo que logran."
    },
    {
      icon: "🧩",
      title: "Descomplicador de la matrix",
      description: "Traduzco flujos confusos, metas vagas y operaciones dispersas en estructuras claras, visuales y accionables. De la pizarra mental al tablero real.",
      color: "from-purple-500 to-pink-500",
      keyTakeaway: "→ Cuando todo se ve claro, todo empieza a moverse."
    }
  ], []);

  const idealsData = React.useMemo(() => [
    {
      icon: "🧠",
      title: "Colaboración sin fricción",
      description: "Me gusta cuando trabajar en equipo no se siente como empujar un camión. Roles claros, flujos compartidos y comunicación honesta.",
      color: "from-green-400 to-emerald-500",
      keyTakeaway: "→ Si no fluye, no funciona."
    },
    {
      icon: "📊",
      title: "Métricas con sentido",
      description: "Me interesa trabajar en entornos donde los números no son decoración, sino brújula. Las métricas deben reflejar progreso real y facilitar la tomar de decisiones.",
      color: "from-blue-400 to-cyan-500",
      keyTakeaway: "→ Lo que no guía, estorba."
    },
    {
      icon: "🎨",
      title: "Espacio para la creatividad",
      description: "El trabajo no tiene que ser cuadrado. Me motiva estar en entornos donde las ideas raras tienen permiso de salir a jugar.",
      color: "from-yellow-400 to-orange-500",
      keyTakeaway: "→ Si todo ya está definido, ¿para qué estamos pensando?"
    },
    {
      icon: "🌱",
      title: "Impacto sostenible",
      description: "No creo en soluciones que solo sirven en una presentación. Prefiero construir cosas que duren, que crezcan con el tiempo y que sigan funcionando cuando nadie las está mirando.",
      color: "from-purple-400 to-pink-500",
      keyTakeaway: "→ Lo elegante es que siga funcionando."
    }
  ], []);

  const journeyData = React.useMemo(() => [
    // Grupo 1: Primeros pasos
    {
      type: 'group-title',
      title: '🚀 Primeros Pasos en el Mundo Digital',
      subtitle: '2015-2019: Descubriendo el poder de la tecnología'
    },
    {
      year: "2015",
      title: "Marketing de espectáculos, mi primer CRM 🐣",
      description: "Como asistente de marketing, canjes y premios en una productora de TV, mi trabajo era conseguir cosas: premios, almuerzos, auspicios. No había control de proveedores, así que armé mi primer sistema de seguimiento. No lo sabía, pero acababa de crear mi primer CRM.",
      color: "border-orange-500"
    },
    {
      year: "2016",
      title: "Coordinador digital sobre petróleo e hidrocarburos 📍",
      description: "Aporté un poco de aire fresco (y digital) a una industria muy tradicional. Rediseñé su web, creé su nueva presencia digital y ayudé a integrar procesos internos con herramientas digitales. También me acerqué al mundo del marketing político y las relaciones públicas.",
      color: "border-yellow-500"
    },
    {
      year: "2016+",
      title: "Founder | GoodFellas 👕",
      description: "Probé ser mi propio jefe. Creé una marca de ropa desde cero: desde la idea, pasando por el diseño, hasta la producción. Aprendí a transformar una idea en algo tangible, manteniendo su esencia creativa mientras enfrentaba las limitaciones reales de emprender.",
      color: "border-pink-400"
    },
    {
      year: "2017",
      title: "Atención al cliente en startup europea 🌍",
      description: "Entré a una startup griega con operaciones globales. Todo en inglés. Aprendí sobre flujos, escalabilidad, y cómo mantener la experiencia del cliente en entornos cambiantes. Desarrollé escucha activa, comunicación intercultural y resolución de conflictos con empatía.",
      color: "border-teal-400"
    },
    {
      year: "2018",
      title: "Hello, Marketing, Old Friend 💬",
      description: "Volví a marketing. Me tocó construir el tono de voz de una marca desde cero, darle dirección a su contenido y lograr que se sintiera local. Aporté estructura a su comunicación y conseguimos posicionarla en el top of mind de los usuarios.",
      color: "border-indigo-400"
    },
    {
      year: "2019",
      title: "Marketing 2.0 🚀",
      description: "El marketing digital se volvió más táctico: influencers, campañas offline, promociones cruzadas. Todo tenía que alinearse a objetivos globales. Comencé a interesarme por cómo los sistemas y procesos podían facilitar el trabajo en equipo.",
      color: "border-blue-400"
    },

    // Grupo 2: Adaptación y reinvención
    {
      type: 'group-title',
      title: '🔄 Adaptación y Reinvención',
      subtitle: '2020-2022: Aprendiendo a hacer más con menos'
    },
    {
      year: "2020",
      title: "Llegó la pandemia 🦠",
      description: "Aprendí a hacer más con menos: menos presupuesto, menos personas, menos certezas. Me apoyé en sistemas y métricas para sobrevivir al caos de llevar 3 mercados en simultáneo.",
      color: "border-gray-400"
    },
    {
      year: "2020+",
      title: "Trader autodidacta 📈",
      description: "Descubrí el mundo cripto. Empecé a construir mis propios trackers para entender mejor mis inversiones. La lógica, el riesgo y la estrategia se volvieron parte de mi día a día.",
      color: "border-green-400"
    },
    {
      year: "2021",
      title: "Un quiebre inesperado 💥",
      description: "Lideraba campañas con marcas e influencers y colaboraba con la regionalización del CRM… hasta que la empresa cerró. Me obligó a repensar el sentido de lo que hacía. Y así empezó todo.",
      color: "border-red-400"
    },
    {
      year: "2022",
      title: "Primeros sistemas funcionando 📊",
      description: "Sin trabajo estable, decidí construir mis propios sistemas en Notion para organizarme: ideas, libros, salud, contenido, dinero, tareas. Todo tenía su tablero. Todo se podía medir o automatizar. Fue el inicio de una nueva manera de pensar mi productividad. Desde entonces desarrollé más de 10 apps en Notion que se convirtieron en mi laboratorio personal, y que luego inspiraron mis productos actuales.",
      color: "border-purple-400"
    },

    // Grupo 3: Evolución hacia la IA
    {
      type: 'group-title',
      title: '🧠 Evolución hacia la Inteligencia Artificial',
      subtitle: '2023-2025: Integrando tecnología y humanidad'
    },
    {
      year: "2023",
      title: "Marketero con cerebro dividido 🧠",
      description: "Volví al marketing con una visión más sistémica. Conecté lo estratégico con lo operativo y vi cómo mis sistemas hacían la diferencia: más impacto con menos reuniones. Comencé a interesarme por cómo podían facilitar el trabajo en equipo, así que decidí escalar lo que había creado.",
      color: "border-orange-400"
    },
    {
      year: "2024",
      title: "Optimizador de procesos 🔧",
      description: "Consolidé mi obsesión por identificar cuellos de botella. Rediseñé flujos, tableros y sistemas reales que los equipos usaban. Incursioné en la programación e hice mis primeras integraciones con inteligencia artificial para que la tecnología haga el trabajo pesado sin complicar el camino. Más simple, más claro, más útil.",
      color: "border-cyan-400"
    },
    {
      year: "2025",
      title: "Máster y Diseñador de soluciones con IA 🎓",
      description: "Seguí profundizando en inteligencia artificial con un máster que me ayudó a unir piezas, integrando lo técnico con lo narrativo. Lanzar Hocus Focus fue el paso natural: ahora diseño productos y soluciones que combinan IA, automatización y estructuras centradas en las personas.",
      color: "border-yellow-400"
    }
  ], []);

  const productsData = React.useMemo(() => [
    {
      name: "Jaime Daily",
      description: "Sistema de gestión de hábitos y rutinas diarias",
      result: "95% de usuarios reportan mejoras en 30 días",
      color: "from-green-500 to-emerald-600",
      emoji: "🐔"
    },
    {
      name: "Vinxi",
      description: "Sistema de gestión de proyectos todo-en-uno",
      result: "Ahorro promedio de 15 horas semanales",
      color: "from-blue-500 to-cyan-500",
      emoji: "🦊"
    },
    {
      name: "Grilla Viralis",
      description: "Base de datos para gestión de múltiples clientes",
      result: "71% de descuento - De $99 a $29",
      color: "from-green-500 to-green-600",
      emoji: "🦗"
    },
    {
      name: "OKRo",
      description: "Sistema de seguimiento de objetivos y resultados medibles",
      result: "38% de descuento - De $47 a $29",
      color: "from-blue-600 to-blue-500",
      emoji: "🐼"
    }
  ], []);

  const projectsData = React.useMemo(() => [
    {
      icon: "🛍️",
      title: "GoodFellas",
      description: "E-commerce de polos divertidos inspirados en memes. Diseños únicos y humor que conecta con la cultura digital actual.",
      badge: "E-COMMERCE",
      badgeText: "Tienda online - Productos disponibles",
      status: "Activo",
      gradient: "from-pink-500 to-purple-500"
    },
    {
      icon: "🔮",
      title: "Mystical Insights",
      description: "Blog sobre tarot práctico donde comparto interpretaciones, lecturas y consejos para aplicar la sabiduría del tarot en la vida cotidiana.",
      badge: "TAROT",
      badgeText: "Blog activo - Actualizaciones semanales",
      status: "Activo",
      gradient: "from-purple-500 to-blue-500"
    }
  ], []);

  const socialData = React.useMemo(() => [
    { icon: "💼", name: "LinkedIn", handle: "Diego Gonzalez Vaccaro", url: "https://www.linkedin.com/in/diego-gonzalez-v/", color: "text-cyan-400 hover:text-cyan-300", bgColor: "bg-cyan-500/20" },
    { icon: "📸", name: "Instagram", handle: "@proyectoscondiego", url: "https://www.instagram.com/proyectoscondiego/", color: "text-yellow-400 hover:text-yellow-300", bgColor: "bg-yellow-500/20" },
    { icon: "📺", name: "YouTube", handle: "@ProyectosconDiego", url: "https://www.youtube.com/@ProyectosconDiego", color: "text-red-400 hover:text-red-300", bgColor: "bg-red-500/20" },
    { icon: "📧", name: "Email", handle: "proyectoscondiego@gmail.com", url: "mailto:proyectoscondiego@gmail.com", color: "text-orange-400 hover:text-orange-300", bgColor: "bg-orange-500/20" }
  ], []);



  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Fondo estrellado sutil - igual que la página principal */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradiente radial sutil - púrpura/rosa/azul como en la principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20"></div>
        {/* Gradientes radiales adicionales para profundidad */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
      `}</style>
      {/* Header Glass con colores híbridos */}
      <HeaderGlass 
        pageTitle="👤 Diego Gonzalez"
        showGhostLogo={false}
        customLinks={[
          { href: '/productos', label: 'Asistentes IA' },
          { href: '/servicios', label: 'Servicios' },
          { href: '/blog', label: 'Blog' },
          { href: '#contact', label: 'Contacto' }
        ]}
        ctaButton={{
          text: "🚀 Ver servicios",
          onClick: () => {
            const servicesSection = document.querySelector('[data-section="services"]');
            if (servicesSection) {
              const headerHeight = 80;
              const elementPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
              });
            }
          }
        }}
      />

      {/* Hero Section Híbrido */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 relative min-h-screen flex items-center">
        {/* Partículas CSS optimizadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full animate-float"
              style={{
                left: `${(i * 12.5) + 5}%`,
                top: `${(i * 15) + 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contenido del Hero */}
            <div className="text-left">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-white">Hola, soy</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-cyan-400 bg-clip-text text-transparent">
                  Diego Gonzalez
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Marketero especializado en{' '}
                <span className="text-cyan-400 font-semibold">automatizaciones con IA</span> y{' '}
                <span className="text-yellow-400 font-semibold">optimización de procesos</span>.
                <br /><br />
                Ayudo a equipos y profesionales a trabajar con menos fricción y más resultados, liberando tiempo para enfocarse en lo que realmente importa.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button 
                  onClick={() => {
                    const productsSection = document.querySelector('[data-section="products"]');
                    if (productsSection) {
                      const headerHeight = 80;
                      const elementPosition = productsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/30"
                >
                  🚀 Ver mi trabajo
                </button>
                <button 
                  onClick={() => {
                    const contactSection = document.querySelector('[data-section="contact"]');
                    if (contactSection) {
                      const headerHeight = 80;
                      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold text-lg rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105"
                >
                  📧 Contactar
                </button>
              </motion.div>
            </div>

            {/* Imagen/Avatar del Hero */}
            <div className="relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative"
              >
                {/* Efecto de brillo híbrido */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-cyan-400/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
                
                {/* Avatar placeholder con colores híbridos */}
                <div className="relative z-10 w-80 h-80 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-cyan-400 flex items-center justify-center text-6xl font-bold text-black shadow-2xl shadow-yellow-400/30">
                  👤
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Conóceme Más */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Conóceme</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
                Más
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Descubre mis superpoderes y los principios que guían mi trabajo
            </p>
          </motion.div>

          {/* Pestañas */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 flex">
              <button
                onClick={() => setActiveTab('superpoderes')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'superpoderes'
                    ? 'bg-gradient-to-r from-yellow-400 to-cyan-400 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🦸 Superpoderes
              </button>
              <button
                onClick={() => setActiveTab('ideales')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'ideales'
                    ? 'bg-gradient-to-r from-yellow-400 to-cyan-400 text-black shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                💎 Mis Ideales
              </button>
            </div>
          </motion.div>

          {/* Contenido de las pestañas */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'superpoderes' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/30 transition-all duration-300 group-hover:scale-105">
                      <div className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                        {skill.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{skill.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-6">{skill.description}</p>
                      {skill.keyTakeaway && (
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50 rounded-full text-sm font-medium text-cyan-400">
                          {skill.keyTakeaway}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'ideales' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {idealsData.map((ideal, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/30 transition-all duration-300 group-hover:scale-105">
                      <div className={`w-16 h-16 bg-gradient-to-r ${ideal.color} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                        {ideal.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{ideal.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-6">{ideal.description}</p>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-600/50 rounded-full text-sm font-medium text-cyan-400">
                        {ideal.keyTakeaway}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Sección de Experiencia Híbrida */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Mi</span>{' '}
              <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              De consultor corporativo a emprendedor independiente
            </p>
          </motion.div>

                    <div className="space-y-8">
                      {/* Timeline principal - versión colapsada */}
                      {!showFullJourney && (
                        <>
                          {/* Primer milestone - 2015 */}
                          <motion.div
                            className="relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0 }}
                          >
                            <div className="flex items-start gap-6">
                              <div className="relative">
                                <div className={`w-20 h-20 rounded-full border-4 ${journeyData[1].color} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                                  {journeyData[1].year}
                                </div>
                                <div className="absolute left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-gray-600 to-transparent"></div>
                              </div>
                              <div className="flex-1 pt-2">
                                <h3 className="text-2xl font-bold text-white mb-3">{journeyData[1].title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{journeyData[1].description}</p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Separador visual */}
                          <div className="text-center my-12">
                            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto opacity-60"></div>
                          </div>

                          {/* Último milestone - 2025 */}
                          <motion.div
                            className="relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                          >
                            <div className="flex items-start gap-6">
                              <div className="relative">
                                <div className={`w-20 h-20 rounded-full border-4 ${journeyData[journeyData.length - 1].color} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-xl font-bold text-white shadow-lg`}>
                                  {journeyData[journeyData.length - 1].year}
                                </div>
                              </div>
                              <div className="flex-1 pt-2">
                                <h3 className="text-2xl font-bold text-white mb-3">{journeyData[journeyData.length - 1].title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{journeyData[journeyData.length - 1].description}</p>
                              </div>
                            </div>
                          </motion.div>

                          {/* Botón para expandir - debajo de todo */}
                          <div className="text-center mt-16">
                            <motion.button
                              onClick={toggleJourney}
                              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/25"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="flex items-center justify-center gap-3">
                                <span className="text-xl">🚀</span>
                                <span>Ver mi historia completa</span>
                                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
                              </span>
                            </motion.button>
                            <p className="text-gray-400 text-center mt-4 max-w-lg mx-auto text-sm">
                              Descubre cómo llegué de crear mi primer CRM en 2015 a diseñar soluciones con IA en 2025
                            </p>
                          </div>
                        </>
                      )}

                      {/* Timeline expandido - versión completa */}
                      {showFullJourney && (
                        <>
                          {/* Línea de tiempo vertical */}
                          <div className="relative">
                            <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 rounded-full"></div>
                            
                            {/* Todos los milestones */}
                            {journeyData.map((item, index) => {
                              if (item.type === 'group-title') {
                                // Renderizar título de grupo
                                return (
                                  <motion.div
                                    key={`group-${index}`}
                                    className="relative mb-16 mt-20 first:mt-0"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                  >
                                    <div className="text-center mb-8">
                                      <h2 className="text-3xl font-bold text-white mb-2">{item.title}</h2>
                                      <p className="text-gray-400 text-lg">{item.subtitle}</p>
                                    </div>
                                  </motion.div>
                                );
                              } else {
                                // Renderizar milestone normal
                                return (
                                  <motion.div
                                    key={`${item.year}-${item.title}`}
                                    className="relative mb-12 last:mb-0"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                  >
                                    <div className="flex items-start gap-8">
                                      {/* Círculo del milestone */}
                                      <div className="relative flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-full border-4 ${item.color} bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-lg font-bold text-white shadow-lg`}>
                                          {item.year}
                                        </div>
                                      </div>
                                      
                                      {/* Contenido del milestone */}
                                      <div className="flex-1 pt-1">
                                        <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                        <p className="text-gray-300 text-lg leading-relaxed">{item.description}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              }
                            })}
                          </div>

                          {/* Botón para colapsar */}
                          <div className="text-center mt-16">
                            <motion.button
                              onClick={toggleJourney}
                              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="flex items-center justify-center gap-2">
                                <span>Ver menos</span>
                                <span className="transition-transform duration-300">↑</span>
                              </span>
                            </motion.button>
                          </div>
                        </>
                      )}
                    </div>
        </div>
      </section>

      {/* Banner Han confiado en mi trabajo */}
      <CompaniesBanner />

      {/* Servicios Destacados */}
      <section 
        data-section="services"
        className="py-20"
      >
        <div className="max-w-6xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Servicios</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Destacados
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Especialidades que han generado resultados medibles para mis clientes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Plan de Marketing",
                description: "Genera más leads y clientes con una estrategia clara. → Avanza con confianza, sin improvisar.",
                originalPrice: "$120",
                currentPrice: "$35",
                badge: "CONVERT",
                badgeColor: "from-orange-500 to-red-500",
                buttonColor: "from-orange-500 to-red-500",
                slug: "/servicios/plan-marketing"
              },
              {
                icon: "🏢",
                title: "Sistema SCALE",
                description: "Escala tu negocio con un sistema digital organizado. → Delegar sin dolores de cabeza.",
                originalPrice: "$120",
                currentPrice: "$35",
                badge: "SCALE",
                badgeColor: "from-purple-500 to-blue-500",
                buttonColor: "from-purple-500 to-blue-500",
                slug: "/servicios/sistema-scale"
              },
              {
                icon: "🤖",
                title: "Automatización IA",
                description: "Automatiza 3 procesos clave y ahorra 8–15h semanales. → Gana tiempo para clientes y crecimiento.",
                originalPrice: "$120",
                currentPrice: "$35",
                badge: "IA",
                badgeColor: "from-cyan-500 to-blue-500",
                buttonColor: "from-cyan-500 to-blue-500",
                slug: "/servicios/automatizacion-ia"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/30 transition-all duration-300 group-hover:scale-105 flex flex-col">
                  {/* Badge */}
                  {service.badge && (
                    <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${service.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {service.badge}
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.buttonColor} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                    {service.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{service.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-cyan-400">{service.currentPrice}</span>
                      {service.originalPrice !== service.currentPrice && (
                        <span className="text-gray-500 line-through text-lg">{service.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-xs text-purple-300 font-semibold mt-2">Sesión de diagnóstico (70% OFF)</div>
                  </div>
                  
                  {/* Features - Ahora ocupa el espacio disponible */}
                  <div className="space-y-2 mb-6 flex-1">
                    {service.badge === "CONVERT" && (
                      <>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Plan detallado en 2-3 semanas
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Metodología probada que funciona
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Coordinación completa opcional
                        </div>
                      </>
                    )}
                    {service.badge === "SCALE" && (
                      <>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Visibilidad 24/7 de equipo y proyectos
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Procesos listos para delegar
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Decisiones basadas en datos reales
                        </div>
                      </>
                    )}
                    {service.badge === "IA" && (
                      <>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          8-15 horas semanales liberadas
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Automatizaciones que funcionan 24/7
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <span className="text-green-400 mr-2">✓</span>
                          Supera a competencia tradicional
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* CTA Button - Ahora está pegado al fondo */}
                  <Link href={service.slug} className={`w-full px-6 py-3 bg-gradient-to-r ${service.buttonColor} text-white font-bold rounded-lg hover:scale-105 transition-all duration-300 transform block text-center mt-auto`}>
                    Ver Detalle del Servicio
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Trabajo Contigo */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Cómo trabajo</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                contigo
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Proceso simple y transparente para transformar tu productividad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Diagnóstico personalizado</h3>
              <p className="text-gray-400">Sesión de 45 minutos donde analizamos tu situación actual y identificamos oportunidades de mejora.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Plan de acción detallado</h3>
              <p className="text-gray-400">Te entrego un roadmap específico con pasos claros, cronograma y métricas de éxito.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Implementación y seguimiento</h3>
              <p className="text-gray-400">Te acompaño durante todo el proceso, ajustando estrategias según los resultados obtenidos.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section 
        data-section="products"
        className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50"
      >
        <div className="max-w-6xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Productos</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
                Destacados
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Asistentes de IA que han revolucionado la productividad de mis clientes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {productsData.map((product, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/30 transition-all duration-300 group-hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl flex items-center justify-center mb-6 overflow-hidden`}>
                    <img 
                      src={`/Cabezas pets/${getPetImageName(product.name)}.png`}
                      alt={`${product.name} mascota`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback al emoji si la imagen no carga
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = 'text-3xl';
                        fallback.textContent = product.emoji;
                        target.parentNode?.insertBefore(fallback, target);
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{product.description}</p>
                  <div className="text-cyan-400 font-semibold text-lg">{product.result}</div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Botón "Ver todos" sutil */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={() => window.location.href = '/productos'}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-400/50 hover:bg-gray-700/70 transition-all duration-300 rounded-lg group"
            >
              <span className="text-sm font-medium">Ver todos los productos</span>
              <span className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Otros Proyectos */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Otros</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Proyectos
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Iniciativas personales y colaboraciones que me apasionan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-cyan-400/30 transition-all duration-300 group-hover:scale-105">
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`bg-gradient-to-r ${project.gradient} text-white px-4 py-1 rounded-full text-xs font-bold shadow`}>
                      {project.badge}
                    </span>
                    <span className="text-xs text-gray-400">{project.badgeText}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${project.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6`}>
                    {project.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-bold text-2xl text-white mb-4">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
                  
                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 font-semibold text-sm">{project.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mis Últimos Artículos */}
      <section className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Mis Últimos</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Artículos
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Reflexiones y metodologías que he desarrollado para optimizar procesos y productividad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {loadingArticles ? (
              <div className="col-span-3 text-center text-gray-500 py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                Cargando artículos...
              </div>
            ) : articlesError ? (
              <div className="col-span-3 text-center text-red-400 py-16">
                <div className="mb-4">⚠️ Error al cargar artículos</div>
                <p className="text-sm text-gray-400 mb-4">{articlesError}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Reintentar
                </button>
              </div>
            ) : latestArticles.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-16">
                <div>No hay artículos publicados aún.</div>
                <div className="text-sm text-gray-600 mt-2">
                  Estado: {loadingArticles ? 'Cargando...' : 'Cargado'} | 
                  Artículos: {latestArticles.length} | 
                  Error: {articlesError || 'Ninguno'}
                </div>
              </div>
            ) : (
              latestArticles.map((article, index) => {
                try {
                  const category = article.category;
                  const colorClasses = getCategoryColorClasses(category);
                  const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' }) : '';
                  const readingTime = calculateReadingTime(article.body);
                  const context = getReadingContext(readingTime);
                  
                  return (
                    <motion.div
                      key={article._id}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={article.slug ? `/blog/${article.slug}` : "#"} className="block">
                        <article className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-105 h-full">
                          {/* Franja de color */}
                          <div className={`h-2 bg-gradient-to-r ${colorClasses.gradient}`}></div>
                          
                          {/* Imagen del artículo */}
                          <div className="relative h-48 overflow-hidden">
                            {article.mainImage ? (
                              <img 
                                src={typeof article.mainImage === 'string' ? article.mainImage : article.mainImage.asset?.url} 
                                alt={article.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "/blog-default.png";
                                }}
                              />
                            ) : (
                              <img 
                                src="/blog-default.png" 
                                alt="Imagen por defecto del blog" 
                                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-300" 
                                loading="lazy"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              {/* Etiqueta de categoría */}
                              <span className={`text-xs font-semibold bg-gray-900/60 px-3 py-1 rounded-full border border-gray-700/40 ${colorClasses.text}`}>
                                {category || 'Sin categoría'}
                              </span>
                              <span className={`flex items-center gap-1 text-xs font-semibold ${context.color}`}>
                                <span>{context.icon}</span>
                                <span>{readingTime} min</span>
                              </span>
                            </div>
                            
                            <h3 className="font-bold text-lg text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                              {article.title}
                            </h3>
                            
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                              {article.excerpt || ''}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col items-start">
                                <span className="text-xs text-gray-500 mb-0.5">{publishedDate}</span>
                                <span className="text-xs text-gray-400 font-medium">
                                  Por {article.author?.name || article.author || "Diego Gonzalez"}
                                </span>
                              </div>
                              <span className={`${context.color} text-xs font-medium bg-gray-700/50 px-2 py-1 rounded-md border border-gray-600/30`}>
                                {context.label}
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  );
                } catch (error) {
                  console.error(`Error renderizando artículo ${index}:`, error);
                  return (
                    <div 
                      key={`error-${index}`}
                      className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-xl shadow-purple-500/10"
                    >
                      <p className="text-red-400 text-sm">Error al cargar este artículo</p>
                    </div>
                  );
                }
              })
            )}
          </div>
          
          {/* Botón "Ver todos los artículos" */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-gray-300 hover:text-white hover:border-cyan-400/50 hover:bg-gray-700/70 transition-all duration-300 rounded-lg group"
            >
              <span className="text-sm font-medium">Ver todos los artículos</span>
              <span className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <SobreMiFAQSection />

      {/* Contactemos */}
      <section 
        id="contact"
        data-section="contact"
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-5">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">¡</span>
              <span className="bg-gradient-to-r from-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                Contactemos
              </span>
              <span className="text-white">!</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Conectemos y exploremos cómo puedo ayudarte a optimizar tu negocio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Redes Sociales */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Mis Redes Sociales</h3>
              <div className="space-y-4">
                {socialData.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.bgColor} rounded-xl p-4 border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300 block group`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">{social.name}</div>
                        <div className={`${social.color} text-sm`}>{social.handle}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Formulario de Contacto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Envíame un Mensaje</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="¿En qué puedo ayudarte?"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-yellow-400 text-black font-bold rounded-lg hover:from-cyan-300 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105"
                >
                  📧 Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Híbrido */}
      <section className="py-20 bg-gradient-to-r from-yellow-400/10 via-orange-500/10 to-cyan-400/10">
        <div className="max-w-4xl mx-auto text-center px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">¿Listo para</span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-cyan-400 bg-clip-text text-transparent">
                transformar tu productividad?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Únete a quienes ya están viendo resultados con mis sistemas automatizados
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/servicios" 
                className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-yellow-400/30 flex items-center justify-center gap-3"
              >
                <span>🚀</span>
                <span>Ver mis servicios</span>
              </a>
              <a 
                href="/productos" 
                className="px-10 py-4 border-2 border-cyan-400 text-cyan-400 font-bold text-xl rounded-full hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <span>📦</span>
                <span>Explorar productos</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Híbrido */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center px-5">
          <div className="flex justify-center space-x-6 mb-6">
            {[
              { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/diego-gonzalez-v/", color: "text-cyan-400 hover:text-cyan-300" },
              { icon: "📸", label: "Instagram", url: "https://www.instagram.com/proyectoscondiego/", color: "text-yellow-400 hover:text-yellow-300" },
              { icon: "📺", label: "YouTube", url: "https://www.youtube.com/@ProyectosconDiego", color: "text-red-400 hover:text-red-300" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl ${social.color} transition-colors duration-300`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <p className="text-gray-500">
            © 2025 Diego Gonzalez Vaccaro. Combinando{' '}
            <span className="text-yellow-400">creatividad</span> con{' '}
            <span className="text-cyan-400">tecnología</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
