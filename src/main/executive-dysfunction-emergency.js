// Executive Dysfunction Emergency Mode - Phase 2 Viral Feature
// Crisis Pattern Detection and Gentle Micro-Interventions for Neurodivergent Support

/**
 * ExecutiveDysfunctionEmergencyMode
 * 
 * A comprehensive system designed to detect executive dysfunction crisis patterns
 * and provide gentle, shame-free micro-interventions to prevent complete shutdown.
 * 
 * KEY FEATURES:
 * - Real-time crisis pattern detection (document spirals, app switching storms, paralysis)
 * - Progressive intervention escalation with minimal executive function requirements
 * - Shame-free communication that normalizes dysfunction episodes
 * - Energy-aware task suggestions and overwhelm detection
 * - Integration with existing screen intelligence and nudge systems
 * 
 * VIRAL USER EXPERIENCE TARGETS:
 * - "It caught me before I spiraled" moments
 * - Prevention of 3-day procrastination episodes
 * - Executive function scaffolding during difficult brain days
 */

class ExecutiveDysfunctionEmergencyMode {
    constructor() {
        console.log('🚨 Initializing Executive Dysfunction Emergency Mode...');
        
        this.isActive = false;
        this.screenIntelligence = null;
        this.emergencyCallbacks = [];
        
        // Crisis detection state
        this.crisisState = {
            currentLevel: 'normal', // normal, early_warning, crisis, emergency
            activePatterns: [],
            interventionHistory: [],
            lastIntervention: null,
            crisisStartTime: null,
            patternCounts: new Map(),
            userInCrisis: false
        };
        
        // Pattern detection thresholds
        this.patterns = {
            documentSpiral: {
                threshold: 10, // opens/closes in 30 minutes
                timeWindow: 30 * 60 * 1000, // 30 minutes
                history: [],
                description: 'Document opened/closed repeatedly without progress'
            },
            appSwitchingStorm: {
                threshold: 20, // rapid switches in 5 minutes
                timeWindow: 5 * 60 * 1000, // 5 minutes
                history: [],
                description: 'Rapid app switching without meaningful engagement'
            },
            mouseHoverParalysis: {
                threshold: 2 * 60 * 1000, // 2 minutes hovering
                currentHoverStart: null,
                lastPosition: { x: 0, y: 0 },
                description: 'Mouse hovering without clicking - decision paralysis'
            },
            taskSwitchingSpiral: {
                threshold: 15, // switches between unrelated tasks
                timeWindow: 10 * 60 * 1000, // 10 minutes
                history: [],
                description: 'Switching between unrelated tasks without completion'
            },
            procrastinationPattern: {
                threshold: 5, // opening distracting apps during focus tasks
                timeWindow: 15 * 60 * 1000, // 15 minutes
                history: [],
                description: 'Opening distracting apps when focus task is open'
            }
        };
        
        // Micro-intervention templates
        this.interventions = {
            documentSpiral: [
                {
                    level: 'gentle',
                    message: "I see you're stuck on that document. Brain feeling foggy? Let's try the tiny version: just type 'Hi Sarah,' and stop. That's it.",
                    action: 'simple_task',
                    executiveLoad: 'minimal'
                },
                {
                    level: 'supportive',
                    message: "That document keeps calling to you, doesn't it? Sometimes our brain needs a different door in. Try opening a new blank doc and writing one sentence about what you want to say.",
                    action: 'alternative_approach',
                    executiveLoad: 'low'
                },
                {
                    level: 'crisis',
                    message: "Hey, I'm seeing a pattern here. Document stress is real. Let's pause. Take 3 breaths. The document will be there when you're ready. No shame in stepping away.",
                    action: 'break_cycle',
                    executiveLoad: 'none'
                }
            ],
            appSwitchingStorm: [
                {
                    level: 'gentle',
                    message: "Lots of mental tabs open! Pick ONE tiny thing: Reply to mom's text OR Save that document OR Get water. Everything else waits.",
                    action: 'choice_simplification',
                    executiveLoad: 'minimal'
                },
                {
                    level: 'supportive',
                    message: "Your brain is doing that thing where it can't pick a lane. That's okay! Let's brain dump: Write down everything you want to do, then circle ONE.",
                    action: 'brain_dump',
                    executiveLoad: 'low'
                },
                {
                    level: 'crisis',
                    message: "App switching spiral detected. This is your brain being overwhelmed, not broken. Close everything except ONE app. Just one. Breathe.",
                    action: 'emergency_simplification',
                    executiveLoad: 'none'
                }
            ],
            mouseHoverParalysis: [
                {
                    level: 'gentle',
                    message: "Brain feels stuck? Let's try: 3 deep breaths, stretch arms, then click anywhere. No pressure.",
                    action: 'physical_reset',
                    executiveLoad: 'minimal'
                },
                {
                    level: 'supportive',
                    message: "I see you hovering. Decision paralysis is so real. Try this: close your eyes, count to 3, then click. Whatever happens is okay.",
                    action: 'decision_support',
                    executiveLoad: 'low'
                },
                {
                    level: 'crisis',
                    message: "Stuck in hover mode? That's executive dysfunction, not laziness. Move your mouse to a safe spot. Take a breath. No decisions needed right now.",
                    action: 'safe_retreat',
                    executiveLoad: 'none'
                }
            ],
            taskSwitchingSpiral: [
                {
                    level: 'gentle',
                    message: "Lots of different tasks pulling at you! Let's pick the easiest one and do just the first step. Which feels most manageable right now?",
                    action: 'task_prioritization',
                    executiveLoad: 'minimal'
                },
                {
                    level: 'supportive',
                    message: "Task switching overload! Your brain is trying to do everything at once. Write each task on a sticky note, then hide all but one.",
                    action: 'visual_organization',
                    executiveLoad: 'low'
                },
                {
                    level: 'crisis',
                    message: "Task spiral in progress. This is overwhelm, not failure. Pick ONE task - doesn't matter which. Close tabs for everything else. Focus follows.",
                    action: 'forced_focus',
                    executiveLoad: 'none'
                }
            ],
            procrastinationPattern: [
                {
                    level: 'gentle',
                    message: "I see that focus task open, but you're browsing other things. That's your brain avoiding something hard. What's the smallest step you could take on the main thing?",
                    action: 'gentle_redirect',
                    executiveLoad: 'minimal'
                },
                {
                    level: 'supportive',
                    message: "Procrastination mode activated! Your brain is protecting you from something scary. Let's make it less scary: set a timer for 5 minutes and just look at the task.",
                    action: 'fear_reduction',
                    executiveLoad: 'low'
                },
                {
                    level: 'crisis',
                    message: "Avoidance pattern detected. The task feels too big or scary right now - that's completely valid. Can you close the distracting apps and just sit with the main task? No pressure to start.",
                    action: 'gentle_exposure',
                    executiveLoad: 'none'
                }
            ]
        };
        
        // Energy and overwhelm detection
        this.overwhelmDetection = {
            energyLevel: 'unknown', // low, medium, high
            stressSignals: [],
            overwhelmScore: 0,
            lastAssessment: null,
            consecutiveCrisisCount: 0
        };
        
        // Safe space creation features
        this.safeSpace = {
            isActive: false,
            features: {
                notificationsPaused: false,
                distractingAppsHidden: false,
                gentleModeEnabled: false,
                recoveryTimerActive: false
            },
            activationTime: null,
            duration: 30 * 60 * 1000 // 30 minutes default
        };
        
        // Performance tracking
        this.analytics = {
            totalCrisesDetected: 0,
            crisesAverted: 0,
            interventionsTriggered: 0,
            userResponseRate: 0,
            patternDetectionAccuracy: 0,
            averageRecoveryTime: 0
        };
        
        console.log('🚨 Executive Dysfunction Emergency Mode initialized');
    }
    
