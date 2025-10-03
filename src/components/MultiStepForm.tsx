'use client';

import React, { useState, useEffect } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

interface FormData {
  // Información Personal
  name: string;
  email: string;
  age: string;
  country: string;
  
  // Información Profesional
  occupation: string;
  industry: string;
  teamSize: string;
  
  // Información Específica del Producto
  productInterest: string;
  specificQuestions: { [key: string]: string };
  
  // Metadata
  source: string;
  productType: 'vip' | 'spirit' | 'mini';
  productName: string;
}

interface MultiStepFormProps {
  productName: string;
  productSlug: string;
  productType: 'vip' | 'spirit' | 'mini';
  source: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  productName,
  productSlug,
  productType,
  source
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    country: '',
    occupation: '',
    industry: '',
    teamSize: '',
    productInterest: '',
    specificQuestions: {},
    source,
    productType,
    productName
  });

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'vip_list',
    source: `${productType}-${productSlug}`
  });

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string) => {
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

  const handleSubmit = async () => {
    try {
      await submitToMake(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.email.trim() && formData.age && formData.country;
      case 2:
        return formData.occupation.trim() && formData.industry && formData.teamSize;
      case 3:
        return formData.productInterest.trim();
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-cyan-400 transition-all"
          placeholder="Tu nombre completo"
          required
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Correo electrónico *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-cyan-400 transition-all"
          placeholder="tu@email.com"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Edad *
          </label>
          <select
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
            required
          >
            <option value="">Selecciona tu edad</option>
            <option value="18-25">18-25 años</option>
            <option value="26-35">26-35 años</option>
            <option value="36-45">36-45 años</option>
            <option value="46-55">46-55 años</option>
            <option value="56+">56+ años</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            País *
          </label>
          <select
            value={formData.country}
            onChange={(e) => updateFormData('country', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
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
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Ocupación *
        </label>
        <input
          type="text"
          value={formData.occupation}
          onChange={(e) => updateFormData('occupation', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-cyan-400 transition-all"
          placeholder="Ej: Desarrollador, Marketing Manager, Emprendedor..."
          required
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Industria *
        </label>
        <select
          value={formData.industry}
          onChange={(e) => updateFormData('industry', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="">Selecciona tu industria</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Marketing">Marketing</option>
          <option value="Ventas">Ventas</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Salud">Salud</option>
          <option value="Educación">Educación</option>
          <option value="Consultoría">Consultoría</option>
          <option value="Retail">Retail</option>
          <option value="Manufactura">Manufactura</option>
          <option value="Servicios">Servicios</option>
          <option value="Sin fines de lucro">Sin fines de lucro</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Tamaño del equipo con el que trabajas *
        </label>
        <select
          value={formData.teamSize}
          onChange={(e) => updateFormData('teamSize', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="">Selecciona el tamaño</option>
          <option value="Solo yo">Solo yo</option>
          <option value="2-5 personas">2-5 personas</option>
          <option value="6-20 personas">6-20 personas</option>
          <option value="21+ personas">21+ personas</option>
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué te interesa más de {productName}? *
        </label>
        <textarea
          value={formData.productInterest}
          onChange={(e) => updateFormData('productInterest', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-cyan-400 transition-all resize-none"
          placeholder="Cuéntanos qué te motiva a conocer este producto..."
          rows={4}
          required
        />
      </div>


      {productType === 'spirit' && (
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            ¿Qué tipo de Spirit te interesa más?
          </label>
          <select
            value={formData.specificQuestions.spiritType || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, spiritType: e.target.value } }))}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          >
            <option value="">Selecciona una opción</option>
            <option value="Productividad">Productividad</option>
            <option value="Creatividad">Creatividad</option>
            <option value="Análisis">Análisis</option>
            <option value="Automatización">Automatización</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6 space-y-4">
        <h3 className="text-white font-semibold text-lg mb-4">Resumen de tu información</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Nombre:</span>
            <span className="text-white ml-2">{formData.name}</span>
          </div>
          <div>
            <span className="text-gray-400">Email:</span>
            <span className="text-white ml-2">{formData.email}</span>
          </div>
          <div>
            <span className="text-gray-400">Edad:</span>
            <span className="text-white ml-2">{formData.age}</span>
          </div>
          <div>
            <span className="text-gray-400">País:</span>
            <span className="text-white ml-2">{formData.country}</span>
          </div>
          <div>
            <span className="text-gray-400">Ocupación:</span>
            <span className="text-white ml-2">{formData.occupation}</span>
          </div>
          <div>
            <span className="text-gray-400">Industria:</span>
            <span className="text-white ml-2">{formData.industry}</span>
          </div>
          <div>
            <span className="text-gray-400">Equipo:</span>
            <span className="text-white ml-2">{formData.teamSize}</span>
          </div>
          <div>
            <span className="text-gray-400">Producto:</span>
            <span className="text-white ml-2">{formData.productName}</span>
          </div>
        </div>
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-xl ${
          submitMessage.includes('Gracias') || submitMessage.includes('Excelente') || submitMessage.includes('Perfecto')
            ? 'bg-green-500/20 border border-green-500/30 text-green-300'
            : 'bg-red-500/20 border border-red-500/30 text-red-300'
        }`}>
          {submitMessage}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-2xl max-w-2xl w-full border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {productType === 'vip' && 'Únete a la lista VIP'}
            {productType === 'spirit' && 'Solicitar Spirit'}
            {productType === 'mini' && 'Obtener versión MINI'}
          </h2>
          <p className="text-gray-400 mt-1">{productName}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Paso {currentStep} de {totalSteps}</span>
          <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 pb-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-6 border-t border-gray-700">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <div className="flex gap-3">
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!validateCurrentStep()}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
