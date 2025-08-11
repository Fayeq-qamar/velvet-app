// Velvet Social Decoder System - Phase 2 Viral Feature
// "NeuroTranslator++" - Real-time neurotypical communication translation

class SocialDecoder {
    constructor() {
        this.isActive = false;
        this.audioAnalyzer = null;
        this.conversationHistory = [];
        this.emotionalContext = {};
        this.detectionCallbacks = [];
        this.errorCount = 0;
        this.maxErrors = 10; // Maximum errors before disabling
        this.lastError = null;
        this.performanceMetrics = {
            totalAnalyses: 0,
            averageProcessingTime: 0,
            totalProcessingTime: 0,
            errorsEncountered: 0
        };
        
        // Performance optimization
        this.analysisQueue = [];
        this.isProcessing = false;
        this.maxQueueSize = 5;
        this.debounceTimeout = null;
        this.maxProcessingTime = 500; // Max 500ms per analysis
        
        // Resource management
        this.maxHistorySize = 30;
        this.cleanupInterval = null;
        
        // Sarcasm and subtext detection patterns
        this.sarcasmMarkers = [
            'fine', 'sure', 'whatever', 'great', 'perfect', 'wonderful',
            'obviously', 'totally', 'absolutely', 'definitely'
        ];
        
        // Emotional tone patterns
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
    }

    // Initialize the Social Decoder System
    async initialize() {
        try {
            console.log('🧠 Initializing Social Decoder System...');
            
            // Set up audio analysis for real-time tone detection
            await this.setupAudioAnalysis();
            
            // Initialize conversation context tracking
            this.initializeContextTracking();
            
            // Start resource management
            this.startResourceManagement();
            
            this.isActive = true;
            console.log('✅ Social Decoder System active - ready to translate neurotypical communication');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Social Decoder:', error);
            return false;
        }
    }

    // Set up real-time audio analysis for emotional tone detection
    async setupAudioAnalysis() {
        console.log('🎧 Setting up Social Decoder audio integration...');
        
        // Hook into existing Velvet audio monitoring system
        if (window.realAudioEnvironmentMonitor) {
            console.log('✅ Connecting to Real Audio Environment Monitor');
            
            // Register callback for audio context updates
            window.realAudioEnvironmentMonitor.onContextUpdate((audioContext) => {
                this.processAudioContext(audioContext);
            });
            
            // Register callback for microphone data
            window.realAudioEnvironmentMonitor.onMicrophoneData((audioData) => {
                this.processMicrophoneData(audioData);
            });
        } else {
            console.log('⚠️ Real Audio Environment Monitor not available, using fallback analysis');
        }
        
        // Set up audio analyzer with real integration
        this.audioAnalyzer = {
            analyzeEmotionalTone: (audioData, transcript) => {
                return this.detectEmotionalCues(audioData, transcript);
            },
            
            detectSarcasm: (text, toneData) => {
                return this.analyzeSarcasmMarkers(text, toneData);
            },
            
            assessCommunicationClarity: (transcript) => {
                return this.measureAmbiguityLevel(transcript);
            },
            
            // NEW: Real-time audio feature extraction
            extractAudioFeatures: (audioBuffer) => {
                return this.extractRealAudioFeatures(audioBuffer);
            }
        };
        
        console.log('🎧 Audio analysis setup complete');
    }

    // Process audio context from the real audio monitor
    processAudioContext(audioContext) {
        if (!audioContext || !this.isActive) return;
        
        // Extract relevant features for social decoding
        const socialAudioFeatures = {
            timestamp: Date.now(),
            hasSystemAudio: audioContext.hasSystemAudio,
            hasMicrophoneInput: audioContext.hasMicrophoneInput,
            audioClassification: audioContext.classification,
            confidence: audioContext.confidence,
            
            // Social decoder specific features
            isPotentialConversation: audioContext.classification === 'speech' || 
                                   audioContext.classification === 'call',
            conversationContext: this.inferConversationContext(audioContext)
        };
        
        // Store for correlation with text analysis
        this.currentAudioContext = socialAudioFeatures;
        
        // If this looks like a conversation, prepare for social analysis
        if (socialAudioFeatures.isPotentialConversation) {
            console.log('🎭 Potential conversation detected, Social Decoder on standby');
        }
    }

