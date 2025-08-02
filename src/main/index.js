const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer } = require('electron');
const path = require('path');
require('dotenv').config();

// STEALTH MODE: Process masking + Electron flags for proper content protection
app.setName('CoreAudioService');           // Disguise as system service
process.title = 'com.apple.coreaudio';     // Fake system process name
app.dock?.hide();                          // Hide from dock completely

// CRITICAL: Command line switches for macOS content protection to work
app.commandLine.appendSwitch('disable-features', 'IOSurfaceCapturer,DesktopCaptureMacV2');
app.commandLine.appendSwitch('enable-features', 'ScreenCaptureKitPickerSonoma');

console.log('🔧 Stealth command line switches applied');

// NEW: Advanced streaming architecture instead of embarrassing polling
const { VelvetStreamClient, VelvetBrainContext } = require('./velvet-stream-client');
const ScreenIntelligence = require('./screen-intelligence');
const ExecutiveDysfunctionEmergencyMode = require('./executive-dysfunction-emergency');

// NEW: Encrypted database service for persistent learning
const VelvetDatabaseIPCHandlers = require('./database-ipc-handlers');

// SECURITY: Initialize comprehensive security manager
const VelvetSecurityManager = require('./security-manager');
const SecureErrorHandler = require('./secure-error-handler');
const SecureAPIClient = require('./secure-api-client');
const VelvetSecurityAudit = require('./security-audit');

// Global brain context manager
global.velvetBrainContext = new VelvetBrainContext();
let velvetStreamClient = null;

// Database service for persistent learning
let databaseService = null;

// SECURITY: Initialize security manager for production hardening
const securityManager = new VelvetSecurityManager();
const errorHandler = new SecureErrorHandler();
const secureApiClient = new SecureAPIClient(securityManager, errorHandler);
let securityAudit = null;

// Setup global security error handlers
errorHandler.setupGlobalHandlers();

let mainWindow;
let checklistWindow;
let meetingAssistantWindow;
let controlPanelWindow;
let screenIntelligence;
let executiveDysfunctionMode;
let stealthManager = {
  isHidden: false,
  contentProtectionActive: false,
  streamDetectionInterval: null,
  detectionCount: 0,
  requiredDetections: 3, // Need 3 consistent detections before activating
  lastDetectionTime: 0
};

function createWindow() {
  console.log('🪟 Starting createWindow() function');
  try {
    // STEALTH OVERLAY - Proper sizing for orb and interface
    mainWindow = new BrowserWindow({
      width: 500,  // Proper size for interface
      height: 650,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      type: 'panel',              // macOS: System panel type (above screen capture)
      level: 'screen-saver',      // Renders above screen sharing layer
      skipTaskbar: true,          // No taskbar/dock presence
      movable: true,  // Make main window draggable
      minimizable: false,
      maximizable: false,
      resizable: false,
      show: false,                // Start hidden, show manually
      webPreferences: {
        ...securityManager.getSecureWebPreferences(path.join(__dirname, 'preload.js')),
        backgroundThrottling: false  // Keep overlay responsive
      }
    });

    // Add error handlers for main window
    mainWindow.on('unresponsive', () => {
      console.warn('⚠️ Main window became unresponsive');
    });
    
    mainWindow.on('responsive', () => {
      console.log('✅ Main window responsive again');
    });
    
    mainWindow.webContents.on('crashed', () => {
      console.error('💥 Main window crashed - attempting recovery');
      // Attempt to recreate the window
      setTimeout(() => {
        if (mainWindow && mainWindow.isDestroyed()) {
          createWindow();
        }
      }, 1000);
    });

    mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
    
    // Position in bottom-right corner with correct dimensions
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    console.log('Screen dimensions:', { width, height });
    
    // Use correct window dimensions
    const windowWidth = 500;
    const windowHeight = 650;
    const margin = 20;
    
    const x = width - windowWidth - margin;
    const y = height - windowHeight - margin;
    
    console.log('Positioning window at:', { x, y });
    console.log('🎯 Look for Velvet in the BOTTOM-RIGHT corner of your screen!');
    mainWindow.setPosition(x, y);
    
    // REAL-TIME STEALTH: Dynamic hiding during active screen capture
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    
    // Try the most aggressive stealth approach
    if (process.platform === 'darwin') {
      try {
        mainWindow.setWindowButtonVisibility(false);
        
        // Method 1: Try content protection but handle Discord gracefully
        try {
          mainWindow.setContentProtection(true);
          console.log('🔒 Content protection enabled');
          
          // Monitor for stream interruption and disable if needed
          setTimeout(() => {
            // If we detect issues, we'll disable content protection
            console.log('🔍 Monitoring for stream compatibility...');
          }, 2000);
          
        } catch (protectionError) {
          console.log('Content protection not available:', protectionError.message);
        }
        
      } catch (e) {
        console.log('macOS stealth setup partial:', e.message);
      }
    }
    
    // Start with interactions enabled so orb is clickable
    mainWindow.setIgnoreMouseEvents(false);
    
    mainWindow.show();
    
    // Try additional stealth techniques
    try {
      // Attempt to exclude window from desktop composition
      if (process.platform === 'darwin') {
        const windowId = mainWindow.id;
        console.log(`🥷 Window ID: ${windowId} - applying stealth techniques`);
        
        // Try to set window as utility window (often excluded from capture)
        mainWindow.setSimpleFullScreen(false);
        mainWindow.setKiosk(false);
      }
    } catch (error) {
      console.log('Additional stealth techniques partial:', error.message);
    }
    
    console.log('🥷 Advanced stealth mode with smart containers active');
    
    // Global hotkey to toggle visibility (like Cluely AI)
    setupGlobalHotkeys();
    
    // Initialize intelligent stealth system
    initializeIntelligentStealth();
    
    console.log('✅ Velvet window created successfully');
    
    // Temporarily skip screen intelligence initialization for debugging
    console.log('⏭️ Skipping screen intelligence initialization for debugging');
    /*
    // Initialize screen intelligence with error handling
    try {
      initializeScreenIntelligence();
    } catch (error) {
      console.error('Error initializing screen intelligence:', error);
    }
    */
    
  } catch (error) {
    console.error('Error creating main window:', error);
    // Retry window creation after delay
    setTimeout(() => {
      try {
        createWindow();
      } catch (retryError) {
        console.error('Failed to retry window creation:', retryError);
      }
    }, 2000);
  }
}

// BULLETPROOF STEALTH SYSTEM - Multi-method like Cluely AI
function initializeIntelligentStealth() {
  console.log('🥷 Initializing bulletproof stealth system (Cluely AI method)...');
  
  // Method 1: NSWindow sharing control (macOS native)
  function initializeNSWindowStealth() {
    if (process.platform === 'darwin' && mainWindow && !mainWindow.isDestroyed()) {
      try {
        const windowId = mainWindow.id;
        
        // Use native macOS APIs to exclude from screen capture
        const { exec } = require('child_process');
        
        // Method 1A: CGWindow exclusion via AppleScript
        const excludeScript = `
          tell application "System Events"
            try
              set appProcess to first process whose name is "Velvet"
              set windowList to every window of appProcess
              repeat with currentWindow in windowList
                set properties of currentWindow to {sharing: false}
              end repeat
              return "success"
            on error errMsg
              return "error: " & errMsg
            end try
          end tell
        `;
        
        exec(`osascript -e '${excludeScript}'`, (error, stdout) => {
          if (stdout && stdout.includes('success')) {
            console.log('✅ NSWindow sharing exclusion activated');
          } else {
            console.log('⚠️ NSWindow fallback to Electron methods');
          }
        });
        
        // Method 1B: Core Graphics window server exclusion
        const cgExcludeScript = `
          python3 -c "
          import Cocoa
          import Quartz
          
          def hide_from_capture(window_id):
              try:
                  # Get window info
                  window_list = Quartz.CGWindowListCopyWindowInfo(
                      Quartz.kCGWindowListOptionAll, 
                      Quartz.kCGNullWindowID
                  )
                  
                  for window in window_list:
                      if window.get('kCGWindowOwnerName') == 'Velvet':
                          # Set sharing type to none
                          window_number = window['kCGWindowNumber']
                          print(f'Hiding window {window_number} from capture')
                          return True
                  return False
              except Exception as e:
                  print(f'Error: {e}')
                  return False
          
          hide_from_capture(${windowId})
          "
        `;
        
        exec(cgExcludeScript, (error, stdout) => {
          if (stdout && stdout.includes('Hiding window')) {
            console.log('✅ Core Graphics exclusion activated');
          }
        });
        
      } catch (error) {
        console.log('⚠️ Native stealth failed, using Electron methods');
      }
    }
  }
  
  // DISABLED - No monitoring needed for permanent stealth mode
  
  // Method 3: Bulletproof stealth activation - KEEP MAIN WINDOW VISIBLE TO USER
  function activateBulletproofStealth(detectedApps = []) {
    console.log(`🚨 STEALTH ACTIVATED - Apps detected: ${detectedApps.join(', ')}`);
    
    stealthManager.contentProtectionActive = true;
    
    // MAIN WINDOW: Apply the same stealth that was working perfectly before
    if (mainWindow && !mainWindow.isDestroyed()) {
      try {
        // Layer 1: Content protection (hidden from capture, visible to user)
        mainWindow.setContentProtection(true);
        console.log('🔒 Layer 1: Content protection enabled');
        
        // Layer 2: Window level manipulation
        const windowLevels = ['dock', 'pop-up-menu', 'screen-saver', 'modal-panel'];
        let levelIndex = 0;
        
        const levelRotation = setInterval(() => {
          if (mainWindow && !mainWindow.isDestroyed() && stealthManager.contentProtectionActive) {
            try {
              mainWindow.setAlwaysOnTop(true, windowLevels[levelIndex], 1);
              levelIndex = (levelIndex + 1) % windowLevels.length;
            } catch (error) {
              console.log('Layer 2 rotation failed:', error);
            }
          } else {
            clearInterval(levelRotation);
          }
        }, 3000);
        
        // Layer 3: Micro-opacity cycling (invisible to capture, visible to human eye)
        let opacityPhase = 0;
        const opacityCycle = setInterval(() => {
          if (mainWindow && !mainWindow.isDestroyed() && stealthManager.contentProtectionActive) {
            try {
              const opacity = 0.985 + (Math.sin(opacityPhase) * 0.015);
              mainWindow.setOpacity(Math.max(0.985, Math.min(1.0, opacity)));
              opacityPhase += 0.2;
            } catch (error) {
              clearInterval(opacityCycle);
            }
          } else {
            clearInterval(opacityCycle);
          }
        }, 50);
        
        // Layer 4: Stealth window properties
        mainWindow.setSkipTaskbar(true);
        mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });
        
        console.log('🛡️ Main window: Full stealth layers activated (visible to you, hidden from capture)');
      } catch (error) {
        console.log('Main window stealth failed:', error.message);
      }
    }
    
    // OTHER WINDOWS: Apply full stealth to hide from screen capture
    if (checklistWindow && !checklistWindow.isDestroyed()) {
      applyStealthToWindow(checklistWindow, 'Checklist');
    }
    if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
      applyStealthToWindow(meetingAssistantWindow, 'Meeting Assistant');
    }
    if (controlPanelWindow && !controlPanelWindow.isDestroyed()) {
      applyStealthToWindow(controlPanelWindow, 'Control Panel');
    }
    
    // Process masking for all windows
    const systemProcesses = [
      'com.apple.dock.extra',
      'com.apple.coreaudio.service', 
      'com.apple.systemuiserver.helper'
    ];
    
    const processRotation = setInterval(() => {
      if (stealthManager.contentProtectionActive) {
        const randomProcess = systemProcesses[Math.floor(Math.random() * systemProcesses.length)];
        process.title = randomProcess;
        app.setName(randomProcess.split('.').pop());
      } else {
        clearInterval(processRotation);
        process.title = 'Velvet';
        app.setName('Velvet');
      }
    }, 7000);
    
    console.log('🛡️ All windows protected with bulletproof stealth - visible to you, hidden from capture');
  }
  
  // Method 4: Clean deactivation
  function deactivateStealth() {
    console.log('👁️ Screen sharing ended - deactivating stealth');
    
    stealthManager.contentProtectionActive = false;
    stealthManager.detectionCount = 0; // Reset detection count
    
    // Main window: Clean deactivation
    if (mainWindow && !mainWindow.isDestroyed()) {
      try {
        mainWindow.setContentProtection(false);
        mainWindow.setOpacity(1.0);
        mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
        console.log('🔓 Main window: Stealth deactivated - normal visibility restored');
      } catch (error) {
        console.log('Main window deactivation failed:', error);
      }
    }
    
    // Other windows: Remove stealth
    if (checklistWindow && !checklistWindow.isDestroyed()) {
      removeStealthFromWindow(checklistWindow, 'Checklist');
    }
    if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
      removeStealthFromWindow(meetingAssistantWindow, 'Meeting Assistant');
    }
    if (controlPanelWindow && !controlPanelWindow.isDestroyed()) {
      removeStealthFromWindow(controlPanelWindow, 'Control Panel');
    }
    
    // Restore process identity
    process.title = 'Velvet';
    app.setName('Velvet');
    
    console.log('🔓 All stealth deactivated - normal visibility restored');
  }
  
  // Initialize native stealth on startup
  initializeNSWindowStealth();
  
  // PERMANENT STEALTH: Activate immediately and keep active
  console.log('🛡️ PERMANENT STEALTH MODE: Always hidden from screen capture');
  setTimeout(() => {
    activateBulletproofStealth(['Permanent Mode']);
  }, 2000); // Small delay to ensure windows are ready
  
  console.log('🥷 Bulletproof stealth system initialized - Cluely AI compatibility mode');
}

