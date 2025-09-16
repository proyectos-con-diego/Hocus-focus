'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeaderGlass from '../../../components/HeaderGlass';
import { Spirit } from '../../../data/spirits';
import { getSpiritLandingById } from '../../../data/spirit-landings';
import Link from 'next/link';
import SpiritLeadForm from '../../../components/SpiritLeadForm';
import VinxiSpiritForm from '../../../components/VinxiSpiritForm';
import OKRoSpiritForm from '../../../components/OKRoSpiritForm';
import GrillaSpiritForm from '../../../components/GrillaSpiritForm';
import NosferatuSpiritForm from '../../../components/NosferatuSpiritForm';
import TatarotoSpiritForm from '../../../components/TatarotoSpiritForm';
import PromptifySpiritForm from '../../../components/PromptifySpiritForm';
import CriptoferSpiritForm from '../../../components/CriptoferSpiritForm';
// Removed direct Sanity import - using API route instead
import { getReadingContext } from '../../../data/blog';

interface SpiritPageProps {
  spirit: Spirit;
}

export default function SpiritPage({ spirit }: SpiritPageProps) {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, left: string, top: string, delay: string, duration: string}>>([]);
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '', subscribeNewsletter: true });
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');

  // Funciones para el formulario de newsletter
  const handleNewsletterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewsletterData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewsletter(true);
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/tally-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newsletterData,
          source: `spirit-${spirit.slug}`
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNewsletterMessage('¡Gracias! Te has suscrito exitosamente.');
        setNewsletterData({ name: '', email: '', subscribeNewsletter: true });
      } else {
        setNewsletterMessage(result.error || 'Error al suscribirse');
      }
    } catch (error) {
      setNewsletterMessage('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

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

  // Fetch artículos de API route
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoadingArticles(true);
        setArticlesError(null);
        
        // Fetch from API route instead of direct Sanity query
        const response = await fetch('/api/articles?limit=3');
        const data = await response.json();
        
        if (data.success && data.articles) {
          // Filter articles for AI and projects categories
          const filteredArticles = data.articles.filter((article: any) => 
            article.category === "Inteligencia artificial" || 
            article.category === "Proyectos y productos"
          ).slice(0, 3);
          
          setLatestArticles(filteredArticles);
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

  return (
    <div className="min-h-screen bg-black text-gray-300 overflow-x-hidden">
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

      <HeaderGlass 
        pageTitle="🪄 Hocus Focus"
        ctaButton={{
          text: "🐨 Asistentes IA",
          onClick: () => window.location.href = '/productos'
        }}
        customLinks={[
          { href: '/productos', label: 'Asistentes IA' },
          { href: '/servicios', label: 'Servicios' },
          { href: '/blog', label: 'Blog' },
          { href: '/sobre-mi', label: 'Sobre Mí' }
        ]}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-5">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="text-8xl mb-6">{spirit.icon}</div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-white">{spirit.name.split(' ')[0]}</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {spirit.name.split(' ')[1]}
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-cyan-400 mb-8 font-medium">
                {spirit.subtitle}
              </p>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {(() => {
                  const landing = getSpiritLandingById(spirit.id);
                  return landing ? landing.description : spirit.description;
                })()}
              </p>
            </motion.div>

                                    <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="flex justify-center items-center"
                        >
                          <button
                            onClick={() => {
                              // Lista de Spirits que tienen formularios personalizados
                              const spiritsWithForms = [
                                'vinxi-spirit', 'okro-spirit', 'grilla-spirit', 
                                'nosferatu-spirit', 'tataroto-spirit', 
                                'promptify-spirit', 'cryptopher-spirit'
                              ];
                              
                              if (spiritsWithForms.includes(spirit.slug)) {
                                // Scroll hacia el formulario del Spirit
                                const formSection = document.getElementById('spirit-form');
                                if (formSection) {
                                  formSection.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                  });
                                }
                              } else {
                                // Comportamiento normal para otros Spirits
                                setIsLeadFormOpen(true);
                              }
                            }}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                          >
                            {(() => {
                              const landing = getSpiritLandingById(spirit.id);
                              return landing ? landing.buttonText : `🎁 Obtener ${spirit.name} Gratis`;
                            })()}
                          </button>
                        </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-5 bg-gray-900/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Superpoderes de</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {spirit.name}
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Descubre todas las capacidades que este Spirit tiene para ofrecerte
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(() => {
                const landing = getSpiritLandingById(spirit.id);
                const features = landing ? landing.features : spirit.features;
                
                return features.map((feature: string, index: number) => {
                  // Extraer el título (antes del guión) y la descripción (después del guión)
                  const [title, description] = feature.split(' - ');
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8 text-center cursor-pointer transition-all duration-400 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-400/30 relative overflow-hidden"
                    >
                      {/* Efecto de brillo en hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
                      
                      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        ✨
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
                      <p className="text-gray-400 leading-relaxed">{description}</p>
                    </motion.div>
                  );
                });
              })()}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Casos de uso para</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {spirit.name}
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Situaciones específicas donde este Spirit puede ser tu mejor aliado
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {(() => {
                const landing = getSpiritLandingById(spirit.id);
                const useCases = landing ? landing.useCases : spirit.useCases;
                
                return useCases.map((useCase: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white">Caso {index + 1}</h3>
                    <p className="text-gray-300 leading-relaxed">{useCase}</p>
                  </motion.div>
                ));
              })()}
            </div>
          </div>
        </section>

        {/* Formularios personalizados de Spirits */}
        {spirit.slug === 'vinxi-spirit' && (
          <section id="spirit-form" className="py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <VinxiSpiritForm />
              </motion.div>
            </div>
          </section>
        )}
        {spirit.slug === 'okro-spirit' && (
          <section id="spirit-form" className="py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <OKRoSpiritForm />
              </motion.div>
            </div>
          </section>
        )}
        {spirit.slug === 'grilla-spirit' && (
          <section id="spirit-form" className="py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <GrillaSpiritForm />
              </motion.div>
            </div>
          </section>
        )}
        {spirit.slug === 'nosferatu-spirit' && (
          <section id="spirit-form" className="py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <NosferatuSpiritForm />
              </motion.div>
            </div>
          </section>
        )}
        {spirit.slug === 'tataroto-spirit' && (
          <section id="spirit-form" className="py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <TatarotoSpiritForm />
              </motion.div>
            </div>
          </section>
        )}
        {spirit.slug === 'promptify-spirit' && (
          <section id="spirit-form" className="py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <PromptifySpiritForm />
              </motion.div>
            </div>
          </section>
        )}
        {spirit.slug === 'cryptopher-spirit' && (
          <section id="spirit-form" className="py-16 px-5">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <CriptoferSpiritForm />
              </motion.div>
            </div>
          </section>
        )}

                            {/* Final CTA Section */}
                    <section className="py-20 px-6 bg-gradient-to-r relative overflow-hidden" style={{
                      background: 'linear-gradient(to right, #7c3aed, #4c1d95)'
                    }}>
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                        >
                          <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight">
                            ¿Necesitas más que un Spirit?
                          </h2>
                          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                            <span>Si quieres un asistente IA completamente personalizado para tus procesos específicos, puedo crear algo único para ti.</span><br />
                            <span className="text-purple-300 font-semibold">Empieza con automatización personalizada.</span>
                          </p>
                          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/servicios/automatizacion-ia">
                              <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300">
                                🚀 Automatización IA Personalizada
                              </button>
                            </Link>
                            <Link href="/productos">
                              <button className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white hover:text-purple-900 transition-all duration-300">
                                🐨 Ver Asistentes IA Completos
                              </button>
                            </Link>
                          </div>
                        </motion.div>
                      </div>
                    </section>

        {/* Artículos Recientes sobre IA */}
        <section className="py-20 px-5 bg-gray-900/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">Artículos</span>{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Relacionados
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Contenido relevante sobre inteligencia artificial y proyectos de productividad
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
                latestArticles.map((article: any, index: number) => {
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
            
            
            {/* Banner de Suscripción */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="max-w-6xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
                    boxShadow: '0 0 0 4px #a21caf55, 0 0 40px 8px #a21caf33'
                  }} />
                  <div className="relative bg-[#181a2a] bg-opacity-90 rounded-3xl text-center py-16 px-12">
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                      <span className="text-4xl md:text-5xl">🎁</span> <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Suscríbete y recibe recursos exclusivos</span>
                    </h3>
                    <p className="text-white/90 mb-10 text-lg max-w-3xl mx-auto leading-relaxed">
                      Artículos y recursos sobre productividad, IA y optimización, sin ruido innecesario.
                    </p>
                    
                    {newsletterMessage && (
                      <div className={`w-full max-w-5xl mx-auto mb-6 p-4 rounded-xl text-center font-medium ${
                        newsletterMessage.includes('Gracias') 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {newsletterMessage}
                      </div>
                    )}
                    
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col xl:flex-row gap-6 max-w-5xl mx-auto" role="form" aria-label="Formulario de suscripción al newsletter">
                      <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <input 
                          type="text" 
                          name="name"
                          value={newsletterData.name}
                          onChange={handleNewsletterInputChange}
                          className="w-full md:w-1/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
                          placeholder="Tu nombre" 
                          aria-label="Nombre para suscripción"
                          required
                        />
                        <input 
                          type="email" 
                          name="email"
                          value={newsletterData.email}
                          onChange={handleNewsletterInputChange}
                          className="w-full md:w-2/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
                          placeholder="Tu mejor email" 
                          aria-label="Email para suscripción"
                          required
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmittingNewsletter || !newsletterData.name.trim() || !newsletterData.email.trim() || !newsletterData.subscribeNewsletter}
                        className="px-10 py-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 whitespace-nowrap"
                        aria-label="Suscribirse al newsletter"
                      >
                        {isSubmittingNewsletter ? 'Suscribiendo...' : 'Suscribirme'}
                      </button>
                    </form>
                    
                    <div className="flex items-start space-x-3 mt-6 max-w-5xl mx-auto">
                      <input
                        type="checkbox"
                        id="subscribeNewsletter"
                        name="subscribeNewsletter"
                        checked={newsletterData.subscribeNewsletter}
                        onChange={handleNewsletterInputChange}
                        className="mt-1 w-4 h-4 text-pink-500 bg-white/10 border-white/20 rounded focus:ring-pink-400/50 focus:ring-2"
                      />
                      <label htmlFor="subscribeNewsletter" className="text-sm text-white/80 leading-relaxed">
                        Quiero recibir artículos y recursos exclusivos en mi email.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
                      </div>
          </section>

          {/* Navegación final */}
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  <span className="text-lg">←</span> Volver al inicio
                </Link>
                <Link 
                  href="/spirit-gpts"
                  className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 font-medium"
                >
                  Volver a Spirits <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

      {/* Lead Form Modal */}
      <SpiritLeadForm
        spirit={spirit}
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
      />
    </div>
  );
}
