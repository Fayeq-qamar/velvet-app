// Velvet Store System - Main Entry Point
// Unified state management for all viral neurodivergent features

// Core store and coordinator
export { useVelvetStore } from './velvet-state-simple.js';
export { default as storeCoordinator } from './store-coordinator.js';

// Performance-optimized selectors
export * from './store-selectors.js';

// Existing consciousness store (maintained for compatibility)
export { 
  useConsciousnessStore,
  useBrainContext,
  useStreamStatus,
  useUserState
} from './consciousness-store.ts';

/**
 * Store Initialization Function
 * Call this to set up the complete Zustand state management system
 */
export async function initializeVelvetStores() {
  console.log('🎯 Initializing Velvet Store System...');
  
  try {
    // Initialize the store coordinator
    const coordinatorInitialized = await storeCoordinator.initialize();
    
    if (!coordinatorInitialized) {
      throw new Error('Store coordinator initialization failed');
    }
    
    // Mark system as initialized in store
    const store = useVelvetStore.getState();
    store.system.isInitialized = true;
    store.system.initializationProgress = 100;
    
    console.log('✅ Velvet Store System fully initialized');
    console.log('🎯 Features available:', store.system.activeFeatures);
    
    return {
      success: true,
      coordinator: storeCoordinator,
      store: useVelvetStore,
      integrationStatus: storeCoordinator.getIntegrationStatus()
    };
    
  } catch (error) {
    console.error('❌ Velvet Store System initialization failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Quick setup function for existing features
 * Automatically detects and integrates available viral features
 */
export function quickSetupStores() {
  console.log('⚡ Quick setup: Integrating available features...');
  
  const integration = {
    socialDecoder: false,
    executiveDysfunction: false,
    maskingFatigue: false,
    velvetBrain: false
  };
  
  // Check for Social Decoder
  if (window.ViralSocialDecoder || window.viralSocialDecoder) {
    useVelvetStore.getState().initializeSocialDecoder();
    integration.socialDecoder = true;
    console.log('✅ Social Decoder integrated');
  }
  
  // Check for Executive Dysfunction UI
  if (window.executiveDysfunctionUI) {
    useVelvetStore.getState().initializeExecutiveDysfunction();
    integration.executiveDysfunction = true;
    console.log('✅ Executive Dysfunction integrated');
  }
  
  // Check for Masking Fatigue Detector
  if (window.MaskingFatigueDetector || window.maskingFatigueDetector) {
    useVelvetStore.getState().initializeMaskingFatigue();
    integration.masking = true;
    console.log('✅ Masking Fatigue integrated');
  }
  
  // Check for Velvet Brain
  if (window.VelvetBrain || window.velvetBrain) {
    useVelvetStore.getState().initializeVelvetBrain();
    integration.velvetBrain = true;
    console.log('✅ Velvet Brain integrated');
  }
  
  return integration;
}

/**
 * Store Health Check
 * Monitors store performance and health
 */
export function checkStoreHealth() {
  const store = useVelvetStore.getState();
  const status = store.getSystemStatus();
  
  const health = {
    overall: 'healthy',
    issues: [],
    recommendations: [],
    performance: status.performanceMetrics
  };
  
  // Check initialization
  if (!store.system.isInitialized) {
    health.overall = 'initializing';
    health.issues.push('System still initializing');
  }
  
  // Check active features
  if (store.system.activeFeatures.length === 0) {
    health.overall = 'degraded';
    health.issues.push('No active features detected');
    health.recommendations.push('Run quickSetupStores() to integrate available features');
  }
  
  // Check performance
  if (store.system.performanceMetrics.averageUpdateTime > 100) {
    health.overall = 'slow';
    health.issues.push('Slow store updates detected');
    health.recommendations.push('Consider reducing state update frequency');
  }
  
  // Check store coordinator
  if (storeCoordinator && storeCoordinator.isInitialized) {
    const coordinatorStatus = storeCoordinator.getIntegrationStatus();
    if (!coordinatorStatus.coordinator) {
      health.overall = 'degraded';
      health.issues.push('Store coordinator not active');
      health.recommendations.push('Reinitialize store coordinator');
    }
  }
  
  return health;
}

/**
 * Development utilities for debugging store state
 */
export const devUtils = {
  // Get complete store state
  getFullState: () => useVelvetStore.getState(),
  
  // Get specific feature state
  getFeatureState: (featureName) => {
    const state = useVelvetStore.getState();
    return state[featureName] || null;
  },
  
  // Monitor store updates
  monitorUpdates: (callback) => {
    return useVelvetStore.subscribe(
      (state) => state.system.performanceMetrics.stateUpdates,
      (updateCount) => {
        callback({
          updateCount,
          timestamp: Date.now(),
          avgUpdateTime: useVelvetStore.getState().system.performanceMetrics.averageUpdateTime
        });
      }
    );
  },
  
  // Reset specific feature
  resetFeature: (featureName) => {
    const { resetFeature } = useVelvetStore.getState();
    resetFeature(featureName);
    console.log(`🔄 ${featureName} state reset`);
  },
  
  // Trigger manual coordination
  triggerCoordination: () => {
    if (storeCoordinator && storeCoordinator.isInitialized) {
      storeCoordinator.triggerCoordination();
      console.log('🔗 Manual cross-feature coordination triggered');
    }
  },
  
  // Get performance report
  getPerformanceReport: () => {
    const store = useVelvetStore.getState();
    const coordinatorStatus = storeCoordinator?.getIntegrationStatus();
    
    return {
      system: store.system.performanceMetrics,
      features: {
        socialDecoder: store.socialDecoder.metrics,
        executiveDysfunction: store.executiveDysfunction,
        maskingFatigue: store.maskingFatigue.performanceMetrics,
        velvetBrain: store.velvetBrain.metrics
      },
      coordinator: coordinatorStatus?.performance,
      recommendations: []
    };
  },
  
  // Export/Import state for debugging
  exportState: () => {
    const state = useVelvetStore.getState();
    const exportData = {
      timestamp: Date.now(),
      version: '1.0.0',
      system: state.system,
      features: {
        socialDecoder: state.socialDecoder,
        executiveDysfunction: state.executiveDysfunction,
        maskingFatigue: state.maskingFatigue,
        velvetBrain: state.velvetBrain
      },
      userContext: state.userContext,
      coordination: state.coordination
    };
    
    // Remove large arrays to keep export manageable
    exportData.features.maskingFatigue.communicationPatterns.formalLanguage.recentSamples = [];
    exportData.features.velvetBrain.memory.experiences = [];
    
    return exportData;
  }
};

/**
 * Store event system for external integrations
 */
export class StoreEventEmitter {
  constructor() {
    this.listeners = new Map();
    this.unsubscribers = new Map();
  }
  
  // Subscribe to store changes
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    
    // Set up store subscription for this event
    this.setupStoreSubscription(event);
  }
  
  setupStoreSubscription(event) {
    if (this.unsubscribers.has(event)) return;
    
    let unsubscriber;
    
    switch (event) {
      case 'social:intervention':
        unsubscriber = useVelvetStore.subscribe(
          (state) => state.socialDecoder.activeIntervention,
          (intervention) => this.emit(event, intervention)
        );
        break;
        
      case 'executive:crisis':
        unsubscriber = useVelvetStore.subscribe(
          (state) => state.executiveDysfunction.currentCrisisLevel,
          (level) => this.emit(event, level)
        );
        break;
        
      case 'masking:high':
        unsubscriber = useVelvetStore.subscribe(
          (state) => state.maskingFatigue.currentMaskingLevel,
          (level) => {
            if (level > 0.8) this.emit(event, level);
          }
        );
        break;
        
      case 'energy:low':
        unsubscriber = useVelvetStore.subscribe(
          (state) => state.executiveDysfunction.energyLevel,
          (level) => {
            if (level < 0.3) this.emit(event, level);
          }
        );
        break;
        
      case 'brain:consciousness':
        unsubscriber = useVelvetStore.subscribe(
          (state) => state.velvetBrain.consciousnessLevel,
          (level) => this.emit(event, level)
        );
        break;
    }
    
    if (unsubscriber) {
      this.unsubscribers.set(event, unsubscriber);
    }
  }
  
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Store event listener error for ${event}:`, error);
        }
      });
    }
  }
  
  off(event, callback = null) {
    if (callback) {
      const listeners = this.listeners.get(event) || [];
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    } else {
      this.listeners.delete(event);
      if (this.unsubscribers.has(event)) {
        this.unsubscribers.get(event)();
        this.unsubscribers.delete(event);
      }
    }
  }
  
  cleanup() {
    this.unsubscribers.forEach(unsubscriber => unsubscriber());
    this.unsubscribers.clear();
    this.listeners.clear();
  }
}

// Global store event emitter instance
export const storeEvents = new StoreEventEmitter();

// Make utilities available globally for debugging
if (typeof window !== 'undefined') {
  window.velvetStores = {
    store: useVelvetStore,
    coordinator: storeCoordinator,
    events: storeEvents,
    dev: devUtils,
    init: initializeVelvetStores,
    quickSetup: quickSetupStores,
    healthCheck: checkStoreHealth
  };
}

/**
 * React Hook for easy store initialization
 */
export function useStoreInitialization() {
  const [initialized, setInitialized] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    initializeVelvetStores()
      .then(result => {
        if (result.success) {
          setInitialized(true);
        } else {
          setError(result.error);
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);
  
  return { initialized, error };
}

console.log('🎯 Velvet Store System - Main entry point loaded');
console.log('📦 Available exports: store, selectors, coordinator, initialization utilities');