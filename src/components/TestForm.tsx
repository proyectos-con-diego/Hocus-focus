'use client';
import React, { useState } from 'react';
import { useMakeWebhook } from '../hooks/useMakeWebhook';

export default function TestForm() {
  const [email, setEmail] = useState('');
  
  const { submitToMake, isSubmitting, submitMessage, submitStatus } = useMakeWebhook({
    formType: 'newsletter',
    source: 'test-form'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Enviando formulario de prueba...');
    
    const success = await submitToMake({
      name: 'Test User',
      email: email,
      subscribeNewsletter: true
    });

    console.log('✅ Resultado:', success);
  };

  return (
    <div className="p-8 bg-gray-800 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Formulario de Prueba</h2>
      
      {submitMessage && (
        <div className={`mb-4 p-3 rounded text-sm ${
          submitStatus === 'success' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {submitMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email"
          className="w-full p-3 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 bg-blue-500 text-white rounded disabled:bg-gray-500"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Prueba'}
        </button>
      </form>
    </div>
  );
}
