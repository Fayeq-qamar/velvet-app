const { app, BrowserWindow, ipcMain, globalShortcut, desktopCapturer } = require('electron');
const path = require('path');
require('dotenv').config();

console.log('🚀 Starting Velvet - FIXED VERSION');

// GRADUAL STEALTH MODE: Start basic, add features progressively
let STEALTH_ENABLED = false; // Start disabled, enable after window loads

if (STEALTH_ENABLED) {
    app.setName('CoreAudioService');
    process.title = 'com.apple.coreaudio';
    app.dock?.hide();
}

console.log('🔧 Basic initialization complete');

// PROGRESSIVE MODULE LOADING: Load only what we need to start
let velvetStreamClient = null;
let databaseService = null;
let databaseIPCHandlers = null;
let securityManager = null;
let screenIntelligence = null;
let executiveDysfunctionMode = null;

// EXECUTIVE FUNCTION FEATURE FLAG - Start enabled for gentle rollout
let EXECUTIVE_FUNCTION_ENABLED = true;  // Gradually enabled for Phase 2

// DATABASE FEATURE FLAG - Start disabled, enable after successful load
let DATABASE_ENABLED = true; // Re-enabled with crash-safe initialization

// SCREEN INTELLIGENCE FEATURE FLAG - Phase 3 integration
let SCREEN_INTELLIGENCE_ENABLED = true;  // Enable for Phase 3 screen monitoring

// Global brain context - simple fallback
global.velvetBrainContext = {
    initialized: true,
    getContext: () => ({ mode: 'basic', features: ['chat', 'voice'] })
};

let mainWindow;
let checklistWindow;
let meetingAssistantWindow;
let controlPanelWindow;
let dashboardWindow;

let stealthManager = {
    isHidden: false,
    contentProtectionActive: false,
    streamDetectionInterval: null,
    detectionCount: 0,
    requiredDetections: 3,
    lastDetectionTime: 0
};

function createWindow() {
    console.log('🪟 Creating your Velvet glass orb window...');
    try {
        // YOUR ORIGINAL VELVET WINDOW CONFIGURATION
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
                backgroundThrottling: false,
                preload: path.join(__dirname, 'preload.js')
            }
        });

        // 🥷 STEALTH MODE RE-ENABLED AFTER DEMO
        mainWindow.setContentProtection(true);
        mainWindow.setVisibleOnAllWorkspaces(false);
        console.log('🥷 Stealth mode RE-ENABLED - main window protected');

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

        // Load your ACTUAL ORIGINAL interface - just disable auto-features
        mainWindow.loadFile(path.join(__dirname, '../../public/index.html'));

        // Position in bottom-right corner (YOUR ORIGINAL DESIGN)
        const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
        console.log('Screen dimensions:', { width, height });

        const windowWidth = 500;
        const windowHeight = 650;
        const margin = 20;

        const x = width - windowWidth - margin;
        const y = height - windowHeight - margin;

        console.log('🎯 Positioning Velvet glass orb at:', { x, y });
        console.log('🔮 Look for your GLASS ORB in the BOTTOM-RIGHT corner!');
        mainWindow.setPosition(x, y);

        // macOS stealth (YOUR ORIGINAL STEALTH FEATURES)
        mainWindow.setAlwaysOnTop(true, 'screen-saver');
        mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

        if (process.platform === 'darwin') {
            try {
                mainWindow.setWindowButtonVisibility(false);

                // Enable content protection after window is stable
                setTimeout(() => {
                    try {
                        if (STEALTH_ENABLED) {
                            mainWindow.setContentProtection(true);
                            console.log('🔒 Content protection enabled');
                        }
                    } catch (protectionError) {
                        console.log('Content protection not available:', protectionError.message);
                    }
                }, 3000);

            } catch (e) {
                console.log('macOS stealth setup partial:', e.message);
            }
        }

        // Show window when ready (YOUR ORIGINAL LOGIC)
        mainWindow.once('ready-to-show', () => {
            mainWindow.show();
            console.log('✅ VELVET GLASS ORB IS NOW VISIBLE! 🔮');
            console.log('🎭 Your chat and voice interface should be working!');

            // Enable stealth mode after successful launch
            setTimeout(() => {
                STEALTH_ENABLED = true;
                console.log('🥷 Stealth mode enabled');
            }, 5000);
        });

        mainWindow.on('closed', () => {
            mainWindow = null;
            console.log('🪟 Velvet window closed');
        });

        console.log('✅ Window setup complete - waiting for interface to load...');

    } catch (error) {
        console.error('❌ Failed to create window:', error);
    }
}

// ESSENTIAL IPC HANDLERS FOR YOUR CHAT AND VOICE

