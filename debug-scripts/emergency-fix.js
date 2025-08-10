// EMERGENCY FIX - Direct console script to fix core issues
// Copy and paste this ENTIRE script into browser console

console.log('🚨 EMERGENCY MONITORING FIX');
console.log('===========================');

// ISSUE 1: Screen capture not requesting permissions
async function forceScreenCapturePermission() {
    console.log('🔐 FORCING screen capture permission request...');
    
    try {
        console.log('📺 Attempting to request screen sharing...');
        
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            },
            audio: true // Also request audio capture
        });
        
        console.log('✅ SCREEN SHARING PERMISSION GRANTED!');
        console.log('📊 Stream details:', {
            id: stream.id,
            active: stream.active,
            tracks: stream.getTracks().length
        });
        
        // Create a simple test OCR
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        
        video.addEventListener('loadedmetadata', () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            
            const imageData = canvas.toDataURL();
            console.log('📸 Screen capture successful! Image data length:', imageData.length);
            
            // Stop the test stream
            stream.getTracks().forEach(track => track.stop());
            console.log('✅ Test stream stopped - permission is now granted');
        });
        
        return true;
        
    } catch (error) {
        console.error('❌ Screen capture permission failed:', error);
        if (error.name === 'NotAllowedError') {
            console.error('💡 User denied permission - try again and click Allow');
        }
        return false;
    }
}

// ISSUE 2: Audio detection broken - test and fix
async function fixAudioDetection() {
    console.log('🎵 FIXING audio detection...');
    
    // Test system audio API directly
    console.log('🧪 Testing system audio API...');
    
    if (!window.electronAPI?.audioEnvironment) {
        console.error('❌ Electron Audio API missing');
        return false;
    }
    
    try {
        // Get raw audio context
        const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
        console.log('📊 Raw system audio context:', audioContext);
        
        // Get audio sources
        const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
        console.log('📊 Raw audio sources:', audioSources);
        
        // PROBLEM DIAGNOSIS
        if (audioContext.context === 'silence' && audioContext.volume > 50) {
            console.log('🔍 PROBLEM FOUND: System detects volume but reports silence');
            console.log('💡 This suggests the AppleScript audio detection is broken');
            
            // Try to fix by manually creating music context
            console.log('🔧 Attempting to fix audio context detection...');
            
            // Check if Chrome/Safari are running (likely playing audio)
            const processes = audioSources.audioSources || [];
            console.log('🔍 Active audio processes:', processes);
            
            if (processes.length > 0) {
                console.log('✅ Found active audio processes - overriding silence detection');
                
                // Create corrected audio context
                const correctedContext = {
                    type: 'music',
                    source: 'system_detection',
                    details: {
                        app: processes[0].name || 'Browser',
                        volume: audioContext.volume
                    },
                    timestamp: Date.now(),
                    confidence: 0.8
                };
                
                console.log('🎵 CORRECTED audio context:', correctedContext);
                
                // If audio monitor exists, manually update it
                if (window.audioEnvironmentMonitor) {
                    console.log('🔧 Manually updating audio monitor with corrected context...');
                    window.audioEnvironmentMonitor.currentAudioContext = correctedContext;
                    
                    // Force context update
                    if (window.unifiedContextEngine) {
                        window.unifiedContextEngine.lastAudioContext = correctedContext;
                        console.log('✅ Audio context manually corrected');
                    }
                }
                
                return true;
            }
        }
        
        return false;
        
    } catch (error) {
        console.error('❌ Audio detection fix failed:', error);
        return false;
    }
}

// ISSUE 3: Create working screen OCR from scratch
async function createWorkingScreenOCR() {
    console.log('👁️ Creating working screen OCR from scratch...');
    
    // Check if Tesseract is available
    if (typeof Tesseract === 'undefined') {
        console.error('❌ Tesseract.js not loaded');
        return false;
    }
    
    try {
        // Request screen permission first
        console.log('🔐 Requesting screen capture permission...');
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'screen' }
        });
        
        console.log('✅ Screen permission granted!');
        
        // Create OCR worker
        console.log('🔧 Creating Tesseract OCR worker...');
        const worker = await Tesseract.createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        console.log('✅ OCR worker ready');
        
        // Set up screen capture function
        async function captureAndOCR() {
            try {
                console.log('📸 Capturing screen...');
                
                const video = document.createElement('video');
                video.srcObject = stream;
                video.play();
                
                video.addEventListener('loadedmetadata', async () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0);
                    
                    const imageData = canvas.toDataURL();
                    
                    console.log('🔍 Running OCR...');
                    const result = await worker.recognize(imageData);
                    
                    if (result.data.text.trim().length > 10) {
                        console.log('📝 SCREEN TEXT DETECTED:', result.data.text.substring(0, 100) + '...');
                        console.log('📊 OCR Confidence:', (result.data.confidence / 100).toFixed(2));
                        
                        // Store the result
                        if (!window.screenTextHistory) window.screenTextHistory = [];
                        window.screenTextHistory.push({
                            timestamp: Date.now(),
                            text: result.data.text,
                            confidence: result.data.confidence / 100
                        });
                        
                        console.log(`📚 Total screen texts captured: ${window.screenTextHistory.length}`);
                    } else {
                        console.log('⚠️ No significant text detected in current screen');
                    }
                });
                
            } catch (error) {
                console.error('❌ Screen OCR failed:', error);
            }
        }
        
        // Start periodic OCR
        console.log('⏰ Starting periodic screen OCR (every 10 seconds)...');
        const interval = setInterval(captureAndOCR, 10000);
        
        // Initial capture
        await captureAndOCR();
        
        // Store cleanup function
        window.stopScreenOCR = () => {
            clearInterval(interval);
            stream.getTracks().forEach(track => track.stop());
            worker.terminate();
            console.log('🛑 Screen OCR stopped');
        };
        
        console.log('✅ Working screen OCR is now active!');
        console.log('💡 To stop: run window.stopScreenOCR()');
        console.log('💡 To view results: window.screenTextHistory');
        
        return true;
        
    } catch (error) {
        console.error('❌ Screen OCR creation failed:', error);
        return false;
    }
}

