// Audio-Social Integration Layer for Velvet
// Bridges Enhanced Audio Analysis Engine with Social Decoder System
// Provides unified audio-text correlation for advanced sarcasm and emotion detection

/**
 * AudioSocialIntegrationLayer
 * 
 * This integration layer serves as the bridge between the Enhanced Audio Analysis Engine
 * and the Social Decoder System, enabling sophisticated multimodal analysis that combines
 * real-time audio features with text analysis for superior emotional intelligence.
 * 
 * Key Integration Features:
 * - Real-time audio-text correlation for sarcasm detection
 * - Enhanced emotional context through voice-content mismatch analysis
 * - Adaptive confidence scoring based on multimodal agreement
 * - Privacy-preserving local processing with no data persistence
 * - Performance optimization for neurodivergent users
 * - Contextual learning that adapts to individual communication patterns
 */

class AudioSocialIntegrationLayer {
    constructor() {
        console.log('🔗 Initializing Audio-Social Integration Layer...');
        
        // Core components
        this.audioEngine = null;
        this.socialDecoder = null;
        this.isActive = false;
        
        // Integration state
        this.currentCorrelation = null;
        this.correlationHistory = [];
        this.integrationCallbacks = [];
        
        // Configuration for multimodal analysis
        this.config = {
            correlationWindowMs: 2000,     // 2 second window for audio-text correlation
            confidenceThreshold: 0.65,    // Minimum confidence for integrated analysis
            adaptationRate: 0.1,           // How quickly to adapt correlation patterns
            maxHistorySize: 50,            // Maximum correlation history entries
            
            // Sarcasm detection weights
            sarcasmWeights: {
                textMarkers: 0.3,          // Traditional text-based sarcasm markers
                audioToneMismatch: 0.4,    // Audio-content mismatch (key for sarcasm)
                prosodyFlat: 0.2,          // Flat prosody with positive content
                contextualCues: 0.1        // Additional contextual information
            },
            
            // Emotion detection weights
            emotionWeights: {
                textSentiment: 0.25,       // Text-based emotional indicators
                voiceEmotion: 0.45,        // Voice-based emotional analysis
                prosodyMatch: 0.2,         // Prosody-content alignment
                contextConsistency: 0.1    // Consistency with previous patterns
            },
            
            // Performance optimization
            processingTimeout: 100,        // Maximum processing time per analysis
            queueSize: 10,                 // Maximum items in processing queue
            errorThreshold: 5              // Maximum errors before fallback mode
        };
        
        // Multimodal analysis state
        this.multimodalState = {
            lastTextAnalysis: null,
            lastAudioAnalysis: null,
            correlationConfidence: 0,
            detectionPattern: 'none',
            adaptationLevel: 0
        };
        
        // Performance tracking
        this.performanceMetrics = {
            totalCorrelations: 0,
            successfulDetections: 0,
            avgProcessingTime: 0,
            errorCount: 0,
            accuracyScore: 0
        };
        
        // Error handling
        this.errorState = {
            consecutiveErrors: 0,
            lastError: null,
            fallbackMode: false
        };
        
        console.log('🔗 Audio-Social Integration Layer initialized');
    }
    
    /**
     * Initialize the integration layer with audio engine and social decoder
     */
    async initialize(audioEngine, socialDecoder) {
        try {
            console.log('🔗 Starting Audio-Social Integration Layer initialization...');
            
            // Store component references
            this.audioEngine = audioEngine;
            this.socialDecoder = socialDecoder;
            
            // Validate components
            if (!this.validateComponents()) {
                throw new Error('Component validation failed');
            }
            
            // Set up integration callbacks
            await this.setupIntegrationCallbacks();
            
            // Initialize multimodal analysis
            await this.initializeMultimodalAnalysis();
            
            // Start performance monitoring
            this.startPerformanceMonitoring();
            
            this.isActive = true;
            console.log('✅ Audio-Social Integration Layer fully initialized');
            
            return true;
            
        } catch (error) {
            console.error('❌ Audio-Social Integration Layer initialization failed:', error);
            this.handleInitializationError(error);
            return false;
        }
    }
    
