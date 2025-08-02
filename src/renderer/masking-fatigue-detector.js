// Masking Fatigue Detection System - Phase 2 Viral Neurodivergent Feature
// "Finally, someone validates my energy drain" - Complete masking awareness and authenticity support
// Integration with Screen Intelligence, Social Decoder, and AI Personality systems

/**
 * MaskingFatigueDetector
 * 
 * The third viral neurodivergent feature providing real-time masking awareness,
 * energy expenditure tracking, and safe space validation for authentic self-expression.
 * 
 * Core Capabilities:
 * - Real-time masking behavior pattern analysis
 * - Communication authenticity vs performance mode detection
 * - Environmental context awareness (home vs work/school)
 * - Energy expenditure tracking and visualization
 * - Safe space identification and unmasking prompts
 * - Boundary setting guidance and recovery suggestions
 * 
 * Viral User Experience Goals:
 * - "Finally, someone understands masking fatigue" validation moments
 * - Prevention of masking burnout through early awareness
 * - Celebration of genuine self-expression in safe spaces
 * - Energy conservation guidance and boundary awareness
 */

class MaskingFatigueDetector {
    constructor() {
        console.log('🎭 Initializing Masking Fatigue Detection System...');
        
        // Core system state
        this.isActive = false;
        this.currentMaskingLevel = 0; // 0-1 scale, 0 = authentic, 1 = heavily masked
        this.energyLevel = 1.0; // 1.0 = full energy, 0 = depleted
        this.maskingHistory = [];
        this.environmentHistory = [];
        
        // Behavioral pattern tracking
        this.communicationPatterns = {
            // Language formality tracking
            formalLanguage: {
                currentLevel: 0,
                baseline: 0,
                recentSamples: [],
                indicators: ['please', 'thank you', 'certainly', 'absolutely', 'i appreciate', 'if possible']
            },
            
            // Response timing analysis
            responseLatency: {
                currentAverage: 0,
                baseline: 0,
                recentTimes: [],
                calculatedResponses: 0 // vs immediate responses
            },
            
            // Emotional expression dampening
            emotionalExpression: {
                currentLevel: 1.0, // 1.0 = natural, 0 = suppressed
                baseline: 1.0,
                recentSamples: [],
                indicators: ['excited', 'love', 'hate', 'frustrated', 'amazing', 'terrible']
            },
            
            // Energy signature detection
            energySignature: {
                currentTension: 0, // 0 = relaxed, 1 = heightened alertness
                baseline: 0,
                recentSamples: [],
                stressIndicators: ['busy', 'stressed', 'overwhelmed', 'tired', 'drained']
            }
        };
        
        // Context awareness system
        this.contextAwareness = {
            currentEnvironment: 'unknown', // home, work, school, social, public
            environmentConfidence: 0,
            timeOfDay: null,
            applicationContext: 'unknown', // personal, professional, social
            socialLoad: 0, // 0-1 scale of social interaction intensity
            
            // Environment detection patterns
            environmentIndicators: {
                home: ['personal', 'relaxed', 'casual', 'family', 'netflix', 'spotify', 'games'],
                work: ['meeting', 'project', 'deadline', 'professional', 'email', 'slack', 'teams', 'zoom'],
                school: ['assignment', 'homework', 'class', 'study', 'professor', 'student'],
                social: ['friends', 'party', 'event', 'social', 'group', 'hangout'],
                public: ['store', 'appointment', 'public', 'outside', 'errands']
            }
        };
        
        // Safe space detection
        this.safeSpaceDetection = {
            currentSafetyLevel: 0.5, // 0 = high pressure, 1 = completely safe
            safeSpaceHistory: [],
            recoveryOpportunities: [],
            unmaskingPrompts: {
                gentle: [
                    "You're home now - safe to be yourself. Want to decompress?",
                    "I notice you're still in polished mode. This is your space - you can let your guard down.",
                    "You've been in 'professional mode' for hours. Time to breathe and be authentic."
                ],
                celebratory: [
                    "There you are! I love seeing your authentic self. This is who you really are. ✨",
                    "Your natural energy is so much more relaxed here. It's beautiful to witness.",
                    "I can feel you unwinding. Your authentic self is worth celebrating."
                ],
                recovery: [
                    "That was a lot of masking energy. Let's recover together.",
                    "Performance mode is exhausting. What would feel good right now?",
                    "You held it together beautifully out there. Now it's time to just... be."
                ]
            }
        };
        
        // Energy tracking and visualization
        this.energyTracking = {
            dailyEnergySpent: 0,
            maskingEnergyRate: 0.1, // energy cost per minute of masking
            recoveryRate: 0.05, // energy recovered per minute in safe space
            energyBudget: 10.0, // daily energy budget
            lowEnergyWarnings: [],
            burnoutPrevention: {
                warningThreshold: 0.3,
                criticalThreshold: 0.1,
                recoveryRecommendations: []
            }
        };
        
        // Masking awareness features
        this.maskingAwareness = {
            realTimeMaskingLevel: 0,
            maskingIndicators: [],
            energyVisualization: null,
            boundaryGuidance: [],
            authenticityValidation: []
        };
        
        // Integration with existing systems
        this.integrations = {
            screenIntelligence: null,
            socialDecoder: null,
            aiPersonality: null,
            enhancedOCR: null
        };
        
        // Performance tracking
        this.performanceMetrics = {
            totalAnalyses: 0,
            maskingDetections: 0,
            safeSpaceIdentifications: 0,
            energyWarnings: 0,
            authenticityMoments: 0,
            userValidations: 0
        };
        
        // Event system
        this.eventListeners = new Map();
        
        // Pattern analysis intervals
        this.analysisInterval = null;
        this.contextUpdateInterval = null;
        this.energyUpdateInterval = null;
        
        console.log('🎭 Masking Fatigue Detector core initialized');
    }
    
