// Executive Dysfunction Emergency Mode - Renderer UI Integration
// Shame-free micro-interventions and crisis prevention interface

/**
 * ExecutiveDysfunctionUI
 * 
 * Renderer-side UI integration for the Executive Dysfunction Emergency Mode.
 * Provides gentle, non-judgmental interface for crisis interventions and
 * connects with the AI system for personalized support.
 */

class ExecutiveDysfunctionUI {
    constructor() {
        console.log('🎨 Initializing Executive Dysfunction UI...');
        
        this.isInitialized = false;
        this.currentIntervention = null;
        this.uiElements = {};
        this.emergencyState = {
            interventionActive: false,
            safeSpaceActive: false,
            lastInteraction: null
        };
        
        // UI animation settings
        this.animations = {
            interventionFadeIn: 300,
            interventionFadeOut: 200,
            gentlePulse: 2000,
            breathingGuide: 4000
        };
        
        // Energy-aware design settings
        this.energySettings = {
            low: {
                animationDuration: 800,
                colorIntensity: 0.6,
                textSize: 'large',
                contrast: 'high'
            },
            medium: {
                animationDuration: 400,
                colorIntensity: 0.8,
                textSize: 'medium',
                contrast: 'medium'
            },
            high: {
                animationDuration: 200,
                colorIntensity: 1.0,
                textSize: 'medium',
                contrast: 'normal'
            }
        };
        
        console.log('🎨 Executive Dysfunction UI initialized');
    }
    