    /**
     * Initialize the emergency mode system
     */
    async initialize(screenIntelligence) {
        try {
            console.log('🚨 Starting Executive Dysfunction Emergency Mode...');
            
            this.screenIntelligence = screenIntelligence;
            
            // Set up event listeners for screen intelligence
            if (this.screenIntelligence) {
                this.screenIntelligence.on('windowChange', (windowData) => {
                    this.processWindowChange(windowData);
                });
                
                this.screenIntelligence.on('patternDetected', (pattern) => {
                    this.processExistingPattern(pattern);
                });
                
                console.log('✅ Connected to Screen Intelligence system');
            } else {
                console.warn('⚠️ Screen Intelligence not available - limited functionality');
            }
            
            // Start monitoring intervals
            this.startMonitoring();
            
            // Initialize UI components
            this.initializeEmergencyUI();
            
            this.isActive = true;
            console.log('✅ Executive Dysfunction Emergency Mode active');
            
            return true;
            
        } catch (error) {
            console.error('❌ Executive Dysfunction Emergency Mode initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Start monitoring for crisis patterns
     */
    startMonitoring() {
        // Main crisis detection interval - frequent for real-time detection
        this.crisisDetectionInterval = setInterval(() => {
            this.detectCrisisPatterns();
        }, 1000); // Every second for responsive detection
        
        // Mouse hover paralysis detection
        this.mouseMonitorInterval = setInterval(() => {
            this.detectMouseHoverParalysis();
        }, 500); // Every 500ms for hover detection
        
        // Overwhelm assessment
        this.overwhelmAssessmentInterval = setInterval(() => {
            this.assessOverwhelmLevel();
        }, 30000); // Every 30 seconds
        
        // Safe space maintenance
        this.safeSpaceMaintenanceInterval = setInterval(() => {
            this.maintainSafeSpace();
        }, 5000); // Every 5 seconds
        
        console.log('🔍 Crisis pattern monitoring started');
    }
    
    /**
     * Process window changes for pattern detection
     */
    processWindowChange(windowData) {
        if (!this.isActive) return;
        
        const now = Date.now();
        const appName = windowData.name;
        const windowTitle = windowData.title || '';
        
        // Track document spiral patterns
        this.trackDocumentSpiral(appName, windowTitle, now);
        
        // Track app switching storm
        this.trackAppSwitchingStorm(appName, now);
        
        // Track task switching spiral
        this.trackTaskSwitchingSpiral(appName, windowTitle, now);
        
        // Track procrastination patterns
        this.trackProcrastinationPattern(appName, now);
    }
    
    /**
     * Track document spiral patterns
     */
    trackDocumentSpiral(appName, windowTitle, timestamp) {
        // Check if this is a document app
        const documentApps = ['Microsoft Word', 'Pages', 'Google Docs', 'TextEdit', 'Notion', 'Obsidian', 'Draft Writing - Script & Blog'];
        const isDocumentApp = documentApps.some(app => appName.includes(app));
        
        if (!isDocumentApp) return;
        
        // Track document opens/closes
        const pattern = this.patterns.documentSpiral;
        const documentKey = `${appName}_${windowTitle}`;
        
        pattern.history.push({
            document: documentKey,
            timestamp: timestamp
        });
        
        // Clean old history
        pattern.history = pattern.history.filter(
            entry => timestamp - entry.timestamp <= pattern.timeWindow
        );
        
        // Count recent activity for same document
        const recentSameDoc = pattern.history.filter(
            entry => entry.document === documentKey
        ).length;
        
        if (recentSameDoc >= pattern.threshold) {
            this.triggerCrisisIntervention('documentSpiral', {
                document: documentKey,
                count: recentSameDoc,
                timeframe: pattern.timeWindow / 60000 // in minutes
            });
        }
    }
    
    /**
     * Track app switching storm patterns
     */
    trackAppSwitchingStorm(appName, timestamp) {
        const pattern = this.patterns.appSwitchingStorm;
        
        pattern.history.push({
            app: appName,
            timestamp: timestamp
        });
        
        // Clean old history
        pattern.history = pattern.history.filter(
            entry => timestamp - entry.timestamp <= pattern.timeWindow
        );
        
        // Check for rapid switching
        if (pattern.history.length >= pattern.threshold) {
            // Ensure switches are to different apps (not just multiple events from same app)
            const uniqueApps = new Set(pattern.history.map(entry => entry.app));
            
            if (uniqueApps.size >= Math.floor(pattern.threshold * 0.7)) {
                this.triggerCrisisIntervention('appSwitchingStorm', {
                    switchCount: pattern.history.length,
                    uniqueApps: uniqueApps.size,
                    timeframe: pattern.timeWindow / 60000
                });
            }
        }
    }
    
    /**
     * Track task switching spiral patterns
     */
    trackTaskSwitchingSpiral(appName, windowTitle, timestamp) {
        // Identify task categories
        const taskCategories = {
            communication: ['Mail', 'Messages', 'Slack', 'Discord', 'Zoom'],
            creative: ['Photoshop', 'Figma', 'Sketch', 'Final Cut', 'Logic Pro'],
            productivity: ['Word', 'Excel', 'Notion', 'Obsidian', 'Pages'],
            development: ['Xcode', 'Visual Studio', 'Terminal', 'GitHub'],
            browser: ['Safari', 'Chrome', 'Firefox', 'Arc'],
            entertainment: ['YouTube', 'Netflix', 'Spotify', 'Games']
        };
        
        let currentCategory = 'other';
        for (const [category, apps] of Object.entries(taskCategories)) {
            if (apps.some(app => appName.includes(app))) {
                currentCategory = category;
                break;
            }
        }
        
        const pattern = this.patterns.taskSwitchingSpiral;
        
        pattern.history.push({
            app: appName,
            category: currentCategory,
            timestamp: timestamp
        });
        
        // Clean old history
        pattern.history = pattern.history.filter(
            entry => timestamp - entry.timestamp <= pattern.timeWindow
        );
        
        // Check for switching between unrelated task categories
        if (pattern.history.length >= pattern.threshold) {
            const categories = pattern.history.map(entry => entry.category);
            const uniqueCategories = new Set(categories);
            
            if (uniqueCategories.size >= 4) { // Switching between 4+ different task types
                this.triggerCrisisIntervention('taskSwitchingSpiral', {
                    switchCount: pattern.history.length,
                    categories: Array.from(uniqueCategories),
                    timeframe: pattern.timeWindow / 60000
                });
            }
        }
    }
    
    /**
     * Track procrastination patterns
     */
    trackProcrastinationPattern(appName, timestamp) {
        // Identify focus vs distraction apps
        const focusApps = ['Word', 'Pages', 'Xcode', 'Terminal', 'Notion', 'Obsidian'];
        const distractingApps = ['YouTube', 'Reddit', 'Twitter', 'Instagram', 'TikTok', 'Facebook'];
        
        const isFocusApp = focusApps.some(app => appName.includes(app));
        const isDistractingApp = distractingApps.some(app => appName.includes(app));
        
        if (!isFocusApp && !isDistractingApp) return;
        
        const pattern = this.patterns.procrastinationPattern;
        
        pattern.history.push({
            app: appName,
            type: isFocusApp ? 'focus' : 'distraction',
            timestamp: timestamp
        });
        
        // Clean old history
        pattern.history = pattern.history.filter(
            entry => timestamp - entry.timestamp <= pattern.timeWindow
        );
        
        // Check for distraction while focus task is open
        const recentFocus = pattern.history.filter(entry => entry.type === 'focus');
        const recentDistractions = pattern.history.filter(entry => entry.type === 'distraction');
        
        if (recentFocus.length > 0 && recentDistractions.length >= pattern.threshold) {
            this.triggerCrisisIntervention('procrastinationPattern', {
                focusApp: recentFocus[recentFocus.length - 1].app,
                distractionCount: recentDistractions.length,
                timeframe: pattern.timeWindow / 60000
            });
        }
    }
    
    /**
     * Detect mouse hover paralysis
     */
    detectMouseHoverParalysis() {
        if (!this.screenIntelligence || !this.screenIntelligence.mousePosition) return;
        
        const currentPos = this.screenIntelligence.mousePosition;
        const pattern = this.patterns.mouseHoverParalysis;
        const now = Date.now();
        
        // Check if mouse has moved significantly
        const distance = Math.sqrt(
            Math.pow(currentPos.x - pattern.lastPosition.x, 2) + 
            Math.pow(currentPos.y - pattern.lastPosition.y, 2)
        );
        
        if (distance < 10) { // Less than 10 pixels movement
            if (!pattern.currentHoverStart) {
                pattern.currentHoverStart = now;
            } else {
                const hoverDuration = now - pattern.currentHoverStart;
                if (hoverDuration >= pattern.threshold) {
                    this.triggerCrisisIntervention('mouseHoverParalysis', {
                        duration: hoverDuration / 1000, // in seconds
                        position: currentPos
                    });
                    pattern.currentHoverStart = now; // Reset to avoid spam
                }
            }
        } else {
            pattern.currentHoverStart = null; // Reset hover detection
        }
        
        pattern.lastPosition = { ...currentPos };
    }
    
    /**
     * Process existing patterns from screen intelligence
     */
    processExistingPattern(pattern) {
        // Enhance existing patterns with crisis detection
        if (pattern.type === 'hyperfocus' && pattern.duration > 2 * 60 * 60 * 1000) {
            // Extended hyperfocus might lead to crash
            this.triggerEarlyWarning('hyperfocusBurnout', {
                app: pattern.app,
                duration: pattern.duration
            });
        }
        
        if (pattern.type === 'distractionSpiral' && pattern.count > 20) {
            // Severe distraction spiral
            this.escalateToCrisis('severeDistraction', {
                count: pattern.count,
                window: pattern.window
            });
        }
    }
    
    /**
     * Main crisis pattern detection logic
     */
    detectCrisisPatterns() {
        if (!this.isActive) return;
        
        // Check if multiple patterns are active simultaneously
        const activePatterns = this.getActivePatterns();
        
        if (activePatterns.length >= 2) {
            // Multiple crisis patterns = emergency
            this.escalateToEmergency('multiplePatterns', {
                patterns: activePatterns,
                count: activePatterns.length
            });
        } else if (activePatterns.length === 1) {
            // Single pattern = crisis level
            this.setCrisisLevel('crisis');
        } else {
            // No active patterns
            if (this.crisisState.currentLevel !== 'normal') {
                this.setCrisisLevel('normal');
            }
        }
        
        // Check for escalating patterns
        this.checkForEscalation();
    }
    
    /**
     * Get currently active crisis patterns
     */
    getActivePatterns() {
        const active = [];
        const now = Date.now();
        
        // Check each pattern for recent activity
        for (const [patternName, pattern] of Object.entries(this.patterns)) {
            if (patternName === 'mouseHoverParalysis') {
                if (pattern.currentHoverStart && (now - pattern.currentHoverStart) >= pattern.threshold) {
                    active.push(patternName);
                }
            } else if (pattern.history && pattern.history.length >= pattern.threshold) {
                // Check if recent activity meets threshold
                const recentHistory = pattern.history.filter(
                    entry => now - entry.timestamp <= pattern.timeWindow
                );
                if (recentHistory.length >= pattern.threshold) {
                    active.push(patternName);
                }
            }
        }
        
        return active;
    }
    
    /**
     * Assess current overwhelm level
     */
    assessOverwhelmLevel() {
        const detection = this.overwhelmDetection;
        const now = Date.now();
        
        // Count recent stress signals
        const recentInterventions = this.crisisState.interventionHistory.filter(
            intervention => now - intervention.timestamp <= 10 * 60 * 1000 // Last 10 minutes
        );
        
        const activePatterns = this.getActivePatterns();
        
        // Calculate overwhelm score
        let overwhelmScore = 0;
        overwhelmScore += recentInterventions.length * 10; // 10 points per recent intervention
        overwhelmScore += activePatterns.length * 20; // 20 points per active pattern
        
        // Add bonus for consecutive crises
        if (detection.consecutiveCrisisCount > 0) {
            overwhelmScore += detection.consecutiveCrisisCount * 15;
        }
        
        detection.overwhelmScore = overwhelmScore;
        detection.lastAssessment = now;
        
        // Determine energy level
        if (overwhelmScore >= 60) {
            detection.energyLevel = 'low';
            this.considerSafeSpaceActivation();
        } else if (overwhelmScore >= 30) {
            detection.energyLevel = 'medium';
        } else {
            detection.energyLevel = 'high';
        }
    }
    
    /**
     * Trigger crisis intervention based on pattern
     */
    triggerCrisisIntervention(patternType, data) {
        const now = Date.now();
        
        // Prevent intervention spam
        if (this.crisisState.lastIntervention && 
            now - this.crisisState.lastIntervention.timestamp < 60000) { // 1 minute cooldown
            return;
        }
        
        // Get appropriate intervention based on current crisis level
        const interventions = this.interventions[patternType];
        if (!interventions) return;
        
        let interventionLevel;
        switch (this.crisisState.currentLevel) {
            case 'early_warning':
                interventionLevel = 'gentle';
                break;
            case 'crisis':
                interventionLevel = 'supportive';
                break;
            case 'emergency':
                interventionLevel = 'crisis';
                break;
            default:
                interventionLevel = 'gentle';
        }
        
        const intervention = interventions.find(i => i.level === interventionLevel) || interventions[0];
        
        // Execute intervention
        this.executeIntervention(patternType, intervention, data);
        
        // Track intervention
        this.crisisState.lastIntervention = {
            timestamp: now,
            pattern: patternType,
            level: interventionLevel,
            data: data
        };
        
        this.crisisState.interventionHistory.push(this.crisisState.lastIntervention);
        this.analytics.interventionsTriggered++;
        
        console.log(`🚨 Crisis intervention triggered: ${patternType} (${interventionLevel})`, data);
    }
    
    /**
     * Execute the actual intervention
     */
    executeIntervention(patternType, intervention, data) {
        // Show emergency intervention UI
        this.showEmergencyUI(patternType, intervention, data);
        
        // Send to AI for contextual support
        this.sendInterventionToAI(patternType, intervention, data);
        
        // Trigger callbacks
        this.triggerEmergencyCallbacks({
            type: 'intervention',
            pattern: patternType,
            intervention: intervention,
            data: data
        });
        
        // Consider safe space activation for crisis/emergency levels
        if (intervention.level === 'crisis' || intervention.level === 'emergency') {
            this.considerSafeSpaceActivation();
        }
    }
    
    /**
     * Show emergency intervention UI
     */
    showEmergencyUI(patternType, intervention, data) {
        // Create or update emergency intervention overlay
        let emergencyOverlay = document.getElementById('emergency-overlay');
        
        if (!emergencyOverlay) {
            emergencyOverlay = this.createEmergencyOverlay();
        }
        
        // Update overlay content
        this.updateEmergencyOverlay(emergencyOverlay, patternType, intervention, data);
        
        // Show with gentle animation
        emergencyOverlay.style.display = 'flex';
        setTimeout(() => {
            emergencyOverlay.classList.add('visible');
        }, 10);
        
        // Auto-hide after 30 seconds unless user interacts
        setTimeout(() => {
            if (!emergencyOverlay.classList.contains('user-interacted')) {
                this.hideEmergencyUI();
            }
        }, 30000);
    }
    
    /**
     * Create emergency intervention overlay
     */
    createEmergencyOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'emergency-overlay';
        overlay.className = 'emergency-overlay';
        
        overlay.innerHTML = `
            <div class="emergency-content">
                <div class="emergency-icon">🚨</div>
                <div class="emergency-message"></div>
                <div class="emergency-actions">
                    <button class="emergency-action primary" data-action="primary">Got it</button>
                    <button class="emergency-action secondary" data-action="dismiss">Not now</button>
                    <button class="emergency-action tertiary" data-action="safe-space">Create safe space</button>
                </div>
                <div class="emergency-close" onclick="velvetEmergencyMode.hideEmergencyUI()">×</div>
            </div>
        `;
        
        // Add event listeners
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hideEmergencyUI();
            }
        });
        
