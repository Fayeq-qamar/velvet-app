// Consciousness Loader - Bridges TypeScript React components with existing JavaScript
// This file loads the unified consciousness system into the existing Velvet app

console.log('🚀 CONSCIOUSNESS LOADER: Starting...');

// Check if we're in the right environment
if (typeof window === 'undefined') {
  console.error('❌ CONSCIOUSNESS LOADER: Not in browser environment');
} else if (!window.React || !window.ReactDOM) {
  console.error('❌ CONSCIOUSNESS LOADER: React not available. Loading React first...');
  
  // Load React if not available
  const reactScript = document.createElement('script');
  reactScript.src = 'https://unpkg.com/react@18/umd/react.development.js';
  reactScript.onload = () => {
    const reactDOMScript = document.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.development.js';
    reactDOMScript.onload = () => {
      console.log('✅ React loaded, initializing consciousness...');
      initializeConsciousness();
    };
    document.head.appendChild(reactDOMScript);
  };
  document.head.appendChild(reactScript);
} else {
  // React is available, initialize directly
  initializeConsciousness();
}

function initializeConsciousness() {
  console.log('🧠 CONSCIOUSNESS LOADER: Initializing unified consciousness system...');
  
  try {
    // Load Zustand
    if (!window.zustand) {
      console.log('📦 Loading Zustand...');
      importScript('https://unpkg.com/zustand@5.0.7/esm/index.js', () => {
        console.log('✅ Zustand loaded');
        setupConsciousnessStore();
      });
    } else {
      setupConsciousnessStore();
    }
    
  } catch (error) {
    console.error('❌ CONSCIOUSNESS LOADER: Failed to initialize', error);
    fallbackToLegacyMode();
  }
}

function importScript(src, callback) {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = src;
  script.onload = callback;
  script.onerror = (error) => {
    console.error('❌ Failed to load script:', src, error);
    fallbackToLegacyMode();
  };
  document.head.appendChild(script);
}