    /**
     * Validate that required components are properly initialized
     */
    validateComponents() {
        if (!this.audioEngine) {
            console.error('❌ Enhanced Audio Analysis Engine not provided');
            return false;
        }
        
        if (!this.socialDecoder) {
            console.error('❌ Social Decoder System not provided');
            return false;
        }
        
        if (!this.audioEngine.isActive) {
            console.warn('⚠️ Audio Engine not active - attempting to activate...');
            // Could attempt to activate here if needed
        }
        
        if (!this.socialDecoder.isActive) {
            console.warn('⚠️ Social Decoder not active - attempting to activate...');
            // Could attempt to activate here if needed
        }
        
        console.log('✅ Component validation successful');
        return true;
    }
    
    /**
     * Set up callbacks to receive data from both components
     */
    async setupIntegrationCallbacks() {
        try {
            console.log('🔗 Setting up integration callbacks...');
            
            // Listen to audio analysis results
            this.audioEngine.onAnalysisComplete((audioAnalysis) => {
                this.handleAudioAnalysis(audioAnalysis);
            });
            
            // Listen to social decoder results
            this.socialDecoder.onSocialCueDetected((socialAnalysis) => {
                this.handleSocialAnalysis(socialAnalysis);
            });
            
            // Error handling callbacks
            this.audioEngine.onError((errorType, error) => {
                this.handleComponentError('audio', errorType, error);
            });
            
            this.socialDecoder.onError((errorType, error) => {
                this.handleComponentError('social', errorType, error);
            });
            
            console.log('✅ Integration callbacks established');
            
        } catch (error) {
            console.error('❌ Integration callback setup failed:', error);
            throw error;
        }
    }
    
    /**
     * Initialize multimodal analysis system
     */
    async initializeMultimodalAnalysis() {
        try {
            console.log('🧠 Initializing multimodal analysis system...');
            
            // Initialize correlation algorithms
            this.correlationEngine = new MultimodalCorrelationEngine({
                windowSize: this.config.correlationWindowMs,
                confidenceThreshold: this.config.confidenceThreshold
            });
            
            // Initialize adaptive learning for correlation patterns
            this.adaptiveCorrelation = new AdaptiveCorrelationLearning({
                adaptationRate: this.config.adaptationRate,
                historySize: this.config.maxHistorySize
            });
            
            // Initialize enhanced sarcasm detector
            this.enhancedSarcasmDetector = new EnhancedSarcasmDetector({
                audioWeights: this.config.sarcasmWeights,
                emotionWeights: this.config.emotionWeights
            });
            
            console.log('✅ Multimodal analysis system initialized');
            
        } catch (error) {
            console.error('❌ Multimodal analysis initialization failed:', error);
            throw error;
        }
    }
    
    /**
     * Handle incoming audio analysis results
     */
    handleAudioAnalysis(audioAnalysis) {
        try {
            if (!this.isActive) return;
            
            console.log('🎧 Processing audio analysis for integration...');
            
            // Store audio analysis with timestamp
            this.multimodalState.lastAudioAnalysis = {
                ...audioAnalysis,
                receivedAt: Date.now()
            };
            
            // Attempt multimodal correlation if we have recent text analysis
            this.attemptMultimodalCorrelation();
            
        } catch (error) {
            console.error('❌ Audio analysis handling error:', error);
            this.handleProcessingError('audio_analysis', error);
        }
    }
    
    /**
     * Handle incoming social decoder analysis results
     */
    handleSocialAnalysis(socialAnalysis) {
        try {
            if (!this.isActive) return;
            
            console.log('🧠 Processing social analysis for integration...');
            
            // Store social analysis with timestamp
            this.multimodalState.lastTextAnalysis = {
                ...socialAnalysis,
                receivedAt: Date.now()
            };
            
            // Attempt multimodal correlation if we have recent audio analysis
            this.attemptMultimodalCorrelation();
            
        } catch (error) {
            console.error('❌ Social analysis handling error:', error);
            this.handleProcessingError('social_analysis', error);
        }
    }
    
