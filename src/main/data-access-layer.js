// Velvet Data Access Layer - Feature-specific database operations
// Optimized queries for real-time neurodivergent pattern learning

const VelvetDatabaseService = require('./database-service');
const VelvetDatabasePerformanceOptimizer = require('./database-performance-optimizer');

/**
 * Data Access Layer for Velvet's neurodivergent features
 * Provides high-level, feature-specific database operations
 */
class VelvetDataAccessLayer {
  constructor() {
    this.db = new VelvetDatabaseService();
    this.performanceOptimizer = null;
    this.isReady = false;
  }

  /**
   * Initialize the data access layer
   */
  async initialize() {
    try {
      const result = await this.db.initialize();
      this.isReady = result.success;
      
      if (this.isReady) {
        console.log('🎯 Velvet Data Access Layer ready');
        
        // Initialize performance optimizer
        this.performanceOptimizer = new VelvetDatabasePerformanceOptimizer(this);
        await this.performanceOptimizer.initialize();
        
        // Schedule automatic backup every 6 hours
        setInterval(() => {
          this.db.createBackup();
        }, 6 * 60 * 60 * 1000);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Data Access Layer initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  // ===========================================
  // SOCIAL DECODER DATA OPERATIONS
  // ===========================================

  /**
   * Start a new social decoder session
   */
  async startSocialDecoderSession(sessionData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    const query = `
      INSERT INTO social_decoder_sessions 
      (session_id, session_type, platform, start_time, participant_count, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      sessionData.sessionId,
      sessionData.sessionType,
      sessionData.platform || null,
      sessionData.startTime,
      sessionData.participantCount || 1,
      Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Store social decoder analysis
   */
  async storeSocialAnalysis(analysisData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt sensitive text data
    const encryptedText = this.db.encrypt(analysisData.originalText || '');
    const encryptedResult = this.db.encrypt(JSON.stringify(analysisData.analysisResult));

    const query = `
      INSERT INTO social_decoder_analyses 
      (session_id, analysis_type, confidence, original_text, analysis_result, 
       intervention_triggered, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      analysisData.sessionId,
      analysisData.analysisType,
      analysisData.confidence,
      JSON.stringify(encryptedText),
      JSON.stringify(encryptedResult),
      analysisData.interventionTriggered ? 1 : 0,
      analysisData.timestamp || Date.now()
    ];

    const result = this.db.executeQuery(query, params);

    // Update learning patterns if successful
    if (result.success) {
      await this.updateSocialLearningPattern(analysisData);
    }

    return result;
  }

  /**
   * Update social learning patterns
   */
  async updateSocialLearningPattern(analysisData) {
    const patternType = `${analysisData.analysisType}_${Math.floor(analysisData.confidence * 10)}`;
    
    // Encrypt pattern data
    const encryptedPattern = this.db.encrypt(JSON.stringify({
      analysisType: analysisData.analysisType,
      confidence: analysisData.confidence,
      context: analysisData.context || {},
      outcome: analysisData.outcome || 'pending'
    }));

    const query = `
      INSERT INTO social_decoder_learning 
      (pattern_type, pattern_data, success_rate, last_used, created_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(pattern_type) DO UPDATE SET
        usage_count = usage_count + 1,
        success_rate = (success_rate * usage_count + ?) / (usage_count + 1),
        last_used = ?
    `;

    const initialSuccessRate = analysisData.confidence;
    const params = [
      patternType,
      JSON.stringify(encryptedPattern),
      initialSuccessRate,
      Date.now(),
      Date.now(),
      initialSuccessRate,
      Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Get social decoder insights for current session
   */
  async getSocialDecoderInsights(sessionId, limit = 10) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    const query = `
      SELECT analysis_type, confidence, analysis_result, timestamp
      FROM social_decoder_analyses 
      WHERE session_id = ?
      ORDER BY timestamp DESC
      LIMIT ?
    `;

    const result = this.db.executeQuery(query, [sessionId, limit]);

    if (result.success) {
      // Decrypt analysis results
      result.data = result.data.map(row => ({
        ...row,
        analysis_result: this.db.decrypt(JSON.parse(row.analysis_result))
      }));
    }

    return result;
  }

  /**
   * Get social learning effectiveness
   */
  async getSocialLearningEffectiveness() {
    const query = `
      SELECT pattern_type, success_rate, usage_count, last_used
      FROM social_decoder_learning
      WHERE usage_count > 5
      ORDER BY success_rate DESC, usage_count DESC
      LIMIT 20
    `;

    return this.db.executeQuery(query);
  }

  // ===========================================
  // EXECUTIVE DYSFUNCTION DATA OPERATIONS
  // ===========================================

  /**
   * Store executive dysfunction pattern detection
   */
  async storeExecutivePattern(patternData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt context data
    const encryptedContext = this.db.encrypt(JSON.stringify(patternData.contextData));
    const encryptedIntervention = patternData.interventionUsed ? 
      this.db.encrypt(JSON.stringify(patternData.interventionUsed)) : null;

    const query = `
      INSERT INTO executive_dysfunction_patterns 
      (pattern_id, pattern_type, severity_level, context_data, detection_confidence,
       intervention_used, intervention_success, energy_level_before, energy_level_after, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      patternData.patternId,
      patternData.patternType,
      patternData.severityLevel,
      JSON.stringify(encryptedContext),
      patternData.detectionConfidence,
      encryptedIntervention ? JSON.stringify(encryptedIntervention) : null,
      patternData.interventionSuccess ? 1 : 0,
      patternData.energyLevelBefore || null,
      patternData.energyLevelAfter || null,
      patternData.timestamp || Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Store executive dysfunction intervention
   */
  async storeExecutiveIntervention(interventionData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt personalization data
    const encryptedPersonalization = this.db.encrypt(JSON.stringify(interventionData.personalizationData || {}));

    const query = `
      INSERT INTO executive_dysfunction_interventions 
      (intervention_id, intervention_type, trigger_pattern, effectiveness_score,
       personalization_data, last_used, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(intervention_id) DO UPDATE SET
        usage_count = usage_count + 1,
        effectiveness_score = (effectiveness_score * usage_count + ?) / (usage_count + 1),
        last_used = ?
    `;

    const params = [
      interventionData.interventionId,
      interventionData.interventionType,
      interventionData.triggerPattern,
      interventionData.effectivenessScore,
      JSON.stringify(encryptedPersonalization),
      Date.now(),
      Date.now(),
      interventionData.effectivenessScore,
      Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Store energy level tracking
   */
  async storeEnergyLevel(energyData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt context and factors
    const encryptedContext = this.db.encrypt(JSON.stringify(energyData.context || {}));
    const encryptedFactors = this.db.encrypt(JSON.stringify(energyData.factors || {}));
    const encryptedSuggestions = this.db.encrypt(JSON.stringify(energyData.recoverySuggestions || []));

    const query = `
      INSERT INTO executive_dysfunction_energy 
      (energy_level, context, factors, recovery_suggestions, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      energyData.energyLevel,
      JSON.stringify(encryptedContext),
      JSON.stringify(encryptedFactors),
      JSON.stringify(encryptedSuggestions),
      energyData.timestamp || Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Get executive dysfunction pattern history
   */
  async getExecutivePatternHistory(patternType = null, limit = 50) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    let query = `
      SELECT pattern_type, severity_level, detection_confidence, intervention_success,
             energy_level_before, energy_level_after, timestamp
      FROM executive_dysfunction_patterns
    `;
    
    const params = [];
    
    if (patternType) {
      query += ' WHERE pattern_type = ?';
      params.push(patternType);
    }
    
    query += ' ORDER BY timestamp DESC LIMIT ?';
    params.push(limit);

    return this.db.executeQuery(query, params);
  }

  /**
   * Get most effective interventions
   */
  async getEffectiveInterventions(interventionType = null) {
    let query = `
      SELECT intervention_type, trigger_pattern, effectiveness_score, usage_count, last_used
      FROM executive_dysfunction_interventions
      WHERE usage_count > 2
    `;
    
    const params = [];
    
    if (interventionType) {
      query += ' AND intervention_type = ?';
      params.push(interventionType);
    }
    
    query += ' ORDER BY effectiveness_score DESC, usage_count DESC LIMIT 10';

    return this.db.executeQuery(query, params);
  }

  // ===========================================
  // MASKING FATIGUE DATA OPERATIONS
  // ===========================================

  /**
   * Start masking fatigue session
   */
  async startMaskingSession(sessionData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt context data
    const encryptedContext = this.db.encrypt(JSON.stringify(sessionData.contextData || {}));

    const query = `
      INSERT INTO masking_fatigue_sessions 
      (session_id, environment_type, start_time, initial_masking_level, context_data, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const params = [
      sessionData.sessionId,
      sessionData.environmentType,
      sessionData.startTime,
      sessionData.initialMaskingLevel,
      JSON.stringify(encryptedContext),
      Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Store masking fatigue analysis
   */
  async storeMaskingAnalysis(analysisData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt sensitive data
    const encryptedIndicators = this.db.encrypt(JSON.stringify(analysisData.maskingIndicators));
    const encryptedIntervention = analysisData.interventionSuggested ? 
      this.db.encrypt(JSON.stringify(analysisData.interventionSuggested)) : null;

    const query = `
      INSERT INTO masking_fatigue_analyses 
      (session_id, analysis_type, masking_indicators, authenticity_score, energy_impact,
       safe_space_detected, intervention_suggested, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      analysisData.sessionId,
      analysisData.analysisType,
      JSON.stringify(encryptedIndicators),
      analysisData.authenticityScore,
      analysisData.energyImpact,
      analysisData.safeSpaceDetected ? 1 : 0,
      encryptedIntervention ? JSON.stringify(encryptedIntervention) : null,
      analysisData.timestamp || Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Update masking patterns and baselines
   */
  async updateMaskingPattern(patternData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt pattern data
    const encryptedBaseline = this.db.encrypt(JSON.stringify(patternData.baselineData));
    const encryptedCurrent = this.db.encrypt(JSON.stringify(patternData.currentData));
    const encryptedSuggestions = this.db.encrypt(JSON.stringify(patternData.adaptationSuggestions || []));
    const encryptedHistory = this.db.encrypt(JSON.stringify(patternData.effectivenessHistory || []));

    const query = `
      INSERT INTO masking_fatigue_patterns 
      (pattern_type, baseline_data, current_data, deviation_score, adaptation_suggestions,
       effectiveness_history, last_updated, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(pattern_type) DO UPDATE SET
        current_data = ?,
        deviation_score = ?,
        adaptation_suggestions = ?,
        effectiveness_history = ?,
        last_updated = ?
    `;

    const timestamp = Date.now();
    const params = [
      patternData.patternType,
      JSON.stringify(encryptedBaseline),
      JSON.stringify(encryptedCurrent),
      patternData.deviationScore,
      JSON.stringify(encryptedSuggestions),
      JSON.stringify(encryptedHistory),
      timestamp,
      timestamp,
      // ON CONFLICT UPDATE values
      JSON.stringify(encryptedCurrent),
      patternData.deviationScore,
      JSON.stringify(encryptedSuggestions),
      JSON.stringify(encryptedHistory),
      timestamp
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Get masking patterns for adaptation
   */
  async getMaskingPatterns(patternType = null) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    let query = `
      SELECT pattern_type, baseline_data, current_data, deviation_score, last_updated
      FROM masking_fatigue_patterns
    `;
    
    const params = [];
    
    if (patternType) {
      query += ' WHERE pattern_type = ?';
      params.push(patternType);
    }
    
    query += ' ORDER BY last_updated DESC';

    const result = this.db.executeQuery(query, params);

    if (result.success) {
      // Decrypt pattern data
      result.data = result.data.map(row => ({
        ...row,
        baseline_data: this.db.decrypt(JSON.parse(row.baseline_data)),
        current_data: this.db.decrypt(JSON.parse(row.current_data))
      }));
    }

    return result;
  }

  // ===========================================
  // CROSS-FEATURE LEARNING OPERATIONS
  // ===========================================

  /**
   * Store cross-feature insight
   */
  async storeCrossFeatureInsight(insightData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt insight data
    const encryptedInsight = this.db.encrypt(JSON.stringify(insightData.insightData));

    const query = `
      INSERT INTO cross_feature_insights 
      (insight_type, features_involved, insight_data, confidence, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      insightData.insightType,
      JSON.stringify(insightData.featuresInvolved),
      JSON.stringify(encryptedInsight),
      insightData.confidence,
      Date.now()
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Update user learning progress
   */
  async updateLearningProgress(progressData) {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    // Encrypt milestone data
    const encryptedMilestone = this.db.encrypt(JSON.stringify(progressData.milestoneData || {}));

    const query = `
      INSERT INTO user_learning_progress 
      (feature_name, metric_name, baseline_value, current_value, improvement_rate,
       milestone_data, last_updated, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(feature_name, metric_name) DO UPDATE SET
        current_value = ?,
        improvement_rate = ?,
        milestone_data = ?,
        last_updated = ?
    `;

    const timestamp = Date.now();
    const params = [
      progressData.featureName,
      progressData.metricName,
      progressData.baselineValue,
      progressData.currentValue,
      progressData.improvementRate,
      JSON.stringify(encryptedMilestone),
      timestamp,
      timestamp,
      // ON CONFLICT UPDATE values
      progressData.currentValue,
      progressData.improvementRate,
      JSON.stringify(encryptedMilestone),
      timestamp
    ];

    return this.db.executeQuery(query, params);
  }

  /**
   * Get comprehensive learning insights
   */
  async getLearningInsights() {
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    const queries = {
      socialEffectiveness: `
        SELECT AVG(success_rate) as avg_success_rate, COUNT(*) as pattern_count
        FROM social_decoder_learning
        WHERE usage_count > 3
      `,
      executiveImprovement: `
        SELECT pattern_type, AVG(CASE WHEN intervention_success = 1 THEN 1.0 ELSE 0.0 END) as success_rate
        FROM executive_dysfunction_patterns
        WHERE intervention_used IS NOT NULL
        GROUP BY pattern_type
      `,
      maskingAdaptation: `
        SELECT pattern_type, AVG(deviation_score) as avg_deviation
        FROM masking_fatigue_patterns
        GROUP BY pattern_type
      `,
      overallProgress: `
        SELECT feature_name, AVG(improvement_rate) as avg_improvement
        FROM user_learning_progress
        GROUP BY feature_name
      `
    };

    const results = {};
    
    for (const [key, query] of Object.entries(queries)) {
      const result = this.db.executeQuery(query);
      results[key] = result.success ? result.data : [];
    }

    return { success: true, data: results };
  }

  // ===========================================
  // ANALYTICS AND REPORTING
  // ===========================================

  /**
   * Get user dashboard analytics
   */
  async getDashboardAnalytics(timeRange = 7 * 24 * 60 * 60 * 1000) { // 7 days default
    if (!this.isReady) return { success: false, error: 'Database not ready' };

    const cutoffTime = Date.now() - timeRange;

    const analytics = {
      socialDecoder: await this.getSocialDecoderAnalytics(cutoffTime),
      executiveDysfunction: await this.getExecutiveAnalytics(cutoffTime),
      maskingFatigue: await this.getMaskingAnalytics(cutoffTime),
      crossFeatureInsights: await this.getCrossFeatureAnalytics(cutoffTime)
    };

    return { success: true, data: analytics };
  }

  async getSocialDecoderAnalytics(cutoffTime) {
    const queries = {
      totalSessions: `SELECT COUNT(*) as count FROM social_decoder_sessions WHERE start_time > ?`,
      totalAnalyses: `SELECT COUNT(*) as count FROM social_decoder_analyses WHERE timestamp > ?`,
      avgConfidence: `SELECT AVG(confidence) as avg FROM social_decoder_analyses WHERE timestamp > ?`,
      interventionRate: `SELECT AVG(CASE WHEN intervention_triggered = 1 THEN 1.0 ELSE 0.0 END) as rate 
                        FROM social_decoder_analyses WHERE timestamp > ?`
    };

    const results = {};
    for (const [key, query] of Object.entries(queries)) {
      const result = this.db.executeQuery(query, [cutoffTime]);
      results[key] = result.success ? (result.data[0] || {}) : {};
    }

    return results;
  }

  async getExecutiveAnalytics(cutoffTime) {
    const queries = {
      totalPatterns: `SELECT COUNT(*) as count FROM executive_dysfunction_patterns WHERE timestamp > ?`,
      patternTypes: `SELECT pattern_type, COUNT(*) as count FROM executive_dysfunction_patterns 
                     WHERE timestamp > ? GROUP BY pattern_type`,
      avgEnergyImpact: `SELECT AVG(energy_level_before - energy_level_after) as impact 
                        FROM executive_dysfunction_patterns 
                        WHERE timestamp > ? AND energy_level_before IS NOT NULL AND energy_level_after IS NOT NULL`,
      interventionSuccess: `SELECT AVG(CASE WHEN intervention_success = 1 THEN 1.0 ELSE 0.0 END) as rate 
                           FROM executive_dysfunction_patterns WHERE timestamp > ?`
    };

    const results = {};
    for (const [key, query] of Object.entries(queries)) {
      const result = this.db.executeQuery(query, [cutoffTime]);
      results[key] = result.success ? (key === 'patternTypes' ? result.data : result.data[0] || {}) : {};
    }

    return results;
  }

  async getMaskingAnalytics(cutoffTime) {
    const queries = {
      totalSessions: `SELECT COUNT(*) as count FROM masking_fatigue_sessions WHERE start_time > ?`,
      avgMaskingLevel: `SELECT AVG(peak_masking_level) as avg FROM masking_fatigue_sessions WHERE start_time > ?`,
      safeSpaceDetections: `SELECT COUNT(*) as count FROM masking_fatigue_analyses 
                           WHERE timestamp > ? AND safe_space_detected = 1`,
      energyImpact: `SELECT AVG(energy_spent) as avg FROM masking_fatigue_sessions WHERE start_time > ?`
    };

    const results = {};
    for (const [key, query] of Object.entries(queries)) {
      const result = this.db.executeQuery(query, [cutoffTime]);
      results[key] = result.success ? (result.data[0] || {}) : {};
    }

    return results;
  }

  async getCrossFeatureAnalytics(cutoffTime) {
    const query = `
      SELECT insight_type, COUNT(*) as count, AVG(confidence) as avg_confidence
      FROM cross_feature_insights
      WHERE created_at > ?
      GROUP BY insight_type
    `;

    const result = this.db.executeQuery(query, [cutoffTime]);
    return result.success ? result.data : [];
  }

  /**
   * Get system health and performance
   */
  getSystemHealth() {
    const dbHealth = this.db.getHealthStatus();
    
    // Add performance optimizer metrics if available
    if (this.performanceOptimizer) {
      const performanceReport = this.performanceOptimizer.getPerformanceReport();
      
      return {
        ...dbHealth,
        performance: {
          ...dbHealth.performance,
          optimizerReport: performanceReport,
          overallScore: performanceReport.overall.performanceScore,
          responseTimeTarget: performanceReport.overall.targetResponseTime,
          optimizationsApplied: performanceReport.queries.optimizationsApplied
        }
      };
    }
    
    return dbHealth;
  }

  /**
   * Close database connection
   */
  async close() {
    try {
      // Clean up performance optimizer
      if (this.performanceOptimizer) {
        this.performanceOptimizer.cleanup();
        this.performanceOptimizer = null;
      }
      
      // Close database
      if (this.db) {
        return await this.db.close();
      }
      
      return { success: true };
    } catch (error) {
      console.error('❌ Error closing data access layer:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = VelvetDataAccessLayer;