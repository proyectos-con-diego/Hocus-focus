import { NextRequest, NextResponse } from 'next/server';

const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/jyh6038vmn3iqvsobgo0qcf3vumcdtbr';

// Helper function to remove commas from multi-select options for Notion compatibility
const removeCommasFromOptions = (options: string[]): string[] => {
  return options.map(option => option.replace(/,/g, ''));
};

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
        
        // Preguntas Específicas VINXI (enviar directamente al nivel raíz)
        vinxi_storage: (() => {
          const storage = Array.isArray(data.vinxi_storage) ? data.vinxi_storage : [];
          const hasOther = storage.includes('Otro') && data.vinxi_storage_other;
          if (hasOther) {
            const filteredStorage = storage.filter((item: string) => item !== 'Otro');
            return removeCommasFromOptions([...filteredStorage, data.vinxi_storage_other]);
          }
          return removeCommasFromOptions(storage);
        })(),
        vinxi_difficulty: data.vinxi_difficulty === 'Otro' && data.vinxi_difficulty_other 
          ? data.vinxi_difficulty_other 
          : (data.vinxi_difficulty || ''),
        vinxi_projects: (() => {
          const projects = Array.isArray(data.vinxi_projects) ? data.vinxi_projects : [];
          const hasOther = projects.includes('Otro') && data.vinxi_projects_other;
          if (hasOther) {
            const filteredProjects = projects.filter((project: string) => project !== 'Otro');
            return removeCommasFromOptions([...filteredProjects, data.vinxi_projects_other]);
          }
          return removeCommasFromOptions(projects);
        })(),
        vinxi_skill_level: data.vinxi_skill_level || '',
        
        // Preguntas Específicas JAIME
        jaime_objective: data.jaime_objective || '',
        jaime_difficulty: data.jaime_difficulty === 'Otro' && data.jaime_difficulty_other 
          ? data.jaime_difficulty_other 
          : (data.jaime_difficulty || ''),
        jaime_habits: (() => {
          const habits = Array.isArray(data.jaime_habits) ? data.jaime_habits : [];
          const hasOther = habits.includes('Otro') && data.jaime_habits_other;
          if (hasOther) {
            const filteredHabits = habits.filter((habit: string) => habit !== 'Otro');
            return removeCommasFromOptions([...filteredHabits, data.jaime_habits_other]);
          }
          return removeCommasFromOptions(habits);
        })(),
        jaime_systems: (() => {
          const systems = Array.isArray(data.jaime_systems) ? data.jaime_systems : [];
          const hasOther = systems.includes('Otro') && data.jaime_systems_other;
          if (hasOther) {
            const filteredSystems = systems.filter((system: string) => system !== 'Otro');
            return removeCommasFromOptions([...filteredSystems, data.jaime_systems_other]);
          }
          return removeCommasFromOptions(systems);
        })(),
        
        // Preguntas Específicas OKRo
        okro_challenge: data.okro_challenge === 'Otro' && data.okro_challenge_other 
          ? data.okro_challenge_other 
          : (data.okro_challenge || ''),
        okro_tools: (() => {
          const tools = Array.isArray(data.okro_tools) ? data.okro_tools : [];
          const hasOther = tools.includes('Otro') && data.okro_tools_other;
          if (hasOther) {
            const filteredTools = tools.filter((tool: string) => tool !== 'Otro');
            return removeCommasFromOptions([...filteredTools, data.okro_tools_other]);
          }
          return removeCommasFromOptions(tools);
        })(),
        okro_experience: data.okro_experience || '',
        okro_purpose: data.okro_purpose === 'Otro' && data.okro_purpose_other 
          ? data.okro_purpose_other 
          : (data.okro_purpose || ''),
        
        // Preguntas Específicas GRILLA
        grilla_platforms: (() => {
          const platforms = Array.isArray(data.grilla_platforms) ? data.grilla_platforms : [];
          const hasOther = platforms.includes('Otra') && data.grilla_platforms_other;
          if (hasOther) {
            const filteredPlatforms = platforms.filter((platform: string) => platform !== 'Otra');
            return removeCommasFromOptions([...filteredPlatforms, data.grilla_platforms_other]);
          }
          return removeCommasFromOptions(platforms);
        })(),
        grilla_frequency: data.grilla_frequency || '',
        grilla_content_goals: data.grilla_content_goals || '',
        grilla_tools: (() => {
          const tools = Array.isArray(data.grilla_tools) ? data.grilla_tools : [];
          const hasOther = tools.includes('Otro') && data.grilla_tools_other;
          if (hasOther) {
            const filteredTools = tools.filter((tool: string) => tool !== 'Otro');
            return removeCommasFromOptions([...filteredTools, data.grilla_tools_other]);
          }
          return removeCommasFromOptions(tools);
        })(),
        grilla_investment: data.grilla_investment || '',
        
        // Campos "_other" específicos (NO enviar al webhook - solo para procesamiento interno)
        // vinxi_difficulty_other, vinxi_projects_other, jaime_difficulty_other, jaime_habits_other, 
        // jaime_systems_other, okro_challenge_other, okro_tools_other, okro_purpose_other,
        // grilla_platforms_other, grilla_tools_other, etc.
        
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
        
        // Campos "Otro" específicos (NO enviar al webhook - solo para procesamiento interno)
        // otherCountry: data.otherCountry || '',
        // otherIndustry: data.otherIndustry || '',
        // otherProductInterest: data.otherProductInterest || '',
        
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
        teamSize: data.serviceSlug === 'sistema-scale' ? (data.numeroEmpleados || '') : 
                  data.serviceSlug === 'plan-marketing' ? (data.equipoMarketing || '') : 
                  (data.tamanoEquipo || ''),
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
        generacionClientes: Array.isArray(data.generacionClientes) ? 
          data.generacionClientes.map((opcion: string) => 
            opcion === 'Otro' ? (data.otraGeneracionClientes || 'Otro') : opcion
          ) : 
          (data.generacionClientes || []),
        problemaMarketing: data.problemaMarketing || '',
        inversionMarketing: data.inversionMarketing || '',
        resultadoValioso: data.resultadoValioso || '',
        paginaWeb: data.paginaWeb || '',
        redesSociales: data.redesSociales || '',
        
        // Versión string para compatibilidad
        generacionClientesString: Array.isArray(data.generacionClientes) ? 
          data.generacionClientes.map((opcion: string) => 
            opcion === 'Otro' ? (data.otraGeneracionClientes || 'Otro') : opcion
          ).join(', ') : 
          (data.generacionClientes || ''),
        
        // Preguntas específicas de automatización (solo para automatizacion-ia)
        horasRepetitivas: data.horasRepetitivas || '',
        tipoTareasRepetitivas: Array.isArray(data.tipoTareasRepetitivas) ? 
          data.tipoTareasRepetitivas.map((opcion: string) => 
            opcion === 'Otro' ? (data.otroTipoTareasRepetitivas || 'Otro') : opcion
          ) : 
          (data.tipoTareasRepetitivas || []),
        herramientasAutomatizacion: Array.isArray(data.herramientasAutomatizacion) ? 
          data.herramientasAutomatizacion.map((herramienta: string) => {
            const cleanHerramienta = herramienta === 'Otros' ? (data.otrasHerramientas || 'Otros') : herramienta;
            // Limpiar comas de las opciones para evitar problemas de parsing
            return cleanHerramienta.replace(/,/g, ';');
          }) : 
          (data.herramientasAutomatizacion || []),
        nivelInversionTecnologica: data.nivelInversionTecnologica || '',
        
        // Versión string para compatibilidad
        tipoTareasRepetitivasString: Array.isArray(data.tipoTareasRepetitivas) ? 
          data.tipoTareasRepetitivas.map((opcion: string) => 
            opcion === 'Otro' ? (data.otroTipoTareasRepetitivas || 'Otro') : opcion
          ).join(', ') : 
          (data.tipoTareasRepetitivas || ''),
        
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
