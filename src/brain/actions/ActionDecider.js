// ⚡ Velvet Action Decision System
// "The decision maker" - Intelligent action selection and execution

/**
 * ActionDecider: The system that chooses what actions to take
 * 
 * Responsibilities:
 * - Analyze predictions and context to choose optimal interventions
 * - Balance multiple factors: urgency, user state, timing, effectiveness
 * - Route actions to appropriate execution systems
 * - Learn from action outcomes to improve future decisions
 * 
 * Action Categories:
 * - Voice Responses: Speaking directly to user
 * - Visual Nudges: UI changes, animations, visual cues
 * - Task Interventions: Task breakdown, progress tracking, completion
 * - Meeting Assistance: Real-time coaching, transcription, social decoding
 * - Environmental: Music, lighting, notification management
 */

class ActionDecider {
    constructor() {
        console.log('⚡ Initializing Velvet Action Decision System...');
        
        // Decision-making weights for different factors
        this.decisionWeights = {
            urgency: 0.3,           // How urgent is the need
            confidence: 0.25,       // How confident we are in the prediction
            userState: 0.2,         // User's current emotional state
            effectiveness: 0.15,    // Historical effectiveness of this action
            timing: 0.1            // Is now a good time for this action
        };
        
        // Action type priorities (0-1 scale)
        this.actionPriorities = {
            emergency_support: 1.0,      // Critical overwhelm/crisis situations
            comfort: 0.9,                // Emotional support and comfort
            gentle_redirect: 0.7,        // Task help and focus assistance
            social_decoding: 0.6,        // Meeting and social assistance
            celebration: 0.5,            // Achievement recognition
            check_in: 0.4,              // Gentle presence and awareness
            environmental: 0.3,          // Background optimizations
            informational: 0.2           // Non-urgent information sharing
        };
        
        // Available action executors
        this.actionExecutors = {
            voice: null,            // Voice response system
            visual: null,           // Visual nudge system
            task: null,             // Task intervention system
            meeting: null,          // Meeting assistance system
            social: null,           // Social decoding system
            environmental: null     // Environment management system
        };
        
        // Decision history for learning
        this.decisionHistory = [];
        this.maxHistoryEntries = 1000;
        
        // Performance metrics
        this.metrics = {
            totalDecisions: 0,
            successfulActions: 0,
            cancelledActions: 0,
            averageResponseTime: 0,
            userSatisfactionScore: 0,
            effectivenessRating: 0
        };
        
        // State tracking
        this.isActive = false;
        this.lastDecisionTime = 0;
        this.currentDecisionLoad = 0;
        
        console.log('⚡ Action Decision System core initialized');
    }

    /**
     * Initialize the action decision system
     */
    async initialize() {
        try {
            console.log('⚡ Starting action decision system initialization...');
            
            // Initialize action executors
            await this.initializeActionExecutors();
            
            // Load decision learning models
            await this.loadDecisionModels();
            
            // Start decision optimization learning
            await this.beginDecisionLearning();
            
            this.isActive = true;
            console.log('✅ Action Decision System fully operational');
            
            return true;
            
        } catch (error) {
            console.error('❌ Action decision system initialization failed:', error);
            this.isActive = false;
            return false;
        }
    }

