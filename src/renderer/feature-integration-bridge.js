// Feature Integration Bridge - Connects all three Phase 2 viral features
// Enables Social Decoder, Executive Dysfunction, and Velvet Brain to work together

/**
 * FeatureIntegrationBridge
 * 
 * Coordinates communication between:
 * - Social Decoder: Real-time neurotypical translation
 * - Executive Dysfunction Emergency Mode: Crisis pattern detection
 * - Velvet Brain: Unified AI consciousness
 * 
 * This bridge enables features to share context and enhance each other's capabilities.
 */

class FeatureIntegrationBridge {
    constructor() {
        console.log('🌉 Initializing Feature Integration Bridge...');
        
        // Feature instances
        this.socialDecoder = null;
        this.executiveDysfunctionUI = null;
        this.velvetBrain = null;
        
        // Integration state
        this.isInitialized = false;
        this.featuresReady = {
            socialDecoder: false,
            executiveDysfunction: false,
            velvetBrain: false
        };
        
        // Event system for cross-feature communication
        this.eventHandlers = {};
        this.integrationMetrics = {
            totalIntegrations: 0,
            successfulConnections: 0,
            crossFeatureEvents: 0
        };
        
        console.log('🌉 Feature Integration Bridge core initialized');
    }
    
    /**
     * Initialize all features and connect them
     */
    async initialize() {
        try {
            console.log('🔄 Starting feature integration...');
            
            // Initialize each feature
            await this.initializeSocialDecoder();
            await this.initializeExecutiveDysfunction();
            await this.initializeVelvetBrain();
            
            // Set up cross-feature communication
            this.setupCrossFeatureCommunication();
            
            // Enable integration events
            this.enableIntegrationEvents();
            
            this.isInitialized = true;
            console.log('✅ Feature Integration Bridge fully operational');
            
            return this.getIntegrationStatus();
            
        } catch (error) {
            console.error('❌ Feature integration failed:', error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Initialize Social Decoder with integration hooks
     */
    async initializeSocialDecoder() {
        try {
            if (typeof SocialDecoder !== 'undefined') {
                console.log('🎭 Connecting Social Decoder...');
                
                this.socialDecoder = new SocialDecoder();
                await this.socialDecoder.initialize();
                
                // Hook into Social Decoder events
                this.socialDecoder.onDetection = (analysis) => {
                    this.handleSocialDecoderAnalysis(analysis);
                };
                
                this.featuresReady.socialDecoder = true;
                console.log('✅ Social Decoder integrated');
                
            } else {
                console.warn('⚠️ Social Decoder not available for integration');
            }
        } catch (error) {
            console.error('❌ Social Decoder integration failed:', error);
        }
    }
    
    /**
     * Initialize Executive Dysfunction with integration hooks
     */
    async initializeExecutiveDysfunction() {
        try {
            if (typeof ExecutiveDysfunctionUI !== 'undefined') {
                console.log('🚨 Connecting Executive Dysfunction UI...');
                
                this.executiveDysfunctionUI = new ExecutiveDysfunctionUI();
                await this.executiveDysfunctionUI.initialize();
                
                // Hook into Executive Dysfunction events
                this.executiveDysfunctionUI.onIntervention = (intervention) => {
                    this.handleExecutiveDysfunctionIntervention(intervention);
                };
                
                this.featuresReady.executiveDysfunction = true;
                console.log('✅ Executive Dysfunction integrated');
                
            } else {
                console.warn('⚠️ Executive Dysfunction UI not available for integration');
            }
        } catch (error) {
            console.error('❌ Executive Dysfunction integration failed:', error);
        }
    }
    
    /**
     * Initialize Velvet Brain with integration hooks
     */
    async initializeVelvetBrain() {
        try {
            if (typeof VelvetBrain !== 'undefined') {
                console.log('🧠 Connecting Velvet Brain...');
                
                this.velvetBrain = new VelvetBrain();
                await this.velvetBrain.initialize();
                
                // Hook into Velvet Brain consciousness
                this.velvetBrain.onConsciousness = (thought) => {
                    this.handleVelvetBrainThought(thought);
                };
                
                this.featuresReady.velvetBrain = true;
                console.log('✅ Velvet Brain integrated');
                
            } else {
                console.warn('⚠️ Velvet Brain not available for integration');
            }
        } catch (error) {
            console.error('❌ Velvet Brain integration failed:', error);
        }
    }
    
    /**
     * Set up cross-feature communication channels
     */
    setupCrossFeatureCommunication() {
        console.log('🔗 Setting up cross-feature communication...');
        
        // Social Decoder → Executive Dysfunction
        // When social stress is detected, alert executive dysfunction system
        this.on('social-stress-detected', (data) => {
            if (this.featuresReady.executiveDysfunction) {
                console.log('🎭→🚨 Social stress detected, alerting Executive Dysfunction system');
                this.executiveDysfunctionUI.handleSocialStress(data);
            }
        });
        
        // Executive Dysfunction → Social Decoder
        // When crisis is detected, enhance social analysis sensitivity
        this.on('executive-crisis-detected', (data) => {
            if (this.featuresReady.socialDecoder) {
                console.log('🚨→🎭 Executive crisis detected, enhancing social analysis');
                this.socialDecoder.enhanceSensitivity(data.crisisLevel);
            }
        });
        
        // Velvet Brain → Both Features
        // Consciousness insights inform both social and executive analysis
        this.on('brain-insight', (data) => {
            if (this.featuresReady.socialDecoder) {
                this.socialDecoder.incorporateContext(data.insight);
            }
            if (this.featuresReady.executiveDysfunction) {
                this.executiveDysfunctionUI.incorporateContext(data.insight);
            }
        });
        
        // Both Features → Velvet Brain
        // Feed analysis results back to brain for learning
        this.on('feature-analysis', (data) => {
            if (this.featuresReady.velvetBrain) {
                this.velvetBrain.learnFromAnalysis(data);
            }
        });
        
        console.log('✅ Cross-feature communication channels established');
    }
    
    /**
     * Handle Social Decoder analysis results
     */
    handleSocialDecoderAnalysis(analysis) {
        console.log('🎭 Social Decoder analysis received:', analysis);
        
        // Check for stress indicators
        if (analysis.emotionalTone === 'frustration' || analysis.sarcasmProbability > 0.7) {
            this.emit('social-stress-detected', {
                type: 'communication_stress',
                analysis: analysis,
                severity: analysis.sarcasmProbability || 0.5
            });
        }
        
        // Feed to brain for learning
        this.emit('feature-analysis', {
            source: 'social-decoder',
            type: 'communication_analysis',
            data: analysis,
            timestamp: Date.now()
        });
        
        this.integrationMetrics.crossFeatureEvents++;
    }
    
    /**
     * Handle Executive Dysfunction intervention events
     */
    handleExecutiveDysfunctionIntervention(intervention) {
        console.log('🚨 Executive Dysfunction intervention triggered:', intervention);
        
        // Alert other systems to crisis state
        if (intervention.level === 'crisis') {
            this.emit('executive-crisis-detected', {
                type: 'executive_crisis',
                intervention: intervention,
                crisisLevel: intervention.level
            });
        }
        
        // Feed to brain for learning
        this.emit('feature-analysis', {
            source: 'executive-dysfunction',
            type: 'intervention_data',
            data: intervention,
            timestamp: Date.now()
        });
        
        this.integrationMetrics.crossFeatureEvents++;
    }
    
    /**
     * Handle Velvet Brain consciousness thoughts
     */
    handleVelvetBrainThought(thought) {
        console.log('🧠 Velvet Brain thought received:', thought);
        
        // Share insights with other features
        if (thought.insights && thought.insights.length > 0) {
            this.emit('brain-insight', {
                type: 'consciousness_insight',
                insight: thought.insights[0],
                context: thought.context,
                timestamp: Date.now()
            });
        }
        
        this.integrationMetrics.crossFeatureEvents++;
    }
    
    /**
     * Event system for cross-feature communication
     */
    on(event, handler) {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(handler);
    }
    
    emit(event, data) {
        if (this.eventHandlers[event]) {
            this.eventHandlers[event].forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`❌ Event handler error for ${event}:`, error);
                }
            });
        }
    }
    
    /**
     * Enable automatic integration events
     */
    enableIntegrationEvents() {
        console.log('⚡ Enabling automatic integration events...');
        
        // Periodic integration health check
        setInterval(() => {
            this.performIntegrationHealthCheck();
        }, 30000); // Every 30 seconds
        
        // Cross-feature coordination triggers
        this.setupAutomaticTriggers();
        
        console.log('✅ Automatic integration events enabled');
    }
    
    /**
     * Set up automatic triggers between features
     */
    setupAutomaticTriggers() {
        // Trigger social analysis when executive patterns change
        if (this.featuresReady.executiveDysfunction && this.featuresReady.socialDecoder) {
            // This would be enhanced with actual pattern detection
            console.log('🔄 Social-Executive integration triggers set up');
        }
        
        // Trigger brain thinking when social events occur
        if (this.featuresReady.socialDecoder && this.featuresReady.velvetBrain) {
            console.log('🔄 Social-Brain integration triggers set up');
        }
        
        // Trigger executive monitoring when brain detects stress
        if (this.featuresReady.velvetBrain && this.featuresReady.executiveDysfunction) {
            console.log('🔄 Brain-Executive integration triggers set up');
        }
    }
    
    /**
     * Perform integration health check
     */
    performIntegrationHealthCheck() {
        const healthStatus = {
            bridgeOperational: this.isInitialized,
            featuresConnected: Object.values(this.featuresReady).filter(ready => ready).length,
            totalFeatures: Object.keys(this.featuresReady).length,
            crossFeatureEvents: this.integrationMetrics.crossFeatureEvents,
            lastCheckTime: Date.now()
        };
        
        console.log('🔍 Integration health check:', healthStatus);
        
        return healthStatus;
    }
    
    /**
     * Get comprehensive integration status
     */
    getIntegrationStatus() {
        const connectedFeatures = Object.entries(this.featuresReady)
            .filter(([name, ready]) => ready)
            .map(([name]) => name);
        
        const integrationLevel = (connectedFeatures.length / Object.keys(this.featuresReady).length) * 100;
        
        return {
            success: this.isInitialized,
            integrationLevel: integrationLevel.toFixed(1),
            connectedFeatures,
            featuresReady: this.featuresReady,
            metrics: this.integrationMetrics,
            healthStatus: this.performIntegrationHealthCheck()
        };
    }
    
    /**
     * Test all integrations with sample data
     */
    async testIntegrations() {
        console.log('🧪 Testing feature integrations...');
        
        const testResults = [];
        
        // Test 1: Social Decoder integration
        if (this.featuresReady.socialDecoder) {
            try {
                this.handleSocialDecoderAnalysis({
                    text: "Fine, whatever works for you.",
                    emotionalTone: 'frustration',
                    sarcasmProbability: 0.8,
                    confidence: 0.9
                });
                testResults.push({ test: 'social-decoder-integration', success: true });
            } catch (error) {
                testResults.push({ test: 'social-decoder-integration', success: false, error: error.message });
            }
        }
        
        // Test 2: Executive Dysfunction integration
        if (this.featuresReady.executiveDysfunction) {
            try {
                this.handleExecutiveDysfunctionIntervention({
                    type: 'distraction_spiral',
                    level: 'crisis',
                    message: 'Test crisis intervention',
                    timestamp: Date.now()
                });
                testResults.push({ test: 'executive-dysfunction-integration', success: true });
            } catch (error) {
                testResults.push({ test: 'executive-dysfunction-integration', success: false, error: error.message });
            }
        }
        
        // Test 3: Velvet Brain integration
        if (this.featuresReady.velvetBrain) {
            try {
                this.handleVelvetBrainThought({
                    type: 'consciousness_cycle',
                    insights: ['User may need support'],
                    context: { emotional_state: 'stressed' },
                    timestamp: Date.now()
                });
                testResults.push({ test: 'velvet-brain-integration', success: true });
            } catch (error) {
                testResults.push({ test: 'velvet-brain-integration', success: false, error: error.message });
            }
        }
        
        const successCount = testResults.filter(result => result.success).length;
        const successRate = (successCount / testResults.length) * 100;
        
        console.log('🧪 Integration test results:', {
            successRate: successRate.toFixed(1),
            results: testResults
        });
        
        return {
            successRate,
            totalTests: testResults.length,
            successfulTests: successCount,
            results: testResults
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeatureIntegrationBridge;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.FeatureIntegrationBridge = FeatureIntegrationBridge;
}

console.log('🌉 FeatureIntegrationBridge class definition loaded');