// Communication Style Tracker - Advanced Masking Detection Component
// Tracks formal vs casual language patterns for masking fatigue detection
// Integrates with Enhanced Social Decoder for sophisticated analysis

/**
 * CommunicationStyleTracker
 * 
 * Sophisticated analysis system for detecting masking behaviors through communication patterns.
 * Tracks the shift from authentic casual communication to performative formal communication.
 * 
 * Key Detection Patterns:
 * - Language formality shifts (casual "yeah" → formal "yes, absolutely")
 * - Response calculation patterns (immediate → measured responses)
 * - Emotional dampening (natural expression → controlled presentation)
 * - Energy signature changes (relaxed → heightened alertness)
 * 
 * Viral User Experience:
 * - Real-time masking level awareness
 * - "You're switching to professional mode" insights
 * - "I can see you calculating your words" validation
 * - "Your authentic voice is beautiful" celebrations
 */

class CommunicationStyleTracker {
    constructor() {
        console.log('💬 Initializing Communication Style Tracker...');
        
        // Core tracking state
        this.isActive = false;
        this.baselineEstablished = false;
        this.communicationSamples = [];
        this.styleBaselines = {
            formality: 0.3,      // Baseline formality level
            emotionality: 0.7,   // Baseline emotional expression
            complexity: 0.5,     // Baseline sentence complexity
            immediacy: 0.8       // Baseline response immediacy
        };
        
        // Advanced linguistic analysis patterns
        this.linguisticPatterns = {
            // Formal language indicators (higher = more masked)
            formalityMarkers: {
                high: [
                    'certainly', 'absolutely', 'precisely', 'indeed', 'furthermore',
                    'however', 'nevertheless', 'accordingly', 'consequently', 'therefore',
                    'I would like to', 'I appreciate', 'if you could', 'I understand that',
                    'please let me know', 'thank you for', 'I apologize for'
                ],
                medium: [
                    'please', 'thank you', 'sure', 'of course', 'no problem',
                    'I think', 'perhaps', 'possibly', 'definitely', 'probably'
                ],
                low: [
                    'yeah', 'yep', 'nah', 'cool', 'awesome', 'hey', 'sup',
                    'gonna', 'wanna', 'kinda', 'sorta', 'totally'
                ]
            },
            
            // Emotional expression indicators (lower = more suppressed)
            emotionalMarkers: {
                high: [
                    'love', 'hate', 'amazing', 'terrible', 'fantastic', 'awful',
                    'excited', 'devastated', 'thrilled', 'horrified', 'obsessed',
                    '!!', '!!!', 'omg', 'wow', 'wtf', 'lol', 'haha'
                ],
                medium: [
                    'like', 'dislike', 'good', 'bad', 'nice', 'okay',
                    'happy', 'sad', 'glad', 'disappointed', 'interested'
                ],
                low: [
                    'fine', 'alright', 'decent', 'adequate', 'satisfactory',
                    'appropriate', 'reasonable', 'acceptable'
                ]
            },
            
            // Authenticity vs performance markers
            authenticityMarkers: {
                authentic: [
                    'honestly', 'tbh', 'for real', 'seriously', 'literally',
                    'I mean', 'you know', 'like seriously', 'I swear',
                    'no joke', 'real talk', 'I'm not gonna lie'
                ],
                performative: [
                    'as I mentioned', 'to clarify', 'in my opinion', 'from my perspective',
                    'I believe that', 'it is my understanding', 'if I may suggest',
                    'I would recommend', 'it would be appropriate'
                ]
            },
            
            // Energy signature indicators
            energyMarkers: {
                relaxed: [
                    'chill', 'easy', 'whatever', 'no worries', 'all good',
                    'take your time', 'no rush', 'when you can'
                ],
                tense: [
                    'urgent', 'asap', 'quickly', 'immediately', 'deadline',
                    'pressed for time', 'running behind', 'stressed'
                ]
            },
            
            // Hedging and uncertainty (increases with masking)
            hedgingMarkers: [
                'maybe', 'perhaps', 'possibly', 'I think', 'I guess',
                'sort of', 'kind of', 'somewhat', 'rather', 'quite',
                'I suppose', 'I imagine', 'I would say'
            ],
            
            // Overcompensation markers (trying too hard to sound natural)
            overcompensationMarkers: [
                'totally get it', 'absolutely love', 'completely understand',
                'really excited', 'super happy', 'really appreciate',
                'definitely interested', 'absolutely perfect'
            ]
        };
        
        // Response timing analysis
        this.timingAnalysis = {
            responseStarts: new Map(), // Track when user starts typing
            responseCompletes: new Map(), // Track when user sends message
            typingPatterns: [],
            calculatedResponseThreshold: 3000, // 3 seconds = calculated response
            immediateResponseThreshold: 1000   // <1 second = immediate response
        };
        
        // Advanced pattern detection
        this.patternDetection = {
            // Detect shift from casual to formal
            formalityShift: {
                threshold: 0.3,  // 30% increase in formality triggers detection
                windowSize: 5,   // Compare last 5 messages
                currentTrend: 'stable'
            },
            
            // Detect emotional suppression
            emotionalSuppression: {
                threshold: 0.4,  // 40% decrease in emotion triggers detection
                windowSize: 5,
                currentTrend: 'stable'
            },
            
            // Detect response calculation patterns
            responseCalculation: {
                thresholdIncrease: 2000, // 2 second increase in response time
                windowSize: 3,
                currentTrend: 'stable'
            },
            
            // Detect overcompensation behaviors
            overcompensation: {
                threshold: 0.3,
                windowSize: 3,
                currentLevel: 0
            }
        };
        
        // Masking behavior classifications
        this.maskingBehaviors = {
            'professional_polish': {
                indicators: ['formal language', 'calculated responses', 'emotional restraint'],
                message: "Switching to professional mode - your authentic voice is important too"
            },
            'people_pleasing': {
                indicators: ['overcompensation', 'excessive hedging', 'self-minimization'],
                message: "I notice you adjusting your words for others - your first instinct is valid"
            },
            'emotional_dampening': {
                indicators: ['reduced emotion', 'neutral language', 'safety phrases'],
                message: "Your feelings are being filtered - it's safe to express yourself here"
            },
            'hypervigilance': {
                indicators: ['over-explanation', 'preemptive clarification', 'anxiety phrases'],
                message: "You're working hard to be understood - your communication is already clear"
            },
            'authentic_expression': {
                indicators: ['natural language', 'immediate responses', 'emotional presence'],
                message: "This is your authentic voice - it's beautiful to witness"
            }
        };
        
        // Integration points
        this.integrations = {
            socialDecoder: null,
            maskingDetector: null,
            aiPersonality: null
        };
        
        // Performance metrics
        this.metrics = {
            totalAnalyses: 0,
            maskingDetections: 0,
            authenticityMoments: 0,
            styleShifts: 0,
            baselineUpdates: 0
        };
        
        console.log('✅ Communication Style Tracker initialized');
    }
    
