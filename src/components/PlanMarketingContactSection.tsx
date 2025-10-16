'use client';
import React, { useState } from 'react';

export default function PlanMarketingContactSection() {
  const [form, setForm] = useState({ 
    nombre: '', 
    email: '', 
    tel: '', 
    situacion: '', 
    mensaje: '' 
  });
  const [formStatus, setFormStatus] = useState<'idle'|'sending'|'sent'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => {
        setFormStatus('idle');
        setForm({ nombre: '', email: '', tel: '', situacion: '', mensaje: '' });
      }, 2000);
    }, 1500);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola! Me interesa el Plan de Marketing CONVERT. ¿Podrías darme más información?');
    const phone = '1234567890'; // Cambia por tu número real
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <>
      {/* Footer CTA */}
      <section className="footer-cta py-16 bg-gradient-to-br from-black to-gray-900 text-center">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            ¿Vas a dejar que pase otro mes  sin leads consistentes?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Solo quedan <strong>3 cupos</strong> este mes. Da el primer paso para ganar claridad y empezar a crecer con confianza.
          </p>
          <a 
            href="#contact" 
            className="btn-primary px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full font-extrabold text-lg text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-block uppercase tracking-wider mb-6"
          >
            🚀 RESERVAR MI CUPO AHORA
          </a>
          <div className="footer-features flex flex-wrap justify-center gap-6 text-gray-400 text-sm mt-6">
            <span className="flex items-center gap-2">✅ Claridad inmediata para tu negocio</span>
            <span className="flex items-center gap-2">✅ Un plan de acción sin improvisar</span>
            <span className="flex items-center gap-2">✅ Acompañamiento experto y garantía total</span>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contact" className="contact-section py-12 bg-gray-900">
        <div className="container max-w-xl mx-auto px-4">
          <div className="contact-container">
            <div className="contact-form bg-gray-800/80 rounded-xl p-8 border border-gray-600">
              <h3 className="contact-title text-white text-center mb-6 text-2xl font-bold">
                🚀 Reserva Tu Plan de Marketing
              </h3>
              <form className="form-group flex flex-col gap-4" onSubmit={handleFormSubmit}>
                <input 
                  type="text" 
                  name="nombre" 
                  className="form-input px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white" 
                  placeholder="Tu nombre completo" 
                  required 
                  value={form.nombre} 
                  onChange={handleFormChange} 
                />
                <input 
                  type="email" 
                  name="email" 
                  className="form-input px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white" 
                  placeholder="Tu mejor email" 
                  required 
                  value={form.email} 
                  onChange={handleFormChange} 
                />
                <input 
                  type="tel" 
                  name="tel" 
                  className="form-input px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white" 
                  placeholder="WhatsApp (con código de país)" 
                  required 
                  value={form.tel} 
                  onChange={handleFormChange} 
                />
                <select 
                  name="situacion" 
                  className="form-input px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white" 
                  required 
                  value={form.situacion} 
                  onChange={handleFormChange}
                >
                  <option value="">¿Cuál es tu situación actual?</option>
                  <option value="startup">Startup/Nuevo negocio (0-10 leads/mes)</option>
                  <option value="creciendo">Negocio creciendo (10-30 leads/mes)</option>
                  <option value="establecido">Negocio establecido (30+ leads/mes)</option>
                  <option value="otro">Otra situación</option>
                </select>
                <textarea 
                  name="mensaje" 
                  className="form-input form-textarea px-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white min-h-[100px]" 
                  placeholder="Describe brevemente tu negocio y mayor desafío en marketing" 
                  required 
                  value={form.mensaje} 
                  onChange={handleFormChange} 
                />
                <button 
                  type="submit" 
                  className="btn-primary px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full font-extrabold text-lg text-white shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 inline-block uppercase tracking-wider disabled:opacity-60" 
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'idle' && '💬 Enviar y Agendar Llamada Estratégica'}
                  {formStatus === 'sending' && '⏳ Enviando...'}
                  {formStatus === 'sent' && '✅ ¡Mensaje Enviado!'}
                </button>
              </form>
              <p className="contact-note text-center text-gray-400 text-sm mt-4">
                📞 Te contactamos pronto para coordinar tu llamada estratégica gratuita
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Real */}
      <footer className="py-6 px-6 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-xs">
            © 2025 Hocuz Focuz. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <button
        className="floating-whatsapp fixed bottom-8 right-8 z-50 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-transform duration-300 animate-bounce hover:scale-110"
        onClick={handleWhatsApp}
        aria-label="WhatsApp"
      >
        <span className="text-white text-3xl">💬</span>
      </button>
    </>
  );
} 