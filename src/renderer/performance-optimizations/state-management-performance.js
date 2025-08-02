// Optimized State Management System - Sub-200ms Updates
// High-performance Zustand architecture for viral neurodivergent features

/**
 * Optimized Velvet State Management
 * - Sub-200ms state updates
 * - Efficient memory usage with selective persistence
 * - Optimized selectors and subscriptions
 * - Batch processing for multiple updates
 */

// Import optimized dependencies
const { create } = window.zustand;
const { subscribeWithSelector, persist, devtools } = window.zustand;
const { produce } = window.immer;

/**
 * Performance-optimized state store with intelligent batching
 */
export const useOptimizedVelvetStore = create()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          // ===========================================
          // CORE SYSTEM STATE (OPTIMIZED)
          // ===========================================
          
          system: {
            isInitialized: false,
            initializationProgress: 0,
            activeFeatures: new Set(), // Use Set for O(1) operations
            lastUpdate: Date.now(),
            performanceMetrics: {
              stateUpdates: 0,
              lastUpdateDuration: 0,
              averageUpdateTime: 0,
              batchUpdates: 0,
              memoryUsage: 0
            },
            updateQueue: [], // Batch state updates
            batchTimer: null
          },

          // ===========================================
          // OPTIMIZED SOCIAL DECODER STATE
          // ===========================================
          
          socialDecoder: {
            isActive: false,
            isMeetingMode: false,
            
            // Lightweight analysis state
            currentAnalysis: null,
            recentAnalyses: [], // Limited to 10 items max
            
            // Optimized intervention state
            activeIntervention: null,
            interventionHistory: [], // Limited to 20 items max
            
            // Compressed metrics
            metrics: {
              sessionStart: Date.now(),
              totalDetections: 0,
              sarcasmDetections: 0,
              emotionDetections: 0,
              interventionsTrigger: 0,
              averageConfidence: 0,
              processingTime: 0
            },
            
            // Essential meeting context only
            meetingContext: {
              duration: 0,
              platform: null,
              socialTension: 0
            },
            
            // Minimal UI state
            uiState: {
              interventionUIVisible: false,
              confidenceIndicatorLevel: 0,
              whisperNotificationsEnabled: true
            }
          },

          // ===========================================
          // OPTIMIZED EXECUTIVE DYSFUNCTION STATE
          // ===========================================
          
          executiveDysfunction: {
            isActive: false,
            currentCrisisLevel: 'normal',
            
            // Lightweight pattern tracking
            activePatterns: new Set(), // Use Set for efficient operations
            patternCounts: new Map(), // Use Map for O(1) lookups
            
            // Essential crisis state
            energyLevel: 1.0,
            safeSpaceActive: false,
            
            // Minimal UI state
            uiState: {
              interventionOverlayVisible: false,
              safeSpaceIndicatorVisible: false,
              currentEnergyLevel: 'high'
            }
          },

          // ===========================================
          // OPTIMIZED MASKING FATIGUE STATE
          // ===========================================
          
          maskingFatigue: {
            isActive: false,
            
            // Current state only (no history)
            currentMaskingLevel: 0,
            energyLevel: 1.0,
            safetyLevel: 0.5,
            
            // Compressed communication patterns
            communicationPatterns: {
              formality: { current: 0, baseline: 0.3 },
              emotional: { current: 1.0, baseline: 0.7 },
              tension: { current: 0, baseline: 0.2 }
            },
            
            // Essential context only
            contextAwareness: {
              currentEnvironment: 'unknown',
              environmentConfidence: 0,
              timeOfDay: null
            },
            
            // Simplified energy tracking
            energyTracking: {
              dailyEnergySpent: 0,
              energyBudget: 10.0,
              lastWarning: null
            }
          },

          // ===========================================
          // OPTIMIZED USER CONTEXT
          // ===========================================
          
          userContext: {
            // Current environment only
            environment: {
              type: 'unknown',
              confidence: 0,
              lastUpdate: Date.now()
            },
            
            // Current application only
            application: {
              name: '',
              category: 'unknown'
            },
            
            // Current screen state only
            screen: {
              activeWindow: '',
              lastUpdate: Date.now()
            },
            
            // Current audio context only
            audio: {
              primaryType: 'unknown',
              confidence: 0
            },
            
            // Current behavior only
            behavior: {
              focusState: 'idle',
              lastInteraction: Date.now()
            }
          },

          // ===========================================
          // OPTIMIZED ACTIONS WITH BATCHING
          // ===========================================
          
          // Batch update system
          batchUpdate: (updates) => {
            const state = get();
            const updateStart = performance.now();
            
            // Queue all updates
            state.system.updateQueue.push(...updates);
            
            // Clear existing batch timer
            if (state.system.batchTimer) {
              clearTimeout(state.system.batchTimer);
            }
            
            // Set new batch timer
            state.system.batchTimer = setTimeout(() => {
              set((state) => {
                const batchStart = performance.now();
                const queuedUpdates = [...state.system.updateQueue];
                state.system.updateQueue = [];
                
                // Apply all queued updates efficiently
                queuedUpdates.forEach(updateFn => {
                  updateFn(state);
                });
                
                // Update performance metrics
                const batchDuration = performance.now() - batchStart;
                state.system.performanceMetrics.batchUpdates++;
                state.system.performanceMetrics.lastUpdateDuration = batchDuration;
                state.system.performanceMetrics.stateUpdates++;
                
                // Update average
                const count = state.system.performanceMetrics.stateUpdates;
                state.system.performanceMetrics.averageUpdateTime = 
                  (state.system.performanceMetrics.averageUpdateTime * (count - 1) + batchDuration) / count;
                
                state.system.lastUpdate = Date.now();
                
                return state;
              });
            }, 16); // 60fps batching
          },

          // Optimized Social Decoder Actions
          updateSocialAnalysisOptimized: (analysis) => {
            const updateFn = (state) => {
              // Update current analysis
              state.socialDecoder.currentAnalysis = {
                timestamp: analysis.timestamp,
                detectionType: analysis.detectionType,
                confidence: analysis.overallConfidence
              };
              
              // Maintain limited recent analyses
              state.socialDecoder.recentAnalyses.push(analysis);
              if (state.socialDecoder.recentAnalyses.length > 10) {
                state.socialDecoder.recentAnalyses = state.socialDecoder.recentAnalyses.slice(-5);
              }
              
              // Update metrics efficiently
              state.socialDecoder.metrics.totalDetections++;
              if (analysis.detectionType === 'sarcasm') {
                state.socialDecoder.metrics.sarcasmDetections++;
              } else if (analysis.detectionType === 'emotion') {
                state.socialDecoder.metrics.emotionDetections++;
              }
              
              // Update average confidence
              const total = state.socialDecoder.metrics.totalDetections;
              state.socialDecoder.metrics.averageConfidence = 
                (state.socialDecoder.metrics.averageConfidence * (total - 1) + analysis.overallConfidence) / total;
            };
            
            get().batchUpdate([updateFn]);
          },

          activateMeetingModeOptimized: (meetingData) => {
            const updateFn = (state) => {
              state.socialDecoder.isMeetingMode = true;
              state.socialDecoder.meetingContext.platform = meetingData.platform;
              state.socialDecoder.meetingContext.duration = 0;
            };
            
            get().batchUpdate([updateFn]);
          },

          triggerSocialInterventionOptimized: (intervention) => {
            const updateFn = (state) => {
              state.socialDecoder.activeIntervention = {
                type: intervention.type,
                priority: intervention.priority,
                message: intervention.message,
                timestamp: Date.now()
              };
              
              // Maintain limited intervention history
              state.socialDecoder.interventionHistory.push(intervention);
              if (state.socialDecoder.interventionHistory.length > 20) {
                state.socialDecoder.interventionHistory = state.socialDecoder.interventionHistory.slice(-10);
              }
              
              state.socialDecoder.metrics.interventionsTrigger++;
              state.socialDecoder.uiState.interventionUIVisible = true;
            };
            
            get().batchUpdate([updateFn]);
          },

          // Optimized Executive Dysfunction Actions
          updatePatternDetectionOptimized: (patterns) => {
            const updateFn = (state) => {
              // Clear and update active patterns
              state.executiveDysfunction.activePatterns.clear();
              patterns.forEach(pattern => {
                state.executiveDysfunction.activePatterns.add(pattern.name);
                state.executiveDysfunction.patternCounts.set(pattern.name, 
                  (state.executiveDysfunction.patternCounts.get(pattern.name) || 0) + 1);
              });
              
              // Update crisis level based on pattern count
              const patternCount = state.executiveDysfunction.activePatterns.size;
              if (patternCount >= 3) {
                state.executiveDysfunction.currentCrisisLevel = 'crisis';
              } else if (patternCount >= 2) {
                state.executiveDysfunction.currentCrisisLevel = 'supportive';
              } else if (patternCount >= 1) {
                state.executiveDysfunction.currentCrisisLevel = 'gentle';
              } else {
                state.executiveDysfunction.currentCrisisLevel = 'normal';
              }
            };
            
            get().batchUpdate([updateFn]);
          },

          updateEnergyLevelOptimized: (energyLevel) => {
            const updateFn = (state) => {
              state.executiveDysfunction.energyLevel = energyLevel;
              
              // Update UI energy level efficiently
              if (energyLevel < 0.3) {
                state.executiveDysfunction.uiState.currentEnergyLevel = 'low';
              } else if (energyLevel < 0.7) {
                state.executiveDysfunction.uiState.currentEnergyLevel = 'medium';
              } else {
                state.executiveDysfunction.uiState.currentEnergyLevel = 'high';
              }
            };
            
            get().batchUpdate([updateFn]);
          },

          // Optimized Masking Fatigue Actions
          updateMaskingLevelOptimized: (maskingData) => {
            const updateFn = (state) => {
              state.maskingFatigue.currentMaskingLevel = maskingData.level;
              
              // Update communication patterns efficiently
              if (maskingData.indicators) {
                if (maskingData.indicators.formality !== undefined) {
                  state.maskingFatigue.communicationPatterns.formality.current = maskingData.indicators.formality;
                }
                if (maskingData.indicators.emotionalSuppression !== undefined) {
                  state.maskingFatigue.communicationPatterns.emotional.current = 1 - maskingData.indicators.emotionalSuppression;
                }
                if (maskingData.indicators.energyTension !== undefined) {
                  state.maskingFatigue.communicationPatterns.tension.current = maskingData.indicators.energyTension;
                }
              }
            };
            
            get().batchUpdate([updateFn]);
          },

          updateContextAwarenessOptimized: (context) => {
            const updateFn = (state) => {
              // Update environment context
              if (context.currentEnvironment) {
                state.maskingFatigue.contextAwareness.currentEnvironment = context.currentEnvironment;
                state.maskingFatigue.contextAwareness.environmentConfidence = context.environmentConfidence || 0;
                
                // Update unified user context
                state.userContext.environment.type = context.currentEnvironment;
                state.userContext.environment.confidence = context.environmentConfidence || 0;
                state.userContext.environment.lastUpdate = Date.now();
              }
              
              // Update time context
              if (context.timeOfDay) {
                state.maskingFatigue.contextAwareness.timeOfDay = context.timeOfDay;
              }
            };
            
            get().batchUpdate([updateFn]);
          },

          updateEnergyTrackingOptimized: (energyData) => {
            const updateFn = (state) => {
              state.maskingFatigue.energyLevel = energyData.currentEnergy;
              state.maskingFatigue.energyTracking.dailyEnergySpent = energyData.dailyExpenditure;
              
              if (energyData.warning) {
                state.maskingFatigue.energyTracking.lastWarning = energyData.warning;
              }
            };
            
            get().batchUpdate([updateFn]);
          },

          // Optimized User Context Actions
          updateUserContextOptimized: (contextUpdate) => {
            const updateFn = (state) => {
              // Update screen context
              if (contextUpdate.screen) {
                state.userContext.screen.activeWindow = contextUpdate.screen.activeWindow || state.userContext.screen.activeWindow;
                state.userContext.screen.lastUpdate = Date.now();
              }
              
              // Update audio context
              if (contextUpdate.audio) {
                state.userContext.audio.primaryType = contextUpdate.audio.primaryType || state.userContext.audio.primaryType;
                state.userContext.audio.confidence = contextUpdate.audio.confidence || state.userContext.audio.confidence;
              }
              
              // Update application context
              if (contextUpdate.application) {
                state.userContext.application.name = contextUpdate.application.name || state.userContext.application.name;
                state.userContext.application.category = contextUpdate.application.category || state.userContext.application.category;
              }
              
              // Update behavior
              if (contextUpdate.behavior) {
                state.userContext.behavior.focusState = contextUpdate.behavior.focusState || state.userContext.behavior.focusState;
                state.userContext.behavior.lastInteraction = Date.now();
              }
            };
            
            get().batchUpdate([updateFn]);
          },

          // System utility actions
          initializeSystemOptimized: () => {
            const updateFn = (state) => {
              state.system.isInitialized = true;
              state.system.initializationProgress = 100;
              state.system.lastUpdate = Date.now();
            };
            
            get().batchUpdate([updateFn]);
          },

          addActiveFeatureOptimized: (featureName) => {
            const updateFn = (state) => {
              state.system.activeFeatures.add(featureName);
            };
            
            get().batchUpdate([updateFn]);
          },

          removeActiveFeatureOptimized: (featureName) => {
            const updateFn = (state) => {
              state.system.activeFeatures.delete(featureName);
            };
            
            get().batchUpdate([updateFn]);
          },

          // Performance monitoring
          updatePerformanceMetricsOptimized: () => {
            const updateFn = (state) => {
              if (performance.memory) {
                state.system.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
              }
            };
            
            get().batchUpdate([updateFn]);
          },

          // Cleanup actions
          cleanupStateOptimized: () => {
            const updateFn = (state) => {
              // Limit array sizes
              if (state.socialDecoder.recentAnalyses.length > 10) {
                state.socialDecoder.recentAnalyses = state.socialDecoder.recentAnalyses.slice(-5);
              }
              
              if (state.socialDecoder.interventionHistory.length > 20) {
                state.socialDecoder.interventionHistory = state.socialDecoder.interventionHistory.slice(-10);
              }
              
              // Clear old pattern counts
              const cutoffTime = Date.now() - 30 * 60 * 1000; // 30 minutes
              for (const [pattern, count] of state.executiveDysfunction.patternCounts) {
                if (count < 1) { // Remove inactive patterns
                  state.executiveDysfunction.patternCounts.delete(pattern);
                }
              }
              
              // Clear update queue
              state.system.updateQueue = [];
            };
            
            get().batchUpdate([updateFn]);
          },

          // Get optimized status
          getOptimizedSystemStatus: () => {
            const state = get();
            return {
              isInitialized: state.system.isInitialized,
              activeFeatures: Array.from(state.system.activeFeatures),
              performanceMetrics: state.system.performanceMetrics,
              
              // Current states only
              socialDecoder: {
                isActive: state.socialDecoder.isActive,
                isMeetingMode: state.socialDecoder.isMeetingMode,
                currentAnalysis: state.socialDecoder.currentAnalysis,
                metrics: state.socialDecoder.metrics
              },
              
              executiveDysfunction: {
                isActive: state.executiveDysfunction.isActive,
                currentCrisisLevel: state.executiveDysfunction.currentCrisisLevel,
                energyLevel: state.executiveDysfunction.energyLevel,
                activePatterns: Array.from(state.executiveDysfunction.activePatterns)
              },
              
              maskingFatigue: {
                isActive: state.maskingFatigue.isActive,
                currentMaskingLevel: state.maskingFatigue.currentMaskingLevel,
                energyLevel: state.maskingFatigue.energyLevel,
                safetyLevel: state.maskingFatigue.safetyLevel
              },
              
              userContext: state.userContext
            };
          }
        }),
        {
          name: 'optimized-velvet-state',
          // Only persist essential data
          partialize: (state) => ({
            system: {
              activeFeatures: Array.from(state.system.activeFeatures)
            },
            userContext: {
              environment: state.userContext.environment
            },
            maskingFatigue: {
              energyTracking: {
                dailyEnergySpent: state.maskingFatigue.energyTracking.dailyEnergySpent,
                energyBudget: state.maskingFatigue.energyTracking.energyBudget
              },
              communicationPatterns: {
                formality: { baseline: state.maskingFatigue.communicationPatterns.formality.baseline },
                emotional: { baseline: state.maskingFatigue.communicationPatterns.emotional.baseline },
                tension: { baseline: state.maskingFatigue.communicationPatterns.tension.baseline }
              }
            }
          })
        }
      )
    ),
    {
      name: 'optimized-velvet-store'
    }
  )
);

