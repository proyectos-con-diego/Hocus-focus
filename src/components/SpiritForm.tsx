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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'spirit_idea',
    source: `spirit-${spiritSlug}`
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

  const validateForm = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           formData.age && 
           formData.country;
  };

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
            <p className="text-white/90 text-lg mb-2">¡Hola!</p>
            <p className="text-gray-300">
              Por favor completa el siguiente formulario para revelar el enlace a tu Spirit:
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Botón de envío */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!validateForm() || isSubmitting}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Enviando...' : `🎁 Obtener ${spiritName} Gratis`}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Al completar el formulario, recibirás el enlace directo a tu Spirit personalizado
          </p>
        </div>
      </div>
    </div>
  );
}