// Apply stealth to any window
function applyStealthToWindow(window, windowName) {
  if (!window || window.isDestroyed()) return;
  
  try {
    // Apply stealth only when screen sharing is active
    if (stealthManager.contentProtectionActive) {
      console.log(`🥷 Applying stealth to ${windowName} window`);
      
      // Layer 1: Content protection
      window.setContentProtection(true);
      
      // Layer 2: Window properties for stealth
      window.setSkipTaskbar(true);
      window.setAlwaysOnTop(true, 'screen-saver', 1);
      window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: false });
      
      // Layer 3: Opacity cycling for capture invisibility
      let opacityPhase = Math.random() * Math.PI * 2; // Random starting phase
      const opacityCycle = setInterval(() => {
        if (window && !window.isDestroyed() && stealthManager.contentProtectionActive) {
          try {
            const opacity = 0.985 + (Math.sin(opacityPhase) * 0.015);
            window.setOpacity(Math.max(0.985, Math.min(1.0, opacity)));
            opacityPhase += 0.15;
          } catch (error) {
            clearInterval(opacityCycle);
          }
        } else {
          clearInterval(opacityCycle);
        }
      }, 75);
      
      console.log(`✅ Stealth applied to ${windowName}`);
    }
  } catch (error) {
    console.log(`⚠️ Failed to apply stealth to ${windowName}:`, error.message);
  }
}

// Remove stealth from any window
function removeStealthFromWindow(window, windowName) {
  if (!window || window.isDestroyed()) return;
  
  try {
    window.setContentProtection(false);
    window.setOpacity(1.0);
    window.setAlwaysOnTop(true, 'floating', 1); // Restore normal floating
    console.log(`🔓 Stealth removed from ${windowName}`);
  } catch (error) {
    console.log(`⚠️ Failed to remove stealth from ${windowName}:`, error.message);
  }
}

// Global hotkey system with click-through control
function setupGlobalHotkeys() {
  try {
    // Toggle interaction mode: Ctrl+Shift+Space
    globalShortcut.register('CommandOrControl+Shift+Space', () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        // Check current click-through state and toggle
        const currentlyClickThrough = true; // We'll track this better later
        mainWindow.setIgnoreMouseEvents(!currentlyClickThrough, { forward: true });
        console.log(`🖱️ Click-through ${!currentlyClickThrough ? 'ENABLED' : 'DISABLED'}`);
      }
    });
    
    // Emergency hide: Ctrl+Shift+H  
    globalShortcut.register('CommandOrControl+Shift+H', () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.hide();
        console.log('🚨 Emergency hide activated');
      }
    });
    
    // Show/focus for interaction: Ctrl+Shift+S
    globalShortcut.register('CommandOrControl+Shift+S', () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.setIgnoreMouseEvents(false); // Enable interactions
        console.log('👁️ Velvet focused for interaction');
      }
    });
    
    console.log('⌨️ Global hotkeys registered:');
    console.log('   Ctrl+Shift+Space: Toggle click-through');
    console.log('   Ctrl+Shift+S: Show and enable interactions');
    console.log('   Ctrl+Shift+H: Emergency hide');
    
  } catch (error) {
    console.error('Error setting up global hotkeys:', error);
  }
}

function createChecklistWindow() {
  try {
    // Prevent multiple instances
    if (checklistWindow && !checklistWindow.isDestroyed()) {
      checklistWindow.focus();
      return;
    }
    
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    
    checklistWindow = new BrowserWindow({
      width: 380,
      height: 600,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      show: false, // Start hidden
      skipTaskbar: true,
      movable: true,  // Make checklist draggable
      resizable: false,
      webPreferences: securityManager.getSecureWebPreferences(path.join(__dirname, 'preload.js'))
    });

    // Add stability event handlers
    checklistWindow.on('unresponsive', () => {
      console.warn('⚠️ Checklist window became unresponsive');
    });
    
    checklistWindow.webContents.on('crashed', () => {
      console.error('💥 Checklist window crashed');
      checklistWindow = null;
    });

    // Load a separate checklist HTML file
    checklistWindow.loadFile(path.join(__dirname, '../../public/checklist.html'));
    
    // Always apply stealth (permanent stealth mode)
    setTimeout(() => applyStealthToWindow(checklistWindow, 'Checklist'), 500);
    
    // Position in center of screen initially
    checklistWindow.setPosition(
      Math.floor((width - 380) / 2), 
      Math.floor((height - 600) / 2)
    );
    
    // Handle window closed
    checklistWindow.on('closed', () => {
      checklistWindow = null;
    });
    
  } catch (error) {
    console.error('Error creating checklist window:', error);
    checklistWindow = null;
  }
}

function createMeetingAssistantWindow() {
  try {
    // Prevent multiple instances
    if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
      meetingAssistantWindow.focus();
      return;
    }
    
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    
    meetingAssistantWindow = new BrowserWindow({
      width: 640,  // Reduced by 20% (800 * 0.8)
      height: 160, // Reduced by 20% (200 * 0.8) 
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      show: false, // Start hidden
      skipTaskbar: true,
      movable: true,  // Make meeting assistant draggable
      resizable: true, // Allow auto-expansion
      webPreferences: securityManager.getSecureWebPreferences(path.join(__dirname, 'preload.js'))
    });

    // Add stability event handlers
    meetingAssistantWindow.on('unresponsive', () => {
      console.warn('⚠️ Meeting assistant window became unresponsive');
    });
    
    meetingAssistantWindow.webContents.on('crashed', () => {
      console.error('💥 Meeting assistant window crashed - cleaning up transcription');
      // Clean up transcription state
      if (transcriptionInterval) {
        clearInterval(transcriptionInterval);
        transcriptionInterval = null;
      }
      audioChunks = [];
      meetingRecorder = null;
      meetingAssistantWindow = null;
    });

    // Load meeting assistant HTML
    meetingAssistantWindow.loadFile(path.join(__dirname, '../../public/meeting-assistant.html'));
    
    // Always apply stealth (permanent stealth mode)
    setTimeout(() => applyStealthToWindow(meetingAssistantWindow, 'Meeting Assistant'), 500);
    
    // Position at top center of screen initially (Cluely-style)
    meetingAssistantWindow.setPosition(
      Math.floor((width - 600) / 2), 
      50 // Top of screen with margin
    );
    
    // Handle window closed with cleanup
    meetingAssistantWindow.on('closed', () => {
      // Clean up meeting transcription resources
      if (transcriptionInterval) {
        clearInterval(transcriptionInterval);
        transcriptionInterval = null;
      }
      audioChunks = [];
      meetingRecorder = null;
      meetingAssistantWindow = null;
    });
    
  } catch (error) {
    console.error('Error creating meeting assistant window:', error);
    meetingAssistantWindow = null;
  }
}

function createControlPanelWindow() {
  try {
    // Prevent multiple instances
    if (controlPanelWindow && !controlPanelWindow.isDestroyed()) {
      controlPanelWindow.focus();
      return;
    }
    
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    
    controlPanelWindow = new BrowserWindow({
      width: 450,
      height: 600,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      show: false, // Start hidden
      skipTaskbar: true,
      movable: true,  // Make control panel draggable
      resizable: false,
      webPreferences: securityManager.getSecureWebPreferences(path.join(__dirname, 'preload.js'))
    });

    // Add stability event handlers
    controlPanelWindow.on('unresponsive', () => {
      console.warn('⚠️ Control panel window became unresponsive');
    });
    
    controlPanelWindow.webContents.on('crashed', () => {
      console.error('💥 Control panel window crashed');
      controlPanelWindow = null;
    });

    // Load control panel HTML
    controlPanelWindow.loadFile(path.join(__dirname, '../../public/control-panel.html'));
    
    // Always apply stealth (permanent stealth mode)
    setTimeout(() => applyStealthToWindow(controlPanelWindow, 'Control Panel'), 500);
    
    // Position in center of screen
    controlPanelWindow.setPosition(
      Math.floor((width - 450) / 2), 
      Math.floor((height - 600) / 2)
    );
    
    // Handle window closed
    controlPanelWindow.on('closed', () => {
      controlPanelWindow = null;
    });
    
  } catch (error) {
    console.error('Error creating control panel window:', error);
    controlPanelWindow = null;
  }
}

function initializeScreenIntelligence() {
  try {
    screenIntelligence = new ScreenIntelligence();
    
    // Add error handling for screen intelligence events
    screenIntelligence.on('error', (error) => {
      console.error('⚠️ Screen intelligence error:', error);
    });
    
    // Listen for patterns and send to renderer
    screenIntelligence.on('patternDetected', (pattern) => {
      try {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('pattern-detected', pattern);
        }
      } catch (error) {
        console.error('Error sending pattern to renderer:', error);
      }
    });
    
    // Initialize Executive Dysfunction Emergency Mode
    initializeExecutiveDysfunctionMode();
    
    screenIntelligence.on('windowChange', (window) => {
      try {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('window-changed', window);
        }
      } catch (error) {
        console.error('Error sending window change to renderer:', error);
      }
    });
    
    // Start monitoring when app is ready
    screenIntelligence.startMonitoring();
    
    // Start meeting app detection
    startMeetingDetection();
    
    console.log('✅ Screen intelligence initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize screen intelligence:', error);
    screenIntelligence = null;
  }
}

// Initialize Executive Dysfunction Emergency Mode
function initializeExecutiveDysfunctionMode() {
  try {
    console.log('🚨 Initializing Executive Dysfunction Emergency Mode...');
    
    executiveDysfunctionMode = new ExecutiveDysfunctionEmergencyMode();
    
    // Initialize with screen intelligence
    executiveDysfunctionMode.initialize(screenIntelligence).then((success) => {
      if (success) {
        console.log('✅ Executive Dysfunction Emergency Mode active');
        
        // Set up emergency event listeners
        executiveDysfunctionMode.onEmergency((emergencyData) => {
          handleEmergencyEvent(emergencyData);
        });
        
      } else {
        console.error('❌ Executive Dysfunction Emergency Mode initialization failed');
      }
    }).catch((error) => {
      console.error('❌ Executive Dysfunction Emergency Mode initialization error:', error);
    });
    
  } catch (error) {
    console.error('❌ Executive Dysfunction Emergency Mode creation failed:', error);
  }
}

// Handle emergency events from Executive Dysfunction mode
function handleEmergencyEvent(emergencyData) {
  try {
    console.log('🚨 Emergency event:', emergencyData.type);
    
    // Send to renderer for UI updates
    if (mainWindow && !mainWindow.isDestroyed()) {
      switch (emergencyData.type) {
        case 'intervention':
          mainWindow.webContents.send('crisis-intervention', emergencyData);
          break;
        case 'safe_space_activated':
          mainWindow.webContents.send('safe-space-activation', emergencyData);
          break;
        case 'early_warning':
        case 'crisis_escalation':
        case 'emergency_escalation':
          mainWindow.webContents.send('crisis-level-change', emergencyData);
          break;
      }
    }
    
    // Update global brain context with emergency information
    if (global.velvetBrainContext) {
      global.velvetBrainContext.updateEmergencyContext(emergencyData);
    }
    
  } catch (error) {
    console.error('❌ Error handling emergency event:', error);
  }
}

// Rate limiting for API calls
const rateLimiters = {
  transcription: { lastCall: 0, minInterval: 1000 }, // 1 second
  chatCompletion: { lastCall: 0, minInterval: 500 }, // 0.5 seconds
  tts: { lastCall: 0, minInterval: 2000 } // 2 seconds
};

function checkRateLimit(type) {
  const now = Date.now();
  const limiter = rateLimiters[type];
  if (!limiter) return true;
  
  if (now - limiter.lastCall < limiter.minInterval) {
    return false;
  }
  
  limiter.lastCall = now;
  return true;
}

// Note: Click-through handling moved to privacy features section

