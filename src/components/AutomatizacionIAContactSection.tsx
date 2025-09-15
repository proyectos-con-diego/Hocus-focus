'use client';
import React, { useState } from 'react';

export default function AutomatizacionIAContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    tasks: ""
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
        businessType: "",
        tasks: ""
      });
    }, 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("¡Hola! Me interesa automatizar mi negocio tradicional. ¿Podrías darme más información sobre el proceso de 6 semanas?");
    const phoneNumber = "1234567890"; // Reemplazar con tu número real
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Footer CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-black to-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-4">👉 El primer paso para automatizar tu negocio.</h2>
          <p className="text-xl text-gray-400 mb-8">
            En 60 minutos te llevas un plan claro y accionable.
          </p>
          
          <a href="#contact" className="inline-block px-12 py-5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full font-black text-xl text-white uppercase tracking-wider shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-purple-500/40 mb-8">
            👉 QUIERO MI DIAGNÓSTICO DE AUTOMATIZACIÓN
          </a>
          
          <div className="flex justify-center gap-8 flex-wrap text-gray-300 text-sm">
            <span className="flex items-center gap-2"><span className="text-emerald-400">✔</span> Inicio en 3–5 días hábiles</span>
            <span className="flex items-center gap-2"><span className="text-emerald-400">✔</span> Roadmap accionable desde la primera semana</span>
            <span className="flex items-center gap-2"><span className="text-emerald-400">✔</span> El valor del diagnóstico se descuenta si avanzas al plan completo</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 px-6 bg-gray-800">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              🤖 Reserva Tu Auditoría Gratuita
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Tu nombre completo"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Tu mejor email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="WhatsApp (con código de país)"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
              
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="">¿Qué tipo de negocio tienes?</option>
                <option value="consultor">Consultor / Servicios profesionales</option>
                <option value="construccion">Construcción / Arquitectura</option>
                <option value="retail">Retail / Comercio</option>
                <option value="restaurante">Restaurante / Gastronomía</option>
                <option value="despacho">Despacho contable / legal</option>
                <option value="agencia">Agencia / Marketing</option>
                <option value="otro">Otro (especifica en comentarios)</option>
              </select>
              
              <textarea
                name="tasks"
                value={formData.tasks}
                onChange={handleInputChange}
                placeholder="Describe las 3 tareas que más tiempo te consumen y que más odias hacer en tu día a día"
                rows={3}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-vertical"
              />
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-bold hover:scale-105 transition-all duration-300 hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '⏳ Enviando...' : isSubmitted ? '✅ ¡Solicitud Enviada!' : '💬 Solicitar Auditoría Gratuita'}
              </button>
            </form>
            
            <p className="text-center text-gray-400 text-sm mt-6">
              📞 Te contacto en 24 horas para agendar tu auditoría gratuita de 30 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Footer Real */}
      <footer className="py-6 px-6 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-xs">
            © 2025 Automatización IA. Todos los derechos reservados.
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