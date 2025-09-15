import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2025-09-03',
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

    // Obtener data_source_id de la base de datos
    const databaseResponse = await notion.databases.retrieve({
      database_id: DATABASE_ID!,
    });

    const dataSources = databaseResponse.data_sources;
    if (!dataSources || dataSources.length === 0) {
      throw new Error('No se encontraron data sources en la base de datos');
    }

    // Usar el primer data source (en bases de datos simples solo hay uno)
    const dataSourceId = dataSources[0].id;

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

    // Agregar entrada a Notion usando data_source_id
    const response = await notion.pages.create({
      parent: {
        type: 'data_source_id',
        data_source_id: dataSourceId,
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
