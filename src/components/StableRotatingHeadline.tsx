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
    
    // Reset heights to get accurate measurements
    Array.from(node.children).forEach((child) => {
      (child as HTMLElement).style.height = 'auto';
    });
    
    // Force a reflow
    node.offsetHeight;
    
    let tallest = 0;
    Array.from(node.children).forEach((child) => {
      const h = (child as HTMLElement).offsetHeight;
      if (h > tallest) tallest = h;
    });
    
    setMaxHeight(tallest);
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
        className="invisible fixed -z-10 top-0 left-0 w-full max-w-4xl"
        style={{ visibility: 'hidden' }}
      >
        {phrases.map((t, k) => (
          <div key={k} className={`${className} whitespace-normal`}>
            {t}
          </div>
        ))}
      </div>

      {/* Actual display container */}
      <div 
        style={{ 
          height: maxHeight > 0 ? `${maxHeight}px` : 'auto',
          minHeight: isMeasuring ? '200px' : undefined
        }} 
        className="relative overflow-hidden" 
        aria-live="polite"
      >
        {phrases.map((t, k) => (
          <div
            key={k}
            className={`absolute inset-0 ${className} transition-opacity duration-500 ease-out will-change-transform whitespace-normal ${k === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {t}
          </div>
        ))}
      </div>
    </>
  );
}


