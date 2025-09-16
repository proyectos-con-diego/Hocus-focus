import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Hocus Focus',
  description:
    'Ponte en contacto con Hocus Focus. Escríbenos para consultas, soporte o colaboraciones.',
};

export default function ContactoPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h1>
      <p className="text-neutral-400 mb-8">
        ¿Tienes una consulta, propuesta o necesitas soporte? Escríbenos y te
        responderemos a la brevedad.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Email</h2>
          <p>
            <a
              className="text-cyan-400 hover:underline"
              href="mailto:proyectoscondiego@gmail.com"
            >
              proyectoscondiego@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Redes sociales</h2>
          <ul className="list-disc list-inside space-y-1 text-neutral-300">
            <li>
              <a className="hover:underline" href="https://x.com/diegogonzalezv" target="_blank" rel="noreferrer">
                X (Twitter)
              </a>
            </li>
            <li>
              <a className="hover:underline" href="https://www.linkedin.com/in/diegogonzalezvaccaro/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900/40">
          <h3 className="font-semibold mb-2">Información legal</h3>
          <p className="text-neutral-400">
            Este formulario y los canales de contacto están destinados a
            consultas de clientes y colaboradores. Al escribirnos, aceptas ser
            contactado con relación a tu consulta.
          </p>
        </div>
      </section>
    </main>
  );
}


