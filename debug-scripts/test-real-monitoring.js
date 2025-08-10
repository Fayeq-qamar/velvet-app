// Test script to see exactly what Velvet is reading and hearing
// Run this in the browser console to see real monitoring logs

console.log('🧪 REAL MONITORING TEST SCRIPT');
console.log('===============================');

// Test 1: Check if systems are loaded
function checkSystemStatus() {
    console.log('\n📋 SYSTEM STATUS CHECK:');
    console.log('• Tesseract loaded:', typeof Tesseract !== 'undefined' ? '✅' : '❌');
    console.log('• Electron API loaded:', typeof window.electronAPI !== 'undefined' ? '✅' : '❌');
    console.log('• Screen OCR class loaded:', typeof RealScreenOCRMonitor !== 'undefined' ? '✅' : '❌');
    console.log('• Audio Monitor class loaded:', typeof RealAudioEnvironmentMonitor !== 'undefined' ? '✅' : '❌');
    console.log('• Context Engine loaded:', typeof UnifiedContextEngine !== 'undefined' ? '✅' : '❌');
}

// Test 2: Initialize and test REAL screen OCR
async function testRealScreenOCR() {
    console.log('\n👁️ TESTING REAL SCREEN OCR:');
    console.log('=============================');
    
    try {
        const monitor = new RealScreenOCRMonitor();
        console.log('🔧 Initializing OCR monitor...');
        
        const initialized = await monitor.initialize();
        if (!initialized) {
            console.error('❌ Failed to initialize screen OCR');
            return;
        }
        
        console.log('✅ Screen OCR initialized successfully');
        console.log('🎯 Starting screen capture (permission will be requested)...');
        
        const started = await monitor.startMonitoring();
        if (started) {
            console.log('✅ REAL screen monitoring started!');
            console.log('📸 Velvet will now capture your screen every 5 seconds');
            console.log('🔍 OCR will extract text from everything visible');
            console.log('');
            console.log('💡 WATCH FOR THESE LOGS:');
            console.log('  📸 Capturing real screen...');
            console.log('  🔍 Running Tesseract OCR...');
            console.log('  ✅ Real screen OCR completed in Xms - confidence: Y');
            console.log('  📝 REAL screen text processed: [actual text from your screen]');
            console.log('  🎯 Relevance: X.XX, Context: [detected context]');
            
            // Store reference for later use
            window.testScreenMonitor = monitor;
            
            return true;
        }
    } catch (error) {
        console.error('❌ Screen OCR test failed:', error);
        return false;
    }
}

// Test 3: Initialize and test REAL audio monitoring
async function testRealAudioMonitoring() {
    console.log('\n🎧 TESTING REAL AUDIO MONITORING:');
    console.log('=================================');
    
    try {
        const monitor = new RealAudioEnvironmentMonitor();
        console.log('🔧 Initializing audio monitor...');
        
        const initialized = await monitor.initialize();
        if (!initialized) {
            console.error('❌ Failed to initialize audio monitor');
            return;
        }
        
        console.log('✅ Audio monitor initialized successfully');
        console.log('🎵 Starting system audio detection...');
        
        const started = await monitor.startMonitoring();
        if (started) {
            console.log('✅ REAL audio monitoring started!');
            console.log('🔊 Velvet will now detect your system audio every 3 seconds');
            console.log('🎵 Detects: Spotify, Apple Music, YouTube, calls, etc.');
            console.log('🎤 Also analyzes microphone for ambient audio');
            console.log('');
            console.log('💡 WATCH FOR THESE LOGS:');
            console.log('  🎵 Getting current audio context...');
            console.log('  ✅ Audio context: music (Spotify)');
            console.log('  🔊 Audio source: music from Spotify');
            console.log('  🎧 Audio analysis completed in Xms - detected: music');
            console.log('  🎵 REAL audio context: music from system_detection - enhancing');
            
            // Store reference for later use
            window.testAudioMonitor = monitor;
            
            return true;
        }
    } catch (error) {
        console.error('❌ Audio monitoring test failed:', error);
        return false;
    }
}

