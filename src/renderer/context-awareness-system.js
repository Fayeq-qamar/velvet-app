// Context Awareness System - Environmental Masking Detection
// Detects home vs work/school environments for masking fatigue awareness
// Integrates with Screen Intelligence and Enhanced OCR systems

/**
 * ContextAwarenessSystem
 * 
 * Advanced environmental detection system that identifies when users are in different
 * contexts (home, work, school, social) to provide appropriate masking fatigue support.
 * 
 * Core Capabilities:
 * - Real-time environment classification from screen content
 * - Application usage pattern analysis for context detection
 * - Time-of-day masking expectation patterns
 * - Social load assessment and pressure detection
 * - Safe space vs performance space identification
 * 
 * Viral User Experience Goals:
 * - "You're switching to work mode" awareness moments
 * - "You're safe at home now" transition recognition
 * - "High social pressure detected" energy warnings
 * - Context-aware masking support and recovery guidance
 */

class ContextAwarenessSystem {
    constructor() {
        console.log('🏠 Initializing Context Awareness System...');
        
        // Core system state
        this.isActive = false;
        this.currentContext = {
            environment: 'unknown',
            confidence: 0,
            subContext: 'unknown',
            socialLoad: 0,
            pressureLevel: 0,
            maskingExpectation: 0.5,
            lastUpdate: Date.now()
        };
        
        // Environment detection patterns
        this.environmentPatterns = {
            home: {
                applications: [
                    'spotify', 'netflix', 'youtube', 'games', 'steam', 'epic games',
                    'tiktok', 'instagram', 'reddit', 'discord', 'whatsapp',
                    'photos', 'music', 'tv', 'plex', 'vlc'
                ],
                windowTitles: [
                    'home', 'personal', 'family', 'playlist', 'watching',
                    'gaming', 'social', 'messaging', 'entertainment'
                ],
                screenContent: [
                    'welcome home', 'personal account', 'your profile', 'family',
                    'playlist', 'now playing', 'your library', 'recommended for you',
                    'continue watching', 'your friends', 'private message'
                ],
                timePatterns: {
                    evening: 0.9,      // 6-10 PM strongly suggests home
                    night: 0.95,       // 10 PM - 6 AM almost certainly home
                    weekend: 0.8,      // Weekends lean home
                    earlyMorning: 0.7  // 6-8 AM likely home routine
                }
            },
            
            work: {
                applications: [
                    'slack', 'teams', 'zoom', 'webex', 'outlook', 'mail',
                    'calendar', 'excel', 'word', 'powerpoint', 'notion',
                    'asana', 'trello', 'jira', 'figma', 'sketch',
                    'chrome', 'safari', 'firefox' // when used with work content
                ],
                windowTitles: [
                    'meeting', 'project', 'work', 'office', 'business',
                    'corporate', 'client', 'deadline', 'presentation',
                    'report', 'email', 'calendar', 'conference'
                ],
                screenContent: [
                    'meeting', 'agenda', 'deadline', 'project', 'client',
                    'quarterly', 'budget', 'proposal', 'corporate',
                    'professional', 'business', 'office', 'team',
                    'colleague', 'manager', 'department', 'company'
                ],
                timePatterns: {
                    workHours: 0.9,    // 9 AM - 5 PM strongly suggests work
                    lunchTime: 0.7,    // 12-2 PM could be work lunch
                    weekday: 0.8       // Weekdays lean work during day
                }
            },
            
            school: {
                applications: [
                    'zoom', 'teams', 'canvas', 'blackboard', 'moodle',
                    'google classroom', 'schoology', 'brightspace',
                    'word', 'docs', 'sheets', 'powerpoint', 'slides'
                ],
                windowTitles: [
                    'class', 'course', 'assignment', 'homework', 'study',
                    'lecture', 'professor', 'student', 'school',
                    'university', 'college', 'education', 'learning'
                ],
                screenContent: [
                    'assignment', 'homework', 'due date', 'professor',
                    'class', 'course', 'semester', 'grade', 'student',
                    'university', 'college', 'lecture', 'study',
                    'textbook', 'syllabus', 'exam', 'quiz'
                ],
                timePatterns: {
                    schoolHours: 0.9,  // 8 AM - 4 PM school hours
                    weekday: 0.8,      // Weekdays lean school
                    studyEvening: 0.6  // 6-10 PM could be homework
                }
            },
            
            social: {
                applications: [
                    'zoom', 'facetime', 'skype', 'discord', 'whatsapp',
                    'messenger', 'telegram', 'instagram', 'tiktok',
                    'twitter', 'facebook', 'snapchat', 'pinterest'
                ],
                windowTitles: [
                    'chat', 'call', 'video', 'friends', 'social',
                    'party', 'event', 'hangout', 'group', 'conversation'
                ],
                screenContent: [
                    'friends', 'social', 'party', 'event', 'hangout',
                    'group chat', 'video call', 'social media',
                    'online friends', 'community', 'server'
                ],
                timePatterns: {
                    evening: 0.7,      // Evenings often social
                    weekend: 0.8,      // Weekends lean social
                    afternoon: 0.5     // Afternoons could be social
                }
            },
            
            public: {
                applications: [
                    'maps', 'uber', 'lyft', 'transit', 'weather',
                    'yelp', 'foursquare', 'calendar', 'notes'
                ],
                windowTitles: [
                    'directions', 'location', 'transit', 'weather',
                    'appointment', 'reservation', 'booking'
                ],
                screenContent: [
                    'directions', 'location', 'address', 'transit',
                    'appointment', 'reservation', 'weather',
                    'public', 'outside', 'travel', 'commute'
                ],
                timePatterns: {
                    commute: 0.8,      // 7-9 AM, 5-7 PM commute times
                    midday: 0.6,       // Could be lunch/errands
                    weekend: 0.5       // Weekend activities
                }
            }
        };
        
        // Social load and pressure indicators
        this.socialPressurePatterns = {
            high: {
                environments: ['work', 'school', 'public'],
                applications: ['zoom', 'teams', 'meeting', 'presentation'],
                keywords: ['meeting', 'presentation', 'interview', 'performance review',
                          'client', 'boss', 'manager', 'professor', 'evaluation'],
                timeMultipliers: {
                    'morning_work': 1.2,
                    'afternoon_work': 1.3,
                    'meeting_time': 1.5
                }
            },
            
            medium: {
                environments: ['work', 'school', 'social'],
                applications: ['email', 'slack', 'collaborative tools'],
                keywords: ['team', 'group', 'colleague', 'classmate', 'deadline'],
                timeMultipliers: {
                    'work_hours': 1.1,
                    'social_evening': 1.0
                }
            },
            
            low: {
                environments: ['home'],
                applications: ['personal apps', 'entertainment'],
                keywords: ['personal', 'family', 'relax', 'home'],
                timeMultipliers: {
                    'evening_personal': 0.5,
                    'night_wind_down': 0.3,
                    'weekend_home': 0.4
                }
            }
        };
        
        // Context transition patterns
        this.transitionPatterns = {
            'work_to_home': {
                indicators: ['end of work day', 'commute apps', 'personal apps'],
                typicalTimes: ['5:00 PM', '6:00 PM', '7:00 PM'],
                maskingRecoveryOpportunity: true,
                message: "Work day ending - time to let your guard down"
            },
            
            'home_to_work': {
                indicators: ['morning routine', 'work apps', 'professional content'],
                typicalTimes: ['8:00 AM', '9:00 AM', '10:00 AM'],
                maskingIncreaseExpected: true,
                message: "Switching to work mode - I see you preparing your professional self"
            },
            
            'weekend_to_weekday': {
                indicators: ['sunday evening', 'monday morning', 'work preparation'],
                maskingAnxiety: true,
                message: "Weekend ending - it's natural to feel the masking pressure returning"
            },
            
            'social_to_solitude': {
                indicators: ['leaving social apps', 'personal time', 'recovery activities'],
                recoveryOpportunity: true,
                message: "Social time ending - space to be your authentic self now"
            }
        };
        
        // Masking expectation levels by context
        this.maskingExpectations = {
            'work_meeting': 0.9,
            'work_general': 0.7,
            'school_class': 0.8,
            'school_general': 0.6,
            'social_group': 0.5,
            'social_intimate': 0.2,
            'public_interaction': 0.8,
            'public_solo': 0.4,
            'home_family': 0.3,
            'home_alone': 0.1
        };
        
        // Integration points
        this.integrations = {
            screenIntelligence: null,
            enhancedOCR: null,
            maskingDetector: null,
            socialDecoder: null
        };
        
        // Context history tracking
        this.contextHistory = [];
        this.transitionHistory = [];
        this.environmentConfidenceHistory = [];
        
        // Performance metrics
        this.metrics = {
            totalDetections: 0,
            correctTransitions: 0,
            environmentChanges: 0,
            highConfidenceDetections: 0,
            pressureWarnings: 0
        };
        
        // Analysis intervals
        this.contextAnalysisInterval = null;
        this.transitionDetectionInterval = null;
        
        console.log('✅ Context Awareness System core initialized');
    }
    
