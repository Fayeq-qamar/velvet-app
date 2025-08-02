// Store Integration Layer - Connects existing viral features to Zustand stores
// Maintains backward compatibility while adding unified state management

import { 
  useVelvetStore, 
  storeCoordinator, 
  initializeVelvetStores,
  quickSetupStores,
  storeEvents,
  devUtils 
} from './stores/index.js';

/**
 * StoreIntegrationManager
 * 
 * Manages the integration between existing viral features and the new Zustand store system.
 * Provides a seamless bridge that maintains existing functionality while adding centralized state.
 */
class StoreIntegrationManager {
  constructor() {
    console.log('🔧 Initializing Store Integration Manager...');
    
    this.isInitialized = false;
    this.integrationHooks = new Map();
    this.featureWrappers = new Map();
    this.eventBridge = null;
    
    // Integration status tracking
    this.integrationStatus = {
      storeSystem: false,
      coordinator: false,
      socialDecoder: false,
      executiveDysfunction: false,
      maskingFatigue: false,
      velvetBrain: false,
      eventBridge: false
    };
    
    // Performance tracking
    this.performanceMetrics = {
      integrationStart: Date.now(),
      featureIntegrations: 0,
      stateUpdates: 0,
      eventBridges: 0,
      errors: 0
    };
    
    console.log('🔧 Store Integration Manager core initialized');
  }
  
  /**
   * Initialize the complete integration system
   */
  async initialize() {
    try {
      console.log('🔧 Starting Store Integration Manager initialization...');
      
      // Step 1: Initialize the store system
      console.log('1️⃣ Initializing store system...');
      const storeResult = await initializeVelvetStores();
      if (!storeResult.success) {
        throw new Error(`Store initialization failed: ${storeResult.error}`);
      }
      this.integrationStatus.storeSystem = true;
      this.integrationStatus.coordinator = true;
      
      // Step 2: Set up event bridge
      console.log('2️⃣ Setting up event bridge...');
      this.setupEventBridge();
      this.integrationStatus.eventBridge = true;
      
      // Step 3: Integrate existing features
      console.log('3️⃣ Integrating existing features...');
      await this.integrateAllFeatures();
      
      // Step 4: Set up cross-feature coordination
      console.log('4️⃣ Setting up cross-feature coordination...');
      this.setupCrossFeatureCoordination();
      
      // Step 5: Initialize monitoring
      console.log('5️⃣ Setting up monitoring...');
      this.setupMonitoring();
      
      this.isInitialized = true;
      console.log('✅ Store Integration Manager fully initialized');
      
      // Final status report
      this.logIntegrationStatus();
      
      return true;
      
    } catch (error) {
      console.error('❌ Store Integration Manager initialization failed:', error);
      this.performanceMetrics.errors++;
      return false;
    }
  }
  
  /**
   * Set up event bridge between features and store
   */
  setupEventBridge() {
    console.log('🌉 Setting up event bridge...');
    
    this.eventBridge = {
      // Bridge feature events to store updates
      bridgeFeatureToStore: (featureName, eventName, storeAction) => {
        storeEvents.on(`${featureName}:${eventName}`, (data) => {
          try {
            const store = useVelvetStore.getState();
            if (typeof store[storeAction] === 'function') {
              store[storeAction](data);
              this.performanceMetrics.stateUpdates++;
            }
          } catch (error) {
            console.error(`Event bridge error for ${featureName}:${eventName}:`, error);
            this.performanceMetrics.errors++;
          }
        });
        this.performanceMetrics.eventBridges++;
      },
      
      // Bridge store changes to feature callbacks
      bridgeStoreToFeature: (storeSelector, featureCallback) => {
        const unsubscribe = useVelvetStore.subscribe(
          storeSelector,
          featureCallback
        );
        return unsubscribe;
      }
    };
    
    console.log('✅ Event bridge configured');
  }
  
  /**
   * Integrate all available features
   */
  async integrateAllFeatures() {
    console.log('🔄 Integrating all available features...');
    
    // Integrate each feature individually
    await this.integrateSocialDecoder();
    await this.integrateExecutiveDysfunctionUI();
    await this.integrateMaskingFatigueDetector();
    await this.integrateVelvetBrain();
    
    console.log(`✅ Feature integration complete. ${this.performanceMetrics.featureIntegrations} features integrated.`);
  }
  