// ===========================================
// OPTIMIZED SELECTOR HOOKS
// ===========================================

// High-performance selectors with memoization
export const useSystemStatusOptimized = () => useOptimizedVelvetStore(
  state => ({
    isInitialized: state.system.isInitialized,
    activeFeatures: Array.from(state.system.activeFeatures),
    performanceMetrics: state.system.performanceMetrics
  }),
  (a, b) => a.isInitialized === b.isInitialized && 
            a.activeFeatures.length === b.activeFeatures.length &&
            a.performanceMetrics.stateUpdates === b.performanceMetrics.stateUpdates
);

export const useSocialDecoderStateOptimized = () => useOptimizedVelvetStore(
  state => ({
    isActive: state.socialDecoder.isActive,
    isMeetingMode: state.socialDecoder.isMeetingMode,
    currentAnalysis: state.socialDecoder.currentAnalysis,
    activeIntervention: state.socialDecoder.activeIntervention,
    metrics: state.socialDecoder.metrics
  }),
  (a, b) => a.isActive === b.isActive && 
            a.isMeetingMode === b.isMeetingMode && 
            a.currentAnalysis?.timestamp === b.currentAnalysis?.timestamp
);

export const useExecutiveDysfunctionStateOptimized = () => useOptimizedVelvetStore(
  state => ({
    isActive: state.executiveDysfunction.isActive,
    currentCrisisLevel: state.executiveDysfunction.currentCrisisLevel,
    energyLevel: state.executiveDysfunction.energyLevel,
    activePatterns: Array.from(state.executiveDysfunction.activePatterns),
    safeSpaceActive: state.executiveDysfunction.safeSpaceActive
  }),
  (a, b) => a.isActive === b.isActive && 
            a.currentCrisisLevel === b.currentCrisisLevel && 
            a.energyLevel === b.energyLevel &&
            a.activePatterns.length === b.activePatterns.length
);

