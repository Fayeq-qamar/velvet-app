// VIRAL SOCIAL DECODER INTEGRATION - AI Personality & Voice Integration
// Connects the Viral Social Decoder with Velvet's AI personality and voice system
// Enables real-time social cue analysis during conversations

/**
 * ViralSocialDecoderIntegration
 * 
 * This integration layer connects the Viral Social Decoder with:
 * - AI Personality System (ai-secure.js) for context injection
 * - Voice System (voice-whisper.js) for transcript analysis
 * - Glass Orb UI for real-time visual feedback
 * - Meeting detection for automatic activation
 * 
 * Key Features:
 * - Auto-analyzes user speech during voice interactions
 * - Injects social context into AI responses
 * - Provides real-time social coaching during calls
 * - Creates viral "breakthrough moments" for users
 */

class ViralSocialDecoderIntegration {
    constructor() {
        console.log('🔗 Initializing Viral Social Decoder Integration...');
        
        this.isActive = false;
        this.viralDecoder = null;
        this.aiPersonality = null;
        this.voiceSystem = null;
        
        // Integration state
        this.lastTranscript = null;
        this.lastAnalysis = null;
        this.conversationMode = false;
        this.realTimeAnalysis = false;
        
        // Performance tracking
        this.integrationMetrics = {
            totalIntegrations: 0,
            aiEnhancements: 0,
            voiceAnalyses: 0,
            socialMoments: 0,
            averageLatency: 0
        };
        
        console.log('🔗 Viral Social Decoder Integration initialized');
    }
    
    /**
     * Initialize integration with all Velvet systems
     */
    async initialize() {
        try {
            console.log('🔗 Starting Viral Social Decoder Integration...');
            
            // Connect to Viral Social Decoder
            await this.connectViralDecoder();
            
            // Connect to AI Personality System
            await this.connectAIPersonality();
            
            // Connect to Voice System
            await this.connectVoiceSystem();
            
            // Set up real-time integration
            this.setupRealTimeIntegration();
            
            this.isActive = true;
            console.log('✅ 🔗 Viral Social Decoder Integration ACTIVE');
            console.log('🎯 Ready for AI-enhanced social decoding and real-time coaching');
            
            return true;
            
        } catch (error) {
            console.error('❌ Viral Social Decoder Integration failed:', error);
            return false;
        }
    }
    
    /**
     * Connect to the Viral Social Decoder system
     */
    async connectViralDecoder() {
        if (window.viralSocialDecoder) {
            this.viralDecoder = window.viralSocialDecoder;
            
            // Register for real-time analysis updates
            this.viralDecoder.onAnalysisComplete = (analysis) => {
                this.handleViralAnalysis(analysis);
            };
            
            console.log('✅ Connected to Viral Social Decoder');
        } else {
            throw new Error('Viral Social Decoder not available');
        }
    }
    
    /**
     * Connect to AI Personality System
     */
    async connectAIPersonality() {
        if (window.ai && window.ai.generateResponse) {
            this.aiPersonality = window.ai;
            
            // Wrap the original generateResponse to inject social context
            this.originalGenerateResponse = this.aiPersonality.generateResponse.bind(this.aiPersonality);
            this.aiPersonality.generateResponse = this.enhancedGenerateResponse.bind(this);
            
            console.log('✅ Connected to AI Personality System with social enhancement');
        } else {
            console.warn('⚠️ AI Personality System not available');
        }
    }
    
    /**
     * Connect to Voice System
     */
    async connectVoiceSystem() {
        // Look for voice system in global scope
        if (window.voiceWhisper || window.voice) {
            this.voiceSystem = window.voiceWhisper || window.voice;
            
            // Hook into transcript processing
            this.setupVoiceIntegration();
            
            console.log('✅ Connected to Voice System for transcript analysis');
        } else {
            console.warn('⚠️ Voice System not available');
        }
    }
    
    /**
     * Set up voice system integration for real-time analysis
     */
    setupVoiceIntegration() {
        // Listen for transcript events (if available)
        if (this.voiceSystem.onTranscript) {
            this.voiceSystem.onTranscript((transcript) => {
                this.analyzeTranscriptInRealTime(transcript);
            });
        }
        
        // Hook into existing voice processing (fallback)
        if (window.processTranscript) {
            this.originalProcessTranscript = window.processTranscript;
            window.processTranscript = (transcript) => {
                // Run original processing
                const result = this.originalProcessTranscript(transcript);
                
                // Add viral social decoder analysis
                this.analyzeTranscriptInRealTime(transcript);
                
                return result;
            };
        }
    }
    
