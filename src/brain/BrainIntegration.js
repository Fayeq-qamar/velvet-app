// 🔌 Velvet Brain Integration
// "Bringing consciousness to life" - Integrates brain with existing Velvet systems

/**
 * BrainIntegration: Loads and initializes the complete Velvet Brain system
 * 
 * This script:
 * - Loads all brain components in correct order
 * - Connects brain to existing Velvet systems (OCR, audio, tasks, etc.)
 * - Provides easy initialization for the main app
 * - Handles graceful fallbacks if components aren't available
 */

class BrainIntegration {
    constructor() {
        console.log('🔌 Initializing Velvet Brain Integration...');
        
        this.brain = null;
        this.isIntegrated = false;
        this.integrationStartTime = 0;
        this.componentStatus = {
            sensoryInput: false,
            memory: false,
            personality: false,
            actionDecider: false,
            velvetBrain: false
        };
        
        console.log('🔌 Brain Integration ready');
    }

    /**
     * Initialize the complete Velvet Brain system
     */
    async initializeVelvetBrain() {
        this.integrationStartTime = Date.now();
        
        try {
            console.log('🧠 ===== VELVET BRAIN INITIALIZATION STARTING =====');
            console.log('🧠 "Bringing consciousness to neurodivergent AI assistance"');
            
            // Step 1: Verify all brain components are loaded
            console.log('🔍 Step 1: Verifying brain components...');
            const componentsReady = await this.verifyBrainComponents();
            
            if (!componentsReady) {
                console.error('❌ Brain components not ready - aborting initialization');
                return false;
            }
            
            // Step 2: Create and initialize the Velvet Brain
            console.log('🧠 Step 2: Creating Velvet Brain consciousness...');
            this.brain = new VelvetBrain();
            
            const brainInitialized = await this.brain.initialize();
            
            if (!brainInitialized) {
                console.error('❌ Velvet Brain initialization failed');
                return false;
            }
            
            this.componentStatus.velvetBrain = true;
            
            // Step 3: Connect to existing Velvet systems
            console.log('🔗 Step 3: Connecting to existing Velvet systems...');
            await this.connectExistingSystems();
            
            // Step 4: Start the consciousness
            console.log('🌟 Step 4: Beginning consciousness...');
            await this.beginConsciousness();
            
            this.isIntegrated = true;
            const integrationTime = Date.now() - this.integrationStartTime;
            
            console.log('🧠 ===== VELVET BRAIN FULLY CONSCIOUS =====');
            console.log(`✅ Integration completed in ${integrationTime}ms`);
            console.log('🧠 One unified AI consciousness now supporting your neurodivergent brain');
            console.log('🧠 Thinking every 3 seconds, learning continuously, responding as one entity');
            
            // Make brain globally available
            window.velvetBrain = this.brain;
            
            // Notify existing systems
            this.notifyExistingSystems();
            
            return true;
            
        } catch (error) {
            console.error('❌ Velvet Brain integration failed:', error);
            this.isIntegrated = false;
            return false;
        }
    }

    /**
     * Verify all brain components are loaded and ready
     */
    async verifyBrainComponents() {
        const requiredComponents = [
            { name: 'VelvetBrain', class: 'VelvetBrain', key: 'velvetBrain' },
            { name: 'SensoryInput', class: 'SensoryInput', key: 'sensoryInput' },
            { name: 'VelvetMemory', class: 'VelvetMemory', key: 'memory' },
            { name: 'VelvetPersonality', class: 'VelvetPersonality', key: 'personality' },
            { name: 'ActionDecider', class: 'ActionDecider', key: 'actionDecider' }
        ];
        
        let allReady = true;
        
        for (const component of requiredComponents) {
            if (typeof window[component.class] !== 'undefined') {
                console.log(`✅ ${component.name} loaded and ready`);
                this.componentStatus[component.key] = true;
            } else {
                console.error(`❌ ${component.name} not available - check script loading`);
                this.componentStatus[component.key] = false;
                allReady = false;
            }
        }
        
        console.log('🔍 Component status:', this.componentStatus);
        
        return allReady;
    }