// Voice transcription (YOUR ORIGINAL FEATURE)
ipcMain.handle('transcribe-audio', async (event, audioBase64) => {
    try {
        console.log('🎤 Voice transcription requested');
        
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not found');
        }

        const axios = require('axios');
        const FormData = require('form-data');

        // Convert base64 to buffer
        const audioBuffer = Buffer.from(audioBase64, 'base64');

        // Create form data
        const form = new FormData();
        form.append('file', audioBuffer, {
            filename: 'audio.webm',
            contentType: 'audio/webm'
        });
        form.append('model', 'whisper-1');

        const response = await axios.post(
            'https://api.openai.com/v1/audio/transcriptions',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                },
                timeout: 30000
            }
        );

        console.log('✅ Transcription successful:', response.data.text);
        return {
            success: true,
            transcript: response.data.text
        };

    } catch (error) {
        console.error('❌ Transcription error:', error.message);
        return {
            success: false,
            transcript: "",
            error: "Voice recognition had trouble. Try typing instead!"
        };
    }
});

// Text-to-speech (YOUR ORIGINAL FEATURE)
ipcMain.handle('speak-text', async (event, text, options = {}) => {
    try {
        console.log('🔊 TTS requested:', text.substring(0, 50) + '...');

        if (!process.env.ELEVENLABS_API_KEY) {
            throw new Error('ElevenLabs API key not found');
        }

        const axios = require('axios');

        const voiceId = 'm7GHBtY0UEqljrKQw2JH'; // Gentle voice ID (v2)
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                text: text,
                model_id: "eleven_turbo_v2",
                voice_settings: {
                    stability: 0.75,
                    similarity_boost: 0.30
                }
            },
            {
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': process.env.ELEVENLABS_API_KEY
                },
                responseType: 'arraybuffer',
                timeout: 30000
            }
        );

        // Send audio data back to renderer for playback
        const audioBase64 = Buffer.from(response.data).toString('base64');
        console.log('✅ TTS audio generated successfully');

        return {
            success: true,
            audioData: audioBase64,
            message: 'TTS completed successfully'
        };

    } catch (error) {
        console.error('❌ TTS error:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
});

// System info
ipcMain.handle('get-system-info', async () => {
    return {
        platform: process.platform,
        version: app.getVersion(),
        mode: 'restored_original'
    };
});