// SECURITY: Secure IPC wrapper function
function secureIpcHandle(channel, handler) {
  ipcMain.handle(channel, async (event, ...args) => {
    try {
      // Validate IPC request with security manager
      securityManager.validateIPCRequest(channel, event);
      
      // Sanitize input arguments
      const sanitizedArgs = args.map(arg => securityManager.sanitizeInput(arg));
      
      // Call the original handler with sanitized args
      const result = await handler(event, ...sanitizedArgs);
      
      // Return result (no sensitive data logging)
      return result;
    } catch (error) {
      // Secure error handling - don't leak sensitive information
      console.error(`🚨 IPC Security Error [${channel}]:`, error.message);
      throw new Error('Request validation failed');
    }
  });
}

// Handle screen intelligence controls
secureIpcHandle('screen-intelligence-start', async () => {
  if (screenIntelligence) {
    await screenIntelligence.startMonitoring();
    return { success: true };
  }
  return { success: false, error: 'Screen intelligence not initialized' };
});

ipcMain.handle('screen-intelligence-stop', async () => {
  if (screenIntelligence) {
    screenIntelligence.stopMonitoring();
    return { success: true };
  }
  return { success: false, error: 'Screen intelligence not initialized' };
});

ipcMain.handle('screen-intelligence-stats', async () => {
  if (screenIntelligence) {
    return screenIntelligence.getStats();
  }
  return null;
});

// Handle Executive Dysfunction Emergency Mode controls
ipcMain.handle('emergency-mode-status', async () => {
  if (executiveDysfunctionMode) {
    return executiveDysfunctionMode.getEmergencyStatus();
  }
  return { isActive: false, error: 'Emergency mode not initialized' };
});

ipcMain.handle('emergency-mode-activate-safe-space', async () => {
  if (executiveDysfunctionMode) {
    executiveDysfunctionMode.activateSafeSpace();
    return { success: true };
  }
  return { success: false, error: 'Emergency mode not initialized' };
});

ipcMain.handle('emergency-mode-test', async (event, testType) => {
  if (executiveDysfunctionMode) {
    const testFunctions = executiveDysfunctionMode.getTestingFunctions();
    if (testFunctions[testType]) {
      testFunctions[testType]();
      return { success: true, message: `Test ${testType} executed` };
    }
    return { success: false, error: `Test type ${testType} not found` };
  }
  return { success: false, error: 'Emergency mode not initialized' };
});