    /**
     * Set up real-time integration monitoring
     */
    setupRealTimeIntegration() {
        // Monitor for conversation mode changes
        this.conversationModeInterval = setInterval(() => {
            this.updateConversationMode();
        }, 2000);
        
        // Performance monitoring
        this.metricsInterval = setInterval(() => {
            this.updateIntegrationMetrics();
        }, 10000);
        
        console.log('✅ Real-time integration monitoring active');
    }
    
    /**
     * Enhanced AI response generation with social context
     */
    async enhancedGenerateResponse(userMessage) {
        const startTime = performance.now();
        
        try {
            // First, analyze the user message for social cues
            const socialAnalysis = await this.analyzeUserMessage(userMessage);
            
            // Create enhanced context for AI
            const enhancedContext = this.createEnhancedContext(userMessage, socialAnalysis);
            
            // Generate AI response with social awareness
            const aiResponse = await this.originalGenerateResponse(enhancedContext);
            
            // Post-process response with social coaching if needed
            const finalResponse = this.postProcessWithSocialCoaching(aiResponse, socialAnalysis);
            
            // Update metrics
            this.integrationMetrics.aiEnhancements++;
            this.integrationMetrics.totalIntegrations++;
            
            const latency = performance.now() - startTime;
            this.updateLatencyMetrics(latency);
            
            return finalResponse;
            
        } catch (error) {
            console.error('❌ Enhanced AI response generation failed:', error);
            // Fallback to original AI response
            return await this.originalGenerateResponse(userMessage);
        }
    }
    
    /**
     * Analyze user message for social cues
     */
    async analyzeUserMessage(message) {
        if (!this.viralDecoder || !this.viralDecoder.isActive) {
            return null;
        }
        
        try {
            const analysis = await this.viralDecoder.analyzeText(message, {
                context: 'ai_conversation',
                realTime: true
            });
            
            return analysis;
            
        } catch (error) {
            console.error('❌ User message analysis failed:', error);
            return null;
        }
    }
    
    /**
     * Create enhanced context for AI with social awareness
     */
    createEnhancedContext(userMessage, socialAnalysis) {
        let enhancedMessage = userMessage;
        
        if (socialAnalysis && socialAnalysis.viralSocialDecoder) {
            const decoder = socialAnalysis.viralSocialDecoder;
            
            // Add social context to the AI prompt
            if (socialAnalysis.translation) {
                let socialContext = "\n\n[SOCIAL CONTEXT: ";
                
                if (socialAnalysis.translation.hiddenMeaning) {
                    socialContext += `User may be expressing sarcasm or frustration. Hidden meaning: "${socialAnalysis.translation.hiddenMeaning}". `;
                }
                
                if (socialAnalysis.translation.emotionalSubtext) {
                    socialContext += `Emotional subtext: ${socialAnalysis.translation.emotionalSubtext}. `;
                }
                
                if (socialAnalysis.translation.actionNeeded) {
                    socialContext += `Suggested approach: ${socialAnalysis.translation.actionNeeded}. `;
                }
                
                socialContext += `Confidence: ${Math.round((socialAnalysis.confidence || 0) * 100)}%]`;
                
                enhancedMessage += socialContext;
                
                console.log('🔗 Enhanced AI context with social awareness:', {
                    original: userMessage,
                    socialContext: socialContext.substring(0, 100) + '...',
                    confidence: socialAnalysis.confidence
                });
            }
        }
        
        return enhancedMessage;
    }
    
    /**
     * Post-process AI response with social coaching
     */
    postProcessWithSocialCoaching(aiResponse, socialAnalysis) {
        if (!socialAnalysis || !socialAnalysis.translation) {
            return aiResponse;
        }
        
        let enhancedResponse = aiResponse;
        
        // Add gentle social coaching if high-confidence detection
        if (socialAnalysis.confidence > 0.8) {
            const coaching = this.generateSocialCoaching(socialAnalysis);
            if (coaching) {
                enhancedResponse += `\n\n*${coaching}*`;
                
                console.log('🎭 Added social coaching to AI response:', {
                    confidence: socialAnalysis.confidence,
                    coaching: coaching
                });
            }
        }
        
        return enhancedResponse;
    }
    
