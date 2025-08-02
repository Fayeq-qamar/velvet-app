const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// Load environment variables
require('dotenv').config();

// PRODUCTION: Enhanced security and error handling
const isDev = process.env.NODE_ENV === 'development';
const isPackaged = app.isPackaged;

// STEALTH MODE: Process masking for production
if (!isDev) {
  app.setName('CoreAudioService');
  process.title = 'com.apple.coreaudio';
  app.dock?.hide();
}

// Enhanced command line switches for content protection
app.commandLine.appendSwitch('disable-features', 'IOSurfaceCapturer,DesktopCaptureMacV2');
app.commandLine.appendSwitch('enable-features', 'ScreenCaptureKitPickerSonoma');
app.commandLine.appendSwitch('disable-dev-shm-usage');
app.commandLine.appendSwitch('no-sandbox');

console.log('🔧 Production stealth configuration applied');

// Service management
class ServiceManager {
  constructor() {
    this.services = new Map();
    this.isReady = false;
    this.startupTimeout = 60000; // 60 seconds
  }

  async startServices() {
    console.log('🚀 Starting Velvet services...');
    
    try {
      // Start preprocessing worker
      await this.startPreprocWorker();
      
      // Start capture service
      await this.startCaptureService();
      
      // Verify services are running
      await this.verifyServices();
      
      this.isReady = true;
      console.log('✅ All services started successfully');
      
    } catch (error) {
      console.error('❌ Failed to start services:', error);
      throw error;
    }
  }

  async startPreprocWorker() {
    const servicePath = isPackaged 
      ? path.join(process.resourcesPath, 'services', 'preproc-worker')
      : path.join(__dirname, '../../services/preproc-worker');
    
    console.log('🐍 Starting preprocessing worker at:', servicePath);
    
    // Setup Python environment
    const pythonPath = path.join(servicePath, 'venv', 'bin', 'python3');
    const mainScript = path.join(servicePath, 'main.py');
    
    // Create virtual environment if it doesn't exist
    if (!fs.existsSync(path.join(servicePath, 'venv'))) {
      console.log('Creating Python virtual environment...');
      await this.runCommand('python3', ['-m', 'venv', 'venv'], { cwd: servicePath });
      
      // Install dependencies
      const pipPath = path.join(servicePath, 'venv', 'bin', 'pip');
      const requirementsPath = path.join(servicePath, 'requirements.txt');
      await this.runCommand(pipPath, ['install', '-r', requirementsPath], { cwd: servicePath });
    }
    
    // Start the service
    const worker = spawn(pythonPath, [mainScript], {
      cwd: servicePath,
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false
    });
    
    this.services.set('preproc-worker', worker);
    
    worker.stdout.on('data', (data) => {
      console.log('🐍 Preproc:', data.toString().trim());
    });
    
    worker.stderr.on('data', (data) => {
      console.error('🐍 Preproc Error:', data.toString().trim());
    });
    
    // Wait for service to be ready
    return this.waitForPort(8001, 'Preprocessing Worker');
  }

  async startCaptureService() {
    const servicePath = isPackaged
      ? path.join(process.resourcesPath, 'services')
      : path.join(__dirname, '../../services/capture-service');
    
    const executablePath = isPackaged
      ? path.join(process.resourcesPath, 'services', 'velvet-capture-service')
      : path.join(servicePath, 'target', 'release', 'velvet-capture-service');
    
    console.log('🦀 Starting capture service at:', executablePath);
    
    // Build service if not packaged
    if (!isPackaged && !fs.existsSync(executablePath)) {
      console.log('Building Rust capture service...');
      await this.runCommand('cargo', ['build', '--release'], { cwd: servicePath });
    }
    
    const captureService = spawn(executablePath, [], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false
    });
    
    this.services.set('capture-service', captureService);
    
    captureService.stdout.on('data', (data) => {
      console.log('🦀 Capture:', data.toString().trim());
    });
    
    captureService.stderr.on('data', (data) => {
      console.error('🦀 Capture Error:', data.toString().trim());
    });
    
    // Wait for service to be ready
    return this.waitForPort(50051, 'Capture Service');
  }

  async waitForPort(port, serviceName, timeout = 30000) {
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const checkPort = () => {
        const { exec } = require('child_process');
        exec(`lsof -Pi :${port} -sTCP:LISTEN -t`, (error, stdout) => {
          if (stdout.trim()) {
            console.log(`✅ ${serviceName} is ready on port ${port}`);
            resolve();
          } else if (Date.now() - startTime > timeout) {
            reject(new Error(`${serviceName} failed to start within ${timeout}ms`));
          } else {
            setTimeout(checkPort, 1000);
          }
        });
      };
      
      checkPort();
    });
  }

  async verifyServices() {
    // Verify preprocessing worker
    try {
      const response = await fetch('http://127.0.0.1:8001/health');
      if (!response.ok) throw new Error('Preproc worker health check failed');
    } catch (error) {
      throw new Error(`Preprocessing worker verification failed: ${error.message}`);
    }
    
    // Verify capture service is listening
    const { exec } = require('child_process');
    return new Promise((resolve, reject) => {
      exec('lsof -Pi :50051 -sTCP:LISTEN -t', (error, stdout) => {
        if (stdout.trim()) {
          resolve();
        } else {
          reject(new Error('Capture service not listening on port 50051'));
        }
      });
    });
  }

  runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, options);
      
      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });
      
      process.on('error', reject);
    });
  }

  stopServices() {
    console.log('🛑 Stopping all services...');
    
    this.services.forEach((service, name) => {
      console.log(`Stopping ${name}...`);
      if (!service.killed) {
        service.kill('SIGTERM');
        
        // Force kill after 5 seconds
        setTimeout(() => {
          if (!service.killed) {
            service.kill('SIGKILL');
          }
        }, 5000);
      }
    });
    
    this.services.clear();
    this.isReady = false;
  }
}

