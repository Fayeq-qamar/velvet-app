const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer } = require('electron');
const path = require('path');
require('dotenv').config();

// SAFE MODE: Disable stealth features that might cause crashes
console.log('🛡️ Starting Velvet in SAFE MODE (stealth disabled)');

// Comment out problematic stealth mode switches
// app.setName('CoreAudioService');           
// process.title = 'com.apple.coreaudio';     
// app.dock?.hide();                          

// DISABLED: Command line switches that may cause SIGSEGV
// app.commandLine.appendSwitch('disable-features', 'IOSurfaceCapturer,DesktopCaptureMacV2');
// app.commandLine.appendSwitch('enable-features', 'ScreenCaptureKitPickerSonoma');

console.log('🔧 Safe mode switches applied');

// Import modules with error handling
let VelvetStreamClient, VelvetBrainContext, ScreenIntelligence, ExecutiveDysfunctionEmergencyMode;
let VelvetDatabaseIPCHandlers, VelvetSecurityManager, SecureErrorHandler, SecureAPIClient, VelvetSecurityAudit;

try {
    // Skip ALL complex modules in safe mode - they may cause SIGSEGV
    console.log('⚠️ Safe mode: Skipping ALL complex modules to prevent crashes');
    console.log('✅ Core modules skipped (ultra-safe mode)');
} catch (error) {
    console.log('⚠️ Some advanced modules not available:', error.message);
}

try {
    console.log('⚠️ Safe mode: Skipping advanced features to prevent crashes');
    console.log('✅ Advanced features skipped (ultra-safe mode)');
} catch (error) {
    console.log('⚠️ Advanced features not available:', error.message);
}

try {
    console.log('⚠️ Safe mode: Skipping security modules to prevent crashes');
    console.log('✅ Security modules skipped (ultra-safe mode)');
} catch (error) {
    console.log('⚠️ Security modules not available:', error.message);
}

// Global brain context manager (with fallback for safe mode)
console.log('⚠️ Safe mode: Using fallback brain context');
global.velvetBrainContext = { 
    initialized: false, 
    safeMode: true,
    message: 'Brain context disabled in safe mode' 
};

let velvetStreamClient = null;
let databaseService = null;
let securityManager = null;
let errorHandler = null;
let secureApiClient = null;
let securityAudit = null;

// Skip security initialization in safe mode
console.log('⚠️ Safe mode: Skipping security initialization');

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
  requiredDetections: 3,
  lastDetectionTime: 0
};

function createWindow() {
  console.log('🪟 Starting createWindow() function - SAFE MODE');
  try {
    // SAFE MODE: Basic window without problematic flags
    mainWindow = new BrowserWindow({
      width: 500,
      height: 650,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      // Removed problematic type and level settings
      skipTaskbar: true,
      movable: true,
      minimizable: false,
      maximizable: false,
      resizable: false,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
        backgroundThrottling: false,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    // Add error handlers
    mainWindow.on('unresponsive', () => {
      console.warn('⚠️ Main window became unresponsive');
    });
    
    mainWindow.on('responsive', () => {
      console.log('✅ Main window responsive again');
    });
    
    mainWindow.webContents.on('crashed', () => {
      console.error('💥 Main window crashed - attempting recovery');
      setTimeout(() => {
        if (mainWindow && mainWindow.isDestroyed()) {
          createWindow();
        }
      }, 1000);
    });

    mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));
    
    // Position window
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    console.log('Screen dimensions:', { width, height });
    
    const windowWidth = 500;
    const windowHeight = 650;
    const x = width - windowWidth - 20;
    const y = height - windowHeight - 20;
    
    mainWindow.setPosition(x, y);
    console.log(`🪟 Window positioned at (${x}, ${y})`);

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
      console.log('✅ Main window shown');
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
      console.log('🪟 Main window closed');
    });

    console.log('✅ Window created successfully in SAFE MODE');

  } catch (error) {
    console.error('❌ Failed to create window:', error);
  }
}

// Basic IPC handlers for essential functionality
ipcMain.handle('get-system-info', async () => {
  return {
    platform: process.platform,
    version: app.getVersion(),
    safeMode: true
  };
});

// Voice transcription (essential for testing)
ipcMain.handle('transcribe-audio', async (event, audioBase64) => {
  try {
    console.log('🎤 Audio transcription requested (safe mode)');
    // Basic response for testing
    return {
      success: true,
      transcript: "Safe mode audio transcription",
      confidence: 0.8
    };
  } catch (error) {
    console.error('❌ Transcription error:', error);
    return { success: false, error: error.message };
  }
});

// Text-to-speech (essential for testing)
ipcMain.handle('speak-text', async (event, text, options = {}) => {
  try {
    console.log('🔊 TTS requested (safe mode):', text.substring(0, 50));
    // Basic response for testing
    return { success: true, message: 'TTS completed (safe mode)' };
  } catch (error) {
    console.error('❌ TTS error:', error);
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  console.log('🚀 Electron app ready - SAFE MODE');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  console.log('🛑 App shutting down - SAFE MODE');
});

console.log('✅ Velvet SAFE MODE initialization complete');