  /**
   * Integrate Social Decoder with enhanced store connectivity
   */
  async integrateSocialDecoder() {
    try {
      console.log('🎭 Integrating Social Decoder...');
      
      // Check for Social Decoder instances
      const decoder = window.viralSocialDecoder || window.ViralSocialDecoder;
      if (!decoder) {
        console.log('ℹ️ Social Decoder not found, skipping integration');
        return;
      }
      
      // Create wrapper that bridges Social Decoder to store
      const wrapper = this.createSocialDecoderWrapper(decoder);
      this.featureWrappers.set('socialDecoder', wrapper);
      
      // Initialize in store
      useVelvetStore.getState().initializeSocialDecoder();
      
      // Set up event bridges
      this.setupSocialDecoderEvents(decoder, wrapper);
      
      this.integrationStatus.socialDecoder = true;
      this.performanceMetrics.featureIntegrations++;
      
      console.log('✅ Social Decoder integrated with store');
      
    } catch (error) {
      console.error('❌ Social Decoder integration failed:', error);
      this.performanceMetrics.errors++;
    }
  }
  
  /**
   * Create Social Decoder wrapper with store integration
   */
  createSocialDecoderWrapper(decoder) {
    return {
      // Enhanced analysis processing with store updates
      processAnalysisWithStore: (analysis) => {
        // Call original method if it exists
        if (decoder.processEnhancedAnalysis) {
          decoder.processEnhancedAnalysis(analysis);
        }
        
        // Update store
        useVelvetStore.getState().updateSocialAnalysis({
          ...analysis,
          timestamp: Date.now(),
          storeIntegrated: true
        });
        
        // Check for cross-feature coordination
        this.checkSocialDecoderCoordination(analysis);
      },
      
      // Enhanced meeting mode with store coordination
      activateMeetingModeWithStore: (meetingData) => {
        // Call original method
        if (decoder.activateMeetingMode) {
          decoder.activateMeetingMode(meetingData);
        }
        
        // Update store
        useVelvetStore.getState().activateMeetingMode({
          ...meetingData,
          timestamp: Date.now(),
          storeManaged: true
        });
        
        // Coordinate with masking fatigue
        this.coordinateMeetingWithMasking(meetingData);
      },
      
      // Enhanced intervention triggering
      triggerInterventionWithStore: (intervention, analysis) => {
        // Call original method
        if (decoder.triggerLiveIntervention) {
          decoder.triggerLiveIntervention(intervention, analysis);
        }
        
        // Update store
        useVelvetStore.getState().triggerSocialIntervention({
          ...intervention,
          analysis,
          timestamp: Date.now(),
          coordinated: true
        });
        
        // Check for unified intervention needs
        this.checkUnifiedInterventionNeed(intervention, 'social');
      },
      
      // Store-aware status getter
      getStoreAwareStatus: () => {
        const storeState = useVelvetStore.getState().socialDecoder;
        const originalStatus = decoder.getSystemStatus ? decoder.getSystemStatus() : {};
        
        return {
          ...originalStatus,
          store: {
            isActive: storeState.isActive,
            meetingMode: storeState.isMeetingMode,
            currentAnalysis: storeState.currentAnalysis,
            interventionActive: !!storeState.activeIntervention,
            metrics: storeState.metrics
          },
          integration: {
            storeConnected: true,
            coordinationActive: true,
            lastUpdate: Date.now()
          }
        };
      }
    };
  }
  
  /**
   * Set up Social Decoder event bridges
   */
  setupSocialDecoderEvents(decoder, wrapper) {
    // Override key methods to use wrapper versions
    if (decoder && typeof decoder.processEnhancedAnalysis === 'function') {
      const originalProcess = decoder.processEnhancedAnalysis.bind(decoder);
      decoder.processEnhancedAnalysis = (analysis) => {
        wrapper.processAnalysisWithStore(analysis);
      };
    }
    
    if (decoder && typeof decoder.activateMeetingMode === 'function') {
      const originalActivate = decoder.activateMeetingMode.bind(decoder);
      decoder.activateMeetingMode = (meetingData) => {
        wrapper.activateMeetingModeWithStore(meetingData);
      };
    }
    
    // Set up store-to-feature event flow
    this.eventBridge.bridgeStoreToFeature(
      (state) => state.socialDecoder.isMeetingMode,
      (isMeetingMode) => {
        if (decoder.updateMeetingModeFromStore) {
          decoder.updateMeetingModeFromStore(isMeetingMode);
        }
      }
    );
  }
  
