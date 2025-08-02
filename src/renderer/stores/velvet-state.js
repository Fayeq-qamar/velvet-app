// Velvet State Management System - Unified Zustand Architecture
// Coordinates all viral neurodivergent features with optimized data flow and database persistence

// Use Zustand from global context (loaded via CDN)
const { create } = window.zustand;
const { subscribeWithSelector, persist, devtools } = window.zustand;
const { produce } = window.immer;

// Import database middleware
import { databaseMiddleware, autoSyncMiddleware } from './database-middleware.js';

/**
 * Central Velvet State Store
 * Coordinates all viral features and provides unified state management
 */
export const useVelvetStore = create()(
  devtools(
    subscribeWithSelector(
      autoSyncMiddleware(
        databaseMiddleware(
          persist(
            (set, get) => ({
            // ===========================================
            // CORE SYSTEM STATE
            // ===========================================
            
            system: {
              isInitialized: false,
              initializationProgress: 0,
              activeFeatures: [],
              lastUpdate: Date.now(),
              performanceMetrics: {
                stateUpdates: 0,
                lastUpdateDuration: 0,
                averageUpdateTime: 0
              }
            },

            // ===========================================
            // SOCIAL DECODER STATE
            // ===========================================
            
            socialDecoder: {
              isActive: false,
              isMeetingMode: false,
              isListening: false,
              currentMeeting: null,
              
              // Real-time analysis state
              currentAnalysis: null,
              analysisQueue: [],
              recentAnalyses: [],
              
              // Intervention state
              activeIntervention: null,
              interventionHistory: [],
              
              // Performance metrics
              metrics: {
                sessionStart: Date.now(),
                totalDetections: 0,
                sarcasmDetections: 0,
                emotionDetections: 0,
                interventionsTrigger: 0,
                averageConfidence: 0,
                processingTime: 0
              },
              
              // Meeting context
              meetingContext: {
                participants: [],
                duration: 0,
                platform: null,
                isRecording: false,
                socialTension: 0,
                communicationStyle: 'professional'
              },
              
              // UI state
              uiState: {
                interventionUIVisible: false,
                responseTemplatesVisible: false,
                confidenceIndicatorLevel: 0,
                whisperNotificationsEnabled: true
              }
            },

            // ===========================================
            // EXECUTIVE DYSFUNCTION STATE
            // ===========================================
            
            executiveDysfunction: {
              isActive: false,
              currentCrisisLevel: 'none', // none, gentle, supportive, crisis
              
              // Pattern detection state
              detectedPatterns: [],
              patternHistory: [], 
              
              // Crisis intervention state
              activeIntervention: null,
              interventionQueue: [],
              safeSpaceActive: false,
              safeSpaceDuration: 0,
              
              // Energy tracking
              energyLevel: 1.0,
              energyHistory: [],
              
              // UI state
              uiState: {
                interventionOverlayVisible: false,
                safeSpaceIndicatorVisible: false,
                breathingGuideActive: false,
                progressCelebrationVisible: false,
                currentEnergyLevel: 'medium' // low, medium, high
              },
              
              // Task breakdown system
              taskSystem: {
                activeTasks: [],
                completedMicroTasks: [],
                currentRecommendations: []
              }
            },

            // ===========================================
            // MASKING FATIGUE STATE
            // ===========================================
            
            maskingFatigue: {
              isActive: false,
              
              // Current masking analysis
              currentMaskingLevel: 0, // 0-1 scale
              energyLevel: 1.0, // 1.0 = full energy, 0 = depleted
              safetyLevel: 0.5, // 0 = high pressure, 1 = completely safe
              
              // Pattern tracking
              communicationPatterns: {
                formalLanguage: {
                  currentLevel: 0,
                  baseline: 0,
                  recentSamples: []
                },
                responseLatency: {
                  currentAverage: 0,
                  baseline: 0,
                  recentTimes: []
                },
                emotionalExpression: {
                  currentLevel: 1.0,
                  baseline: 1.0,
                  recentSamples: []
                },
                energySignature: {
                  currentTension: 0,
                  baseline: 0,
                  recentSamples: []
                }
              },
              
              // Context awareness
              contextAwareness: {
                currentEnvironment: 'unknown', // home, work, school, social, public
                environmentConfidence: 0,
                timeOfDay: null,
                applicationContext: 'unknown',
                socialLoad: 0
              },
              
              // Safe space detection
              safeSpaceDetection: {
                currentSafetyLevel: 0.5,
                safeSpaceHistory: [],
                recoveryOpportunities: [],
                lastUnmaskingPrompt: null
              },
              
              // Energy tracking
              energyTracking: {
                dailyEnergySpent: 0,
                energyBudget: 10.0,
                lowEnergyWarnings: [],
                recoveryRecommendations: []
              },
              
              // Performance metrics
              performanceMetrics: {
                totalAnalyses: 0,
                maskingDetections: 0,
                safeSpaceIdentifications: 0,
                energyWarnings: 0,
                authenticityMoments: 0,
                userValidations: 0
              }
            },

            // ===========================================
            // VELVET BRAIN STATE
            // ===========================================
            
            velvetBrain: {
              isActive: false,
              consciousnessLevel: 0, // 0-1 scale
              
              // Core systems status
              subsystems: {
                sensoryInput: { connected: false, status: 'disconnected' },
                memory: { connected: false, status: 'disconnected' },
                personality: { connected: false, status: 'disconnected' },
                actionDecider: { connected: false, status: 'disconnected' }
              },
              
              // Current thought cycle
              currentThoughtCycle: {
                cycleNumber: 0,
                stage: 'idle', // perceive, understand, predict, decide, act, learn
                startTime: 0,
                context: null,
                predictions: null,
                action: null,
                outcome: null
              },
              
              // Memory and learning
              memory: {
                experiences: [],
                patterns: [],
                learningAccuracy: 0
              },
              
              // Performance metrics
              metrics: {
                thoughtCycles: 0,
                successfulPredictions: 0,
                userInteractions: 0,
                learningAccuracy: 0,
                responseRelevance: 0,
                averageThinkingTime: 0
              }
            },

            // ===========================================
            // UNIFIED USER CONTEXT
            // ===========================================
            
            userContext: {
              // Current environment
              environment: {
                type: 'unknown', // home, work, school, social, public
                confidence: 0,
                lastUpdate: Date.now()
              },
              
              // Current application context
              application: {
                name: '',
                title: '',
                category: 'unknown', // professional, personal, creative
                confidence: 0
              },
              
              // Screen intelligence
              screen: {
                currentText: '',
                ocrConfidence: 0,
                activeWindow: '',
                lastUpdate: Date.now()
              },
              
              // Audio context
              audio: {
                primaryType: 'unknown', // speech, call, music, silence
                source: '',
                confidence: 0,
                insights: null
              },
              
              // Behavioral patterns
              behavior: {
                currentActivity: 'unknown',
                patterns: [],
                focusState: 'idle', // focused, distracted, idle, hyperfocus
                lastInteraction: Date.now()
              },
              
              // Time context
              time: {
                timeOfDay: 'unknown',
                dayOfWeek: new Date().getDay(),
                isWorkingHours: false,
                contextualExpectations: {}
              }
            },

            // ===========================================
            // CROSS-FEATURE COORDINATION
            // ===========================================
            
            coordination: {
              // Active feature priorities
              activePriorities: {
                socialDecoder: 0,
                executiveDysfunction: 0,
                maskingFatigue: 0,
                velvetBrain: 0
              },
              
              // Feature interactions
              interactions: {
                social_masking: { active: false, data: null },
                executive_masking: { active: false, data: null },
                social_executive: { active: false, data: null },
                brain_coordination: { active: false, data: null }
              },
              
              // Unified interventions
              unifiedInterventions: {
                active: [],
                queue: [],
                history: []
              },
              
              // Cross-feature insights
              insights: {
                patterns: [],
                correlations: [],
                predictions: []
              }
            },

            // ===========================================
            // ACTIONS - SOCIAL DECODER
            // ===========================================
            
            // Social Decoder Actions
            initializeSocialDecoder: () => set(state => ({
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
                activeFeatures: [...state.system.activeFeatures, 'socialDecoder']
              }
            })),
            
            updateSocialAnalysis: (analysis) => set(state => {
              const newRecentAnalyses = [...state.socialDecoder.recentAnalyses, analysis];
              
              // Maintain history size
              if (newRecentAnalyses.length > 20) {
                newRecentAnalyses.splice(0, newRecentAnalyses.length - 10);
              }
              
              const newMetrics = {
                ...state.socialDecoder.metrics,
                totalDetections: state.socialDecoder.metrics.totalDetections + 1
              };
              
              if (analysis.detectionType === 'sarcasm') {
                newMetrics.sarcasmDetections = state.socialDecoder.metrics.sarcasmDetections + 1;
              }
              if (analysis.detectionType === 'emotion') {
                newMetrics.emotionDetections = state.socialDecoder.metrics.emotionDetections + 1;
              }
              
              return {
                ...state,
                socialDecoder: {
                  ...state.socialDecoder,
                  currentAnalysis: analysis,
                  recentAnalyses: newRecentAnalyses,
                  metrics: newMetrics
                },
                system: {
                  ...state.system,
                  performanceMetrics: {
                    ...state.system.performanceMetrics,
                    stateUpdates: state.system.performanceMetrics.stateUpdates + 1
                  }
                }
              };
            }),
            
            activateMeetingMode: (meetingData) => set(state => {
              state.socialDecoder.isMeetingMode = true;
              state.socialDecoder.currentMeeting = meetingData;
              state.socialDecoder.meetingContext = {
                ...state.socialDecoder.meetingContext,
                startTime: Date.now(),
                platform: meetingData.platform,
                audioType: meetingData.audioType
              };
            }),
            
            deactivateMeetingMode: () => set(state => {
              state.socialDecoder.isMeetingMode = false;
              state.socialDecoder.currentMeeting = null;
            }),
            
            triggerSocialIntervention: (intervention) => set(state => {
              state.socialDecoder.activeIntervention = intervention;
              state.socialDecoder.interventionHistory.push(intervention);
              state.socialDecoder.metrics.interventionsTrigger++;
              state.socialDecoder.uiState.interventionUIVisible = true;
              
              // Cross-feature coordination
              state.coordination.unifiedInterventions.active.push({
                source: 'socialDecoder',
                type: intervention.type,
                intervention: intervention,
                timestamp: Date.now()
              });
            }),

            // ===========================================
            // ACTIONS - EXECUTIVE DYSFUNCTION
            // ===========================================
            
            // Executive Dysfunction Actions
            initializeExecutiveDysfunction: () => set(state => {
              state.executiveDysfunction.isActive = true;
              state.system.activeFeatures.push('executiveDysfunction');
            }),
            
            updatePatternDetection: (pattern) => set(state => {
              state.executiveDysfunction.detectedPatterns.push(pattern);
              state.executiveDysfunction.patternHistory.push(pattern);
              
              // Maintain history size
              if (state.executiveDysfunction.patternHistory.length > 50) {
                state.executiveDysfunction.patternHistory = state.executiveDysfunction.patternHistory.slice(-25);
              }
            }),
            
            triggerCrisisIntervention: (intervention) => set(state => {
              state.executiveDysfunction.activeIntervention = intervention;
              state.executiveDysfunction.currentCrisisLevel = intervention.level;
              state.executiveDysfunction.uiState.interventionOverlayVisible = true;
              
              // Cross-feature coordination - executive dysfunction affects masking
              if (state.maskingFatigue.isActive) {
                state.coordination.interactions.executive_masking = {
                  active: true,
                  data: {
                    crisisLevel: intervention.level,
                    energyImpact: intervention.level === 'crisis' ? 0.3 : 0.1,
                    timestamp: Date.now()
                  }
                };
              }
            }),
            
            activateSafeSpace: (duration = 15 * 60 * 1000) => set(state => {
              state.executiveDysfunction.safeSpaceActive = true;
              state.executiveDysfunction.safeSpaceDuration = duration;
              state.executiveDysfunction.uiState.safeSpaceIndicatorVisible = true;
            }),
            
            updateEnergyLevel: (energyLevel) => set(state => {
              state.executiveDysfunction.energyLevel = energyLevel;
              state.executiveDysfunction.energyHistory.push({
                level: energyLevel,
                timestamp: Date.now()
              });
              
              // Determine UI energy level
              if (energyLevel < 0.3) {
                state.executiveDysfunction.uiState.currentEnergyLevel = 'low';
              } else if (energyLevel < 0.7) {
                state.executiveDysfunction.uiState.currentEnergyLevel = 'medium';
              } else {
                state.executiveDysfunction.uiState.currentEnergyLevel = 'high';
              }
            }),

            // ===========================================
            // ACTIONS - MASKING FATIGUE
            // ===========================================
            
            // Masking Fatigue Actions
            initializeMaskingFatigue: () => set(state => {
              state.maskingFatigue.isActive = true;
              state.system.activeFeatures.push('maskingFatigue');
            }),
            
            updateMaskingLevel: (maskingData) => set(state => {
              state.maskingFatigue.currentMaskingLevel = maskingData.level;
              
              // Update communication patterns
              if (maskingData.indicators) {
                if (maskingData.indicators.formality !== undefined) {
                  state.maskingFatigue.communicationPatterns.formalLanguage.currentLevel = maskingData.indicators.formality;
                  state.maskingFatigue.communicationPatterns.formalLanguage.recentSamples.push({
                    timestamp: Date.now(),
                    level: maskingData.indicators.formality,
                    text: maskingData.context || ''
                  });
                }
                
                if (maskingData.indicators.emotionalSuppression !== undefined) {
                  state.maskingFatigue.communicationPatterns.emotionalExpression.currentLevel = 1 - maskingData.indicators.emotionalSuppression;
                }
                
                if (maskingData.indicators.energyTension !== undefined) {
                  state.maskingFatigue.communicationPatterns.energySignature.currentTension = maskingData.indicators.energyTension;
                }
              }
              
              // Update performance metrics
              state.maskingFatigue.performanceMetrics.totalAnalyses++;
              if (maskingData.level > 0.7) {
                state.maskingFatigue.performanceMetrics.maskingDetections++;
              }
              
              // Cross-feature coordination with social decoder
              if (state.socialDecoder.isActive && state.socialDecoder.isMeetingMode) {
                state.coordination.interactions.social_masking = {
                  active: true,
                  data: {
                    maskingLevel: maskingData.level,
                    socialContext: 'meeting',
                    energyImpact: maskingData.level * 0.1,
                    timestamp: Date.now()
                  }
                };
              }
            }),
            
            updateContextAwareness: (context) => set(state => {
              state.maskingFatigue.contextAwareness = {
                ...state.maskingFatigue.contextAwareness,
                ...context
              };
              
              // Update unified user context
              if (context.currentEnvironment) {
                state.userContext.environment.type = context.currentEnvironment;
                state.userContext.environment.confidence = context.environmentConfidence || 0;
                state.userContext.environment.lastUpdate = Date.now();
              }
            }),
            
            triggerUnmaskingOpportunity: (opportunity) => set(state => {
              state.maskingFatigue.safeSpaceDetection.recoveryOpportunities.push(opportunity);
              state.maskingFatigue.safeSpaceDetection.lastUnmaskingPrompt = opportunity;
              state.maskingFatigue.performanceMetrics.safeSpaceIdentifications++;
            }),
            
            updateEnergyTracking: (energyData) => set(state => {
              state.maskingFatigue.energyLevel = energyData.currentEnergy;
              state.maskingFatigue.energyTracking.dailyEnergySpent = energyData.dailyExpenditure;
              
              if (energyData.warning) {
                state.maskingFatigue.energyTracking.lowEnergyWarnings.push(energyData.warning);
                state.maskingFatigue.performanceMetrics.energyWarnings++;
              }
            }),

            // ===========================================
            // ACTIONS - VELVET BRAIN
            // ===========================================
            
            // Velvet Brain Actions
            initializeVelvetBrain: () => set(state => {
              state.velvetBrain.isActive = true;
              state.velvetBrain.consciousnessLevel = 1.0;
              state.system.activeFeatures.push('velvetBrain');
            }),
            
            updateSubsystemStatus: (subsystem, status) => set(state => {
              state.velvetBrain.subsystems[subsystem] = status;
            }),
            
            updateThoughtCycle: (cycleData) => set(state => {
              state.velvetBrain.currentThoughtCycle = {
                ...state.velvetBrain.currentThoughtCycle,
                ...cycleData
              };
              
              if (cycleData.cycleNumber) {
                state.velvetBrain.metrics.thoughtCycles = cycleData.cycleNumber;
              }
              
              // Calculate average thinking time
              if (cycleData.duration) {
                const currentAvg = state.velvetBrain.metrics.averageThinkingTime;
                const totalCycles = state.velvetBrain.metrics.thoughtCycles;
                state.velvetBrain.metrics.averageThinkingTime = 
                  (currentAvg * (totalCycles - 1) + cycleData.duration) / totalCycles;
              }
            }),
            
            storeExperience: (experience) => set(state => {
              state.velvetBrain.memory.experiences.push(experience);
              
              // Maintain memory size
              if (state.velvetBrain.memory.experiences.length > 1000) {
                state.velvetBrain.memory.experiences = state.velvetBrain.memory.experiences.slice(-500);
              }
              
              // Update learning accuracy
              if (experience.success) {
                state.velvetBrain.metrics.successfulPredictions++;
              }
              state.velvetBrain.metrics.userInteractions++;
              state.velvetBrain.metrics.learningAccuracy = 
                state.velvetBrain.metrics.successfulPredictions / 
                Math.max(1, state.velvetBrain.metrics.userInteractions);
            }),

            // ===========================================
            // ACTIONS - UNIFIED CONTEXT
            // ===========================================
            
            // Unified Context Actions
            updateUserContext: (contextUpdate) => set(state => {
              state.userContext = {
                ...state.userContext,
                ...contextUpdate
              };
              
              // Update last interaction time
              state.userContext.behavior.lastInteraction = Date.now();
            }),
            
            updateScreenContext: (screenData) => set(state => {
              state.userContext.screen = {
                ...state.userContext.screen,
                ...screenData,
                lastUpdate: Date.now()
              };
            }),
            
            updateAudioContext: (audioData) => set(state => {
              state.userContext.audio = {
                ...state.userContext.audio,
                ...audioData
              };
            }),

            // ===========================================
            // ACTIONS - CROSS-FEATURE COORDINATION
            // ===========================================
            
            // Cross-Feature Coordination Actions
            updateCoordinationPriorities: (priorities) => set(state => {
              state.coordination.activePriorities = {
                ...state.coordination.activePriorities,
                ...priorities
              };
            }),
            
            triggerUnifiedIntervention: (intervention) => set(state => {
              state.coordination.unifiedInterventions.active.push(intervention);
              state.coordination.unifiedInterventions.history.push({
                ...intervention,
                timestamp: Date.now()
              });
              
              // Maintain history size
              if (state.coordination.unifiedInterventions.history.length > 100) {
                state.coordination.unifiedInterventions.history = 
                  state.coordination.unifiedInterventions.history.slice(-50);
              }
            }),
            
            updateCrossFeatureInsights: (insights) => set(state => {
              state.coordination.insights = {
                ...state.coordination.insights,
                ...insights
              };
            }),

            // ===========================================
            // PERFORMANCE & UTILITY ACTIONS
            // ===========================================
            
            updateSystemMetrics: () => set(state => {
              const now = Date.now();
              const updateStart = performance.now();
              
              // Update system metrics
              state.system.lastUpdate = now;
              state.system.performanceMetrics.stateUpdates++;
              
              // Calculate update duration after state update
              setTimeout(() => {
                const duration = performance.now() - updateStart;
                set(state => {
                  state.system.performanceMetrics.lastUpdateDuration = duration;
                  
                  // Update average
                  const currentAvg = state.system.performanceMetrics.averageUpdateTime;
                  const totalUpdates = state.system.performanceMetrics.stateUpdates;
                  state.system.performanceMetrics.averageUpdateTime = 
                    (currentAvg * (totalUpdates - 1) + duration) / totalUpdates;
                });
              }, 0);
            }),
            
            resetFeature: (featureName) => set(state => {
              switch (featureName) {
                case 'socialDecoder':
                  state.socialDecoder = {
                    ...state.socialDecoder,
                    currentAnalysis: null,
                    analysisQueue: [],
                    activeIntervention: null,
                    uiState: {
                      ...state.socialDecoder.uiState,
                      interventionUIVisible: false,
                      responseTemplatesVisible: false
                    }
                  };
                  break;
                case 'executiveDysfunction':
                  state.executiveDysfunction = {
                    ...state.executiveDysfunction,
                    activeIntervention: null,
                    currentCrisisLevel: 'none',
                    uiState: {
                      ...state.executiveDysfunction.uiState,
                      interventionOverlayVisible: false
                    }
                  };
                  break;
                case 'maskingFatigue':
                  state.maskingFatigue = {
                    ...state.maskingFatigue,
                    currentMaskingLevel: 0,
                    safeSpaceDetection: {
                      ...state.maskingFatigue.safeSpaceDetection,
                      recoveryOpportunities: [],
                      lastUnmaskingPrompt: null
                    }
                  };
                  break;
              }
            }),
            
            // Get comprehensive system status
            getSystemStatus: () => {
              const state = get();
              return {
                system: state.system,
                activeFeatures: state.system.activeFeatures,
                coordination: state.coordination,
                userContext: state.userContext,
                performanceMetrics: {
                  system: state.system.performanceMetrics,
                  socialDecoder: state.socialDecoder.metrics,
                  executiveDysfunction: state.executiveDysfunction,
                  maskingFatigue: state.maskingFatigue.performanceMetrics,
                  velvetBrain: state.velvetBrain.metrics
                }
              };
            }
          }),
          {
            name: 'velvet-state',
            // Only persist certain parts of the state
            partialize: (state) => ({
              system: {
                activeFeatures: state.system.activeFeatures
              },
              userContext: {
                environment: state.userContext.environment,
                time: state.userContext.time
              },
              maskingFatigue: {
                energyTracking: state.maskingFatigue.energyTracking,
                communicationPatterns: {
                  formalLanguage: {
                    baseline: state.maskingFatigue.communicationPatterns.formalLanguage.baseline
                  },
                  emotionalExpression: {
                    baseline: state.maskingFatigue.communicationPatterns.emotionalExpression.baseline
                  }
                }
              }
            }),
            {
              name: 'velvet-state',
              // Only persist certain parts of the state
              partialize: (state) => ({
                system: {
                  activeFeatures: state.system.activeFeatures
                },
                userContext: {
                  environment: state.userContext.environment,
                  time: state.userContext.time
                },
                maskingFatigue: {
                  energyTracking: state.maskingFatigue.energyTracking,
                  communicationPatterns: {
                    formalLanguage: {
                      baseline: state.maskingFatigue.communicationPatterns.formalLanguage.baseline
                    },
                    emotionalExpression: {
                      baseline: state.maskingFatigue.communicationPatterns.emotionalExpression.baseline
                    }
                  }
                }
              })
            }
          )
        )
      )
    ),
    {
      name: 'velvet-store'
    }
  )
);

