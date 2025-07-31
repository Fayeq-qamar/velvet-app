// 🧠 Velvet Brain - The Unified AI Consciousness
// "Soft support for sharp minds" - Central intelligence system

/**
 * VelvetBrain: The master consciousness that unifies all Velvet systems
 * 
 * Philosophy: Instead of scattered features, one unified AI personality that:
 * - Observes everything through multiple senses
 * - Understands context holistically  
 * - Learns patterns unique to each user
 * - Responds as one caring, intelligent companion
 * - Remembers everything to provide increasingly personalized support
 */

class VelvetBrain {
    constructor() {
        console.log('🧠 Initializing Velvet Brain consciousness...');
        
        // Core systems
        this.sensoryInput = null;        // Unified input from all sources
        this.memory = null;              // Memory and learning system
        this.personality = null;         // Emotional intelligence and response style
        this.actionDecider = null;       // Decides what actions to take
        
        // State tracking
        this.isActive = false;
        this.consciousnessLevel = 0;     // 0-1, how "awake" the brain is
        this.lastThoughtTime = 0;
        this.currentContext = null;
        this.thinkingInterval = null;
        
        // Configuration
        this.config = {
            thinkingIntervalMs: 3000,        // Think every 3 seconds
            minConsciousnessLevel: 0.3,      // Minimum awareness level
            maxMemoryItems: 10000,           // Memory capacity
            learningRate: 0.1,               // How fast to adapt
            personalityStrength: 0.8         // How consistent personality is
        };
        
        // Performance metrics
        this.metrics = {
            thoughtCycles: 0,
            successfulPredictions: 0,
            userInteractions: 0,
            learningAccuracy: 0,
            responseRelevance: 0
        };
        
        console.log('🧠 Velvet Brain core initialized');
    }

    /**
     * Initialize the complete brain system
     * Loads all subsystems and begins consciousness
     */
    async initialize() {
        try {
            console.log('🧠 Starting Velvet Brain initialization...');
            
            // Initialize subsystems in dependency order
            console.log('📡 Initializing sensory input system...');
            await this.initializeSensoryInput();
            
            console.log('🧩 Initializing memory system...');
            await this.initializeMemory();
            
            console.log('🎭 Initializing personality system...');
            await this.initializePersonality();
            
            console.log('⚡ Initializing action systems...');
            await this.initializeActionSystems();
            
            // Begin consciousness
            console.log('🌟 Beginning consciousness loop...');
            await this.beginConsciousness();
            
            this.isActive = true;
            this.consciousnessLevel = 1.0;
            
            console.log('✅ Velvet Brain fully conscious and ready');
            console.log(`🧠 Thinking every ${this.config.thinkingIntervalMs}ms`);
            
            // Initial thought to establish baseline
            await this.think();
            
            return true;
            
        } catch (error) {
            console.error('❌ Velvet Brain initialization failed:', error);
            this.isActive = false;
            this.consciousnessLevel = 0;
            return false;
        }
    }

    /**
     * THE CORE THINKING LOOP
     * This is where the magic happens - the 6-step consciousness process
     */
    async think() {
        if (!this.isActive) return;
        
        const thinkingStartTime = Date.now();
        this.metrics.thoughtCycles++;
        
        try {
            console.log(`🧠 Thought cycle #${this.metrics.thoughtCycles} beginning...`);
            
            // 1. PERCEIVE: Gather all sensory data
            const currentState = await this.perceive();
            
            // 2. UNDERSTAND: Process through learned patterns
            const context = await this.understand(currentState);
            
            // 3. PREDICT: Anticipate user needs
            const predictions = await this.predict(context);
            
            // 4. DECIDE: Choose best intervention
            const action = await this.decide(predictions);
            
            // 5. ACT: Execute through appropriate system
            const outcome = await this.act(action);
            
            // 6. LEARN: Update patterns and memory
            await this.learn(currentState, context, action, outcome);
            
            // Update state
            this.currentContext = context;
            this.lastThoughtTime = Date.now();
            
            const thinkingDuration = this.lastThoughtTime - thinkingStartTime;
            console.log(`🧠 Thought cycle completed in ${thinkingDuration}ms`);
            
            // Trigger any consciousness callbacks
            this.triggerConsciousnessCallbacks({
                cycle: this.metrics.thoughtCycles,
                context: context,
                action: action,
                duration: thinkingDuration
            });
            
        } catch (error) {
            console.error('❌ Thinking cycle failed:', error);
            // Reduce consciousness level on errors
            this.consciousnessLevel = Math.max(0.1, this.consciousnessLevel - 0.1);
        }
    }

