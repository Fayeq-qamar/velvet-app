// 🧠 Task Breakdown Bridge - Connecting AI Engine to Velvet Brain
// "Smart integration for sharp minds" - Bridge between task system and main app

console.log('📋 Loading Task Breakdown Bridge...');

/**
 * Task Breakdown Bridge: Integration layer for the task breakdown system
 * 
 * Responsibilities:
 * - Initialize task breakdown engine and store
 * - Expose global interfaces for VelvetBrain integration
 * - Handle UI mounting and unmounting
 * - Coordinate between task system and main app
 * - Provide fallback functionality when systems aren't available
 */

class TaskBreakdownBridge {
    constructor() {
        console.log('🌉 Initializing Task Breakdown Bridge...');
        
        this.engine = null;
        this.store = null;
        this.ui = null;
        this.isInitialized = false;
        this.isUIVisible = false;
        
        // Bridge status
        this.status = {
            engineReady: false,
            storeReady: false,
            uiReady: false,
            brainConnected: false
        };
        
        this.init();
    }

    async init() {
        try {
            console.log('🚀 Starting Task Breakdown Bridge initialization...');
            
            // Initialize in stages to handle dependencies
            await this.initializeEngine();
            await this.initializeStore(); 
            await this.setupUIIntegration();
            await this.connectToVelvetBrain();
            
            this.isInitialized = true;
            console.log('✅ Task Breakdown Bridge fully operational');
            
            // Expose global interfaces
            this.exposeGlobalInterfaces();
            
        } catch (error) {
            console.error('❌ Task Breakdown Bridge initialization failed:', error);
            this.setupFallbacks();
        }
    }

    async initializeEngine() {
        try {
            // Import the engine dynamically
            if (typeof window.taskBreakdownEngine !== 'undefined') {
                this.engine = window.taskBreakdownEngine;
                const initialized = await this.engine.initialize();
                
                if (initialized) {
                    this.status.engineReady = true;
                    console.log('🧠 Task Breakdown Engine connected to bridge');
                } else {
                    throw new Error('Engine initialization failed');
                }
            } else {
                throw new Error('Task Breakdown Engine not available');
            }
        } catch (error) {
            console.error('❌ Engine initialization failed:', error);
            this.setupEngineFailback();
        }
    }

    async initializeStore() {
        try {
            // Import the store dynamically 
            if (typeof window.useTaskBreakdownStore !== 'undefined') {
                this.store = window.useTaskBreakdownStore;
                
                // Initialize the store
                const state = this.store.getState();
                await state.initializeEngine();
                
                this.status.storeReady = true;
                console.log('📊 Task Breakdown Store connected to bridge');
            } else {
                throw new Error('Task Breakdown Store not available');
            }
        } catch (error) {
            console.error('❌ Store initialization failed:', error);
            this.setupStoreFailback();
        }
    }

    async setupUIIntegration() {
        try {
            // Set up UI mounting point
            this.createUIContainer();
            
            // Connect to existing UI systems
            this.connectToExistingUI();
            
            this.status.uiReady = true;
            console.log('🎨 Task Breakdown UI integration ready');
        } catch (error) {
            console.error('❌ UI integration failed:', error);
        }
    }

    async connectToVelvetBrain() {
        try {
            // Connect to VelvetBrain if available
            if (typeof window.VelvetBrain !== 'undefined') {
                console.log('🧠 Connecting to Velvet Brain...');
                this.status.brainConnected = true;
                
                // Set up brain integration callbacks
                this.setupBrainCallbacks();
                
                console.log('🔗 Task Breakdown Bridge connected to Velvet Brain');
            } else {
                console.warn('⚠️ Velvet Brain not available - operating independently');
            }
        } catch (error) {
            console.error('❌ Brain connection failed:', error);
        }
    }

    // Global interface methods
    exposeGlobalInterfaces() {
        console.log('🌐 Exposing global task breakdown interfaces...');
        
        // Main task breakdown interface
        window.taskBreakdownBridge = {
            // Core methods
            analyzeTask: this.analyzeTask.bind(this),
            showTaskUI: this.showTaskUI.bind(this),
            hideTaskUI: this.hideTaskUI.bind(this),
            getActiveTask: this.getActiveTask.bind(this),
            
            // Status methods
            getStatus: () => this.status,
            isReady: () => this.isInitialized,
            
            // Integration methods
            onTaskCreated: this.onTaskCreated.bind(this),
            onTaskCompleted: this.onTaskCompleted.bind(this),
            onStepCompleted: this.onStepCompleted.bind(this)
        };
        
        // Backward compatibility interfaces
        window.showTaskBreakdownUI = this.showTaskUI.bind(this);
        window.hideTaskBreakdownUI = this.hideTaskUI.bind(this);
        window.getActiveTaskBreakdown = this.getActiveTask.bind(this);
        
        console.log('✅ Global task breakdown interfaces ready');
    }

