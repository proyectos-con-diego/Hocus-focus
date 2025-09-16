import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2022-06-28',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function POST(request: NextRequest) {
  try {
    const { name, email, idea, subscribeNewsletter, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // TEMPORAL: Simular éxito hasta que Notion esté completamente configurado
    console.log('✅ Simulando éxito para:', { name, email, source });
    
    // Log de los datos para debugging
    console.log('📝 Datos recibidos:', {
      name,
      email,
      idea: idea || 'No proporcionada',
      subscribeNewsletter: subscribeNewsletter || false,
      source: source || 'No especificado'
    });
    
    return NextResponse.json(
      { 
        message: 'Datos guardados exitosamente (modo simulación)', 
        id: 'sim-' + Date.now() 
      },
      { status: 200 }
    );

    // TODO: Restaurar integración real de Notion cuando esté funcionando
    /*
    // Preparar propiedades básicas para Notion
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

    console.log('🔍 Intentando crear página en Notion con propiedades:', JSON.stringify(properties, null, 2));

    // Agregar entrada a Notion usando database_id
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
    */
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
