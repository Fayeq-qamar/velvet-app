// REAL Audio Environment Monitor - No Simulation
// Actual system audio detection via Electron IPC + microphone analysis

class RealAudioEnvironmentMonitor {
    constructor() {
        this.isActive = false;
        this.audioContext = null;
        this.analyser = null;
        this.microphoneStream = null;
        this.audioHistory = [];
        this.currentAudioContext = {};
        this.contextCallbacks = [];
        this.systemAudioInterval = null;
        
        // Configuration
        this.config = {
            sampleRate: 44100,
            fftSize: 2048,
            analysisPeriodMs: 3000, // Analyze every 3 seconds
            maxHistoryEntries: 100,
            enableMicrophoneAnalysis: true,
            enableSystemAudioDetection: true,
            confidenceThreshold: 0.6
        };
        
        // Audio classification thresholds
        this.audioThresholds = {
            silenceThreshold: 1000,    // Below this = silence
            musicEnergyMin: 2000,      // Music typically has consistent energy
            speechFreqRange: [85, 255], // Human speech fundamental frequencies
            musicFreqRange: [80, 8000]  // Full music spectrum
        };
    }

    // Initialize the REAL Audio Environment Monitor
    async initialize() {
        try {
            console.log('🎧 Initializing REAL Audio Environment Monitor...');
            
            // Initialize Web Audio API for microphone analysis
            await this.initializeWebAudio();
            
            // Verify system audio detection capabilities
            await this.verifySystemAudioSupport();
            
            this.isActive = true;
            console.log('✅ REAL Audio Environment Monitor initialized successfully!');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize REAL Audio Environment Monitor:', error);
            return false;
        }
    }

    // Initialize Web Audio API
    async initializeWebAudio() {
        try {
            console.log('🔊 Initializing Web Audio API...');
            
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
                sampleRate: this.config.sampleRate
            });
            
            // Create analyser node for frequency analysis
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = this.config.fftSize;
            this.analyser.smoothingTimeConstant = 0.8;
            
