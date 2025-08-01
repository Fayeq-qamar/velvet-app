import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ConsciousnessVisualizer } from './components/ConsciousnessVisualizer';
import { consciousnessBridge } from './integration/consciousness-bridge';
import { useConsciousnessStore } from './stores/consciousness-store';

interface VelvetConsciousnessAppProps {
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const VelvetConsciousnessApp: React.FC<VelvetConsciousnessAppProps> = ({ 
  isExpanded, 
  onToggleExpanded 
}) => {
  const consciousnessLevel = useConsciousnessStore(state => state.consciousnessLevel);
  const streamStatus = useConsciousnessStore(state => state.streamStatus);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  useEffect(() => {
    console.log('🚀 VELVET CONSCIOUSNESS APP: Mounted');
    
    // Integration with existing Velvet AI system
    if (window.velvetAI && window.velvetAI.getBrainContext) {
      // Override the existing getBrainContext with our unified version
      const originalGetBrainContext = window.velvetAI.getBrainContext;
      
      window.velvetAI.getBrainContext = async function() {
        try {
          // Use the new unified consciousness context
          const unifiedContext = await consciousnessBridge.getBrainContextForLegacyAI();
          console.log('🧠 Using UNIFIED CONSCIOUSNESS for AI context');
          return unifiedContext;
        } catch (error) {
          console.error('❌ Unified consciousness failed, falling back to legacy:', error);
          return originalGetBrainContext.call(this);
        }
      };
      
      console.log('✅ Integrated unified consciousness with existing AI system');
    }

    // Enhanced voice integration
    if (window.getVelvetResponse) {
      const originalGetVelvetResponse = window.getVelvetResponse;
      
      window.getVelvetResponse = async function(userMessage: string) {
        // Process voice input for task detection
        await consciousnessBridge.processVoiceInput(userMessage);
        
        // Use original response system but with enhanced context
        return originalGetVelvetResponse(userMessage);
      };
      
      console.log('✅ Enhanced voice system with consciousness integration');
    }

    // Keyboard shortcut for debug info
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        setShowDebugInfo(!showDebugInfo);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showDebugInfo]);

  const getConsciousnessStatusColor = () => {
    if (streamStatus.connected && consciousnessLevel === 'conscious') {
      return '#10b981'; // Green - fully conscious
    } else if (streamStatus.connected) {
      return '#3b82f6'; // Blue - connected but processing
    } else {
      return '#ef4444'; // Red - disconnected
    }
  };

  if (!isExpanded) {
    // Integrate with existing glassmorphism orb
    return (
      <div className="consciousness-orb-overlay">
        <ConsciousnessVisualizer isExpanded={false} />
        
        {/* Status indicator for consciousness level */}
        <div 
          className="consciousness-status-indicator"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: getConsciousnessStatusColor(),
            boxShadow: `0 0 10px ${getConsciousnessStatusColor()}`,
            opacity: 0.8
          }}
          title={`Consciousness Level: ${consciousnessLevel}`}
        />
      </div>
    );
  }

  // Expanded mode - full consciousness dashboard
  return (
    <div className="velvet-consciousness-app">
      <ConsciousnessVisualizer isExpanded={true} />
      
      {/* Debug info toggle */}
      {showDebugInfo && (
        <div className="debug-panel">
          <h4>🐛 Debug Info (Ctrl+Shift+C to toggle)</h4>
          <div className="debug-content">
            <div>Consciousness Level: {consciousnessLevel}</div>
            <div>Stream Connected: {streamStatus.connected ? 'Yes' : 'No'}</div>
            <div>Active Streams: {streamStatus.activeStreams.join(', ') || 'None'}</div>
            <div>Last Update: {new Date(streamStatus.lastUpdate).toLocaleTimeString()}</div>
            <div>Errors: {streamStatus.errors.length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Function to mount the React app into existing DOM
export function mountVelvetConsciousness(containerId: string = 'velvet-consciousness-container') {
  console.log('🚀 Mounting Velvet Consciousness React App...');
  
  // Create container if it doesn't exist
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 1000;
    `;
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  
  // Create a wrapper component that manages state from the existing Velvet UI
  const VelvetConsciousnessWrapper = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      // Listen for the existing Velvet UI expand/collapse events
      const checkExpansion = () => {
        // Check if the chat container is expanded (from existing code)
        const chatContainer = document.querySelector('.chat-container');
        const isCurrentlyExpanded = chatContainer && 
          getComputedStyle(chatContainer).display !== 'none';
        setIsExpanded(!!isCurrentlyExpanded);
      };

      // Check every 500ms for UI state changes
      const interval = setInterval(checkExpansion, 500);
      checkExpansion(); // Initial check

      return () => clearInterval(interval);
    }, []);

    return (
      <VelvetConsciousnessApp 
        isExpanded={isExpanded}
        onToggleExpanded={() => setIsExpanded(!isExpanded)}
      />
    );
  };

  root.render(<VelvetConsciousnessWrapper />);
  
  console.log('✅ Velvet Consciousness React App mounted');
  return root;
}

// CSS for integration with existing styles
const integrationStyles = `
.consciousness-orb-overlay {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.velvet-consciousness-app {
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  pointer-events: all;
}

.debug-panel {
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 11px;
  max-width: 300px;
  z-index: 10000;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.debug-content {
  margin-top: 8px;
}

.debug-content > div {
  margin: 2px 0;
  opacity: 0.9;
}

/* Integration with existing glassmorphism */
.consciousness-orb-overlay .consciousness-pulse {
  background: inherit;
}

/* Ensure consciousness visualizer works with existing animations */
@keyframes consciousnessPulse {
  0% { 
    opacity: 0.4; 
    transform: scale(0.98); 
  }
  100% { 
    opacity: 0.9; 
    transform: scale(1.02); 
  }
}
`;

// Inject integration styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = integrationStyles;
  document.head.appendChild(styleSheet);
}

export default VelvetConsciousnessApp;