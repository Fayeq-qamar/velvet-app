// Simplified Velvet State Management System
// Functional approach without immer for better browser compatibility

// Use Zustand from global context (loaded via CDN)
const { create } = window.zustand;
const { subscribeWithSelector, persist, devtools } = window.zustand;

/**
 * Central Velvet State Store - Simplified Version
 * Coordinates all viral features with functional state updates
 */
export const useVelvetStore = create()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          // ===========================================
          // INITIAL STATE
          // ===========================================
          
          system: {
            isInitialized: false,
            activeFeatures: [],
            lastUpdate: Date.now(),
            performanceMetrics: {
              stateUpdates: 0,
              lastUpdateDuration: 0,
              averageUpdateTime: 0
            }
          },

          socialDecoder: {
            isActive: false,
            isMeetingMode: false,
            currentAnalysis: null,
            recentAnalyses: [],
            activeIntervention: null,
            metrics: {
              sessionStart: Date.now(),
              totalDetections: 0,
              sarcasmDetections: 0,
              emotionDetections: 0,
              interventionsTrigger: 0
            }
          },

          executiveDysfunction: {
            isActive: false,
            currentCrisisLevel: 'none',
            energyLevel: 1.0,
            detectedPatterns: [],
            activeIntervention: null,
            safeSpaceActive: false
          },

          maskingFatigue: {
            isActive: false,
            currentMaskingLevel: 0,
            energyLevel: 1.0,
            safetyLevel: 0.5,
            contextAwareness: {
              currentEnvironment: 'unknown',
              environmentConfidence: 0
            },
            performanceMetrics: {
              totalAnalyses: 0,
              maskingDetections: 0
            }
          },

          velvetBrain: {
            isActive: false,
            consciousnessLevel: 0,
            currentThoughtCycle: {
              cycleNumber: 0,
              stage: 'idle'
            },
            metrics: {
              thoughtCycles: 0,
              learningAccuracy: 0
            }
          },

          userContext: {
            environment: { type: 'unknown', confidence: 0 },
            screen: { currentText: '', ocrConfidence: 0 },
            behavior: { focusState: 'idle' }
          },

          coordination: {
            activePriorities: {
              socialDecoder: 0,
              executiveDysfunction: 0,
              maskingFatigue: 0,
              velvetBrain: 0
            },
            unifiedInterventions: {
              active: [],
              history: []
            },
            insights: {
              patterns: [],
              correlations: []
            }
          },

          // ===========================================
          // ACTIONS
          // ===========================================

          // System Actions
          initializeSystem: () => set(state => ({
            ...state,
            system: {
              ...state.system,
              isInitialized: true,
              lastUpdate: Date.now()
            }
          })),

          updateSystemMetrics: () => set(state => ({
            ...state,
            system: {
              ...state.system,
              lastUpdate: Date.now(),
              performanceMetrics: {
                ...state.system.performanceMetrics,
                stateUpdates: state.system.performanceMetrics.stateUpdates + 1
              }
            }
          })),

          // Social Decoder Actions
          initializeSocialDecoder: () => set(state => ({
            ...state,
            socialDecoder: {
              ...state.socialDecoder,
              isActive: true,
              metrics: {
                ...state.socialDecoder.metrics,
                sessionStart: Date.now()
              }
            },
            system: {
              ...state.system,
              activeFeatures: state.system.activeFeatures.includes('socialDecoder') 
                ? state.system.activeFeatures 
                : [...state.system.activeFeatures, 'socialDecoder']
            }
          })),

          updateSocialAnalysis: (analysis) => set(state => {
            const newRecentAnalyses = [...state.socialDecoder.recentAnalyses, analysis];
            if (newRecentAnalyses.length > 20) {
              newRecentAnalyses.splice(0, newRecentAnalyses.length - 10);
            }

            return {
              ...state,
              socialDecoder: {
                ...state.socialDecoder,
                currentAnalysis: analysis,
                recentAnalyses: newRecentAnalyses,
                metrics: {
                  ...state.socialDecoder.metrics,
                  totalDetections: state.socialDecoder.metrics.totalDetections + 1,
                  sarcasmDetections: analysis.detectionType === 'sarcasm' 
                    ? state.socialDecoder.metrics.sarcasmDetections + 1
                    : state.socialDecoder.metrics.sarcasmDetections,
                  emotionDetections: analysis.detectionType === 'emotion'
                    ? state.socialDecoder.metrics.emotionDetections + 1
                    : state.socialDecoder.metrics.emotionDetections
                }
              }
            };
          }),

          activateMeetingMode: (meetingData) => set(state => ({
            ...state,
            socialDecoder: {
              ...state.socialDecoder,
              isMeetingMode: true,
              currentMeeting: meetingData
            }
          })),

          deactivateMeetingMode: () => set(state => ({
            ...state,
            socialDecoder: {
              ...state.socialDecoder,
              isMeetingMode: false,
              currentMeeting: null
            }
          })),

          triggerSocialIntervention: (intervention) => set(state => ({
            ...state,
            socialDecoder: {
              ...state.socialDecoder,
              activeIntervention: intervention,
              metrics: {
                ...state.socialDecoder.metrics,
                interventionsTrigger: state.socialDecoder.metrics.interventionsTrigger + 1
              }
            }
          })),

          // Executive Dysfunction Actions
          initializeExecutiveDysfunction: () => set(state => ({
            ...state,
            executiveDysfunction: {
              ...state.executiveDysfunction,
              isActive: true
            },
            system: {
              ...state.system,
              activeFeatures: state.system.activeFeatures.includes('executiveDysfunction')
                ? state.system.activeFeatures
                : [...state.system.activeFeatures, 'executiveDysfunction']
            }
          })),

          updatePatternDetection: (pattern) => set(state => ({
            ...state,
            executiveDysfunction: {
              ...state.executiveDysfunction,
              detectedPatterns: [...state.executiveDysfunction.detectedPatterns, pattern]
            }
          })),

          triggerCrisisIntervention: (intervention) => set(state => ({
            ...state,
            executiveDysfunction: {
              ...state.executiveDysfunction,
              activeIntervention: intervention,
              currentCrisisLevel: intervention.level || 'crisis'
            }
          })),

          activateSafeSpace: (duration = 15 * 60 * 1000) => set(state => ({
            ...state,
            executiveDysfunction: {
              ...state.executiveDysfunction,
              safeSpaceActive: true,
              safeSpaceDuration: duration
            }
          })),

          updateEnergyLevel: (energyLevel) => set(state => ({
            ...state,
            executiveDysfunction: {
              ...state.executiveDysfunction,
              energyLevel: energyLevel
            }
          })),

          // Masking Fatigue Actions
          initializeMaskingFatigue: () => set(state => ({
            ...state,
            maskingFatigue: {
              ...state.maskingFatigue,
              isActive: true
            },
            system: {
              ...state.system,
              activeFeatures: state.system.activeFeatures.includes('maskingFatigue')
                ? state.system.activeFeatures
                : [...state.system.activeFeatures, 'maskingFatigue']
            }
          })),

          updateMaskingLevel: (maskingData) => set(state => ({
            ...state,
            maskingFatigue: {
              ...state.maskingFatigue,
              currentMaskingLevel: maskingData.level,
              performanceMetrics: {
                ...state.maskingFatigue.performanceMetrics,
                totalAnalyses: state.maskingFatigue.performanceMetrics.totalAnalyses + 1,
                maskingDetections: maskingData.level > 0.7 
                  ? state.maskingFatigue.performanceMetrics.maskingDetections + 1
                  : state.maskingFatigue.performanceMetrics.maskingDetections
              }
            }
          })),

          updateContextAwareness: (context) => set(state => ({
            ...state,
            maskingFatigue: {
              ...state.maskingFatigue,
              contextAwareness: {
                ...state.maskingFatigue.contextAwareness,
                ...context
              }
            },
            userContext: {
              ...state.userContext,
              environment: context.currentEnvironment ? {
                type: context.currentEnvironment,
                confidence: context.environmentConfidence || 0
              } : state.userContext.environment
            }
          })),

          triggerUnmaskingOpportunity: (opportunity) => set(state => ({
            ...state,
            maskingFatigue: {
              ...state.maskingFatigue,
              performanceMetrics: {
                ...state.maskingFatigue.performanceMetrics,
                safeSpaceIdentifications: state.maskingFatigue.performanceMetrics.safeSpaceIdentifications + 1
              }
            }
          })),

          updateEnergyTracking: (energyData) => set(state => ({
            ...state,
            maskingFatigue: {
              ...state.maskingFatigue,
              energyLevel: energyData.currentEnergy
            }
          })),

          // Velvet Brain Actions
          initializeVelvetBrain: () => set(state => ({
            ...state,
            velvetBrain: {
              ...state.velvetBrain,
              isActive: true,
              consciousnessLevel: 1.0
            },
            system: {
              ...state.system,
              activeFeatures: state.system.activeFeatures.includes('velvetBrain')
                ? state.system.activeFeatures
                : [...state.system.activeFeatures, 'velvetBrain']
            }
          })),

          updateThoughtCycle: (cycleData) => set(state => ({
            ...state,
            velvetBrain: {
              ...state.velvetBrain,
              currentThoughtCycle: {
                ...state.velvetBrain.currentThoughtCycle,
                ...cycleData
              },
              metrics: {
                ...state.velvetBrain.metrics,
                thoughtCycles: cycleData.cycleNumber || state.velvetBrain.metrics.thoughtCycles
              }
            }
          })),

          storeExperience: (experience) => set(state => ({
            ...state,
            velvetBrain: {
              ...state.velvetBrain,
              metrics: {
                ...state.velvetBrain.metrics,
                learningAccuracy: experience.success 
                  ? (state.velvetBrain.metrics.learningAccuracy + 0.1) 
                  : Math.max(0, state.velvetBrain.metrics.learningAccuracy - 0.05)
              }
            }
          })),

          // User Context Actions
          updateUserContext: (contextUpdate) => set(state => ({
            ...state,
            userContext: {
              ...state.userContext,
              ...contextUpdate
            }
          })),

          updateScreenContext: (screenData) => set(state => ({
            ...state,
            userContext: {
              ...state.userContext,
              screen: {
                ...state.userContext.screen,
                ...screenData
              }
            }
          })),

          // Coordination Actions
          updateCoordinationPriorities: (priorities) => set(state => ({
            ...state,
            coordination: {
              ...state.coordination,
              activePriorities: {
                ...state.coordination.activePriorities,
                ...priorities
              }
            }
          })),

          triggerUnifiedIntervention: (intervention) => set(state => ({
            ...state,
            coordination: {
              ...state.coordination,
              unifiedInterventions: {
                ...state.coordination.unifiedInterventions,
                active: [...state.coordination.unifiedInterventions.active, intervention],
                history: [...state.coordination.unifiedInterventions.history, { ...intervention, timestamp: Date.now() }]
              }
            }
          })),

          // Utility Actions
          resetFeature: (featureName) => set(state => {
            const updates = { ...state };
            
            switch (featureName) {
              case 'socialDecoder':
                updates.socialDecoder = {
                  ...state.socialDecoder,
                  currentAnalysis: null,
                  activeIntervention: null
                };
                break;
              case 'executiveDysfunction':
                updates.executiveDysfunction = {
                  ...state.executiveDysfunction,
                  activeIntervention: null,
                  currentCrisisLevel: 'none'
                };
                break;
              case 'maskingFatigue':
                updates.maskingFatigue = {
                  ...state.maskingFatigue,
                  currentMaskingLevel: 0
                };
                break;
            }
            
            return updates;
          }),

          getSystemStatus: () => {
            const state = get();
            return {
              system: state.system,
              activeFeatures: state.system.activeFeatures,
              coordination: state.coordination,
              userContext: state.userContext
            };
          }
        }),
        {
          name: 'velvet-state',
          partialize: (state) => ({
            system: {
              activeFeatures: state.system.activeFeatures
            },
            userContext: {
              environment: state.userContext.environment
            }
          })
        }
      )
    ),
    {
      name: 'velvet-store'
    }
  )
);

