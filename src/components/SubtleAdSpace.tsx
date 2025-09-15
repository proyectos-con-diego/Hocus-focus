"use client";
import React, { useState, useEffect, useRef } from "react";

export const SubtleAdSpace = ({ size, className = "", type = "banner" }: { size: string; className?: string; type?: "banner" | "sidebar" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  const getTypeClass = () => {
    return type === "sidebar"
      ? "bg-gray-900/30 border-gray-700/20"
      : "bg-gray-900/40 border-gray-700/30";
  };

  return (
    <div
      ref={adRef}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
    >
      <div className={`${getTypeClass()} border rounded-xl p-4 text-center backdrop-blur-sm`}>
        <div className="text-gray-500 text-xs mb-2 font-medium tracking-wide">PUBLICIDAD</div>
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-6 flex items-center justify-center border border-gray-700/20">
          <span className="text-gray-400 text-sm">{size}</span>
        </div>
      </div>
    </div>
  );
};

export const AdSeparator = () => (
  <div className="flex items-center gap-3 my-8">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent"></div>
    <span className="text-xs text-gray-500 px-3 font-medium tracking-wide">PUBLICIDAD</span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent"></div>
  </div>
); 