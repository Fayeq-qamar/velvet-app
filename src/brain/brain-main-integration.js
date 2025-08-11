// Velvet Brain Main Process Integration
// Connects the unified consciousness system to Electron main process

const VelvetBrain = require('./VelvetBrain.js');

class BrainMainIntegration {
    constructor() {
        this.brain = null;
        this.isInitialized = false;
        this.initializationPromise = null;
        console.log('🧠 Brain main process integration initialized');
    }

    /**
     * Initialize the unified brain system in main process
     */
    async initialize() {
        if (this.initializationPromise) {
            return this.initializationPromise;
        }

        this.initializationPromise = this._doInitialize();
        return this.initializationPromise;
    }

    async _doInitialize() {
        try {
            console.log('🧠 Initializing unified Velvet Brain in main process...');
            
            // Create brain instance
            this.brain = new VelvetBrain();
            
            // Initialize with safe fallbacks for main process
            const success = await this._initializeBrainSafely();
            
            if (success) {
                this.isInitialized = true;
                console.log('✅ Unified Velvet Brain ready in main process');
                
                // Set up IPC handlers for brain communication
                this._setupBrainIPC();
                
                return true;
            } else {
                console.warn('⚠️ Brain initialization failed, using fallback mode');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Brain main integration failed:', error);
            return false;
        }
    }

    async _initializeBrainSafely() {
        try {
            // For main process, we'll use a simplified initialization
            // since we don't have DOM/browser APIs
            
            console.log('🧠 Setting up brain for main process environment...');
            
            // Create mock sensory input for main process
            this.brain.sensoryInput = {
                gatherAllInputs: async () => {
                    return {
                        timestamp: Date.now(),
                        visual: { source: 'main_process', data: 'limited' },
                        auditory: { source: 'main_process', data: 'limited' },
                        behavioral: { source: 'main_process', data: 'limited' }
                    };
                },
                shutdown: async () => { /* cleanup */ }
            };
            
            // Create simple memory system for main process
            this.brain.memory = {
                processContext: async (state) => ({
                    type: 'main_process',
                    confidence: 0.7,
                    emotionalState: { state: 'neutral' },
                    userNeeds: { primary: 'system_support' }
                }),
                findSimilarContexts: async () => ([]),
                predictImmediateNeeds: async () => ([]),
                predictShortTermNeeds: async () => ([]),
                storeExperience: async () => { /* store in main process memory */ },
                reinforcePattern: async () => { /* reinforce patterns */ },
                weakenPattern: async () => { /* weaken patterns */ },
                getExperienceCount: () => 0,
                shutdown: async () => { /* cleanup */ }
            };
            
            // Create personality system for main process
            this.brain.personality = {
                assessEmotionalState: async () => ({ state: 'supportive' }),
                assessUserNeeds: async (context) => ({ primary: 'gentle_assistance' }),
                filterAction: async (action) => action,
                initialize: async () => true
            };
            
            // Create action decider for main process
            this.brain.actionDecider = {
                chooseBestAction: async (predictions, context) => ({
                    type: 'voice_response',
                    priority: 0.8,
                    confidence: 0.7,
                    timing: 'immediate',
                    intervention: {
                        message: 'I\'m here to help! 💙',
                        tone: 'warm'
                    }
                }),
                initialize: async () => true
            };
            
            // Start the consciousness loop
            this.brain.isActive = true;
            this.brain.consciousnessLevel = 1.0;
            
            // Begin thinking (but with longer intervals for main process)
            this.brain.config.thinkingIntervalMs = 10000; // Think every 10 seconds
            await this.brain.beginConsciousness();
            
            console.log('✅ Brain consciousness active in main process');
            return true;
            
        } catch (error) {
            console.error('❌ Safe brain initialization failed:', error);
            return false;
        }
    }

    _setupBrainIPC() {
        try {
            const { ipcMain } = require('electron');
            
            console.log('🔗 Setting up brain IPC handlers...');
        
        // Get brain status
        ipcMain.handle('brain-get-status', async () => {
            if (!this.brain) return { active: false };
            
            return {
                active: this.brain.isActive,
                consciousness: this.brain.consciousnessLevel,
                metrics: this.brain.getMetrics(),
                context: this.brain.getCurrentContext()
            };
        });
        
        // Trigger specific brain action
        ipcMain.handle('brain-trigger-action', async (event, actionType, data) => {
            if (!this.brain || !this.brain.isActive) {
                return { success: false, reason: 'brain not active' };
            }
            
            try {
                const action = {
                    type: actionType,
                    priority: 0.8,
                    confidence: 0.7,
                    timing: 'immediate',
                    intervention: data
                };
                
                const outcome = await this.brain.act(action);
                return { success: true, outcome };
                
            } catch (error) {
                console.error('❌ Brain action failed:', error);
                return { success: false, error: error.message };
            }
        });
        
        // Get brain context
        ipcMain.handle('brain-get-context', async () => {
            if (!this.brain) return null;
            return this.brain.getCurrentContext();
        });
        
        // Pause/resume brain
        ipcMain.handle('brain-set-active', async (event, active) => {
            if (!this.brain) return false;
            
            if (active && !this.brain.isActive) {
                this.brain.resumeConsciousness();
            } else if (!active && this.brain.isActive) {
                this.brain.pauseConsciousness();
            }
            
            return this.brain.isActive;
        });
        
        console.log('✅ Brain IPC handlers registered');
        
        } catch (error) {
            console.warn('⚠️ IPC setup skipped (not in Electron environment):', error.message);
        }
    }

    /**
     * Get brain instance (for direct access)
     */
    getBrain() {
        return this.brain;
    }

    /**
     * Check if brain is initialized and active
     */
    isReady() {
        return this.isInitialized && this.brain && this.brain.isActive;
    }

    /**
     * Shutdown brain system
     */
    async shutdown() {
        if (this.brain) {
            console.log('🧠 Shutting down unified brain...');
            await this.brain.shutdown();
            this.brain = null;
            this.isInitialized = false;
        }
    }
}

// Export singleton instance
const brainIntegration = new BrainMainIntegration();

module.exports = brainIntegration;