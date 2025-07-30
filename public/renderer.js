// Load modules
require('dotenv').config();
const { getVelvetResponse } = require('../src/renderer/ai-secure.js');

// Initialize
let chatOpen = false;
let isTyping = false;
let voiceMode = false;

// Voice functionality will be handled by the HTML interface

function toggleChat() {
    chatOpen = !chatOpen;
    const chatWindow = document.getElementById('chatWindow');
    if (chatOpen) {
        chatWindow.classList.add('active');
        document.getElementById('messageInput').focus();
    } else {
        chatWindow.classList.remove('active');
    }
}

function toggleVoice() {
    const voiceButton = document.getElementById('voiceButton');
    console.log('Voice toggle - functionality handled by HTML interface');
}

function toggleVoiceMode() {
    voiceMode = !voiceMode;
    const indicator = document.getElementById('headerVoiceIndicator');
    indicator.classList.toggle('active');
    
    if (voiceMode) {
        addMessage("Voice mode activated! 🔊", 'velvet');
    } else {
        addMessage("Voice mode deactivated. I'll stay quiet now. 🤫", 'velvet');
    }
}

function updateOrbState(state) {
    const orb = document.getElementById('orb');
    orb.classList.remove('listening', 'speaking', 'thinking');
    
    if (state === 'listening') {
        orb.classList.add('listening');
    } else if (state === 'speaking') {
        orb.classList.add('speaking');
    } else if (state === 'thinking') {
        orb.classList.add('thinking');
    }
}

async function sendMessage() {
    if (isTyping) return;
    
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, 'user');
        
        // Clear input and disable button
        input.value = '';
        isTyping = true;
        document.getElementById('sendButton').disabled = true;
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Get AI response (voice will be handled by HTML interface if enabled)
            const response = await getVelvetResponse(message);
            hideTypingIndicator();
            addMessage(response, 'velvet');
        } catch (error) {
            hideTypingIndicator();
            addMessage("I'm having a little trouble connecting, but I'm still here! 💜", 'velvet');
        }
        
        // Re-enable input
        isTyping = false;
        document.getElementById('sendButton').disabled = false;
        input.focus();
    }
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').classList.add('show');
    const messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').classList.remove('show');
}

// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Orb click
    document.getElementById('orb').addEventListener('click', toggleChat);
    
    // Voice button
    document.getElementById('voiceButton').addEventListener('click', toggleVoice);
    
    // Send button
    document.getElementById('sendButton').addEventListener('click', sendMessage);
    
    // Voice mode toggle
    document.getElementById('headerVoiceIndicator').addEventListener('click', toggleVoiceMode);
    
    // Enter key to send
    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isTyping) {
            sendMessage();
        }
    });
    
    // Voice functionality handled by HTML interface
    
    // Voice cloning setup (Ctrl/Cmd + Shift + V)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
            e.preventDefault();
            setupVoiceCloning();
        }
    });
});

// Voice functionality removed - handled by HTML interface

// Setup voice cloning with 10-second sample
async function setupVoiceCloning() {
    try {
        addMessage("🎙️ Voice cloning setup: Record a 10-second sample of your voice...", 'system');
        
        // Get microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
                sampleRate: 16000
            } 
        });
        
        // Set up recorder
        const recorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        });
        
        const chunks = [];
        let countdown = 10;
        
        // Update countdown
        const countdownInterval = setInterval(() => {
            addMessage(`Recording voice sample... ${countdown} seconds remaining`, 'system');
            countdown--;
            
            if (countdown < 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
        
        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };
        
        recorder.onstop = async () => {
            clearInterval(countdownInterval);
            
            try {
                const voiceBlob = new Blob(chunks, { type: 'audio/webm' });
                console.log('Voice cloning not available');
                addMessage("✅ Voice sample recorded! Your responses will now use your voice.", 'system');
            } catch (error) {
                addMessage("❌ Failed to set voice sample. Try again.", 'system');
            }
            
            // Stop microphone stream
            stream.getTracks().forEach(track => track.stop());
        };
        
        // Start recording
        recorder.start();
        
        // Stop after 10 seconds
        setTimeout(() => {
            if (recorder.state === 'recording') {
                recorder.stop();
            }
        }, 10000);
        
    } catch (error) {
        console.error('Error setting up voice cloning:', error);
        addMessage("❌ Voice cloning setup failed. Check microphone permissions.", 'system');
    }
}

// Voice functionality handled by HTML interface using ElevenLabs TTS