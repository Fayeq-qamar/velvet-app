/**
 * VELVET SECURITY MANAGER
 * Production-ready security hardening for neurodivergent AI assistant
 * 
 * Features:
 * - IPC validation and rate limiting
 * - API request sanitization
 * - Memory protection for sensitive data
 * - Security monitoring and logging
 * - Privacy protection for neurodivergent data
 */

const crypto = require('crypto');
const { app } = require('electron');

class VelvetSecurityManager {
  constructor() {
    this.ipcRateLimit = new Map(); // Track IPC call rates per channel
    this.validChannels = new Set(); // Whitelist of allowed IPC channels
    this.securityLog = [];
    this.maxLogEntries = 1000;
    this.sensitiveDataPatterns = [
      /api[_-]?key/i,
      /secret/i,
      /token/i,
      /password/i,
      /auth/i,
      /private[_-]?key/i
    ];
    
    // Rate limiting configuration
    this.rateLimits = {
      'chat-completion': { maxCalls: 30, windowMs: 60000 }, // 30 calls per minute
      'transcribe-audio': { maxCalls: 60, windowMs: 60000 }, // 60 calls per minute
      'elevenlabs-tts': { maxCalls: 50, windowMs: 60000 }, // 50 calls per minute
      'db:*': { maxCalls: 100, windowMs: 60000 }, // 100 DB ops per minute
      'default': { maxCalls: 120, windowMs: 60000 } // Default rate limit
    };

    this.initializeValidChannels();
    this.startSecurityMonitoring();
    
    console.log('🛡️ Velvet Security Manager initialized');
  }

  /**
   * Initialize whitelist of valid IPC channels
   */
  initializeValidChannels() {
    const validChannels = [
      // Core functionality
      'transcribe-audio', 'chat-completion', 'elevenlabs-tts',
      'set-click-through', 'check-audio-playing', 'get-system-volume',
      'start-ambient-listening', 'stop-ambient-listening',
      
      // Brain context streaming
      'brain-context-stream', 'brain-context-update',
      
      // Privacy and stealth
      'detect-screen-sharing', 'set-privacy-mode', 'get-privacy-status',
      
      // Screen intelligence
      'screen-intelligence-start', 'screen-intelligence-stop', 'screen-intelligence-stats',
      
      // Executive dysfunction emergency mode
      'emergency-mode-status', 'emergency-mode-activate-safe-space', 'emergency-mode-test',
      
      // Task management
      'task-create', 'task-activate', 'task-complete-step', 'task-get-current', 'task-get-all', 'task-delete',
      
      // Window controls
      'checklist-show', 'checklist-hide', 'checklist-update', 'checklist-close',
      'meeting-assistant-show', 'meeting-assistant-hide', 'meeting-assistant-expand',
      'meeting-assistant-auto-resize', 'meeting-assistant-update', 'meeting-assistant-close',
      'control-panel-show', 'control-panel-hide', 'control-panel-close',
      
      // Meeting functionality
      'start-meeting-transcription', 'stop-meeting-transcription', 'process-meeting-audio',
      'export-meeting-notes', 'generate-meeting-summary', 'create-shareable-link',
      'analyze-conversation-context', 'get-response-suggestions', 'analyze-screen-context',
      
      // Audio environment
      'get-system-audio-devices', 'capture-system-audio', 'get-current-audio-context',
      
      // Desktop capture (OCR bypass)
      'get-desktop-sources', 'capture-screen-for-ocr',
      
      // Beta features
      'submit-feedback', 'check-permissions', 'request-permissions',
      'report-error', 'get-error-stats', 'perform-health-check',
      
      // Database operations (encrypted)
      'db:health', 'db:analytics', 'db:learning-insights',
      'db:social:start-session', 'db:social:store-analysis', 'db:social:get-insights', 'db:social:learning-effectiveness',
      'db:executive:store-pattern', 'db:executive:store-intervention', 'db:executive:store-energy',
      'db:executive:pattern-history', 'db:executive:effective-interventions',
      'db:masking:start-session', 'db:masking:store-analysis', 'db:masking:update-pattern', 'db:masking:get-patterns',
      'db:cross:store-insight', 'db:cross:update-progress'
    ];

    validChannels.forEach(channel => this.validChannels.add(channel));
    console.log(`🛡️ Initialized ${validChannels.length} valid IPC channels`);
  }

