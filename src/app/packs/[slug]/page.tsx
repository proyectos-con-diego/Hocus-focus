"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPackBySlug } from '../../../data/packs';

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': '/Personajes/Imagenes-Agentes/Okro/Cabeza/okro-cabeza-frontal.png',
    'Grilla Viralis': '/Personajes/Imagenes-Agentes/Grilla/Cabeza/Grilla-cabeza-frontal.png',
    'Jaime Daily': '/Personajes/Imagenes-Agentes/Jaime/Cabeza/Jaime-cabeza-frontal.png',
    'Navio': '/Personajes/Imagenes-Agentes/Lee-Navio/Cabeza/Lee-cabeza-frontal.png',
    'Bafet': '/Personajes/Imagenes-Agentes/Bafet/Cabeza/Bafet-cabeza-frontal.png',
    'Midas': '/Personajes/Imagenes-Agentes/Midas/Cabeza/Midas-cabeza-frontal.png',
    'Vinxi': '/Personajes/Imagenes-Agentes/Vinxi/Cabeza/Vinxi-frontal.png'
  };
  
  return imageMapping[productName] || productName;
}

// Importar la función para obtener productos
function getProductBySlug(slug: string) {
  const products = [
    {
      name: 'OKRo',
      slug: 'okro',
      avatarBg: 'linear-gradient(45deg, #1976d2, #64b5f6)',
      guarantee: {
        title: "Garantía de resultados medibles",
        description: "Tendrás claridad total sobre tus objetivos y progreso en los primeros días de uso, con un sistema que conecta cada tarea con tus resultados clave.",
        features: [
          "Claridad inmediata en objetivos",
          "Progreso visible y medible",
          "Conexión directa tareas-resultados"
        ]
      },
      proFeatures: [
        "Sistema completo de gestión de OKRs",
        "Modo Enfoque + Pomodoro integrado",
        "Sistema inteligente de priorización",
        "Vistas múltiples avanzadas",
        "Etiquetas personalizadas",
        "Botones de ayuda rápida",
        "Zoom In/Zoom Out",
        "Soporte prioritario"
      ]
    },
    {
      name: 'Vinxi',
      slug: 'vinxi',
      avatarBg: 'linear-gradient(45deg, #2196f3, #21cbf3)',
      guarantee: {
        title: "Garantía de organización total",
        description: "Tendrás control total de tus proyectos en los primeros 15 minutos de uso, con un sistema que se adapta a tu forma de pensar.",
        features: [
          "Organización inmediata",
          "Sistema intuitivo",
          "Control total de proyectos"
        ]
      },
      proFeatures: [
        "Sistema completo de gestión de tareas",
        "Modo Enfoque + Pomodoro",
        "Sistema inteligente de organización",
        "Vistas múltiples avanzadas",
        "Etiquetas personalizadas",
        "Botones de ayuda rápida",
        "Zoom In/Zoom Out",
        "Soporte prioritario"
      ]
    },
    {
      name: 'Jaime Daily',
      slug: 'jaime-daily',
      avatarBg: 'linear-gradient(45deg, #22c55e, #10b981)',
      guarantee: {
        title: "Garantía de progreso medible",
        description: "Tendrás evidencia visual clara de tu transformación personal, con métricas automáticas que te muestran exactamente qué tanto has avanzado en cada área de tu vida.",
        features: [
          "Progreso medible y visible",
          "Transformación documentada automáticamente",
          "Evidencia objetiva de tu crecimiento"
        ]
      },
      proFeatures: [
        "Sistema completo 3 en 1",
        "Automatización diaria",
        "Gamificación con insignias",
        "Diario personal integrado",
        "Acceso móvil optimizado",
        "Soporte por email incluido"
      ]
    },
    {
      name: 'Grilla Viralis',
      slug: 'grilla-viralis',
      avatarBg: 'linear-gradient(45deg, #4caf50, #8bc34a)',
      guarantee: {
        title: "Garantía de organización total",
        description: "Tendrás toda tu operación de contenido centralizada y organizada visualmente en un solo lugar, con mayor claridad que cualquier sistema que hayas usado antes.",
        features: [
          "Centralización completa de todos tus clientes",
          "Visibilidad total de proyectos y deadlines",
          "Procesos documentados y replicables"
        ]
      },
      proFeatures: [
        "Sistema completo de gestión de contenido",
        "Modo Enfoque + Pomodoro",
        "Sistema inteligente de organización",
        "Vistas múltiples avanzadas",
        "Etiquetas personalizadas",
        "Botones de ayuda rápida",
        "Zoom In/Zoom Out",
        "Soporte prioritario"
      ]
    }
  ];
  
  // Buscar por slug o por nombre (para manejar casos como "Grilla Viralis" -> "grilla-viralis")
  return products.find(p => p.slug === slug || p.name.toLowerCase().replace(' ', '-') === slug);
}

