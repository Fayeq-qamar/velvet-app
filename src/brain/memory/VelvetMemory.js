// 🧩 Velvet Memory System
// "The brain that remembers and learns" - Memory, learning, and pattern recognition

/**
 * VelvetMemory: The memory and learning system for Velvet Brain
 * 
 * Three-layered memory architecture:
 * - Working Memory: Current session context and immediate awareness
 * - Episodic Memory: Experience-based learning from user interactions
 * - Semantic Memory: Knowledge about the user's world, preferences, and patterns
 * 
 * This system enables the brain to:
 * - Remember what's happening right now
 * - Learn from past experiences
 * - Build deep understanding of the user's unique neurodivergent patterns
 * - Predict future needs based on learned behaviors
 */

class VelvetMemory {
    constructor() {
        console.log('🧩 Initializing Velvet Memory System...');
        
        // Memory subsystems
        this.workingMemory = null;       // Current session awareness
        this.episodicMemory = null;      // Experience-based learning
        this.semanticMemory = null;      // User knowledge and patterns
        
        // State tracking
        this.isActive = false;
        this.lastMemoryUpdate = 0;
        this.totalExperiences = 0;
        this.learningAccuracy = 0;
        
        // Configuration
        this.config = {
            workingMemoryCapacity: 20,        // Items in working memory
            episodicMemoryCapacity: 1000,     // Experience records
            semanticMemoryCapacity: 500,      // Knowledge entries
            learningRate: 0.1,                // How fast to adapt patterns
            confidenceThreshold: 0.6,         // Minimum confidence for predictions
            memoryConsolidationInterval: 60000, // Consolidate every minute
            patternMinOccurrences: 3          // Min occurrences to form pattern
        };
        
        // Learning metrics
        this.metrics = {
            patternsLearned: 0,
            successfulPredictions: 0,
            totalPredictions: 0,
            memoryUtilization: 0,
            learningEfficiency: 0
        };
        
        console.log('🧩 Velvet Memory System core initialized');
    }

    /**
     * Initialize all memory subsystems
     */
    async initialize() {
        try {
            console.log('🧩 Starting memory subsystem initialization...');
            
            // Initialize Working Memory
            console.log('⚡ Initializing Working Memory...');
            await this.initializeWorkingMemory();
            
            // Initialize Episodic Memory  
            console.log('📚 Initializing Episodic Memory...');
            await this.initializeEpisodicMemory();
            
            // Initialize Semantic Memory
            console.log('🎓 Initializing Semantic Memory...');
            await this.initializeSemanticMemory();
            
            // Start memory consolidation process
            console.log('🔄 Starting memory consolidation...');
            await this.startMemoryConsolidation();
            
            this.isActive = true;
            console.log('✅ Velvet Memory System fully operational');
            
            return true;
            
        } catch (error) {
            console.error('❌ Memory system initialization failed:', error);
            this.isActive = false;
            return false;
        }
    }

    /**
     * Process current context through memory systems
     * This is called by the brain during the "understand" phase
     */
    async processContext(currentState) {
        if (!this.isActive) {
            console.warn('⚠️ Memory system not active');
            return { context: 'unknown', confidence: 0 };
        }
        
        try {
            console.log('🧩 Processing context through memory...');
            
            // Update working memory with current state
            await this.workingMemory.updateCurrent(currentState);
            
            // Find similar past experiences
            const similarExperiences = await this.episodicMemory.findSimilar(currentState);
            
            // Apply semantic knowledge
            const semanticContext = await this.semanticMemory.analyzeContext(currentState);
            
            // Synthesize understanding
            const context = await this.synthesizeContext(
                currentState, 
                similarExperiences, 
                semanticContext
            );
            
            this.lastMemoryUpdate = Date.now();
            
            console.log('🧩 Context processing complete:', {
                contextType: context.type,
                confidence: context.confidence,
                similarExperiences: similarExperiences.length,
                semanticMatches: semanticContext.matches
            });
            
            return context;
            
        } catch (error) {
            console.error('❌ Context processing failed:', error);
            return { context: 'error', confidence: 0, error: error.message };
        }
    }

    /**
     * Find similar contexts from past experiences
     */
    async findSimilarContexts(context) {
        if (!this.episodicMemory) return [];
        
        try {
            const similarContexts = await this.episodicMemory.findSimilarContexts(context);
            
            console.log(`🔍 Found ${similarContexts.length} similar contexts`);
            
            return similarContexts;
            
        } catch (error) {
            console.error('❌ Similar context search failed:', error);
            return [];
        }
    }

