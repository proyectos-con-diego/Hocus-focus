import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const notionToken = process.env.NOTION_TOKEN;
    const databaseId = process.env.NOTION_DATABASE_ID;
    
    return NextResponse.json({
      success: true,
      notionToken: {
        present: !!notionToken,
        length: notionToken ? notionToken.length : 0,
        start: notionToken ? notionToken.substring(0, 15) : 'NOT_FOUND',
        end: notionToken ? notionToken.substring(notionToken.length - 10) : 'NOT_FOUND',
        full: notionToken || 'NOT_FOUND'
      },
      databaseId: {
        present: !!databaseId,
        length: databaseId ? databaseId.length : 0,
        value: databaseId || 'NOT_FOUND'
      },
      nodeEnv: process.env.NODE_ENV
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Error getting Notion token info',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
