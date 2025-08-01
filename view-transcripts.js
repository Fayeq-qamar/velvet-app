// View Current Screen OCR and Audio Transcripts
// Run this in browser console to see what Velvet is actually detecting

console.log('📊 VELVET TRANSCRIPT VIEWER');
console.log('===========================');

function viewAllTranscripts() {
    console.log('🔍 Checking for existing monitoring data...\n');
    
    // Check Screen OCR History
    console.log('👁️ SCREEN OCR TRANSCRIPTS:');
    console.log('==========================');
    
    if (window.screenOCRMonitor && window.screenOCRMonitor.textHistory) {
        const screenHistory = window.screenOCRMonitor.textHistory;
        console.log(`📝 Found ${screenHistory.length} screen text entries`);
        
        if (screenHistory.length > 0) {
            console.log('\n📜 Recent Screen Text (last 5 entries):');
            screenHistory.slice(-5).forEach((entry, i) => {
                const time = new Date(entry.timestamp).toLocaleTimeString();
                const preview = entry.text.substring(0, 100);
                console.log(`${i + 1}. [${time}] "${preview}..."`);
                console.log(`   📊 Confidence: ${entry.confidence?.toFixed(2)}, Context: ${entry.context?.type}`);
                console.log(`   🎯 Relevance: ${entry.relevance?.score?.toFixed(2)} (${entry.relevance?.isRelevant ? 'relevant' : 'not relevant'})`);
                console.log('');
            });
        } else {
            console.log('❌ No screen text captured yet');
            console.log('💡 Screen OCR may not be running or no text detected');
        }
    } else {
        console.log('❌ Screen OCR monitor not found or not initialized');
        console.log('💡 Try running the fix script first');
    }
    
    console.log('\n🎧 AUDIO ENVIRONMENT TRANSCRIPTS:');
    console.log('=================================');
    
    if (window.audioEnvironmentMonitor && window.audioEnvironmentMonitor.audioHistory) {
        const audioHistory = window.audioEnvironmentMonitor.audioHistory;
        console.log(`🎵 Found ${audioHistory.length} audio context entries`);
        
        if (audioHistory.length > 0) {
            console.log('\n🎶 Recent Audio Context (last 5 entries):');
            audioHistory.slice(-5).forEach((entry, i) => {
                const time = new Date(entry.timestamp).toLocaleTimeString();
                console.log(`${i + 1}. [${time}] ${entry.primaryType} from ${entry.source}`);
                console.log(`   📊 Confidence: ${entry.confidence?.toFixed(2)}`);
                console.log(`   🎯 Focus Impact: ${entry.insights?.focusImpact}, Mood: ${entry.insights?.moodImpact}`);
                console.log(`   📈 Relevance: ${entry.relevance?.score?.toFixed(2)} (${entry.relevance?.isRelevant ? 'relevant' : 'not relevant'})`);
                if (entry.details && Object.keys(entry.details).length > 0) {
                    console.log(`   🔍 Details:`, entry.details);
                }
                console.log('');
            });
        } else {
            console.log('❌ No audio context captured yet');
            console.log('💡 Audio monitoring may not be running');
        }
    } else {
        console.log('❌ Audio Environment monitor not found or not initialized');
        console.log('💡 Try running the fix script first');
    }
    
    console.log('\n🧠 UNIFIED CONTEXT HISTORY:');
    console.log('============================');
    
    if (window.unifiedContextEngine && window.unifiedContextEngine.contextHistory) {
        const contextHistory = window.unifiedContextEngine.contextHistory;
        console.log(`🔗 Found ${contextHistory.length} unified context entries`);
        
        if (contextHistory.length > 0) {
            console.log('\n🎯 Recent Unified Context (last 5 entries):');
            contextHistory.slice(-5).forEach((entry, i) => {
                const time = new Date(entry.timestamp).toLocaleTimeString();
                console.log(`${i + 1}. [${time}] ${entry.unified.primaryContext}`);
                console.log(`   🔗 Correlation: ${entry.correlation.confidence.toFixed(2)} confidence${entry.correlation.pattern ? ` (${entry.correlation.pattern})` : ''}`);
                console.log(`   🏃 Activity: ${entry.unified.activity}, Environment: ${entry.unified.environment}`);
                console.log(`   🧘 Focus: ${entry.unified.focusLevel}, Mood: ${entry.unified.mood}`);
                console.log(`   ⚡ Urgency: ${entry.urgency.level} (score: ${entry.urgency.score.toFixed(2)})`);
                if (entry.insights.suggestions.length > 0) {
                    console.log(`   💡 Suggestions: ${entry.insights.suggestions.map(s => s.text).join(', ')}`);
                }
                console.log('');
            });
        } else {
            console.log('❌ No unified context entries yet');
            console.log('💡 Unified context engine may not be running');
        }
    } else {
        console.log('❌ Unified Context Engine not found or not initialized');
        console.log('💡 Try running the fix script first');
    }
    
    console.log('\n📊 CURRENT REAL-TIME DATA:');
    console.log('===========================');
    
    // Current screen text
    if (window.screenOCRMonitor && window.screenOCRMonitor.currentScreenText) {
        console.log('👁️ Current Screen Text:');
        console.log(`"${window.screenOCRMonitor.currentScreenText.substring(0, 200)}..."`);
    } else {
        console.log('👁️ Current Screen Text: None detected');
    }
    
    // Current audio context
    if (window.audioEnvironmentMonitor && window.audioEnvironmentMonitor.currentAudioContext) {
        const audio = window.audioEnvironmentMonitor.currentAudioContext;
        console.log('🎧 Current Audio Context:');
        console.log(`   Type: ${audio.type}, Source: ${audio.source}, Confidence: ${audio.confidence?.toFixed(2)}`);
        if (audio.details) {
            console.log(`   Details:`, audio.details);
        }
    } else {
        console.log('🎧 Current Audio Context: None detected');
    }
    
    // Current unified context
    if (window.unifiedContextEngine && window.unifiedContextEngine.currentContext) {
        const unified = window.unifiedContextEngine.currentContext.unified;
        console.log('🧠 Current Unified Context:');
        console.log(`   Primary: ${unified.primaryContext}, Activity: ${unified.activity}`);
        console.log(`   Environment: ${unified.environment}, Focus: ${unified.focusLevel}`);
    } else {
        console.log('🧠 Current Unified Context: None available');
    }
    
    console.log('\n✅ TRANSCRIPT VIEWING COMPLETE');
    console.log('===============================');
    console.log('💡 If you see "None detected" everywhere, the monitoring system needs to be restarted');
    console.log('💡 Run fixAllMonitoringIssues() to restart monitoring');
}

