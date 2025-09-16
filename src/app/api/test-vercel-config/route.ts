import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verificar configuración de Vercel
    const vercelConfig = {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelRegion: process.env.VERCEL_REGION,
      vercelUrl: process.env.VERCEL_URL,
      vercelBranch: process.env.VERCEL_GIT_COMMIT_REF,
      vercelCommit: process.env.VERCEL_GIT_COMMIT_SHA,
    };

    // Verificar si hay problemas con las variables de entorno
    const envIssues = [];
    
    if (!process.env.NOTION_TOKEN) {
      envIssues.push('NOTION_TOKEN no está presente');
    }
    
    if (!process.env.NOTION_DATABASE_ID) {
      envIssues.push('NOTION_DATABASE_ID no está presente');
    }
    
    if (process.env.NOTION_TOKEN && process.env.NOTION_TOKEN.length !== 50) {
      envIssues.push(`NOTION_TOKEN tiene longitud incorrecta: ${process.env.NOTION_TOKEN.length} (debería ser 50)`);
    }
    
    if (process.env.NOTION_DATABASE_ID && process.env.NOTION_DATABASE_ID.length !== 32) {
      envIssues.push(`NOTION_DATABASE_ID tiene longitud incorrecta: ${process.env.NOTION_DATABASE_ID.length} (debería ser 32)`);
    }

    // Verificar si hay caracteres especiales
    const notionToken = process.env.NOTION_TOKEN;
    const hasSpecialChars = notionToken ? /[^\w\-_]/.test(notionToken) : false;
    
    if (hasSpecialChars) {
      envIssues.push('NOTION_TOKEN contiene caracteres especiales');
    }

    return NextResponse.json({
      success: true,
      vercelConfig: vercelConfig,
      envIssues: envIssues,
      notionToken: {
        present: !!notionToken,
        length: notionToken?.length || 0,
        hasSpecialChars: hasSpecialChars,
        start: notionToken?.substring(0, 15) || 'NOT_FOUND',
        end: notionToken?.substring(notionToken.length - 15) || 'NOT_FOUND'
      },
      databaseId: {
        present: !!process.env.NOTION_DATABASE_ID,
        length: process.env.NOTION_DATABASE_ID?.length || 0,
        value: process.env.NOTION_DATABASE_ID || 'NOT_FOUND'
      }
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Error checking Vercel config',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