// ===========================================
// SELECTOR HOOKS FOR OPTIMIZED SUBSCRIPTIONS
// ===========================================

// System selectors
export const useSystemStatus = () => useVelvetStore(state => state.system);
export const useActiveFeatures = () => useVelvetStore(state => state.system.activeFeatures);
export const usePerformanceMetrics = () => useVelvetStore(state => state.system.performanceMetrics);

// Social Decoder selectors
export const useSocialDecoderState = () => useVelvetStore(state => state.socialDecoder);
export const useSocialDecoderMetrics = () => useVelvetStore(state => state.socialDecoder.metrics);
export const useMeetingMode = () => useVelvetStore(state => state.socialDecoder.isMeetingMode);
export const useCurrentAnalysis = () => useVelvetStore(state => state.socialDecoder.currentAnalysis);
export const useActiveIntervention = () => useVelvetStore(state => state.socialDecoder.activeIntervention);

// Executive Dysfunction selectors
export const useExecutiveDysfunctionState = () => useVelvetStore(state => state.executiveDysfunction);
export const useCrisisLevel = () => useVelvetStore(state => state.executiveDysfunction.currentCrisisLevel);
export const useEnergyLevel = () => useVelvetStore(state => state.executiveDysfunction.energyLevel);
export const useSafeSpaceActive = () => useVelvetStore(state => state.executiveDysfunction.safeSpaceActive);