// Test 4: Test system audio detection directly
async function testSystemAudioDirect() {
    console.log('\n🔊 TESTING SYSTEM AUDIO DETECTION DIRECTLY:');
    console.log('==========================================');
    
    if (!window.electronAPI || !window.electronAPI.audioEnvironment) {
        console.error('❌ Electron Audio API not available');
        return;
    }
    
    try {
        console.log('🎵 Getting current audio context...');
        const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
        console.log('📊 Audio Context Result:', audioContext);
        
        console.log('🔊 Capturing system audio sources...');
        const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
        console.log('📊 Audio Sources Result:', audioSources);
        
        console.log('🎧 Getting system audio devices...');
        const audioDevices = await window.electronAPI.audioEnvironment.getSystemAudioDevices();
        console.log('📊 Audio Devices Result:', audioDevices);
        
        // Interpret results
        console.log('\n🎯 INTERPRETATION:');
        if (audioContext.context === 'music') {
            console.log(`🎵 Music detected: ${audioContext.currentTrack} (${audioContext.app})`);
        } else if (audioContext.context === 'silence') {
            console.log('🔇 No music currently playing');
        }
        
        if (audioSources.audioSources && audioSources.audioSources.length > 0) {
            console.log(`🔊 Active audio apps: ${audioSources.audioSources.map(s => s.name).join(', ')}`);
        } else {
            console.log('🔇 No active audio applications detected');
        }
        
        return true;
    } catch (error) {
        console.error('❌ System audio detection failed:', error);
        return false;
    }
}

// Test 5: View monitoring history
function viewMonitoringHistory() {
    console.log('\n📚 VIEWING MONITORING HISTORY:');
    console.log('==============================');
    
    if (window.testScreenMonitor && window.testScreenMonitor.textHistory) {
        console.log(`👁️ Screen OCR History (${window.testScreenMonitor.textHistory.length} entries):`);
        window.testScreenMonitor.textHistory.slice(-3).forEach((entry, i) => {
            console.log(`  ${i + 1}. [${new Date(entry.timestamp).toLocaleTimeString()}] "${entry.text.substring(0, 100)}..."`);
            console.log(`     Context: ${entry.context.type}, Relevance: ${entry.relevance.score.toFixed(2)}`);
        });
    } else {
        console.log('👁️ No screen OCR history available yet');
    }
    
    if (window.testAudioMonitor && window.testAudioMonitor.audioHistory) {
        console.log(`🎧 Audio History (${window.testAudioMonitor.audioHistory.length} entries):`);
        window.testAudioMonitor.audioHistory.slice(-3).forEach((entry, i) => {
            console.log(`  ${i + 1}. [${new Date(entry.timestamp).toLocaleTimeString()}] ${entry.primaryType} from ${entry.source}`);
            console.log(`     Focus Impact: ${entry.insights.focusImpact}, Relevance: ${entry.relevance.score.toFixed(2)}`);
        });
    } else {
        console.log('🎧 No audio history available yet');
    }
}

// Main test runner
async function runCompleteTest() {
    console.clear();
    console.log('🚀 COMPLETE REAL MONITORING TEST');
    console.log('================================');
    console.log('This will test ALL real monitoring capabilities');
    console.log('');
    
    // Check system status
    checkSystemStatus();
    
    // Test system audio first (doesn't require permissions)
    await testSystemAudioDirect();
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test audio monitoring (may require microphone permission)
    const audioWorking = await testRealAudioMonitoring();
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test screen OCR (will require screen capture permission)
    const screenWorking = await testRealScreenOCR();
    
    // Final instructions
    console.log('\n🎯 TEST COMPLETE - MONITORING IS NOW ACTIVE!');
    console.log('============================================');
    console.log('');
    if (screenWorking) {
        console.log('👁️ SCREEN MONITORING: Active - capturing every 5 seconds');
        console.log('  • Open different apps (email, code editor, browser)');
        console.log('  • Type some text');
        console.log('  • Watch console for OCR results');
    }
    if (audioWorking) {
        console.log('🎧 AUDIO MONITORING: Active - detecting every 3 seconds');
        console.log('  • Play music on Spotify or Apple Music');
        console.log('  • Join a video call');
        console.log('  • Watch console for audio detection');
    }
    console.log('');
    console.log('📚 TO VIEW HISTORY: run viewMonitoringHistory()');
    console.log('🔄 TO CHECK STATUS AGAIN: run checkSystemStatus()');
    console.log('');
    console.log('💡 Velvet is now ACTUALLY monitoring your screen and audio!');
}

// Export functions for manual use
window.testRealMonitoring = {
    runComplete: runCompleteTest,
    checkStatus: checkSystemStatus,
    testScreen: testRealScreenOCR,
    testAudio: testRealAudioMonitoring,
    testSystemAudio: testSystemAudioDirect,
    viewHistory: viewMonitoringHistory
};

console.log('🧪 Real Monitoring Test Script Loaded');
console.log('💡 Run: testRealMonitoring.runComplete() to start complete test');
console.log('💡 Or run individual tests: testRealMonitoring.testScreen(), etc.');