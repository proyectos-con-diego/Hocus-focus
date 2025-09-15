"use client";
import React from "react";
import PlanMarketingHeroSection from '@/components/PlanMarketingHeroSection';
import PlanMarketingProblemsSection from '@/components/PlanMarketingProblemsSection';
import PlanMarketingConvertSection from '@/components/PlanMarketingConvertSection';
import DiagnosticoMarketingSection from '@/components/DiagnosticoMarketingSection';
import QuePasaDespuesSection from '@/components/QuePasaDespuesSection';
import PlanMarketingCasesSection from '@/components/PlanMarketingCasesSection';
import DiagnosticoPricingSection from '@/components/DiagnosticoPricingSection';
import PlanMarketingPricingSection from '@/components/PlanMarketingPricingSection';
import PlanMarketingFAQSection from '@/components/PlanMarketingFAQSection';
import PlanMarketingForm from '@/components/PlanMarketingForm';

export default function PlanMarketingPage() {
  return (
    <main className="bg-black text-gray-200 min-h-screen w-full font-sans overflow-x-hidden">
      <PlanMarketingHeroSection />
      <PlanMarketingProblemsSection />
      <PlanMarketingConvertSection />
      <DiagnosticoMarketingSection />
      <QuePasaDespuesSection />
      <PlanMarketingCasesSection />
      <DiagnosticoPricingSection />
      <PlanMarketingFAQSection />
      <PlanMarketingForm />
    </main>
  );
} 