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
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    ocupacion: '',
    industria: '',
    otraIndustria: '',
    tamanoEquipo: '',
    nombreNegocio: '',
    urgencia: '',
    codigoPais: '',
    numeroTelefono: ''
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
                if (suggestedCode && !formData.codigoPais) {
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
          if (suggestedCode && !formData.codigoPais) {
            updateFormData('codigoPais', suggestedCode);
          }
        }
      } catch (error) {
        console.log('No se pudo detectar el país por IP:', error);
      }
    };

    detectUserCountry();
  }, []);

  const totalSteps = 4;

  const updateFormData = (field: string, value: string) => {
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
        return formData.nombres.trim() !== '' && formData.apellidos.trim() !== '' && formData.email.trim() !== '';
      case 2:
        return formData.ocupacion.trim() !== '' && formData.industria.trim() !== '';
      case 3:
        return formData.tamanoEquipo.trim() !== '' && formData.nombreNegocio.trim() !== '';
      case 4:
        return formData.urgencia.trim() !== '' && formData.codigoPais.trim() !== '' && formData.numeroTelefono.trim() !== '';
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
      ocupacion: '',
      industria: '',
      otraIndustria: '',
      tamanoEquipo: '',
      nombreNegocio: '',
      urgencia: '',
      codigoPais: '',
      numeroTelefono: ''
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Información Personal</h3>
        <p className="text-gray-400">Cuéntanos un poco sobre ti</p>
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
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Información Profesional</h3>
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
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Información del Negocio</h3>
        <p className="text-gray-400">Háblanos sobre tu empresa</p>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Tamaño del equipo con el que trabaja directamente *
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
          <option value="11-25 personas">11-25 personas</option>
          <option value="26-50 personas">26-50 personas</option>
          <option value="Más de 50 personas">Más de 50 personas</option>
        </select>
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

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Información de Contacto Final</h3>
        <p className="text-gray-400">Completa tu información para contactarte</p>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">
            Código del país *
            {userCountry && formData.codigoPais && formData.codigoPais !== 'Otro' && (
              <span className="text-xs text-green-400 ml-2">
                ✓ Detectado automáticamente
              </span>
            )}
          </label>
          {formData.codigoPais === 'Otro' ? (
            <div className="space-y-2">
              <input
                type="text"
                value=""
                onChange={(e) => updateFormData('codigoPais', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Ej: +123, +44, +86"
                required
              />
              <button
                type="button"
                onClick={() => updateFormData('codigoPais', '')}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                ← Volver a seleccionar país
              </button>
            </div>
          ) : (
            <select
              value={formData.codigoPais}
              onChange={(e) => updateFormData('codigoPais', e.target.value)}
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
            required
          />
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/20">
          <div className="text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              ¡Gracias por tu interés!
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Hemos recibido tu solicitud para <span className="text-purple-400 font-semibold">{serviceName}</span>. 
              Te contactaremos en las próximas 2 horas para coordinar tu llamada estratégica.
            </p>
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300"
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
                  currentStep > index ? 'bg-gradient-to-r from-purple-400 to-indigo-600' : 'bg-gray-800/50'
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
                return renderStep3();
              case 4:
                return renderStep4();
              default:
                return null;
            }
          })()}

          {/* Mensaje de estado */}
          {submitMessage && (
            <div className={`p-4 rounded-xl ${
              submitStatus === 'success'
                ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}>
              {submitMessage}
            </div>
          )}

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
            Al completar el formulario, te contactaré en las próximas 2 horas para coordinar tu llamada estratégica.
          </p>
        </form>
      </div>
    </div>
  );
}