    /**
     * Initialize the UI system
     */
    async initialize() {
        try {
            console.log('🎨 Starting Executive Dysfunction UI system...');
            
            // Create UI styles
            this.createUIStyles();
            
            // Initialize UI components
            this.initializeComponents();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Connect to main process emergency mode
            this.connectToEmergencyMode();
            
            // Initialize breathing guide
            this.initializeBreathingGuide();
            
            this.isInitialized = true;
            console.log('✅ Executive Dysfunction UI active');
            
            return true;
            
        } catch (error) {
            console.error('❌ Executive Dysfunction UI initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Create UI styles for executive dysfunction support
     */
    createUIStyles() {
        const style = document.createElement('style');
        style.id = 'executive-dysfunction-styles';
        style.textContent = `
            /* Executive Dysfunction Emergency Mode Styles */
            
            .executive-dysfunction-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(12px);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 15000;
                opacity: 0;
                transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: auto;
            }
            
            .executive-dysfunction-overlay.visible {
                opacity: 1;
            }
            
            .intervention-container {
                background: linear-gradient(135deg, 
                    rgba(15, 23, 42, 0.98) 0%,
                    rgba(30, 41, 59, 0.96) 50%,
                    rgba(15, 23, 42, 0.98) 100%
                );
                backdrop-filter: blur(24px);
                border: 1px solid rgba(59, 130, 246, 0.4);
                border-radius: 24px;
                padding: 40px;
                max-width: 600px;
                width: 90%;
                text-align: center;
                color: white;
                position: relative;
                box-shadow: 
                    0 25px 50px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
                animation: gentle-appear 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            @keyframes gentle-appear {
                from {
                    opacity: 0;
                    transform: scale(0.95) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            .intervention-icon {
                font-size: 64px;
                margin-bottom: 24px;
                animation: gentle-pulse 3s ease-in-out infinite;
            }
            
            @keyframes gentle-pulse {
                0%, 100% { transform: scale(1); opacity: 0.9; }
                50% { transform: scale(1.05); opacity: 1; }
            }
            
            .intervention-title {
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 16px;
                color: rgba(255, 255, 255, 0.95);
                font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
            }
            
            .intervention-message {
                font-size: 18px;
                line-height: 1.7;
                margin-bottom: 32px;
                color: rgba(255, 255, 255, 0.85);
                font-weight: 400;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .intervention-actions {
                display: flex;
                gap: 16px;
                justify-content: center;
                flex-wrap: wrap;
                margin-bottom: 20px;
            }
            
            .intervention-button {
                padding: 14px 28px;
                border: none;
                border-radius: 16px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
                min-width: 120px;
            }
            
            .intervention-button.primary {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                color: white;
                box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
            }
            
            .intervention-button.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .intervention-button.safe-space {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
            }
            
            .intervention-button:hover {
                transform: translateY(-2px);
                filter: brightness(1.1);
            }
            
            .intervention-button:active {
                transform: translateY(0);
            }
            
            .intervention-close {
                position: absolute;
                top: 20px;
                right: 24px;
                font-size: 28px;
                cursor: pointer;
                opacity: 0.6;
                transition: opacity 0.2s ease;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .intervention-close:hover {
                opacity: 1;
            }
            
            .intervention-progress {
                margin-top: 20px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.6);
            }
            
            /* Safe Space Indicator */
            .safe-space-indicator {
                position: fixed;
                top: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 16px 24px;
                border-radius: 16px;
                font-size: 15px;
                font-weight: 500;
                z-index: 12000;
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                display: none;
                pointer-events: auto;
                box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
                animation: safe-space-appear 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            @keyframes safe-space-appear {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            .safe-space-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .safe-space-icon {
                font-size: 20px;
            }
            
            .safe-space-timer {
                font-size: 13px;
                opacity: 0.9;
                margin-left: 8px;
            }
            
            /* Breathing Guide */
            .breathing-guide {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 200px;
                height: 200px;
                border: 3px solid rgba(59, 130, 246, 0.6);
                border-radius: 50%;
                display: none;
                z-index: 11000;
                pointer-events: none;
            }
            
            .breathing-guide.active {
                display: block;
                animation: breathing-cycle 8s ease-in-out infinite;
            }
            
            @keyframes breathing-cycle {
                0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
                25% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                75% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
            }
            
            .breathing-guide-text {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                font-weight: 500;
                text-align: center;
                pointer-events: none;
            }
            
            /* Energy-aware adjustments */
            .intervention-container.energy-low {
                animation-duration: 0.8s;
                border-color: rgba(59, 130, 246, 0.6);
            }
            
            .intervention-container.energy-low .intervention-message {
                font-size: 20px;
                line-height: 1.8;
            }
            
            .intervention-container.energy-medium {
                animation-duration: 0.5s;
            }
            
            .intervention-container.energy-high {
                animation-duration: 0.3s;
            }
            
            /* Crisis level styling */
            .intervention-container.level-gentle {
                border-color: rgba(59, 130, 246, 0.5);
            }
            
            .intervention-container.level-supportive {
                border-color: rgba(245, 158, 11, 0.6);
            }
            
            .intervention-container.level-crisis {
                border-color: rgba(239, 68, 68, 0.6);
                box-shadow: 
                    0 25px 50px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(239, 68, 68, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            
            /* Micro-task suggestions */
            .micro-task-list {
                text-align: left;
                margin: 20px 0;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .micro-task-item {
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                margin-bottom: 8px;
                font-size: 16px;
                color: rgba(255, 255, 255, 0.9);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .micro-task-item:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: rgba(59, 130, 246, 0.4);
            }
            
            .micro-task-item.completed {
                opacity: 0.6;
                text-decoration: line-through;
            }
            
            /* Choice architecture */
            .choice-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 12px;
                margin: 20px 0;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .choice-option {
                padding: 16px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                font-size: 15px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .choice-option:hover {
                background: rgba(59, 130, 246, 0.2);
                border-color: rgba(59, 130, 246, 0.4);
                transform: translateY(-2px);
            }
            
            .choice-option.selected {
                background: rgba(59, 130, 246, 0.3);
                border-color: rgba(59, 130, 246, 0.6);
            }
            
            /* Progress celebration */
            .progress-celebration {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 24px 32px;
                border-radius: 20px;
                font-size: 18px;
                font-weight: 600;
                z-index: 13000;
                display: none;
                text-align: center;
                box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
                animation: celebration-appear 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            @keyframes celebration-appear {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            .celebration-icon {
                font-size: 32px;
                margin-bottom: 8px;
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Executive Dysfunction UI styles created');
    }
    
    /**
     * Initialize UI components
     */
    initializeComponents() {
        // Create main intervention overlay
        this.createInterventionOverlay();
        
        // Create safe space indicator
        this.createSafeSpaceIndicator();
        
        // Create breathing guide
        this.createBreathingGuide();
        
        // Create progress celebration
        this.createProgressCelebration();
        
        console.log('✅ Executive Dysfunction UI components initialized');
    }
    
    /**
     * Create intervention overlay
     */
    createInterventionOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'ed-intervention-overlay';
        overlay.className = 'executive-dysfunction-overlay';
        
        overlay.innerHTML = `
            <div class="intervention-container" id="ed-intervention-container">
                <div class="intervention-close" onclick="executiveDysfunctionUI.hideIntervention()">×</div>
                <div class="intervention-icon" id="ed-intervention-icon">🚨</div>
                <div class="intervention-title" id="ed-intervention-title">Executive Function Support</div>
                <div class="intervention-message" id="ed-intervention-message"></div>
                <div class="intervention-actions" id="ed-intervention-actions">
                    <button class="intervention-button primary" data-action="acknowledge">I understand</button>
                    <button class="intervention-button secondary" data-action="dismiss">Not now</button>
                    <button class="intervention-button safe-space" data-action="safe-space">Create safe space</button>
                </div>
                <div class="intervention-progress" id="ed-intervention-progress"></div>
            </div>
        `;
        
        // Event listeners
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hideIntervention();
            }
        });
        
        overlay.querySelectorAll('.intervention-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleInterventionAction(e.target.dataset.action);
            });
        });
        
        document.body.appendChild(overlay);
        this.uiElements.interventionOverlay = overlay;
    }
    
    /**
     * Create safe space indicator
     */
    createSafeSpaceIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'ed-safe-space-indicator';
        indicator.className = 'safe-space-indicator';
        
        indicator.innerHTML = `
            <div class="safe-space-content">
                <div class="safe-space-icon">🏠</div>
                <div class="safe-space-text">Safe Space Active</div>
                <div class="safe-space-timer" id="ed-safe-space-timer"></div>
            </div>
        `;
        
        document.body.appendChild(indicator);
        this.uiElements.safeSpaceIndicator = indicator;
    }
    
    /**
     * Create breathing guide
     */
    createBreathingGuide() {
        const guide = document.createElement('div');
        guide.id = 'ed-breathing-guide';
        guide.className = 'breathing-guide';
        
        guide.innerHTML = `
            <div class="breathing-guide-text" id="ed-breathing-text">Breathe</div>
        `;
        
        document.body.appendChild(guide);
        this.uiElements.breathingGuide = guide;
    }
    
    /**
     * Create progress celebration
     */
    createProgressCelebration() {
        const celebration = document.createElement('div');
        celebration.id = 'ed-progress-celebration';
        celebration.className = 'progress-celebration';
        
        celebration.innerHTML = `
            <div class="celebration-icon">🎉</div>
            <div class="celebration-message" id="ed-celebration-message">Great job!</div>
        `;
        
        document.body.appendChild(celebration);
        this.uiElements.progressCelebration = celebration;
    }
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Listen for window focus/blur to adjust intervention intensity
        window.addEventListener('focus', () => {
            this.adjustForWindowFocus(true);
        });
        
        window.addEventListener('blur', () => {
            this.adjustForWindowFocus(false);
        });
        
        // Listen for keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        console.log('✅ Executive Dysfunction UI event listeners set up');
    }
    
    /**
     * Connect to main process emergency mode
     */
    connectToEmergencyMode() {
        // Set up IPC listeners for emergency events
        if (window.electronAPI) {
            // Listen for crisis interventions from main process
            window.electronAPI.onCrisisIntervention?.((data) => {
                this.handleCrisisIntervention(data);
            });
            
            // Listen for safe space activation
            window.electronAPI.onSafeSpaceActivation?.((data) => {
                this.handleSafeSpaceActivation(data);
            });
        }
        
        // Set up periodic status updates
        this.statusUpdateInterval = setInterval(() => {
            this.updateStatus();
        }, 5000);
        
        console.log('✅ Connected to Emergency Mode main process');
    }
    
    /**
     * Handle crisis intervention from main process
     */
    handleCrisisIntervention(data) {
        console.log('🚨 Crisis intervention received:', data);
        
        this.showIntervention(data.pattern, data.intervention, data.data);
        
        // Notify AI system
        this.notifyAIOfCrisis(data);
    }
    
    /**
     * Show intervention UI
     */
    showIntervention(patternType, intervention, data) {
        const overlay = this.uiElements.interventionOverlay;
        const container = document.getElementById('ed-intervention-container');
        const icon = document.getElementById('ed-intervention-icon');
        const title = document.getElementById('ed-intervention-title');
        const message = document.getElementById('ed-intervention-message');
        const progress = document.getElementById('ed-intervention-progress');
        
        // Set pattern-specific content
        const patternConfig = this.getPatternConfig(patternType);
        
        icon.textContent = patternConfig.icon;
        title.textContent = patternConfig.title;
        message.textContent = intervention.message;
        
        // Set crisis level styling
        container.className = `intervention-container level-${intervention.level}`;
        
        // Add energy-aware styling
        const energyLevel = this.detectEnergyLevel();
        container.classList.add(`energy-${energyLevel}`);
        
        // Show pattern-specific UI elements
        this.addPatternSpecificUI(patternType, intervention, data);
        
        // Update progress text
        progress.textContent = `Pattern detected: ${patternConfig.description}`;
        
        // Show overlay
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.classList.add('visible');
        }, 10);
        
        // Mark as active
        this.emergencyState.interventionActive = true;
        this.currentIntervention = { patternType, intervention, data };
        
        // Auto-hide after 45 seconds unless user interacts
        this.autoHideTimer = setTimeout(() => {
            if (!this.emergencyState.lastInteraction || 
                Date.now() - this.emergencyState.lastInteraction > 30000) {
                this.hideIntervention();
            }
        }, 45000);
    }
    
    /**
     * Get pattern configuration
     */
    getPatternConfig(patternType) {
        const configs = {
            documentSpiral: {
                icon: '📄',
                title: 'Document Task Support',
                description: 'Multiple document opens detected'
            },
            appSwitchingStorm: {
                icon: '🌪️',
                title: 'Focus Support',
                description: 'Rapid app switching detected'
            },
            mouseHoverParalysis: {
                icon: '🖱️',
                title: 'Decision Support',
                description: 'Decision paralysis detected'
            },
            taskSwitchingSpiral: {
                icon: '🌀',
                title: 'Task Organization',
                description: 'Task switching spiral detected'
            },
            procrastinationPattern: {
                icon: '⏰',
                title: 'Gentle Redirect',
                description: 'Avoidance pattern detected'
            }
        };
        
        return configs[patternType] || {
            icon: '🚨',
            title: 'Executive Function Support',
            description: 'Pattern detected'
        };
    }
    
    /**
     * Add pattern-specific UI elements
     */
    addPatternSpecificUI(patternType, intervention, data) {
        const actionsContainer = document.getElementById('ed-intervention-actions');
        
        // Clear existing actions
        actionsContainer.innerHTML = '';
        
        // Add pattern-specific actions
        switch (patternType) {
            case 'documentSpiral':
                this.addDocumentSpiralUI(actionsContainer, data);
                break;
            case 'appSwitchingStorm':
                this.addAppSwitchingUI(actionsContainer, data);
                break;
            case 'mouseHoverParalysis':
                this.addMouseParalysisUI(actionsContainer, data);
                break;
            case 'taskSwitchingSpiral':
                this.addTaskSwitchingUI(actionsContainer, data);
                break;
            case 'procrastinationPattern':
                this.addProcrastinationUI(actionsContainer, data);
                break;
            default:
                this.addDefaultActions(actionsContainer);
        }
    }
    
    /**
     * Add document spiral specific UI
     */
    addDocumentSpiralUI(container, data) {
        container.innerHTML = `
            <div class="micro-task-list">
                <div class="micro-task-item" onclick="executiveDysfunctionUI.handleMicroTask('type-greeting')">
                    Just type "Hi [Name]," and stop
                </div>
                <div class="micro-task-item" onclick="executiveDysfunctionUI.handleMicroTask('write-subject')">
                    Write just the subject line
                </div>
                <div class="micro-task-item" onclick="executiveDysfunctionUI.handleMicroTask('one-sentence')">
                    Write one sentence about the main point
                </div>
            </div>
            <div class="intervention-actions">
                <button class="intervention-button primary" data-action="start-micro-task">Pick one tiny step</button>
                <button class="intervention-button secondary" data-action="take-break">Take a break</button>
                <button class="intervention-button safe-space" data-action="safe-space">Safe space</button>
            </div>
        `;
        
        this.attachMicroTaskEvents(container);
    }
    
    /**
     * Add app switching storm UI
     */
    addAppSwitchingUI(container, data) {
        container.innerHTML = `
            <div class="choice-options">
                <div class="choice-option" data-choice="reply-text">Reply to one text</div>
                <div class="choice-option" data-choice="save-document">Save open document</div>
                <div class="choice-option" data-choice="get-water">Get water</div>
                <div class="choice-option" data-choice="close-tabs">Close extra tabs</div>
            </div>
            <div class="intervention-actions">
                <button class="intervention-button primary" data-action="choose-one">I picked one</button>
                <button class="intervention-button secondary" data-action="brain-dump">Brain dump first</button>
                <button class="intervention-button safe-space" data-action="safe-space">Safe space</button>
            </div>
        `;
        
        this.attachChoiceEvents(container);
    }
    
    /**
     * Add mouse paralysis UI
     */
    addMouseParalysisUI(container, data) {
        container.innerHTML = `
            <div class="intervention-actions">
                <button class="intervention-button primary" data-action="breathing-guide">Breathing guide</button>
                <button class="intervention-button secondary" data-action="physical-reset">Stretch & reset</button>
                <button class="intervention-button secondary" data-action="click-anywhere">Click anywhere</button>
                <button class="intervention-button safe-space" data-action="safe-space">Safe space</button>
            </div>
        `;
    }
    
    /**
     * Add task switching spiral UI
     */
    addTaskSwitchingUI(container, data) {
        container.innerHTML = `
            <div class="intervention-actions">
                <button class="intervention-button primary" data-action="pick-easiest">Pick easiest task</button>
                <button class="intervention-button secondary" data-action="sticky-notes">Sticky note method</button>
                <button class="intervention-button secondary" data-action="timer-method">5-minute timer</button>
                <button class="intervention-button safe-space" data-action="safe-space">Safe space</button>
            </div>
        `;
    }
    
    /**
     * Add procrastination pattern UI
     */
    addProcrastinationUI(container, data) {
        container.innerHTML = `
            <div class="intervention-actions">
                <button class="intervention-button primary" data-action="smallest-step">Tiniest step</button>
                <button class="intervention-button secondary" data-action="timer-exposure">5-min exposure</button>
                <button class="intervention-button secondary" data-action="close-distractions">Close distractions</button>
                <button class="intervention-button safe-space" data-action="safe-space">Safe space</button>
            </div>
        `;
    }
    
    /**
     * Add default actions
     */
    addDefaultActions(container) {
        container.innerHTML = `
            <div class="intervention-actions">
                <button class="intervention-button primary" data-action="acknowledge">I understand</button>
                <button class="intervention-button secondary" data-action="dismiss">Not now</button>
                <button class="intervention-button safe-space" data-action="safe-space">Safe space</button>
            </div>
        `;
    }
    
    /**
     * Attach micro-task event listeners
     */
    attachMicroTaskEvents(container) {
        container.querySelectorAll('.intervention-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleInterventionAction(e.target.dataset.action);
            });
        });
    }
    
    /**
     * Attach choice event listeners
     */
    attachChoiceEvents(container) {
        container.querySelectorAll('.choice-option').forEach(option => {
            option.addEventListener('click', (e) => {
                // Clear other selections
                container.querySelectorAll('.choice-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                // Select this option
                e.target.classList.add('selected');
                this.emergencyState.lastInteraction = Date.now();
            });
        });
        
        container.querySelectorAll('.intervention-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleInterventionAction(e.target.dataset.action);
            });
        });
    }
    
    /**
     * Handle micro-task selection
     */
    handleMicroTask(taskType) {
        console.log('✅ Micro-task selected:', taskType);
        
        // Mark task as completed
        const taskElement = document.querySelector(`[onclick*="${taskType}"]`);
        if (taskElement) {
            taskElement.classList.add('completed');
        }
        
        // Show celebration
        this.showProgressCelebration('Great choice! One tiny step at a time.');
        
        // Update interaction timestamp
        this.emergencyState.lastInteraction = Date.now();
        
        // Hide intervention after short delay
        setTimeout(() => {
            this.hideIntervention();
        }, 2000);
    }
    
    /**
     * Handle intervention actions
     */
    handleInterventionAction(action) {
        console.log('🎯 Intervention action:', action);
        
        this.emergencyState.lastInteraction = Date.now();
        
        switch (action) {
            case 'acknowledge':
                this.showProgressCelebration('You\'ve got this! 💙');
                this.hideIntervention();
                break;
                
            case 'dismiss':
                this.hideIntervention();
                break;
                
            case 'safe-space':
                this.activateSafeSpace();
                this.hideIntervention();
                break;
                
            case 'breathing-guide':
                this.showBreathingGuide();
                break;
                
            case 'brain-dump':
                this.suggestBrainDump();
                break;
                
            case 'timer-method':
                this.suggest5MinuteTimer();
                break;
                
            default:
                this.showProgressCelebration('Every step counts! 🌟');
                this.hideIntervention();
        }
    }
    
    /**
     * Show breathing guide
     */
    showBreathingGuide() {
        const guide = this.uiElements.breathingGuide;
        const text = document.getElementById('ed-breathing-text');
        
        guide.classList.add('active');
        
        // Breathing cycle text
        const breathingCycle = [
            'Breathe in...',
            'Hold...',
            'Breathe out...',
            'Rest...'
        ];
        
        let cycleIndex = 0;
        const updateText = () => {
            text.textContent = breathingCycle[cycleIndex];
            cycleIndex = (cycleIndex + 1) % breathingCycle.length;
        };
        
        const breathingInterval = setInterval(updateText, 2000);
        updateText();
        
        // Hide after 30 seconds
        setTimeout(() => {
            guide.classList.remove('active');
            clearInterval(breathingInterval);
            this.hideIntervention();
        }, 30000);
    }
    
    /**
     * Show progress celebration
     */
    showProgressCelebration(message) {
        const celebration = this.uiElements.progressCelebration;
        const messageElement = document.getElementById('ed-celebration-message');
        
        messageElement.textContent = message;
        celebration.style.display = 'block';
        
        setTimeout(() => {
            celebration.style.display = 'none';
        }, 3000);
    }
    
    /**
     * Hide intervention
     */
    hideIntervention() {
        const overlay = this.uiElements.interventionOverlay;
        
        overlay.classList.remove('visible');
        setTimeout(() => {
            overlay.style.display = 'none';
            this.emergencyState.interventionActive = false;
            this.currentIntervention = null;
        }, 300);
        
        // Clear auto-hide timer
        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
        }
    }
    
    /**
     * Handle safe space activation
     */
    handleSafeSpaceActivation(data) {
        this.showSafeSpaceIndicator(data.duration);
        this.emergencyState.safeSpaceActive = true;
    }
    
    /**
     * Activate safe space from UI
     */
    activateSafeSpace() {
        // Send request to main process
        if (window.electronAPI && window.electronAPI.activateSafeSpace) {
            window.electronAPI.activateSafeSpace();
        }
        
        this.showProgressCelebration('Safe space activated 🏠');
    }
    
    /**
     * Show safe space indicator
     */
    showSafeSpaceIndicator(duration) {
        const indicator = this.uiElements.safeSpaceIndicator;
        const timer = document.getElementById('ed-safe-space-timer');
        
        indicator.style.display = 'block';
        
        // Update timer
        const startTime = Date.now();
        const updateTimer = () => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            
            timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} remaining`;
            
            if (remaining > 0) {
                setTimeout(updateTimer, 1000);
            } else {
                indicator.style.display = 'none';
                this.emergencyState.safeSpaceActive = false;
            }
        };
        
        updateTimer();
    }
    
    /**
     * Detect energy level for UI adaptation
     */
    detectEnergyLevel() {
        // Simple heuristics - could be enhanced with more data
        const timeOfDay = new Date().getHours();
        
        // Morning energy
        if (timeOfDay >= 6 && timeOfDay < 10) return 'high';
        
        // Afternoon slump
        if (timeOfDay >= 13 && timeOfDay < 16) return 'low';
        
        // Evening
        if (timeOfDay >= 20) return 'low';
        
        return 'medium';
    }
    
    /**
     * Adjust UI based on window focus
     */
    adjustForWindowFocus(focused) {
        if (!focused && this.emergencyState.interventionActive) {
            // If user switches away, make intervention less intrusive
            const overlay = this.uiElements.interventionOverlay;
            overlay.style.opacity = '0.8';
        }
    }
    
    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Escape to close intervention
        if (e.key === 'Escape' && this.emergencyState.interventionActive) {
            this.hideIntervention();
        }
        
        // Ctrl+Shift+S for safe space
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            this.activateSafeSpace();
        }
    }
    
