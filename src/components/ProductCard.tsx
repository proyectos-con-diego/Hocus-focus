'use client';
import React from 'react';
import { Product } from '../data/products';

// Función helper para mapear nombres de productos a nombres de archivos de imágenes
function getPetImageName(productName: string): string {
  const imageMapping: { [key: string]: string } = {
    'OKRo': 'okro-panda',
    'Grilla Viralis': 'Grilla',
    'Jaime Daily': 'Jaime-Daily',
    'Navio': 'Navio-Lobo',
    'Bafet': 'Bafet',
    'Midas': 'Midas',
    'Vinxi': 'Vinxi',
    'Mythos': 'Mythos'
  };
  
  return imageMapping[productName] || productName;
}

interface ProductCardProps {
  product: Product;
  onClick: (slug: string) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const handleClick = () => {
    onClick(product.slug);
  };

  // Función para obtener el primer nombre del producto
  const getFirstName = (fullName: string): string => {
    return fullName.split(' ')[0];
  };

  // Función para obtener el texto del botón según el producto
  const getButtonText = (productName: string): string => {
    switch (productName.toLowerCase()) {
      case 'jaime daily':
        return '🚀 Empieza con Jaime';
      case 'vinxi':
        return '✨ Organiza con Vinxi';
      case 'grilla viralis':
        return '💡 Inspírate con Grilla';
      case 'midas':
        return '💰 Ordena con Midas';
      case 'okro':
        return '🎯 Avanza con OKRo';
      case 'bafet':
        return '📊 Analiza con Bafet';
      case 'navio':
        return 'Lista de Espera';
      default:
        return `Conoce a ${getFirstName(productName)}`;
    }
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div 
      className="relative text-center transition-all duration-400 product-card group"
      style={{
        borderRadius: '20px',
        padding: 'clamp(20px, 5vw, 32px) clamp(16px, 4vw, 28px)',
        marginTop: 'clamp(40px, 8vw, 60px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        minHeight: '400px',
        background: 'linear-gradient(145deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.95))',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        const avatar = card.querySelector('.mascot-avatar') as HTMLElement;
        const button = card.querySelector('.btn-shop') as HTMLElement;
        
        card.style.transform = 'translateY(-6px) scale(1.02)';
        card.style.borderColor = 'rgba(139, 92, 246, 0.4)';
        card.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        
        if (avatar) {
          avatar.style.transform = 'scale(1.08) rotate(8deg)';
          avatar.style.filter = 'drop-shadow(0 8px 16px rgba(139, 92, 246, 0.3))';
        }
        
        if (button) {
          button.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        const avatar = card.querySelector('.mascot-avatar') as HTMLElement;
        const button = card.querySelector('.btn-shop') as HTMLElement;
        
        card.style.transform = 'translateY(0) scale(1)';
        card.style.borderColor = 'rgba(75, 85, 99, 0.3)';
        card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
        
        if (avatar) {
          avatar.style.transform = 'scale(1) rotate(0deg)';
          avatar.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
        }
        
        if (button) {
          button.style.transform = 'translateY(0)';
        }
      }}
    >
      {/* Sale Badge - Oculto */}
      {/* <div className="absolute top-6 right-6 z-15" style={{
        background: product.isBeta ? 'linear-gradient(45deg, #6b7280, #4b5563)' : 'linear-gradient(45deg, #e91e63, #ad1457)',
        color: 'white',
        padding: '6px 10px',
        borderRadius: '10px',
        fontSize: '0.75rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        boxShadow: product.isBeta ? '0 4px 15px rgba(107, 114, 128, 0.3)' : '0 4px 15px rgba(233, 30, 99, 0.3)'
      }}>
        {product.isBeta ? 'Pronto' : product.discount}
      </div> */}

      {/* Mascot Avatar */}
      <div className="mb-5 relative">
        <div 
          className="mascot-avatar mx-auto mb-3 transition-all duration-500"
          style={{
            width: 'clamp(180px, 20vw, 207px)',
            height: 'clamp(180px, 20vw, 207px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'clamp(-90px, -8vw, -92px) auto 12px',
            position: 'relative',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
          }}
        >
          <img 
            src={`/Cabezas-pets/${getPetImageName(product.name)}.png`}
            alt={`${product.name} mascota`}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback al emoji si la imagen no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.style.fontSize = '90px';
              fallback.textContent = product.emoji;
              target.parentNode?.insertBefore(fallback, target);
            }}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="text-3xl font-black mb-1" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, letterSpacing: '-0.5px' }}>
        {product.name}
      </div>
      <div className="text-sm mb-2 font-medium" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', color: '#06b6d4', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {product.badge}
      </div>
      <div className="text-base opacity-85 mb-3" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', opacity: 0.85, lineHeight: 1.4, fontWeight: 500 }}>
        {product.description}
      </div>
      <div className="text-sm text-green-400 mb-6 font-semibold" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', color: '#4ade80', fontWeight: 600 }}>
        {product.beneficioDestacado}
      </div>

      {/* Pricing - Oculto */}
      {/* <div className="mb-8">
        {product.currentPrice !== "Próximamente" && (
          <div className="text-lg text-red-400 line-through opacity-70 mb-1" style={{ fontSize: '1.1rem', color: '#ff5252', textDecoration: 'line-through', opacity: 0.7, fontWeight: 600 }}>
            {product.originalPrice}
          </div>
        )}
        <div 
          className={`font-black text-green-400 mb-2 ${product.currentPrice === "Próximamente" ? 'text-2xl' : 'text-4xl'}`} 
          style={{ 
            fontSize: product.currentPrice === "Próximamente" ? '1.5rem' : '2.4rem', 
            fontWeight: 900, 
            color: '#4caf50', 
            lineHeight: 1 
          }}
        >
          {product.currentPrice}
        </div>
        <div className="text-sm opacity-70 font-medium" style={{ fontSize: '0.85rem', opacity: 0.7, fontWeight: 500 }}>
          {product.isBeta ? 'Acceso Beta' : 'Pago único'}
        </div>
      </div> */}

      {/* Action Button */}
      <div className="mt-auto pt-6">
        <button 
          className="btn-shop w-full py-3 px-6 text-base font-semibold transition-all duration-300 cursor-pointer touch-manipulation" 
          style={{
            border: 'none',
            borderRadius: '12px',
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.2px',
            background: 'linear-gradient(135deg, rgba(75, 85, 99, 0.8), rgba(55, 65, 81, 0.8))',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            minHeight: '48px'
          }}
          onMouseEnter={(e) => {
            const button = e.currentTarget;
            button.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.9))';
            button.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            button.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            const button = e.currentTarget;
            button.style.background = 'linear-gradient(135deg, rgba(75, 85, 99, 0.8), rgba(55, 65, 81, 0.8))';
            button.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}
          onClick={(e) => {
            e.stopPropagation();
            createRipple(e);
            handleClick();
          }}
        >
          {product.isBeta ? 'Lista de Espera' : getButtonText(product.name)}
        </button>
      </div>
    </div>
  );
} 