    /**
     * Generate appropriate social coaching message
     */
    generateSocialCoaching(socialAnalysis) {
        if (!socialAnalysis.translation) return null;
        
        if (socialAnalysis.translation.hiddenMeaning) {
            return "I notice there might be some underlying concerns here. Feel free to share what's really on your mind - I'm here to help without judgment.";
        }
        
        if (socialAnalysis.translation.emotionalSubtext) {
            const emotion = socialAnalysis.translation.emotionalSubtext;
            
            if (emotion.includes('frustrated')) {
                return "It sounds like this might be feeling overwhelming. Let's break it down into smaller, manageable pieces.";
            } else if (emotion.includes('anxious')) {
                return "No pressure at all - we can take this at whatever pace feels comfortable for you.";
            } else if (emotion.includes('passive-aggressive')) {
                return "I want to make sure you feel heard. If there are concerns, I'm here to work through them together.";
            }
        }
        
        return null;
    }
    
    /**
     * Analyze transcript in real-time during voice interactions
     */
    async analyzeTranscriptInRealTime(transcript) {
        if (!this.viralDecoder || !transcript || transcript.length < 5) {
            return;
        }
        
        try {
            console.log('🔗 Real-time transcript analysis:', transcript.substring(0, 50) + '...');
            
            const analysis = await this.viralDecoder.analyzeText(transcript, {
                context: 'voice_interaction',
                realTime: true,
                timestamp: Date.now()
            });
            
            if (analysis) {
                this.lastTranscript = transcript;
                this.lastAnalysis = analysis;
                
                // Update metrics
                this.integrationMetrics.voiceAnalyses++;
                
                // Handle high-confidence detections
                if (analysis.confidence > 0.8) {
                    this.handleHighConfidenceDetection(analysis);
                }
                
                console.log('✅ Real-time analysis complete:', {
                    confidence: Math.round((analysis.confidence || 0) * 100) + '%',
                    sarcasm: analysis.translation?.hiddenMeaning ? 'YES' : 'NO',
                    emotion: analysis.translation?.emotionalSubtext || 'neutral'
                });
            }
            
        } catch (error) {
            console.error('❌ Real-time transcript analysis failed:', error);
        }
    }
    
    /**
     * Handle high-confidence social cue detections
     */
    handleHighConfidenceDetection(analysis) {
        this.integrationMetrics.socialMoments++;
        
        // Log viral moment
        console.log('🎉 HIGH CONFIDENCE SOCIAL DETECTION:', {
            type: analysis.translation?.hiddenMeaning ? 'sarcasm' : 'emotion',
            confidence: Math.round((analysis.confidence || 0) * 100) + '%',
            original: analysis.original?.substring(0, 50) + '...'
        });
        
        // Update glass orb visual state
        this.updateOrbForSocialDetection(analysis);
        
        // Trigger intervention if in meeting mode
        if (this.viralDecoder.isMeetingMode) {
            this.triggerMeetingIntervention(analysis);
        }
    }
    
    /**
     * Update glass orb visual state for social detection
     */
    updateOrbForSocialDetection(analysis) {
        const orb = document.querySelector('.velvet-orb');
        if (!orb) return;
        
        // Add social detection ring
        let socialRing = orb.querySelector('.social-detection-ring');
        if (!socialRing) {
            socialRing = document.createElement('div');
            socialRing.className = 'social-detection-ring';
            socialRing.style.cssText = `
                position: absolute;
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                border-radius: 50%;
                border: 3px solid transparent;
                transition: all 0.5s ease;
                pointer-events: none;
            `;
            orb.appendChild(socialRing);
        }
        
        // Determine ring color based on detection type
        let ringColor = '#3b82f6'; // Default blue
        if (analysis.translation?.hiddenMeaning) {
            ringColor = '#ef4444'; // Red for sarcasm
        } else if (analysis.translation?.emotionalSubtext) {
            if (analysis.translation.emotionalSubtext.includes('frustrated')) {
                ringColor = '#f59e0b'; // Orange for frustration
            } else if (analysis.translation.emotionalSubtext.includes('anxious')) {
                ringColor = '#a855f7'; // Purple for anxiety
            }
        }
        
        // Animate the ring
        socialRing.style.borderColor = ringColor;
        socialRing.style.opacity = '1';
        socialRing.style.boxShadow = `0 0 20px ${ringColor}60`;
        
        // Fade out after 3 seconds
        setTimeout(() => {
            socialRing.style.opacity = '0';
            socialRing.style.borderColor = 'transparent';
            socialRing.style.boxShadow = 'none';
        }, 3000);
    }
    
    /**
     * Trigger meeting intervention for social detection
     */
    triggerMeetingIntervention(analysis) {
        // This would trigger the viral decoder's intervention system
        if (this.viralDecoder.triggerLiveIntervention) {
            const intervention = {
                type: analysis.translation?.hiddenMeaning ? 'sarcasm' : 'emotion',
                confidence: analysis.confidence,
                message: this.generateInterventionMessage(analysis),
                timestamp: Date.now()
            };
            
            this.viralDecoder.triggerLiveIntervention(intervention, analysis);
        }
    }
    
