// 🔮 Velvet Orb Component - Framer Motion Edition
// "Gentle companion that understands your brain" - Main glassmorphism orb with smooth animations

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VelvetOrbProps } from '../../types/global';
import { useMotion } from '../hooks/useMotion';

const VelvetOrbComponent: React.FC<VelvetOrbProps> = ({
  state = 'normal',
  onClick,
  className = ''
}) => {
  const motionConfig = useMotion();

  const getStateClasses = () => {
    return [
      // Base orb styling with Tailwind (removed CSS animations for Framer Motion)
      'w-[70px] h-[70px]',
      'fixed bottom-6 right-6 z-[1000]',
      'border-0 rounded-full cursor-pointer',
      'flex items-center justify-center',
      'text-[32px] font-semibold',
      'text-white/95 pointer-events-auto',
      'relative',
      
      // Glassmorphism effect - using inline styles for complex gradients
      'backdrop-blur-[20px] border border-blue-500/30'
    ];
  };

  // Get text color based on state for Framer Motion
  const getStateTextColor = () => {
    switch (state) {
      case 'listening':
        return '#ff453a';
      case 'speaking':
        return '#06b6d4';
      case 'thinking':
        return '#8b5cf6';
      default:
        return '#ffffff';
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

  // Animation variants based on state
  const getStateAnimations = () => {
    const baseAnimation = {
      ...getBackgroundStyle(),
      color: getStateTextColor()
    };

    switch (state) {
      case 'listening':
        return {
          ...baseAnimation,
          ...(!motionConfig.reducedMotion && {
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          })
        };
      case 'speaking':
        return {
          ...baseAnimation,
          ...(!motionConfig.reducedMotion && {
            scale: [1, 1.02, 1.04, 1],
            y: [0, -2, 0, -1, 0]
          })
        };
      case 'thinking':
        return {
          ...baseAnimation,
          ...(!motionConfig.reducedMotion && {
            opacity: [0.8, 1, 0.9, 1],
            scale: [1, 1.01, 1]
          })
        };
      default:
        return {
          ...baseAnimation,
          ...motionConfig.breathe.animate
        };
    }
  };

  // Transition configuration based on state
  const getStateTransition = () => {
    if (motionConfig.reducedMotion) {
      return { duration: 0 };
    }

    switch (state) {
      case 'listening':
        return {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        };
      case 'speaking':
        return {
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        };
      case 'thinking':
        return {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        };
      default:
        return motionConfig.breathe.transition;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.button 
        key={state} // Re-mount on state change for smooth transitions
        className={`${getStateClasses().join(' ')} ${className}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={getStateAnimations()}
        exit={{ scale: 0.8, opacity: 0 }}
        whileHover={motionConfig.reducedMotion ? {} : { 
          scale: 1.08,
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
        }}
        whileTap={motionConfig.reducedMotion ? {} : { 
          scale: 0.95 
        }}
        whileFocus={motionConfig.reducedMotion ? {} : {
          ...motionConfig.focusRing.animate
        }}
        transition={{
          ...getStateTransition(),
          // Override for interaction states
          whileHover: { duration: 0.2, ease: "easeOut" },
          whileTap: { duration: 0.1 },
          whileFocus: motionConfig.focusRing.transition
        }}
        onClick={onClick}
        data-tooltip="Click to open Velvet"
        aria-label={`Velvet assistant - ${state} state`}
        // Accessibility improvements
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <motion.span
          animate={motionConfig.reducedMotion ? {} : {
            ...(state === 'thinking' && {
              opacity: [1, 0.5, 1],
            })
          }}
          transition={motionConfig.reducedMotion ? {} : {
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {getStateContent()}
        </motion.span>
      </motion.button>
    </AnimatePresence>
  );
};

VelvetOrbComponent.displayName = 'VelvetOrbComponent';

export default VelvetOrbComponent;