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
let securityManager = null;
let screenIntelligence = null;
let executiveDysfunctionMode = null;

// Global brain context - simple fallback
global.velvetBrainContext = {
    initialized: true,
    getContext: () => ({ mode: 'basic', features: ['chat', 'voice'] })
};

let mainWindow;
let checklistWindow;
let meetingAssistantWindow;
let controlPanelWindow;

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
            transcript: response.data.text,
            confidence: 0.9
        };

    } catch (error) {
        console.error('❌ Transcription error:', error.message);
        return {
            success: false,
            error: error.message,
            transcript: ""
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

    controlPanelWindow = new BrowserWindow({
        width: 500,
        height: 700,
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

    meetingAssistantWindow = new BrowserWindow({
        width: 400,
        height: 600,
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

// Close Control Panel
ipcMain.handle('control-panel-close', async () => {
    if (controlPanelWindow) {
        controlPanelWindow.close();
        controlPanelWindow = null;
        console.log('✅ Control Panel closed');
    }
});

// Close Meeting Assistant
ipcMain.handle('meeting-assistant-close', async () => {
    if (meetingAssistantWindow) {
        meetingAssistantWindow.close();
        meetingAssistantWindow = null;
        console.log('✅ Meeting Assistant closed');
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

ipcMain.handle('chat-completion', async (event, messages) => {
    try {
        console.log('💬 Chat completion requested with Velvet personality');

        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key not found');
        }

        const axios = require('axios');

        // Enhanced Velvet personality prompt
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
        console.log('✅ Velvet chat response generated');

        return {
            success: true,
            message: reply
        };

    } catch (error) {
        console.error('❌ Chat completion error:', error.message);
        return {
            success: false,
            error: error.message,
            message: "Arre yaar, I'm having some tech troubles! But I'm still here for you. 💜"
        };
    }
});

// GRADUAL FEATURE LOADING (after window is stable)
function loadAdvancedFeatures() {
    console.log('🔄 Loading advanced features...');

    setTimeout(() => {
        try {
            // Try to load advanced modules one by one
            console.log('📊 Attempting to load database features...');
            // Database features would go here
        } catch (error) {
            console.log('⚠️ Database features not available:', error.message);
        }
    }, 10000);

    setTimeout(() => {
        try {
            console.log('🎭 Attempting to load social decoder...');
            // Social decoder would go here
        } catch (error) {
            console.log('⚠️ Social decoder not available:', error.message);
        }
    }, 15000);
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

app.on('before-quit', () => {
    console.log('🛑 Velvet shutting down gracefully');
});

console.log('✅ Velvet initialization complete - your glass orb should appear!');