// Masking Fatigue selectors
export const useMaskingFatigueState = () => useVelvetStore(state => state.maskingFatigue);
export const useMaskingLevel = () => useVelvetStore(state => state.maskingFatigue.currentMaskingLevel);
export const useContextAwareness = () => useVelvetStore(state => state.maskingFatigue.contextAwareness);
export const useEnergyTracking = () => useVelvetStore(state => state.maskingFatigue.energyTracking);

// Velvet Brain selectors
export const useVelvetBrainState = () => useVelvetStore(state => state.velvetBrain);
export const useConsciousnessLevel = () => useVelvetStore(state => state.velvetBrain.consciousnessLevel);
export const useThoughtCycle = () => useVelvetStore(state => state.velvetBrain.currentThoughtCycle);
export const useBrainMetrics = () => useVelvetStore(state => state.velvetBrain.metrics);

// User Context selectors
export const useUserContext = () => useVelvetStore(state => state.userContext);
export const useEnvironmentContext = () => useVelvetStore(state => state.userContext.environment);
export const useScreenContext = () => useVelvetStore(state => state.userContext.screen);
export const useAudioContext = () => useVelvetStore(state => state.userContext.audio);
export const useBehaviorContext = () => useVelvetStore(state => state.userContext.behavior);

// Coordination selectors
export const useCoordination = () => useVelvetStore(state => state.coordination);
export const useUnifiedInterventions = () => useVelvetStore(state => state.coordination.unifiedInterventions);
export const useCrossFeatureInsights = () => useVelvetStore(state => state.coordination.insights);

