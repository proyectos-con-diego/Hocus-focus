'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { timelineData } from '@/data/sobre-mi';

export default function TimelineSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  const dotVariants = {
    hover: { 
      scale: 1.2, 
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto py-10">
      {/* Timeline vertical */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-amber-400 to-yellow-400 rounded-full -translate-x-1/2" />
      
      {/* Items */}
      <motion.div 
        className="relative z-10 space-y-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center md:items-start md:justify-between"
          >
            {index % 2 === 0 ? (
              <>
                <div className="md:w-1/2 md:pr-10 text-right md:text-right mb-6 md:mb-0">
                  <div className={`inline-block bg-gradient-to-r ${item.color} text-white px-4 py-1 rounded-full font-bold mb-2`}>
                    {item.year}
                  </div>
                  <div className="text-xl font-bold text-white mb-2">{item.title}</div>
                  <div className="text-gray-300 mb-2">{item.description}</div>
                  <div className={`bg-${item.color.split('-')[1]}-500/10 border border-${item.color.split('-')[1]}-500/30 rounded-lg px-4 py-2 text-${item.color.split('-')[1]}-200 italic inline-block`}>
                    {item.quote}
                  </div>
                </div>
                <motion.div
                  variants={dotVariants}
                  whileHover="hover"
                  className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-full border-4 border-black mx-8 md:mx-0 transition-shadow duration-300`}
                  style={{
                    boxShadow: `0 0 24px ${getColorHex(item.color)}aa`
                  }}
                />
                <div className="md:w-1/2" />
              </>
            ) : (
              <>
                <div className="md:w-1/2" />
                <motion.div
                  variants={dotVariants}
                  whileHover="hover"
                  className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-full border-4 border-black mx-8 md:mx-0 transition-shadow duration-300`}
                  style={{
                    boxShadow: `0 0 24px ${getColorHex(item.color)}aa`
                  }}
                />
                <div className="md:w-1/2 md:pl-10 text-left md:text-left mb-6 md:mb-0">
                  <div className={`inline-block bg-gradient-to-r ${item.color} text-white px-4 py-1 rounded-full font-bold mb-2`}>
                    {item.year}
                  </div>
                  <div className="text-xl font-bold text-white mb-2">{item.title}</div>
                  <div className="text-gray-300 mb-2">{item.description}</div>
                  <div className={`bg-${item.color.split('-')[1]}-500/10 border border-${item.color.split('-')[1]}-500/30 rounded-lg px-4 py-2 text-${item.color.split('-')[1]}-200 italic inline-block`}>
                    {item.quote}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Helper function to get color hex for box-shadow
function getColorHex(colorClass: string): string {
  const colorMap: { [key: string]: string } = {
    'from-orange-500 to-amber-500': '#ff9800',
    'from-red-500 to-red-700': '#ef4444',
    'from-green-500 to-emerald-500': '#10b981',
    'from-blue-500 to-blue-600': '#3b82f6'
  };
  return colorMap[colorClass] || '#ff9800';
} 