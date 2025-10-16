import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 px-6 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Diego Gonzalez Vaccaro. Transformando caos en sistemas automatizados.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <Link href="/contacto" className="hover:text-cyan-400 transition-colors">Contacto</Link>
            <Link href="/politica-de-privacidad" className="hover:text-cyan-400 transition-colors">Privacidad</Link>
            <Link href="/terminos-y-condiciones" className="hover:text-cyan-400 transition-colors">Términos</Link>
            <Link href="/politica-de-cookies" className="hover:text-cyan-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 