import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="text-white font-semibold mb-3">Diego Gonzalez Vaccaro</h4>
            <p className="text-gray-400 text-sm">
              Consultor independiente especializado en automatización IA y optimización de procesos.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Servicios</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/servicios/automatizacion-ia" className="hover:text-cyan-400 transition-colors duration-300">🤖 Automatización IA</Link></li>
              <li><Link href="/servicios/sistema-scale" className="hover:text-purple-400 transition-colors duration-300">🏢 Sistema SCALE</Link></li>
              <li><Link href="/servicios/plan-marketing" className="hover:text-orange-400 transition-colors duration-300">📊 Plan Marketing</Link></li>
              <li><Link href="/ghost-gpts" className="hover:text-cyan-400 transition-colors duration-300">👻 Ghost GPTs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Recursos</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/blog" className="hover:text-purple-400 transition-colors duration-300">📝 Blog</Link></li>
              <li><Link href="/productos" className="hover:text-cyan-400 transition-colors duration-300">🐨 Agentes IA</Link></li>
              <li><Link href="/sobre-mi" className="hover:text-purple-400 transition-colors duration-300">👤 Sobre Mí</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6">
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
      </div>
    </footer>
  );
} 