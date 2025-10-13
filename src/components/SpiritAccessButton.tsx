'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SpiritAccessButtonProps {
  spiritName: string;
  spiritSlug: string;
  spiritIcon: string;
  accessUrl: string;
}

export default function SpiritAccessButton({ 
  spiritName, 
  spiritSlug, 
  spiritIcon, 
  accessUrl 
}: SpiritAccessButtonProps) {
  const handleAccessClick = () => {
    // Track the access click
    try {
      // You can add analytics tracking here if needed
      console.log(`Access clicked for ${spiritName}: ${accessUrl}`);
    } catch (error) {
      console.error('Error tracking access click:', error);
    }
    
    // Open the spirit URL in a new tab
    window.open(accessUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-3xl p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">{spiritIcon}</div>
          <h2 className="text-4xl font-bold text-white mb-4">¡Perfecto!</h2>
          <p className="text-white/80 text-lg mb-6">
            Tu solicitud de {spiritName} ha sido enviada exitosamente.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Ahora puedes acceder a tu Spirit personalizado.
          </p>
          
          <motion.button
            onClick={handleAccessClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
          >
            <span className="text-2xl">🎁</span>
            <span>Acceder a {spiritName}</span>
          </motion.button>
          
          <p className="text-gray-500 text-xs mt-4">
            El enlace se abrirá en una nueva pestaña
          </p>
        </div>
      </div>
    </motion.div>
  );
}