  /**
   * Integrate Executive Dysfunction UI
   */
  async integrateExecutiveDysfunctionUI() {
    try {
      console.log('🚨 Integrating Executive Dysfunction UI...');
      
      const edUI = window.executiveDysfunctionUI;
      if (!edUI) {
        console.log('ℹ️ Executive Dysfunction UI not found, skipping integration');
        return;
      }
      
      // Create wrapper
      const wrapper = this.createExecutiveDysfunctionWrapper(edUI);
      this.featureWrappers.set('executiveDysfunction', wrapper);
      
      // Initialize in store
      useVelvetStore.getState().initializeExecutiveDysfunction();
      
      // Set up event bridges
      this.setupExecutiveDysfunctionEvents(edUI, wrapper);
      
      this.integrationStatus.executiveDysfunction = true;
      this.performanceMetrics.featureIntegrations++;
      
      console.log('✅ Executive Dysfunction UI integrated with store');
      
    } catch (error) {
      console.error('❌ Executive Dysfunction UI integration failed:', error);
      this.performanceMetrics.errors++;
    }
  }
  
  /**
   * Create Executive Dysfunction wrapper
   */
  createExecutiveDysfunctionWrapper(edUI) {
    return {
      // Enhanced crisis handling with store coordination
      handleCrisisWithStore: (crisisData) => {
        // Call original method
        if (edUI.handleCrisisIntervention) {
          edUI.handleCrisisIntervention(crisisData);
        }
        
        // Update store
        useVelvetStore.getState().triggerCrisisIntervention({
          ...crisisData,
          timestamp: Date.now(),
          storeManaged: true
        });
        
        // Coordinate with other features
        this.coordinateCrisisWithOtherFeatures(crisisData);
      },
      
      // Enhanced safe space activation
      activateSafeSpaceWithStore: (duration) => {
        // Call original method
        if (edUI.activateSafeSpace) {
          edUI.activateSafeSpace();
        }
        
        // Update store
        useVelvetStore.getState().activateSafeSpace(duration);
        
        // Coordinate safe space with masking fatigue
        this.coordinateSafeSpaceWithMasking(duration);
      },
      
      // Energy level updates with store sync
      updateEnergyWithStore: (energyLevel) => {
        // Update store
        useVelvetStore.getState().updateEnergyLevel(energyLevel);
        
        // Check for energy-based interventions
        this.checkEnergyBasedInterventions(energyLevel);
      }
    };
  }
  
  /**
   * Set up Executive Dysfunction event bridges
   */
  setupExecutiveDysfunctionEvents(edUI, wrapper) {
    // Override crisis intervention method
    if (edUI && typeof edUI.handleCrisisIntervention === 'function') {
      const originalHandle = edUI.handleCrisisIntervention.bind(edUI);
      edUI.handleCrisisIntervention = (crisisData) => {
        wrapper.handleCrisisWithStore(crisisData);
      };
    }
    
    // Override safe space activation
    if (edUI && typeof edUI.activateSafeSpace === 'function') {
      const originalActivate = edUI.activateSafeSpace.bind(edUI);
      edUI.activateSafeSpace = (duration) => {
        wrapper.activateSafeSpaceWithStore(duration);
      };
    }
    
    // Set up store-to-UI updates
    this.eventBridge.bridgeStoreToFeature(
      (state) => state.executiveDysfunction.currentCrisisLevel,
      (crisisLevel) => {
        if (edUI.updateCrisisLevelFromStore) {
          edUI.updateCrisisLevelFromStore(crisisLevel);
        }
      }
    );
  }
  
  /**
   * Integrate Masking Fatigue Detector
   */
  async integrateMaskingFatigueDetector() {
    try {
      console.log('🎭 Integrating Masking Fatigue Detector...');
      
      let detector = window.maskingFatigueDetector;
      
      // Create instance if class is available but instance isn't
      if (!detector && window.MaskingFatigueDetector) {
        detector = new window.MaskingFatigueDetector();
        window.maskingFatigueDetector = detector;
      }
      
      if (!detector) {
        console.log('ℹ️ Masking Fatigue Detector not found, skipping integration');
        return;
      }
      
      // Create wrapper
      const wrapper = this.createMaskingFatigueWrapper(detector);
      this.featureWrappers.set('maskingFatigue', wrapper);
      
      // Initialize in store
      useVelvetStore.getState().initializeMaskingFatigue();
      
      // Set up event bridges
      this.setupMaskingFatigueEvents(detector, wrapper);
      
      this.integrationStatus.maskingFatigue = true;
      this.performanceMetrics.featureIntegrations++;
      
      console.log('✅ Masking Fatigue Detector integrated with store');
      
    } catch (error) {
      console.error('❌ Masking Fatigue Detector integration failed:', error);
      this.performanceMetrics.errors++;
    }
  }
  
