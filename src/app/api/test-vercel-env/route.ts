import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Probar diferentes formas de acceder a las variables
    const envVars = {
      // Forma 1: process.env directo
      notionToken1: process.env.NOTION_TOKEN,
      
      // Forma 2: con verificación de undefined
      notionToken2: process.env.NOTION_TOKEN || 'NOT_FOUND',
      
      // Forma 3: con trim para eliminar espacios
      notionToken3: process.env.NOTION_TOKEN?.trim(),
      
      // Forma 4: verificando si es string
      notionToken4: typeof process.env.NOTION_TOKEN === 'string' ? process.env.NOTION_TOKEN : 'NOT_STRING',
      
      // Forma 5: con replace para eliminar caracteres especiales
      notionToken5: process.env.NOTION_TOKEN?.replace(/[^\w\-_]/g, ''),
    };

    // Verificar si hay caracteres ocultos
    const notionToken = process.env.NOTION_TOKEN;
    const charCodes = notionToken ? Array.from(notionToken).map(char => char.charCodeAt(0)) : [];
    
    return NextResponse.json({
      success: true,
      envVars: envVars,
      charCodes: charCodes,
      notionTokenLength: notionToken?.length || 0,
      notionTokenType: typeof notionToken,
      notionTokenStartsWith: notionToken?.startsWith('ntn_'),
      notionTokenEndsWith: notionToken?.endsWith('Mk'),
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('NOTION')),
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelRegion: process.env.VERCEL_REGION
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Error checking env vars',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
