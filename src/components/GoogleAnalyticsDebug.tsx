'use client';

import { useEffect } from 'react';

export default function GoogleAnalyticsDebug() {
  useEffect(() => {
    // Solo mostrar en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Google Analytics Debug:');
      console.log('GA_ID from env:', process.env.NEXT_PUBLIC_GA_ID);
      console.log('GA_ID from window:', (window as any).gtag);
      console.log('DataLayer:', (window as any).dataLayer);
    }
  }, []);

  // Solo renderizar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      right: 0, 
      background: 'red', 
      color: 'white', 
      padding: '10px',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      GA Debug: {process.env.NEXT_PUBLIC_GA_ID || 'NO ID'}
    </div>
  );
}