// ISSUE 4: Create simple working audio detection
function createWorkingAudioDetection() {
    console.log('🎧 Creating working audio detection...');
    
    if (!window.electronAPI?.audioEnvironment) {
        console.error('❌ No audio API available');
        return false;
    }
    
    async function detectAudio() {
        try {
            const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
            const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
            
            // Enhanced detection logic
            let detectedType = 'silence';
            let detectedApp = 'unknown';
            let confidence = 0.5;
            
            // Check for active processes first
            if (audioSources.audioSources && audioSources.audioSources.length > 0) {
                const activeApp = audioSources.audioSources[0];
                detectedApp = activeApp.name;
                detectedType = activeApp.type || 'audio';
                confidence = 0.8;
                
                console.log(`🎵 ACTIVE AUDIO: ${detectedType} from ${detectedApp}`);
            }
            // Check for volume even if context says silence
            else if (audioContext.volume > 30) {
                detectedType = 'ambient_audio';
                confidence = 0.6;
                console.log(`🔊 VOLUME DETECTED: ${audioContext.volume} (overriding silence)`);
            }
            
            // Store result
            if (!window.audioDetectionHistory) window.audioDetectionHistory = [];
            window.audioDetectionHistory.push({
                timestamp: Date.now(),
                type: detectedType,
                app: detectedApp,
                volume: audioContext.volume,
                confidence: confidence,
                raw: { audioContext, audioSources }
            });
            
            console.log(`🎵 Audio detection: ${detectedType} (confidence: ${confidence.toFixed(2)})`);
            console.log(`📚 Total audio detections: ${window.audioDetectionHistory.length}`);
            
        } catch (error) {
            console.error('❌ Audio detection failed:', error);
        }
    }
    
    // Start periodic audio detection
    console.log('⏰ Starting periodic audio detection (every 5 seconds)...');
    const interval = setInterval(detectAudio, 5000);
    
    // Initial detection
    detectAudio();
    
    // Store cleanup function
    window.stopAudioDetection = () => {
        clearInterval(interval);
        console.log('🛑 Audio detection stopped');
    };
    
    console.log('✅ Working audio detection is now active!');
    console.log('💡 To stop: run window.stopAudioDetection()');
    console.log('💡 To view results: window.audioDetectionHistory');
    
    return true;
}

// Main emergency fix function
async function runEmergencyFix() {
    console.log('🚨 Running emergency fix...\n');
    
    // Step 1: Fix screen capture
    console.log('STEP 1: Fixing screen capture...');
    const screenFixed = await createWorkingScreenOCR();
    
    // Step 2: Fix audio detection  
    console.log('\nSTEP 2: Fixing audio detection...');
    const audioFixed = await fixAudioDetection();
    const audioWorking = createWorkingAudioDetection();
    
    // Step 3: Summary
    console.log('\n📊 EMERGENCY FIX RESULTS:');
    console.log('==========================');
    console.log(`Screen OCR: ${screenFixed ? '✅ WORKING' : '❌ FAILED'}`);
    console.log(`Audio Detection: ${audioWorking ? '✅ WORKING' : '❌ FAILED'}`);
    
    if (screenFixed || audioWorking) {
        console.log('\n🎯 MONITORING IS NOW ACTIVE!');
        console.log('Expected logs:');
        if (screenFixed) console.log('  • "📝 SCREEN TEXT DETECTED:" every 10 seconds');
        if (audioWorking) console.log('  • "🎵 Audio detection:" every 5 seconds');
        
        console.log('\n📊 View Results:');
        if (screenFixed) console.log('  • Screen: window.screenTextHistory');
        if (audioWorking) console.log('  • Audio: window.audioDetectionHistory');
        
        console.log('\n🛑 Stop Functions:');
        if (screenFixed) console.log('  • Screen: window.stopScreenOCR()');
        if (audioWorking) console.log('  • Audio: window.stopAudioDetection()');
    }
}

// Auto-run the emergency fix
console.log('🎯 Running emergency fix in 2 seconds...');
console.log('💡 ALLOW screen sharing when prompted!');

setTimeout(() => {
    runEmergencyFix().catch(error => {
        console.error('❌ Emergency fix failed:', error);
    });
}, 2000);