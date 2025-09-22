'use client';
import React from 'react';
import { event as trackEvent } from '@/lib/analytics';
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
          onChange={e => {
            try { trackEvent({ action: 'type_search', category: 'Blog', label: e.target.value }); } catch {}
            setSearch(e.target.value);
          }}
          placeholder="Buscar artículo..."
          className="w-full max-w-md px-5 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm shadow-sm"
        />
      </div>

      {/* Categorías: scroll horizontal en móvil, wrap en desktop */}
      <div
        className="flex gap-2 mb-8 md:mb-12 overflow-x-auto md:overflow-visible px-1 -mx-1 md:mx-0 md:px-0 flex-nowrap md:flex-wrap md:justify-center"
        aria-label="Filtros por categoría"
      >
        {['Todos', ...categories.map(cat => cat.title)].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              try { trackEvent({ action: 'click_filter_category', category: 'Blog', label: cat }); } catch {}
              setSelectedCategory(cat);
            }}
            className={`whitespace-nowrap rounded-full font-semibold border transition-all duration-200 text-xs md:text-sm px-3 py-1.5 md:px-5 md:py-2
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