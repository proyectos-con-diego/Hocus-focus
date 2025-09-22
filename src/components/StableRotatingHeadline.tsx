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
    let tallest = 0;
    Array.from(node.children).forEach((child) => {
      const h = (child as HTMLElement).offsetHeight;
      if (h > tallest) tallest = h;
    });
    setMaxHeight(tallest);
  }, []);

  React.useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (measureRef.current) ro.observe(measureRef.current);
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [measure]);

  return (
    <>
      {/* Offscreen measurer */}
      <div ref={measureRef} className="invisible fixed -z-10 top-0 left-0">
        {phrases.map((t, k) => (
          <div key={k} className={`${className}`}>{t}</div>
        ))}
      </div>

      <div style={{ height: maxHeight || undefined }} className="relative overflow-hidden" aria-live="polite">
        {phrases.map((t, k) => (
          <div
            key={k}
            className={`absolute inset-0 ${className} transition-opacity duration-500 ease-out will-change-transform ${k === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {t}
          </div>
        ))}
      </div>
    </>
  );
}


