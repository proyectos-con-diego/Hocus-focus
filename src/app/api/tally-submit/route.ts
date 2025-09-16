import { NextRequest, NextResponse } from 'next/server';

const TALLY_API_KEY = process.env.TALLY_API_KEY;
const TALLY_FORM_ID = 'mY2AR6';

export async function POST(request: NextRequest) {
  try {
    const { name, email, idea, subscribeNewsletter, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    console.log('📝 Enviando a Tally:', {
      name,
      email,
      idea,
      subscribeNewsletter,
      source
    });

    // Enviar a Tally
    try {
      const tallyResponse = await fetch(`https://api.tally.so/forms/${TALLY_FORM_ID}/responses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TALLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            'Nombre': name,
            'Correo': email,
            'Idea de SPIRIT': idea || '',
            'Suscrito': subscribeNewsletter || false,
            'Origen': source || 'Formulario Web',
            'Fecha de creación': new Date().toISOString()
          }
        })
      });

      if (!tallyResponse.ok) {
        throw new Error(`Tally API error: ${tallyResponse.status}`);
      }

      const tallyData = await tallyResponse.json();
      console.log('✅ Datos enviados a Tally:', tallyData);
      
      return NextResponse.json(
        { 
          message: 'Datos guardados exitosamente en Tally',
          success: true,
          tallyId: tallyData.id
        },
        { status: 200 }
      );
      
    } catch (tallyError) {
      console.error('❌ Error enviando a Tally:', tallyError);
      return NextResponse.json(
        { 
          error: 'Error al guardar en Tally',
          details: tallyError instanceof Error ? tallyError.message : 'Error desconocido'
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('❌ Error procesando formulario:', error);
    return NextResponse.json(
      { error: 'Error al procesar formulario' },
      { status: 500 }
    );
  }
}
