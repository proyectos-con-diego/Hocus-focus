import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Newsletter';

export async function POST(request: NextRequest) {
  try {
    const { name, email, idea, subscribeNewsletter, source } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Airtable no configurado' },
        { status: 500 }
      );
    }

    console.log('📝 Enviando a Airtable:', {
      name,
      email,
      idea,
      subscribeNewsletter,
      source
    });

    // Enviar a Airtable
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Nombre': name,
          'Email': email,
          'Idea de SPIRIT': idea || '',
          'Suscrito': subscribeNewsletter || false,
          'Origen': source || 'Formulario Web',
          'Fecha': new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Airtable error:', errorText);
      throw new Error(`Airtable error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ Datos enviados a Airtable:', result);
    
    return NextResponse.json(
      { 
        message: 'Datos guardados exitosamente en Airtable',
        success: true,
        recordId: result.id
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('❌ Error enviando a Airtable:', error);
    return NextResponse.json(
      { 
        error: 'Error al guardar en Airtable',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
