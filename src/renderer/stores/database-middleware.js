// Velvet Database Middleware for Zustand - Automatic state persistence
// Seamlessly connects Zustand state changes with encrypted database storage

import velvetDatabaseIntegration from '../database-integration.js';

/**
 * Database persistence middleware for Zustand
 * Automatically persists neurodivergent feature data to encrypted database
 */
export const databaseMiddleware = (config) => (set, get, api) => {
  // Wrap the original config to add database persistence
  const wrappedConfig = (...args) => {
    const state = config(...args);
    
    // Add database persistence actions to the state
    const enhancedState = {
      ...state,
      
      // ===========================================
      // DATABASE PERSISTENCE ACTIONS
      // ===========================================
      
      // Enhanced social decoder actions with persistence
      updateSocialAnalysisWithPersistence: async (analysis) => {
        try {
          // Update Zustand state first
          state.updateSocialAnalysis(analysis);
          
          // Persist to database
          if (velvetDatabaseIntegration.isInitialized) {
            const dbResult = await velvetDatabaseIntegration.storeSocialAnalysis({
              sessionId: get().socialDecoder.currentMeeting?.sessionId || `session_${Date.now()}`,
              analysisType: analysis.detectionType || 'general',
              confidence: analysis.confidence || 0.5,
              originalText: analysis.originalText || '',
              detectedPattern: analysis.detectedPattern,
              explanation: analysis.explanation,
              interventionSuggested: analysis.intervention,
              neurotypicalTranslation: analysis.translation,
              interventionTriggered: !!analysis.intervention,
              context: {
                platform: get().socialDecoder.currentMeeting?.platform,
                participantCount: get().socialDecoder.currentMeeting?.participantCount,
                meetingDuration: Date.now() - (get().socialDecoder.currentMeeting?.startTime || Date.now())
              },
              timestamp: analysis.timestamp || Date.now()
            });
            
            if (!dbResult.success) {
              console.warn('⚠️ Failed to persist social analysis:', dbResult.error);
            }
          }
        } catch (error) {
          console.error('❌ Error in updateSocialAnalysisWithPersistence:', error);
        }
      },

      // Enhanced executive dysfunction actions with persistence
      triggerCrisisInterventionWithPersistence: async (intervention) => {
        try {
          // Update Zustand state first
          state.triggerCrisisIntervention(intervention);
          
          // Persist pattern to database
          if (velvetDatabaseIntegration.isInitialized) {
            const currentState = get();
            
            const dbResult = await velvetDatabaseIntegration.storeExecutivePattern({
              patternId: `crisis_${Date.now()}`,
              patternType: intervention.triggerPattern || 'crisis',
              severityLevel: intervention.level,
              contextData: {
                triggerApp: currentState.userContext.application.name,
                behaviorPattern: intervention.detectedBehavior,
                environmentFactors: {
                  timeOfDay: new Date().getHours(),
                  dayOfWeek: new Date().getDay(),
                  workingHours: currentState.userContext.time.isWorkingHours
                },
                timeContext: currentState.userContext.time
              },
              detectionConfidence: intervention.confidence || 0.8,
              interventionUsed: {
                type: intervention.type,
                severity: intervention.level,
                techniques: intervention.techniques || [],
                estimatedDuration: intervention.estimatedDuration
              },
              energyLevelBefore: currentState.executiveDysfunction.energyLevel,
              timestamp: Date.now()
            });
            
            if (!dbResult.success) {
              console.warn('⚠️ Failed to persist executive pattern:', dbResult.error);
            }
          }
        } catch (error) {
          console.error('❌ Error in triggerCrisisInterventionWithPersistence:', error);
        }
      },

      // Enhanced masking fatigue actions with persistence
      updateMaskingLevelWithPersistence: async (maskingData) => {
        try {
          // Update Zustand state first
          state.updateMaskingLevel(maskingData);
          
          // Persist analysis to database
          if (velvetDatabaseIntegration.isInitialized) {
            const currentState = get();
            
            const dbResult = await velvetDatabaseIntegration.storeMaskingAnalysis({
              sessionId: currentState.maskingFatigue.currentSessionId || `masking_${Date.now()}`,
              analysisType: 'real_time_assessment',
              maskingIndicators: {
                formalityLevel: maskingData.indicators?.formality || 0,
                emotionalSuppression: maskingData.indicators?.emotionalSuppression || 0,
                energyTension: maskingData.indicators?.energyTension || 0,
                responsePatterns: maskingData.indicators?.responsePatterns || []
              },
              authenticityScore: 1 - maskingData.level, // Higher masking = lower authenticity
              energyImpact: maskingData.level * 0.1, // Masking costs energy
              safeSpaceDetected: currentState.maskingFatigue.safeSpaceDetection.currentSafetyLevel > 0.8,
              interventionSuggested: maskingData.level > 0.7 ? {
                type: 'energy_conservation',
                suggestions: ['Take a brief authentic break', 'Find a safe space to unmask', 'Practice self-compassion']
              } : null,
              timestamp: maskingData.timestamp || Date.now()
            });
            
            if (!dbResult.success) {
              console.warn('⚠️ Failed to persist masking analysis:', dbResult.error);
            }
          }
        } catch (error) {
          console.error('❌ Error in updateMaskingLevelWithPersistence:', error);
        }
      },

      // Cross-feature insight generation with persistence
      generateCrossFeatureInsight: async (insightData) => {
        try {
          // Store cross-feature insight
          if (velvetDatabaseIntegration.isInitialized) {
            const dbResult = await velvetDatabaseIntegration.storeCrossFeatureInsight({
              insightType: insightData.type, // correlation, prediction, adaptation
              featuresInvolved: insightData.features,
              pattern: insightData.pattern,
              correlation: insightData.correlation,
              prediction: insightData.prediction,
              recommendation: insightData.recommendation,
              confidence: insightData.confidence
            });
            
            if (dbResult.success) {
              // Update coordination state with new insight
              state.updateCrossFeatureInsights({
                patterns: [...get().coordination.insights.patterns, insightData.pattern],
                correlations: [...get().coordination.insights.correlations, insightData.correlation],
                predictions: [...get().coordination.insights.predictions, insightData.prediction]
              });
            }
          }
        } catch (error) {
          console.error('❌ Error in generateCrossFeatureInsight:', error);
        }
      },

      // Learning progress tracking with persistence
      trackLearningProgress: async (featureName, metricName, currentValue, baselineValue) => {
        try {
          const improvementRate = baselineValue ? (currentValue - baselineValue) / baselineValue : 0;
          
          if (velvetDatabaseIntegration.isInitialized) {
            await velvetDatabaseIntegration.updateLearningProgress({
              featureName,
              metricName,
              baselineValue,
              currentValue,
              improvementRate,
              milestones: [],
              breakthroughs: improvementRate > 0.2 ? [`Significant improvement in ${metricName}`] : [],
              challenges: improvementRate < -0.1 ? [`Difficulty with ${metricName}`] : []
            });
          }
        } catch (error) {
          console.error('❌ Error in trackLearningProgress:', error);
        }
      },

      // ===========================================
      // SESSION MANAGEMENT WITH PERSISTENCE
      // ===========================================

      // Start social decoder session with database
      startSocialDecoderSessionWithDB: async (sessionData) => {
        try {
          // Start session in Zustand
          state.activateMeetingMode(sessionData);
          
          // Create database session
          if (velvetDatabaseIntegration.isInitialized) {
            const dbResult = await velvetDatabaseIntegration.startSocialDecoderSession({
              sessionId: sessionData.sessionId,
              sessionType: sessionData.type || 'meeting',
              platform: sessionData.platform,
              startTime: Date.now(),
              participantCount: sessionData.participantCount || 1
            });
            
            if (dbResult.success) {
              console.log('✅ Social decoder session started with database persistence');
            }
          }
        } catch (error) {
          console.error('❌ Error starting social decoder session:', error);
        }
      },

      // Start masking session with database
      startMaskingSessionWithDB: async (sessionData) => {
        try {
          // Update Zustand state
          state.updateContextAwareness({
            currentEnvironment: sessionData.environmentType,
            environmentConfidence: 0.9
          });
          
          // Create database session
          if (velvetDatabaseIntegration.isInitialized) {
            const dbResult = await velvetDatabaseIntegration.startMaskingSession({
              sessionId: sessionData.sessionId || `masking_${Date.now()}`,
              environmentType: sessionData.environmentType,
              startTime: Date.now(),
              initialMaskingLevel: get().maskingFatigue.currentMaskingLevel,
              socialContext: sessionData.socialContext,
              workContext: sessionData.workContext,
              emotionalState: sessionData.emotionalState,
              energyLevel: get().maskingFatigue.energyLevel
            });
            
            if (dbResult.success) {
              // Update state with session ID for future references
              set(state => ({
                maskingFatigue: {
                  ...state.maskingFatigue,
                  currentSessionId: sessionData.sessionId || `masking_${Date.now()}`
                }
              }));
              
              console.log('✅ Masking session started with database persistence');
            }
          }
        } catch (error) {
          console.error('❌ Error starting masking session:', error);
        }
      },

      // ===========================================
      // ANALYTICS AND INSIGHTS RETRIEVAL
      // ===========================================

      // Load learning insights from database
      loadLearningInsights: async () => {
        try {
          if (velvetDatabaseIntegration.isInitialized) {
            const insights = await velvetDatabaseIntegration.getLearningInsights();
            
            if (insights.success) {
              // Update state with insights
              set(state => ({
                coordination: {
                  ...state.coordination,
                  insights: {
                    ...state.coordination.insights,
                    learningEffectiveness: insights.data
                  }
                }
              }));
              
              return insights.data;
            }
          }
          return null;
        } catch (error) {
          console.error('❌ Error loading learning insights:', error);
          return null;
        }
      },

      // Load dashboard analytics
      loadDashboardAnalytics: async (timeRange) => {
        try {
          if (velvetDatabaseIntegration.isInitialized) {
            const analytics = await velvetDatabaseIntegration.getDashboardAnalytics(timeRange);
            
            if (analytics.success) {
              return analytics.data;
            }
          }
          return null;
        } catch (error) {
          console.error('❌ Error loading dashboard analytics:', error);
          return null;
        }
      },

      // Get effective interventions for current context
      loadEffectiveInterventions: async (interventionType) => {
        try {
          if (velvetDatabaseIntegration.isInitialized) {
            const interventions = await velvetDatabaseIntegration.getEffectiveInterventions(interventionType);
            
            if (interventions.success) {
              return interventions.data;
            }
          }
          return [];
        } catch (error) {
          console.error('❌ Error loading effective interventions:', error);
          return [];
        }
      },

      // ===========================================
      // ADAPTIVE LEARNING METHODS
      // ===========================================

      // Update intervention effectiveness based on user feedback
      updateInterventionEffectiveness: async (interventionId, effectiveness, userFeedback) => {
        try {
          if (velvetDatabaseIntegration.isInitialized) {
            await velvetDatabaseIntegration.storeExecutiveIntervention({
              interventionId,
              interventionType: 'feedback_update',
              triggerPattern: 'user_feedback',
              effectivenessScore: effectiveness,
              userPreferences: userFeedback.preferences,
              contextualAdaptations: userFeedback.adaptations,
              successFactors: userFeedback.successFactors
            });
          }
          
          // Track learning progress
          await enhancedState.trackLearningProgress(
            'intervention_effectiveness',
            interventionId,
            effectiveness,
            0.5 // baseline effectiveness
          );
        } catch (error) {
          console.error('❌ Error updating intervention effectiveness:', error);
        }
      },

      // Adapt patterns based on user behavior
      adaptPatternsFromBehavior: async (behaviorData) => {
        try {
          const currentState = get();
          
          // Update masking patterns
          if (behaviorData.maskingIndicators) {
            await velvetDatabaseIntegration.updateMaskingPattern({
              patternType: 'behavioral_adaptation',
              baselineData: currentState.maskingFatigue.communicationPatterns,
              currentData: behaviorData.maskingIndicators,
              deviationScore: behaviorData.deviationFromBaseline || 0,
              adaptationSuggestions: behaviorData.suggestions || []
            });
          }
          
          // Generate cross-feature insights
          if (behaviorData.crossFeatureCorrelations) {
            await enhancedState.generateCrossFeatureInsight({
              type: 'behavioral_adaptation',
              features: behaviorData.involvedFeatures,
              pattern: behaviorData.pattern,
              correlation: behaviorData.crossFeatureCorrelations,
              prediction: behaviorData.predictions,
              recommendation: behaviorData.recommendations,
              confidence: behaviorData.confidence || 0.7
            });
          }
        } catch (error) {
          console.error('❌ Error adapting patterns from behavior:', error);
        }
      }
    };
    
    return enhancedState;
  };
  
  return wrappedConfig(set, get, api);
};

/**
 * Auto-sync middleware for periodic background persistence
 */
export const autoSyncMiddleware = (config) => (set, get, api) => {
  const state = config(set, get, api);
  
  // Set up periodic sync of important metrics
  if (typeof window !== 'undefined') {
    setInterval(async () => {
      try {
        const currentState = get();
        
        // Sync performance metrics
        await state.trackLearningProgress?.(
          'system_performance',
          'state_updates_per_minute',
          currentState.system.performanceMetrics.stateUpdates,
          0
        );
        
        // Sync feature usage
        const activeFeatures = currentState.system.activeFeatures.length;
        await state.trackLearningProgress?.(
          'feature_usage',
          'active_features',
          activeFeatures,
          0
        );
        
        // Sync consciousness level if available
        if (currentState.velvetBrain.consciousnessLevel > 0) {
          await state.trackLearningProgress?.(
            'consciousness',
            'awareness_level',
            currentState.velvetBrain.consciousnessLevel,
            0
          );
        }
      } catch (error) {
        console.warn('⚠️ Auto-sync error:', error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes
  }
  
  return state;
};

export default databaseMiddleware;