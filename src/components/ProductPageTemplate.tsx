import React, { useState } from "react";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  text: string;
}

interface ProductPageTemplateProps {
  name: string;
  subtitle: string;
  slug: string;
  avatar: string;
  avatarBg: string; // gradiente principal
  mainColor: string; // color principal (ej: #4caf50)
  gradientCTA: string; // gradiente para el banner CTA
  buttonGradient: string; // gradiente para el botón principal
  buttonHover: string; // clase hover para el botón secundario
  textColor: string; // color para el botón volver a productos
  textColorHover: string; // color hover para el botón volver a productos
  audience: string;
  oldPrice?: string | null;
  price: string;
  features: string[];
  cta: string;
  faqs: FAQ[];
  testimonials?: Testimonial[];
  howItWorks: string[];
  bannerTitle: string;
  bannerText: React.ReactNode;
  bannerButton: string;
}

const ProductPageTemplate: React.FC<ProductPageTemplateProps> = ({
  name,
  subtitle,
  slug,
  avatar,
  avatarBg,
  mainColor,
  gradientCTA,
  buttonGradient,
  buttonHover,
  textColor,
  textColorHover,
  audience,
  oldPrice,
  price,
  features,
  cta,
  faqs,
  testimonials = [],
  howItWorks,
  bannerTitle,
  bannerText,
  bannerButton,
}) => {
  const [activeTab, setActiveTab] = useState('features');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="font-sans bg-black text-gray-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: '#111' }}>
        <div className="absolute inset-0 z-0" style={{ background: avatarBg, opacity: 0.18 }} />
        <div className="absolute inset-0 z-0 bg-black/80" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-6">
            <Link 
              href="/productos"
              className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${textColor} ${textColorHover}`}
              style={{ color: mainColor }}
            >
              ← Volver a productos
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent" style={{ background: avatarBg, WebkitBackgroundClip: 'text' }}>
                  {name}
                </span>
                <br />
                <span className="text-white">{subtitle}</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{audience}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transform transition-all duration-300" style={{ background: avatarBg, color: '#fff', boxShadow: `0 4px 32px 0 ${mainColor}33` }}>
                  {cta}
                </button>
                <button className="px-8 py-4 border-2 rounded-full font-semibold transition-all duration-300 group relative overflow-hidden" style={{ borderColor: mainColor, color: mainColor }}>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">📞 Ver demo en vivo</span>
                  <span className="absolute inset-0 bg-gradient-to-r group-hover:opacity-100 opacity-0 transition-opacity duration-300" style={{ background: avatarBg }} aria-hidden="true"></span>
                </button>
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                {features.slice(0, 3).map((f, i) => (
                  <div className="flex items-center" key={i}>
                    <span className="mr-2" style={{ color: mainColor }}>✓</span>
                    <span className="text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br rounded-2xl transform rotate-6 animate-pulse" style={{ background: avatarBg, opacity: 0.3 }}></div>
                <div className="relative bg-gradient-to-br rounded-2xl p-8 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500" style={{ background: avatarBg, minWidth: 320, maxWidth: 340 }}>
                  <div className="text-center">
                    <div className="text-7xl mb-4">{avatar}</div>
                    <div className="text-white font-bold text-2xl mb-2">{name}</div>
                    <div className="text-white/80 text-lg mb-2">{subtitle}</div>
                    {price === "Próximamente" ? (
                      <div className="mt-6 text-3xl font-extrabold text-white">Próximamente</div>
                    ) : (
                      <>
                        <div className="mt-4 text-3xl font-bold text-white">{price}</div>
                        {oldPrice && <div className="text-white/60 text-base line-through">{oldPrice}</div>}
                        <div className="text-white/80 text-base mt-1">por mes</div>
                      </>
                    )}
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
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'features' ? '' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              style={activeTab === 'features' ? { background: avatarBg, color: '#fff' } : {}}
            >
              ¿Es para mí?
            </button>
            <button 
              onClick={() => setActiveTab('how-it-works')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'how-it-works' ? '' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              style={activeTab === 'how-it-works' ? { background: avatarBg, color: '#fff' } : {}}
            >
              Cómo funciona
            </button>
            <button 
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'testimonials' ? '' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              style={activeTab === 'testimonials' ? { background: avatarBg, color: '#fff' } : {}}
            >
              Testimonios
            </button>
            <button 
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'faq' ? '' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              style={activeTab === 'faq' ? { background: avatarBg, color: '#fff' } : {}}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>
      {/* Tab Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'features' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-white">Características principales</h2>
                <p className="text-xl text-gray-400">Todo lo que {name} puede hacer por ti</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((f, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 transition-all duration-300">
                    <div className="text-4xl mb-4">{avatar}</div>
                    <h3 className="text-xl font-semibold text-white mb-3">{f}</h3>
                    <p className="text-gray-400 mb-4">{subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'how-it-works' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 text-white">¿Cómo funciona?</h2>
                <p className="text-xl text-gray-400">Así es como {name} te ayuda día a día</p>
              </div>
              <ol className="list-decimal list-inside space-y-4 text-lg text-gray-300 max-w-2xl mx-auto">
                {howItWorks?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 text-white">Testimonios</h2>
                <p className="text-xl text-gray-400">Lo que dicen los usuarios de {name}</p>
              </div>
              {testimonials?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.map((t, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50">
                      <div className="text-lg text-white mb-2 font-semibold">{t.name}</div>
                      <div className="text-gray-300">{t.text}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400">Aún no hay testimonios para este producto.</div>
              )}
            </div>
          )}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 text-white">Preguntas frecuentes</h2>
                <p className="text-xl text-gray-400">Resuelve tus dudas sobre {name}</p>
              </div>
              {faqs.length ? (
                <div className="max-w-2xl mx-auto space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx}>
                      <button
                        className={`w-full text-left bg-gray-800 rounded-xl p-6 transition-all duration-300 border border-gray-700 hover:border-[${mainColor}] focus:outline-none`}
                        onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                          <span className={`text-2xl`} style={{ color: mainColor, transition: 'transform 0.3s' }}>
                            <span className={openFAQ === idx ? 'rotate-45 inline-block transition-transform duration-300' : 'transition-transform duration-300'}>+</span>
                          </span>
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}> 
                        <div className="bg-gray-700/50 rounded-b-xl p-6 border-l-4 mx-4 text-left" style={{ borderColor: openFAQ === idx ? mainColor : 'transparent', borderLeftWidth: openFAQ === idx ? 4 : 0 }}>
                          <p className="text-gray-300 text-left">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400">Aún no hay preguntas frecuentes para este producto.</div>
              )}
            </div>
          )}
        </div>
      </section>
      {/* Banner CTA final */}
      <section className="py-20 px-6 bg-gradient-to-r relative overflow-hidden" style={{ background: gradientCTA }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight">{bannerTitle}</h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">{bannerText}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button
              className={`px-10 py-4 bg-gradient-to-r rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300 ${buttonGradient}`}
            >
              {bannerButton}
            </button>
            <button
              className={`px-10 py-4 border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white transition-all duration-300 ${buttonHover}`}
            >
              📞 Agendar consulta gratuita
            </button>
          </div>
        </div>
      </section>
      {/* Botón volver a productos */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <a 
            href="/productos"
            className={`inline-flex items-center gap-2 font-semibold transition-colors duration-300 ${textColor} ${textColorHover}`}
          >
            ← Volver a productos
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProductPageTemplate; 