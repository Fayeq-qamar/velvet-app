// VIRAL SOCIAL DECODER SYSTEM - Complete Neurodivergent Communication Assistant
// "Finally, someone gets it!" - Real-time social cue detection for neurodivergent users
// Phase 2A: Complete implementation with live meeting detection and intervention

/**
 * ViralSocialDecoder - The Complete Social Decoder System
 * 
 * This is the viral neurodivergent feature that creates breakthrough moments:
 * - Real-time social cue detection during calls/meetings
 * - Neurotypical translation with sarcasm and subtext detection
 * - Live intervention UI with whisper notifications
 * - Meeting detection and automatic activation
 * - Response suggestion templates for confident communication
 * 
 * Target User Experience:
 * - "OMG it told me Sarah was actually upset when she said 'fine'!"
 * - "I finally understand what people mean when they're being passive-aggressive"
 * - "This saved me from a huge miscommunication with my boss"
 */

class ViralSocialDecoder {
    constructor() {
        console.log('🎭 Initializing Viral Social Decoder System...');
        
        // Core state
        this.isActive = false;
        this.isMeetingMode = false;
        this.isListening = false;
        this.currentMeeting = null;
        
        // Core analysis engines
        this.enhancedDecoder = null;
        this.audioMonitor = null;
        this.aiPersonality = null;
        
        // Real-time analysis
        this.analysisQueue = [];
        this.currentAnalysis = null;
        this.recentAnalyses = [];
        
        // UI state
        this.interventionUI = null;
        this.whisperSystem = null;
        this.confidenceIndicator = null;
        
        // Performance metrics
        this.metrics = {
            sessionStart: Date.now(),
            totalDetections: 0,
            sarcasmDetections: 0,
            emotionDetections: 0,
            interventionsTrigger: 0,
            averageConfidence: 0,
            processingTime: 0
        };
        
        // Configuration for viral experience
        this.config = {
            // Real-time performance
            maxLatency: 200,           // Sub-200ms for real-time feel
            confidenceThreshold: 0.7,  // High confidence for accuracy
            interventionThreshold: 0.8, // Very high confidence for interventions
            
            // Meeting detection
            meetingDetectionEnabled: true,
            autoActivateOnMeeting: true,
            supportedMeetingApps: ['Zoom', 'Teams', 'Meet', 'FaceTime', 'Skype'],
            
            // User experience
            gentleMode: true,           // Shame-free notifications
            whisperNotifications: true, // Subtle real-time guidance
            responseTemplates: true,    // Suggested responses
            privacyMode: true,          // All processing local
            
            // Viral features
            celebrateBreakthroughs: true, // "OMG I get it!" moments
            adaptiveThresholds: true,     // Learn user preferences
            socialConfidenceBoost: true   // Build confidence over time
        };
        
        // Response templates for different scenarios
        this.responseTemplates = {
            sarcasm_detected: [
                {
                    situation: "They said '{original}' but seem frustrated",
                    responses: [
                        "I want to make sure we're on the same page. Is this timeline actually workable?",
                        "I sense this might not be ideal. What would work better?",
                        "Help me understand - are there concerns about this approach?"
                    ]
                }
            ],
            
            anxiety_detected: [
                {
                    situation: "They seem uncertain or anxious",
                    responses: [
                        "No pressure at all. We can figure this out together.",
                        "Take your time - there's no rush on this.",
                        "What would help you feel more confident about this?"
                    ]
                }
            ],
            
            frustration_detected: [
                {
                    situation: "They sound overwhelmed or frustrated",
                    responses: [
                        "This does seem like a lot. How can we make it more manageable?",
                        "I hear you - that sounds really challenging.",
                        "What would be most helpful right now?"
                    ]
                }
            ],
            
            passive_aggressive: [
                {
                    situation: "They're being polite but may have concerns",
                    responses: [
                        "I want to make sure you're comfortable with this plan.",
                        "Please let me know if there's anything that doesn't feel right.",
                        "Your honest feedback would be really valuable here."
                    ]
                }
            ]
        };
        
        // Meeting context tracking
        this.meetingContext = {
            participants: [],
            duration: 0,
            platform: null,
            isRecording: false,
            socialTension: 0,
            communicationStyle: 'professional'
        };
        
        console.log('🎭 Viral Social Decoder core initialized');
    }
    
