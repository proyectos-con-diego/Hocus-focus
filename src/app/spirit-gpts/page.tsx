import { Metadata } from 'next';
import SpiritsPage from './GhostGPTsPage';

export const metadata: Metadata = {
  title: 'SPIRITS - IA Personalizada',
  description: 'Descubre una nueva dimensión de la inteligencia artificial. Los Spirits no son bots genéricos: tienen una esencia única para guiarte, inspirarte y devolverte claridad en cada conversación.',
  keywords: 'Spirits, IA, inteligencia artificial, espíritu, escritura, análisis, creatividad, desarrollo',
  openGraph: {
    title: 'SPIRITS - IA Personalizada',
    description: 'Descubre una nueva dimensión de la inteligencia artificial. Los Spirits no son bots genéricos: tienen una esencia única para guiarte, inspirarte y devolverte claridad en cada conversación.',
    url: 'https://diegogonzalezvaccaro.com/spirit-gpts',
    siteName: 'Hocuz Focuz',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Spirits IA Hocuz Focuz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPIRITS - IA Personalizada',
    description: 'Descubre una nueva dimensión de la inteligencia artificial. Los Spirits no son bots genéricos: tienen una esencia única para guiarte, inspirarte y devolverte claridad en cada conversación.',
    images: ['/og-image.jpg'],
    creator: '@tu_usuario',
  },
};

export default function SpiritsPageWrapper() {
  return <SpiritsPage />;
}
