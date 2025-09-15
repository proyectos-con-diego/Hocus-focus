'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  nombre: string;
  slug: { current: string };
  descripcion?: string;
  precio?: number;
  estado: string;
}

interface AdvancedMonetizationProps {
  products: Product[];
  articleCategory?: string;
}

export default function AdvancedMonetization({ products, articleCategory }: AdvancedMonetizationProps) {
  console.log('💰 AdvancedMonetization se está renderizando!', { products, articleCategory });
  
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);

  // Rotación automática de productos
  useEffect(() => {
    if (products.length > 1) {
      const interval = setInterval(() => {
        setCurrentProductIndex((prev) => (prev + 1) % products.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [products.length]);

  // Exit intent popup
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitIntent]);

  const currentProduct = products[currentProductIndex];

  const MonetizationBanner = ({ product, variant = 'standard' }: { product: Product; variant?: string }) => (
    <div className={`bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-2xl border border-purple-400/30 ${variant === 'exit-intent' ? 'max-w-md mx-auto' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-300 text-lg">⭐</span>
            <h3 className="text-white font-bold text-lg">
              {product.nombre}
            </h3>
          </div>
          {product.descripcion && (
            <p className="text-purple-100 text-sm mb-4">
              {product.descripcion}
            </p>
          )}
          {product.precio && (
            <p className="text-yellow-300 font-bold text-xl mb-4">
              ${product.precio}
            </p>
          )}
          <div className="flex gap-3">
            <Link 
              href={`/productos/${product.slug.current}`}
              className="flex-1 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-center hover:bg-purple-50 transition-colors"
            >
              🚀 Ver detalles
            </Link>
            {variant === 'exit-intent' && (
              <button 
                onClick={() => setShowExitIntent(false)}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Banner de monetización estándar */}
      <div className="my-8">
        <MonetizationBanner product={currentProduct} />
      </div>

      {/* Exit intent popup */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-4">
              <h2 className="text-white text-2xl font-bold mb-2">¡Espera! 🚀</h2>
              <p className="text-gray-300">¿Te vas sin ver esta oferta especial?</p>
            </div>
            <MonetizationBanner product={currentProduct} variant="exit-intent" />
          </div>
        </div>
      )}

      {/* Productos relacionados en sidebar */}
      <div className="mt-8 space-y-4">
        <h4 className="text-white font-semibold text-lg mb-4">
          💎 Productos recomendados
        </h4>
        {products.slice(0, 3).map((product, index) => (
          <div key={product.slug.current} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
            <Link href={`/productos/${product.slug.current}`} className="block">
              <h5 className="text-white font-medium mb-2">{product.nombre}</h5>
              {product.descripcion && (
                <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                  {product.descripcion}
                </p>
              )}
              <span className="text-purple-400 text-sm font-medium">
                Ver más →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
} 