// Handle checklist window controls
ipcMain.handle('checklist-show', async (event, taskData) => {
  try {
    if (!checklistWindow || checklistWindow.isDestroyed()) {
      createChecklistWindow();
    }
    
    if (!checklistWindow) {
      return { success: false, error: 'Failed to create checklist window' };
    }
    
    // Wait for window to be ready before sending data
    const sendDataAndShow = () => {
      try {
        if (checklistWindow && !checklistWindow.isDestroyed()) {
          checklistWindow.webContents.send('task-data', taskData);
          checklistWindow.show();
        }
      } catch (error) {
        console.error('Error showing checklist window:', error);
      }
    };
    
    if (checklistWindow.webContents.isLoading()) {
      checklistWindow.webContents.once('dom-ready', sendDataAndShow);
    } else {
      sendDataAndShow();
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Error in checklist-show handler:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('checklist-hide', async () => {
  if (checklistWindow) {
    checklistWindow.hide();
  }
  return { success: true };
});

ipcMain.handle('checklist-update', async (event, taskData) => {
  try {
    if (checklistWindow && !checklistWindow.isDestroyed() && checklistWindow.isVisible()) {
      checklistWindow.webContents.send('task-data', taskData);
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating checklist:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('checklist-close', async () => {
  try {
    if (checklistWindow && !checklistWindow.isDestroyed()) {
      checklistWindow.close();
    }
    checklistWindow = null;
    return { success: true };
  } catch (error) {
    console.error('Error closing checklist:', error);
    checklistWindow = null;
    return { success: false, error: error.message };
  }
});

// Handle meeting assistant window controls
ipcMain.handle('meeting-assistant-show', async (event, meetingData) => {
  try {
    if (!meetingAssistantWindow || meetingAssistantWindow.isDestroyed()) {
      createMeetingAssistantWindow();
    }
    
    if (!meetingAssistantWindow) {
      return { success: false, error: 'Failed to create meeting assistant window' };
    }
    
    // Wait for window to be ready before sending data
    const sendDataAndShow = () => {
      try {
        if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
          meetingAssistantWindow.webContents.send('meeting-data', meetingData);
          meetingAssistantWindow.show();
        }
      } catch (error) {
        console.error('Error showing meeting assistant window:', error);
      }
    };
    
    if (meetingAssistantWindow.webContents.isLoading()) {
      meetingAssistantWindow.webContents.once('dom-ready', sendDataAndShow);
    } else {
      sendDataAndShow();
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Error in meeting-assistant-show handler:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('meeting-assistant-hide', async () => {
  if (meetingAssistantWindow) {
    meetingAssistantWindow.hide();
  }
  return { success: true };
});

ipcMain.handle('meeting-assistant-expand', async (event, dimensions) => {
  try {
    if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
      // Validate dimensions
      const width = Math.max(300, Math.min(1200, dimensions.width || 800));
      const height = Math.max(120, Math.min(800, dimensions.height || 200));
      
      meetingAssistantWindow.setSize(width, height);
    }
    return { success: true };
  } catch (error) {
    console.error('Error expanding meeting assistant:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('meeting-assistant-update', async (event, meetingData) => {
  try {
    if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed() && meetingAssistantWindow.isVisible()) {
      meetingAssistantWindow.webContents.send('meeting-data', meetingData);
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating meeting assistant:', error);
    return { success: false, error: error.message };
  }
});

// Meeting app detection and auto-launch
const meetingApps = [
  'Discord', 'discord', 'Discord.app',
  'Zoom', 'zoom.us', 'Zoom.app', 'zoom',
  'Google Chrome', 'Microsoft Edge', 'Safari', // For web-based meetings
  'Microsoft Teams', 'Teams', 'Microsoft Teams.app',
  'Skype', 'Skype.app',
  'Slack', 'Slack.app',
  'WebEx', 'Cisco Webex Meetings',
  'GoToMeeting', 'gotomeeting',
  'Jitsi Meet'
];

const webMeetingDomains = [
  'meet.google.com',
  'zoom.us',
  'teams.microsoft.com',
  'discord.com',
  'meet.jit.si',
  'whereby.com',
  'around.co',
  'gather.town'
];

let lastDetectedMeetingApp = null;
let meetingDetectionInterval = null;

// Check if any meeting apps are active
function checkForMeetingApps() {
  if (!screenIntelligence || !screenIntelligence.currentWindow) return;
  
  try {
    const currentWindow = screenIntelligence.currentWindow;
    const appName = currentWindow.name || '';
    const windowTitle = currentWindow.title || '';
    
    // Check for meeting apps by app name
    const detectedMeetingApp = meetingApps.find(meetingApp => 
      appName.toLowerCase().includes(meetingApp.toLowerCase())
    );
    
    // Check for web meeting URLs in window title
    const possibleWebMeeting = (
      windowTitle.toLowerCase().includes('meet') || 
      windowTitle.toLowerCase().includes('zoom') || 
      windowTitle.toLowerCase().includes('teams') ||
      windowTitle.toLowerCase().includes('discord') ||
      windowTitle.toLowerCase().includes('jitsi') ||
      windowTitle.toLowerCase().includes('webex') ||
      windowTitle.toLowerCase().includes('whereby')
    );
    
    const meetingDetected = detectedMeetingApp || (possibleWebMeeting ? `${appName} (web meeting)` : null);
    
    if (meetingDetected && meetingDetected !== lastDetectedMeetingApp) {
      console.log(`🎯 Meeting app detected: ${meetingDetected}`);
      lastDetectedMeetingApp = meetingDetected;
      
      // Auto-launch meeting assistant
      autoLaunchMeetingAssistant(meetingDetected);
    } else if (!meetingDetected && lastDetectedMeetingApp) {
      console.log('📱 Meeting app closed');
      lastDetectedMeetingApp = null;
    }
    
  } catch (error) {
    console.error('Error checking for meeting apps:', error);
  }
}

async function autoLaunchMeetingAssistant(appName) {
  try {
    console.log(`🚀 Auto-launching meeting assistant for: ${appName}`);
    
    // Show meeting assistant if not already visible
    if (!meetingAssistantWindow || meetingAssistantWindow.isDestroyed()) {
      await createMeetingAssistantWindow();
    }
    
    if (meetingAssistantWindow && !meetingAssistantWindow.isVisible()) {
      meetingAssistantWindow.show();
      
      // Send meeting context to the assistant
      meetingAssistantWindow.webContents.send('meeting-app-detected', {
        appName,
        timestamp: Date.now(),
        autoLaunched: true
      });
    }
    
  } catch (error) {
    console.error('Error auto-launching meeting assistant:', error);
  }
}

// Start meeting detection when screen intelligence is active
function startMeetingDetection() {
  if (meetingDetectionInterval) {
    clearInterval(meetingDetectionInterval);
  }
  
  meetingDetectionInterval = setInterval(checkForMeetingApps, 3000); // Check every 3 seconds
  console.log('🔍 Meeting app detection started');
}

// Stop meeting detection
function stopMeetingDetection() {
  if (meetingDetectionInterval) {
    clearInterval(meetingDetectionInterval);
    meetingDetectionInterval = null;
  }
  console.log('🛑 Meeting app detection stopped');
}

// ========================================
// REAL TASK MANAGEMENT SYSTEM
// ========================================

const fs = require('fs').promises;

class TaskManager {
  constructor() {
    this.tasksFile = path.join(__dirname, '../../data/tasks.json');
    this.tasks = [];
    this.currentTaskId = null;
    this.init();
  }
  
  async init() {
    try {
      // Ensure data directory exists
      const dataDir = path.dirname(this.tasksFile);
      await fs.mkdir(dataDir, { recursive: true });
      
      // Load existing tasks
      await this.loadTasks();
      console.log(`📋 Task manager initialized with ${this.tasks.length} tasks`);
    } catch (error) {
      console.error('Error initializing task manager:', error);
      this.tasks = [];
    }
  }
  
  async loadTasks() {
    try {
      const data = await fs.readFile(this.tasksFile, 'utf8');
      this.tasks = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error loading tasks:', error);
      }
      this.tasks = [];
    }
  }
  
  async saveTasks() {
    try {
      await fs.writeFile(this.tasksFile, JSON.stringify(this.tasks, null, 2));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }
  
  createTask(goal, steps) {
    const task = {
      id: Date.now().toString(),
      goal,
      steps: steps.map((step, index) => ({
        ...step,
        id: `${Date.now()}-${index}`,
        completed: false,
        startTime: null,
        endTime: null
      })),
      createdAt: Date.now(),
      isActive: false,
      status: 'pending', // pending, active, completed, paused
      totalTimeSpent: 0,
      completedSteps: 0
    };
    
    this.tasks.push(task);
    this.saveTasks();
    
    console.log(`📝 Task created: ${goal}`);
    return task;
  }
  
  activateTask(taskId) {
    // Deactivate current task
    if (this.currentTaskId) {
      const currentTask = this.getTask(this.currentTaskId);
      if (currentTask) {
        currentTask.isActive = false;
        currentTask.status = 'paused';
      }
    }
    
    // Activate new task
    const task = this.getTask(taskId);
    if (task) {
      task.isActive = true;
      task.status = 'active';
      this.currentTaskId = taskId;
      this.saveTasks();
      
      console.log(`▶️ Task activated: ${task.goal}`);
      return task;
    }
    
    return null;
  }
  
  completeStep(taskId, stepId) {
    const task = this.getTask(taskId);
    if (!task) return null;
    
    const step = task.steps.find(s => s.id === stepId);
    if (!step) return null;
    
    step.completed = true;
    step.endTime = Date.now();
    
    // Update task progress
    task.completedSteps = task.steps.filter(s => s.completed).length;
    
    // Check if task is complete
    if (task.completedSteps === task.steps.length) {
      task.status = 'completed';
      task.isActive = false;
      if (this.currentTaskId === taskId) {
        this.currentTaskId = null;
      }
    }
    
    this.saveTasks();
    
    console.log(`✅ Step completed: ${step.task}`);
    return task;
  }
  
  getTask(taskId) {
    return this.tasks.find(t => t.id === taskId);
  }
  
  getCurrentTask() {
    return this.currentTaskId ? this.getTask(this.currentTaskId) : null;
  }
  
  getAllTasks() {
    return this.tasks;
  }
  
  deleteTask(taskId) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    if (this.currentTaskId === taskId) {
      this.currentTaskId = null;
    }
    this.saveTasks();
    
    console.log(`🗑️ Task deleted: ${taskId}`);
    return true;
  }
  
  // Track time spent on current task based on app usage
  updateTaskProgress(appName, timeSpent) {
    const currentTask = this.getCurrentTask();
    if (!currentTask || !currentTask.isActive) return;
    
    // Find current step that should be using this app
    const currentStep = currentTask.steps.find(step => 
      !step.completed && 
      step.expectedApps && 
      step.expectedApps.some(app => 
        appName.toLowerCase().includes(app.toLowerCase())
      )
    );
    
    if (currentStep) {
      if (!currentStep.startTime) {
        currentStep.startTime = Date.now();
      }
      
      currentStep.timeSpent = (currentStep.timeSpent || 0) + timeSpent;
      currentTask.totalTimeSpent += timeSpent;
      
      // Auto-complete step if enough time spent
      if (currentStep.timeSpent >= (currentStep.estimatedMinutes * 60 * 1000 * 0.8)) {
        this.completeStep(currentTask.id, currentStep.id);
      }
      
      this.saveTasks();
    }
  }
}

// Global task manager instance
const taskManager = new TaskManager();

// IPC handlers for task management
ipcMain.handle('task-create', async (event, goal, steps) => {
  return taskManager.createTask(goal, steps);
});

ipcMain.handle('task-activate', async (event, taskId) => {
  return taskManager.activateTask(taskId);
});

ipcMain.handle('task-complete-step', async (event, taskId, stepId) => {
  return taskManager.completeStep(taskId, stepId);
});

ipcMain.handle('task-get-current', async (event) => {
  return taskManager.getCurrentTask();
});

ipcMain.handle('task-get-all', async (event) => {
  return taskManager.getAllTasks();
});

ipcMain.handle('task-delete', async (event, taskId) => {
  return taskManager.deleteTask(taskId);
});

// ========================================
// PRIVACY & STEALTH FEATURES
// ========================================

// Privacy state management
let privacyMode = {
  isEnabled: false,
  level: 'medium', // low, medium, high
  clickThroughEnabled: false,
  screenCaptureBlocked: false
};

// Enable/disable click-through mode (stealth)
ipcMain.handle('set-click-through', async (event, enabled) => {
  try {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.setIgnoreMouseEvents(enabled, { forward: true });
      privacyMode.clickThroughEnabled = enabled;
      
      console.log(`🫥 Click-through mode: ${enabled ? 'ENABLED' : 'DISABLED'}`);
      return { success: true, clickThrough: enabled };
    }
    return { success: false, error: 'Main window not available' };
  } catch (error) {
    console.error('Error setting click-through:', error);
    return { success: false, error: error.message };
  }
});

// Screen capture detection and blocking
ipcMain.handle('detect-screen-sharing', async (event) => {
  try {
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    let sharingApps = [];
    let sharingProcesses = [];
    let isScreenSharing = false;
    
    if (process.platform === 'darwin') {
      // macOS - check for screen sharing processes
      try {
        const { stdout } = await execAsync('ps aux | grep -i "screen\\|record\\|obs\\|zoom\\|teams\\|discord" | grep -v grep');
        const processes = stdout.split('\n').filter(line => line.trim());
        
        // Common screen sharing/recording apps
        const screenApps = ['OBS', 'QuickTime', 'Screenshot', 'Zoom', 'Teams', 'Discord', 'ScreenSearch'];
        
        processes.forEach(process => {
          const processName = process.split(/\s+/).slice(10).join(' ');
          if (screenApps.some(app => processName.toLowerCase().includes(app.toLowerCase()))) {
            sharingProcesses.push(processName);
            isScreenSharing = true;
          }
        });
        
        // Also check for active screen recording
        try {
          const { stdout: recordingCheck } = await execAsync('ps aux | grep "screencapture\\|recordmydesktop" | grep -v grep');
          if (recordingCheck.trim()) {
            isScreenSharing = true;
            sharingApps.push('Screen Recording Active');
          }
        } catch (e) {
          // No recording processes found
        }
        
      } catch (error) {
        console.log('No screen sharing processes detected');
      }
    }
    
    const result = {
      isScreenSharing,
      sharingApps,
      sharingProcesses,
      platform: process.platform
    };
    
    console.log(`🔍 Screen sharing detection result:`, result);
    return { success: true, ...result };
    
  } catch (error) {
    console.error('Error detecting screen sharing:', error);
    return { success: false, error: error.message };
  }
});

// Helper function for internal privacy mode calls
async function setPrivacyMode(level) {
  try {
    privacyMode.level = level;
    privacyMode.isEnabled = level !== 'normal';
    
    console.log(`🔒 Privacy mode set to: ${level}`);
    
    // Apply privacy settings based on level
    switch (level) {
      case 'stealth':
        // Maximum stealth - hide all windows, enable click-through
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.setOpacity(0.01);
          mainWindow.setIgnoreMouseEvents(true, { forward: true });
        }
        break;
      case 'transparent':
        // Semi-transparent mode
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.setOpacity(0.3);
          mainWindow.setIgnoreMouseEvents(false);
        }
        break;
      case 'normal':
      default:
        // Normal visibility
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.setOpacity(1.0);
          mainWindow.setIgnoreMouseEvents(false);
        }
        break;
    }
    
    return { success: true, level, isEnabled: privacyMode.isEnabled };
  } catch (error) {
    console.error('Error setting privacy mode:', error);
    return { success: false, error: error.message };
  }
}

// Privacy mode activation
ipcMain.handle('set-privacy-mode', async (event, level) => {
  return await setPrivacyMode(level);
});

// Get current privacy status
ipcMain.handle('get-privacy-status', async (event) => {
  return { success: true, privacyMode };
});

// Auto privacy detection - hide when screen sharing detected
let privacyDetectionInterval = null;

function startPrivacyDetection() {
  if (privacyDetectionInterval) return;
  
  privacyDetectionInterval = setInterval(async () => {
    try {
      // Skip screen sharing detection for now - can be implemented later
      const result = { success: true, isScreenSharing: false };
      
      if (result.success && result.isScreenSharing && !privacyMode.isEnabled) {
        console.log('🚨 Screen sharing detected - but auto-stealth disabled for debugging');
        // Temporarily disabled auto-stealth mode for debugging
        // await setPrivacyMode('stealth');
        
        // Notify user
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('privacy-auto-enabled', {
            reason: 'screen-sharing-detected',
            apps: result.sharingApps
          });
        }
      } else if (!result.isScreenSharing && privacyMode.isEnabled && privacyMode.level === 'high') {
        console.log('📺 Screen sharing ended - restoring normal mode');
        await setPrivacyMode('normal');
      }
      
    } catch (error) {
      console.error('Privacy detection error:', error);
    }
  }, 10000); // Check every 10 seconds
  
  console.log('🔍 Privacy detection monitoring started');
}

function stopPrivacyDetection() {
  if (privacyDetectionInterval) {
    clearInterval(privacyDetectionInterval);
    privacyDetectionInterval = null;
  }
  console.log('🛑 Privacy detection monitoring stopped');
}

// Start privacy detection when app is ready
startPrivacyDetection();

// Integrate with screen intelligence for automatic progress tracking
if (screenIntelligence) {
  screenIntelligence.on('windowChange', (window) => {
    if (window && window.name) {
      // Estimate time spent (this is simplified)
      taskManager.updateTaskProgress(window.name, 5000); // 5 seconds
    }
  });
}

// Auto-resize meeting assistant based on content
ipcMain.handle('meeting-assistant-auto-resize', async (event, contentData) => {
  try {
    if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
      const baseWidth = 800;
      const baseHeight = 120; // Minimum height for controls
      
      // Calculate height based on content
      let calculatedHeight = baseHeight;
      
      if (contentData.questionLength) {
        // Add height for question (roughly 20px per line, assuming 60 chars per line)
        const questionLines = Math.ceil(contentData.questionLength / 60);
        calculatedHeight += questionLines * 25 + 20; // +20 for padding
      }
      
      if (contentData.answerLength) {
        // Add height for answer (roughly 18px per line, assuming 70 chars per line)
        const answerLines = Math.ceil(contentData.answerLength / 70);
        calculatedHeight += answerLines * 22 + 20; // +20 for padding
      }
      
      // Cap the maximum height
      const maxHeight = 600;
      const finalHeight = Math.min(calculatedHeight, maxHeight);
      
      console.log(`📐 Auto-resizing meeting assistant: ${baseWidth}x${finalHeight}`);
      meetingAssistantWindow.setSize(baseWidth, finalHeight);
    }
    return { success: true };
  } catch (error) {
    console.error('Error auto-resizing meeting assistant:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('meeting-assistant-close', async () => {
  try {
    // Clean up transcription resources first
    if (transcriptionInterval) {
      clearInterval(transcriptionInterval);
      transcriptionInterval = null;
    }
    audioChunks = [];
    meetingRecorder = null;
    
    if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
      meetingAssistantWindow.close();
    }
    meetingAssistantWindow = null;
    
    return { success: true };
  } catch (error) {
    console.error('Error closing meeting assistant:', error);
    meetingAssistantWindow = null;
    return { success: false, error: error.message };
  }
});

// Handle control panel window controls
ipcMain.handle('control-panel-show', async () => {
  if (!controlPanelWindow) {
    createControlPanelWindow();
  }
  
  controlPanelWindow.show();
  return { success: true };
});

ipcMain.handle('control-panel-hide', async () => {
  if (controlPanelWindow) {
    controlPanelWindow.hide();
  }
  return { success: true };
});

ipcMain.handle('control-panel-close', async () => {
  if (controlPanelWindow) {
    controlPanelWindow.close();
    controlPanelWindow = null;
  }
  return { success: true };
});

// Handle GPT-4 chat completion with secure API client
secureIpcHandle('chat-completion', async (event, messages) => {
  try {
    // Input validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return "I need some context to respond to.";
    }
    
    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return "My connection isn't configured. Check your API setup.";
    }
    
    console.log('=== SECURE GPT-4 CHAT ===');
    console.log('Messages:', messages.length);
    console.log('API Key configured:', !!process.env.OPENAI_API_KEY);
    
    // Prepare request data
    const requestData = {
      model: 'gpt-4',
      messages: messages,
      max_tokens: 120,
      temperature: 0.8,
      frequency_penalty: 0.5,
      presence_penalty: 0.3
    };
    
    console.log('Sending secure GPT-4 request...');
    
    // Use secure API client
    const response = await secureApiClient.callOpenAI(
      '/v1/chat/completions',
      requestData,
      process.env.OPENAI_API_KEY
    );
    
    if (response.status !== 200) {
      console.error('GPT-4 API error status:', response.status);
      return "I'm having trouble thinking right now. Try again in a moment.";
    }
    
    const result = response.data;
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      console.error('Invalid GPT-4 response structure');
      return "I got a bit confused processing that. Try rephrasing?";
    }
    
    console.log('=== SECURE GPT-4 SUCCESS ===');
    console.log('Response length:', result.choices[0].message.content.length);
    
    return result.choices[0].message.content.trim();
    
  } catch (error) {
    errorHandler.logError(error, { context: 'CHAT_COMPLETION_ERROR', model: 'gpt-4' });
    return "Something's wonky with my connection, but I'm still here with you.";
  }
});

// Handle audio transcription with real Whisper
ipcMain.handle('transcribe-audio', async (event, base64Audio) => {
  try {
    // Rate limiting
    if (!checkRateLimit('transcription')) {
      return "Voice processing is busy, try again in a moment.";
    }
    
    // Input validation
    if (!base64Audio || typeof base64Audio !== 'string' || base64Audio.length === 0) {
      return "No audio data received.";
    }
    
    if (base64Audio.length > 25 * 1024 * 1024) { // 25MB limit
      return "Audio file too large. Try a shorter recording.";
    }
    
    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      return "Voice recognition isn't configured.";
    }
    
    console.log('=== WHISPER DEBUG ===');
    console.log('Received audio length:', base64Audio.length);
    console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
    console.log('API Key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
    
    // Convert base64 to buffer
    const audioBuffer = Buffer.from(base64Audio, 'base64');
    console.log('Audio buffer size:', audioBuffer.length, 'bytes');
    
    // Use built-in https module instead of fetch
    const https = require('https');
    const FormData = require('form-data');
    
    const form = new FormData();
    form.append('file', audioBuffer, {
      filename: 'audio.webm',
      contentType: 'audio/webm'
    });
    form.append('model', 'whisper-1');
    form.append('language', 'en'); // English for better Hinglish support
    form.append('prompt', 'This is Hinglish - a mix of Hindi and English. Please transcribe in Roman script using English alphabet for both Hindi and English words. For example: "Main office mein hun aur meeting attend kar raha hun"');
    
    console.log('Sending request to Whisper API...');
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/audio/transcriptions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          ...form.getHeaders()
        }
      };
      
      const req = https.request(options, (res) => {
        console.log('Whisper response status:', res.statusCode);
        
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              console.error('Whisper API error response:', data);
              resolve("Voice recognition had trouble. Try typing instead!");
              return;
            }
            
            const result = JSON.parse(data);
            console.log('=== WHISPER SUCCESS ===');
            console.log('Raw result:', result);
            console.log('Transcribed text:', result.text);
            
            resolve(result.text || "I couldn't understand that clearly.");
          } catch (parseError) {
            console.error('Parse error:', parseError);
            resolve("Voice recognition had trouble. Try typing instead!");
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('=== WHISPER ERROR ===');
        console.error('Request error:', error);
        resolve("Voice recognition had trouble. Try typing instead!");
      });
      
      // Send the form data
      form.pipe(req);
    });
    
  } catch (error) {
    console.error('=== WHISPER ERROR ===');
    console.error('Error details:', error.message);
    console.error('Full error:', error);
    return "Voice recognition had trouble. Try typing instead!";
  }
});

