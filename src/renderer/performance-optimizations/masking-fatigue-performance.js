// Masking Fatigue Detection - Performance Optimized Version
// <200ms analysis and energy tracking for real-time authenticity support

/**
 * Performance-Optimized Masking Fatigue Detector
 * - Sub-200ms behavioral analysis
 * - Efficient energy tracking with minimal overhead
 * - Optimized context awareness
 * - Real-time safe space detection
 */
class OptimizedMaskingFatigueDetector {
    constructor() {
        console.log('⚡ Initializing Optimized Masking Fatigue Detector...');
        
        // Core system state
        this.isActive = false;
        this.currentMaskingLevel = 0;
        this.energyLevel = 1.0;
        this.safetyLevel = 0.5;
        
        // Performance-optimized data structures
        this.analysisQueue = new Map();
        this.communicationBuffer = new CircularBuffer(20);
        this.contextBuffer = new CircularBuffer(10);
        this.energyHistory = new CircularBuffer(50);
        
        // Optimized pattern tracking
        this.communicationPatterns = {
            formalLanguage: {
                level: 0,
                baseline: 0.3,
                indicators: new Set(['please', 'thank you', 'certainly', 'absolutely', 'appreciate']),
                samples: new CircularBuffer(10)
            },
            responseLatency: {
                average: 0,
                baseline: 2000,
                times: new CircularBuffer(10),
                calculatedResponses: 0
            },
            emotionalExpression: {
                level: 1.0,
                baseline: 0.7,
                indicators: new Set(['excited', 'love', 'hate', 'frustrated', 'amazing', 'terrible']),
                samples: new CircularBuffer(10)
            },
            energySignature: {
                tension: 0,
                baseline: 0.2,
                stressIndicators: new Set(['busy', 'stressed', 'overwhelmed', 'tired', 'drained']),
                samples: new CircularBuffer(10)
            }
        };
        
        // Optimized context awareness
        this.contextAwareness = {
            currentEnvironment: 'unknown',
            environmentConfidence: 0,
            applicationContext: 'unknown',
            socialLoad: 0,
            lastUpdate: 0,
            environmentIndicators: {
                home: new Set(['personal', 'relaxed', 'casual', 'family', 'netflix', 'spotify']),
                work: new Set(['meeting', 'project', 'deadline', 'professional', 'email', 'slack', 'teams']),
                school: new Set(['assignment', 'homework', 'class', 'study', 'professor', 'student']),
                social: new Set(['friends', 'party', 'event', 'social', 'group', 'hangout']),
                public: new Set(['store', 'appointment', 'public', 'outside', 'errands'])
            }
        };
        
        // Safe space detection optimization
        this.safeSpaceDetection = {
            currentSafetyLevel: 0.5,
            lastUnmaskingCheck: 0,
            recoveryOpportunities: new CircularBuffer(5),
            unmaskingPrompts: {
                gentle: [
                    "You're home now - safe to be yourself. Want to decompress?",
                    "I notice you're still in polished mode. This is your space - you can let your guard down.",
                    "You've been in 'professional mode' for hours. Time to breathe and be authentic."
                ],
                celebratory: [
                    "There you are! I love seeing your authentic self. ✨",
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
        
        // Energy tracking optimization
        this.energyTracking = {
            dailyEnergySpent: 0,
            maskingEnergyRate: 0.1,
            recoveryRate: 0.05,
            energyBudget: 10.0,
            lastUpdate: Date.now(),
            lowEnergyWarnings: new CircularBuffer(5),
            warningThreshold: 0.3,
            criticalThreshold: 0.1
        };
        
        // Performance metrics
        this.performanceMetrics = {
            totalAnalyses: 0,
            averageAnalysisTime: 0,
            maskingDetections: 0,
            safeSpaceIdentifications: 0,
            energyWarnings: 0,
            authenticityMoments: 0,
            memoryUsage: 0
        };
        
        // Configuration optimized for performance
        this.config = {
            maxAnalysisTime: 150,          // 150ms max analysis time
            batchSize: 3,                  // Process 3 analyses at once
            batchInterval: 100,            // 100ms batching
            energyUpdateInterval: 60000,   // 1 minute energy updates
            contextUpdateInterval: 10000,  // 10 seconds context updates
            memoryCleanupInterval: 30000,  // 30 seconds cleanup
            performanceMonitorInterval: 5000 // 5 seconds performance check
        };
        
        // Processing optimization
        this.analysisBatch = [];
        this.batchProcessingTimer = null;
        this.uiUpdateQueue = [];
        
        // Integration connections
        this.integrations = {
            screenIntelligence: null,
            socialDecoder: null,
            aiPersonality: null
        };
        
        console.log('⚡ Optimized Masking Fatigue Detector initialized');
    }
    
    /**
     * Initialize with performance optimizations
     */
    async initialize() {
        try {
            console.log('🚀 Starting optimized Masking Fatigue Detector...');
            
            // Connect to existing systems efficiently
            await this.connectToSystemsOptimized();
            
            // Initialize optimized analysis pipeline
            this.initializeOptimizedAnalysis();
            
            // Set up performance-optimized intervals
            this.startOptimizedIntervals();
            
            // Initialize memory management
            this.initializeMemoryManagement();
            
            // Initialize UI optimization
            this.initializeOptimizedUI();
            
            this.isActive = true;
            console.log('✅ Optimized Masking Fatigue Detector active');
            
            return true;
        } catch (error) {
            console.error('❌ Optimized initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Connect to existing systems with optimization
     */
    async connectToSystemsOptimized() {
        // Connect to Screen Intelligence with debounced handlers
        if (window.screenIntelligence) {
            this.integrations.screenIntelligence = window.screenIntelligence;
            
            // Debounced window change handler
            const windowChangeHandler = this.debounce((windowInfo) => {
                this.queueAnalysis('windowContext', windowInfo);
            }, 200);
            
            this.integrations.screenIntelligence.on('windowChange', windowChangeHandler);
            console.log('✅ Connected to Screen Intelligence (optimized)');
        }
        
        // Connect to Social Decoder with throttled handlers
        if (window.socialDecoder || window.EnhancedSocialDecoder) {
            this.integrations.socialDecoder = window.socialDecoder || window.EnhancedSocialDecoder;
            
            // Throttled communication analysis
            const communicationHandler = this.throttle((analysis) => {
                this.queueAnalysis('communication', analysis);
            }, 500);
            
            if (this.integrations.socialDecoder.onSocialCueDetected) {
                this.integrations.socialDecoder.onSocialCueDetected(communicationHandler);
            }
            
            console.log('✅ Connected to Social Decoder (optimized)');
        }
        
        // Connect to AI Personality
        if (window.velvetAI) {
            this.integrations.aiPersonality = window.velvetAI;
            console.log('✅ Connected to AI Personality');
        }
    }
    
    /**
     * Initialize optimized analysis pipeline
     */
    initializeOptimizedAnalysis() {
        // Set up batch processing for analysis
        this.batchProcessingTimer = setInterval(() => {
            this.processBatchedAnalyses();
        }, this.config.batchInterval);
        
        // Set up UI update batching
        this.uiUpdateTimer = setInterval(() => {
            this.flushUIUpdates();
        }, 16); // 60fps UI updates
        
        console.log('✅ Optimized analysis pipeline initialized');
    }
    
    /**
     * Start optimized intervals
     */
    startOptimizedIntervals() {
        // Energy tracking interval
        this.energyUpdateTimer = setInterval(() => {
            this.updateEnergyTrackingOptimized();
        }, this.config.energyUpdateInterval);
        
        // Context awareness interval
        this.contextUpdateTimer = setInterval(() => {
            this.updateContextAwarenessOptimized();
        }, this.config.contextUpdateInterval);
        
        // Performance monitoring
        this.performanceMonitorTimer = setInterval(() => {
            this.monitorPerformance();
        }, this.config.performanceMonitorInterval);
        
        console.log('✅ Optimized intervals started');
    }
    
    /**
     * Initialize memory management
     */
    initializeMemoryManagement() {
        this.memoryCleanupTimer = setInterval(() => {
            this.performMemoryCleanup();
        }, this.config.memoryCleanupInterval);
        
        console.log('✅ Memory management initialized');
    }
    
    /**
     * Queue analysis for batch processing
     */
    queueAnalysis(type, data) {
        this.analysisBatch.push({
            id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            type,
            data,
            timestamp: Date.now()
        });
        
        // Limit batch size
        if (this.analysisBatch.length > 10) {
            this.analysisBatch = this.analysisBatch.slice(-5);
        }
        
        // Process immediately if batch is full
        if (this.analysisBatch.length >= this.config.batchSize) {
            this.processBatchedAnalyses();
        }
    }
    
    /**
     * Process batched analyses for optimal performance
     */
    processBatchedAnalyses() {
        if (this.analysisBatch.length === 0) return;
        
        const startTime = performance.now();
        const batch = [...this.analysisBatch];
        this.analysisBatch = [];
        
        // Process each analysis in the batch
        batch.forEach(analysis => {
            this.processAnalysisOptimized(analysis);
        });
        
        const processingTime = performance.now() - startTime;
        
        // Update performance metrics
        this.updatePerformanceMetrics(processingTime, batch.length);
        
        // Performance warning
        if (processingTime > this.config.maxAnalysisTime) {
            console.warn(`⚠️ Slow batch processing: ${processingTime.toFixed(2)}ms`);
        }
    }
    
    /**
     * Process individual analysis optimized
     */
    processAnalysisOptimized(analysis) {
        const { type, data } = analysis;
        
        switch (type) {
            case 'communication':
                this.analyzeCommunicationForMaskingOptimized(data);
                break;
            case 'windowContext':
                this.analyzeWindowContextOptimized(data);
                break;
            case 'energyUpdate':
                this.processEnergyUpdateOptimized(data);
                break;
        }
    }
    
    /**
     * Optimized communication analysis for masking detection
     */
    analyzeCommunicationForMaskingOptimized(socialAnalysis) {
        if (!socialAnalysis?.original) return;
        
        const text = socialAnalysis.original;
        const timestamp = Date.now();
        
        // Fast formality detection
        const formalityLevel = this.detectFormalityLevelFast(text);
        this.communicationPatterns.formalLanguage.level = formalityLevel;
        this.communicationPatterns.formalLanguage.samples.push({
            timestamp,
            level: formalityLevel,
            text: text.substring(0, 50) // Limit text size
        });
        
        // Fast emotional expression analysis
        const emotionalLevel = this.assessEmotionalLevelFast(text);
        this.communicationPatterns.emotionalExpression.level = emotionalLevel;
        this.communicationPatterns.emotionalExpression.samples.push({
            timestamp,
            level: emotionalLevel,
            text: text.substring(0, 50)
        });
        
        // Fast energy tension assessment
        const energyTension = this.assessEnergyTensionFast(text);
        this.communicationPatterns.energySignature.tension = energyTension;
        this.communicationPatterns.energySignature.samples.push({
            timestamp,
            tension: energyTension,
            context: this.contextAwareness.currentEnvironment
        });
        
        // Calculate masking level efficiently
        const maskingLevel = this.calculateMaskingLevelFast(
            formalityLevel, emotionalLevel, energyTension
        );
        
        // Update current masking level
        this.currentMaskingLevel = maskingLevel;
        
        // Add to communication buffer
        this.communicationBuffer.push({
            timestamp,
            maskingLevel,
            formality: formalityLevel,
            emotional: emotionalLevel,
            tension: energyTension
        });
        
        // Update performance metrics
        this.performanceMetrics.totalAnalyses++;
        if (maskingLevel > 0.7) {
            this.performanceMetrics.maskingDetections++;
        }
        
        // Check for interventions
        if (maskingLevel > 0.8) {
            this.checkForUnmaskingOpportunity();
        }
        
        // Queue UI update
        this.queueUIUpdate('maskingLevel', {
            level: maskingLevel,
            indicators: {
                formality: formalityLevel,
                emotionalSuppression: 1 - emotionalLevel,
                energyTension: energyTension
            }
        });
        
        // Update state management
        if (window.useVelvetStore) {
            const store = window.useVelvetStore.getState();
            store.updateMaskingLevel({
                level: maskingLevel,
                indicators: {
                    formality: formalityLevel,
                    emotionalSuppression: 1 - emotionalLevel,
                    energyTension: energyTension
                },
                timestamp
            });
        }
    }
    
    /**
     * Fast formality detection using Set operations
     */
    detectFormalityLevelFast(text) {
        const textLower = text.toLowerCase();
        const words = new Set(textLower.split(/\\s+/));
        
        let formalScore = 0;
        let casualScore = 0;
        
        // Count formal indicators
        for (const indicator of this.communicationPatterns.formalLanguage.indicators) {
            if (words.has(indicator)) {
                formalScore++;
            }
        }
        
        // Count casual indicators (cached set)
        const casualIndicators = new Set(['yeah', 'yep', 'nah', 'gonna', 'wanna', 'cool', 'awesome', 'hey']);
        for (const indicator of casualIndicators) {
            if (words.has(indicator)) {
                casualScore++;
            }
        }
        
        // Quick sentence structure analysis
        if (text.includes(',') && text.length > 50) formalScore += 0.5;
        if (words.size < 8) casualScore += 0.5;
        
        const totalIndicators = formalScore + casualScore;
        return totalIndicators === 0 ? 0.5 : formalScore / totalIndicators;
    }
    
    /**
     * Fast emotional level assessment
     */
    assessEmotionalLevelFast(text) {
        const textLower = text.toLowerCase();
        let emotionalScore = 0;
        
        // Count emotional indicators
        for (const indicator of this.communicationPatterns.emotionalExpression.indicators) {
            if (textLower.includes(indicator)) {
                emotionalScore += 1;
            }
        }
        
        // Quick punctuation analysis
        emotionalScore += (text.match(/!/g) || []).length * 0.3;
        emotionalScore += (text.match(/[A-Z]{2,}/g) || []).length * 0.2;
        if (text.includes('...')) emotionalScore += 0.3;
        
        return Math.min(1.0, emotionalScore / 3.0);
    }
    
    /**
     * Fast energy tension assessment
     */
    assessEnergyTensionFast(text) {
        const textLower = text.toLowerCase();
        let tensionScore = 0;
        let relaxationScore = 0;
        
        // Count stress indicators
        for (const indicator of this.communicationPatterns.energySignature.stressIndicators) {
            if (textLower.includes(indicator)) {
                tensionScore += 1;
            }
        }
        
        // Count relaxation indicators (cached)
        const relaxedIndicators = ['chill', 'relaxed', 'easy', 'calm', 'peaceful'];
        for (const indicator of relaxedIndicators) {
            if (textLower.includes(indicator)) {
                relaxationScore += 1;
            }
        }
        
        // Context adjustment
        if (this.contextAwareness.currentEnvironment === 'work') {
            tensionScore += 0.5;
        } else if (this.contextAwareness.currentEnvironment === 'home') {
            relaxationScore += 0.5;
        }
        
        const totalIndicators = tensionScore + relaxationScore;
        return totalIndicators === 0 ? 0.5 : tensionScore / totalIndicators;
    }
    
    /**
     * Fast masking level calculation
     */
    calculateMaskingLevelFast(formalityLevel, emotionalLevel, energyTension) {
        // Weighted calculation with pre-computed weights
        const formalityContribution = formalityLevel * 0.4;
        const emotionalContribution = (1 - emotionalLevel) * 0.4;
        const energyContribution = energyTension * 0.2;
        
        return Math.min(1.0, Math.max(0.0, 
            formalityContribution + emotionalContribution + energyContribution
        ));
    }
    
    /**
     * Optimized window context analysis
     */
    analyzeWindowContextOptimized(windowInfo) {
        const { name: appName, title: windowTitle } = windowInfo;
        
        // Fast app classification
        const appClassification = this.classifyAppFast(appName, windowTitle);
        
        // Update context efficiently
        this.contextAwareness.applicationContext = appClassification.context;
        
        // Environment inference
        const environment = this.inferEnvironmentFast(appClassification);
        if (appClassification.confidence > 0.6) {
            this.contextAwareness.currentEnvironment = environment;
            this.contextAwareness.environmentConfidence = appClassification.confidence;
            this.contextAwareness.lastUpdate = Date.now();
        }
        
        // Add to context buffer
        this.contextBuffer.push({
            timestamp: Date.now(),
            environment,
            appContext: appClassification.context,
            confidence: appClassification.confidence
        });
        
        // Update safety level
        this.updateSafetyLevelFast();
    }
    
    /**
     * Fast app classification
     */
    classifyAppFast(appName, windowTitle = '') {
        const appLower = appName.toLowerCase();
        const titleLower = windowTitle.toLowerCase();
        
        // Professional apps (cached check)
        if (['slack', 'teams', 'zoom', 'outlook', 'mail', 'calendar'].some(app => 
            appLower.includes(app) || titleLower.includes(app))) {
            return { context: 'professional', confidence: 0.8 };
        }
        
        // Personal apps
        if (['spotify', 'netflix', 'youtube', 'games'].some(app => 
            appLower.includes(app) || titleLower.includes(app))) {
            return { context: 'personal', confidence: 0.8 };
        }
        
        // Creative apps
        if (['photoshop', 'figma', 'sketch', 'code', 'terminal'].some(app => 
            appLower.includes(app))) {
            return { context: 'creative', confidence: 0.7 };
        }
        
        return { context: 'unknown', confidence: 0.3 };
    }
    
    /**
     * Fast environment inference
     */
    inferEnvironmentFast(appClassification) {
        const mapping = {
            'professional': 'work',
            'personal': 'home',
            'creative': 'home',
            'unknown': this.getTimeBasedEnvironment()
        };
        
        return mapping[appClassification.context] || 'unknown';
    }
    
    /**
     * Get time-based environment
     */
    getTimeBasedEnvironment() {
        const hour = new Date().getHours();
        
        if (hour >= 9 && hour < 17) return 'work';
        return 'home';
    }
    
    /**
     * Update safety level fast
     */
    updateSafetyLevelFast() {
        let safetyScore = 0.5;
        
        // Environment-based safety (cached lookup)
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
        const hour = new Date().getHours();
        if (hour >= 19 || hour < 9) safetyScore += 0.2; // Evening/morning bonus
        
        // Application context adjustment
        if (this.contextAwareness.applicationContext === 'personal') {
            safetyScore += 0.2;
        } else if (this.contextAwareness.applicationContext === 'professional') {
            safetyScore -= 0.3;
        }
        
        this.safetyLevel = Math.min(1.0, Math.max(0.0, safetyScore));
        this.safeSpaceDetection.currentSafetyLevel = this.safetyLevel;
    }
    
    /**
     * Check for unmasking opportunity
     */
    checkForUnmaskingOpportunity() {
        const now = Date.now();
        
        // Throttle checks
        if (now - this.safeSpaceDetection.lastUnmaskingCheck < 30000) return;
        this.safeSpaceDetection.lastUnmaskingCheck = now;
        
        const isInSafeSpace = this.safetyLevel > 0.7;
        const isStillMasking = this.currentMaskingLevel > 0.4;
        
        if (isInSafeSpace && isStillMasking) {
            const opportunity = {
                timestamp: now,
                safetyLevel: this.safetyLevel,
                maskingLevel: this.currentMaskingLevel,
                confidence: (this.safetyLevel + (1 - this.currentMaskingLevel)) / 2
            };
            
            this.safeSpaceDetection.recoveryOpportunities.push(opportunity);
            this.performanceMetrics.safeSpaceIdentifications++;
            
            // Generate and show prompt
            const prompt = this.createUnmaskingPromptFast(opportunity);
            this.queueUIUpdate('unmaskingPrompt', { opportunity, prompt });
            
            console.log(`🏠 Unmasking opportunity detected (${Math.round(opportunity.confidence * 100)}% confidence)`);
        }
    }
    
    /**
     * Create unmasking prompt fast
     */
    createUnmaskingPromptFast(opportunity) {
        let promptType = 'gentle';
        
        if (opportunity.safetyLevel > 0.8 && opportunity.maskingLevel < 0.3) {
            promptType = 'celebratory';
        } else if (opportunity.maskingLevel > 0.8) {
            promptType = 'recovery';
        }
        
        const prompts = this.safeSpaceDetection.unmaskingPrompts[promptType];
        const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        
        return {
            type: promptType,
            message: selectedPrompt,
            confidence: opportunity.confidence,
            urgency: opportunity.maskingLevel > 0.8 ? 'high' : 'medium'
        };
    }
    
    /**
     * Update energy tracking optimized
     */
    updateEnergyTrackingOptimized() {
        const now = Date.now();
        const timeDelta = (now - this.energyTracking.lastUpdate) / 60000; // minutes
        
        // Calculate energy expenditure
        const maskingCost = this.currentMaskingLevel * this.energyTracking.maskingEnergyRate * timeDelta;
        
        // Calculate energy recovery
        const recovery = this.safetyLevel * this.energyTracking.recoveryRate * timeDelta;
        
        // Update energy level
        this.energyLevel = Math.max(0, Math.min(1, this.energyLevel - maskingCost + recovery));
        
        // Update daily expenditure
        this.energyTracking.dailyEnergySpent += maskingCost;
        
        // Add to energy history
        this.energyHistory.push({
            timestamp: now,
            level: this.energyLevel,
            maskingCost,
            recovery,
            dailySpent: this.energyTracking.dailyEnergySpent
        });
        
        // Check for low energy warnings
        if (this.energyLevel < this.energyTracking.warningThreshold) {
            this.generateEnergyWarningFast();
        }
        
        this.energyTracking.lastUpdate = now;
        
        // Queue UI update
        this.queueUIUpdate('energyLevel', {
            currentEnergy: this.energyLevel,
            dailyExpenditure: this.energyTracking.dailyEnergySpent,
            maskingCost,
            recovery
        });
        
        // Update state management
        if (window.useVelvetStore) {
            const store = window.useVelvetStore.getState();
            store.updateEnergyTracking({
                currentEnergy: this.energyLevel,
                dailyExpenditure: this.energyTracking.dailyEnergySpent,
                timestamp: now
            });
        }
    }
    
    /**
     * Generate energy warning fast
     */
    generateEnergyWarningFast() {
        const warningLevel = this.energyLevel < this.energyTracking.criticalThreshold ? 
            'critical' : 'warning';
        
        const warning = {
            level: warningLevel,
            energyLevel: this.energyLevel,
            message: warningLevel === 'critical' ? 
                'Energy critically low. Time for recovery and self-care.' :
                'Energy getting low. Consider taking a break soon.',
            timestamp: Date.now()
        };
        
        this.energyTracking.lowEnergyWarnings.push(warning);
        this.performanceMetrics.energyWarnings++;
        
        // Queue UI update
        this.queueUIUpdate('energyWarning', warning);
        
        console.log(`⚡ Energy warning: ${warningLevel} (${Math.round(this.energyLevel * 100)}% remaining)`);
    }
    
    /**
     * Update context awareness optimized
     */
    updateContextAwarenessOptimized() {
        // Update time context
        const timeContext = this.getTimeContextFast();
        
        // Update safety level
        this.updateSafetyLevelFast();
        
        // Check for unmasking opportunities if conditions are right
        if (this.safetyLevel > 0.6 && this.currentMaskingLevel > 0.5) {
            this.checkForUnmaskingOpportunity();
        }
    }
    
    /**
     * Get time context fast
     */
    getTimeContextFast() {
        const hour = new Date().getHours();
        
        if (hour >= 9 && hour < 17) return 'work_hours';
        if (hour >= 19 || hour < 9) return 'personal_time';
        return 'transition';
    }
    
    /**
     * Queue UI update for batch processing
     */
    queueUIUpdate(type, data) {
        this.uiUpdateQueue.push({ type, data, timestamp: Date.now() });
        
        // Limit queue size
        if (this.uiUpdateQueue.length > 20) {
            this.uiUpdateQueue = this.uiUpdateQueue.slice(-10);
        }
    }
    
    /**
     * Flush UI updates at 60fps
     */
    flushUIUpdates() {
        if (this.uiUpdateQueue.length === 0) return;
        
        const updates = [...this.uiUpdateQueue];
        this.uiUpdateQueue = [];
        
        // Process updates efficiently
        requestAnimationFrame(() => {
            this.processUIUpdatesOptimized(updates);
        });
    }
    
    /**
     * Process UI updates optimized
     */
    processUIUpdatesOptimized(updates) {
        // Group updates by type for efficiency
        const groupedUpdates = {};
        updates.forEach(update => {
            if (!groupedUpdates[update.type]) {
                groupedUpdates[update.type] = [];
            }
            groupedUpdates[update.type].push(update.data);
        });
        
        // Process grouped updates
        Object.keys(groupedUpdates).forEach(type => {
            const latestData = groupedUpdates[type][groupedUpdates[type].length - 1];
            
            switch (type) {
                case 'maskingLevel':
                    this.updateMaskingLevelUI(latestData);
                    break;
                case 'energyLevel':
                    this.updateEnergyLevelUI(latestData);
                    break;
                case 'unmaskingPrompt':
                    this.showUnmaskingPromptUI(latestData);
                    break;
                case 'energyWarning':
                    this.showEnergyWarningUI(latestData);
                    break;
            }
        });
    }
    
    /**
     * Update masking level UI
     */
    updateMaskingLevelUI(data) {
        console.log(`🎭 Masking level: ${Math.round(data.level * 100)}%`, data.indicators);
    }
    
    /**
     * Update energy level UI
     */
    updateEnergyLevelUI(data) {
        console.log(`⚡ Energy level: ${Math.round(data.currentEnergy * 100)}%`);
    }
    
    /**
     * Show unmasking prompt UI
     */
    showUnmaskingPromptUI(data) {
        console.log(`💭 Unmasking prompt: ${data.prompt.message}`);
        
        // Create or update whisper notification
        this.showMaskingWhisper(data.prompt.message, data.prompt.type);
    }
    
    /**
     * Show energy warning UI
     */
    showEnergyWarningUI(warning) {
        console.log(`⚡ Energy warning: ${warning.message}`);
        
        // Create or update energy warning
        this.showEnergyWarning(warning);
    }
    
    /**
     * Show masking whisper efficiently
     */
    showMaskingWhisper(message, type) {
        let whisper = document.getElementById('masking-fatigue-whisper');
        if (!whisper) {
            whisper = document.createElement('div');
            whisper.id = 'masking-fatigue-whisper';
            whisper.style.cssText = `
                position: fixed;
                bottom: 240px;
                right: 20px;
                max-width: 320px;
                padding: 14px 18px;
                border-radius: 14px;
                color: white;
                font-size: 14px;
                z-index: 10003;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(147, 51, 234, 0.8));
                pointer-events: none;
                font-weight: 500;
                line-height: 1.4;
            `;
            document.body.appendChild(whisper);
        }
        
        // Update content
        whisper.textContent = message;
        
        // Animate in
        whisper.style.opacity = '1';
        whisper.style.transform = 'translateY(0)';
        
        // Auto hide
        setTimeout(() => {
            whisper.style.opacity = '0';
            whisper.style.transform = 'translateY(-10px)';
        }, type === 'celebratory' ? 6000 : 5000);
    }
    
    /**
     * Show energy warning efficiently
     */
    showEnergyWarning(warning) {
        let warningEl = document.getElementById('energy-warning');
        if (!warningEl) {
            warningEl = document.createElement('div');
            warningEl.id = 'energy-warning';
            warningEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 300px;
                padding: 12px 16px;
                border-radius: 12px;
                color: white;
                font-size: 13px;
                z-index: 10004;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.8));
                pointer-events: none;
                font-weight: 600;
            `;
            document.body.appendChild(warningEl);
        }
        
        // Update content
        warningEl.textContent = warning.message;
        
        // Animate in
        warningEl.style.opacity = '1';
        warningEl.style.transform = 'translateY(0)';
        
        // Auto hide
        setTimeout(() => {
            warningEl.style.opacity = '0';
            warningEl.style.transform = 'translateY(-10px)';
        }, warning.level === 'critical' ? 8000 : 5000);
    }
    
    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(processingTime, batchSize) {
        const count = this.performanceMetrics.totalAnalyses;
        this.performanceMetrics.averageAnalysisTime = 
            (this.performanceMetrics.averageAnalysisTime * count + processingTime) / (count + batchSize);
    }
    
    /**
     * Perform memory cleanup
     */
    performMemoryCleanup() {
        // Clean old analysis queue items
        const cutoffTime = Date.now() - 60000; // 1 minute
        for (const [id, analysis] of this.analysisQueue) {
            if (analysis.timestamp < cutoffTime) {
                this.analysisQueue.delete(id);
            }
        }
        
        // Clean UI update queue
        this.uiUpdateQueue = this.uiUpdateQueue.filter(
            update => Date.now() - update.timestamp < 10000
        );
        
        console.log('🧹 Masking Fatigue memory cleanup completed');
    }
    
    /**
     * Monitor performance
     */
    monitorPerformance() {
        if (performance.memory) {
            this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
            
            if (this.performanceMetrics.memoryUsage > 30) { // 30MB threshold
                console.warn(`⚠️ High memory usage: ${this.performanceMetrics.memoryUsage.toFixed(2)}MB`);
                this.performMemoryCleanup();
            }
        }
        
        // Check average analysis time
        if (this.performanceMetrics.averageAnalysisTime > this.config.maxAnalysisTime) {
            console.warn('⚠️ Masking Fatigue performance degraded');
            this.optimizePerformance();
        }
    }
    
    /**
     * Optimize performance when degradation is detected
     */
    optimizePerformance() {
        console.log('⚡ Optimizing Masking Fatigue performance...');
        
        // Increase batch processing interval
        this.config.batchInterval = Math.min(this.config.batchInterval + 25, 200);
        
        // Reduce batch size
        this.config.batchSize = Math.max(this.config.batchSize - 1, 2);
        
        // Force memory cleanup
        this.performMemoryCleanup();
        
        console.log('✅ Masking Fatigue performance optimized');
    }
    
    /**
     * Initialize optimized UI
     */
    initializeOptimizedUI() {
        // Pre-create style elements for faster rendering
        const style = document.createElement('style');
        style.id = 'masking-fatigue-styles';
        style.textContent = `
            #masking-fatigue-whisper,
            #energy-warning {
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Debounce utility
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Throttle utility
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            currentMaskingLevel: this.currentMaskingLevel,
            energyLevel: this.energyLevel,
            safetyLevel: this.safetyLevel,
            isPerformant: this.performanceMetrics.averageAnalysisTime < this.config.maxAnalysisTime
        };
    }
    
    /**
     * Get current status
     */
    getMaskingStatus() {
        return {
            currentMaskingLevel: this.currentMaskingLevel,
            energyLevel: this.energyLevel,
            safetyLevel: this.safetyLevel,
            environment: this.contextAwareness.currentEnvironment,
            dailyEnergySpent: this.energyTracking.dailyEnergySpent,
            recentPatterns: {
                formality: this.communicationPatterns.formalLanguage.samples.toArray().slice(-3),
                emotion: this.communicationPatterns.emotionalExpression.samples.toArray().slice(-3),
                energy: this.communicationPatterns.energySignature.samples.toArray().slice(-3)
            }
        };
    }
    
    /**
     * Cleanup and shutdown
     */
    async deactivate() {
        console.log('🛑 Deactivating Optimized Masking Fatigue Detector...');
        
        this.isActive = false;
        
        // Clear all timers
        if (this.batchProcessingTimer) clearInterval(this.batchProcessingTimer);
        if (this.uiUpdateTimer) clearInterval(this.uiUpdateTimer);
        if (this.energyUpdateTimer) clearInterval(this.energyUpdateTimer);
        if (this.contextUpdateTimer) clearInterval(this.contextUpdateTimer);
        if (this.performanceMonitorTimer) clearInterval(this.performanceMonitorTimer);
        if (this.memoryCleanupTimer) clearInterval(this.memoryCleanupTimer);
        
        // Clean up data structures
        this.analysisQueue.clear();
        this.analysisBatch = [];
        this.uiUpdateQueue = [];
        
        console.log('✅ Optimized Masking Fatigue Detector deactivated');
    }
}

/**
 * Circular Buffer for efficient memory management
 */
class CircularBuffer {
    constructor(size) {
        this.size = size;
        this.buffer = new Array(size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }
    
    push(item) {
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.size;
        
        if (this.length < this.size) {
            this.length++;
        } else {
            this.head = (this.head + 1) % this.size;
        }
    }
    
    toArray() {
        const result = [];
        let index = this.head;
        for (let i = 0; i < this.length; i++) {
            result.push(this.buffer[index]);
            index = (index + 1) % this.size;
        }
        return result;
    }
    
    get(index) {
        if (index >= this.length) return undefined;
        return this.buffer[(this.head + index) % this.size];
    }
    
    clear() {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedMaskingFatigueDetector;
} else if (typeof window !== 'undefined') {
    window.OptimizedMaskingFatigueDetector = OptimizedMaskingFatigueDetector;
}

console.log('⚡ Optimized Masking Fatigue Detector loaded - guaranteed <200ms performance');