    /**
     * Initialize the complete Viral Social Decoder System
     */
    async initialize() {
        try {
            console.log('🚀 Starting Viral Social Decoder System initialization...');
            
            // Initialize enhanced social decoder engine
            await this.initializeEnhancedDecoder();
            
            // Connect to audio monitoring system
            await this.connectAudioMonitoring();
            
            // Initialize AI personality integration
            await this.initializeAIPersonality();
            
            // Set up meeting detection system
            await this.initializeMeetingDetection();
            
            // Create live intervention UI
            await this.initializeInterventionUI();
            
            // Start real-time processing
            this.startRealTimeProcessing();
            
            this.isActive = true;
            console.log('✅ 🎭 VIRAL SOCIAL DECODER SYSTEM FULLY ACTIVE');
            console.log('🎯 Ready to create "finally, someone gets it!" moments');
            
            return true;
            
        } catch (error) {
            console.error('❌ Viral Social Decoder initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Initialize the enhanced social decoder engine
     */
    async initializeEnhancedDecoder() {
        try {
            console.log('🧠 Initializing Enhanced Social Decoder Engine...');
            
            if (typeof EnhancedSocialDecoder !== 'undefined') {
                this.enhancedDecoder = new EnhancedSocialDecoder();
                const initialized = await this.enhancedDecoder.initialize();
                
                if (initialized) {
                    console.log('✅ Enhanced Social Decoder Engine connected');
                    
                    // Register for enhanced analysis callbacks
                    this.enhancedDecoder.onEnhancedAnalysis((analysis) => {
                        this.processEnhancedAnalysis(analysis);
                    });
                    
                    // Register for regular analysis callbacks (fallback)
                    this.enhancedDecoder.onSocialCueDetected((analysis) => {
                        this.processSocialCueDetection(analysis);
                    });
                    
                } else {
                    throw new Error('Enhanced decoder initialization failed');
                }
            } else {
                // Fallback to basic social decoder
                console.log('🔄 Falling back to basic Social Decoder...');
                if (typeof SocialDecoder !== 'undefined') {
                    this.enhancedDecoder = new SocialDecoder();
                    await this.enhancedDecoder.initialize();
                    
                    this.enhancedDecoder.onSocialCueDetected((analysis) => {
                        this.processSocialCueDetection(analysis);
                    });
                } else {
                    throw new Error('No social decoder available');
                }
            }
            
        } catch (error) {
            console.error('❌ Enhanced decoder initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Connect to the real audio monitoring system
     */
    async connectAudioMonitoring() {
        try {
            console.log('🎧 Connecting to Real Audio Environment Monitor...');
            
            if (window.realAudioEnvironmentMonitor) {
                this.audioMonitor = window.realAudioEnvironmentMonitor;
                
                // Register for audio context updates
                this.audioMonitor.onAudioContextDetected((audioContext) => {
                    this.processAudioContext(audioContext);
                });
                
                console.log('✅ Real Audio Environment Monitor connected');
                
            } else {
                console.log('⚠️ Real Audio Environment Monitor not available');
                // Create minimal audio interface for basic functionality
                this.audioMonitor = {
                    getCurrentAudioContext: () => ({ primaryType: 'unknown' }),
                    isActive: false
                };
            }
            
        } catch (error) {
            console.error('❌ Audio monitoring connection failed:', error);
            throw error;
        }
    }
    
    /**
     * Initialize AI personality integration
     */
    async initializeAIPersonality() {
        try {
            console.log('🤖 Initializing AI Personality Integration...');
            
            // Connect to Velvet's AI personality system
            if (window.ai && window.ai.generateResponse) {
                this.aiPersonality = window.ai;
                console.log('✅ AI Personality system connected');
            } else {
                console.log('⚠️ AI Personality system not available');
                // Create minimal AI interface
                this.aiPersonality = {
                    generateResponse: async (prompt) => {
                        return { response: "AI not available", confidence: 0.5 };
                    }
                };
            }
            
        } catch (error) {
            console.error('❌ AI personality initialization failed:', error);
        }
    }
    
    /**
     * Initialize meeting detection system
     */
    async initializeMeetingDetection() {
        try {
            console.log('📹 Initializing Meeting Detection System...');
            
            if (this.config.meetingDetectionEnabled) {
                // Set up automatic meeting detection
                this.meetingDetector = {
                    checkInterval: null,
                    lastCheck: 0,
                    
                    start: () => {
                        this.meetingDetector.checkInterval = setInterval(() => {
                            this.detectMeetingState();
                        }, 5000); // Check every 5 seconds
                    },
                    
                    stop: () => {
                        if (this.meetingDetector.checkInterval) {
                            clearInterval(this.meetingDetector.checkInterval);
                        }
                    }
                };
                
                this.meetingDetector.start();
                console.log('✅ Meeting Detection System active');
                
            } else {
                console.log('ℹ️ Meeting detection disabled in config');
            }
            
        } catch (error) {
            console.error('❌ Meeting detection initialization failed:', error);
        }
    }
    
    /**
     * Initialize live intervention UI system
     */
    async initializeInterventionUI() {
        try {
            console.log('🎨 Initializing Live Intervention UI...');
            
            // Create intervention UI container
            this.interventionUI = this.createInterventionUI();
            
            // Initialize whisper notification system
            this.whisperSystem = this.createWhisperSystem();
            
            // Initialize confidence indicator
            this.confidenceIndicator = this.createConfidenceIndicator();
            
            console.log('✅ Live Intervention UI initialized');
            
        } catch (error) {
            console.error('❌ Intervention UI initialization failed:', error);
        }
    }
    
    /**
     * Create the live intervention UI
     */
    createInterventionUI() {
        // Create intervention container
        const container = document.createElement('div');
        container.id = 'viral-social-decoder-ui';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 350px;
            max-height: 600px;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateX(20px);
            transition: all 0.3s ease;
        `;
        
        // Add to document
        document.body.appendChild(container);
        
        return {
            container: container,
            
            show: (content) => {
                container.innerHTML = content;
                container.style.opacity = '1';
                container.style.transform = 'translateX(0)';
                container.style.pointerEvents = 'auto';
            },
            
            hide: () => {
                container.style.opacity = '0';
                container.style.transform = 'translateX(20px)';
                container.style.pointerEvents = 'none';
                setTimeout(() => {
                    container.innerHTML = '';
                }, 300);
            },
            
            update: (content) => {
                if (container.style.opacity === '1') {
                    container.innerHTML = content;
                }
            }
        };
    }
    
    /**
     * Create whisper notification system
     */
    createWhisperSystem() {
        return {
            show: (message, type = 'info', duration = 4000) => {
                if (!this.config.whisperNotifications) return;
                
                const whisper = document.createElement('div');
                whisper.style.cssText = `
                    position: fixed;
                    bottom: 120px;
                    right: 20px;
                    max-width: 300px;
                    padding: 12px 16px;
                    border-radius: 12px;
                    color: white;
                    font-size: 14px;
                    font-weight: 500;
                    z-index: 10001;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                `;
                
                // Set background based on type
                const backgrounds = {
                    info: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.8))',
                    warning: 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.8))',
                    success: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.8))',
                    sarcasm: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.8))',
                    emotion: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(147, 51, 234, 0.8))'
                };
                
                whisper.style.background = backgrounds[type] || backgrounds.info;
                whisper.textContent = message;
                
                document.body.appendChild(whisper);
                
                // Animate in
                requestAnimationFrame(() => {
                    whisper.style.opacity = '1';
                    whisper.style.transform = 'translateY(0)';
                });
                
                // Auto remove
                setTimeout(() => {
                    whisper.style.opacity = '0';
                    whisper.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        if (whisper.parentNode) {
                            whisper.parentNode.removeChild(whisper);
                        }
                    }, 300);
                }, duration);
            }
        };
    }
    
    /**
     * Create confidence indicator for the glass orb
     */
    createConfidenceIndicator() {
        return {
            update: (confidence, type = 'neutral') => {
                const orb = document.querySelector('.velvet-orb');
                if (!orb) return;
                
                // Add confidence ring around orb
                let ring = orb.querySelector('.confidence-ring');
                if (!ring) {
                    ring = document.createElement('div');
                    ring.className = 'confidence-ring';
                    ring.style.cssText = `
                        position: absolute;
                        top: -3px;
                        left: -3px;
                        right: -3px;
                        bottom: -3px;
                        border-radius: 50%;
                        border: 2px solid transparent;
                        transition: all 0.3s ease;
                        pointer-events: none;
                    `;
                    orb.appendChild(ring);
                }
                
                // Update ring based on confidence and type
                const colors = {
                    sarcasm: '#ef4444',
                    emotion: '#a855f7',
                    high: '#22c55e',
                    medium: '#f59e0b',
                    low: '#6b7280',
                    neutral: 'transparent'
                };
                
                const opacity = Math.min(confidence, 1.0);
                const color = colors[type] || colors.neutral;
                
                if (confidence > 0.7) {
                    ring.style.borderColor = color;
                    ring.style.opacity = opacity.toString();
                    ring.style.boxShadow = `0 0 20px ${color}40`;
                } else {
                    ring.style.borderColor = 'transparent';
                    ring.style.opacity = '0';
                    ring.style.boxShadow = 'none';
                }
            }
        };
    }
    
    /**
     * Start real-time processing engine
     */
    startRealTimeProcessing() {
        console.log('⚡ Starting real-time processing engine...');
        
        // Real-time analysis queue processor
        this.processingInterval = setInterval(() => {
            this.processAnalysisQueue();
        }, 50); // 50ms = 20fps for smooth real-time processing
        
        // Performance monitoring
        this.monitoringInterval = setInterval(() => {
            this.updatePerformanceMetrics();
        }, 5000); // Every 5 seconds
        
        console.log('✅ Real-time processing engine active');
    }
    
    /**
     * Detect current meeting state
     */
    async detectMeetingState() {
        try {
            const audioContext = this.audioMonitor.getCurrentAudioContext();
            
            if (audioContext && audioContext.current) {
                const currentAudio = audioContext.current;
                
                // Check if current audio suggests a meeting/call
                const isMeeting = this.isMeetingAudio(currentAudio);
                
                if (isMeeting && !this.isMeetingMode) {
                    await this.activateMeetingMode(currentAudio);
                } else if (!isMeeting && this.isMeetingMode) {
                    await this.deactivateMeetingMode();
                }
            }
            
        } catch (error) {
            console.error('❌ Meeting detection failed:', error);
        }
    }
    
    /**
     * Check if audio context indicates a meeting/call
     */
    isMeetingAudio(audioContext) {
        if (!audioContext) return false;
        
        // Check audio type
        if (audioContext.primaryType === 'call' || audioContext.primaryType === 'speech') {
            return true;
        }
        
        // Check audio source for meeting apps
        if (audioContext.source) {
            const source = audioContext.source.toLowerCase();
            return this.config.supportedMeetingApps.some(app => 
                source.includes(app.toLowerCase())
            );
        }
        
        // Check for conversation patterns
        if (audioContext.insights && audioContext.insights.socialContext === 'active') {
            return true;
        }
        
        return false;
    }
    
    /**
     * Activate meeting mode for enhanced social decoding
     */
    async activateMeetingMode(audioContext) {
        console.log('📹 🎭 ACTIVATING MEETING MODE - Social Decoder Enhanced');
        
        this.isMeetingMode = true;
        this.currentMeeting = {
            startTime: Date.now(),
            platform: audioContext.source || 'Unknown',
            audioType: audioContext.primaryType,
            confidence: audioContext.confidence || 0.8
        };
        
        // Show activation notification
        this.whisperSystem.show(
            `🎭 Social Decoder activated for ${this.currentMeeting.platform} meeting`,
            'success',
            3000
        );
        
        // Update glass orb visual state
        this.updateOrbForMeetingMode();
        
        // Start enhanced monitoring
        this.enhancedMonitoringInterval = setInterval(() => {
            this.performEnhancedMeetingAnalysis();
        }, 1000); // Every second during meetings
        
        console.log('✅ Meeting mode active - enhanced social decoding engaged');
    }
    
    /**
     * Deactivate meeting mode
     */
    async deactivateMeetingMode() {
        console.log('📹 Deactivating meeting mode');
        
        if (this.enhancedMonitoringInterval) {
            clearInterval(this.enhancedMonitoringInterval);
        }
        
        // Calculate meeting summary
        const duration = this.currentMeeting ? 
            Math.round((Date.now() - this.currentMeeting.startTime) / 1000 / 60) : 0;
        
        if (duration > 1) { // Only show summary for meetings longer than 1 minute
            this.whisperSystem.show(
                `🎭 Meeting ended (${duration}m) - ${this.metrics.totalDetections} social cues detected`,
                'info',
                4000
            );
        }
        
        this.isMeetingMode = false;
        this.currentMeeting = null;
        
        // Reset orb visual state
        this.resetOrbVisualState();
        
        console.log('✅ Meeting mode deactivated');
    }
    
    /**
     * Update orb visual state for meeting mode
     */
    updateOrbForMeetingMode() {
        const orb = document.querySelector('.velvet-orb');
        if (!orb) return;
        
        // Add meeting mode indicator
        orb.classList.add('meeting-mode');
        
        // Add meeting mode styles if not already present
        if (!document.querySelector('#meeting-mode-styles')) {
            const styles = document.createElement('style');
            styles.id = 'meeting-mode-styles';
            styles.textContent = `
                .velvet-orb.meeting-mode {
                    border: 2px solid rgba(34, 197, 94, 0.4);
                    box-shadow: 
                        0 8px 32px rgba(37, 99, 235, 0.3),
                        0 0 0 4px rgba(34, 197, 94, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }
                
                .velvet-orb.meeting-mode::after {
                    content: '';
                    position: absolute;
                    top: -1px;
                    right: -1px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    border: 2px solid rgba(255, 255, 255, 0.9);
                    animation: meetingPulse 2s infinite;
                }
                
                @keyframes meetingPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    /**
     * Reset orb visual state
     */
    resetOrbVisualState() {
        const orb = document.querySelector('.velvet-orb');
        if (orb) {
            orb.classList.remove('meeting-mode');
        }
    }
    
    /**
     * Perform enhanced meeting analysis
     */
    async performEnhancedMeetingAnalysis() {
        if (!this.isMeetingMode || !this.enhancedDecoder) return;
        
        try {
            // Get current audio context
            const audioContext = this.audioMonitor.getCurrentAudioContext();
            
            if (audioContext && audioContext.current) {
                // Update meeting context
                this.updateMeetingContext(audioContext.current);
                
                // Check for speech/conversation patterns
                if (audioContext.current.primaryType === 'speech' || 
                    this.meetingContext.socialTension > 0.5) {
                    
                    // Prepare for potential transcript analysis
                    this.prepareForTranscriptAnalysis();
                }
            }
            
        } catch (error) {
            console.error('❌ Enhanced meeting analysis failed:', error);
        }
    }
    
    /**
     * Update meeting context based on audio analysis
     */
    updateMeetingContext(audioContext) {
        this.meetingContext.duration = this.currentMeeting ? 
            Date.now() - this.currentMeeting.startTime : 0;
        
        // Detect social tension from audio patterns
        if (audioContext.insights) {
            if (audioContext.insights.focusImpact === 'interrupting') {
                this.meetingContext.socialTension = Math.min(
                    this.meetingContext.socialTension + 0.1, 
                    1.0
                );
            } else if (audioContext.insights.moodImpact === 'positive') {
                this.meetingContext.socialTension = Math.max(
                    this.meetingContext.socialTension - 0.05, 
                    0.0
                );
            }
        }
    }
    
    /**
     * Prepare for transcript analysis (when speech is detected)
     */
    prepareForTranscriptAnalysis() {
        // This would integrate with speech recognition when available
        // For now, we're ready to analyze any transcripts that come in
        this.isListening = true;
        
        // Update UI to show we're actively listening
        this.confidenceIndicator.update(0.8, 'listening');
    }
    
    /**
     * Process enhanced analysis results from the social decoder
     */
    processEnhancedAnalysis(enhancedAnalysis) {
        try {
            console.log('🎭 Processing enhanced social analysis:', enhancedAnalysis.detectionType);
            
            // Update metrics
            this.metrics.totalDetections++;
            this.updateMetricsForAnalysis(enhancedAnalysis);
            
            // Store analysis
            this.recentAnalyses.push(enhancedAnalysis);
            this.maintainAnalysisHistory();
            
            // Determine intervention type
            const intervention = this.determineIntervention(enhancedAnalysis);
            
            if (intervention) {
                this.triggerLiveIntervention(intervention, enhancedAnalysis);
            }
            
            // Update confidence indicator
            this.confidenceIndicator.update(
                enhancedAnalysis.overallConfidence,
                enhancedAnalysis.detectionType
            );
            
            // Log viral moments (high confidence breakthroughs)
            if (enhancedAnalysis.overallConfidence > 0.9) {
                this.logViralMoment(enhancedAnalysis);
            }
            
        } catch (error) {
            console.error('❌ Enhanced analysis processing failed:', error);
        }
    }
    
    /**
     * Process regular social cue detection (fallback)
     */
    processSocialCueDetection(analysis) {
        try {
            console.log('🎭 Processing social cue detection:', analysis.original);
            
            // Convert to enhanced format for consistency
            const enhancedFormat = this.convertToEnhancedFormat(analysis);
            
            // Process as enhanced analysis
            this.processEnhancedAnalysis(enhancedFormat);
            
        } catch (error) {
            console.error('❌ Social cue processing failed:', error);
        }
    }
    
    /**
     * Convert regular analysis to enhanced format
     */
    convertToEnhancedFormat(analysis) {
        return {
            timestamp: analysis.timestamp,
            original: analysis.original,
            detectionType: analysis.translation?.hiddenMeaning ? 'sarcasm' : 'emotion',
            overallConfidence: analysis.confidence || 0.6,
            
            sarcasmDetection: {
                enhanced: analysis.translation?.hiddenMeaning ? true : false,
                confidence: analysis.confidence || 0.6,
                actualMeaning: analysis.translation?.hiddenMeaning
            },
            
            emotionDetection: {
                enhanced: analysis.translation?.emotionalSubtext || 'neutral',
                confidence: analysis.confidence || 0.5
            },
            
            recommendations: analysis.suggestions || [],
            processingTime: analysis.processingTime || 0
        };
    }
    
    /**
     * Determine if intervention is needed based on analysis
     */
    determineIntervention(analysis) {
        // Only intervene on high confidence detections
        if (analysis.overallConfidence < this.config.interventionThreshold) {
            return null;
        }
        
        // Sarcasm detection intervention
        if (analysis.sarcasmDetection && analysis.sarcasmDetection.enhanced) {
            return {
                type: 'sarcasm',
                priority: 'high',
                message: this.generateSarcasmIntervention(analysis),
                responses: this.getResponseTemplates('sarcasm_detected', analysis)
            };
        }
        
        // Emotional subtext intervention
        if (analysis.emotionDetection && analysis.emotionDetection.confidence > 0.8) {
            const emotion = analysis.emotionDetection.enhanced;
            
            if (['frustration', 'anxiety', 'passive_aggressive'].includes(emotion)) {
                return {
                    type: 'emotion',
                    priority: emotion === 'frustration' ? 'high' : 'medium',
                    message: this.generateEmotionIntervention(analysis, emotion),
                    responses: this.getResponseTemplates(`${emotion}_detected`, analysis)
                };
            }
        }
        
        return null;
    }
    
    /**
     * Generate sarcasm intervention message
     */
    generateSarcasmIntervention(analysis) {
        const original = analysis.original.substring(0, 50);
        const actualMeaning = analysis.sarcasmDetection.actualMeaning;
        
        return `🎭 Sarcasm detected: "${original}..." likely means: ${actualMeaning}`;
    }
    
    /**
     * Generate emotion intervention message
     */
    generateEmotionIntervention(analysis, emotion) {
        const original = analysis.original.substring(0, 50);
        
        const emotionMessages = {
            frustration: `😤 They sound frustrated: "${original}..." - consider addressing their concerns`,
            anxiety: `😰 They seem anxious: "${original}..." - they might need reassurance`,
            passive_aggressive: `😐 Passive-aggressive tone: "${original}..." - there may be underlying concerns`
        };
        
        return emotionMessages[emotion] || `🎭 Emotional subtext detected in: "${original}..."`;
    }
    
    /**
     * Get appropriate response templates
     */
    getResponseTemplates(templateType, analysis) {
        const templates = this.responseTemplates[templateType];
        if (!templates || templates.length === 0) return [];
        
        // Return the first template's responses (could be made more sophisticated)
        return templates[0].responses || [];
    }
    
    /**
     * Trigger live intervention during calls
     */
    triggerLiveIntervention(intervention, analysis) {
        try {
            console.log(`🚨 Triggering ${intervention.type} intervention:`, intervention.message);
            
            // Update metrics
            this.metrics.interventionsTrigger++;
            
            // Show whisper notification
            this.whisperSystem.show(
                intervention.message,
                intervention.type,
                6000 // Longer duration for interventions
            );
            
            // Show response suggestions if in meeting mode
            if (this.isMeetingMode && intervention.responses.length > 0) {
                this.showResponseSuggestions(intervention.responses, analysis);
            }
            
            // Log intervention for learning
            this.logIntervention(intervention, analysis);
            
        } catch (error) {
            console.error('❌ Live intervention failed:', error);
        }
    }
    
    /**
     * Show response suggestions in the intervention UI
     */
    showResponseSuggestions(responses, analysis) {
        const html = `
            <div style="
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9));
                border-radius: 16px;
                padding: 20px;
                border: 1px solid rgba(59, 130, 246, 0.3);
                backdrop-filter: blur(20px);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
            ">
                <div style="display: flex; align-items: center; margin-bottom: 16px;">
                    <div style="
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #22c55e;
                        margin-right: 8px;
                        animation: pulse 2s infinite;
                    "></div>
                    <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #e2e8f0;">
                        Suggested Responses
                    </h3>
                </div>
                
                ${responses.slice(0, 3).map((response, index) => `
                    <div style="
                        margin-bottom: 12px;
                        padding: 12px;
                        background: rgba(59, 130, 246, 0.1);
                        border-radius: 8px;
                        border-left: 3px solid #3b82f6;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    " 
                    onclick="navigator.clipboard.writeText('${response.replace(/'/g, "\\'")}'); this.style.background='rgba(34, 197, 94, 0.1)'; this.style.borderLeftColor='#22c55e';"
                    >
                        <div style="font-size: 13px; line-height: 1.4; color: #f1f5f9;">
                            ${response}
                        </div>
                        <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
                            Click to copy
                        </div>
                    </div>
                `).join('')}
                
                <div style="
                    margin-top: 16px;
                    padding-top: 12px;
                    border-top: 1px solid rgba(59, 130, 246, 0.2);
                    font-size: 11px;
                    color: #94a3b8;
                    text-align: center;
                ">
                    Confidence: ${Math.round(analysis.overallConfidence * 100)}%
                </div>
            </div>
        `;
        
        this.interventionUI.show(html);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            this.interventionUI.hide();
        }, 10000);
    }
    
    /**
     * Log viral moments for user engagement tracking
     */
    logViralMoment(analysis) {
        console.log('🎉 VIRAL MOMENT:', {
            type: analysis.detectionType,
            confidence: analysis.overallConfidence,
            timestamp: analysis.timestamp,
            content: analysis.original.substring(0, 100)
        });
        
        // Show celebration for breakthrough moments
        if (this.config.celebrateBreakthroughs) {
            this.whisperSystem.show(
                `🎉 High confidence ${analysis.detectionType} detection! (${Math.round(analysis.overallConfidence * 100)}%)`,
                'success',
                3000
            );
        }
    }
    
    /**
     * Log intervention for learning and improvement
     */
    logIntervention(intervention, analysis) {
        const interventionLog = {
            timestamp: Date.now(),
            type: intervention.type,
            priority: intervention.priority,
            confidence: analysis.overallConfidence,
            meetingMode: this.isMeetingMode,
            originalText: analysis.original,
            intervention: intervention.message
        };
        
        // Store in local intervention history (privacy-preserving)
        if (!this.interventionHistory) this.interventionHistory = [];
        this.interventionHistory.push(interventionLog);
        
        // Maintain history size
        if (this.interventionHistory.length > 100) {
            this.interventionHistory = this.interventionHistory.slice(-50);
        }
    }
    
    /**
     * Update metrics based on analysis
     */
    updateMetricsForAnalysis(analysis) {
        if (analysis.detectionType === 'sarcasm') {
            this.metrics.sarcasmDetections++;
        }
        
        if (analysis.detectionType === 'emotion') {
            this.metrics.emotionDetections++;
        }
        
        // Update average confidence
        const totalConfidence = (this.metrics.averageConfidence * (this.metrics.totalDetections - 1)) + 
                               analysis.overallConfidence;
        this.metrics.averageConfidence = totalConfidence / this.metrics.totalDetections;
        
        // Update processing time
        if (analysis.processingTime) {
            this.metrics.processingTime = 
                (this.metrics.processingTime + analysis.processingTime) / 2;
        }
    }
    
    /**
     * Maintain analysis history size
     */
    maintainAnalysisHistory() {
        if (this.recentAnalyses.length > 20) {
            this.recentAnalyses = this.recentAnalyses.slice(-10);
        }
    }
    
    /**
     * Process analysis queue for real-time performance
     */
    processAnalysisQueue() {
        if (this.analysisQueue.length === 0) return;
        
        const startTime = performance.now();
        
        // Process up to 3 analyses per cycle to maintain performance
        const toProcess = this.analysisQueue.splice(0, 3);
        
        toProcess.forEach(analysis => {
            try {
                this.processEnhancedAnalysis(analysis);
            } catch (error) {
                console.error('❌ Queue analysis processing failed:', error);
            }
        });
        
        const processingTime = performance.now() - startTime;
        
        // Log performance warnings
        if (processingTime > 100) {
            console.warn(`⚠️ Slow processing detected: ${processingTime.toFixed(2)}ms`);
        }
    }
    
    /**
     * Update performance metrics
     */
    updatePerformanceMetrics() {
        const now = Date.now();
        const sessionDuration = (now - this.metrics.sessionStart) / 1000 / 60; // minutes
        
        console.log('📊 Viral Social Decoder Performance:', {
            sessionDuration: `${sessionDuration.toFixed(1)}m`,
            totalDetections: this.metrics.totalDetections,
            sarcasmDetections: this.metrics.sarcasmDetections,
            emotionDetections: this.metrics.emotionDetections,
            interventions: this.metrics.interventionsTrigger,
            averageConfidence: `${(this.metrics.averageConfidence * 100).toFixed(1)}%`,
            meetingMode: this.isMeetingMode,
            processingTime: `${this.metrics.processingTime.toFixed(1)}ms`
        });
    }
    
    /**
     * Manual analysis method for testing and integration
     */
    async analyzeText(transcript, speakerInfo = {}) {
        if (!this.isActive || !this.enhancedDecoder) {
            console.warn('⚠️ Viral Social Decoder not active');
            return null;
        }
        
        try {
            const startTime = performance.now();
            
            // Get current audio context for enhanced analysis
            const audioContext = this.audioMonitor.getCurrentAudioContext();
            const audioData = audioContext?.current || null;
            
            // Perform analysis using enhanced decoder
            const result = await this.enhancedDecoder.analyzeConversation(
                transcript, 
                audioData, 
                speakerInfo
            );
            
            if (result) {
                const processingTime = performance.now() - startTime;
                
                // Add viral social decoder metadata
                result.viralSocialDecoder = {
                    meetingMode: this.isMeetingMode,
                    processingTime: processingTime,
                    viralConfidence: result.confidence || result.overallConfidence || 0.5,
                    interventionTriggered: false
                };
                
                // Process as enhanced analysis if confidence is high enough
                if (result.confidence > this.config.confidenceThreshold) {
                    this.processEnhancedAnalysis(result);
                    result.viralSocialDecoder.interventionTriggered = true;
                }
                
                return result;
            }
            
            return null;
            
        } catch (error) {
            console.error('❌ Manual text analysis failed:', error);
            return null;
        }
    }
    
    /**
     * Get current system status for debugging and UI
     */
    getSystemStatus() {
        return {
            isActive: this.isActive,
            isMeetingMode: this.isMeetingMode,
            isListening: this.isListening,
            
            // Component status
            enhancedDecoder: !!this.enhancedDecoder,
            audioMonitor: !!this.audioMonitor,
            aiPersonality: !!this.aiPersonality,
            
            // Current state
            currentMeeting: this.currentMeeting,
            meetingContext: this.meetingContext,
            recentAnalyses: this.recentAnalyses.length,
            
            // Performance metrics
            metrics: this.metrics,
            
            // Configuration
            config: this.config,
            
            // Intervention history
            interventionHistory: this.interventionHistory?.length || 0
        };
    }
    
    /**
     * Clean shutdown of the viral social decoder
     */
    async shutdown() {
        console.log('🛑 Shutting down Viral Social Decoder System...');
        
        try {
            // Stop all intervals
            if (this.processingInterval) clearInterval(this.processingInterval);
            if (this.monitoringInterval) clearInterval(this.monitoringInterval);
            if (this.enhancedMonitoringInterval) clearInterval(this.enhancedMonitoringInterval);
            
            // Stop meeting detection
            if (this.meetingDetector) {
                this.meetingDetector.stop();
            }
            
            // Deactivate meeting mode if active
            if (this.isMeetingMode) {
                await this.deactivateMeetingMode();
            }
            
            // Clean up UI
            if (this.interventionUI && this.interventionUI.container) {
                this.interventionUI.container.remove();
            }
            
            // Deactivate enhanced decoder
            if (this.enhancedDecoder && this.enhancedDecoder.deactivate) {
                await this.enhancedDecoder.deactivate();
            }
            
            // Reset state
            this.isActive = false;
            this.analysisQueue = [];
            this.recentAnalyses = [];
            
            console.log('✅ Viral Social Decoder System shutdown complete');
            
        } catch (error) {
            console.error('❌ Shutdown error:', error);
        }
    }
}

// Export for integration with Velvet systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViralSocialDecoder;
} else if (typeof window !== 'undefined') {
    window.ViralSocialDecoder = ViralSocialDecoder;
}

// Testing functions for viral feature development
if (typeof window !== 'undefined') {
    window.testViralSocial = {
        async init() {
            console.log('🧪 Testing Viral Social Decoder initialization...');
            
            const decoder = new ViralSocialDecoder();
            const initialized = await decoder.initialize();
            
            if (initialized) {
                console.log('✅ Viral Social Decoder initialized successfully');
                window.viralSocialDecoder = decoder;
                
                // Show status
                console.log('📊 System Status:', decoder.getSystemStatus());
                
                return decoder;
            } else {
                console.error('❌ Initialization failed');
                return null;
            }
        },
        
        async testSarcasm() {
            if (!window.viralSocialDecoder) {
                console.error('❌ Initialize first with testViralSocial.init()');
                return;
            }
            
            console.log('🧪 Testing sarcasm detection...');
            
            const testCases = [
                "Sure, that's totally fine. Whatever works for you.",
                "Great! This is absolutely perfect timing!",
                "No problem at all, I'm thrilled to help with this.",
                "Fine. I guess we can do it that way."
            ];
            
            for (const testCase of testCases) {
                console.log(`\n🎭 Testing: "${testCase}"`);
                const result = await window.viralSocialDecoder.analyzeText(testCase);
                
                if (result) {
                    console.log('📊 Analysis:', {
                        confidence: `${Math.round((result.confidence || 0) * 100)}%`,
                        sarcastic: result.translation?.hiddenMeaning ? 'YES' : 'NO',
                        meaning: result.translation?.hiddenMeaning || 'Literal meaning',
                        suggestions: result.suggestions?.length || 0
                    });
                }
            }
        },
        
        testMeetingMode() {
            if (!window.viralSocialDecoder) {
                console.error('❌ Initialize first with testViralSocial.init()');
                return;
            }
            
            console.log('🧪 Testing meeting mode activation...');
            
            // Simulate meeting audio context
            const mockAudioContext = {
                primaryType: 'call',
                source: 'Zoom',
                confidence: 0.9,
                insights: {
                    socialContext: 'active'
                }
            };
            
            window.viralSocialDecoder.activateMeetingMode(mockAudioContext);
            console.log('✅ Meeting mode activated for testing');
            
            // Test analysis in meeting mode
            setTimeout(async () => {
                const result = await window.viralSocialDecoder.analyzeText(
                    "Fine, I suppose that could work if that's what everyone wants."
                );
                console.log('🎭 Meeting mode analysis result:', result);
            }, 1000);
        },
        
        showInterventionDemo() {
            if (!window.viralSocialDecoder) {
                console.error('❌ Initialize first with testViralSocial.init()');
                return;
            }
            
            console.log('🧪 Demonstrating live intervention UI...');
            
            // Mock high-confidence sarcasm detection
            const mockAnalysis = {
                timestamp: Date.now(),
                original: "Sure, that sounds absolutely perfect.",
                detectionType: 'sarcasm',
                overallConfidence: 0.95,
                sarcasmDetection: {
                    enhanced: true,
                    confidence: 0.95,
                    actualMeaning: "Not okay with this, but giving up on explaining"
                },
                emotionDetection: {
                    enhanced: 'frustration',
                    confidence: 0.85
                }
            };
            
            // Trigger intervention
            const intervention = window.viralSocialDecoder.determineIntervention(mockAnalysis);
            if (intervention) {
                window.viralSocialDecoder.triggerLiveIntervention(intervention, mockAnalysis);
                console.log('✅ Intervention demo triggered');
            }
        },
        
        getStats() {
            if (!window.viralSocialDecoder) {
                console.error('❌ Initialize first with testViralSocial.init()');
                return;
            }
            
            const status = window.viralSocialDecoder.getSystemStatus();
            console.log('📊 Viral Social Decoder Statistics:', status);
            return status;
        },
        
        async shutdown() {
            if (window.viralSocialDecoder) {
                await window.viralSocialDecoder.shutdown();
                window.viralSocialDecoder = null;
                console.log('✅ Viral Social Decoder shut down');
            }
        }
    };
}

console.log('🎭 Viral Social Decoder System loaded - ready to create breakthrough moments!');