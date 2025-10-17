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

    case 'spirit_form':
      return {
        ...baseData,
        Tipo: 'message',
        // Información Personal
        name: data.name || '',
        email: data.email || '',
        age: data.age || '',
        country: data.country || '',
        
        // Preguntas Específicas VINXI
        vinxiDifficulty: data.vinxiDifficulty === 'otro' && data.vinxiOtherDifficulty 
          ? data.vinxiOtherDifficulty 
          : (data.vinxiDifficulty || ''),
        vinxiHelpTypes: (() => {
          const helpTypes = Array.isArray(data.vinxiHelpTypes) ? data.vinxiHelpTypes : [];
          const hasOther = helpTypes.includes('otro') && data.vinxiOtherHelp;
          if (hasOther) {
            const filteredTypes = helpTypes.filter((type: string) => type !== 'otro');
            return [...filteredTypes, data.vinxiOtherHelp];
          }
          return helpTypes;
        })(),
        vinxiStorage: data.vinxiStorage === 'otro' && data.vinxiOtherStorage 
          ? data.vinxiOtherStorage 
          : (data.vinxiStorage || ''),
        
        // Preguntas Genéricas
        aiTools: (() => {
          const tools = Array.isArray(data.aiTools) ? data.aiTools : [];
          const hasOther = tools.includes('otro') && data.otherAiTools;
          if (hasOther) {
            const filteredTools = tools.filter((tool: string) => tool !== 'otro');
            return [...filteredTools, data.otherAiTools];
          }
          return tools;
        })(),
        delegationTask: data.delegationTask || '',
        delegationTasks: (() => {
          const tasks = Array.isArray(data.delegationTasks) ? data.delegationTasks : [];
          const hasOther = tasks.includes('otro') && data.otherDelegationTasks;
          if (hasOther) {
            const filteredTasks = tasks.filter((task: string) => task !== 'otro');
            return [...filteredTasks, data.otherDelegationTasks];
          }
          return tasks;
        })(),
        aiLifeAspects: (() => {
          const aspects = Array.isArray(data.aiLifeAspects) ? data.aiLifeAspects : [];
          const hasOther = aspects.includes('otro') && data.otherAiLifeAspects;
          if (hasOther) {
            const filteredAspects = aspects.filter((aspect: string) => aspect !== 'otro');
            return [...filteredAspects, data.otherAiLifeAspects];
          }
          return aspects;
        })(),
        
        // Información del Spirit
        spiritName: data.spiritName || '',
        spiritSlug: data.spiritSlug || '',
        productType: data.productType || 'spirit_form',
        
        // Suscripción
        subscribeNewsletter: data.subscribeNewsletter || false,
        origin: data.source || 'spirit_form',
      };

    case 'mini_form':
      return {
        ...baseData,
        Tipo: 'message',
        // Información Personal
        name: data.name || '',
        email: data.email || '',
        age: data.age || '',
        country: data.country === 'Otro' ? (data.otherCountry || 'Otro') : (data.country || ''),
        
        // Información Profesional
        occupation: data.occupation || '',
        industry: data.industry === 'Otro' ? (data.otherIndustry || 'Otro') : (data.industry || ''),
        teamSize: data.teamSize || '',
        
        // Información del Producto MINI
        productInterest: data.productInterest || '',
        productType: data.productType || 'mini',
        productName: data.productName || '',
        productLabel: `${data.productName || ''}_mini`.toLowerCase(),
        
        // Preguntas Específicas (convertir arrays a strings)
        specificQuestions: data.specificQuestions || {},
        
        // Campos "Otro" específicos
        otherCountry: data.otherCountry || '',
        otherIndustry: data.otherIndustry || '',
        otherProductInterest: data.otherProductInterest || '',
        
        // Campos legacy (mantener para compatibilidad)
        product: data.product || data.productName || '',
        sector: data.sector || (data.industry === 'Otro' ? (data.otherIndustry || 'Otro') : (data.industry || '')),
        experience: data.experience || '',
        currentChallenges: data.currentChallenges || '',
        goals: data.goals || '',
        aiFamiliarity: data.aiFamiliarity || '',
        
        subscribeNewsletter: data.subscribeNewsletter || false,
        origin: data.source || 'mini_form',
      };

    case 'vip_list':
      return {
        ...baseData,
        Tipo: 'message',
        // Información Personal
        name: data.name || '',
        email: data.email || '',
        age: data.age || '',
        country: data.country === 'Otro' ? (data.otherCountry || 'Otro') : (data.country || ''),
        
        // Información Profesional
        occupation: data.occupation || '',
        industry: data.industry === 'Otro' ? (data.otherIndustry || 'Otro') : (data.industry || ''),
        teamSize: data.teamSize || '',
        
        // Información del Producto VIP
        productInterest: data.productInterest || '',
        productType: data.productType || 'vip',
        productName: data.productName || '',
        productLabel: `${data.productName || ''}_vip`.toLowerCase(),
        
        // Preguntas Específicas
        specificQuestions: data.specificQuestions || {},
        
        // Campos "Otro" específicos
        otherCountry: data.otherCountry || '',
        otherIndustry: data.otherIndustry || '',
        otherProductInterest: data.otherProductInterest || '',
        
        // Campos legacy (mantener para compatibilidad)
        product: data.product || data.productName || '',
        sector: data.sector || (data.industry === 'Otro' ? (data.otherIndustry || 'Otro') : (data.industry || '')),
        experience: data.experience || '',
        currentChallenges: data.currentChallenges || '',
        goals: data.goals || '',
        aiFamiliarity: data.aiFamiliarity || '',
        
        subscribeNewsletter: data.subscribeNewsletter || false,
        origin: data.source || 'vip_list',
      };

    case 'service_form':
      return {
        ...baseData,
        Tipo: 'message',
        // Información Personal
        name: data.nombres || '',
        surname: data.apellidos || '',
        email: data.email || '',
        
        // Información Profesional
        occupation: data.ocupacion || '',
        industry: data.industria === 'Otro' ? (data.otraIndustria || 'Otro') : (data.industria || ''),
        
        // Información del Negocio
        teamSize: data.serviceSlug === 'sistema-scale' ? (data.numeroEmpleados || '') : (data.tamanoEquipo || ''),
        nombreNegocio: data.nombreNegocio || '',
        
        // Información de Contacto
        urgencia: data.urgencia || '',
        contextoAdicional: data.contextoAdicional || '',
        // Campos separados para debug
        codigoPais: data.codigoPais === 'Otro' ? (data.otroCodigoPais || '') : (data.codigoPais || ''),
        numeroTelefono: data.numeroTelefono || '',
        telefono: `${data.codigoPais === 'Otro' ? (data.otroCodigoPais || '') : (data.codigoPais || '')}${data.numeroTelefono || ''}`,
        // Mapear código de país a nombre del país
        country: (() => {
          const codigo = data.codigoPais === 'Otro' ? (data.otroCodigoPais || '') : (data.codigoPais || '');
          const countryMap: { [key: string]: string } = {
            '+1': 'USA/Canadá',
            '+52': 'México',
            '+34': 'España',
            '+54': 'Argentina',
            '+56': 'Chile',
            '+57': 'Colombia',
            '+51': 'Perú',
            '+58': 'Venezuela',
            '+593': 'Ecuador',
            '+591': 'Bolivia',
            '+595': 'Paraguay',
            '+598': 'Uruguay',
            '+55': 'Brasil'
          };
          return countryMap[codigo] || (codigo ? `Otro (${codigo})` : '');
        })(),
        
        // Newsletter Subscription
        subscribeNewsletter: data.subscribeNewsletter || false,
        
        // Preguntas específicas de marketing (solo para plan-marketing)
        generacionClientes: data.generacionClientes || '',
        problemaMarketing: data.problemaMarketing || '',
        equipoMarketing: data.equipoMarketing || '',
        inversionMarketing: data.inversionMarketing || '',
        resultadoValioso: data.resultadoValioso || '',
        paginaWeb: data.paginaWeb || '',
        redesSociales: data.redesSociales || '',
        
        // Preguntas específicas de automatización (solo para automatizacion-ia)
        horasRepetitivas: data.horasRepetitivas || '',
        tipoTareasRepetitivas: data.tipoTareasRepetitivas === 'Otro' ? (data.otroTipoTareasRepetitivas || 'Otro') : (data.tipoTareasRepetitivas || ''),
        herramientasAutomatizacion: Array.isArray(data.herramientasAutomatizacion) ? 
          data.herramientasAutomatizacion.map((herramienta: string) => {
            const cleanHerramienta = herramienta === 'Otros' ? (data.otrasHerramientas || 'Otros') : herramienta;
            // Limpiar comas de las opciones para evitar problemas de parsing
            return cleanHerramienta.replace(/,/g, ';');
          }) : 
          (data.herramientasAutomatizacion || []),
        nivelInversionTecnologica: data.nivelInversionTecnologica || '',
        // Preguntas específicas de SCALE
        sistemaOrganizacion: Array.isArray(data.sistemaOrganizacion) ? 
          data.sistemaOrganizacion.map((s: string) => s === 'Otro' ? (data.otroSistemaOrganizacion || 'Otro') : s) : 
          (data.sistemaOrganizacion || []),
        problemaScale: Array.isArray(data.problemaScale) ? 
          data.problemaScale.map((p: string) => p === 'Otro' ? (data.otroProblemaScale || 'Otro') : p) : 
          (data.problemaScale || []),
        objetivoScale: data.objetivoScale || '',
        
        // Versiones de string para compatibilidad (si se necesitan)
        herramientasAutomatizacionString: Array.isArray(data.herramientasAutomatizacion) ? 
          data.herramientasAutomatizacion.map((herramienta: string) => {
            const cleanHerramienta = herramienta === 'Otros' ? (data.otrasHerramientas || 'Otros') : herramienta;
            // Limpiar comas de las opciones para evitar problemas de parsing
            return cleanHerramienta.replace(/,/g, ';');
          }).join(', ') : 
          (data.herramientasAutomatizacion || ''),
        sistemaOrganizacionString: Array.isArray(data.sistemaOrganizacion) ? 
          data.sistemaOrganizacion.map((s: string) => s === 'Otro' ? (data.otroSistemaOrganizacion || 'Otro') : s).join(', ') : 
          (data.sistemaOrganizacion || ''),
        problemaScaleString: Array.isArray(data.problemaScale) ? 
          data.problemaScale.map((p: string) => p === 'Otro' ? (data.otroProblemaScale || 'Otro') : p).join(', ') : 
          (data.problemaScale || ''),
        
        // Metadata del Servicio
        serviceName: data.serviceName || '',
        serviceSlug: data.serviceSlug || '',
        serviceType: 'service_form',
        
        origin: data.source || 'service_form',
      };

    default:
      return {
        ...baseData,
        Tipo: 'message',
        rawData: data,
      };
  }
}
