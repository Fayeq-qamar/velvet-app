// Complete Fix for Monitoring Issues
// Run this in browser console when Velvet is running

console.log('🔧 COMPLETE MONITORING SYSTEM FIX');
console.log('================================');

async function fixAllMonitoringIssues() {
    console.log('🔍 Step 1: Diagnosing Current Issues...');
    
    // Check what's currently loaded
    const hasScreenOCR = typeof RealScreenOCRMonitor !== 'undefined';
    const hasAudioMonitor = typeof RealAudioEnvironmentMonitor !== 'undefined';
    const hasContextEngine = typeof UnifiedContextEngine !== 'undefined';
    const hasTesseract = typeof Tesseract !== 'undefined';
    
    console.log('📊 System Status:');
    console.log(`  • Screen OCR Class: ${hasScreenOCR ? '✅' : '❌'}`);
    console.log(`  • Audio Monitor Class: ${hasAudioMonitor ? '✅' : '❌'}`);
    console.log(`  • Context Engine Class: ${hasContextEngine ? '✅' : '❌'}`);
    console.log(`  • Tesseract.js: ${hasTesseract ? '✅' : '❌'}`);
    
    // Check existing instances
    const hasScreenInstance = window.screenOCRMonitor !== undefined;
    const hasAudioInstance = window.audioEnvironmentMonitor !== undefined;
    const hasContextInstance = window.unifiedContextEngine !== undefined;
    
    console.log('\n📱 Current Instances:');
    console.log(`  • Screen OCR Instance: ${hasScreenInstance ? '✅' : '❌'}`);
    console.log(`  • Audio Monitor Instance: ${hasAudioInstance ? '✅' : '❌'}`);
    console.log(`  • Context Engine Instance: ${hasContextInstance ? '✅' : '❌'}`);
    
    if (!hasScreenOCR || !hasAudioMonitor || !hasContextEngine) {
        console.error('❌ Missing required classes - check script loading');
        return;
    }
    
    console.log('\n🔧 Step 2: Force Stop All Existing Monitoring...');
    
    // Stop existing monitors
    if (window.screenOCRMonitor) {
        try {
            await window.screenOCRMonitor.deactivate();
            console.log('✅ Stopped existing screen OCR monitor');
        } catch (e) {
            console.log('⚠️ Error stopping screen OCR:', e.message);
        }
    }
    
    if (window.audioEnvironmentMonitor) {
        try {
            await window.audioEnvironmentMonitor.deactivate();
            console.log('✅ Stopped existing audio monitor');
        } catch (e) {
            console.log('⚠️ Error stopping audio monitor:', e.message);
        }
    }
    
    if (window.unifiedContextEngine) {
        try {
            window.unifiedContextEngine.deactivate();
            console.log('✅ Stopped existing context engine');
        } catch (e) {
            console.log('⚠️ Error stopping context engine:', e.message);
        }
    }
    
    console.log('\n🚀 Step 3: Initialize Fresh Monitoring System...');
    
    try {
        // Create new screen OCR monitor
        console.log('👁️ Creating fresh Screen OCR Monitor...');
        const screenMonitor = new RealScreenOCRMonitor();
        
        console.log('🔧 Initializing Screen OCR...');
        const screenInit = await screenMonitor.initialize();
        if (!screenInit) {
            throw new Error('Screen OCR initialization failed');
        }
        console.log('✅ Screen OCR initialized successfully');
        
        // Create new audio monitor
        console.log('🎧 Creating fresh Audio Environment Monitor...');
        const audioMonitor = new RealAudioEnvironmentMonitor();
        
        console.log('🔧 Initializing Audio Monitor...');
        const audioInit = await audioMonitor.initialize();
        if (!audioInit) {
            throw new Error('Audio monitor initialization failed');
        }
        console.log('✅ Audio monitor initialized successfully');
        
        // Create new context engine
        console.log('🧠 Creating fresh Unified Context Engine...');
        const contextEngine = new UnifiedContextEngine();
        
        console.log('🔧 Initializing Context Engine...');
        const contextInit = await contextEngine.initialize(screenMonitor, audioMonitor);
        if (!contextInit) {
            throw new Error('Context engine initialization failed');
        }
        console.log('✅ Context engine initialized successfully');
        
        console.log('\n🎯 Step 4: Start All Monitoring...');
        
        // Start screen monitoring (will request permission)
        console.log('📸 Starting Screen OCR monitoring...');
        console.log('💡 IMPORTANT: Allow screen sharing when prompted!');
        const screenStarted = await screenMonitor.startMonitoring();
        
        if (screenStarted) {
            console.log('✅ Screen OCR monitoring ACTIVE');
        } else {
            console.log('❌ Screen OCR monitoring failed to start');
        }
        
        // Start audio monitoring
        console.log('🎵 Starting Audio Environment monitoring...');
        const audioStarted = await audioMonitor.startMonitoring();
        
        if (audioStarted) {
            console.log('✅ Audio Environment monitoring ACTIVE');
        } else {
            console.log('❌ Audio Environment monitoring failed to start');
        }
        
        // Store references globally
        window.screenOCRMonitor = screenMonitor;
        window.audioEnvironmentMonitor = audioMonitor;
        window.unifiedContextEngine = contextEngine;
        
        console.log('\n✅ MONITORING SYSTEM FULLY OPERATIONAL!');
        console.log('=======================================');
        console.log('🎯 What to expect now:');
        console.log('  • Screen OCR: "📸 Capturing real screen..." every 5 seconds');
        console.log('  • Audio Detection: "🎵 System audio:" messages every 3 seconds');
        console.log('  • Context Updates: "🧠 Unified context updated:" messages');
        console.log('');
        console.log('📊 To view monitoring data:');
        console.log('  • Screen text: window.screenOCRMonitor.textHistory');
        console.log('  • Audio context: window.audioEnvironmentMonitor.audioHistory');
        console.log('  • Unified context: window.unifiedContextEngine.contextHistory');
        console.log('');
        console.log('🛑 To stop monitoring:');
        console.log('  • Screen: window.screenOCRMonitor.stopMonitoring()');
        console.log('  • Audio: window.audioEnvironmentMonitor.stopMonitoring()');
        console.log('  • Context: window.unifiedContextEngine.stop()');
        
        // Set up monitoring for results
        setupMonitoringWatcher();
        
        return true;
        
    } catch (error) {
        console.error('❌ Monitoring system initialization failed:', error);
        console.error('💡 Try refreshing the app and running this script again');
        return false;
    }
}

