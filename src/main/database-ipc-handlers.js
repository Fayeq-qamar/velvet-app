// Velvet Database IPC Handlers - Secure communication between main and renderer processes
// Provides safe database access for all neurodivergent features

const { ipcMain } = require('electron');
const VelvetDataAccessLayer = require('./data-access-layer');

/**
 * Database IPC Handler for secure renderer-to-main communication
 * Implements request validation and error handling
 */
class VelvetDatabaseIPCHandlers {
  constructor() {
    this.dataLayer = new VelvetDataAccessLayer();
    this.isReady = false;
    this.requestCount = 0;
    this.rateLimitWindow = new Map(); // Simple rate limiting
    
    console.log('🔌 Database IPC Handlers initialized');
  }

  /**
   * Initialize database and register IPC handlers
   */
  async initialize() {
    try {
      // Initialize data access layer
      const result = await this.dataLayer.initialize();
      this.isReady = result.success;

      if (this.isReady) {
        this.registerHandlers();
        console.log('✅ Database IPC Handlers ready');
      }

      return result;
    } catch (error) {
      console.error('❌ Database IPC initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Register all IPC handlers with validation
   */
  registerHandlers() {
    // ===========================================
    // SYSTEM OPERATIONS
    // ===========================================

    ipcMain.handle('db:health', async () => {
      return this.handleRequest('health', async () => {
        return this.dataLayer.getSystemHealth();
      });
    });

    ipcMain.handle('db:analytics', async (event, timeRange) => {
      return this.handleRequest('analytics', async () => {
        return await this.dataLayer.getDashboardAnalytics(timeRange);
      });
    });

    ipcMain.handle('db:learning-insights', async () => {
      return this.handleRequest('learning-insights', async () => {
        return await this.dataLayer.getLearningInsights();
      });
    });

    // ===========================================
    // SOCIAL DECODER OPERATIONS
    // ===========================================

    ipcMain.handle('db:social:start-session', async (event, sessionData) => {
      return this.handleRequest('social-start-session', async () => {
        this.validateSessionData(sessionData);
        return await this.dataLayer.startSocialDecoderSession(sessionData);
      });
    });

    ipcMain.handle('db:social:store-analysis', async (event, analysisData) => {
      return this.handleRequest('social-store-analysis', async () => {
        this.validateAnalysisData(analysisData);
        return await this.dataLayer.storeSocialAnalysis(analysisData);
      });
    });

    ipcMain.handle('db:social:get-insights', async (event, sessionId, limit) => {
      return this.handleRequest('social-get-insights', async () => {
        if (!sessionId || typeof sessionId !== 'string') {
          throw new Error('Invalid session ID');
        }
        return await this.dataLayer.getSocialDecoderInsights(sessionId, limit);
      });
    });

    ipcMain.handle('db:social:learning-effectiveness', async () => {
      return this.handleRequest('social-learning-effectiveness', async () => {
        return await this.dataLayer.getSocialLearningEffectiveness();
      });
    });

    // ===========================================
    // EXECUTIVE DYSFUNCTION OPERATIONS
    // ===========================================

    ipcMain.handle('db:executive:store-pattern', async (event, patternData) => {
      return this.handleRequest('executive-store-pattern', async () => {
        this.validatePatternData(patternData);
        return await this.dataLayer.storeExecutivePattern(patternData);
      });
    });

    ipcMain.handle('db:executive:store-intervention', async (event, interventionData) => {
      return this.handleRequest('executive-store-intervention', async () => {
        this.validateInterventionData(interventionData);
        return await this.dataLayer.storeExecutiveIntervention(interventionData);
      });
    });

    ipcMain.handle('db:executive:store-energy', async (event, energyData) => {
      return this.handleRequest('executive-store-energy', async () => {
        this.validateEnergyData(energyData);
        return await this.dataLayer.storeEnergyLevel(energyData);
      });
    });

    ipcMain.handle('db:executive:pattern-history', async (event, patternType, limit) => {
      return this.handleRequest('executive-pattern-history', async () => {
        return await this.dataLayer.getExecutivePatternHistory(patternType, limit);
      });
    });

    ipcMain.handle('db:executive:effective-interventions', async (event, interventionType) => {
      return this.handleRequest('executive-effective-interventions', async () => {
        return await this.dataLayer.getEffectiveInterventions(interventionType);
      });
    });

    // ===========================================
    // MASKING FATIGUE OPERATIONS
    // ===========================================

    ipcMain.handle('db:masking:start-session', async (event, sessionData) => {
      return this.handleRequest('masking-start-session', async () => {
        this.validateMaskingSessionData(sessionData);
        return await this.dataLayer.startMaskingSession(sessionData);
      });
    });

    ipcMain.handle('db:masking:store-analysis', async (event, analysisData) => {
      return this.handleRequest('masking-store-analysis', async () => {
        this.validateMaskingAnalysisData(analysisData);
        return await this.dataLayer.storeMaskingAnalysis(analysisData);
      });
    });

    ipcMain.handle('db:masking:update-pattern', async (event, patternData) => {
      return this.handleRequest('masking-update-pattern', async () => {
        this.validateMaskingPatternData(patternData);
        return await this.dataLayer.updateMaskingPattern(patternData);
      });
    });

    ipcMain.handle('db:masking:get-patterns', async (event, patternType) => {
      return this.handleRequest('masking-get-patterns', async () => {
        return await this.dataLayer.getMaskingPatterns(patternType);
      });
    });

    // ===========================================
    // CROSS-FEATURE OPERATIONS
    // ===========================================

    ipcMain.handle('db:cross:store-insight', async (event, insightData) => {
      return this.handleRequest('cross-store-insight', async () => {
        this.validateInsightData(insightData);
        return await this.dataLayer.storeCrossFeatureInsight(insightData);
      });
    });

    ipcMain.handle('db:cross:update-progress', async (event, progressData) => {
      return this.handleRequest('cross-update-progress', async () => {
        this.validateProgressData(progressData);
        return await this.dataLayer.updateLearningProgress(progressData);
      });
    });

    console.log('🎯 All database IPC handlers registered');
  }

  /**
   * Handle IPC request with validation, rate limiting, and error handling
   */
  async handleRequest(operation, handler) {
    try {
      // Check if database is ready
      if (!this.isReady) {
        return {
          success: false,
          error: 'Database not initialized',
          code: 'DB_NOT_READY'
        };
      }

      // Simple rate limiting (100 requests per minute per operation)
      const now = Date.now();
      const windowKey = `${operation}_${Math.floor(now / 60000)}`;
      const currentCount = this.rateLimitWindow.get(windowKey) || 0;
      
      if (currentCount > 100) {
        return {
          success: false,
          error: 'Rate limit exceeded',
          code: 'RATE_LIMITED'
        };
      }
      
      this.rateLimitWindow.set(windowKey, currentCount + 1);
      
      // Clean old windows
      this.cleanupRateLimit(now);

      // Execute request
      this.requestCount++;
      const startTime = performance.now();
      
      const result = await handler();
      
      const duration = performance.now() - startTime;
      
      // Log slow operations
      if (duration > 200) {
        console.warn(`⚠️ Slow database operation: ${operation} took ${Math.round(duration)}ms`);
      }

      return {
        success: true,
        data: result,
        meta: {
          operation,
          duration: Math.round(duration),
          requestId: this.requestCount
        }
      };

    } catch (error) {
      console.error(`❌ Database IPC error [${operation}]:`, error);
      
      return {
        success: false,
        error: error.message,
        code: 'DB_OPERATION_FAILED',
        meta: {
          operation,
          requestId: this.requestCount
        }
      };
    }
  }

  /**
   * Clean up old rate limit windows
   */
  cleanupRateLimit(now) {
    const currentWindow = Math.floor(now / 60000);
    
    for (const [key] of this.rateLimitWindow) {
      const keyWindow = parseInt(key.split('_').pop());
      if (keyWindow < currentWindow - 2) { // Keep last 2 minutes
        this.rateLimitWindow.delete(key);
      }
    }
  }

  // ===========================================
  // VALIDATION METHODS
  // ===========================================

  validateSessionData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Session data must be an object');
    }
    if (!data.sessionId || typeof data.sessionId !== 'string') {
      throw new Error('Session ID is required and must be a string');
    }
    if (!data.sessionType || typeof data.sessionType !== 'string') {
      throw new Error('Session type is required and must be a string');
    }
    if (!data.startTime || typeof data.startTime !== 'number') {
      throw new Error('Start time is required and must be a number');
    }
  }

  validateAnalysisData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Analysis data must be an object');
    }
    if (!data.sessionId || typeof data.sessionId !== 'string') {
      throw new Error('Session ID is required');
    }
    if (!data.analysisType || typeof data.analysisType !== 'string') {
      throw new Error('Analysis type is required');
    }
    if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) {
      throw new Error('Confidence must be a number between 0 and 1');
    }
  }

  validatePatternData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Pattern data must be an object');
    }
    if (!data.patternId || typeof data.patternId !== 'string') {
      throw new Error('Pattern ID is required');
    }
    if (!data.patternType || typeof data.patternType !== 'string') {
      throw new Error('Pattern type is required');
    }
    if (!data.severityLevel || typeof data.severityLevel !== 'string') {
      throw new Error('Severity level is required');
    }
    if (typeof data.detectionConfidence !== 'number' || data.detectionConfidence < 0 || data.detectionConfidence > 1) {
      throw new Error('Detection confidence must be a number between 0 and 1');
    }
  }

  validateInterventionData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Intervention data must be an object');
    }
    if (!data.interventionId || typeof data.interventionId !== 'string') {
      throw new Error('Intervention ID is required');
    }
    if (!data.interventionType || typeof data.interventionType !== 'string') {
      throw new Error('Intervention type is required');
    }
    if (!data.triggerPattern || typeof data.triggerPattern !== 'string') {
      throw new Error('Trigger pattern is required');
    }
    if (typeof data.effectivenessScore !== 'number' || data.effectivenessScore < 0 || data.effectivenessScore > 1) {
      throw new Error('Effectiveness score must be a number between 0 and 1');
    }
  }

  validateEnergyData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Energy data must be an object');
    }
    if (typeof data.energyLevel !== 'number' || data.energyLevel < 0 || data.energyLevel > 1) {
      throw new Error('Energy level must be a number between 0 and 1');
    }
  }

  validateMaskingSessionData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Masking session data must be an object');
    }
    if (!data.sessionId || typeof data.sessionId !== 'string') {
      throw new Error('Session ID is required');
    }
    if (!data.environmentType || typeof data.environmentType !== 'string') {
      throw new Error('Environment type is required');
    }
    if (!data.startTime || typeof data.startTime !== 'number') {
      throw new Error('Start time is required');
    }
  }

  validateMaskingAnalysisData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Masking analysis data must be an object');
    }
    if (!data.sessionId || typeof data.sessionId !== 'string') {
      throw new Error('Session ID is required');
    }
    if (!data.analysisType || typeof data.analysisType !== 'string') {
      throw new Error('Analysis type is required');
    }
    if (!data.maskingIndicators || typeof data.maskingIndicators !== 'object') {
      throw new Error('Masking indicators are required');
    }
  }

  validateMaskingPatternData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Pattern data must be an object');
    }
    if (!data.patternType || typeof data.patternType !== 'string') {
      throw new Error('Pattern type is required');
    }
    if (!data.baselineData || typeof data.baselineData !== 'object') {
      throw new Error('Baseline data is required');
    }
    if (!data.currentData || typeof data.currentData !== 'object') {
      throw new Error('Current data is required');
    }
    if (typeof data.deviationScore !== 'number') {
      throw new Error('Deviation score must be a number');
    }
  }

  validateInsightData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Insight data must be an object');
    }
    if (!data.insightType || typeof data.insightType !== 'string') {
      throw new Error('Insight type is required');
    }
    if (!Array.isArray(data.featuresInvolved) || data.featuresInvolved.length === 0) {
      throw new Error('Features involved must be a non-empty array');
    }
    if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) {
      throw new Error('Confidence must be a number between 0 and 1');
    }
  }

  validateProgressData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Progress data must be an object');
    }
    if (!data.featureName || typeof data.featureName !== 'string') {
      throw new Error('Feature name is required');
    }
    if (!data.metricName || typeof data.metricName !== 'string') {
      throw new Error('Metric name is required');
    }
    if (typeof data.currentValue !== 'number') {
      throw new Error('Current value must be a number');
    }
  }

  /**
   * Close database connection
   */
  async close() {
    try {
      // Remove all IPC handlers
      ipcMain.removeAllListeners();
      
      // Close data layer
      if (this.dataLayer) {
        await this.dataLayer.close();
      }
      
      console.log('🔒 Database IPC handlers closed');
      return { success: true };
    } catch (error) {
      console.error('❌ Error closing database IPC handlers:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = VelvetDatabaseIPCHandlers;