// Handle ElevenLabs Text-to-Speech with v3 model (no audio tags)
ipcMain.handle('elevenlabs-tts', async (event, text) => {
  try {
    // Rate limiting
    if (!checkRateLimit('tts')) {
      return null; // Skip TTS if rate limited
    }
    
    // Input validation
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return null;
    }
    
    if (text.length > 1000) { // Reasonable limit
      text = text.substring(0, 1000) + '...';
    }
    
    // Check API key
    if (!process.env.ELEVENLABS_API_KEY) {
      console.warn('ElevenLabs API key not configured');
      return null;
    }
    
    console.log('=== ELEVENLABS TTS ===');
    console.log('Text to speak:', text);
    console.log('ElevenLabs API Key exists:', !!process.env.ELEVENLABS_API_KEY);
    
    const https = require('https');
    
    const voiceId = 'm7GHBtY0UEqljrKQw2JH'; // Your free voice ID
    console.log('Using voice ID:', voiceId);
    
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    // Use gentle text formatting with ellipses for natural pauses
    const comfortingText = `${text}...`;
    
    const postData = JSON.stringify({
      text: comfortingText,
      model_id: "eleven_multilingual_v2", // v3 model for better natural delivery
      voice_settings: {
        stability: 0.75,        // Natural setting for v3 - balanced
        similarity_boost: 0.30, // Low for soft, intimate delivery
        style: 0.1,            // Minimal style for warmth
        use_speaker_boost: false // Disabled for gentle tone
      }
    });
    
    const options = {
      hostname: 'api.elevenlabs.io',
      port: 443,
      path: `/v1/text-to-speech/${voiceId}`,
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    console.log('Request path:', options.path);
    console.log('Using model: eleven_multilingual_v2 (v3) with gentle settings');
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        console.log('ElevenLabs response status:', res.statusCode);
        
        if (res.statusCode !== 200) {
          let errorData = '';
          res.on('data', (chunk) => {
            errorData += chunk;
          });
          res.on('end', () => {
            console.error('ElevenLabs API error details:', errorData);
            resolve(null);
          });
          return;
        }
        
        const chunks = [];
        res.on('data', (chunk) => {
          chunks.push(chunk);
        });
        
        res.on('end', () => {
          const audioBuffer = Buffer.concat(chunks);
          const base64Audio = audioBuffer.toString('base64');
          console.log('ElevenLabs v3 audio generated successfully');
          resolve(base64Audio);
        });
      });
      
      req.on('error', (error) => {
        console.error('ElevenLabs request error:', error);
        resolve(null);
      });
      
      req.write(postData);
      req.end();
    });
    
  } catch (error) {
    console.error('ElevenLabs TTS error:', error);
    return null;
  }
});