        overlay.querySelectorAll('.emergency-action').forEach(button => {
            button.addEventListener('click', (e) => {
                overlay.classList.add('user-interacted');
                this.handleEmergencyAction(e.target.dataset.action);
            });
        });
        
        document.body.appendChild(overlay);
        return overlay;
    }
    
    /**
     * Update emergency overlay content
     */
    updateEmergencyOverlay(overlay, patternType, intervention, data) {
        const messageElement = overlay.querySelector('.emergency-message');
        messageElement.textContent = intervention.message;
        
        // Update icon based on pattern type
        const iconElement = overlay.querySelector('.emergency-icon');
        const patternIcons = {
            documentSpiral: '📄',
            appSwitchingStorm: '🌪️',
            mouseHoverParalysis: '🖱️',
            taskSwitchingSpiral: '🌀',
            procrastinationPattern: '⏰'
        };
        iconElement.textContent = patternIcons[patternType] || '🚨';
        
        // Update styling based on intervention level
        overlay.className = `emergency-overlay level-${intervention.level}`;
    }
    
    /**
     * Handle emergency action buttons
     */
    handleEmergencyAction(action) {
        switch (action) {
            case 'primary':
                this.analytics.userResponseRate++;
                this.hideEmergencyUI();
                break;
            case 'dismiss':
                this.hideEmergencyUI();
                break;
            case 'safe-space':
                this.activateSafeSpace();
                this.hideEmergencyUI();
                break;
        }
    }
    
    /**
     * Hide emergency UI
     */
    hideEmergencyUI() {
        const overlay = document.getElementById('emergency-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.style.display = 'none';
                overlay.classList.remove('user-interacted');
            }, 300);
        }
    }
    
    /**
     * Send intervention context to AI
     */
    sendInterventionToAI(patternType, intervention, data) {
        // Inject context into AI for personalized support
        if (window.velvetAI) {
            const context = {
                type: 'executive_dysfunction_intervention',
                pattern: patternType,
                message: intervention.message,
                data: data,
                timestamp: Date.now()
            };
            
            // This will be available in the AI's brain context
            window.velvetAI.emergencyContext = context;
        }
    }
    
    /**
     * Consider activating safe space mode
     */
    considerSafeSpaceActivation() {
        if (this.safeSpace.isActive) return;
        
        const detection = this.overwhelmDetection;
        
        // Activate safe space if overwhelm score is high or multiple consecutive crises
        if (detection.overwhelmScore >= 50 || detection.consecutiveCrisisCount >= 3) {
            this.activateSafeSpace();
        }
    }
    
    /**
     * Activate safe space mode
     */
    activateSafeSpace() {
        console.log('🏠 Activating Safe Space mode...');
        
        this.safeSpace.isActive = true;
        this.safeSpace.activationTime = Date.now();
        
        // Enable safe space features
        this.safeSpace.features.gentleModeEnabled = true;
        this.safeSpace.features.recoveryTimerActive = true;
        
        // Show safe space UI
        this.showSafeSpaceUI();
        
        // Trigger callbacks
        this.triggerEmergencyCallbacks({
            type: 'safe_space_activated',
            duration: this.safeSpace.duration
        });
        
        console.log('✅ Safe Space mode activated');
    }
    
    /**
     * Show safe space UI
     */
    showSafeSpaceUI() {
        // Create safe space indicator
        let safeSpaceIndicator = document.getElementById('safe-space-indicator');
        
        if (!safeSpaceIndicator) {
            safeSpaceIndicator = document.createElement('div');
            safeSpaceIndicator.id = 'safe-space-indicator';
            safeSpaceIndicator.className = 'safe-space-indicator';
            safeSpaceIndicator.innerHTML = `
                <div class="safe-space-content">
                    <div class="safe-space-icon">🏠</div>
                    <div class="safe-space-text">Safe Space Active</div>
                    <div class="safe-space-timer"></div>
                </div>
            `;
            
            document.body.appendChild(safeSpaceIndicator);
        }
        
        safeSpaceIndicator.style.display = 'block';
        
        // Update timer
        this.updateSafeSpaceTimer();
    }
    
    /**
     * Update safe space timer
     */
    updateSafeSpaceTimer() {
        const indicator = document.getElementById('safe-space-indicator');
        if (!indicator || !this.safeSpace.isActive) return;
        
        const elapsed = Date.now() - this.safeSpace.activationTime;
        const remaining = Math.max(0, this.safeSpace.duration - elapsed);
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        
        const timerElement = indicator.querySelector('.safe-space-timer');
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} remaining`;
        
        if (remaining > 0) {
            setTimeout(() => this.updateSafeSpaceTimer(), 1000);
        } else {
            this.deactivateSafeSpace();
        }
    }
    
    /**
     * Deactivate safe space mode
     */
    deactivateSafeSpace() {
        console.log('🏠 Deactivating Safe Space mode...');
        
        this.safeSpace.isActive = false;
        
        // Hide safe space UI
        const indicator = document.getElementById('safe-space-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
        
        // Reset features
        Object.keys(this.safeSpace.features).forEach(key => {
            this.safeSpace.features[key] = false;
        });
        
        // Trigger callbacks
        this.triggerEmergencyCallbacks({
            type: 'safe_space_deactivated'
        });
        
        console.log('✅ Safe Space mode deactivated');
    }
    
    /**
     * Initialize emergency UI components
     */
    initializeEmergencyUI() {
        // Add emergency mode styles to head
        const style = document.createElement('style');
        style.textContent = `
            .emergency-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: auto;
            }
            
            .emergency-overlay.visible {
                opacity: 1;
            }
            
            .emergency-content {
                background: linear-gradient(135deg, 
                    rgba(15, 23, 42, 0.95) 0%,
                    rgba(30, 41, 59, 0.95) 100%
                );
                backdrop-filter: blur(20px);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                text-align: center;
                color: white;
                position: relative;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            
            .emergency-icon {
                font-size: 48px;
                margin-bottom: 20px;
            }
            
            .emergency-message {
                font-size: 18px;
                line-height: 1.6;
                margin-bottom: 30px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .emergency-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .emergency-action {
                padding: 12px 24px;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: inherit;
            }
            
            .emergency-action.primary {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
                color: white;
            }
            
            .emergency-action.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .emergency-action.tertiary {
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
            }
            
            .emergency-action:hover {
                transform: translateY(-2px);
                filter: brightness(1.1);
            }
            
            .emergency-close {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.2s ease;
            }
            
            .emergency-close:hover {
                opacity: 1;
            }
            
            .safe-space-indicator {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 12px 20px;
                border-radius: 12px;
                font-size: 14px;
                z-index: 9999;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                display: none;
                pointer-events: auto;
            }
            
            .safe-space-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .safe-space-icon {
                font-size: 18px;
            }
            
            .emergency-overlay.level-gentle .emergency-content {
                border-color: rgba(59, 130, 246, 0.5);
            }
            
            .emergency-overlay.level-supportive .emergency-content {
                border-color: rgba(245, 158, 11, 0.5);
            }
            
            .emergency-overlay.level-crisis .emergency-content {
                border-color: rgba(239, 68, 68, 0.5);
            }
        `;
        
        document.head.appendChild(style);
    }
    
    /**
     * Set crisis level and update state
     */
    setCrisisLevel(level) {
        const previousLevel = this.crisisState.currentLevel;
        this.crisisState.currentLevel = level;
        
        if (level !== 'normal' && previousLevel === 'normal') {
            this.crisisState.crisisStartTime = Date.now();
            this.analytics.totalCrisesDetected++;
        }
        
        if (level === 'normal' && previousLevel !== 'normal') {
            // Crisis resolved
            const recoveryTime = Date.now() - this.crisisState.crisisStartTime;
            this.analytics.averageRecoveryTime = 
                ((this.analytics.averageRecoveryTime * this.analytics.crisesAverted) + recoveryTime) / 
                (this.analytics.crisesAverted + 1);
            this.analytics.crisesAverted++;
            
            // Reset consecutive crisis count
            this.overwhelmDetection.consecutiveCrisisCount = 0;
        }
        
        if (level !== 'normal') {
            this.overwhelmDetection.consecutiveCrisisCount++;
        }
        
        console.log(`🚨 Crisis level: ${previousLevel} → ${level}`);
    }
    
    /**
     * Trigger early warning
     */
    triggerEarlyWarning(type, data) {
        this.setCrisisLevel('early_warning');
        
        this.triggerEmergencyCallbacks({
            type: 'early_warning',
            warningType: type,
            data: data
        });
    }
    
    /**
     * Escalate to crisis level
     */
    escalateToCrisis(type, data) {
        this.setCrisisLevel('crisis');
        
        this.triggerEmergencyCallbacks({
            type: 'crisis_escalation',
            escalationType: type,
            data: data
        });
    }
    
    /**
     * Escalate to emergency level
     */
    escalateToEmergency(type, data) {
        this.setCrisisLevel('emergency');
        
        this.triggerEmergencyCallbacks({
            type: 'emergency_escalation',
            escalationType: type,
            data: data
        });
        
        // Auto-activate safe space in emergency
        this.activateSafeSpace();
    }
    
    /**
     * Check for pattern escalation
     */
    checkForEscalation() {
        const now = Date.now();
        const recentInterventions = this.crisisState.interventionHistory.filter(
            intervention => now - intervention.timestamp <= 15 * 60 * 1000 // Last 15 minutes
        );
        
        // If multiple interventions in short time, escalate
        if (recentInterventions.length >= 3) {
            this.escalateToEmergency('rapidFireInterventions', {
                count: recentInterventions.length,
                timeframe: 15
            });
        }
    }
    
    /**
     * Maintain safe space features
     */
    maintainSafeSpace() {
        if (!this.safeSpace.isActive) return;
        
        const elapsed = Date.now() - this.safeSpace.activationTime;
        
        // Auto-deactivate after duration
        if (elapsed >= this.safeSpace.duration) {
            this.deactivateSafeSpace();
        }
    }
    
    /**
     * Event system for emergency callbacks
     */
    onEmergency(callback) {
        this.emergencyCallbacks.push(callback);
    }
    
    triggerEmergencyCallbacks(data) {
        this.emergencyCallbacks.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('❌ Emergency callback error:', error);
            }
        });
    }
    
    /**
     * Get current emergency status
     */
    getEmergencyStatus() {
        return {
            isActive: this.isActive,
            crisisLevel: this.crisisState.currentLevel,
            activePatterns: this.getActivePatterns(),
            safeSpaceActive: this.safeSpace.isActive,
            overwhelmScore: this.overwhelmDetection.overwhelmScore,
            energyLevel: this.overwhelmDetection.energyLevel,
            lastIntervention: this.crisisState.lastIntervention,
            analytics: { ...this.analytics }
        };
    }
    
    /**
     * Get testing functions for development
     */
    getTestingFunctions() {
        return {
            testDocumentSpiral: () => {
                console.log('🧪 Testing document spiral...');
                for (let i = 0; i < 12; i++) {
                    this.trackDocumentSpiral('Microsoft Word', 'Test Document', Date.now() - (i * 60000));
                }
            },
            
            testAppSwitchingStorm: () => {
                console.log('🧪 Testing app switching storm...');
                const apps = ['Safari', 'Mail', 'Slack', 'Finder', 'Terminal', 'Xcode'];
                for (let i = 0; i < 25; i++) {
                    this.trackAppSwitchingStorm(apps[i % apps.length], Date.now() - (i * 10000));
                }
            },
            
            testMouseHoverParalysis: () => {
                console.log('🧪 Testing mouse hover paralysis...');
                const pattern = this.patterns.mouseHoverParalysis;
                pattern.currentHoverStart = Date.now() - (3 * 60 * 1000); // 3 minutes ago
                this.detectMouseHoverParalysis();
            },
            
            testTaskSwitchingSpiral: () => {
                console.log('🧪 Testing task switching spiral...');
                const taskSwitches = [
                    ['Mail', 'Email'],
                    ['Photoshop', 'Design'],
                    ['Word', 'Report'],
                    ['Safari', 'Research'],
                    ['Terminal', 'Code'],
                    ['Slack', 'Chat']
                ];
                for (let i = 0; i < 16; i++) {
                    const [app, title] = taskSwitches[i % taskSwitches.length];
                    this.trackTaskSwitchingSpiral(app, title, Date.now() - (i * 30000));
                }
            },
            
            testProcrastinationPattern: () => {
                console.log('🧪 Testing procrastination pattern...');
                // First, establish focus app
                this.trackProcrastinationPattern('Word', Date.now() - (10 * 60 * 1000));
                // Then multiple distractions
                for (let i = 0; i < 6; i++) {
                    this.trackProcrastinationPattern('YouTube', Date.now() - (i * 60000));
                }
            },
            
            testSafeSpaceActivation: () => {
                console.log('🧪 Testing safe space activation...');
                this.overwhelmDetection.overwhelmScore = 70;
                this.considerSafeSpaceActivation();
            },
            
            testEmergencyEscalation: () => {
                console.log('🧪 Testing emergency escalation...');
                this.escalateToEmergency('testing', { test: true });
            },
            
            showCurrentStatus: () => {
                console.log('📊 Current Emergency Mode Status:', this.getEmergencyStatus());
            }
        };
    }
    
    /**
     * Stop monitoring and cleanup
     */
    stop() {
        console.log('🛑 Stopping Executive Dysfunction Emergency Mode...');
        
        this.isActive = false;
        
        // Clear intervals
        if (this.crisisDetectionInterval) clearInterval(this.crisisDetectionInterval);
        if (this.mouseMonitorInterval) clearInterval(this.mouseMonitorInterval);
        if (this.overwhelmAssessmentInterval) clearInterval(this.overwhelmAssessmentInterval);
        if (this.safeSpaceMaintenanceInterval) clearInterval(this.safeSpaceMaintenanceInterval);
        
        // Deactivate safe space if active
        if (this.safeSpace.isActive) {
            this.deactivateSafeSpace();
        }
        
        // Hide any open UI
        this.hideEmergencyUI();
        
        console.log('✅ Executive Dysfunction Emergency Mode stopped');
    }
}

module.exports = ExecutiveDysfunctionEmergencyMode;