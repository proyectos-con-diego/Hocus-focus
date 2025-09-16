import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('📝 Webhook recibido de Tally:', JSON.stringify(data, null, 2));
    
    // Simplemente confirmar que recibimos los datos
    return NextResponse.json({
      success: true,
      message: 'Webhook recibido exitosamente',
      receivedData: data
    });
    
  } catch (error) {
    console.error('❌ Error procesando webhook:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}
