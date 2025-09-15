'use client';

import { useState, useEffect } from 'react';

interface LeadMagnetOptimizedProps {
  variant?: 'popup' | 'inline' | 'slide-in';
  trigger?: 'scroll' | 'time' | 'exit-intent' | 'manual';
  delay?: number;
  scrollThreshold?: number;
}

export default function LeadMagnetOptimized({
  variant = 'popup',
  trigger = 'scroll',
  delay = 30000,
  scrollThreshold = 70
}: LeadMagnetOptimizedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const showLeadMagnet = () => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    const handleScroll = () => {
      if (trigger === 'scroll') {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > scrollThreshold) {
          showLeadMagnet();
        }
      }
    };

    const handleExitIntent = (e: MouseEvent) => {
      if (trigger === 'exit-intent' && e.clientY <= 0) {
        showLeadMagnet();
      }
    };

    // Trigger por tiempo
    if (trigger === 'time') {
      timeout = setTimeout(showLeadMagnet, delay);
    }

    // Event listeners
    if (trigger === 'scroll') {
      window.addEventListener('scroll', handleScroll);
    }
    if (trigger === 'exit-intent') {
      document.addEventListener('mouseleave', handleExitIntent);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, [trigger, delay, scrollThreshold, hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setIsSubmitting(false);

    // Ocultar después de 3 segundos
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const leadMagnetContent = (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-8 shadow-2xl border border-purple-400/30 max-w-md mx-auto">
      <div className="text-center">
        <div className="mb-6">
          <span className="text-4xl mb-4 block">🎯</span>
          <h3 className="text-2xl font-bold text-white mb-2">
            ¡Optimiza tu Productividad!
          </h3>
          <p className="text-purple-100 text-lg mb-4">
            Descarga mi guía gratuita con las 10 estrategias que uso para multiplicar mi productividad por 3
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Tu mejor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-white/50"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Enviando...' : '🚀 Descargar Guía Gratuita'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <span className="text-4xl mb-4 block">✅</span>
            <h4 className="text-xl font-bold text-white mb-2">
              ¡Perfecto!
            </h4>
            <p className="text-purple-100">
              Revisa tu email para descargar la guía
            </p>
          </div>
        )}

        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );

  if (!isVisible) return null;

  if (variant === 'popup') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="animate-in slide-in-from-bottom-4 duration-300">
          {leadMagnetContent}
        </div>
      </div>
    );
  }

  if (variant === 'slide-in') {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-4 duration-300">
        {leadMagnetContent}
      </div>
    );
  }

  // Inline variant
  return (
    <div className="my-8 animate-in fade-in duration-300">
      {leadMagnetContent}
    </div>
  );
} 