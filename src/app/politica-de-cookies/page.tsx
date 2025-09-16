import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Hocus Focus',
  description: 'Información sobre el uso de cookies y tecnologías similares en Hocus Focus.',
};

export default function PoliticaCookiesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Política de cookies</h1>
      <section className="space-y-6 text-neutral-200">
        <p>
          Este sitio puede usar cookies y tecnologías similares para mejorar la
          experiencia de navegación, medir el uso del sitio y, cuando
          corresponda, personalizar contenido.
        </p>

        <h2 className="text-xl font-semibold">¿Qué son las cookies?</h2>
        <p>
          Son pequeños archivos que el sitio guarda en tu dispositivo para
          recordar preferencias o identificar sesiones.
        </p>

        <h2 className="text-xl font-semibold">Tipos de cookies que podemos usar</h2>
        <ul className="list-disc list-inside text-neutral-300">
          <li>Cookies necesarias para el funcionamiento del sitio.</li>
          <li>Cookies de análisis o métricas (p. ej., rendimiento).</li>
          <li>Cookies de funcionalidad (preferencias del usuario).</li>
        </ul>

        <h2 className="text-xl font-semibold">Gestión de cookies</h2>
        <p>
          Puedes configurar tu navegador para aceptar o rechazar cookies. Ten en
          cuenta que deshabilitarlas puede afectar algunas funciones del sitio.
        </p>

        <h2 className="text-xl font-semibold">Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política, contáctanos en{' '}
          <a className="text-cyan-400 hover:underline" href="mailto:proyectoscondiego@gmail.com">proyectoscondiego@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}


