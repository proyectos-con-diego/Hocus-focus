import { NextRequest, NextResponse } from 'next/server';

const TALLY_API_KEY = process.env.TALLY_API_KEY;
const TALLY_FORM_ID = 'mY2AR6';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Probando diferentes endpoints de Tally...');
    
    const endpoints = [
      `https://api.tally.so/forms/${TALLY_FORM_ID}`,
      `https://api.tally.so/forms/${TALLY_FORM_ID}/responses`,
      `https://api.tally.so/v1/forms/${TALLY_FORM_ID}`,
      `https://api.tally.so/v1/forms/${TALLY_FORM_ID}/responses`,
    ];

    const results = [];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 Probando endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${TALLY_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const responseText = await response.text();
        
        results.push({
          endpoint,
          status: response.status,
          success: response.ok,
          response: responseText.substring(0, 200) + (responseText.length > 200 ? '...' : '')
        });

        console.log(`✅ ${endpoint}: ${response.status}`);
        
      } catch (error) {
        results.push({
          endpoint,
          status: 'ERROR',
          success: false,
          response: error instanceof Error ? error.message : 'Unknown error'
        });
        console.log(`❌ ${endpoint}: ERROR`);
      }
    }

    return NextResponse.json({
      success: true,
      results: results,
      apiKey: TALLY_API_KEY?.substring(0, 10) + '...',
      formId: TALLY_FORM_ID
    });

  } catch (error) {
    console.error('❌ Error probando endpoints:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}
