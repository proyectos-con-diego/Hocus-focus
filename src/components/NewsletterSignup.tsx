'use client';
import React, { useState } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  
  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'newsletter',
    source: 'newsletter-signup'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitToMake({
      name: email.split('@')[0], // Usar parte del email como nombre
      email: email,
      subscribeNewsletter: true
    });

    if (success) {
      setEmail('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative mt-16 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
          boxShadow: '0 0 0 4px #a21caf55, 0 0 40px 8px #a21caf33'
        }} />
        <div className="relative bg-[#181a2a] bg-opacity-90 rounded-3xl text-center py-10 px-6">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            ¿Quieres más contenido como este?
          </h3>
          <p className="text-white/90 mb-6 text-base">
            Recibe mis mejores reflexiones sobre productividad y optimización directamente en tu email.
          </p>
          
          {submitMessage && (
            <div className={`w-full max-w-md mx-auto mb-4 p-3 rounded-xl text-center font-medium text-sm ${
              submitMessage.includes('Gracias') 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {submitMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" role="form" aria-label="Formulario de suscripción al newsletter">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-sm focus:bg-white/30 transition-all duration-300" 
              placeholder="Tu mejor email" 
              aria-label="Email para suscripción"
              required
            />
            <button 
              type="submit" 
              disabled={isSubmitting || !email.trim()}
              className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold transition-all hover:scale-105 text-sm sm:text-base"
              aria-label="Suscribirse al newsletter"
            >
              {isSubmitting ? 'Suscribiendo...' : 'Suscribirme'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 