function setupConsciousnessStore() {
  console.log('🏪 Setting up consciousness store...');
  
  // Simple consciousness state management without TypeScript complexity
  window.VelvetConsciousness = {
    state: {
      consciousnessLevel: 'minimal',
      streamStatus: {
        connected: false,
        activeStreams: [],
        lastUpdate: 0,
        errors: []
      },
      brainContext: {
        screenText: '',
        ocrConfidence: 0,
        timestamp: Date.now()
      },
      userState: {
        energyLevel: 'medium',
        focusState: 'idle',
        emotionalState: 'calm'
      }
    },
    
    // Update methods
    updateBrainContext(context) {
      this.state.brainContext = { ...this.state.brainContext, ...context };
      this.state.brainContext.timestamp = Date.now();
      this.processUpdate();
    },
    
    updateStreamStatus(status) {
      this.state.streamStatus = { ...this.state.streamStatus, ...status };
      this.updateConsciousnessLevel();
    },
    
    updateUserState(userState) {
      this.state.userState = { ...this.state.userState, ...userState };
    },
    
    processUpdate() {
      // Simple pattern detection
      const patterns = this.detectPatterns();
      if (patterns.length > 0) {
        console.log('🔍 Patterns detected:', patterns);
        this.checkInterventions(patterns);
      }
    },
    
    detectPatterns() {
      const patterns = [];
      const context = this.state.brainContext;
      
      // Hyperfocus detection
      if (context.ocrConfidence > 0.7 && context.screenText.length > 500) {
        patterns.push({
          type: 'hyperfocus',
          confidence: 0.8,
          context: 'High confidence reading detected'
        });
      }
      
      // Distraction detection
      if (context.ocrConfidence < 0.3) {
        patterns.push({
          type: 'distraction',
          confidence: 0.6,
          context: 'Low OCR confidence - possible distraction'
        });
      }
      
      return patterns;
    },
    
    checkInterventions(patterns) {
      patterns.forEach(pattern => {
        if (pattern.type === 'hyperfocus' && pattern.confidence > 0.7) {
          console.log('💡 INTERVENTION: Consider taking a break - you\'ve been focused for a while');
        }
      });
    },
    
    updateConsciousnessLevel() {
      const status = this.state.streamStatus;
      const confidence = this.state.brainContext.ocrConfidence;
      
      if (status.connected && confidence > 0.8) {
        this.state.consciousnessLevel = 'transcendent';
      } else if (status.connected && confidence > 0.6) {
        this.state.consciousnessLevel = 'conscious';
      } else if (status.connected) {
        this.state.consciousnessLevel = 'aware';
      } else {
        this.state.consciousnessLevel = 'minimal';
      }
    },
    
    // Integration methods
    async getBrainContextForAI() {
      const state = this.state;
      
      let contextPrompt = `\n\n--- UNIFIED VELVET CONSCIOUSNESS ---\n`;
      contextPrompt += `🧠 CONSCIOUSNESS LEVEL: ${state.consciousnessLevel.toUpperCase()}\n`;
      contextPrompt += `📡 STREAM STATUS: ${state.streamStatus.connected ? 'CONNECTED' : 'DISCONNECTED'}\n`;
      
      if (state.streamStatus.connected) {
        contextPrompt += `🔗 ACTIVE STREAMS: ${state.streamStatus.activeStreams.join(', ')}\n`;
      }
      
      contextPrompt += `\n👤 USER STATE:\n`;
      contextPrompt += `   🎯 Focus: ${state.userState.focusState} (${state.userState.energyLevel} energy)\n`;
      contextPrompt += `   💭 Emotion: ${state.userState.emotionalState}\n`;
      
      if (state.brainContext.screenText) {
        contextPrompt += `\n👁️ SCREEN AWARENESS:\n`;
        contextPrompt += `   📖 Content: "${state.brainContext.screenText.substring(0, 200)}..."\n`;
        contextPrompt += `   📊 OCR Confidence: ${Math.round(state.brainContext.ocrConfidence * 100)}%\n`;
      }
      
      contextPrompt += `\n🕒 Last Updated: ${new Date(state.brainContext.timestamp).toLocaleTimeString()}\n`;
      contextPrompt += `--- END UNIFIED CONSCIOUSNESS ---\n\n`;
      
      return contextPrompt;
    }
  };
  
  // Start consciousness monitoring
  startConsciousnessMonitoring();
  
  // Integrate with existing AI system
  integrateWithExistingAI();
  
  // Create visual components
  createConsciousnessUI();
  
  console.log('✅ CONSCIOUSNESS LOADER: Unified consciousness system initialized');
}

function startConsciousnessMonitoring() {
  console.log('📡 Starting consciousness monitoring...');
  
  // Monitor stream status and brain context
  setInterval(async () => {
    try {
      // Get stream status from main process
      if (window.electronAPI) {
        const streamStatus = await window.electronAPI.invoke('get-stream-status').catch(() => ({
          connected: false,
          activeStreams: [],
          errors: ['IPC not available']
        }));
        
        window.VelvetConsciousness.updateStreamStatus(streamStatus);
        
        // Get brain context
        const brainContextRaw = await window.electronAPI.invoke('get-brain-context').catch(() => '');
        
        // Parse brain context
        const brainContext = parseBrainContext(brainContextRaw);
        window.VelvetConsciousness.updateBrainContext(brainContext);
      }
    } catch (error) {
      console.warn('⚠️ Consciousness monitoring error:', error);
    }
  }, 2000);
}

function parseBrainContext(rawContext) {
  let screenText = '';
  let ocrConfidence = 0;
  
  if (typeof rawContext === 'string') {
    // Extract screen text
    const screenTextMatch = rawContext.match(/📖 SCREEN.*?:\s*"([^"]*?)"/);
    if (screenTextMatch) {
      screenText = screenTextMatch[1];
    }
    
    // Extract OCR confidence
    const confidenceMatch = rawContext.match(/confidence[:\s]+(\d+(?:\.\d+)?)/i);
    if (confidenceMatch) {
      ocrConfidence = parseFloat(confidenceMatch[1]);
      if (ocrConfidence > 1) {
        ocrConfidence = ocrConfidence / 100;
      }
    }
  }
  
  return {
    screenText,
    ocrConfidence,
    timestamp: Date.now()
  };
}