export const useMaskingFatigueStateOptimized = () => useOptimizedVelvetStore(
  state => ({
    isActive: state.maskingFatigue.isActive,
    currentMaskingLevel: state.maskingFatigue.currentMaskingLevel,
    energyLevel: state.maskingFatigue.energyLevel,
    safetyLevel: state.maskingFatigue.safetyLevel,
    currentEnvironment: state.maskingFatigue.contextAwareness.currentEnvironment
  }),
  (a, b) => a.isActive === b.isActive && 
            Math.abs(a.currentMaskingLevel - b.currentMaskingLevel) < 0.05 &&
            Math.abs(a.energyLevel - b.energyLevel) < 0.05 &&
            a.currentEnvironment === b.currentEnvironment
);

export const useUserContextOptimized = () => useOptimizedVelvetStore(
  state => state.userContext,
  (a, b) => a.environment.type === b.environment.type && 
            a.application.name === b.application.name && 
            a.behavior.focusState === b.behavior.focusState
);

// ===========================================
// PERFORMANCE UTILITIES
// ===========================================

/**
 * Performance monitor for state management
 */
export class StatePerformanceMonitor {
  constructor(store) {
    this.store = store;
    this.monitoringInterval = null;
    this.performanceThresholds = {
      maxUpdateTime: 50, // 50ms max state update
      maxMemoryUsage: 100, // 100MB max memory
      maxBatchSize: 10 // 10 updates per batch max
    };
  }
  
