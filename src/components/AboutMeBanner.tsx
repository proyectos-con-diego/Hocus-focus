import React from 'react';
import { useRouter } from 'next/navigation';

interface AboutMeBannerProps {
  onServicesClick?: () => void;
}

export default function AboutMeBanner({ onServicesClick }: AboutMeBannerProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onServicesClick) {
      onServicesClick();
    } else {
      router.push('/servicios');
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-r relative overflow-hidden" style={{
      background: 'linear-gradient(to right, #7c3aed, #4c1d95)'
    }}>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight">¿Listo para escalar tu negocio?</h2>
        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
          <span>Únete a quienes ya están recuperando 8-20 horas semanales con mis sistemas de automatización IA.</span><br />
          <span className="text-purple-300 font-semibold">Precios de lanzamiento + atención personalizada.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={handleClick}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-110 transform transition-all duration-300"
          >
            🚀 Ver servicios de automatización
          </button>
          <button 
            onClick={() => router.push('/spirit-gpts')}
            className="px-10 py-4 border-2 border-white text-white rounded-full font-bold text-xl hover:bg-white hover:text-purple-900 transition-all duration-300"
          >
            🎁 Probar Spirits gratis
          </button>
        </div>
      </div>
    </section>
  );
} 