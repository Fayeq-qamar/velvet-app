// 🔮 Velvet Orb Component
// "Gentle companion that understands your brain" - Main glassmorphism orb with states

import React, { useEffect } from 'react';
import { VelvetOrbProps } from '../../types/global';

const VelvetOrbComponent: React.FC<VelvetOrbProps> = ({
  state = 'normal',
  onClick,
  className = ''
}) => {

  // Add CSS styles to document if not already present
  useEffect(() => {
    const styleId = 'velvet-orb-styles';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = orbStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

  const getStateClass = () => {
    switch (state) {
      case 'listening':
        return 'listening';
      case 'speaking':
        return 'speaking';
      case 'thinking':
        return 'thinking';
      default:
        return '';
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

  return (
    <button 
      className={`velvet-orb tooltip ${getStateClass()} ${className}`}
      onClick={onClick}
      data-tooltip="Click to open Velvet"
      aria-label={`Velvet assistant - ${state} state`}
    >
      {getStateContent()}
    </button>
  );
};

// CSS Styles matching the original vanilla implementation
const orbStyles = `
/* Velvet Orb Styles */
.velvet-orb {
  width: 70px;
  height: 70px;
  position: fixed !important;
  top: auto !important;
  left: auto !important;
  bottom: 25px !important;
  right: 25px !important;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
  color: rgba(255, 255, 255, 0.95);
  pointer-events: auto;
  
  /* Glassmorphism effect - matching control panel opacity */
  background: 
    linear-gradient(135deg, 
      rgba(15, 23, 42, 0.98) 0%,
      rgba(30, 41, 59, 0.96) 50%,
      rgba(15, 23, 42, 0.98) 100%
    );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  
  box-shadow: 
    0 8px 32px rgba(37, 99, 235, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.velvet-orb:hover {
  transform: scale(1.05);
  box-shadow: 
    0 12px 40px rgba(37, 99, 235, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.velvet-orb:active {
  transform: scale(0.95);
}

/* State-specific styles */
.velvet-orb.listening {
  background: 
    linear-gradient(135deg, 
      rgba(239, 68, 68, 0.95) 0%, 
      rgba(249, 115, 22, 0.90) 100%
    );
  color: #ff453a;
  filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.8));
  animation: listeningGlow 1.5s infinite;
}

.velvet-orb.speaking {
  background: 
    linear-gradient(135deg, 
      rgba(6, 182, 212, 0.95) 0%, 
      rgba(14, 165, 233, 0.90) 100%
    );
  color: #06b6d4;
  filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.8));
  animation: speakingPulse 0.8s ease-in-out infinite alternate;
}

.velvet-orb.thinking {
  background: 
    linear-gradient(135deg, 
      rgba(139, 92, 246, 0.95) 0%, 
      rgba(124, 58, 237, 0.90) 100%
    );
  color: #8b5cf6;
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.8));
  animation: thinkingGlow 2s ease-in-out infinite;
}

/* State animations */
@keyframes listeningGlow {
  0%, 100% { 
    box-shadow: 
      0 8px 32px rgba(249, 115, 22, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% { 
    box-shadow: 
      0 12px 40px rgba(249, 115, 22, 0.5),
      0 0 20px rgba(249, 115, 22, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

@keyframes speakingPulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.02); }
}

@keyframes thinkingGlow {
  0%, 100% { 
    box-shadow: 
      0 8px 32px rgba(139, 92, 246, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% { 
    box-shadow: 
      0 12px 40px rgba(139, 92, 246, 0.5),
      0 0 20px rgba(139, 92, 246, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

/* Tooltip support */
.tooltip {
  position: relative;
}

.tooltip:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  z-index: 10000;
  opacity: 0;
  animation: tooltipFadeIn 0.2s ease-out forwards;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-8px);
  }
}
`;

VelvetOrbComponent.displayName = 'VelvetOrbComponent';

export default VelvetOrbComponent;