// Control Panel Window (YOUR ORIGINAL FEATURE)
ipcMain.handle('open-control-panel', async () => {
    if (controlPanelWindow) {
        controlPanelWindow.focus();
        return;
    }

    // Get screen dimensions for proper positioning
    const { width: screenWidth, height: screenHeight } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    
    // Position control panel in center-right area
    const panelWidth = 500;
    const panelHeight = 700;
    const panelX = Math.max(screenWidth - panelWidth - 50, (screenWidth * 2) / 3); // Right third of screen
    const panelY = Math.max(50, (screenHeight - panelHeight) / 2); // Centered vertically
    
    controlPanelWindow = new BrowserWindow({
        width: panelWidth,
        height: panelHeight,
        x: panelX,
        y: panelY,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // 🥷 STEALTH MODE RE-ENABLED AFTER DEMO
    controlPanelWindow.setContentProtection(true);
    controlPanelWindow.setVisibleOnAllWorkspaces(false);
    console.log('🥷 Control panel stealth mode RE-ENABLED');

    controlPanelWindow.loadFile(path.join(__dirname, '../../public/control-panel.html'));
    
    controlPanelWindow.once('ready-to-show', () => {
        controlPanelWindow.show();
        console.log('✅ Control Panel opened');
    });

    controlPanelWindow.on('closed', () => {
        controlPanelWindow = null;
        console.log('🪟 Control Panel closed');
    });
});

// Meeting Assistant Window (YOUR ORIGINAL FEATURE)  
ipcMain.handle('open-meeting-assistant', async () => {
    if (meetingAssistantWindow) {
        meetingAssistantWindow.focus();
        return;
    }

    // Get screen dimensions for proper positioning
    const { width: screenWidth, height: screenHeight } = require('electron').screen.getPrimaryDisplay().workAreaSize;
    
    // Position meeting assistant as floating bar at top of screen
    const meetingWidth = 900;   // Even wider horizontal bar
    const meetingHeight = 250;  // Responsive height for varying content
    const meetingX = (screenWidth - meetingWidth) / 2;  // Centered horizontally
    const meetingY = 50;        // Near top of screen
    
    meetingAssistantWindow = new BrowserWindow({
        width: meetingWidth,
        height: meetingHeight,
        x: meetingX,
        y: meetingY,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: true,
        minWidth: 600,
        maxWidth: 1200,
        minHeight: 150,
        maxHeight: 400,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // 🥷 STEALTH MODE RE-ENABLED AFTER DEMO
    meetingAssistantWindow.setContentProtection(true);
    meetingAssistantWindow.setVisibleOnAllWorkspaces(false);
    console.log('🥷 Meeting assistant stealth mode RE-ENABLED');

    meetingAssistantWindow.loadFile(path.join(__dirname, '../../public/meeting-assistant.html'));
    
    meetingAssistantWindow.once('ready-to-show', () => {
        meetingAssistantWindow.show();
        console.log('✅ Meeting Assistant opened');
    });

    meetingAssistantWindow.on('closed', () => {
        meetingAssistantWindow = null;
        console.log('🪟 Meeting Assistant closed');
    });
});

// Checklist Window (YOUR ORIGINAL FEATURE)
ipcMain.handle('open-checklist', async () => {
    if (checklistWindow) {
        checklistWindow.focus();
        return;
    }

    checklistWindow = new BrowserWindow({
        width: 350,
        height: 500,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // 🥷 STEALTH MODE RE-ENABLED AFTER DEMO (checklist)
    checklistWindow.setContentProtection(true);
    checklistWindow.setVisibleOnAllWorkspaces(false);
    console.log('🥷 Checklist stealth mode RE-ENABLED');

    checklistWindow.loadFile(path.join(__dirname, '../../public/checklist.html'));
    
    checklistWindow.once('ready-to-show', () => {
        checklistWindow.show();
        console.log('✅ Checklist opened');
    });

    checklistWindow.on('closed', () => {
        checklistWindow = null;
        console.log('🪟 Checklist closed');
    });
});

// Hide Control Panel
ipcMain.handle('control-panel-hide', async () => {
    if (controlPanelWindow) {
        controlPanelWindow.hide();
        console.log('✅ Control Panel hidden');
    }
});

// Close Control Panel
ipcMain.handle('control-panel-close', async () => {
    if (controlPanelWindow) {
        controlPanelWindow.close();
        controlPanelWindow = null;
        console.log('✅ Control Panel closed');
    }
});

// Close Meeting Assistant
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
    if (meetingAssistantWindow) {
        meetingAssistantWindow.close();
        meetingAssistantWindow = null;
        console.log('✅ Meeting Assistant closed');
    }
});

// Show Meeting Assistant (called from frontend meetingAssistant.show())
ipcMain.handle('meeting-assistant-show', async (event, meetingData) => {
    try {
        console.log('🎤 Showing Meeting Assistant with data:', meetingData);
        
        // If window doesn't exist, create it first
        if (!meetingAssistantWindow) {
            // Call the handler function directly instead of through ipcMain.handle
            const openHandler = require('events').EventEmitter.prototype.emit.call(
                ipcMain, 'open-meeting-assistant'
            );
            // Actually just call our existing handler logic directly
            if (meetingAssistantWindow) {
                meetingAssistantWindow.focus();
            } else {
                // Get screen dimensions for proper positioning
                const { width: screenWidth, height: screenHeight } = require('electron').screen.getPrimaryDisplay().workAreaSize;
                
                // Position meeting assistant as floating bar at top of screen
                const meetingWidth = 900;   // Even wider horizontal bar
                const meetingHeight = 250;  // Responsive height for varying content
                const meetingX = (screenWidth - meetingWidth) / 2;  // Centered horizontally
                const meetingY = 50;        // Near top of screen
                
                meetingAssistantWindow = new BrowserWindow({
                    width: meetingWidth,
                    height: meetingHeight,
                    x: meetingX,
                    y: meetingY,
                    frame: false,
                    transparent: true,
                    alwaysOnTop: true,
                    skipTaskbar: true,
                    resizable: true,
                    minWidth: 600,
                    maxWidth: 1200,
                    minHeight: 150,
                    maxHeight: 400,
                    show: false,
                    webPreferences: {
                        nodeIntegration: false,
                        contextIsolation: true,
                        webSecurity: true,
                        preload: path.join(__dirname, 'preload.js')
                    }
                });
                
                // 🥷 STEALTH MODE RE-ENABLED AFTER DEMO (show handler)
                meetingAssistantWindow.setContentProtection(true);
                meetingAssistantWindow.setVisibleOnAllWorkspaces(false);
                console.log('🥷 Meeting assistant stealth mode RE-ENABLED (show)');

                meetingAssistantWindow.loadFile(path.join(__dirname, '../../public/meeting-assistant.html'));
                
                meetingAssistantWindow.once('ready-to-show', () => {
                    meetingAssistantWindow.show();
                });
                
                meetingAssistantWindow.on('closed', () => {
                    meetingAssistantWindow = null;
                    console.log('🪟 Meeting Assistant closed');
                });
            }
        }
        
        // Show and focus the window
        if (meetingAssistantWindow) {
            meetingAssistantWindow.show();
            meetingAssistantWindow.focus();
            
            // Send meeting data to the window if provided
            if (meetingData) {
                meetingAssistantWindow.webContents.send('meeting-data-update', meetingData);
            }
            
            console.log('✅ Meeting Assistant shown successfully');
            return { success: true };
        } else {
            throw new Error('Failed to create meeting assistant window');
        }
    } catch (error) {
        console.error('❌ Error in meeting-assistant-show handler:', error);
        return { success: false, error: error.message };
    }
});

// Close Checklist
ipcMain.handle('checklist-close', async () => {
    if (checklistWindow) {
        checklistWindow.close();
        checklistWindow = null;
        console.log('✅ Checklist closed');
    }
});

// Open Dashboard (SEPARATE WINDOW - NOT INTEGRATED)
ipcMain.handle('open-dashboard', async () => {
    if (dashboardWindow) {
        dashboardWindow.focus();
        return;
    }

    dashboardWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        transparent: true,
        alwaysOnTop: false,
        skipTaskbar: false,
        resizable: true,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true
        }
    });

    // 🥷 STEALTH MODE RE-ENABLED AFTER DEMO (dashboard)
    dashboardWindow.setContentProtection(true);
    dashboardWindow.setVisibleOnAllWorkspaces(false);
    console.log('🥷 Dashboard stealth mode RE-ENABLED');

    dashboardWindow.loadFile(path.join(__dirname, '../../public/dashboard.html'));
    
    dashboardWindow.once('ready-to-show', () => {
        dashboardWindow.show();
        console.log('✅ Velvet Dashboard opened (separate window)');
    });

    dashboardWindow.on('closed', () => {
        dashboardWindow = null;
        console.log('🪟 Dashboard closed');
    });
});

// Close Dashboard
ipcMain.handle('dashboard-close', async () => {
    if (dashboardWindow) {
        dashboardWindow.close();
        dashboardWindow = null;
        console.log('✅ Dashboard closed');
    }
});

// OpenAI chat (YOUR ORIGINAL FEATURE)
ipcMain.handle('openai-chat', async (event, messages) => {
    try {
        console.log('💬 OpenAI chat requested');

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not found');
        }

        const axios = require('axios');

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: messages,
                max_tokens: 120,
                temperature: 0.8
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        const reply = response.data.choices[0].message.content;
        console.log('✅ Chat response generated');

        return {
            success: true,
            message: reply
        };

    } catch (error) {
        console.error('❌ Chat error:', error.message);
        let message = "I'm having trouble connecting right now. Let me try to help you anyway! 😊";
        
        if (error.response?.status === 429) {
            message = "arre yaar, too many requests right now. OpenAI is telling me to slow down - let's try again in a minute!";
        }
        
        return {
            success: false,
            error: error.message,
            message: message
        };
    }
});

