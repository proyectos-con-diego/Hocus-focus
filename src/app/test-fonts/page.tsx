'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Importar todas las fuentes que queremos probar
import { 
  Dancing_Script, 
  Kalam, 
  Caveat, 
  Satisfy, 
  Pacifico,
  Indie_Flower,
  Amatic_SC,
  Shadows_Into_Light
} from "next/font/google";

// Configurar cada fuente
const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: ["400"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: ["400"],
});

const amaticSC = Amatic_SC({
  variable: "--font-amatic-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows-into-light",
  subsets: ["latin"],
  weight: ["400"],
});

const fonts = [
  { name: "Dancing Script", variable: dancingScript.variable, className: "font-dancing-script" },
  { name: "Kalam", variable: kalam.variable, className: "font-kalam" },
  { name: "Caveat", variable: caveat.variable, className: "font-caveat" },
  { name: "Satisfy", variable: satisfy.variable, className: "font-satisfy" },
  { name: "Pacifico", variable: pacifico.variable, className: "font-pacifico" },
  { name: "Indie Flower", variable: indieFlower.variable, className: "font-indie-flower" },
  { name: "Amatic SC", variable: amaticSC.variable, className: "font-amatic-sc" },
  { name: "Shadows Into Light", variable: shadowsIntoLight.variable, className: "font-shadows-into-light" },
];

export default function TestFontsPage() {
  return (
    <div 
      className={`min-h-screen bg-black text-white pt-20 pb-20 px-5 ${dancingScript.variable} ${kalam.variable} ${caveat.variable} ${satisfy.variable} ${pacifico.variable} ${indieFlower.variable} ${amaticSC.variable} ${shadowsIntoLight.variable}`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 text-cyan-400"
        >
          Comparación de Tipografías Manuscritas
        </motion.h1>

        <div className="space-y-12">
          {fonts.map((font, index) => (
            <motion.div
              key={font.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-700 rounded-lg p-8 bg-gray-900/50"
            >
              <h2 className="text-lg font-semibold text-gray-300 mb-4">
                {font.name}
              </h2>
              
              <div className="space-y-4">
                {/* Tamaño grande */}
                <div className={`text-3xl text-gray-400 ${font.className}`}>
                  La magia de las automatizaciones
                </div>
                
                {/* Tamaño mediano */}
                <div className={`text-2xl text-gray-400 ${font.className}`}>
                  La magia de las automatizaciones
                </div>
                
                {/* Tamaño pequeño */}
                <div className={`text-xl text-gray-400 ${font.className}`}>
                  La magia de las automatizaciones
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Variable: {font.variable}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            ¿Cuál te gusta más para el lema "La magia de las automatizaciones"?
          </p>
          <p className="text-sm text-gray-500">
            Una vez que elijas, puedo implementar la que prefieras en la página principal.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
