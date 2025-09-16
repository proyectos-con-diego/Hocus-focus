import { NextRequest, NextResponse } from 'next/server';

const TALLY_API_KEY = process.env.TALLY_API_KEY;
const TALLY_FORM_ID = 'mY2AR6';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Probando conexión directa con Tally...');
    
    // Probar obtener información del formulario
    const formInfoResponse = await fetch(`https://api.tally.so/forms/${TALLY_FORM_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TALLY_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('🔍 Form info response status:', formInfoResponse.status);
    
    if (!formInfoResponse.ok) {
      const errorText = await formInfoResponse.text();
      console.error('❌ Error obteniendo info del formulario:', errorText);
      return NextResponse.json({
        success: false,
        error: `Error obteniendo formulario: ${formInfoResponse.status}`,
        details: errorText
      }, { status: 500 });
    }

    const formInfo = await formInfoResponse.json();
    console.log('✅ Información del formulario:', formInfo);

    return NextResponse.json({
      success: true,
      formInfo: formInfo,
      message: 'Conexión con Tally exitosa'
    });

  } catch (error) {
    console.error('❌ Error probando Tally:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
}
