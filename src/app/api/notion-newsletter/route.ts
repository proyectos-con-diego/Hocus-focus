import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 NOTION_TOKEN:', process.env.NOTION_TOKEN ? 'Presente' : 'Faltante');
    console.log('🔍 DATABASE_ID:', process.env.NOTION_DATABASE_ID ? 'Presente' : 'Faltante');
    
    const { name, email, idea, subscribeNewsletter, source } = await request.json();
    console.log('📝 Datos recibidos:', { name, email, idea, subscribeNewsletter, source });

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Preparar propiedades para Notion (coincidiendo con los nombres de tu tabla)
    const properties: any = {
      Nombres: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Correo: {
        email: email,
      },
    };

    // Agregar campos adicionales si existen
    if (idea) {
      properties['Idea de SPIRIT'] = {
        rich_text: [
          {
            text: {
              content: idea,
            },
          },
        ],
      };
    }

    if (subscribeNewsletter !== undefined) {
      properties['Suscrito'] = {
        checkbox: subscribeNewsletter,
      };
    }

    if (source) {
      properties['Origen'] = {
        rich_text: [
          {
            text: {
              content: source,
            },
          },
        ],
      };
    }

    // Agregar entrada a Notion
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID!,
      },
      properties,
    });

    console.log('Entrada creada en Notion:', response.id);

    return NextResponse.json(
      { message: 'Datos guardados exitosamente', id: response.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error con Notion:', error);
    console.error('❌ Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { 
        error: 'Error al guardar en Notion',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