    /**
     * Initialize the communication style tracker
     */
    async initialize() {
        try {
            console.log('💬 Starting Communication Style Tracker...');
            
            // Connect to existing systems
            await this.connectToSystems();
            
            // Initialize linguistic analysis
            this.initializeLinguisticAnalysis();
            
            // Set up timing analysis
            this.initializeTimingAnalysis();
            
            // Start pattern detection
            this.initializePatternDetection();
            
            // Begin baseline establishment
            this.startBaselineEstablishment();
            
            this.isActive = true;
            console.log('✅ Communication Style Tracker active and monitoring');
            
            return true;
            
        } catch (error) {
            console.error('❌ Communication Style Tracker initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Connect to existing Velvet systems
     */
    async connectToSystems() {
        console.log('🔗 Connecting to Velvet systems...');
        
        // Connect to Enhanced Social Decoder
        if (window.socialDecoder || window.EnhancedSocialDecoder) {
            this.integrations.socialDecoder = window.socialDecoder || window.EnhancedSocialDecoder;
            
            // Register for communication analysis events
            if (this.integrations.socialDecoder.onSocialCueDetected) {
                this.integrations.socialDecoder.onSocialCueDetected((analysis) => {
                    this.analyzeCommunicationStyle(analysis);
                });
            }
            
            console.log('✅ Connected to Social Decoder');
        }
        
        // Connect to Masking Fatigue Detector
        if (window.maskingFatigueDetector) {
            this.integrations.maskingDetector = window.maskingFatigueDetector;
            console.log('✅ Connected to Masking Fatigue Detector');
        }
        
        // Connect to AI Personality
        if (window.velvetAI) {
            this.integrations.aiPersonality = window.velvetAI;
            console.log('✅ Connected to AI Personality');
        }
    }
    
    /**
     * Initialize linguistic analysis capabilities
     */
    initializeLinguisticAnalysis() {
        this.linguisticAnalyzer = {
            // Analyze formality level of text
            analyzeFormality: (text) => {
                return this.calculateFormalityScore(text);
            },
            
            // Analyze emotional expression level
            analyzeEmotionality: (text) => {
                return this.calculateEmotionalScore(text);
            },
            
            // Analyze authenticity vs performance
            analyzeAuthenticity: (text) => {
                return this.calculateAuthenticityScore(text);
            },
            
            // Analyze complexity and calculation
            analyzeComplexity: (text) => {
                return this.calculateComplexityScore(text);
            },
            
            // Detect specific masking behaviors
            detectMaskingBehaviors: (text, context) => {
                return this.identifyMaskingPatterns(text, context);
            }
        };
        
        console.log('🧠 Linguistic analysis initialized');
    }
    
    /**
     * Initialize timing analysis for response patterns
     */
    initializeTimingAnalysis() {
        this.timingAnalyzer = {
            // Start tracking response time
            startResponseTiming: (conversationId) => {
                this.timingAnalysis.responseStarts.set(conversationId, Date.now());
            },
            
            // Complete response timing analysis
            completeResponseTiming: (conversationId, messageLength) => {
                const startTime = this.timingAnalysis.responseStarts.get(conversationId);
                if (startTime) {
                    const responseTime = Date.now() - startTime;
                    this.analyzeResponseTiming(responseTime, messageLength);
                    this.timingAnalysis.responseStarts.delete(conversationId);
                }
            },
            
            // Analyze typing patterns
            analyzeTypingPattern: (text, responseTime) => {
                return this.assessTypingBehavior(text, responseTime);
            }
        };
        
        console.log('⏱️ Timing analysis initialized');
    }
    
    /**
     * Initialize pattern detection algorithms
     */
    initializePatternDetection() {
        this.patternDetector = {
            // Detect formality shifts
            detectFormalityShift: () => {
                return this.analyzeFormalityTrend();
            },
            
            // Detect emotional suppression
            detectEmotionalSuppression: () => {
                return this.analyzeEmotionalTrend();
            },
            
            // Detect response calculation patterns
            detectResponseCalculation: () => {
                return this.analyzeResponseTimingTrend();
            },
            
            // Detect overcompensation behaviors
            detectOvercompensation: () => {
                return this.analyzeOvercompensationLevel();
            }
        };
        
        console.log('🔍 Pattern detection initialized');
    }
    
    /**
     * Start establishing communication baselines
     */
    startBaselineEstablishment() {
        console.log('📊 Starting baseline establishment...');
        
        // Baseline will be established over first 10-15 interactions
        this.baselineEstablishment = {
            samplesNeeded: 12,
            currentSamples: 0,
            isEstablishing: true
        };
    }
    
    /**
     * Main analysis function for communication style
     */
    analyzeCommunicationStyle(analysisData) {
        try {
            if (!this.isActive || !analysisData || !analysisData.original) return;
            
            const text = analysisData.original;
            const timestamp = Date.now();
            
            // Perform linguistic analysis
            const formalityScore = this.linguisticAnalyzer.analyzeFormality(text);
            const emotionalityScore = this.linguisticAnalyzer.analyzeEmotionality(text);
            const authenticityScore = this.linguisticAnalyzer.analyzeAuthenticity(text);
            const complexityScore = this.linguisticAnalyzer.analyzeComplexity(text);
            
            // Create communication sample
            const communicationSample = {
                timestamp: timestamp,
                text: text.substring(0, 200), // Store sample for pattern analysis
                analysis: {
                    formality: formalityScore,
                    emotionality: emotionalityScore,
                    authenticity: authenticityScore,
                    complexity: complexityScore
                },
                context: this.getCurrentContext(),
                originalAnalysis: analysisData
            };
            
            // Add to samples
            this.communicationSamples.push(communicationSample);
            this.maintainSampleHistory();
            
            // Update baselines if still establishing
            if (this.baselineEstablishment.isEstablishing) {
                this.updateBaselines(communicationSample);
            }
            
            // Detect masking behaviors
            const maskingBehaviors = this.linguisticAnalyzer.detectMaskingBehaviors(text, communicationSample.context);
            
            // Analyze patterns and trends
            const patternAnalysis = this.analyzeCurrentPatterns();
            
            // Calculate overall masking level from communication style
            const communicationMaskingLevel = this.calculateCommunicationMaskingLevel(communicationSample);
            
            // Create comprehensive analysis result
            const styleAnalysis = {
                timestamp: timestamp,
                sample: communicationSample,
                maskingBehaviors: maskingBehaviors,
                patternAnalysis: patternAnalysis,
                maskingLevel: communicationMaskingLevel,
                trendAnalysis: this.analyzeTrends(),
                insights: this.generateInsights(communicationSample, maskingBehaviors)
            };
            
            // Emit style analysis event
            this.emit('communicationStyleAnalyzed', styleAnalysis);
            
            // Check for significant style shifts
            const styleShift = this.detectSignificantStyleShift(styleAnalysis);
            if (styleShift) {
                this.handleStyleShift(styleShift);
            }
            
            // Update metrics
            this.metrics.totalAnalyses++;
            if (communicationMaskingLevel > 0.6) this.metrics.maskingDetections++;
            if (communicationMaskingLevel < 0.3) this.metrics.authenticityMoments++;
            
        } catch (error) {
            console.error('❌ Communication style analysis failed:', error);
        }
    }
    
    /**
     * Calculate formality score from text
     */
    calculateFormalityScore(text) {
        const textLower = text.toLowerCase();
        let formalityScore = 0;
        let totalMarkers = 0;
        
        // Count formal markers
        this.linguisticPatterns.formalityMarkers.high.forEach(marker => {
            if (textLower.includes(marker)) {
                formalityScore += 1.0;
                totalMarkers++;
            }
        });
        
        this.linguisticPatterns.formalityMarkers.medium.forEach(marker => {
            if (textLower.includes(marker)) {
                formalityScore += 0.6;
                totalMarkers++;
            }
        });
        
        this.linguisticPatterns.formalityMarkers.low.forEach(marker => {
            if (textLower.includes(marker)) {
                formalityScore += 0.2;
                totalMarkers++;
            }
        });
        
        // Analyze sentence structure
        const avgSentenceLength = text.split(/[.!?]/).reduce((sum, sentence) => 
            sum + sentence.trim().split(' ').length, 0) / text.split(/[.!?]/).length || 1;
        
        if (avgSentenceLength > 15) formalityScore += 0.3;
        if (avgSentenceLength > 25) formalityScore += 0.2;
        
        // Check for formal punctuation patterns
        if (text.includes(';') || text.includes(':')) formalityScore += 0.2;
        
        // Normalize score
        return totalMarkers > 0 ? Math.min(1.0, formalityScore / (totalMarkers + 1)) : 0.5;
    }
    
    /**
     * Calculate emotional expression score from text
     */
    calculateEmotionalScore(text) {
        const textLower = text.toLowerCase();
        let emotionalScore = 0;
        let totalMarkers = 0;
        
        // Count emotional markers
        this.linguisticPatterns.emotionalMarkers.high.forEach(marker => {
            if (textLower.includes(marker)) {
                emotionalScore += 1.0;
                totalMarkers++;
            }
        });
        
        this.linguisticPatterns.emotionalMarkers.medium.forEach(marker => {
            if (textLower.includes(marker)) {
                emotionalScore += 0.6;
                totalMarkers++;
            }
        });
        
        this.linguisticPatterns.emotionalMarkers.low.forEach(marker => {
            if (textLower.includes(marker)) {
                emotionalScore += 0.2;
                totalMarkers++;
            }
        });
        
        // Check for emotional punctuation
        const exclamations = (text.match(/!/g) || []).length;
        emotionalScore += Math.min(0.5, exclamations * 0.1);
        
        const questions = (text.match(/\?/g) || []).length;
        emotionalScore += Math.min(0.3, questions * 0.1);
        
        // Check for caps (but not aggressive)
        const capsWords = (text.match(/[A-Z]{2,}/g) || []).length;
        if (capsWords > 0 && capsWords < 5) emotionalScore += 0.2;
        
        // Normalize score
        return totalMarkers > 0 ? Math.min(1.0, emotionalScore / (totalMarkers + 1)) : 0.5;
    }
    
    /**
     * Calculate authenticity vs performance score
     */
    calculateAuthenticityScore(text) {
        const textLower = text.toLowerCase();
        let authenticScore = 0;
        let performativeScore = 0;
        
        // Count authentic markers
        this.linguisticPatterns.authenticityMarkers.authentic.forEach(marker => {
            if (textLower.includes(marker)) {
                authenticScore += 1;
            }
        });
        
        // Count performative markers
        this.linguisticPatterns.authenticityMarkers.performative.forEach(marker => {
            if (textLower.includes(marker)) {
                performativeScore += 1;
            }
        });
        
        // Check for hedging (reduces authenticity)
        this.linguisticPatterns.hedgingMarkers.forEach(marker => {
            if (textLower.includes(marker)) {
                performativeScore += 0.5;
            }
        });
        
        // Check for overcompensation (reduces authenticity)
        this.linguisticPatterns.overcompensationMarkers.forEach(marker => {
            if (textLower.includes(marker)) {
                performativeScore += 0.7;
            }
        });
        
        // Calculate authenticity ratio
        const totalMarkers = authenticScore + performativeScore;
        if (totalMarkers === 0) return 0.5; // Neutral
        
        return authenticScore / totalMarkers;
    }
    
    /**
     * Calculate complexity and calculation score
     */
    calculateComplexityScore(text) {
        // Analyze sentence structure complexity
        const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
        let complexityScore = 0;
        
        sentences.forEach(sentence => {
            const words = sentence.trim().split(' ').length;
            const clauses = (sentence.match(/,/g) || []).length + 1;
            const subordination = (sentence.match(/because|since|although|while|if|when/gi) || []).length;
            
            // Longer sentences increase complexity
            if (words > 20) complexityScore += 0.3;
            if (words > 30) complexityScore += 0.2;
            
            // Multiple clauses increase complexity
            if (clauses > 2) complexityScore += 0.2;
            
            // Subordination increases complexity
            complexityScore += subordination * 0.1;
        });
        
        return Math.min(1.0, complexityScore / sentences.length);
    }
    
    /**
     * Identify specific masking patterns in text
     */
    identifyMaskingPatterns(text, context) {
        const identifiedBehaviors = [];
        const textLower = text.toLowerCase();
        
        // Check each masking behavior type
        Object.keys(this.maskingBehaviors).forEach(behaviorType => {
            const behavior = this.maskingBehaviors[behaviorType];
            let behaviorScore = 0;
            
            // This would be expanded with specific detection logic
            // For now, using simplified pattern matching
            
            if (behaviorType === 'professional_polish') {
                behaviorScore = this.detectProfessionalPolish(text, context);
            } else if (behaviorType === 'people_pleasing') {
                behaviorScore = this.detectPeoplePreasing(text);
            } else if (behaviorType === 'emotional_dampening') {
                behaviorScore = this.detectEmotionalDampening(text);
            } else if (behaviorType === 'hypervigilance') {
                behaviorScore = this.detectHypervigilance(text);
            } else if (behaviorType === 'authentic_expression') {
                behaviorScore = this.detectAuthenticExpression(text);
            }
            
            if (behaviorScore > 0.5) {
                identifiedBehaviors.push({
                    type: behaviorType,
                    confidence: behaviorScore,
                    message: behavior.message,
                    indicators: behavior.indicators
                });
            }
        });
        
        return identifiedBehaviors;
    }
    
    /**
     * Detect professional polish masking behavior
     */
    detectProfessionalPolish(text, context) {
        let score = 0;
        
        // High formality in non-professional context
        const formalityScore = this.calculateFormalityScore(text);
        if (context.environment === 'home' && formalityScore > 0.7) {
            score += 0.4;
        }
        
        // Professional language markers
        const professionalMarkers = [
            'i appreciate', 'thank you for', 'please let me know',
            'i understand', 'certainly', 'absolutely'
        ];
        
        const textLower = text.toLowerCase();
        professionalMarkers.forEach(marker => {
            if (textLower.includes(marker)) score += 0.2;
        });
        
        return Math.min(1.0, score);
    }
    
    /**
     * Detect people-pleasing behavior
     */
    detectPeoplePreasing(text) {
        let score = 0;
        const textLower = text.toLowerCase();
        
        // Excessive hedging
        const hedgingCount = this.linguisticPatterns.hedgingMarkers.filter(
            marker => textLower.includes(marker)
        ).length;
        
        if (hedgingCount > 2) score += 0.3;
        
        // Self-minimization patterns
        const minimizationMarkers = [
            'just wondering', 'just checking', 'sorry but', 'i know this is',
            'i don\'t want to bother', 'if it\'s not too much trouble'
        ];
        
        minimizationMarkers.forEach(marker => {
            if (textLower.includes(marker)) score += 0.3;
        });
        
        return Math.min(1.0, score);
    }
    
    /**
     * Detect emotional dampening
     */
    detectEmotionalDampening(text) {
        const emotionalScore = this.calculateEmotionalScore(text);
        
        // Low emotional expression compared to baseline
        if (this.baselineEstablished && emotionalScore < this.styleBaselines.emotionality * 0.6) {
            return 0.8;
        }
        
        // Neutral language in emotional contexts
        const neutralMarkers = ['fine', 'okay', 'alright', 'adequate', 'reasonable'];
        const textLower = text.toLowerCase();
        
        let neutralCount = 0;
        neutralMarkers.forEach(marker => {
            if (textLower.includes(marker)) neutralCount++;
        });
        
        return Math.min(1.0, neutralCount * 0.3);
    }
    
    /**
     * Detect hypervigilance patterns
     */
    detectHypervigilance(text) {
        let score = 0;
        const textLower = text.toLowerCase();
        
        // Over-explanation patterns
        if (text.length > 200) score += 0.2;
        if ((text.match(/because/gi) || []).length > 2) score += 0.3;
        
        // Preemptive clarification
        const clarificationMarkers = [
            'just to clarify', 'what i mean is', 'to be clear',
            'i hope that makes sense', 'does that help', 'let me know if'
        ];
        
        clarificationMarkers.forEach(marker => {
            if (textLower.includes(marker)) score += 0.3;
        });
        
        return Math.min(1.0, score);
    }
    
    /**
     * Detect authentic expression
     */
    detectAuthenticExpression(text) {
        const authenticityScore = this.calculateAuthenticityScore(text);
        const emotionalScore = this.calculateEmotionalScore(text);
        
        // High authenticity and natural emotion
        return (authenticityScore + emotionalScore) / 2;
    }
    
    /**
     * Get current context for analysis
     */
    getCurrentContext() {
        // This would integrate with the MaskingFatigueDetector context
        return {
            environment: 'unknown',
            timeContext: 'unknown',
            applicationContext: 'unknown',
            timestamp: Date.now()
        };
    }
    
    /**
     * Update communication baselines during establishment period
     */
    updateBaselines(sample) {
        this.baselineEstablishment.currentSamples++;
        
        // Update running averages
        const alpha = 0.2; // Learning rate
        this.styleBaselines.formality = this.styleBaselines.formality * (1 - alpha) + 
                                       sample.analysis.formality * alpha;
        this.styleBaselines.emotionality = this.styleBaselines.emotionality * (1 - alpha) + 
                                          sample.analysis.emotionality * alpha;
        this.styleBaselines.complexity = this.styleBaselines.complexity * (1 - alpha) + 
                                        sample.analysis.complexity * alpha;
        
        // Check if baseline establishment is complete
        if (this.baselineEstablishment.currentSamples >= this.baselineEstablishment.samplesNeeded) {
            this.baselineEstablished = true;
            this.baselineEstablishment.isEstablishing = false;
            
            console.log('📊 Communication baselines established:', this.styleBaselines);
            this.emit('baselinesEstablished', this.styleBaselines);
        }
    }
    
    /**
     * Maintain sample history size
     */
    maintainSampleHistory() {
        const maxSamples = 50;
        if (this.communicationSamples.length > maxSamples) {
            this.communicationSamples = this.communicationSamples.slice(-maxSamples);
        }
    }
    
    /**
     * Analyze current communication patterns
     */
    analyzeCurrentPatterns() {
        if (this.communicationSamples.length < 3) return null;
        
        const recentSamples = this.communicationSamples.slice(-5);
        
        return {
            formalityTrend: this.patternDetector.detectFormalityShift(),
            emotionalTrend: this.patternDetector.detectEmotionalSuppression(),
            timingTrend: this.patternDetector.detectResponseCalculation(),
            overcompensation: this.patternDetector.detectOvercompensation()
        };
    }
    
    /**
     * Calculate overall masking level from communication sample
     */
    calculateCommunicationMaskingLevel(sample) {
        const analysis = sample.analysis;
        
        // Weight different factors
        const formalityWeight = 0.3;
        const authenticityWeight = 0.4;
        const emotionalWeight = 0.3;
        
        // Higher formality = more masking
        const formalityContribution = analysis.formality * formalityWeight;
        
        // Lower authenticity = more masking
        const authenticityContribution = (1 - analysis.authenticity) * authenticityWeight;
        
        // Lower emotional expression = more masking (if below baseline)
        let emotionalContribution = 0;
        if (this.baselineEstablished) {
            const emotionalSuppression = Math.max(0, this.styleBaselines.emotionality - analysis.emotionality);
            emotionalContribution = emotionalSuppression * emotionalWeight * 2; // Amplify suppression
        }
        
        return Math.min(1.0, formalityContribution + authenticityContribution + emotionalContribution);
    }
    
    /**
     * Generate insights from communication analysis
     */
    generateInsights(sample, maskingBehaviors) {
        const insights = [];
        
        // Formality insights
        if (sample.analysis.formality > 0.8) {
            insights.push({
                type: 'formality_high',
                message: "Your language is very polished right now - are you feeling pressure to perform?",
                confidence: sample.analysis.formality
            });
        } else if (sample.analysis.formality < 0.3) {
            insights.push({
                type: 'formality_low',
                message: "I love hearing your natural voice - so authentic and relaxed",
                confidence: 1 - sample.analysis.formality
            });
        }
        
        // Authenticity insights
        if (sample.analysis.authenticity > 0.8) {
            insights.push({
                type: 'authenticity_high',
                message: "You're speaking so naturally - this is your real voice and it's beautiful",
                confidence: sample.analysis.authenticity
            });
        } else if (sample.analysis.authenticity < 0.3) {
            insights.push({
                type: 'authenticity_low',
                message: "I notice you're choosing your words carefully - your first instinct is valid",
                confidence: 1 - sample.analysis.authenticity
            });
        }
        
        // Add masking behavior insights
        maskingBehaviors.forEach(behavior => {
            insights.push({
                type: 'masking_behavior',
                behaviorType: behavior.type,
                message: behavior.message,
                confidence: behavior.confidence
            });
        });
        
        return insights;
    }
    
    /**
     * Detect significant style shifts
     */
    detectSignificantStyleShift(analysis) {
        if (!this.baselineEstablished || this.communicationSamples.length < 5) return null;
        
        const currentSample = analysis.sample;
        const recentSamples = this.communicationSamples.slice(-5);
        
        // Calculate averages for recent period
        const recentAverage = {
            formality: recentSamples.reduce((sum, s) => sum + s.analysis.formality, 0) / recentSamples.length,
            emotionality: recentSamples.reduce((sum, s) => sum + s.analysis.emotionality, 0) / recentSamples.length,
            authenticity: recentSamples.reduce((sum, s) => sum + s.analysis.authenticity, 0) / recentSamples.length
        };
        
        // Compare to baselines
        const formalityShift = Math.abs(recentAverage.formality - this.styleBaselines.formality);
        const emotionalShift = Math.abs(recentAverage.emotionality - this.styleBaselines.emotionality);
        const authenticityShift = Math.abs(recentAverage.authenticity - this.styleBaselines.authenticity);
        
        const shiftThreshold = 0.3;
        
        if (formalityShift > shiftThreshold || emotionalShift > shiftThreshold || authenticityShift > shiftThreshold) {
            return {
                type: 'significant_shift',
                shifts: {
                    formality: formalityShift,
                    emotionality: emotionalShift,
                    authenticity: authenticityShift
                },
                direction: this.determineShiftDirection(recentAverage),
                timestamp: Date.now()
            };
        }
        
        return null;
    }
    
    /**
     * Determine direction of communication style shift
     */
    determineShiftDirection(recentAverage) {
        const formalityIncrease = recentAverage.formality > this.styleBaselines.formality;
        const emotionalDecrease = recentAverage.emotionality < this.styleBaselines.emotionality;
        const authenticityDecrease = recentAverage.authenticity < this.styleBaselines.authenticity;
        
        if (formalityIncrease && emotionalDecrease && authenticityDecrease) {
            return 'masking_increase';
        } else if (!formalityIncrease && !emotionalDecrease && !authenticityDecrease) {
            return 'masking_decrease';
        } else {
            return 'mixed_shift';
        }
    }
    
    /**
     * Handle significant style shift
     */
    handleStyleShift(shift) {
        this.metrics.styleShifts++;
        
        // Generate appropriate response based on shift direction
        let shiftMessage;
        if (shift.direction === 'masking_increase') {
            shiftMessage = "I notice you switching to a more formal tone - are you feeling like you need to perform right now?";
        } else if (shift.direction === 'masking_decrease') {
            shiftMessage = "I can hear you relaxing into your natural voice - it's lovely to witness this authenticity";
        } else {
            shiftMessage = "Your communication style is shifting - I'm here to support however you need to express yourself";
        }
        
        // Emit style shift event
        this.emit('communicationStyleShift', {
            shift: shift,
            message: shiftMessage,
            timestamp: Date.now()
        });
        
        console.log(`💬 Communication style shift detected: ${shift.direction}`);
    }
    
    /**
     * Event system
     */
    on(event, callback) {
        if (!this.eventListeners) this.eventListeners = new Map();
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }
    
    emit(event, data) {
        if (this.eventListeners && this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in communication style tracker event listener for ${event}:`, error);
                }
            });
        }
    }
    
    // Additional analysis methods...
    
    analyzeFormalityTrend() {
        if (this.communicationSamples.length < this.patternDetection.formalityShift.windowSize) {
            return 'insufficient_data';
        }
        
        const recentSamples = this.communicationSamples.slice(-this.patternDetection.formalityShift.windowSize);
        const formalityLevels = recentSamples.map(s => s.analysis.formality);
        
        // Calculate trend
        const firstHalf = formalityLevels.slice(0, Math.floor(formalityLevels.length / 2));
        const secondHalf = formalityLevels.slice(Math.floor(formalityLevels.length / 2));
        
        const firstAverage = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
        const secondAverage = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
        
        const change = secondAverage - firstAverage;
        
        if (change > this.patternDetection.formalityShift.threshold) {
            return 'increasing';
        } else if (change < -this.patternDetection.formalityShift.threshold) {
            return 'decreasing';
        } else {
            return 'stable';
        }
    }
    
    /**
     * Get communication style status
     */
    getStyleStatus() {
        const latestSample = this.communicationSamples[this.communicationSamples.length - 1];
        
        return {
            isActive: this.isActive,
            baselineEstablished: this.baselineEstablished,
            baselines: this.styleBaselines,
            latestAnalysis: latestSample?.analysis,
            currentTrends: this.analyzeCurrentPatterns(),
            totalSamples: this.communicationSamples.length,
            metrics: this.metrics
        };
    }
    
    /**
     * Deactivate the communication style tracker
     */
    async deactivate() {
        console.log('🛑 Deactivating Communication Style Tracker...');
        this.isActive = false;
        
        if (this.eventListeners) {
            this.eventListeners.clear();
        }
        
        console.log('✅ Communication Style Tracker deactivated');
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommunicationStyleTracker;
} else if (typeof window !== 'undefined') {
    window.CommunicationStyleTracker = CommunicationStyleTracker;
}

console.log('💬 Communication Style Tracker loaded - ready for masking pattern detection');