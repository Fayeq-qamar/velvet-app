// 🎭 Motion Hook - Neurodivergent-Friendly Animation System
// "Gentle companion that understands your brain" - Accessibility-first motion support

import { useEffect, useState } from 'react';
import { Transition, MotionProps } from 'framer-motion';

/**
 * Hook that provides accessibility-aware motion configurations for neurodivergent users
 * Respects prefers-reduced-motion and provides gentle, therapeutic animations
 */
export const useMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    // Set initial value
    setReducedMotion(mediaQuery.matches);
    
    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Neurodivergent-friendly animation configurations
  const motionConfig = {
    // Gentle, breathing-like transitions
    gentle: {
      transition: reducedMotion ? { duration: 0 } : {
        type: "spring",
        damping: 25,
        stiffness: 120,
        mass: 1.2
      } as Transition
    },

    // Smooth, calming entrance
    fadeIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: reducedMotion ? { duration: 0 } : {
        duration: 0.4,
        ease: [0.25, 0.8, 0.25, 1]  // Custom ease curve for therapeutic feel
      } as Transition
    },

    // Orb breathing animation
    breathe: {
      animate: reducedMotion ? {} : {
        scale: [1, 1.02, 1],
        opacity: [0.9, 1, 0.9]
      },
      transition: reducedMotion ? { duration: 0 } : {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      } as Transition
    },

    // State transition for orb
    orbState: {
      transition: reducedMotion ? { duration: 0 } : {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]  // Material Design ease
      } as Transition
    },

    // Chat expand/collapse
    chatExpand: {
      initial: { 
        opacity: 0, 
        scale: 0.85, 
        y: 20,
        filter: "blur(10px)"
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        filter: "blur(0px)"
      },
      exit: { 
        opacity: 0, 
        scale: 0.9, 
        y: 10,
        filter: "blur(5px)"
      },
      transition: reducedMotion ? { duration: 0 } : {
        type: "spring",
        damping: 35,
        stiffness: 300,
        mass: 0.8
      } as Transition
    },

    // Message appearance
    messageIn: {
      initial: { opacity: 0, x: -20, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      transition: reducedMotion ? { duration: 0 } : {
        duration: 0.35,
        ease: [0.25, 0.8, 0.25, 1]
      } as Transition
    },

    // Hover effects
    hover: {
      scale: reducedMotion ? 1 : 1.05,
      transition: reducedMotion ? { duration: 0 } : {
        duration: 0.2,
        ease: "easeOut"
      } as Transition
    },

    // Focus ring animation
    focusRing: {
      animate: reducedMotion ? {} : {
        boxShadow: [
          "0 0 0 0 rgba(59, 130, 246, 0.4)",
          "0 0 0 8px rgba(59, 130, 246, 0)",
          "0 0 0 0 rgba(59, 130, 246, 0)"
        ]
      },
      transition: reducedMotion ? { duration: 0 } : {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut"
      } as Transition
    },

    // Thinking dots animation
    thinkingDots: {
      animate: reducedMotion ? {} : {
        opacity: [0.4, 1, 0.4]
      },
      transition: reducedMotion ? { duration: 0 } : {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      } as Transition
    }
  };

  return {
    reducedMotion,
    ...motionConfig
  };
};

/**
 * Creates a motion configuration that respects accessibility preferences
 * @param baseProps - Base motion props
 * @param reducedMotion - Whether reduced motion is preferred
 * @returns Accessibility-aware motion props
 */
export const createAccessibleMotion = (
  baseProps: MotionProps, 
  reducedMotion: boolean
): MotionProps => {
  if (reducedMotion) {
    return {
      ...baseProps,
      animate: baseProps.initial || {},
      transition: { duration: 0 },
      whileHover: undefined,
      whileTap: undefined,
      whileFocus: undefined
    };
  }
  
  return baseProps;
};

/**
 * Predefined motion variants for common Velvet UI patterns
 */
export const velvetMotionVariants = {
  // Container animations
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  },

  // List item animations
  listItem: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  },

  // Pulse for active states
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },

  // Gentle glow effect
  glow: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.3)",
      "0 0 40px rgba(59, 130, 246, 0.5)",
      "0 0 20px rgba(59, 130, 246, 0.3)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};