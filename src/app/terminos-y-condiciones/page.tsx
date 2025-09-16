import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Hocus Focus',
  description:
    'Condiciones de uso del sitio y de los servicios ofrecidos por Hocus Focus.',
};

export default function TerminosCondicionesPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Términos y condiciones</h1>
      <section className="space-y-6 text-neutral-200">
        <p>
          Al acceder y utilizar este sitio aceptas estos términos y condiciones.
          Si no estás de acuerdo, por favor no utilices el sitio.
        </p>

        <h2 className="text-xl font-semibold">Uso permitido</h2>
        <p>
          Puedes navegar, compartir enlaces y consumir el contenido respetando
          los derechos de autor y las licencias aplicables.
        </p>

        <h2 className="text-xl font-semibold">Propiedad intelectual</h2>
        <p>
          Los textos, marcas, imágenes y materiales del sitio pertenecen a sus
          respectivos autores y/o a Hocus Focus.
        </p>

        <h2 className="text-xl font-semibold">Limitación de responsabilidad</h2>
        <p>
          El contenido se ofrece “tal cual”. No garantizamos resultados
          específicos. No seremos responsables por daños derivados del uso del
          sitio o de la aplicación del contenido.
        </p>

        <h2 className="text-xl font-semibold">Cambios</h2>
        <p>
          Podemos actualizar estos términos en cualquier momento. La versión
          vigente estará publicada en esta página.
        </p>

        <h2 className="text-xl font-semibold">Contacto</h2>
        <p>
          Para consultas sobre estos términos, escríbenos a{' '}
          <a className="text-cyan-400 hover:underline" href="mailto:hola@hocusfocus.dev">hola@hocusfocus.dev</a>.
        </p>
      </section>
    </main>
  );
}