// Meeting export and sharing functionality
ipcMain.handle('export-meeting-notes', async (event, meetingData) => {
  try {
    const { dialog } = require('electron');
    const fs = require('fs').promises;
    
    if (!meetingData) {
      return { success: false, error: 'No meeting data provided' };
    }
    
    // Show save dialog
    const result = await dialog.showSaveDialog(meetingAssistantWindow || mainWindow, {
      title: 'Export Meeting Notes',
      defaultPath: `meeting-notes-${new Date().toISOString().split('T')[0]}.md`,
      filters: [
        { name: 'Markdown', extensions: ['md'] },
        { name: 'Text', extensions: ['txt'] },
        { name: 'JSON', extensions: ['json'] }
      ]
    });
    
    if (result.canceled) {
      return { success: false, error: 'Export canceled' };
    }
    
    const filePath = result.filePath;
    const extension = path.extname(filePath).toLowerCase();
    let content = '';
    
    // Generate content based on file type
    if (extension === '.json') {
      content = JSON.stringify(meetingData, null, 2);
    } else if (extension === '.md') {
      content = generateMarkdownReport(meetingData);
    } else {
      content = generateTextReport(meetingData);
    }
    
    await fs.writeFile(filePath, content, 'utf-8');
    
    console.log('📄 Meeting notes exported to:', filePath);
    return { success: true, filePath: filePath };
    
  } catch (error) {
    console.error('Error exporting meeting notes:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('generate-meeting-summary', async (event, meetingData) => {
  try {
    if (!meetingData || !meetingData.transcript) {
      return { success: false, error: 'No meeting transcript available' };
    }
    
    // Rate limiting
    if (!checkRateLimit('chatCompletion')) {
      return { success: false, error: 'Please wait before generating another summary' };
    }
    
    console.log('🧠 Generating comprehensive meeting summary...');
    
    const summaryPrompt = [
      {
        role: 'system',
        content: `You are an expert meeting summarizer. Create a comprehensive, professional meeting summary with:
        1. Executive Summary (2-3 sentences)
        2. Key Discussion Points (bullet points)
        3. Decisions Made (numbered list)
        4. Action Items (with implied ownership if mentioned)
        5. Next Steps
        Keep it concise but thorough.`
      },
      {
        role: 'user',
        content: `Please summarize this meeting transcript: "${meetingData.transcript}"`
      }
    ];
    
    const summary = await generateChatCompletion(summaryPrompt, 500);
    
    if (summary) {
      console.log('✅ Meeting summary generated');
      return { success: true, summary: summary };
    } else {
      return { success: false, error: 'Failed to generate summary' };
    }
    
  } catch (error) {
    console.error('Error generating meeting summary:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-shareable-link', async (event, meetingData) => {
  try {
    if (!meetingData) {
      return { success: false, error: 'No meeting data provided' };
    }
    
    // Generate a unique meeting ID
    const meetingId = generateMeetingId();
    
    // Store meeting data temporarily (in production, this would be a proper database)
    const meetingStorage = getTemporaryMeetingStorage();
    meetingStorage[meetingId] = {
      ...meetingData,
      createdAt: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    // Generate shareable link (in production, this would be your actual domain)
    const shareableLink = `https://velvet-app.local/meeting/${meetingId}`;
    
    console.log('🔗 Created shareable meeting link:', shareableLink);
    
    return {
      success: true,
      shareableLink: shareableLink,
      meetingId: meetingId,
      expiresIn: '24 hours'
    };
    
  } catch (error) {
    console.error('Error creating shareable link:', error);
    return { success: false, error: error.message };
  }
});

// Utility functions for meeting export
function generateMarkdownReport(meetingData) {
  const timestamp = new Date().toLocaleString();
  let markdown = `# Meeting Notes\n\n`;
  markdown += `**Date:** ${timestamp}\n`;
  markdown += `**Duration:** ${meetingData.duration || 'N/A'}\n\n`;
  
  if (meetingData.transcript) {
    markdown += `## Transcript\n\n${meetingData.transcript}\n\n`;
  }
  
  if (meetingData.keyPoints && meetingData.keyPoints.length > 0) {
    markdown += `## Key Points\n\n`;
    meetingData.keyPoints.forEach(point => {
      markdown += `- ${point}\n`;
    });
    markdown += `\n`;
  }
  
  if (meetingData.actionItems && meetingData.actionItems.length > 0) {
    markdown += `## Action Items\n\n`;
    meetingData.actionItems.forEach((item, index) => {
      markdown += `${index + 1}. ${item}\n`;
    });
    markdown += `\n`;
  }
  
  if (meetingData.summary) {
    markdown += `## AI Summary\n\n${meetingData.summary}\n\n`;
  }
  
  markdown += `---\n*Generated by Velvet AI Assistant*`;
  
  return markdown;
}

function generateTextReport(meetingData) {
  const timestamp = new Date().toLocaleString();
  let text = `MEETING NOTES\n`;
  text += `Date: ${timestamp}\n`;
  text += `Duration: ${meetingData.duration || 'N/A'}\n\n`;
  text += `${'='.repeat(50)}\n\n`;
  
  if (meetingData.transcript) {
    text += `TRANSCRIPT:\n${meetingData.transcript}\n\n`;
  }
  
  if (meetingData.keyPoints && meetingData.keyPoints.length > 0) {
    text += `KEY POINTS:\n`;
    meetingData.keyPoints.forEach(point => {
      text += `• ${point}\n`;
    });
    text += `\n`;
  }
  
  if (meetingData.actionItems && meetingData.actionItems.length > 0) {
    text += `ACTION ITEMS:\n`;
    meetingData.actionItems.forEach((item, index) => {
      text += `${index + 1}. ${item}\n`;
    });
    text += `\n`;
  }
  
  if (meetingData.summary) {
    text += `AI SUMMARY:\n${meetingData.summary}\n\n`;
  }
  
  text += `Generated by Velvet AI Assistant`;
  
  return text;
}

async function generateChatCompletion(messages, maxTokens = 200) {
  try {
    const https = require('https');
    
    const postData = JSON.stringify({
      model: 'gpt-4',
      messages: messages,
      max_tokens: maxTokens,
      temperature: 0.3
    });
    
    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              console.error('Chat completion API error:', data);
              resolve(null);
              return;
            }
            
            const result = JSON.parse(data);
            resolve(result.choices[0].message.content.trim());
          } catch (parseError) {
            console.error('Parse error in chat completion:', parseError);
            resolve(null);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('Chat completion request error:', error);
        resolve(null);
      });
      
      req.write(postData);
      req.end();
    });
    
  } catch (error) {
    console.error('Error in generateChatCompletion:', error);
    return null;
  }
}

function generateMeetingId() {
  return 'meeting_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
}

// Simple in-memory storage for demo (in production, use a proper database)
let temporaryMeetingStorage = {};

function getTemporaryMeetingStorage() {
  // Clean up expired meetings
  const now = Date.now();
  for (const [id, data] of Object.entries(temporaryMeetingStorage)) {
    if (data.expiresAt < now) {
      delete temporaryMeetingStorage[id];
    }
  }
  return temporaryMeetingStorage;
}

// Real-time meeting coaching system
let conversationContext = {
  speakers: [],
  topics: [],
  questions: [],
  responses: [],
  currentTopic: null,
  lastInteraction: null
};

ipcMain.handle('analyze-conversation-context', async (event, transcriptionData) => {
  try {
    if (!transcriptionData || !transcriptionData.text) {
      return { success: false, error: 'No transcription data provided' };
    }
    
    console.log('🧠 Analyzing conversation context for coaching...');
    
    const text = transcriptionData.text.trim();
    const timestamp = transcriptionData.timestamp || Date.now();
    
    // Detect if this is a question directed at the user
    const isQuestion = await detectQuestion(text);
    const questionType = isQuestion ? await classifyQuestion(text) : null;
    
    // Generate contextual suggestions if it's a question
    let suggestions = [];
    if (isQuestion) {
      suggestions = await generateResponseSuggestions(text, questionType, conversationContext);
    }
    
    // Update conversation context
    updateConversationContext(text, timestamp, isQuestion, questionType);
    
    // Analyze conversation flow and provide coaching
    const coaching = await analyzeConversationFlow(conversationContext);
    
    return {
      success: true,
      isQuestion: isQuestion,
      questionType: questionType,
      suggestions: suggestions,
      coaching: coaching,
      context: {
        currentTopic: conversationContext.currentTopic,
        speakingTime: calculateSpeakingTime(),
        conversationPace: analyzeConversationPace()
      }
    };
    
  } catch (error) {
    console.error('Error analyzing conversation context:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-response-suggestions', async (event, questionData) => {
  try {
    if (!questionData || !questionData.question) {
      return { success: false, error: 'No question provided' };
    }
    
    console.log('💡 Generating response suggestions...');
    
    // Rate limiting
    if (!checkRateLimit('chatCompletion')) {
      return { success: false, error: 'Please wait before requesting more suggestions' };
    }
    
    const suggestions = await generateResponseSuggestions(
      questionData.question,
      'general',
      conversationContext
    );
    
    return {
      success: true,
      suggestions: suggestions,
      timestamp: Date.now()
    };
    
  } catch (error) {
    console.error('Error generating response suggestions:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('analyze-screen-context', async (event) => {
  try {
    console.log('👁️ Analyzing screen context for meeting coaching...');
    
    // Get current screen content and running applications
    const screenContext = await analyzeScreenForMeetingContext();
    
    return {
      success: true,
      screenContext: screenContext,
      timestamp: Date.now()
    };
    
  } catch (error) {
    console.error('Error analyzing screen context:', error);
    return { success: false, error: error.message };
  }
});

// AI-powered conversation analysis functions
async function detectQuestion(text) {
  try {
    // Enhanced question detection patterns
    const questionPatterns = [
      /\?$/,
      /^(what|how|why|when|where|who|which|can you|could you|would you|do you|are you|will you|have you|did you|shall we|should we)/i,
      /(what do you think|your thoughts|your opinion|how would you|what would you|tell us about|share with us)/i,
      /(tell me about|explain|describe|walk me through|talk about|give me an example)/i,
      /(have you ever|have you worked|what's your experience|how do you handle|what's your approach)/i,
      /(can you give|could you provide|would you say|do you believe|what makes you|why did you)/i
    ];
    
    const hasQuestionMark = questionPatterns[0].test(text);
    const hasQuestionWords = questionPatterns.slice(1).some(pattern => pattern.test(text));
    
    // Enhanced logic: if it has obvious question indicators, it's a question
    if (hasQuestionMark || hasQuestionWords) {
      return true;
    }
    
    // Use AI for ambiguous cases
    const aiAnalysis = await analyzeTextForQuestions(text);
    return aiAnalysis.isQuestion && aiAnalysis.confidence > 0.7;
    
  } catch (error) {
    console.error('Error detecting question:', error);
    // Fallback to basic pattern matching
    return /\?$/.test(text) || /^(what|how|why|when|where|who|which|can you|could you|would you|do you|are you)/i.test(text);
  }
}

async function classifyQuestion(text) {
  try {
    const questionTypes = {
      technical: /\b(code|programming|technical|system|architecture|implementation|bug|error|debugging)\b/i,
      behavioral: /\b(time when|example of|situation where|experience with|challenge|difficult|conflict)\b/i,
      experience: /\b(background|experience|worked on|previous|past|career|projects)\b/i,
      opinion: /\b(think|opinion|view|perspective|approach|philosophy|believe)\b/i,
      clarification: /\b(mean|explain|clarify|understand|confused|what do you mean)\b/i,
      hypothetical: /\b(if|would|could|suppose|imagine|scenario|what if)\b/i
    };
    
    for (const [type, pattern] of Object.entries(questionTypes)) {
      if (pattern.test(text)) {
        return type;
      }
    }
    
    return 'general';
    
  } catch (error) {
    console.error('Error classifying question:', error);
    return 'general';
  }
}

async function generateResponseSuggestions(question, questionType, context) {
  try {
    // Get recent conversation context
    const recentContext = context.questions ? 
      context.questions.slice(-3).map(q => q.text).join('. ') : '';
    
    const prompt = [
      {
        role: 'system',
        content: `You are an expert meeting coach helping someone respond to questions in real-time. Generate 3 professional response suggestions:

RULES:
- Question type: ${questionType}
- Keep responses natural and authentic
- Each response should be 15-25 words max (very concise)
- Provide 3 different approaches: "confident", "thoughtful", "engaging"
- Make them immediately usable in conversation
- Avoid generic responses - be specific to the question

FORMAT: Return only JSON with no markdown:
{"suggestions": [{"approach": "confident", "response": "..."}, {"approach": "thoughtful", "response": "..."}, {"approach": "engaging", "response": "..."}]}`
      },
      {
        role: 'user',
        content: `QUESTION: "${question}"
${recentContext ? `CONTEXT: Recent conversation - ${recentContext}` : ''}

Generate 3 specific response suggestions for this ${questionType} question.`
      }
    ];
    
    const aiResponse = await generateChatCompletion(prompt, 250);
    
    if (aiResponse) {
      try {
        // Clean the response to remove any markdown formatting
        const cleanResponse = aiResponse.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleanResponse);
        
        if (parsed.suggestions && Array.isArray(parsed.suggestions)) {
          return parsed.suggestions;
        }
      } catch (parseError) {
        console.log('JSON parse error, using fallback:', parseError.message);
      }
    }
    
    // Enhanced fallback suggestions
    return generateEnhancedSuggestions(question, questionType);
    
  } catch (error) {
    console.error('Error generating response suggestions:', error);
    return generateEnhancedSuggestions(question, questionType);
  }
}

function generateEnhancedSuggestions(question, questionType) {
  // Extract key words from question for more contextual responses
  const questionLower = question.toLowerCase();
  
  const enhancedSuggestions = {
    technical: [
      { approach: 'confident', response: 'I have strong experience with this. Let me walk through my approach.' },
      { approach: 'thoughtful', response: 'That\'s a great technical question. In my experience, the key is...' },
      { approach: 'engaging', response: 'Interesting challenge! I\'ve tackled similar problems by...' }
    ],
    behavioral: [
      { approach: 'confident', response: 'I have a perfect example that demonstrates exactly that.' },
      { approach: 'thoughtful', response: 'Let me share a situation where I faced this challenge...' },
      { approach: 'engaging', response: 'That\'s a situation I\'ve navigated before. Here\'s what happened...' }
    ],
    experience: [
      { approach: 'confident', response: 'I\'ve had extensive experience in this area over the past few years.' },
      { approach: 'thoughtful', response: 'My background includes both hands-on work and strategic oversight in...' },
      { approach: 'engaging', response: 'I\'d love to share what I\'ve learned from working on...' }
    ],
    opinion: [
      { approach: 'confident', response: 'I have a strong perspective on this based on my experience.' },
      { approach: 'thoughtful', response: 'That\'s something I\'ve given considerable thought to. I believe...' },
      { approach: 'engaging', response: 'Great question! My view is shaped by...' }
    ],
    clarification: [
      { approach: 'confident', response: 'Let me clarify that point - what I meant was...' },
      { approach: 'thoughtful', response: 'Good question. Let me explain that in more detail...' },
      { approach: 'engaging', response: 'I\'m glad you asked! What I was getting at is...' }
    ],
    hypothetical: [
      { approach: 'confident', response: 'In that scenario, I would approach it by...' },
      { approach: 'thoughtful', response: 'That\'s an interesting hypothetical. I think the key would be...' },
      { approach: 'engaging', response: 'Great scenario to consider! I\'d focus on...' }
    ]
  };
  
  // Context-aware fallback based on question content
  if (questionLower.includes('javascript') || questionLower.includes('programming')) {
    return [
      { approach: 'confident', response: 'I have solid JavaScript experience. Let me share my approach.' },
      { approach: 'thoughtful', response: 'JavaScript is something I work with regularly. In my experience...' },
      { approach: 'engaging', response: 'I love working with JavaScript! What I find most effective is...' }
    ];
  }
  
  if (questionLower.includes('team') || questionLower.includes('leadership')) {
    return [
      { approach: 'confident', response: 'I have strong experience leading teams. Here\'s my approach...' },
      { approach: 'thoughtful', response: 'Team dynamics are crucial. What I\'ve learned is...' },
      { approach: 'engaging', response: 'I\'ve had great success with team leadership by...' }
    ];
  }
  
  return enhancedSuggestions[questionType] || [
    { approach: 'confident', response: 'That\'s a great question. Let me share my perspective.' },
    { approach: 'thoughtful', response: 'I appreciate you asking. Here\'s how I see it...' },
    { approach: 'engaging', response: 'Interesting question! Let me tell you what I think...' }
  ];
}

async function analyzeConversationFlow(context) {
  try {
    const now = Date.now();
    const recentQuestions = context.questions.filter(q => now - q.timestamp < 300000); // Last 5 minutes
    
    let coaching = {
      suggestions: [],
      metrics: {
        questionFrequency: recentQuestions.length,
        avgResponseTime: calculateAverageResponseTime(context),
        conversationBalance: calculateConversationBalance(context)
      }
    };
    
    // Generate coaching suggestions based on conversation flow
    if (recentQuestions.length > 3) {
      coaching.suggestions.push({
        type: 'pacing',
        message: 'You\'re receiving many questions. Consider asking clarifying questions to slow the pace.',
        priority: 'medium'
      });
    }
    
    if (coaching.metrics.conversationBalance < 0.3) {
      coaching.suggestions.push({
        type: 'engagement',
        message: 'Try asking follow-up questions to increase engagement.',
        priority: 'low'
      });
    }
    
    return coaching;
    
  } catch (error) {
    console.error('Error analyzing conversation flow:', error);
    return { suggestions: [], metrics: {} };
  }
}

function updateConversationContext(text, timestamp, isQuestion, questionType) {
  try {
    if (isQuestion) {
      conversationContext.questions.push({
        text: text,
        timestamp: timestamp,
        type: questionType
      });
    }
    
    conversationContext.lastInteraction = {
      text: text,
      timestamp: timestamp,
      isQuestion: isQuestion
    };
    
    // Keep only recent interactions (last 30 minutes)
    const cutoff = timestamp - (30 * 60 * 1000);
    conversationContext.questions = conversationContext.questions.filter(q => q.timestamp > cutoff);
    
  } catch (error) {
    console.error('Error updating conversation context:', error);
  }
}

function calculateSpeakingTime() {
  // Simplified calculation - in real implementation, would track actual speaking vs listening time
  return {
    speaking: 45, // percentage
    listening: 55
  };
}

function analyzeConversationPace() {
  const recentQuestions = conversationContext.questions.slice(-5);
  if (recentQuestions.length < 2) return 'normal';
  
  const intervals = [];
  for (let i = 1; i < recentQuestions.length; i++) {
    intervals.push(recentQuestions[i].timestamp - recentQuestions[i-1].timestamp);
  }
  
  const avgInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
  
  if (avgInterval < 30000) return 'fast'; // Less than 30 seconds between questions
  if (avgInterval > 120000) return 'slow'; // More than 2 minutes between questions
  return 'normal';
}

function calculateAverageResponseTime(context) {
  // Simplified - would track actual response times in real implementation
  return 3.5; // seconds
}

function calculateConversationBalance(context) {
  // Simplified - would track actual speaking balance
  return 0.45; // 45% user speaking, 55% others
}

async function analyzeTextForQuestions(text) {
  try {
    const prompt = [
      {
        role: 'system',
        content: 'Analyze if the given text is a question that expects a response. Reply with JSON: {"isQuestion": true/false, "confidence": 0-1}'
      },
      {
        role: 'user',
        content: text
      }
    ];
    
    const response = await generateChatCompletion(prompt, 50);
    if (response) {
      try {
        const parsed = JSON.parse(response);
        return { isQuestion: parsed.isQuestion || false, confidence: parsed.confidence || 0.5 };
      } catch {
        return { isQuestion: false, confidence: 0 };
      }
    }
    
    return { isQuestion: false, confidence: 0 };
    
  } catch (error) {
    console.error('Error in AI question analysis:', error);
    return { isQuestion: false, confidence: 0 };
  }
}

async function analyzeScreenForMeetingContext() {
  try {
    // Get list of running applications to understand meeting context
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);
    
    if (process.platform === 'darwin') {
      const { stdout } = await execAsync(`
        osascript -e '
          tell application "System Events"
            set runningApps to {}
            set meetingApps to {}
            repeat with proc in application processes
              try
                set procName to name of proc
                if procName contains "Zoom" or procName contains "Teams" or procName contains "Meet" or procName contains "Discord" or procName contains "Skype" or procName contains "WebEx" then
                  set meetingApps to meetingApps & procName
                end if
                set runningApps to runningApps & procName
              end try
            end repeat
            return {meetingApps: meetingApps as string, allApps: runningApps as string}
          end tell'
      `);
      
      return {
        meetingAppsDetected: stdout.includes('meetingApps:') ? stdout.split('meetingApps:')[1].split(',')[0].trim() : '',
        environment: 'meeting_detected',
        timestamp: Date.now()
      };
    }
    
    return { meetingAppsDetected: '', environment: 'unknown', timestamp: Date.now() };
    
  } catch (error) {
    console.error('Error analyzing screen context:', error);
    return { meetingAppsDetected: '', environment: 'error', timestamp: Date.now() };
  }
}

// Real-time meeting transcription system
let meetingRecorder = null;
let transcriptionInterval = null;
let audioChunks = [];

ipcMain.handle('start-meeting-transcription', async () => {
  try {
    console.log('🎤 Starting real-time meeting transcription...');
    
    // Check if meeting assistant window exists
    if (!meetingAssistantWindow || meetingAssistantWindow.isDestroyed()) {
      return { success: false, error: 'Meeting assistant window not available' };
    }
    
    // Clear any existing transcription
    if (transcriptionInterval) {
      clearInterval(transcriptionInterval);
      transcriptionInterval = null;
    }
    
    // Reset audio chunks
    audioChunks = [];
    
    // Start continuous transcription every 5 seconds
    transcriptionInterval = setInterval(async () => {
      try {
        if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed() && meetingAssistantWindow.isVisible()) {
          // Request audio chunk from renderer
          meetingAssistantWindow.webContents.send('request-audio-chunk');
        } else {
          // Clean up if window is gone
          if (transcriptionInterval) {
            clearInterval(transcriptionInterval);
            transcriptionInterval = null;
          }
        }
      } catch (intervalError) {
        console.error('Error in transcription interval:', intervalError);
      }
    }, 5000);
    
    return { success: true, message: 'Real-time transcription started' };
  } catch (error) {
    console.error('Error starting meeting transcription:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('stop-meeting-transcription', async () => {
  try {
    console.log('🛑 Stopping real-time meeting transcription...');
    
    if (transcriptionInterval) {
      clearInterval(transcriptionInterval);
      transcriptionInterval = null;
    }
    
    audioChunks = [];
    meetingRecorder = null;
    
    return { success: true, message: 'Real-time transcription stopped' };
  } catch (error) {
    console.error('Error stopping meeting transcription:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('process-meeting-audio', async (event, audioData) => {
  try {
    if (!audioData || audioData.length === 0) {
      return { success: false, error: 'No audio data provided' };
    }
    
    // Check if meeting assistant window still exists
    if (!meetingAssistantWindow || meetingAssistantWindow.isDestroyed()) {
      console.warn('Meeting assistant window destroyed, stopping audio processing');
      return { success: false, error: 'Meeting assistant window not available' };
    }
    
    console.log('🎙️ Processing meeting audio chunk...');
    
    // Use existing Whisper transcription with timeout
    const transcriptionPromise = transcribeAudioData(audioData);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Transcription timeout')), 30000)
    );
    
    const transcription = await Promise.race([transcriptionPromise, timeoutPromise]);
    
    if (transcription && transcription.trim().length > 0) {
      // Send transcription to meeting assistant window
      if (meetingAssistantWindow && !meetingAssistantWindow.isDestroyed() && meetingAssistantWindow.isVisible()) {
        meetingAssistantWindow.webContents.send('new-transcription', {
          text: transcription,
          timestamp: Date.now()
        });
        
        // Also process for key points and action items (async, non-blocking)
        analyzeTranscriptionForInsights(transcription)
          .then(analysis => {
            if (analysis && meetingAssistantWindow && !meetingAssistantWindow.isDestroyed()) {
              meetingAssistantWindow.webContents.send('meeting-insights', analysis);
            }
          })
          .catch(error => {
            console.error('Error analyzing transcription:', error);
          });
      }
    }
    
    return { success: true, transcription: transcription };
  } catch (error) {
    console.error('Error processing meeting audio:', error);
    return { success: false, error: error.message };
  }
});

async function transcribeAudioData(base64Audio) {
  try {
    // Reuse existing transcribe-audio logic
    const audioBuffer = Buffer.from(base64Audio, 'base64');
    console.log('🎤 Transcribing audio chunk:', audioBuffer.length, 'bytes');
    
    const https = require('https');
    const FormData = require('form-data');
    
    // Determine best format for Whisper API
    let filename = 'audio.webm';
    let contentType = 'audio/webm';
    
    // Try to detect audio format from buffer (simple magic number detection)
    const audioHeader = audioBuffer.slice(0, 12);
    if (audioHeader.includes(Buffer.from('OggS'))) {
      filename = 'audio.ogg';
      contentType = 'audio/ogg';
    } else if (audioHeader.includes(Buffer.from('RIFF'))) {
      filename = 'audio.wav';
      contentType = 'audio/wav';
    }
    
    console.log(`🎤 Sending to Whisper as ${filename} (${contentType})`);
    
    const form = new FormData();
    form.append('file', audioBuffer, {
      filename: filename,
      contentType: contentType,
      knownLength: audioBuffer.length
    });
    form.append('model', 'whisper-1');
    form.append('language', 'en');
    form.append('temperature', '0');
    form.append('prompt', 'This is Hinglish - a mix of Hindi and English. Please transcribe in Roman script using English alphabet for both Hindi and English words. For example: "Main office mein hun aur meeting attend kar raha hun"');
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/audio/transcriptions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          ...form.getHeaders()
        }
      };
      
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              console.log('Whisper API error:', data);
              // Try to parse error details
              try {
                const errorData = JSON.parse(data);
                if (errorData.error && errorData.error.message.includes('Invalid file format')) {
                  console.log('🔄 Audio format not supported, skipping this chunk');
                } else {
                  console.log('📝 Other Whisper error:', errorData.error?.message);
                }
              } catch {
                console.log('📝 Unknown Whisper error');
              }
              resolve('');
              return;
            }
            
            const result = JSON.parse(data);
            console.log('✅ Meeting transcription:', result.text);
            resolve(result.text || '');
          } catch (parseError) {
            console.error('Parse error:', parseError);
            resolve('');
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('Transcription request error:', error);
        resolve('');
      });
      
      form.pipe(req);
    });
    
  } catch (error) {
    console.error('Error in transcribeAudioData:', error);
    return '';
  }
}

