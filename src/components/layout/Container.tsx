'use client';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Container({ 
  children, 
  className = '',
  size = 'lg',
  padding = 'md'
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8'
  };

  return (
    <div className={`mx-auto ${sizeClasses[size]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
