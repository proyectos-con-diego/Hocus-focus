'use client';
import React from 'react';
import { heroData } from '@/data/blog';

export default function BlogHeroSection() {
  return (
    <section className="relative flex items-center py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-blue-500/20 pointer-events-none" />
      <div className="relative z-10 w-full text-center">
        <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded-xl px-4 py-2 mb-5 text-purple-300 font-semibold text-sm">
          {heroData.badge}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {heroData.title}
          </span>
          <br />
          <span className="text-white">{heroData.subtitle}</span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
          {heroData.description}
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {heroData.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <span className="text-green-400 mr-2 font-bold">✓</span>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 