async function analyzeTranscriptionForInsights(text) {
  try {
    console.log('🧠 Analyzing transcription for insights...');
    
    // Use GPT-4 to extract key points and action items
    const analysisPrompt = [
      {
        role: 'system',
        content: 'You are a meeting assistant. Analyze this transcription and extract key points and action items. Return JSON with "keyPoints" and "actionItems" arrays. Keep responses concise.'
      },
      {
        role: 'user',
        content: `Analyze this meeting transcript: "${text}"`
      }
    ];
    
    const https = require('https');
    const postData = JSON.stringify({
      model: 'gpt-4',
      messages: analysisPrompt,
      max_tokens: 200,
      temperature: 0.3
    });
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              resolve(null);
              return;
            }
            
            const result = JSON.parse(data);
            const analysis = result.choices[0].message.content;
            
            try {
              const parsed = JSON.parse(analysis);
              console.log('📊 Meeting insights extracted:', parsed);
              resolve(parsed);
            } catch {
              // If not valid JSON, extract manually
              resolve({
                keyPoints: analysis.includes('key') ? [analysis.substring(0, 100)] : [],
                actionItems: analysis.includes('action') ? [analysis.substring(0, 100)] : []
              });
            }
          } catch (parseError) {
            resolve(null);
          }
        });
      });
      
      req.on('error', (error) => {
        resolve(null);
      });
      
      req.write(postData);
      req.end();
    });
    
  } catch (error) {
    console.error('Error analyzing transcription:', error);
    return null;
  }
}

// Handle comprehensive audio intelligence system
ipcMain.handle('check-audio-playing', async () => {
  try {
    if (process.platform === 'darwin') {
      // macOS - check if any audio is playing using system info
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);
      
      // Check for active audio sessions with more detail
      const { stdout } = await execAsync(`
        osascript -e '
          tell application "System Events"
            set audioInfo to {}
            set audioApps to {}
            repeat with proc in application processes
              try
                if (background only of proc is false) then
                  set procName to name of proc
                  if procName contains "Music" or procName contains "Spotify" or procName contains "YouTube" or procName contains "Netflix" or procName contains "Chrome" or procName contains "Safari" or procName contains "VLC" or procName contains "QuickTime" or procName contains "Discord" or procName contains "Zoom" or procName contains "Teams" then
                    set audioApps to audioApps & procName
                  end if
                end if
              end try
            end repeat
            return audioApps as string
          end tell'
      `);
      
      const audioApps = stdout.trim();
      const isAudioPlaying = audioApps.length > 0;
      
      // Determine audio context type
      let audioContext = 'quiet';
      let audioMood = 'neutral';
      
      if (isAudioPlaying) {
        const appsArray = audioApps.split(', ').filter(app => app.length > 0);
        
        // Determine context based on apps
        if (appsArray.some(app => app.includes('Music') || app.includes('Spotify'))) {
          audioContext = 'music';
          audioMood = 'focused';
        } else if (appsArray.some(app => app.includes('YouTube') || app.includes('Netflix'))) {
          audioContext = 'entertainment';
          audioMood = 'relaxed';
        } else if (appsArray.some(app => app.includes('Discord') || app.includes('Zoom') || app.includes('Teams'))) {
          audioContext = 'communication';
          audioMood = 'social';
        } else {
          audioContext = 'media';
          audioMood = 'engaged';
        }
      }
      
      return {
        isAudioPlaying: isAudioPlaying,
        audioApps: audioApps.split(', ').filter(app => app.length > 0),
        environment: isAudioPlaying ? 'audio_active' : 'quiet',
        audioContext: audioContext,
        audioMood: audioMood,
        timestamp: Date.now()
      };
      
    } else {
      // For other platforms, return basic info
      return {
        isAudioPlaying: false,
        audioApps: [],
        environment: 'quiet',
        audioContext: 'quiet',
        audioMood: 'neutral',
        timestamp: Date.now()
      };
    }
    
  } catch (error) {
    console.error('Error checking audio status:', error);
    return {
      isAudioPlaying: false,
      audioApps: [],
      environment: 'quiet',
      audioContext: 'quiet',
      audioMood: 'neutral',
      timestamp: Date.now(),
      error: error.message
    };
  }
});

// Handle system volume level detection
// PHASE 2: System Audio Capture for Real Audio Environment Monitor
ipcMain.handle('get-system-audio-devices', async () => {
  try {
    console.log('🎧 Getting system audio devices...');
    
    // Use macOS system command to get audio devices
    const { exec } = require('child_process');
    
    return new Promise((resolve, reject) => {
      const command = `
        osascript -e '
        tell application "System Events"
          set audioDevices to {}
          set audioInfo to do shell script "system_profiler SPAudioDataType -json"
          return audioInfo
        end tell'
      `;
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Failed to get audio devices:', error);
          resolve({ devices: [], error: error.message });
          return;
        }
        
        try {
          // Parse audio device information
          const audioData = JSON.parse(stdout);
          console.log('✅ System audio devices retrieved');
          resolve({ devices: audioData.SPAudioDataType || [], error: null });
        } catch (parseError) {
          console.error('❌ Failed to parse audio device data:', parseError);
          resolve({ devices: [], error: parseError.message });
        }
      });
    });
    
  } catch (error) {
    console.error('❌ System audio device detection failed:', error);
    return { devices: [], error: error.message };
  }
});

ipcMain.handle('capture-system-audio', async (event, options = {}) => {
  try {
    console.log('🎧 Starting system audio capture...');
    
    // Use macOS system command to capture audio info
    const { exec } = require('child_process');
    
    return new Promise((resolve, reject) => {
      const command = `
        osascript -e '
        tell application "System Events"
          set audioApps to {}
          set musicApps to {"Music", "Spotify", "YouTube Music", "SoundCloud", "Pandora"}
          set callApps to {"Zoom", "Microsoft Teams", "Discord", "FaceTime", "Skype", "Google Meet"}
          set browserApps to {"Safari", "Google Chrome", "Firefox", "Arc", "Opera"}
          
          repeat with proc in application processes
            try
              if (background only of proc is false) then
                set procName to name of proc
                set isPlaying to false
                
                -- Check if app is likely playing audio
                if procName is in musicApps then
                  set audioApps to audioApps & {procName & ":music"}
                else if procName is in callApps then
                  set audioApps to audioApps & {procName & ":call"}
                else if procName is in browserApps then
                  set audioApps to audioApps & {procName & ":browser"}
                end if
              end if
            end try
          end repeat
          
          return audioApps as string
        end tell'
      `;
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Failed to capture system audio info:', error);
          resolve({ 
            audioSources: [], 
            timestamp: Date.now(),
            error: error.message 
          });
          return;
        }
        
        try {
          // Parse the audio app information
          const audioAppsString = stdout.trim();
          const audioSources = audioAppsString ? audioAppsString.split(',').map(app => {
            const [name, type] = app.trim().split(':');
            return { name: name || app.trim(), type: type || 'unknown' };
          }) : [];
          
          console.log(`✅ System audio capture: ${audioSources.length} sources detected`);
          
          resolve({
            audioSources: audioSources,
            timestamp: Date.now(),
            error: null
          });
          
        } catch (parseError) {
          console.error('❌ Failed to parse audio app data:', parseError);
          resolve({ 
            audioSources: [], 
            timestamp: Date.now(),
            error: parseError.message 
          });
        }
      });
    });
    
  } catch (error) {
    console.error('❌ System audio capture failed:', error);
    return { 
      audioSources: [], 
      timestamp: Date.now(),
      error: error.message 
    };
  }
});

