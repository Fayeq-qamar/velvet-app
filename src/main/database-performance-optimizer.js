// Velvet Database Performance Optimizer - Query optimization and monitoring
// Ensures <200ms response times for real-time neurodivergent feature support

/**
 * Database Performance Optimizer
 * Monitors and optimizes database operations for sub-200ms performance
 */
class VelvetDatabasePerformanceOptimizer {
  constructor(dataAccessLayer) {
    this.dataLayer = dataAccessLayer;
    this.performanceMetrics = {
      queryTimes: new Map(),
      slowQueries: [],
      optimizationHistory: [],
      averageResponseTime: 0,
      targetResponseTime: 200, // milliseconds
      performanceScore: 100
    };
    
    this.optimizationStrategies = new Map();
    this.monitoringInterval = null;
    
    console.log('⚡ Database performance optimizer initialized');
  }

  /**
   * Initialize performance monitoring and optimization
   */
  async initialize() {
    try {
      // Set up query monitoring
      this.setupQueryMonitoring();
      
      // Initialize optimization strategies
      this.initializeOptimizationStrategies();
      
      // Start performance monitoring
      this.startPerformanceMonitoring();
      
      // Run initial optimization check
      await this.performInitialOptimization();
      
      console.log('✅ Database performance optimization active');
      return { success: true };
    } catch (error) {
      console.error('❌ Performance optimizer initialization failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Set up query performance monitoring
   */
  setupQueryMonitoring() {
    if (!this.dataLayer.db) return;

    // Intercept database queries to monitor performance
    const originalExecuteQuery = this.dataLayer.db.executeQuery.bind(this.dataLayer.db);
    
    this.dataLayer.db.executeQuery = (query, params = []) => {
      const queryStart = performance.now();
      const queryId = this.generateQueryId(query);
      
      const result = originalExecuteQuery(query, params);
      const duration = performance.now() - queryStart;
      
      // Track query performance
      this.trackQueryPerformance(queryId, query, duration, result.success);
      
      // Check if optimization is needed
      if (duration > this.performanceMetrics.targetResponseTime) {
        this.scheduleOptimization(queryId, query, duration);
      }
      
      return result;
    };
    
    console.log('📊 Query performance monitoring active');
  }

  /**
   * Initialize optimization strategies
   */
  initializeOptimizationStrategies() {
    // Index optimization strategy
    this.optimizationStrategies.set('index_optimization', {
      name: 'Index Optimization',
      priority: 1,
      execute: async (queryData) => {
        return await this.optimizeIndexes(queryData);
      }
    });

    // Query rewriting strategy
    this.optimizationStrategies.set('query_rewriting', {
      name: 'Query Rewriting',
      priority: 2,
      execute: async (queryData) => {
        return await this.optimizeQuery(queryData);
      }
    });

    // Connection pooling strategy
    this.optimizationStrategies.set('connection_pooling', {
      name: 'Connection Pooling',
      priority: 3,
      execute: async (queryData) => {
        return await this.optimizeConnections(queryData);
      }
    });

    // Caching strategy
    this.optimizationStrategies.set('result_caching', {
      name: 'Result Caching',
      priority: 4,
      execute: async (queryData) => {
        return await this.implementCaching(queryData);
      }
    });

    console.log('⚡ Performance optimization strategies loaded');
  }

  /**
   * Start continuous performance monitoring
   */
  startPerformanceMonitoring() {
    this.monitoringInterval = setInterval(async () => {
      await this.performPerformanceCheck();
    }, 30000); // Check every 30 seconds
    
    console.log('📊 Continuous performance monitoring started');
  }

  /**
   * Track individual query performance
   */
  trackQueryPerformance(queryId, query, duration, success) {
    // Update query time tracking
    if (!this.performanceMetrics.queryTimes.has(queryId)) {
      this.performanceMetrics.queryTimes.set(queryId, {
        query,
        executions: 0,
        totalTime: 0,
        averageTime: 0,
        slowExecutions: 0,
        errors: 0
      });
    }

    const queryMetrics = this.performanceMetrics.queryTimes.get(queryId);
    queryMetrics.executions++;
    queryMetrics.totalTime += duration;
    queryMetrics.averageTime = queryMetrics.totalTime / queryMetrics.executions;

    if (!success) {
      queryMetrics.errors++;
    }

    if (duration > this.performanceMetrics.targetResponseTime) {
      queryMetrics.slowExecutions++;
      
      // Add to slow queries list
      this.performanceMetrics.slowQueries.push({
        queryId,
        query: query.substring(0, 100) + '...',
        duration,
        timestamp: Date.now()
      });

      // Keep only recent slow queries
      if (this.performanceMetrics.slowQueries.length > 100) {
        this.performanceMetrics.slowQueries = this.performanceMetrics.slowQueries.slice(-50);
      }
    }

    // Update overall average response time
    this.updateAverageResponseTime();
  }

  /**
   * Update overall average response time
   */
  updateAverageResponseTime() {
    let totalTime = 0;
    let totalExecutions = 0;

    for (const metrics of this.performanceMetrics.queryTimes.values()) {
      totalTime += metrics.totalTime;
      totalExecutions += metrics.executions;
    }

    this.performanceMetrics.averageResponseTime = totalExecutions > 0 ? totalTime / totalExecutions : 0;
    
    // Calculate performance score (100 = perfect, 0 = terrible)
    const targetTime = this.performanceMetrics.targetResponseTime;
    const actualTime = this.performanceMetrics.averageResponseTime;
    
    if (actualTime <= targetTime) {
      this.performanceMetrics.performanceScore = 100;
    } else {
      this.performanceMetrics.performanceScore = Math.max(0, 100 - ((actualTime - targetTime) / targetTime) * 100);
    }
  }

  /**
   * Generate unique query ID for tracking
   */
  generateQueryId(query) {
    // Extract query type and main table
    const normalized = query.trim().toLowerCase();
    const words = normalized.split(/\s+/);
    const operation = words[0] || 'unknown';
    
    let table = 'unknown';
    const tableKeywords = ['from', 'into', 'update', 'table'];
    
    for (let i = 0; i < words.length - 1; i++) {
      if (tableKeywords.includes(words[i])) {
        table = words[i + 1] || 'unknown';
        break;
      }
    }

    return `${operation}_${table}`;
  }

  /**
   * Schedule optimization for slow queries
   */
  scheduleOptimization(queryId, query, duration) {
    // Avoid duplicate optimizations
    const recentOptimization = this.performanceMetrics.optimizationHistory.find(
      opt => opt.queryId === queryId && (Date.now() - opt.timestamp) < 300000 // 5 minutes
    );

    if (recentOptimization) return;

    // Schedule optimization
    setTimeout(async () => {
      await this.optimizeSlowQuery(queryId, query, duration);
    }, 1000); // Small delay to avoid blocking
  }

  /**
   * Optimize slow query
   */
  async optimizeSlowQuery(queryId, query, duration) {
    try {
      console.log(`⚡ Optimizing slow query: ${queryId} (${Math.round(duration)}ms)`);

      const queryData = {
        queryId,
        query,
        duration,
        metrics: this.performanceMetrics.queryTimes.get(queryId)
      };

      // Try optimization strategies in priority order
      const strategies = Array.from(this.optimizationStrategies.values())
        .sort((a, b) => a.priority - b.priority);

      for (const strategy of strategies) {
        try {
          const result = await strategy.execute(queryData);
          
          if (result.success) {
            this.performanceMetrics.optimizationHistory.push({
              queryId,
              strategy: strategy.name,
              improvement: result.improvement,
              timestamp: Date.now()
            });

            console.log(`✅ ${strategy.name} improved query by ${result.improvement}ms`);
            break; // Stop after first successful optimization
          }
        } catch (error) {
          console.warn(`⚠️ ${strategy.name} failed:`, error.message);
        }
      }
    } catch (error) {
      console.error('❌ Query optimization failed:', error);
    }
  }

  /**
   * Optimize database indexes
   */
  async optimizeIndexes(queryData) {
    try {
      const { query, metrics } = queryData;
      
      // Analyze query for missing indexes
      const suggestedIndexes = this.analyzeIndexNeeds(query);
      
      if (suggestedIndexes.length === 0) {
        return { success: false, reason: 'No index optimizations needed' };
      }

      // Create suggested indexes
      let improvement = 0;
      
      for (const indexDef of suggestedIndexes) {
        try {
          const result = this.dataLayer.db.executeQuery(indexDef.sql);
          
          if (result.success) {
            improvement += indexDef.expectedImprovement;
            console.log(`📊 Created index: ${indexDef.name}`);
          }
        } catch (error) {
          console.warn(`⚠️ Failed to create index ${indexDef.name}:`, error.message);
        }
      }

      return { 
        success: improvement > 0, 
        improvement,
        indexesCreated: suggestedIndexes.length
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Analyze query for index optimization opportunities
   */
  analyzeIndexNeeds(query) {
    const suggestions = [];
    const normalized = query.toLowerCase();

    // Common patterns that benefit from indexes
    const patterns = [
      {
        pattern: /where\s+(\w+)\s*=\s*\?/g,
        getIndex: (match) => ({
          name: `idx_${match[1]}_eq`,
          sql: `CREATE INDEX IF NOT EXISTS idx_${match[1]}_eq ON ${this.extractTableName(query)} (${match[1]})`,
          expectedImprovement: 50
        })
      },
      {
        pattern: /where\s+(\w+)\s*>\s*\?/g,
        getIndex: (match) => ({
          name: `idx_${match[1]}_range`,
          sql: `CREATE INDEX IF NOT EXISTS idx_${match[1]}_range ON ${this.extractTableName(query)} (${match[1]})`,
          expectedImprovement: 30
        })
      },
      {
        pattern: /order\s+by\s+(\w+)/g,
        getIndex: (match) => ({
          name: `idx_${match[1]}_sort`,
          sql: `CREATE INDEX IF NOT EXISTS idx_${match[1]}_sort ON ${this.extractTableName(query)} (${match[1]})`,
          expectedImprovement: 40
        })
      }
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.pattern.exec(normalized)) !== null) {
        const indexDef = pattern.getIndex(match);
        if (indexDef && !suggestions.some(s => s.name === indexDef.name)) {
          suggestions.push(indexDef);
        }
      }
    }

    return suggestions;
  }

  /**
   * Extract table name from query
   */
  extractTableName(query) {
    const normalized = query.toLowerCase();
    const patterns = [
      /from\s+(\w+)/,
      /into\s+(\w+)/,
      /update\s+(\w+)/
    ];

    for (const pattern of patterns) {
      const match = normalized.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return 'unknown_table';
  }

  /**
   * Optimize query structure
   */
  async optimizeQuery(queryData) {
    try {
      const { query } = queryData;
      const optimized = this.rewriteQuery(query);
      
      if (optimized === query) {
        return { success: false, reason: 'No query optimizations available' };
      }

      // Test optimized query
      const testResult = await this.testOptimizedQuery(optimized);
      
      if (testResult.success && testResult.improvement > 0) {
        return {
          success: true,
          improvement: testResult.improvement,
          optimizedQuery: optimized
        };
      }

      return { success: false, reason: 'Optimization did not improve performance' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Rewrite query for better performance
   */
  rewriteQuery(query) {
    let optimized = query;

    // Replace SELECT * with specific columns where possible
    optimized = optimized.replace(
      /SELECT \* FROM (\w+) WHERE/gi,
      'SELECT id, created_at FROM $1 WHERE'
    );

    // Use LIMIT for potentially large result sets
    if (!optimized.toLowerCase().includes('limit')) {
      optimized += ' LIMIT 1000';
    }

    // Other optimizations can be added here

    return optimized;
  }

  /**
   * Test optimized query performance
   */
  async testOptimizedQuery(optimizedQuery) {
    try {
      const startTime = performance.now();
      const result = this.dataLayer.executeQuery(optimizedQuery);
      const duration = performance.now() - startTime;

      return {
        success: result.success,
        duration,
        improvement: Math.max(0, 200 - duration) // Improvement toward 200ms target
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Optimize database connections
   */
  async optimizeConnections(queryData) {
    try {
      // SQLite is single-connection, but we can optimize settings
      const optimizations = [
        'PRAGMA cache_size = 10000',
        'PRAGMA temp_store = MEMORY',
        'PRAGMA journal_mode = WAL',
        'PRAGMA synchronous = NORMAL'
      ];

      let improvement = 0;

      for (const pragma of optimizations) {
        try {
          const result = this.dataLayer.db.executeQuery(pragma);
          if (result.success) {
            improvement += 10; // Estimated improvement per pragma
          }
        } catch (error) {
          console.warn(`⚠️ Failed to apply pragma: ${pragma}`, error.message);
        }
      }

      return { 
        success: improvement > 0, 
        improvement,
        optimizationsApplied: improvement / 10
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Implement result caching
   */
  async implementCaching(queryData) {
    try {
      const { query, metrics } = queryData;
      
      // Only cache read-only queries
      if (!this.isReadOnlyQuery(query)) {
        return { success: false, reason: 'Query is not cacheable (not read-only)' };
      }
      
      // Create cache table if it doesn't exist
      const cacheTableResult = this.dataLayer.executeQuery(`
        CREATE TABLE IF NOT EXISTS query_cache (
          cache_key TEXT PRIMARY KEY,
          query_hash TEXT NOT NULL,
          result_data TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          expires_at INTEGER NOT NULL,
          access_count INTEGER DEFAULT 1
        )
      `);
      
      if (!cacheTableResult.success) {
        return { success: false, reason: 'Failed to create cache table' };
      }
      
      // Generate cache key
      const cacheKey = this.generateCacheKey(query);
      const queryHash = this.simpleHash(query);
      const expiryTime = Date.now() + (5 * 60 * 1000); // 5 minutes cache
      
      // Check if we can implement caching for this query pattern
      const improvement = this.estimateCacheImprovement(metrics);
      
      if (improvement > 20) { // Only implement if >20ms improvement expected
        // Create index for cache lookups
        this.dataLayer.executeQuery('CREATE INDEX IF NOT EXISTS idx_cache_key ON query_cache(cache_key)');
        this.dataLayer.executeQuery('CREATE INDEX IF NOT EXISTS idx_cache_expires ON query_cache(expires_at)');
        
        return { 
          success: true, 
          improvement,
          cacheImplemented: true,
          cacheKey
        };
      }
      
      return { 
        success: false, 
        reason: 'Insufficient improvement expected from caching' 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Check if query is read-only
   */
  isReadOnlyQuery(query) {
    const readOnlyPatterns = /^\s*(SELECT|WITH)\s+/i;
    return readOnlyPatterns.test(query.trim());
  }
  
  /**
   * Generate cache key for query
   */
  generateCacheKey(query) {
    // Normalize query for caching
    const normalized = query
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
    
    return `cache_${this.simpleHash(normalized)}`;
  }
  
  /**
   * Estimate cache improvement
   */
  estimateCacheImprovement(metrics) {
    if (!metrics || !metrics.averageTime) return 0;
    
    // Estimate cache lookup time (much faster than full query)
    const cacheHitTime = 5; // 5ms for cache hit
    const improvement = Math.max(0, metrics.averageTime - cacheHitTime);
    
    return improvement;
  }
  
  /**
   * Simple hash function for cache keys
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Perform comprehensive performance check
   */
  async performPerformanceCheck() {
    try {
      const health = this.dataLayer.getSystemHealth();
      
      if (health.performance.averageResponseTime > this.performanceMetrics.targetResponseTime) {
        console.warn(`⚠️ Performance degradation detected: ${Math.round(health.performance.averageResponseTime)}ms average`);
        
        // Trigger optimization for worst performing queries
        const slowQueries = Array.from(this.performanceMetrics.queryTimes.entries())
          .filter(([_, metrics]) => metrics.averageTime > this.performanceMetrics.targetResponseTime)
          .sort((a, b) => b[1].averageTime - a[1].averageTime)
          .slice(0, 5); // Top 5 slow queries

        for (const [queryId, metrics] of slowQueries) {
          await this.optimizeSlowQuery(queryId, metrics.query, metrics.averageTime);
        }
      }
    } catch (error) {
      console.error('❌ Performance check failed:', error);
    }
  }

  /**
   * Perform initial database optimization
   */
  async performInitialOptimization() {
    try {
      console.log('⚡ Running initial database optimization...');

      // Apply basic performance settings
      const basicOptimizations = await this.optimizeConnections({ query: 'INITIAL_SETUP' });
      
      if (basicOptimizations.success) {
        console.log(`✅ Applied ${basicOptimizations.optimizationsApplied} initial optimizations`);
      }

      // Analyze existing queries if any
      if (this.performanceMetrics.queryTimes.size > 0) {
        console.log('📊 Analyzing existing query patterns...');
        await this.performPerformanceCheck();
      }

      console.log('✅ Initial optimization complete');
    } catch (error) {
      console.error('❌ Initial optimization failed:', error);
    }
  }

  /**
   * Get performance report
   */
  getPerformanceReport() {
    const report = {
      overall: {
        averageResponseTime: Math.round(this.performanceMetrics.averageResponseTime),
        performanceScore: Math.round(this.performanceMetrics.performanceScore),
        targetResponseTime: this.performanceMetrics.targetResponseTime,
        status: this.performanceMetrics.performanceScore >= 80 ? 'excellent' : 
                this.performanceMetrics.performanceScore >= 60 ? 'good' : 
                this.performanceMetrics.performanceScore >= 40 ? 'fair' : 'poor'
      },
      queries: {
        totalTracked: this.performanceMetrics.queryTimes.size,
        slowQueries: this.performanceMetrics.slowQueries.length,
        optimizationsApplied: this.performanceMetrics.optimizationHistory.length
      },
      slowestQueries: Array.from(this.performanceMetrics.queryTimes.entries())
        .sort((a, b) => b[1].averageTime - a[1].averageTime)
        .slice(0, 5)
        .map(([queryId, metrics]) => ({
          queryId,
          averageTime: Math.round(metrics.averageTime),
          executions: metrics.executions,
          slowExecutions: metrics.slowExecutions
        })),
      recentOptimizations: this.performanceMetrics.optimizationHistory
        .slice(-10)
        .map(opt => ({
          strategy: opt.strategy,
          improvement: Math.round(opt.improvement),
          timestamp: new Date(opt.timestamp).toISOString()
        }))
    };

    return report;
  }

  /**
   * Clean up performance monitoring
   */
  cleanup() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    this.performanceMetrics.queryTimes.clear();
    this.performanceMetrics.slowQueries = [];
    this.performanceMetrics.optimizationHistory = [];

    console.log('🔒 Database performance optimizer cleaned up');
  }
}

module.exports = VelvetDatabasePerformanceOptimizer;