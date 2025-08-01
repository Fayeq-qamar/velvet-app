// DIRECT CONSOLE FIX - Copy and paste this ENTIRE script into browser console
// This will diagnose and fix all monitoring issues in real-time

console.log('🔧 DIRECT MONITORING SYSTEM FIX');
console.log('===============================');

// Test current system audio directly first
async function testSystemAudioDirect() {
    console.log('🧪 Testing system audio detection RIGHT NOW...');
    
    if (!window.electronAPI?.audioEnvironment) {
        console.error('❌ Electron Audio API not available');
        return null;
    }
    
    try {
        const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
        const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
        
        console.log('📊 Raw Audio Context:', audioContext);
        console.log('📊 Raw Audio Sources:', audioSources);
        
        // Analysis
        if (audioContext.context === 'music') {
            console.log(`✅ MUSIC DETECTED: ${audioContext.currentTrack || 'Unknown'} from ${audioContext.app || 'Unknown'}`);
        } else {
            console.log(`🔇 ONLY SILENCE DETECTED (this is the problem!)`);
        }
        
        return { audioContext, audioSources };
    } catch (error) {
        console.error('❌ Audio test failed:', error);
        return null;
    }
}

// Check what monitoring instances exist
function checkCurrentMonitoring() {
    console.log('🔍 Checking current monitoring instances...');
    
    const checks = {
        screenOCRClass: typeof RealScreenOCRMonitor !== 'undefined',
        audioMonitorClass: typeof RealAudioEnvironmentMonitor !== 'undefined',
        contextEngineClass: typeof UnifiedContextEngine !== 'undefined',
        tesseract: typeof Tesseract !== 'undefined',
        screenInstance: !!window.screenOCRMonitor,
        audioInstance: !!window.audioEnvironmentMonitor,
        contextInstance: !!window.unifiedContextEngine
    };
    
    console.log('📊 System Check Results:');
    Object.entries(checks).forEach(([key, value]) => {
        console.log(`  • ${key}: ${value ? '✅' : '❌'}`);
    });
    
    return checks;
}

