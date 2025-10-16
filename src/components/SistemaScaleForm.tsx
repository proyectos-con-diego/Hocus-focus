'use client';
import React from 'react';
import ServiceForm from './ServiceForm';

export default function SistemaScaleForm() {
  return (
    <div id="formulario" className="w-full max-w-4xl mx-auto py-16">
      <ServiceForm
        serviceName="Diagnóstico SCALE"
        serviceSlug="sistema-scale"
        serviceIcon="📈"
        serviceSubtitle="Sistema de Escalamiento"
        serviceDescription="Evalúa tu negocio y descubre cómo implementar un sistema que crezca contigo."
      />
    </div>
  );
}
