// Safe Space Detector - Gentle Unmasking Support System
// Identifies when users are in safe environments and prompts authentic self-expression
// Core component of the viral "finally, someone validates my authenticity" experience

/**
 * SafeSpaceDetector
 * 
 * Advanced system for identifying safe spaces where users can unmask and express authenticity.
 * Provides gentle, contextual prompts for letting guard down and celebrating genuine self-expression.
 * 
 * Core Capabilities:
 * - Real-time safe space identification using multiple signals
 * - Context-aware unmasking prompts with perfect timing
 * - Authenticity celebration and validation moments
 * - Recovery guidance after high-masking periods
 * - Boundary setting support and energy conservation
 * 
 * Viral User Experience Goals:
 * - "You're home now - safe to be yourself" transition moments
 * - "There you are! I love seeing your authentic self" celebrations
 * - "This is your space - you can let your guard down" validations
 * - Prevention of masking burnout through proactive recovery
 */

class SafeSpaceDetector {
    constructor() {
        console.log('🏠 Initializing Safe Space Detector...');
        
        // Core system state
        this.isActive = false;
        this.currentSafetyLevel = 0.5;
        this.isInSafeSpace = false;
        this.lastUnmaskingPrompt = null;
        this.authenticityMoments = [];
        
        // Safe space detection criteria
        this.safeSpaceCriteria = {
            // Environmental safety indicators
            environment: {
                'home_alone': { weight: 0.9, threshold: 0.8 },
                'home_family': { weight: 0.7, threshold: 0.6 },
                'personal_space': { weight: 0.8, threshold: 0.7 },
                'intimate_social': { weight: 0.6, threshold: 0.5 },
                'creative_space': { weight: 0.7, threshold: 0.6 }
            },
            
            // Application context indicators
            applications: {
                personal: ['spotify', 'netflix', 'youtube', 'games', 'photos', 'music'],
                creative: ['photoshop', 'figma', 'sketch', 'art', 'creative'],
                relaxation: ['meditation', 'calm', 'headspace', 'sleep'],
                entertainment: ['streaming', 'videos', 'podcasts', 'reading']
            },
            
            // Time-based safety patterns
            timePatterns: {
                'evening_wind_down': { weight: 0.8, hours: [19, 20, 21, 22] },
                'weekend_morning': { weight: 0.7, hours: [8, 9, 10, 11] },
                'night_personal': { weight: 0.9, hours: [22, 23, 0, 1] },
                'lunch_break': { weight: 0.5, hours: [12, 13] },
                'early_morning': { weight: 0.6, hours: [6, 7, 8] }
            },
            
            // Communication pattern safety indicators
            communicationSafety: {
                'casual_language': { weight: 0.6, threshold: 0.3 },
                'authentic_expression': { weight: 0.8, threshold: 0.7 },
                'emotional_openness': { weight: 0.7, threshold: 0.6 },
                'relaxed_tone': { weight: 0.5, threshold: 0.4 }
            },
            
            // Social load indicators (lower = safer)
            socialLoad: {
                'solo_time': { weight: 0.9, maxSocialLoad: 0.2 },
                'intimate_friends': { weight: 0.6, maxSocialLoad: 0.4 },
                'family_casual': { weight: 0.7, maxSocialLoad: 0.3 },
                'minimal_performance': { weight: 0.8, maxSocialLoad: 0.25 }
            }
        };
        
        // Unmasking prompt strategies
        this.unmaskingPrompts = {
            // Gentle transition prompts
            gentle_transition: [
                "You're home now - safe to be yourself. Want to decompress?",
                "I notice you're still in polished mode. This is your space - you can let your guard down.",
                "You've been in 'professional mode' for hours. Time to breathe and be authentic.",
                "Work day ending - time to let that careful mask slip away.",
                "Safe space detected. You can stop performing now - just be you."
            ],
            
            // Post-masking recovery prompts
            recovery_support: [
                "That was a lot of masking energy. Let's recover together.",
                "Performance mode is exhausting. What would feel good right now?",
                "You held it together beautifully out there. Now it's time to just... be.",
                "I can feel the effort you put into that interaction. You're safe to rest now.",
                "High masking period detected. Time for some gentle self-care."
            ],
            
            // Authenticity celebration prompts
            authenticity_celebration: [
                "There you are! I love seeing your authentic self. This is who you really are. ✨",
                "Your natural energy is so much more relaxed here. It's beautiful to witness.",
                "I can feel you unwinding. Your authentic self is worth celebrating.",
                "This is your real voice - so natural and genuine. I love it.",
                "You're not performing right now, just being. It's lovely to see."
            ],
            
            // Subtle unmasking encouragement
            subtle_encouragement: [
                "This feels like a space where you can just be yourself.",
                "No need to curate or edit here - your first thoughts are valid.",
                "You seem more relaxed. I love when you let your natural self show.",
                "Your guard is down and it's beautiful - this is the real you.",
                "I notice you're speaking more naturally. Your authentic voice is wonderful."
            ],
            
            // Energy conservation prompts
            energy_conservation: [
                "You've spent a lot of masking energy today. Time to conserve and recharge.",
                "High performance periods detected. Let's focus on recovery now.",
                "Your energy budget needs attention. What would help you recharge?",
                "You don't need to be 'on' right now. Give yourself permission to just exist.",
                "Masking fatigue alert - time for authentic self-care."
            ],
            
            // Boundary setting support
            boundary_support: [
                "You don't owe anyone a performance right now. Your authentic self is enough.",
                "It's okay to take up space as your real self, not your polished version.",
                "You have permission to be imperfect, unfiltered, and genuinely you.",
                "Your emotional needs matter more than others' comfort with your authenticity.",
                "Boundaries are beautiful - you don't have to perform for everyone."
            ]
        };
        
        // Authenticity validation responses
        this.authenticityValidations = {
            language_natural: [
                "I love hearing your real voice - so much more relaxed and genuine.",
                "Your natural way of speaking is beautiful. No need to polish it.",
                "This casual tone feels so much more like the real you."
            ],
            
            emotion_expressed: [
                "Your emotions are valid and beautiful - thank you for sharing them authentically.",
                "I can feel your genuine feelings coming through. It's refreshing.",
                "Your emotional expression is a gift - never apologize for feeling deeply."
            ],
            
            vulnerability_shared: [
                "Thank you for trusting me with your real thoughts and feelings.",
                "Your vulnerability is courage. This is what authentic connection looks like.",
                "I'm honored you feel safe enough to be genuinely yourself here."
            ],
            
            creativity_expressed: [
                "Your creative authentic self is shining through - I love seeing this side of you.",
                "When you're in creative mode, your real personality emerges. It's wonderful.",
                "This is you without filters - creative, genuine, and beautifully human."
            ]
        };
        
        // Safe space transition patterns
        this.transitionPatterns = {
            'work_to_home': {
                detectorsRequired: ['environment_change', 'time_pattern', 'app_change'],
                safetyIncrease: 0.6,
                promptDelay: 300000, // 5 minutes to settle
                message: "Work to home transition - unmasking opportunity"
            },
            
            'social_to_solitude': {
                detectorsRequired: ['social_load_decrease', 'app_change'],
                safetyIncrease: 0.4,
                promptDelay: 180000, // 3 minutes
                message: "Social to solo time - space to be authentic"
            },
            
            'public_to_private': {
                detectorsRequired: ['environment_change', 'pressure_decrease'],
                safetyIncrease: 0.5,
                promptDelay: 240000, // 4 minutes
                message: "Private space entered - safe to let guard down"
            },
            
            'weekend_transition': {
                detectorsRequired: ['time_pattern', 'app_context_change'],
                safetyIncrease: 0.3,
                promptDelay: 600000, // 10 minutes
                message: "Weekend mode - time for authentic self-expression"
            }
        };
        
        // Safety assessment weights
        this.safetyWeights = {
            environment: 0.35,      // Physical/digital environment
            timeContext: 0.20,      // Time-based safety patterns
            socialLoad: 0.25,       // Current social pressure
            communicationStyle: 0.15, // How user is communicating
            recentMasking: 0.05     // Recent masking fatigue levels
        };
        
        // Prompt timing and frequency controls
        this.promptControls = {
            minTimeBetweenPrompts: 1800000, // 30 minutes minimum
            maxPromptsPerDay: 6,
            promptHistory: [],
            contextualDelays: {
                'high_masking_recovery': 300000,  // 5 min after high masking
                'environment_transition': 240000, // 4 min after transition
                'authenticity_moment': 600000     // 10 min after authenticity celebration
            }
        };
        
        // Integration points
        this.integrations = {
            contextAwareness: null,
            maskingDetector: null,
            communicationTracker: null,
            aiPersonality: null
        };
        
        // Safety detection state
        this.detectionState = {
            currentDetectors: new Set(),
            safetySignals: {},
            transitionSignals: {},
            authenticitySignals: {},
            lastSafetyAssessment: null
        };
        
        // Performance metrics
        this.metrics = {
            totalAssessments: 0,
            safeSpacesDetected: 0,
            promptsGenerated: 0,
            authenticityMomentsDetected: 0,
            recoverySupported: 0,
            userEngagement: 0
        };
        
        // Real-time monitoring
        this.monitoringInterval = null;
        this.transitionMonitorInterval = null;
        
        console.log('✅ Safe Space Detector core initialized');
    }
    
