import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Configuración del cliente Sanity del lado del servidor
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false, // Siempre obtener datos frescos en desarrollo
  token: process.env.SANITY_API_TOKEN, // Token opcional para contenido privado
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    // Query base para artículos
    let query = `*[_type == "post" && defined(slug.current) && (isHidden != true)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "category": categories[0]->title,
      "author": author->name,
      "mainImage": mainImage.asset->url,
      publishedAt,
      body,
      excerpt,
      readTime,
      categories[]->{title},
      "relatedProduct": relatedProduct->{name, "slug": slug.current}
    }`;

    // Aplicar filtros si se especifican
    if (category && category !== 'Todos') {
      query = `*[_type == "post" && defined(slug.current) && (isHidden != true) && "${category}" in categories[]->title] | order(publishedAt desc) {
        _id,
        title,
        "slug": slug.current,
        "category": categories[0]->title,
        "author": author->name,
        "mainImage": mainImage.asset->url,
        publishedAt,
        body,
        excerpt,
        readTime,
        categories[]->{title},
        "relatedProduct": relatedProduct->{name, "slug": slug.current}
      }`;
    }

    // Aplicar límite si se especifica
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum)) {
        // Reemplazar el último ] con el límite
        const lastBracketIndex = query.lastIndexOf(']');
        if (lastBracketIndex !== -1) {
          query = query.substring(0, lastBracketIndex) + `[0...${limitNum}]` + query.substring(lastBracketIndex + 1);
        }
      }
    }

    // Aplicar offset si se especifica
    if (offset) {
      const offsetNum = parseInt(offset);
      if (!isNaN(offsetNum)) {
        // Reemplazar el último ] con el offset
        const lastBracketIndex = query.lastIndexOf(']');
        if (lastBracketIndex !== -1) {
          query = query.substring(0, lastBracketIndex) + `[${offsetNum}...]` + query.substring(lastBracketIndex + 1);
        }
      }
    }

    console.log('🔍 Server-side query:', query);
    
    const articles = await sanityClient.fetch(query);
    
    console.log('📊 Server-side articles fetched:', articles?.length || 0);

    return NextResponse.json({ 
      success: true, 
      articles,
      total: articles?.length || 0
    });

  } catch (error) {
    console.error('❌ Error en API route /api/articles:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener artículos',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// Función para obtener categorías
export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();
    
    if (type === 'categories') {
      const categoriesQuery = `*[_type == "category"] | order(title asc) {
        _id,
        title,
        description
      }`;
      
      const categories = await sanityClient.fetch(categoriesQuery);
      
      return NextResponse.json({ 
        success: true, 
        categories 
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Tipo de consulta no válido' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('❌ Error en API route /api/articles (POST):', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener categorías',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
