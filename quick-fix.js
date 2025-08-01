// QUICK FIX - Paste this into browser console
// This will override the broken audio detection immediately

console.log('⚡ QUICK AUDIO FIX');
console.log('==================');

// Fix the immediate audio context issue
function fixAudioContextNow() {
    console.log('🔧 Applying immediate audio context fix...');
    
    // Check if audio monitor exists
    if (!window.audioEnvironmentMonitor) {
        console.log('❌ No audio monitor found');
        return false;
    }
    
    // Override the processSystemAudioContext function
    const originalProcess = window.audioEnvironmentMonitor.processSystemAudioContext;
    
    window.audioEnvironmentMonitor.processSystemAudioContext = async function(audioContext) {
        console.log('🔍 FIXED: Processing system audio context:', audioContext);
        
        let contextType = 'silence';
        let contextDetails = {};
        let confidence = 0.5;
        
        // FIXED LOGIC: If volume > 50, it's NOT silence
        if (audioContext.volume > 50) {
            contextType = 'music'; // Override silence with music
            contextDetails = {
                app: 'System Audio',
                volume: audioContext.volume,
                source: 'volume_detection'
            };
            confidence = 0.8;
            console.log('✅ FIXED: Volume detected, overriding silence with music');
        } else if (audioContext.context === 'music' && audioContext.currentTrack) {
            contextType = 'music';
            contextDetails = {
                app: audioContext.app,
                track: audioContext.currentTrack,
                volume: audioContext.volume
            };
            confidence = 0.95;
            console.log('✅ FIXED: Music with track info detected');
        } else if (audioContext.context === 'music') {
            contextType = 'music';
            contextDetails = {
                app: audioContext.app || 'unknown',
                volume: audioContext.volume
            };
            confidence = 0.9;
            console.log('✅ FIXED: Music detected');
        } else if (audioContext.volume > 10) {
            contextType = 'ambient';
            contextDetails = {
                volume: audioContext.volume
            };
            confidence = 0.7;
            console.log('✅ FIXED: Ambient audio detected');
        }
        
        // Update current audio context
        this.currentAudioContext = {
            type: contextType,
            source: 'system_detection',
            details: contextDetails,
            timestamp: audioContext.timestamp,
            confidence: confidence
        };
        
        console.log(`🎵 FIXED System audio: ${contextType} (${contextDetails.app || 'system'}) - confidence: ${confidence.toFixed(2)}`);
    };
    
    console.log('✅ Audio context processing function has been fixed!');
    console.log('💡 Now volume > 50 will be detected as music instead of silence');
    
    return true;
}

// Fix the relevance calculation to recognize music properly
function fixAudioRelevance() {
    console.log('🎯 Fixing audio relevance calculation...');
    
    if (!window.audioEnvironmentMonitor) {
        console.log('❌ No audio monitor found');
        return false;
    }
    
    // Override the calculateAudioRelevance function
    window.audioEnvironmentMonitor.calculateAudioRelevance = function(audioAnalysis) {
        let relevanceScore = 0;
        let factors = [];
        
        console.log('🎯 FIXED: Calculating audio relevance for:', audioAnalysis.primaryType, 'from', audioAnalysis.source);
        
        // FIXED: Music is ALWAYS highly relevant for neurodivergent support
        if (audioAnalysis.primaryType === 'music') {
            relevanceScore += 0.8; // High base relevance for music
            factors.push('music_detected');
            console.log('✅ FIXED: High relevance for music');
        }
        
        // Social interaction audio is highly relevant
        if (audioAnalysis.primaryType === 'call' || audioAnalysis.primaryType === 'speech') {
            relevanceScore += 0.9;
            factors.push('social_interaction');
            console.log('✅ FIXED: High relevance for social interaction');
        }
        
        // System-detected audio is more relevant
        if (audioAnalysis.source === 'system_detection') {
            relevanceScore += 0.3;
            factors.push('system_detected');
            console.log('✅ FIXED: Bonus for system detection');
        }
        
        // High confidence gets bonus
        if (audioAnalysis.confidence > 0.7) {
            relevanceScore += 0.2;
            factors.push('high_confidence');
            console.log('✅ FIXED: Bonus for high confidence');
        }
        
        // Even ambient audio is somewhat relevant
        if (audioAnalysis.primaryType === 'ambient') {
            relevanceScore += 0.4;
            factors.push('ambient_audio');
            console.log('✅ FIXED: Moderate relevance for ambient audio');
        }
        
        const finalScore = Math.min(relevanceScore, 1.0);
        const isRelevant = finalScore > 0.2; // Lower threshold
        
        console.log(`🎯 FIXED Audio relevance result: ${finalScore.toFixed(2)} (${isRelevant ? 'RELEVANT' : 'not relevant'})`);
        console.log('📊 FIXED Factors:', factors);
        
        return {
            score: finalScore,
            factors: factors,
            isRelevant: isRelevant
        };
    };
    
    console.log('✅ Audio relevance calculation has been fixed!');
    return true;
}

// Test the fixed system right now
async function testFixedAudio() {
    console.log('🧪 Testing fixed audio system...');
    
    if (!window.electronAPI?.audioEnvironment) {
        console.log('❌ No audio API available');
        return;
    }
    
    try {
        const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
        console.log('📊 Current audio context:', audioContext);
        
        if (audioContext.volume > 50) {
            console.log('✅ DETECTED: Volume is', audioContext.volume, '- this should now be treated as music!');
        } else {
            console.log('🔇 Current volume is low:', audioContext.volume);
        }
        
    } catch (error) {
        console.error('❌ Audio test failed:', error);
    }
}

// Run the quick fix
async function runQuickFix() {
    console.log('⚡ Running quick fix...\n');
    
    // Fix audio context processing
    const contextFixed = fixAudioContextNow();
    
    // Fix relevance calculation
    const relevanceFixed = fixAudioRelevance();
    
    // Test the fix
    if (contextFixed && relevanceFixed) {
        console.log('\n🧪 Testing the fix...');
        await testFixedAudio();
        
        console.log('\n✅ QUICK FIX APPLIED!');
        console.log('======================');
        console.log('🎵 Now when volume > 50, it will be detected as MUSIC not silence');
        console.log('🎯 Music will have high relevance (0.8+) for neurodivergent support');
        console.log('🧠 Unified context should now show music instead of unknown');
        console.log('\n💡 Watch the logs - you should now see:');  
        console.log('  • "🎵 FIXED System audio: music" instead of silence');
        console.log('  • "🎯 FIXED Audio relevance result: 0.80+ (RELEVANT)"');
        console.log('  • "🧠 Unified context updated: music" with proper confidence');
    } else {
        console.log('❌ Quick fix failed - audio monitor not found');
    }
}

// Auto-run the fix
console.log('⚡ Applying quick fix in 1 second...');
setTimeout(runQuickFix, 1000);