  /**
   * Validate IPC channel and apply rate limiting
   */
  validateIPCRequest(channel, event) {
    const timestamp = Date.now();
    
    // 1. Channel whitelist validation
    if (!this.validChannels.has(channel)) {
      this.logSecurityEvent('INVALID_CHANNEL', { channel, origin: event.sender.getURL() });
      throw new Error(`Unauthorized IPC channel: ${channel}`);
    }

    // 2. Rate limiting
    const rateLimitKey = `${channel}-${event.sender.id}`;
    const rateLimit = this.getRateLimit(channel);
    
    if (!this.ipcRateLimit.has(rateLimitKey)) {
      this.ipcRateLimit.set(rateLimitKey, { calls: [], blocked: false });
    }

    const rateLimitData = this.ipcRateLimit.get(rateLimitKey);
    
    // Clean old calls outside the time window
    rateLimitData.calls = rateLimitData.calls.filter(
      callTime => timestamp - callTime < rateLimit.windowMs
    );

    // Check if rate limit exceeded
    if (rateLimitData.calls.length >= rateLimit.maxCalls) {
      if (!rateLimitData.blocked) {
        this.logSecurityEvent('RATE_LIMIT_EXCEEDED', { 
          channel, 
          calls: rateLimitData.calls.length,
          limit: rateLimit.maxCalls,
          window: rateLimit.windowMs 
        });
        rateLimitData.blocked = true;
        
        // Auto-unblock after window expires
        setTimeout(() => {
          rateLimitData.blocked = false;
        }, rateLimit.windowMs);
      }
      throw new Error(`Rate limit exceeded for channel: ${channel}`);
    }

    // Record this call
    rateLimitData.calls.push(timestamp);
    
    return true;
  }

  /**
   * Get rate limit configuration for a channel
   */
  getRateLimit(channel) {
    // Check for specific channel limits
    if (this.rateLimits[channel]) {
      return this.rateLimits[channel];
    }
    
    // Check for pattern matches (e.g., db:*)
    for (const pattern in this.rateLimits) {
      if (pattern.includes('*') && channel.startsWith(pattern.replace('*', ''))) {
        return this.rateLimits[pattern];
      }
    }
    
    // Return default rate limit
    return this.rateLimits.default;
  }

  /**
   * Sanitize and validate input data
   */
  sanitizeInput(data, allowedTypes = ['string', 'number', 'boolean', 'object']) {
    if (data === null || data === undefined) {
      return data;
    }

    const dataType = typeof data;
    
    if (!allowedTypes.includes(dataType)) {
      throw new Error(`Invalid data type: ${dataType}`);
    }

    if (dataType === 'string') {
      // Remove potential script injections
      data = data.replace(/<script[^>]*>.*?<\/script>/gi, '');
      data = data.replace(/javascript:/gi, '');
      data = data.replace(/data:text\/html/gi, '');
      
      // Limit string length to prevent memory exhaustion
      if (data.length > 100000) { // 100KB limit
        throw new Error('Input data too large');
      }
    }

    if (dataType === 'object' && data !== null) {
      // Recursively sanitize object properties
      if (Array.isArray(data)) {
        return data.map(item => this.sanitizeInput(item, allowedTypes));
      } else {
        const sanitized = {};
        const maxProperties = 100; // Prevent object bombing
        const keys = Object.keys(data);
        
        if (keys.length > maxProperties) {
          throw new Error('Too many object properties');
        }
        
        for (const key of keys) {
          if (typeof key !== 'string' || key.length > 1000) {
            throw new Error('Invalid object key');
          }
          sanitized[key] = this.sanitizeInput(data[key], allowedTypes);
        }
        return sanitized;
      }
    }

    return data;
  }

  /**
   * Secure memory cleanup for sensitive data
   */
  secureClearMemory(sensitiveData) {
    if (typeof sensitiveData === 'string') {
      // Overwrite string memory (best effort)
      sensitiveData = crypto.randomBytes(sensitiveData.length).toString('hex');
    } else if (typeof sensitiveData === 'object' && sensitiveData !== null) {
      // Recursively clear object properties
      for (const key in sensitiveData) {
        if (sensitiveData.hasOwnProperty(key)) {
          this.secureClearMemory(sensitiveData[key]);
          delete sensitiveData[key];
        }
      }
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  }

  /**
   * Validate API request before sending
   */
  validateAPIRequest(url, options = {}) {
    // Ensure HTTPS only
    if (!url.startsWith('https://')) {
      throw new Error('Only HTTPS requests allowed');
    }

    // Validate allowed API endpoints
    const allowedHosts = [
      'api.openai.com',
      'api.elevenlabs.io'
    ];

    const urlObj = new URL(url);
    if (!allowedHosts.includes(urlObj.hostname)) {
      this.logSecurityEvent('UNAUTHORIZED_API_ENDPOINT', { url: urlObj.hostname });
      throw new Error(`Unauthorized API endpoint: ${urlObj.hostname}`);
    }

    // Sanitize headers
    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        if (this.containsSensitiveData(key) || this.containsSensitiveData(value)) {
          // Don't log the actual sensitive data
          this.logSecurityEvent('SENSITIVE_DATA_IN_HEADERS', { headerKey: key });
        }
      }
    }

