import React from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StarRating({ 
  rating, 
  maxStars = 5, 
  size = 'md',
  className = '' 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          className={`${sizeClasses[size]} ${
            index < rating 
              ? 'text-yellow-400' 
              : 'text-gray-400'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
} 