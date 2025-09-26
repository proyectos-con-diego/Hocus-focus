import React from 'react';
import Link from 'next/link';
import { routes } from '../../lib/routes';

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="text-white font-semibold mb-3">Diego Gonzalez Vaccaro</h4>
            <p className="text-gray-400 text-sm">
              Optimizando procesos desde 2015. Ahora ayudo a otros a recuperar su tiempo.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Servicios</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href={routes.productos} className="hover:text-purple-400 transition-colors duration-300">Agentes IA</Link></li>
              <li><Link href={routes.blog} className="hover:text-purple-400 transition-colors duration-300">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 Consulta gratuita</li>
              <li>💬 WhatsApp directo</li>
              <li>📖 Guía gratis</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Diego Gonzalez Vaccaro. Empezando mi aventura como consultor independiente.
          </p>
        </div>
      </div>
    </footer>
  );
}