// Missing IPC handlers from user error logs
ipcMain.handle('check-audio-playing', async () => {
    try {
        // Simple check - return false for now (can be enhanced later)
        return { success: true, isPlaying: false };
    } catch (error) {
        console.error('❌ Check audio error:', error.message);
        return { success: false, isPlaying: false };
    }
});

ipcMain.handle('detect-screen-sharing', async () => {
    try {
        // Simple detection - return false for now (can be enhanced later)  
        return { success: true, isSharing: false };
    } catch (error) {
        console.error('❌ Screen sharing detection error:', error.message);
        return { success: false, isSharing: false };
    }
});

ipcMain.handle('task-get-current', async () => {
    try {
        // Return empty current task for now (can be enhanced later)
        return { success: true, task: null };
    } catch (error) {
        console.error('❌ Get current task error:', error.message);
        return { success: false, task: null };
    }
});

ipcMain.handle('get-system-volume', async () => {
    try {
        // Return default volume level for now (can be enhanced later)
        return { success: true, volume: 0.5 };
    } catch (error) {
        console.error('❌ Get system volume error:', error.message);
        return { success: false, volume: 0.5 };
    }
});

ipcMain.handle('control-panel-show', async () => {
    try {
        // Same as open-control-panel but with different name for compatibility
        if (controlPanelWindow) {
            controlPanelWindow.focus();
            return { success: true };
        }
        
        await ipcMain.emit('open-control-panel');
        return { success: true };
    } catch (error) {
        console.error('❌ Control panel show error:', error.message);
        return { success: false, error: error.message };
    }
});

// Missing handlers that are breaking the AI system
ipcMain.handle('get-brain-context', async () => {
    try {
        // Return basic brain context
        return { 
            success: true, 
            context: {
                mode: 'velvet',
                personality: 'gentle_neurodivergent_companion',
                language_mix: 'hinglish',
                energy_level: 'warm',
                features: ['chat', 'voice', 'social_decoder']
            }
        };
    } catch (error) {
        console.error('❌ Brain context error:', error.message);
        return { success: false, context: null };
    }
});

// IPC handler to get stream status
ipcMain.handle('get-stream-status', () => {
  if (velvetStreamClient) {
    return velvetStreamClient.getStreamStatus();
  }
  return { connected: false, activeStreams: [], reconnectAttempts: 0 };
});

ipcMain.handle('emergency-mode-status', async () => {
    try {
        // Return emergency mode status
        return { 
            success: true, 
            isActive: false,
            mode: 'normal'
        };
    } catch (error) {
        console.error('❌ Emergency mode status error:', error.message);
        return { success: false, isActive: false };
    }
});

