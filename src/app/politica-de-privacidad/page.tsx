import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Hocus Focus',
  description:
    'Conoce cómo recopilamos, usamos y protegemos tus datos personales en Hocus Focus.',
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Política de privacidad</h1>
      <p className="text-neutral-400 mb-8">
        Última actualización: {new Date().toLocaleDateString('es-PE')}
      </p>

      <section className="space-y-6 text-neutral-200">
        <p>
          En Hocus Focus valoramos tu privacidad. Esta política explica qué
          datos recopilamos, cómo los usamos y qué derechos tienes sobre ellos.
        </p>

        <h2 className="text-xl font-semibold">Datos que recopilamos</h2>
        <ul className="list-disc list-inside text-neutral-300">
          <li>Nombre y correo electrónico (cuando te suscribes o nos contactas).</li>
          <li>Información que nos envías voluntariamente a través de formularios.</li>
          <li>Datos técnicos anónimos para mejorar el sitio (p. ej., métricas de uso).</li>
        </ul>

        <h2 className="text-xl font-semibold">Cómo usamos tus datos</h2>
        <ul className="list-disc list-inside text-neutral-300">
          <li>Responder a tus consultas y enviarte contenidos/recursos solicitados.</li>
          <li>Mejorar nuestros servicios y la experiencia del sitio.</li>
          <li>Comunicaciones relacionadas con productos o actualizaciones (si lo autorizas).</li>
        </ul>

        <h2 className="text-xl font-semibold">Base legal</h2>
        <p>
          Tratamos tus datos con tu consentimiento y/o para ejecutar servicios que
          nos solicitas.
        </p>

        <h2 className="text-xl font-semibold">Conservación</h2>
        <p>
          Conservamos tus datos el tiempo necesario para las finalidades
          indicadas o hasta que solicites su eliminación.
        </p>

        <h2 className="text-xl font-semibold">Tus derechos</h2>
        <ul className="list-disc list-inside text-neutral-300">
          <li>Acceder, rectificar o eliminar tus datos.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
          <li>Oponerte al tratamiento o solicitar limitación.</li>
        </ul>
        <p>
          Para ejercer tus derechos, escríbenos a
          {' '}
          <a className="text-cyan-400 hover:underline" href="mailto:hola@hocusfocus.dev">hola@hocusfocus.dev</a>.
        </p>

        <h2 className="text-xl font-semibold">Terceros</h2>
        <p>
          Podemos usar proveedores para hosting, analítica o almacenamiento de
          formularios. Seleccionamos servicios que cumplan buenas prácticas de
          seguridad y privacidad.
        </p>

        <h2 className="text-xl font-semibold">Cambios</h2>
        <p>
          Podremos actualizar esta política. Publicaremos la versión vigente en
          esta página.
        </p>
      </section>
    </main>
  );
}


