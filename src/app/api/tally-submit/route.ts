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

    // Aquí usarías la API de Tally para enviar los datos
    // Por ahora, simulamos el envío exitoso
    console.log('📝 Enviando a Tally:', {
      name,
      email,
      idea,
      subscribeNewsletter,
      source
    });

    // TODO: Implementar llamada real a la API de Tally
    // const tallyResponse = await fetch('https://api.tally.so/forms/YOUR_FORM_ID/responses', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.TALLY_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     data: {
    //       name,
    //       email,
    //       idea,
    //       subscribeNewsletter,
    //       source
    //     }
    //   })
    // });

    return NextResponse.json(
      { 
        message: 'Datos enviados a Tally exitosamente',
        success: true
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('❌ Error enviando a Tally:', error);
    return NextResponse.json(
      { error: 'Error al enviar formulario' },
      { status: 500 }
    );
  }
}