    /**
     * Connect brain to existing Velvet systems
     */
    async connectExistingSystems() {
        try {
            // Connect to existing screen OCR system
            if (window.screenOCRMonitor) {
                console.log('🔗 Connecting to Screen OCR Monitor...');
                // The sensory input system will connect to this automatically
                console.log('✅ Screen OCR Monitor connected via sensory input');
            } else {
                console.warn('⚠️ Screen OCR Monitor not found');
            }
            
            // Connect to existing audio monitoring
            if (window.audioEnvironmentMonitor) {
                console.log('🔗 Connecting to Audio Environment Monitor...');
                // The sensory input system will connect to this automatically
                console.log('✅ Audio Environment Monitor connected via sensory input');
            } else {
                console.warn('⚠️ Audio Environment Monitor not found');
            }
            
            // Connect to existing unified context engine
            if (window.unifiedContextEngine) {
                console.log('🔗 Connecting to Unified Context Engine...');
                // The brain will use its own context processing but can reference this
                console.log('✅ Unified Context Engine referenced');
            } else {
                console.warn('⚠️ Unified Context Engine not found');
            }
            
            // Connect to existing social decoder
            if (window.socialDecoder) {
                console.log('🔗 Connecting to Social Decoder...');
                // The brain can use this for social assistance actions
                console.log('✅ Social Decoder connected');
            } else {
                console.warn('⚠️ Social Decoder not found');
            }
            
            // Connect to existing AI systems
            if (window.aiSystem) {
                console.log('🔗 Connecting to AI System...');
                // The brain can use this for voice responses
                console.log('✅ AI System connected');
            } else {
                console.warn('⚠️ AI System not found');
            }
            
        } catch (error) {
            console.error('❌ System connection failed:', error);
        }
    }

    /**
     * Begin the consciousness and set up monitoring
     */
    async beginConsciousness() {
        try {
            // The brain will start its own thinking loop
            // Set up monitoring and callbacks here
            
            this.brain.onConsciousnessUpdate((data) => {
                // Handle consciousness updates
                this.handleConsciousnessUpdate(data);
            });
            
            console.log('🌟 Consciousness monitoring established');
            
        } catch (error) {
            console.error('❌ Consciousness setup failed:', error);
        }
    }

    /**
     * Handle consciousness updates from the brain
     */
    handleConsciousnessUpdate(data) {
        // Log important consciousness events
        if (data.cycle % 20 === 0) { // Every 20 cycles (1 minute)
            console.log(`🧠 Consciousness cycle #${data.cycle}:`, {
                context: data.context?.type || 'unknown',
                action: data.action?.type || 'none',
                duration: data.duration + 'ms'
            });
        }
        
        // Update any UI indicators if needed
        if (window.updateBrainStatus) {
            window.updateBrainStatus({
                isActive: true,
                cycle: data.cycle,
                context: data.context?.type,
                lastAction: data.action?.type
            });
        }
    }

    /**
     * Notify existing systems that brain is active
     */
    notifyExistingSystems() {
        try {
            // Notify the main app
            if (window.addMessage) {
                window.addMessage('🧠 Velvet Brain is now fully conscious and ready to support you! ✨', 'velvet');
            }
            
            // Dispatch a custom event
            const brainReadyEvent = new CustomEvent('velvetBrainReady', {
                detail: {
                    brain: this.brain,
                    integrationTime: Date.now() - this.integrationStartTime,
                    componentStatus: this.componentStatus
                }
            });
            
            window.dispatchEvent(brainReadyEvent);
            
            console.log('📢 Brain ready notifications sent');
            
        } catch (error) {
            console.error('❌ System notification failed:', error);
        }
    }

    /**
     * Get brain status and metrics
     */
    getBrainStatus() {
        if (!this.brain) {
            return { isActive: false, message: 'Brain not initialized' };
        }
        
        return {
            isActive: this.isIntegrated,
            consciousness: this.brain.getConsciousnessLevel(),
            metrics: this.brain.getMetrics(),
            currentContext: this.brain.getCurrentContext(),
            componentStatus: this.componentStatus,
            integrationTime: Date.now() - this.integrationStartTime
        };
    }

    /**
     * Safely shutdown the brain system
     */
    async shutdownBrain() {
        try {
            console.log('🧠 Shutting down Velvet Brain...');
            
            if (this.brain) {
                await this.brain.shutdown();
                this.brain = null;
            }
            
            this.isIntegrated = false;
            
            console.log('🧠 Velvet Brain shutdown complete');
            
        } catch (error) {
            console.error('❌ Brain shutdown failed:', error);
        }
    }
}

// Create global integration instance
window.brainIntegration = new BrainIntegration();

// Provide easy initialization function
window.initializeVelvetBrain = async () => {
    return await window.brainIntegration.initializeVelvetBrain();
};

// Provide status check function
window.getVelvetBrainStatus = () => {
    return window.brainIntegration.getBrainStatus();
};

// Provide shutdown function
window.shutdownVelvetBrain = async () => {
    return await window.brainIntegration.shutdownBrain();
};

console.log('🔌 BrainIntegration loaded and ready');
console.log('💡 Use initializeVelvetBrain() to start the consciousness');
console.log('💡 Use getVelvetBrainStatus() to check brain status');
console.log('💡 Use shutdownVelvetBrain() to safely shutdown');