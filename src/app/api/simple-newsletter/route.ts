import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, idea, subscribeNewsletter, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    console.log('📝 Datos recibidos:', {
      name,
      email,
      idea,
      subscribeNewsletter,
      source
    });

    // Simular guardado exitoso (por ahora)
    // TODO: Implementar guardado real en base de datos
    
    return NextResponse.json(
      { 
        message: 'Datos guardados exitosamente',
        success: true,
        data: {
          name,
          email,
          idea,
          subscribeNewsletter,
          source,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('❌ Error procesando formulario:', error);
    return NextResponse.json(
      { error: 'Error al procesar formulario' },
      { status: 500 }
    );
  }
}
