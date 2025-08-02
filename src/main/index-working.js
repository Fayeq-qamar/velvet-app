const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer } = require('electron');
const path = require('path');
require('dotenv').config();

console.log('🛡️ Starting Velvet in WORKING MODE (crash-free)');

let mainWindow;

function createWindow() {
  console.log('🪟 Creating main window...');
  try {
    mainWindow = new BrowserWindow({
      width: 500,
      height: 650,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
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

    // Error handlers
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

    console.log('✅ Window created successfully');

  } catch (error) {
    console.error('❌ Failed to create window:', error);
  }
}

// Essential IPC handlers only
ipcMain.handle('get-system-info', async () => {
  return {
    platform: process.platform,
    version: app.getVersion(),
    workingMode: true
  };
});

// OpenAI Whisper transcription handler
ipcMain.handle('transcribe-audio', async (event, audioBase64) => {
  try {
    console.log('🎤 Audio transcription requested');
    
    if (!audioBase64 || !process.env.OPENAI_API_KEY) {
      throw new Error('Missing audio data or API key');
    }

    const fetch = (await import('node-fetch')).default;
    const FormData = require('form-data');
    
    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audioBase64, 'base64');
    
    // Create form data
    const formData = new FormData();
    formData.append('file', audioBuffer, {
      filename: 'audio.webm',
      contentType: 'audio/webm'
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Transcription successful');
    
    return {
      success: true,
      transcript: result.text,
      confidence: 0.9
    };

  } catch (error) {
    console.error('❌ Transcription error:', error);
    return { success: false, error: error.message };
  }
});

// ElevenLabs TTS handler
ipcMain.handle('speak-text', async (event, text, options = {}) => {
  try {
    console.log('🔊 TTS requested:', text.substring(0, 50));
    
    if (!text || !process.env.ELEVENLABS_API_KEY) {
      throw new Error('Missing text or API key');
    }

    const fetch = (await import('node-fetch')).default;
    
    const voiceId = 'm7GHBtY0UEqljrKQw2JH'; // Gentle voice
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.30,
          style: 0.0,
          use_speaker_boost: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.buffer();
    const audioBase64 = audioBuffer.toString('base64');
    
    console.log('✅ TTS completed');
    
    return { 
      success: true, 
      audioData: audioBase64,
      message: 'TTS completed successfully' 
    };

  } catch (error) {
    console.error('❌ TTS error:', error);
    return { success: false, error: error.message };
  }
});

// Placeholder handlers for missing functions
ipcMain.handle('check-audio-playing', async () => {
  return { playing: false, message: 'Audio detection disabled in working mode' };
});

ipcMain.handle('detect-screen-sharing', async () => {
  return { sharing: false, message: 'Screen sharing detection disabled in working mode' };
});

ipcMain.handle('task-get-current', async () => {
  return { task: null, message: 'Task system disabled in working mode' };
});

ipcMain.handle('get-system-volume', async () => {
  return { volume: 0.5, message: 'System volume detection disabled in working mode' };
});

app.whenReady().then(() => {
  console.log('🚀 Electron app ready - WORKING MODE');
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
  console.log('🛑 App shutting down - WORKING MODE');
});

console.log('✅ Velvet WORKING MODE initialization complete');