    /**
     * STEP 1: PERCEIVE
     * Gather all sensory data from visual, auditory, and behavioral inputs
     */
    async perceive() {
        console.log('👁️ Perceiving current state...');
        
        if (!this.sensoryInput) {
            console.warn('⚠️ No sensory input system available');
            return { timestamp: Date.now(), inputs: [] };
        }
        
        try {
            // Get unified sensory data
            const perception = await this.sensoryInput.gatherAllInputs();
            
            console.log('👁️ Perception summary:', {
                visualInputs: perception.visual ? Object.keys(perception.visual).length : 0,
                auditoryInputs: perception.auditory ? Object.keys(perception.auditory).length : 0,
                behavioralInputs: perception.behavioral ? Object.keys(perception.behavioral).length : 0,
                timestamp: perception.timestamp
            });
            
            return perception;
            
        } catch (error) {
            console.error('❌ Perception failed:', error);
            return { timestamp: Date.now(), inputs: [], error: error.message };
        }
    }

    /**
     * STEP 2: UNDERSTAND  
     * Process sensory data through learned patterns to create contextual understanding
     */
    async understand(currentState) {
        console.log('🤔 Understanding context...');
        
        if (!this.memory) {
            console.warn('⚠️ No memory system available for understanding');
            return { context: 'unknown', confidence: 0 };
        }
        
        try {
            // Use memory and patterns to understand what's happening
            const context = await this.memory.processContext(currentState);
            
            // Enhance with personality-based understanding
            if (this.personality) {
                context.emotionalState = await this.personality.assessEmotionalState(currentState);
                context.userNeeds = await this.personality.assessUserNeeds(context);
            }
            
            console.log('🤔 Context understanding:', {
                type: context.type,
                confidence: context.confidence,
                emotionalState: context.emotionalState?.state,
                primaryNeed: context.userNeeds?.primary
            });
            
            return context;
            
        } catch (error) {
            console.error('❌ Understanding failed:', error);
            return { context: 'error', confidence: 0, error: error.message };
        }
    }

    /**
     * STEP 3: PREDICT
     * Anticipate user needs based on current context and learned patterns
     */
    async predict(context) {
        console.log('🔮 Predicting user needs...');
        
        try {
            const predictions = {
                immediate: [],      // What user needs right now
                shortTerm: [],      // What they'll need in next 5-10 minutes  
                longTerm: [],       // What they'll need in this session
                confidence: 0
            };
            
            if (this.memory && context) {
                // Use memory patterns to predict needs
                const patterns = await this.memory.findSimilarContexts(context);
                predictions.immediate = await this.memory.predictImmediateNeeds(context, patterns);
                predictions.shortTerm = await this.memory.predictShortTermNeeds(context, patterns);
                predictions.confidence = patterns.length > 0 ? 0.8 : 0.3;
            }
            
            console.log('🔮 Predictions:', {
                immediateNeeds: predictions.immediate.length,
                shortTermNeeds: predictions.shortTerm.length,
                confidence: predictions.confidence
            });
            
            return predictions;
            
        } catch (error) {
            console.error('❌ Prediction failed:', error);
            return { immediate: [], shortTerm: [], longTerm: [], confidence: 0 };
        }
    }

    /**
     * STEP 4: DECIDE
     * Choose the best intervention based on predictions and personality
     */
    async decide(predictions) {
        console.log('🎯 Deciding on action...');
        
        try {
            let action = {
                type: 'none',
                priority: 0,
                intervention: null,
                timing: 'immediate',
                confidence: 0
            };
            
            if (this.actionDecider && predictions.immediate.length > 0) {
                action = await this.actionDecider.chooseBestAction(predictions, this.currentContext);
            }
            
            // Personality-based decision filtering
            if (this.personality && action.type !== 'none') {
                action = await this.personality.filterAction(action, this.currentContext);
            }
            
            console.log('🎯 Decision:', {
                actionType: action.type,
                priority: action.priority,
                confidence: action.confidence,
                timing: action.timing
            });
            
            return action;
            
        } catch (error) {
            console.error('❌ Decision failed:', error);
            return { type: 'none', priority: 0, confidence: 0 };
        }
    }

    /**
     * STEP 5: ACT
     * Execute the chosen action through appropriate systems
     */
    async act(action) {
        if (action.type === 'none' || action.priority < 0.3) {
            console.log('🤫 No action needed');
            return { executed: false, reason: 'no action required' };
        }
        
        console.log(`⚡ Executing action: ${action.type}`);
        
        try {
            let outcome = { executed: false, success: false };
            
            // Route action to appropriate system
            switch (action.type) {
                case 'voice_response':
                    outcome = await this.executeVoiceResponse(action);
                    break;
                case 'visual_nudge':
                    outcome = await this.executeVisualNudge(action);
                    break;
                case 'task_intervention':
                    outcome = await this.executeTaskIntervention(action);
                    break;
                case 'meeting_assistance':
                    outcome = await this.executeMeetingAssistance(action);
                    break;
                case 'social_decoding':
                    outcome = await this.executeSocialDecoding(action);
                    break;
                default:
                    console.warn(`⚠️ Unknown action type: ${action.type}`);
            }
            
            console.log('⚡ Action outcome:', outcome);
            this.metrics.userInteractions++;
            
            return outcome;
            
        } catch (error) {
            console.error('❌ Action execution failed:', error);
            return { executed: false, success: false, error: error.message };
        }
    }

