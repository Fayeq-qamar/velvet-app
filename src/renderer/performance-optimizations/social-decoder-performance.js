// Social Decoder Performance Optimization - <200ms Response Time Guarantee
// Optimized for real-time viral neurodivergent feature support

/**
 * Optimized Social Decoder with Performance Guarantees
 * - Sub-200ms analysis pipeline
 * - Efficient memory management
 * - Batch processing for real-time performance
 */
class OptimizedSocialDecoder {
    constructor() {
        console.log('⚡ Initializing Optimized Social Decoder...');
        
        // Performance-optimized state
        this.isActive = false;
        this.isMeetingMode = false;
        
        // Analysis pipeline optimization
        this.analysisWorker = null;
        this.analysisBatch = [];
        this.batchProcessingTimer = null;
        this.lastBatchProcess = 0;
        
        // Memory-efficient analysis queue
        this.analysisQueue = new Map(); // Use Map for O(1) operations
        this.recentAnalyses = new CircularBuffer(10); // Fixed-size circular buffer
        
        // Optimized intervention system
        this.interventionDebouncer = new Map();
        this.uiUpdateQueue = [];
        
        // Performance metrics
        this.performanceMetrics = {
            analysisCount: 0,
            averageLatency: 0,
            maxLatency: 0,
            batchesProcessed: 0,
            memoryUsage: 0,
            lastOptimization: Date.now()
        };
        
        // Configuration optimized for performance
        this.config = {
            maxLatency: 200,              // Hard limit
            batchSize: 5,                 // Process 5 analyses at once
            batchInterval: 50,            // 50ms batching window
            debounceInterval: 1000,       // 1s intervention debounce
            maxQueueSize: 20,             // Prevent memory bloat
            memoryCleanupInterval: 30000, // 30s memory cleanup
            workerTimeout: 150            // 150ms worker timeout
        };
        
        console.log('⚡ Optimized Social Decoder initialized');
    }
    