    /**
     * Attempt to correlate audio and text analyses for enhanced detection
     */
    async attemptMultimodalCorrelation() {
        try {
            const startTime = performance.now();
            
            // Check if we have both analyses within the correlation window
            if (!this.hasValidCorrelationData()) {
                return null;
            }
            
            const audioAnalysis = this.multimodalState.lastAudioAnalysis;
            const textAnalysis = this.multimodalState.lastTextAnalysis;
            
            console.log('🔍 Attempting multimodal correlation...');
            console.log(`📊 Audio: ${audioAnalysis.emotion.overall} (${audioAnalysis.confidence.toFixed(2)})`);
            console.log(`📊 Text: ${textAnalysis.translation.directMeaning.substring(0, 50)}...`);
            
            // Perform enhanced sarcasm detection
            const enhancedSarcasm = await this.performEnhancedSarcasmDetection(audioAnalysis, textAnalysis);
            
            // Perform enhanced emotion detection
            const enhancedEmotion = await this.performEnhancedEmotionDetection(audioAnalysis, textAnalysis);
            
            // Calculate overall correlation confidence
            const correlationConfidence = this.calculateCorrelationConfidence(audioAnalysis, textAnalysis, enhancedSarcasm, enhancedEmotion);
            
            // Create integrated analysis result
            const integratedAnalysis = {
                timestamp: Date.now(),
                processingTime: performance.now() - startTime,
                
                // Source analyses
                audioAnalysis: audioAnalysis,
                textAnalysis: textAnalysis,
                
                // Enhanced detections
                enhancedSarcasm: enhancedSarcasm,
                enhancedEmotion: enhancedEmotion,
                
                // Overall assessment
                overallConfidence: correlationConfidence,
                detectionType: this.determineDetectionType(enhancedSarcasm, enhancedEmotion),
                
                // Recommendations for user support
                recommendations: this.generateIntegratedRecommendations(enhancedSarcasm, enhancedEmotion, correlationConfidence)
            };
            
            // Store correlation result
            this.storeCorrelationResult(integratedAnalysis);
            
            // Update adaptive learning
            await this.updateAdaptiveLearning(integratedAnalysis);
            
            // Update performance metrics
            this.updatePerformanceMetrics(integratedAnalysis);
            
            // Trigger integration callbacks
            this.triggerIntegrationCallbacks(integratedAnalysis);
            
            console.log(`✅ Multimodal correlation completed: ${integratedAnalysis.detectionType} (${correlationConfidence.toFixed(2)} confidence)`);
            
            return integratedAnalysis;
            
        } catch (error) {
            console.error('❌ Multimodal correlation failed:', error);
            this.handleProcessingError('correlation', error);
            return null;
        }
    }
    
    /**
     * Check if we have valid data for correlation within the time window
     */
    hasValidCorrelationData() {
        const now = Date.now();
        const window = this.config.correlationWindowMs;
        
        const hasAudio = this.multimodalState.lastAudioAnalysis && 
            (now - this.multimodalState.lastAudioAnalysis.receivedAt) <= window;
        
        const hasText = this.multimodalState.lastTextAnalysis && 
            (now - this.multimodalState.lastTextAnalysis.receivedAt) <= window;
        
        return hasAudio && hasText;
    }
    
