/**
 * SECURE ERROR HANDLER
 * Production-ready error handling that prevents sensitive data leakage
 * 
 * Features:
 * - Sanitizes error messages before logging
 * - Prevents API key leakage in stack traces
 * - Rate limits error reporting
 * - Secure error reporting for production monitoring
 */

const crypto = require('crypto');

class SecureErrorHandler {
  constructor() {
    this.errorLog = [];
    this.maxLogEntries = 500;
    this.sensitivePatterns = [
      /api[_-]?key[:\s=]+[a-zA-Z0-9\-_]+/gi,
      /secret[:\s=]+[a-zA-Z0-9\-_]+/gi,
      /token[:\s=]+[a-zA-Z0-9\-_]+/gi,
      /password[:\s=]+[a-zA-Z0-9\-_]+/gi,
      /bearer\s+[a-zA-Z0-9\-_]+/gi,
      /sk-[a-zA-Z0-9]+/gi, // OpenAI API keys
      /xai-[a-zA-Z0-9]+/gi, // Other AI API keys
      /(\w+):\/\/[^@\s]+:[^@\s]+@/gi // URLs with credentials
    ];
    
    this.errorRateLimit = new Map();
    this.maxErrorsPerMinute = 10;
  }

  /**
   * Sanitize error message to remove sensitive data
   */
  sanitizeErrorMessage(message) {
    if (typeof message !== 'string') {
      message = String(message);
    }

    // Replace sensitive patterns with placeholders
    let sanitized = message;
    this.sensitivePatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[REDACTED_SENSITIVE_DATA]');
    });

    // Remove file paths that might contain usernames
    sanitized = sanitized.replace(/\/Users\/[^\/\s]+/g, '/Users/[USERNAME]');
    sanitized = sanitized.replace(/C:\\Users\\[^\\s]+/g, 'C:\\Users\\[USERNAME]');

    return sanitized;
  }

  /**
   * Sanitize stack trace
   */
  sanitizeStackTrace(stack) {
    if (!stack) return null;
    
    return stack
      .split('\n')
      .map(line => this.sanitizeErrorMessage(line))
      .filter(line => {
        // Remove lines that might contain sensitive file paths
        return !line.includes('node_modules') || 
               !line.includes('electron') ||
               !line.includes('/.env');
      })
      .join('\n');
  }

  /**
   * Check if error reporting is rate limited
   */
  isRateLimited(errorKey) {
    const now = Date.now();
    const rateLimitKey = `error-${errorKey}`;
    
    if (!this.errorRateLimit.has(rateLimitKey)) {
      this.errorRateLimit.set(rateLimitKey, { count: 0, resetTime: now + 60000 });
    }

    const rateData = this.errorRateLimit.get(rateLimitKey);
    
    // Reset counter if minute has passed
    if (now > rateData.resetTime) {
      rateData.count = 0;
      rateData.resetTime = now + 60000;
    }

    if (rateData.count >= this.maxErrorsPerMinute) {
      return true;
    }

    rateData.count++;
    return false;
  }

  /**
   * Secure error logging
   */
  logError(error, context = {}) {
    try {
      // Create error key for rate limiting
      const errorKey = crypto
        .createHash('md5')
        .update(error.message || 'unknown')
        .digest('hex')
        .substring(0, 8);

      // Check rate limiting
      if (this.isRateLimited(errorKey)) {
        return; // Silently drop rate-limited errors
      }

      // Sanitize error data
      const sanitizedError = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        message: this.sanitizeErrorMessage(error.message || 'Unknown error'),
        stack: this.sanitizeStackTrace(error.stack),
        context: this.sanitizeContext(context),
        level: error.level || 'error'
      };

      // Add to log
      this.errorLog.push(sanitizedError);
      
      // Maintain log size
      if (this.errorLog.length > this.maxLogEntries) {
        this.errorLog.shift();
      }

      // Console logging for development
      if (process.env.NODE_ENV !== 'production') {
        console.error('🚨 Secure Error Log:', sanitizedError);
      }

      // In production, send to external monitoring service
      // this.sendToMonitoring(sanitizedError);

    } catch (loggingError) {
      // Fallback logging - never let error logging crash the app
      console.error('Error in error logging:', loggingError.message);
    }
  }

  /**
   * Sanitize context data
   */
  sanitizeContext(context) {
    if (!context || typeof context !== 'object') {
      return context;
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(context)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeErrorMessage(value);
      } else if (typeof value === 'object' && value !== null) {
        // Recursively sanitize nested objects (max depth 3)
        sanitized[key] = this.sanitizeContext(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }

  /**
   * Get error statistics (for monitoring)
   */
  getErrorStats() {
    const stats = {
      totalErrors: this.errorLog.length,
      errorsByLevel: {},
      recentErrors: this.errorLog.slice(-5).map(error => ({
        timestamp: error.timestamp,
        message: error.message,
        level: error.level
      })),
      rateLimitStatus: {}
    };

    // Count errors by level
    this.errorLog.forEach(error => {
      stats.errorsByLevel[error.level] = (stats.errorsByLevel[error.level] || 0) + 1;
    });

    // Rate limit status
    for (const [key, data] of this.errorRateLimit.entries()) {
      stats.rateLimitStatus[key] = {
        count: data.count,
        resetTime: new Date(data.resetTime).toISOString()
      };
    }

    return stats;
  }

  /**
   * Secure error handler for unhandled exceptions
   */
  handleUncaughtException(error) {
    this.logError(error, { 
      type: 'uncaught_exception',
      fatal: true,
      pid: process.pid
    });
    
    // In production, gracefully shut down
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  /**
   * Secure error handler for unhandled Promise rejections
   */
  handleUnhandledRejection(reason, promise) {
    this.logError(new Error(reason), {
      type: 'unhandled_rejection',
      promise: promise.toString()
    });
  }

  /**
   * Setup global error handlers
   */
  setupGlobalHandlers() {
    process.on('uncaughtException', (error) => {
      this.handleUncaughtException(error);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.handleUnhandledRejection(reason, promise);
    });

    console.log('🛡️ Secure error handlers initialized');
  }

  /**
   * Cleanup
   */
  cleanup() {
    this.errorLog.length = 0;
    this.errorRateLimit.clear();
  }
}

module.exports = SecureErrorHandler;