            console.log('✅ Web Audio API initialized');
            
        } catch (error) {
            console.error('❌ Failed to initialize Web Audio API:', error);
            throw error;
        }
    }

    // Verify system audio detection support
    async verifySystemAudioSupport() {
        try {
            console.log('🔍 Verifying system audio detection...');
            
            if (!window.electronAPI) {
                throw new Error('Electron API not available for system audio detection');
            }
            
            // Test system audio detection
            const audioDevices = await window.electronAPI.invoke('get-system-audio-devices');
            console.log(`✅ System audio detection verified - ${audioDevices.devices?.length || 0} devices found`);
            
        } catch (error) {
            console.error('❌ System audio detection verification failed:', error);
            // Continue anyway - we can still do microphone analysis
            console.log('⚠️ Continuing with microphone-only analysis');
        }
    }

    // Start REAL monitoring
    async startMonitoring() {
        if (!this.isActive) {
            console.log('❌ Audio Environment Monitor not initialized');
            return false;
        }

        try {
            console.log('🎧 Starting REAL audio environment monitoring...');
            
            // Set up microphone monitoring if enabled
            if (this.config.enableMicrophoneAnalysis) {
                await this.setupMicrophoneMonitoring();
            }
            
            // Set up system audio detection if enabled
            if (this.config.enableSystemAudioDetection) {
                await this.setupSystemAudioDetection();
            }
            
            // Start periodic audio analysis
            this.startAudioAnalysis();
            
            console.log('✅ REAL audio monitoring active');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to start REAL audio monitoring:', error);
            return false;
        }
    }

    // Set up microphone monitoring for ambient audio
    async setupMicrophoneMonitoring() {
        try {
            console.log('🎤 Setting up microphone monitoring...');
            
            // Request microphone permission
            this.microphoneStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: false, // We want to hear ambient sounds
                    autoGainControl: false,
                    sampleRate: this.config.sampleRate
                }
            });
            
            // Connect microphone to analyser
            const micSource = this.audioContext.createMediaStreamSource(this.microphoneStream);
            micSource.connect(this.analyser);
            
            console.log('✅ Microphone monitoring active');
            
        } catch (error) {
            console.error('❌ Microphone monitoring setup failed:', error);
            console.log('⚠️ Continuing without microphone analysis');
        }
    }

    // Set up system audio detection via IPC
    async setupSystemAudioDetection() {
        try {
            console.log('🔊 Setting up system audio detection...');
            
            // Start periodic system audio detection
            this.systemAudioInterval = setInterval(async () => {
                await this.detectSystemAudio();
            }, this.config.analysisPeriodMs);
            
            // Initial detection
            await this.detectSystemAudio();
            
            console.log('✅ System audio detection active');
            
        } catch (error) {
            console.error('❌ System audio detection setup failed:', error);
            console.log('⚠️ Continuing without system audio detection');
        }
    }

    // Detect current system audio context
    async detectSystemAudio() {
        try {
            // Get current audio context from main process
            const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
            
            if (audioContext && !audioContext.error) {
                // Process the real system audio context
                await this.processSystemAudioContext(audioContext);
            }
            
            // Get active audio applications
            const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
            
            if (audioSources && !audioSources.error && audioSources.audioSources.length > 0) {
                // Process active audio applications
                await this.processAudioSources(audioSources);
            }
            
        } catch (error) {
            console.error('❌ System audio detection failed:', error);
        }
    }

    // Process system audio context (music, calls, etc.)
    async processSystemAudioContext(audioContext) {
        try {
            let contextType = 'silence';
            let contextDetails = {};
            let confidence = 0.5;
            
            console.log('🔍 Processing system audio context:', audioContext);
            
            if (audioContext.context === 'music' && audioContext.currentTrack) {
                contextType = 'music';
                contextDetails = {
                    app: audioContext.app,
                    track: audioContext.currentTrack,
                    volume: audioContext.volume
                };
                confidence = 0.95; // Very high confidence for detected music with track info
                console.log('✅ High confidence music detection with track info');
            } else if (audioContext.context === 'music') {
                contextType = 'music';
                contextDetails = {
                    app: audioContext.app || 'unknown',
                    volume: audioContext.volume
                };
                confidence = 0.9; // High confidence for detected music
                console.log('✅ High confidence music detection');
            } else if (audioContext.volume > 0) {
                contextType = 'ambient';
                contextDetails = {
                    volume: audioContext.volume
                };
                confidence = 0.7; // Moderate confidence for volume-based detection
                console.log('✅ Moderate confidence ambient audio');
            }
            
            // Boost confidence for well-known music apps
            if (contextDetails.app && ['Spotify', 'Apple Music', 'YouTube Music'].includes(contextDetails.app)) {
                confidence = Math.min(confidence + 0.05, 1.0);
                console.log('✅ Confidence boost for known music app:', contextDetails.app);
            }
            
            // Update current audio context
            this.currentAudioContext = {
                type: contextType,
                source: 'system_detection',
                details: contextDetails,
                timestamp: audioContext.timestamp,
                confidence: confidence
            };
            
            console.log(`🎵 System audio: ${contextType} (${contextDetails.app || 'system'}) - confidence: ${confidence.toFixed(2)}`);
            
        } catch (error) {
            console.error('❌ System audio context processing failed:', error);
        }
    }

    // Process active audio applications
    async processAudioSources(audioSources) {
        try {
            const sources = audioSources.audioSources;
            
            if (sources.length === 0) {
                return;
            }
            
            // Determine primary audio source
            const musicApps = sources.filter(s => s.type === 'music');
            const callApps = sources.filter(s => s.type === 'call');
            const browserApps = sources.filter(s => s.type === 'browser');
            
            let primarySource = null;
            let contextType = 'unknown';
            
            if (callApps.length > 0) {
                primarySource = callApps[0];
                contextType = 'call';
            } else if (musicApps.length > 0) {
                primarySource = musicApps[0];
                contextType = 'music';
            } else if (browserApps.length > 0) {
                primarySource = browserApps[0];
                contextType = 'browser_audio';
            }
            
            if (primarySource) {
                // Update current context with detected source
                this.currentAudioContext = {
                    ...this.currentAudioContext,
                    type: contextType,
                    source: primarySource.name,
                    timestamp: audioSources.timestamp,
                    confidence: 0.8
                };
                
                console.log(`🔊 Audio source: ${contextType} from ${primarySource.name}`);
            }
            
        } catch (error) {
            console.error('❌ Audio sources processing failed:', error);
        }
    }

    // Start periodic audio analysis
    startAudioAnalysis() {
        this.analysisInterval = setInterval(() => {
            this.analyzeCurrentAudio();
        }, this.config.analysisPeriodMs);
        
        // Initial analysis
        this.analyzeCurrentAudio();
    }

    // Analyze current audio environment
    async analyzeCurrentAudio() {
        try {
            const startTime = Date.now();
            
            // Analyze microphone input if available
            let microphoneAnalysis = null;
            if (this.analyser && this.microphoneStream) {
                microphoneAnalysis = this.analyzeMicrophoneInput();
            }
            
            // Combine microphone analysis with system audio context
            const combinedAnalysis = this.combineAudioAnalysis(
                microphoneAnalysis, 
                this.currentAudioContext
            );
            
            // Process the complete audio context
            await this.processCompleteAudioContext(combinedAnalysis);
            
            const processingTime = Date.now() - startTime;
            console.log(`🎧 Audio analysis completed in ${processingTime}ms - detected: ${combinedAnalysis.primaryType}`);
            
        } catch (error) {
            console.error('❌ Audio analysis failed:', error);
        }
    }

    // Analyze microphone input for ambient audio
    analyzeMicrophoneInput() {
        try {
            // Get frequency data from analyser
            const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(frequencyData);
            
            // Calculate audio characteristics
            const analysis = this.analyzeFrequencySpectrum(frequencyData);
            
            // Classify the audio type
            const classification = this.classifyMicrophoneAudio(analysis);
            
            return {
                spectrum: analysis,
                classification: classification,
                source: 'microphone',
                timestamp: Date.now()
            };
            
        } catch (error) {
            console.error('❌ Microphone analysis failed:', error);
            return null;
        }
    }

    // Analyze frequency spectrum from microphone
    analyzeFrequencySpectrum(frequencyData) {
        const analysis = {
            totalEnergy: 0,
            frequencyRanges: {
                bass: 0,      // 20-250 Hz
                midrange: 0,  // 250-2000 Hz  
                treble: 0     // 2000-8000 Hz
            },
            dominantFrequency: 0,
            spectralCentroid: 0,
            spectralRolloff: 0
        };
        
        let weightedFrequencySum = 0;
        let totalMagnitude = 0;
        
        // Calculate frequency distribution and characteristics
        for (let i = 0; i < frequencyData.length; i++) {
            const frequency = (i * this.config.sampleRate) / (2 * frequencyData.length);
            const amplitude = frequencyData[i];
            
            analysis.totalEnergy += amplitude;
            weightedFrequencySum += frequency * amplitude;
            totalMagnitude += amplitude;
            
            // Categorize by frequency range
            if (frequency <= 250) {
                analysis.frequencyRanges.bass += amplitude;
            } else if (frequency <= 2000) {
                analysis.frequencyRanges.midrange += amplitude;
            } else if (frequency <= 8000) {
                analysis.frequencyRanges.treble += amplitude;
            }
            
            // Find dominant frequency
            if (amplitude > frequencyData[analysis.dominantFrequency]) {
                analysis.dominantFrequency = i;
            }
        }
        
        // Calculate spectral centroid (brightness indicator)
        analysis.spectralCentroid = totalMagnitude > 0 ? weightedFrequencySum / totalMagnitude : 0;
        
        // Normalize values
        const maxValue = Math.max(...Object.values(analysis.frequencyRanges));
        if (maxValue > 0) {
            Object.keys(analysis.frequencyRanges).forEach(key => {
                analysis.frequencyRanges[key] = analysis.frequencyRanges[key] / maxValue;
            });
        }
        
        return analysis;
    }

    // Classify microphone audio
    classifyMicrophoneAudio(analysis) {
        const classification = {
            music: 0,
            speech: 0,
            ambient: 0,
            silence: 0
        };
        
        // Silence detection
        if (analysis.totalEnergy < this.audioThresholds.silenceThreshold) {
            classification.silence = 0.9;
            return { primaryType: 'silence', confidence: 0.9, details: classification };
        }
        
        // Music detection (balanced spectrum, higher energy)
        if (analysis.totalEnergy > this.audioThresholds.musicEnergyMin &&
            analysis.frequencyRanges.bass > 0.3 && 
            analysis.frequencyRanges.midrange > 0.4 &&
            analysis.frequencyRanges.treble > 0.2) {
            classification.music = 0.7;
        }
        
        // Speech detection (midrange dominant, specific frequency patterns)
        const dominantFreq = (analysis.dominantFrequency * this.config.sampleRate) / (2 * this.config.fftSize);
        if (analysis.frequencyRanges.midrange > 0.6 &&
            analysis.frequencyRanges.bass < 0.4 &&
            dominantFreq >= this.audioThresholds.speechFreqRange[0] && 
            dominantFreq <= this.audioThresholds.speechFreqRange[1]) {
            classification.speech = 0.6;
        }
        
        // Ambient detection (low energy, broad spectrum)
        if (analysis.totalEnergy < 3000 && analysis.frequencyRanges.bass > 0.1) {
            classification.ambient = 0.5;
        }
        
        // Determine primary type
        const primaryType = Object.keys(classification).reduce((a, b) => 
            classification[a] > classification[b] ? a : b
        );
        
        return {
            primaryType: primaryType,
            confidence: classification[primaryType],
            details: classification
        };
    }

    // Combine microphone analysis with system audio context
    combineAudioAnalysis(microphoneAnalysis, systemContext) {
        const combined = {
            timestamp: Date.now(),
            primaryType: 'unknown',
            confidence: 0,
            source: 'unknown',
            details: {}
        };
        
        // Prioritize system audio detection (higher confidence)
        if (systemContext && systemContext.confidence > 0.7) {
            combined.primaryType = systemContext.type;
            combined.confidence = systemContext.confidence;
            combined.source = systemContext.source;
            combined.details = systemContext.details || {};
        } 
        // Fall back to microphone analysis
        else if (microphoneAnalysis && microphoneAnalysis.classification.confidence > 0.5) {
            combined.primaryType = microphoneAnalysis.classification.primaryType;
            combined.confidence = microphoneAnalysis.classification.confidence;
            combined.source = 'microphone_analysis';
            combined.details = microphoneAnalysis.classification.details;
        }
        // Default to ambient if we have any audio activity
        else if (microphoneAnalysis && microphoneAnalysis.spectrum.totalEnergy > 500) {
            combined.primaryType = 'ambient';
            combined.confidence = 0.4;
            combined.source = 'microphone_ambient';
            combined.details = { energy: microphoneAnalysis.spectrum.totalEnergy };
        }
        // Otherwise silence
        else {
            combined.primaryType = 'silence';
            combined.confidence = 0.8;
            combined.source = 'detection';
            combined.details = {};
        }
        
        return combined;
    }

    // Process complete audio context
    async processCompleteAudioContext(audioAnalysis) {
        try {
            // Generate insights
            const insights = this.generateAudioInsights(audioAnalysis);
            
            // Calculate relevance for neurodivergent assistance
            const relevance = this.calculateAudioRelevance(audioAnalysis);
            
            // Create complete audio context entry
            const audioContext = {
                ...audioAnalysis,
                insights: insights,
                relevance: relevance,
                processingSource: 'real_audio_monitor'
            };
            
            // Store in history
            this.addToAudioHistory(audioContext);
            
            // Trigger context callbacks
            this.triggerAudioContextCallbacks(audioContext);
            
            console.log(`🎵 REAL audio context: ${audioAnalysis.primaryType} from ${audioAnalysis.source} - ${insights.focusImpact}`);
            
        } catch (error) {
            console.error('❌ Audio context processing failed:', error);
        }
    }

    // Generate insights from real audio analysis
    generateAudioInsights(audioAnalysis) {
        const insights = {
            focusImpact: 'neutral',
            moodImpact: 'neutral',
            socialContext: 'none',
            suggestedActions: []
        };
        
        switch (audioAnalysis.primaryType) {
            case 'music':
                if (audioAnalysis.details?.track?.toLowerCase().includes('focus') ||
                    audioAnalysis.details?.track?.toLowerCase().includes('lo-fi') ||
                    audioAnalysis.source === 'Spotify') {
                    insights.focusImpact = 'enhancing';
                    insights.moodImpact = 'positive';
                    insights.suggestedActions.push('Protect focus session');
                }
                break;
                
            case 'call':
                insights.socialContext = 'active';
                insights.focusImpact = 'interrupting';
                insights.suggestedActions.push('Monitor for social cues', 'Activate meeting assistant');
                break;
                
            case 'speech':
                insights.socialContext = 'conversation';
                insights.suggestedActions.push('Analyze for emotional content');
                break;
                
            case 'silence':
                insights.focusImpact = 'neutral';
                insights.moodImpact = 'calm';
                break;
        }
        
        return insights;
    }

    // Calculate audio relevance for neurodivergent assistance
    calculateAudioRelevance(audioAnalysis) {
        let relevanceScore = 0;
        let factors = [];
        
        console.log('🎯 Calculating audio relevance for:', audioAnalysis.primaryType, 'from', audioAnalysis.source);
        
        // Social interaction audio is highly relevant
        if (audioAnalysis.primaryType === 'call' || audioAnalysis.primaryType === 'speech') {
            relevanceScore += 0.9;
            factors.push('social_interaction');
            console.log('✅ High relevance: social interaction detected');
        }
        
        // Music is generally relevant for neurodivergent support (mood, focus, masking)
        if (audioAnalysis.primaryType === 'music') {
            relevanceScore += 0.6; // Base relevance for any music
            factors.push('music_detected');
            
            // Focus music gets extra relevance
            if (audioAnalysis.details?.track?.toLowerCase().includes('focus') ||
                audioAnalysis.details?.track?.toLowerCase().includes('lo-fi') ||
                audioAnalysis.details?.app === 'Spotify') {
                relevanceScore += 0.2;
                factors.push('focus_music');
                console.log('✅ Enhanced relevance: focus music detected');
            } else {
                console.log('✅ Moderate relevance: general music detected');
            }
        }
        
        // System-detected audio is more relevant than microphone ambient
        if (audioAnalysis.source === 'system_detection' || audioAnalysis.source?.includes('Spotify')) {
            relevanceScore += 0.3;
            factors.push('system_detected');
            console.log('✅ Bonus relevance: system-level detection');
        }
        
        // High confidence detection gets relevance boost
        if (audioAnalysis.confidence > 0.8) {
            relevanceScore += 0.2;
            factors.push('high_confidence');
            console.log('✅ Bonus relevance: high confidence detection');
        }
        
        // Browser audio (YouTube, etc.) is relevant for context
        if (audioAnalysis.source?.toLowerCase().includes('browser') || 
            audioAnalysis.source?.toLowerCase().includes('chrome')) {
            relevanceScore += 0.5;
            factors.push('browser_media');
            console.log('✅ Moderate relevance: browser media detected');
        }
        
        const finalScore = Math.min(relevanceScore, 1.0);
        const isRelevant = finalScore > 0.3; // Lowered threshold for better detection
        
        console.log(`🎯 Audio relevance result: ${finalScore.toFixed(2)} (${isRelevant ? 'RELEVANT' : 'not relevant'})`);
        console.log('📊 Factors:', factors);
        
        return {
            score: finalScore,
            factors: factors,
            isRelevant: isRelevant
        };
    }

    // Add audio context to history
    addToAudioHistory(audioContext) {
        this.audioHistory.push(audioContext);
        
        // Maintain history size limit
        if (this.audioHistory.length > this.config.maxHistoryEntries) {
            this.audioHistory.shift();
        }
    }

    // Register callback for audio context awareness
    onAudioContextDetected(callback) {
        this.contextCallbacks.push(callback);
    }

    // Trigger all audio context callbacks
    triggerAudioContextCallbacks(audioContext) {
        this.contextCallbacks.forEach(callback => {
            try {
                callback(audioContext);
            } catch (error) {
                console.error('❌ Audio context callback error:', error);
            }
        });
    }

    // Get current audio context
    getCurrentAudioContext() {
        if (this.audioHistory.length === 0) return null;
        
        const recentAudio = this.audioHistory.slice(-3); // Last 3 audio contexts
        const current = recentAudio[recentAudio.length - 1];
        
        return {
            current: current,
            recent: recentAudio,
            trend: this.analyzeAudioTrend(recentAudio)
        };
    }

    // Analyze audio trend
    analyzeAudioTrend(recentAudio) {
        if (recentAudio.length < 2) return 'stable';
        
        const types = recentAudio.map(a => a.primaryType);
        const uniqueTypes = new Set(types);
        
        if (uniqueTypes.size === 1) return 'consistent';
        if (uniqueTypes.size === types.length) return 'changing';
        return 'variable';
    }

    // Stop monitoring
    stopMonitoring() {
        if (this.analysisInterval) {
            clearInterval(this.analysisInterval);
            this.analysisInterval = null;
        }
        
        if (this.systemAudioInterval) {
            clearInterval(this.systemAudioInterval);
            this.systemAudioInterval = null;
        }
        
        // Stop microphone stream
        if (this.microphoneStream) {
            this.microphoneStream.getTracks().forEach(track => track.stop());
            this.microphoneStream = null;
        }
        
        console.log('🎧 REAL audio environment monitoring stopped');
    }

    // Deactivate the monitor
    async deactivate() {
        this.stopMonitoring();
        this.isActive = false;
        this.contextCallbacks = [];
        
        // Close audio context
        if (this.audioContext) {
            await this.audioContext.close();
            this.audioContext = null;
        }
        
        console.log('🎧 REAL Audio Environment Monitor deactivated');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealAudioEnvironmentMonitor;
} else {
    window.RealAudioEnvironmentMonitor = RealAudioEnvironmentMonitor;
}