function integrateWithExistingAI() {
  console.log('🤖 Integrating with existing AI system...');
  
  // Override existing getBrainContext method
  if (window.velvetAI && window.velvetAI.getBrainContext) {
    const originalGetBrainContext = window.velvetAI.getBrainContext;
    
    window.velvetAI.getBrainContext = async function() {
      try {
        const unifiedContext = await window.VelvetConsciousness.getBrainContextForAI();
        console.log('🧠 Using UNIFIED CONSCIOUSNESS for AI context');
        return unifiedContext;
      } catch (error) {
        console.error('❌ Unified consciousness failed, using legacy:', error);
        return originalGetBrainContext.call(this);
      }
    };
    
    console.log('✅ AI integration complete');
  } else {
    console.log('⚠️ Existing AI system not found, consciousness will work independently');
  }
}

function createConsciousnessUI() {
  console.log('🎨 Creating consciousness UI...');
  
  // Add consciousness indicator to the existing orb
  const orbElement = document.querySelector('.glass-orb') || document.querySelector('.orb');
  
  if (orbElement) {
    // Add consciousness level indicator
    const indicator = document.createElement('div');
    indicator.id = 'consciousness-indicator';
    indicator.style.cssText = `
      position: absolute;
      top: 5px;
      right: 5px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #666;
      box-shadow: 0 0 10px currentColor;
      opacity: 0.8;
      z-index: 1000;
    `;
    
    orbElement.style.position = 'relative';
    orbElement.appendChild(indicator);
    
    // Update indicator based on consciousness level
    setInterval(() => {
      const level = window.VelvetConsciousness.state.consciousnessLevel;
      const colors = {
        minimal: '#666666',
        aware: '#3b82f6',
        conscious: '#10b981',
        transcendent: '#ec4899'
      };
      
      indicator.style.background = colors[level] || '#666666';
      indicator.title = `Consciousness Level: ${level}`;
    }, 1000);
    
    console.log('✅ Consciousness indicator added to orb');
  }
  
  // Add debug panel (Ctrl+Shift+C to toggle)
  let debugPanel = null;
  
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      if (debugPanel) {
        debugPanel.remove();
        debugPanel = null;
      } else {
        createDebugPanel();
      }
    }
  });
  
  function createDebugPanel() {
    debugPanel = document.createElement('div');
    debugPanel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 11px;
      max-width: 350px;
      z-index: 10000;
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
    `;
    
    function updateDebugPanel() {
      if (!debugPanel) return;
      
      const state = window.VelvetConsciousness.state;
      debugPanel.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 10px;">🧠 Velvet Consciousness Debug</div>
        <div>Level: ${state.consciousnessLevel}</div>
        <div>Stream: ${state.streamStatus.connected ? '🟢 Connected' : '🔴 Disconnected'}</div>
        <div>Active Streams: ${state.streamStatus.activeStreams.join(', ') || 'None'}</div>
        <div>OCR Confidence: ${Math.round(state.brainContext.ocrConfidence * 100)}%</div>
        <div>Focus State: ${state.userState.focusState}</div>
        <div>Energy Level: ${state.userState.energyLevel}</div>
        <div>Last Update: ${new Date(state.brainContext.timestamp).toLocaleTimeString()}</div>
        <div style="margin-top: 8px; opacity: 0.7;">Press Ctrl+Shift+C to hide</div>
      `;
    }
    
    document.body.appendChild(debugPanel);
    updateDebugPanel();
    
    // Update every second
    const updateInterval = setInterval(() => {
      if (debugPanel) {
        updateDebugPanel();
      } else {
        clearInterval(updateInterval);
      }
    }, 1000);
  }
}

function fallbackToLegacyMode() {
  console.log('🔄 CONSCIOUSNESS LOADER: Falling back to legacy mode');
  
  // Create minimal consciousness state for compatibility
  window.VelvetConsciousness = {
    state: {
      consciousnessLevel: 'minimal',
      streamStatus: { connected: false, activeStreams: [], errors: ['Fallback mode'] }
    },
    
    async getBrainContextForAI() {
      return '\n--- CONSCIOUSNESS SYSTEM IN FALLBACK MODE ---\nUsing legacy brain awareness systems.\n';
    }
  };
  
  console.log('✅ Fallback consciousness system ready');
}

// Make sure consciousness is accessible globally
window.initializeVelvetConsciousness = initializeConsciousness;

console.log('📦 CONSCIOUSNESS LOADER: Ready');