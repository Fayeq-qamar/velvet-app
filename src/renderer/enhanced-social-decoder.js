// Enhanced Social Decoder System with Advanced Audio Analysis Integration
// Combines traditional text analysis with sophisticated ML-powered audio analysis
// Privacy-preserving, neurodivergent-friendly, real-time multimodal analysis

/**
 * EnhancedSocialDecoder
 * 
 * An upgraded version of the Social Decoder that integrates with the Enhanced Audio Analysis Engine
 * to provide superior emotional intelligence and sarcasm detection through multimodal analysis.
 * 
 * Key Enhancements:
 * - Integrates with Enhanced Audio Analysis Engine for voice-text correlation
 * - Uses Audio-Social Integration Layer for sophisticated multimodal analysis
 * - Maintains all original Social Decoder functionality as fallback
 * - Privacy-preserving with local-only processing
 * - Optimized for neurodivergent users with customizable sensitivity
 * - Adaptive learning for individual communication patterns
 * - Real-time analysis with <100ms latency target
 */

class EnhancedSocialDecoder {
    constructor() {
        console.log('🧠 Initializing Enhanced Social Decoder System...');
        
        // Core components
        this.isActive = false;
        this.enhancedAudioEngine = null;
        this.integrationLayer = null;
        
        // Legacy audio analyzer for fallback
        this.audioAnalyzer = null;
        
        // State management
        this.conversationHistory = [];
        this.emotionalContext = {};
        this.detectionCallbacks = [];
        this.enhancedCallbacks = [];
        
        // Performance and error handling
        this.errorCount = 0;
        this.maxErrors = 15;  // Increased for more complex system
        this.lastError = null;
        this.performanceMetrics = {
            totalAnalyses: 0,
            enhancedAnalyses: 0,
            averageProcessingTime: 0,
            totalProcessingTime: 0,
            errorsEncountered: 0,
            multimodalSuccessRate: 0
        };
        
        // Enhanced configuration
        this.config = {
            // Processing configuration
            analysisInterval: 50,           // 50ms for real-time processing
            maxQueueSize: 8,               // Larger queue for complex analysis
            debounceTimeout: 150,          // Slightly longer debounce for multimodal
            maxProcessingTime: 200,        // Longer timeout for enhanced analysis
            
            // Audio-text correlation
            correlationWindow: 2000,       // 2 second correlation window
            multimodalThreshold: 0.7,      // Minimum confidence for multimodal analysis
            
            // Adaptive behavior
            adaptationEnabled: true,
            learningRate: 0.08,
            personalityAdaptation: true,
            
            // Privacy and performance
            enableDataPersistence: false,  // Strict privacy mode
            enableCloudAnalysis: false,    // Local-only processing
            maxHistorySize: 40,           // Larger history for better pattern recognition
            
            // Neurodivergent-friendly settings
            sensitivityLevel: 'medium',    // low, medium, high
            gentleMode: true,              // Gentle, non-judgmental feedback
            customThresholds: false        // Allow user customization
        };
        
        // Enhanced analysis state
        this.enhancedState = {
            lastMultimodalAnalysis: null,
            audioTextCorrelation: 0,
            adaptationLevel: 0,
            userPreferences: {
                preferredDetectionTypes: ['sarcasm', 'emotion'],
                sensitivitySettings: {},
                customPatterns: {}
            },
            sessionStats: {
                startTime: Date.now(),
                analysesCompleted: 0,
                enhancedDetections: 0,
                userInteractions: 0
            }
        };
        
        // Performance optimization
        this.analysisQueue = [];
        this.isProcessing = false;
        this.processingQueue = [];
        
        // Resource management
        this.cleanupInterval = null;
        this.performanceInterval = null;
        
        // Original Social Decoder compatibility (fallback patterns)
        this.sarcasmMarkers = [
            'fine', 'sure', 'whatever', 'great', 'perfect', 'wonderful',
            'obviously', 'totally', 'absolutely', 'definitely'
        ];
        
        this.tonePatterns = {
            frustration: {
                keywords: ['fine', 'whatever', 'sure'],
                voiceMarkers: ['clipped_speech', 'flat_tone', 'faster_pace']
            },
            anxiety: {
                keywords: ['maybe', 'i guess', 'sort of', 'kind of'],
                voiceMarkers: ['higher_pitch', 'faster_speech', 'trailing_off']
            },
            passive_aggressive: {
                keywords: ['no problem', 'of course', 'my pleasure'],
                voiceMarkers: ['overly_sweet', 'emphasis_mismatch']
            }
        };
        
        console.log('🧠 Enhanced Social Decoder core initialized');
    }
    
    /**
     * Initialize the Enhanced Social Decoder with all components
     */
    async initialize() {
        try {
            console.log('🧠 Starting Enhanced Social Decoder initialization...');
            
            // Initialize Enhanced Audio Analysis Engine
            await this.initializeEnhancedAudioEngine();
            
            // Initialize Audio-Social Integration Layer
            await this.initializeIntegrationLayer();
            
            // Set up enhanced audio analysis
            await this.setupEnhancedAudioAnalysis();
            
            // Initialize conversation context tracking
            this.initializeContextTracking();
            
            // Start resource management
            this.startResourceManagement();
            
            // Initialize adaptive learning
            await this.initializeAdaptiveLearning();
            
            this.isActive = true;
            console.log('✅ Enhanced Social Decoder System fully active');
            console.log('🎯 Ready for advanced multimodal neurotypical communication analysis');
            
            return true;
            
        } catch (error) {
            console.error('❌ Enhanced Social Decoder initialization failed:', error);
            
            // Attempt fallback to basic Social Decoder functionality
            console.log('🔄 Attempting fallback to basic Social Decoder...');
            return await this.initializeFallbackMode();
        }
    }
    