  /**
   * Create Masking Fatigue wrapper
   */
  createMaskingFatigueWrapper(detector) {
    return {
      // Enhanced masking level updates
      updateMaskingLevelWithStore: (maskingData) => {
        // Update store
        useVelvetStore.getState().updateMaskingLevel(maskingData);
        
        // Check for masking-based interventions
        this.checkMaskingBasedInterventions(maskingData);
      },
      
      // Enhanced unmasking opportunity handling
      handleUnmaskingOpportunityWithStore: (opportunity) => {
        // Update store
        useVelvetStore.getState().triggerUnmaskingOpportunity(opportunity);
        
        // Coordinate with other features
        this.coordinateUnmaskingOpportunity(opportunity);
      },
      
      // Enhanced energy tracking
      updateEnergyTrackingWithStore: (energyData) => {
        // Update store
        useVelvetStore.getState().updateEnergyTracking(energyData);
        
        // Check for energy coordination needs
        this.checkEnergyCoordination(energyData);
      }
    };
  }
  
  /**
   * Set up Masking Fatigue event bridges
   */
  setupMaskingFatigueEvents(detector, wrapper) {
    // Set up event listeners if detector has event system
    if (detector && typeof detector.on === 'function') {
      detector.on('maskingLevelChanged', (data) => {
        wrapper.updateMaskingLevelWithStore(data);
      });
      
      detector.on('unmaskingOpportunity', (data) => {
        wrapper.handleUnmaskingOpportunityWithStore(data);
      });
      
      detector.on('energyLevelChanged', (data) => {
        wrapper.updateEnergyTrackingWithStore(data);
      });
    }
    
    // Store-to-detector updates
    this.eventBridge.bridgeStoreToFeature(
      (state) => state.maskingFatigue.contextAwareness,
      (context) => {
        if (detector.updateContextFromStore) {
          detector.updateContextFromStore(context);
        }
      }
    );
  }
  
  /**
   * Integrate Velvet Brain
   */
  async integrateVelvetBrain() {
    try {
      console.log('🧠 Integrating Velvet Brain...');
      
      let brain = window.velvetBrain;
      
      // Create instance if class is available but instance isn't
      if (!brain && window.VelvetBrain) {
        brain = new window.VelvetBrain();
        window.velvetBrain = brain;
      }
      
      if (!brain) {
        console.log('ℹ️ Velvet Brain not found, skipping integration');
        return;
      }
      
      // Create wrapper
      const wrapper = this.createVelvetBrainWrapper(brain);
      this.featureWrappers.set('velvetBrain', wrapper);
      
      // Initialize in store
      useVelvetStore.getState().initializeVelvetBrain();
      
      // Set up event bridges
      this.setupVelvetBrainEvents(brain, wrapper);
      
      this.integrationStatus.velvetBrain = true;
      this.performanceMetrics.featureIntegrations++;
      
      console.log('✅ Velvet Brain integrated with store');
      
    } catch (error) {
      console.error('❌ Velvet Brain integration failed:', error);
      this.performanceMetrics.errors++;
    }
  }
  
  /**
   * Create Velvet Brain wrapper
   */
  createVelvetBrainWrapper(brain) {
    return {
      // Enhanced thought cycle with store updates
      updateThoughtCycleWithStore: (cycleData) => {
        // Update store
        useVelvetStore.getState().updateThoughtCycle(cycleData);
        
        // Provide unified context to brain
        this.provideUnifiedContextToBrain(brain, cycleData);
      },
      
      // Enhanced experience storage
      storeExperienceWithStore: (experience) => {
        // Update store
        useVelvetStore.getState().storeExperience(experience);
        
        // Learn from cross-feature patterns
        this.learnFromCrossFeaturePatterns(experience);
      }
    };
  }
  
