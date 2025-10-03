import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 DEBUG FORM - Recibiendo datos...');
    
    const body = await request.json();
    console.log('📊 DEBUG FORM - Datos recibidos:', JSON.stringify(body, null, 2));
    
    // Simular respuesta exitosa
    return NextResponse.json({
      message: 'Formulario recibido correctamente',
      data: body,
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error) {
    console.error('❌ DEBUG FORM - Error:', error);
    return NextResponse.json(
      { 
        error: 'Error en debug form',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
