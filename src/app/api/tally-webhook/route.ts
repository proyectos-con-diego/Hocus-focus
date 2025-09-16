import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('📝 Datos recibidos de Tally:', JSON.stringify(data, null, 2));
    
    // Extraer datos del formulario
    const formData = data.data;
    const name = formData.find((field: any) => field.label === 'Nombre')?.value || '';
    const email = formData.find((field: any) => field.label === 'Email')?.value || '';
    const idea = formData.find((field: any) => field.label === 'Idea de SPIRIT')?.value || '';
    const subscribed = formData.find((field: any) => field.label === 'Suscrito')?.value === 'on';
    const source = formData.find((field: any) => field.label === 'Origen')?.value || 'Tally Form';
    
    console.log('📊 Datos procesados:', {
      name,
      email,
      idea,
      subscribed,
      source
    });
    
    // Aquí puedes agregar lógica adicional como:
    // - Guardar en base de datos
    // - Enviar email de confirmación
    // - Integrar con servicios de email marketing
    
    return NextResponse.json({
      success: true,
      message: 'Formulario procesado exitosamente',
      data: {
        name,
        email,
        idea,
        subscribed,
        source
      }
    });
    
  } catch (error) {
    console.error('❌ Error procesando webhook de Tally:', error);
    return NextResponse.json(
      { error: 'Error procesando formulario' },
      { status: 500 }
    );
  }
}
