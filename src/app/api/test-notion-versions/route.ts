import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET(request: NextRequest) {
  try {
    const versions = ['2022-06-28', '2021-08-16', '2021-05-13'];
    const results = [];

    for (const version of versions) {
      try {
        console.log(`🔍 Probando Notion API versión: ${version}`);
        
        const notion = new Client({
          auth: NOTION_TOKEN,
          notionVersion: version,
        });

        const databaseInfo = await notion.databases.retrieve({
          database_id: DATABASE_ID!,
        });

        results.push({
          version,
          success: true,
          databaseTitle: databaseInfo.title,
          error: null
        });

        console.log(`✅ Versión ${version} funcionó`);

      } catch (error) {
        results.push({
          version,
          success: false,
          databaseTitle: null,
          error: error instanceof Error ? error.message : 'Unknown error'
        });

        console.log(`❌ Versión ${version} falló:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      results: results,
      token: NOTION_TOKEN?.substring(0, 15) + '...',
      databaseId: DATABASE_ID
    });

  } catch (error) {
    console.error('❌ Error probando versiones:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
