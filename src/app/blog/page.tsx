export const metadata = {
  title: 'BLOG - Reflexiones sobre Productividad',
  description: 'Reflexiones, metodologías y casos reales sobre optimización de procesos, productividad y tecnología. Aprende a recuperar tiempo y mejorar tu vida profesional.',
  openGraph: {
    title: 'BLOG - Reflexiones sobre Productividad',
    description: 'Reflexiones, metodologías y casos reales sobre optimización de procesos, productividad y tecnología. Aprende a recuperar tiempo y mejorar tu vida profesional.',
    url: 'https://diegogonzalezvaccaro.com/blog',
    siteName: 'Hocuz Focuz',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/blog-default.png',
        width: 1200,
        height: 630,
        alt: 'Blog Hocuz Focuz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLOG - Reflexiones sobre Productividad',
    description: 'Reflexiones, metodologías y casos reales sobre optimización de procesos, productividad y tecnología. Aprende a recuperar tiempo y mejorar tu vida profesional.',
    images: ['/blog-default.png'],
    creator: '@tu_usuario',
  },
};

import BlogNuevoClient from './BlogNuevoClient';
import StructuredData, { blogPageStructuredData } from '@/components/StructuredData';

export default function BlogNuevo() {
  return (
    <>
      <StructuredData data={blogPageStructuredData} />
      <BlogNuevoClient />
    </>
  );
} 