// Force restart screen OCR with permission request
async function forceRestartScreenOCR() {
    console.log('👁️ Force restarting Screen OCR...');
    
    if (typeof RealScreenOCRMonitor === 'undefined') {
        console.error('❌ RealScreenOCRMonitor class not loaded');
        return false;
    }
    
    try {
        // Stop existing if any
        if (window.screenOCRMonitor) {
            await window.screenOCRMonitor.deactivate();
        }
        
        // Create fresh instance
        const screenMonitor = new RealScreenOCRMonitor();
        
        console.log('🔧 Initializing screen OCR (will wait for Tesseract)...');
        const initialized = await screenMonitor.initialize();
        
        if (!initialized) {
            console.error('❌ Screen OCR initialization failed');
            return false;
        }
        
        console.log('🚀 Starting screen monitoring (PERMISSION DIALOG WILL APPEAR)...');
        console.log('💡 IMPORTANT: Click "Allow" when browser asks for screen sharing!');
        
        const started = await screenMonitor.startMonitoring();
        
        if (started) {
            window.screenOCRMonitor = screenMonitor;
            console.log('✅ Screen OCR ACTIVE - should see "📸 Capturing real screen..." every 5 seconds');
            return true;
        } else {
            console.error('❌ Screen OCR failed to start - permission denied?');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Screen OCR restart failed:', error);
        return false;
    }
}

// Force restart audio monitoring
async function forceRestartAudioMonitoring() {
    console.log('🎧 Force restarting Audio Monitoring...');
    
    if (typeof RealAudioEnvironmentMonitor === 'undefined') {
        console.error('❌ RealAudioEnvironmentMonitor class not loaded');
        return false;
    }
    
    try {
        // Stop existing if any
        if (window.audioEnvironmentMonitor) {
            await window.audioEnvironmentMonitor.deactivate();
        }
        
        // Create fresh instance  
        const audioMonitor = new RealAudioEnvironmentMonitor();
        
        console.log('🔧 Initializing audio monitor...');
        const initialized = await audioMonitor.initialize();
        
        if (!initialized) {
            console.error('❌ Audio monitor initialization failed');
            return false;
        }
        
        console.log('🚀 Starting audio monitoring...');
        const started = await audioMonitor.startMonitoring();
        
        if (started) {
            window.audioEnvironmentMonitor = audioMonitor;
            console.log('✅ Audio monitoring ACTIVE - should detect more than just silence');
            return true;
        } else {
            console.error('❌ Audio monitoring failed to start');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Audio monitoring restart failed:', error);
        return false;
    }
}

// Main fix function
async function runDirectFix() {
    console.log('🚀 Starting direct monitoring fix...\n');
    
    // Step 1: Check current state
    const checks = checkCurrentMonitoring();
    
    // Step 2: Test system audio directly
    console.log('\n🎵 STEP 1: Testing system audio detection...');
    const audioTest = await testSystemAudioDirect();
    
    // Step 3: Force restart audio monitoring
    console.log('\n🎧 STEP 2: Restarting audio monitoring...');
    const audioRestarted = await forceRestartAudioMonitoring();
    
    // Step 4: Force restart screen OCR
    console.log('\n👁️ STEP 3: Restarting screen OCR (PERMISSION REQUIRED)...');
    const screenRestarted = await forceRestartScreenOCR();
    
    // Step 5: Restart context engine if both work
    if (audioRestarted && screenRestarted && typeof UnifiedContextEngine !== 'undefined') {
        console.log('\n🧠 STEP 4: Restarting unified context engine...');
        
        try {
            if (window.unifiedContextEngine) {
                window.unifiedContextEngine.deactivate();
            }
            
            const contextEngine = new UnifiedContextEngine();
            const contextInit = await contextEngine.initialize(window.screenOCRMonitor, window.audioEnvironmentMonitor);
            
            if (contextInit) {
                window.unifiedContextEngine = contextEngine;
                console.log('✅ Unified Context Engine ACTIVE');
            } else {
                console.error('❌ Context engine failed to initialize');
            }
        } catch (error) {
            console.error('❌ Context engine restart failed:', error);
        }
    }
    
    // Final status
    console.log('\n📊 FINAL STATUS:');
    console.log('================');
    console.log(`Screen OCR: ${screenRestarted ? '✅ ACTIVE' : '❌ FAILED'}`);
    console.log(`Audio Monitor: ${audioRestarted ? '✅ ACTIVE' : '❌ FAILED'}`);
    console.log(`Context Engine: ${window.unifiedContextEngine ? '✅ ACTIVE' : '❌ FAILED'}`);
    
    if (screenRestarted) {
        console.log('\n💡 EXPECTED SCREEN OCR LOGS:');
        console.log('  • "📸 Capturing real screen..." every 5 seconds');
        console.log('  • "🔍 Running Tesseract OCR..."');
        console.log('  • "📝 REAL screen text processed: [text]"');
    }
    
    if (audioRestarted) {
        console.log('\n💡 EXPECTED AUDIO LOGS:'); 
        console.log('  • "🎵 System audio: [type] ([app])" every 3 seconds');
        console.log('  • "🎧 Audio analysis completed - detected: [type]"');
    }
    
    console.log('\n🔍 TO VIEW RESULTS:');
    console.log('  • Screen text: window.screenOCRMonitor?.textHistory');
    console.log('  • Audio history: window.audioEnvironmentMonitor?.audioHistory'); 
    console.log('  • Context history: window.unifiedContextEngine?.contextHistory');
    
    // Set up real-time watcher
    if (screenRestarted || audioRestarted) {
        console.log('\n👀 Setting up real-time monitoring watcher...');
        setupRealTimeWatcher();
    }
}

// Real-time watcher to show live updates
function setupRealTimeWatcher() {
    let lastScreenUpdate = '';
    let lastAudioUpdate = '';
    let lastContextUpdate = '';
    
    setInterval(() => {
        // Screen updates
        if (window.screenOCRMonitor?.textHistory?.length > 0) {
            const latest = window.screenOCRMonitor.textHistory[window.screenOCRMonitor.textHistory.length - 1];
            const update = `${latest.timestamp}: "${latest.text.substring(0, 50)}..."`;
            if (update !== lastScreenUpdate) {
                console.log(`📝 NEW SCREEN TEXT: ${latest.text.substring(0, 80)}...`);
                lastScreenUpdate = update;
            }
        }
        
        // Audio updates  
        if (window.audioEnvironmentMonitor?.audioHistory?.length > 0) {
            const latest = window.audioEnvironmentMonitor.audioHistory[window.audioEnvironmentMonitor.audioHistory.length - 1];
            const update = `${latest.timestamp}: ${latest.primaryType}`;
            if (update !== lastAudioUpdate) {
                console.log(`🎵 NEW AUDIO: ${latest.primaryType} from ${latest.source} (conf: ${latest.confidence?.toFixed(2)})`);
                lastAudioUpdate = update;
            }
        }
        
        // Context updates
        if (window.unifiedContextEngine?.contextHistory?.length > 0) {
            const latest = window.unifiedContextEngine.contextHistory[window.unifiedContextEngine.contextHistory.length - 1];
            const update = `${latest.timestamp}: ${latest.unified.primaryContext}`;
            if (update !== lastContextUpdate) {
                console.log(`🧠 NEW CONTEXT: ${latest.unified.primaryContext} (${latest.correlation.confidence.toFixed(2)})`);
                lastContextUpdate = update;
            }
        }
    }, 8000); // Check every 8 seconds
    
    console.log('✅ Real-time watcher active - will show new detections');
}

// Auto-run the fix
console.log('🎯 Auto-running monitoring fix in 2 seconds...');
console.log('💡 Grant screen sharing permission when prompted!');

setTimeout(() => {
    runDirectFix().catch(error => {
        console.error('❌ Direct fix failed:', error);
    });
}, 2000);