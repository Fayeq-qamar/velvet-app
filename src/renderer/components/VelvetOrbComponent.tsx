// 🔮 Velvet Orb Component - Tailwind Edition
// "Gentle companion that understands your brain" - Main glassmorphism orb with states

import React from 'react';
import { VelvetOrbProps } from '../../types/global';

const VelvetOrbComponent: React.FC<VelvetOrbProps> = ({
  state = 'normal',
  onClick,
  className = ''
}) => {

  const getStateClasses = () => {
    const baseClasses = [
      // Base orb styling with Tailwind
      'w-[70px] h-[70px]',
      'fixed bottom-6 right-6 z-[1000]',
      'border-0 rounded-full cursor-pointer',
      'transition-all duration-500 ease-out',
      'flex items-center justify-center',
      'text-[32px] font-semibold',
      'text-white/95 pointer-events-auto',
      'relative',
      
      // Glassmorphism effect - using inline styles for complex gradients
      'backdrop-blur-[20px] border border-blue-500/30',
      
      // Hover states
      'hover:scale-105 active:scale-95'
    ];

    // State-specific classes
    switch (state) {
      case 'listening':
        return [
          ...baseClasses,
          'text-[#ff453a]',
          'animate-pulse'
        ];
      case 'speaking':
        return [
          ...baseClasses,
          'text-cyan-500',
          'animate-bounce'
        ];
      case 'thinking':
        return [
          ...baseClasses,
          'text-purple-500',
          'animate-pulse'
        ];
      default:
        return baseClasses;
    }
  };

  const getStateContent = () => {
    switch (state) {
      case 'listening':
        return '●';
      case 'speaking':
        return '◉';
      case 'thinking':
        return '⋯';
      default:
        return 'V';
    }
  };

  const getBackgroundStyle = () => {
    switch (state) {
      case 'listening':
        return {
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(249, 115, 22, 0.90) 100%)',
          filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.8))',
          boxShadow: '0 8px 32px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
        };
      case 'speaking':
        return {
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95) 0%, rgba(14, 165, 233, 0.90) 100%)',
          filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))',
          boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
        };
      case 'thinking':
        return {
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(124, 58, 237, 0.90) 100%)',
          filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.8))',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
        };
      default:
        return {
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 50%, rgba(15, 23, 42, 0.98) 100%)',
          boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
        };
    }
  };

  return (
    <button 
      className={`${getStateClasses().join(' ')} ${className}`}
      style={getBackgroundStyle()}
      onClick={onClick}
      data-tooltip="Click to open Velvet"
      aria-label={`Velvet assistant - ${state} state`}
    >
      {getStateContent()}
    </button>
  );
};

VelvetOrbComponent.displayName = 'VelvetOrbComponent';

export default VelvetOrbComponent;