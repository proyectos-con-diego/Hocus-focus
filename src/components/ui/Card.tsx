'use client';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}: CardProps) {
  const baseClasses = "bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-2xl";
  
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  const hoverClasses = hover 
    ? "hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-400/30 transition-all duration-400" 
    : "";

  return (
    <div className={`${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
