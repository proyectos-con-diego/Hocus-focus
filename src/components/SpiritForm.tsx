'use client';

import React, { useState } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

interface SpiritFormProps {
  spiritName: string;
  spiritSlug: string;
  spiritIcon: string;
  spiritSubtitle: string;
  spiritDescription: string;
}

export default function SpiritForm({ 
  spiritName, 
  spiritSlug, 
  spiritIcon, 
  spiritSubtitle, 
  spiritDescription 
}: SpiritFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    aiTools: [] as string[],
    otherAiTools: '',
    delegationTask: '',
    delegationTasks: [] as string[],
    otherDelegationTasks: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'spirit_idea',
    source: `spirit-${spiritSlug}`
  });

  const totalSteps = 4;

  const updateFormData = (field: string, value: string | string[]) => {
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
        return formData.name.trim() && formData.email.trim() && formData.age && formData.country;
      case 2:
        const hasAiTools = formData.aiTools.length > 0;
        const hasOtherAiTools = !formData.aiTools.includes('otro') || (formData.aiTools.includes('otro') && formData.otherAiTools.trim());
        return hasAiTools && hasOtherAiTools;
      case 3:
        return formData.delegationTask.trim();
      case 4:
        const hasDelegationTasks = formData.delegationTasks.length > 0;
        const hasOtherDelegationTasks = !formData.delegationTasks.includes('otro') || (formData.delegationTasks.includes('otro') && formData.otherDelegationTasks.trim());
        return hasDelegationTasks && hasOtherDelegationTasks;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const success = await submitToMake({
        ...formData,
        spiritName,
        spiritSlug,
        source: `spirit-${spiritSlug}`,
        productType: 'spirit_idea'
      });
      
      if (success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting spirit form:', error);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      nextStep();
    } else {
      handleSubmit();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Nombre completo */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Nombre completo: *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="w-full px-4 py-4 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
          placeholder="Tu nombre completo"
          required
        />
      </div>

      {/* Correo electrónico */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Correo electrónico: *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="w-full px-4 py-4 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
          placeholder="tu@email.com"
          required
        />
      </div>

      {/* Edad */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Edad: *
        </label>
        <select
          value={formData.age}
          onChange={(e) => updateFormData('age', e.target.value)}
          className="w-full px-4 py-4 rounded-xl bg-gray-800/50 text-white focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
          required
        >
          <option value="">Selecciona tu edad</option>
          <option value="menos-18">Menos de 18 años</option>
          <option value="18-25">18-25 años</option>
          <option value="26-35">26-35 años</option>
          <option value="36-45">36-45 años</option>
          <option value="46-55">46-55 años</option>
          <option value="56+">56+ años</option>
        </select>
      </div>

      {/* País */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          País: *
        </label>
        <select
          value={formData.country}
          onChange={(e) => updateFormData('country', e.target.value)}
          className="w-full px-4 py-4 rounded-xl bg-gray-800/50 text-white focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
          required
        >
          <option value="">Selecciona tu país</option>
          <option value="Argentina">Argentina</option>
          <option value="Chile">Chile</option>
          <option value="Colombia">Colombia</option>
          <option value="México">México</option>
          <option value="España">España</option>
          <option value="Perú">Perú</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="Canadá">Canadá</option>
          <option value="Brasil">Brasil</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-lg font-medium mb-2">
          ¿Qué herramientas con inteligencia artificial usas actualmente (si usas alguna)? *
        </label>
        <p className="text-gray-400 text-sm mb-4">Puedes marcar más de una.</p>
        
        <div className="space-y-3">
          {[
            { value: 'ninguna', label: 'No uso ninguna aún' },
            { value: 'chatgpt', label: 'ChatGPT u otros bots conversacionales' },
            { value: 'edicion', label: 'Herramientas de edición de imagen o video con IA (ej. Photoshop, Runway, CapCut, etc.)' },
            { value: 'escritura', label: 'Asistentes de escritura o resumen (ej. Grammarly, Notion AI, Quillbot)' },
            { value: 'automatizacion', label: 'Plataformas de automatización (ej. Make, Zapier)' },
            { value: 'productividad', label: 'Herramientas de productividad (ej. calendarios inteligentes, asistentes de voz)' },
            { value: 'otro', label: 'Otro' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.aiTools.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('aiTools', [...formData.aiTools, option.value]);
                  } else {
                    updateFormData('aiTools', formData.aiTools.filter(tool => tool !== option.value));
                  }
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm font-medium">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        
        {formData.aiTools.includes('otro') && (
          <div className="mt-4">
            <input
              type="text"
              value={formData.otherAiTools}
              onChange={(e) => updateFormData('otherAiTools', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
              placeholder="Especifica qué otras herramientas de IA usas..."
              required
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-lg font-medium mb-2">
          Si tuvieras un asistente con IA 🤖 disponible todos los días para ayudarte en lo que necesites... ¿qué tarea concreta de tu trabajo o de tu rutina le delegarías primero? *
        </label>
        <textarea
          value={formData.delegationTask}
          onChange={(e) => updateFormData('delegationTask', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50 resize-none"
          placeholder="Describe la tarea que le delegarías..."
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-lg font-medium mb-2">
          ¿Con cuál de estas tareas te gustaría experimentar delegación inteligente? *
        </label>
        <p className="text-gray-400 text-sm mb-4">Puedes marcar más de una.</p>
        
        <div className="space-y-3">
          {[
            { value: 'calendario', label: 'Gestionar mi calendario o recordatorios' },
            { value: 'priorizar', label: 'Priorizar pendientes o proyectos' },
            { value: 'resumir', label: 'Resumir textos, correos o artículos' },
            { value: 'ideas', label: 'Generar ideas creativas' },
            { value: 'redactar', label: 'Redactar mensajes o textos' },
            { value: 'organizar', label: 'Organizar archivos o información' },
            { value: 'otro', label: 'Otro' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.delegationTasks.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('delegationTasks', [...formData.delegationTasks, option.value]);
                  } else {
                    updateFormData('delegationTasks', formData.delegationTasks.filter(task => task !== option.value));
                  }
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm font-medium">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        
        {formData.delegationTasks.includes('otro') && (
          <div className="mt-4">
            <input
              type="text"
              value={formData.otherDelegationTasks}
              onChange={(e) => updateFormData('otherDelegationTasks', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
              placeholder="Especifica qué otras tareas te gustaría delegar..."
              required
            />
          </div>
        )}
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">¡Perfecto!</h2>
            <p className="text-white/80 text-lg mb-6">
              Tu solicitud de {spiritName} ha sido enviada exitosamente.
            </p>
            <p className="text-gray-400 text-sm">
              Te contactaremos pronto con el enlace directo a tu Spirit personalizado.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
        {/* Header del formulario */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{spiritIcon}</div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {spiritName.split(' ')[0]}{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {spiritName.split(' ')[1]}
            </span>
          </h2>
          <p className="text-cyan-300 text-xl mb-4">{spiritSubtitle}</p>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {spiritDescription}
          </p>
        </div>

        {/* Sección de CTA */}
        <div className="bg-gray-800/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl mr-3">🎁</span>
            <h3 className="text-2xl font-bold text-white">
              Consigue a {spiritName.split(' ')[0]} Spirit en 2 minutos
            </h3>
          </div>
          <div className="text-center">
            <p className="text-gray-300">
              Por favor completa el siguiente formulario para revelar el enlace a tu Spirit:
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between space-x-2">
            <div className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${currentStep > 1 ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gray-800/50'}`} />
            <div className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${currentStep > 2 ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gray-800/50'}`} />
            <div className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${currentStep > 3 ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gray-800/50'}`} />
            <div className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${currentStep > 4 ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gray-800/50'}`} />
          </div>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Mensaje de estado */}
          {submitMessage && (
            <div className={`p-4 rounded-xl ${
              submitMessage.includes('Gracias') || submitMessage.includes('Excelente') || submitMessage.includes('Perfecto')
                ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Navegación */}
          <div className="flex items-center justify-between pt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-4 rounded-2xl bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0"
            >
              Anterior
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleNext}
                disabled={!validateCurrentStep() || isSubmitting}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Enviando...' : currentStep === totalSteps ? `🎁 Obtener ${spiritName} Gratis` : 'Siguiente'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
