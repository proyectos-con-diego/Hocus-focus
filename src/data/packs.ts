export interface Pack {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: string[];
  emojis: string[];
  price: string;
  oldPrice: string;
  color: string;
  bgColor: string;
  gradient: string;
}

export const productPacks: Pack[] = [
  {
    id: 'okro-vinxi',
    name: 'OKRo + Vinxi',
    slug: 'okro-vinxi',
    description: 'Objetivos claros + Proyectos organizados',
    products: ['OKRo', 'Vinxi'],
    emojis: ['🐼', '🦊'],
    price: '$35',
    oldPrice: '$129',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    gradient: 'from-blue-500/95 to-cyan-600/95'
  },
  {
    id: 'okro-grilla',
    name: 'OKRo + Grilla',
    slug: 'okro-grilla',
    description: 'Objetivos claros + Contenido viral',
    products: ['OKRo', 'Grilla Viralis'],
    emojis: ['🐼', '🦗'],
    price: '$49',
    oldPrice: '$198',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    gradient: 'from-green-500/95 to-emerald-600/95'
  },
  {
    id: 'jaime-vinxi',
    name: 'Jaime + Vinxi',
    slug: 'jaime-vinxi',
    description: 'Hábitos inteligentes + Proyectos organizados',
    products: ['Jaime Daily', 'Vinxi'],
    emojis: ['🐔', '🦊'],
    price: '$10.99',
    oldPrice: '$40',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    gradient: 'from-purple-500/95 to-pink-600/95'
  },
  {
    id: 'vinxi-okro',
    name: 'Vinxi + OKRo',
    slug: 'vinxi-okro',
    description: 'Proyectos organizados + Objetivos claros',
    products: ['Vinxi', 'OKRo'],
    emojis: ['🦊', '🐼'],
    price: '$35',
    oldPrice: '$129',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    gradient: 'from-cyan-500/95 to-blue-600/95'
  },
  {
    id: 'grilla-okro',
    name: 'Grilla + OKRo',
    slug: 'grilla-okro',
    description: 'Contenido viral + Objetivos claros',
    products: ['Grilla Viralis', 'OKRo'],
    emojis: ['🦗', '🐼'],
    price: '$49',
    oldPrice: '$198',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    gradient: 'from-emerald-500/95 to-teal-600/95'
  },
  {
    id: 'vinxi-jaime',
    name: 'Vinxi + Jaime',
    slug: 'vinxi-jaime',
    description: 'Proyectos organizados + Hábitos inteligentes',
    products: ['Vinxi', 'Jaime Daily'],
    emojis: ['🦊', '🐔'],
    price: '$10.99',
    oldPrice: '$40',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    gradient: 'from-indigo-500/95 to-purple-600/95'
  }
];

export function getPacksForProduct(productName: string): Pack[] {
  if (!productName) return [];
  
  return productPacks.filter(pack => 
    // Solo incluir packs donde el producto sea el PRIMER producto del pack
    pack.products[0].toLowerCase() === productName.toLowerCase()
  );
}

export function getPackBySlug(slug: string): Pack | undefined {
  return productPacks.find(pack => pack.slug === slug);
} 