    /**
     * Choose the best action based on predictions and context
     * This is the main method called by the Velvet Brain
     */
    async chooseBestAction(predictions, context) {
        if (!this.isActive || !predictions || predictions.immediate.length === 0) {
            return { type: 'none', priority: 0, confidence: 0 };
        }
        
        const decisionStartTime = Date.now();
        
        try {
            console.log('⚡ Analyzing action options...');
            console.log(`📊 ${predictions.immediate.length} immediate predictions to evaluate`);
            
            // Evaluate each predicted need as a potential action
            const actionOptions = [];
            
            for (const prediction of predictions.immediate) {
                const actionOption = await this.evaluateActionOption(prediction, context);
                if (actionOption && actionOption.score > 0.3) {
                    actionOptions.push(actionOption);
                }
            }
            
            // Add proactive actions based on context
            const proactiveActions = await this.generateProactiveActions(context);
            actionOptions.push(...proactiveActions);
            
            // Sort by total decision score
            actionOptions.sort((a, b) => b.score - a.score);
            
            console.log(`⚡ Evaluated ${actionOptions.length} action options`);
            
            // Choose the best action
            const bestAction = actionOptions.length > 0 ? actionOptions[0] : null;
            
            if (!bestAction || bestAction.score < 0.4) {
                console.log('⚡ No action meets minimum threshold');
                return { type: 'none', priority: 0, confidence: 0 };
            }
            
            // Build final action object
            const action = {
                type: bestAction.type,
                priority: bestAction.score,
                confidence: bestAction.confidence,
                timing: bestAction.timing,
                intervention: bestAction.intervention,
                executor: bestAction.executor,
                context: context,
                prediction: bestAction.prediction,
                decisionTime: Date.now() - decisionStartTime
            };
            
            // Record decision for learning
            await this.recordDecision(action, actionOptions);
            
            this.metrics.totalDecisions++;
            this.lastDecisionTime = Date.now();
            
            console.log('⚡ Action decision made:', {
                type: action.type,
                priority: action.priority.toFixed(2),
                confidence: action.confidence.toFixed(2),
                timing: action.timing,
                decisionTime: action.decisionTime + 'ms'
            });
            
            return action;
            
        } catch (error) {
            console.error('❌ Action decision failed:', error);
            return { type: 'none', priority: 0, confidence: 0, error: error.message };
        }
    }

    /**
     * Evaluate a single prediction as an action option
     */
    async evaluateActionOption(prediction, context) {
        try {
            // Determine action type from prediction
            const actionType = this.mapPredictionToActionType(prediction);
            if (!actionType) return null;
            
            // Calculate decision factors
            const factors = {
                urgency: prediction.urgency || 0.5,
                confidence: prediction.confidence || 0.5,
                userState: await this.assessUserStateCompatibility(prediction, context),
                effectiveness: await this.getActionEffectiveness(actionType, context),
                timing: await this.assessActionTiming(actionType, context)
            };
            
            // Calculate weighted decision score
            const score = this.calculateDecisionScore(factors);
            
            // Determine best executor for this action
            const executor = this.selectBestExecutor(actionType, context);
            
            // Generate specific intervention details
            const intervention = await this.generateIntervention(actionType, prediction, context);
            
            return {
                type: actionType,
                score: score,
                confidence: factors.confidence,
                timing: this.determineActionTiming(factors.timing, factors.urgency),
                intervention: intervention,
                executor: executor,
                prediction: prediction,
                factors: factors
            };
            
        } catch (error) {
            console.error('❌ Action option evaluation failed:', error);
            return null;
        }
    }

    /**
     * Generate proactive actions based on current context
     */
    async generateProactiveActions(context) {
        const proactiveActions = [];
        
        try {
            // Check for common proactive opportunities
            
            // Long work session without break
            if (context.type === 'work' && context.duration > 3600000) { // 1 hour
                proactiveActions.push({
                    type: 'gentle_break_reminder',
                    score: 0.6,
                    confidence: 0.8,
                    timing: 'when_natural_break',
                    intervention: {
                        message: "You've been focused for a while! Want to take a quick break?",
                        type: 'gentle_suggestion'
                    },
                    executor: 'voice'
                });
            }
            
            // Meeting starting soon
            if (context.upcomingEvents && context.upcomingEvents.meeting_in_5min) {
                proactiveActions.push({
                    type: 'meeting_preparation',
                    score: 0.8,
                    confidence: 0.9,
                    timing: 'immediate',
                    intervention: {
                        message: "Meeting starting in 5 minutes. Need any prep help?",
                        type: 'helpful_reminder'
                    },
                    executor: 'voice'
                });
            }
            
            // Good progress made - celebrate
            if (context.recentProgress && context.recentProgress.tasksCompleted > 0) {
                proactiveActions.push({
                    type: 'celebration',
                    score: 0.5,
                    confidence: 0.7,
                    timing: 'immediate',
                    intervention: {
                        message: `Great work on completing those tasks! 🎉`,
                        type: 'celebration'
                    },
                    executor: 'voice'
                });
            }
            
        } catch (error) {
            console.error('❌ Proactive action generation failed:', error);
        }
        
        return proactiveActions;
    }

