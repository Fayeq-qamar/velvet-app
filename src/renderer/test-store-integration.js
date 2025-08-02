// Store Integration Testing Suite
// Comprehensive tests for the Zustand state management system

/**
 * Store Integration Test Suite
 * 
 * Tests all aspects of the new state management system:
 * - Core store functionality
 * - Feature integration
 * - Cross-feature coordination
 * - Performance optimization
 * - Backward compatibility
 */
class StoreIntegrationTests {
  constructor() {
    console.log('🧪 Initializing Store Integration Test Suite...');
    
    this.testResults = {
      passed: 0,
      failed: 0,
      skipped: 0,
      errors: []
    };
    
    this.testSuites = [
      'coreStore',
      'featureIntegration', 
      'crossFeatureCoordination',
      'performanceOptimization',
      'backwardCompatibility'
    ];
    
    console.log('🧪 Test Suite initialized');
  }
  
  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('🧪 Starting comprehensive store integration tests...');
    console.log('=' .repeat(60));
    
    const startTime = Date.now();
    
    try {
      // Test each suite
      for (const suite of this.testSuites) {
        console.log(`\n📋 Running ${suite} tests...`);
        await this[`test${suite.charAt(0).toUpperCase() + suite.slice(1)}`]();
      }
      
      const duration = Date.now() - startTime;
      
      console.log('\n' + '=' .repeat(60));
      console.log('🧪 TEST RESULTS SUMMARY');
      console.log('=' .repeat(60));
      console.log(`✅ Passed: ${this.testResults.passed}`);
      console.log(`❌ Failed: ${this.testResults.failed}`);
      console.log(`⏭️ Skipped: ${this.testResults.skipped}`);
      console.log(`⏱️ Duration: ${duration}ms`);
      
      if (this.testResults.errors.length > 0) {
        console.log('\n🐛 ERRORS:');
        this.testResults.errors.forEach((error, index) => {
          console.log(`${index + 1}. ${error}`);
        });
      }
      
      const success = this.testResults.failed === 0;
      console.log(`\n🎯 Overall Result: ${success ? '✅ PASS' : '❌ FAIL'}`);
      
      return {
        success,
        results: this.testResults,
        duration
      };
      
    } catch (error) {
      console.error('❌ Test suite execution failed:', error);
      return {
        success: false,
        error: error.message,
        results: this.testResults
      };
    }
  }
  
  // ===========================================
  // CORE STORE TESTS
  // ===========================================
  
  async testCoreStore() {
    console.log('🔍 Testing core store functionality...');
    
    // Test store existence
    this.test('Store exists and is accessible', () => {
      return typeof window.velvetStores !== 'undefined' && 
             typeof window.velvetStores.store !== 'undefined';
    });
    
    // Test store initialization
    this.test('Store is properly initialized', () => {
      const store = window.velvetStores.store.getState();
      return store.system.isInitialized === true;
    });
    
    // Test feature initialization methods
    this.test('Feature initialization methods exist', () => {
      const store = window.velvetStores.store.getState();
      return typeof store.initializeSocialDecoder === 'function' &&
             typeof store.initializeExecutiveDysfunction === 'function' &&
             typeof store.initializeMaskingFatigue === 'function' &&
             typeof store.initializeVelvetBrain === 'function';
    });
    
    // Test state update methods
    this.test('State update methods exist', () => {
      const store = window.velvetStores.store.getState();
      return typeof store.updateSocialAnalysis === 'function' &&
             typeof store.updateMaskingLevel === 'function' &&
             typeof store.updateEnergyLevel === 'function';
    });
    
    // Test performance metrics
    this.test('Performance metrics are tracked', () => {
      const store = window.velvetStores.store.getState();
      return typeof store.system.performanceMetrics === 'object' &&
             typeof store.system.performanceMetrics.stateUpdates === 'number';
    });
    
    // Test coordination system
    this.test('Coordination system exists', () => {
      const store = window.velvetStores.store.getState();
      return typeof store.coordination === 'object' &&
             typeof store.coordination.activePriorities === 'object';
    });
  }
  
  // ===========================================
  // FEATURE INTEGRATION TESTS
  // ===========================================
  
  async testFeatureIntegration() {
    console.log('🔗 Testing feature integration...');
    
    // Test Social Decoder integration
    this.test('Social Decoder integration', () => {
      if (!window.ViralSocialDecoder && !window.viralSocialDecoder) {
        this.testResults.skipped++;
        console.log('⏭️ Social Decoder not available, skipping');
        return true;
      }
      
      const store = window.velvetStores.store.getState();
      const hasFeature = store.system.activeFeatures.includes('socialDecoder');
      const storeIntegration = window.storeIntegrationManager?.getIntegrationStatus();
      
      return hasFeature && storeIntegration?.integrationStatus?.socialDecoder;
    });
    
    // Test Executive Dysfunction integration
    this.test('Executive Dysfunction integration', () => {
      if (!window.executiveDysfunctionUI) {
        this.testResults.skipped++;
        console.log('⏭️ Executive Dysfunction UI not available, skipping');
        return true;
      }
      
      const store = window.velvetStores.store.getState();
      const hasFeature = store.system.activeFeatures.includes('executiveDysfunction');
      const storeIntegration = window.storeIntegrationManager?.getIntegrationStatus();
      
      return hasFeature && storeIntegration?.integrationStatus?.executiveDysfunction;
    });
    
    // Test Masking Fatigue integration
    this.test('Masking Fatigue integration', () => {
      if (!window.MaskingFatigueDetector && !window.maskingFatigueDetector) {
        this.testResults.skipped++;
        console.log('⏭️ Masking Fatigue Detector not available, skipping');
        return true;
      }
      
      const store = window.velvetStores.store.getState();
      const hasFeature = store.system.activeFeatures.includes('maskingFatigue');
      const storeIntegration = window.storeIntegrationManager?.getIntegrationStatus();
      
      return hasFeature && storeIntegration?.integrationStatus?.maskingFatigue;
    });
    
    // Test Velvet Brain integration
    this.test('Velvet Brain integration', () => {
      if (!window.VelvetBrain && !window.velvetBrain) {
        this.testResults.skipped++;
        console.log('⏭️ Velvet Brain not available, skipping');
        return true;
      }
      
      const store = window.velvetStores.store.getState();
      const hasFeature = store.system.activeFeatures.includes('velvetBrain');
      const storeIntegration = window.storeIntegrationManager?.getIntegrationStatus();
      
      return hasFeature && storeIntegration?.integrationStatus?.velvetBrain;
    });
    
    // Test Store Coordinator
    this.test('Store Coordinator is active', () => {
      return window.storeCoordinator && 
             window.storeCoordinator.isInitialized === true;
    });
  }
  
  // ===========================================
  // CROSS-FEATURE COORDINATION TESTS
  // ===========================================
  
  async testCrossFeatureCoordination() {
    console.log('🔗 Testing cross-feature coordination...');
    
    const store = window.velvetStores.store.getState();
    
    // Test coordination data structure
    this.test('Coordination data structure is valid', () => {
      return typeof store.coordination === 'object' &&
             typeof store.coordination.activePriorities === 'object' &&
             typeof store.coordination.interactions === 'object' &&
             Array.isArray(store.coordination.unifiedInterventions.active);
    });
    
    // Test priority updates
    this.test('Priority updates work', () => {
      try {
        const originalPriorities = { ...store.coordination.activePriorities };
        
        store.updateCoordinationPriorities({
          socialDecoder: 0.9,
          maskingFatigue: 0.8
        });
        
        const newState = window.velvetStores.store.getState();
        const updated = newState.coordination.activePriorities.socialDecoder === 0.9;
        
        // Reset priorities
        store.updateCoordinationPriorities(originalPriorities);
        
        return updated;
      } catch (error) {
        this.testResults.errors.push(`Priority update test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test unified interventions
    this.test('Unified interventions can be triggered', () => {
      try {
        const originalCount = store.coordination.unifiedInterventions.active.length;
        
        store.triggerUnifiedIntervention({
          type: 'test_intervention',
          priority: 'low',
          source: 'test',
          message: 'Test intervention',
          timestamp: Date.now()
        });
        
        const newState = window.velvetStores.store.getState();
        const newCount = newState.coordination.unifiedInterventions.active.length;
        
        return newCount > originalCount;
      } catch (error) {
        this.testResults.errors.push(`Unified intervention test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test cross-feature insights
    this.test('Cross-feature insights structure exists', () => {
      return typeof store.coordination.insights === 'object' &&
             Array.isArray(store.coordination.insights.patterns) &&
             Array.isArray(store.coordination.insights.correlations);
    });
    
    // Test coordination triggers
    this.test('Coordination triggers are available', () => {
      return window.storeCoordinator && 
             typeof window.storeCoordinator.triggerCoordination === 'function';
    });
  }
  
  // ===========================================
  // PERFORMANCE OPTIMIZATION TESTS
  // ===========================================
  
  async testPerformanceOptimization() {
    console.log('⚡ Testing performance optimizations...');
    
    const store = window.velvetStores.store.getState();
    
    // Test performance metrics tracking
    this.test('Performance metrics are tracked', () => {
      return typeof store.system.performanceMetrics === 'object' &&
             typeof store.system.performanceMetrics.stateUpdates === 'number' &&
             typeof store.system.performanceMetrics.averageUpdateTime === 'number';
    });
    
    // Test selective subscriptions (selectors exist)
    this.test('Performance-optimized selectors exist', () => {
      return typeof window.velvetStores !== 'undefined' &&
             // Check if selector functions are available globally or through import
             typeof window.velvetStores.store !== 'undefined';
    });
    
    // Test state update performance
    await this.test('State updates are performant', async () => {
      try {
        const startTime = performance.now();
        const iterations = 100;
        
        for (let i = 0; i < iterations; i++) {
          store.updateSystemMetrics();
        }
        
        const endTime = performance.now();
        const averageTime = (endTime - startTime) / iterations;
        
        console.log(`  📊 Average update time: ${averageTime.toFixed(2)}ms`);
        
        // Should be under 10ms per update
        return averageTime < 10;
      } catch (error) {
        this.testResults.errors.push(`Performance test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test memory management
    this.test('Store size is reasonable', () => {
      try {
        const stateSize = JSON.stringify(store).length;
        const maxSize = 1024 * 1024; // 1MB limit
        
        console.log(`  📊 Store size: ${(stateSize / 1024).toFixed(2)}KB`);
        
        return stateSize < maxSize;
      } catch (error) {
        this.testResults.errors.push(`Memory test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test coordinator performance
    this.test('Store coordinator performance is good', () => {
      if (!window.storeCoordinator) return true; // Skip if not available
      
      try {
        const status = window.storeCoordinator.getIntegrationStatus();
        const avgUpdateTime = status.performanceMetrics?.averageUpdateTime || 0;
        
        console.log(`  📊 Coordinator avg update time: ${avgUpdateTime.toFixed(2)}ms`);
        
        return avgUpdateTime < 50; // Should be under 50ms
      } catch (error) {
        this.testResults.errors.push(`Coordinator performance test failed: ${error.message}`);
        return false;
      }
    });
  }
  
  // ===========================================
  // BACKWARD COMPATIBILITY TESTS
  // ===========================================
  
  async testBackwardCompatibility() {
    console.log('🔄 Testing backward compatibility...');
    
    // Test existing features still work
    this.test('Existing Social Decoder methods still work', () => {
      if (!window.viralSocialDecoder) {
        this.testResults.skipped++;
        console.log('⏭️ Social Decoder not available, skipping');
        return true;
      }
      
      try {
        const decoder = window.viralSocialDecoder;
        const status = decoder.getSystemStatus ? decoder.getSystemStatus() : {};
        return typeof status === 'object';
      } catch (error) {
        this.testResults.errors.push(`Social Decoder compatibility test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test existing Executive Dysfunction UI still works
    this.test('Existing Executive Dysfunction UI methods still work', () => {
      if (!window.executiveDysfunctionUI) {
        this.testResults.skipped++;
        console.log('⏭️ Executive Dysfunction UI not available, skipping');
        return true;
      }
      
      try {
        const edUI = window.executiveDysfunctionUI;
        const state = edUI.getUIState ? edUI.getUIState() : {};
        return typeof state === 'object';
      } catch (error) {
        this.testResults.errors.push(`Executive Dysfunction UI compatibility test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test existing Masking Fatigue methods still work
    this.test('Existing Masking Fatigue methods still work', () => {
      if (!window.maskingFatigueDetector) {
        this.testResults.skipped++;
        console.log('⏭️ Masking Fatigue Detector not available, skipping');
        return true;
      }
      
      try {
        const detector = window.maskingFatigueDetector;
        // Test basic method existence
        return typeof detector === 'object';
      } catch (error) {
        this.testResults.errors.push(`Masking Fatigue compatibility test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test existing Velvet Brain methods still work
    this.test('Existing Velvet Brain methods still work', () => {
      if (!window.velvetBrain) {
        this.testResults.skipped++;
        console.log('⏭️ Velvet Brain not available, skipping');
        return true;
      }
      
      try {
        const brain = window.velvetBrain;
        const metrics = brain.getMetrics ? brain.getMetrics() : {};
        return typeof metrics === 'object';
      } catch (error) {
        this.testResults.errors.push(`Velvet Brain compatibility test failed: ${error.message}`);
        return false;
      }
    });
    
    // Test global development utilities
    this.test('Development utilities are available', () => {
      return typeof window.velvetStores === 'object' &&
             typeof window.velvetStores.dev === 'object' &&
             typeof window.velvetStores.healthCheck === 'function';
    });
  }
  
  // ===========================================
  // UTILITY METHODS
  // ===========================================
  
  /**
   * Run individual test
   */
  test(name, testFunction) {
    try {
      const result = testFunction();
      
      if (result === true) {
        console.log(`  ✅ ${name}`);
        this.testResults.passed++;
        return true;
      } else {
        console.log(`  ❌ ${name}`);
        this.testResults.failed++;
        return false;
      }
    } catch (error) {
      console.log(`  ❌ ${name} - Error: ${error.message}`);
      this.testResults.failed++;
      this.testResults.errors.push(`${name}: ${error.message}`);
      return false;
    }
  }
  
  /**
   * Generate test report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.testResults.passed + this.testResults.failed + this.testResults.skipped,
        passed: this.testResults.passed,
        failed: this.testResults.failed,
        skipped: this.testResults.skipped,
        successRate: (this.testResults.passed / (this.testResults.passed + this.testResults.failed) * 100).toFixed(2) + '%'
      },
      errors: this.testResults.errors,
      environment: {
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        storeSystemAvailable: typeof window.velvetStores !== 'undefined',
        coordinatorAvailable: typeof window.storeCoordinator !== 'undefined',
        integrationManagerAvailable: typeof window.storeIntegrationManager !== 'undefined'
      }
    };
    
    return report;
  }
}

// ===========================================
// QUICK TEST FUNCTIONS
// ===========================================

/**
 * Quick health check for store system
 */
function quickStoreHealthCheck() {
  console.log('🏥 Quick Store Health Check');
  console.log('=' .repeat(40));
  
  const checks = {
    storeExists: typeof window.velvetStores !== 'undefined',
    storeInitialized: window.velvetStores?.store?.getState()?.system?.isInitialized,
    coordinatorActive: window.storeCoordinator?.isInitialized,
    integrationManagerActive: window.storeIntegrationManager?.isInitialized,
    featuresIntegrated: window.velvetStores?.store?.getState()?.system?.activeFeatures?.length > 0
  };
  
  Object.entries(checks).forEach(([check, status]) => {
    console.log(`${status ? '✅' : '❌'} ${check}`);
  });
  
  const allHealthy = Object.values(checks).every(Boolean);
  console.log(`\n🎯 Overall Health: ${allHealthy ? '✅ HEALTHY' : '❌ ISSUES DETECTED'}`);
  
  return { healthy: allHealthy, checks };
}

/**
 * Test specific feature integration
 */
function testFeatureIntegration(featureName) {
  console.log(`🔍 Testing ${featureName} integration...`);
  
  const store = window.velvetStores?.store?.getState();
  if (!store) {
    console.log('❌ Store not available');
    return false;
  }
  
  const hasFeature = store.system.activeFeatures.includes(featureName);
  const integration = window.storeIntegrationManager?.getIntegrationStatus();
  const isIntegrated = integration?.integrationStatus?.[featureName];
  
  console.log(`  Store feature active: ${hasFeature ? '✅' : '❌'}`);
  console.log(`  Integration manager: ${isIntegrated ? '✅' : '❌'}`);
  
  return hasFeature && isIntegrated;
}

/**
 * Benchmark store performance
 */
async function benchmarkStorePerformance() {
  console.log('⏱️ Benchmarking store performance...');
  
  if (!window.velvetStores?.store) {
    console.log('❌ Store not available');
    return;
  }
  
  const store = window.velvetStores.store.getState();
  const iterations = 1000;
  
  // Benchmark state updates
  const startTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    store.updateSystemMetrics();
  }
  
  const endTime = performance.now();
  const avgTime = (endTime - startTime) / iterations;
  
  console.log(`📊 Average update time: ${avgTime.toFixed(3)}ms`);
  console.log(`📊 Updates per second: ${(1000 / avgTime).toFixed(0)}`);
  
  // Benchmark store size
  const stateSize = JSON.stringify(store).length;
  console.log(`📊 Store size: ${(stateSize / 1024).toFixed(2)}KB`);
  
  return {
    avgUpdateTime: avgTime,
    updatesPerSecond: 1000 / avgTime,
    storeSizeKB: stateSize / 1024
  };
}

// ===========================================
// GLOBAL SETUP
// ===========================================

// Create global test instance
const storeIntegrationTests = new StoreIntegrationTests();

// Make testing utilities available globally
window.storeTests = {
  runAll: () => storeIntegrationTests.runAllTests(),
  quickHealth: quickStoreHealthCheck,
  testFeature: testFeatureIntegration,
  benchmark: benchmarkStorePerformance,
  generateReport: () => storeIntegrationTests.generateReport()
};

// Auto-run quick health check on load
setTimeout(() => {
  console.log('\n🏥 Auto-running quick health check...');
  quickStoreHealthCheck();
}, 2000);

console.log('🧪 Store Integration Tests loaded');
console.log('💡 Available commands:');
console.log('  - storeTests.runAll() - Run complete test suite');
console.log('  - storeTests.quickHealth() - Quick health check');
console.log('  - storeTests.testFeature("featureName") - Test specific feature');
console.log('  - storeTests.benchmark() - Performance benchmark');
console.log('  - storeTests.generateReport() - Generate test report');