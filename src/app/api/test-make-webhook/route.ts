import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Datos de prueba para cada tipo de formulario
  const testData = {
    newsletter: {
      timestamp: new Date().toISOString(),
      formType: 'newsletter',
      source: 'test-newsletter',
      userAgent: 'test-agent',
      Tipo: 'suscripcion',
      name: 'Test User Newsletter',
      email: 'test-newsletter@example.com',
      subscribeNewsletter: true,
      origin: 'newsletter_signup'
    },
    contact: {
      timestamp: new Date().toISOString(),
      formType: 'contact',
      source: 'test-contact',
      userAgent: 'test-agent',
      Tipo: 'message',
      name: 'Test User Contact',
      email: 'test-contact@example.com',
      message: 'Este es un mensaje de prueba del formulario de contacto',
      subscribeNewsletter: true,
      origin: 'contact_form'
    },
    spirit_idea: {
      timestamp: new Date().toISOString(),
      formType: 'spirit_idea',
      source: 'test-spirit',
      userAgent: 'test-agent',
      Tipo: 'message',
      name: 'Test User Spirit',
      email: 'test-spirit@example.com',
      idea: 'Un GPT que ayude con la gestión de proyectos de manera visual y organizada',
      subscribeNewsletter: false,
      origin: 'spirit_ideas'
    },
    vip_list: {
      timestamp: new Date().toISOString(),
      formType: 'vip_list',
      source: 'test-vip',
      userAgent: 'test-agent',
      Tipo: 'message',
      name: 'Test User VIP',
      email: 'test-vip@example.com',
      product: 'Bafet',
      sector: 'Tecnología',
      experience: 'Intermedia',
      currentChallenges: 'Falta de organización en mis inversiones',
      goals: 'Automatizar el seguimiento de mi portafolio',
      aiFamiliarity: 'Intermedio',
      subscribeNewsletter: true,
      origin: 'vip_list'
    }
  };

  return NextResponse.json({
    message: 'Datos de prueba para Make.com webhook',
    webhookUrl: 'https://hook.us2.make.com/jyh6038vmn3iqvsobgo0qcf3vumcdtbr',
    testData
  });
}

export async function POST(request: NextRequest) {
  try {
    const { testType } = await request.json();
    
    if (!testType) {
      return NextResponse.json(
        { error: 'testType es requerido (newsletter, contact, spirit_idea, vip_list)' },
        { status: 400 }
      );
    }

    // Enviar datos de prueba al webhook real
    const response = await fetch('https://hook.us2.make.com/jyh6038vmn3iqvsobgo0qcf3vumcdtbr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        formType: testType,
        source: `test-${testType}`,
        userAgent: 'test-agent',
        Tipo: testType === 'newsletter' ? 'suscripcion' : 'message',
        name: `Test User ${testType}`,
        email: `test-${testType}@example.com`,
        ...(testType === 'contact' && { message: 'Mensaje de prueba del formulario de contacto' }),
        ...(testType === 'spirit_idea' && { idea: 'Idea de prueba para un Spirit GPT' }),
        ...(testType === 'vip_list' && {
          product: 'Bafet',
          sector: 'Tecnología',
          experience: 'Intermedia',
          currentChallenges: 'Desafío de prueba',
          goals: 'Objetivo de prueba',
          aiFamiliarity: 'Intermedio'
        }),
        subscribeNewsletter: testType !== 'spirit_idea',
        origin: `${testType}_test`
      }),
    });

    const result = await response.text();
    
    return NextResponse.json({
      message: `Datos de prueba ${testType} enviados a Make.com`,
      status: response.status,
      makeResponse: result,
      success: response.ok
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Error enviando datos de prueba',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