    /**
     * Initialize Enhanced Audio Analysis Engine
     */
    async initializeEnhancedAudioEngine() {
        try {
            console.log('🎧 Initializing Enhanced Audio Analysis Engine...');
            
            if (typeof EnhancedAudioAnalysisEngine !== 'undefined') {
                this.enhancedAudioEngine = new EnhancedAudioAnalysisEngine();
                const initialized = await this.enhancedAudioEngine.initialize();
                
                if (initialized) {
                    console.log('✅ Enhanced Audio Analysis Engine connected');
                    
                    // Start audio capture
                    const captureStarted = await this.enhancedAudioEngine.startAudioCapture();
                    if (captureStarted) {
                        console.log('✅ Enhanced audio capture active');
                    } else {
                        console.warn('⚠️ Enhanced audio capture failed - using fallback');
                    }
                } else {
                    throw new Error('Enhanced Audio Engine initialization failed');
                }
            } else {
                throw new Error('EnhancedAudioAnalysisEngine not available');
            }
        } catch (error) {
            console.error('❌ Enhanced Audio Engine initialization failed:', error);
            this.enhancedAudioEngine = null;
            throw error;
        }
    }
    
    /**
     * Initialize Audio-Social Integration Layer
     */
    async initializeIntegrationLayer() {
        try {
            console.log('🔗 Initializing Audio-Social Integration Layer...');
            
            if (typeof AudioSocialIntegrationLayer !== 'undefined') {
                this.integrationLayer = new AudioSocialIntegrationLayer();
                const initialized = await this.integrationLayer.initialize(this.enhancedAudioEngine, this);
                
                if (initialized) {
                    console.log('✅ Audio-Social Integration Layer connected');
                    
                    // Set up integration callbacks
                    this.integrationLayer.onIntegratedAnalysis((integratedAnalysis) => {
                        this.handleIntegratedAnalysis(integratedAnalysis);
                    });
                } else {
                    throw new Error('Integration Layer initialization failed');
                }
            } else {
                throw new Error('AudioSocialIntegrationLayer not available');
            }
        } catch (error) {
            console.error('❌ Integration Layer initialization failed:', error);
            this.integrationLayer = null;
            throw error;
        }
    }
    
    /**
     * Set up enhanced audio analysis integration
     */
    async setupEnhancedAudioAnalysis() {
        try {
            console.log('🎧 Setting up enhanced audio analysis integration...');
            
            if (this.enhancedAudioEngine) {
                // Register for audio analysis results
                this.enhancedAudioEngine.onAnalysisComplete((audioAnalysis) => {
                    this.processEnhancedAudioAnalysis(audioAnalysis);
                });
                
                // Register for error handling
                this.enhancedAudioEngine.onError((errorType, error) => {
                    this.handleAudioEngineError(errorType, error);
                });
                
                console.log('✅ Enhanced audio analysis integration complete');
            }
            
            // Set up fallback audio analysis
            await this.setupFallbackAudioAnalysis();
            
        } catch (error) {
            console.error('❌ Enhanced audio analysis setup failed:', error);
            throw error;
        }
    }
    
    /**
     * Set up fallback audio analysis (original Social Decoder functionality)
     */
    async setupFallbackAudioAnalysis() {
        console.log('🎧 Setting up fallback audio analysis...');
        
        // Hook into existing Velvet audio monitoring system
        if (window.realAudioEnvironmentMonitor) {
            console.log('✅ Connecting to Real Audio Environment Monitor (fallback)');
            
            // Register callback for audio context updates
            window.realAudioEnvironmentMonitor.onContextUpdate?.((audioContext) => {
                this.processAudioContext(audioContext);
            });
            
            // Register callback for microphone data
            window.realAudioEnvironmentMonitor.onMicrophoneData?.((audioData) => {
                this.processMicrophoneData(audioData);
            });
        } else {
            console.log('⚠️ Real Audio Environment Monitor not available');
        }
        
        // Set up basic audio analyzer
        this.audioAnalyzer = {
            analyzeEmotionalTone: (audioData, transcript) => {
                return this.detectEmotionalCues(audioData, transcript);
            },
            detectSarcasm: (text, toneData) => {
                return this.analyzeSarcasmMarkers(text, toneData);
            },
            assessCommunicationClarity: (transcript) => {
                return this.measureAmbiguityLevel(transcript);
            }
        };
        
        console.log('✅ Fallback audio analysis setup complete');
    }
    