  /**
   * Set up Velvet Brain event bridges
   */
  setupVelvetBrainEvents(brain, wrapper) {
    // Override consciousness callbacks
    if (brain && typeof brain.onConsciousnessUpdate === 'function') {
      brain.onConsciousnessUpdate((data) => {
        wrapper.updateThoughtCycleWithStore(data);
      });
    }
    
    // Override learning method
    if (brain && typeof brain.learn === 'function') {
      const originalLearn = brain.learn.bind(brain);
      brain.learn = async (currentState, context, action, outcome) => {
        // Call original method
        await originalLearn(currentState, context, action, outcome);
        
        // Store in unified state
        wrapper.storeExperienceWithStore({
          timestamp: Date.now(),
          state: currentState,
          context,
          action,
          outcome,
          success: outcome.success || false
        });
      };
    }
  }
  
  // ===========================================
  // CROSS-FEATURE COORDINATION METHODS
  // ===========================================
  
  /**
   * Check Social Decoder coordination needs
   */
  checkSocialDecoderCoordination(analysis) {
    const store = useVelvetStore.getState();
    
    // Coordinate with masking fatigue during meetings
    if (store.socialDecoder.isMeetingMode && store.maskingFatigue.isActive) {
      const maskingLevel = store.maskingFatigue.currentMaskingLevel;
      
      if (analysis.detectionType === 'sarcasm' && maskingLevel > 0.7) {
        // High masking during sarcasm detection = potential energy drain
        this.triggerUnifiedIntervention({
          type: 'social_masking_alert',
          priority: 'medium',
          message: 'High masking detected during sarcasm - be aware of energy costs',
          sources: ['socialDecoder', 'maskingFatigue']
        });
      }
    }
  }
  
  /**
   * Coordinate meeting activation with masking detection
   */
  coordinateMeetingWithMasking(meetingData) {
    const store = useVelvetStore.getState();
    
    if (store.maskingFatigue.isActive) {
      // Increase masking awareness during meetings
      store.updateCoordinationPriorities({
        socialDecoder: 0.9,
        maskingFatigue: 0.8
      });
      
      // Provide meeting context to masking detector
      store.updateContextAwareness({
        currentEnvironment: 'work',
        socialLoad: 0.8,
        applicationContext: 'professional'
      });
    }
  }
  
  /**
   * Coordinate crisis with other features
   */
  coordinateCrisisWithOtherFeatures(crisisData) {
    const store = useVelvetStore.getState();
    
    // Crisis affects masking behavior
    if (store.maskingFatigue.isActive) {
      // Reduce masking expectations during crisis
      store.updateMaskingLevel({
        level: Math.max(0, store.maskingFatigue.currentMaskingLevel - 0.3),
        context: 'crisis_adjustment',
        indicators: {
          crisis: true,
          energyConservation: true
        }
      });
    }
    
    // Crisis affects social interactions
    if (store.socialDecoder.isActive && store.socialDecoder.isMeetingMode) {
      this.triggerUnifiedIntervention({
        type: 'crisis_in_meeting',
        priority: 'critical',
        message: 'Crisis detected during meeting - prioritize wellbeing',
        actions: ['activate_safe_space', 'reduce_social_load', 'gentle_exit_strategy']
      });
    }
  }
  
  /**
   * Check for unified intervention needs
   */
  checkUnifiedInterventionNeed(intervention, source) {
    const store = useVelvetStore.getState();
    
    // Check if multiple features need attention simultaneously
    const activeIssues = [];
    
    if (store.executiveDysfunction.currentCrisisLevel !== 'none') {
      activeIssues.push('executive_crisis');
    }
    
    if (store.maskingFatigue.currentMaskingLevel > 0.8) {
      activeIssues.push('high_masking');
    }
    
    if (store.socialDecoder.isMeetingMode && intervention.priority === 'high') {
      activeIssues.push('social_stress');
    }
    
    if (store.executiveDysfunction.energyLevel < 0.3) {
      activeIssues.push('low_energy');
    }
    
    // Trigger unified intervention if multiple issues detected
    if (activeIssues.length >= 2) {
      this.triggerUnifiedIntervention({
        type: 'multi_feature_support',
        priority: 'high',
        issues: activeIssues,
        message: 'Multiple support needs detected - coordinated assistance available',
        sources: [source, ...activeIssues.map(issue => issue.split('_')[0])]
      });
    }
  }
  
