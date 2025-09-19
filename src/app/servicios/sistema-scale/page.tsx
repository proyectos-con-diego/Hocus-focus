"use client";
import React from "react";
import SistemaScaleHeroSection from '@/components/SistemaScaleHeroSection';
import SistemaScaleProblemsSection from '@/components/SistemaScaleProblemsSection';
import SistemaScaleComparisonSection from '@/components/SistemaScaleComparisonSection';
import SistemaScaleMethodologySection from '@/components/SistemaScaleMethodologySection';
import SistemaScaleBeforeAfterSection from '@/components/SistemaScaleBeforeAfterSection';
import SistemaScaleROISection from '@/components/SistemaScaleROISection';
import SistemaScaleDiagnosticoSection from '@/components/SistemaScaleDiagnosticoSection';
import SistemaScaleQuePasaDespuesSection from '@/components/SistemaScaleQuePasaDespuesSection';
import SistemaScalePackageSection from '@/components/SistemaScalePackageSection';

import SistemaScaleFAQSection from '@/components/SistemaScaleFAQSection';
import SistemaScaleForm from '@/components/SistemaScaleForm';
import StructuredData, { sistemaScaleStructuredData } from '@/components/StructuredData';

export default function SistemaScalePage() {
  return (
    <main className="bg-black text-gray-200 min-h-screen w-full overflow-x-hidden">
      <StructuredData data={sistemaScaleStructuredData} />
      <SistemaScaleHeroSection />
      <SistemaScaleProblemsSection />
      <SistemaScaleComparisonSection />
      <SistemaScaleMethodologySection />
      <SistemaScaleBeforeAfterSection />
      <SistemaScaleDiagnosticoSection />
      <SistemaScaleQuePasaDespuesSection />
      <SistemaScaleROISection />
      <SistemaScalePackageSection />
      <SistemaScaleFAQSection />
      <SistemaScaleForm />
    </main>
  );
} 