    /**
     * Predict immediate needs based on context and learned patterns
     */
    async predictImmediateNeeds(context, patterns) {
        try {
            const predictions = [];
            
            // Use episodic memory to predict based on similar situations
            if (patterns && patterns.length > 0) {
                for (const pattern of patterns) {
                    const need = await this.predictFromPattern(pattern, context);
                    if (need && need.confidence > this.config.confidenceThreshold) {
                        predictions.push(need);
                    }
                }
            }
            
            // Use semantic memory for user-specific predictions
            if (this.semanticMemory) {
                const semanticPredictions = await this.semanticMemory.predictNeeds(context);
                predictions.push(...semanticPredictions);
            }
            
            // Sort by confidence and urgency
            predictions.sort((a, b) => (b.confidence * b.urgency) - (a.confidence * a.urgency));
            
            this.metrics.totalPredictions++;
            
            console.log(`🔮 Generated ${predictions.length} immediate need predictions`);
            
            return predictions.slice(0, 5); // Return top 5 predictions
            
        } catch (error) {
            console.error('❌ Immediate needs prediction failed:', error);
            return [];
        }
    }

    /**
     * Predict short-term needs (5-10 minutes ahead)
     */
    async predictShortTermNeeds(context, patterns) {
        try {
            const predictions = [];
            
            // Analyze current trajectory
            const trajectory = await this.workingMemory.analyzeTrajectory();
            
            // Use patterns to predict where user is heading
            if (patterns && patterns.length > 0) {
                for (const pattern of patterns) {
                    const futureNeeds = await this.predictFutureFromPattern(pattern, trajectory);
                    predictions.push(...futureNeeds);
                }
            }
            
            console.log(`🔮 Generated ${predictions.length} short-term predictions`);
            
            return predictions;
            
        } catch (error) {
            console.error('❌ Short-term needs prediction failed:', error);
            return [];
        }
    }

    /**
     * Store a complete experience for learning
     */
    async storeExperience(experience) {
        if (!this.episodicMemory) {
            console.warn('⚠️ No episodic memory available for storing experience');
            return;
        }
        
        try {
            await this.episodicMemory.store(experience);
            this.totalExperiences++;
            
            console.log('📚 Experience stored:', {
                type: experience.context?.type,
                success: experience.success,
                totalExperiences: this.totalExperiences
            });
            
        } catch (error) {
            console.error('❌ Experience storage failed:', error);
        }
    }

    /**
     * Reinforce a successful pattern
     */
    async reinforcePattern(context, action) {
        try {
            if (this.episodicMemory) {
                await this.episodicMemory.reinforcePattern(context, action);
            }
            
            if (this.semanticMemory) {
                await this.semanticMemory.strengthenAssociation(context, action);
            }
            
            this.metrics.successfulPredictions++;
            this.learningAccuracy = this.metrics.successfulPredictions / Math.max(1, this.metrics.totalPredictions);
            
            console.log('💪 Pattern reinforced:', {
                contextType: context.type,
                actionType: action.type,
                learningAccuracy: this.learningAccuracy.toFixed(2)
            });
            
        } catch (error) {
            console.error('❌ Pattern reinforcement failed:', error);
        }
    }

    /**
     * Weaken an unsuccessful pattern
     */
    async weakenPattern(context, action) {
        try {
            if (this.episodicMemory) {
                await this.episodicMemory.weakenPattern(context, action);
            }
            
            if (this.semanticMemory) {
                await this.semanticMemory.weakenAssociation(context, action);
            }
            
            console.log('📉 Pattern weakened:', {
                contextType: context.type,
                actionType: action.type
            });
            
        } catch (error) {
            console.error('❌ Pattern weakening failed:', error);
        }
    }

    /**
     * Synthesize understanding from all memory sources
     */
    async synthesizeContext(currentState, similarExperiences, semanticContext) {
        try {
            const context = {
                type: 'unknown',
                confidence: 0,
                details: {},
                predictions: [],
                insights: [],
                emotionalState: null,
                userNeeds: null
            };
            
            // Use semantic knowledge as baseline
            if (semanticContext && semanticContext.type) {
                context.type = semanticContext.type;
                context.confidence = semanticContext.confidence || 0.3;
                context.details = { ...semanticContext.details };
            }
            
            // Enhance with episodic experiences
            if (similarExperiences && similarExperiences.length > 0) {
                const experienceInsights = this.extractExperienceInsights(similarExperiences);
                context.insights.push(...experienceInsights);
                
                // Boost confidence if we have good similar experiences
                if (similarExperiences.length >= 3) {
                    context.confidence = Math.min(1.0, context.confidence + 0.3);
                }
            }
            
            // Add working memory context
            if (this.workingMemory) {
                const workingContext = await this.workingMemory.getCurrentContext();
                if (workingContext) {
                    context.details.session = workingContext;
                    context.details.recentPatterns = workingContext.patterns || [];
                }
            }
            
            return context;
            
        } catch (error) {
            console.error('❌ Context synthesis failed:', error);
            return { type: 'error', confidence: 0 };
        }
    }

