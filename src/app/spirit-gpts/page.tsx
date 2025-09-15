import { Metadata } from 'next';
import SpiritsPage from './GhostGPTsPage';

export const metadata: Metadata = {
  title: 'Spirits - IA Personalizada | Mi Sitio',
  description: 'Descubre una nueva dimensión de la inteligencia artificial. Los Spirits no son bots genéricos: tienen una esencia única para guiarte, inspirarte y devolverte claridad en cada conversación.',
  keywords: 'Spirits, IA, inteligencia artificial, espíritu, escritura, análisis, creatividad, desarrollo',
};

export default function SpiritsPageWrapper() {
  return <SpiritsPage />;
}