    // Process microphone data for tone analysis
    processMicrophoneData(audioData) {
        if (!audioData || !this.isActive) return;
        
        // Extract tone features from microphone data
        const toneFeatures = this.extractToneFeatures(audioData);
        
        // Store for correlation with transcripts
        this.currentToneData = {
            timestamp: Date.now(),
            features: toneFeatures,
            rawData: audioData
        };
    }

    // Extract tone features from audio data
    extractToneFeatures(audioData) {
        // This would use Web Audio API for real analysis
        // For now, implementing basic feature extraction
        
        if (!audioData.frequencyData) {
            return { pitch: 0, energy: 0, variance: 0 };
        }
        
        const freqData = audioData.frequencyData;
        
        // Calculate basic features
        let energy = 0;
        let pitch = 0;
        let variance = 0;
        
        for (let i = 0; i < freqData.length; i++) {
            energy += freqData[i] * freqData[i];
            if (i > 50 && i < 200) { // Human speech range
                pitch += freqData[i] * i;
            }
        }
        
        energy = Math.sqrt(energy / freqData.length);
        pitch = pitch / energy || 0;
        
        // Calculate variance for detecting flat/monotone speech
        const mean = freqData.reduce((a, b) => a + b) / freqData.length;
        variance = freqData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / freqData.length;
        
        return {
            energy: energy,
            pitch: pitch,
            variance: variance,
            monotone: variance < 100, // Low variance = monotone/flat
            highPitch: pitch > 150,   // Elevated pitch = anxiety/stress
            lowEnergy: energy < 50    // Low energy = flat delivery
        };
    }

    // Infer conversation context from audio
    inferConversationContext(audioContext) {
        let context = {
            isLikelyMeeting: false,
            isPhoneCall: false,
            isInPersonChat: false,
            emotionalTone: 'neutral'
        };
        
        // Basic inference based on audio classification
        if (audioContext.classification === 'call') {
            context.isPhoneCall = true;
        } else if (audioContext.classification === 'speech' && audioContext.hasSystemAudio) {
            context.isLikelyMeeting = true;
        } else if (audioContext.classification === 'speech') {
            context.isInPersonChat = true;
        }
        
        return context;
    }

    // Initialize conversation context tracking
    initializeContextTracking() {
        this.conversationHistory = [];
        this.emotionalContext = {
            speakerMood: 'neutral',
            stressLevel: 0,
            communicationStyle: 'direct',
            relationshipDynamic: 'professional'
        };
    }

    // Start resource management for performance optimization
    startResourceManagement() {
        // Clean up old data every 60 seconds
        this.cleanupInterval = setInterval(() => {
            this.performCleanup();
        }, 60000);
        
        console.log('🧹 Social Decoder resource management started');
    }

    // Performance cleanup
    performCleanup() {
        // Limit conversation history size
        if (this.conversationHistory.length > this.maxHistorySize) {
            const removeCount = this.conversationHistory.length - this.maxHistorySize;
            this.conversationHistory.splice(0, removeCount);
            console.log(`🧹 Cleaned up ${removeCount} old conversation entries`);
        }
        
        // Clean up old tone data
        if (this.currentToneData && Date.now() - this.currentToneData.timestamp > 30000) {
            this.currentToneData = null;
            console.log('🧹 Cleaned up old tone data');
        }
        
        // Reset error count gradually if system is stable
        if (this.errorCount > 0 && this.performanceMetrics.totalAnalyses > 10) {
            const errorRate = this.performanceMetrics.errorsEncountered / this.performanceMetrics.totalAnalyses;
            if (errorRate < 0.1) { // Less than 10% error rate
                this.errorCount = Math.max(0, this.errorCount - 1);
            }
        }
    }

