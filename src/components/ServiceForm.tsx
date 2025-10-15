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
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    industria: '',
    ocupacion: '',
    tamanoEquipo: '',
    nombreNegocio: '',
    urgencia: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'service_form',
    source: `service-${serviceSlug}`
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const required = ['nombres', 'apellidos', 'email', 'industria', 'ocupacion', 'tamanoEquipo', 'nombreNegocio', 'urgencia'];
    return required.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
    setFormData({
      nombres: '',
      apellidos: '',
      email: '',
      industria: '',
      ocupacion: '',
      tamanoEquipo: '',
      nombreNegocio: '',
      urgencia: ''
    });
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20">
        <div className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">
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
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{serviceIcon}</div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {serviceName}
        </h2>
        <p className="text-purple-400 font-semibold mb-2">{serviceSubtitle}</p>
        <p className="text-gray-300">{serviceDescription}</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombres y Apellidos */}
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

        {/* Email */}
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

        {/* Industria */}
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

        {/* Ocupación */}
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

        {/* Tamaño del equipo */}
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

        {/* Nombre del negocio */}
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

        {/* Urgencia */}
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

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isSubmitting || !validateForm()}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enviando...
            </span>
          ) : (
            '🚀 Solicitar Diagnóstico'
          )}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Al completar el formulario, te contactaré en las próximas 2 horas para coordinar tu llamada estratégica.
        </p>
      </form>
    </div>
  );
}