// Global instances
let mainWindow;
let serviceManager;
const { VelvetStreamClient, VelvetBrainContext } = require('./velvet-stream-client');
global.velvetBrainContext = new VelvetBrainContext();

// Enhanced error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  if (serviceManager) {
    serviceManager.stopServices();
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

function createWindow() {
  console.log('🪟 Creating main window');
  
  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    type: 'panel',
    level: 'screen-saver',
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
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Enhanced error handling
  mainWindow.on('unresponsive', () => {
    console.warn('⚠️ Main window unresponsive');
  });

  mainWindow.on('responsive', () => {
    console.log('✅ Main window responsive');
  });

  mainWindow.webContents.on('crashed', () => {
    console.error('💥 Main window crashed');
    setTimeout(() => {
      if (mainWindow && mainWindow.isDestroyed()) {
        createWindow();
      }
    }, 1000);
  });

  // Load the app
  const htmlPath = isPackaged
    ? path.join(__dirname, '../../public/index.html')
    : path.join(__dirname, '../../public/index.html');
  
  mainWindow.loadFile(htmlPath);

  // Position window
  const { screen } = require('electron');
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const margin = 20;
  const x = width - 500 - margin;
  const y = height - 650 - margin;
  
  mainWindow.setPosition(x, y);
  
  // Show window once services are ready
  if (serviceManager && serviceManager.isReady) {
    mainWindow.show();
  }

  // Development tools in dev mode only
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

// Beta feedback system
ipcMain.handle('submit-feedback', async (event, feedback) => {
  try {
    console.log('📝 Beta feedback received:', feedback);
    
    // Save feedback locally
    const feedbackDir = path.join(app.getPath('userData'), 'feedback');
    if (!fs.existsSync(feedbackDir)) {
      fs.mkdirSync(feedbackDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const feedbackFile = path.join(feedbackDir, `feedback-${timestamp}.json`);
    
    const feedbackData = {
      timestamp: new Date().toISOString(),
      version: app.getVersion(),
      platform: process.platform,
      ...feedback
    };
    
    fs.writeFileSync(feedbackFile, JSON.stringify(feedbackData, null, 2));
    
    return { success: true, message: 'Feedback saved successfully' };
  } catch (error) {
    console.error('Failed to save feedback:', error);
    return { success: false, error: error.message };
  }
});

// Permission management
ipcMain.handle('check-permissions', async () => {
  const permissions = {
    screen: false,
    microphone: false
  };
  
  try {
    // Check screen recording permission
    const sources = await desktopCapturer.getSources({ types: ['screen'] });
    permissions.screen = sources.length > 0;
    
    // Check microphone permission
    permissions.microphone = await new Promise((resolve) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  } catch (error) {
    console.error('Permission check failed:', error);
  }
  
  return permissions;
});

ipcMain.handle('request-permissions', async () => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'Permissions Required',
    message: 'Velvet needs permissions to work properly',
    detail: 'Please grant Screen Recording and Microphone permissions in System Preferences.',
    buttons: ['Open System Preferences', 'Cancel'],
    defaultId: 0
  });
  
  if (result.response === 0) {
    shell.openExternal('x-apple-systempreferences:com.apple.preference.security?Privacy_ScreenCapture');
  }
  
  return result.response === 0;
});

// App lifecycle
app.whenReady().then(async () => {
  console.log('🚀 Velvet starting up...');
  
  try {
    // Initialize service manager
    serviceManager = new ServiceManager();
    
    // Start services
    await serviceManager.startServices();
    
    // Create main window
    createWindow();
    
    // Show window now that services are ready
    if (mainWindow) {
      mainWindow.show();
    }
    
    console.log('✅ Velvet ready!');
    
  } catch (error) {
    console.error('❌ Startup failed:', error);
    
    const result = await dialog.showMessageBox({
      type: 'error',
      title: 'Startup Failed',
      message: 'Velvet failed to start properly',
      detail: error.message,
      buttons: ['Retry', 'Quit'],
      defaultId: 0
    });
    
    if (result.response === 0) {
      app.relaunch();
    }
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (serviceManager) {
    serviceManager.stopServices();
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serviceManager) {
    serviceManager.stopServices();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

console.log('🧠 Velvet production main process initialized');