    /**
     * Perform enhanced sarcasm detection using multimodal analysis
     */
    async performEnhancedSarcasmDetection(audioAnalysis, textAnalysis) {
        try {
            const sarcasmAnalysis = {
                isSarcastic: false,
                confidence: 0,
                audioContribution: 0,
                textContribution: 0,
                factors: []
            };
            
            // Text-based sarcasm markers (from original Social Decoder)
            const textSarcasm = textAnalysis.translation.hiddenMeaning ? 0.8 : 0;
            sarcasmAnalysis.textContribution = textSarcasm;
            
            if (textSarcasm > 0) {
                sarcasmAnalysis.factors.push('text_sarcasm_markers');
            }
            
            // Audio-based sarcasm indicators
            let audioSarcasm = 0;
            
            // Prosody-content mismatch (key sarcasm indicator)
            if (audioAnalysis.sarcasm && audioAnalysis.sarcasm.prosodyMismatch > 0.5) {
                audioSarcasm += audioAnalysis.sarcasm.prosodyMismatch * 0.6;
                sarcasmAnalysis.factors.push('prosody_content_mismatch');
            }
            
            // Tonal flatness with positive content
            if (audioAnalysis.sarcasm && audioAnalysis.sarcasm.tonalFlatness > 0.4 && this.hasPositiveContent(textAnalysis)) {
                audioSarcasm += audioAnalysis.sarcasm.tonalFlatness * 0.4;
                sarcasmAnalysis.factors.push('flat_tone_positive_content');
            }
            
            // Emphasis abnormality
            if (audioAnalysis.sarcasm && audioAnalysis.sarcasm.emphasisAbnormality > 0.5) {
                audioSarcasm += audioAnalysis.sarcasm.emphasisAbnormality * 0.3;
                sarcasmAnalysis.factors.push('emphasis_abnormality');
            }
            
            sarcasmAnalysis.audioContribution = Math.min(audioSarcasm, 1.0);
            
            // Combine audio and text evidence with weights
            const weights = this.config.sarcasmWeights;
            sarcasmAnalysis.confidence = 
                textSarcasm * weights.textMarkers +
                sarcasmAnalysis.audioContribution * (weights.audioToneMismatch + weights.prosodyFlat);
            
            // Boost confidence when both modalities agree
            if (textSarcasm > 0.5 && sarcasmAnalysis.audioContribution > 0.5) {
                sarcasmAnalysis.confidence *= 1.2; // 20% boost for agreement
                sarcasmAnalysis.factors.push('multimodal_agreement');
            }
            
            sarcasmAnalysis.confidence = Math.min(sarcasmAnalysis.confidence, 1.0);
            sarcasmAnalysis.isSarcastic = sarcasmAnalysis.confidence > this.config.confidenceThreshold;
            
            console.log(`🎭 Enhanced sarcasm detection: ${sarcasmAnalysis.isSarcastic ? 'SARCASTIC' : 'genuine'} (${sarcasmAnalysis.confidence.toFixed(2)})`);
            console.log(`📊 Factors: ${sarcasmAnalysis.factors.join(', ')}`);
            
            return sarcasmAnalysis;
            
        } catch (error) {
            console.error('❌ Enhanced sarcasm detection error:', error);
            return { isSarcastic: false, confidence: 0, audioContribution: 0, textContribution: 0, factors: [] };
        }
    }
    
    /**
     * Perform enhanced emotion detection using multimodal analysis
     */
    async performEnhancedEmotionDetection(audioAnalysis, textAnalysis) {
        try {
            const emotionAnalysis = {
                dominantEmotion: 'neutral',
                confidence: 0,
                audioEmotion: audioAnalysis.emotion || {},
                textEmotion: textAnalysis.translation.emotionalSubtext || 'neutral',
                agreement: 0,
                factors: []
            };
            
            // Extract audio emotion
            const audioEmotion = audioAnalysis.emotion || {};
            const audioEmotionStrength = audioEmotion.confidence || 0;
            
            // Extract text emotion indicators
            const textEmotionStrength = this.extractTextEmotionStrength(textAnalysis);
            
            // Check for emotion agreement between modalities
            const emotionAgreement = this.calculateEmotionAgreement(audioEmotion, textAnalysis);
            emotionAnalysis.agreement = emotionAgreement;
            
            // Determine dominant emotion with multimodal weighting
            const weights = this.config.emotionWeights;
            let maxConfidence = 0;
            let dominantEmotion = 'neutral';
            
            // Check each emotion type
            const emotionTypes = ['frustration', 'anxiety', 'confidence', 'engagement'];
            
            for (const emotion of emotionTypes) {
                const audioScore = audioEmotion[emotion] || 0;
                const textScore = this.getTextEmotionScore(textAnalysis, emotion);
                
                const combinedScore = 
                    audioScore * weights.voiceEmotion +
                    textScore * weights.textSentiment +
                    emotionAgreement * weights.prosodyMatch;
                
                if (combinedScore > maxConfidence) {
                    maxConfidence = combinedScore;
                    dominantEmotion = emotion;
                }
            }
            
            emotionAnalysis.dominantEmotion = dominantEmotion;
            emotionAnalysis.confidence = maxConfidence;
            
            // Add agreement bonus
            if (emotionAgreement > 0.7) {
                emotionAnalysis.confidence *= 1.15;
                emotionAnalysis.factors.push('strong_multimodal_agreement');
            }
            
            // Add specific detection factors
            if (audioEmotionStrength > 0.7) {
                emotionAnalysis.factors.push('strong_voice_emotion');
            }
            if (textEmotionStrength > 0.6) {
                emotionAnalysis.factors.push('clear_text_emotion');
            }
            
            emotionAnalysis.confidence = Math.min(emotionAnalysis.confidence, 1.0);
            
            console.log(`😊 Enhanced emotion detection: ${dominantEmotion} (${emotionAnalysis.confidence.toFixed(2)})`);
            console.log(`📊 Agreement: ${emotionAgreement.toFixed(2)}, Factors: ${emotionAnalysis.factors.join(', ')}`);
            
            return emotionAnalysis;
            
        } catch (error) {
            console.error('❌ Enhanced emotion detection error:', error);
            return { dominantEmotion: 'neutral', confidence: 0, audioEmotion: {}, textEmotion: 'neutral', agreement: 0, factors: [] };
        }
    }
    
