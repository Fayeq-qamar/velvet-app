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
        
        try {
            let context = { context: 'unknown', confidence: 0 };
            
            if (this.memory) {
                // Use memory and patterns to understand what's happening
                context = await this.memory.processContext(currentState);
            }
            
            // Enhance with personality-based understanding
            if (this.personality) {
                context.emotionalState = await this.personality.assessEmotionalState(currentState);
                context.userNeeds = await this.personality.assessUserNeeds(context);
            }
            
            // ENHANCED: Detect task intentions in user input
            if (currentState.inputs && currentState.inputs.length > 0) {
                const recentInput = this.extractRecentUserInput(currentState);
                if (recentInput) {
                    context.recentUserInput = recentInput;
                    context.taskIntention = await this.detectTaskIntention(recentInput);
                    
                    if (context.taskIntention && context.taskIntention.isTask) {
                        console.log('📋 Task intention detected:', context.taskIntention);
                        context.primaryNeed = 'task_assistance';
                        context.confidence = Math.max(context.confidence, 0.8);
                        
                        // If AI already broke down the task, store it in context
                        if (context.taskIntention.taskBreakdown) {
                            context.aiGeneratedTask = context.taskIntention.taskBreakdown;
                            console.log('🎆 AI task breakdown already available:', context.aiGeneratedTask.title);
                        }
                    }
                }
            }
            
            console.log('🤔 Context understanding:', {
                type: context.type,
                confidence: context.confidence,
                emotionalState: context.emotionalState?.state,
                primaryNeed: context.userNeeds?.primary || context.primaryNeed,
                taskIntention: context.taskIntention?.isTask ? 'detected' : 'none'
            });
            
            return context;
            
        } catch (error) {
            console.error('❌ Understanding failed:', error);
            return { context: 'error', confidence: 0, error: error.message };
        }
    }
    
    /**
     * Extract recent user input from sensory data
     */
    extractRecentUserInput(currentState) {
        try {
            // Look for voice input, chat input, or other user communications
            if (currentState.inputs) {
                for (const input of currentState.inputs) {
                    if (input.type === 'voice' || input.type === 'chat' || input.type === 'text') {
                        return input.content || input.text || input.message;
                    }
                }
            }
            
            // Check global chat history if available
            if (typeof window !== 'undefined' && window.getRecentChatMessage) {
                return window.getRecentChatMessage();
            }
            
            return null;
        } catch (error) {
            console.error('❌ Failed to extract user input:', error);
            return null;
        }
    }
    
    /**
     * Detect task intention in user input using the task breakdown engine
     */
    async detectTaskIntention(userInput) {
        try {
            if (!userInput || typeof userInput !== 'string') {
                return { isTask: false, confidence: 0 };
            }
            
            // Use task breakdown engine for advanced detection if available
            if (typeof window !== 'undefined' && window.taskBreakdownEngine) {
                try {
                    // Try advanced AI-powered detection first
                    const analysis = await window.taskBreakdownEngine.analyzeAndBreakdownTask(userInput);
                    if (analysis) {
                        console.log('🧠 AI-powered task detected and broken down');
                        return {
                            isTask: true,
                            confidence: 0.9,
                            type: 'ai_analyzed',
                            originalInput: userInput,
                            taskBreakdown: analysis
                        };
                    }
                } catch (aiError) {
                    console.warn('⚠️ AI task detection failed, using pattern matching:', aiError);
                }
            }
            
            // Fallback to pattern matching
            const taskIndicators = [
                'i need to', 'i have to', 'i should', 'i want to', 'i must',
                'need to', 'have to', 'should do', 'going to',
                'planning to', 'trying to', 'working on',
                'help me', 'can you help', 'how do i', 'break down',
                'task', 'project', 'assignment', 'work on'
            ];
            
            const lowerInput = userInput.toLowerCase();
            const hasIndicator = taskIndicators.some(indicator => lowerInput.includes(indicator));
            
            if (hasIndicator) {
                return {
                    isTask: true,
                    confidence: 0.7,
                    type: 'pattern_detected',
                    originalInput: userInput
                };
            }
            
            return { isTask: false, confidence: 0 };
            
        } catch (error) {
            console.error('❌ Task intention detection failed:', error);
            return { isTask: false, confidence: 0, error: error.message };
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

    // Subsystem initialization methods
    async initializeSensoryInput() {
        try {
            // Import and initialize the unified sensory input system
            if (typeof SensoryInput !== 'undefined') {
                this.sensoryInput = new SensoryInput();
                const initialized = await this.sensoryInput.initialize();
                
                if (initialized) {
                    console.log('✅ Sensory Input System connected to brain');
                } else {
                    console.warn('⚠️ Sensory Input System initialization failed');
                }
            } else {
                console.warn('⚠️ SensoryInput class not available');
            }
        } catch (error) {
            console.error('❌ Sensory input initialization failed:', error);
        }
    }

    async initializeMemory() {
        try {
            // Import and initialize the memory system
            if (typeof VelvetMemory !== 'undefined') {
                this.memory = new VelvetMemory();
                const initialized = await this.memory.initialize();
                
                if (initialized) {
                    console.log('✅ Memory System connected to brain');
                } else {
                    console.warn('⚠️ Memory System initialization failed');
                }
            } else {
                console.warn('⚠️ VelvetMemory class not available');
            }
        } catch (error) {
            console.error('❌ Memory system initialization failed:', error);
        }
    }

    async initializePersonality() {
        try {
            // Import and initialize the personality system
            if (typeof VelvetPersonality !== 'undefined') {
                this.personality = new VelvetPersonality();
                const initialized = await this.personality.initialize();
                
                if (initialized) {
                    console.log('✅ Personality System connected to brain');
                } else {
                    console.warn('⚠️ Personality System initialization failed');
                }
            } else {
                console.warn('⚠️ VelvetPersonality class not available');
            }
        } catch (error) {
            console.error('❌ Personality system initialization failed:', error);
        }
    }

    async initializeActionSystems() {
        try {
            // Import and initialize the action decision system
            if (typeof ActionDecider !== 'undefined') {
                this.actionDecider = new ActionDecider();
                const initialized = await this.actionDecider.initialize();
                
                if (initialized) {
                    console.log('✅ Action Decision System connected to brain');
                } else {
                    console.warn('⚠️ Action Decision System initialization failed');
                }
            } else {
                console.warn('⚠️ ActionDecider class not available');
            }
        } catch (error) {
            console.error('❌ Action systems initialization failed:', error);
        }
    }

    // Action execution methods - REAL IMPLEMENTATIONS
    async executeVoiceResponse(action) {
        try {
            console.log(`🗣️ Executing voice response: ${action.intervention?.message || 'Generic response'}`);
            
            const message = action.intervention?.message || "I'm here with you 💙";
            const tone = action.intervention?.tone || 'warm';
            
            // Use existing AI system for voice response
            if (typeof window !== 'undefined' && window.getVelvetResponse) {
                // Get AI response if needed
                let responseText = message;
                
                if (action.context && action.context.type !== 'simple_message') {
                    try {
                        const aiResponse = await window.getVelvetResponse(
                            `Based on current context (${action.context.type}), provide a ${tone} response: ${message}`,
                            { maxLength: 100, personality: 'supportive_companion' }
                        );
                        responseText = aiResponse || message;
                    } catch (aiError) {
                        console.warn('⚠️ AI response failed, using default message:', aiError);
                        responseText = message;
                    }
                }
                
                // Add response to UI if available
                if (window.addMessage) {
                    window.addMessage(responseText, 'velvet');
                }
                
                // Trigger TTS if available
                if (window.electronAPI && window.electronAPI.tts) {
                    try {
                        await window.electronAPI.tts.speak(responseText, {
                            voice: 'gentle',
                            speed: 0.9,
                            pitch: 1.0
                        });
                    } catch (ttsError) {
                        console.warn('⚠️ TTS failed:', ttsError);
                    }
                }
                
                console.log('✅ Voice response executed successfully');
                return { executed: true, success: true, message: responseText };
                
            } else {
                // Fallback: just log the message
                console.log(`🗣️ Voice response (no AI system): ${message}`);
                return { executed: true, success: true, message: message, fallback: true };
            }
            
        } catch (error) {
            console.error('❌ Voice response execution failed:', error);
            return { executed: false, success: false, error: error.message };
        }
    }

    async executeVisualNudge(action) {
        try {
            console.log(`👁️ Executing visual nudge: ${action.intervention?.type || 'general'}`);
            
            const nudgeType = action.intervention?.type || 'gentle_highlight';
            const message = action.intervention?.message || 'Gentle nudge from Velvet';
            
            // Create visual nudge in UI
            const nudgeElement = this.createVisualNudge(nudgeType, message);
            
            if (typeof document !== 'undefined') {
                document.body.appendChild(nudgeElement);
                
                // Auto-remove after duration
                const duration = action.intervention?.duration === 'brief' ? 3000 : 5000;
                setTimeout(() => {
                    if (nudgeElement.parentNode) {
                        nudgeElement.parentNode.removeChild(nudgeElement);
                    }
                }, duration);
            }
            
            // Update orb visual state if available
            if (typeof window !== 'undefined' && window.updateVelvetOrbState) {
                window.updateVelvetOrbState('nudging', action.intervention?.tone || 'gentle');
                setTimeout(() => {
                    window.updateVelvetOrbState('normal');
                }, 2000);
            }
            
            console.log('✅ Visual nudge executed successfully');
            return { executed: true, success: true, nudgeType: nudgeType };
            
        } catch (error) {
            console.error('❌ Visual nudge execution failed:', error);
            return { executed: false, success: false, error: error.message };
        }
    }

    async executeTaskIntervention(action) {
        try {
            console.log(`📋 Executing task intervention: ${action.intervention?.type || 'general_help'}`);
            
            const interventionType = action.intervention?.type || 'task_assistance';
            const message = action.intervention?.message || 'Let me help break this down...';
            
            // Different types of task interventions
            switch (interventionType) {
                case 'task_breakdown':
                    return await this.executeTaskBreakdown(action, message);
                
                case 'focus_protection':
                    return await this.executeFocusProtection(action, message);
                
                case 'progress_celebration':
                    return await this.executeProgressCelebration(action, message);
                
                case 'gentle_redirect':
                    return await this.executeGentleRedirect(action, message);
                
                default:
                    // Generic task assistance
                    if (window.addMessage) {
                        window.addMessage(message, 'velvet');
                    }
                    
                    console.log('✅ Generic task intervention executed');
                    return { executed: true, success: true, type: 'generic' };
            }
            
        } catch (error) {
            console.error('❌ Task intervention execution failed:', error);
            return { executed: false, success: false, error: error.message };
        }
    }

    async executeMeetingAssistance(action) {
        try {
            console.log(`🎤 Executing meeting assistance: ${action.intervention?.type || 'general_support'}`);
            
            const assistanceType = action.intervention?.type || 'meeting_support';
            
            // Activate meeting assistant features
            if (typeof window !== 'undefined' && window.meetingAssistantAI) {
                // Enable real-time meeting assistance
                const meetingSupport = await window.meetingAssistantAI.activateSupport({
                    type: assistanceType,
                    context: action.context,
                    intervention: action.intervention
                });
                
                if (meetingSupport.success) {
                    console.log('✅ Meeting assistance activated');
                    return { executed: true, success: true, features: meetingSupport.features };
                }
            }
            
            // Fallback: Basic meeting awareness
            if (window.addMessage) {
                const message = action.intervention?.message || "Meeting detected - I'm here to help with social cues! 🎤";
                window.addMessage(message, 'velvet');
            }
            
            // Activate social decoder if available
            if (window.socialDecoderBridge) {
                window.socialDecoderBridge.onDetection((analysis) => {
                    if (analysis.isSarcasm || analysis.detectedEmotion) {
                        console.log('🧠 Meeting social cue detected:', analysis);
                    }
                });
            }
            
            console.log('✅ Basic meeting assistance executed');
            return { executed: true, success: true, type: 'basic_assistance' };
            
        } catch (error) {
            console.error('❌ Meeting assistance execution failed:', error);
            return { executed: false, success: false, error: error.message };
        }
    }

    async executeSocialDecoding(action) {
        try {
            console.log(`🧠 Executing social decoding: ${action.intervention?.type || 'social_assistance'}`);
            
            const decodingType = action.intervention?.type || 'social_assistance';
            const message = action.intervention?.message || "I'm analyzing social context to help you...";
            
            // Use existing social decoder bridge
            if (typeof window !== 'undefined' && window.socialDecoderBridge) {
                // Enable enhanced social decoding
                window.socialDecoderBridge.onDetection((analysis) => {
                    if (analysis.confidence > 0.7) {
                        this.handleSocialInsight(analysis, action);
                    }
                });
                
                // Provide immediate feedback
                if (window.addMessage) {
                    window.addMessage(message, 'velvet');
                }
                
                console.log('✅ Social decoding activated with existing bridge');
                return { executed: true, success: true, system: 'social_decoder_bridge' };
            }
            
            // Fallback: Basic social awareness message
            if (window.addMessage) {
                window.addMessage("I'm here to help decode social situations! 💙", 'velvet');
            }
            
            console.log('✅ Basic social decoding executed');
            return { executed: true, success: true, type: 'basic_social_support' };
            
        } catch (error) {
            console.error('❌ Social decoding execution failed:', error);
            return { executed: false, success: false, error: error.message };
        }
    }

    // Helper methods for specific task interventions
    async executeTaskBreakdown(action, message) {
        try {
            console.log('📋 Executing AI-powered task breakdown...');
            
            // Check if we already have an AI-generated task from detection
            if (action.context?.aiGeneratedTask) {
                console.log('🎆 Using pre-generated AI task breakdown');
                const task = action.context.aiGeneratedTask;
                
                // Activate the task in the task breakdown store
                if (typeof window !== 'undefined' && window.useTaskBreakdownStore) {
                    const store = window.useTaskBreakdownStore.getState();
                    store.setActiveTask(task);
                    store.showTaskUI();
                }
                
                // Provide encouraging message
                if (window.addMessage) {
                    window.addMessage(`Perfect! I've broken down "${task.title}" into ${task.steps.length} manageable micro-steps. Let's tackle them one by one! 🎆`, 'velvet');
                }
                
                return { 
                    executed: true, 
                    success: true, 
                    type: 'pre_generated_ai_task',
                    task: task,
                    steps: task.steps.length 
                };
            }
            
            if (window.addMessage) {
                window.addMessage(message, 'velvet');
            }
            
            // Use the AI-powered task breakdown engine
            if (typeof window !== 'undefined' && window.taskBreakdownEngine) {
                const userInput = action.context?.recentUserInput || 
                                action.intervention?.taskDescription || 
                                "Help me break down this task";
                
                console.log('🧠 Analyzing task with AI engine:', userInput);
                
                try {
                    const task = await window.taskBreakdownEngine.analyzeAndBreakdownTask(userInput);
                    
                    if (task) {
                        // Activate the task via the store
                        if (typeof window !== 'undefined' && window.useTaskBreakdownStore) {
                            const store = window.useTaskBreakdownStore.getState();
                            store.setActiveTask(task);
                            store.showTaskUI();
                        }
                        
                        // Show AI-generated breakdown
                        if (window.addMessage) {
                            window.addMessage(`Great! I've broken down "${task.title}" into ${task.steps.length} manageable steps. Check out the task panel! 🎆`, 'velvet');
                        }
                        
                        return { 
                            executed: true, 
                            success: true, 
                            type: 'ai_task_breakdown',
                            task: task,
                            steps: task.steps.length 
                        };
                    } else {
                        // No task detected, provide gentle guidance
                        if (window.addMessage) {
                            setTimeout(() => {
                                window.addMessage("What's the next thing you'd like to work on? I'm here to help break it down! 💙", 'velvet');
                            }, 1000);
                        }
                        
                        return { executed: true, success: true, type: 'guidance_prompt' };
                    }
                    
                } catch (aiError) {
                    console.error('❌ AI task breakdown failed:', aiError);
                    // Fallback to simple breakdown
                    return await this.executeFallbackTaskBreakdown(message);
                }
                
            } else {
                console.warn('⚠️ Task breakdown engine not available, using fallback');
                return await this.executeFallbackTaskBreakdown(message);
            }
            
        } catch (error) {
            console.error('❌ Task breakdown execution failed:', error);
            return { executed: false, success: false, error: error.message };
        }
    }
    
    async executeFallbackTaskBreakdown(message) {
        if (window.addMessage) {
            // Provide fallback breakdown suggestions
            setTimeout(() => {
                window.addMessage("Let's break this into smaller steps:\n1. Start with the easiest part\n2. Focus on just 5 minutes\n3. Take a breath between steps", 'velvet');
            }, 1000);
        }
        
        return { executed: true, success: true, type: 'fallback_task_breakdown' };
    }

    async executeFocusProtection(action, message) {
        if (window.addMessage) {
            window.addMessage("You're in the zone! I'll keep things quiet. 🎯", 'velvet');
        }
        
        // Could implement notification blocking, etc.
        return { executed: true, success: true, type: 'focus_protection' };
    }

    async executeProgressCelebration(action, message) {
        if (window.addMessage) {
            window.addMessage("Amazing progress! You should be proud! 🎉✨", 'velvet');
        }
        
        // Visual celebration effect
        this.triggerCelebrationEffect();
        
        return { executed: true, success: true, type: 'celebration' };
    }

    async executeGentleRedirect(action, message) {
        if (window.addMessage) {
            window.addMessage(message, 'velvet');
            
            setTimeout(() => {
                window.addMessage("What feels like the next smallest step? 💙", 'velvet');
            }, 1500);
        }
        
        return { executed: true, success: true, type: 'gentle_redirect' };
    }

    // Helper method to create visual nudges
    createVisualNudge(type, message) {
        if (typeof document === 'undefined') return null;
        
        const nudge = document.createElement('div');
        nudge.className = 'velvet-visual-nudge';
        nudge.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.93) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 12px;
            color: white;
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
            max-width: 300px;
            box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
            z-index: 10000;
            animation: velvetSlideIn 0.3s ease-out;
            pointer-events: auto;
        `;
        
        nudge.textContent = message;
        
        // Add animation styles if not exists
        if (!document.querySelector('#velvet-nudge-styles')) {
            const style = document.createElement('style');
            style.id = 'velvet-nudge-styles';
            style.textContent = `
                @keyframes velvetSlideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        return nudge;
    }

    // Helper method to handle social insights
    handleSocialInsight(analysis, action) {
        if (analysis.isSarcasm && window.addMessage) {
            const insight = analysis.subtext || 'Possible sarcasm detected';
            window.addMessage(`💙 Social insight: ${insight}`, 'velvet');
        }
        
        if (analysis.detectedEmotion && window.addMessage) {
            const emotion = analysis.detectedEmotion;
            window.addMessage(`💙 Emotional tone detected: ${emotion}`, 'velvet');
        }
    }

    // Helper method for celebration effects
    triggerCelebrationEffect() {
        if (typeof window !== 'undefined' && window.updateVelvetOrbState) {
            window.updateVelvetOrbState('celebrating');
            setTimeout(() => {
                window.updateVelvetOrbState('normal');
            }, 3000);
        }
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