// ===========================================
// COMPUTED SELECTORS
// ===========================================

// Combined state selectors for complex UI needs
export const useOverallSystemHealth = () => useVelvetStore(state => {
  const activeFeatures = state.system.activeFeatures.length;
  const avgUpdateTime = state.system.performanceMetrics.averageUpdateTime;
  const consciousnessLevel = state.velvetBrain.consciousnessLevel;
  
  let health = 'poor';
  if (activeFeatures >= 2 && avgUpdateTime < 50 && consciousnessLevel > 0.5) {
    health = 'excellent';
  } else if (activeFeatures >= 1 && avgUpdateTime < 100) {
    health = 'good';
  } else if (activeFeatures >= 1) {
    health = 'fair';
  }
  
  return {
    health,
    activeFeatures,
    avgUpdateTime,
    consciousnessLevel
  };
});

export const useCurrentUserNeed = () => useVelvetStore(state => {
  // Determine primary user need based on all features
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

export const useOptimalIntervention = () => useVelvetStore(state => {
  // Determine the optimal intervention based on all feature states
  const activeInterventions = [
    state.socialDecoder.activeIntervention,
    state.executiveDysfunction.activeIntervention,
    state.coordination.unifiedInterventions.active
  ].filter(Boolean);
  
  if (activeInterventions.length === 0) return null;
  
  // Priority: Crisis > Social > Masking > General
  if (state.executiveDysfunction.currentCrisisLevel === 'crisis') {
    return {
      type: 'executive_crisis',
      intervention: state.executiveDysfunction.activeIntervention,
      priority: 'critical'
    };
  }
  
  if (state.socialDecoder.activeIntervention && state.socialDecoder.isMeetingMode) {
    return {
      type: 'social_support',
      intervention: state.socialDecoder.activeIntervention,
      priority: 'high'
    };
  }
  
  return null;
});

console.log('🎯 Velvet State Management System loaded - coordinating all viral features');