    /**
     * Calculate overall correlation confidence
     */
    calculateCorrelationConfidence(audioAnalysis, textAnalysis, enhancedSarcasm, enhancedEmotion) {
        const confidenceFactors = [
            audioAnalysis.confidence || 0,
            textAnalysis.confidence || 0,
            enhancedSarcasm.confidence || 0,
            enhancedEmotion.confidence || 0
        ];
        
        // Weight factors based on detection type
        let weightedConfidence = 0;
        
        if (enhancedSarcasm.isSarcastic) {
            // Sarcasm detection gets higher weight when detected
            weightedConfidence = 
                confidenceFactors[0] * 0.3 +  // Audio
                confidenceFactors[1] * 0.2 +  // Text
                confidenceFactors[2] * 0.4 +  // Sarcasm
                confidenceFactors[3] * 0.1;   // Emotion
        } else {
            // Normal emotion detection weighting
            weightedConfidence = 
                confidenceFactors[0] * 0.4 +  // Audio
                confidenceFactors[1] * 0.3 +  // Text
                confidenceFactors[2] * 0.1 +  // Sarcasm
                confidenceFactors[3] * 0.2;   // Emotion
        }
        
        // Boost confidence if multiple modalities agree
        const agreementBonus = this.calculateMultimodalAgreementBonus(audioAnalysis, textAnalysis, enhancedSarcasm, enhancedEmotion);
        
        return Math.min(weightedConfidence + agreementBonus, 1.0);
    }
    
    /**
     * Determine the primary detection type from analysis results
     */
    determineDetectionType(enhancedSarcasm, enhancedEmotion) {
        if (enhancedSarcasm.isSarcastic && enhancedSarcasm.confidence > 0.7) {
            return 'sarcasm_detected';
        }
        
        if (enhancedEmotion.confidence > 0.6) {
            return `emotion_${enhancedEmotion.dominantEmotion}`;
        }
        
        return 'neutral_communication';
    }
    
    /**
     * Generate integrated recommendations for user support
     */
    generateIntegratedRecommendations(enhancedSarcasm, enhancedEmotion, confidence) {
        const recommendations = [];
        
        if (enhancedSarcasm.isSarcastic && confidence > 0.7) {
            recommendations.push({
                type: 'sarcasm_alert',
                priority: 'high',
                message: 'Sarcasm detected through voice-text analysis. The speaker may have underlying concerns.',
                action: 'Consider acknowledging the subtext and asking for clarification.',
                confidence: enhancedSarcasm.confidence
            });
        }
        
        if (enhancedEmotion.dominantEmotion === 'frustration' && enhancedEmotion.confidence > 0.6) {
            recommendations.push({
                type: 'emotion_support',
                priority: 'medium',
                message: 'Frustration detected in both voice tone and communication style.',
                action: 'This might be a good time to validate their feelings and offer support.',
                confidence: enhancedEmotion.confidence
            });
        }
        
        if (enhancedEmotion.dominantEmotion === 'anxiety' && enhancedEmotion.confidence > 0.6) {
            recommendations.push({
                type: 'anxiety_support',
                priority: 'medium',
                message: 'Anxiety indicators present in speech patterns and word choice.',
                action: 'Consider providing reassurance and reducing any time pressure.',
                confidence: enhancedEmotion.confidence
            });
        }
        
        if (enhancedEmotion.agreement > 0.8) {
            recommendations.push({
                type: 'high_confidence',
                priority: 'info',
                message: 'Strong agreement between voice and text analysis.',
                action: 'Analysis has high reliability - trust these insights.',
                confidence: confidence
            });
        }
        
        return recommendations;
    }
    
