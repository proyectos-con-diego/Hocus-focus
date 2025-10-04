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
  isOpen?: boolean;
  onClose?: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  productName,
  productSlug,
  productType,
  source,
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    productName,
    // Campos para "Otro"
    otherCountry: '',
    otherIndustry: '',
    otherProductInterest: '',
    // Suscripción al newsletter
    subscribeNewsletter: true
  });

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'vip_list',
    source: `${productType}-${productSlug}`
  });

  const totalSteps = 3;

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
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

  // Función para obtener el enlace de Notion según el producto
  const getNotionLink = () => {
    const links = {
      'vinxi': 'https://www.notion.so/diegoproyectos/Vinxi-Mini-a9fa3b9e599c409882dc3c2e4e4448b2',
      'jaime daily': 'https://www.notion.so/diegoproyectos/Habitus-Prime-Mini-6e4e229029a04c21972974a04b7a99df',
      'okro': 'https://www.notion.so/diegoproyectos/OKRo-Mini-17d70e875cb180cca2b3c908399bdd40',
      'grilla viralis': 'https://www.notion.so/diegoproyectos/Grilla-Viralis-Mini-12670e875cb180f3b7cdc0ba17f73c91'
    };
    
    const productKey = productName.toLowerCase();
    return links[productKey] || null;
  };

  const handleSubmit = async () => {
    try {
      const success = await submitToMake(formData);
      if (success) {
        setIsSubmitted(true);
        // Si es un modal, cerrarlo después de un breve delay
        if (isOpen && onClose) {
          setTimeout(() => {
            onClose();
          }, 2000); // 2 segundos para que el usuario vea el mensaje de confirmación
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        const basicValid = formData.name.trim() && formData.email.trim() && formData.age && formData.country;
        const countryValid = formData.country !== 'Otro' || (formData.country === 'Otro' && formData.otherCountry.trim());
        return basicValid && countryValid;
      case 2:
        const industryValid = formData.industry !== 'Otro' || (formData.industry === 'Otro' && formData.otherIndustry.trim());
        return formData.occupation.trim() && formData.industry && formData.teamSize && industryValid;
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
          className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border-0"
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
          className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border-0"
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
            <option value="menos-18">Menos de 18 años</option>
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
          {formData.country === 'Otro' && (
            <input
              type="text"
              value={formData.otherCountry}
              onChange={(e) => updateFormData('otherCountry', e.target.value)}
              placeholder="Especifica tu país"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
              required
            />
          )}
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
          className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200 border-0"
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
        {formData.industry === 'Otro' && (
          <input
            type="text"
            value={formData.otherIndustry}
            onChange={(e) => updateFormData('otherIndustry', e.target.value)}
            placeholder="Especifica tu industria"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
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
          {formData.specificQuestions.spiritType === 'Otro' && (
            <input
              type="text"
              value={formData.otherProductInterest}
              onChange={(e) => updateFormData('otherProductInterest', e.target.value)}
              placeholder="Especifica qué tipo de Spirit te interesa"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
              required
            />
          )}
        </div>
      )}

      {/* Checkbox de suscripción al newsletter */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.subscribeNewsletter}
            onChange={(e) => updateFormData('subscribeNewsletter', e.target.checked)}
            className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
          />
          <span className="text-white text-sm">
            Quiero recibir artículos y recursos sobre productividad, IA y optimización en mi email.
          </span>
        </label>
      </div>
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
            <span className="text-white ml-2">{formData.country === 'Otro' ? formData.otherCountry : formData.country}</span>
          </div>
          <div>
            <span className="text-gray-400">Ocupación:</span>
            <span className="text-white ml-2">{formData.occupation}</span>
          </div>
          <div>
            <span className="text-gray-400">Industria:</span>
            <span className="text-white ml-2">{formData.industry === 'Otro' ? formData.otherIndustry : formData.industry}</span>
          </div>
          <div>
            <span className="text-gray-400">Equipo:</span>
            <span className="text-white ml-2">{formData.teamSize}</span>
          </div>
          <div>
            <span className="text-gray-400">Producto:</span>
            <span className="text-white ml-2">{formData.productName}</span>
          </div>
          <div>
            <span className="text-gray-400">Newsletter:</span>
            <span className="text-white ml-2">
              {formData.subscribeNewsletter ? '✅ Sí, quiero recibir recursos' : '❌ No, gracias'}
            </span>
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
    <div className="max-w-2xl w-full">
      {/* Header - Solo mostrar si no es modal y no es VIP (para evitar redundancia) */}
      {!isOpen && productType !== 'vip' && (
        <div className="p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {productType === 'spirit' && 'Solicitar Spirit'}
              {productType === 'mini' && `Obtener ${productName} MINI`}
            </h2>
            <p className="text-gray-400 mt-1">{productName}</p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between space-x-2">
          <div className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${currentStep > 1 ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gray-800/50'}`} />
          <div className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${currentStep > 2 ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gray-800/50'}`} />
          <div className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${currentStep > 3 ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-gray-800/50'}`} />
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 pb-6">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-4">¡Perfecto!</h3>
            <p className="text-lg text-gray-300 mb-6">
              {productType === 'vip' && `Te has unido a la lista VIP. Te notificaremos cuando ${productName} esté disponible.`}
              {productType === 'spirit' && `Tu solicitud de Spirit ha sido enviada. Te contactaremos pronto.`}
              {productType === 'mini' && `Te hemos enviado el acceso a ${productName} MINI por email. ¡Revisa tu bandeja de entrada!`}
            </p>
            
            {/* Botón de acceso para productos MINI */}
            {productType === 'mini' && getNotionLink() && (
              <div className="mb-6">
                <a
                  href={getNotionLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200"
                >
                  <span>Acceder a {productName} MINI</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
            
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
        ) : (
          <>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </>
        )}
      </div>

      {/* Footer */}
      {!isSubmitted && (
        <div className="flex items-center justify-between pt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-8 py-4 rounded-2xl bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0"
        >
          Anterior
        </button>

          <div className="flex gap-3">
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                disabled={!validateCurrentStep()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-400/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
