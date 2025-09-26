import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGENTES IA - Productos de Productividad',
  description: 'Descubre nuestros agentes de IA especializados: Bafet para tareas, Jaime Daily para hábitos, Midas para finanzas y más. Herramientas que transforman tu productividad.',
  openGraph: {
    title: 'AGENTES IA - Productos de Productividad',
    description: 'Descubre nuestros agentes de IA especializados: Bafet para tareas, Jaime Daily para hábitos, Midas para finanzas y más. Herramientas que transforman tu productividad.',
    url: 'https://diegogonzalezvaccaro.com/productos',
    siteName: 'Hocuz Focuz',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agentes IA Hocuz Focuz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGENTES IA - Productos de Productividad',
    description: 'Descubre nuestros agentes de IA especializados: Bafet para tareas, Jaime Daily para hábitos, Midas para finanzas y más. Herramientas que transforman tu productividad.',
    images: ['/og-image.jpg'],
    creator: '@tu_usuario',
  },
};

export default function ProductosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
