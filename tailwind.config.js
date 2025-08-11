/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/components/**/*.{js,jsx,ts,tsx}',
    './public/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      // Velvet Design System - Neurodivergent-Friendly Colors
      colors: {
        // Primary Blues (calming)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main blue
          600: '#2563eb', // Primary blue
          700: '#1d4ed8', // Secondary blue
          800: '#1e40af',
          900: '#1e3a8a'
        },
        // Accent Cyan (gentle energy)
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // Accent cyan
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63'
        },
        // Gentle Slate (soothing grays)
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8', // Text secondary
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        // Glass Background Variants
        glass: {
          dark: 'rgba(15, 23, 42, 0.98)',     // slate-900 with opacity
          medium: 'rgba(30, 41, 59, 0.96)',   // slate-800 with opacity
          light: 'rgba(51, 65, 85, 0.90)',    // slate-700 with opacity
          overlay: 'rgba(255, 255, 255, 0.1)' // Light overlay
        },
        // State Colors (for orb states)
        listening: {
          500: '#ef4444', // red-500
          600: '#dc2626',
          gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(249, 115, 22, 0.90) 100%)'
        },
        speaking: {
          500: '#06b6d4', // cyan-500
          600: '#0891b2',
          gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95) 0%, rgba(14, 165, 233, 0.90) 100%)'
        },
        thinking: {
          500: '#8b5cf6', // violet-500
          600: '#7c3aed',
          gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(124, 58, 237, 0.90) 100%)'
        }
      },
      
      // Gentle, Neurodivergent-Friendly Fonts
      fontFamily: {
        system: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'system-ui', 'sans-serif']
      },
      
      // Soft Spacing & Sizing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem'
      },
      
      // Gentle Border Radius
      borderRadius: {
        'xl2': '1.25rem', // 20px - main interface radius
        '2xl2': '1.75rem', // 28px
      },
      
      // Glassmorphism Backdrop Blur
      backdropBlur: {
        'xs': '2px',
        'velvet': '20px' // Main glassmorphism blur
      },
      
      // Soft Box Shadows for Depth
      boxShadow: {
        // Glassmorphism shadows
        'glass': '0 20px 60px rgba(37, 99, 235, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-orb': '0 8px 32px rgba(37, 99, 235, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        'glass-orb-hover': '0 12px 40px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        // State-specific shadows
        'listening-glow': '0 8px 32px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'speaking-glow': '0 8px 32px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'thinking-glow': '0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      },
      
      // Smooth, Calming Animations
      animation: {
        'listening-glow': 'listeningGlow 1.5s infinite',
        'speaking-pulse': 'speakingPulse 0.8s ease-in-out infinite alternate',
        'thinking-glow': 'thinkingGlow 2s ease-in-out infinite',
        'message-slide': 'messageSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'typing-bounce': 'typingBounce 1.4s infinite',
        'mic-pulse': 'micPulse 1.2s infinite',
        'tooltip-fade-in': 'tooltipFadeIn 0.2s ease-out forwards'
      },
      
      // Custom Keyframe Animations
      keyframes: {
        listeningGlow: {
          '0%, 100%': { 
            boxShadow: '0 8px 32px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          },
          '50%': { 
            boxShadow: '0 12px 40px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }
        },
        speakingPulse: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' }
        },
        thinkingGlow: {
          '0%, 100%': { 
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          },
          '50%': { 
            boxShadow: '0 12px 40px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }
        },
        messageSlide: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        typingBounce: {
          '0%, 60%, 100%': {
            transform: 'translateY(0)'
          },
          '30%': {
            transform: 'translateY(-10px)'
          }
        },
        micPulse: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.1)'
          }
        },
        tooltipFadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateX(-50%) translateY(-4px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(-50%) translateY(-8px)'
          }
        }
      },
      
      // Gentle Transitions
      transitionTimingFunction: {
        'velvet': 'cubic-bezier(0.4, 0, 0.2, 1)' // Main easing function
      },
      
      // Typography Scale
      fontSize: {
        'xs2': ['11px', '1.3'],
        'sm2': ['13px', '1.4'],
        'base2': ['14.5px', '1.5']
      }
    }
  },
  plugins: [
    // Custom utility classes for Velvet design system
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        // Glassmorphism Background Gradients
        '.bg-glass-dark': {
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 50%, rgba(15, 23, 42, 0.98) 100%)'
        },
        '.bg-glass-interface': {
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 50%, rgba(51, 65, 85, 0.90) 100%)'
        },
        '.bg-glass-input': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)'
        },
        '.bg-glass-input-focus': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)'
        },
        '.bg-glass-button': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
        },
        '.bg-glass-button-hover': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
        },
        
        // Message Gradients
        '.bg-message-user': {
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.8))'
        },
        '.bg-message-velvet': {
          background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.8))'
        },
        
        // State-specific orb backgrounds
        '.bg-orb-listening': {
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(249, 115, 22, 0.90) 100%)'
        },
        '.bg-orb-speaking': {
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95) 0%, rgba(14, 165, 233, 0.90) 100%)'
        },
        '.bg-orb-thinking': {
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(124, 58, 237, 0.90) 100%)'
        },
        
        // Webkit scrollbar styles
        '.scrollbar-velvet': {
          '&::-webkit-scrollbar': {
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '2px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(135deg, #2563eb, #06b6d4)',
            borderRadius: '2px'
          }
        }
      }
      
      const newComponents = {
        // Glassmorphism glass shine effects
        '.glass-shine::before': {
          content: "''",
          position: 'absolute',
          top: '0',
          right: '0',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '0 20px 0 100%',
          pointerEvents: 'none',
          opacity: '0',
          visibility: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '.glass-shine::after': {
          content: "''",
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          borderRadius: '100% 0 20px 0',
          pointerEvents: 'none',
          opacity: '0',
          visibility: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '.glass-shine.active::before, .glass-shine.active::after': {
          opacity: '1',
          visibility: 'visible'
        }
      }
      
      addUtilities(newUtilities)
      addComponents(newComponents)
    }
  ]
}