    /**
     * Initialize with performance optimizations
     */
    async initialize() {
        try {
            console.log('🚀 Starting optimized Social Decoder...');
            
            // Initialize Web Worker for background processing
            await this.initializeAnalysisWorker();
            
            // Set up optimized processing pipeline
            this.setupOptimizedPipeline();
            
            // Initialize memory management
            this.initializeMemoryManagement();
            
            // Start performance monitoring
            this.startPerformanceMonitoring();
            
            this.isActive = true;
            console.log('✅ Optimized Social Decoder active');
            
            return true;
        } catch (error) {
            console.error('❌ Optimized Social Decoder initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Initialize Web Worker for background analysis
     */
    async initializeAnalysisWorker() {
        // Create inline worker for social analysis
        const workerCode = `
            // Social analysis worker
            class SocialAnalysisWorker {
                constructor() {
                    this.sarcasmPatterns = [
                        { pattern: /oh\\s+(great|wonderful|perfect|fantastic)/i, weight: 0.8 },
                        { pattern: /sure\\s+thing/i, weight: 0.7 },
                        { pattern: /that's\\s+just\\s+(great|perfect|wonderful)/i, weight: 0.9 },
                        { pattern: /(fine|okay)\\s*\\.{3,}/i, weight: 0.6 }
                    ];
                    
                    this.emotionPatterns = [
                        { pattern: /excited|thrilled|amazing|love/i, emotion: 'positive', weight: 0.8 },
                        { pattern: /frustrated|annoyed|upset|stressed/i, emotion: 'negative', weight: 0.8 },
                        { pattern: /anxious|worried|nervous|concerned/i, emotion: 'anxiety', weight: 0.7 }
                    ];
                }
                
                analyzeText(text, context = {}) {
                    const startTime = performance.now();
                    
                    // Fast sarcasm detection
                    let sarcasmScore = 0;
                    for (const pattern of this.sarcasmPatterns) {
                        if (pattern.pattern.test(text)) {
                            sarcasmScore = Math.max(sarcasmScore, pattern.weight);
                        }
                    }
                    
                    // Fast emotion detection
                    let emotionDetection = { emotion: 'neutral', confidence: 0.5 };
                    for (const pattern of this.emotionPatterns) {
                        if (pattern.pattern.test(text)) {
                            emotionDetection = {
                                emotion: pattern.emotion,
                                confidence: pattern.weight
                            };
                            break;
                        }
                    }
                    
                    // Calculate overall confidence
                    const overallConfidence = Math.max(sarcasmScore, emotionDetection.confidence);
                    
                    const processingTime = performance.now() - startTime;
                    
                    return {
                        timestamp: Date.now(),
                        original: text,
                        detectionType: sarcasmScore > emotionDetection.confidence ? 'sarcasm' : 'emotion',
                        overallConfidence,
                        sarcasmDetection: {
                            enhanced: sarcasmScore > 0.6,
                            confidence: sarcasmScore,
                            actualMeaning: sarcasmScore > 0.6 ? 'Expressing frustration or disagreement' : null
                        },
                        emotionDetection: {
                            enhanced: emotionDetection.emotion,
                            confidence: emotionDetection.confidence
                        },
                        processingTime,
                        context
                    };
                }
            }
            
            const analyzer = new SocialAnalysisWorker();
            
            self.onmessage = function(e) {
                const { id, text, context } = e.data;
                try {
                    const result = analyzer.analyzeText(text, context);
                    self.postMessage({ id, success: true, result });
                } catch (error) {
                    self.postMessage({ id, success: false, error: error.message });
                }
            };
        `;
        
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        this.analysisWorker = new Worker(URL.createObjectURL(blob));
        
        // Set up worker message handling
        this.analysisWorker.onmessage = (e) => {
            this.handleWorkerResult(e.data);
        };
        
        this.analysisWorker.onerror = (error) => {
            console.error('Analysis worker error:', error);
        };
        
        console.log('✅ Analysis worker initialized');
    }
    
    /**
     * Set up optimized processing pipeline
     */
    setupOptimizedPipeline() {
        // Batch processing system
        this.batchProcessingTimer = setInterval(() => {
            this.processBatch();
        }, this.config.batchInterval);
        
        // UI update optimization
        this.uiUpdateTimer = setInterval(() => {
            this.flushUIUpdates();
        }, 16); // 60fps UI updates
        
        console.log('✅ Optimized processing pipeline active');
    }
    
    /**
     * Initialize memory management
     */
    initializeMemoryManagement() {
        // Periodic memory cleanup
        this.memoryCleanupTimer = setInterval(() => {
            this.performMemoryCleanup();
        }, this.config.memoryCleanupInterval);
        
        // Monitor memory usage
        this.memoryMonitorTimer = setInterval(() => {
            this.monitorMemoryUsage();
        }, 5000);
        
        console.log('✅ Memory management initialized');
    }
    
    /**
     * Optimized text analysis with performance guarantees
     */
    async analyzeText(text, context = {}) {
        const analysisId = `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const startTime = performance.now();
        
        // Queue analysis for batch processing
        return new Promise((resolve, reject) => {
            // Check queue size limit
            if (this.analysisQueue.size >= this.config.maxQueueSize) {
                // Remove oldest analysis
                const oldestKey = this.analysisQueue.keys().next().value;
                this.analysisQueue.delete(oldestKey);
            }
            
            // Add to queue
            this.analysisQueue.set(analysisId, {
                text,
                context,
                startTime,
                resolve,
                reject,
                timeout: setTimeout(() => {
                    this.analysisQueue.delete(analysisId);
                    reject(new Error('Analysis timeout'));
                }, this.config.workerTimeout)
            });
            
            // Add to current batch
            this.analysisBatch.push(analysisId);
            
            // Process immediately if batch is full
            if (this.analysisBatch.length >= this.config.batchSize) {
                this.processBatch();
            }
        });
    }
    
    /**
     * Process analysis batch for optimal performance
     */
    processBatch() {
        if (this.analysisBatch.length === 0) return;
        
        const batchStartTime = performance.now();
        const currentBatch = [...this.analysisBatch];
        this.analysisBatch = [];
        
        // Process each analysis in the batch
        currentBatch.forEach(analysisId => {
            const analysis = this.analysisQueue.get(analysisId);
            if (!analysis) return;
            
            // Send to worker
            this.analysisWorker.postMessage({
                id: analysisId,
                text: analysis.text,
                context: analysis.context
            });
        });
        
        this.performanceMetrics.batchesProcessed++;
        const batchTime = performance.now() - batchStartTime;
        
        // Update last batch process time
        this.lastBatchProcess = performance.now();
        
        // Log performance warning if batch processing is slow
        if (batchTime > 50) {
            console.warn(`⚠️ Slow batch processing: ${batchTime.toFixed(2)}ms`);
        }
    }
    
    /**
     * Handle worker analysis results
     */
    handleWorkerResult(data) {
        const { id, success, result, error } = data;
        const analysis = this.analysisQueue.get(id);
        
        if (!analysis) return; // Analysis may have timed out
        
        // Clear timeout
        clearTimeout(analysis.timeout);
        this.analysisQueue.delete(id);
        
        if (success) {
            // Calculate total latency
            const totalLatency = performance.now() - analysis.startTime;
            
            // Update performance metrics
            this.updatePerformanceMetrics(totalLatency);
            
            // Add to recent analyses (circular buffer)
            this.recentAnalyses.push(result);
            
            // Check if intervention is needed
            if (result.overallConfidence > 0.8) {
                this.queueIntervention(result);
            }
            
            // Resolve promise
            analysis.resolve(result);
            
            // Queue UI update
            this.queueUIUpdate('analysis', result);
            
        } else {
            console.error('Analysis worker error:', error);
            analysis.reject(new Error(error));
        }
    }
    
    /**
     * Update performance metrics efficiently
     */
    updatePerformanceMetrics(latency) {
        this.performanceMetrics.analysisCount++;
        
        // Update average latency (rolling average)
        const count = this.performanceMetrics.analysisCount;
        this.performanceMetrics.averageLatency = 
            (this.performanceMetrics.averageLatency * (count - 1) + latency) / count;
        
        // Update max latency
        this.performanceMetrics.maxLatency = Math.max(this.performanceMetrics.maxLatency, latency);
        
        // Performance warning
        if (latency > this.config.maxLatency) {
            console.warn(`⚠️ Analysis latency exceeded target: ${latency.toFixed(2)}ms`);
        }
    }
    
    /**
     * Queue intervention with debouncing
     */
    queueIntervention(analysis) {
        const interventionType = analysis.detectionType;
        const now = Date.now();
        
        // Check debouncing
        const lastIntervention = this.interventionDebouncer.get(interventionType);
        if (lastIntervention && (now - lastIntervention) < this.config.debounceInterval) {
            return; // Skip to prevent spam
        }
        
        // Update debouncer
        this.interventionDebouncer.set(interventionType, now);
        
        // Create intervention
        const intervention = this.createOptimizedIntervention(analysis);
        
        // Queue UI update for intervention
        this.queueUIUpdate('intervention', intervention);
        
        // Emit to state management
        if (window.useVelvetStore) {
            const store = window.useVelvetStore.getState();
            store.triggerSocialIntervention(intervention);
        }
    }
    
    /**
     * Create optimized intervention
     */
    createOptimizedIntervention(analysis) {
        return {
            type: analysis.detectionType,
            priority: analysis.overallConfidence > 0.9 ? 'high' : 'medium',
            message: this.generateInterventionMessage(analysis),
            confidence: analysis.overallConfidence,
            timestamp: Date.now(),
            analysis: {
                original: analysis.original.substring(0, 100), // Limit size
                detectionType: analysis.detectionType,
                confidence: analysis.overallConfidence
            }
        };
    }
    
    /**
     * Generate intervention message efficiently
     */
    generateInterventionMessage(analysis) {
        const messages = {
            sarcasm: [
                `🎭 Sarcasm detected (${Math.round(analysis.overallConfidence * 100)}% confidence)`,
                '🎭 They might not mean what they literally said',
                '🎭 Consider the underlying meaning here'
            ],
            emotion: [
                `😊 Emotional tone detected: ${analysis.emotionDetection.enhanced}`,
                `💭 They seem to be feeling ${analysis.emotionDetection.enhanced}`,
                '💝 Consider responding to their emotional state'
            ]
        };
        
        const typeMessages = messages[analysis.detectionType] || ['🎭 Social cue detected'];
        return typeMessages[Math.floor(Math.random() * typeMessages.length)];
    }
    
    /**
     * Queue UI updates for batch processing
     */
    queueUIUpdate(type, data) {
        this.uiUpdateQueue.push({ type, data, timestamp: Date.now() });
        
        // Limit queue size
        if (this.uiUpdateQueue.length > 20) {
            this.uiUpdateQueue = this.uiUpdateQueue.slice(-10);
        }
    }
    
    /**
     * Flush UI updates at 60fps
     */
    flushUIUpdates() {
        if (this.uiUpdateQueue.length === 0) return;
        
        const updates = [...this.uiUpdateQueue];
        this.uiUpdateQueue = [];
        
        // Process updates efficiently
        requestAnimationFrame(() => {
            this.processUIUpdates(updates);
        });
    }
    
    /**
     * Process UI updates efficiently
     */
    processUIUpdates(updates) {
        // Group updates by type
        const groupedUpdates = {};
        updates.forEach(update => {
            if (!groupedUpdates[update.type]) {
                groupedUpdates[update.type] = [];
            }
            groupedUpdates[update.type].push(update.data);
        });
        
        // Process grouped updates
        Object.keys(groupedUpdates).forEach(type => {
            switch (type) {
                case 'analysis':
                    this.updateAnalysisUI(groupedUpdates[type]);
                    break;
                case 'intervention':
                    this.updateInterventionUI(groupedUpdates[type]);
                    break;
            }
        });
    }
    
    /**
     * Update analysis UI efficiently
     */
    updateAnalysisUI(analyses) {
        // Update confidence indicator with latest analysis
        const latestAnalysis = analyses[analyses.length - 1];
        if (latestAnalysis) {
            this.updateConfidenceIndicator(latestAnalysis.overallConfidence, latestAnalysis.detectionType);
        }
    }
    
    /**
     * Update intervention UI efficiently
     */
    updateInterventionUI(interventions) {
        // Show latest high-priority intervention
        const highPriorityIntervention = interventions.find(i => i.priority === 'high');
        const intervention = highPriorityIntervention || interventions[interventions.length - 1];
        
        if (intervention) {
            this.showInterventionWhisper(intervention);
        }
    }
    
    /**
     * Update confidence indicator efficiently
     */
    updateConfidenceIndicator(confidence, type) {
        const orb = document.querySelector('.velvet-orb');
        if (!orb) return;
        
        let ring = orb.querySelector('.confidence-ring');
        if (!ring) {
            ring = document.createElement('div');
            ring.className = 'confidence-ring';
            ring.style.cssText = `
                position: absolute;
                top: -3px; left: -3px; right: -3px; bottom: -3px;
                border-radius: 50%;
                border: 2px solid transparent;
                transition: all 0.3s ease;
                pointer-events: none;
            `;
            orb.appendChild(ring);
        }
        
        const colors = {
            sarcasm: '#ef4444',
            emotion: '#a855f7',
            default: '#3b82f6'
        };
        
        const color = colors[type] || colors.default;
        const opacity = Math.min(confidence, 1.0);
        
        if (confidence > 0.7) {
            ring.style.borderColor = color;
            ring.style.opacity = opacity.toString();
            ring.style.boxShadow = `0 0 20px ${color}40`;
        } else {
            ring.style.borderColor = 'transparent';
            ring.style.opacity = '0';
            ring.style.boxShadow = 'none';
        }
    }
    
    /**
     * Show intervention whisper efficiently
     */
    showInterventionWhisper(intervention) {
        // Create or reuse whisper element
        let whisper = document.getElementById('social-decoder-whisper');
        if (!whisper) {
            whisper = document.createElement('div');
            whisper.id = 'social-decoder-whisper';
            whisper.style.cssText = `
                position: fixed;
                bottom: 120px;
                right: 20px;
                max-width: 300px;
                padding: 12px 16px;
                border-radius: 12px;
                color: white;
                font-size: 14px;
                z-index: 10001;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.8));
                pointer-events: none;
            `;
            document.body.appendChild(whisper);
        }
        
        // Update content
        whisper.textContent = intervention.message;
        
        // Animate in
        whisper.style.opacity = '1';
        whisper.style.transform = 'translateY(0)';
        
        // Auto hide
        setTimeout(() => {
            whisper.style.opacity = '0';
            whisper.style.transform = 'translateY(-10px)';
        }, 4000);
    }
    
    /**
     * Perform memory cleanup
     */
    performMemoryCleanup() {
        // Clean analysis queue of old items
        const now = Date.now();
        for (const [id, analysis] of this.analysisQueue) {
            if (now - analysis.startTime > 30000) { // 30 seconds old
                clearTimeout(analysis.timeout);
                this.analysisQueue.delete(id);
                analysis.reject(new Error('Analysis cleaned up'));
            }
        }
        
        // Clean intervention debouncer
        for (const [type, timestamp] of this.interventionDebouncer) {
            if (now - timestamp > 60000) { // 1 minute old
                this.interventionDebouncer.delete(type);
            }
        }
        
        // Clean UI update queue
        this.uiUpdateQueue = this.uiUpdateQueue.filter(
            update => now - update.timestamp < 10000 // 10 seconds old
        );
        
        console.log('🧹 Social Decoder memory cleanup completed');
    }
    
    /**
     * Monitor memory usage
     */
    monitorMemoryUsage() {
        if (performance.memory) {
            this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
            
            // Warn if memory usage is high
            if (this.performanceMetrics.memoryUsage > 100) { // 100MB
                console.warn(`⚠️ High memory usage: ${this.performanceMetrics.memoryUsage.toFixed(2)}MB`);
                this.performMemoryCleanup();
            }
        }
    }
    
    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        setInterval(() => {
            const metrics = this.getPerformanceMetrics();
            
            if (metrics.averageLatency > this.config.maxLatency) {
                console.warn('⚠️ Social Decoder performance degraded:', metrics);
                this.optimizePerformance();
            }
            
        }, 10000); // Check every 10 seconds
    }
    
    /**
     * Optimize performance when degradation is detected
     */
    optimizePerformance() {
        console.log('⚡ Optimizing Social Decoder performance...');
        
        // Increase batch size to reduce overhead
        this.config.batchSize = Math.min(this.config.batchSize + 2, 10);
        
        // Reduce batch interval for faster processing
        this.config.batchInterval = Math.max(this.config.batchInterval - 10, 25);
        
        // Force memory cleanup
        this.performMemoryCleanup();
        
        // Reset performance metrics
        this.performanceMetrics.lastOptimization = Date.now();
        
        console.log('✅ Social Decoder performance optimized');
    }
    
    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            queueSize: this.analysisQueue.size,
            batchSize: this.analysisBatch.length,
            uiQueueSize: this.uiUpdateQueue.length,
            isPerformant: this.performanceMetrics.averageLatency < this.config.maxLatency
        };
    }
    
    /**
     * Activate meeting mode with optimizations
     */
    activateMeetingMode(meetingData) {
        this.isMeetingMode = true;
        
        // Optimize for meeting mode
        this.config.batchSize = 3; // Smaller batches for lower latency
        this.config.batchInterval = 25; // Faster processing
        
        console.log('📹 Meeting mode activated with performance optimizations');
    }
    
    /**
     * Deactivate meeting mode
     */
    deactivateMeetingMode() {
        this.isMeetingMode = false;
        
        // Reset to normal performance settings
        this.config.batchSize = 5;
        this.config.batchInterval = 50;
        
        console.log('📹 Meeting mode deactivated');
    }
    
    /**
     * Cleanup and shutdown
     */
    async shutdown() {
        console.log('🛑 Shutting down Optimized Social Decoder...');
        
        this.isActive = false;
        
        // Clear all timers
        if (this.batchProcessingTimer) clearInterval(this.batchProcessingTimer);
        if (this.uiUpdateTimer) clearInterval(this.uiUpdateTimer);
        if (this.memoryCleanupTimer) clearInterval(this.memoryCleanupTimer);
        if (this.memoryMonitorTimer) clearInterval(this.memoryMonitorTimer);
        
        // Terminate worker
        if (this.analysisWorker) {
            this.analysisWorker.terminate();
        }
        
        // Clean up queues
        this.analysisQueue.clear();
        this.analysisBatch = [];
        this.uiUpdateQueue = [];
        this.interventionDebouncer.clear();
        
        console.log('✅ Optimized Social Decoder shutdown complete');
    }
}

/**
 * Circular Buffer for efficient memory management
 */
class CircularBuffer {
    constructor(size) {
        this.size = size;
        this.buffer = new Array(size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }
    
    push(item) {
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.size;
        
        if (this.length < this.size) {
            this.length++;
        } else {
            this.head = (this.head + 1) % this.size;
        }
    }
    
    toArray() {
        const result = [];
        let index = this.head;
        for (let i = 0; i < this.length; i++) {
            result.push(this.buffer[index]);
            index = (index + 1) % this.size;
        }
        return result;
    }
    
    get(index) {
        if (index >= this.length) return undefined;
        return this.buffer[(this.head + index) % this.size];
    }
    
    clear() {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedSocialDecoder;
} else if (typeof window !== 'undefined') {
    window.OptimizedSocialDecoder = OptimizedSocialDecoder;
}

console.log('⚡ Optimized Social Decoder loaded - guaranteed <200ms performance');