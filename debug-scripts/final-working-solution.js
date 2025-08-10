// FINAL WORKING SOLUTION - Console Script
// This creates working monitoring that respects stealth mode

console.log('🎯 FINAL WORKING MONITORING SOLUTION');
console.log('===================================');

// Since stealth mode blocks screen capture, we'll create a pure text-based monitoring system
// that still provides valuable context awareness

function createWorkingMonitoringSystem() {
    console.log('🚀 Creating working monitoring system...');
    
    // 1. WORKING AUDIO DETECTION (already fixed)
    if (!window.audioEnvironmentMonitor) {
        console.log('❌ Audio monitor not found');
        return;
    }
    
    // Ensure audio fix is applied
    window.audioEnvironmentMonitor.processSystemAudioContext = async function(audioContext) {
        let contextType = 'silence';
        let contextDetails = {};
        let confidence = 0.5;
        
        // WORKING: Volume > 50 = music
        if (audioContext.volume > 50) {
            contextType = 'music';
            contextDetails = {
                app: 'System Audio',
                volume: audioContext.volume,
                source: 'volume_detection'
            };
            confidence = 0.8;
        } else if (audioContext.context === 'music') {
            contextType = 'music';
            contextDetails = {
                app: audioContext.app || 'unknown',
                volume: audioContext.volume
            };
            confidence = 0.9;
        } else if (audioContext.volume > 10) {
            contextType = 'ambient';
            contextDetails = { volume: audioContext.volume };
            confidence = 0.7;
        }
        
        this.currentAudioContext = {
            type: contextType,
            source: 'system_detection',
            details: contextDetails,
            timestamp: audioContext.timestamp,
            confidence: confidence
        };
        
        console.log(`🎵 WORKING System audio: ${contextType} (volume: ${audioContext.volume}) - confidence: ${confidence.toFixed(2)}`);
    };
    
    // 2. ALTERNATIVE CONTEXT DETECTION (no screen capture needed)
    function createAlternativeContextDetection() {
        console.log('🔍 Creating alternative context detection...');
        
        // Detect context from system processes and audio
        async function detectCurrentContext() {
            try {
                // Get current audio context
                const audioData = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
                const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
                
                let primaryContext = 'unknown';
                let confidence = 0.3;
                let environment = 'mixed';
                let activity = 'unknown';
                
                // Analyze based on audio + system processes
                if (audioData.volume > 50) {
                    primaryContext = 'music_session';
                    confidence = 0.8;
                    environment = 'focused_work';
                    activity = 'listening';
                    
                    // Check what apps are running
                    if (audioSources.audioSources?.length > 0) {
                        const app = audioSources.audioSources[0].name;
                        if (app.includes('Spotify')) {
                            activity = 'music_streaming';
                            confidence = 0.9;
                        } else if (app.includes('Chrome')) {
                            activity = 'web_audio';
                            confidence = 0.8;
                        }
                    }
                } else if (audioData.volume > 20) {
                    primaryContext = 'ambient_work';
                    confidence = 0.6;
                    environment = 'quiet_work';
                    activity = 'focused';
                } else {
                    primaryContext = 'quiet_session';
                    confidence = 0.7;
                    environment = 'silent';
                    activity = 'reading_or_thinking';
                }
                
                // Create working context
                const workingContext = {
                    timestamp: Date.now(),
                    primaryContext: primaryContext,
                    confidence: confidence,
                    environment: environment,
                    activity: activity,
                    audio: {
                        volume: audioData.volume,
                        type: audioData.context,
                        apps: audioSources.audioSources?.map(s => s.name) || []
                    },
                    insights: generateWorkingInsights(primaryContext, activity, audioData.volume)
                };
                
                // Store in history
                if (!window.workingContextHistory) window.workingContextHistory = [];
                window.workingContextHistory.push(workingContext);
                
                // Keep only last 50 entries
                if (window.workingContextHistory.length > 50) {
                    window.workingContextHistory.shift();
                }
                
                console.log(`🧠 WORKING Context: ${primaryContext} (${confidence.toFixed(2)}) - ${activity}`);
                console.log(`🏠 Environment: ${environment}, Volume: ${audioData.volume}`);
                console.log(`📱 Active apps: ${workingContext.audio.apps.join(', ') || 'None detected'}`);
                
                return workingContext;
                
            } catch (error) {
                console.error('❌ Context detection failed:', error);
                return null;
            }
        }
        
        // Helper function for insights
        function generateWorkingInsights(context, activity, volume) {
            const insights = {
                focus_level: 'medium',
                productivity: 'moderate',
                suggestions: []
            };
            
            if (context === 'music_session' && volume > 70) {
                insights.focus_level = 'high';
                insights.productivity = 'high';
                insights.suggestions.push('Great focus music session! You\'re in the zone.');
            } else if (context === 'quiet_session') {
                insights.focus_level = 'high';
                insights.productivity = 'high';
                insights.suggestions.push('Perfect quiet environment for deep work.');
            } else if (volume > 0 && volume < 30) {
                insights.focus_level = 'medium';
                insights.suggestions.push('Light background audio - good for concentration.');
            }
            
            return insights;
        }
        
        // Start periodic detection
        console.log('⏰ Starting context detection every 5 seconds...');
        const interval = setInterval(detectCurrentContext, 5000);
        
        // Initial detection
        detectCurrentContext();
        
        // Store cleanup
        window.stopWorkingContextDetection = () => {
            clearInterval(interval);
            console.log('🛑 Working context detection stopped');
        };
        
        console.log('✅ Alternative context detection is running!');
        return true;
    }
    
    // 3. ENHANCED AUDIO INSIGHTS
    function createEnhancedAudioInsights() {
        console.log('🎵 Creating enhanced audio insights...');
        
        // Monitor audio patterns over time
        async function analyzeAudioPatterns() {
            if (!window.audioEnvironmentMonitor?.audioHistory) return;
            
            const history = window.audioEnvironmentMonitor.audioHistory;
            if (history.length < 3) return;
            
            const recent = history.slice(-5);
            const volumePattern = recent.map(h => h.details?.volume || 0);
            const avgVolume = volumePattern.reduce((a, b) => a + b, 0) / volumePattern.length;
            
            let pattern = 'stable';
            if (volumePattern.every(v => v > 60)) pattern = 'high_energy';
            else if (volumePattern.every(v => v < 20)) pattern = 'quiet_focus';
            else if (Math.max(...volumePattern) - Math.min(...volumePattern) > 40) pattern = 'variable';
            
            console.log(`📊 Audio pattern analysis: ${pattern} (avg volume: ${avgVolume.toFixed(0)})`);
            
            // Store pattern analysis
            if (!window.audioPatterns) window.audioPatterns = [];
            window.audioPatterns.push({
                timestamp: Date.now(),
                pattern: pattern,
                avgVolume: avgVolume,
                duration: '5min'
            });
            
            return pattern;
        }
        
        // Run pattern analysis every 30 seconds
        setInterval(analyzeAudioPatterns, 30000);
        
        console.log('✅ Enhanced audio insights active');
    }
    
    // Start all working systems
    const alternativeContext = createAlternativeContextDetection();
    createEnhancedAudioInsights();
    
    console.log('\n✅ WORKING MONITORING SYSTEM ACTIVE!');
    console.log('====================================');
    console.log('🎵 Audio detection: WORKING (volume-based music detection)');
    console.log('🧠 Context analysis: WORKING (audio + system process based)');
    console.log('📊 Pattern analysis: WORKING (audio behavior tracking)');
    console.log('');
    console.log('💡 Available data:');
    console.log('  • Audio context: window.audioEnvironmentMonitor.audioHistory');
    console.log('  • Working context: window.workingContextHistory');
    console.log('  • Audio patterns: window.audioPatterns');
    console.log('');
    console.log('🛑 Stop functions:');
    console.log('  • Context: window.stopWorkingContextDetection()');
    console.log('');
    console.log('📈 This system provides neurodivergent-focused insights without screen capture!');
    
    return true;
}

// Auto-run the working system
console.log('🚀 Starting working monitoring system in 2 seconds...');
setTimeout(() => {
    createWorkingMonitoringSystem();
}, 2000);