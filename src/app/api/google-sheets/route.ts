import { NextRequest, NextResponse } from 'next/server';

// Fallback temporal: si la env no llega, usar la URL /exec provista
const GOOGLE_SHEETS_URL =
  process.env.GOOGLE_SHEETS_URL ||
  'https://script.google.com/macros/s/AKfycbx-f-NvGLtKrKWZ4c7w8QxOVwWiu_9rKWk0e7Qs8YMzkKh8MHCQO6PuZtnri_KchsF1NA/exec';

export async function POST(request: NextRequest) {
  try {
    const { name, email, idea, subscribeNewsletter, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Nota: mantenemos fallback arriba para no bloquear producción si la env no llega

    console.log('📝 Enviando a Google Sheets:', {
      name,
      email,
      idea,
      subscribeNewsletter,
      source
    });

    // Enviar a Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        idea: idea || '',
        subscribeNewsletter: subscribeNewsletter || false,
        source: source || 'Formulario Web',
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Google Sheets error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Datos enviados a Google Sheets:', result);
    
    return NextResponse.json(
      { 
        message: 'Datos guardados exitosamente en Google Sheets',
        success: true
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('❌ Error enviando a Google Sheets:', error);
    return NextResponse.json(
      { 
        error: 'Error al guardar en Google Sheets',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