    /**
     * Initialize the context awareness system
     */
    async initialize() {
        try {
            console.log('🏠 Starting Context Awareness System...');
            
            // Connect to existing Velvet systems
            await this.connectToSystems();
            
            // Initialize environment detection
            this.initializeEnvironmentDetection();
            
            // Start context analysis
            this.startContextAnalysis();
            
            // Initialize transition detection
            this.initializeTransitionDetection();
            
            // Set up pressure monitoring
            this.initializePressureMonitoring();
            
            this.isActive = true;
            console.log('✅ Context Awareness System active and monitoring');
            
            return true;
            
        } catch (error) {
            console.error('❌ Context Awareness System initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Connect to existing Velvet systems
     */
    async connectToSystems() {
        console.log('🔗 Connecting to Velvet systems...');
        
        // Connect to Screen Intelligence
        if (window.screenIntelligence) {
            this.integrations.screenIntelligence = window.screenIntelligence;
            
            // Register for window change events
            this.integrations.screenIntelligence.on('windowChange', (windowInfo) => {
                this.analyzeWindowContext(windowInfo);
            });
            
            // Register for pattern detection
            this.integrations.screenIntelligence.on('patternDetected', (pattern) => {
                this.analyzePatternContext(pattern);
            });
            
            console.log('✅ Connected to Screen Intelligence');
        }
        
        // Connect to Enhanced OCR
        if (window.enhancedOCRProcessor) {
            this.integrations.enhancedOCR = window.enhancedOCRProcessor;
            console.log('✅ Connected to Enhanced OCR');
        }
        
        // Connect to Masking Fatigue Detector
        if (window.maskingFatigueDetector) {
            this.integrations.maskingDetector = window.maskingFatigueDetector;
            console.log('✅ Connected to Masking Fatigue Detector');
        }
    }
    
    /**
     * Initialize environment detection algorithms
     */
    initializeEnvironmentDetection() {
        this.environmentDetector = {
            // Analyze application for environment clues
            analyzeApplication: (appName, windowTitle) => {
                return this.classifyEnvironmentFromApp(appName, windowTitle);
            },
            
            // Analyze screen content for environment clues
            analyzeScreenContent: async (screenText) => {
                return this.classifyEnvironmentFromContent(screenText);
            },
            
            // Analyze time patterns for environment probability
            analyzeTimeContext: () => {
                return this.getTimeBasedEnvironmentProbabilities();
            },
            
            // Combine multiple signals for final classification
            combineSignals: (appSignal, contentSignal, timeSignal) => {
                return this.combineEnvironmentSignals(appSignal, contentSignal, timeSignal);
            }
        };
        
        console.log('🏠 Environment detection initialized');
    }
    
    /**
     * Start real-time context analysis
     */
    startContextAnalysis() {
        console.log('⚡ Starting real-time context analysis...');
        
        // Main context analysis - every 15 seconds
        this.contextAnalysisInterval = setInterval(() => {
            this.performContextAnalysis();
        }, 15000);
        
        console.log('✅ Context analysis started');
    }
    
    /**
     * Initialize transition detection
     */
    initializeTransitionDetection() {
        this.transitionDetector = {
            // Detect environment transitions
            detectEnvironmentTransition: (oldContext, newContext) => {
                return this.analyzeEnvironmentTransition(oldContext, newContext);
            },
            
            // Detect pressure level changes
            detectPressureTransition: (oldPressure, newPressure) => {
                return this.analyzePressureTransition(oldPressure, newPressure);
            },
            
            // Detect significant context shifts
            detectSignificantShift: (contextHistory) => {
                return this.analyzeContextShift(contextHistory);
            }
        };
        
        console.log('🔄 Transition detection initialized');
    }
    
    /**
     * Initialize pressure monitoring system
     */
    initializePressureMonitoring() {
        this.pressureMonitor = {
            // Calculate social load from context
            calculateSocialLoad: (environment, appContext, timeContext) => {
                return this.assessSocialLoad(environment, appContext, timeContext);
            },
            
            // Calculate masking pressure
            calculateMaskingPressure: (socialLoad, environment, timeContext) => {
                return this.assessMaskingPressure(socialLoad, environment, timeContext);
            },
            
            // Generate pressure warnings
            generatePressureWarning: (pressureLevel, context) => {
                return this.createPressureWarning(pressureLevel, context);
            }
        };
        
        console.log('⚠️ Pressure monitoring initialized');
    }
    
    /**
     * Perform comprehensive context analysis
     */
    async performContextAnalysis() {
        try {
            if (!this.isActive) return;
            
            // Get application context
            const appContext = this.getCurrentApplicationContext();
            
            // Get screen content context
            const screenContext = await this.getScreenContentContext();
            
            // Get time context
            const timeContext = this.getTimeContext();
            
            // Combine signals for environment classification
            const environmentClassification = this.environmentDetector.combineSignals(
                appContext,
                screenContext,
                timeContext
            );
            
            // Calculate social load and pressure
            const socialLoad = this.pressureMonitor.calculateSocialLoad(
                environmentClassification.environment,
                appContext,
                timeContext
            );
            
            const maskingPressure = this.pressureMonitor.calculateMaskingPressure(
                socialLoad,
                environmentClassification.environment,
                timeContext
            );
            
            // Create new context state
            const newContext = {
                environment: environmentClassification.environment,
                confidence: environmentClassification.confidence,
                subContext: environmentClassification.subContext,
                socialLoad: socialLoad,
                pressureLevel: maskingPressure,
                maskingExpectation: this.getMaskingExpectation(environmentClassification, timeContext),
                lastUpdate: Date.now(),
                analysisDetails: {
                    appContext: appContext,
                    screenContext: screenContext,
                    timeContext: timeContext
                }
            };
            
            // Detect transitions
            const transition = this.detectContextTransition(this.currentContext, newContext);
            if (transition) {
                this.handleContextTransition(transition);
            }
            
            // Update current context
            this.updateCurrentContext(newContext);
            
            // Check for pressure warnings
            if (maskingPressure > 0.7) {
                this.generateHighPressureWarning(newContext);
            }
            
            // Update metrics
            this.metrics.totalDetections++;
            if (environmentClassification.confidence > 0.7) {
                this.metrics.highConfidenceDetections++;
            }
            
        } catch (error) {
            console.error('❌ Context analysis failed:', error);
        }
    }
    
    /**
     * Get current application context
     */
    getCurrentApplicationContext() {
        if (!this.integrations.screenIntelligence) {
            return { environment: 'unknown', confidence: 0 };
        }
        
        const stats = this.integrations.screenIntelligence.getStats();
        const currentWindow = stats.currentWindow;
        
        if (!currentWindow) {
            return { environment: 'unknown', confidence: 0 };
        }
        
        return this.classifyEnvironmentFromApp(currentWindow.name, currentWindow.title);
    }
    
    /**
     * Get screen content context
     */
    async getScreenContentContext() {
        try {
            let screenText = null;
            
            // Try enhanced OCR first
            if (this.integrations.enhancedOCR && this.integrations.enhancedOCR.isInitialized) {
                const enhancedResult = await this.integrations.enhancedOCR.getEnhancedScreenText();
                if (enhancedResult && enhancedResult.text) {
                    screenText = enhancedResult.text;
                }
            }
            
            // Fallback to basic screen monitoring
            if (!screenText && window.screenOCRMonitor && window.screenOCRMonitor.currentScreenText) {
                screenText = window.screenOCRMonitor.currentScreenText;
            }
            
            if (screenText) {
                return this.classifyEnvironmentFromContent(screenText);
            }
            
            return { environment: 'unknown', confidence: 0, keywords: [] };
            
        } catch (error) {
            console.error('❌ Screen content context analysis failed:', error);
            return { environment: 'unknown', confidence: 0, keywords: [] };
        }
    }
    
    /**
     * Get time-based context
     */
    getTimeContext() {
        const now = new Date();
        const hour = now.getHours();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        let timeCategory;
        if (hour >= 6 && hour < 9) timeCategory = 'morning_routine';
        else if (hour >= 9 && hour < 12) timeCategory = 'morning_work';
        else if (hour >= 12 && hour < 14) timeCategory = 'lunch_time';
        else if (hour >= 14 && hour < 17) timeCategory = 'afternoon_work';
        else if (hour >= 17 && hour < 19) timeCategory = 'evening_transition';
        else if (hour >= 19 && hour < 22) timeCategory = 'evening_personal';
        else timeCategory = 'night_wind_down';
        
        return {
            hour: hour,
            dayOfWeek: dayOfWeek,
            isWeekend: isWeekend,
            category: timeCategory
            // Removed environmentProbabilities to break circular dependency
            // environmentProbabilities should be calculated separately when needed
        };
    }
    
    /**
     * Classify environment from application and window title
     */
    classifyEnvironmentFromApp(appName, windowTitle) {
        const appLower = (appName || '').toLowerCase();
        const titleLower = (windowTitle || '').toLowerCase();
        
        let bestMatch = { environment: 'unknown', confidence: 0, indicators: [] };
        
        // Check each environment pattern
        Object.keys(this.environmentPatterns).forEach(environment => {
            const pattern = this.environmentPatterns[environment];
            let score = 0;
            let indicators = [];
            
            // Check application matches
            pattern.applications.forEach(app => {
                if (appLower.includes(app.toLowerCase())) {
                    score += 0.8;
                    indicators.push(`app:${app}`);
                }
            });
            
            // Check window title matches
            pattern.windowTitles.forEach(title => {
                if (titleLower.includes(title.toLowerCase())) {
                    score += 0.6;
                    indicators.push(`title:${title}`);
                }
            });
            
            if (score > bestMatch.confidence) {
                bestMatch = {
                    environment: environment,
                    confidence: Math.min(1.0, score),
                    indicators: indicators
                };
            }
        });
        
        return bestMatch;
    }
    
    /**
     * Classify environment from screen content
     */
    classifyEnvironmentFromContent(screenText) {
        const textLower = screenText.toLowerCase();
        
        let bestMatch = { environment: 'unknown', confidence: 0, keywords: [] };
        
        // Check each environment pattern
        Object.keys(this.environmentPatterns).forEach(environment => {
            const pattern = this.environmentPatterns[environment];
            let score = 0;
            let keywords = [];
            
            // Check screen content keywords
            pattern.screenContent.forEach(keyword => {
                if (textLower.includes(keyword.toLowerCase())) {
                    score += 0.3;
                    keywords.push(keyword);
                }
            });
            
            if (score > bestMatch.confidence) {
                bestMatch = {
                    environment: environment,
                    confidence: Math.min(1.0, score),
                    keywords: keywords
                };
            }
        });
        
        return bestMatch;
    }
    
    /**
     * Get time-based environment probabilities
     */
    getTimeBasedEnvironmentProbabilities() {
        const timeContext = this.getTimeContext();
        const probabilities = {};
        
        // Calculate probability for each environment based on time
        Object.keys(this.environmentPatterns).forEach(environment => {
            const pattern = this.environmentPatterns[environment];
            let probability = 0.2; // Base probability
            
            // Apply time-based multipliers
            Object.keys(pattern.timePatterns).forEach(timePattern => {
                if (this.matchesTimePattern(timePattern, timeContext)) {
                    probability = Math.max(probability, pattern.timePatterns[timePattern]);
                }
            });
            
            probabilities[environment] = probability;
        });
        
        return probabilities;
    }
    
    /**
     * Check if current time matches a time pattern
     */
    matchesTimePattern(timePattern, timeContext) {
        switch (timePattern) {
            case 'workHours':
                return timeContext.hour >= 9 && timeContext.hour < 17 && !timeContext.isWeekend;
            case 'evening':
                return timeContext.hour >= 18 && timeContext.hour < 22;
            case 'night':
                return timeContext.hour >= 22 || timeContext.hour < 6;
            case 'weekend':
                return timeContext.isWeekend;
            case 'weekday':
                return !timeContext.isWeekend;
            case 'schoolHours':
                return timeContext.hour >= 8 && timeContext.hour < 16 && !timeContext.isWeekend;
            case 'commute':
                return (timeContext.hour >= 7 && timeContext.hour < 9) || 
                       (timeContext.hour >= 17 && timeContext.hour < 19);
            default:
                return false;
        }
    }
    
    /**
     * Combine multiple environment signals
     */
    combineEnvironmentSignals(appSignal, contentSignal, timeSignal) {
        // Weight the different signals
        const appWeight = 0.5;
        const contentWeight = 0.3;
        const timeWeight = 0.2;
        
        let combinedScores = {};
        
        // Initialize scores for all environments
        Object.keys(this.environmentPatterns).forEach(env => {
            combinedScores[env] = 0;
        });
        
        // Add app signal
        if (appSignal && appSignal.environment !== 'unknown') {
            combinedScores[appSignal.environment] += appSignal.confidence * appWeight;
        }
        
        // Add content signal
        if (contentSignal && contentSignal.environment !== 'unknown') {
            combinedScores[contentSignal.environment] += contentSignal.confidence * contentWeight;
        }
        
        // Add time-based probabilities
        if (timeSignal && timeSignal.environmentProbabilities) {
            Object.keys(timeSignal.environmentProbabilities).forEach(env => {
                combinedScores[env] += timeSignal.environmentProbabilities[env] * timeWeight;
            });
        }
        
        // Find best match
        let bestEnvironment = 'unknown';
        let maxScore = 0;
        
        Object.keys(combinedScores).forEach(env => {
            if (combinedScores[env] > maxScore) {
                maxScore = combinedScores[env];
                bestEnvironment = env;
            }
        });
        
        // Determine sub-context
        const subContext = this.determineSubContext(bestEnvironment, appSignal, contentSignal);
        
        return {
            environment: bestEnvironment,
            confidence: Math.min(1.0, maxScore),
            subContext: subContext,
            allScores: combinedScores
        };
    }
    
    /**
     * Determine sub-context within environment
     */
    determineSubContext(environment, appSignal, contentSignal) {
        if (environment === 'work') {
            if (appSignal.indicators.some(ind => ind.includes('meeting'))) return 'meeting';
            if (contentSignal.keywords.some(kw => kw.includes('presentation'))) return 'presentation';
            return 'general';
        } else if (environment === 'home') {
            if (appSignal.indicators.some(ind => ind.includes('entertainment'))) return 'relaxation';
            if (contentSignal.keywords.some(kw => kw.includes('family'))) return 'family';
            return 'personal';
        } else if (environment === 'social') {
            if (appSignal.indicators.some(ind => ind.includes('video'))) return 'video_call';
            if (contentSignal.keywords.some(kw => kw.includes('group'))) return 'group_chat';
            return 'messaging';
        }
        
        return 'general';
    }
    
    /**
     * Calculate social load from context
     */
    assessSocialLoad(environment, appContext, timeContext) {
        let socialLoad = 0;
        
        // Base social load by environment
        const baseSocialLoads = {
            'work': 0.7,
            'school': 0.6,
            'social': 0.8,
            'public': 0.5,
            'home': 0.2
        };
        
        socialLoad = baseSocialLoads[environment] || 0.3;
        
        // Adjust based on application context
        if (appContext.indicators) {
            appContext.indicators.forEach(indicator => {
                if (indicator.includes('meeting') || indicator.includes('video')) {
                    socialLoad += 0.2;
                }
                if (indicator.includes('presentation')) {
                    socialLoad += 0.3;
                }
            });
        }
        
        // Time-based adjustments
        if (timeContext.category === 'morning_work' || timeContext.category === 'afternoon_work') {
            socialLoad += 0.1;
        }
        
        return Math.min(1.0, socialLoad);
    }
    
    /**
     * Calculate masking pressure from social load and context
     */
    assessMaskingPressure(socialLoad, environment, timeContext) {
        let maskingPressure = socialLoad;
        
        // Environment-based pressure multipliers
        const environmentMultipliers = {
            'work': 1.2,
            'school': 1.1,
            'public': 1.3,
            'social': 1.0,
            'home': 0.5
        };
        
        maskingPressure *= environmentMultipliers[environment] || 1.0;
        
        // Time-based pressure adjustments
        if (timeContext.category === 'morning_work' && environment === 'work') {
            maskingPressure += 0.1; // Monday morning pressure
        }
        
        if (timeContext.category === 'evening_transition') {
            maskingPressure *= 0.8; // Winding down
        }
        
        return Math.min(1.0, Math.max(0.0, maskingPressure));
    }
    
    /**
     * Get masking expectation for context
     */
    getMaskingExpectation(environmentClassification, timeContext) {
        const environment = environmentClassification.environment;
        const subContext = environmentClassification.subContext;
        
        // Create context key
        const contextKey = `${environment}_${subContext}`;
        
        // Return expectation or calculate from environment
        return this.maskingExpectations[contextKey] || 
               this.maskingExpectations[environment] || 
               0.5;
    }
    
    /**
     * Detect context transitions
     */
    detectContextTransition(oldContext, newContext) {
        // Check for environment change
        if (oldContext.environment !== newContext.environment) {
            const transitionKey = `${oldContext.environment}_to_${newContext.environment}`;
            
            // Check if this is a known transition pattern
            const knownTransition = Object.keys(this.transitionPatterns).find(pattern => 
                pattern.includes(oldContext.environment) && pattern.includes(newContext.environment)
            );
            
            return {
                type: 'environment_change',
                from: oldContext.environment,
                to: newContext.environment,
                pattern: knownTransition,
                confidenceChange: newContext.confidence - oldContext.confidence,
                pressureChange: newContext.pressureLevel - oldContext.pressureLevel,
                timestamp: Date.now()
            };
        }
        
        // Check for significant pressure change
        const pressureChange = Math.abs(newContext.pressureLevel - oldContext.pressureLevel);
        if (pressureChange > 0.3) {
            return {
                type: 'pressure_change',
                environment: newContext.environment,
                pressureChange: pressureChange,
                direction: newContext.pressureLevel > oldContext.pressureLevel ? 'increase' : 'decrease',
                timestamp: Date.now()
            };
        }
        
        return null;
    }
    
    /**
     * Handle context transition
     */
    handleContextTransition(transition) {
        console.log(`🔄 Context transition detected: ${transition.type}`, transition);
        
        // Store transition in history
        this.transitionHistory.push(transition);
        this.maintainTransitionHistory();
        
        // Generate appropriate response
        let transitionMessage = null;
        let supportAction = null;
        
        if (transition.type === 'environment_change') {
            if (transition.pattern && this.transitionPatterns[transition.pattern]) {
                const pattern = this.transitionPatterns[transition.pattern];
                transitionMessage = pattern.message;
                
                if (pattern.maskingRecoveryOpportunity) {
                    supportAction = 'recovery_prompt';
                } else if (pattern.maskingIncreaseExpected) {
                    supportAction = 'masking_awareness';
                }
            } else {
                transitionMessage = `Environment changed from ${transition.from} to ${transition.to}`;
            }
        } else if (transition.type === 'pressure_change') {
            if (transition.direction === 'increase') {
                transitionMessage = `Masking pressure increasing in ${transition.environment} environment`;
                supportAction = 'pressure_warning';
            } else {
                transitionMessage = `Pressure decreasing - opportunity to relax your guard`;
                supportAction = 'recovery_prompt';
            }
        }
        
        // Emit transition event
        this.emit('contextTransition', {
            transition: transition,
            message: transitionMessage,
            supportAction: supportAction,
            timestamp: Date.now()
        });
        
        // Update metrics
        this.metrics.environmentChanges++;
    }
    
    /**
     * Generate high pressure warning
     */
    generateHighPressureWarning(context) {
        const warning = {
            type: 'high_masking_pressure',
            environment: context.environment,
            pressureLevel: context.pressureLevel,
            socialLoad: context.socialLoad,
            message: this.createPressureWarningMessage(context),
            recommendations: this.generatePressureRecommendations(context),
            timestamp: Date.now()
        };
        
        // Emit pressure warning
        this.emit('highPressureWarning', warning);
        
        this.metrics.pressureWarnings++;
        
        console.log(`⚠️ High masking pressure detected: ${Math.round(context.pressureLevel * 100)}% in ${context.environment}`);
    }
    
    /**
     * Create pressure warning message
     */
    createPressureWarningMessage(context) {
        if (context.environment === 'work' && context.pressureLevel > 0.8) {
            return "High performance pressure detected at work - remember to breathe and be gentle with yourself";
        } else if (context.environment === 'social' && context.socialLoad > 0.8) {
            return "Intense social situation detected - it's okay to take breaks and be authentic";
        } else if (context.environment === 'public' && context.pressureLevel > 0.7) {
            return "High masking energy required in this public space - conserve your energy where you can";
        } else {
            return `High masking pressure in ${context.environment} environment - remember your authentic self is valuable`;
        }
    }
    
    /**
     * Generate pressure management recommendations
     */
    generatePressureRecommendations(context) {
        const recommendations = [];
        
        if (context.pressureLevel > 0.8) {
            recommendations.push("Take micro-breaks when possible");
            recommendations.push("Focus on essential interactions only");
        }
        
        if (context.socialLoad > 0.7) {
            recommendations.push("Find quiet moments to recharge");
            recommendations.push("Remember: you don't need to perform for everyone");
        }
        
        if (context.environment === 'work') {
            recommendations.push("Step away from screen periodically");
            recommendations.push("Set boundaries around availability");
        }
        
        recommendations.push("Plan recovery time after this high-pressure period");
        
        return recommendations;
    }
    
    /**
     * Update current context
     */
    updateCurrentContext(newContext) {
        this.currentContext = newContext;
        
        // Add to context history
        this.contextHistory.push({
            ...newContext,
            timestamp: Date.now()
        });
        
        this.maintainContextHistory();
        
        // Emit context update
        this.emit('contextUpdated', newContext);
    }
    
    /**
     * Maintain context history size
     */
    maintainContextHistory() {
        const maxHistory = 100;
        if (this.contextHistory.length > maxHistory) {
            this.contextHistory = this.contextHistory.slice(-maxHistory);
        }
    }
    
    /**
     * Maintain transition history size
     */
    maintainTransitionHistory() {
        const maxHistory = 50;
        if (this.transitionHistory.length > maxHistory) {
            this.transitionHistory = this.transitionHistory.slice(-maxHistory);
        }
    }
    
    /**
     * Analyze window context from Screen Intelligence
     */
    analyzeWindowContext(windowInfo) {
        // This is called when Screen Intelligence detects window changes
        const appContext = this.classifyEnvironmentFromApp(windowInfo.name, windowInfo.title);
        
        // Store for next context analysis
        this.lastWindowContext = {
            windowInfo: windowInfo,
            appContext: appContext,
            timestamp: Date.now()
        };
    }
    
    /**
     * Analyze pattern context from Screen Intelligence
     */
    analyzePatternContext(pattern) {
        // Adjust context based on detected behavioral patterns
        if (pattern.type === 'hyperfocus' && this.currentContext.environment === 'work') {
            // Long focus session at work might increase pressure
            this.currentContext.pressureLevel = Math.min(1.0, this.currentContext.pressureLevel + 0.1);
        } else if (pattern.type === 'distractionSpiral') {
            // Distraction could indicate avoidance or overwhelm
            this.currentContext.socialLoad = Math.min(1.0, this.currentContext.socialLoad + 0.2);
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
                    console.error(`Error in context awareness event listener for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * Get current context status
     */
    getContextStatus() {
        return {
            isActive: this.isActive,
            currentContext: this.currentContext,
            recentTransitions: this.transitionHistory.slice(-5),
            contextHistory: this.contextHistory.slice(-10),
            metrics: this.metrics,
            systemConnections: {
                screenIntelligence: !!this.integrations.screenIntelligence,
                enhancedOCR: !!this.integrations.enhancedOCR,
                maskingDetector: !!this.integrations.maskingDetector
            }
        };
    }
    
    /**
     * Get environment probabilities for current time
     */
    getCurrentEnvironmentProbabilities() {
        return this.getTimeBasedEnvironmentProbabilities();
    }
    
    /**
     * Deactivate the context awareness system
     */
    async deactivate() {
        console.log('🛑 Deactivating Context Awareness System...');
        
        this.isActive = false;
        
        // Clear intervals
        if (this.contextAnalysisInterval) clearInterval(this.contextAnalysisInterval);
        if (this.transitionDetectionInterval) clearInterval(this.transitionDetectionInterval);
        
        // Clear event listeners
        if (this.eventListeners) {
            this.eventListeners.clear();
        }
        
        console.log('✅ Context Awareness System deactivated');
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContextAwarenessSystem;
} else if (typeof window !== 'undefined') {
    window.ContextAwarenessSystem = ContextAwarenessSystem;
}

console.log('🏠 Context Awareness System loaded - ready for environment detection');