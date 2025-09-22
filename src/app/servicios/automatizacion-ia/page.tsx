"use client";
import React from "react";
import AutomatizacionIAHeroSection from '@/components/AutomatizacionIAHeroSection';
import AutomatizacionIAProblemsSection from '@/components/AutomatizacionIAProblemsSection';
import AutomatizacionIASolutionSection from '@/components/AutomatizacionIASolutionSection';
import AutomatizacionIAEjemplosSection from '@/components/AutomatizacionIAEjemplosSection';
import AutomatizacionIAROICalculatorSection from '@/components/AutomatizacionIAROICalculatorSection';
import AutomatizacionIADiagnosticoSection from '@/components/AutomatizacionIADiagnosticoSection';
import AutomatizacionIAQuePasaDespuesSection from '@/components/AutomatizacionIAQuePasaDespuesSection';
import AutomatizacionIACaseStudiesSection from '@/components/AutomatizacionIACaseStudiesSection';
import AutomatizacionIAPricingSection from '@/components/AutomatizacionIAPricingSection';
import AutomatizacionIAFAQSection from '@/components/AutomatizacionIAFAQSection';
import AutomatizacionIAForm from '@/components/AutomatizacionIAForm';
import StructuredData, { automatizacionIAStructuredData } from '@/components/StructuredData';
import { event as trackEvent } from '@/lib/analytics';

export default function AutomatizacionIAPage() {
  return (
    <main className="bg-black text-gray-200 min-h-screen w-full overflow-x-hidden">
      <StructuredData data={automatizacionIAStructuredData} />
      <AutomatizacionIAHeroSection />
      <AutomatizacionIAProblemsSection />
      <AutomatizacionIASolutionSection />
      <AutomatizacionIAEjemplosSection />
      <AutomatizacionIAROICalculatorSection />
      <AutomatizacionIADiagnosticoSection />
      <AutomatizacionIAQuePasaDespuesSection />
      <AutomatizacionIACaseStudiesSection />
      <AutomatizacionIAPricingSection />
      <AutomatizacionIAFAQSection />
      <AutomatizacionIAForm />
    </main>
  );
} 