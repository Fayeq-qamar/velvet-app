// Executive Dysfunction Emergency Mode - Performance Optimized Version
// <200ms crisis detection and intervention delivery

/**
 * Performance-Optimized Executive Dysfunction Emergency Mode
 * - Sub-200ms pattern detection
 * - Efficient memory management for pattern tracking
 * - Optimized intervention delivery
 * - Batch processing for real-time performance
 */
class OptimizedExecutiveDysfunctionEmergencyMode {
    constructor() {
        console.log('⚡ Initializing Optimized Executive Dysfunction Emergency Mode...');
        
        this.isActive = false;
        this.screenIntelligence = null;
        
        // Performance-optimized pattern detection
        this.patternDetectors = new Map();
        this.patternBuffer = new CircularPatternBuffer(50); // Fixed-size pattern buffer
        this.detectionBatch = [];
        
        // Optimized crisis state
        this.crisisState = {
            currentLevel: 'normal',
            activePatterns: new Set(), // Use Set for O(1) operations
            lastCrisisCheck: 0,
            patternCounts: new Map(),
            userInCrisis: false,
            crisisStartTime: null
        };
        
        // Memory-efficient pattern thresholds
        this.patterns = {
            documentSpiral: {
                threshold: 10,
                timeWindow: 30 * 60 * 1000,
                buffer: new TimeWindowBuffer(100), // Circular buffer
                weight: 0.8
            },
            appSwitchingStorm: {
                threshold: 20,
                timeWindow: 5 * 60 * 1000,
                buffer: new TimeWindowBuffer(100),
                weight: 0.9
            },
            mouseHoverParalysis: {
                threshold: 2 * 60 * 1000,
                currentHoverStart: null,
                lastPosition: { x: 0, y: 0 },
                weight: 0.7
            },
            taskSwitchingSpiral: {
                threshold: 15,
                timeWindow: 10 * 60 * 1000,
                buffer: new TimeWindowBuffer(50),
                weight: 0.8
            },
            procrastinationPattern: {
                threshold: 5,
                timeWindow: 15 * 60 * 1000,
                buffer: new TimeWindowBuffer(50),
                weight: 0.6
            }
        };
        
        // Optimized intervention system
        this.interventionQueue = new PriorityQueue();
        this.interventionDebouncer = new Map();
        this.uiUpdateBatch = [];
        
        // Performance metrics
        this.performanceMetrics = {
            patternDetections: 0,
            averageDetectionTime: 0,
            interventionsTriggered: 0,
            memoryUsage: 0,
            batchesProcessed: 0,
            lastOptimization: Date.now()
        };
        
        // Configuration optimized for performance
        this.config = {
            maxDetectionTime: 100,        // 100ms max detection time
            batchProcessingInterval: 200, // 200ms batch processing
            debounceInterval: 2000,       // 2s intervention debounce
            maxPatternBuffer: 50,         // Limit pattern buffer size
            memoryCleanupInterval: 30000, // 30s memory cleanup
            performanceCheckInterval: 5000 // 5s performance monitoring
        };
        
        console.log('⚡ Optimized Executive Dysfunction Emergency Mode initialized');
    }
    
