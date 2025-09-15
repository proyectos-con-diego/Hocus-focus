"use client";
import { useState } from 'react';

export default function LeadMagnetBanner() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simular envío (aquí puedes integrar con tu servicio de email)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Resetear después de 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6 text-center min-h-[600px] flex flex-col justify-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-green-400 mb-2">¡Gracias por suscribirte!</h3>
        <p className="text-gray-300 text-sm mb-4">
          Revisa tu email para confirmar tu suscripción y recibir tu regalo.
        </p>
        <div className="text-green-400 text-xs">
          ¡Bienvenido a la comunidad!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-purple-500/30 rounded-2xl p-6 min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">🎁</div>
        <h3 className="text-lg font-bold text-purple-400 mb-2">Regalo Exclusivo</h3>
        <p className="text-gray-400 text-xs uppercase tracking-wide">Para suscriptores del blog</p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Título del lead magnet */}
        <h4 className="text-xl font-bold text-white mb-3 text-center">
          Guía de Productividad
        </h4>
        
        {/* Descripción */}
        <div className="text-gray-300 text-sm mb-6 space-y-3">
          <p className="text-center">
            Descarga mi guía gratuita con las <strong>5 estrategias más efectivas</strong> para:
          </p>
          <ul className="space-y-2 text-left">
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              <span>Recuperar 10+ horas semanales</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              <span>Automatizar tareas repetitivas</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              <span>Optimizar tu flujo de trabajo</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span>
              <span>Mejorar tu enfoque y concentración</span>
            </li>
          </ul>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu mejor email"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !email}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Enviando...
              </span>
            ) : (
              'Descargar Guía Gratis'
            )}
          </button>
        </form>

        {/* Garantía */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            📧 Recibirás contenido de valor, sin spam. 
            <br />
            Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 pt-4 border-t border-gray-700/50">
        <p className="text-gray-500 text-xs">
          Únete a +500 profesionales que ya optimizaron su productividad
        </p>
      </div>
    </div>
  );
} 