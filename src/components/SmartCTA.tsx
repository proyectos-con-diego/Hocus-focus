'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SmartCTAProps {
  product: {
    nombre: string;
    slug: { current: string };
    descripcion?: string;
  };
  variant?: 'floating' | 'inline' | 'popup';
  trigger?: 'scroll' | 'time' | 'interaction';
  delay?: number;
}

export default function SmartCTA({ 
  product, 
  variant = 'floating', 
  trigger = 'scroll',
  delay = 30000 
}: SmartCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const showCTA = () => {
      if (!hasInteracted) {
        setIsVisible(true);
        setHasInteracted(true);
      }
    };

    const handleScroll = () => {
      if (trigger === 'scroll') {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 60) {
          showCTA();
        }
      }
    };

    const handleInteraction = () => {
      if (trigger === 'interaction') {
        showCTA();
      }
    };

    // Trigger por tiempo
    if (trigger === 'time') {
      timeout = setTimeout(showCTA, delay);
    }

    // Event listeners
    if (trigger === 'scroll') {
      window.addEventListener('scroll', handleScroll);
    }
    if (trigger === 'interaction') {
      window.addEventListener('click', handleInteraction);
      window.addEventListener('keydown', handleInteraction);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [trigger, delay, hasInteracted]);

  if (!isVisible) return null;

  const baseClasses = "transition-all duration-500 ease-out transform";
  
  const variantClasses = {
    floating: "fixed bottom-6 right-6 z-50 max-w-sm",
    inline: "my-8",
    popup: "fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  };

  const containerClasses = `${baseClasses} ${variantClasses[variant]}`;

  const ctaContent = (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl border border-purple-400/30">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-2">
            🚀 {product.nombre}
          </h3>
          {product.descripcion && (
            <p className="text-purple-100 text-sm mb-4">
              {product.descripcion}
            </p>
          )}
          <Link 
            href={`/productos/${product.slug.current}`}
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
          >
            Ver más detalles
            <span>→</span>
          </Link>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/70 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );

  if (variant === 'popup') {
    return (
      <div className={containerClasses}>
        {ctaContent}
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {ctaContent}
    </div>
  );
} 