    /**
     * Map a prediction to an appropriate action type
     */
    mapPredictionToActionType(prediction) {
        const needTypeMap = {
            'comfort_and_grounding': 'comfort',
            'focus_assistance': 'gentle_redirect',
            'social_support': 'social_decoding',
            'task_breakdown': 'task_intervention',
            'meeting_help': 'meeting_assistance',
            'celebration': 'celebration',
            'companionship': 'check_in'
        };
        
        return needTypeMap[prediction.type] || null;
    }

    /**
     * Calculate weighted decision score
     */
    calculateDecisionScore(factors) {
        const weights = this.decisionWeights;
        
        const score = 
            (factors.urgency * weights.urgency) +
            (factors.confidence * weights.confidence) +
            (factors.userState * weights.userState) +
            (factors.effectiveness * weights.effectiveness) +
            (factors.timing * weights.timing);
        
        return Math.min(1.0, Math.max(0.0, score));
    }

    /**
     * Assess how compatible this action is with current user state
     */
    async assessUserStateCompatibility(prediction, context) {
        // Placeholder implementation
        // Would analyze user's emotional state, stress level, focus level, etc.
        
        if (context.userState?.overwhelmRisk > 0.7) {
            // User is overwhelmed - only gentle actions
            return prediction.type === 'comfort_and_grounding' ? 0.9 : 0.2;
        }
        
        if (context.userState?.focusLevel > 0.8) {
            // User is focused - avoid interruptions
            return prediction.urgency > 0.8 ? 0.7 : 0.3;
        }
        
        return 0.7; // Default compatibility
    }

    /**
     * Get historical effectiveness of this action type in similar contexts
     */
    async getActionEffectiveness(actionType, context) {
        // Placeholder implementation
        // Would look up historical success rates for this action type
        
        const baseEffectiveness = {
            'comfort': 0.8,
            'gentle_redirect': 0.7,
            'social_decoding': 0.6,
            'task_intervention': 0.75,
            'meeting_assistance': 0.7,
            'celebration': 0.9,
            'check_in': 0.6
        };
        
        return baseEffectiveness[actionType] || 0.5;
    }

    /**
     * Assess if now is a good time for this action
     */
    async assessActionTiming(actionType, context) {
        // Placeholder implementation
        // Would consider factors like:
        // - Current user activity
        // - Time of day
        // - Recent interactions
        // - User's natural break patterns
        
        if (context.type === 'meeting' && actionType !== 'meeting_assistance') {
            return 0.2; // Bad timing during meetings
        }
        
        if (context.userState?.focusLevel > 0.8 && actionType === 'gentle_redirect') {
            return 0.9; // Good timing for focus help when focused
        }
        
        return 0.7; // Default good timing
    }

    /**
     * Select the best executor system for this action
     */
    selectBestExecutor(actionType, context) {
        const executorMap = {
            'comfort': 'voice',
            'gentle_redirect': 'voice',
            'social_decoding': 'social',
            'task_intervention': 'task',
            'meeting_assistance': 'meeting',
            'celebration': 'voice',
            'check_in': 'voice',
            'visual_nudge': 'visual',
            'environmental_optimization': 'environmental'
        };
        
        return executorMap[actionType] || 'voice';
    }

    /**
     * Generate specific intervention details
     */
    async generateIntervention(actionType, prediction, context) {
        const interventions = {
            'comfort': {
                message: "I notice you might be feeling overwhelmed. Take a deep breath with me? 💙",
                type: 'emotional_support',
                duration: 'brief',
                tone: 'gentle'
            },
            'gentle_redirect': {
                message: "What if we break this down into smaller steps?",
                type: 'task_assistance',
                duration: 'interactive',
                tone: 'supportive'
            },
            'social_decoding': {
                message: "I'm picking up some social cues - want me to help decode what's happening?",
                type: 'social_assistance',
                duration: 'ongoing',
                tone: 'helpful'
            },
            'celebration': {
                message: "Amazing work! You should be proud of that progress! 🎉",
                type: 'positive_reinforcement',
                duration: 'brief',
                tone: 'joyful'
            },
            'check_in': {
                message: "Just checking in - how are you feeling right now?",
                type: 'presence',
                duration: 'brief',
                tone: 'caring'
            }
        };
        
        return interventions[actionType] || {
            message: "I'm here with you 💙",
            type: 'general_support',
            duration: 'brief',
            tone: 'warm'
        };
    }

