'use client';
import React, { useState } from 'react';

export default function SistemaScaleContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    situation: "",
    challenge: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Resetear después de 3 segundos
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        situation: "",
        challenge: ""
      });
    }, 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("¡Hola! Me interesa el Sistema SCALE para transformar mi negocio. ¿Podrías darme más información?");
    const phoneNumber = "1234567890"; // Reemplazar con tu número real
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Banner CTA */}
      <section className="py-8 px-6 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">¿Listo para Transformar tu Negocio?</h3>
            <p className="text-gray-400 mb-6">
              Solo quedan <strong>5 cupos</strong> disponibles este mes. No dejes que otro mes pase en el caos operativo.
            </p>
            
            <a href="#contact" className="inline-block px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-black text-xl text-white uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-orange-500/40">
              🚀 RESERVAR MI DIAGNÓSTICO SCALE
            </a>
          </div>
          
          <div className="flex justify-center gap-8 flex-wrap text-gray-400 text-sm mb-8">
            <span className="flex items-center gap-2">✅ Sesión 1:1 de 60 minutos</span>
            <span className="flex items-center gap-2">✅ Documento con diagnóstico + roadmap inicial</span>
            <span className="flex items-center gap-2">✅ Presupuesto claro de implementación</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 px-6 bg-gradient-to-br from-gray-800 to-black">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              🚀 Reserva Tu Transformación Digital
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu mejor email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />
              
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="WhatsApp (con código de país)"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />
              
              <select
                name="situation"
                value={formData.situation}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:border-orange-500 focus:outline-none"
              >
                <option value="">¿Cuál describe mejor tu situación?</option>
                <option value="lider-equipo">Lidero un equipo de 3-15 personas</option>
                <option value="coach-consultor">Soy coach/consultor independiente</option>
                <option value="freelancer">Freelancer queriendo escalar</option>
                <option value="emprendedor">Emprendedor con negocio creciendo</option>
              </select>
              
              <textarea
                name="challenge"
                value={formData.challenge}
                onChange={handleInputChange}
                placeholder="Describe tu mayor desafío operativo: ¿qué problemas de organización/visibilidad te están frenando?"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-vertical"
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-black text-xl text-white uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '⏳ Enviando...' : isSubmitted ? '✅ ¡Mensaje Enviado!' : '💬 Enviar y Agendar Sesión Estratégica'}
              </button>
            </form>
            
            <p className="text-center text-gray-400 text-sm mt-6">
              📞 Te contacto en 2 horas para agendar tu sesión estratégica gratuita donde analizamos tu situación específica
            </p>
          </div>
        </div>
      </section>

      {/* Footer Real */}
      <footer className="py-6 px-6 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-xs">
            © 2025 Sistema SCALE. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <div 
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-110 animate-bounce"
      >
        <span className="text-white text-2xl">💬</span>
      </div>
    </>
  );
} 