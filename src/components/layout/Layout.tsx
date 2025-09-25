'use client';
import React from 'react';
import HeaderGlass from './HeaderGlass';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  showGhostLogo?: boolean;
  customLinks?: Array<{
    href: string;
    label: string;
  }>;
  ctaButton?: {
    text: string;
    onClick: () => void;
    icon?: string;
  };
}

export default function Layout({ 
  children, 
  pageTitle = "Hocuz Focuz",
  pageDescription,
  showGhostLogo = true,
  customLinks,
  ctaButton
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <HeaderGlass 
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        showGhostLogo={showGhostLogo}
        customLinks={customLinks}
        ctaButton={ctaButton}
      />

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
