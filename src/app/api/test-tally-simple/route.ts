import { NextRequest, NextResponse } from 'next/server';

const TALLY_API_KEY = process.env.TALLY_API_KEY;
const TALLY_FORM_ID = 'mY2AR6';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Probando envío simple a Tally...');
    
    const testData = {
      data: {
        'Nombre': 'Test User',
        'Correo': 'test@example.com',
        'Idea de SPIRIT': 'Test idea',
        'Suscrito': true,
        'Origen': 'API Test',
        'Fecha de creación': new Date().toISOString()
      }
    };

    console.log('🔍 Enviando datos de prueba:', JSON.stringify(testData, null, 2));

    const response = await fetch(`https://api.tally.so/forms/${TALLY_FORM_ID}/responses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TALLY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('🔍 Response status:', response.status);
    console.log('🔍 Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('🔍 Response body:', responseText);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Tally API error: ${response.status}`,
        details: responseText
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Datos de prueba enviados exitosamente',
      response: responseText
    });

  } catch (error) {
    console.error('❌ Error en prueba simple:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
}