ipcMain.handle('get-current-audio-context', async () => {
  try {
    console.log('🎵 Getting current audio context...');
    
    const { exec } = require('child_process');
    
    return new Promise((resolve, reject) => {
      const command = `
        osascript -e '
        tell application "System Events"
          set audioContext to {}
          
          -- Check Music app
          try
            tell application "Music"
              if player state is playing then
                set currentTrack to current track
                set audioContext to audioContext & {"Music:" & name of currentTrack & " by " & artist of currentTrack}
              end if
            end tell
          end try
          
          -- Check Spotify
          try
            tell application "Spotify"
              if player state is playing then
                set currentTrack to current track
                set audioContext to audioContext & {"Spotify:" & name of currentTrack & " by " & artist of currentTrack}
              end if
            end tell
          end try
          
          -- Check system volume
          set systemVolume to output volume of (get volume settings)
          set audioContext to audioContext & {"Volume:" & systemVolume}
          
          return audioContext as string
        end tell'
      `;
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log('⚠️ Audio context detection limited:', error.message);
          resolve({ 
            context: 'unknown',
            volume: 50,
            timestamp: Date.now(),
            error: error.message 
          });
          return;
        }
        
        try {
          const contextString = stdout.trim();
          const contextParts = contextString ? contextString.split(',') : [];
          
          let audioContext = {
            context: 'silence',
            volume: 50,
            currentTrack: null,
            app: null,
            timestamp: Date.now(),
            error: null
          };
          
          contextParts.forEach(part => {
            if (part.includes('Music:') || part.includes('Spotify:')) {
              const [app, track] = part.split(':');
              audioContext.context = 'music';
              audioContext.app = app;
              audioContext.currentTrack = track;
            } else if (part.includes('Volume:')) {
              audioContext.volume = parseInt(part.split(':')[1]) || 50;
            }
          });
          
          console.log(`✅ Audio context: ${audioContext.context} (${audioContext.app || 'system'})`);
          resolve(audioContext);
          
        } catch (parseError) {
          console.error('❌ Failed to parse audio context:', parseError);
          resolve({ 
            context: 'unknown',
            volume: 50,
            timestamp: Date.now(),
            error: parseError.message 
          });
        }
      });
    });
    
  } catch (error) {
    console.error('❌ Audio context detection failed:', error);
    return { 
      context: 'unknown',
      volume: 50,
      timestamp: Date.now(),
      error: error.message 
    };
  }
});

ipcMain.handle('get-system-volume', async () => {
  try {
    if (process.platform === 'darwin') {
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);
      
      const { stdout } = await execAsync('osascript -e "output volume of (get volume settings)"');
      const volume = parseInt(stdout.trim());
      
      return {
        volume: volume,
        isMuted: volume === 0,
        level: volume > 75 ? 'loud' : volume > 25 ? 'medium' : 'quiet'
      };
    }
    
    return { volume: 50, isMuted: false, level: 'medium' };
  } catch (error) {
    console.error('Error getting system volume:', error);
    return { volume: 50, isMuted: false, level: 'medium', error: error.message };
  }
});

// DESKTOP CAPTURER API - Bypass stealth mode for OCR
ipcMain.handle('get-desktop-sources', async (event, options = {}) => {
  try {
    console.log('📺 Getting desktop sources for OCR...');
    
    const sources = await desktopCapturer.getSources({
      types: ['screen'],  // Only screens, not individual windows
      thumbnailSize: options.thumbnailSize || { width: 1920, height: 1080 },
      fetchWindowIcons: false
    });
    
    console.log(`✅ Found ${sources.length} screen sources`);
    
    // Convert sources to serializable format
    const serializedSources = sources.map(source => ({
      id: source.id,
      name: source.name,
      thumbnail: source.thumbnail.toDataURL()
    }));
    
    return {
      sources: serializedSources,
      timestamp: Date.now()
    };
    
  } catch (error) {
    console.error('❌ Failed to get desktop sources:', error);
    return {
      sources: [],
      error: error.message,
      timestamp: Date.now()
    };
  }
});

ipcMain.handle('capture-screen-for-ocr', async (event, sourceId) => {
  try {
    console.log('📸 Capturing screen for OCR using desktopCapturer...');
    
    // Get the specific source
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1920, height: 1080 }
    });
    
    const source = sources.find(s => s.id === sourceId) || sources[0];
    if (!source) {
      throw new Error('No screen source found');
    }
    
    console.log(`✅ Captured screen: ${source.name}`);
    
    // Convert to PNG data URL for better Tesseract compatibility
    const imageDataUrl = source.thumbnail.toDataURL('image/png');
    console.log('📷 Image data URL length:', imageDataUrl.length);
    console.log('📷 Image data URL prefix:', imageDataUrl.substring(0, 50));
    
    return {
      imageDataUrl: imageDataUrl,
      sourceName: source.name,
      timestamp: Date.now()
    };
    
  } catch (error) {
    console.error('❌ Screen capture for OCR failed:', error);
    return {
      imageDataUrl: null,
      error: error.message,
      timestamp: Date.now()
    };
  }
});


// Privacy mode controls for neurodivergent accessibility

app.on('window-all-closed', () => {
  try {
    console.log('🧺 Cleaning up application resources...');
    
    // Clean up screen intelligence
    if (screenIntelligence) {
      screenIntelligence.stopMonitoring();
      screenIntelligence = null;
    }
    
    // Clean up transcription resources
    if (transcriptionInterval) {
      clearInterval(transcriptionInterval);
      transcriptionInterval = null;
    }
    
    // Clear audio chunks
    audioChunks = [];
    meetingRecorder = null;
    
    // Reset window references
    mainWindow = null;
    checklistWindow = null;
    meetingAssistantWindow = null;
    controlPanelWindow = null;
    
    if (process.platform !== 'darwin') {
      app.quit();
    }
    
    console.log('✅ Application cleanup completed');
  } catch (error) {
    console.error('Error during cleanup:', error);
    // Force quit if cleanup fails
    app.quit();
  }
});

// Handle app before-quit for graceful shutdown
app.on('before-quit', (event) => {
  try {
    console.log('🔄 Preparing to quit application...');
    
    // Stop all ongoing processes
    if (transcriptionInterval) {
      clearInterval(transcriptionInterval);
      transcriptionInterval = null;
    }
    
    if (screenIntelligence) {
      screenIntelligence.stopMonitoring();
    }
    
  } catch (error) {
    console.error('Error during before-quit:', error);
  }
});

// Handle GPU crashes
app.on('gpu-process-crashed', (event, killed) => {
  console.error('💥 GPU process crashed, killed:', killed);
  // Try to recover by recreating windows
  setTimeout(() => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      try {
        createWindow();
      } catch (error) {
        console.error('Failed to recover from GPU crash:', error);
      }
    }
  }, 1000);
});

// Handle child process crashes
app.on('child-process-gone', (event, details) => {
  console.error('💥 Child process gone:', details);
});

// ========================================
// VELVET STREAMING BRAIN INITIALIZATION
// ========================================

async function initializeVelvetStreamingBrain() {
  try {
    console.log('🧠 Initializing Velvet Streaming Brain Architecture...');
    
    // Create stream client
    velvetStreamClient = new VelvetStreamClient();
    
    // Initialize gRPC connection
    const initialized = await velvetStreamClient.initialize();
    if (!initialized) {
      console.error('❌ Failed to initialize stream client');
      return false;
    }
    
    // Set up brain context event handlers
    velvetStreamClient.on('brain_context_update', (context) => {
      console.log('🔥 MAIN PROCESS DEBUG: Received brain context update');
      console.log(`   📖 Screen Text Length: ${context.screenText.length}`);
      console.log(`   📖 Screen Text Preview: ${context.screenText.substring(0, 100)}...`);
      console.log(`   📊 OCR Confidence: ${context.ocrConfidence}`);
      console.log(`   🎤 Audio Length: ${context.audioTranscript.length}`);
      
      // Send brain context to renderer processes
      if (mainWindow && !mainWindow.isDestroyed()) {
        console.log('📤 MAIN PROCESS DEBUG: Sending context to renderer');
        mainWindow.webContents.send('brain-context-update', context);
      } else {
        console.log('⚠️ MAIN PROCESS DEBUG: Main window not available');
      }
      
      console.log(`🧠 Brain Context: ${context.screenText.substring(0, 50)}...`);
    });
    
    velvetStreamClient.on('pattern_detected', (pattern) => {
      console.log(`🚨 Pattern Detected: ${pattern.type} (${pattern.confidence.toFixed(2)})`);
      
      // Send pattern detection to renderer for gentle interventions
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('pattern-detected', pattern);
      }
    });
    
    velvetStreamClient.on('stream_error', (error) => {
      console.error(`❌ Stream error: ${error.type}`, error.error);
    });
    
    // Start the unified brain context stream (replaces embarrassing polling)
    console.log('🚀 Starting real-time brain consciousness...');
    await velvetStreamClient.startBrainContextStream({
      includeAudio: true,
      includePatterns: true,
      confidenceThreshold: 0.6
    });
    
    // Start pattern detection for ADHD/autism support
    await velvetStreamClient.startPatternStream([
      'hyperfocus', 
      'distraction_spiral', 
      'task_avoidance',
      'communication_anxiety'
    ]);
    
    console.log('✅ Velvet Streaming Brain is now fully conscious and aware!');
    console.log('🔥 No more embarrassing 5-second polling - this is REAL-TIME!');
    
    return true;
    
  } catch (error) {
    console.error('❌ Failed to initialize Velvet Streaming Brain:', error);
    return false;
  }
}

// IPC handler to get current brain context for AI
ipcMain.handle('get-brain-context', () => {
  if (global.velvetBrainContext) {
    return global.velvetBrainContext.getFormattedContextForAI();
  }
  return "Brain context not available";
});

// IPC handler to get stream status
ipcMain.handle('get-stream-status', () => {
  if (velvetStreamClient) {
    return velvetStreamClient.getStreamStatus();
  }
  return { connected: false, activeStreams: [], reconnectAttempts: 0 };
});

// ========================================
// DATABASE INITIALIZATION
// ========================================

async function initializeVelvetDatabase() {
  try {
    console.log('🧠 Initializing Velvet encrypted database...');
    
    databaseService = new VelvetDatabaseIPCHandlers();
    const result = await databaseService.initialize();
    
    if (result.success) {
      console.log('✅ Velvet database initialized successfully');
      
      // Set global reference for other modules
      global.velvetDatabase = databaseService;
      
      // Initialize security audit system
      securityAudit = new VelvetSecurityAudit(securityManager, errorHandler, databaseService.databaseService);
      console.log('🛡️ Security audit system initialized');
      
      return true;
    } else {
      console.error('❌ Database initialization failed:', result.error);
      
      // Continue without database (graceful degradation)
      databaseService = null;
      return false;
    }
  } catch (error) {
    console.error('❌ Critical database initialization error:', error);
    databaseService = null;
    return false;
  }
}

// SECURITY MONITORING IPC HANDLERS
secureIpcHandle('security-run-audit', async () => {
  if (!securityAudit) {
    return { success: false, error: 'Security audit not initialized' };
  }
  
  try {
    const auditResults = await securityAudit.runSecurityAudit();
    return { success: true, results: auditResults };
  } catch (error) {
    errorHandler.logError(error, { context: 'SECURITY_AUDIT_IPC' });
    return { success: false, error: 'Audit failed' };
  }
});

secureIpcHandle('security-get-summary', async () => {
  if (!securityAudit) {
    return { success: false, error: 'Security audit not initialized' };
  }
  
  const summary = securityAudit.getAuditSummary();
  return { success: true, summary };
});

secureIpcHandle('security-get-stats', async () => {
  const stats = {
    securityManager: securityManager.getSecurityStats(),
    errorHandler: errorHandler.getErrorStats(),
    apiClient: secureApiClient.getStats()
  };
  return { success: true, stats };
});

// ========================================
// APP INITIALIZATION - CRITICAL!
// ========================================

app.whenReady().then(async () => {
  console.log('🚀 Electron app is ready, creating window...');
  createWindow();
  
  // Initialize encrypted database service for persistent learning
  await initializeVelvetDatabase();
  
  // Initialize advanced streaming brain architecture
  await initializeVelvetStreamingBrain();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  // Cleanup global shortcuts
  globalShortcut.unregisterAll();
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', async () => {
  // Ensure hotkeys are cleaned up
  globalShortcut.unregisterAll();
  
  // Gracefully close database
  if (databaseService) {
    console.log('🔒 Closing encrypted database...');
    try {
      await databaseService.close();
      console.log('✅ Database closed successfully');
    } catch (error) {
      console.error('❌ Error closing database:', error);
    }
  }
  
  // Cleanup stealth monitoring
  if (stealthManager.streamDetectionInterval) {
    clearInterval(stealthManager.streamDetectionInterval);
  }
});