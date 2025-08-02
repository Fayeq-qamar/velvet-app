// Velvet Database Feature Integration - Connect viral features to persistent learning
// Automatically captures patterns and learns from user behavior across all features

import velvetDatabaseIntegration from './database-integration.js';

/**
 * Database Feature Integration Manager
 * Connects all viral neurodivergent features to the encrypted database
 */
class VelvetDatabaseFeatureIntegration {
  constructor() {
    this.integrations = new Map();
    this.sessionData = new Map();
    this.learningMetrics = new Map();
    this.isActive = false;
    
    console.log('🔗 Database feature integration initialized');
  }

  /**
   * Initialize feature integrations
   */
  async initialize() {
    try {
      // Wait for database integration to be ready
      const dbReady = await velvetDatabaseIntegration.initialize();
      
      if (dbReady.success) {
        this.isActive = true;
        
        // Initialize feature-specific integrations
        await this.initializeSocialDecoderIntegration();
        await this.initializeExecutiveDysfunctionIntegration();
        await this.initializeMaskingFatigueIntegration();
        await this.initializeCrossFeatureIntegration();
        
        console.log('✅ All viral feature database integrations active');
        return { success: true };
      } else {
        console.warn('⚠️ Database not available - features will run without persistence');
        return { success: false, error: 'Database not available' };
      }
    } catch (error) {
      console.error('❌ Feature integration initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // SOCIAL DECODER INTEGRATION
  // ===========================================

  async initializeSocialDecoderIntegration() {
    const integration = {
      name: 'socialDecoder',
      activeSession: null,
      analysisBuffer: [],
      learningMetrics: {
        totalAnalyses: 0,
        sarcasmDetections: 0,
        emotionDetections: 0,
        interventionsTrigger: 0,
        averageConfidence: 0,
        sessionTime: 0
      }
    };

    // Hook into social decoder events if available
    if (window.socialDecoderAPI) {
      window.socialDecoderAPI.onAnalysisComplete = async (analysis) => {
        await this.handleSocialAnalysis(analysis);
      };

      window.socialDecoderAPI.onMeetingStart = async (meetingData) => {
        await this.startSocialSession(meetingData);
      };

      window.socialDecoderAPI.onMeetingEnd = async (meetingData) => {
        await this.endSocialSession(meetingData);
      };
    }

    // Listen for social decoder state changes via Zustand
    if (window.useVelvetStore) {
      const unsubscribe = window.useVelvetStore.subscribe(
        (state) => state.socialDecoder,
        async (socialState, previousSocialState) => {
          // Handle meeting mode activation
          if (socialState.isMeetingMode && !previousSocialState.isMeetingMode) {
            await this.startSocialSession(socialState.currentMeeting);
          }

          // Handle new analysis
          if (socialState.currentAnalysis && 
              socialState.currentAnalysis !== previousSocialState.currentAnalysis) {
            await this.handleSocialAnalysis(socialState.currentAnalysis);
          }

          // Handle intervention triggers
          if (socialState.activeIntervention && 
              socialState.activeIntervention !== previousSocialState.activeIntervention) {
            await this.handleSocialIntervention(socialState.activeIntervention);
          }
        }
      );

      integration.unsubscribe = unsubscribe;
    }

    this.integrations.set('socialDecoder', integration);
    console.log('🔗 Social Decoder database integration active');
  }

  async startSocialSession(meetingData) {
    if (!this.isActive) return;

    try {
      const sessionId = `social_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const result = await velvetDatabaseIntegration.startSocialDecoderSession({
        sessionId,
        sessionType: meetingData.type || 'meeting',
        platform: meetingData.platform || 'unknown',
        startTime: Date.now(),
        participantCount: meetingData.participantCount || 1
      });

      if (result.success) {
        const integration = this.integrations.get('socialDecoder');
        integration.activeSession = {
          sessionId,
          startTime: Date.now(),
          platform: meetingData.platform
        };
        
        console.log('📊 Social decoder session started with database persistence');
      }
    } catch (error) {
      console.error('❌ Failed to start social session:', error);
    }
  }

  async handleSocialAnalysis(analysis) {
    if (!this.isActive) return;

    try {
      const integration = this.integrations.get('socialDecoder');
      if (!integration?.activeSession) {
        // Create a default session if none exists
        await this.startSocialSession({ type: 'conversation' });
      }

      const sessionId = integration.activeSession?.sessionId || `fallback_${Date.now()}`;

      // Store analysis in database
      const result = await velvetDatabaseIntegration.storeSocialAnalysis({
        sessionId,
        analysisType: analysis.detectionType || 'general',
        confidence: analysis.confidence || 0.5,
        originalText: analysis.originalText || analysis.text || '',
        detectedPattern: analysis.pattern || analysis.detectionType,
        explanation: analysis.explanation || analysis.neurotypicalTranslation,
        interventionSuggested: analysis.intervention,
        neurotypicalTranslation: analysis.neurotypicalTranslation,
        interventionTriggered: !!analysis.intervention,
        context: {
          platform: integration.activeSession?.platform,
          analysisEngine: 'viral-social-decoder',
          userFeedback: analysis.userFeedback
        },
        timestamp: analysis.timestamp || Date.now()
      });

      if (result.success) {
        // Update learning metrics
        integration.learningMetrics.totalAnalyses++;
        
        if (analysis.detectionType === 'sarcasm') {
          integration.learningMetrics.sarcasmDetections++;
        } else if (analysis.detectionType === 'emotion') {
          integration.learningMetrics.emotionDetections++;
        }

        // Update average confidence
        const currentAvg = integration.learningMetrics.averageConfidence;
        const total = integration.learningMetrics.totalAnalyses;
        integration.learningMetrics.averageConfidence = 
          (currentAvg * (total - 1) + (analysis.confidence || 0.5)) / total;

        console.log('📊 Social analysis stored with learning metrics updated');
      }
    } catch (error) {
      console.error('❌ Failed to handle social analysis:', error);
    }
  }

  async handleSocialIntervention(intervention) {
    if (!this.isActive) return;

    try {
      const integration = this.integrations.get('socialDecoder');
      integration.learningMetrics.interventionsTrigger++;

      // Store intervention effectiveness for learning
      await velvetDatabaseIntegration.storeCrossFeatureInsight({
        insightType: 'intervention_trigger',
        featuresInvolved: ['socialDecoder'],
        pattern: intervention.triggerPattern,
        correlation: {
          confidence: intervention.confidence,
          context: intervention.context,
          userResponse: intervention.userResponse
        },
        recommendation: intervention.suggestion,
        confidence: intervention.confidence || 0.7
      });

      console.log('📊 Social intervention tracked for learning');
    } catch (error) {
      console.error('❌ Failed to handle social intervention:', error);
    }
  }

  // ===========================================
  // EXECUTIVE DYSFUNCTION INTEGRATION
  // ===========================================

  async initializeExecutiveDysfunctionIntegration() {
    const integration = {
      name: 'executiveDysfunction',
      patternBuffer: [],
      interventionHistory: [],
      learningMetrics: {
        totalPatterns: 0,
        crisisInterventions: 0,
        averageEnergyImpact: 0,
        interventionSuccessRate: 0
      }
    };

    // Listen for executive dysfunction state changes
    if (window.useVelvetStore) {
      const unsubscribe = window.useVelvetStore.subscribe(
        (state) => state.executiveDysfunction,
        async (execState, previousExecState) => {
          // Handle crisis intervention triggers
          if (execState.activeIntervention && 
              execState.activeIntervention !== previousExecState.activeIntervention) {
            await this.handleExecutivePattern(execState);
          }

          // Handle energy level changes
          if (execState.energyLevel !== previousExecState.energyLevel) {
            await this.handleEnergyChange(execState.energyLevel, execState);
          }

          // Handle safe space activation
          if (execState.safeSpaceActive && !previousExecState.safeSpaceActive) {
            await this.handleSafeSpaceActivation(execState);
          }
        }
      );

      integration.unsubscribe = unsubscribe;
    }

    this.integrations.set('executiveDysfunction', integration);
    console.log('🔗 Executive Dysfunction database integration active');
  }

  async handleExecutivePattern(execState) {
    if (!this.isActive) return;

    try {
      const intervention = execState.activeIntervention;
      const patternId = `exec_${Date.now()}_${intervention.type}`;

      const result = await velvetDatabaseIntegration.storeExecutivePattern({
        patternId,
        patternType: intervention.triggerPattern || 'crisis',
        severityLevel: execState.currentCrisisLevel,
        contextData: {
          triggerApp: intervention.context?.currentApp,
          behaviorPattern: intervention.detectedBehavior,
          environmentFactors: {
            timeOfDay: new Date().getHours(),
            dayOfWeek: new Date().getDay(),
            stressFactors: intervention.context?.stressFactors || []
          }
        },
        detectionConfidence: intervention.confidence || 0.8,
        interventionUsed: {
          type: intervention.type,
          techniques: intervention.techniques || [],
          duration: intervention.estimatedDuration
        },
        energyLevelBefore: execState.energyLevel,
        timestamp: Date.now()
      });

      if (result.success) {
        const integration = this.integrations.get('executiveDysfunction');
        integration.learningMetrics.totalPatterns++;
        
        if (execState.currentCrisisLevel === 'crisis') {
          integration.learningMetrics.crisisInterventions++;
        }

        console.log('📊 Executive dysfunction pattern stored');
      }
    } catch (error) {
      console.error('❌ Failed to handle executive pattern:', error);
    }
  }

  async handleEnergyChange(energyLevel, execState) {
    if (!this.isActive) return;

    try {
      await velvetDatabaseIntegration.storeEnergyLevel({
        energyLevel,
        timeOfDay: new Date().toISOString(),
        currentActivity: execState.context?.currentActivity,
        environmentType: execState.context?.environmentType,
        stressFactors: execState.context?.stressFactors || [],
        physicalFactors: execState.context?.physicalFactors || [],
        emotionalFactors: execState.context?.emotionalFactors || [],
        timestamp: Date.now()
      });

      // Update learning metrics
      const integration = this.integrations.get('executiveDysfunction');
      const currentAvg = integration.learningMetrics.averageEnergyImpact;
      integration.learningMetrics.averageEnergyImpact = 
        (currentAvg + energyLevel) / 2; // Simple moving average

      console.log('📊 Energy level change tracked');
    } catch (error) {
      console.error('❌ Failed to handle energy change:', error);
    }
  }

  // ===========================================
  // MASKING FATIGUE INTEGRATION
  // ===========================================

  async initializeMaskingFatigueIntegration() {
    const integration = {
      name: 'maskingFatigue',
      activeSession: null,
      analysisBuffer: [],
      learningMetrics: {
        totalAnalyses: 0,
        safeSpaceDetections: 0,
        averageMaskingLevel: 0,
        energyWarnings: 0
      }
    };

    // Listen for masking fatigue state changes
    if (window.useVelvetStore) {
      const unsubscribe = window.useVelvetStore.subscribe(
        (state) => state.maskingFatigue,
        async (maskingState, previousMaskingState) => {
          // Handle masking level changes
          if (maskingState.currentMaskingLevel !== previousMaskingState.currentMaskingLevel) {
            await this.handleMaskingAnalysis(maskingState);
          }

          // Handle safe space detection
          if (maskingState.safeSpaceDetection.currentSafetyLevel > 0.8 &&
              previousMaskingState.safeSpaceDetection.currentSafetyLevel <= 0.8) {
            await this.handleSafeSpaceDetection(maskingState);
          }

          // Handle environment context changes
          if (maskingState.contextAwareness.currentEnvironment !== 
              previousMaskingState.contextAwareness.currentEnvironment) {
            await this.handleEnvironmentChange(maskingState);
          }
        }
      );

      integration.unsubscribe = unsubscribe;
    }

    this.integrations.set('maskingFatigue', integration);
    console.log('🔗 Masking Fatigue database integration active');
  }

  async handleMaskingAnalysis(maskingState) {
    if (!this.isActive) return;

    try {
      const sessionId = maskingState.currentSessionId || `masking_${Date.now()}`;

      const result = await velvetDatabaseIntegration.storeMaskingAnalysis({
        sessionId,
        analysisType: 'real_time_monitoring',
        maskingIndicators: {
          formalityLevel: maskingState.communicationPatterns.formalLanguage.currentLevel,
          emotionalSuppression: 1 - maskingState.communicationPatterns.emotionalExpression.currentLevel,
          energyTension: maskingState.communicationPatterns.energySignature.currentTension,
          responsePatterns: maskingState.communicationPatterns.responseLatency.recentTimes
        },
        authenticityScore: 1 - maskingState.currentMaskingLevel,
        energyImpact: maskingState.currentMaskingLevel * 0.1,
        safeSpaceDetected: maskingState.safeSpaceDetection.currentSafetyLevel > 0.8,
        interventionSuggested: maskingState.currentMaskingLevel > 0.7 ? {
          type: 'unmasking_opportunity',
          suggestions: ['Take an authentic break', 'Find your safe space', 'Practice self-compassion']
        } : null,
        timestamp: Date.now()
      });

      if (result.success) {
        const integration = this.integrations.get('maskingFatigue');
        integration.learningMetrics.totalAnalyses++;
        
        // Update average masking level
        const currentAvg = integration.learningMetrics.averageMaskingLevel;
        const total = integration.learningMetrics.totalAnalyses;
        integration.learningMetrics.averageMaskingLevel = 
          (currentAvg * (total - 1) + maskingState.currentMaskingLevel) / total;

        console.log('📊 Masking analysis stored with learning update');
      }
    } catch (error) {
      console.error('❌ Failed to handle masking analysis:', error);
    }
  }

  async handleSafeSpaceDetection(maskingState) {
    if (!this.isActive) return;

    try {
      const integration = this.integrations.get('maskingFatigue');
      integration.learningMetrics.safeSpaceDetections++;

      // Store as cross-feature insight
      await velvetDatabaseIntegration.storeCrossFeatureInsight({
        insightType: 'safe_space_detection',
        featuresInvolved: ['maskingFatigue'],
        pattern: 'safe_environment_identified',
        correlation: {
          environmentType: maskingState.contextAwareness.currentEnvironment,
          safetyLevel: maskingState.safeSpaceDetection.currentSafetyLevel,
          energyLevel: maskingState.energyLevel
        },
        recommendation: 'Encourage authentic expression in this environment',
        confidence: maskingState.safeSpaceDetection.currentSafetyLevel
      });

      console.log('📊 Safe space detection tracked');
    } catch (error) {
      console.error('❌ Failed to handle safe space detection:', error);
    }
  }

  // ===========================================
  // CROSS-FEATURE INTEGRATION
  // ===========================================

  async initializeCrossFeatureIntegration() {
    // Monitor for cross-feature correlations
    if (window.useVelvetStore) {
      const unsubscribe = window.useVelvetStore.subscribe(
        (state) => ({
          social: state.socialDecoder.isActive,
          executive: state.executiveDysfunction.isActive,
          masking: state.maskingFatigue.isActive,
          socialMeeting: state.socialDecoder.isMeetingMode,
          executiveCrisis: state.executiveDysfunction.currentCrisisLevel,
          maskingLevel: state.maskingFatigue.currentMaskingLevel
        }),
        async (current, previous) => {
          // Detect multi-feature interactions
          await this.analyzeFeatureInteractions(current, previous);
        }
      );

      this.integrations.set('crossFeature', { unsubscribe });
    }

    console.log('🔗 Cross-feature database integration active');
  }

  async analyzeFeatureInteractions(current, previous) {
    if (!this.isActive) return;

    try {
      // Social + Masking interaction
      if (current.socialMeeting && current.maskingLevel > 0.7) {
        await velvetDatabaseIntegration.storeCrossFeatureInsight({
          insightType: 'social_masking_correlation',
          featuresInvolved: ['socialDecoder', 'maskingFatigue'],
          pattern: 'high_masking_during_social_interaction',
          correlation: {
            socialContext: 'meeting',
            maskingLevel: current.maskingLevel,
            riskLevel: 'high'
          },
          recommendation: 'Monitor for burnout, suggest breaks',
          confidence: 0.8
        });
      }

      // Executive + Social interaction
      if (current.socialMeeting && current.executiveCrisis === 'crisis') {
        await velvetDatabaseIntegration.storeCrossFeatureInsight({
          insightType: 'executive_social_correlation',
          featuresInvolved: ['executiveDysfunction', 'socialDecoder'],
          pattern: 'crisis_during_social_interaction',
          correlation: {
            socialContext: 'meeting',
            crisisLevel: current.executiveCrisis,
            riskLevel: 'critical'
          },
          recommendation: 'Prioritize crisis intervention, consider meeting break',
          confidence: 0.9
        });
      }

      // Triple feature interaction (high complexity)
      if (current.socialMeeting && current.executiveCrisis !== 'none' && current.maskingLevel > 0.6) {
        await velvetDatabaseIntegration.storeCrossFeatureInsight({
          insightType: 'triple_feature_stress',
          featuresInvolved: ['socialDecoder', 'executiveDysfunction', 'maskingFatigue'],
          pattern: 'compound_neurodivergent_stress',
          correlation: {
            socialStress: true,
            executiveStress: current.executiveCrisis,
            maskingStress: current.maskingLevel,
            compoundRisk: 'very_high'
          },
          recommendation: 'Immediate support needed - activate all safety protocols',
          confidence: 0.95
        });
      }
    } catch (error) {
      console.error('❌ Failed to analyze feature interactions:', error);
    }
  }

  // ===========================================
  // ANALYTICS AND INSIGHTS
  // ===========================================

  /**
   * Get comprehensive learning analytics
   */
  async getLearningAnalytics() {
    if (!this.isActive) return null;

    try {
      const analytics = await velvetDatabaseIntegration.getDashboardAnalytics();
      
      if (analytics.success) {
        // Enhance with current integration metrics
        const integrationMetrics = {};
        
        for (const [name, integration] of this.integrations) {
          if (integration.learningMetrics) {
            integrationMetrics[name] = integration.learningMetrics;
          }
        }

        return {
          ...analytics.data,
          integrationMetrics,
          timestamp: Date.now()
        };
      }

      return null;
    } catch (error) {
      console.error('❌ Failed to get learning analytics:', error);
      return null;
    }
  }

  /**
   * Get feature-specific insights
   */
  async getFeatureInsights(featureName) {
    if (!this.isActive) return null;

    try {
      const insights = await velvetDatabaseIntegration.getLearningInsights();
      
      if (insights.success && featureName) {
        return insights.data[featureName] || null;
      }

      return insights.success ? insights.data : null;
    } catch (error) {
      console.error('❌ Failed to get feature insights:', error);
      return null;
    }
  }

  /**
   * Clean up integrations
   */
  cleanup() {
    for (const [name, integration] of this.integrations) {
      if (integration.unsubscribe) {
        integration.unsubscribe();
      }
    }
    
    this.integrations.clear();
    this.isActive = false;
    
    console.log('🔒 Database feature integrations cleaned up');
  }
}

// Export singleton instance
const velvetDatabaseFeatureIntegration = new VelvetDatabaseFeatureIntegration();

// Auto-initialize when available
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    const result = await velvetDatabaseFeatureIntegration.initialize();
    
    if (result.success) {
      console.log('🎯 All viral neurodivergent features connected to encrypted database');
    } else {
      console.warn('⚠️ Features running without database persistence');
    }
  });
}

// Global access
window.velvetDatabaseFeatureIntegration = velvetDatabaseFeatureIntegration;

export default velvetDatabaseFeatureIntegration;