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

    console.log('📝 Enviando a Notion via Tally:', {
      name,
      email,
      idea,
      subscribeNewsletter,
      source
    });

    // Enviar directamente a Notion
    try {
      const notionResponse = await notion.pages.create({
        parent: {
          database_id: DATABASE_ID!,
        },
        properties: {
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
          'Idea de SPIRIT': {
            rich_text: [
              {
                text: {
                  content: idea || '',
                },
              },
            ],
          },
          Suscrito: {
            checkbox: subscribeNewsletter || false,
          },
          Origen: {
            rich_text: [
              {
                text: {
                  content: source || 'Formulario Web',
                },
              },
            ],
          },
        },
      });
      
      console.log('✅ Datos enviados a Notion:', notionResponse.id);
      
      return NextResponse.json(
        { 
          message: 'Datos guardados exitosamente',
          success: true,
          notionId: notionResponse.id
        },
        { status: 200 }
      );
      
    } catch (notionError) {
      console.error('❌ Error enviando a Notion:', notionError);
      return NextResponse.json(
        { 
          error: 'Error al guardar en Notion',
          details: notionError instanceof Error ? notionError.message : 'Error desconocido'
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('❌ Error procesando formulario:', error);
    return NextResponse.json(
      { error: 'Error al procesar formulario' },
      { status: 500 }
    );
  }
}