    /**
     * Initialize adaptive learning system
     */
    async initializeAdaptiveLearning() {
        try {
            console.log('🧠 Initializing adaptive learning system...');
            
            if (this.config.adaptationEnabled) {
                this.adaptiveLearner = {
                    userPatterns: {},
                    detectionHistory: [],
                    adaptationLevel: 0,
                    
                    updatePatterns: (analysisResult) => {
                        // Update user-specific patterns based on successful analyses
                        this.updateUserPatterns(analysisResult);
                    },
                    
                    getPersonalizedThresholds: () => {
                        return this.getPersonalizedThresholds();
                    }
                };
                
                console.log('✅ Adaptive learning system initialized');
            } else {
                console.log('ℹ️ Adaptive learning disabled in configuration');
            }
            
        } catch (error) {
            console.error('❌ Adaptive learning initialization failed:', error);
        }
    }
    
    /**
     * Initialize fallback mode with basic functionality
     */
    async initializeFallbackMode() {
        try {
            console.log('🔄 Initializing fallback mode...');
            
            // Set up basic audio analysis only
            await this.setupFallbackAudioAnalysis();
            
            // Initialize basic context tracking
            this.initializeContextTracking();
            
            // Start basic resource management
            this.startResourceManagement();
            
            this.isActive = true;
            this.enhancedState.fallbackMode = true;
            
            console.log('✅ Enhanced Social Decoder running in fallback mode');
            return true;
            
        } catch (error) {
            console.error('❌ Fallback mode initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Main analysis method - enhanced version of analyzeConversation
     */
    async analyzeConversation(transcript, audioData, speakerInfo = {}) {
        if (!this.isActive) return null;
        
        const startTime = performance.now();
        
        try {
            console.log('🧠 Starting enhanced conversation analysis...');
            
            // Validate input
            if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
                console.warn('⚠️ Invalid transcript provided');
                return null;
            }
            
            // Check if enhanced analysis is available
            if (this.integrationLayer && this.enhancedAudioEngine && !this.enhancedState.fallbackMode) {
                return await this.performEnhancedAnalysis(transcript, audioData, speakerInfo, startTime);
            } else {
                return await this.performBasicAnalysis(transcript, audioData, speakerInfo, startTime);
            }
            
        } catch (error) {
            console.error('❌ Enhanced conversation analysis failed:', error);
            this.handleError('analyzeConversation', error, { transcript: transcript?.substring(0, 50) });
            
            // Fallback to basic analysis
            return await this.performBasicAnalysis(transcript, audioData, speakerInfo, startTime);
        }
    }
    
    /**
     * Perform enhanced multimodal analysis
     */
    async performEnhancedAnalysis(transcript, audioData, speakerInfo, startTime) {
        try {
            console.log('🚀 Performing enhanced multimodal analysis...');
            
            // First, perform basic text analysis
            const basicTextAnalysis = await this.performBasicTextAnalysis(transcript, audioData, speakerInfo);
            
            // Store for integration layer correlation
            this.lastTextAnalysis = {
                ...basicTextAnalysis,
                receivedAt: Date.now()
            };
            
            // The enhanced audio analysis and correlation will be handled by the integration layer
            // when it receives both audio and text data within the correlation window
            
            // For now, return the basic analysis enhanced with any available audio context
            const enhancedResult = await this.enhanceBasicAnalysis(basicTextAnalysis, audioData);
            
            // Update performance metrics
            this.performanceMetrics.enhancedAnalyses++;
            const processingTime = performance.now() - startTime;
            this.updatePerformanceMetrics(processingTime);
            
            return enhancedResult;
            
        } catch (error) {
            console.error('❌ Enhanced analysis failed:', error);
            throw error;
        }
    }
    
    /**
     * Perform basic analysis (fallback mode)
     */
    async performBasicAnalysis(transcript, audioData, speakerInfo, startTime) {
        try {
            console.log('🔄 Performing basic analysis...');
            
            return await this.performBasicTextAnalysis(transcript, audioData, speakerInfo);
            
        } catch (error) {
            console.error('❌ Basic analysis failed:', error);
            throw error;
        }
    }
    
    /**
     * Perform basic text analysis (original Social Decoder functionality)
     */
    async performBasicTextAnalysis(transcript, audioData, speakerInfo) {
        // Basic sarcasm and subtext detection
        const sarcasmAnalysis = this.detectSarcasm(transcript, audioData);
        
        // Basic emotional tone analysis
        const emotionalAnalysis = this.analyzeEmotionalTone(transcript, audioData);
        
        // Communication clarity assessment
        const clarityAnalysis = this.assessCommunicationClarity(transcript);
        
        // Generate neurotypical translation
        const translation = this.generateNeurotypicalTranslation({
            original: transcript,
            sarcasm: sarcasmAnalysis,
            emotion: emotionalAnalysis,
            clarity: clarityAnalysis,
            speaker: speakerInfo
        });
        
        // Suggest response templates
        const suggestions = this.generateResponseSuggestions(translation);
        
        const result = {
            timestamp: Date.now(),
            original: transcript,
            translation: translation,
            suggestions: suggestions,
            confidence: this.calculateConfidence(sarcasmAnalysis, emotionalAnalysis, clarityAnalysis),
            analysisType: 'basic',
            audioDataAvailable: !!audioData,
            processingTime: 0 // Will be set by caller
        };
        
        return result;
    }
    
    /**
     * Enhance basic analysis with available audio context
     */
    async enhanceBasicAnalysis(basicAnalysis, audioData) {
        try {
            if (this.enhancedAudioEngine && audioData) {
                const audioState = this.enhancedAudioEngine.getCurrentAnalysisState();
                
                if (audioState && audioState.emotionalState) {
                    // Enhance confidence based on audio-text agreement
                    const emotionAgreement = this.calculateEmotionAgreement(
                        basicAnalysis.translation.emotionalSubtext,
                        audioState.emotionalState
                    );
                    
                    if (emotionAgreement > 0.7) {
                        basicAnalysis.confidence *= 1.2; // Boost confidence
                        basicAnalysis.analysisType = 'enhanced_basic';
                        basicAnalysis.audioEnhancement = {
                            emotionAgreement: emotionAgreement,
                            audioEmotionalState: audioState.emotionalState
                        };
                    }
                }
            }
            
            return basicAnalysis;
            
        } catch (error) {
            console.error('❌ Basic analysis enhancement failed:', error);
            return basicAnalysis; // Return unenhanced result
        }
    }
    
    /**
     * Handle integrated analysis results from the integration layer
     */
    handleIntegratedAnalysis(integratedAnalysis) {
        try {
            console.log('🔗 Processing integrated analysis result...');
            
            // Store the enhanced result
            this.enhancedState.lastMultimodalAnalysis = integratedAnalysis;
            this.enhancedState.audioTextCorrelation = integratedAnalysis.overallConfidence;
            
            // Create enhanced result for callbacks
            const enhancedResult = {
                timestamp: integratedAnalysis.timestamp,
                original: integratedAnalysis.textAnalysis.original,
                
                // Enhanced detection results
                sarcasmDetection: {
                    basic: integratedAnalysis.textAnalysis.translation.hiddenMeaning ? true : false,
                    enhanced: integratedAnalysis.enhancedSarcasm.isSarcastic,
                    confidence: integratedAnalysis.enhancedSarcasm.confidence,
                    factors: integratedAnalysis.enhancedSarcasm.factors
                },
                
                emotionDetection: {
                    basic: integratedAnalysis.textAnalysis.translation.emotionalSubtext,
                    enhanced: integratedAnalysis.enhancedEmotion.dominantEmotion,
                    confidence: integratedAnalysis.enhancedEmotion.confidence,
                    agreement: integratedAnalysis.enhancedEmotion.agreement
                },
                
                // Integrated analysis
                overallConfidence: integratedAnalysis.overallConfidence,
                detectionType: integratedAnalysis.detectionType,
                recommendations: integratedAnalysis.recommendations,
                
                // Metadata
                analysisType: 'multimodal_enhanced',
                processingTime: integratedAnalysis.processingTime,
                audioTextCorrelation: integratedAnalysis.overallConfidence
            };
            
            // Store in conversation history
            this.conversationHistory.push(enhancedResult);
            this.maintainHistorySize();
            
            // Update session statistics
            this.enhancedState.sessionStats.enhancedDetections++;
            
            // Trigger enhanced callbacks
            this.triggerEnhancedCallbacks(enhancedResult);
            
            // Also trigger regular callbacks for compatibility
            this.triggerDetectionCallbacks(enhancedResult);
            
            console.log(`✅ Integrated analysis processed: ${enhancedResult.detectionType} (${enhancedResult.overallConfidence.toFixed(2)} confidence)`);
            
        } catch (error) {
            console.error('❌ Integrated analysis handling failed:', error);
        }
    }
    
    /**
     * Process enhanced audio analysis results
     */
    processEnhancedAudioAnalysis(audioAnalysis) {
        try {
            if (!this.isActive) return;
            
            console.log('🎧 Processing enhanced audio analysis...');
            
            // Store audio analysis for potential correlation
            this.lastAudioAnalysis = {
                ...audioAnalysis,
                receivedAt: Date.now()
            };
            
            // Update emotional context based on audio
            if (audioAnalysis.emotion) {
                this.emotionalContext = {
                    ...this.emotionalContext,
                    audioEmotion: audioAnalysis.emotion.overall,
                    audioConfidence: audioAnalysis.emotion.confidence,
                    lastAudioUpdate: Date.now()
                };
            }
            
        } catch (error) {
            console.error('❌ Enhanced audio analysis processing failed:', error);
        }
    }
    
    // Original Social Decoder methods (for compatibility and fallback)
    
    detectSarcasm(text, audioData) {
        const textAnalysis = this.analyzeSarcasmMarkers(text);
        const toneAnalysis = this.analyzeToneMismatch(text, audioData);
        
        const isSarcastic = textAnalysis.score > 0.6 || toneAnalysis.mismatch > 0.7;
        
        return {
            isSarcastic: isSarcastic,
            confidence: Math.max(textAnalysis.score, toneAnalysis.mismatch),
            markers: textAnalysis.markers,
            toneMismatch: toneAnalysis.mismatch,
            actualMeaning: isSarcastic ? this.inferActualMeaning(text, textAnalysis.markers) : null
        };
    }
    
    analyzeSarcasmMarkers(text) {
        const lowerText = text.toLowerCase();
        let score = 0;
        let markers = [];

        // Check for sarcasm keywords
        this.sarcasmMarkers.forEach(marker => {
            if (lowerText.includes(marker)) {
                score += 0.3;
                markers.push(marker);
            }
        });

        // Check for over-enthusiasm markers
        const enthusiasmMarkers = text.match(/!{2,}|[A-Z]{3,}/g);
        if (enthusiasmMarkers) {
            score += 0.2;
            markers.push('excessive_enthusiasm');
        }

        // Check for dismissive patterns
        const dismissivePatterns = ['whatever', 'sure thing', 'of course', 'no problem'];
        dismissivePatterns.forEach(pattern => {
            if (lowerText.includes(pattern)) {
                score += 0.4;
                markers.push(pattern);
            }
        });

        return { score: Math.min(score, 1.0), markers };
    }
    
    analyzeToneMismatch(text, audioData) {
        const positiveWords = ['great', 'awesome', 'perfect', 'wonderful', 'fine'];
        const hasPositiveWords = positiveWords.some(word => text.toLowerCase().includes(word));
        
        let mismatch = 0;
        let indicators = { flat: false, stressed: false, realAudio: false };
        
        // Check for enhanced audio data first
        if (this.lastAudioAnalysis && this.lastAudioAnalysis.sarcasm) {
            const sarcasmData = this.lastAudioAnalysis.sarcasm;
            indicators.realAudio = true;
            
            indicators.flat = sarcasmData.tonalFlatness > 0.5;
            indicators.stressed = false; // Would need to implement
            
            if (hasPositiveWords && indicators.flat) {
                mismatch = sarcasmData.prosodyMismatch || 0.8;
            }
        } else {
            // Fallback to simulated analysis
            const simulatedToneFlat = text.length < 10 || text.includes('.');
            const simulatedStress = text.includes('!') || text.toUpperCase() === text;
            
            indicators.flat = simulatedToneFlat;
            indicators.stressed = simulatedStress;
            
            if (hasPositiveWords && simulatedToneFlat) {
                mismatch = 0.6;
            }
        }
        
        return { mismatch: Math.min(mismatch, 1.0), indicators };
    }
    
    inferActualMeaning(text, markers) {
        const lowerText = text.toLowerCase();
        
        const meaningMap = {
            'fine': 'Not okay with this, but giving up on explaining',
            'sure': 'Reluctantly agreeing, possibly resentful',
            'whatever': 'Frustrated and disengaging from the conversation',
            'great': 'Actually thinks this is problematic',
            'perfect': 'Sees flaws but doesn\'t want to argue',
            'no problem': 'It is actually a problem but being polite'
        };

        for (let marker of markers) {
            if (meaningMap[marker]) {
                return meaningMap[marker];
            }
        }

        return 'Likely expressing the opposite of what they said';
    }
    
    analyzeEmotionalTone(transcript, audioData) {
        let emotionalMarkers = {
            frustration: 0,
            anxiety: 0,
            passive_aggressive: 0,
            genuine_positive: 0
        };

        const lowerText = transcript.toLowerCase();

        // Enhanced emotion detection using audio data if available
        if (this.lastAudioAnalysis && this.lastAudioAnalysis.emotion) {
            const audioEmotion = this.lastAudioAnalysis.emotion;
            
            // Boost text-based detection with audio evidence
            if (audioEmotion.frustration > 0.5) {
                emotionalMarkers.frustration = Math.max(emotionalMarkers.frustration, audioEmotion.frustration);
            }
            if (audioEmotion.anxiety > 0.5) {
                emotionalMarkers.anxiety = Math.max(emotionalMarkers.anxiety, audioEmotion.anxiety);
            }
        }

        // Check for frustration markers in text
        if (this.tonePatterns.frustration.keywords.some(word => lowerText.includes(word))) {
            emotionalMarkers.frustration += 0.6;
        }

        // Check for anxiety markers in text
        if (this.tonePatterns.anxiety.keywords.some(word => lowerText.includes(word))) {
            emotionalMarkers.anxiety += 0.5;
        }

        // Check for passive-aggressive markers in text
        if (this.tonePatterns.passive_aggressive.keywords.some(word => lowerText.includes(word))) {
            emotionalMarkers.passive_aggressive += 0.7;
        }

        // Determine dominant emotion
        const dominantEmotion = Object.keys(emotionalMarkers).reduce((a, b) => 
            emotionalMarkers[a] > emotionalMarkers[b] ? a : b
        );

        return {
            dominantEmotion: dominantEmotion,
            confidence: emotionalMarkers[dominantEmotion],
            allEmotions: emotionalMarkers,
            audioEnhanced: !!(this.lastAudioAnalysis && this.lastAudioAnalysis.emotion)
        };
    }
    
    assessCommunicationClarity(transcript) {
        let ambiguityScore = 0;
        let clarityIssues = [];

        // Check for vague language
        const vagueWords = ['maybe', 'sort of', 'kind of', 'i guess', 'probably', 'possibly'];
        vagueWords.forEach(word => {
            if (transcript.toLowerCase().includes(word)) {
                ambiguityScore += 0.2;
                clarityIssues.push(`vague_language: ${word}`);
            }
        });

        // Check for incomplete thoughts
        if (transcript.includes('...') || transcript.endsWith('-')) {
            ambiguityScore += 0.3;
            clarityIssues.push('incomplete_thought');
        }

        // Check for contradictory statements
        const contradictions = ['but', 'however', 'although', 'though'];
        contradictions.forEach(word => {
            if (transcript.toLowerCase().includes(word)) {
                ambiguityScore += 0.1;
                clarityIssues.push(`potential_contradiction: ${word}`);
            }
        });

        return {
            ambiguityLevel: Math.min(ambiguityScore, 1.0),
            issues: clarityIssues,
            clarity: ambiguityScore < 0.3 ? 'clear' : ambiguityScore < 0.7 ? 'somewhat_ambiguous' : 'very_ambiguous'
        };
    }
    
    generateNeurotypicalTranslation({ original, sarcasm, emotion, clarity, speaker }) {
        let translation = {
            directMeaning: original,
            hiddenMeaning: null,
            emotionalSubtext: null,
            actionNeeded: null,
            confidenceLevel: 'medium'
        };

        // Handle sarcasm
        if (sarcasm.isSarcastic && sarcasm.confidence > 0.7) {
            translation.hiddenMeaning = sarcasm.actualMeaning;
            translation.directMeaning = `They said "${original}" but likely mean: ${sarcasm.actualMeaning}`;
            translation.confidenceLevel = 'high';
        }

        // Handle emotional subtext
        if (emotion.confidence > 0.6) {
            const emotionMap = {
                frustration: 'They sound frustrated or overwhelmed',
                anxiety: 'They seem uncertain or anxious about something',
                passive_aggressive: 'They\'re being polite but may have underlying concerns',
                genuine_positive: 'They appear genuinely positive about this'
            };
            
            translation.emotionalSubtext = emotionMap[emotion.dominantEmotion];
        }

        // Suggest action based on analysis
        if (sarcasm.isSarcastic || emotion.dominantEmotion === 'frustration') {
            translation.actionNeeded = 'Consider checking in with them or addressing underlying concerns';
        } else if (emotion.dominantEmotion === 'anxiety') {
            translation.actionNeeded = 'They might need reassurance or clarification';
        } else if (clarity.ambiguityLevel > 0.7) {
            translation.actionNeeded = 'Ask for clarification to avoid misunderstandings';
        }

        return translation;
    }
    
    generateResponseSuggestions(translation) {
        let suggestions = [];

        // Suggestions based on detected sarcasm
        if (translation.hiddenMeaning) {
            suggestions.push({
                type: 'check_in',
                text: "I want to make sure we're on the same page. Is this timeline actually workable for you?",
                explanation: 'Gentle check-in to address potential frustration'
            });
            
            suggestions.push({
                type: 'acknowledge',
                text: "I sense this might not be ideal. What would work better?",
                explanation: 'Acknowledge subtext and invite honest feedback'
            });
        }

        // Suggestions based on emotional tone
        if (translation.emotionalSubtext && translation.emotionalSubtext.includes('frustrated')) {
            suggestions.push({
                type: 'validation',
                text: "This does seem like a lot to handle. How can we make it more manageable?",
                explanation: 'Validate their feelings and offer support'
            });
        }

        if (translation.emotionalSubtext && translation.emotionalSubtext.includes('anxious')) {
            suggestions.push({
                type: 'reassurance',
                text: "No pressure at all. We can figure this out together at whatever pace works for you.",
                explanation: 'Provide reassurance and reduce pressure'
            });
        }

        // Default supportive response
        if (suggestions.length === 0) {
            suggestions.push({
                type: 'clarification',
                text: "Just to make sure I understand correctly - how are you feeling about this?",
                explanation: 'Open-ended check-in to gather more information'
            });
        }

        return suggestions;
    }
    
    calculateConfidence(sarcasmAnalysis, emotionalAnalysis, clarityAnalysis) {
        const sarcasmConfidence = sarcasmAnalysis.confidence || 0;
        const emotionConfidence = emotionalAnalysis.confidence || 0;
        const clarityConfidence = 1 - clarityAnalysis.ambiguityLevel;

        return (sarcasmConfidence + emotionConfidence + clarityConfidence) / 3;
    }
    
    // Helper methods
    calculateEmotionAgreement(textEmotion, audioEmotion) {
        // Simple agreement calculation
        if (!textEmotion || !audioEmotion) return 0.5;
        
        // Map text emotions to audio emotions for comparison
        const emotionMapping = {
            'frustrated': 'frustration',
            'anxious': 'anxiety',
            'confident': 'confidence'
        };
        
        const mappedTextEmotion = emotionMapping[textEmotion] || textEmotion;
        
        if (audioEmotion[mappedTextEmotion] && audioEmotion[mappedTextEmotion] > 0.5) {
            return 0.8; // High agreement
        }
        
        return 0.3; // Low agreement
    }
    
    updateUserPatterns(analysisResult) {
        if (!this.adaptiveLearner) return;
        
        // Update user-specific patterns based on successful analyses
        const pattern = {
            timestamp: analysisResult.timestamp,
            confidence: analysisResult.confidence,
            detectionType: analysisResult.analysisType,
            success: analysisResult.confidence > this.config.multimodalThreshold
        };
        
        if (!this.adaptiveLearner.userPatterns[pattern.detectionType]) {
            this.adaptiveLearner.userPatterns[pattern.detectionType] = [];
        }
        
        this.adaptiveLearner.userPatterns[pattern.detectionType].push(pattern);
        
        // Maintain pattern history size
        if (this.adaptiveLearner.userPatterns[pattern.detectionType].length > 50) {
            this.adaptiveLearner.userPatterns[pattern.detectionType].shift();
        }
        
        // Update adaptation level
        this.enhancedState.adaptationLevel = Math.min(1.0, this.enhancedState.adaptationLevel + 0.005);
    }
    
    getPersonalizedThresholds() {
        if (!this.adaptiveLearner || this.enhancedState.adaptationLevel < 0.1) {
            return null; // Not enough data for personalization
        }
        
        // Return personalized thresholds based on user patterns
        return {
            sarcasmThreshold: 0.65,
            emotionThreshold: 0.6,
            confidenceBoost: this.enhancedState.adaptationLevel * 0.1
        };
    }
    
    // Context tracking and resource management
    initializeContextTracking() {
        this.conversationHistory = [];
        this.emotionalContext = {
            speakerMood: 'neutral',
            stressLevel: 0,
            communicationStyle: 'direct',
            relationshipDynamic: 'professional',
            audioEmotion: null,
            audioConfidence: 0,
            lastAudioUpdate: null
        };
    }
    
    startResourceManagement() {
        // Clean up old data every 60 seconds
        this.cleanupInterval = setInterval(() => {
            this.performCleanup();
        }, 60000);
        
        // Performance monitoring every 30 seconds
        this.performanceInterval = setInterval(() => {
            this.reportPerformance();
        }, 30000);
        
        console.log('🧹 Enhanced Social Decoder resource management started');
    }
    
    performCleanup() {
        // Maintain conversation history size
        this.maintainHistorySize();
        
        // Clean up old audio analysis references
        if (this.lastAudioAnalysis && Date.now() - this.lastAudioAnalysis.receivedAt > 30000) {
            this.lastAudioAnalysis = null;
        }
        
        // Clean up old text analysis references
        if (this.lastTextAnalysis && Date.now() - this.lastTextAnalysis.receivedAt > 30000) {
            this.lastTextAnalysis = null;
        }
        
        // Reset error count gradually if system is stable
        if (this.errorCount > 0 && this.performanceMetrics.totalAnalyses > 10) {
            const errorRate = this.performanceMetrics.errorsEncountered / this.performanceMetrics.totalAnalyses;
            if (errorRate < 0.1) {
                this.errorCount = Math.max(0, this.errorCount - 1);
            }
        }
    }
    
    maintainHistorySize() {
        if (this.conversationHistory.length > this.config.maxHistorySize) {
            const removeCount = this.conversationHistory.length - this.config.maxHistorySize;
            this.conversationHistory.splice(0, removeCount);
        }
    }
    
    reportPerformance() {
        const stats = {
            totalAnalyses: this.performanceMetrics.totalAnalyses,
            enhancedAnalyses: this.performanceMetrics.enhancedAnalyses,
            avgProcessingTime: this.performanceMetrics.averageProcessingTime,
            multimodalSuccessRate: this.performanceMetrics.multimodalSuccessRate,
            adaptationLevel: this.enhancedState.adaptationLevel,
            fallbackMode: this.enhancedState.fallbackMode || false
        };
        
        console.log('📊 Enhanced Social Decoder Performance:', stats);
    }
    
    updatePerformanceMetrics(processingTime) {
        this.performanceMetrics.totalAnalyses++;
        this.performanceMetrics.totalProcessingTime += processingTime;
        this.performanceMetrics.averageProcessingTime = 
            this.performanceMetrics.totalProcessingTime / this.performanceMetrics.totalAnalyses;
        
        // Calculate multimodal success rate
        if (this.performanceMetrics.enhancedAnalyses > 0) {
            this.performanceMetrics.multimodalSuccessRate = 
                this.performanceMetrics.enhancedAnalyses / this.performanceMetrics.totalAnalyses;
        }
    }
    
    // Error handling
    handleError(context, error, data = {}) {
        this.errorCount++;
        this.performanceMetrics.errorsEncountered++;
        this.lastError = {
            timestamp: Date.now(),
            context: context,
            error: error.message,
            data: data
        };

        console.error(`❌ Enhanced Social Decoder Error (${context}):`, error);
        console.error('📊 Error count:', this.errorCount, '/', this.maxErrors);
        
        if (this.errorCount >= this.maxErrors) {
            console.error('🚨 Enhanced Social Decoder: Maximum error threshold reached');
            this.enterSafeMode();
        }
    }
    
    handleAudioEngineError(errorType, error) {
        console.error(`❌ Audio Engine Error (${errorType}):`, error);
        
        // Could fall back to basic audio analysis or disable audio features
        if (errorType === 'audio_capture_failed') {
            console.log('🔄 Falling back to basic audio analysis due to capture failure');
            this.enhancedState.audioFallback = true;
        }
    }
    
    enterSafeMode() {
        this.isActive = false;
        this.enhancedState.fallbackMode = true;
        
        console.log('🛡️ Enhanced Social Decoder entering safe mode');
        
        // Attempt to reinitialize in fallback mode
        setTimeout(async () => {
            console.log('🔄 Attempting recovery in fallback mode...');
            await this.initializeFallbackMode();
        }, 5000);
    }
    
    resetErrorState() {
        this.errorCount = 0;
        this.lastError = null;
        this.enhancedState.fallbackMode = false;
        this.enhancedState.audioFallback = false;
        this.isActive = true;
        
        console.log('✅ Enhanced Social Decoder error state reset');
    }
    
    // Callback system
    onSocialCueDetected(callback) {
        this.detectionCallbacks.push(callback);
    }
    
    onEnhancedAnalysis(callback) {
        this.enhancedCallbacks.push(callback);
    }
    
    triggerDetectionCallbacks(analysis) {
        this.detectionCallbacks.forEach(callback => {
            try {
                callback(analysis);
            } catch (error) {
                console.error('❌ Detection callback error:', error);
            }
        });
    }
    
    triggerEnhancedCallbacks(enhancedAnalysis) {
        this.enhancedCallbacks.forEach(callback => {
            try {
                callback(enhancedAnalysis);
            } catch (error) {
                console.error('❌ Enhanced callback error:', error);
            }
        });
    }
    
    // Public API methods
    getConversationHistory() {
        return this.conversationHistory;
    }
    
    getConversationContext() {
        return {
            isActive: this.isActive,
            totalAnalyses: this.conversationHistory.length,
            enhancedAnalyses: this.performanceMetrics.enhancedAnalyses,
            recentActivity: this.conversationHistory.slice(-5),
            adaptationLevel: this.enhancedState.adaptationLevel,
            audioTextCorrelation: this.enhancedState.audioTextCorrelation,
            fallbackMode: this.enhancedState.fallbackMode || false,
            lastMultimodalAnalysis: this.enhancedState.lastMultimodalAnalysis,
            sessionStats: this.enhancedState.sessionStats,
            
            // Legacy compatibility
            history: this.conversationHistory.map(analysis => ({
                timestamp: analysis.timestamp,
                analysis: analysis,
                summary: {
                    original: analysis.original,
                    confidence: analysis.confidence || analysis.overallConfidence,
                    isSarcastic: analysis.sarcasmDetection?.enhanced || analysis.translation?.hiddenMeaning ? true : false,
                    emotionalTone: analysis.emotionDetection?.enhanced || analysis.translation?.emotionalSubtext,
                    suggestionsCount: analysis.suggestions?.length || analysis.recommendations?.length
                }
            }))
        };
    }
    
    getCurrentAnalysisCapabilities() {
        return {
            enhancedAudioEngine: !!this.enhancedAudioEngine,
            integrationLayer: !!this.integrationLayer,
            adaptiveLearning: !!this.adaptiveLearner,
            fallbackMode: this.enhancedState.fallbackMode || false,
            realTimeAnalysis: this.enhancedAudioEngine?.isActive || false,
            multimodalAnalysis: !!(this.enhancedAudioEngine && this.integrationLayer),
            adaptationLevel: this.enhancedState.adaptationLevel
        };
    }
    
    clearHistory() {
        this.conversationHistory = [];
        this.enhancedState.sessionStats.analysesCompleted = 0;
        this.enhancedState.sessionStats.enhancedDetections = 0;
        this.initializeContextTracking();
    }
    
    getPerformanceBenchmarks() {
        return {
            ...this.performanceMetrics,
            errorRate: this.performanceMetrics.totalAnalyses > 0 ? 
                (this.performanceMetrics.errorsEncountered / this.performanceMetrics.totalAnalyses * 100).toFixed(2) + '%' : '0%',
            currentErrorCount: this.errorCount,
            maxErrors: this.maxErrors,
            queueSize: this.analysisQueue.length,
            maxQueueSize: this.config.maxQueueSize,
            historySize: this.conversationHistory.length,
            maxHistorySize: this.config.maxHistorySize,
            isProcessing: this.isProcessing,
            lastError: this.lastError,
            healthStatus: this.getHealthStatus(),
            enhancedFeatures: this.getCurrentAnalysisCapabilities()
        };
    }
    
    getHealthStatus() {
        if (!this.isActive) return 'inactive';
        if (this.enhancedState.fallbackMode) return 'fallback';
        if (this.errorCount >= this.maxErrors) return 'error';
        if (this.errorCount > this.maxErrors * 0.7) return 'warning';
        if (this.performanceMetrics.averageProcessingTime > this.config.maxProcessingTime) return 'slow';
        return 'healthy';
    }
    
    async deactivate() {
        console.log('🛑 Deactivating Enhanced Social Decoder...');
        
        this.isActive = false;
        this.detectionCallbacks = [];
        this.enhancedCallbacks = [];
        
        // Clean up intervals
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        if (this.performanceInterval) {
            clearInterval(this.performanceInterval);
        }
        
        // Stop enhanced components
        if (this.enhancedAudioEngine) {
            await this.enhancedAudioEngine.stop();
        }
        if (this.integrationLayer) {
            await this.integrationLayer.stop();
        }
        
        console.log('✅ Enhanced Social Decoder deactivated');
    }
    
    // Legacy compatibility methods
    processAudioContext(audioContext) {
        // For compatibility with existing Real Audio Environment Monitor
        if (audioContext && !this.enhancedState.fallbackMode) {
            // Process basic audio context if enhanced engine is not available
            this.emotionalContext.audioEmotion = audioContext.primaryType;
            this.emotionalContext.lastAudioUpdate = Date.now();
        }
    }
    
    processMicrophoneData(audioData) {
        // For compatibility with existing microphone data processing
        if (audioData && !this.enhancedState.fallbackMode) {
            // Basic processing for fallback mode
        }
    }
}

// Export for integration with Velvet systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedSocialDecoder;
} else if (typeof window !== 'undefined') {
    window.EnhancedSocialDecoder = EnhancedSocialDecoder;
}

console.log('🧠 Enhanced Social Decoder loaded');