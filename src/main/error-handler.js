/**
 * Velvet AI Assistant - Enhanced Error Handling and Recovery
 * Production-ready error handling with user-friendly recovery
 */

const { dialog, app, shell } = require('electron');
const fs = require('fs');
const path = require('path');

class VelvetErrorHandler {
  constructor() {
    this.errorLog = [];
    this.maxLogEntries = 100;
    this.logFilePath = path.join(app.getPath('userData'), 'error.log');
    
    this.setupGlobalHandlers();
    this.setupCrashReporting();
  }

  setupGlobalHandlers() {
    // Uncaught exceptions
    process.on('uncaughtException', (error) => {
      this.handleCriticalError('Uncaught Exception', error);
    });

    // Unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      this.handleCriticalError('Unhandled Promise Rejection', {
        reason: reason,
        promise: promise.toString()
      });
    });

    // Electron-specific errors
    app.on('gpu-process-crashed', (event, killed) => {
      this.logError('GPU Process Crashed', { killed });
    });

    app.on('renderer-process-crashed', (event, webContents, killed) => {
      this.logError('Renderer Process Crashed', { killed });
      this.offerAppRestart('Renderer crashed');
    });
  }

  setupCrashReporting() {
    // Setup crash reporter for production builds
    if (!app.isPackaged) return;

    const { crashReporter } = require('electron');
    
    crashReporter.start({
      productName: 'Velvet AI Assistant',
      companyName: 'Velvet AI',
      submitURL: '', // We don't send crashes to external servers
      uploadToServer: false, // Keep crashes local for privacy
      ignoreSystemCrashHandler: false,
      rateLimit: true,
      compress: true
    });
  }

  logError(type, error, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      error: this.serializeError(error),
      context,
      version: app.getVersion(),
      platform: process.platform,
      arch: process.arch
    };

    // Add to memory log
    this.errorLog.push(logEntry);
    if (this.errorLog.length > this.maxLogEntries) {
      this.errorLog.shift();
    }

    // Write to file
    this.writeToLogFile(logEntry);

    console.error(`[${type}]`, error, context);
  }

  handleCriticalError(type, error) {
    this.logError(type, error, { critical: true });

    // Show user-friendly error dialog
    const errorMessage = this.getUserFriendlyMessage(error);
    
    dialog.showErrorBox(
      'Velvet encountered an issue',
      `${errorMessage}\n\nVelvet will attempt to recover automatically. If problems persist, please check the error log or restart the application.`
    );

    // Attempt recovery
    this.attemptRecovery(type, error);
  }

  getUserFriendlyMessage(error) {
    const message = error?.message || error?.toString() || 'Unknown error';

    // Common error patterns and user-friendly messages
    const errorMappings = [
      {
        pattern: /permission/i,
        message: 'Permission denied. Please check that Velvet has the required permissions in System Preferences.'
      },
      {
        pattern: /network|fetch|connection/i,
        message: 'Network connectivity issue. Please check your internet connection.'
      },
      {
        pattern: /file|directory|enoent/i,
        message: 'File system issue. Some files may be missing or inaccessible.'
      },
      {
        pattern: /port|address|bind/i,
        message: 'Service startup issue. Required ports may be in use by other applications.'
      },
      {
        pattern: /memory|heap/i,
        message: 'Memory issue. Try closing other applications and restarting Velvet.'
      }
    ];

    for (const mapping of errorMappings) {
      if (mapping.pattern.test(message)) {
        return mapping.message;
      }
    }

    return 'An unexpected error occurred. Velvet will attempt to recover automatically.';
  }

  async attemptRecovery(type, error) {
    console.log(`🔄 Attempting recovery for: ${type}`);

    try {
      // Service recovery strategies
      if (error?.message?.includes('service') || error?.message?.includes('connection')) {
        await this.recoverServices();
      }

      // Memory recovery
      if (error?.message?.includes('memory') || error?.message?.includes('heap')) {
        this.clearMemoryCaches();
      }

      // File system recovery
      if (error?.message?.includes('file') || error?.message?.includes('directory')) {
        await this.repairFileSystem();
      }

      console.log('✅ Recovery attempt completed');
    } catch (recoveryError) {
      console.error('❌ Recovery failed:', recoveryError);
      this.logError('Recovery Failed', recoveryError);
    }
  }

  async recoverServices() {
    console.log('🔄 Attempting service recovery...');

    try {
      // Get service manager if available
      const serviceManager = global.serviceManager;
      if (serviceManager) {
        console.log('Restarting services...');
        serviceManager.stopServices();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        await serviceManager.startServices();
        console.log('✅ Services restarted successfully');
      }
    } catch (error) {
      console.error('Service recovery failed:', error);
      throw error;
    }
  }

  clearMemoryCaches() {
    console.log('🔄 Clearing memory caches...');

    try {
      // Clear various caches
      if (global.gc) {
        global.gc();
      }

      // Clear brain context cache if available
      if (global.velvetBrainContext) {
        global.velvetBrainContext.clearCache?.();
      }

      console.log('✅ Memory caches cleared');
    } catch (error) {
      console.error('Memory cache clearing failed:', error);
    }
  }

  async repairFileSystem() {
    console.log('🔄 Checking file system...');

    try {
      const userDataPath = app.getPath('userData');
      
      // Ensure critical directories exist
      const requiredDirs = [
        path.join(userDataPath, 'logs'),
        path.join(userDataPath, 'cache'),
        path.join(userDataPath, 'feedback')
      ];

      for (const dir of requiredDirs) {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`Created missing directory: ${dir}`);
        }
      }

      console.log('✅ File system check completed');
    } catch (error) {
      console.error('File system repair failed:', error);
      throw error;
    }
  }

  offerAppRestart(reason) {
    const options = {
      type: 'warning',
      title: 'Velvet needs to restart',
      message: `${reason}.\n\nWould you like to restart Velvet now?`,
      buttons: ['Restart Now', 'Continue', 'Quit'],
      defaultId: 0,
      cancelId: 1
    };

    dialog.showMessageBox(null, options).then((result) => {
      switch (result.response) {
        case 0: // Restart
          app.relaunch();
          app.quit();
          break;
        case 1: // Continue
          // Do nothing, let user continue
          break;
        case 2: // Quit
          app.quit();
          break;
      }
    });
  }

  async showErrorReport() {
    const errorSummary = this.generateErrorSummary();
    
    const options = {
      type: 'info',
      title: 'Velvet Error Report',
      message: 'Recent error summary:',
      detail: errorSummary,
      buttons: ['OK', 'Open Log File', 'Send Feedback'],
      defaultId: 0
    };

    const result = await dialog.showMessageBox(null, options);
    
    switch (result.response) {
      case 1: // Open log file
        shell.showItemInFolder(this.logFilePath);
        break;
      case 2: // Send feedback
        // Trigger feedback system with error context
        if (global.mainWindow) {
          global.mainWindow.webContents.send('show-feedback-with-errors', this.errorLog.slice(-5));
        }
        break;
    }
  }

  generateErrorSummary() {
    if (this.errorLog.length === 0) {
      return 'No recent errors recorded.';
    }

    const recentErrors = this.errorLog.slice(-10);
    const errorCounts = {};

    recentErrors.forEach(entry => {
      const key = entry.type;
      errorCounts[key] = (errorCounts[key] || 0) + 1;
    });

    const summary = Object.entries(errorCounts)
      .map(([type, count]) => `${type}: ${count}`)
      .join('\n');

    return `Recent errors (last ${recentErrors.length}):\n\n${summary}\n\nLast error: ${recentErrors[recentErrors.length - 1]?.timestamp || 'N/A'}`;
  }

  writeToLogFile(logEntry) {
    try {
      const logLine = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(this.logFilePath, logLine);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  serializeError(error) {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }
    
    if (typeof error === 'object') {
      try {
        return JSON.parse(JSON.stringify(error));
      } catch {
        return error.toString();
      }
    }
    
    return error;
  }

  // Health check methods
  async performHealthCheck() {
    const health = {
      timestamp: new Date().toISOString(),
      services: {
        preprocWorker: false,
        captureService: false,
        mainProcess: true
      },
      memory: {
        used: process.memoryUsage(),
        system: require('os').totalmem() - require('os').freemem()
      },
      errors: {
        total: this.errorLog.length,
        recent: this.errorLog.filter(e => 
          Date.now() - new Date(e.timestamp).getTime() < 60000
        ).length
      }
    };

    // Check service health
    try {
      const response = await fetch('http://127.0.0.1:8001/health');
      health.services.preprocWorker = response.ok;
    } catch {
      health.services.preprocWorker = false;
    }

    // Check gRPC service (simplified check)
    const { exec } = require('child_process');
    health.services.captureService = await new Promise((resolve) => {
      exec('lsof -Pi :50051 -sTCP:LISTEN -t', (error, stdout) => {
        resolve(!!stdout.trim());
      });
    });

    return health;
  }

  getErrorStats() {
    return {
      totalErrors: this.errorLog.length,
      recentErrors: this.errorLog.filter(e => 
        Date.now() - new Date(e.timestamp).getTime() < 3600000 // Last hour
      ).length,
      errorTypes: [...new Set(this.errorLog.map(e => e.type))],
      lastError: this.errorLog[this.errorLog.length - 1] || null
    };
  }
}

module.exports = VelvetErrorHandler;