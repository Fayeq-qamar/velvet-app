// Velvet Database Service - SQLite with AES-256 Encryption
// Privacy-preserving local storage for neurodivergent pattern learning

const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const keytar = require('keytar');

/**
 * Secure database service for Velvet AI's neurodivergent features
 * Implements local-only storage with end-to-end encryption
 */
class VelvetDatabaseService {
  constructor() {
    this.db = null;
    this.masterKey = null;
    this.serviceName = 'velvet-ai-assistant';
    this.accountName = 'user-data-encryption';
    this.isInitialized = false;
    this.dbPath = path.join(app.getPath('userData'), 'velvet-brain.db');
    this.backupPath = path.join(app.getPath('userData'), 'backups');
    
    // Performance tracking
    this.queryStats = {
      totalQueries: 0,
      averageResponseTime: 0,
      slowQueries: [],
      errors: []
    };
    
    console.log('🧠 Velvet Database Service initialized');
  }

  /**
   * Initialize the database with encryption
   */
  async initialize() {
    try {
      console.log('🔐 Initializing encrypted database...');
      
      // Get or create master encryption key
      await this.initializeMasterKey();
      
      // Create backup directory
      if (!fs.existsSync(this.backupPath)) {
        fs.mkdirSync(this.backupPath, { recursive: true });
      }
      
      // Initialize SQLite database
      this.db = new sqlite3.Database(this.dbPath);
      
      // Configure SQLite for performance and security
      await this.runQuery('PRAGMA journal_mode = WAL');
      await this.runQuery('PRAGMA synchronous = NORMAL');
      await this.runQuery('PRAGMA foreign_keys = ON');
      await this.runQuery('PRAGMA temp_store = MEMORY');
      await this.runQuery('PRAGMA cache_size = 10000');
      
      // Create tables
      await this.createTables();
      
      // Verify encryption works
      await this.testEncryption();
      
      this.isInitialized = true;
      console.log('✅ Database initialized successfully');
      
      return { success: true, message: 'Database initialized' };
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      this.queryStats.errors.push({
        timestamp: Date.now(),
        operation: 'initialize',
        error: error.message
      });
      return { success: false, error: error.message };
    }
  }

  /**
   * Initialize or retrieve master encryption key
   */
  async initializeMasterKey() {
    try {
      // Try to get existing key from OS keychain
      let existingKey = await keytar.getPassword(this.serviceName, this.accountName);
      
      if (existingKey) {
        this.masterKey = Buffer.from(existingKey, 'hex');
        console.log('🔑 Retrieved existing encryption key');
      } else {
        // Generate new 256-bit key
        this.masterKey = crypto.randomBytes(32);
        await keytar.setPassword(this.serviceName, this.accountName, this.masterKey.toString('hex'));
        console.log('🔑 Generated new encryption key');
      }
    } catch (error) {
      console.error('❌ Key initialization failed:', error);
      // Fallback to environment-based key (less secure but functional)
      const fallbackSeed = process.env.VELVET_DB_SEED || 'velvet-ai-local-encryption-fallback';
      this.masterKey = crypto.pbkdf2Sync(fallbackSeed, 'velvet-salt', 100000, 32, 'sha512');
      console.warn('⚠️ Using fallback encryption key');
    }
  }

