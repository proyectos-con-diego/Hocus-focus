import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2022-06-28',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Probando token de Notion...');
    console.log('🔍 NOTION_TOKEN presente:', !!process.env.NOTION_TOKEN);
    console.log('🔍 NOTION_TOKEN inicio:', process.env.NOTION_TOKEN?.substring(0, 10));
    console.log('🔍 DATABASE_ID presente:', !!process.env.NOTION_DATABASE_ID);
    console.log('🔍 DATABASE_ID valor:', process.env.NOTION_DATABASE_ID);
    
    // Probar obtener información de la base de datos
    const databaseInfo = await notion.databases.retrieve({
      database_id: DATABASE_ID!,
    });
    
    console.log('✅ Base de datos encontrada:', databaseInfo.title);
    
    return NextResponse.json({
      success: true,
      databaseTitle: databaseInfo.title,
      message: 'Token de Notion válido'
    });
    
  } catch (error) {
    console.error('❌ Error con token de Notion:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
}
