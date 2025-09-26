'use client';

import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/analytics';

export default function GoogleAnalytics() {
  // Debug: mostrar información en consola
  console.log('🔍 GoogleAnalytics component rendering...');
  console.log('GA_TRACKING_ID:', GA_TRACKING_ID);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  // Solo renderizar si tenemos el ID
  if (!GA_TRACKING_ID) {
    console.log('❌ No GA_TRACKING_ID found, not rendering');
    return null;
  }
  
  console.log('✅ Rendering Google Analytics with ID:', GA_TRACKING_ID);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            console.log('🚀 Google Analytics script loading...');
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_location: window.location.href,
              page_title: document.title,
            });
            console.log('✅ Google Analytics configured with ID: ${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  );
}