    /**
     * Determine optimal timing for action execution
     */
    determineActionTiming(timingScore, urgency) {
        if (urgency > 0.8) return 'immediate';
        if (timingScore > 0.7) return 'immediate';
        if (timingScore > 0.4) return 'when_appropriate';
        return 'delayed';
    }

    /**
     * Record decision for learning purposes
     */
    async recordDecision(action, allOptions) {
        const decisionRecord = {
            timestamp: Date.now(),
            chosenAction: action,
            alternativeOptions: allOptions.slice(1, 4), // Top 3 alternatives
            context: action.context,
            decisionTime: action.decisionTime,
            outcome: null // Will be updated when action completes
        };
        
        this.decisionHistory.push(decisionRecord);
        
        // Keep history manageable
        if (this.decisionHistory.length > this.maxHistoryEntries) {
            this.decisionHistory.shift();
        }
    }

    /**
     * Update decision record with action outcome
     */
    async recordActionOutcome(actionId, outcome) {
        const record = this.decisionHistory.find(r => r.chosenAction.id === actionId);
        if (record) {
            record.outcome = outcome;
            
            if (outcome.success) {
                this.metrics.successfulActions++;
            }
            
            // Update effectiveness metrics for this action type
            await this.updateActionEffectiveness(record.chosenAction.type, outcome);
        }
    }

    /**
     * Update effectiveness ratings based on outcomes
     */
    async updateActionEffectiveness(actionType, outcome) {
        // Placeholder for learning algorithm
        // Would update effectiveness ratings based on success/failure
        console.log('📈 Updating action effectiveness for:', actionType, outcome.success);
    }

    // Action executor initialization (placeholders)
    async initializeActionExecutors() {
        console.log('⚡ Initializing action executors...');
        
        // These would connect to existing Velvet systems
        this.actionExecutors = {
            voice: { execute: async (action) => ({ executed: true, success: true }) },
            visual: { execute: async (action) => ({ executed: true, success: true }) },
            task: { execute: async (action) => ({ executed: true, success: true }) },
            meeting: { execute: async (action) => ({ executed: true, success: true }) },
            social: { execute: async (action) => ({ executed: true, success: true }) },
            environmental: { execute: async (action) => ({ executed: true, success: true }) }
        };
    }

    async loadDecisionModels() {
        console.log('⚡ Loading decision learning models...');
        // Would load any saved decision optimization models
    }

    async beginDecisionLearning() {
        console.log('⚡ Beginning decision optimization learning...');
        // Would start learning from decision outcomes
    }

    // Utility methods
    getMetrics() {
        return {
            ...this.metrics,
            successRate: this.metrics.totalDecisions > 0 ? 
                this.metrics.successfulActions / this.metrics.totalDecisions : 0,
            averageDecisionTime: this.lastDecisionTime > 0 ? 
                (Date.now() - this.lastDecisionTime) : 0,
            isActive: this.isActive,
            decisionHistorySize: this.decisionHistory.length
        };
    }

    getDecisionHistory(limit = 10) {
        return this.decisionHistory.slice(-limit);
    }

    getCurrentLoad() {
        return this.currentDecisionLoad;
    }

    async shutdown() {
        console.log('⚡ Shutting down Action Decision System...');
        
        this.isActive = false;
        
        // Shutdown executors
        Object.values(this.actionExecutors).forEach(executor => {
            if (executor.shutdown) {
                executor.shutdown();
            }
        });
        
        console.log('⚡ Action Decision System shutdown complete');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActionDecider;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.ActionDecider = ActionDecider;
}

console.log('⚡ ActionDecider class definition loaded');