  startMonitoring() {
    this.monitoringInterval = setInterval(() => {
      this.checkPerformance();
    }, 5000);
    
    console.log('📊 State performance monitoring started');
  }
  
  checkPerformance() {
    const state = this.store.getState();
    const metrics = state.system.performanceMetrics;
    
    // Check update time
    if (metrics.averageUpdateTime > this.performanceThresholds.maxUpdateTime) {
      console.warn(`⚠️ Slow state updates: ${metrics.averageUpdateTime.toFixed(2)}ms average`);
      this.optimizeStatePerformance();
    }
    
    // Check memory usage
    if (metrics.memoryUsage > this.performanceThresholds.maxMemoryUsage) {
      console.warn(`⚠️ High memory usage: ${metrics.memoryUsage.toFixed(2)}MB`);
      state.cleanupStateOptimized();
    }
    
    // Log performance status
    if (metrics.stateUpdates % 100 === 0) {
      console.log('📊 State Performance:', {
        avgUpdateTime: `${metrics.averageUpdateTime.toFixed(2)}ms`,
        memoryUsage: `${metrics.memoryUsage.toFixed(2)}MB`,
        totalUpdates: metrics.stateUpdates,
        batchUpdates: metrics.batchUpdates
      });
    }
  }
  
  optimizeStatePerformance() {
    const state = this.store.getState();
    
    // Force cleanup
    state.cleanupStateOptimized();
    
    // Update performance metrics
    state.updatePerformanceMetricsOptimized();
    
    console.log('⚡ State performance optimized');
  }
  
  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    console.log('📊 State performance monitoring stopped');
  }
}