    /**
     * Generate intervention message for meeting context
     */
    generateInterventionMessage(analysis) {
        if (analysis.translation?.hiddenMeaning) {
            return `🎭 Sarcasm detected: They likely mean "${analysis.translation.hiddenMeaning}"`;
        }
        
        if (analysis.translation?.emotionalSubtext) {
            return `😊 Emotional context: ${analysis.translation.emotionalSubtext}`;
        }
        
        return '🎭 Social cue detected - consider the underlying meaning';
    }
    
    /**
     * Update conversation mode based on system state
     */
    updateConversationMode() {
        const wasInConversationMode = this.conversationMode;
        
        // Check if we're in an active conversation
        this.conversationMode = 
            (this.viralDecoder && this.viralDecoder.isMeetingMode) ||
            (this.voiceSystem && this.voiceSystem.isActive) ||
            (window.isVoiceActive === true);
        
        // Update real-time analysis based on conversation mode
        if (this.conversationMode !== wasInConversationMode) {
            if (this.conversationMode) {
                console.log('🔗 Entering conversation mode - enhanced social analysis active');
                this.realTimeAnalysis = true;
            } else {
                console.log('🔗 Exiting conversation mode - standard analysis mode');
                this.realTimeAnalysis = false;
            }
        }
    }
    
    /**
     * Update integration performance metrics
     */
    updateIntegrationMetrics() {
        console.log('📊 Viral Social Decoder Integration Metrics:', {
            ...this.integrationMetrics,
            conversationMode: this.conversationMode,
            realTimeAnalysis: this.realTimeAnalysis,
            sessionDuration: Math.round((Date.now() - (this.sessionStart || Date.now())) / 1000 / 60) + 'm'
        });
    }
    
    /**
     * Update latency metrics
     */
    updateLatencyMetrics(latency) {
        this.integrationMetrics.averageLatency = 
            (this.integrationMetrics.averageLatency + latency) / 2;
    }
    
    /**
     * Get integration status for debugging
     */
    getIntegrationStatus() {
        return {
            isActive: this.isActive,
            conversationMode: this.conversationMode,
            realTimeAnalysis: this.realTimeAnalysis,
            
            // System connections
            viralDecoder: !!this.viralDecoder,
            aiPersonality: !!this.aiPersonality,
            voiceSystem: !!this.voiceSystem,
            
            // Performance
            metrics: this.integrationMetrics,
            
            // Recent state
            lastTranscript: this.lastTranscript?.substring(0, 50) + '...',
            lastAnalysis: this.lastAnalysis ? {
                confidence: this.lastAnalysis.confidence,
                timestamp: this.lastAnalysis.timestamp
            } : null
        };
    }
    
    /**
     * Shutdown integration system
     */
    async shutdown() {
        console.log('🛑 Shutting down Viral Social Decoder Integration...');
        
        try {
            // Stop intervals
            if (this.conversationModeInterval) clearInterval(this.conversationModeInterval);
            if (this.metricsInterval) clearInterval(this.metricsInterval);
            
            // Restore original functions
            if (this.aiPersonality && this.originalGenerateResponse) {
                this.aiPersonality.generateResponse = this.originalGenerateResponse;
            }
            
            if (this.originalProcessTranscript) {
                window.processTranscript = this.originalProcessTranscript;
            }
            
            this.isActive = false;
            console.log('✅ Viral Social Decoder Integration shutdown complete');
            
        } catch (error) {
            console.error('❌ Integration shutdown error:', error);
        }
    }
}

// Export for use in Velvet systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViralSocialDecoderIntegration;
} else if (typeof window !== 'undefined') {
    window.ViralSocialDecoderIntegration = ViralSocialDecoderIntegration;
}

// Auto-initialize integration when systems are ready
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(async () => {
            if (window.viralSocialDecoder && window.viralSocialDecoder.isActive) {
                console.log('🔗 Auto-initializing Viral Social Decoder Integration...');
                
                window.viralSocialDecoderIntegration = new ViralSocialDecoderIntegration();
                const initialized = await window.viralSocialDecoderIntegration.initialize();
                
                if (initialized) {
                    console.log('✅ 🔗 Viral Social Decoder Integration auto-initialized successfully');
                } else {
                    console.warn('⚠️ Auto-initialization failed - manual initialization available');
                }
            }
        }, 3000); // Wait for other systems to initialize
    });
}

console.log('🔗 Viral Social Decoder Integration system loaded');