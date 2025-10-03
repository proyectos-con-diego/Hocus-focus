'use client';
import React, { useState } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

interface VipListModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSlug?: string;
}

export default function VipListModal({ isOpen, onClose, productName = '', productSlug = '' }: VipListModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sector: '',
    experience: '',
    currentChallenges: '',
    goals: '',
    aiFamiliarity: '',
    subscribeNewsletter: true
  });
  
  const { submitToMake, isSubmitting, submitMessage, submitStatus, clearMessage } = useMakeWebhook({
    formType: 'vip_list',
    source: `vip-list-${productSlug || 'general'}`
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitToMake({
      ...formData,
      product: productName
    });

    if (success) {
      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          sector: '',
          experience: '',
          currentChallenges: '',
          goals: '',
          aiFamiliarity: '',
          subscribeNewsletter: true
        });
        clearMessage();
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              🚀 Únete a la Lista VIP
            </h2>
            {productName && (
              <p className="text-gray-400">
                Para <span className="text-purple-400 font-semibold">{productName}</span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                Nombre completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">
                Correo electrónico *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {/* Información del sector */}
          <div>
            <label className="block text-white font-semibold mb-2">
              ¿En qué sector trabajas?
            </label>
            <select
              name="sector"
              value={formData.sector}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="">Selecciona tu sector</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Marketing">Marketing</option>
              <option value="Ventas">Ventas</option>
              <option value="Consultoría">Consultoría</option>
              <option value="Finanzas">Finanzas</option>
              <option value="Educación">Educación</option>
              <option value="Salud">Salud</option>
              <option value="Emprendimiento">Emprendimiento</option>
              <option value="Freelance">Freelance</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* Experiencia con IA */}
          <div>
            <label className="block text-white font-semibold mb-2">
              ¿Qué tan familiarizado estás con la IA?
            </label>
            <select
              name="aiFamiliarity"
              value={formData.aiFamiliarity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="">Selecciona tu nivel</option>
              <option value="Principiante">Principiante - Nunca he usado IA</option>
              <option value="Básico">Básico - He usado ChatGPT ocasionalmente</option>
              <option value="Intermedio">Intermedio - Uso IA regularmente para trabajo</option>
              <option value="Avanzado">Avanzado - Implemento IA en mis procesos</option>
              <option value="Experto">Experto - Desarrollo o entreno modelos de IA</option>
            </select>
          </div>

          {/* Experiencia en el área del producto */}
          <div>
            <label className="block text-white font-semibold mb-2">
              ¿Qué experiencia tienes en esta área?
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="">Selecciona tu nivel</option>
              <option value="Ninguna">Ninguna - Soy completamente nuevo</option>
              <option value="Básica">Básica - He intentado algunas cosas</option>
              <option value="Intermedia">Intermedia - Tengo cierta experiencia</option>
              <option value="Avanzada">Avanzada - Soy bastante experimentado</option>
              <option value="Experta">Experta - Soy un profesional en el área</option>
            </select>
          </div>

          {/* Desafíos actuales */}
          <div>
            <label className="block text-white font-semibold mb-2">
              ¿Cuáles son tus principales desafíos actuales?
            </label>
            <textarea
              name="currentChallenges"
              value={formData.currentChallenges}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              placeholder="Ej: Falta de tiempo, desorganización, no sé por dónde empezar..."
            />
          </div>

          {/* Objetivos */}
          <div>
            <label className="block text-white font-semibold mb-2">
              ¿Qué quieres lograr con este producto?
            </label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              placeholder="Ej: Automatizar mis tareas, ser más productivo, organizar mejor mi trabajo..."
            />
          </div>

          {/* Suscripción al newsletter */}
          <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <input
              type="checkbox"
              name="subscribeNewsletter"
              checked={formData.subscribeNewsletter}
              onChange={handleInputChange}
              className="w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
            />
            <div>
              <label className="text-white font-semibold">
                📧 Recibir actualizaciones por email
              </label>
              <p className="text-gray-400 text-sm">
                Te enviaremos novedades sobre productos, tips y recursos exclusivos
              </p>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uniéndote...
                </span>
              ) : (
                '🚀 Unirme a la Lista VIP'
              )}
            </button>
          </div>

          {/* Status message */}
          {submitMessage && (
            <div className={`p-4 rounded-lg ${
              submitStatus === 'success' 
                ? 'bg-green-900/50 border border-green-700 text-green-300' 
                : 'bg-red-900/50 border border-red-700 text-red-300'
            }`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
