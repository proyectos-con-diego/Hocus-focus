import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      NOTION_TOKEN_PRESENT: !!process.env.NOTION_TOKEN,
      NOTION_TOKEN_START: process.env.NOTION_TOKEN?.substring(0, 10) || 'NOT_FOUND',
      NOTION_DATABASE_ID_PRESENT: !!process.env.NOTION_DATABASE_ID,
      NOTION_DATABASE_ID_VALUE: process.env.NOTION_DATABASE_ID || 'NOT_FOUND',
      ALL_ENV_KEYS: Object.keys(process.env).filter(key => key.includes('NOTION')),
      NODE_ENV: process.env.NODE_ENV
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Error getting env vars',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
