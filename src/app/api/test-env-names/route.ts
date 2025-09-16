import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const possibleNames = [
      'TALLY_API_KEY',
      'TALLY_TOKEN',
      'TALLY_KEY',
      'TALLY_SECRET',
      'TALLY_ACCESS_TOKEN'
    ];

    const results = {};

    possibleNames.forEach(name => {
      const value = process.env[name];
      results[name] = {
        present: !!value,
        value: value ? value.substring(0, 10) + '...' : 'NOT_FOUND',
        length: value ? value.length : 0
      };
    });

    return NextResponse.json({
      success: true,
      results: results,
      allEnvKeys: Object.keys(process.env).filter(key => 
        key.toLowerCase().includes('tally')
      )
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Error checking env names',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
