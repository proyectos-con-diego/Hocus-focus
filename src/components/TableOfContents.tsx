'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const articleHeadings = Array.from(
      document.querySelectorAll('article h1, article h2, article h3, article h4')
    ).map((heading) => ({
      id: heading.id || `heading-${Math.random().toString(36).substr(2, 9)}`,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1))
    }));

    // Asignar IDs a los headings que no los tengan
    articleHeadings.forEach((item, index) => {
      const heading = document.querySelector(`article h${item.level}:nth-of-type(${index + 1})`);
      if (heading && !heading.id) {
        heading.id = item.id;
      }
    });

    setHeadings(articleHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    articleHeadings.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Contenido</h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left w-full px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  activeId === heading.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 12 + 12}px` }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 