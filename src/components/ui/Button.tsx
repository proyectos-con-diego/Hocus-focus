'use client';
import React from 'react';
import { useDynamicGradient } from '../../hooks/useDynamicGradient';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: string;
  fullWidth?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  icon,
  fullWidth = false
}: ButtonProps) {
  const { handleMouseMove, handleMouseLeave } = useDynamicGradient();

  const baseClasses = "font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-pink-500/30",
    secondary: "bg-gradient-to-r from-cyan-400 to-purple-600 text-white hover:scale-105 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-cyan-400/30",
    outline: "border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white",
    ghost: "text-white/80 hover:text-cyan-400 hover:bg-white/5"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={variant === 'primary' || variant === 'secondary' ? handleMouseMove : undefined}
      onMouseLeave={variant === 'primary' || variant === 'secondary' ? handleMouseLeave : undefined}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}
