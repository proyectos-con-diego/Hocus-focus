'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  workSteps, 
  philosophyData, 
  projectsData, 
  contactOptions,
  WorkStep,
  Philosophy,
  Project,
  ContactOption
} from '@/data/sobre-mi';

interface TabContentProps {
  activeTab: string;
  onGoToContact: () => void;
}

export default function TabContent({ activeTab, onGoToContact }: TabContentProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const renderWorkSteps = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {workSteps.map((step: WorkStep, index: number) => (
        <div key={index} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300">
          <div className="text-4xl mb-4">{step.icon}</div>
          <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
          <p className="text-gray-400 mb-4">{step.description}</p>
          <ul className="text-gray-300 space-y-2 text-sm">
            {step.features.map((feature, idx) => (
              <li key={idx}>• {feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderPhilosophy = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {philosophyData.map((philosophy: Philosophy, index: number) => (
        <div key={index} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300">
          <div className="text-4xl mb-4">{philosophy.icon}</div>
          <h3 className="text-xl font-semibold text-white mb-3">{philosophy.title}</h3>
          <p className="text-gray-400 mb-4">{philosophy.description}</p>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-2 text-orange-200 italic inline-block">
            {philosophy.highlight}
          </div>
        </div>
      ))}
    </div>
  );

  const renderProjects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projectsData.map((project: Project, index: number) => (
        <div key={index} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
              {project.badge}
            </span>
            <span className="text-xs text-gray-400">{project.badgeText}</span>
          </div>
          <h3 className="font-bold text-xl text-white mb-3">{project.title}</h3>
          <p className="text-gray-400 text-sm">{project.description}</p>
        </div>
      ))}
    </div>
  );

  const renderContact = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {contactOptions.map((option: ContactOption, index: number) => (
        <div key={index} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300">
          <div className="text-4xl mb-4">{option.icon}</div>
          <h3 className="text-xl font-semibold text-white mb-3">{option.title}</h3>
          <p className="text-gray-400 mb-4">{option.description}</p>
          {option.actionType === 'button' ? (
            <button 
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
              onClick={onGoToContact}
            >
              {option.action}
            </button>
          ) : (
            <a 
              href={option.actionUrl}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 inline-block text-center"
            >
              {option.action}
            </a>
          )}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'enfoque':
        return (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Cómo Trabajo</h2>
              <p className="text-xl text-gray-400">Mi metodología para optimizar procesos y recuperar tiempo</p>
            </div>
            {renderWorkSteps()}
          </>
        );
      case 'filosofia':
        return (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">En qué Creo</h2>
              <p className="text-xl text-gray-400">Los principios que guían mi trabajo</p>
            </div>
            {renderPhilosophy()}
          </>
        );
      case 'proyectos':
        return (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Otros Proyectos</h2>
              <p className="text-xl text-gray-400">Experimentos y vida práctica en los que estoy trabajando</p>
            </div>
            {renderProjects()}
          </>
        );
      case 'contacto':
        return (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">Conectemos</h2>
              <p className="text-xl text-gray-400">¿Listo para recuperar tu tiempo?</p>
            </div>
            {renderContact()}
          </>
        );
      default:
        return null;
    }
  };

  if (activeTab === 'historia') {
    return null; // Timeline se renderiza por separado
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-12"
    >
      {renderContent()}
    </motion.div>
  );
} 