// ===========================================
// SELECTOR HOOKS
// ===========================================

// System selectors
export const useSystemStatus = () => useVelvetStore(state => state.system);
export const useActiveFeatures = () => useVelvetStore(state => state.system.activeFeatures);

// Feature selectors
export const useSocialDecoderState = () => useVelvetStore(state => state.socialDecoder);
export const useExecutiveDysfunctionState = () => useVelvetStore(state => state.executiveDysfunction);
export const useMaskingFatigueState = () => useVelvetStore(state => state.maskingFatigue);
export const useVelvetBrainState = () => useVelvetStore(state => state.velvetBrain);

// Context selectors
export const useUserContext = () => useVelvetStore(state => state.userContext);
export const useCoordination = () => useVelvetStore(state => state.coordination);

// Computed selectors
export const useSystemHealth = () => useVelvetStore(state => ({
  isHealthy: state.system.activeFeatures.length >= 1 && state.system.isInitialized,
  activeFeatureCount: state.system.activeFeatures.length,
  lastUpdate: state.system.lastUpdate
}));

export const useCurrentUserNeed = () => useVelvetStore(state => {
  const crisisLevel = state.executiveDysfunction.currentCrisisLevel;
  const maskingLevel = state.maskingFatigue.currentMaskingLevel;
  const socialActive = state.socialDecoder.isMeetingMode;
  const energyLevel = state.executiveDysfunction.energyLevel;
  
  if (crisisLevel === 'crisis') return 'emergency_support';
  if (socialActive && maskingLevel > 0.8) return 'social_support';
  if (energyLevel < 0.3) return 'energy_recovery';
  if (maskingLevel > 0.7) return 'authenticity_support';
  if (socialActive) return 'communication_support';
  
  return 'general_wellness';
});

console.log('🎯 Velvet State Management System (Simplified) loaded');