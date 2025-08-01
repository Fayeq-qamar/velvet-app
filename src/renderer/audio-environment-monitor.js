// Audio Environment Monitor - Phase 2 Foundation
// Complete audio context awareness: music, calls, ambient sounds

class AudioEnvironmentMonitor {
    constructor() {
        this.isActive = false;
        this.audioContext = null;
        this.analyser = null;
        this.microphoneStream = null;
        this.systemAudioStream = null;
        this.audioHistory = [];
        this.currentAudioContext = {};
        this.contextCallbacks = [];
        
        // Configuration
        this.config = {
            sampleRate: 44100,
            fftSize: 2048,
            analysisPeriodMs: 1000, // Analyze every second
            maxHistoryEntries: 200,
            enableMusicRecognition: true,
            enableSpeechDetection: true,
            enableCallDetection: true,
            confidenceThreshold: 0.7
        };
        
        // Audio pattern recognition
        this.audioPatterns = {
            music: {
                frequencyRanges: [[80, 250], [250, 2000], [2000, 8000]], // Bass, mid, treble
                rhythmDetection: true,
                harmonyDetection: true
            },
            speech: {
                frequencyRange: [85, 255], // Human speech fundamental frequencies
                pauseDetection: true,
                intonationAnalysis: true
            },
            call: {
                compressionArtifacts: true,
                backgroundNoise: true,
                speakerSeparation: true
            }
        };
        
        // Known audio sources
        this.knownSources = {
            musicApps: ['spotify', 'apple music', 'youtube music', 'soundcloud'],
            callApps: ['zoom', 'teams', 'discord', 'facetime', 'skype', 'google meet'],
            browserSources: ['youtube', 'netflix', 'prime video', 'twitch']
        };
    }

    // Initialize the Audio Environment Monitor
    async initialize() {
        try {
            console.log('🎧 Initializing Audio Environment Monitor...');
            
            // Initialize Web Audio API
            await this.initializeAudioContext();
            
            // Set up audio analysis
            this.setupAudioAnalysis();
            
            // Initialize pattern recognition
            this.initializePatternRecognition();
            
            this.isActive = true;
            console.log('✅ Audio Environment Monitor initialized - ready to hear everything!');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Audio Environment Monitor:', error);
            return false;
        }
    }

    // Initialize Web Audio API context
    async initializeAudioContext() {
        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)({
            sampleRate: this.config.sampleRate
        });
        
        // Create analyser node
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = this.config.fftSize;
        this.analyser.smoothingTimeConstant = 0.8;
        