    // Optimized analysis function with queuing and debouncing
    analyzeConversation(transcript, audioData, speakerInfo = {}) {
        if (!this.isActive) return null;

        // Add to analysis queue for performance optimization
        return this.queueAnalysis(transcript, audioData, speakerInfo);
    }

    // Queue analysis requests to prevent UI blocking
    queueAnalysis(transcript, audioData, speakerInfo = {}) {
        // Check queue size to prevent memory issues
        if (this.analysisQueue.length >= this.maxQueueSize) {
            console.warn('⚠️ Social Decoder: Analysis queue full, dropping oldest request');
            this.analysisQueue.shift(); // Remove oldest
        }
        
        const analysisRequest = {
            transcript,
            audioData,
            speakerInfo,
            timestamp: Date.now(),
            resolve: null,
            reject: null
        };
        
        // Create promise for async processing
        const promise = new Promise((resolve, reject) => {
            analysisRequest.resolve = resolve;
            analysisRequest.reject = reject;
        });
        
        this.analysisQueue.push(analysisRequest);
        
        // Debounce processing to avoid overwhelming the system
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        
        this.debounceTimeout = setTimeout(() => {
            this.processAnalysisQueue();
        }, 100); // Wait 100ms for more requests
        
        return promise;
    }

    // Process queued analysis requests
    async processAnalysisQueue() {
        if (this.isProcessing || this.analysisQueue.length === 0) {
            return;
        }
        
        this.isProcessing = true;
        
        try {
            // Process all queued requests
            const requests = [...this.analysisQueue];
            this.analysisQueue = [];
            
            for (const request of requests) {
                try {
                    const result = await this.performAnalysis(
                        request.transcript, 
                        request.audioData, 
                        request.speakerInfo
                    );
                    
                    request.resolve(result);
                } catch (error) {
                    request.reject(error);
                }
            }
        } finally {
            this.isProcessing = false;
        }
    }

