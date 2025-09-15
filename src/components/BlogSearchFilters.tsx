'use client';
import React from 'react';
import { Category } from '@/data/blog';

interface BlogSearchFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Category[];
}

export default function BlogSearchFilters({ 
  search, 
  setSearch, 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}: BlogSearchFiltersProps) {
  return (
    <>
      {/* Buscador */}
      <div className="flex justify-center mb-8 mt-8">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar artículo..."
          className="w-full max-w-md px-5 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm shadow-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {['Todos', ...categories.map(cat => cat.title)].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold border transition-all duration-200 text-sm
              ${selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-purple-500 shadow-lg'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
} 