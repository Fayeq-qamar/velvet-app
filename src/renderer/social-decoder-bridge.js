// Social Decoder Bridge - JavaScript Integration
// Simpler JavaScript version to connect with existing Velvet system

class SocialDecoderBridge {
    constructor() {
        this.isInitialized = false;
        this.textAnalysisCallbacks = [];
        this.sarcasmMarkers = [
            'fine', 'sure', 'whatever', 'great', 'perfect', 'wonderful',
            'obviously', 'totally', 'absolutely', 'definitely'
        ];
        this.tonePatterns = {
            frustration: ['fine', 'whatever', 'sure'],
            anxiety: ['maybe', 'i guess', 'sort of', 'kind of'],
            passive_aggressive: ['no problem', 'of course', 'my pleasure']
        };
        this.analysisHistory = [];
        this.metrics = {
            sessionStart: Date.now(),
            totalDetections: 0,
            sarcasmDetections: 0,
            emotionDetections: 0,
            averageConfidence: 0
        };
    }

    // Initialize the Social Decoder system
    async initialize() {
        try {
            console.log('🌉 Initializing Social Decoder Bridge (JavaScript version)...');

            // Connect to existing Velvet systems
            this.connectToVelvetSystems();

            // Set up text monitoring
            this.setupTextMonitoring();

            this.isInitialized = true;
            console.log('✅ Social Decoder Bridge initialized successfully');
            return true;

        } catch (error) {
            console.error('❌ Social Decoder Bridge initialization failed:', error);
            return false;
        }
    }

    // Connect to existing Velvet systems
    connectToVelvetSystems() {
        // Connect to existing screen OCR if available
        if (window.screenOCRMonitorReal) {
            console.log('🔗 Connecting to existing Screen OCR system');
            this.bridgeScreenOCR();
        }

        // Connect to existing AI chat system
        this.connectToAIChat();

        // Make globally available
        window.socialDecoderBridge = this;
    }

    // Bridge existing screen OCR to social decoder
    bridgeScreenOCR() {
        // Monitor screen text changes
        setInterval(() => {
            try {
                if (window.screenOCRMonitorReal?.currentText) {
                    const text = window.screenOCRMonitorReal.currentText;
                    if (text && text.length > 5 && text !== this.lastAnalyzedText) {
                        this.lastAnalyzedText = text;
                        this.analyzeTextForSocialCues(text);
                    }
                }
            } catch (error) {
                console.error('Social Decoder OCR bridge error:', error);
            }
        }, 3000); // Check every 3 seconds
    }

    // Connect to existing AI chat system
    connectToAIChat() {
        // Extend existing AI with social decoder insights
        if (window.getVelvetResponse) {
            const originalGetVelvetResponse = window.getVelvetResponse;
            
            // Wrap the AI response function to include social context
            window.getVelvetResponse = async (message, options) => {
                // Add social decoder analysis to the context
                const socialContext = this.analysisHistory.slice(-3); // Last 3 analyses
                
                if (socialContext.length > 0) {
                    const socialInsights = socialContext.map(analysis => {
                        let insight = `Detected: ${analysis.text}`;
                        if (analysis.isSarcasm) insight += ` (sarcastic)`;
                        if (analysis.detectedEmotion) insight += ` (${analysis.detectedEmotion})`;
                        return insight;
                    }).join('; ');
                    
                    // Add social context to the message
                    const enhancedMessage = `${message}\n\n[Social Context: ${socialInsights}]`;
                    return await originalGetVelvetResponse(enhancedMessage, options);
                }
                
                return await originalGetVelvetResponse(message, options);
            };
        }
    }

