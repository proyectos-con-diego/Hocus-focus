import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSpiritBySlug, getAllSpiritSlugs } from '@/data/spirits';
import SpiritPage from './SpiritPage';

interface SpiritPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllSpiritSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: SpiritPageProps): Promise<Metadata> {
  const spirit = getSpiritBySlug(params.slug);
  
  if (!spirit) {
    return {
      title: 'Spirit no encontrado',
      description: 'El Spirit que buscas no existe.',
    };
  }

  return {
    title: `${spirit.name} - ${spirit.subtitle}`,
    description: spirit.description,
    keywords: [
      'Spirit',
      'IA',
      'inteligencia artificial',
      spirit.category.toLowerCase(),
      spirit.name.toLowerCase(),
      'automatización',
      'productividad'
    ],
    openGraph: {
      title: `${spirit.name} - ${spirit.subtitle}`,
      description: spirit.description,
      type: 'website',
    },
  };
}

export default function SpiritPageRoute({ params }: SpiritPageProps) {
  const spirit = getSpiritBySlug(params.slug);
  
  if (!spirit) {
    notFound();
  }

  return <SpiritPage spirit={spirit} />;
}
