// Velvet Database Integration - Zustand state persistence
// Connects Zustand state management with encrypted database storage

/**
 * Database integration layer for Velvet's Zustand state management
 * Provides seamless persistence for all neurodivergent features
 */
class VelvetDatabaseIntegration {
  constructor() {
    this.isInitialized = false;
    this.lastSyncTime = 0;
    this.syncInProgress = false;
    this.syncQueue = [];
    this.batchTimeout = null;
    
    // Performance tracking
    this.stats = {
      totalSyncs: 0,
      averageSyncTime: 0,
      lastSyncDuration: 0,
      failedSyncs: 0
    };
    
    console.log('🔗 Database integration layer initialized');
  }

  /**
   * Initialize database integration with health check
   */
  async initialize() {
    try {
      console.log('🔗 Initializing database integration...');
      
      // Check if main process database is available
      const health = await window.electronAPI.invoke('db:health');
      
      if (health.success && health.isInitialized) {
        this.isInitialized = true;
        console.log('✅ Database integration ready');
        
        // Start periodic health monitoring
        this.startHealthMonitoring();
        
        return { success: true };
      } else {
        console.warn('⚠️ Database not available, running in memory-only mode');
        return { success: false, error: 'Database not available' };
      }
    } catch (error) {
      console.error('❌ Database integration initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Start periodic health monitoring
   */
  startHealthMonitoring() {
    setInterval(async () => {
      try {
        const health = await window.electronAPI.invoke('db:health');
        if (!health.success || !health.isInitialized) {
          console.warn('⚠️ Database health check failed, switching to memory-only mode');
          this.isInitialized = false;
        }
      } catch (error) {
        console.warn('⚠️ Database health check error:', error);
        this.isInitialized = false;
      }
    }, 60000); // Check every minute
  }

  // ===========================================
  // SOCIAL DECODER PERSISTENCE
  // ===========================================

  /**
   * Start social decoder session with persistence
   */
  async startSocialDecoderSession(sessionData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:social:start-session', {
        sessionId: sessionData.sessionId || `social_${Date.now()}`,
        sessionType: sessionData.sessionType || 'conversation',
        platform: sessionData.platform,
        startTime: sessionData.startTime || Date.now(),
        participantCount: sessionData.participantCount || 1
      });
    } catch (error) {
      console.error('❌ Failed to start social decoder session:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store social decoder analysis with learning
   */
  async storeSocialAnalysis(analysisData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const analysisEntry = {
      sessionId: analysisData.sessionId,
      analysisType: analysisData.analysisType, // sarcasm, emotion, subtext
      confidence: analysisData.confidence,
      originalText: analysisData.originalText,
      analysisResult: {
        detectedPattern: analysisData.detectedPattern,
        explanation: analysisData.explanation,
        interventionSuggested: analysisData.interventionSuggested,
        neurotypicalTranslation: analysisData.neurotypicalTranslation
      },
      interventionTriggered: analysisData.interventionTriggered || false,
      context: analysisData.context || {},
      timestamp: analysisData.timestamp || Date.now()
    };

    try {
      const result = await window.electronAPI.invoke('db:social:store-analysis', analysisEntry);
      
      if (result.success) {
        this.updateStats(result.meta?.duration);
        console.log('📊 Social analysis stored successfully');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Failed to store social analysis:', error);
      this.stats.failedSyncs++;
      return { success: false, error: error.message };
    }
  }

  /**
   * Get social decoder insights for current session
   */
  async getSocialDecoderInsights(sessionId, limit = 10) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:social:get-insights', sessionId, limit);
    } catch (error) {
      console.error('❌ Failed to get social insights:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get social learning effectiveness
   */
  async getSocialLearningEffectiveness() {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:social:learning-effectiveness');
    } catch (error) {
      console.error('❌ Failed to get social learning effectiveness:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // EXECUTIVE DYSFUNCTION PERSISTENCE
  // ===========================================

  /**
   * Store executive dysfunction pattern
   */
  async storeExecutivePattern(patternData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const patternEntry = {
      patternId: patternData.patternId || `exec_${Date.now()}`,
      patternType: patternData.patternType, // crisis, avoidance, hyperfocus, distraction
      severityLevel: patternData.severityLevel, // gentle, supportive, crisis
      contextData: {
        triggerApp: patternData.triggerApp,
        behaviorPattern: patternData.behaviorPattern,
        environmentFactors: patternData.environmentFactors,
        timeContext: patternData.timeContext
      },
      detectionConfidence: patternData.detectionConfidence,
      interventionUsed: patternData.interventionUsed,
      interventionSuccess: patternData.interventionSuccess,
      energyLevelBefore: patternData.energyLevelBefore,
      energyLevelAfter: patternData.energyLevelAfter,
      timestamp: patternData.timestamp || Date.now()
    };

    try {
      const result = await window.electronAPI.invoke('db:executive:store-pattern', patternEntry);
      
      if (result.success) {
        this.updateStats(result.meta?.duration);
        console.log('📊 Executive pattern stored successfully');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Failed to store executive pattern:', error);
      this.stats.failedSyncs++;
      return { success: false, error: error.message };
    }
  }

  /**
   * Store executive dysfunction intervention
   */
  async storeExecutiveIntervention(interventionData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const interventionEntry = {
      interventionId: interventionData.interventionId || `intervention_${Date.now()}`,
      interventionType: interventionData.interventionType, // safe_space, micro_task, breathing, celebration
      triggerPattern: interventionData.triggerPattern,
      effectivenessScore: interventionData.effectivenessScore,
      personalizationData: {
        userPreferences: interventionData.userPreferences,
        contextualAdaptations: interventionData.contextualAdaptations,
        successFactors: interventionData.successFactors
      }
    };

    try {
      const result = await window.electronAPI.invoke('db:executive:store-intervention', interventionEntry);
      
      if (result.success) {
        this.updateStats(result.meta?.duration);
        console.log('📊 Executive intervention stored successfully');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Failed to store executive intervention:', error);
      this.stats.failedSyncs++;
      return { success: false, error: error.message };
    }
  }

  /**
   * Store energy level tracking
   */
  async storeEnergyLevel(energyData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const energyEntry = {
      energyLevel: energyData.energyLevel,
      context: {
        timeOfDay: energyData.timeOfDay,
        currentActivity: energyData.currentActivity,
        environmentType: energyData.environmentType,
        stressFactors: energyData.stressFactors
      },
      factors: {
        physicalFactors: energyData.physicalFactors || [],
        emotionalFactors: energyData.emotionalFactors || [],
        environmentalFactors: energyData.environmentalFactors || []
      },
      recoverySuggestions: energyData.recoverySuggestions || [],
      timestamp: energyData.timestamp || Date.now()
    };

    try {
      return await window.electronAPI.invoke('db:executive:store-energy', energyEntry);
    } catch (error) {
      console.error('❌ Failed to store energy level:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get effective interventions
   */
  async getEffectiveInterventions(interventionType = null) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:executive:effective-interventions', interventionType);
    } catch (error) {
      console.error('❌ Failed to get effective interventions:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // MASKING FATIGUE PERSISTENCE
  // ===========================================

  /**
   * Start masking fatigue session
   */
  async startMaskingSession(sessionData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:masking:start-session', {
        sessionId: sessionData.sessionId || `masking_${Date.now()}`,
        environmentType: sessionData.environmentType, // work, social, home, public
        startTime: sessionData.startTime || Date.now(),
        initialMaskingLevel: sessionData.initialMaskingLevel,
        contextData: {
          socialContext: sessionData.socialContext,
          workContext: sessionData.workContext,
          emotionalState: sessionData.emotionalState,
          energyLevel: sessionData.energyLevel
        }
      });
    } catch (error) {
      console.error('❌ Failed to start masking session:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Store masking fatigue analysis
   */
  async storeMaskingAnalysis(analysisData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const analysisEntry = {
      sessionId: analysisData.sessionId,
      analysisType: analysisData.analysisType, // communication, energy, authenticity
      maskingIndicators: {
        formalityLevel: analysisData.maskingIndicators.formalityLevel,
        emotionalSuppression: analysisData.maskingIndicators.emotionalSuppression,
        energyTension: analysisData.maskingIndicators.energyTension,
        responsePatterns: analysisData.maskingIndicators.responsePatterns
      },
      authenticityScore: analysisData.authenticityScore,
      energyImpact: analysisData.energyImpact,
      safeSpaceDetected: analysisData.safeSpaceDetected || false,
      interventionSuggested: analysisData.interventionSuggested,
      timestamp: analysisData.timestamp || Date.now()
    };

    try {
      const result = await window.electronAPI.invoke('db:masking:store-analysis', analysisEntry);
      
      if (result.success) {
        this.updateStats(result.meta?.duration);
        console.log('📊 Masking analysis stored successfully');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Failed to store masking analysis:', error);
      this.stats.failedSyncs++;
      return { success: false, error: error.message };
    }
  }

  /**
   * Update masking patterns and baselines
   */
  async updateMaskingPattern(patternData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const patternEntry = {
      patternType: patternData.patternType, // communication_shift, energy_depletion, safe_space
      baselineData: patternData.baselineData,
      currentData: patternData.currentData,
      deviationScore: patternData.deviationScore,
      adaptationSuggestions: patternData.adaptationSuggestions || [],
      effectivenessHistory: patternData.effectivenessHistory || []
    };

    try {
      return await window.electronAPI.invoke('db:masking:update-pattern', patternEntry);
    } catch (error) {
      console.error('❌ Failed to update masking pattern:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get masking patterns for adaptation
   */
  async getMaskingPatterns(patternType = null) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:masking:get-patterns', patternType);
    } catch (error) {
      console.error('❌ Failed to get masking patterns:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // CROSS-FEATURE LEARNING
  // ===========================================

  /**
   * Store cross-feature insight
   */
  async storeCrossFeatureInsight(insightData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const insightEntry = {
      insightType: insightData.insightType, // correlation, prediction, adaptation
      featuresInvolved: insightData.featuresInvolved, // array of feature names
      insightData: {
        pattern: insightData.pattern,
        correlation: insightData.correlation,
        prediction: insightData.prediction,
        recommendation: insightData.recommendation
      },
      confidence: insightData.confidence
    };

    try {
      return await window.electronAPI.invoke('db:cross:store-insight', insightEntry);
    } catch (error) {
      console.error('❌ Failed to store cross-feature insight:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Update learning progress
   */
  async updateLearningProgress(progressData) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    const progressEntry = {
      featureName: progressData.featureName,
      metricName: progressData.metricName,
      baselineValue: progressData.baselineValue,
      currentValue: progressData.currentValue,
      improvementRate: progressData.improvementRate,
      milestoneData: {
        milestones: progressData.milestones || [],
        breakthroughs: progressData.breakthroughs || [],
        challenges: progressData.challenges || []
      }
    };

    try {
      return await window.electronAPI.invoke('db:cross:update-progress', progressEntry);
    } catch (error) {
      console.error('❌ Failed to update learning progress:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // ANALYTICS AND INSIGHTS
  // ===========================================

  /**
   * Get comprehensive dashboard analytics
   */
  async getDashboardAnalytics(timeRange = 7 * 24 * 60 * 60 * 1000) { // 7 days default
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:analytics', timeRange);
    } catch (error) {
      console.error('❌ Failed to get dashboard analytics:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get learning insights across all features
   */
  async getLearningInsights() {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      return await window.electronAPI.invoke('db:learning-insights');
    } catch (error) {
      console.error('❌ Failed to get learning insights:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get database health status
   */
  async getHealthStatus() {
    try {
      return await window.electronAPI.invoke('db:health');
    } catch (error) {
      console.error('❌ Failed to get database health:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // UTILITY METHODS
  // ===========================================

  /**
   * Update performance statistics
   */
  updateStats(duration) {
    this.stats.totalSyncs++;
    this.stats.lastSyncDuration = duration || 0;
    
    if (duration) {
      const currentAvg = this.stats.averageSyncTime;
      this.stats.averageSyncTime = 
        (currentAvg * (this.stats.totalSyncs - 1) + duration) / this.stats.totalSyncs;
    }
    
    this.lastSyncTime = Date.now();
  }

  /**
   * Get integration statistics
   */
  getStats() {
    return {
      ...this.stats,
      isInitialized: this.isInitialized,
      lastSyncTime: this.lastSyncTime,
      syncInProgress: this.syncInProgress,
      queueLength: this.syncQueue.length
    };
  }

  /**
   * Batch multiple operations for efficiency
   */
  async batchOperations(operations) {
    if (!this.isInitialized) return { success: false, error: 'Database not available' };

    try {
      const results = await Promise.allSettled(operations);
      
      const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
      const failed = results.filter(r => r.status === 'rejected' || !r.value.success);
      
      return {
        success: failed.length === 0,
        results: {
          successful: successful.length,
          failed: failed.length,
          details: results
        }
      };
    } catch (error) {
      console.error('❌ Batch operations failed:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const velvetDatabaseIntegration = new VelvetDatabaseIntegration();

// Auto-initialize when available
if (window.electronAPI) {
  velvetDatabaseIntegration.initialize().then(result => {
    if (result.success) {
      console.log('🎯 Velvet database integration ready for all neurodivergent features');
    } else {
      console.warn('⚠️ Running in memory-only mode - database features disabled');
    }
  });
}

// Global access
window.velvetDB = velvetDatabaseIntegration;

export default velvetDatabaseIntegration;