    // Set up text monitoring
    setupTextMonitoring() {
        // Monitor user input for social cues
        document.addEventListener('keyup', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                const text = e.target.value;
                if (text.length > 5) {
                    this.analyzeTextForSocialCues(text);
                }
            }
        });
    }

    // Analyze text for social cues and sarcasm
    analyzeTextForSocialCues(text) {
        try {
            const startTime = performance.now();
            
            // Basic sarcasm detection
            const isSarcasm = this.detectSarcasm(text);
            const detectedEmotion = this.detectEmotion(text);
            const confidence = this.calculateConfidence(text, isSarcasm, detectedEmotion);
            
            const analysis = {
                text: text,
                isSarcasm: isSarcasm,
                detectedEmotion: detectedEmotion,
                confidence: confidence,
                timestamp: Date.now(),
                subtext: isSarcasm ? this.generateSubtext(text) : undefined,
                processingTime: performance.now() - startTime
            };
            
            // Update metrics
            this.updateMetrics(analysis);
            
            // Add to history
            this.analysisHistory.push(analysis);
            if (this.analysisHistory.length > 20) {
                this.analysisHistory = this.analysisHistory.slice(-20);
            }
            
            // Show insights if significant
            if (isSarcasm || detectedEmotion) {
                this.showSocialInsight(analysis);
            }
            
            // Trigger callbacks
            this.textAnalysisCallbacks.forEach(callback => callback(analysis));
            
            return analysis;
        } catch (error) {
            console.error('Social Decoder analysis error:', error);
            return null;
        }
    }

    // Detect sarcasm in text
    detectSarcasm(text) {
        const lowerText = text.toLowerCase();
        
        // Check for sarcasm markers
        const sarcasmCount = this.sarcasmMarkers.filter(marker => 
            lowerText.includes(marker)
        ).length;
        
        // Check for contradictory patterns
        const hasExcessivePositivity = /\b(amazing|wonderful|perfect|fantastic)\b/i.test(text);
        const hasNegativeContext = /\b(sure|fine|whatever|obviously)\b/i.test(text);
        
        return sarcasmCount >= 2 || (hasExcessivePositivity && hasNegativeContext);
    }

    // Detect emotional tone in text
    detectEmotion(text) {
        const lowerText = text.toLowerCase();
        
        for (const [emotion, keywords] of Object.entries(this.tonePatterns)) {
            const keywordMatches = keywords.filter(keyword => 
                lowerText.includes(keyword)
            ).length;
            
            if (keywordMatches >= 1) {
                return emotion;
            }
        }
        
        return undefined;
    }

    // Calculate confidence score
    calculateConfidence(text, isSarcasm, emotion) {
        let confidence = 0.5; // Base confidence
        
        // Increase confidence based on markers
        if (isSarcasm) confidence += 0.3;
        if (emotion) confidence += 0.2;
        if (text.length > 10) confidence += 0.1;
        
        return Math.min(1.0, confidence);
    }

    // Generate subtext for sarcastic statements
    generateSubtext(text) {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('fine')) return 'Not actually fine, probably frustrated';
        if (lowerText.includes('sure')) return 'Reluctant agreement or passive resistance';
        if (lowerText.includes('whatever')) return 'Dismissive, doesn\'t want to engage';
        if (lowerText.includes('great')) return 'Likely being sarcastic, not actually great';
        
        return 'Likely sarcastic - actual meaning may be opposite';
    }

    // Update metrics
    updateMetrics(analysis) {
        this.metrics.totalDetections++;
        
        if (analysis.isSarcasm) {
            this.metrics.sarcasmDetections++;
        }
        
        if (analysis.detectedEmotion) {
            this.metrics.emotionDetections++;
        }
        
        // Calculate new average confidence
        const totalConfidence = (this.metrics.averageConfidence * (this.metrics.totalDetections - 1)) + analysis.confidence;
        this.metrics.averageConfidence = totalConfidence / this.metrics.totalDetections;
    }

    // Show social insight to user
    showSocialInsight(analysis) {
        console.log('🧠 Social Decoder Insight:', {
            text: analysis.text.substring(0, 50) + '...',
            isSarcasm: analysis.isSarcasm,
            emotion: analysis.detectedEmotion,
            subtext: analysis.subtext,
            confidence: Math.round(analysis.confidence * 100) + '%'
        });

        // Could add visual notifications here in the future
        if (analysis.isSarcasm && analysis.confidence > 0.7) {
            // High confidence sarcasm detected
            this.showNotification('Sarcasm detected: ' + (analysis.subtext || 'Likely sarcastic'));
        }
    }

    // Show notification (placeholder for future UI integration)
    showNotification(message) {
        // For now, just console log
        console.log('📢 Social Decoder:', message);
        
        // Future: Could integrate with Velvet's notification system
        if (window.showVelvetNotification) {
            window.showVelvetNotification(message, 'social-decoder');
        }
    }

    // Public methods for external use
    onDetection(callback) {
        this.textAnalysisCallbacks.push(callback);
    }

    getMetrics() {
        return { ...this.metrics };
    }

    getHistory() {
        return [...this.analysisHistory];
    }

    // Test method for manual testing
    testAnalysis(text) {
        console.log('🧪 Testing Social Decoder with:', text);
        const result = this.analyzeTextForSocialCues(text);
        console.log('Result:', result);
        return result;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSocialDecoder);
} else {
    initializeSocialDecoder();
}

function initializeSocialDecoder() {
    // Small delay to ensure other systems are ready
    setTimeout(() => {
        window.socialDecoderBridge = new SocialDecoderBridge();
        window.socialDecoderBridge.initialize().then(success => {
            if (success) {
                console.log('🎉 Social Decoder ready! Try: socialDecoderBridge.testAnalysis("Sure, that sounds great")');
            }
        });
    }, 2000);
}