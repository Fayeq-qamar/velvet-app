// Velvet Social Decoder System - Phase 2 Viral Feature
// "NeuroTranslator++" - Real-time neurotypical communication translation

class SocialDecoder {
    constructor() {
        this.isActive = false;
        this.audioAnalyzer = null;
        this.conversationHistory = [];
        this.emotionalContext = {};
        this.detectionCallbacks = [];
        
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
        // Hook into existing audio monitoring system
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

    // Main analysis function - called when new audio/transcript is received
    analyzeConversation(transcript, audioData, speakerInfo = {}) {
        if (!this.isActive) return null;

        try {
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

            const result = {
                timestamp: Date.now(),
                original: transcript,
                translation: translation,
                suggestions: suggestions,
                confidence: this.calculateConfidence(sarcasmAnalysis, emotionalAnalysis, clarityAnalysis)
            };

            // Store in conversation history
            this.conversationHistory.push(result);
            
            // Trigger callbacks for UI updates
            this.triggerDetectionCallbacks(result);
            
            return result;

        } catch (error) {
            console.error('❌ Social Decoder analysis failed:', error);
            return null;
        }
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
        // This would integrate with audio analysis pipeline
        // For now, simulate based on text patterns
        
        const positiveWords = ['great', 'awesome', 'perfect', 'wonderful', 'fine'];
        const hasPositiveWords = positiveWords.some(word => text.toLowerCase().includes(word));
        
        // Simulate tone analysis - in real implementation, this would use audio processing
        const simulatedToneFlat = text.length < 10 || text.includes('.');
        const simulatedStress = text.includes('!') || text.toUpperCase() === text;
        
        let mismatch = 0;
        if (hasPositiveWords && simulatedToneFlat) {
            mismatch = 0.8; // Positive words with flat delivery = likely sarcasm
        }
        
        return { mismatch, indicators: { flat: simulatedToneFlat, stressed: simulatedStress } };
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

    // Trigger all registered callbacks
    triggerDetectionCallbacks(analysis) {
        this.detectionCallbacks.forEach(callback => {
            try {
                callback(analysis);
            } catch (error) {
                console.error('❌ Social Decoder callback error:', error);
            }
        });
    }

    // Get conversation history for context
    getConversationHistory() {
        return this.conversationHistory;
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

    // Deactivate the Social Decoder
    deactivate() {
        this.isActive = false;
        this.detectionCallbacks = [];
        console.log('🧠 Social Decoder System deactivated');
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