    /**
     * Extract insights from similar experiences
     */
    extractExperienceInsights(experiences) {
        const insights = [];
        
        try {
            // Look for patterns in successful vs unsuccessful experiences
            const successful = experiences.filter(exp => exp.success);
            const unsuccessful = experiences.filter(exp => !exp.success);
            
            if (successful.length > unsuccessful.length) {
                insights.push({
                    type: 'success_pattern',
                    insight: 'This context typically leads to successful outcomes',
                    confidence: successful.length / experiences.length
                });
            }
            
            // Look for timing patterns
            const timePattern = this.analyzeTimingPatterns(experiences);
            if (timePattern) {
                insights.push(timePattern);
            }
            
            // Look for emotional patterns
            const emotionalPattern = this.analyzeEmotionalPatterns(experiences);
            if (emotionalPattern) {
                insights.push(emotionalPattern);
            }
            
        } catch (error) {
            console.error('❌ Insight extraction failed:', error);
        }
        
        return insights;
    }

    /**
     * Analyze timing patterns in experiences
     */
    analyzeTimingPatterns(experiences) {
        // Placeholder - would analyze time of day, duration, etc.
        return null;
    }

    /**
     * Analyze emotional patterns in experiences
     */
    analyzeEmotionalPatterns(experiences) {
        // Placeholder - would analyze user emotional states
        return null;
    }

    /**
     * Predict needs from a learned pattern
     */
    async predictFromPattern(pattern, context) {
        // Placeholder implementation
        return {
            type: 'predicted_need',
            description: 'User might need assistance based on learned pattern',
            confidence: 0.7,
            urgency: 0.5,
            suggestedAction: 'gentle_check_in'
        };
    }

    /**
     * Predict future needs from pattern and trajectory
     */
    async predictFutureFromPattern(pattern, trajectory) {
        // Placeholder implementation
        return [];
    }

    /**
     * Start memory consolidation process
     */
    async startMemoryConsolidation() {
        console.log('🔄 Starting memory consolidation process...');
        
        setInterval(async () => {
            try {
                await this.consolidateMemories();
            } catch (error) {
                console.error('❌ Memory consolidation error:', error);
            }
        }, this.config.memoryConsolidationInterval);
    }

    /**
     * Consolidate memories - move important short-term memories to long-term
     */
    async consolidateMemories() {
        if (!this.workingMemory || !this.episodicMemory) return;
        
        try {
            // Get important items from working memory
            const importantItems = await this.workingMemory.getImportantItems();
            
            // Move them to episodic memory
            for (const item of importantItems) {
                await this.episodicMemory.consolidate(item);
            }
            
            // Clean up old working memory items
            await this.workingMemory.cleanup();
            
            console.log(`🔄 Consolidated ${importantItems.length} memory items`);
            
        } catch (error) {
            console.error('❌ Memory consolidation failed:', error);
        }
    }

    // Memory subsystem initialization (placeholders for now)
    async initializeWorkingMemory() {
        // Will create WorkingMemory class
        console.log('⚡ Working Memory placeholder - to be implemented');
        this.workingMemory = {
            updateCurrent: async () => {},
            getCurrentContext: async () => ({ patterns: [] }),
            analyzeTrajectory: async () => ({ direction: 'stable' }),
            getImportantItems: async () => [],
            cleanup: async () => {}
        };
    }

    async initializeEpisodicMemory() {
        // Will create EpisodicMemory class
        console.log('📚 Episodic Memory placeholder - to be implemented');
        this.episodicMemory = {
            findSimilar: async () => [],
            findSimilarContexts: async () => [],
            store: async () => {},
            reinforcePattern: async () => {},
            weakenPattern: async () => {},
            consolidate: async () => {}
        };
    }

    async initializeSemanticMemory() {
        // Will create SemanticMemory class
        console.log('🎓 Semantic Memory placeholder - to be implemented');
        this.semanticMemory = {
            analyzeContext: async () => ({ type: 'unknown', confidence: 0.3, details: {}, matches: 0 }),
            predictNeeds: async () => [],
            strengthenAssociation: async () => {},
            weakenAssociation: async () => {}
        };
    }

    // Utility methods
    getExperienceCount() {
        return this.totalExperiences;
    }

    getMetrics() {
        return {
            ...this.metrics,
            totalExperiences: this.totalExperiences,
            learningAccuracy: this.learningAccuracy,
            isActive: this.isActive,
            lastUpdate: this.lastMemoryUpdate
        };
    }

    isHealthy() {
        return this.isActive && 
               this.workingMemory && 
               this.episodicMemory && 
               this.semanticMemory;
    }

    async shutdown() {
        console.log('🧩 Shutting down Velvet Memory System...');
        
        this.isActive = false;
        
        // Shutdown subsystems
        if (this.workingMemory?.shutdown) {
            await this.workingMemory.shutdown();
        }
        
        if (this.episodicMemory?.shutdown) {
            await this.episodicMemory.shutdown();
        }
        
        if (this.semanticMemory?.shutdown) {
            await this.semanticMemory.shutdown();
        }
        
        console.log('🧩 Velvet Memory System shutdown complete');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VelvetMemory;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.VelvetMemory = VelvetMemory;
}

console.log('🧩 VelvetMemory class definition loaded');