export default function PackPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Buscar el pack por slug
  const pack = getPackBySlug(slug);

  if (!pack) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Pack no encontrado</h1>
          <p className="text-gray-400 mb-8">El pack que buscas no existe.</p>
          {/* Espaciado reservado */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-br from-amber-500/20 to-purple-600/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
              {pack.name}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {pack.description}
            </p>
          </div>

          {/* Productos del pack */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            {pack.products.map((productName, index) => {
              const emoji = pack.emojis[index];
              const slug = productName.toLowerCase().replace(' ', '-');
              
              return (
                <React.Fragment key={productName}>
                  <div className="text-center hover:scale-105 transition-all duration-300">
                    <div className="mb-4 flex justify-center">
                      <img 
                                                 src={getPetImageName(productName)}
                        alt={`${productName} mascota`}
                        className="w-32 h-32 object-contain"
                        onError={(e) => {
                          // Fallback al emoji si la imagen no carga
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'mb-4';
                          fallback.style.fontSize = '8rem';
                          fallback.textContent = emoji;
                          target.parentNode?.insertBefore(fallback, target);
                        }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{productName}</h3>
                    <p className="text-lg text-gray-400 font-medium">
                      {slug === 'jaime-daily' && 'Hábitos'}
                      {slug === 'vinxi' && 'Proyectos'}
                      {slug === 'okro' && 'Objetivos'}
                      {slug === 'grilla-viralis' && 'Contenido'}
                      {slug === 'midas' && 'Finanzas'}
                      {slug === 'bafet' && 'Crypto'}
                      {slug === 'navio' && 'Colaboración'}
                    </p>
                  </div>
                  {index < pack.products.length - 1 && (
                    <div className="text-4xl font-bold text-purple-400">+</div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Precio */}
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 max-w-md mx-auto mb-8">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {pack.price}
            </div>
            <div className="text-lg text-gray-400 line-through mb-2">
              {pack.oldPrice}
            </div>
            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
              Pago único
            </div>
          </div>

          {/* CTA Principal */}
          <button className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300 mb-4">
            💳 Adquirir Pack
          </button>
          
          <p className="text-gray-400 text-sm">
            Acceso inmediato • Sin suscripciones • Garantía de 30 días
          </p>
        </div>
      </section>

      {/* Beneficios del pack */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            ¿Por qué elegir este pack?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-4">Ahorro Garantizado</h3>
              <p className="text-gray-300">
                Obtén ambos productos por menos del precio de uno solo. 
                Ahorro real y verificable.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-4">Acceso Inmediato</h3>
              <p className="text-gray-300">
                Descarga instantánea después del pago. 
                Sin esperas, sin complicaciones.
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-4">Garantía Total</h3>
              <p className="text-gray-300">
                30 días para probar sin riesgo. 
                Si no te convence, te devolvemos tu dinero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Características del pack */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            ¿Qué incluye este pack?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pack.products.map((productName, index) => {
              const slug = productName.toLowerCase().replace(' ', '-');
              const productData = getProductBySlug(slug);
              const emoji = pack.emojis[index];
              
              if (!productData) return null;
              
              const mainColor = productData.avatarBg.match(/#([0-9a-fA-F]{6})/g)?.[0] || '#4caf50';
              
              return (
                <div key={productName} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:scale-105 transition-all duration-300 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{emoji}</div>
                      <h3 className="text-2xl font-bold text-white">{productName}</h3>
                    </div>
                    <Link 
                      href={`/productos/${slug}`}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                    >
                      Conócelo más
                      <span className="ml-1">→</span>
                    </Link>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Acceso completo a todas las funcionalidades de {productName}
                  </p>
                  <ul className="space-y-3 flex-grow mb-6">
                    {productData.proFeatures.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <span className="mr-3" style={{ color: mainColor }}>✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Garantía del producto - Alineada al fondo */}
                  <div className="pt-6 border-t border-gray-700/50 mt-auto">
                    <h4 className="text-lg font-bold text-white mb-3" style={{ color: mainColor }}>
                      {productData.guarantee.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {productData.guarantee.description}
                    </p>
                    <div className="space-y-2">
                      {productData.guarantee.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <span className="mr-3" style={{ color: mainColor }}>✓</span>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-500/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para transformar tu productividad?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de usuarios que ya están maximizando sus resultados con este pack.
          </p>
          <button className="bg-gradient-to-r from-amber-500 to-purple-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300 mb-4">
            💳 Adquirir Pack Ahora
          </button>
          <p className="text-gray-400 text-sm">
            Acceso inmediato • Pago único • Sin suscripciones
          </p>
        </div>
      </section>

      {/* Espaciado adicional */}
      <section className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          {/* Espacio reservado para mantener el espaciado original */}
        </div>
      </section>
    </div>
  );
} 