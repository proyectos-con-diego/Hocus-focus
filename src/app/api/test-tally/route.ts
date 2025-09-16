import { NextRequest, NextResponse } from 'next/server';

const TALLY_API_KEY = process.env.TALLY_API_KEY;
const TALLY_FORM_ID = 'mY2AR6';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      TALLY_API_KEY_PRESENT: !!TALLY_API_KEY,
      TALLY_API_KEY_START: TALLY_API_KEY?.substring(0, 10) || 'NOT_FOUND',
      TALLY_FORM_ID: TALLY_FORM_ID,
      NODE_ENV: process.env.NODE_ENV
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Error getting Tally config',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