    /**
     * Notify AI system of crisis
     */
    notifyAIOfCrisis(data) {
        if (window.velvetAI) {
            window.velvetAI.emergencyContext = {
                type: 'executive_dysfunction_crisis',
                pattern: data.pattern,
                level: data.intervention.level,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Update status periodically
     */
    updateStatus() {
        // Could ping main process for status updates
        // For now, just maintain UI state
    }
    
    /**
     * Initialize breathing guide
     */
    initializeBreathingGuide() {
        // Breathing guide is already created in initializeComponents
        console.log('✅ Breathing guide initialized');
    }
    
    /**
     * Suggest brain dump
     */
    suggestBrainDump() {
        this.showProgressCelebration('Open a notes app and write everything down. No organizing - just dump! 📝');
        setTimeout(() => {
            this.hideIntervention();
        }, 4000);
    }
    
    /**
     * Suggest 5-minute timer
     */
    suggest5MinuteTimer() {
        this.showProgressCelebration('Set a 5-minute timer and just look at the task. No pressure to start! ⏱️');
        setTimeout(() => {
            this.hideIntervention();
        }, 4000);
    }
    
    /**
     * Get current UI state
     */
    getUIState() {
        return {
            isInitialized: this.isInitialized,
            interventionActive: this.emergencyState.interventionActive,
            safeSpaceActive: this.emergencyState.safeSpaceActive,
            currentIntervention: this.currentIntervention
        };
    }
    
    /**
     * Cleanup resources
     */
    cleanup() {
        console.log('🧹 Cleaning up Executive Dysfunction UI...');
        
        // Clear intervals
        if (this.statusUpdateInterval) {
            clearInterval(this.statusUpdateInterval);
        }
        
        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
        }
        
        // Hide all UI
        this.hideIntervention();
        
        if (this.uiElements.safeSpaceIndicator) {
            this.uiElements.safeSpaceIndicator.style.display = 'none';
        }
        
        if (this.uiElements.breathingGuide) {
            this.uiElements.breathingGuide.classList.remove('active');
        }
        
        console.log('✅ Executive Dysfunction UI cleaned up');
    }
}

// Create global instance
const executiveDysfunctionUI = new ExecutiveDysfunctionUI();

// Make available globally
window.executiveDysfunctionUI = executiveDysfunctionUI;

console.log('🎨 Executive Dysfunction UI loaded');