    // Perform the actual analysis (moved from analyzeConversation)
    async performAnalysis(transcript, audioData, speakerInfo = {}) {
        const startTime = performance.now();
        
        try {
            // Validate input
            if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
                console.warn('⚠️ Social Decoder: Invalid transcript provided');
                return null;
            }

            // Check error threshold
            if (this.errorCount >= this.maxErrors) {
                console.warn('⚠️ Social Decoder: Maximum error threshold reached, disabling analysis');
                this.isActive = false;
                return null;
            }

            // Step 1: Basic sarcasm and subtext detection
            const sarcasmAnalysis = this.detectSarcasm(transcript, audioData);
            
            // Step 2: Emotional tone analysis
            const emotionalAnalysis = this.analyzeEmotionalTone(transcript, audioData);
            
            // Step 3: Communication clarity assessment
            const clarityAnalysis = this.assessCommunicationClarity(transcript);
            
            // Step 4: Generate neurotypical translation
            const translation = this.generateNeurotypicalTranslation({
                original: transcript,
                sarcasm: sarcasmAnalysis,
                emotion: emotionalAnalysis,
                clarity: clarityAnalysis,
                speaker: speakerInfo
            });

            // Step 5: Suggest response templates if needed
            const suggestions = this.generateResponseSuggestions(translation);

            const processingTime = performance.now() - startTime;
            
            const result = {
                timestamp: Date.now(),
                original: transcript,
                translation: translation,
                suggestions: suggestions,
                confidence: this.calculateConfidence(sarcasmAnalysis, emotionalAnalysis, clarityAnalysis),
                processingTime: processingTime,
                audioDataAvailable: !!audioData,
                realAudioUsed: !!(this.currentToneData && this.currentToneData.features)
            };

            // Update performance metrics
            this.updatePerformanceMetrics(processingTime);

            // Store in conversation history (with size limit for performance)
            this.conversationHistory.push(result);
            if (this.conversationHistory.length > 50) {
                this.conversationHistory = this.conversationHistory.slice(-30); // Keep last 30
            }
            
            // Trigger callbacks for UI updates with error handling
            this.triggerDetectionCallbacks(result);
            
            // Reset error count on successful analysis
            if (this.errorCount > 0) {
                this.errorCount--;
            }
            
            return result;

        } catch (error) {
            this.handleError('analyzeConversation', error, { transcript: transcript?.substring(0, 50) });
            return null;
        }
    }

    // Enhanced error handling
    handleError(context, error, data = {}) {
        this.errorCount++;
        this.performanceMetrics.errorsEncountered++;
        this.lastError = {
            timestamp: Date.now(),
            context: context,
            error: error.message,
            data: data
        };

        console.error(`❌ Social Decoder Error (${context}):`, error);
        console.error('📊 Error count:', this.errorCount, '/', this.maxErrors);
        
        if (this.errorCount >= this.maxErrors) {
            console.error('🚨 Social Decoder: Maximum error threshold reached, entering safe mode');
            this.enterSafeMode();
        }
    }

    // Update performance metrics
    updatePerformanceMetrics(processingTime) {
        this.performanceMetrics.totalAnalyses++;
        this.performanceMetrics.totalProcessingTime += processingTime;
        this.performanceMetrics.averageProcessingTime = 
            this.performanceMetrics.totalProcessingTime / this.performanceMetrics.totalAnalyses;
    }

    // Enter safe mode when too many errors occur
    enterSafeMode() {
        this.isActive = false;
        console.log('🛡️ Social Decoder entering safe mode - analysis disabled');
        
        // Notify UI about safe mode
        this.triggerDetectionCallbacks({
            timestamp: Date.now(),
            error: true,
            message: 'Social Decoder entered safe mode due to errors',
            safeMode: true
        });
    }

    // Reset error state and reactivate
    resetErrorState() {
        this.errorCount = 0;
        this.lastError = null;
        this.isActive = true;
        console.log('✅ Social Decoder error state reset - reactivated');
    }

    // Detect sarcasm and subtext in communication
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

    // Analyze text for sarcasm markers
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

    // Analyze tone mismatch between content and delivery
    analyzeToneMismatch(text, audioData) {
        const positiveWords = ['great', 'awesome', 'perfect', 'wonderful', 'fine'];
        const hasPositiveWords = positiveWords.some(word => text.toLowerCase().includes(word));
        
        let mismatch = 0;
        let indicators = { flat: false, stressed: false, realAudio: false };
        
        // Use real audio data if available from current tone data
        if (this.currentToneData && this.currentToneData.features) {
            const toneFeatures = this.currentToneData.features;
            indicators.realAudio = true;
            
            // Real audio analysis
            indicators.flat = toneFeatures.monotone || toneFeatures.lowEnergy;
            indicators.stressed = toneFeatures.highPitch || toneFeatures.energy > 200;
            
            // Detect sarcasm: positive words + flat/monotone delivery
            if (hasPositiveWords && indicators.flat) {
                mismatch = 0.85; // High confidence with real audio
            }
            
            // Detect stress: positive words + high pitch/energy
            if (hasPositiveWords && indicators.stressed) {
                mismatch = 0.7; // Might be genuine enthusiasm or forced positivity
            }
            
            // Low energy with any content = potential disengagement
            if (toneFeatures.lowEnergy && text.length > 5) {
                mismatch += 0.3;
            }
            
            console.log('🎧 Real audio tone analysis:', {
                text: text.substring(0, 30) + '...',
                toneFeatures: toneFeatures,
                mismatch: mismatch.toFixed(2)
            });
            
        } else {
            // Fallback to text-based simulation
            const simulatedToneFlat = text.length < 10 || text.includes('.');
            const simulatedStress = text.includes('!') || text.toUpperCase() === text;
            
            indicators.flat = simulatedToneFlat;
            indicators.stressed = simulatedStress;
            
            if (hasPositiveWords && simulatedToneFlat) {
                mismatch = 0.6; // Lower confidence without real audio
            }
            
            console.log('🎭 Simulated tone analysis (no real audio):', {
                text: text.substring(0, 30) + '...',
                mismatch: mismatch.toFixed(2)
            });
        }
        
        return { mismatch: Math.min(mismatch, 1.0), indicators };
    }

    // Infer the actual meaning behind sarcastic communication
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

    // Analyze emotional tone from transcript and audio
    analyzeEmotionalTone(transcript, audioData) {
        // Combine text analysis with simulated audio analysis
        let emotionalMarkers = {
            frustration: 0,
            anxiety: 0,
            passive_aggressive: 0,
            genuine_positive: 0
        };

        const lowerText = transcript.toLowerCase();

        // Check for frustration markers
        if (this.tonePatterns.frustration.keywords.some(word => lowerText.includes(word))) {
            emotionalMarkers.frustration += 0.6;
        }

        // Check for anxiety markers
        if (this.tonePatterns.anxiety.keywords.some(word => lowerText.includes(word))) {
            emotionalMarkers.anxiety += 0.5;
        }

        // Check for passive-aggressive markers
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
            allEmotions: emotionalMarkers
        };
    }

    // Assess communication clarity and ambiguity
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

    // Generate neurotypical translation of the communication
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

    // Generate helpful response suggestions
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

    // Calculate overall confidence in the analysis
    calculateConfidence(sarcasmAnalysis, emotionalAnalysis, clarityAnalysis) {
        const sarcasmConfidence = sarcasmAnalysis.confidence || 0;
        const emotionConfidence = emotionalAnalysis.confidence || 0;
        const clarityConfidence = 1 - clarityAnalysis.ambiguityLevel;

        return (sarcasmConfidence + emotionConfidence + clarityConfidence) / 3;
    }

    // Register callback for when social cues are detected
    onSocialCueDetected(callback) {
        this.detectionCallbacks.push(callback);
    }

    // Trigger all registered callbacks with enhanced error handling
    triggerDetectionCallbacks(analysis) {
        if (!this.detectionCallbacks || this.detectionCallbacks.length === 0) {
            return;
        }

        let callbackErrors = 0;
        
        this.detectionCallbacks.forEach((callback, index) => {
            try {
                if (typeof callback === 'function') {
                    callback(analysis);
                } else {
                    console.warn(`⚠️ Social Decoder: Invalid callback at index ${index}`);
                }
            } catch (error) {
                callbackErrors++;
                console.error(`❌ Social Decoder callback error (index ${index}):`, error);
                
                // If too many callback errors, remove problematic callbacks
                if (callbackErrors > 3) {
                    console.warn('⚠️ Social Decoder: Too many callback errors, cleaning up callbacks');
                    this.detectionCallbacks = this.detectionCallbacks.filter(cb => typeof cb === 'function');
                    return;
                }
            }
        });
    }

    // Get conversation history for context
    getConversationHistory() {
        return this.conversationHistory;
    }

    // Get conversation context for AI brain integration
    getConversationContext() {
        return {
            isActive: this.isActive,
            totalAnalyses: this.conversationHistory.length,
            recentActivity: this.conversationHistory.slice(-5),
            history: this.conversationHistory.map(analysis => ({
                timestamp: analysis.timestamp,
                analysis: analysis,
                summary: {
                    original: analysis.original,
                    confidence: analysis.confidence,
                    isSarcastic: analysis.translation.hiddenMeaning ? true : false,
                    emotionalTone: analysis.translation.emotionalSubtext,
                    suggestionsCount: analysis.suggestions.length
                }
            })),
            currentAudioContext: this.currentAudioContext,
            currentToneData: this.currentToneData,
            detectionStats: {
                highConfidenceDetections: this.conversationHistory.filter(a => a.confidence > 0.8).length,
                sarcasmDetections: this.conversationHistory.filter(a => a.translation.hiddenMeaning).length,
                emotionalDetections: this.conversationHistory.filter(a => a.translation.emotionalSubtext).length
            }
        };
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
        this.emotionalContext = {
            speakerMood: 'neutral',
            stressLevel: 0,
            communicationStyle: 'direct',
            relationshipDynamic: 'professional'
        };
    }

    // Get performance benchmarks
    getPerformanceBenchmarks() {
        return {
            ...this.performanceMetrics,
            errorRate: this.performanceMetrics.totalAnalyses > 0 ? 
                (this.performanceMetrics.errorsEncountered / this.performanceMetrics.totalAnalyses * 100).toFixed(2) + '%' : '0%',
            currentErrorCount: this.errorCount,
            maxErrors: this.maxErrors,
            queueSize: this.analysisQueue.length,
            maxQueueSize: this.maxQueueSize,
            historySize: this.conversationHistory.length,
            maxHistorySize: this.maxHistorySize,
            isProcessing: this.isProcessing,
            lastError: this.lastError,
            healthStatus: this.getHealthStatus()
        };
    }

    // Get system health status
    getHealthStatus() {
        if (!this.isActive) {
            return 'inactive';
        }
        
        if (this.errorCount >= this.maxErrors) {
            return 'error';
        }
        
        if (this.errorCount > this.maxErrors * 0.7) {
            return 'warning';
        }
        
        if (this.performanceMetrics.averageProcessingTime > this.maxProcessingTime) {
            return 'slow';
        }
        
        return 'healthy';
    }

    // Deactivate the Social Decoder with proper cleanup
    deactivate() {
        this.isActive = false;
        this.detectionCallbacks = [];
        
        // Clean up timers and intervals
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
            this.cleanupInterval = null;
        }
        
        // Clear queued analyses
        this.analysisQueue.forEach(request => {
            if (request.reject) {
                request.reject(new Error('Social Decoder deactivated'));
            }
        });
        this.analysisQueue = [];
        
        console.log('🧠 Social Decoder System deactivated with proper cleanup');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialDecoder;
} else {
    window.SocialDecoder = SocialDecoder;
}

