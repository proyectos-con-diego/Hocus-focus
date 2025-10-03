'use client';

import React, { useEffect, useState } from 'react';
import { useMakeWebhook } from '../../../hooks/useMakeWebhook';
import { event as trackEvent } from '../../../lib/analytics';

interface BlogNewsletterFormProps {
  articleSlug?: string;
}

export default function BlogNewsletterForm({ articleSlug }: BlogNewsletterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscribeNewsletter: true
  });
  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'newsletter',
    source: 'blog-newsletter'
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
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      try { trackEvent({ action: 'submit_article_newsletter', category: 'Blog', label: articleSlug || 'sin_slug' }); } catch {}
      const response = await fetch('/api/notion-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: articleSlug ? `blog-article-${articleSlug}` : 'blog-article'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('¡Gracias! Te has suscrito exitosamente.');
        setFormData({ name: '', email: '', subscribeNewsletter: true });
        try { trackEvent({ action: 'article_newsletter_success', category: 'Blog', label: articleSlug || 'sin_slug' }); } catch {}
      } else {
        setSubmitMessage(result.error || 'Error al suscribirse');
        try { trackEvent({ action: 'article_newsletter_error', category: 'Blog', label: 'error_respuesta' }); } catch {}
      }
    } catch (error) {
      setSubmitMessage('Error de conexión. Inténtalo de nuevo.');
      try { trackEvent({ action: 'article_newsletter_error', category: 'Blog', label: 'error_conexion' }); } catch {}
    } finally {
      setIsSubmitting(false);
    }
  };

  // View newsletter
  useEffect(() => {
    try {
      const el = document.getElementById('article-newsletter');
      if (!el) return;
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            try { trackEvent({ action: 'view_article_newsletter', category: 'Blog', label: articleSlug || 'sin_slug' }); } catch {}
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observer.observe(el);
      return () => observer.disconnect();
    } catch {}
  }, [articleSlug]);

  return (
    <div id="article-newsletter" className="relative mt-16 rounded-3xl overflow-hidden shadow-2xl">
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
        
        {submitMessage && (
          <div className={`w-full max-w-4xl mx-auto mb-6 p-4 rounded-xl text-center font-medium ${
            submitMessage.includes('Gracias') 
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
