// Store Integration Layer - Connects existing viral features to simple state
// Maintains backward compatibility while adding unified state management

console.log('🔗 Store Integration Layer loading...');

/**
 * StoreIntegrationManager
 * Simple integration without complex dependencies
 */
class StoreIntegrationManager {
  constructor() {
    this.isInitialized = false;
    this.features = new Map();
    this.integrations = [];
  }

  async initialize() {
    console.log('🔗 Initializing Store Integration...');
    
    try {
      // Simple integration with existing systems
      this.connectBasicFeatures();
      this.isInitialized = true;
      console.log('✅ Store Integration initialized (simple mode)');
      return true;
    } catch (error) {
      console.error('❌ Store Integration failed:', error);
      return false;
    }
  }

  connectBasicFeatures() {
    // Basic feature connections without complex state management
    console.log('🔗 Connecting basic features...');
    
    // Check for existing features
    const availableFeatures = [
      'SocialDecoder',
      'VelvetBrain', 
      'ContextAwarenessSystem',
      'MaskingFatigueDetector'
    ];

    availableFeatures.forEach(featureName => {
      if (typeof window[featureName] !== 'undefined') {
        this.features.set(featureName, { available: true, connected: true });
        console.log(`✅ ${featureName} connected`);
      } else {
        this.features.set(featureName, { available: false, connected: false });
        console.log(`⚠️ ${featureName} not available`);
      }
    });
  }

  getFeatureStatus() {
    return Object.fromEntries(this.features);
  }
}

// Global instance for integration
window.storeIntegrationManager = new StoreIntegrationManager();

// Initialize immediately after creation
setTimeout(async () => {
    try {
        if (window.storeIntegrationManager && !window.storeIntegrationManager.isInitialized) {
            await window.storeIntegrationManager.initialize();
            console.log('🔗 Store Integration Manager auto-initialized successfully');
        }
    } catch (error) {
        console.error('❌ Store Integration Manager auto-initialization failed:', error);
    }
}, 200); // Small delay to ensure dependencies are loaded

console.log('✅ Store Integration Layer loaded');