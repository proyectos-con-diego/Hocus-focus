'use client';
import React, { useState } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

interface BlogNewsletterSectionProps {
  source?: string;
}

export default function BlogNewsletterSection({ source = 'blog' }: BlogNewsletterSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subscribeNewsletter: true });
  
  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'newsletter',
    source: source
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitToMake(formData);

    if (success) {
      setFormData({ name: '', email: '', subscribeNewsletter: true });
    }
  };
  return (
    <div className="relative mt-16 rounded-3xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
        boxShadow: '0 0 0 4px #a21caf55, 0 0 40px 8px #a21caf33'
      }} />
      <div className="relative bg-[#181a2a] bg-opacity-90 rounded-3xl text-center py-16 px-12">
        <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
          <span className="text-3xl md:text-4xl">🎁</span> <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Suscríbete y recibe recursos exclusivos</span>
        </h3>
        <p className="text-white/90 mb-6 text-base">
          Artículos y recursos sobre productividad, IA y optimización, sin ruido innecesario.
        </p>
        
        {submitMessage && (
          <div className={`w-full max-w-4xl mx-auto mb-6 p-4 rounded-xl text-center font-medium ${
            submitMessage.includes('Gracias') || submitMessage.includes('Excelente') || submitMessage.includes('Perfecto')
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {submitMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full md:w-1/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
              placeholder="Tu nombre" 
              required
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full md:w-2/3 px-6 py-5 rounded-xl bg-white/20 text-white placeholder-white/70 border-none outline-none text-base focus:bg-white/30 transition-all duration-300" 
              placeholder="Tu mejor email" 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.subscribeNewsletter}
            className="px-10 py-5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 whitespace-nowrap"
          >
            {isSubmitting ? 'Suscribiendo...' : 'Suscribirme'}
          </button>
        </form>
        
        <div className="flex items-start space-x-3 mt-6 max-w-4xl mx-auto">
          <input
            type="checkbox"
            id="subscribeNewsletter"
            name="subscribeNewsletter"
            checked={formData.subscribeNewsletter}
            onChange={handleInputChange}
            className="mt-1 w-4 h-4 text-pink-500 bg-white/10 border-white/20 rounded focus:ring-pink-400/50 focus:ring-2"
          />
          <label htmlFor="subscribeNewsletter" className="text-sm text-white/80 leading-relaxed">
            Quiero recibir artículos y recursos exclusivos en mi email.
          </label>
        </div>
      </div>
    </div>
  );
} 