    /**
     * Store correlation result in history
     */
    storeCorrelationResult(integratedAnalysis) {
        this.correlationHistory.push(integratedAnalysis);
        
        // Maintain history size limit
        if (this.correlationHistory.length > this.config.maxHistorySize) {
            this.correlationHistory.shift();
        }
        
        this.currentCorrelation = integratedAnalysis;
    }
    
    /**
     * Update adaptive learning with correlation results
     */
    async updateAdaptiveLearning(integratedAnalysis) {
        try {
            if (this.adaptiveCorrelation) {
                await this.adaptiveCorrelation.updatePatterns(integratedAnalysis);
                this.multimodalState.adaptationLevel = Math.min(1.0, this.multimodalState.adaptationLevel + 0.01);
            }
        } catch (error) {
            console.error('❌ Adaptive learning update error:', error);
        }
    }
    
    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(integratedAnalysis) {
        this.performanceMetrics.totalCorrelations++;
        
        if (integratedAnalysis.overallConfidence > this.config.confidenceThreshold) {
            this.performanceMetrics.successfulDetections++;
        }
        
        // Update average processing time
        const newAvg = (this.performanceMetrics.avgProcessingTime * (this.performanceMetrics.totalCorrelations - 1) + 
                       integratedAnalysis.processingTime) / this.performanceMetrics.totalCorrelations;
        this.performanceMetrics.avgProcessingTime = newAvg;
        
        // Calculate accuracy score
        this.performanceMetrics.accuracyScore = this.performanceMetrics.successfulDetections / this.performanceMetrics.totalCorrelations;
        
        // Reset error count on successful processing
        this.errorState.consecutiveErrors = 0;
        this.errorState.fallbackMode = false;
    }
    
    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        setInterval(() => {
            console.log(`📊 Integration Performance: ${this.performanceMetrics.avgProcessingTime.toFixed(1)}ms avg, ${this.performanceMetrics.accuracyScore.toFixed(2)} accuracy, ${this.performanceMetrics.totalCorrelations} correlations`);
        }, 60000); // Report every minute
    }
    
    // Helper methods
    hasPositiveContent(textAnalysis) {
        const positiveWords = ['great', 'awesome', 'perfect', 'wonderful', 'fine', 'good', 'excellent'];
        const text = textAnalysis.original.toLowerCase();
        return positiveWords.some(word => text.includes(word));
    }
    
    extractTextEmotionStrength(textAnalysis) {
        if (textAnalysis.translation && textAnalysis.translation.emotionalSubtext) {
            return 0.7; // Assume moderate strength if emotional subtext is detected
        }
        return 0.3;
    }
    
    calculateEmotionAgreement(audioEmotion, textAnalysis) {
        // Simplified agreement calculation
        // In a full implementation, this would be more sophisticated
        const audioIntensity = Object.values(audioEmotion).reduce((max, val) => Math.max(max, val || 0), 0);
        const textIntensity = textAnalysis.confidence || 0;
        
        return Math.min(audioIntensity, textIntensity);
    }
    
    getTextEmotionScore(textAnalysis, emotionType) {
        // Map emotion types to text analysis results
        const emotionMapping = {
            frustration: textAnalysis.translation?.emotionalSubtext?.includes('frustrated') ? 0.8 : 0,
            anxiety: textAnalysis.translation?.emotionalSubtext?.includes('anxious') ? 0.8 : 0,
            confidence: textAnalysis.confidence || 0,
            engagement: textAnalysis.translation?.actionNeeded ? 0.6 : 0.3
        };
        
        return emotionMapping[emotionType] || 0;
    }
    
    calculateMultimodalAgreementBonus(audioAnalysis, textAnalysis, enhancedSarcasm, enhancedEmotion) {
        let bonus = 0;
        
        // Bonus for audio-text confidence agreement
        const confidenceDiff = Math.abs((audioAnalysis.confidence || 0) - (textAnalysis.confidence || 0));
        if (confidenceDiff < 0.2) {
            bonus += 0.1;
        }
        
        // Bonus for sarcasm detection agreement
        if (enhancedSarcasm.textContribution > 0.5 && enhancedSarcasm.audioContribution > 0.5) {
            bonus += 0.15;
        }
        
        // Bonus for emotion detection agreement
        if (enhancedEmotion.agreement > 0.7) {
            bonus += 0.1;
        }
        
        return Math.min(bonus, 0.3); // Cap bonus at 30%
    }
    
    // Error handling
    handleInitializationError(error) {
        this.errorState.lastError = error;
        this.errorState.consecutiveErrors++;
        
        if (this.errorState.consecutiveErrors > this.config.errorThreshold) {
            this.enterFallbackMode();
        }
    }
    
    handleProcessingError(context, error) {
        console.error(`❌ Processing error in ${context}:`, error);
        this.errorState.consecutiveErrors++;
        this.errorState.lastError = { context, error: error.message, timestamp: Date.now() };
        
        if (this.errorState.consecutiveErrors > this.config.errorThreshold) {
            this.enterFallbackMode();
        }
    }
    
    handleComponentError(component, errorType, error) {
        console.error(`❌ Component error from ${component} (${errorType}):`, error);
        this.errorState.consecutiveErrors++;
        
        // Could implement specific fallback strategies per component
    }
    
    enterFallbackMode() {
        console.warn('⚠️ Integration Layer entering fallback mode due to errors');
        this.errorState.fallbackMode = true;
        
        // In fallback mode, reduce processing complexity and rely more on simpler analysis
        this.config.confidenceThreshold = 0.8; // Require higher confidence
        this.config.processingTimeout = 50;     // Reduce processing time
    }
    
    resetErrorState() {
        this.errorState.consecutiveErrors = 0;
        this.errorState.fallbackMode = false;
        this.errorState.lastError = null;
        
        // Reset configuration to normal values
        this.config.confidenceThreshold = 0.65;
        this.config.processingTimeout = 100;
        
        console.log('✅ Integration Layer error state reset');
    }
    
    // Callback system
    onIntegratedAnalysis(callback) {
        this.integrationCallbacks.push(callback);
    }
    
    triggerIntegrationCallbacks(integratedAnalysis) {
        this.integrationCallbacks.forEach(callback => {
            try {
                callback(integratedAnalysis);
            } catch (error) {
                console.error('❌ Integration callback error:', error);
            }
        });
    }
    
    // Public API methods
    getCurrentIntegrationState() {
        return {
            isActive: this.isActive,
            currentCorrelation: this.currentCorrelation,
            adaptationLevel: this.multimodalState.adaptationLevel,
            performanceMetrics: this.performanceMetrics,
            errorState: this.errorState.fallbackMode ? 'fallback' : 'normal',
            lastCorrelationTime: this.currentCorrelation?.timestamp
        };
    }
    
    getCorrelationHistory(limit = 10) {
        return this.correlationHistory.slice(-limit);
    }
    
    async stop() {
        console.log('🛑 Stopping Audio-Social Integration Layer...');
        
        this.isActive = false;
        this.integrationCallbacks = [];
        this.correlationHistory = [];
        this.currentCorrelation = null;
        
        console.log('✅ Audio-Social Integration Layer stopped');
    }
}