  /**
   * Encrypt sensitive data using AES-256-GCM
   */
  encrypt(data) {
    if (!data || typeof data !== 'string') return data;
    
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipher('aes-256-gcm', this.masterKey);
      cipher.setAAD(Buffer.from('velvet-ai-data'));
      
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const authTag = cipher.getAuthTag();
      
      return {
        encrypted,
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex')
      };
    } catch (error) {
      console.error('❌ Encryption failed:', error);
      return null;
    }
  }

  /**
   * Decrypt sensitive data
   */
  decrypt(encryptedData) {
    if (!encryptedData || typeof encryptedData !== 'object') return encryptedData;
    
    try {
      const decipher = crypto.createDecipher('aes-256-gcm', this.masterKey);
      decipher.setAAD(Buffer.from('velvet-ai-data'));
      decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
      
      let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('❌ Decryption failed:', error);
      return null;
    }
  }

  /**
   * Create all database tables with proper indexes
   */
  async createTables() {
    const tables = [
      // User profiles and settings
      `CREATE TABLE IF NOT EXISTS user_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL,
        profile_data TEXT NOT NULL, -- encrypted JSON
        preferences TEXT NOT NULL, -- encrypted JSON
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )`,

      // Social Decoder data
      `CREATE TABLE IF NOT EXISTS social_decoder_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT UNIQUE NOT NULL,
        session_type TEXT NOT NULL, -- meeting, call, conversation
        platform TEXT, -- zoom, teams, discord, etc.
        start_time INTEGER NOT NULL,
        end_time INTEGER,
        participant_count INTEGER,
        social_tension_avg REAL,
        insights TEXT, -- encrypted JSON
        created_at INTEGER NOT NULL
      )`,

      `CREATE TABLE IF NOT EXISTS social_decoder_analyses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        analysis_type TEXT NOT NULL, -- sarcasm, emotion, subtext
        confidence REAL NOT NULL,
        original_text TEXT, -- encrypted
        analysis_result TEXT NOT NULL, -- encrypted JSON
        intervention_triggered BOOLEAN DEFAULT 0,
        user_feedback INTEGER, -- -1, 0, 1 (wrong, neutral, helpful)
        timestamp INTEGER NOT NULL,
        FOREIGN KEY (session_id) REFERENCES social_decoder_sessions(session_id)
      )`,

      `CREATE TABLE IF NOT EXISTS social_decoder_learning (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pattern_type TEXT NOT NULL,
        pattern_data TEXT NOT NULL, -- encrypted JSON
        success_rate REAL NOT NULL,
        usage_count INTEGER DEFAULT 1,
        last_used INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      )`,

      // Executive Dysfunction data
      `CREATE TABLE IF NOT EXISTS executive_dysfunction_patterns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pattern_id TEXT UNIQUE NOT NULL,
        pattern_type TEXT NOT NULL, -- crisis, avoidance, hyperfocus, distraction
        severity_level TEXT NOT NULL, -- gentle, supportive, crisis
        context_data TEXT NOT NULL, -- encrypted JSON
        detection_confidence REAL NOT NULL,
        intervention_used TEXT, -- encrypted JSON
        intervention_success BOOLEAN,
        user_feedback INTEGER,
        energy_level_before REAL,
        energy_level_after REAL,
        timestamp INTEGER NOT NULL
      )`,

      `CREATE TABLE IF NOT EXISTS executive_dysfunction_interventions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        intervention_id TEXT UNIQUE NOT NULL,
        intervention_type TEXT NOT NULL, -- safe_space, micro_task, breathing, celebration
        trigger_pattern TEXT NOT NULL,
        effectiveness_score REAL,
        usage_count INTEGER DEFAULT 1,
        personalization_data TEXT, -- encrypted JSON
        last_used INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      )`,

      `CREATE TABLE IF NOT EXISTS executive_dysfunction_energy (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        energy_level REAL NOT NULL,
        context TEXT, -- encrypted JSON
        factors TEXT, -- encrypted JSON
        recovery_suggestions TEXT, -- encrypted JSON
        timestamp INTEGER NOT NULL
      )`,

      // Masking Fatigue data
      `CREATE TABLE IF NOT EXISTS masking_fatigue_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT UNIQUE NOT NULL,
        environment_type TEXT NOT NULL, -- work, social, home, public
        start_time INTEGER NOT NULL,
        end_time INTEGER,
        initial_masking_level REAL,
        peak_masking_level REAL,
        final_masking_level REAL,
        energy_spent REAL,
        recovery_needed BOOLEAN,
        context_data TEXT, -- encrypted JSON
        created_at INTEGER NOT NULL
      )`,

      `CREATE TABLE IF NOT EXISTS masking_fatigue_analyses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        analysis_type TEXT NOT NULL, -- communication, energy, authenticity
        masking_indicators TEXT NOT NULL, -- encrypted JSON
        authenticity_score REAL,
        energy_impact REAL,
        safe_space_detected BOOLEAN DEFAULT 0,
        intervention_suggested TEXT, -- encrypted JSON
        timestamp INTEGER NOT NULL,
        FOREIGN KEY (session_id) REFERENCES masking_fatigue_sessions(session_id)
      )`,

      `CREATE TABLE IF NOT EXISTS masking_fatigue_patterns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pattern_type TEXT NOT NULL, -- communication_shift, energy_depletion, safe_space
        baseline_data TEXT NOT NULL, -- encrypted JSON
        current_data TEXT NOT NULL, -- encrypted JSON
        deviation_score REAL NOT NULL,
        adaptation_suggestions TEXT, -- encrypted JSON
        effectiveness_history TEXT, -- encrypted JSON
        last_updated INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      )`,

      // Cross-feature learning and correlations
      `CREATE TABLE IF NOT EXISTS cross_feature_insights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        insight_type TEXT NOT NULL, -- correlation, prediction, adaptation
        features_involved TEXT NOT NULL, -- JSON array of feature names
        insight_data TEXT NOT NULL, -- encrypted JSON
        confidence REAL NOT NULL,
        validation_count INTEGER DEFAULT 0,
        success_rate REAL DEFAULT 0,
        created_at INTEGER NOT NULL,
        last_validated INTEGER
      )`,

      `CREATE TABLE IF NOT EXISTS user_learning_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        feature_name TEXT NOT NULL,
        metric_name TEXT NOT NULL,
        baseline_value REAL,
        current_value REAL,
        improvement_rate REAL,
        milestone_data TEXT, -- encrypted JSON
        last_updated INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      )`,

      // System performance and health
      `CREATE TABLE IF NOT EXISTS system_performance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        metric_type TEXT NOT NULL,
        metric_value REAL NOT NULL,
        context_data TEXT, -- encrypted JSON
        timestamp INTEGER NOT NULL
      )`
    ];

    // Execute table creation
    for (const tableSQL of tables) {
      await this.runQuery(tableSQL);
    }

    // Create indexes for performance
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_social_sessions_time ON social_decoder_sessions(start_time)',
      'CREATE INDEX IF NOT EXISTS idx_social_analyses_session ON social_decoder_analyses(session_id)',
      'CREATE INDEX IF NOT EXISTS idx_social_analyses_type ON social_decoder_analyses(analysis_type)',
      'CREATE INDEX IF NOT EXISTS idx_executive_patterns_type ON executive_dysfunction_patterns(pattern_type)',
      'CREATE INDEX IF NOT EXISTS idx_executive_patterns_time ON executive_dysfunction_patterns(timestamp)',
      'CREATE INDEX IF NOT EXISTS idx_masking_sessions_env ON masking_fatigue_sessions(environment_type)',
      'CREATE INDEX IF NOT EXISTS idx_masking_sessions_time ON masking_fatigue_sessions(start_time)',
      'CREATE INDEX IF NOT EXISTS idx_masking_analyses_session ON masking_fatigue_analyses(session_id)',
      'CREATE INDEX IF NOT EXISTS idx_cross_insights_type ON cross_feature_insights(insight_type)',
      'CREATE INDEX IF NOT EXISTS idx_learning_progress_feature ON user_learning_progress(feature_name)',
      'CREATE INDEX IF NOT EXISTS idx_system_performance_time ON system_performance(timestamp)'
    ];

    for (const indexSQL of indexes) {
      await this.runQuery(indexSQL);
    }

    console.log('✅ Database tables and indexes created');
  }

  /**
   * Test encryption functionality
   */
  async testEncryption() {
    const testData = 'This is sensitive neurodivergent pattern data';
    const encrypted = this.encrypt(testData);
    const decrypted = this.decrypt(encrypted);
    
    if (decrypted !== testData) {
      throw new Error('Encryption test failed');
    }
    
    console.log('✅ Encryption test passed');
  }

  /**
   * Execute query with performance tracking
   */
  executeQuery(query, params = []) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      this.db.all(query, params, (error, rows) => {
        const duration = performance.now() - startTime;
        
        if (error) {
          console.error('❌ Query failed:', error);
          this.queryStats.errors.push({
            timestamp: Date.now(),
            query,
            params,
            error: error.message,
            duration
          });
          
          resolve({ success: false, error: error.message, duration });
        } else {
          this.updateQueryStats(duration, query);
          resolve({ success: true, data: rows || [], duration });
        }
      });
    });
  }

  /**
   * Execute a single query (for CREATE, INSERT, UPDATE, DELETE)
   */
  runQuery(query, params = []) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      this.db.run(query, params, function(error) {
        const duration = performance.now() - startTime;
        
        if (error) {
          console.error('❌ Query failed:', error);
          resolve({ success: false, error: error.message, duration });
        } else {
          resolve({ success: true, lastID: this.lastID, changes: this.changes, duration });
        }
      });
    });
  }

  /**
   * Update query performance statistics
   */
  updateQueryStats(duration, query) {
    this.queryStats.totalQueries++;
    
    // Update average response time
    const currentAvg = this.queryStats.averageResponseTime;
    this.queryStats.averageResponseTime = 
      (currentAvg * (this.queryStats.totalQueries - 1) + duration) / this.queryStats.totalQueries;
    
    // Track slow queries (>200ms target)
    if (duration > 200) {
      this.queryStats.slowQueries.push({
        timestamp: Date.now(),
        duration,
        query: query.substring(0, 100) + '...'
      });
      
      // Keep only recent slow queries
      if (this.queryStats.slowQueries.length > 50) {
        this.queryStats.slowQueries = this.queryStats.slowQueries.slice(-25);
      }
    }
  }

  /**
   * Create automatic backup
   */
  async createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(this.backupPath, `velvet-brain-${timestamp}.db`);
      
      // Use SQLite VACUUM INTO for clean backup
      await this.runQuery(`VACUUM INTO '${backupFile}'`);
      
      console.log(`📦 Database backup created: ${backupFile}`);
      
      // Clean old backups (keep last 7 days)
      this.cleanOldBackups();
      
      return { success: true, backupFile };
    } catch (error) {
      console.error('❌ Backup failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Clean old backup files
   */
  cleanOldBackups() {
    try {
      const files = fs.readdirSync(this.backupPath);
      const now = Date.now();
      const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
      
      files.forEach(file => {
        if (file.startsWith('velvet-brain-') && file.endsWith('.db')) {
          const filePath = path.join(this.backupPath, file);
          const stats = fs.statSync(filePath);
          
          if (stats.mtime.getTime() < sevenDaysAgo) {
            fs.unlinkSync(filePath);
            console.log(`🗑️ Cleaned old backup: ${file}`);
          }
        }
      });
    } catch (error) {
      console.warn('⚠️ Backup cleanup failed:', error);
    }
  }

  /**
   * Get database health status
   */
  getHealthStatus() {
    const health = {
      isInitialized: this.isInitialized,
      dbSize: this.getDbSize(),
      performance: {
        totalQueries: this.queryStats.totalQueries,
        averageResponseTime: Math.round(this.queryStats.averageResponseTime * 100) / 100,
        slowQueriesCount: this.queryStats.slowQueries.length,
        errorCount: this.queryStats.errors.length
      },
      encryption: {
        keyAvailable: !!this.masterKey,
        keyType: this.masterKey ? 'secure' : 'fallback'
      }
    };
    
    // Determine overall health
    if (health.performance.averageResponseTime < 50 && health.performance.errorCount < 5) {
      health.status = 'excellent';
    } else if (health.performance.averageResponseTime < 150 && health.performance.errorCount < 20) {
      health.status = 'good';
    } else if (health.performance.averageResponseTime < 300) {
      health.status = 'fair';
    } else {
      health.status = 'poor';
    }
    
    return health;
  }

  /**
   * Get database file size
   */
  getDbSize() {
    try {
      const stats = fs.statSync(this.dbPath);
      return {
        bytes: stats.size,
        mb: Math.round(stats.size / (1024 * 1024) * 100) / 100
      };
    } catch {
      return { bytes: 0, mb: 0 };
    }
  }

  /**
   * Close database connection gracefully
   */
  async close() {
    try {
      if (this.db) {
        // Create final backup
        await this.createBackup();
        
        // Close database
        this.db.close((error) => {
          if (error) {
            console.error('❌ Database close error:', error);
          }
        });
        this.db = null;
        
        console.log('🔒 Database connection closed');
        return { success: true };
      }
    } catch (error) {
      console.error('❌ Database close failed:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = VelvetDatabaseService;