// Missing IPC handlers for audio and screen features
ipcMain.handle('get-system-audio-devices', async () => {
    try {
        // Return empty array for now - can be enhanced later
        return { success: true, devices: [] };
    } catch (error) {
        console.error('❌ Get system audio devices error:', error.message);
        return { success: false, devices: [] };
    }
});

ipcMain.handle('get-desktop-sources', async (event, options = {}) => {
    try {
        console.log('📺 Getting desktop sources for OCR...');
        
        const { desktopCapturer } = require('electron');
        
        const sources = await desktopCapturer.getSources({
            types: ['screen'],  // Only screens, not individual windows
            thumbnailSize: options.thumbnailSize || { width: 1920, height: 1080 },
            fetchWindowIcons: false
        });
        
        console.log(`✅ Found ${sources.length} screen sources`);
        return { success: true, sources: sources };
    } catch (error) {
        console.error('❌ Get desktop sources error:', error.message);
        return { success: false, sources: [], error: error.message };
    }
});

ipcMain.handle('capture-screen-for-ocr', async (event, sourceId) => {
    try {
        console.log('📸 Capturing screen for OCR using desktopCapturer...');
        
        const { desktopCapturer } = require('electron');
        
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
            error: error.message,
            timestamp: Date.now()
        };
    }
});

ipcMain.handle('get-current-audio-context', async () => {
    try {
        // Return basic audio context for now - can be enhanced later
        return { 
            success: true, 
            context: {
                hasAudio: false,
                volume: 0.5,
                isRecording: false
            }
        };
    } catch (error) {
        console.error('❌ Get current audio context error:', error.message);
        return { success: false, context: null };
    }
});

ipcMain.handle('capture-system-audio', async () => {
    try {
        // Return basic audio capture response for now - can be enhanced later
        return { 
            success: true, 
            audioData: null,
            format: 'none',
            message: 'Audio capture placeholder'
        };
    } catch (error) {
        console.error('❌ Capture system audio error:', error.message);
        return { success: false, audioData: null };
    }
});

// Main Velvet personality chat completion
ipcMain.handle('chat-completion', async (event, messages) => {
    try {
        console.log('💬 Main Velvet chat completion requested');

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not found');
        }

        const axios = require('axios');

        // Enhanced Velvet personality prompt for main chat
        const systemPrompt = `You are Velvet, a warm and understanding AI companion specifically designed for neurodivergent minds. You speak with genuine empathy, mixing English with occasional Hindi words naturally (like "yaar", "bas", "thoda"). You understand ADHD, autism, and executive dysfunction deeply.

Key traits:
- Warm, gentle, never judgmental
- Use 70% English, 30% Hindi words naturally mixed
- Short responses (1-2 sentences max)
- Celebrate small wins enthusiastically
- Validate struggles without trying to "fix" everything
- Use gentle humor and emotional warmth
- Address the person directly and personally

Examples of your speaking style:
"Areh yaar, that sounds really tough! 💜 Want to break it down into tiny steps?"
"You did great today, bas take it easy on yourself, haan?"
"Arre, I totally get that feeling! Let's figure this out together."`;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages
                ],
                max_tokens: 120,
                temperature: 0.8
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        const reply = response.data.choices[0].message.content;
        console.log('✅ Main Velvet chat response generated');

        return reply.trim();

    } catch (error) {
        console.error('❌ Main Velvet chat completion error:', error.message);
        return "Arre yaar, I'm having some tech troubles! But I'm still here for you. 💜";
    }
});

// Meeting Assistant dedicated chat completion
ipcMain.handle('meeting-assistant-chat-completion', async (event, messages) => {
    try {
        console.log('🎤 Meeting Assistant chat completion requested');

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not found');
        }

        const axios = require('axios');

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: messages, // Use messages as-is (they include the co-pilot personality)
                max_tokens: 200,     // Longer responses for meeting assistance
                temperature: 0.7     // Slightly more focused for professional contexts
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        const reply = response.data.choices[0].message.content;
        console.log('✅ Meeting Assistant response generated');

        return reply.trim();

    } catch (error) {
        console.error('❌ Meeting Assistant chat completion error:', error.message);
        return "I'm having trouble processing that right now. Could you try rephrasing your question?";
    }
});

// GRADUAL FEATURE LOADING (after window is stable)
function loadAdvancedFeatures() {
    console.log('🔄 Loading advanced features...');

    setTimeout(() => {
        if (DATABASE_ENABLED) {
            initializeDatabaseService();
        } else {
            console.log('📊 Database service disabled - skipping initialization');
        }
    }, 10000);

    // Load executive function features immediately - they work without database
    setTimeout(() => {
        initializeExecutiveFunctionFeatures();
    }, 3000);

    // Load screen intelligence features for pattern detection
    setTimeout(() => {
        if (SCREEN_INTELLIGENCE_ENABLED) {
            initializeScreenIntelligenceService();
        }
    }, 18000);

    setTimeout(() => {
        try {
            console.log('🎭 Attempting to load social decoder...');
            // Social decoder would go here
        } catch (error) {
            console.log('⚠️ Social decoder not available:', error.message);
        }
    }, 20000);
}

