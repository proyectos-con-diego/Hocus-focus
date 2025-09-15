'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxEffect() {
  const ticking = useRef(false);

  useEffect(() => {
    // Parallax effect for hero image with throttling
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroImage = document.querySelector('.hero-image') as HTMLElement;
          if (heroImage) {
            const speed = scrolled * 0.3;
            heroImage.style.transform = `translateY(${speed}px)`;
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; // Este componente no renderiza nada, solo maneja el efecto
} 