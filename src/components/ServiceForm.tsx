'use client';

import React, { useState, useEffect } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

interface ServiceFormProps {
  serviceName: string;
  serviceSlug: string;
  serviceIcon: string;
  serviceSubtitle: string;
  serviceDescription: string;
}

export default function ServiceForm({ 
  serviceName, 
  serviceSlug, 
  serviceIcon, 
  serviceSubtitle, 
  serviceDescription 
}: ServiceFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    nombres: string;
    apellidos: string;
    email: string;
    codigoPais: string;
    otroCodigoPais: string;
    numeroTelefono: string;
    ocupacion: string;
    industria: string;
    otraIndustria: string;
    nombreNegocio: string;
    tamanoEquipo: string;
    urgencia: string;
    contextoAdicional: string;
    subscribeNewsletter: boolean;
    generacionClientes: string;
    problemaMarketing: string;
    equipoMarketing: string;
    inversionMarketing: string;
    resultadoValioso: string;
    paginaWeb: string;
    redesSociales: string;
    horasRepetitivas: string;
    tipoTareasRepetitivas: string;
    herramientasAutomatizacion: string[];
    otrasHerramientas: string;
    nivelInversionTecnologica: string;
  }>({
    nombres: '',
    apellidos: '',
    email: '',
    codigoPais: '',
    otroCodigoPais: '',
    numeroTelefono: '',
    ocupacion: '',
    industria: '',
    otraIndustria: '',
    nombreNegocio: '',
    tamanoEquipo: '',
    urgencia: '',
    contextoAdicional: '',
    subscribeNewsletter: true,
    // Preguntas específicas de marketing
    generacionClientes: '',
    problemaMarketing: '',
    equipoMarketing: '',
    inversionMarketing: '',
    resultadoValioso: '',
    paginaWeb: '',
    redesSociales: '',
    // Preguntas específicas de automatización
    horasRepetitivas: '',
    tipoTareasRepetitivas: '',
    herramientasAutomatizacion: [],
    otrasHerramientas: '',
    nivelInversionTecnologica: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userCountry, setUserCountry] = useState<string>('');

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'service_form',
    source: `service-${serviceSlug}`
  });

  // Detectar país del usuario
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        // Usar la API de geolocalización del navegador
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Usar una API de geocodificación inversa (gratuita)
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
              );
              const data = await response.json();
              
              if (data.countryCode) {
                setUserCountry(data.countryCode);
                // Mapear código de país a código de teléfono
                const countryToCode: { [key: string]: string } = {
                  'MX': '+52',
                  'US': '+1',
                  'CA': '+1',
                  'ES': '+34',
                  'AR': '+54',
                  'CL': '+56',
                  'CO': '+57',
                  'PE': '+51',
                  'VE': '+58',
                  'EC': '+593',
                  'BO': '+591',
                  'PY': '+595',
                  'UY': '+598',
                  'BR': '+55'
                };
                
                const suggestedCode = countryToCode[data.countryCode];
                if (suggestedCode) {
                  updateFormData('codigoPais', suggestedCode);
                }
              }
            },
            () => {
              // Si falla la geolocalización, usar IP geolocation como fallback
              fetchUserCountryByIP();
            },
            {
              timeout: 5000,
              enableHighAccuracy: false
            }
          );
        } else {
          // Si no hay geolocalización, usar IP geolocation
          fetchUserCountryByIP();
        }
      } catch (error) {
        console.log('No se pudo detectar el país del usuario:', error);
      }
    };

    const fetchUserCountryByIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
          setUserCountry(data.country_code);
          const countryToCode: { [key: string]: string } = {
            'MX': '+52',
            'US': '+1',
            'CA': '+1',
            'ES': '+34',
            'AR': '+54',
            'CL': '+56',
            'CO': '+57',
            'PE': '+51',
            'VE': '+58',
            'EC': '+593',
            'BO': '+591',
            'PY': '+595',
            'UY': '+598',
            'BR': '+55'
          };
          
          const suggestedCode = countryToCode[data.country_code];
          if (suggestedCode) {
            updateFormData('codigoPais', suggestedCode);
          }
        }
      } catch (error) {
        console.log('No se pudo detectar el país por IP:', error);
      }
    };

    detectUserCountry();
  }, []);

  const totalSteps = serviceSlug === 'plan-marketing' ? 5 : (serviceSlug === 'automatizacion-ia' ? 5 : 3);

  const updateFormData = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        const codigoPaisValid = formData.codigoPais.trim() !== '';
        const otroCodigoValid = formData.codigoPais !== 'Otro' || (formData.codigoPais === 'Otro' && formData.otroCodigoPais.trim() !== '');
        const numeroValid = formData.numeroTelefono.trim() !== '';
        return formData.nombres.trim() !== '' && formData.apellidos.trim() !== '' && formData.email.trim() !== '' && codigoPaisValid && otroCodigoValid && numeroValid;
      case 2:
        return formData.ocupacion.trim() !== '' && formData.industria.trim() !== '' && formData.nombreNegocio.trim() !== '';
      case 3:
        if (serviceSlug === 'plan-marketing') {
          return formData.generacionClientes.trim() !== '' && formData.problemaMarketing.trim() !== '' && formData.inversionMarketing.trim() !== '';
        }
        if (serviceSlug === 'automatizacion-ia') {
          return formData.horasRepetitivas.trim() !== '' && formData.tipoTareasRepetitivas.trim() !== '';
        }
        return formData.tamanoEquipo.trim() !== '' && formData.urgencia.trim() !== '';
      case 4:
        if (serviceSlug === 'plan-marketing') {
          return formData.equipoMarketing.trim() !== '' && formData.resultadoValioso.trim() !== '';
        }
        if (serviceSlug === 'automatizacion-ia') {
          return formData.nivelInversionTecnologica.trim() !== '' && formData.herramientasAutomatizacion.length > 0;
        }
        return formData.tamanoEquipo.trim() !== '' && formData.urgencia.trim() !== '';
      case 5:
        if (serviceSlug === 'plan-marketing') {
          return formData.urgencia.trim() !== '';
        }
        if (serviceSlug === 'automatizacion-ia') {
          return formData.urgencia.trim() !== '';
        }
        return formData.tamanoEquipo.trim() !== '' && formData.urgencia.trim() !== '';
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      if (validateCurrentStep()) {
        nextStep();
      } else {
        alert('Por favor, completa todos los campos obligatorios.');
      }
      return;
    }

    // Último paso - enviar formulario
    if (!validateCurrentStep()) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    console.log('FormData being sent:', formData);
    const success = await submitToMake(formData);
    if (success) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({
      nombres: '',
      apellidos: '',
      email: '',
      codigoPais: '',
      otroCodigoPais: '',
      numeroTelefono: '',
      ocupacion: '',
      industria: '',
      otraIndustria: '',
      nombreNegocio: '',
      tamanoEquipo: '',
      urgencia: '',
      contextoAdicional: '',
      subscribeNewsletter: true,
      // Preguntas específicas de marketing
      generacionClientes: '',
      problemaMarketing: '',
      equipoMarketing: '',
      inversionMarketing: '',
      resultadoValioso: '',
      paginaWeb: '',
      redesSociales: '',
      // Preguntas específicas de automatización
      horasRepetitivas: '',
      tipoTareasRepetitivas: '',
      herramientasAutomatizacion: [],
      otrasHerramientas: '',
      nivelInversionTecnologica: ''
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Información Personal y Contacto</h3>
        <p className="text-gray-400">Cuéntanos sobre ti y cómo contactarte</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">
            Nombres *
          </label>
          <input
            type="text"
            value={formData.nombres}
            onChange={(e) => updateFormData('nombres', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Tu nombre"
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            Apellidos *
          </label>
          <input
            type="text"
            value={formData.apellidos}
            onChange={(e) => updateFormData('apellidos', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Tus apellidos"
            autoComplete="family-name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Correo electrónico *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">
            Código del país *
          </label>
          <select
            value={formData.codigoPais}
            onChange={(e) => {
              const newValue = e.target.value;
              updateFormData('codigoPais', newValue);
              // Si no es "Otro", limpiar el campo personalizado
              if (newValue !== 'Otro') {
                updateFormData('otroCodigoPais', '');
              }
            }}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
            required
          >
            <option value="">País</option>
            <option value="+1">🇺🇸 +1 (USA/Canadá)</option>
            <option value="+52">🇲🇽 +52 (México)</option>
            <option value="+34">🇪🇸 +34 (España)</option>
            <option value="+54">🇦🇷 +54 (Argentina)</option>
            <option value="+56">🇨🇱 +56 (Chile)</option>
            <option value="+57">🇨🇴 +57 (Colombia)</option>
            <option value="+51">🇵🇪 +51 (Perú)</option>
            <option value="+58">🇻🇪 +58 (Venezuela)</option>
            <option value="+593">🇪🇨 +593 (Ecuador)</option>
            <option value="+591">🇧🇴 +591 (Bolivia)</option>
            <option value="+595">🇵🇾 +595 (Paraguay)</option>
            <option value="+598">🇺🇾 +598 (Uruguay)</option>
            <option value="+55">🇧🇷 +55 (Brasil)</option>
            <option value="Otro">🌍 Otro (escribir código)</option>
          </select>
          {formData.codigoPais === 'Otro' && (
            <input
              type="text"
              value={formData.otroCodigoPais}
              onChange={(e) => {
                let value = e.target.value;
                // Asegurar que empiece con +
                if (value && !value.startsWith('+')) {
                  value = '+' + value;
                }
                // Limitar a máximo 4 caracteres después del +
                if (value.length > 5) { // + + 4 dígitos = 5 caracteres total
                  value = value.slice(0, 5);
                }
                updateFormData('otroCodigoPais', value);
              }}
              placeholder="+123"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors mt-2"
              maxLength={5}
              required
            />
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-white font-semibold mb-2">
            Número de teléfono *
          </label>
          <input
            type="tel"
            value={formData.numeroTelefono}
            onChange={(e) => updateFormData('numeroTelefono', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="234 567 8900"
            autoComplete="tel-national"
            inputMode="numeric"
            pattern="[0-9\s\-\(\)]+"
            required
          />
        </div>
      </div>

      {/* Newsletter Subscription Checkbox */}
      <div className="flex items-start space-x-3 pt-4">
        <input
          type="checkbox"
          id="subscribeNewsletter"
          checked={formData.subscribeNewsletter}
          onChange={(e) => updateFormData('subscribeNewsletter', e.target.checked)}
          className="mt-1 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
        />
        <label htmlFor="subscribeNewsletter" className="text-sm text-gray-300 leading-relaxed">
          También quiero suscribirme para recibir artículos y recursos exclusivos en mi email.
        </label>
      </div>
    </div>
  );

  const renderMarketingStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Diagnóstico de Marketing</h3>
        <p className="text-gray-400">Ayúdanos a entender tu situación actual</p>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Cómo están generando clientes actualmente? *
        </label>
        <select
          value={formData.generacionClientes}
          onChange={(e) => updateFormData('generacionClientes', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Ads pagados">Ads pagados</option>
          <option value="Orgánicamente en redes sociales">Orgánicamente en redes sociales</option>
          <option value="Por recomendaciones">Por recomendaciones</option>
          <option value="Página web">Página web</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Cuál de estos problemas sientes que describe mejor tu situación? *
        </label>
        <select
          value={formData.problemaMarketing}
          onChange={(e) => updateFormData('problemaMarketing', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="No tengo una estrategia clara">No tengo una estrategia clara</option>
          <option value="Mi presupuesto en marketing no está dando resultados">Mi presupuesto en marketing no está dando resultados</option>
          <option value="Mi audiencia no está bien definida">Mi audiencia no está bien definida</option>
          <option value="No sé qué métricas seguir">No sé qué métricas seguir</option>
          <option value="Me cuesta implementar rápido">Me cuesta implementar rápido</option>
          <option value="No hago seguimiento constante">No hago seguimiento constante</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Cuál es tu inversión mensual aproximada en marketing? *
        </label>
        <select
          value={formData.inversionMarketing}
          onChange={(e) => updateFormData('inversionMarketing', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Menos de $500">Menos de $500</option>
          <option value="$500-$1,500">$500-$1,500</option>
          <option value="$1,500-$3,000">$1,500-$3,000</option>
          <option value="+$3,000">+$3,000</option>
        </select>
      </div>
    </div>
  );

  const renderMarketingStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Más sobre tu Marketing</h3>
        <p className="text-gray-400">Completa el diagnóstico</p>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Actualmente cuentas con un equipo de marketing? *
        </label>
        <select
          value={formData.equipoMarketing}
          onChange={(e) => updateFormData('equipoMarketing', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="No, lo manejo yo mismo">No, lo manejo yo mismo</option>
          <option value="Sí, 1-2 personas">Sí, 1-2 personas</option>
          <option value="Sí, 3-5 personas">Sí, 3-5 personas</option>
          <option value="Sí, 6-10 personas">Sí, 6-10 personas</option>
          <option value="Sí, más de 10 personas">Sí, más de 10 personas</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Si trabajamos juntos, ¿qué resultado sería más valioso para ti en los próximos 90 días? *
        </label>
        <select
          value={formData.resultadoValioso}
          onChange={(e) => updateFormData('resultadoValioso', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Generar más leads">Generar más leads</option>
          <option value="Aumentar ventas">Aumentar ventas</option>
          <option value="Tener claridad en la estrategia">Tener claridad en la estrategia</option>
          <option value="Optimizar procesos y ahorrar tiempo">Optimizar procesos y ahorrar tiempo</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Página web del negocio:
        </label>
        <input
          type="text"
          value={formData.paginaWeb}
          onChange={(e) => updateFormData('paginaWeb', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
          placeholder="https://tu-empresa.com"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Enlaces a sus redes sociales:
        </label>
        <input
          type="text"
          value={formData.redesSociales}
          onChange={(e) => updateFormData('redesSociales', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
          placeholder="@usuario, https://instagram.com/usuario, etc."
        />
      </div>
    </div>
  );

  const renderAutomationStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Diagnóstico de Automatización</h3>
        <p className="text-gray-400">Ayúdanos a entender tu situación actual con tareas repetitivas</p>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Hoy en día, cuántas horas semanales crees que pierdes en tareas repetitivas? *
        </label>
        <select
          value={formData.horasRepetitivas}
          onChange={(e) => updateFormData('horasRepetitivas', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Menos de 5h">Menos de 5h</option>
          <option value="Entre 5 y 10h">Entre 5 y 10h</option>
          <option value="Entre 11 y 20h">Entre 11 y 20h</option>
          <option value="Más de 20h">Más de 20h</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Qué tipo de tareas repetitivas te consumen más tiempo? *
        </label>
        <select
          value={formData.tipoTareasRepetitivas}
          onChange={(e) => updateFormData('tipoTareasRepetitivas', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Facturación y recordatorios">Facturación y recordatorios</option>
          <option value="Respuesta de correos">Respuesta de correos</option>
          <option value="Selección de candidatos">Selección de candidatos</option>
          <option value="Propuestas comerciales">Propuestas comerciales</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
    </div>
  );

  const renderAutomationStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Más sobre tu Automatización</h3>
        <p className="text-gray-400">Completa el diagnóstico</p>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Cómo describirías el nivel de inversión actual de tu empresa en herramientas tecnológicas o de automatización? *
        </label>
        <select
          value={formData.nivelInversionTecnologica}
          onChange={(e) => updateFormData('nivelInversionTecnologica', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Casi nulo todo se hace manual">Casi nulo todo se hace manual</option>
          <option value="Básico usamos algunas herramientas gratuitas">Básico usamos algunas herramientas gratuitas</option>
          <option value="Moderado usamos algunas herramientas pagadas pero sin automatizar">Moderado usamos algunas herramientas pagadas pero sin automatizar</option>
          <option value="Alto ya tenemos procesos automatizados y queremos escalar">Alto ya tenemos procesos automatizados y queremos escalar</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Qué herramientas o plataformas usas actualmente para gestionar tus procesos o tareas repetitivas? *
        </label>
        <div className="space-y-3">
          {[
            'Automatización (Zapier, Make, n8n, Power Automate)',
            'CRM (HubSpot, Salesforce, Pipedrive)',
            'Productividad (Google Workspace, Microsoft 365, Notion)',
            'Gestión de proyectos (Trello, Asana, Monday.com, Airtable)',
            'Marketing (Mailchimp, Typeform, Calendly, Slack)',
            'Otros',
            'Ninguna herramienta específica'
          ].map((herramienta) => (
            <label key={herramienta} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.herramientasAutomatizacion.includes(herramienta)}
                onChange={(e) => {
                  const currentTools = formData.herramientasAutomatizacion;
                  if (e.target.checked) {
                    updateFormData('herramientasAutomatizacion', [...currentTools, herramienta]);
                  } else {
                    updateFormData('herramientasAutomatizacion', currentTools.filter(tool => tool !== herramienta));
                  }
                }}
                className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="text-white">{herramienta}</span>
            </label>
          ))}
        </div>
        
        {formData.herramientasAutomatizacion.includes('Otros') && (
          <div className="mt-4">
            <label className="block text-white font-semibold mb-2">
              Especifica qué otras herramientas usas:
            </label>
            <input
              type="text"
              value={formData.otrasHerramientas}
              onChange={(e) => updateFormData('otrasHerramientas', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Ej: Jira, ClickUp, Freshworks, etc."
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Información Profesional y del Negocio</h3>
        <p className="text-gray-400">Ayúdanos a entender tu contexto laboral</p>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Ocupación / Cargo / Puesto *
        </label>
        <input
          type="text"
          value={formData.ocupacion}
          onChange={(e) => updateFormData('ocupacion', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
          placeholder="Ej: CEO, Gerente, Emprendedor, etc."
          required
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Industria del negocio *
        </label>
        <select
          value={formData.industria}
          onChange={(e) => updateFormData('industria', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona una industria</option>
          <option value="Tecnología">Tecnología</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Consultoría">Consultoría</option>
          <option value="Servicios Profesionales">Servicios Profesionales</option>
          <option value="Retail">Retail</option>
          <option value="Salud">Salud</option>
          <option value="Educación">Educación</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Inmobiliaria">Inmobiliaria</option>
          <option value="Manufactura">Manufactura</option>
          <option value="Gastronomía">Gastronomía</option>
          <option value="Turismo">Turismo</option>
          <option value="Marketing/Agencias">Marketing/Agencias</option>
          <option value="Otro">Otro</option>
        </select>
        {formData.industria === 'Otro' && (
          <input
            type="text"
            value={formData.otraIndustria}
            onChange={(e) => updateFormData('otraIndustria', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors mt-2"
            placeholder="Especifica tu industria"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Nombre del negocio *
        </label>
        <input
          type="text"
          value={formData.nombreNegocio}
          onChange={(e) => updateFormData('nombreNegocio', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
          placeholder="Nombre de tu empresa o negocio"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Sobre tu negocio y expectativas</h3>
        <p className="text-gray-400">Háblanos sobre tu empresa y lo que buscas</p>
      </div>

      {serviceSlug !== 'plan-marketing' && (
        <div>
          <label className="block text-white font-semibold mb-2">
            Tamaño del equipo con el que trabajas directamente *
          </label>
          <select
            value={formData.tamanoEquipo}
            onChange={(e) => updateFormData('tamanoEquipo', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
            required
          >
            <option value="">Selecciona el tamaño</option>
            <option value="Solo yo (1 persona)">Solo yo (1 persona)</option>
            <option value="2-5 personas">2-5 personas</option>
            <option value="6-10 personas">6-10 personas</option>
            <option value="10-25 personas">10-25 personas</option>
            <option value="25+ personas">25+ personas</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Con qué urgencia buscas implementar este servicio en tu negocio? *
        </label>
        <select
          value={formData.urgencia}
          onChange={(e) => updateFormData('urgencia', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona la urgencia</option>
          <option value="Solo estoy explorando opciones">Solo estoy explorando opciones</option>
          <option value="Quiero implementarlo pronto">Quiero implementarlo pronto</option>
          <option value="Lo necesito resolver cuanto antes">Lo necesito resolver cuanto antes</option>
        </select>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Cuéntanos todo sobre los retos de tu negocio y lo que esperas del diagnóstico:
        </label>
        <textarea
          value={formData.contextoAdicional}
          onChange={(e) => updateFormData('contextoAdicional', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors resize-none"
          placeholder="Comparte cualquier información adicional que consideres relevante..."
          rows={5}
        />
      </div>
    </div>
  );


  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-12 shadow-2xl shadow-purple-500/20">
          <div className="text-center">
            <div className="text-8xl mb-8">🎉</div>
            <h2 className="text-5xl font-bold text-white mb-6">
              ¡Gracias por tu interés!
            </h2>
            <p className="text-gray-300 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">
              Hemos recibido tu solicitud para <span className="text-purple-400 font-semibold">{serviceName}</span>. 
              Te contactaremos pronto para coordinar tu llamada estratégica.
            </p>
            <button
              onClick={resetForm}
              className="px-12 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 text-lg"
            >
              Enviar otra solicitud
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{serviceIcon}</div>
          
          {/* Badge de Lista de Espera */}
          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-600/30 border border-purple-500/40 rounded-full px-4 py-2 mb-4 inline-block animate-pulse">
            <p className="text-purple-300 text-xs font-bold uppercase tracking-wider">📋 Lista de espera - Acceso prioritario</p>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            {serviceName}
          </h2>
          <p className="text-purple-400 font-semibold mb-2">{serviceSubtitle}</p>
          <p className="text-gray-300">{serviceDescription}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between space-x-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${
                  currentStep > index + 1 ? 'bg-gradient-to-r from-purple-400 to-indigo-600' : 'bg-gray-800/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {(() => {
            switch (currentStep) {
              case 1:
                return renderStep1();
              case 2:
                return renderStep2();
              case 3:
                if (serviceSlug === 'plan-marketing') {
                  return renderMarketingStep3();
                }
                if (serviceSlug === 'automatizacion-ia') {
                  return renderAutomationStep3();
                }
                return renderStep3();
              case 4:
                if (serviceSlug === 'plan-marketing') {
                  return renderMarketingStep4();
                }
                if (serviceSlug === 'automatizacion-ia') {
                  return renderAutomationStep4();
                }
                return renderStep3();
              case 5:
                return renderStep3();
              default:
                return null;
            }
          })()}


          {/* Navegación */}
          <div className="flex items-center justify-between pt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-4 rounded-2xl bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            >
              Anterior
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !validateCurrentStep()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </span>
              ) : currentStep === totalSteps ? (
                '🚀 Enviar Solicitud'
              ) : (
                'Siguiente'
              )}
            </button>
          </div>

          <p className="text-center text-gray-400 text-sm">
            Completa el formulario y te contactaremos pronto para coordinar una llamada estratégica.
          </p>
        </form>
      </div>
    </div>
  );
}
