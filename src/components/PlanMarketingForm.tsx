'use client';
import React from 'react';
import ServiceForm from './ServiceForm';

export default function PlanMarketingForm() {
  return (
    <div id="formulario" className="w-full max-w-4xl mx-auto py-16">
      <ServiceForm
        serviceName="Diagnóstico CONVERT"
        serviceSlug="plan-marketing"
        serviceIcon="🚀"
        serviceSubtitle="Plan de Marketing"
        serviceDescription="Reserva tu plan de marketing personalizado y transforma tu estrategia de conversión."
      />
    </div>
  );
}