    // Core task breakdown methods
    async analyzeTask(userInput) {
        try {
            if (!this.engine || !this.status.engineReady) {
                return await this.fallbackTaskAnalysis(userInput);
            }
            
            console.log('🧠 Analyzing task via bridge:', userInput.substring(0, 50) + '...');
            
            const task = await this.engine.analyzeAndBreakdownTask(userInput);
            
            if (task && this.store) {
                // Set as active task in store
                const state = this.store.getState();
                state.setActiveTask(task);
                
                // Show UI if available
                this.showTaskUI();
                
                // Trigger callbacks
                this.onTaskCreated(task);
                
                return task;
            }
            
            return null;
            
        } catch (error) {
            console.error('❌ Task analysis failed:', error);
            return await this.fallbackTaskAnalysis(userInput);
        }
    }

    showTaskUI() {
        try {
            if (this.store && this.status.storeReady) {
                const state = this.store.getState();
                state.showTaskUI();
                this.isUIVisible = true;
                console.log('👁️ Task UI shown via bridge');
            } else {
                this.showFallbackUI();
            }
        } catch (error) {
            console.error('❌ Failed to show task UI:', error);
        }
    }

    hideTaskUI() {
        try {
            if (this.store && this.status.storeReady) {
                const state = this.store.getState();
                state.hideTaskUI();
                this.isUIVisible = false;
                console.log('🫥 Task UI hidden via bridge');
            }
        } catch (error) {
            console.error('❌ Failed to hide task UI:', error);
        }
    }

    getActiveTask() {
        try {
            if (this.store && this.status.storeReady) {
                const state = this.store.getState();
                return state.activeTask;
            }
            return null;
        } catch (error) {
            console.error('❌ Failed to get active task:', error);
            return null;
        }
    }

    // Callback methods
    onTaskCreated(task) {
        console.log('🎯 Task created:', task.title);
        
        // Notify other systems
        this.triggerEvent('taskCreated', { task });
        
        // Provide user feedback
        if (typeof window.addMessage === 'function') {
            window.addMessage(`🎯 Perfect! I've created "${task.title}" with ${task.steps.length} manageable steps. Let's get started!`, 'velvet');
        }
    }

    onTaskCompleted(task) {
        console.log('🎉 Task completed:', task.title);
        
        // Trigger celebration
        this.triggerEvent('taskCompleted', { task });
        
        // Provide celebration feedback
        if (typeof window.addMessage === 'function') {
            const celebrations = [
                `🎉 AMAZING! You completed "${task.title}"! That's real progress! ✨`,
                `🌟 Look at you crushing it! "${task.title}" is DONE! So proud! 🚀`,
                `🎯 YES! Another task conquered! "${task.title}" - you're unstoppable! 💪`
            ];
            const message = celebrations[Math.floor(Math.random() * celebrations.length)];
            window.addMessage(message, 'velvet');
        }
    }

    onStepCompleted(step) {
        console.log('✅ Step completed:', step.title);
        
        // Trigger step completion event
        this.triggerEvent('stepCompleted', { step });
    }

    // Fallback methods
    async fallbackTaskAnalysis(userInput) {
        console.log('🔄 Using fallback task analysis');
        
        // Simple task creation without AI
        const task = {
            id: `task_${Date.now()}`,
            originalInput: userInput,
            title: 'Task to Complete',
            description: 'Let\\'s break this down together',
            complexity: 'medium',
            urgency: 'medium', 
            type: 'other',
            estimatedDuration: 15,
            steps: [
                {
                    id: `step_${Date.now()}_1`,
                    title: 'Start with the first small step',
                    description: 'Focus on just getting started - that\\'s often the hardest part!',
                    expectedDuration: 5,
                    expectedApps: [],
                    isCompleted: false,
                    autoCompleted: false,
                    confidence: 0.9
                },
                {
                    id: `step_${Date.now()}_2`,
                    title: 'Make steady progress',
                    description: 'Keep going with small, manageable actions',
                    expectedDuration: 8,
                    expectedApps: [],
                    isCompleted: false,
                    autoCompleted: false,
                    confidence: 0.8
                },
                {
                    id: `step_${Date.now()}_3`,
                    title: 'Finish and celebrate',
                    description: 'Complete the task and celebrate your progress!',
                    expectedDuration: 2,
                    expectedApps: [],
                    isCompleted: false,
                    autoCompleted: false,
                    confidence: 0.9
                }
            ],
            createdAt: Date.now(),
            isActive: true,
            progress: 0
        };
        
        return task;
    }

