'use client';

import React, { useState } from 'react';
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
    tamanoEquipo: '',
    nombreNegocio: '',
    urgencia: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'service_form',
    source: `service-${serviceSlug}`
  });

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
        return formData.urgencia.trim() !== '';
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
      tamanoEquipo: '',
      nombreNegocio: '',
      urgencia: ''
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
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
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
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
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
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
          placeholder="Nombre de tu empresa o negocio"
          required
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Urgencia de Implementación</h3>
        <p className="text-gray-400">¿Cuándo te gustaría comenzar?</p>
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          ¿Con qué urgencia buscas implementar este servicio en tu negocio? *
        </label>
        <select
          value={formData.urgencia}
          onChange={(e) => updateFormData('urgencia', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-colors"
          required
        >
          <option value="">Selecciona la urgencia</option>
          <option value="Inmediata (esta semana)">Inmediata (esta semana)</option>
          <option value="Alto (este mes)">Alto (este mes)</option>
          <option value="Medio (próximos 2-3 meses)">Medio (próximos 2-3 meses)</option>
          <option value="Bajo (más de 3 meses)">Bajo (más de 3 meses)</option>
          <option value="Solo explorando opciones">Solo explorando opciones</option>
        </select>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
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
      <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
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
              className="px-8 py-4 rounded-2xl bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0"
            >
              Anterior
            </button>

            <div className="flex gap-3">
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentStep === index + 1
                      ? 'bg-purple-500'
                      : currentStep > index + 1
                      ? 'bg-purple-400'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

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