    /**
     * Initialize the complete masking fatigue detection system
     */
    async initialize() {
        try {
            console.log('🎭 Starting Masking Fatigue Detection System initialization...');
            
            // Connect to existing Velvet systems
            await this.connectToExistingSystems();
            
            // Initialize behavioral pattern analysis
            this.initializeBehavioralAnalysis();
            
            // Set up context awareness monitoring
            this.initializeContextAwareness();
            
            // Start safe space detection
            this.initializeSafeSpaceDetection();
            
            // Initialize energy tracking system
            this.initializeEnergyTracking();
            
            // Set up real-time analysis intervals
            this.startRealTimeAnalysis();
            
            // Initialize UI indicators
            await this.initializeMaskingUI();
            
            this.isActive = true;
            console.log('✅ Masking Fatigue Detection System fully active');
            console.log('🎭 Ready for real-time masking awareness and authenticity validation');
            
            // Emit initialization complete event
            this.emit('maskingSystemReady', {
                timestamp: Date.now(),
                capabilities: this.getSystemCapabilities()
            });
            
            return true;
            
        } catch (error) {
            console.error('❌ Masking Fatigue Detection initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Connect to existing Velvet systems for integration
     */
    async connectToExistingSystems() {
        console.log('🔗 Connecting to existing Velvet systems...');
        
        // Connect to Screen Intelligence for context detection
        if (window.screenIntelligence) {
            this.integrations.screenIntelligence = window.screenIntelligence;
            
            // Register for window change events to detect environment
            this.integrations.screenIntelligence.on('windowChange', (windowInfo) => {
                this.analyzeWindowContext(windowInfo);
            });
            
            // Register for pattern detection events
            this.integrations.screenIntelligence.on('patternDetected', (pattern) => {
                this.processScreenPatternForMasking(pattern);
            });
            
            console.log('✅ Connected to Screen Intelligence system');
        } else {
            console.warn('⚠️ Screen Intelligence not available - limited context detection');
        }
        
        // Connect to Enhanced Social Decoder for communication analysis
        if (window.socialDecoder || window.EnhancedSocialDecoder) {
            this.integrations.socialDecoder = window.socialDecoder || window.EnhancedSocialDecoder;
            
            // Register for social cue detection to analyze communication patterns
            if (this.integrations.socialDecoder.onSocialCueDetected) {
                this.integrations.socialDecoder.onSocialCueDetected((analysis) => {
                    this.analyzeCommunicationForMasking(analysis);
                });
            }
            
            // Register for enhanced analysis if available
            if (this.integrations.socialDecoder.onEnhancedAnalysis) {
                this.integrations.socialDecoder.onEnhancedAnalysis((enhancedAnalysis) => {
                    this.processEnhancedSocialAnalysis(enhancedAnalysis);
                });
            }
            
            console.log('✅ Connected to Social Decoder system');
        } else {
            console.warn('⚠️ Social Decoder not available - limited communication analysis');
        }
        
        // Connect to AI Personality system for authentic validation
        if (window.velvetAI) {
            this.integrations.aiPersonality = window.velvetAI;
            console.log('✅ Connected to AI Personality system');
        } else {
            console.warn('⚠️ AI Personality not available - limited authenticity validation');
        }
        
        // Connect to Enhanced OCR for screen content analysis
        if (window.enhancedOCRProcessor) {
            this.integrations.enhancedOCR = window.enhancedOCRProcessor;
            console.log('✅ Connected to Enhanced OCR system');
        }
    }
    
    /**
     * Initialize behavioral pattern analysis system
     */
    initializeBehavioralAnalysis() {
        console.log('🧠 Initializing behavioral pattern analysis...');
        
        // Set baseline communication patterns
        this.establishCommunicationBaselines();
        
        // Initialize pattern recognition algorithms
        this.initializePatternRecognition();
        
        console.log('✅ Behavioral pattern analysis initialized');
    }
    
    /**
     * Establish baseline communication patterns for comparison
     */
    establishCommunicationBaselines() {
        // These will be learned over time, starting with neutral defaults
        this.communicationPatterns.formalLanguage.baseline = 0.3; // Moderate formality baseline
        this.communicationPatterns.responseLatency.baseline = 2000; // 2 second average baseline
        this.communicationPatterns.emotionalExpression.baseline = 0.7; // Natural expression baseline
        this.communicationPatterns.energySignature.baseline = 0.2; // Low tension baseline
        
        console.log('📊 Communication baselines established');
    }
    
    /**
     * Initialize pattern recognition algorithms
     */
    initializePatternRecognition() {
        // Communication style analysis
        this.patternRecognition = {
            // Detect formal vs casual language shifts
            analyzeFormalityShift: (text) => {
                return this.detectFormalityLevel(text);
            },
            
            // Detect response calculation vs immediacy
            analyzeResponseTiming: (timestamp, textLength) => {
                return this.calculateResponseMetrics(timestamp, textLength);
            },
            
            // Detect emotional dampening
            analyzeEmotionalExpression: (text) => {
                return this.assessEmotionalLevel(text);
            },
            
            // Detect energy signature changes
            analyzeEnergySignature: (text, context) => {
                return this.assessEnergyTension(text, context);
            }
        };
    }
    
    /**
     * Initialize context awareness monitoring
     */
    initializeContextAwareness() {
        console.log('🏠 Initializing context awareness monitoring...');
        
        // Start environment detection
        this.startEnvironmentDetection();
        
        // Initialize time-of-day awareness
        this.initializeTimeAwareness();
        
        // Set up application context monitoring
        this.initializeApplicationContextMonitoring();
        
        console.log('✅ Context awareness monitoring initialized');
    }
    
    /**
     * Start environment detection based on various signals
     */
    startEnvironmentDetection() {
        // Detect environment from screen content, application usage, and time patterns
        this.environmentDetector = {
            analyzeScreenContent: (screenText) => {
                return this.classifyEnvironmentFromText(screenText);
            },
            
            analyzeApplicationUsage: (appName, windowTitle) => {
                return this.classifyEnvironmentFromApp(appName, windowTitle);
            },
            
            analyzeTimePatterns: () => {
                return this.classifyEnvironmentFromTime();
            }
        };
    }
    
    /**
     * Initialize time-of-day awareness for masking patterns
     */
    initializeTimeAwareness() {
        this.timeAwareness = {
            getCurrentTimeContext: () => {
                const now = new Date();
                const hour = now.getHours();
                
                if (hour >= 6 && hour < 9) return 'morning_routine';
                if (hour >= 9 && hour < 12) return 'morning_work';
                if (hour >= 12 && hour < 14) return 'lunch_break';
                if (hour >= 14 && hour < 17) return 'afternoon_work';
                if (hour >= 17 && hour < 19) return 'evening_transition';
                if (hour >= 19 && hour < 22) return 'evening_personal';
                if (hour >= 22 || hour < 6) return 'night_wind_down';
                
                return 'unknown';
            },
            
            getMaskingExpectationForTime: (timeContext) => {
                const expectations = {
                    'morning_routine': 0.3,
                    'morning_work': 0.8,
                    'lunch_break': 0.5,
                    'afternoon_work': 0.9,
                    'evening_transition': 0.4,
                    'evening_personal': 0.2,
                    'night_wind_down': 0.1
                };
                
                return expectations[timeContext] || 0.5;
            }
        };
    }
    
    /**
     * Initialize application context monitoring
     */
    initializeApplicationContextMonitoring() {
        this.appContextMonitor = {
            classifyApp: (appName, windowTitle) => {
                const professionalApps = ['slack', 'teams', 'zoom', 'outlook', 'mail', 'calendar'];
                const personalApps = ['spotify', 'netflix', 'youtube', 'games', 'social'];
                const creativeApps = ['photoshop', 'figma', 'sketch', 'code', 'terminal'];
                
                const appLower = appName.toLowerCase();
                const titleLower = (windowTitle || '').toLowerCase();
                
                if (professionalApps.some(app => appLower.includes(app) || titleLower.includes(app))) {
                    return { context: 'professional', confidence: 0.8 };
                }
                
                if (personalApps.some(app => appLower.includes(app) || titleLower.includes(app))) {
                    return { context: 'personal', confidence: 0.8 };
                }
                
                if (creativeApps.some(app => appLower.includes(app) || titleLower.includes(app))) {
                    return { context: 'creative', confidence: 0.7 };
                }
                
                return { context: 'unknown', confidence: 0.3 };
            }
        };
    }
    
    /**
     * Initialize safe space detection system
     */
    initializeSafeSpaceDetection() {
        console.log('🏠 Initializing safe space detection...');
        
        this.safeSpaceDetector = {
            // Analyze current environment safety level
            assessSafetyLevel: () => {
                return this.calculateCurrentSafetyLevel();
            },
            
            // Detect unmasking opportunities
            detectUnmaskingOpportunity: () => {
                return this.identifyUnmaskingMoment();
            },
            
            // Generate gentle prompts for unmasking
            generateUnmaskingPrompt: (safetyLevel, currentMaskingLevel) => {
                return this.createContextualUnmaskingPrompt(safetyLevel, currentMaskingLevel);
            }
        };
        
        console.log('✅ Safe space detection initialized');
    }
    
    /**
     * Initialize energy tracking system
     */
    initializeEnergyTracking() {
        console.log('⚡ Initializing energy tracking system...');
        
        this.energyTracker = {
            currentEnergy: this.energyLevel,
            dailyExpenditure: 0,
            recoveryPotential: 0,
            
            // Calculate energy cost of current masking
            calculateMaskingCost: (maskingLevel, duration) => {
                return maskingLevel * this.energyTracking.maskingEnergyRate * (duration / 60000); // per minute
            },
            
            // Calculate energy recovery in safe space
            calculateRecovery: (safetyLevel, duration) => {
                return safetyLevel * this.energyTracking.recoveryRate * (duration / 60000); // per minute
            },
            
            // Predict energy trajectory
            predictEnergyTrajectory: () => {
                return this.calculateEnergyProjection();
            }
        };
        
        console.log('✅ Energy tracking system initialized');
    }
    
    /**
     * Start real-time analysis intervals
     */
    startRealTimeAnalysis() {
        console.log('⚡ Starting real-time masking analysis...');
        
        // Main analysis loop - every 30 seconds
        this.analysisInterval = setInterval(() => {
            this.performRealTimeAnalysis();
        }, 30000);
        
        // Context update loop - every 10 seconds
        this.contextUpdateInterval = setInterval(() => {
            this.updateContextAwareness();
        }, 10000);
        
        // Energy tracking loop - every 60 seconds
        this.energyUpdateInterval = setInterval(() => {
            this.updateEnergyTracking();
        }, 60000);
        
        console.log('✅ Real-time analysis started');
    }
    
    /**
     * Initialize masking UI indicators
     */
    async initializeMaskingUI() {
        console.log('🎨 Initializing masking fatigue UI...');
        
        try {
            // Create masking level indicator
            this.createMaskingLevelIndicator();
            
            // Create energy visualization
            this.createEnergyVisualization();
            
            // Create safe space indicator
            this.createSafeSpaceIndicator();
            
            console.log('✅ Masking UI initialized');
        } catch (error) {
            console.error('❌ Masking UI initialization failed:', error);
        }
    }
    
    /**
     * Main real-time analysis function
     */
    performRealTimeAnalysis() {
        if (!this.isActive) return;
        
        try {
            // Get current context
            const currentContext = this.getCurrentContext();
            
            // Analyze current masking level
            const maskingAnalysis = this.analyzeMaskingLevel(currentContext);
            
            // Update masking history
            this.updateMaskingHistory(maskingAnalysis);
            
            // Check for masking fatigue patterns
            const fatigueIndicators = this.detectMaskingFatigue();
            
            // Generate interventions if needed
            if (fatigueIndicators.length > 0) {
                this.generateMaskingInterventions(fatigueIndicators);
            }
            
            // Update performance metrics
            this.performanceMetrics.totalAnalyses++;
            
        } catch (error) {
            console.error('❌ Real-time masking analysis failed:', error);
        }
    }
    
    /**
     * Analyze communication for masking indicators
     */
    analyzeCommunicationForMasking(socialAnalysis) {
        try {
            if (!socialAnalysis || !socialAnalysis.original) return;
            
            const text = socialAnalysis.original;
            
            // Analyze formality level
            const formalityLevel = this.detectFormalityLevel(text);
            this.communicationPatterns.formalLanguage.recentSamples.push({
                timestamp: Date.now(),
                level: formalityLevel,
                text: text.substring(0, 100)
            });
            
            // Analyze emotional expression
            const emotionalLevel = this.assessEmotionalLevel(text);
            this.communicationPatterns.emotionalExpression.recentSamples.push({
                timestamp: Date.now(),
                level: emotionalLevel,
                text: text.substring(0, 100)
            });
            
            // Detect energy signature
            const currentContext = this.getCurrentContext();
            const energyTension = this.assessEnergyTension(text, currentContext);
            this.communicationPatterns.energySignature.recentSamples.push({
                timestamp: Date.now(),
                tension: energyTension,
                context: currentContext.environment
            });
            
            // Calculate overall masking level from communication
            const communicationMaskingLevel = this.calculateCommunicationMaskingLevel(
                formalityLevel, emotionalLevel, energyTension
            );
            
            // Update current masking level
            this.currentMaskingLevel = communicationMaskingLevel;
            
            // Emit masking level change
            this.emit('maskingLevelChanged', {
                level: this.currentMaskingLevel,
                indicators: {
                    formality: formalityLevel,
                    emotionalSuppression: 1 - emotionalLevel,
                    energyTension: energyTension
                },
                timestamp: Date.now()
            });
            
        } catch (error) {
            console.error('❌ Communication masking analysis failed:', error);
        }
    }
    
    /**
     * Analyze window context for environment detection
     */
    analyzeWindowContext(windowInfo) {
        try {
            const appClassification = this.appContextMonitor.classifyApp(
                windowInfo.name, 
                windowInfo.title
            );
            
            // Update application context
            this.contextAwareness.applicationContext = appClassification.context;
            
            // Determine environment from app context
            const environmentFromApp = this.inferEnvironmentFromAppContext(appClassification);
            
            // Update environment with confidence weighting
            if (appClassification.confidence > 0.6) {
                this.contextAwareness.currentEnvironment = environmentFromApp;
                this.contextAwareness.environmentConfidence = appClassification.confidence;
            }
            
            // Log environment change
            console.log(`🏠 Environment detected: ${this.contextAwareness.currentEnvironment} (${Math.round(this.contextAwareness.environmentConfidence * 100)}% confidence)`);
            
        } catch (error) {
            console.error('❌ Window context analysis failed:', error);
        }
    }
    
    /**
     * Detect formality level in text (0 = casual, 1 = formal)
     */
    detectFormalityLevel(text) {
        const formalIndicators = this.communicationPatterns.formalLanguage.indicators;
        const casualIndicators = ['yeah', 'yep', 'nah', 'gonna', 'wanna', 'cool', 'awesome', 'hey'];
        
        const textLower = text.toLowerCase();
        
        let formalScore = 0;
        let casualScore = 0;
        
        // Count formal indicators
        formalIndicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                formalScore += 1;
            }
        });
        
        // Count casual indicators
        casualIndicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                casualScore += 1;
            }
        });
        
        // Analyze sentence structure
        const hasComplexSentences = text.includes(',') && text.length > 50;
        if (hasComplexSentences) formalScore += 0.5;
        
        const hasShortSentences = text.split(' ').length < 8;
        if (hasShortSentences) casualScore += 0.5;
        
        // Calculate formality level
        const totalIndicators = formalScore + casualScore;
        if (totalIndicators === 0) return 0.5; // Neutral
        
        return formalScore / totalIndicators;
    }
    
    /**
     * Assess emotional expression level (0 = suppressed, 1 = natural)
     */
    assessEmotionalLevel(text) {
        const emotionalIndicators = this.communicationPatterns.emotionalExpression.indicators;
        const textLower = text.toLowerCase();
        
        let emotionalScore = 0;
        
        // Count emotional words
        emotionalIndicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                emotionalScore += 1;
            }
        });
        
        // Check for exclamation marks (emotional expression)
        const exclamations = (text.match(/!/g) || []).length;
        emotionalScore += exclamations * 0.3;
        
        // Check for caps (emotional emphasis)
        const capsWords = (text.match(/[A-Z]{2,}/g) || []).length;
        emotionalScore += capsWords * 0.2;
        
        // Check for emotional punctuation
        if (text.includes('...')) emotionalScore += 0.3;
        if (text.includes('?!') || text.includes('!!')) emotionalScore += 0.5;
        
        // Normalize to 0-1 scale
        return Math.min(1.0, emotionalScore / 3.0);
    }
    
    /**
     * Assess energy tension level (0 = relaxed, 1 = heightened alertness)
     */
    assessEnergyTension(text, context) {
        const stressIndicators = this.communicationPatterns.energySignature.stressIndicators;
        const relaxedIndicators = ['chill', 'relaxed', 'easy', 'calm', 'peaceful'];
        
        const textLower = text.toLowerCase();
        
        let tensionScore = 0;
        let relaxationScore = 0;
        
        // Count stress indicators
        stressIndicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                tensionScore += 1;
            }
        });
        
        // Count relaxation indicators
        relaxedIndicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                relaxationScore += 1;
            }
        });
        
        // Context-based tension adjustment
        if (context.environment === 'work' || context.environment === 'school') {
            tensionScore += 0.5;
        } else if (context.environment === 'home') {
            relaxationScore += 0.5;
        }
        
        // Time-based adjustment
        const timeContext = this.timeAwareness.getCurrentTimeContext();
        const expectedTension = this.timeAwareness.getMaskingExpectationForTime(timeContext);
        tensionScore += expectedTension * 0.3;
        
        // Calculate final tension level
        const totalIndicators = tensionScore + relaxationScore;
        if (totalIndicators === 0) return expectedTension; // Use time-based expectation
        
        return Math.min(1.0, tensionScore / totalIndicators);
    }
    
    /**
     * Calculate overall masking level from communication patterns
     */
    calculateCommunicationMaskingLevel(formalityLevel, emotionalLevel, energyTension) {
        // Weighted average of masking indicators
        const formalityWeight = 0.4;
        const emotionalWeight = 0.4;
        const energyWeight = 0.2;
        
        // Higher formality increases masking
        const formalityContribution = formalityLevel * formalityWeight;
        
        // Lower emotional expression increases masking
        const emotionalContribution = (1 - emotionalLevel) * emotionalWeight;
        
        // Higher energy tension increases masking
        const energyContribution = energyTension * energyWeight;
        
        const maskingLevel = formalityContribution + emotionalContribution + energyContribution;
        
        return Math.min(1.0, Math.max(0.0, maskingLevel));
    }
    
    /**
     * Get current context for analysis
     */
    getCurrentContext() {
        return {
            environment: this.contextAwareness.currentEnvironment,
            environmentConfidence: this.contextAwareness.environmentConfidence,
            applicationContext: this.contextAwareness.applicationContext,
            timeContext: this.timeAwareness.getCurrentTimeContext(),
            socialLoad: this.contextAwareness.socialLoad,
            safetyLevel: this.safeSpaceDetection.currentSafetyLevel
        };
    }
    
    /**
     * Calculate current safety level for safe space detection
     */
    calculateCurrentSafetyLevel() {
        let safetyScore = 0.5; // Neutral baseline
        
        // Environment-based safety
        const environmentSafety = {
            'home': 0.9,
            'work': 0.2,
            'school': 0.3,
            'social': 0.4,
            'public': 0.1,
            'unknown': 0.5
        };
        
        safetyScore = environmentSafety[this.contextAwareness.currentEnvironment] || 0.5;
        
        // Time-based adjustment
        const timeContext = this.timeAwareness.getCurrentTimeContext();
        const timeSafetyBonus = {
            'evening_personal': 0.2,
            'night_wind_down': 0.3,
            'morning_routine': 0.1,
            'lunch_break': 0.1
        };
        
        safetyScore += timeSafetyBonus[timeContext] || 0;
        
        // Application context adjustment
        if (this.contextAwareness.applicationContext === 'personal') {
            safetyScore += 0.2;
        } else if (this.contextAwareness.applicationContext === 'professional') {
            safetyScore -= 0.3;
        }
        
        return Math.min(1.0, Math.max(0.0, safetyScore));
    }
    
    /**
     * Identify unmasking opportunities
     */
    identifyUnmaskingMoment() {
        const currentSafety = this.calculateCurrentSafetyLevel();
        const currentMasking = this.currentMaskingLevel;
        
        // Opportunity exists when:
        // 1. Currently in safe space
        // 2. Still showing signs of masking
        // 3. Haven't had unmasking prompt recently
        
        const isInSafeSpace = currentSafety > 0.7;
        const isStillMasking = currentMasking > 0.4;
        const recentPrompt = this.safeSpaceDetection.recoveryOpportunities.find(
            opp => Date.now() - opp.timestamp < 30 * 60 * 1000 // 30 minutes
        );
        
        return {
            hasOpportunity: isInSafeSpace && isStillMasking && !recentPrompt,
            safetyLevel: currentSafety,
            maskingLevel: currentMasking,
            confidence: (currentSafety + (1 - currentMasking)) / 2
        };
    }
    
    /**
     * Generate contextual unmasking prompt
     */
    createContextualUnmaskingPrompt(safetyLevel, maskingLevel) {
        const promptType = this.determinePromptType(safetyLevel, maskingLevel);
        const prompts = this.safeSpaceDetection.unmaskingPrompts[promptType];
        
        const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        
        return {
            type: promptType,
            message: selectedPrompt,
            confidence: safetyLevel,
            urgency: maskingLevel > 0.8 ? 'high' : maskingLevel > 0.5 ? 'medium' : 'low'
        };
    }
    
    /**
     * Determine appropriate prompt type based on context
     */
    determinePromptType(safetyLevel, maskingLevel) {
        if (safetyLevel > 0.8 && maskingLevel < 0.3) {
            return 'celebratory'; // Already unmasking in safe space
        } else if (safetyLevel > 0.7 && maskingLevel > 0.6) {
            return 'gentle'; // Safe space but still masking
        } else if (maskingLevel > 0.8) {
            return 'recovery'; // High masking, needs recovery
        } else {
            return 'gentle'; // Default to gentle approach
        }
    }
    
    /**
     * Update context awareness
     */
    updateContextAwareness() {
        try {
            // Update time context
            this.contextAwareness.timeOfDay = this.timeAwareness.getCurrentTimeContext();
            
            // Update safety level
            this.safeSpaceDetection.currentSafetyLevel = this.calculateCurrentSafetyLevel();
            
            // Check for unmasking opportunities
            const unmaskingOpportunity = this.identifyUnmaskingMoment();
            if (unmaskingOpportunity.hasOpportunity) {
                this.handleUnmaskingOpportunity(unmaskingOpportunity);
            }
            
        } catch (error) {
            console.error('❌ Context awareness update failed:', error);
        }
    }
    
    /**
     * Handle unmasking opportunity
     */
    handleUnmaskingOpportunity(opportunity) {
        // Generate contextual prompt
        const prompt = this.createContextualUnmaskingPrompt(
            opportunity.safetyLevel,
            opportunity.maskingLevel
        );
        
        // Store opportunity
        this.safeSpaceDetection.recoveryOpportunities.push({
            timestamp: Date.now(),
            opportunity: opportunity,
            prompt: prompt
        });
        
        // Emit unmasking opportunity event
        this.emit('unmaskingOpportunity', {
            opportunity: opportunity,
            prompt: prompt,
            timestamp: Date.now()
        });
        
        console.log(`🏠 Unmasking opportunity detected: ${prompt.type} (${Math.round(opportunity.confidence * 100)}% confidence)`);
    }
    
    /**
     * Update energy tracking
     */
    updateEnergyTracking() {
        try {
            const currentTime = Date.now();
            const timeSinceLastUpdate = this.energyTracker.lastUpdate ? 
                (currentTime - this.energyTracker.lastUpdate) : 60000;
            
            // Calculate energy expenditure from masking
            const maskingCost = this.energyTracker.calculateMaskingCost(
                this.currentMaskingLevel,
                timeSinceLastUpdate
            );
            
            // Calculate energy recovery from safe space
            const recovery = this.energyTracker.calculateRecovery(
                this.safeSpaceDetection.currentSafetyLevel,
                timeSinceLastUpdate
            );
            
            // Update energy level
            this.energyLevel = Math.max(0, Math.min(1, this.energyLevel - maskingCost + recovery));
            this.energyTracker.currentEnergy = this.energyLevel;
            
            // Update daily expenditure
            this.energyTracking.dailyEnergySpent += maskingCost;
            
            // Check for low energy warnings
            if (this.energyLevel < this.energyTracking.burnoutPrevention.warningThreshold) {
                this.generateEnergyWarning();
            }
            
            // Update timestamp
            this.energyTracker.lastUpdate = currentTime;
            
            // Emit energy update
            this.emit('energyLevelChanged', {
                currentEnergy: this.energyLevel,
                dailyExpenditure: this.energyTracking.dailyEnergySpent,
                maskingCost: maskingCost,
                recovery: recovery,
                timestamp: currentTime
            });
            
        } catch (error) {
            console.error('❌ Energy tracking update failed:', error);
        }
    }
    
    /**
     * Generate energy warning
     */
    generateEnergyWarning() {
        const warningLevel = this.energyLevel < this.energyTracking.burnoutPrevention.criticalThreshold ? 
            'critical' : 'warning';
        
        const warning = {
            level: warningLevel,
            energyLevel: this.energyLevel,
            message: warningLevel === 'critical' ? 
                'Energy critically low. Time for recovery and self-care.' :
                'Energy getting low. Consider taking a break soon.',
            recommendations: this.generateRecoveryRecommendations(),
            timestamp: Date.now()
        };
        
        this.energyTracking.lowEnergyWarnings.push(warning);
        this.performanceMetrics.energyWarnings++;
        
        // Emit energy warning
        this.emit('energyWarning', warning);
        
        console.log(`⚡ Energy warning: ${warningLevel} (${Math.round(this.energyLevel * 100)}% remaining)`);
    }
    
    /**
     * Generate recovery recommendations
     */
    generateRecoveryRecommendations() {
        const recommendations = [];
        
        // Context-aware recommendations
        if (this.contextAwareness.currentEnvironment === 'work') {
            recommendations.push('Take a 5-minute breathing break');
            recommendations.push('Step away from your screen for a moment');
        } else if (this.contextAwareness.currentEnvironment === 'home') {
            recommendations.push('Put on comfortable clothes');
            recommendations.push('Do something just for you');
        }
        
        // Energy-level specific recommendations
        if (this.energyLevel < 0.2) {
            recommendations.push('Consider calling it a day if possible');
            recommendations.push('Gentle self-care activities only');
        } else if (this.energyLevel < 0.4) {
            recommendations.push('Reduce social interactions for now');
            recommendations.push('Focus on essential tasks only');
        }
        
        // General recovery recommendations
        recommendations.push('Hydrate and nourish yourself');
        recommendations.push('Connect with your authentic self');
        
        return recommendations;
    }
    
    /**
     * Create masking level indicator UI
     */
    createMaskingLevelIndicator() {
        // This would integrate with the existing Velvet UI
        // For now, we'll prepare the data structure for UI integration
        
        this.maskingUI = {
            maskingLevelIndicator: {
                element: null, // Will be created by UI integration
                updateLevel: (level) => {
                    // Update visual indicator of current masking level
                    console.log(`🎭 Masking level: ${Math.round(level * 100)}%`);
                },
                updateIndicators: (indicators) => {
                    // Update specific masking indicators
                    console.log('🔍 Masking indicators:', indicators);
                }
            }
        };
    }
    
    /**
     * Create energy visualization UI
     */
    createEnergyVisualization() {
        this.energyUI = {
            energyBar: {
                element: null,
                updateEnergy: (energyLevel) => {
                    console.log(`⚡ Energy level: ${Math.round(energyLevel * 100)}%`);
                },
                updateExpenditure: (dailySpent) => {
                    console.log(`📊 Daily energy spent: ${dailySpent.toFixed(2)}`);
                }
            }
        };
    }
    
    /**
     * Create safe space indicator UI
     */
    createSafeSpaceIndicator() {
        this.safeSpaceUI = {
            safetyIndicator: {
                element: null,
                updateSafety: (safetyLevel) => {
                    console.log(`🏠 Safety level: ${Math.round(safetyLevel * 100)}%`);
                },
                showUnmaskingPrompt: (prompt) => {
                    console.log(`💭 Unmasking prompt: ${prompt.message}`);
                }
            }
        };
    }
    
    /**
     * Event system implementation
     */
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }
    
    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in masking detector event listener for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * Get system capabilities
     */
    getSystemCapabilities() {
        return {
            behavioralAnalysis: true,
            contextAwareness: true,
            safeSpaceDetection: true,
            energyTracking: true,
            realTimeMonitoring: this.isActive,
            integrations: {
                screenIntelligence: !!this.integrations.screenIntelligence,
                socialDecoder: !!this.integrations.socialDecoder,
                aiPersonality: !!this.integrations.aiPersonality,
                enhancedOCR: !!this.integrations.enhancedOCR
            }
        };
    }
    
    /**
     * Get current masking status
     */
    getMaskingStatus() {
        return {
            currentMaskingLevel: this.currentMaskingLevel,
            energyLevel: this.energyLevel,
            safetyLevel: this.safeSpaceDetection.currentSafetyLevel,
            environment: this.contextAwareness.currentEnvironment,
            timeContext: this.contextAwareness.timeOfDay,
            dailyEnergySpent: this.energyTracking.dailyEnergySpent,
            recentPatterns: {
                formality: this.communicationPatterns.formalLanguage.recentSamples.slice(-5),
                emotion: this.communicationPatterns.emotionalExpression.recentSamples.slice(-5),
                energy: this.communicationPatterns.energySignature.recentSamples.slice(-5)
            },
            lastUpdate: Date.now()
        };
    }
    
    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            systemHealth: this.isActive ? 'active' : 'inactive',
            integrationStatus: this.getSystemCapabilities().integrations
        };
    }
    
    /**
     * Deactivate the masking fatigue detection system
     */
    async deactivate() {
        console.log('🛑 Deactivating Masking Fatigue Detection System...');
        
        this.isActive = false;
        
        // Clear intervals
        if (this.analysisInterval) clearInterval(this.analysisInterval);
        if (this.contextUpdateInterval) clearInterval(this.contextUpdateInterval);
        if (this.energyUpdateInterval) clearInterval(this.energyUpdateInterval);
        
        // Clear event listeners
        this.eventListeners.clear();
        
        console.log('✅ Masking Fatigue Detection System deactivated');
    }
    
    // Additional utility methods for integration
    
    /**
     * Classify environment from text content
     */
    classifyEnvironmentFromText(text) {
        const indicators = this.contextAwareness.environmentIndicators;
        const textLower = text.toLowerCase();
        
        let scores = {};
        
        Object.keys(indicators).forEach(environment => {
            scores[environment] = 0;
            indicators[environment].forEach(keyword => {
                if (textLower.includes(keyword)) {
                    scores[environment] += 1;
                }
            });
        });
        
        const maxScore = Math.max(...Object.values(scores));
        const bestMatch = Object.keys(scores).find(env => scores[env] === maxScore);
        
        return {
            environment: bestMatch,
            confidence: maxScore > 0 ? Math.min(1.0, maxScore / 5) : 0
        };
    }
    
    /**
     * Classify environment from application usage
     */
    classifyEnvironmentFromApp(appName, windowTitle) {
        const appContext = this.appContextMonitor.classifyApp(appName, windowTitle);
        
        const environmentMapping = {
            'professional': 'work',
            'personal': 'home',
            'creative': 'home',
            'unknown': 'unknown'
        };
        
        return environmentMapping[appContext.context] || 'unknown';
    }
    
    /**
     * Classify environment from time patterns
     */
    classifyEnvironmentFromTime() {
        const timeContext = this.timeAwareness.getCurrentTimeContext();
        
        const timeEnvironmentMapping = {
            'morning_routine': 'home',
            'morning_work': 'work',
            'lunch_break': 'work',
            'afternoon_work': 'work',
            'evening_transition': 'home',
            'evening_personal': 'home',
            'night_wind_down': 'home'
        };
        
        return timeEnvironmentMapping[timeContext] || 'unknown';
    }
    
    /**
     * Infer environment from app context
     */
    inferEnvironmentFromAppContext(appClassification) {
        const contextEnvironmentMap = {
            'professional': 'work',
            'personal': 'home',
            'creative': 'home',
            'unknown': this.classifyEnvironmentFromTime()
        };
        
        return contextEnvironmentMap[appClassification.context] || 'unknown';
    }
}

// Export for integration with Velvet systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MaskingFatigueDetector;
} else if (typeof window !== 'undefined') {
    window.MaskingFatigueDetector = MaskingFatigueDetector;
}

console.log('🎭 Masking Fatigue Detection System loaded - ready for viral neurodivergent support');