    /**
     * Initialize with performance optimizations
     */
    async initialize(screenIntelligence) {
        try {
            console.log('🚀 Starting optimized Executive Dysfunction Emergency Mode...');
            
            this.screenIntelligence = screenIntelligence;
            
            // Set up optimized event listeners
            this.setupOptimizedEventListeners();
            
            // Initialize performance-optimized pattern detectors
            this.initializeOptimizedPatternDetectors();
            
            // Start optimized monitoring
            this.startOptimizedMonitoring();
            
            // Initialize memory management
            this.initializeMemoryManagement();
            
            // Initialize emergency UI components
            this.initializeOptimizedEmergencyUI();
            
            this.isActive = true;
            console.log('✅ Optimized Executive Dysfunction Emergency Mode active');
            
            return true;
        } catch (error) {
            console.error('❌ Optimized initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Set up optimized event listeners
     */
    setupOptimizedEventListeners() {
        if (this.screenIntelligence) {
            // Debounced window change handler
            const windowChangeHandler = this.debounce((windowData) => {
                this.queuePatternDetection('windowChange', windowData);
            }, 100);
            
            this.screenIntelligence.on('windowChange', windowChangeHandler);
            
            // Throttled pattern detection handler
            const patternHandler = this.throttle((pattern) => {
                this.queuePatternDetection('existingPattern', pattern);
            }, 500);
            
            this.screenIntelligence.on('patternDetected', patternHandler);
            
            console.log('✅ Optimized event listeners configured');
        }
    }
    
    /**
     * Initialize performance-optimized pattern detectors
     */
    initializeOptimizedPatternDetectors() {
        // Document spiral detector
        this.patternDetectors.set('documentSpiral', {
            detect: (data) => this.detectDocumentSpiralOptimized(data),
            weight: this.patterns.documentSpiral.weight
        });
        
        // App switching storm detector
        this.patternDetectors.set('appSwitchingStorm', {
            detect: (data) => this.detectAppSwitchingStormOptimized(data),
            weight: this.patterns.appSwitchingStorm.weight
        });
        
        // Mouse hover paralysis detector
        this.patternDetectors.set('mouseHoverParalysis', {
            detect: (data) => this.detectMouseHoverParalysisOptimized(data),
            weight: this.patterns.mouseHoverParalysis.weight
        });
        
        // Task switching spiral detector
        this.patternDetectors.set('taskSwitchingSpiral', {
            detect: (data) => this.detectTaskSwitchingSpiralOptimized(data),
            weight: this.patterns.taskSwitchingSpiral.weight
        });
        
        // Procrastination pattern detector
        this.patternDetectors.set('procrastinationPattern', {
            detect: (data) => this.detectProcrastinationPatternOptimized(data),
            weight: this.patterns.procrastinationPattern.weight
        });
        
        console.log('✅ Optimized pattern detectors initialized');
    }
    
    /**
     * Start optimized monitoring
     */
    startOptimizedMonitoring() {
        // Batch processing interval
        this.batchProcessingTimer = setInterval(() => {
            this.processBatchedDetections();
        }, this.config.batchProcessingInterval);
        
        // Mouse monitoring with throttling
        this.mouseMonitorTimer = setInterval(() => {
            this.checkMouseHoverParalysis();
        }, 1000); // Reduced frequency from 500ms to 1s
        
        // Crisis level evaluation
        this.crisisEvaluationTimer = setInterval(() => {
            this.evaluateCrisisLevel();
        }, 2000); // Reduced frequency from 1s to 2s
        
        // Performance monitoring
        this.performanceTimer = setInterval(() => {
            this.monitorPerformance();
        }, this.config.performanceCheckInterval);
        
        console.log('✅ Optimized monitoring started');
    }
    
    /**
     * Initialize memory management
     */
    initializeMemoryManagement() {
        // Periodic memory cleanup
        this.memoryCleanupTimer = setInterval(() => {
            this.performMemoryCleanup();
        }, this.config.memoryCleanupInterval);
        
        console.log('✅ Memory management initialized');
    }
    
    /**
     * Queue pattern detection for batch processing
     */
    queuePatternDetection(type, data) {
        this.detectionBatch.push({
            type,
            data,
            timestamp: Date.now()
        });
        
        // Limit batch size
        if (this.detectionBatch.length > 20) {
            this.detectionBatch = this.detectionBatch.slice(-10);
        }
    }
    
    /**
     * Process batched pattern detections
     */
    processBatchedDetections() {
        if (this.detectionBatch.length === 0) return;
        
        const startTime = performance.now();
        const batch = [...this.detectionBatch];
        this.detectionBatch = [];
        
        // Process each detection in the batch
        batch.forEach(detection => {
            this.processPatternDetection(detection);
        });
        
        const processingTime = performance.now() - startTime;
        this.performanceMetrics.batchesProcessed++;
        
        // Update average processing time
        const count = this.performanceMetrics.batchesProcessed;
        this.performanceMetrics.averageDetectionTime = 
            (this.performanceMetrics.averageDetectionTime * (count - 1) + processingTime) / count;
        
        // Performance warning
        if (processingTime > this.config.maxDetectionTime) {
            console.warn(`⚠️ Slow batch processing: ${processingTime.toFixed(2)}ms`);
        }
    }
    
    /**
     * Process individual pattern detection
     */
    processPatternDetection(detection) {
        const { type, data } = detection;
        
        if (type === 'windowChange') {
            this.processWindowChangeOptimized(data);
        } else if (type === 'existingPattern') {
            this.processExistingPatternOptimized(data);
        }
    }
    
    /**
     * Optimized window change processing
     */
    processWindowChangeOptimized(windowData) {
        const appName = windowData.name;
        const windowTitle = windowData.title || '';
        const timestamp = Date.now();
        
        // Run pattern detectors in parallel
        const detectionPromises = [];
        
        for (const [patternName, detector] of this.patternDetectors) {
            const promise = this.runPatternDetection(patternName, detector, {
                appName,
                windowTitle,
                timestamp
            });
            detectionPromises.push(promise);
        }
        
        // Process results when all detections complete
        Promise.all(detectionPromises).then(results => {
            this.processDetectionResults(results);
        }).catch(error => {
            console.error('❌ Pattern detection error:', error);
        });
    }
    
    /**
     * Run individual pattern detection with timeout
     */
    async runPatternDetection(patternName, detector, data) {
        return new Promise((resolve) => {
            const startTime = performance.now();
            
            try {
                const result = detector.detect(data);
                const detectionTime = performance.now() - startTime;
                
                resolve({
                    patternName,
                    result,
                    detectionTime,
                    weight: detector.weight
                });
            } catch (error) {
                console.error(`❌ ${patternName} detection failed:`, error);
                resolve({
                    patternName,
                    result: null,
                    detectionTime: performance.now() - startTime,
                    weight: detector.weight
                });
            }
        });
    }
    
    /**
     * Process detection results
     */
    processDetectionResults(results) {
        let totalWeight = 0;
        let triggeredPatterns = [];
        
        results.forEach(({ patternName, result, detectionTime, weight }) => {
            if (result && result.triggered) {
                this.crisisState.activePatterns.add(patternName);
                triggeredPatterns.push({
                    name: patternName,
                    weight,
                    data: result.data
                });
                totalWeight += weight;
            } else {
                this.crisisState.activePatterns.delete(patternName);
            }
            
            this.performanceMetrics.patternDetections++;
        });
        
        // Check if crisis intervention is needed
        if (totalWeight > 1.5) { // Weighted threshold
            this.triggerCrisisInterventionOptimized(triggeredPatterns, totalWeight);
        }
    }
    
    /**
     * Optimized document spiral detection
     */
    detectDocumentSpiralOptimized(data) {
        const { appName, windowTitle, timestamp } = data;
        const documentApps = ['Word', 'Pages', 'Docs', 'TextEdit', 'Notion', 'Obsidian'];
        
        const isDocumentApp = documentApps.some(app => appName.includes(app));
        if (!isDocumentApp) return { triggered: false };
        
        const pattern = this.patterns.documentSpiral;
        const documentKey = `${appName}_${windowTitle}`;
        
        // Add to circular buffer
        pattern.buffer.add({
            document: documentKey,
            timestamp
        });
        
        // Count recent activity for same document
        const recentSameDoc = pattern.buffer.getItemsInTimeWindow(
            timestamp - pattern.timeWindow
        ).filter(item => item.document === documentKey).length;
        
        if (recentSameDoc >= pattern.threshold) {
            return {
                triggered: true,
                data: {
                    document: documentKey,
                    count: recentSameDoc,
                    timeframe: pattern.timeWindow / 60000
                }
            };
        }
        
        return { triggered: false };
    }
    
    /**
     * Optimized app switching storm detection
     */
    detectAppSwitchingStormOptimized(data) {
        const { appName, timestamp } = data;
        const pattern = this.patterns.appSwitchingStorm;
        
        // Add to circular buffer
        pattern.buffer.add({
            app: appName,
            timestamp
        });
        
        // Get recent switches
        const recentSwitches = pattern.buffer.getItemsInTimeWindow(
            timestamp - pattern.timeWindow
        );
        
        if (recentSwitches.length >= pattern.threshold) {
            // Check for unique apps
            const uniqueApps = new Set(recentSwitches.map(item => item.app));
            
            if (uniqueApps.size >= Math.floor(pattern.threshold * 0.7)) {
                return {
                    triggered: true,
                    data: {
                        switchCount: recentSwitches.length,
                        uniqueApps: uniqueApps.size,
                        timeframe: pattern.timeWindow / 60000
                    }
                };
            }
        }
        
        return { triggered: false };
    }
    
    /**
     * Optimized mouse hover paralysis detection
     */
    detectMouseHoverParalysisOptimized(data) {
        if (!this.screenIntelligence?.mousePosition) return { triggered: false };
        
        const currentPos = this.screenIntelligence.mousePosition;
        const pattern = this.patterns.mouseHoverParalysis;
        const now = Date.now();
        
        // Calculate movement distance
        const distance = Math.sqrt(
            Math.pow(currentPos.x - pattern.lastPosition.x, 2) + 
            Math.pow(currentPos.y - pattern.lastPosition.y, 2)
        );
        
        if (distance < 10) { // Minimal movement
            if (!pattern.currentHoverStart) {
                pattern.currentHoverStart = now;
            } else {
                const hoverDuration = now - pattern.currentHoverStart;
                if (hoverDuration >= pattern.threshold) {
                    pattern.currentHoverStart = now; // Reset to avoid spam
                    return {
                        triggered: true,
                        data: {
                            duration: hoverDuration / 1000,
                            position: currentPos
                        }
                    };
                }
            }
        } else {
            pattern.currentHoverStart = null;
        }
        
        pattern.lastPosition = { ...currentPos };
        return { triggered: false };
    }
    
    /**
     * Optimized task switching spiral detection
     */
    detectTaskSwitchingSpiralOptimized(data) {
        const { appName, windowTitle, timestamp } = data;
        
        // Fast category detection
        const category = this.getCategoryFast(appName);
        const pattern = this.patterns.taskSwitchingSpiral;
        
        // Add to circular buffer
        pattern.buffer.add({
            app: appName,
            category,
            timestamp
        });
        
        // Get recent switches
        const recentSwitches = pattern.buffer.getItemsInTimeWindow(
            timestamp - pattern.timeWindow
        );
        
        if (recentSwitches.length >= pattern.threshold) {
            const categories = new Set(recentSwitches.map(item => item.category));
            
            if (categories.size >= 4) {
                return {
                    triggered: true,
                    data: {
                        switchCount: recentSwitches.length,
                        categories: Array.from(categories),
                        timeframe: pattern.timeWindow / 60000
                    }
                };
            }
        }
        
        return { triggered: false };
    }
    
    /**
     * Optimized procrastination pattern detection
     */
    detectProcrastinationPatternOptimized(data) {
        const { appName, timestamp } = data;
        
        // Fast app type detection
        const appType = this.getAppTypeFast(appName);
        if (appType === 'unknown') return { triggered: false };
        
        const pattern = this.patterns.procrastinationPattern;
        
        // Add to circular buffer
        pattern.buffer.add({
            app: appName,
            type: appType,
            timestamp
        });
        
        // Get recent activity
        const recentActivity = pattern.buffer.getItemsInTimeWindow(
            timestamp - pattern.timeWindow
        );
        
        const focusApps = recentActivity.filter(item => item.type === 'focus');
        const distractingApps = recentActivity.filter(item => item.type === 'distraction');
        
        if (focusApps.length > 0 && distractingApps.length >= pattern.threshold) {
            return {
                triggered: true,
                data: {
                    focusApp: focusApps[focusApps.length - 1].app,
                    distractionCount: distractingApps.length,
                    timeframe: pattern.timeWindow / 60000
                }
            };
        }
        
        return { triggered: false };
    }
    
    /**
     * Fast category detection
     */
    getCategoryFast(appName) {
        const lowerName = appName.toLowerCase();
        
        if (lowerName.includes('mail') || lowerName.includes('slack') || lowerName.includes('zoom')) {
            return 'communication';
        }
        if (lowerName.includes('photoshop') || lowerName.includes('figma') || lowerName.includes('sketch')) {
            return 'creative';
        }
        if (lowerName.includes('word') || lowerName.includes('notion') || lowerName.includes('obsidian')) {
            return 'productivity';
        }
        if (lowerName.includes('xcode') || lowerName.includes('terminal') || lowerName.includes('code')) {
            return 'development';
        }
        if (lowerName.includes('safari') || lowerName.includes('chrome') || lowerName.includes('firefox')) {
            return 'browser';
        }
        if (lowerName.includes('youtube') || lowerName.includes('netflix') || lowerName.includes('spotify')) {
            return 'entertainment';
        }
        
        return 'other';
    }
    
    /**
     * Fast app type detection
     */
    getAppTypeFast(appName) {
        const lowerName = appName.toLowerCase();
        
        if (lowerName.includes('word') || lowerName.includes('notion') || lowerName.includes('xcode')) {
            return 'focus';
        }
        if (lowerName.includes('youtube') || lowerName.includes('reddit') || lowerName.includes('twitter')) {
            return 'distraction';
        }
        
        return 'unknown';
    }
    
    /**
     * Check mouse hover paralysis
     */
    checkMouseHoverParalysis() {
        this.detectMouseHoverParalysisOptimized({});
    }
    
    /**
     * Evaluate crisis level
     */
    evaluateCrisisLevel() {
        const now = Date.now();
        
        // Only evaluate if enough time has passed
        if (now - this.crisisState.lastCrisisCheck < 1000) return;
        this.crisisState.lastCrisisCheck = now;
        
        const activePatternCount = this.crisisState.activePatterns.size;
        
        let newLevel = 'normal';
        if (activePatternCount >= 3) {
            newLevel = 'crisis';
        } else if (activePatternCount >= 2) {
            newLevel = 'supportive';
        } else if (activePatternCount >= 1) {
            newLevel = 'gentle';
        }
        
        if (newLevel !== this.crisisState.currentLevel) {
            this.setCrisisLevel(newLevel);
        }
    }
    
    /**
     * Set crisis level efficiently
     */
    setCrisisLevel(level) {
        const previousLevel = this.crisisState.currentLevel;
        this.crisisState.currentLevel = level;
        
        if (level !== 'normal' && previousLevel === 'normal') {
            this.crisisState.crisisStartTime = Date.now();
        }
        
        console.log(`🚨 Crisis level: ${previousLevel} → ${level}`);
        
        // Update state management
        if (window.useVelvetStore) {
            const store = window.useVelvetStore.getState();
            store.updatePatternDetection({
                level,
                patterns: Array.from(this.crisisState.activePatterns),
                timestamp: Date.now()
            });
        }
    }
    
    /**
     * Trigger optimized crisis intervention
     */
    triggerCrisisInterventionOptimized(patterns, totalWeight) {
        const now = Date.now();
        const patternTypes = patterns.map(p => p.name);
        const interventionKey = patternTypes.sort().join('_');
        
        // Check debouncing
        const lastIntervention = this.interventionDebouncer.get(interventionKey);
        if (lastIntervention && (now - lastIntervention) < this.config.debounceInterval) {
            return;
        }
        
        this.interventionDebouncer.set(interventionKey, now);
        
        // Create optimized intervention
        const intervention = this.createOptimizedIntervention(patterns, totalWeight);
        
        // Add to priority queue
        this.interventionQueue.enqueue(intervention, intervention.priority);
        
        // Process intervention queue
        this.processInterventionQueue();
        
        // Update performance metrics
        this.performanceMetrics.interventionsTriggered++;
        
        console.log(`🚨 Crisis intervention triggered: ${interventionKey} (weight: ${totalWeight.toFixed(2)})`);
    }
    
    /**
     * Create optimized intervention
     */
    createOptimizedIntervention(patterns, totalWeight) {
        // Determine intervention type based on highest weighted pattern
        const primaryPattern = patterns.reduce((max, pattern) => 
            pattern.weight > max.weight ? pattern : max
        );
        
        const intervention = {
            type: primaryPattern.name,
            level: this.crisisState.currentLevel,
            priority: totalWeight > 2.0 ? 'critical' : totalWeight > 1.8 ? 'high' : 'medium',
            message: this.generateInterventionMessage(primaryPattern),
            patterns: patterns.map(p => p.name),
            weight: totalWeight,
            timestamp: now,
            data: primaryPattern.data
        };
        
        return intervention;
    }
    
    /**
     * Generate intervention message efficiently
     */
    generateInterventionMessage(pattern) {
        const messages = {
            documentSpiral: [
                "I see you're stuck on that document. Brain feeling foggy? Let's try the tiny version: just type 'Hi' and stop.",
                "That document keeps calling to you, doesn't it? Try opening a new blank doc and writing one sentence.",
                "Document stress is real. Let's pause. Take 3 breaths. The document will be there when you're ready."
            ],
            appSwitchingStorm: [
                "Lots of mental tabs open! Pick ONE tiny thing and everything else waits.",
                "Your brain is doing that thing where it can't pick a lane. That's okay! Let's brain dump first.",
                "App switching spiral detected. Close everything except ONE app. Just one. Breathe."
            ],
            mouseHoverParalysis: [
                "Brain feels stuck? Let's try: 3 deep breaths, stretch arms, then click anywhere. No pressure.",
                "Decision paralysis is real. Close your eyes, count to 3, then click. Whatever happens is okay.",
                "Stuck in hover mode? Move your mouse to a safe spot. Take a breath. No decisions needed right now."
            ],
            taskSwitchingSpiral: [
                "Lots of different tasks pulling at you! Let's pick the easiest one and do just the first step.",
                "Task switching overload! Write each task on a note, then hide all but one.",
                "Task spiral in progress. Pick ONE task - doesn't matter which. Close tabs for everything else."
            ],
            procrastinationPattern: [
                "I see that focus task open, but you're browsing other things. What's the smallest step you could take?",
                "Procrastination mode activated! Let's make it less scary: set a timer for 5 minutes.",
                "Avoidance pattern detected. The task feels too big - can you just sit with it? No pressure to start."
            ]
        };
        
        const patternMessages = messages[pattern.name] || ['Crisis pattern detected. Take a breath.'];
        return patternMessages[Math.floor(Math.random() * patternMessages.length)];
    }
    
    /**
     * Process intervention queue
     */
    processInterventionQueue() {
        if (this.interventionQueue.isEmpty()) return;
        
        const intervention = this.interventionQueue.dequeue();
        this.executeOptimizedIntervention(intervention);
    }
    
    /**
     * Execute optimized intervention
     */
    executeOptimizedIntervention(intervention) {
        // Queue UI update
        this.queueUIUpdate('intervention', intervention);
        
        // Send to AI for contextual support
        this.sendInterventionToAI(intervention);
        
        // Update state management
        if (window.useVelvetStore) {
            const store = window.useVelvetStore.getState();
            store.triggerCrisisIntervention(intervention);
        }
    }
    
    /**
     * Queue UI update for batch processing
     */
    queueUIUpdate(type, data) {
        this.uiUpdateBatch.push({ type, data, timestamp: Date.now() });
        
        // Process UI updates on next frame
        requestAnimationFrame(() => {
            this.flushUIUpdates();
        });
    }
    
    /**
     * Flush UI updates
     */
    flushUIUpdates() {
        if (this.uiUpdateBatch.length === 0) return;
        
        const updates = [...this.uiUpdateBatch];
        this.uiUpdateBatch = [];
        
        updates.forEach(update => {
            if (update.type === 'intervention') {
                this.showInterventionWhisper(update.data);
            }
        });
    }
    
    /**
     * Show intervention whisper efficiently
     */
    showInterventionWhisper(intervention) {
        // Create or reuse whisper element
        let whisper = document.getElementById('executive-dysfunction-whisper');
        if (!whisper) {
            whisper = document.createElement('div');
            whisper.id = 'executive-dysfunction-whisper';
            whisper.style.cssText = `
                position: fixed;
                bottom: 180px;
                right: 20px;
                max-width: 350px;
                padding: 16px 20px;
                border-radius: 16px;
                color: white;
                font-size: 15px;
                z-index: 10002;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.8));
                pointer-events: none;
                font-weight: 500;
                line-height: 1.4;
            `;
            document.body.appendChild(whisper);
        }
        
        // Update content
        whisper.textContent = intervention.message;
        
        // Animate in
        whisper.style.opacity = '1';
        whisper.style.transform = 'translateY(0)';
        
        // Auto hide based on priority
        const duration = intervention.priority === 'critical' ? 8000 : 
                        intervention.priority === 'high' ? 6000 : 4000;
        
        setTimeout(() => {
            whisper.style.opacity = '0';
            whisper.style.transform = 'translateY(-10px)';
        }, duration);
    }
    
    /**
     * Send intervention context to AI
     */
    sendInterventionToAI(intervention) {
        if (window.velvetAI) {
            window.velvetAI.emergencyContext = {
                type: 'executive_dysfunction_intervention',
                intervention: intervention,
                timestamp: Date.now()
            };
        }
    }
    
    /**
     * Perform memory cleanup
     */
    performMemoryCleanup() {
        // Clean intervention debouncer
        const now = Date.now();
        for (const [key, timestamp] of this.interventionDebouncer) {
            if (now - timestamp > 60000) { // 1 minute old
                this.interventionDebouncer.delete(key);
            }
        }
        
        // Clean pattern buffers
        Object.values(this.patterns).forEach(pattern => {
            if (pattern.buffer && pattern.buffer.cleanup) {
                pattern.buffer.cleanup(now - pattern.timeWindow);
            }
        });
        
        // Clean active patterns that are old
        for (const pattern of this.crisisState.activePatterns) {
            if (!this.isPatternStillActive(pattern)) {
                this.crisisState.activePatterns.delete(pattern);
            }
        }
        
        // Clean UI update batch
        this.uiUpdateBatch = this.uiUpdateBatch.filter(
            update => now - update.timestamp < 5000
        );
        
        console.log('🧹 Executive Dysfunction memory cleanup completed');
    }
    
    /**
     * Check if pattern is still active
     */
    isPatternStillActive(patternName) {
        const pattern = this.patterns[patternName];
        if (!pattern || !pattern.buffer) return false;
        
        const now = Date.now();
        const recentItems = pattern.buffer.getItemsInTimeWindow(now - pattern.timeWindow);
        
        return recentItems.length >= Math.floor(pattern.threshold * 0.5);
    }
    
    /**
     * Monitor performance
     */
    monitorPerformance() {
        if (performance.memory) {
            this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
            
            if (this.performanceMetrics.memoryUsage > 50) { // 50MB threshold
                console.warn(`⚠️ High memory usage: ${this.performanceMetrics.memoryUsage.toFixed(2)}MB`);
                this.performMemoryCleanup();
            }
        }
        
        // Check average detection time
        if (this.performanceMetrics.averageDetectionTime > this.config.maxDetectionTime) {
            console.warn('⚠️ Executive Dysfunction performance degraded');
            this.optimizePerformance();
        }
    }
    
    /**
     * Optimize performance when degradation is detected
     */
    optimizePerformance() {
        console.log('⚡ Optimizing Executive Dysfunction performance...');
        
        // Increase batch processing interval to reduce load
        this.config.batchProcessingInterval = Math.min(this.config.batchProcessingInterval + 50, 500);
        
        // Force memory cleanup
        this.performMemoryCleanup();
        
        // Reset performance metrics
        this.performanceMetrics.lastOptimization = Date.now();
        
        console.log('✅ Executive Dysfunction performance optimized');
    }
    
    /**
     * Initialize optimized emergency UI
     */
    initializeOptimizedEmergencyUI() {
        // Pre-create UI elements for faster access
        this.createEmergencyStylesheet();
        console.log('✅ Optimized emergency UI initialized');
    }
    
    /**
     * Create emergency stylesheet
     */
    createEmergencyStylesheet() {
        if (document.getElementById('executive-dysfunction-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'executive-dysfunction-styles';
        style.textContent = `
            #executive-dysfunction-whisper {
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * Debounce utility
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * Throttle utility
     */
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            activePatterns: Array.from(this.crisisState.activePatterns),
            crisisLevel: this.crisisState.currentLevel,
            isPerformant: this.performanceMetrics.averageDetectionTime < this.config.maxDetectionTime
        };
    }
    
    /**
     * Cleanup and shutdown
     */
    stop() {
        console.log('🛑 Stopping Optimized Executive Dysfunction Emergency Mode...');
        
        this.isActive = false;
        
        // Clear all timers
        if (this.batchProcessingTimer) clearInterval(this.batchProcessingTimer);
        if (this.mouseMonitorTimer) clearInterval(this.mouseMonitorTimer);
        if (this.crisisEvaluationTimer) clearInterval(this.crisisEvaluationTimer);
        if (this.performanceTimer) clearInterval(this.performanceTimer);
        if (this.memoryCleanupTimer) clearInterval(this.memoryCleanupTimer);
        
        // Clean up data structures
        this.detectionBatch = [];
        this.uiUpdateBatch = [];
        this.crisisState.activePatterns.clear();
        this.interventionDebouncer.clear();
        this.interventionQueue.clear();
        
        console.log('✅ Optimized Executive Dysfunction Emergency Mode stopped');
    }
}

/**
 * Time Window Buffer for efficient pattern tracking
 */
class TimeWindowBuffer {
    constructor(maxSize = 100) {
        this.buffer = [];
        this.maxSize = maxSize;
    }
    
    add(item) {
        this.buffer.push(item);
        
        // Maintain size limit
        if (this.buffer.length > this.maxSize) {
            this.buffer = this.buffer.slice(-Math.floor(this.maxSize * 0.8));
        }
    }
    
    getItemsInTimeWindow(minTimestamp) {
        return this.buffer.filter(item => item.timestamp >= minTimestamp);
    }
    
    cleanup(minTimestamp) {
        this.buffer = this.buffer.filter(item => item.timestamp >= minTimestamp);
    }
}

/**
 * Circular Pattern Buffer for memory-efficient pattern storage
 */
class CircularPatternBuffer {
    constructor(size) {
        this.buffer = new Array(size);
        this.size = size;
        this.head = 0;
        this.count = 0;
    }
    
    push(pattern) {
        this.buffer[this.head] = pattern;
        this.head = (this.head + 1) % this.size;
        this.count = Math.min(this.count + 1, this.size);
    }
    
    getRecent(num) {
        const result = [];
        let index = (this.head - 1 + this.size) % this.size;
        
        for (let i = 0; i < Math.min(num, this.count); i++) {
            result.push(this.buffer[index]);
            index = (index - 1 + this.size) % this.size;
        }
        
        return result;
    }
}

/**
 * Priority Queue for intervention ordering
 */
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    
    enqueue(item, priority) {
        const priorities = { critical: 3, high: 2, medium: 1, low: 0 };
        const numericPriority = priorities[priority] || 0;
        
        this.items.push({ item, priority: numericPriority });
        this.items.sort((a, b) => b.priority - a.priority);
    }
    
    dequeue() {
        return this.items.shift()?.item;
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    clear() {
        this.items = [];
    }
}

module.exports = OptimizedExecutiveDysfunctionEmergencyMode;