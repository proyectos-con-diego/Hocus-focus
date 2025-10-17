'use client';

import React, { useState } from 'react';
import MultiStepForm from './MultiStepForm';

interface MiniFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productSlug: string;
}

const MiniFormModal: React.FC<MiniFormModalProps> = ({
  isOpen,
  onClose,
  productName,
  productSlug
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido del modal */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 shadow-2xl shadow-purple-500/20">
          {/* Header del modal */}
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎁</div>
            <h2 className="text-4xl font-bold text-white mb-3">
              Obtener {productName}{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                MINI
              </span>
            </h2>
            <p className="text-gray-300 text-lg">
              Versión gratuita disponible
            </p>
          </div>

          {/* Formulario multi-paso */}
          <div>
            <MultiStepForm
              productName={productName}
              productSlug={productSlug}
              productType="mini"
              source={`product-${productSlug}`}
              isOpen={true}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniFormModal;