// Testing functions for development
if (typeof window !== 'undefined') {
    window.testRealAudioMonitor = {
        async startTest() {
            const monitor = new RealAudioEnvironmentMonitor();
            const initialized = await monitor.initialize();
            
            if (initialized) {
                console.log('✅ Real Audio Environment Monitor initialized successfully');
                
                const started = await monitor.startMonitoring();
                if (started) {
                    console.log('✅ Real audio monitoring started - check console for detection results');
                    
                    // Store reference for manual testing
                    window.realAudioMonitor = monitor;
                }
            }
        },
        
        async stopTest() {
            if (window.realAudioMonitor) {
                await window.realAudioMonitor.deactivate();
                console.log('✅ Real audio monitoring stopped');
            }
        },
        
        async testSystemAudio() {
            if (window.electronAPI && window.electronAPI.audioEnvironment) {
                console.log('🧪 Testing system audio detection...');
                
                const audioContext = await window.electronAPI.audioEnvironment.getCurrentAudioContext();
                console.log('Audio context:', audioContext);
                
                const audioSources = await window.electronAPI.audioEnvironment.captureSystemAudio();
                console.log('Audio sources:', audioSources);
                
                const audioDevices = await window.electronAPI.audioEnvironment.getSystemAudioDevices();
                console.log('Audio devices:', audioDevices);
            } else {
                console.error('❌ Electron Audio Environment API not available');
            }
        }
    };
}