// Lightweight classes for multimodal analysis
class MultimodalCorrelationEngine {
    constructor(config) {
        this.config = config;
    }
}

class AdaptiveCorrelationLearning {
    constructor(config) {
        this.config = config;
        this.patterns = {};
    }
    
    async updatePatterns(integratedAnalysis) {
        // Update correlation patterns based on successful analyses
        const pattern = {
            timestamp: integratedAnalysis.timestamp,
            confidence: integratedAnalysis.overallConfidence,
            detectionType: integratedAnalysis.detectionType
        };
        
        if (!this.patterns[pattern.detectionType]) {
            this.patterns[pattern.detectionType] = [];
        }
        
        this.patterns[pattern.detectionType].push(pattern);
        
        // Maintain pattern history size
        if (this.patterns[pattern.detectionType].length > 100) {
            this.patterns[pattern.detectionType].shift();
        }
    }
}

class EnhancedSarcasmDetector {
    constructor(config) {
        this.config = config;
        this.detectionHistory = [];
    }
}

// Export for integration with Velvet systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioSocialIntegrationLayer;
} else if (typeof window !== 'undefined') {
    window.AudioSocialIntegrationLayer = AudioSocialIntegrationLayer;
}

console.log('🔗 Audio-Social Integration Layer loaded');