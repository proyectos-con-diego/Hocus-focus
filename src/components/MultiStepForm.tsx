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
  newsletter: boolean;
  specificQuestions: { [key: string]: string | string[] };
  
  // Campos "Otro"
  otherCountry: string;
  otherIndustry: string;
  otherProductInterest: string;
  
  // Suscripción
  subscribeNewsletter: boolean;
  
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
  const [userCountry, setUserCountry] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    country: '',
    occupation: '',
    industry: '',
    teamSize: '',
    productInterest: '',
    newsletter: false,
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
    formType: productType === 'mini' ? 'mini_form' : 'vip_list',
    source: `${productType}-${productSlug}`
  });

  // Lista de países ordenada alfabéticamente
  const countries = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Canadá',
    'Chile',
    'Colombia',
    'Ecuador',
    'España',
    'Estados Unidos',
    'México',
    'Paraguay',
    'Perú',
    'Uruguay',
    'Venezuela',
    'Otro'
  ];

  // Función para detectar el país del usuario
  const detectUserCountry = async () => {
    try {
      // Intentar geolocalización del navegador
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
              );
              const data = await response.json();
              const countryCode = data.countryCode;
              
              // Mapear códigos de país a nombres
              const countryMap: { [key: string]: string } = {
                'AR': 'Argentina',
                'BO': 'Bolivia',
                'BR': 'Brasil',
                'CA': 'Canadá',
                'CL': 'Chile',
                'CO': 'Colombia',
                'EC': 'Ecuador',
                'ES': 'España',
                'US': 'Estados Unidos',
                'MX': 'México',
                'PY': 'Paraguay',
                'PE': 'Perú',
                'UY': 'Uruguay',
                'VE': 'Venezuela'
              };
              
              const countryName = countryMap[countryCode];
              if (countryName && countries.includes(countryName)) {
                setUserCountry(countryName);
                updateFormData('country', countryName);
              }
            } catch (error) {
              console.log('Error en geolocalización:', error);
            }
          },
          async () => {
            // Fallback a IP geolocation
            try {
              const response = await fetch('https://ipapi.co/json/');
              const data = await response.json();
              const countryCode = data.country_code;
              
              const countryMap: { [key: string]: string } = {
                'AR': 'Argentina',
                'BO': 'Bolivia',
                'BR': 'Brasil',
                'CA': 'Canadá',
                'CL': 'Chile',
                'CO': 'Colombia',
                'EC': 'Ecuador',
                'ES': 'España',
                'US': 'Estados Unidos',
                'MX': 'México',
                'PY': 'Paraguay',
                'PE': 'Perú',
                'UY': 'Uruguay',
                'VE': 'Venezuela'
              };
              
              const countryName = countryMap[countryCode];
              if (countryName && countries.includes(countryName)) {
                setUserCountry(countryName);
                updateFormData('country', countryName);
              }
            } catch (error) {
              console.log('Error en IP geolocation:', error);
            }
          }
        );
      }
    } catch (error) {
      console.log('Error en detección de país:', error);
    }
  };

  // Detectar país al cargar el componente
  useEffect(() => {
    detectUserCountry();
  }, []);

  // Determinar el número total de pasos según el tipo de producto
  const getTotalSteps = () => {
    if (productType === 'mini') {
      const productSlugLower = productSlug.toLowerCase();
      if (productSlugLower === 'grilla-viralis' || productSlugLower === 'grilla viralis') {
        return 6; // 3 pasos originales + 3 páginas de preguntas específicas
      } else if (productSlugLower === 'okro') {
        return 5; // 3 pasos originales + 2 páginas de preguntas específicas
      }
      return 3; // Default for other mini products if any
    }
    return 3;
  };

  const totalSteps = getTotalSteps();

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
    const links: { [key: string]: string } = {
      'vinxi': 'https://www.notion.so/diegoproyectos/Vinxi-Mini-a9fa3b9e599c409882dc3c2e4e4448b2',
      'jaime daily': 'https://www.notion.so/diegoproyectos/Habitus-Prime-Mini-6e4e229029a04c21972974a04b7a99df',
      'okro': 'https://www.notion.so/diegoproyectos/OKRo-Mini-17d70e875cb180cca2b3c908399bdd40',
      'grilla viralis': 'https://www.notion.so/diegoproyectos/Grilla-Viralis-Mini-12670e875cb180f3b7cdc0ba17f73c91'
    };
    
    const productKey = productName.toLowerCase();
    return links[productKey] || undefined;
  };

  const handleSubmit = async () => {
    try {
      const success = await submitToMake(formData);
      if (success) {
        setIsSubmitted(true);
        // Para productos MINI, mantener el modal abierto para que puedan acceder al botón
        // Solo cerrar automáticamente si NO es MINI
        if (isOpen && onClose && productType !== 'mini') {
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
        // Para productos MINI, validar las preguntas específicas de la página 3
        if (productType === 'mini') {
          return validateProductSpecificQuestions(3);
        }
        return formData.productInterest.trim();
      case 4:
        // Para productos MINI, validar las preguntas específicas de la página 4
        if (productType === 'mini') {
          return validateProductSpecificQuestions(4);
        }
        return true;
      case 5:
        // Para productos MINI, validar las preguntas específicas de la página 5
        if (productType === 'mini') {
          return validateProductSpecificQuestions(5);
        }
        return formData.productInterest.trim();
      case 6:
        // Solo para productos MINI, paso final
        return formData.productInterest.trim();
      default:
        return false;
    }
  };

  // Helper para obtener valores de arrays en specificQuestions
  const getArrayValue = (key: string): string[] => {
    const value = formData.specificQuestions[key];
    return Array.isArray(value) ? value : [];
  };

  const getStringValue = (key: string): string => {
    const value = formData.specificQuestions[key];
    return typeof value === 'string' ? value : '';
  };

  // Función para validar las preguntas específicas del producto
  const validateProductSpecificQuestions = (pageNumber: number): boolean => {
    if (productType !== 'mini') return true;

    const productSlugLower = productSlug.toLowerCase();

    if (pageNumber === 3) {
      if (productSlugLower === 'vinxi') {
        const storageValid = !!getStringValue('vinxi_storage') && 
          (getStringValue('vinxi_storage') !== 'Otro' || !!getStringValue('vinxi_storage_other').trim());
        const difficultyValid = !!getStringValue('vinxi_difficulty') && 
          (getStringValue('vinxi_difficulty') !== 'Otro' || !!getStringValue('vinxi_difficulty_other').trim());
        return storageValid && difficultyValid;
      } else if (productSlugLower === 'grilla-viralis' || productSlugLower === 'grilla viralis') {
        const hasPlatforms = getArrayValue('grilla_platforms').length > 0;
        const needsPlatformsOther = getArrayValue('grilla_platforms').includes('Otra');
        const hasPlatformsOtherText = !needsPlatformsOther || !!getStringValue('grilla_platforms_other').trim();
        
        return !!(hasPlatforms && hasPlatformsOtherText && getStringValue('grilla_frequency'));
      } else if (productSlugLower === 'jaime-daily' || productSlugLower === 'jaime daily') {
        const hasDifficulty = getArrayValue('jaime_difficulty').length > 0;
        const needsDifficultyOther = getArrayValue('jaime_difficulty').includes('Otro');
        const hasDifficultyOtherText = !needsDifficultyOther || !!getStringValue('jaime_difficulty_other').trim();
        return !!(getStringValue('jaime_objective') && hasDifficulty && hasDifficultyOtherText);
      } else if (productSlugLower === 'okro') {
        const challengeValid = !!getStringValue('okro_challenge') && 
          (getStringValue('okro_challenge') !== 'Otro' || !!getStringValue('okro_challenge_other').trim());
        const toolsValid = getArrayValue('okro_tools').length > 0;
        const needsToolsOther = getArrayValue('okro_tools').includes('Otro');
        const hasToolsOtherText = !needsToolsOther || !!getStringValue('okro_tools_other').trim();
        
        return !!(challengeValid && toolsValid && hasToolsOtherText);
      }
    } else if (pageNumber === 4) {
      if (productSlugLower === 'vinxi') {
        return !!(getArrayValue('vinxi_projects').length && getStringValue('vinxi_skill_level'));
      } else if (productSlugLower === 'grilla-viralis' || productSlugLower === 'grilla viralis') {
        const hasInvestment = !!getStringValue('grilla_investment');
        const hasTools = getArrayValue('grilla_tools').length > 0;
        const needsToolsOther = getArrayValue('grilla_tools').includes('Otro');
        const hasToolsOtherText = !needsToolsOther || !!getStringValue('grilla_tools_other').trim();
        
        return !!(hasInvestment && hasTools && hasToolsOtherText);
      } else if (productSlugLower === 'jaime-daily' || productSlugLower === 'jaime daily') {
        const hasSystems = !!getStringValue('jaime_systems');
        const needsSystemsOther = getStringValue('jaime_systems') === 'Otro';
        const hasSystemsOtherText = !needsSystemsOther || !!getStringValue('jaime_systems_other').trim();
        
        const hasHabits = getArrayValue('jaime_habits').length > 0;
        const needsHabitsOther = getArrayValue('jaime_habits').includes('Otro');
        const hasHabitsOtherText = !needsHabitsOther || !!getStringValue('jaime_habits_other').trim();
        
        return !!(hasHabits && hasHabitsOtherText && hasSystems && hasSystemsOtherText);
      } else if (productSlugLower === 'okro') {
        const purposeValid = !!getStringValue('okro_purpose') && 
          (getStringValue('okro_purpose') !== 'Otro' || !!getStringValue('okro_purpose_other').trim());
        return !!(getStringValue('okro_experience') && purposeValid);
      }
    } else if (pageNumber === 5) {
      if (productSlugLower === 'grilla-viralis' || productSlugLower === 'grilla viralis') {
        return !!getStringValue('grilla_goals');
      }
    }

    return true;
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
          autoComplete="name"
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
          autoComplete="email"
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
            <option value="" style={{ color: '#9CA3AF' }}>Selecciona tu edad</option>
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
            <option value="" style={{ color: '#9CA3AF' }}>Selecciona tu país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
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
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona tu industria</option>
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
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona el tamaño</option>
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
            <option value="" style={{ color: '#9CA3AF' }}>Selecciona una opción</option>
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

  // Funciones render para preguntas específicas del producto (páginas 3 y 4 para MINI)
  
  // ========== VINXI ==========
  const renderVinxiStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Dónde guardas actualmente tus ideas o pendientes? *
        </label>
        <div className="space-y-2">
          {['Papel y libretas / post-its', 'Chats conmigo mismo (whatsapp, telegram)', 'Notas de voz', 'En apps como Notion, Todoist, Asana, Trello, Airtable...', 'Word o Google Docs', 'Excel o Spreadsheets', 'No tengo sistema definido', 'Otro'].map((option) => {
            const isSelected = getStringValue('vinxi_storage') === option;
            const hasSelection = !!getStringValue('vinxi_storage');
            const isOpaque = hasSelection && !isSelected;
            
            return (
              <label 
                key={option} 
                className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
                  isOpaque ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <input
                  type="radio"
                  name="vinxi_storage"
                  value={option}
                  checked={isSelected}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, vinxi_storage: e.target.value } }))}
                  className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 focus:ring-cyan-400 focus:ring-2"
                />
                <span className="text-white text-sm">{option}</span>
              </label>
            );
          })}
        </div>
        {getStringValue('vinxi_storage') === 'Otro' && (
          <input
            type="text"
            value={getStringValue('vinxi_storage_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, vinxi_storage_other: e.target.value } }))}
            placeholder="Especifica dónde guardas tus ideas..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Cuál es tu mayor dificultad al organizar tus ideas o proyectos? *
        </label>
        <div className="space-y-2">
          {['No sé por dónde empezar', 'Me cuesta priorizar / todo parece urgente', 'No termino lo que empiezo', 'Multiples ideas dispersas', 'Falta de visión general de los proyectos', 'Otro'].map((option) => {
            const isSelected = getStringValue('vinxi_difficulty') === option;
            const hasSelection = !!getStringValue('vinxi_difficulty');
            const isOpaque = hasSelection && !isSelected;
            
            return (
              <label 
                key={option} 
                className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
                  isOpaque ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <input
                  type="radio"
                  name="vinxi_difficulty"
                  value={option}
                  checked={isSelected}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, vinxi_difficulty: e.target.value } }))}
                  className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 focus:ring-cyan-400 focus:ring-2"
                />
                <span className="text-white text-sm">{option}</span>
              </label>
            );
          })}
        </div>
        {getStringValue('vinxi_difficulty') === 'Otro' && (
          <input
            type="text"
            value={getStringValue('vinxi_difficulty_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, vinxi_difficulty_other: e.target.value } }))}
            placeholder="Describe tu mayor dificultad..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>
    </div>
  );

  const renderVinxiStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿En qué tipo de proyectos trabajas? *
        </label>
        <div className="space-y-2">
          {['Proyectos creativos', 'Proyectos de desarrollo/software', 'Proyectos de marketing', 'Proyectos personales', 'Proyectos de consultoría', 'Proyectos académicos', 'Otro'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={getArrayValue('vinxi_projects').includes(option)}
                onChange={(e) => {
                  const current = getArrayValue('vinxi_projects');
                  const updated = e.target.checked
                    ? [...current, option]
                    : current.filter(item => item !== option);
                  setFormData(prev => ({
                    ...prev,
                    specificQuestions: { ...prev.specificQuestions, vinxi_projects: updated }
                  }));
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué nivel tienes en el uso de tablas o bases de datos? *
        </label>
        <select
          value={getStringValue('vinxi_skill_level')}
          onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, vinxi_skill_level: e.target.value } }))}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona tu nivel</option>
          <option value="Principiante - Nunca he usado bases de datos">Principiante - Nunca he usado bases de datos</option>
          <option value="Básico - He usado Excel u hojas de cálculo simples">Básico - He usado Excel u hojas de cálculo simples</option>
          <option value="Intermedio - He usado herramientas como Notion o Airtable">Intermedio - He usado herramientas como Notion o Airtable</option>
          <option value="Avanzado - Conocimiento profundo de bases de datos">Avanzado - Conocimiento profundo de bases de datos</option>
        </select>
      </div>
    </div>
  );

  // ========== GRILLA ==========
  const renderGrillaStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿En qué plataformas digitales tienes presencia y creas contenido? *
        </label>
        <div className="space-y-2">
          {['Blog o Website', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Twitter/X', 'Otra'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={getArrayValue('grilla_platforms').includes(option)}
                onChange={(e) => {
                  const current = getArrayValue('grilla_platforms');
                  const updated = e.target.checked
                    ? [...current, option]
                    : current.filter(item => item !== option);
                  setFormData(prev => ({
                    ...prev,
                    specificQuestions: { ...prev.specificQuestions, grilla_platforms: updated }
                  }));
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
        {getArrayValue('grilla_platforms').includes('Otra') && (
          <input
            type="text"
            value={getStringValue('grilla_platforms_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, grilla_platforms_other: e.target.value } }))}
            placeholder="Especifica qué otra plataforma utilizas..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Con qué frecuencia ideal te gustaría publicar? *
        </label>
        <select
          value={getStringValue('grilla_frequency')}
          onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, grilla_frequency: e.target.value } }))}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona la frecuencia</option>
          <option value="Diario">Diario</option>
          <option value="Varias veces por semana">Varias veces por semana</option>
          <option value="Una vez por semana">Una vez por semana</option>
          <option value="Cada dos semanas">Cada dos semanas</option>
          <option value="Una vez al mes">Una vez al mes</option>
          <option value="Cuando pueda">Cuando pueda</option>
        </select>
      </div>
    </div>
  );

  const renderGrillaStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué herramientas utilizas actualmente para gestionar tus ideas y proyectos de contenido? *
        </label>
        <div className="space-y-2">
          {['Herramientas de diseño (Canva, Photoshop, Figma, etc)', 'Edición de video (CapCut, Premiere, DaVinci, etc)', 'Gestión y productividad (Notion, Airtable, Trello, Asana, Monday, etc)', 'Marketing (HubSpot, Mailchimp, Buffer, etc)', 'Herramientas de Office (Word, PowerPoint, Excel, Google Docs, etc)', 'Otro'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={getArrayValue('grilla_tools').includes(option)}
                onChange={(e) => {
                  const current = getArrayValue('grilla_tools');
                  const updated = e.target.checked
                    ? [...current, option]
                    : current.filter(item => item !== option);
                  setFormData(prev => ({
                    ...prev,
                    specificQuestions: { ...prev.specificQuestions, grilla_tools: updated }
                  }));
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
        {getArrayValue('grilla_tools').includes('Otro') && (
          <input
            type="text"
            value={getStringValue('grilla_tools_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, grilla_tools_other: e.target.value } }))}
            placeholder="Especifica qué otras herramientas utilizas..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Cuál es tu inversión actual en herramientas o recursos de marketing o creación de contenidos? *
        </label>
        <select
          value={getStringValue('grilla_investment')}
          onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, grilla_investment: e.target.value } }))}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona tu inversión</option>
          <option value="Cero inversión">Cero inversión</option>
          <option value="Menos de 50 USD">Menos de 50 USD</option>
          <option value="Menos de 500 USD">Menos de 500 USD</option>
          <option value="Menos de 1000 USD">Menos de 1000 USD</option>
          <option value="1001 USD o más">1001 USD o más</option>
        </select>
      </div>

    </div>
  );

  const renderGrillaContentGoalsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Objetivos de Contenido
        </h3>
        <p className="text-gray-300 text-lg">
          Ayúdanos a entender mejor tus metas
        </p>
      </div>
      
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué esperas lograr con tu contenido prioritariamente? *
        </label>
        <div className="space-y-2">
          {['Atraer clientes', 'Posicionar mi marca personal', 'Compartir conocimiento', 'Crear comunidad'].map((option) => {
            const isSelected = getStringValue('grilla_goals') === option;
            const hasSelection = !!getStringValue('grilla_goals');
            const isOpaque = hasSelection && !isSelected;
            
            return (
              <label 
                key={option} 
                className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
                  isOpaque ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <input
                  type="radio"
                  name="grilla_goals"
                  value={option}
                  checked={isSelected}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, grilla_goals: e.target.value } }))}
                  className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 focus:ring-cyan-400 focus:ring-2"
                />
                <span className="text-white text-sm">{option}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ========== JAIME ==========
  const renderJaimeStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Cuál es tu principal objetivo al usar este sistema de seguimiento de hábitos? *
        </label>
        <select
          value={getStringValue('jaime_objective')}
          onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, jaime_objective: e.target.value } }))}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona tu objetivo</option>
          <option value="Desarrollar nuevos hábitos positivos">Desarrollar nuevos hábitos positivos</option>
          <option value="Romper hábitos negativos">Romper hábitos negativos</option>
          <option value="Mantener consistencia en rutinas">Mantener consistencia en rutinas</option>
          <option value="Aumentar mi productividad diaria">Aumentar mi productividad diaria</option>
          <option value="Mejorar mi bienestar y salud">Mejorar mi bienestar y salud</option>
        </select>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué te resulta más difícil al intentar desarrollar o romper un hábito? *
        </label>
        <div className="space-y-2">
          {['Mantener la constancia', 'Olvidar hacer el seguimiento', 'Falta de motivación inicial', 'No tener claridad en cómo medir progreso', 'Querer hacer muchos cambios a la vez', 'Otro'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={getArrayValue('jaime_difficulty').includes(option)}
                onChange={(e) => {
                  const current = getArrayValue('jaime_difficulty');
                  const updated = e.target.checked
                    ? [...current, option]
                    : current.filter(item => item !== option);
                  setFormData(prev => ({
                    ...prev,
                    specificQuestions: { ...prev.specificQuestions, jaime_difficulty: updated }
                  }));
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
        {getArrayValue('jaime_difficulty').includes('Otro') && (
          <input
            type="text"
            value={getStringValue('jaime_difficulty_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, jaime_difficulty_other: e.target.value } }))}
            placeholder="Especifica qué otras dificultades tienes..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>

    </div>
  );

  const renderJaimeStep4 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué tipo de hábitos te gustaría desarrollar? *
        </label>
        <div className="space-y-2">
          {['Ejercicio físico', 'Lectura o aprendizaje', 'Meditación o mindfulness', 'Alimentación saludable', 'Descanso adecuado', 'Organización personal', 'Otro'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={getArrayValue('jaime_habits').includes(option)}
                onChange={(e) => {
                  const current = getArrayValue('jaime_habits');
                  const updated = e.target.checked
                    ? [...current, option]
                    : current.filter(item => item !== option);
                  setFormData(prev => ({
                    ...prev,
                    specificQuestions: { ...prev.specificQuestions, jaime_habits: updated }
                  }));
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
        {getArrayValue('jaime_habits').includes('Otro') && (
          <input
            type="text"
            value={getStringValue('jaime_habits_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, jaime_habits_other: e.target.value } }))}
            placeholder="Especifica qué otros hábitos te gustaría desarrollar..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué otro sistema has utilizado con anterioridad? *
        </label>
        <div className="space-y-2">
          {['Nunca he usado un sistema de seguimiento', 'Google Sheets o Excel', 'Aplicaciones móviles de hábitos', 'Libretas o diarios físicos', 'Notion u otros sistemas de productividad', 'Otro'].map((option) => {
            const isSelected = getStringValue('jaime_systems') === option;
            const hasSelection = !!getStringValue('jaime_systems');
            const isOpaque = hasSelection && !isSelected;
            
            return (
              <label 
                key={option} 
                className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
                  isOpaque ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <input
                  type="radio"
                  name="jaime_systems"
                  value={option}
                  checked={isSelected}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, jaime_systems: e.target.value } }))}
                  className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 focus:ring-cyan-400 focus:ring-2"
                />
                <span className="text-white text-sm">{option}</span>
              </label>
            );
          })}
        </div>
        {getStringValue('jaime_systems') === 'Otro' && (
          <input
            type="text"
            value={getStringValue('jaime_systems_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, jaime_systems_other: e.target.value } }))}
            placeholder="Especifica qué otro sistema has utilizado..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>
    </div>
  );

  // ========== OKRO ==========
  const renderOKRoStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Cuál es tu principal desafío al trabajar con objetivos? *
        </label>
        <select
          value={getStringValue('okro_challenge')}
          onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, okro_challenge: e.target.value } }))}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona tu principal desafío</option>
          <option value="Definir objetivos claros">Definir objetivos claros</option>
          <option value="Medir el progreso">Medir el progreso</option>
          <option value="Mantener el enfoque">Mantener el enfoque</option>
          <option value="Conectar objetivos con proyectos concretos">Conectar objetivos con proyectos concretos</option>
          <option value="Actualización regular">Actualización regular</option>
          <option value="Visibilidad del progreso">Visibilidad del progreso</option>
          <option value="Otro">Otro</option>
        </select>
        {getStringValue('okro_challenge') === 'Otro' && (
          <input
            type="text"
            value={getStringValue('okro_challenge_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, okro_challenge_other: e.target.value } }))}
            placeholder="Describe tu desafío específico..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Qué herramientas utilizas para gestionar objetivos? *
        </label>
        <div className="space-y-2">
          {['Ninguna herramienta', 'Excel/Google Sheets', 'Herramientas de gestión (Notion, Trello, Asana, etc)', 'Apps de OKR', 'Otro'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={getArrayValue('okro_tools').includes(option)}
                onChange={(e) => {
                  const current = getArrayValue('okro_tools');
                  const updated = e.target.checked
                    ? [...current, option]
                    : current.filter(item => item !== option);
                  setFormData(prev => ({
                    ...prev,
                    specificQuestions: { ...prev.specificQuestions, okro_tools: updated }
                  }));
                }}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 rounded focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
        {getArrayValue('okro_tools').includes('Otro') && (
          <input
            type="text"
            value={getStringValue('okro_tools_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, okro_tools_other: e.target.value } }))}
            placeholder="Especifica qué otras herramientas utilizas..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>
    </div>
  );

  const renderOKRoStep4New = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Cuánto tiempo llevas trabajando con OKRs? *
        </label>
        <div className="space-y-2">
          {['Nunca he usado OKRs', 'Menos de 6 meses', '6 meses - 1 año', '1-2 años', 'Más de 2 años'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="okro_experience"
                value={option}
                checked={getStringValue('okro_experience') === option}
                onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, okro_experience: e.target.value } }))}
                className="w-4 h-4 text-cyan-400 bg-white/10 border-white/20 focus:ring-cyan-400 focus:ring-2"
              />
              <span className="text-white text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          ¿Para qué propósito planeas usar OKRo? *
        </label>
        <select
          value={getStringValue('okro_purpose')}
          onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, okro_purpose: e.target.value } }))}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all"
          required
        >
          <option value="" style={{ color: '#9CA3AF' }}>Selecciona el propósito</option>
          <option value="Gestión de proyectos personales">Gestión de proyectos personales</option>
          <option value="Metas profesionales">Metas profesionales</option>
          <option value="Gestión de equipo">Gestión de equipo</option>
          <option value="Otro">Otro</option>
        </select>
        {getStringValue('okro_purpose') === 'Otro' && (
          <input
            type="text"
            value={getStringValue('okro_purpose_other')}
            onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: { ...prev.specificQuestions, okro_purpose_other: e.target.value } }))}
            placeholder="Especifica otro propósito..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:bg-white/20 focus:border-cyan-400 transition-all mt-2"
            required
          />
        )}
      </div>
    </div>
  );

  const renderProductSpecificStep3 = () => {
    const productSlugLower = productSlug.toLowerCase();
    
    if (productSlugLower === 'vinxi') {
      return renderVinxiStep3();
    } else if (productSlugLower === 'grilla-viralis' || productSlugLower === 'grilla viralis') {
      return renderGrillaStep3();
    } else if (productSlugLower === 'jaime-daily' || productSlugLower === 'jaime daily') {
      return renderJaimeStep3();
    } else if (productSlugLower === 'okro') {
      return renderOKRoStep3();
    }
    return <div></div>;
  };

  const renderProductSpecificStep4 = () => {
    const productSlugLower = productSlug.toLowerCase();
    
    if (productSlugLower === 'vinxi') {
      return renderVinxiStep4();
    } else if (productSlugLower === 'grilla-viralis' || productSlugLower === 'grilla viralis') {
      return renderGrillaStep4();
    } else if (productSlugLower === 'jaime-daily' || productSlugLower === 'jaime daily') {
      return renderJaimeStep4();
    } else if (productSlugLower === 'okro') {
      return renderOKRoStep4New();
    }
    return <div></div>;
  };

  const renderProductSpecificStep5 = () => {
    const productSlugLower = productSlug.toLowerCase();
    
    if (productSlugLower === 'grilla-viralis' || productSlugLower === 'grilla viralis') {
      return renderGrillaContentGoalsStep();
    }
    return <div></div>;
  };

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
          {Array.from({ length: totalSteps }, (_, index) => (
            <div 
              key={index}
              className={`flex-1 h-1 rounded-full transition-all duration-500 ease-out ${
                isSubmitted || currentStep > index + 1 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-600' 
                  : 'bg-gray-800/50'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 pb-6">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-4">¡Perfecto!</h3>
            {productType === 'mini' && (
              <p className="text-white mb-6">
                Tu acceso está listo. Haz clic en el botón para comenzar.
              </p>
            )}
            <p className="text-lg text-gray-300 mb-6">
              {productType === 'spirit' && `Tu solicitud de Spirit ha sido enviada. Te contactaremos pronto.`}
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
            
            {/* Solo mostrar submitMessage si NO es MINI */}
            {submitMessage && productType !== 'mini' && (
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
            {productType === 'mini' ? (
              <>
                {currentStep === 3 && renderProductSpecificStep3()}
                {currentStep === 4 && renderProductSpecificStep4()}
                {(productSlug.toLowerCase() === 'grilla-viralis' || productSlug.toLowerCase() === 'grilla viralis') && currentStep === 5 && renderProductSpecificStep5()}
                {(productSlug.toLowerCase() === 'okro' && currentStep === 5) && renderStep3()}
                {(productSlug.toLowerCase() === 'grilla-viralis' || productSlug.toLowerCase() === 'grilla viralis') && currentStep === 6 && renderStep3()}
              </>
            ) : (
              <>
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </>
            )}
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