// Testing functions for Phase 2 development
if (typeof window !== 'undefined') {
    window.testSocial = {
        detectSarcasm: () => {
            const decoder = new SocialDecoder();
            decoder.initialize();
            
            const testCases = [
                { text: "Sure, that's fine, whatever works.", expected: "sarcastic" },
                { text: "Great! This is perfect timing!", expected: "genuine" },
                { text: "No problem at all, happy to help.", expected: "potentially_sarcastic" }
            ];
            
            testCases.forEach(testCase => {
                const result = decoder.analyzeConversation(testCase.text, null);
                console.log(`🧪 Test: "${testCase.text}"`);
                console.log(`🎯 Analysis:`, result.translation);
                console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
                console.log('---');
            });
        },
        
        suggestResponse: () => {
            const decoder = new SocialDecoder();
            decoder.initialize();
            
            const result = decoder.analyzeConversation("Fine, whatever you think is best.", null);
            console.log('🎭 Original:', result.original);
            console.log('🔍 Translation:', result.translation.directMeaning);
            console.log('💡 Suggestions:');
            result.suggestions.forEach(suggestion => {
                console.log(`  - ${suggestion.text}`);
                console.log(`    (${suggestion.explanation})`);
            });
        },
        
        analyzeTone: () => {
            const decoder = new SocialDecoder();
            decoder.initialize();
            
            const emotionalTests = [
                "I guess that could work maybe...",
                "Fine! Whatever! This is just great!",
                "No problem, happy to help with anything you need."
            ];
            
            emotionalTests.forEach(text => {
                const result = decoder.analyzeConversation(text, null);
                console.log(`🎭 "${text}"`);
                console.log(`😊 Emotional subtext: ${result.translation.emotionalSubtext}`);
                console.log(`🎯 Action needed: ${result.translation.actionNeeded}`);
                console.log('---');
            });
        }
    };
}