'use client';

import { useEffect, useState } from 'react';

interface EngagementData {
  timeOnPage: number;
  scrollDepth: number;
  interactions: number;
  lastActivity: Date;
}

interface EngagementTrackerProps {
  articleId: string;
  onEngagementUpdate?: (data: EngagementData) => void;
}

export default function EngagementTracker({ 
  articleId, 
  onEngagementUpdate 
}: EngagementTrackerProps) {
  const [engagement, setEngagement] = useState<EngagementData>({
    timeOnPage: 0,
    scrollDepth: 0,
    interactions: 0,
    lastActivity: new Date()
  });

  useEffect(() => {
    let startTime = Date.now();
    let interval: NodeJS.Timeout;
    let maxScroll = 0;

    // Tracking de tiempo en página
    const updateTimeOnPage = () => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      setEngagement(prev => ({
        ...prev,
        timeOnPage,
        lastActivity: new Date()
      }));
    };

    // Tracking de scroll depth
    const updateScrollDepth = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        setEngagement(prev => ({
          ...prev,
          scrollDepth: maxScroll,
          lastActivity: new Date()
        }));
      }
    };

    // Tracking de interacciones
    const trackInteraction = () => {
      setEngagement(prev => ({
        ...prev,
        interactions: prev.interactions + 1,
        lastActivity: new Date()
      }));
    };

    // Event listeners
    window.addEventListener('scroll', updateScrollDepth);
    window.addEventListener('click', trackInteraction);
    window.addEventListener('keydown', trackInteraction);
    window.addEventListener('touchstart', trackInteraction);

    // Actualizar cada 5 segundos
    interval = setInterval(updateTimeOnPage, 5000);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', updateScrollDepth);
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('keydown', trackInteraction);
      window.removeEventListener('touchstart', trackInteraction);
    };
  }, []);

  // Notificar cambios de engagement
  useEffect(() => {
    if (onEngagementUpdate) {
      onEngagementUpdate(engagement);
    }
  }, [engagement, onEngagementUpdate]);

  // Enviar datos al servidor cada 30 segundos
  useEffect(() => {
    const sendEngagementData = () => {
      // Aquí puedes enviar los datos a tu analytics
      console.log('Engagement Data:', {
        articleId,
        ...engagement
      });
    };

    const interval = setInterval(sendEngagementData, 30000);
    return () => clearInterval(interval);
  }, [articleId, engagement]);

  return null; // Componente invisible
} 