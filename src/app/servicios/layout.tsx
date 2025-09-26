import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERVICIOS - Automatización y Optimización',
  description: 'Servicios profesionales de automatización, optimización de procesos y consultoría en productividad. Transformamos tu negocio con sistemas inteligentes.',
  openGraph: {
    title: 'SERVICIOS - Automatización y Optimización',
    description: 'Servicios profesionales de automatización, optimización de procesos y consultoría en productividad. Transformamos tu negocio con sistemas inteligentes.',
    url: 'https://diegogonzalezvaccaro.com/servicios',
    siteName: 'Hocuz Focuz',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Servicios Hocuz Focuz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SERVICIOS - Automatización y Optimización',
    description: 'Servicios profesionales de automatización, optimización de procesos y consultoría en productividad. Transformamos tu negocio con sistemas inteligentes.',
    images: ['/og-image.jpg'],
    creator: '@tu_usuario',
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
