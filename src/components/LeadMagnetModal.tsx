'use client';
import React from "react";

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadMagnetModal({ isOpen, onClose }: LeadMagnetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
        
        <div className="text-center">
          <div className="text-4xl mb-4">📖</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            "Mi Metodología de Productividad"
          </h3>
          <p className="text-gray-400 mb-6">
            Los sistemas exactos que uso para ahorrar 20+ horas semanales.
            <br />
            <span className="text-purple-400 font-semibold">PDF de 25 páginas con ejemplos reales</span>
          </p>
          
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Tu mejor email"
              className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
            />
            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-bold text-white hover:scale-105 transition-transform duration-300">
              Enviarme la Guía GRATIS
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            ✅ Sin spam ✅ Solo contenido útil ✅ Descarga inmediata
          </p>
        </div>
      </div>
    </div>
  );
} 