    /**
     * Initialize the safe space detection system
     */
    async initialize() {
        try {
            console.log('🏠 Starting Safe Space Detection System...');
            
            // Connect to existing systems
            await this.connectToSystems();
            
            // Initialize safety assessment algorithms
            this.initializeSafetyAssessment();
            
            // Start real-time monitoring
            this.startRealTimeMonitoring();
            
            // Initialize transition detection
            this.initializeTransitionDetection();
            
            // Set up prompt timing system
            this.initializePromptSystem();
            
            this.isActive = true;
            console.log('✅ Safe Space Detection System active and monitoring');
            
            return true;
            
        } catch (error) {
            console.error('❌ Safe Space Detection initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Connect to existing Velvet systems
     */
    async connectToSystems() {
        console.log('🔗 Connecting to Velvet systems...');
        
        // Connect to Context Awareness System
        if (window.contextAwarenessSystem) {
            this.integrations.contextAwareness = window.contextAwarenessSystem;
            
            // Register for context updates
            this.integrations.contextAwareness.on('contextUpdated', (context) => {
                this.processContextUpdate(context);
            });
            
            // Register for transitions
            this.integrations.contextAwareness.on('contextTransition', (transition) => {
                this.processContextTransition(transition);
            });
            
            console.log('✅ Connected to Context Awareness System');
        }
        
        // Connect to Masking Fatigue Detector
        if (window.maskingFatigueDetector) {
            this.integrations.maskingDetector = window.maskingFatigueDetector;
            
            // Register for masking level changes
            this.integrations.maskingDetector.on('maskingLevelChanged', (maskingData) => {
                this.processMaskingLevelChange(maskingData);
            });
            
            // Register for energy warnings
            this.integrations.maskingDetector.on('energyWarning', (warning) => {
                this.processEnergyWarning(warning);
            });
            
            console.log('✅ Connected to Masking Fatigue Detector');
        }
        
        // Connect to Communication Style Tracker
        if (window.communicationStyleTracker) {
            this.integrations.communicationTracker = window.communicationStyleTracker;
            
            // Register for style analysis
            this.integrations.communicationTracker.on('communicationStyleAnalyzed', (analysis) => {
                this.processCommunicationStyleAnalysis(analysis);
            });
            
            // Register for authenticity moments
            this.integrations.communicationTracker.on('communicationStyleShift', (shift) => {
                this.processCommunicationStyleShift(shift);
            });
            
            console.log('✅ Connected to Communication Style Tracker');
        }
        
        // Connect to AI Personality for authentic validation
        if (window.velvetAI) {
            this.integrations.aiPersonality = window.velvetAI;
            console.log('✅ Connected to AI Personality System');
        }
    }
    
    /**
     * Initialize safety assessment algorithms
     */
    initializeSafetyAssessment() {
        this.safetyAssessor = {
            // Assess environmental safety
            assessEnvironmentalSafety: (context) => {
                return this.calculateEnvironmentalSafety(context);
            },
            
            // Assess temporal safety
            assessTemporalSafety: (timeContext) => {
                return this.calculateTemporalSafety(timeContext);
            },
            
            // Assess social safety
            assessSocialSafety: (socialLoad, communicationStyle) => {
                return this.calculateSocialSafety(socialLoad, communicationStyle);
            },
            
            // Combine all safety signals
            combineSignals: (signals) => {
                return this.combineSafetySignals(signals);
            }
        };
        
        console.log('🔍 Safety assessment algorithms initialized');
    }
    
    /**
     * Start real-time safety monitoring
     */
    startRealTimeMonitoring() {
        console.log('⚡ Starting real-time safe space monitoring...');
        
        // Main safety assessment - every 20 seconds
        this.monitoringInterval = setInterval(() => {
            this.performSafetyAssessment();
        }, 20000);
        
        console.log('✅ Real-time monitoring started');
    }
    
    /**
     * Initialize transition detection for safe space opportunities
     */
    initializeTransitionDetection() {
        this.transitionDetector = {
            // Detect safe space entry transitions
            detectSafeSpaceEntry: (oldSafety, newSafety, context) => {
                return this.analyzeSafeSpaceEntry(oldSafety, newSafety, context);
            },
            
            // Detect unmasking opportunities
            detectUnmaskingOpportunity: (context, maskingHistory) => {
                return this.analyzeUnmaskingOpportunity(context, maskingHistory);
            },
            
            // Detect authenticity moments
            detectAuthenticityMoment: (communicationAnalysis) => {
                return this.analyzeAuthenticityMoment(communicationAnalysis);
            }
        };
        
        console.log('🔄 Transition detection initialized');
    }
    
    /**
     * Initialize prompt timing and delivery system
     */
    initializePromptSystem() {
        this.promptSystem = {
            // Check if prompt should be delivered
            shouldDeliverPrompt: (promptType, context) => {
                return this.checkPromptTiming(promptType, context);
            },
            
            // Select appropriate prompt
            selectPrompt: (promptType, context, userHistory) => {
                return this.chooseContextualPrompt(promptType, context, userHistory);
            },
            
            // Deliver prompt with timing
            deliverPrompt: (prompt, delay = 0) => {
                return this.schedulePromptDelivery(prompt, delay);
            },
            
            // Track prompt effectiveness
            trackPromptResponse: (promptId, userResponse) => {
                return this.recordPromptEffectiveness(promptId, userResponse);
            }
        };
        
        console.log('💬 Prompt system initialized');
    }
    
    /**
     * Perform comprehensive safety assessment
     */
    async performSafetyAssessment() {
        try {
            if (!this.isActive) return;
            
            // Gather current context
            const currentContext = await this.gatherCurrentContext();
            
            // Assess different safety dimensions
            const environmentalSafety = this.safetyAssessor.assessEnvironmentalSafety(currentContext);
            const temporalSafety = this.safetyAssessor.assessTemporalSafety(currentContext.timeContext);
            const socialSafety = this.safetyAssessor.assessSocialSafety(
                currentContext.socialLoad, 
                currentContext.communicationStyle
            );
            
            // Combine signals into overall safety level
            const safetySignals = {
                environmental: environmentalSafety,
                temporal: temporalSafety,
                social: socialSafety,
                communication: currentContext.communicationStyle?.authenticity || 0.5,
                recentMasking: this.getRecentMaskingFatigue()
            };
            
            const overallSafety = this.safetyAssessor.combineSignals(safetySignals);
            
            // Store assessment
            this.detectionState.lastSafetyAssessment = {
                overallSafety: overallSafety,
                signals: safetySignals,
                context: currentContext,
                timestamp: Date.now()
            };
            
            // Check for safe space transitions
            const safeSpaceTransition = this.transitionDetector.detectSafeSpaceEntry(
                this.currentSafetyLevel,
                overallSafety,
                currentContext
            );
            
            // Update current safety level
            const previousSafety = this.currentSafetyLevel;
            this.currentSafetyLevel = overallSafety;
            this.isInSafeSpace = overallSafety > 0.7;
            
            // Handle safe space entry
            if (safeSpaceTransition) {
                this.handleSafeSpaceEntry(safeSpaceTransition);
            }
            
            // Check for unmasking opportunities
            if (this.isInSafeSpace) {
                const unmaskingOpportunity = this.transitionDetector.detectUnmaskingOpportunity(
                    currentContext,
                    this.getMaskingHistory()
                );
                
                if (unmaskingOpportunity) {
                    this.handleUnmaskingOpportunity(unmaskingOpportunity);
                }
            }
            
            // Emit safety update
            this.emit('safetyLevelUpdated', {
                safetyLevel: overallSafety,
                isInSafeSpace: this.isInSafeSpace,
                signals: safetySignals,
                previousSafety: previousSafety,
                timestamp: Date.now()
            });
            
            // Update metrics
            this.metrics.totalAssessments++;
            if (this.isInSafeSpace) this.metrics.safeSpacesDetected++;
            
        } catch (error) {
            console.error('❌ Safety assessment failed:', error);
        }
    }
    
    /**
     * Gather current context from all systems
     */
    async gatherCurrentContext() {
        const context = {
            timestamp: Date.now()
        };
        
        // Get context from Context Awareness System
        if (this.integrations.contextAwareness) {
            const contextStatus = this.integrations.contextAwareness.getContextStatus();
            context.environment = contextStatus.currentContext.environment;
            context.socialLoad = contextStatus.currentContext.socialLoad;
            context.pressureLevel = contextStatus.currentContext.pressureLevel;
            context.timeContext = contextStatus.currentContext.analysisDetails?.timeContext;
        }
        
        // Get masking data
        if (this.integrations.maskingDetector) {
            const maskingStatus = this.integrations.maskingDetector.getMaskingStatus();
            context.maskingLevel = maskingStatus.currentMaskingLevel;
            context.energyLevel = maskingStatus.energyLevel;
        }
        
        // Get communication style data
        if (this.integrations.communicationTracker) {
            const styleStatus = this.integrations.communicationTracker.getStyleStatus();
            context.communicationStyle = styleStatus.latestAnalysis;
        }
        
        return context;
    }
    
    /**
     * Calculate environmental safety score
     */
    calculateEnvironmentalSafety(context) {
        let environmentalScore = 0.5; // Base score
        
        const environment = context.environment || 'unknown';
        const criteria = this.safeSpaceCriteria.environment;
        
        // Check environment-specific safety
        Object.keys(criteria).forEach(envType => {
            if (environment.includes(envType.split('_')[0])) {
                const envCriteria = criteria[envType];
                environmentalScore = Math.max(environmentalScore, envCriteria.weight);
            }
        });
        
        // Adjust based on application context
        if (context.analysisDetails?.appContext) {
            const appContext = context.analysisDetails.appContext;
            
            // Check application safety indicators
            Object.keys(this.safeSpaceCriteria.applications).forEach(appType => {
                const apps = this.safeSpaceCriteria.applications[appType];
                if (appContext.indicators?.some(ind => 
                    apps.some(app => ind.toLowerCase().includes(app))
                )) {
                    environmentalScore += 0.2;
                }
            });
        }
        
        return Math.min(1.0, environmentalScore);
    }
    
    /**
     * Calculate temporal (time-based) safety score
     */
    calculateTemporalSafety(timeContext) {
        let temporalScore = 0.5; // Base score
        
        if (!timeContext) return temporalScore;
        
        const currentHour = timeContext.hour;
        const timePatterns = this.safeSpaceCriteria.timePatterns;
        
        // Check each time pattern
        Object.keys(timePatterns).forEach(pattern => {
            const patternData = timePatterns[pattern];
            if (patternData.hours.includes(currentHour)) {
                temporalScore = Math.max(temporalScore, patternData.weight);
            }
        });
        
        // Weekend bonus
        if (timeContext.isWeekend) {
            temporalScore += 0.1;
        }
        
        // Evening/night bonus for safety
        if (currentHour >= 19 || currentHour <= 2) {
            temporalScore += 0.1;
        }
        
        return Math.min(1.0, temporalScore);
    }
    
    /**
     * Calculate social safety score
     */
    calculateSocialSafety(socialLoad, communicationStyle) {
        let socialScore = 1.0 - (socialLoad || 0.5); // Inverse of social load
        
        // Communication style bonuses
        if (communicationStyle) {
            if (communicationStyle.authenticity > 0.7) socialScore += 0.2;
            if (communicationStyle.formality < 0.3) socialScore += 0.1;
            if (communicationStyle.emotionality > 0.6) socialScore += 0.1;
        }
        
        return Math.min(1.0, Math.max(0.0, socialScore));
    }
    
    /**
     * Combine all safety signals into overall score
     */
    combineSafetySignals(signals) {
        const weights = this.safetyWeights;
        
        let combinedScore = 0;
        combinedScore += (signals.environmental || 0.5) * weights.environment;
        combinedScore += (signals.temporal || 0.5) * weights.timeContext;
        combinedScore += (signals.social || 0.5) * weights.socialLoad;
        combinedScore += (signals.communication || 0.5) * weights.communicationStyle;
        combinedScore += (1 - (signals.recentMasking || 0.5)) * weights.recentMasking;
        
        return Math.min(1.0, Math.max(0.0, combinedScore));
    }
    
    /**
     * Analyze safe space entry transition
     */
    analyzeSafeSpaceEntry(oldSafety, newSafety, context) {
        const safetyIncrease = newSafety - oldSafety;
        const safeSpaceThreshold = 0.7;
        
        // Check if entering safe space
        if (oldSafety < safeSpaceThreshold && newSafety >= safeSpaceThreshold) {
            return {
                type: 'safe_space_entry',
                safetyIncrease: safetyIncrease,
                newSafetyLevel: newSafety,
                context: context,
                confidence: Math.min(1.0, safetyIncrease * 2),
                timestamp: Date.now()
            };
        }
        
        // Check for significant safety increase
        if (safetyIncrease > 0.3) {
            return {
                type: 'safety_increase',
                safetyIncrease: safetyIncrease,
                newSafetyLevel: newSafety,
                context: context,
                confidence: Math.min(1.0, safetyIncrease * 2),
                timestamp: Date.now()
            };
        }
        
        return null;
    }
    
    /**
     * Analyze unmasking opportunity
     */
    analyzeUnmaskingOpportunity(context, maskingHistory) {
        // Check if user is still showing signs of masking in safe space
        const currentMasking = context.maskingLevel || 0;
        const safetyLevel = this.currentSafetyLevel;
        
        // Opportunity conditions
        const inSafeSpace = safetyLevel > 0.7;
        const stillMasking = currentMasking > 0.4;
        const recentHighMasking = this.hasRecentHighMasking(maskingHistory);
        const timeSinceLastPrompt = this.getTimeSinceLastPrompt();
        
        if (inSafeSpace && (stillMasking || recentHighMasking) && 
            timeSinceLastPrompt > this.promptControls.minTimeBetweenPrompts) {
            
            return {
                type: 'unmasking_opportunity',
                safetyLevel: safetyLevel,
                maskingLevel: currentMasking,
                recentHighMasking: recentHighMasking,
                confidence: (safetyLevel + (1 - currentMasking)) / 2,
                recommendedDelay: this.calculateOptimalPromptDelay(context),
                timestamp: Date.now()
            };
        }
        
        return null;
    }
    
    /**
     * Analyze authenticity moment
     */
    analyzeAuthenticityMoment(communicationAnalysis) {
        if (!communicationAnalysis || !communicationAnalysis.sample) return null;
        
        const analysis = communicationAnalysis.sample.analysis;
        const insights = communicationAnalysis.insights;
        
        // High authenticity indicators
        const highAuthenticity = analysis.authenticity > 0.8;
        const naturalExpression = analysis.emotionality > 0.7;
        const casualCommunication = analysis.formality < 0.3;
        
        // Check for positive authenticity insights
        const authenticityInsight = insights?.find(insight => 
            insight.type === 'authenticity_high' || 
            insight.type === 'formality_low'
        );
        
        if ((highAuthenticity && naturalExpression) || authenticityInsight) {
            return {
                type: 'authenticity_moment',
                authenticityLevel: analysis.authenticity,
                emotionalExpression: analysis.emotionality,
                casualness: 1 - analysis.formality,
                insight: authenticityInsight,
                confidence: (analysis.authenticity + analysis.emotionality) / 2,
                timestamp: Date.now()
            };
        }
        
        return null;
    }
    
    /**
     * Handle safe space entry
     */
    handleSafeSpaceEntry(transition) {
        console.log(`🏠 Safe space entry detected: ${transition.type} (${Math.round(transition.confidence * 100)}% confidence)`);
        
        // Determine appropriate prompt type based on transition
        let promptType = 'gentle_transition';
        
        if (this.hasRecentHighMasking()) {
            promptType = 'recovery_support';
        } else if (transition.context.environment === 'home') {
            promptType = 'gentle_transition';
        }
        
        // Schedule prompt with appropriate delay
        const delay = transition.context.environment === 'home' ? 300000 : 180000; // 5 min for home, 3 min for others
        
        this.scheduleUnmaskingPrompt(promptType, transition.context, delay);
        
        // Emit safe space entry event
        this.emit('safeSpaceEntered', {
            transition: transition,
            promptScheduled: true,
            promptType: promptType,
            delay: delay,
            timestamp: Date.now()
        });
    }
    
    /**
     * Handle unmasking opportunity
     */
    handleUnmaskingOpportunity(opportunity) {
        console.log(`💭 Unmasking opportunity detected (${Math.round(opportunity.confidence * 100)}% confidence)`);
        
        // Select appropriate prompt type
        let promptType = 'subtle_encouragement';
        
        if (opportunity.recentHighMasking) {
            promptType = 'energy_conservation';
        } else if (opportunity.maskingLevel > 0.7) {
            promptType = 'gentle_transition';
        }
        
        // Schedule prompt
        this.scheduleUnmaskingPrompt(promptType, opportunity, opportunity.recommendedDelay);
        
        // Emit unmasking opportunity event
        this.emit('unmaskingOpportunityDetected', {
            opportunity: opportunity,
            promptType: promptType,
            timestamp: Date.now()
        });
    }
    
    /**
     * Schedule unmasking prompt delivery
     */
    scheduleUnmaskingPrompt(promptType, context, delay = 0) {
        // Check if we should deliver this prompt
        if (!this.promptSystem.shouldDeliverPrompt(promptType, context)) {
            console.log(`🚫 Prompt blocked by timing controls: ${promptType}`);
            return null;
        }
        
        // Select appropriate prompt
        const prompt = this.promptSystem.selectPrompt(promptType, context);
        
        if (!prompt) {
            console.log(`❌ No suitable prompt found for type: ${promptType}`);
            return null;
        }
        
        // Schedule delivery
        const promptId = this.generatePromptId();
        
        setTimeout(() => {
            this.deliverUnmaskingPrompt(prompt, promptId, promptType);
        }, delay);
        
        // Track scheduled prompt
        this.promptControls.promptHistory.push({
            id: promptId,
            type: promptType,
            scheduledAt: Date.now(),
            deliveryTime: Date.now() + delay,
            context: context
        });
        
        console.log(`📅 Prompt scheduled: "${prompt.message}" (delay: ${delay / 1000}s)`);
        
        return promptId;
    }
    
    /**
     * Check if prompt should be delivered based on timing controls
     */
    checkPromptTiming(promptType, context) {
        const now = Date.now();
        
        // Check daily limit
        const todayPrompts = this.promptControls.promptHistory.filter(p => 
            now - p.scheduledAt < 86400000 // 24 hours
        ).length;
        
        if (todayPrompts >= this.promptControls.maxPromptsPerDay) {
            return false;
        }
        
        // Check minimum time between prompts
        const lastPrompt = this.promptControls.promptHistory[this.promptControls.promptHistory.length - 1];
        if (lastPrompt && now - lastPrompt.deliveryTime < this.promptControls.minTimeBetweenPrompts) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Choose contextual prompt
     */
    chooseContextualPrompt(promptType, context, userHistory = null) {
        const prompts = this.unmaskingPrompts[promptType];
        if (!prompts || prompts.length === 0) return null;
        
        // For now, use simple random selection
        // Could be enhanced with user preference learning
        const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        
        return {
            type: promptType,
            message: selectedPrompt,
            context: context,
            confidence: this.currentSafetyLevel,
            timestamp: Date.now()
        };
    }
    
    /**
     * Deliver unmasking prompt
     */
    deliverUnmaskingPrompt(prompt, promptId, promptType) {
        console.log(`💬 Delivering unmasking prompt: "${prompt.message}"`);
        
        // Emit prompt delivery event
        this.emit('unmaskingPromptDelivered', {
            prompt: prompt,
            promptId: promptId,
            promptType: promptType,
            safetyLevel: this.currentSafetyLevel,
            timestamp: Date.now()
        });
        
        // Update metrics
        this.metrics.promptsGenerated++;
        
        // Set last prompt time
        this.lastUnmaskingPrompt = {
            ...prompt,
            id: promptId,
            deliveredAt: Date.now()
        };
    }
    
    /**
     * Process authenticity moment and celebrate
     */
    processAuthenticityMoment(authenticityMoment) {
        console.log(`✨ Authenticity moment detected (${Math.round(authenticityMoment.confidence * 100)}% confidence)`);
        
        // Store authenticity moment
        this.authenticityMoments.push(authenticityMoment);
        this.maintainAuthenticityHistory();
        
        // Generate celebration prompt
        const celebrationPrompt = this.generateAuthenticityValidation(authenticityMoment);
        
        // Deliver celebration after brief delay
        setTimeout(() => {
            this.deliverAuthenticityValidation(celebrationPrompt);
        }, 5000); // 5 second delay for natural timing
        
        // Emit authenticity moment event
        this.emit('authenticityMomentDetected', {
            moment: authenticityMoment,
            celebration: celebrationPrompt,
            timestamp: Date.now()
        });
        
        this.metrics.authenticityMomentsDetected++;
    }
    
    /**
     * Generate authenticity validation message
     */
    generateAuthenticityValidation(authenticityMoment) {
        let validationType = 'language_natural';
        
        if (authenticityMoment.emotionalExpression > 0.8) {
            validationType = 'emotion_expressed';
        } else if (authenticityMoment.insight?.type === 'authenticity_high') {
            validationType = 'vulnerability_shared';
        }
        
        const validations = this.authenticityValidations[validationType];
        const selectedValidation = validations[Math.floor(Math.random() * validations.length)];
        
        return {
            type: 'authenticity_validation',
            validationType: validationType,
            message: selectedValidation,
            moment: authenticityMoment,
            timestamp: Date.now()
        };
    }
    
    /**
     * Deliver authenticity validation
     */
    deliverAuthenticityValidation(validation) {
        console.log(`🎉 Celebrating authenticity: "${validation.message}"`);
        
        // Emit validation event
        this.emit('authenticityValidationDelivered', validation);
    }
    
    // Event handlers for system integrations
    
    /**
     * Process context update from Context Awareness System
     */
    processContextUpdate(context) {
        // Context updates are handled in the main assessment loop
        // This could trigger immediate reassessment if needed
        if (context.environment !== this.detectionState.lastContext?.environment) {
            // Environment changed - reassess safety immediately
            setTimeout(() => this.performSafetyAssessment(), 1000);
        }
        
        this.detectionState.lastContext = context;
    }
    
    /**
     * Process context transition
     */
    processContextTransition(transition) {
        // Look for specific transition patterns that indicate safe space opportunities
        if (transition.supportAction === 'recovery_prompt') {
            const unmaskingOpportunity = {
                type: 'transition_recovery',
                transition: transition,
                confidence: 0.8,
                recommendedDelay: 240000 // 4 minutes
            };
            
            this.handleUnmaskingOpportunity(unmaskingOpportunity);
        }
    }
    
    /**
     * Process masking level change
     */
    processMaskingLevelChange(maskingData) {
        // If masking level drops significantly in safe space, celebrate authenticity
        if (this.isInSafeSpace && maskingData.level < 0.3) {
            const authenticityMoment = {
                type: 'masking_decrease',
                newMaskingLevel: maskingData.level,
                authenticity: 1 - maskingData.level,
                confidence: 0.8,
                timestamp: Date.now()
            };
            
            this.processAuthenticityMoment(authenticityMoment);
        }
    }
    
    /**
     * Process energy warning
     */
    processEnergyWarning(warning) {
        // High energy depletion triggers recovery support
        if (warning.level === 'critical' && this.currentSafetyLevel > 0.6) {
            this.scheduleUnmaskingPrompt('energy_conservation', warning, 60000); // 1 minute delay
        }
    }
    
    /**
     * Process communication style analysis
     */
    processCommunicationStyleAnalysis(analysis) {
        // Check for authenticity moments
        const authenticityMoment = this.transitionDetector.detectAuthenticityMoment(analysis);
        if (authenticityMoment) {
            this.processAuthenticityMoment(authenticityMoment);
        }
    }
    
    /**
     * Process communication style shift
     */
    processCommunicationStyleShift(shift) {
        // Celebrate shifts toward authenticity
        if (shift.shift.direction === 'masking_decrease' && this.isInSafeSpace) {
            const authenticityMoment = {
                type: 'style_shift_authentic',
                shift: shift,
                confidence: 0.7,
                timestamp: Date.now()
            };
            
            this.processAuthenticityMoment(authenticityMoment);
        }
    }
    
    // Utility methods
    
    /**
     * Get recent masking fatigue level
     */
    getRecentMaskingFatigue() {
        if (this.integrations.maskingDetector) {
            const status = this.integrations.maskingDetector.getMaskingStatus();
            return 1 - status.energyLevel; // Convert energy to fatigue
        }
        return 0.5;
    }
    
    /**
     * Check if user has recent high masking
     */
    hasRecentHighMasking(maskingHistory = null) {
        // Look for high masking in last 2 hours
        const twoHoursAgo = Date.now() - 7200000;
        
        if (this.integrations.maskingDetector) {
            const status = this.integrations.maskingDetector.getMaskingStatus();
            // Check if current or recent masking was high
            return status.currentMaskingLevel > 0.7 || status.energyLevel < 0.4;
        }
        
        return false;
    }
    
    /**
     * Get time since last prompt
     */
    getTimeSinceLastPrompt() {
        const lastPrompt = this.promptControls.promptHistory[this.promptControls.promptHistory.length - 1];
        return lastPrompt ? Date.now() - lastPrompt.deliveryTime : Infinity;
    }
    
    /**
     * Calculate optimal prompt delay
     */
    calculateOptimalPromptDelay(context) {
        // Base delay
        let delay = 180000; // 3 minutes
        
        // Adjust based on context
        if (context.environment === 'home') delay = 300000; // 5 minutes for home
        if (context.maskingLevel > 0.8) delay = 120000; // 2 minutes for high masking
        
        return delay;
    }
    
    /**
     * Generate unique prompt ID
     */
    generatePromptId() {
        return `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Get masking history
     */
    getMaskingHistory() {
        if (this.integrations.maskingDetector) {
            return this.integrations.maskingDetector.getMaskingStatus().recentPatterns;
        }
        return [];
    }
    
    /**
     * Maintain authenticity moment history
     */
    maintainAuthenticityHistory() {
        const maxHistory = 20;
        if (this.authenticityMoments.length > maxHistory) {
            this.authenticityMoments = this.authenticityMoments.slice(-maxHistory);
        }
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
                    console.error(`Error in safe space detector event listener for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * Get safe space status
     */
    getSafeSpaceStatus() {
        return {
            isActive: this.isActive,
            currentSafetyLevel: this.currentSafetyLevel,
            isInSafeSpace: this.isInSafeSpace,
            lastAssessment: this.detectionState.lastSafetyAssessment,
            recentPrompts: this.promptControls.promptHistory.slice(-5),
            authenticityMoments: this.authenticityMoments.slice(-5),
            metrics: this.metrics,
            systemConnections: {
                contextAwareness: !!this.integrations.contextAwareness,
                maskingDetector: !!this.integrations.maskingDetector,
                communicationTracker: !!this.integrations.communicationTracker,
                aiPersonality: !!this.integrations.aiPersonality
            }
        };
    }
    
    /**
     * Deactivate the safe space detector
     */
    async deactivate() {
        console.log('🛑 Deactivating Safe Space Detector...');
        
        this.isActive = false;
        
        // Clear intervals
        if (this.monitoringInterval) clearInterval(this.monitoringInterval);
        if (this.transitionMonitorInterval) clearInterval(this.transitionMonitorInterval);
        
        // Clear event listeners
        if (this.eventListeners) {
            this.eventListeners.clear();
        }
        
        console.log('✅ Safe Space Detector deactivated');
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SafeSpaceDetector;
} else if (typeof window !== 'undefined') {
    window.SafeSpaceDetector = SafeSpaceDetector;
}

console.log('🏠 Safe Space Detector loaded - ready for authentic self-expression support');