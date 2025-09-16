import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2022-06-28',
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Notion connection...');
    
    // Test 1: Retrieve database info
    console.log('🔍 Step 1: Retrieving database info...');
    const databaseInfo = await notion.databases.retrieve({
      database_id: DATABASE_ID!,
    });
    console.log('✅ Database found:', databaseInfo.title);

    // Test 2: Try to create a simple page
    console.log('🔍 Step 2: Creating test page...');
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID!,
      },
      properties: {
        Nombres: {
          title: [
            {
              text: {
                content: 'Test from API',
              },
            },
          ],
        },
        Correo: {
          email: 'test@example.com',
        },
        Suscrito: {
          checkbox: true,
        },
        Origen: {
          rich_text: [
            {
              text: {
                content: 'API Test',
              },
            },
          ],
        },
      },
    });

    console.log('✅ Page created successfully:', response.id);

    return NextResponse.json({
      success: true,
      databaseTitle: databaseInfo.title,
      pageId: response.id,
      message: 'Notion connection successful!'
    });

  } catch (error) {
    console.error('❌ Notion test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
}