  /**
   * Trigger unified intervention
   */
  triggerUnifiedIntervention(intervention) {
    const store = useVelvetStore.getState();
    
    store.triggerUnifiedIntervention({
      ...intervention,
      timestamp: Date.now(),
      coordinator: 'store-integration'
    });
    
    console.log('🔗 Unified intervention triggered:', intervention.type);
  }
  
  // ===========================================
  // MONITORING & UTILITIES
  // ===========================================
  
  /**
   * Set up monitoring systems
   */
  setupMonitoring() {
    // Monitor integration health
    this.healthMonitorInterval = setInterval(() => {
      this.checkIntegrationHealth();
    }, 30000); // Every 30 seconds
    
    // Monitor performance
    this.performanceMonitorInterval = setInterval(() => {
      this.updatePerformanceMetrics();
    }, 10000); // Every 10 seconds
  }
  
  /**
   * Check integration health
   */
  checkIntegrationHealth() {
    const issues = [];
    
    // Check store system
    if (!this.integrationStatus.storeSystem) {
      issues.push('Store system not initialized');
    }
    
    // Check coordinator
    if (storeCoordinator && !storeCoordinator.isInitialized) {
      issues.push('Store coordinator not active');
    }
    
    // Check feature integrations
    const integratedCount = Object.values(this.integrationStatus).filter(Boolean).length;
    if (integratedCount < 3) {
      issues.push(`Only ${integratedCount} features integrated`);
    }
    
    if (issues.length > 0) {
      console.warn('⚠️ Integration health issues:', issues);
    } else {
      console.log('✅ Integration health check passed');
    }
  }
  
  /**
   * Update performance metrics
   */
  updatePerformanceMetrics() {
    const store = useVelvetStore.getState();
    
    console.log('📊 Integration Performance:', {
      uptime: `${Math.round((Date.now() - this.performanceMetrics.integrationStart) / 1000)}s`,
      featuresIntegrated: this.performanceMetrics.featureIntegrations,
      stateUpdates: this.performanceMetrics.stateUpdates,
      eventBridges: this.performanceMetrics.eventBridges,
      errors: this.performanceMetrics.errors,
      storeUpdates: store.system.performanceMetrics.stateUpdates,
      avgUpdateTime: `${store.system.performanceMetrics.averageUpdateTime.toFixed(2)}ms`
    });
  }
  
  /**
   * Log integration status
   */
  logIntegrationStatus() {
    console.log('📋 Store Integration Status:');
    Object.entries(this.integrationStatus).forEach(([feature, status]) => {
      console.log(`  ${status ? '✅' : '❌'} ${feature}`);
    });
    
    console.log(`🎯 ${this.performanceMetrics.featureIntegrations} features successfully integrated`);
  }
  
  /**
   * Get complete integration status
   */
  getIntegrationStatus() {
    return {
      isInitialized: this.isInitialized,
      integrationStatus: this.integrationStatus,
      performanceMetrics: this.performanceMetrics,
      featureWrappers: Array.from(this.featureWrappers.keys()),
      storeHealth: useVelvetStore.getState().getSystemStatus()
    };
  }
  
  /**
   * Clean shutdown
   */
  async shutdown() {
    console.log('🛑 Shutting down Store Integration Manager...');
    
    // Clear intervals
    if (this.healthMonitorInterval) {
      clearInterval(this.healthMonitorInterval);
    }
    if (this.performanceMonitorInterval) {
      clearInterval(this.performanceMonitorInterval);
    }
    
    // Shutdown coordinator
    if (storeCoordinator && storeCoordinator.isInitialized) {
      await storeCoordinator.shutdown();
    }
    
    // Clear feature wrappers
    this.featureWrappers.clear();
    this.integrationHooks.clear();
    
    this.isInitialized = false;
    console.log('✅ Store Integration Manager shutdown complete');
  }
}

// Create global instance
const storeIntegrationManager = new StoreIntegrationManager();

// Auto-initialize when script loads
storeIntegrationManager.initialize().then(success => {
  if (success) {
    console.log('🎯 Store Integration System ready');
  } else {
    console.error('❌ Store Integration System failed to initialize');
  }
});

// Make available globally
window.storeIntegrationManager = storeIntegrationManager;

// Export for module usage
export default storeIntegrationManager;

console.log('🔧 Store Integration Layer loaded - bridging existing features to unified state');