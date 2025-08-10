// Screen Intelligence - Pattern Recognition for Neurodivergent Support
const { screen, powerMonitor, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const { promisify } = require('util');
const { EventEmitter } = require('events');
const execAsync = promisify(exec);

class ScreenIntelligence extends EventEmitter {
  constructor() {
    super();
    this.isMonitoring = false;
    this.currentWindow = null;
    this.windowHistory = [];
    this.mousePosition = { x: 0, y: 0 };
    this.lastMouseMove = Date.now();
    this.appUsageTimer = new Map(); // Track time spent in each app
    this.tabSwitchCount = 0;
    this.tabSwitchWindow = 2 * 60 * 1000; // 2 minutes window
    this.tabSwitchHistory = [];
    
    // Pattern detection thresholds
    this.patterns = {
      hyperfocus: 45 * 60 * 1000, // 45 minutes in same app
      distractionSpiral: 10, // 10+ tab switches in 2 minutes
      taskAvoidance: 5, // Opening/closing same app 5+ times
      idleTime: 5 * 60 * 1000 // 5 minutes idle
    };
    
    this.eventListeners = new Map();
  }

  async startMonitoring() {
    if (this.isMonitoring) return;
    
    console.log('🔍 Starting screen intelligence monitoring...');
    this.isMonitoring = true;
    
    // Start monitoring intervals
    this.windowMonitorInterval = setInterval(() => this.checkActiveWindow(), 1000);
    this.mouseMonitorInterval = setInterval(() => this.checkMousePosition(), 500);
    this.patternAnalysisInterval = setInterval(() => this.analyzePatterns(), 30000); // Every 30s
    
    // Monitor system idle time
    powerMonitor.on('suspend', () => this.handleSystemSleep());
    powerMonitor.on('resume', () => this.handleSystemWake());
    
    console.log('✅ Screen intelligence monitoring started');
  }

  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    console.log('🛑 Stopping screen intelligence monitoring...');
    this.isMonitoring = false;
    
    if (this.windowMonitorInterval) clearInterval(this.windowMonitorInterval);
    if (this.mouseMonitorInterval) clearInterval(this.mouseMonitorInterval);
    if (this.patternAnalysisInterval) clearInterval(this.patternAnalysisInterval);
    
    console.log('✅ Screen intelligence monitoring stopped');
  }

  async checkActiveWindow() {
    try {
      let activeApp = null;
      
      // Platform-specific active window detection
      if (process.platform === 'darwin') {
        // macOS - use AppleScript
        const { stdout } = await execAsync(`
          osascript -e 'tell application "System Events" 
            set frontApp to name of first application process whose frontmost is true
            set windowTitle to ""
            try
              set windowTitle to name of front window of application process frontApp
            end try
            return frontApp & "|" & windowTitle
          end tell'
        `);
        
        const [appName, windowTitle] = stdout.trim().split('|');
        activeApp = { 
          name: appName, 
          title: windowTitle || '',
          timestamp: Date.now()
        };
        
      } else if (process.platform === 'win32') {
        // Windows - would need native module or powershell
        // For now, basic implementation
        activeApp = { 
          name: 'Unknown', 
          title: '', 
          timestamp: Date.now() 
        };
      }
      
      if (activeApp && activeApp.name !== this.currentWindow?.name) {
        this.handleWindowChange(activeApp);
      }
      
    } catch (error) {
      console.error('Error checking active window:', error);
    }
  }

  handleWindowChange(newWindow) {
    const now = Date.now();
    
    // Track time spent in previous window
    if (this.currentWindow) {
      const timeSpent = now - this.currentWindow.timestamp;
      const appName = this.currentWindow.name;
      
      if (this.appUsageTimer.has(appName)) {
        this.appUsageTimer.set(appName, this.appUsageTimer.get(appName) + timeSpent);
      } else {
        this.appUsageTimer.set(appName, timeSpent);
      }
    }
    
    // Update current window
    this.currentWindow = newWindow;
    this.windowHistory.push(newWindow);
    
    // Keep history manageable (last 100 windows)
    if (this.windowHistory.length > 100) {
      this.windowHistory = this.windowHistory.slice(-100);
    }
    
    // Detect tab switching in browsers
    if (this.isBrowserApp(newWindow.name)) {
      this.trackTabSwitch();
    }
    
    // Emit window change event
    this.emit('windowChange', newWindow);
    
    console.log(`📱 Window change: ${newWindow.name} - ${newWindow.title}`);
  }

  isBrowserApp(appName) {
    const browsers = ['Safari', 'Google Chrome', 'Firefox', 'Microsoft Edge', 'Arc', 'Brave Browser'];
    return browsers.some(browser => appName.includes(browser));
  }

  trackTabSwitch() {
    const now = Date.now();
    this.tabSwitchHistory.push(now);
    
    // Clean old switches outside the window
    this.tabSwitchHistory = this.tabSwitchHistory.filter(
      timestamp => now - timestamp <= this.tabSwitchWindow
    );
    
    this.tabSwitchCount = this.tabSwitchHistory.length;
  }

  checkMousePosition() {
    const currentPos = screen.getCursorScreenPoint();
    
    if (currentPos.x !== this.mousePosition.x || currentPos.y !== this.mousePosition.y) {
      this.mousePosition = currentPos;
      this.lastMouseMove = Date.now();
    }
  }

  analyzePatterns() {
    if (!this.isMonitoring) return;
    
    const now = Date.now();
    const patterns = [];
    
    // 1. Check for hyperfocus (45+ minutes in same app)
    if (this.currentWindow) {
      const timeInCurrentApp = now - this.currentWindow.timestamp;
      if (timeInCurrentApp >= this.patterns.hyperfocus) {
        patterns.push({
          type: 'hyperfocus',
          app: this.currentWindow.name,
          duration: timeInCurrentApp,
          message: "You're in the zone - amazing focus! Just a gentle check: have you moved your body in the last hour?"
        });
      }
    }
    
    // 2. Check for distraction spiral (rapid tab switching)
    if (this.tabSwitchCount >= this.patterns.distractionSpiral) {
      patterns.push({
        type: 'distractionSpiral',
        count: this.tabSwitchCount,
        window: this.tabSwitchWindow,
        message: "Lots of mental tabs open right now! Want to try a brain dump? Just list everything swirling around."
      });
    }
    
    // 3. Check for task avoidance (same app opened/closed repeatedly)
    const taskAvoidancePattern = this.detectTaskAvoidance();
    if (taskAvoidancePattern) {
      patterns.push(taskAvoidancePattern);
    }
    
    // 4. Check for idle time
    const idleTime = now - this.lastMouseMove;
    if (idleTime >= this.patterns.idleTime) {
      patterns.push({
        type: 'idle',
        duration: idleTime,
        message: "Taking a thinking break? Sometimes our best ideas come when we step away."
      });
    }
    
    // Emit detected patterns
    patterns.forEach(pattern => {
      this.emit('patternDetected', pattern);
      console.log(`🧠 Pattern detected: ${pattern.type}`, pattern);
    });
  }

  detectTaskAvoidance() {
    // Look for apps that have been opened/closed repeatedly in recent history
    const recentHistory = this.windowHistory.slice(-20); // Last 20 window changes
    const appCounts = {};
    
    recentHistory.forEach(window => {
      appCounts[window.name] = (appCounts[window.name] || 0) + 1;
    });
    
    // Find apps with high switch count
    for (const [appName, count] of Object.entries(appCounts)) {
      if (count >= this.patterns.taskAvoidance) {
        return {
          type: 'taskAvoidance',
          app: appName,
          count: count,
          message: `I see you opening ${appName} - it feels big, doesn't it? What if we just take one tiny step?`
        };
      }
    }
    
    return null;
  }

  handleSystemSleep() {
    console.log('💤 System going to sleep');
    this.emit('systemSleep');
  }

  handleSystemWake() {
    console.log('☀️ System waking up');
    this.emit('systemWake');
  }

  // Event system
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  emit(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // Get current stats
  getStats() {
    const now = Date.now();
    const currentSessionTime = this.currentWindow ? now - this.currentWindow.timestamp : 0;
    
    return {
      currentWindow: this.currentWindow,
      currentSessionTime,
      appUsage: Object.fromEntries(this.appUsageTimer),
      tabSwitchCount: this.tabSwitchCount,
      idleTime: now - this.lastMouseMove,
      windowHistory: this.windowHistory.slice(-10) // Last 10 windows
    };
  }
}

module.exports = ScreenIntelligence;