    // Validate request body size
    if (options.body) {
      const bodySize = Buffer.byteLength(options.body, 'utf8');
      const maxBodySize = 50 * 1024 * 1024; // 50MB limit
      
      if (bodySize > maxBodySize) {
        throw new Error('Request body too large');
      }
    }

    return true;
  }

  /**
   * Check if data contains sensitive information
   */
  containsSensitiveData(data) {
    if (typeof data !== 'string') return false;
    
    return this.sensitiveDataPatterns.some(pattern => pattern.test(data));
  }

  /**
   * Log security events
   */
  logSecurityEvent(eventType, details = {}) {
    const event = {
      timestamp: new Date().toISOString(),
      type: eventType,
      details,
      processId: process.pid,
      appVersion: app.getVersion()
    };

    this.securityLog.push(event);
    
    // Maintain log size
    if (this.securityLog.length > this.maxLogEntries) {
      this.securityLog.shift();
    }

    // Log to console for development
    console.warn(`🚨 Security Event [${eventType}]:`, details);
    
    // In production, you might want to send to external monitoring
    // this.sendToSecurityMonitoring(event);
  }

  /**
   * Get security statistics
   */
  getSecurityStats() {
    const stats = {
      totalEvents: this.securityLog.length,
      eventTypes: {},
      recentEvents: this.securityLog.slice(-10),
      rateLimitStatus: {}
    };

    // Count event types
    this.securityLog.forEach(event => {
      stats.eventTypes[event.type] = (stats.eventTypes[event.type] || 0) + 1;
    });

    // Rate limit status
    for (const [key, data] of this.ipcRateLimit.entries()) {
      stats.rateLimitStatus[key] = {
        calls: data.calls.length,
        blocked: data.blocked
      };
    }

    return stats;
  }

  /**
   * Start security monitoring
   */
  startSecurityMonitoring() {
    // Clean up old rate limit data every 5 minutes
    setInterval(() => {
      const now = Date.now();
      for (const [key, data] of this.ipcRateLimit.entries()) {
        data.calls = data.calls.filter(callTime => now - callTime < 300000); // 5 minutes
        if (data.calls.length === 0 && !data.blocked) {
          this.ipcRateLimit.delete(key);
        }
      }
    }, 300000); // 5 minutes

    console.log('🛡️ Security monitoring started');
  }

  /**
   * Enhanced CSP for production
   */
  getContentSecurityPolicy() {
    return "default-src 'self'; " +
           "script-src 'self' 'unsafe-inline'; " +
           "style-src 'self' 'unsafe-inline'; " + 
           "font-src 'self' data:; " +
           "img-src 'self' data: blob:; " +
           "media-src 'self' blob:; " +
           "connect-src 'self' https://api.openai.com https://api.elevenlabs.io; " +
           "object-src 'none'; " +
           "base-uri 'self'; " +
           "form-action 'none'; " +
           "frame-ancestors 'none'; " +
           "upgrade-insecure-requests;";
  }

  /**
   * Get secure webPreferences for BrowserWindow
   */
  getSecureWebPreferences(preloadPath) {
    return {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      enableBlinkFeatures: '',
      disableBlinkFeatures: 'Auxclick',
      backgroundThrottling: false,
      sandbox: false, // We need access to some Node.js APIs in preload
      preload: preloadPath,
      additionalArguments: [
        '--disable-web-security=false',
        '--disable-features=VizDisplayCompositor'
      ]
    };
  }

  /**
   * Shutdown cleanup
   */
  cleanup() {
    this.ipcRateLimit.clear();
    this.securityLog.length = 0;
    console.log('🛡️ Security Manager cleaned up');
  }
}

module.exports = VelvetSecurityManager;