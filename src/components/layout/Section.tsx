'use client';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'none' | 'dark' | 'light' | 'gradient';
  id?: string;
}

export default function Section({ 
  children, 
  className = '',
  padding = 'md',
  background = 'none',
  id
}: SectionProps) {
  const paddingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24'
  };

  const backgroundClasses = {
    none: '',
    dark: 'bg-gray-900/50',
    light: 'bg-white/5',
    gradient: 'bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20'
  };

  return (
    <section 
      id={id}
      className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}
