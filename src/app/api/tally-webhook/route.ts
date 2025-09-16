import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2022-06-28',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('📝 Datos recibidos de Tally:', JSON.stringify(data, null, 2));
    
    // Extraer datos del formulario
    const formData = data.data;
    const name = formData.find((field: any) => field.label === 'Nombre')?.value || '';
    const email = formData.find((field: any) => field.label === 'Email')?.value || '';
    const idea = formData.find((field: any) => field.label === 'Idea de SPIRIT')?.value || '';
    const subscribed = formData.find((field: any) => field.label === 'Suscrito')?.value === 'on';
    const source = formData.find((field: any) => field.label === 'Origen')?.value || 'Tally Form';
    
    console.log('📊 Datos procesados:', {
      name,
      email,
      idea,
      subscribed,
      source
    });
    
    // Enviar a Notion
    if (name && email) {
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
              checkbox: subscribed,
            },
            Origen: {
              rich_text: [
                {
                  text: {
                    content: source,
                  },
                },
              ],
            },
          },
        });
        
        console.log('✅ Datos enviados a Notion:', notionResponse.id);
        
        return NextResponse.json({
          success: true,
          message: 'Datos enviados a Notion exitosamente',
          notionId: notionResponse.id
        });
        
      } catch (notionError) {
        console.error('❌ Error enviando a Notion:', notionError);
        return NextResponse.json(
          { 
            error: 'Error enviando a Notion',
            details: notionError instanceof Error ? notionError.message : 'Error desconocido'
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error('❌ Error procesando webhook de Tally:', error);
    return NextResponse.json(
      { error: 'Error procesando formulario' },
      { status: 500 }
    );
  }
}