// Test system audio directly
async function testSystemAudioNow() {
    console.log('\n🧪 TESTING SYSTEM AUDIO DETECTION NOW:');
    console.log('======================================');
    
    if (!window.electronAPI || !window.electronAPI.audioEnvironment) {
        console.error('❌ Electron Audio API not available');
        return;
    }
    
    try {
        console.log('🎵 Getting current audio context...');
        const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
        console.log('📊 Raw Audio Context:', audioContext);
        
        console.log('🔊 Capturing system audio sources...');
        const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
        console.log('📊 Raw Audio Sources:', audioSources);
        
        // Interpret results
        if (audioContext.context === 'music') {
            console.log(`✅ MUSIC DETECTED: ${audioContext.currentTrack || 'Unknown track'} (${audioContext.app || 'Unknown app'})`);
        } else if (audioContext.context === 'silence') {
            console.log('🔇 SILENCE DETECTED (no music currently playing)');
        } else {
            console.log(`🎵 AUDIO DETECTED: ${audioContext.context} (volume: ${audioContext.volume})`);
        }
        
        if (audioSources.audioSources && audioSources.audioSources.length > 0) {
            console.log(`🔊 ACTIVE AUDIO APPS: ${audioSources.audioSources.map(s => `${s.name} (${s.type})`).join(', ')}`);
        } else {
            console.log('🔇 NO ACTIVE AUDIO APPLICATIONS DETECTED');
        }
        
    } catch (error) {
        console.error('❌ System audio test failed:', error);
    }
}

// Export functions
window.viewAllTranscripts = viewAllTranscripts;
window.testSystemAudioNow = testSystemAudioNow;

console.log('💡 Available commands:');
console.log('  • viewAllTranscripts() - See all detected screen and audio data');
console.log('  • testSystemAudioNow() - Test system audio detection right now');