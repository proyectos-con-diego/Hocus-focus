import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2022-06-28',
});

// IDs de las dos bases de datos de Notion
const VIP_DATABASE_ID = process.env.NOTION_VIP_DATABASE_ID; // Tabla para perfiles VIP
const NEWSLETTER_DATABASE_ID = process.env.NOTION_DATABASE_ID; // Tabla existente de suscripciones

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Iniciando proceso VIP List...');
    console.log('🔍 NOTION_TOKEN presente:', !!process.env.NOTION_TOKEN);
    console.log('🔍 VIP_DATABASE_ID presente:', !!process.env.NOTION_VIP_DATABASE_ID);
    console.log('🔍 NEWSLETTER_DATABASE_ID presente:', !!process.env.NOTION_DATABASE_ID);
    
    const { 
      name, 
      email, 
      product, 
      sector, 
      experience, 
      currentChallenges, 
      goals, 
      aiFamiliarity, 
      subscribeNewsletter,
      source 
    } = await request.json();

    // Validaciones básicas
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // 1. SIEMPRE crear entrada en la tabla VIP (perfil completo)
    console.log('📝 Creando entrada en tabla VIP...');
    
    const vipProperties = {
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
      Producto: {
        select: {
          name: product || 'No especificado',
        },
      },
      Sector: {
        select: {
          name: sector || 'No especificado',
        },
      },
      'Experiencia con IA': {
        select: {
          name: experience || 'No especificado',
        },
      },
      'Desafíos Actuales': {
        rich_text: [
          {
            text: {
              content: currentChallenges || 'No especificado',
            },
          },
        ],
      },
      Objetivos: {
        rich_text: [
          {
            text: {
              content: goals || 'No especificado',
            },
          },
        ],
      },
      'Nivel IA': {
        select: {
          name: aiFamiliarity || 'No especificado',
        },
      },
      'Suscribirse Newsletter': {
        checkbox: subscribeNewsletter || false,
      },
      Origen: {
        rich_text: [
          {
            text: {
              content: source || 'vip-list',
            },
          },
        ],
      },
      Fecha: {
        date: {
          start: new Date().toISOString().split('T')[0],
        },
      },
    };

    const vipResponse = await notion.pages.create({
      parent: {
        database_id: VIP_DATABASE_ID!,
      },
      properties: vipProperties,
    });

    console.log('✅ Entrada VIP creada:', vipResponse.id);

    let newsletterResponse = null;

    // 2. SOLO SI subscribeNewsletter = true, crear entrada en tabla de newsletter
    if (subscribeNewsletter && NEWSLETTER_DATABASE_ID) {
      console.log('📧 Creando entrada en tabla Newsletter...');
      
      const newsletterProperties = {
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
        Suscrito: {
          checkbox: true,
        },
        Origen: {
          rich_text: [
            {
              text: {
                content: `vip-list-${product || 'general'}`,
              },
            },
          ],
        },
      };

      newsletterResponse = await notion.pages.create({
        parent: {
          database_id: NEWSLETTER_DATABASE_ID!,
        },
        properties: newsletterProperties,
      });

      console.log('✅ Entrada Newsletter creada:', newsletterResponse.id);
    }

    return NextResponse.json(
      { 
        message: 'Datos guardados exitosamente',
        vipId: vipResponse.id,
        newsletterId: newsletterResponse?.id || null,
        subscribedToNewsletter: !!newsletterResponse
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error en VIP List:', error);
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
