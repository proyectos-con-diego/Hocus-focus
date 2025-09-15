import { useCallback } from 'react';

export const useDynamicGradient = () => {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.background = `radial-gradient(circle at ${x}px ${y}px, #00d4ff, #7c3aed)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.background = 'linear-gradient(45deg, #00d4ff, #7c3aed)';
  }, []);

  return { handleMouseMove, handleMouseLeave };
};
