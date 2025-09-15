import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Aquí puedes integrar con tu servicio de email preferido:
    // - Resend
    // - SendGrid
    // - Mailchimp
    // - ConvertKit
    // - Base de datos (MongoDB, PostgreSQL, etc.)

    // Por ahora, solo logueamos los datos
    console.log('Nueva suscripción:', { name, email, timestamp: new Date() });

    // Simular guardado en base de datos
    // await saveToDatabase({ name, email });

    return NextResponse.json(
      { message: 'Suscripción exitosa' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en suscripción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
