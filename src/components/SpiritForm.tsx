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
  const isVinxi = spiritSlug === 'vinxi-spirit';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    aiTools: [] as string[],
    otherAiTools: '',
    delegationTask: '',
    delegationTasks: [] as string[],
    otherDelegationTasks: '',
    // Preguntas específicas (Vinxi)
    vinxiDifficulty: '',
    vinxiOtherDifficulty: '',
    vinxiHelpTypes: [] as string[],
    vinxiOtherHelp: '',
    vinxiStorage: '',
    vinxiOtherStorage: '',
    // Suscripción
    subscribeNewsletter: true,
    // Pregunta genérica adicional
    aiLifeAspects: [] as string[],
    otherAiLifeAspects: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'spirit_form',
    source: `spirit-${spiritSlug}`
  });

  const stepsOrder = [
    'basic',
    ...(isVinxi ? ['vinxi_storage', 'vinxi_difficulty', 'vinxi_help'] as const : []),
    'ai_life_aspects',
    'delegation_text',
    'ai_tools'
  ];
  const totalSteps = stepsOrder.length;

  const updateFormData = (field: string, value: string | string[] | boolean) => {
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
    const stepId = stepsOrder[currentStep - 1];
    switch (stepId) {
      case 'basic':
        return formData.name.trim() && formData.email.trim() && formData.age && formData.country;
      case 'vinxi_difficulty': {
        const val = (formData as any).vinxiDifficulty || '';
        const needsOther = val === 'otro';
        return !!val && (!needsOther || !!formData.vinxiOtherDifficulty.trim());
      }
      case 'vinxi_help': {
        const hasAny = formData.vinxiHelpTypes.length > 0;
        const needsOther = formData.vinxiHelpTypes.includes('otro');
        return hasAny && (!needsOther || !!formData.vinxiOtherHelp.trim());
      }
      case 'vinxi_storage': {
        const has = !!formData.vinxiStorage;
        const needsOther = formData.vinxiStorage === 'otro';
        return has && (!needsOther || !!formData.vinxiOtherStorage.trim());
      }
      case 'ai_tools': {
        const hasAiTools = formData.aiTools.length > 0;
        const hasOtherAiTools = !formData.aiTools.includes('otro') || (formData.aiTools.includes('otro') && formData.otherAiTools.trim());
        return hasAiTools && hasOtherAiTools;
      }
      case 'delegation_text':
        return formData.delegationTask.trim();
      case 'ai_life_aspects': {
        const hasAiLifeAspects = formData.aiLifeAspects.length > 0;
        const hasOtherAiLifeAspects = !formData.aiLifeAspects.includes('otro') || (formData.aiLifeAspects.includes('otro') && formData.otherAiLifeAspects.trim());
        return hasAiLifeAspects && hasOtherAiLifeAspects;
      }
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
        productType: 'spirit_form'
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

      {/* Edad y País - Lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Edad */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Edad *
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
            País *
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

      {/* Suscripción al newsletter */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={(e) => updateFormData('subscribeNewsletter', e.target.checked)}
            className="w-5 h-5 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
          />
          <span className="text-white text-base font-medium">
            Quiero recibir actualizaciones sobre nuevos Spirits y contenido exclusivo
          </span>
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-xl font-semibold mb-2">
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
                className="w-5 h-5 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-base md:text-lg font-medium">
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


  // ----- VINXI RENDERERS -----
  const renderVinxiDifficulty = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-2xl font-semibold mb-3">
          ¿Cuál es tu mayor dificultad al organizar tus ideas o proyectos?
        </label>
        <p className="text-gray-400 italic mb-4">Selecciona lo que mejor describa tu perfil.</p>
        <div className="space-y-3">
          {[
            { value: 'muchas_ideas', label: 'Tengo demasiadas ideas al mismo tiempo' },
            { value: 'priorizar', label: 'Me cuesta priorizar' },
            { value: 'no_termino', label: 'No termino lo que empiezo' },
            { value: 'otro', label: 'Otro' }
          ].map((opt) => {
            const isSelected = formData.vinxiDifficulty === opt.value;
            const hasSelection = formData.vinxiDifficulty !== '';
            const isOpaque = hasSelection && !isSelected;
            
            return (
              <label 
                key={opt.value} 
                className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
                  isOpaque ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <input
                  type="radio"
                  name="vinxiDifficulty"
                  checked={isSelected}
                  onChange={() => updateFormData('vinxiDifficulty', opt.value)}
                  className="w-5 h-5 text-cyan-400 bg-white/10 border-white/20 rounded-full focus:ring-cyan-400 focus:ring-2"
                />
                <span className="text-white text-base md:text-lg font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
        {formData.vinxiDifficulty === 'otro' && (
          <div className="mt-4">
            <input
              type="text"
              value={formData.vinxiOtherDifficulty}
              onChange={(e) => updateFormData('vinxiOtherDifficulty', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
              placeholder="Especifica tu dificultad"
              required
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderVinxiHelp = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-2xl font-semibold mb-3">
          ¿Qué tipo de ayuda te resultaría más útil en un asistente como Vinxi Spirit?
        </label>
        <p className="text-gray-400 text-sm mb-4">Puedes marcar más de una.</p>
        <div className="space-y-3">
          {[
            { value: 'convertir_ideas', label: 'Convertir ideas dispersas en planes' },
            { value: 'priorizar_urgencia', label: 'Priorizar tareas según urgencia' },
            { value: 'mantener_foco', label: 'Mantener el foco diario' },
            { value: 'organizar_proyectos', label: 'Organizar proyectos complejos' },
            { value: 'recordatorios', label: 'Recordatorios puntuales' },
            { value: 'motivacion', label: 'Motivación breve' },
            { value: 'otro', label: 'Otro' }
          ].map((opt) => (
            <label key={opt.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.vinxiHelpTypes.includes(opt.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('vinxiHelpTypes', [...formData.vinxiHelpTypes, opt.value]);
                  } else {
                    updateFormData('vinxiHelpTypes', formData.vinxiHelpTypes.filter(v => v !== opt.value));
                  }
                }}
                className="w-5 h-5 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-base md:text-lg font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
        {formData.vinxiHelpTypes.includes('otro') && (
          <div className="mt-4">
            <input
              type="text"
              value={formData.vinxiOtherHelp}
              onChange={(e) => updateFormData('vinxiOtherHelp', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
              placeholder="Especifica qué tipo de ayuda"
              required
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderVinxiStorage = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-2xl font-semibold mb-3">
          ¿Dónde guardas actualmente tus ideas o pendientes?
        </label>
        <p className="text-gray-400 italic mb-4">Elige la más representativa.</p>
        <div className="space-y-3">
          {[
            { value: 'notas_sueltas', label: 'Notas sueltas / post-its' },
            { value: 'apps_organizacion', label: 'En apps como Notion, Todoist o Asana' },
            { value: 'notas_voz', label: 'Notas de voz' },
            { value: 'sin_sistema', label: 'No tengo sistema definido' },
            { value: 'otro', label: 'Otro' }
          ].map((opt) => {
            const isSelected = formData.vinxiStorage === opt.value;
            const hasSelection = formData.vinxiStorage !== '';
            const isOpaque = hasSelection && !isSelected;
            
            return (
              <label 
                key={opt.value} 
                className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
                  isOpaque ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <input
                  type="radio"
                  name="vinxiStorage"
                  checked={isSelected}
                  onChange={() => updateFormData('vinxiStorage', opt.value)}
                  className="w-5 h-5 text-cyan-400 bg-white/10 border-white/20 rounded-full focus:ring-cyan-400 focus:ring-2"
                />
                <span className="text-white text-base md:text-lg font-medium">{opt.label}</span>
              </label>
            );
          })}
        </div>
        {formData.vinxiStorage === 'otro' && (
          <div className="mt-4">
            <input
              type="text"
              value={formData.vinxiOtherStorage}
              onChange={(e) => updateFormData('vinxiOtherStorage', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
              placeholder="Especifica dónde guardas tus ideas"
              required
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderAiLifeAspects = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-xl font-semibold mb-2">
          ¿En qué aspectos de tu vida ya te apoyas de la IA? *
        </label>
        <p className="text-gray-400 text-sm mb-4">Puedes marcar más de una.</p>
        
        <div className="space-y-3">
          {[
            { value: 'trabajos', label: 'Trabajos' },
            { value: 'estudios', label: 'Estudios' },
            { value: 'tareas_domesticas', label: 'Tareas domésticas' },
            { value: 'otro', label: 'Otro' }
          ].map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.aiLifeAspects.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateFormData('aiLifeAspects', [...formData.aiLifeAspects, option.value]);
                  } else {
                    updateFormData('aiLifeAspects', formData.aiLifeAspects.filter(aspect => aspect !== option.value));
                  }
                }}
                className="w-5 h-5 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-base md:text-lg font-medium">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        
        {formData.aiLifeAspects.includes('otro') && (
          <div className="mt-4">
            <input
              type="text"
              value={formData.otherAiLifeAspects}
              onChange={(e) => updateFormData('otherAiLifeAspects', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border border-gray-700/50"
              placeholder="Especifica en qué otros aspectos usas IA..."
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
          {(() => {
            const stepMap: Record<string, React.ReactNode> = {
              basic: renderStep1(),
              vinxi_difficulty: renderVinxiDifficulty ? renderVinxiDifficulty() : <></>,
              vinxi_help: renderVinxiHelp ? renderVinxiHelp() : <></>,
              vinxi_storage: renderVinxiStorage ? renderVinxiStorage() : <></>,
              ai_life_aspects: renderAiLifeAspects(),
              delegation_text: renderStep3(),
              ai_tools: renderStep2()
            };
            const stepId = stepsOrder[currentStep - 1];
            return stepMap[stepId] || null;
          })()}

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
