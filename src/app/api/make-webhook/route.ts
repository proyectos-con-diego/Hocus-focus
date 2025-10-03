import { NextRequest, NextResponse } from 'next/server';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/jyh6038vmn3iqvsobgo0qcf3vumcdtbr';

export async function POST(request: NextRequest) {
  try {
    console.log('🔗 Recibiendo datos para Make.com webhook...');
    
    const body = await request.json();
    console.log('📊 Datos recibidos:', JSON.stringify(body, null, 2));

    // Validar datos básicos
    if (!body.formType) {
      return NextResponse.json(
        { error: 'formType es requerido' },
        { status: 400 }
      );
    }

    // Formatear datos según el tipo de formulario
    const makeData = formatDataForMake(body);
    console.log('📤 Datos formateados para Make:', JSON.stringify(makeData, null, 2));

    // Enviar a Make.com
    const makeResponse = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(makeData),
    });

    console.log('📡 Respuesta de Make.com:', makeResponse.status);

    if (!makeResponse.ok) {
      throw new Error(`Make.com webhook responded with status: ${makeResponse.status}`);
    }

    const makeResult = await makeResponse.text();
    console.log('✅ Make.com response:', makeResult);

    return NextResponse.json(
      { 
        message: 'Datos enviados exitosamente a Make.com',
        makeResponse: makeResult,
        formType: body.formType
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error enviando a Make.com:', error);
    return NextResponse.json(
      { 
        error: 'Error al enviar datos a Make.com',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

function formatDataForMake(data: any) {
  const baseData = {
    timestamp: new Date().toISOString(),
    formType: data.formType,
    source: data.source || 'web',
    userAgent: data.userAgent || 'unknown',
  };

  switch (data.formType) {
    case 'newsletter':
      return {
        ...baseData,
        Tipo: 'suscripcion',
        name: data.name || '',
        email: data.email || '',
        subscribeNewsletter: data.subscribeNewsletter || true,
        origin: data.source || 'newsletter_signup',
      };

    case 'contact':
      return {
        ...baseData,
        Tipo: 'message',
        name: data.name || '',
        email: data.email || '',
        message: data.message || data.idea || '',
        subscribeNewsletter: data.subscribeNewsletter || false,
        origin: data.source || 'contact_form',
      };

    case 'spirit_idea':
      return {
        ...baseData,
        Tipo: 'message',
        name: data.name || '',
        email: data.email || '',
        idea: data.idea || '',
        subscribeNewsletter: data.subscribeNewsletter || false,
        origin: data.source || 'spirit_ideas',
      };

    case 'vip_list':
      return {
        ...baseData,
        Tipo: 'message',
        name: data.name || '',
        email: data.email || '',
        product: data.product || '',
        sector: data.sector || '',
        experience: data.experience || '',
        currentChallenges: data.currentChallenges || '',
        goals: data.goals || '',
        aiFamiliarity: data.aiFamiliarity || '',
        subscribeNewsletter: data.subscribeNewsletter || false,
        origin: data.source || 'vip_list',
      };

    default:
      return {
        ...baseData,
        Tipo: 'message',
        rawData: data,
      };
  }
}