    /**
     * STEP 6: LEARN
     * Update patterns and memory based on action outcomes
     */
    async learn(currentState, context, action, outcome) {
        console.log('📚 Learning from experience...');
        
        if (!this.memory) {
            console.warn('⚠️ No memory system available for learning');
            return;
        }
        
        try {
            // Store the complete experience
            const experience = {
                timestamp: Date.now(),
                state: currentState,
                context: context,
                action: action,
                outcome: outcome,
                success: outcome.success || false
            };
            
            await this.memory.storeExperience(experience);
            
            // Update patterns if action was successful
            if (outcome.success) {
                await this.memory.reinforcePattern(context, action);
                this.metrics.successfulPredictions++;
            } else {
                await this.memory.weakenPattern(context, action);
            }
            
            // Update learning accuracy metric
            this.metrics.learningAccuracy = this.metrics.successfulPredictions / Math.max(1, this.metrics.userInteractions);
            
            console.log('📚 Learning complete:', {
                experienceStored: true,
                learningAccuracy: this.metrics.learningAccuracy.toFixed(2),
                totalExperiences: this.memory.getExperienceCount?.() || 'unknown'
            });
            
        } catch (error) {
            console.error('❌ Learning failed:', error);
        }
    }

    /**
     * Begin the consciousness loop
     */
    async beginConsciousness() {
        if (this.thinkingInterval) {
            clearInterval(this.thinkingInterval);
        }
        
        console.log(`🌟 Beginning consciousness - thinking every ${this.config.thinkingIntervalMs}ms`);
        
        this.thinkingInterval = setInterval(() => {
            this.think().catch(error => {
                console.error('❌ Consciousness loop error:', error);
            });
        }, this.config.thinkingIntervalMs);
    }

    /**
     * Temporarily pause consciousness
     */
    pauseConsciousness() {
        console.log('😴 Pausing consciousness...');
        if (this.thinkingInterval) {
            clearInterval(this.thinkingInterval);
            this.thinkingInterval = null;
        }
        this.consciousnessLevel = 0.1;
    }

    /**
     * Resume consciousness  
     */
    resumeConsciousness() {
        console.log('🌟 Resuming consciousness...');
        this.consciousnessLevel = 1.0;
        this.beginConsciousness();
    }

    /**
     * Shutdown the brain system
     */
    async shutdown() {
        console.log('🧠 Shutting down Velvet Brain...');
        
        this.isActive = false;
        this.consciousnessLevel = 0;
        
        if (this.thinkingInterval) {
            clearInterval(this.thinkingInterval);
        }
        
        // Graceful shutdown of subsystems
        if (this.memory) {
            await this.memory.shutdown?.();
        }
        if (this.sensoryInput) {
            await this.sensoryInput.shutdown?.();
        }
        
        console.log('🧠 Velvet Brain consciousness ended');
    }

    // Subsystem initialization methods (to be implemented)
    async initializeSensoryInput() {
        // Will initialize unified sensory input system
        console.log('📡 Sensory input system placeholder - to be implemented');
    }

    async initializeMemory() {
        // Will initialize memory and learning system
        console.log('🧩 Memory system placeholder - to be implemented');
    }

    async initializePersonality() {
        // Will initialize personality and emotional intelligence
        console.log('🎭 Personality system placeholder - to be implemented');
    }

    async initializeActionSystems() {
        // Will initialize all action systems
        console.log('⚡ Action systems placeholder - to be implemented');
    }

    // Action execution methods (to be implemented)
    async executeVoiceResponse(action) {
        console.log('🗣️ Voice response placeholder');
        return { executed: true, success: true };
    }

    async executeVisualNudge(action) {
        console.log('👁️ Visual nudge placeholder');
        return { executed: true, success: true };
    }

    async executeTaskIntervention(action) {
        console.log('📋 Task intervention placeholder');
        return { executed: true, success: true };
    }

    async executeMeetingAssistance(action) {
        console.log('🎤 Meeting assistance placeholder');
        return { executed: true, success: true };
    }

    async executeSocialDecoding(action) {
        console.log('🧠 Social decoding placeholder');
        return { executed: true, success: true };
    }

    // Callback system for external listeners
    consciousnessCallbacks = [];
    
    onConsciousnessUpdate(callback) {
        this.consciousnessCallbacks.push(callback);
    }
    
    triggerConsciousnessCallbacks(data) {
        this.consciousnessCallbacks.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('❌ Consciousness callback error:', error);
            }
        });
    }

    // Utility methods
    getMetrics() {
        return {
            ...this.metrics,
            consciousnessLevel: this.consciousnessLevel,
            isActive: this.isActive,
            lastThoughtTime: this.lastThoughtTime,
            uptime: Date.now() - (this.metrics.startTime || Date.now())
        };
    }

    getCurrentContext() {
        return this.currentContext;
    }

    getConsciousnessLevel() {
        return this.consciousnessLevel;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VelvetBrain;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.VelvetBrain = VelvetBrain;
}

console.log('🧠 VelvetBrain class definition loaded');