import React from 'react';
import Link from 'next/link';

interface BannerProductoRelacionadoProps {
  productoSlug: string;
}

const productos: Record<string, { nombre: string; descripcion: string; cta: string; color: string; } > = {
  bafet: {
    nombre: 'Bafet | Haz crecer tus criptos',
    descripcion: 'Gestiona inversiones en criptomonedas y toma mejores decisiones con IA.',
    cta: 'Ver producto',
    color: 'from-blue-600 to-cyan-500',
  },
  // Puedes agregar más productos aquí
};

export default function BannerProductoRelacionado({ productoSlug }: BannerProductoRelacionadoProps) {
  const producto = productos[productoSlug] || productos['bafet'];
  return (
    <div className={`my-12 p-8 rounded-2xl bg-gradient-to-r ${producto.color} text-white flex flex-col items-center shadow-xl`}>
      <h3 className="text-2xl font-bold mb-2">¿Te interesa este tema?</h3>
      <div className="text-lg mb-4">{producto.descripcion}</div>
      <Link href={`/productos/${productoSlug}`}>
        <button className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-100 transition-all duration-300">
          {producto.cta}
        </button>
      </Link>
    </div>
  );
} 