'use client';
import React from 'react';
import ServiceForm from './ServiceForm';

export default function AutomatizacionIAForm() {
  return (
    <div id="formulario" className="w-full max-w-4xl mx-auto py-16">
      <ServiceForm
        serviceName="Diagnóstico AUTOMATE"
        serviceSlug="automatizacion-ia"
        serviceIcon="🤖"
        serviceSubtitle="Automatización IA"
        serviceDescription="Descubre qué procesos de tu negocio pueden automatizarse para ahorrar tiempo y reducir errores."
      />
    </div>
  );
}
