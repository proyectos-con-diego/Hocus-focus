'use client';

import React from 'react';

interface StableRotatingHeadlineProps {
  phrases: string[];
  intervalMs?: number;
  className?: string; // classes for the text element (e.g., text-5xl ...)
}

export default function StableRotatingHeadline({ phrases, intervalMs = 3000, className = '' }: StableRotatingHeadlineProps) {
  const [index, setIndex] = React.useState(0);
  const measureRef = React.useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = React.useState<number>(0);
  const [isMeasuring, setIsMeasuring] = React.useState(true);

  // Rotate index
  React.useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), intervalMs);
    return () => clearInterval(id);
  }, [phrases, intervalMs]);

  // Measure tallest phrase (once and on resize)
  const measure = React.useCallback(() => {
    const node = measureRef.current;
    if (!node) return;
    
    // Reset all styles to get natural measurements
    Array.from(node.children).forEach((child) => {
      const el = child as HTMLElement;
      el.style.height = 'auto';
      el.style.width = 'auto';
      el.style.maxWidth = 'none';
      el.style.whiteSpace = 'normal';
    });
    
    // Force multiple reflows to ensure accurate measurements
    node.offsetHeight;
    node.offsetWidth;
    
    let tallest = 0;
    let widest = 0;
    
    Array.from(node.children).forEach((child) => {
      const el = child as HTMLElement;
      const rect = el.getBoundingClientRect();
      const h = rect.height;
      const w = rect.width;
      
      if (h > tallest) tallest = h;
      if (w > widest) widest = w;
    });
    
    // Add some padding to ensure no text is cut off
    const padding = 20;
    setMaxHeight(tallest + padding);
    setIsMeasuring(false);
  }, []);

  React.useEffect(() => {
    if (phrases.length === 0) return;
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(measure, 100);
    
    const ro = new ResizeObserver(() => {
      setIsMeasuring(true);
      setTimeout(measure, 50);
    });
    
    if (measureRef.current) ro.observe(measureRef.current);
    
    const onResize = () => {
      setIsMeasuring(true);
      setTimeout(measure, 50);
    };
    
    window.addEventListener('resize', onResize);
    
    return () => {
      clearTimeout(timeoutId);
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [measure, phrases.length]);

  return (
    <>
      {/* Offscreen measurer - invisible but takes up space */}
      <div 
        ref={measureRef} 
        className="fixed -z-10 top-0 left-0 w-full max-w-6xl px-6"
        style={{ 
          visibility: 'hidden',
          pointerEvents: 'none',
          position: 'absolute',
          top: '-9999px',
          left: '-9999px'
        }}
      >
        {phrases.map((t, k) => (
          <div 
            key={k} 
            className={`${className} whitespace-normal break-words`}
            style={{ 
              width: '100%',
              maxWidth: 'none',
              height: 'auto',
              minHeight: 'auto'
            }}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Actual display container */}
      <div 
        style={{ 
          height: maxHeight > 0 ? `${maxHeight}px` : 'auto',
          minHeight: isMeasuring ? '300px' : undefined
        }} 
        className="relative overflow-hidden" 
        aria-live="polite"
      >
        {phrases.map((t, k) => (
          <div
            key={k}
            className={`absolute inset-0 ${className} transition-opacity duration-500 ease-out will-change-transform whitespace-normal break-words flex items-center justify-center text-center ${k === index ? 'opacity-100' : 'opacity-0'}`}
            style={{
              padding: '0 1rem'
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </>
  );
}