// SAFE DATABASE INITIALIZATION - CRASH-PROOF VERSION
async function initializeDatabaseService() {
    try {
        console.log('📊 Initializing Velvet Database Service...');
        
        // Add safety timeout to prevent hanging
        const initTimeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Database initialization timeout')), 30000);
        });
        
        const initDatabase = async () => {
            // Import database modules only when needed
            const VelvetDatabaseIPCHandlers = require('./database-ipc-handlers');
            
            // Initialize database service with error boundaries
            databaseIPCHandlers = new VelvetDatabaseIPCHandlers();
            
            // Wrap in additional try-catch for native module crashes
            try {
                const result = await databaseIPCHandlers.initialize();
                return result;
            } catch (nativeError) {
                console.error('❌ Native module error during database init:', nativeError);
                throw new Error('Native module failure - likely sqlite3/keytar issue');
            }
        };
        
        // Race between initialization and timeout
        const result = await Promise.race([initDatabase(), initTimeout]);
        
        if (result.success) {
            DATABASE_ENABLED = true;
            console.log('✅ Database service initialized successfully');
            console.log('🎯 Database features are now available');
        } else {
            console.log('⚠️ Database initialization failed:', result.error);
            console.log('📱 Velvet will continue without database features');
        }
        
    } catch (error) {
        console.log('⚠️ Database features not available:', error.message);
        console.log('📱 Velvet will continue without database features');
        
        // Ensure we don't break the app
        DATABASE_ENABLED = false;
        databaseIPCHandlers = null;
    }
}

// SAFE EXECUTIVE FUNCTION INITIALIZATION
async function initializeExecutiveFunctionFeatures() {
    try {
        console.log('🧠 Initializing Executive Function Support...');
        
        // Import executive function modules only when needed
        const ExecutiveDysfunctionEmergencyMode = require('./executive-dysfunction-emergency');
        
        // Initialize executive function emergency mode
        executiveDysfunctionMode = new ExecutiveDysfunctionEmergencyMode();
        
        // Initialize with screen intelligence integration
        const result = await executiveDysfunctionMode.initialize(screenIntelligence);
        
        if (result) {
            EXECUTIVE_FUNCTION_ENABLED = true;
            console.log('✅ Executive Function Support initialized successfully');
            console.log('🎯 Gentle nudging and pattern detection active');
            
            // Connect to database for pattern storage if available
            if (DATABASE_ENABLED && databaseIPCHandlers) {
                await connectExecutiveFunctionToDatabase();
            }
            
            // Set up IPC handlers for executive function features
            setupExecutiveFunctionIPC();
            
        } else {
            console.log('⚠️ Executive Function initialization failed');
            console.log('📱 Velvet will continue without executive function features');
        }
        
    } catch (error) {
        console.log('⚠️ Executive Function features not available:', error.message);
        console.log('📱 Velvet will continue without executive function features');
        
        // Ensure we don't break the app
        EXECUTIVE_FUNCTION_ENABLED = false;
        executiveDysfunctionMode = null;
    }
}

// Connect executive function to database for pattern learning
async function connectExecutiveFunctionToDatabase() {
    try {
        console.log('🔗 Connecting Executive Function to database...');
        
        if (!executiveDysfunctionMode || !databaseIPCHandlers) {
            throw new Error('Executive function or database not available');
        }
        
        // Set up pattern storage callbacks
        executiveDysfunctionMode.onEmergency(async (emergencyData) => {
            try {
                // Store pattern data for learning
                const patternRecord = {
                    timestamp: Date.now(),
                    pattern_type: emergencyData.pattern || emergencyData.type,
                    intervention_level: emergencyData.intervention?.level || 'gentle',
                    user_response: emergencyData.userResponse || null,
                    context: {
                        type: emergencyData.type,
                        data: emergencyData.data
                    }
                };
                
                // Store in database for pattern learning
                if (databaseIPCHandlers.dataLayer) {
                    await databaseIPCHandlers.dataLayer.storeExecutivePattern(patternRecord);
                    console.log('📊 Executive function pattern stored for learning');
                }
            } catch (error) {
                console.error('❌ Error storing executive function pattern:', error);
            }
        });
        
        console.log('✅ Executive Function connected to database successfully');
        
    } catch (error) {
        console.error('❌ Failed to connect Executive Function to database:', error);
        // Continue without database connection
    }
}

