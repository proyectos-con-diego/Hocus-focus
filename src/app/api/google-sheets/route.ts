import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

export async function POST(request: NextRequest) {
  try {
    const { name, email, idea, subscribeNewsletter, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    if (!GOOGLE_SHEETS_URL) {
      return NextResponse.json(
        { error: 'Google Sheets URL no configurada' },
        { status: 500 }
      );
    }

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
