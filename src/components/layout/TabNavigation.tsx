'use client';
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <section className="py-8 px-6 bg-gray-900/30 border-b border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab.id 
                  ? ''
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              style={activeTab === tab.id ? { 
                background: 'linear-gradient(to right, #f97316, #f59e0b)', 
                color: '#fff' 
              } : {}}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
