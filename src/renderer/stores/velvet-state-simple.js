// Simplified Velvet State Management System
// Fallback implementation without external dependencies

console.log('🏪 Initializing Velvet State with simple fallback...');

// Simple state object as fallback
const velvetState = {
  // Social Decoder state
  socialDecoder: {
    isActive: false,
    detections: [],
    totalInterventions: 0,
    lastAnalysis: null
  },
  
  // Executive Dysfunction state  
  executiveDysfunction: {
    isActive: false,
    currentCrisis: null,
    interventions: [],
    emergencyMode: false
  },
  
  // Velvet Brain state
  velvetBrain: {
    isActive: false,
    consciousnessLevel: 0,
    thoughtCycles: 0,
    lastThought: null
  },
  
  // UI state
  ui: {
    orbExpanded: false,
    currentMode: 'normal',
    notifications: []
  },
  
  // System state
  system: {
    isInitialized: false,
    activeFeatures: [],
    lastUpdate: Date.now(),
    version: '1.0.0'
  }
};

// Simple event system for state changes
const stateListeners = [];

const useVelvetStore = {
  getState: () => velvetState,
  setState: (updater) => {
    if (typeof updater === 'function') {
      const newState = updater(velvetState);
      Object.assign(velvetState, newState);
    } else {
      Object.assign(velvetState, updater);
    }
    stateListeners.forEach(listener => listener(velvetState));
  },
  subscribe: (listener) => {
    stateListeners.push(listener);
    return () => {
      const index = stateListeners.indexOf(listener);
      if (index > -1) stateListeners.splice(index, 1);
    };
  }
};

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { useVelvetStore };
} else {
  // Set up both formats for compatibility
  window.useVelvetStore = useVelvetStore;
  
  // Create velvetStores object for health check compatibility
  window.velvetStores = {
    store: useVelvetStore
  };
  
  // Initialize system state
  useVelvetStore.setState({
    system: {
      ...velvetState.system,
      isInitialized: true,
      activeFeatures: ['socialDecoder', 'executiveDysfunction', 'velvetBrain']
    }
  });
}

console.log('✅ Velvet State simple fallback initialized');