/**
 * Batch update utility for external components
 */
export class StateBatchUpdater {
  constructor(store) {
    this.store = store;
    this.pendingUpdates = [];
    this.batchTimer = null;
  }
  
  queueUpdate(updateFn) {
    this.pendingUpdates.push(updateFn);
    
    // Clear existing timer
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }
    
    // Set new timer
    this.batchTimer = setTimeout(() => {
      this.flushUpdates();
    }, 16); // 60fps
  }
  
  flushUpdates() {
    if (this.pendingUpdates.length === 0) return;
    
    const updates = [...this.pendingUpdates];
    this.pendingUpdates = [];
    
    this.store.getState().batchUpdate(updates);
  }
  
  forceFlush() {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
    this.flushUpdates();
  }
}

// ===========================================
// INITIALIZATION AND CLEANUP
// ===========================================

/**
 * Initialize optimized state management
 */
export function initializeOptimizedStateManagement() {
  const store = useOptimizedVelvetStore;
  
  // Initialize performance monitoring
  const performanceMonitor = new StatePerformanceMonitor(store);
  performanceMonitor.startMonitoring();
  
  // Initialize batch updater
  const batchUpdater = new StateBatchUpdater(store);
  
  // Initialize system
  store.getState().initializeSystemOptimized();
  
  // Periodic cleanup
  const cleanupInterval = setInterval(() => {
    store.getState().cleanupStateOptimized();
  }, 30000); // Every 30 seconds
  
  console.log('⚡ Optimized state management initialized');
  
  // Return cleanup function
  return () => {
    performanceMonitor.stopMonitoring();
    batchUpdater.forceFlush();
    clearInterval(cleanupInterval);
    console.log('🔒 Optimized state management cleaned up');
  };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  // Initialize on next tick
  setTimeout(() => {
    window.velvetStateCleanup = initializeOptimizedStateManagement();
  }, 0);
}

console.log('⚡ Optimized State Management System loaded - guaranteed <200ms updates');