    setupEngineFailback() {
        console.log('🔄 Setting up engine fallback');
        
        // Create minimal engine interface
        window.taskBreakdownEngine = {
            analyzeAndBreakdownTask: this.fallbackTaskAnalysis.bind(this),
            getMetrics: () => ({ isActive: false, totalTasks: 0 })
        };
    }

    setupStoreFailback() {
        console.log('🔄 Setting up store fallback');
        
        // Create minimal store interface
        let fallbackState = {
            activeTask: null,
            isTaskUIVisible: false
        };
        
        window.useTaskBreakdownStore = {
            getState: () => ({
                activeTask: fallbackState.activeTask,
                isTaskUIVisible: fallbackState.isTaskUIVisible,
                setActiveTask: (task) => {
                    fallbackState.activeTask = task;
                    console.log('📋 Fallback: Active task set to:', task?.title);
                },
                showTaskUI: () => {
                    fallbackState.isTaskUIVisible = true;
                    this.showFallbackUI();
                },
                hideTaskUI: () => {
                    fallbackState.isTaskUIVisible = false;
                    this.hideFallbackUI();
                }
            })
        };
    }

    setupFallbacks() {
        console.log('🔄 Setting up comprehensive fallbacks');
        this.setupEngineFailback();
        this.setupStoreFailback();
    }

    // UI Management
    createUIContainer() {
        if (!document.getElementById('taskBreakdownContainer')) {
            const container = document.createElement('div');
            container.id = 'taskBreakdownContainer';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 9998;
            `;
            document.body.appendChild(container);
        }
    }

    connectToExistingUI() {
        // Hook into existing message system
        if (typeof window.addMessage === 'function') {
            console.log('🔗 Connected to existing message system');
        }
        
        // Hook into existing orb state system
        if (typeof window.updateVelvetOrbState === 'function') {
            console.log('🔗 Connected to existing orb state system');
        }
    }

    showFallbackUI() {
        console.log('🎨 Showing fallback task UI');
        
        const activeTask = this.getActiveTask();
        if (!activeTask) return;
        
        // Show simple task info in chat
        if (typeof window.addMessage === 'function') {
            window.addMessage(`📋 Active Task: "${activeTask.title}" (${activeTask.steps.length} steps)`, 'velvet');
            activeTask.steps.forEach((step, index) => {
                const status = step.isCompleted ? '✅' : '⏳';
                setTimeout(() => {
                    window.addMessage(`${status} ${index + 1}. ${step.title}`, 'velvet');
                }, (index + 1) * 300);
            });
        }
    }

    hideFallbackUI() {
        console.log('🫥 Hiding fallback task UI');
        // Fallback UI is just messages, so nothing to hide
    }

    setupBrainCallbacks() {
        // Set up callbacks for VelvetBrain integration
        if (typeof window.velvetBrainInstance !== 'undefined') {
            const brain = window.velvetBrainInstance;
            
            // Register consciousness callback
            brain.onConsciousnessUpdate?.((data) => {
                if (data.action?.type === 'task_intervention') {
                    this.handleBrainTaskIntervention(data);
                }
            });
            
            console.log('🧠 Brain callbacks configured');
        }
    }

    handleBrainTaskIntervention(data) {
        console.log('🧠 Handling brain task intervention:', data);
        
        // Brain is requesting task breakdown - analyze the context
        if (data.context?.recentUserInput) {
            this.analyzeTask(data.context.recentUserInput);
        }
    }

    // Event system
    triggerEvent(eventName, data) {
        try {
            // Trigger custom event
            const event = new CustomEvent(`taskBreakdown${eventName}`, {
                detail: data
            });
            document.dispatchEvent(event);
            
            // Also trigger via window for compatibility
            if (typeof window[`on${eventName}`] === 'function') {
                window[`on${eventName}`](data);
            }
            
        } catch (error) {
            console.error(`❌ Failed to trigger event ${eventName}:`, error);
        }
    }

    // Status and diagnostics
    getStatus() {
        return {
            ...this.status,
            isInitialized: this.isInitialized,
            isUIVisible: this.isUIVisible,
            hasActiveTask: !!this.getActiveTask()
        };
    }

    async diagnostics() {
        console.log('🔍 Task Breakdown Bridge Diagnostics:');
        console.log('Status:', this.getStatus());
        
        if (this.engine) {
            console.log('Engine Metrics:', this.engine.getMetrics?.() || 'No metrics available');
        }
        
        if (this.store) {
            console.log('Store State:', this.store.getState?.() || 'No state available');
        }
    }
}

// Initialize the bridge
console.log('🌉 Creating Task Breakdown Bridge instance...');
const taskBreakdownBridge = new TaskBreakdownBridge();

// Make available globally
window.taskBreakdownBridge = taskBreakdownBridge;

// Diagnostic shortcut
window.taskDiagnostics = () => taskBreakdownBridge.diagnostics();

console.log('✅ Task Breakdown Bridge loaded and ready');