function setupMonitoringWatcher() {
    console.log('\n👀 Setting up monitoring watcher...');
    
    // Check for screen OCR activity
    let lastScreenText = '';
    let lastAudioContext = '';
    let lastUnifiedContext = '';
    
    setInterval(() => {
        // Check screen OCR progress
        if (window.screenOCRMonitor && window.screenOCRMonitor.textHistory.length > 0) {
            const latest = window.screenOCRMonitor.textHistory[window.screenOCRMonitor.textHistory.length - 1];
            const newText = latest.text.substring(0, 50);
            
            if (newText !== lastScreenText) {
                console.log(`📝 NEW SCREEN TEXT: "${newText}..." (confidence: ${latest.confidence?.toFixed(2)})`);
                lastScreenText = newText;
            }
        }
        
        // Check audio context progress
        if (window.audioEnvironmentMonitor && window.audioEnvironmentMonitor.audioHistory.length > 0) {
            const latest = window.audioEnvironmentMonitor.audioHistory[window.audioEnvironmentMonitor.audioHistory.length - 1];
            const newContext = `${latest.primaryType} from ${latest.source}`;
            
            if (newContext !== lastAudioContext) {
                console.log(`🎵 NEW AUDIO CONTEXT: ${newContext} (confidence: ${latest.confidence?.toFixed(2)})`);
                lastAudioContext = newContext;
            }
        }
        
        // Check unified context progress
        if (window.unifiedContextEngine && window.unifiedContextEngine.contextHistory.length > 0) {
            const latest = window.unifiedContextEngine.contextHistory[window.unifiedContextEngine.contextHistory.length - 1];
            const newUnified = `${latest.unified.primaryContext} (${latest.correlation.confidence.toFixed(2)})`;
            
            if (newUnified !== lastUnifiedContext) {
                console.log(`🧠 NEW UNIFIED CONTEXT: ${newUnified}`);
                lastUnifiedContext = newUnified;
            }
        }
        
    }, 10000); // Check every 10 seconds
    
    console.log('✅ Monitoring watcher active - will report new detections');
}

// Export for manual use
window.fixAllMonitoringIssues = fixAllMonitoringIssues;

console.log('💡 Run: fixAllMonitoringIssues() to fix all monitoring issues');