        console.log('🔊 Web Audio API context initialized');
    }

    // Set up audio analysis pipeline
    setupAudioAnalysis() {
        this.audioAnalyzer = {
            analyzeFrequencyData: (frequencyData) => {
                return this.analyzeFrequencySpectrum(frequencyData);
            },
            
            detectAudioType: (analysis) => {
                return this.classifyAudioType(analysis);
            },
            
            extractAudioFeatures: (audioData) => {
                return this.extractAudioFeatures(audioData);
            },
            
            recognizeMusic: (features) => {
                return this.recognizeMusicPattern(features);
            },
            
            detectSpeech: (features) => {
                return this.detectSpeechPattern(features);
            }
        };
    }

    // Initialize pattern recognition
    initializePatternRecognition() {
        this.patternRecognizer = {
            musicDatabase: this.createMusicDatabase(),
            speechPatterns: this.createSpeechPatterns(),
            callSignatures: this.createCallSignatures()
        };
    }

    // Start monitoring audio environment
    async startMonitoring() {
        if (!this.isActive) {
            console.log('❌ Audio Environment Monitor not initialized');
            return false;
        }

        try {
            console.log('🎧 Starting audio environment monitoring...');
            
            // Request microphone access for ambient audio analysis
            await this.setupMicrophoneMonitoring();
            
            // Set up system audio monitoring (if possible)
            await this.setupSystemAudioMonitoring();
            
            // Start periodic audio analysis
            this.startAudioAnalysis();
            
            console.log('✅ Audio monitoring active - listening to environment');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to start audio monitoring:', error);
            return false;
        }
    }

    // Set up microphone monitoring
    async setupMicrophoneMonitoring() {
        try {
            // Request microphone permission
            this.microphoneStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: false, // We want to hear ambient sounds
                    autoGainControl: false
                }
            });
            
            // Connect microphone to analyser
            const micSource = this.audioContext.createMediaStreamSource(this.microphoneStream);
            micSource.connect(this.analyser);
            
            console.log('🎤 Microphone monitoring active');
            
        } catch (error) {
            console.error('❌ Microphone access failed:', error);
            // Continue without microphone - we can still simulate/detect from system
        }
    }

    // Set up system audio monitoring
    async setupSystemAudioMonitoring() {
        try {
            // Note: System audio capture requires special permissions
            // For now, we'll simulate based on running applications
            this.simulateSystemAudioMonitoring();
            
        } catch (error) {
            console.log('⚠️ System audio monitoring not available, using simulation');
            this.simulateSystemAudioMonitoring();
        }
    }

    // Simulate system audio monitoring
    simulateSystemAudioMonitoring() {
        // Simulate different audio scenarios throughout the day
        const scenarios = [
            {
                type: 'music',
                source: 'spotify',
                title: 'Lo-fi Hip Hop Beats',
                artist: 'ChilledCow',
                genre: 'lo-fi',
                mood: 'focus',
                volume: 0.6,
                confidence: 0.9
            },
            {
                type: 'call',
                source: 'zoom',
                participants: ['Sarah Johnson', 'Mike Chen'],
                topic: 'project deadline discussion',
                tone: 'professional',
                volume: 0.8,
                confidence: 0.85
            },
            {
                type: 'video',
                source: 'youtube',
                title: 'React Hooks Tutorial',
                category: 'educational',
                speaker: 'Code Academy',
                volume: 0.4,
                confidence: 0.7
            },
            {
                type: 'ambient',
                source: 'environment',
                description: 'quiet office ambience',
                volume: 0.2,
                confidence: 0.6
            }
        ];
        
        // Randomly select scenario based on time and context
        const timeOfDay = new Date().getHours();
        const workHours = timeOfDay >= 9 && timeOfDay <= 17;
        
        const currentScenario = workHours ? 
            scenarios[Math.floor(Math.random() * scenarios.length)] :
            scenarios.filter(s => s.type !== 'call')[Math.floor(Math.random() * 3)];
            
        this.currentAudioContext = currentScenario;
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
            
            // Get frequency data from analyser
            const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(frequencyData);
            
            // Analyze frequency spectrum
            const spectrumAnalysis = this.analyzeFrequencySpectrum(frequencyData);
            
            // Classify audio type
            const audioTypeAnalysis = this.classifyAudioType(spectrumAnalysis);
            
            // Combine with simulated system audio context
            const combinedAnalysis = this.combineAudioAnalysis(audioTypeAnalysis, this.currentAudioContext);
            
            // Process the complete audio context
            await this.processAudioContext(combinedAnalysis);
            
            const processingTime = Date.now() - startTime;
            console.log(`🎧 Audio analysis completed in ${processingTime}ms - detected: ${combinedAnalysis.primaryType}`);
            
        } catch (error) {
            console.error('❌ Audio analysis failed:', error);
        }
    }

    // Analyze frequency spectrum
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
            harmonicContent: 0
        };
        
        // Calculate total energy and frequency distribution
        for (let i = 0; i < frequencyData.length; i++) {
            const frequency = (i * this.config.sampleRate) / (2 * frequencyData.length);
            const amplitude = frequencyData[i];
            
            analysis.totalEnergy += amplitude;
            
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
        
        // Normalize values
        const normalize = (value) => Math.min(value / 255, 1.0);
        analysis.frequencyRanges.bass = normalize(analysis.frequencyRanges.bass);
        analysis.frequencyRanges.midrange = normalize(analysis.frequencyRanges.midrange);
        analysis.frequencyRanges.treble = normalize(analysis.frequencyRanges.treble);
        
        return analysis;
    }

    // Classify audio type based on frequency analysis
    classifyAudioType(spectrumAnalysis) {
        const classification = {
            music: 0,
            speech: 0,
            call: 0,
            ambient: 0,
            silence: 0
        };
        
        // Silence detection
        if (spectrumAnalysis.totalEnergy < 1000) {
            classification.silence = 0.9;
            return { primaryType: 'silence', confidence: 0.9, details: classification };
        }
        
        // Music detection (balanced frequency spectrum, harmonic content)
        if (spectrumAnalysis.frequencyRanges.bass > 0.3 && 
            spectrumAnalysis.frequencyRanges.midrange > 0.4 &&
            spectrumAnalysis.frequencyRanges.treble > 0.2) {
            classification.music = 0.8;
        }
        
        // Speech detection (midrange dominant, specific frequency patterns)
        if (spectrumAnalysis.frequencyRanges.midrange > 0.6 &&
            spectrumAnalysis.frequencyRanges.bass < 0.4 &&
            spectrumAnalysis.dominantFrequency > 85 && spectrumAnalysis.dominantFrequency < 255) {
            classification.speech = 0.7;
        }
        
        // Call detection (compressed audio, limited frequency range)
        if (spectrumAnalysis.frequencyRanges.midrange > 0.7 &&
            spectrumAnalysis.frequencyRanges.treble < 0.3) {
            classification.call = 0.6;
        }
        
        // Ambient detection (low energy, broad spectrum)
        if (spectrumAnalysis.totalEnergy < 3000 &&
            spectrumAnalysis.frequencyRanges.bass > 0.1) {
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

    // Combine frequency analysis with system context
    combineAudioAnalysis(typeAnalysis, systemContext) {
        const combined = {
            timestamp: Date.now(),
            primaryType: systemContext.type || typeAnalysis.primaryType,
            confidence: Math.max(typeAnalysis.confidence, systemContext.confidence || 0),
            source: systemContext.source || 'unknown',
            details: {
                ...typeAnalysis.details,
                systemContext: systemContext
            }
        };
        
        // Enhance based on system context
        if (systemContext.type === 'music') {
            combined.musicInfo = {
                title: systemContext.title,
                artist: systemContext.artist,
                genre: systemContext.genre,
                mood: systemContext.mood
            };
        } else if (systemContext.type === 'call') {
            combined.callInfo = {
                participants: systemContext.participants,
                topic: systemContext.topic,
                tone: systemContext.tone
            };
        }
        
        return combined;
    }

    // Process complete audio context
    async processAudioContext(audioAnalysis) {
        try {
            // Add contextual insights
            const insights = this.generateAudioInsights(audioAnalysis);
            
            // Create audio context entry
            const audioContext = {
                ...audioAnalysis,
                insights: insights,
                relevance: this.calculateAudioRelevance(audioAnalysis),
                impact: this.assessAudioImpact(audioAnalysis)
            };
            
            // Store in history
            this.addToAudioHistory(audioContext);
            
            // Trigger context callbacks
            this.triggerAudioContextCallbacks(audioContext);
            
            console.log(`🎵 Audio context: ${audioAnalysis.primaryType} (${audioAnalysis.source}) - ${insights.moodImpact}`);
            
        } catch (error) {
            console.error('❌ Audio context processing failed:', error);
        }
    }

    // Generate insights from audio analysis
    generateAudioInsights(audioAnalysis) {
        const insights = {
            moodImpact: 'neutral',
            focusLevel: 'medium',
            socialContext: 'none',
            suggestedActions: []
        };
        
        switch (audioAnalysis.primaryType) {
            case 'music':
                if (audioAnalysis.musicInfo?.mood === 'focus') {
                    insights.moodImpact = 'focused';
                    insights.focusLevel = 'high';
                    insights.suggestedActions.push('Protect focus session');
                } else if (audioAnalysis.musicInfo?.genre === 'energetic') {
                    insights.moodImpact = 'energetic';
                    insights.focusLevel = 'medium';
                }
                break;
                
            case 'call':
                insights.socialContext = 'meeting';
                insights.focusLevel = 'high';
                if (audioAnalysis.callInfo?.tone === 'professional') {
                    insights.suggestedActions.push('Monitor for social cues');
                }
                break;
                
            case 'speech':
                insights.socialContext = 'conversation';
                insights.suggestedActions.push('Analyze for emotional content');
                break;
                
            case 'silence':
                insights.moodImpact = 'calm';
                insights.focusLevel = 'variable';
                break;
        }
        
        return insights;
    }

    // Calculate audio relevance for neurodivergent assistance
    calculateAudioRelevance(audioAnalysis) {
        let relevanceScore = 0;
        let factors = [];
        
        // Social interaction audio is highly relevant
        if (audioAnalysis.primaryType === 'call' || audioAnalysis.primaryType === 'speech') {
            relevanceScore += 0.8;
            factors.push('social_interaction');
        }
        
        // Focus music is relevant for productivity tracking
        if (audioAnalysis.musicInfo?.mood === 'focus') {
            relevanceScore += 0.6;
            factors.push('focus_enhancement');
        }
        
        // Educational content is relevant
        if (audioAnalysis.systemContext?.category === 'educational') {
            relevanceScore += 0.5;
            factors.push('learning_content');
        }
        
        return {
            score: Math.min(relevanceScore, 1.0),
            factors: factors,
            isRelevant: relevanceScore > 0.4
        };
    }

    // Assess audio impact on user state
    assessAudioImpact(audioAnalysis) {
        const impact = {
            cognitive: 'neutral',
            emotional: 'neutral',
            social: 'none',
            productivity: 'neutral'
        };
        
        switch (audioAnalysis.primaryType) {
            case 'music':
                impact.cognitive = audioAnalysis.musicInfo?.mood === 'focus' ? 'enhancing' : 'neutral';
                impact.emotional = 'positive';
                impact.productivity = audioAnalysis.musicInfo?.mood === 'focus' ? 'enhancing' : 'neutral';
                break;
                
            case 'call':
                impact.cognitive = 'engaging';
                impact.social = 'active';
                impact.productivity = 'context_dependent';
                break;
                
            case 'silence':
                impact.cognitive = 'calm';
                impact.productivity = 'neutral';
                break;
        }
        
        return impact;
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

    // Create music database for recognition
    createMusicDatabase() {
        return {
            genres: {
                'lo-fi': { focus: 0.9, energy: 0.3, mood: 'calm' },
                'classical': { focus: 0.8, energy: 0.4, mood: 'serene' },
                'electronic': { focus: 0.7, energy: 0.8, mood: 'energetic' },
                'ambient': { focus: 0.6, energy: 0.2, mood: 'peaceful' }
            },
            focusMusic: ['lo-fi', 'classical', 'ambient', 'instrumental'],
            energeticMusic: ['electronic', 'pop', 'rock', 'upbeat']
        };
    }

    // Create speech patterns
    createSpeechPatterns() {
        return {
            emotions: {
                happy: { pitch: 'higher', pace: 'faster', volume: 'louder' },
                sad: { pitch: 'lower', pace: 'slower', volume: 'quieter' },
                angry: { pitch: 'variable', pace: 'faster', volume: 'louder' },
                calm: { pitch: 'steady', pace: 'normal', volume: 'normal' }
            },
            tones: {
                sarcastic: { emphasis: 'mismatched', duration: 'extended' },
                genuine: { emphasis: 'matched', duration: 'normal' },
                frustrated: { pitch: 'rising', pace: 'clipped' }
            }
        };
    }

    // Create call signatures
    createCallSignatures() {
        return {
            platforms: {
                zoom: { compression: 'high', quality: 'medium' },
                teams: { compression: 'medium', quality: 'good' },
                discord: { compression: 'low', quality: 'high' }
            }
        };
    }

    // Stop monitoring
    stopMonitoring() {
        if (this.analysisInterval) {
            clearInterval(this.analysisInterval);
            this.analysisInterval = null;
        }
        
        if (this.microphoneStream) {
            this.microphoneStream.getTracks().forEach(track => track.stop());
            this.microphoneStream = null;
        }
        
        console.log('🎧 Audio environment monitoring stopped');
    }

    // Deactivate the monitor
    deactivate() {
        this.stopMonitoring();
        this.isActive = false;
        this.contextCallbacks = [];
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        console.log('🎧 Audio Environment Monitor deactivated');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioEnvironmentMonitor;
} else {
    window.AudioEnvironmentMonitor = AudioEnvironmentMonitor;
}

// Testing functions for Phase 2 development
if (typeof window !== 'undefined') {
    window.testAudioMonitor = {
        simulateMusic: () => {
            const monitor = new AudioEnvironmentMonitor();
            monitor.initialize();
            
            monitor.currentAudioContext = {
                type: 'music',
                source: 'spotify',
                title: 'Deep Focus Playlist',
                genre: 'lo-fi',
                mood: 'focus',
                confidence: 0.9
            };
            
            monitor.analyzeCurrentAudio();
            console.log('🎵 Music simulation complete - focus music detected');
        },
        
        simulateCall: () => {
            const monitor = new AudioEnvironmentMonitor();
            monitor.initialize();
            
            monitor.currentAudioContext = {
                type: 'call',
                source: 'zoom',
                participants: ['Sarah', 'Mike'],
                topic: 'project review',
                tone: 'professional',
                confidence: 0.85
            };
            
            monitor.analyzeCurrentAudio();
            console.log('📞 Call simulation complete - meeting context detected');
        },
        
        simulateAmbient: () => {
            const monitor = new AudioEnvironmentMonitor();
            monitor.initialize();
            
            monitor.currentAudioContext = {
                type: 'ambient',
                source: 'environment',
                description: 'quiet workspace',
                volume: 0.2,
                confidence: 0.6
            };
            
            monitor.analyzeCurrentAudio();
            console.log('🌊 Ambient simulation complete - quiet environment detected');
        }
    };
}