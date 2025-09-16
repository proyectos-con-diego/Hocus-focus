import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export async function GET(request: NextRequest) {
  try {
    const notionToken = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;
    
    // Probar diferentes configuraciones del cliente
    const configs = [
      {
        name: 'Config 1: Básica',
        config: {
          auth: notionToken,
        }
      },
      {
        name: 'Config 2: Con versión explícita',
        config: {
          auth: notionToken,
          notionVersion: '2022-06-28',
        }
      },
      {
        name: 'Config 3: Con baseURL',
        config: {
          auth: notionToken,
          notionVersion: '2022-06-28',
          baseURL: 'https://api.notion.com/v1',
        }
      },
      {
        name: 'Config 4: Con timeout',
        config: {
          auth: notionToken,
          notionVersion: '2022-06-28',
          timeoutMs: 10000,
        }
      }
    ];

    const results = [];

    for (const { name, config } of configs) {
      try {
        console.log(`🔍 Probando: ${name}`);
        
        const notion = new Client(config);
        
        // Probar con una llamada simple
        const response = await notion.databases.retrieve({
          database_id: databaseId!,
        });
        
        results.push({
          name,
          success: true,
          databaseTitle: response.title,
          error: null
        });
        
        console.log(`✅ ${name} funcionó`);
        
      } catch (error) {
        results.push({
          name,
          success: false,
          databaseTitle: null,
          error: error instanceof Error ? error.message : 'Unknown error',
          errorDetails: JSON.stringify(error, null, 2)
        });
        
        console.log(`❌ ${name} falló:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      results: results,
      tokenInfo: {
        present: !!notionToken,
        length: notionToken?.length || 0,
        start: notionToken?.substring(0, 10) || 'NOT_FOUND',
        end: notionToken?.substring(notionToken.length - 10) || 'NOT_FOUND'
      },
      databaseInfo: {
        present: !!databaseId,
        length: databaseId?.length || 0,
        value: databaseId || 'NOT_FOUND'
      }
    });

  } catch (error) {
    console.error('❌ Error probando configuraciones:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