// Set up IPC handlers for executive function features
function setupExecutiveFunctionIPC() {
    console.log('🔌 Setting up Executive Function IPC handlers...');
    
    // Get executive function status
    ipcMain.handle('executive-function-status', async () => {
        try {
            if (!EXECUTIVE_FUNCTION_ENABLED || !executiveDysfunctionMode) {
                return {
                    success: true,
                    enabled: false,
                    status: 'disabled',
                    message: 'Executive function features are disabled'
                };
            }
            
            const status = executiveDysfunctionMode.getEmergencyStatus();
            return {
                success: true,
                enabled: true,
                status: 'active',
                emergency: status,
                message: 'Executive function support is active'
            };
            
        } catch (error) {
            console.error('❌ Executive function status error:', error);
            return {
                success: false,
                enabled: false,
                status: 'error',
                error: error.message
            };
        }
    });
    
    // Activate safe space manually
    ipcMain.handle('executive-function-safe-space', async () => {
        try {
            if (!EXECUTIVE_FUNCTION_ENABLED || !executiveDysfunctionMode) {
                return {
                    success: false,
                    error: 'Executive function features not available'
                };
            }
            
            executiveDysfunctionMode.activateSafeSpace();
            return {
                success: true,
                message: 'Safe space activated'
            };
            
        } catch (error) {
            console.error('❌ Safe space activation error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    });
    
    // Get executive function testing functions
    ipcMain.handle('executive-function-test', async (event, testType) => {
        try {
            if (!EXECUTIVE_FUNCTION_ENABLED || !executiveDysfunctionMode) {
                return {
                    success: false,
                    error: 'Executive function features not available'
                };
            }
            
            const testFunctions = executiveDysfunctionMode.getTestingFunctions();
            
            if (testFunctions[testType]) {
                testFunctions[testType]();
                return {
                    success: true,
                    message: `${testType} test executed`
                };
            } else {
                return {
                    success: false,
                    error: `Unknown test type: ${testType}`
                };
            }
            
        } catch (error) {
            console.error('❌ Executive function test error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    });
    
    // Get available test functions list
    ipcMain.handle('executive-function-test-list', async () => {
        try {
            if (!EXECUTIVE_FUNCTION_ENABLED || !executiveDysfunctionMode) {
                return {
                    success: false,
                    tests: [],
                    error: 'Executive function features not available'
                };
            }
            
            const testFunctions = executiveDysfunctionMode.getTestingFunctions();
            const availableTests = Object.keys(testFunctions);
            
            return {
                success: true,
                tests: availableTests,
                message: 'Test functions available'
            };
            
        } catch (error) {
            console.error('❌ Executive function test list error:', error);
            return {
                success: false,
                tests: [],
                error: error.message
            };
        }
    });
    
    console.log('✅ Executive Function IPC handlers set up');
}

// SCREEN INTELLIGENCE SERVICE INITIALIZATION
async function initializeScreenIntelligenceService() {
    try {
        console.log('🔍 Initializing Screen Intelligence Service...');
        
        // Import screen intelligence module only when needed
        const ScreenIntelligence = require('./screen-intelligence');
        
        // Initialize screen intelligence
        screenIntelligence = new ScreenIntelligence();
        
        // Set up pattern detection event handlers
        screenIntelligence.on('patternDetected', (pattern) => {
            console.log(`🧠 Screen pattern detected: ${pattern.type}`, pattern);
            
            // Forward pattern to executive dysfunction system if available
            if (EXECUTIVE_FUNCTION_ENABLED && executiveDysfunctionMode) {
                executiveDysfunctionMode.handleScreenPattern(pattern);
            }
            
            // Send pattern to renderer for UI updates
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.send('screen-pattern-detected', pattern);
            }
        });
        
        screenIntelligence.on('windowChange', (windowInfo) => {
            console.log(`📱 Window changed: ${windowInfo.name} - ${windowInfo.title}`);
            
            // Send window change to renderer for context awareness
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.send('screen-window-changed', windowInfo);
            }
        });
        
        // Start monitoring with privacy-first approach
        await screenIntelligence.startMonitoring();
        
        // Set up IPC handlers for screen intelligence
        setupScreenIntelligenceIPC();
        
        console.log('✅ Screen Intelligence Service initialized successfully');
        console.log('🎯 Screen pattern detection and window monitoring are now active');
        
        return true;
        
    } catch (error) {
        console.log('⚠️ Screen Intelligence features not available:', error.message);
        console.log('📱 Velvet will continue without screen monitoring features');
        return false;
    }
}

// Screen Intelligence IPC Handlers
function setupScreenIntelligenceIPC() {
    // Get current screen intelligence stats
    ipcMain.handle('screen-intelligence-get-stats', async () => {
        try {
            if (!screenIntelligence || !SCREEN_INTELLIGENCE_ENABLED) {
                return {
                    success: false,
                    error: 'Screen Intelligence not available'
                };
            }
            
            const stats = screenIntelligence.getStats();
            return {
                success: true,
                stats: stats,
                isActive: screenIntelligence.isMonitoring
            };
            
        } catch (error) {
            console.error('❌ Screen intelligence stats error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    });
    
    // Toggle screen monitoring
    ipcMain.handle('screen-intelligence-toggle', async (event, enabled) => {
        try {
            if (!screenIntelligence) {
                return {
                    success: false,
                    error: 'Screen Intelligence not initialized'
                };
            }
            
            if (enabled && !screenIntelligence.isMonitoring) {
                await screenIntelligence.startMonitoring();
            } else if (!enabled && screenIntelligence.isMonitoring) {
                screenIntelligence.stopMonitoring();
            }
            
            return {
                success: true,
                isActive: screenIntelligence.isMonitoring,
                message: enabled ? 'Screen monitoring started' : 'Screen monitoring stopped'
            };
            
        } catch (error) {
            console.error('❌ Screen intelligence toggle error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    });
    
    // Get pattern detection settings
    ipcMain.handle('screen-intelligence-get-patterns', async () => {
        try {
            if (!screenIntelligence) {
                return {
                    success: false,
                    error: 'Screen Intelligence not available'
                };
            }
            
            return {
                success: true,
                patterns: screenIntelligence.patterns,
                isActive: screenIntelligence.isMonitoring
            };
            
        } catch (error) {
            console.error('❌ Screen intelligence patterns error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    });
    
    // Test screen intelligence features (development)
    ipcMain.handle('screen-intelligence-test', async (event, testType) => {
        try {
            if (!screenIntelligence) {
                return {
                    success: false,
                    error: 'Screen Intelligence not available'
                };
            }
            
            // Available test functions
            const availableTests = {
                'hyperfocus': () => screenIntelligence.emit('patternDetected', {
                    type: 'hyperfocus',
                    app: 'Test App',
                    duration: 45 * 60 * 1000,
                    message: 'Test hyperfocus pattern detected'
                }),
                'distraction': () => screenIntelligence.emit('patternDetected', {
                    type: 'distractionSpiral',
                    count: 12,
                    window: 2 * 60 * 1000,
                    message: 'Test distraction spiral detected'
                }),
                'task-avoidance': () => screenIntelligence.emit('patternDetected', {
                    type: 'taskAvoidance',
                    app: 'Document Editor',
                    count: 6,
                    message: 'Test task avoidance pattern detected'
                })
            };
            
            if (availableTests[testType]) {
                availableTests[testType]();
                return {
                    success: true,
                    message: `Test ${testType} pattern triggered`
                };
            }
            
            return {
                success: true,
                tests: Object.keys(availableTests),
                message: 'Available test functions'
            };
            
        } catch (error) {
            console.error('❌ Screen intelligence test error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    });
    
    console.log('✅ Screen Intelligence IPC handlers set up');
}

// APP LIFECYCLE
app.whenReady().then(() => {
    console.log('🚀 Electron app ready - creating your Velvet interface');
    createWindow();

    // Load advanced features after basic window is working
    loadAdvancedFeatures();

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

app.on('before-quit', async () => {
    console.log('🛑 Velvet shutting down gracefully');
    
    // Clean up executive function features
    if (EXECUTIVE_FUNCTION_ENABLED && executiveDysfunctionMode) {
        try {
            console.log('🧠 Stopping Executive Function features...');
            executiveDysfunctionMode.stop();
            console.log('✅ Executive Function features stopped successfully');
        } catch (error) {
            console.log('⚠️ Executive Function cleanup error:', error.message);
        }
    }
    
    // Clean up database connection
    if (DATABASE_ENABLED && databaseIPCHandlers) {
        try {
            console.log('🔒 Closing database connection...');
            await databaseIPCHandlers.close();
            console.log('✅ Database closed successfully');
        } catch (error) {
            console.log('⚠️ Database cleanup error:', error.message);
        }
    }
});

// DATABASE IPC HANDLERS (Safe and Isolated)
ipcMain.handle('db-health-check', async () => {
    try {
        if (!DATABASE_ENABLED || !databaseIPCHandlers) {
            return {
                success: true,
                status: 'disabled',
                message: 'Database features are disabled',
                enabled: false
            };
        }
        
        // Get health status from database service
        const healthResult = await databaseIPCHandlers.handleRequest('health', async () => {
            return databaseIPCHandlers.dataLayer.getSystemHealth();
        });
        
        return {
            success: true,
            status: 'enabled',
            enabled: true,
            health: healthResult.data || {},
            message: 'Database is operational'
        };
        
    } catch (error) {
        console.error('❌ Database health check error:', error);
        return {
            success: false,
            status: 'error',
            enabled: DATABASE_ENABLED,
            error: error.message,
            message: 'Database health check failed'
        };
    }
});

// DATABASE STATUS IPC HANDLER
ipcMain.handle('db-status', async () => {
    try {
        return {
            success: true,
            enabled: DATABASE_ENABLED,
            ready: !!(DATABASE_ENABLED && databaseIPCHandlers && databaseIPCHandlers.isReady),
            message: DATABASE_ENABLED ? 'Database service is active' : 'Database service is disabled'
        };
    } catch (error) {
        return {
            success: false,
            enabled: false,
            ready: false,
            error: error.message
        };
    }
});

console.log('✅ Velvet initialization complete - your glass orb should appear!');