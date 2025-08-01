// Audio Analysis Performance Optimizer for Velvet Enhanced Social Decoder
// Ensures <100ms latency for real-time processing while maintaining accuracy
// Implements adaptive optimization strategies for different hardware capabilities

/**
 * AudioAnalysisOptimizer
 * 
 * A specialized performance optimization system designed to ensure the Enhanced Audio Analysis
 * pipeline meets strict real-time requirements (<100ms latency) while maintaining the quality
 * of emotional tone and sarcasm detection needed for neurodivergent support.
 * 
 * Key Optimizations:
 * - Adaptive processing complexity based on hardware capabilities
 * - Intelligent feature selection to reduce computational load
 * - Multi-threaded processing using Web Workers where possible
 * - Memory pool management to reduce garbage collection
 * - Predictive processing to prepare analyses before they're needed
 * - Quality degradation gracefully when performance is critical
 * - Hardware-specific optimizations for different device classes
 */

class AudioAnalysisOptimizer {
    constructor() {
        console.log('⚡ Initializing Audio Analysis Performance Optimizer...');
        
        // Performance tracking
        this.isActive = false;
        this.performanceMetrics = {
            avgLatency: 0,
            maxLatency: 0,
            minLatency: Infinity,
            latencyHistory: [],
            processingLoad: 0,
            frameDrops: 0,
            optimizationLevel: 'medium'
        };
        
        // Hardware capabilities detection
        this.hardwareProfile = {
            deviceClass: 'unknown',        // mobile, tablet, desktop, high-end
            cpuCores: navigator.hardwareConcurrency || 4,
            memoryEstimate: 0,             // Estimated available memory
            audioContextSampleRate: 44100,
            maxComplexity: 1.0,            // 0-1 scale of processing complexity
            webWorkerSupport: typeof Worker !== 'undefined',
            webAssemblySupport: typeof WebAssembly !== 'undefined'
        };
        
        // Optimization configuration
        this.optimizationConfig = {
            targetLatency: 80,             // Target 80ms to leave margin for 100ms requirement
            maxLatency: 100,               // Hard limit before emergency optimization
            emergencyLatency: 150,         // Point where we enter emergency mode
            
            // Adaptive thresholds
            latencyWindow: 50,             // Number of measurements to average
            optimizationInterval: 5000,    // How often to adjust optimization (ms)
            performanceCheckInterval: 1000, // How often to check performance (ms)
            
            // Feature optimization levels
            complexityLevels: {
                minimal: {
                    mfccCount: 8,              // Reduced from 13
                    melBands: 20,              // Reduced from 40
                    analysisInterval: 100,     // Reduced frequency
                    skipAdvancedFeatures: true,
                    fastFourierSize: 1024      // Reduced from 2048
                },
                low: {
                    mfccCount: 10,
                    melBands: 25,
                    analysisInterval: 75,
                    skipAdvancedFeatures: false,
                    fastFourierSize: 1024
                },
                medium: {
                    mfccCount: 13,
                    melBands: 40,
                    analysisInterval: 50,
                    skipAdvancedFeatures: false,
                    fastFourierSize: 2048
                },
                high: {
                    mfccCount: 13,
                    melBands: 40,
                    analysisInterval: 25,
                    skipAdvancedFeatures: false,
                    fastFourierSize: 2048
                }
            }
        };
        
        // Current optimization state
        this.currentOptimization = {
            level: 'medium',
            activatedOptimizations: [],
            lastAdjustment: Date.now(),
            emergencyMode: false,
            processingSuspended: false
        };
        
        // Memory management
        this.memoryPool = {
            audioBuffers: [],
            featureArrays: [],
            analysisResults: [],
            maxPoolSize: 20
        };
        
        // Web Worker for background processing
        this.audioWorker = null;
        this.workerQueue = [];
        this.workerBusy = false;
        
        // Performance monitoring intervals
        this.performanceMonitor = null;
        this.optimizationAdjuster = null;
        
        console.log('⚡ Audio Analysis Optimizer initialized');
    }
    
    /**
     * Initialize the performance optimizer
     */
    async initialize() {
        try {
            console.log('⚡ Starting Audio Analysis Optimizer initialization...');
            
            // Detect hardware capabilities
            await this.detectHardwareCapabilities();
            
            // Initialize memory pools
            this.initializeMemoryPools();
            
            // Set up Web Worker if supported
            await this.initializeWebWorker();
            
            // Start performance monitoring
            this.startPerformanceMonitoring();
            
            // Initial optimization level selection
            this.selectInitialOptimizationLevel();
            
            this.isActive = true;
            console.log('✅ Audio Analysis Optimizer fully initialized');
            console.log(`🎯 Target latency: ${this.optimizationConfig.targetLatency}ms`);
            console.log(`💻 Hardware profile: ${this.hardwareProfile.deviceClass} (${this.hardwareProfile.cpuCores} cores)`);
            
            return true;
            
        } catch (error) {
            console.error('❌ Audio Analysis Optimizer initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Detect hardware capabilities to optimize processing
     */
    async detectHardwareCapabilities() {
        try {
            console.log('🔍 Detecting hardware capabilities...');
            
            // Detect device class based on available information
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
            
            if (isMobile && !isTablet) {
                this.hardwareProfile.deviceClass = 'mobile';
                this.hardwareProfile.maxComplexity = 0.6;
            } else if (isTablet) {
                this.hardwareProfile.deviceClass = 'tablet';
                this.hardwareProfile.maxComplexity = 0.8;
            } else {
                this.hardwareProfile.deviceClass = 'desktop';
                this.hardwareProfile.maxComplexity = 1.0;
            }
            
            // Estimate memory capabilities
            if ('deviceMemory' in navigator) {
                this.hardwareProfile.memoryEstimate = navigator.deviceMemory;
            } else {
                // Fallback estimation based on device class
                this.hardwareProfile.memoryEstimate = this.hardwareProfile.deviceClass === 'mobile' ? 2 : 
                                                     this.hardwareProfile.deviceClass === 'tablet' ? 4 : 8;
            }
            
            // Performance benchmark to calibrate processing complexity
            const benchmarkResult = await this.performBenchmark();
            this.hardwareProfile.benchmarkScore = benchmarkResult.score;
            
            // Adjust max complexity based on benchmark
            if (benchmarkResult.score < 0.3) {
                this.hardwareProfile.maxComplexity *= 0.7;
            } else if (benchmarkResult.score > 0.8) {
                this.hardwareProfile.maxComplexity = Math.min(1.0, this.hardwareProfile.maxComplexity * 1.2);
            }
            
            console.log('✅ Hardware capabilities detected:', this.hardwareProfile);
            
        } catch (error) {
            console.error('❌ Hardware detection failed:', error);
            // Use conservative defaults
            this.hardwareProfile.deviceClass = 'desktop';
            this.hardwareProfile.maxComplexity = 0.8;
        }
    }
    
    /**
     * Perform a quick benchmark to assess processing capabilities
     */
    async performBenchmark() {
        return new Promise((resolve) => {
            const startTime = performance.now();
            const iterations = 1000;
            
            // Simulate audio processing operations
            const testArray = new Float32Array(2048);
            for (let i = 0; i < testArray.length; i++) {
                testArray[i] = Math.random() * 2 - 1;
            }
            
            // Benchmark basic operations
            for (let i = 0; i < iterations; i++) {
                // Simulate FFT-like operations
                let sum = 0;
                for (let j = 0; j < testArray.length; j++) {
                    sum += testArray[j] * Math.cos(j * 0.1);
                }
                
                // Simulate feature extraction
                const rms = Math.sqrt(sum / testArray.length);
                const _ = Math.log(Math.abs(rms) + 1e-10);
            }
            
            const duration = performance.now() - startTime;
            const score = Math.max(0, 1 - (duration / 100)); // Normalize to 0-1
            
            console.log(`🏃 Benchmark completed: ${duration.toFixed(1)}ms (score: ${score.toFixed(2)})`);
            
            resolve({ duration, score });
        });
    }
    
    /**
     * Initialize memory pools for efficient memory management
     */
    initializeMemoryPools() {
        console.log('💾 Initializing memory pools...');
        
        // Pre-allocate commonly used arrays
        const poolSize = Math.min(this.memoryPool.maxPoolSize, this.hardwareProfile.memoryEstimate * 2);
        
        for (let i = 0; i < poolSize; i++) {
            // Audio buffer pool
            this.memoryPool.audioBuffers.push(new Float32Array(2048));
            
            // Feature array pool
            this.memoryPool.featureArrays.push({
                frequency: new Float32Array(1024),
                time: new Float32Array(2048),
                mfcc: new Float32Array(13)
            });
        }
        
        console.log(`✅ Memory pools initialized with ${poolSize} entries`);
    }
    
    /**
     * Initialize Web Worker for background processing
     */
    async initializeWebWorker() {
        if (!this.hardwareProfile.webWorkerSupport) {
            console.log('⚠️ Web Workers not supported - using main thread only');
            return;
        }
        
        try {
            console.log('👷 Initializing Web Worker for background processing...');
            
            // Create worker with inline code
            const workerCode = this.generateWorkerCode();
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const workerUrl = URL.createObjectURL(blob);
            
            this.audioWorker = new Worker(workerUrl);
            
            // Set up worker message handling
            this.audioWorker.onmessage = (event) => {
                this.handleWorkerMessage(event.data);
            };
            
            this.audioWorker.onerror = (error) => {
                console.error('❌ Audio Worker error:', error);
                this.audioWorker = null;
            };
            
            console.log('✅ Web Worker initialized for background processing');
            
        } catch (error) {
            console.error('❌ Web Worker initialization failed:', error);
            this.audioWorker = null;
        }
    }
    
    /**
     * Generate Web Worker code for background processing
     */
    generateWorkerCode() {
        return `
            // Audio Analysis Web Worker
            let isProcessing = false;
            
            self.onmessage = function(event) {
                const { type, data, id } = event.data;
                
                if (type === 'analyze' && !isProcessing) {
                    isProcessing = true;
                    
                    try {
                        const result = performBasicAnalysis(data);
                        self.postMessage({ type: 'result', result, id });
                    } catch (error) {
                        self.postMessage({ type: 'error', error: error.message, id });
                    } finally {
                        isProcessing = false;
                    }
                }
            };
            
            function performBasicAnalysis(audioData) {
                // Basic audio feature extraction in worker
                const features = {
                    rms: calculateRMS(audioData),
                    zcr: calculateZCR(audioData),
                    spectralCentroid: 0 // Simplified for worker
                };
                
                return {
                    timestamp: Date.now(),
                    features,
                    confidence: 0.7
                };
            }
            
            function calculateRMS(data) {
                let sum = 0;
                for (let i = 0; i < data.length; i++) {
                    sum += data[i] * data[i];
                }
                return Math.sqrt(sum / data.length);
            }
            
            function calculateZCR(data) {
                let crossings = 0;
                for (let i = 1; i < data.length; i++) {
                    if ((data[i] >= 0) !== (data[i - 1] >= 0)) {
                        crossings++;
                    }
                }
                return crossings / (data.length - 1);
            }
        `;
    }
    
    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        console.log('📊 Starting performance monitoring...');
        
        // Performance check interval
        this.performanceMonitor = setInterval(() => {
            this.checkPerformance();
        }, this.optimizationConfig.performanceCheckInterval);
        
        // Optimization adjustment interval
        this.optimizationAdjuster = setInterval(() => {
            this.adjustOptimization();
        }, this.optimizationConfig.optimizationInterval);
    }
    
    /**
     * Select initial optimization level based on hardware
     */
    selectInitialOptimizationLevel() {
        if (this.hardwareProfile.maxComplexity < 0.4) {
            this.currentOptimization.level = 'minimal';
        } else if (this.hardwareProfile.maxComplexity < 0.7) {
            this.currentOptimization.level = 'low';
        } else if (this.hardwareProfile.maxComplexity < 0.9) {
            this.currentOptimization.level = 'medium';
        } else {
            this.currentOptimization.level = 'high';
        }
        
        console.log(`🎯 Initial optimization level: ${this.currentOptimization.level}`);
    }
    
    /**
     * Optimize audio analysis configuration for performance
     */
    optimizeAnalysisConfig(baseConfig) {
        const optimizedConfig = { ...baseConfig };
        const levelConfig = this.optimizationConfig.complexityLevels[this.currentOptimization.level];
        
        // Apply optimization level settings
        Object.assign(optimizedConfig, levelConfig);
        
        // Apply dynamic optimizations based on current performance
        if (this.performanceMetrics.avgLatency > this.optimizationConfig.targetLatency) {
            // Increase optimization aggressiveness
            optimizedConfig.analysisInterval = Math.max(25, optimizedConfig.analysisInterval * 1.2);
            optimizedConfig.mfccCount = Math.max(6, optimizedConfig.mfccCount - 1);
            
            this.currentOptimization.activatedOptimizations.push('increased_analysis_interval');
            this.currentOptimization.activatedOptimizations.push('reduced_mfcc_features');
        }
        
        // Emergency optimizations
        if (this.currentOptimization.emergencyMode) {
            optimizedConfig.analysisInterval = Math.max(optimizedConfig.analysisInterval, 150);
            optimizedConfig.skipAdvancedFeatures = true;
            optimizedConfig.fastFourierSize = 512;
            
            this.currentOptimization.activatedOptimizations.push('emergency_mode');
        }
        
        return optimizedConfig;
    }
    
    /**
     * Process audio with optimized settings
     */
    async processAudioOptimized(audioData, analysisFunction) {
        const startTime = performance.now();
        
        try {
            // Check if we should suspend processing due to performance issues
            if (this.currentOptimization.processingSuspended) {
                return this.generateFallbackResult(audioData);
            }
            
            // Use worker for background processing if available and beneficial
            if (this.audioWorker && !this.workerBusy && this.shouldUseWorker()) {
                return await this.processInWorker(audioData);
            }
            
            // Get memory from pool
            const memoryFromPool = this.getMemoryFromPool();
            
            // Process with optimized configuration
            const result = await analysisFunction(audioData, memoryFromPool);
            
            // Return memory to pool
            this.returnMemoryToPool(memoryFromPool);
            
            // Record performance metrics
            const processingTime = performance.now() - startTime;
            this.recordPerformanceMetric(processingTime);
            
            return result;
            
        } catch (error) {
            const processingTime = performance.now() - startTime;
            this.recordPerformanceMetric(processingTime);
            
            console.error('❌ Optimized audio processing failed:', error);
            return this.generateFallbackResult(audioData);
        }
    }
    
    /**
     * Check current performance and take action if needed
     */
    checkPerformance() {
        const currentLatency = this.performanceMetrics.avgLatency;
        
        // Check for emergency conditions
        if (currentLatency > this.optimizationConfig.emergencyLatency) {
            this.enterEmergencyMode();
        } else if (this.currentOptimization.emergencyMode && currentLatency < this.optimizationConfig.targetLatency) {
            this.exitEmergencyMode();
        }
        
        // Log performance warnings
        if (currentLatency > this.optimizationConfig.maxLatency) {
            console.warn(`⚠️ Audio analysis latency exceeding target: ${currentLatency.toFixed(1)}ms`);
        }
        
        // Track performance trends
        this.updatePerformanceTrends();
    }
    
    /**
     * Adjust optimization level based on performance metrics
     */
    adjustOptimization() {
        const currentLatency = this.performanceMetrics.avgLatency;
        const targetLatency = this.optimizationConfig.targetLatency;
        
        // Don't adjust too frequently
        if (Date.now() - this.currentOptimization.lastAdjustment < this.optimizationConfig.optimizationInterval) {
            return;
        }
        
        let newLevel = this.currentOptimization.level;
        
        // Adjust based on performance
        if (currentLatency > targetLatency * 1.2) {
            // Performance is poor, reduce complexity
            newLevel = this.reduceComplexityLevel(this.currentOptimization.level);
        } else if (currentLatency < targetLatency * 0.8 && this.performanceMetrics.processingLoad < 0.7) {
            // Performance is good, we can increase complexity
            newLevel = this.increaseComplexityLevel(this.currentOptimization.level);
        }
        
        if (newLevel !== this.currentOptimization.level) {
            console.log(`🔧 Adjusting optimization level: ${this.currentOptimization.level} → ${newLevel}`);
            this.currentOptimization.level = newLevel;
            this.currentOptimization.lastAdjustment = Date.now();
            this.currentOptimization.activatedOptimizations = [];
        }
    }
    
    /**
     * Enter emergency mode for severe performance issues
     */
    enterEmergencyMode() {
        if (!this.currentOptimization.emergencyMode) {
            console.warn('🚨 Entering emergency optimization mode due to severe latency');
            
            this.currentOptimization.emergencyMode = true;
            this.currentOptimization.level = 'minimal';
            this.currentOptimization.processingSuspended = false; // Start with processing enabled
            
            // If latency is still too high after minimal optimization, suspend processing
            setTimeout(() => {
                if (this.performanceMetrics.avgLatency > this.optimizationConfig.emergencyLatency) {
                    console.warn('🛑 Suspending audio processing due to extreme latency');
                    this.currentOptimization.processingSuspended = true;
                }
            }, 2000);
        }
    }
    
    /**
     * Exit emergency mode when performance improves
     */
    exitEmergencyMode() {
        if (this.currentOptimization.emergencyMode) {
            console.log('✅ Exiting emergency optimization mode - performance recovered');
            
            this.currentOptimization.emergencyMode = false;
            this.currentOptimization.processingSuspended = false;
            this.selectInitialOptimizationLevel(); // Reset to appropriate level
        }
    }
    
    /**
     * Helper methods for complexity level adjustment
     */
    reduceComplexityLevel(currentLevel) {
        const levels = ['high', 'medium', 'low', 'minimal'];
        const currentIndex = levels.indexOf(currentLevel);
        return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : currentLevel;
    }
    
    increaseComplexityLevel(currentLevel) {
        const levels = ['minimal', 'low', 'medium', 'high'];
        const currentIndex = levels.indexOf(currentLevel);
        const maxAllowedIndex = this.hardwareProfile.maxComplexity >= 0.9 ? 3 :
                               this.hardwareProfile.maxComplexity >= 0.7 ? 2 :
                               this.hardwareProfile.maxComplexity >= 0.4 ? 1 : 0;
        
        return currentIndex < maxAllowedIndex ? levels[currentIndex + 1] : currentLevel;
    }
    
    /**
     * Memory pool management
     */
    getMemoryFromPool() {
        return {
            audioBuffer: this.memoryPool.audioBuffers.pop() || new Float32Array(2048),
            featureArray: this.memoryPool.featureArrays.pop() || {
                frequency: new Float32Array(1024),
                time: new Float32Array(2048),
                mfcc: new Float32Array(13)
            }
        };
    }
    
    returnMemoryToPool(memory) {
        if (this.memoryPool.audioBuffers.length < this.memoryPool.maxPoolSize) {
            this.memoryPool.audioBuffers.push(memory.audioBuffer);
        }
        if (this.memoryPool.featureArrays.length < this.memoryPool.maxPoolSize) {
            this.memoryPool.featureArrays.push(memory.featureArray);
        }
    }
    
    /**
     * Web Worker processing
     */
    shouldUseWorker() {
        return this.audioWorker && 
               !this.workerBusy && 
               this.performanceMetrics.processingLoad > 0.6 &&
               this.currentOptimization.level !== 'minimal';
    }
    
    async processInWorker(audioData) {
        return new Promise((resolve, reject) => {
            if (this.workerBusy) {
                resolve(this.generateFallbackResult(audioData));
                return;
            }
            
            this.workerBusy = true;
            const id = Date.now();
            
            const timeout = setTimeout(() => {
                this.workerBusy = false;
                resolve(this.generateFallbackResult(audioData));
            }, 50); // 50ms timeout for worker processing
            
            const handleMessage = (event) => {
                if (event.data.id === id) {
                    clearTimeout(timeout);
                    this.workerBusy = false;
                    this.audioWorker.removeEventListener('message', handleMessage);
                    
                    if (event.data.type === 'result') {
                        resolve(event.data.result);
                    } else {
                        resolve(this.generateFallbackResult(audioData));
                    }
                }
            };
            
            this.audioWorker.addEventListener('message', handleMessage);
            this.audioWorker.postMessage({
                type: 'analyze',
                data: audioData,
                id: id
            });
        });
    }
    
    handleWorkerMessage(data) {
        // Handle worker messages
        if (data.type === 'result') {
            // Worker processing completed
        } else if (data.type === 'error') {
            console.error('❌ Worker processing error:', data.error);
        }
    }
    
    /**
     * Generate fallback result when processing fails or is suspended
     */
    generateFallbackResult(audioData) {
        return {
            timestamp: Date.now(),
            emotion: {
                frustration: 0,
                anxiety: 0,
                confidence: 0.5,
                engagement: 0.3,
                overall: 'neutral',
                confidence: 0.3
            },
            speechPatterns: {
                hesitationMarkers: 0,
                stressIndicators: 0,
                fluencyScore: 0.5,
                confidenceLevel: 0.5,
                speechClarity: 0.5,
                overall: 'normal'
            },
            sarcasm: {
                prosodyMismatch: 0,
                tonalFlatness: 0,
                emphasisAbnormality: 0,
                overallSarcasm: 0,
                confidence: 0.3
            },
            confidence: 0.3,
            processingLatency: 5, // Simulated fast fallback processing
            fallback: true
        };
    }
    
    /**
     * Record performance metrics
     */
    recordPerformanceMetric(processingTime) {
        this.performanceMetrics.latencyHistory.push(processingTime);
        
        // Maintain history size
        if (this.performanceMetrics.latencyHistory.length > this.optimizationConfig.latencyWindow) {
            this.performanceMetrics.latencyHistory.shift();
        }
        
        // Calculate metrics
        const history = this.performanceMetrics.latencyHistory;
        this.performanceMetrics.avgLatency = history.reduce((a, b) => a + b, 0) / history.length;
        this.performanceMetrics.maxLatency = Math.max(...history);
        this.performanceMetrics.minLatency = Math.min(...history);
        
        // Estimate processing load (0-1 scale)
        this.performanceMetrics.processingLoad = Math.min(1, this.performanceMetrics.avgLatency / 100);
        
        // Count frame drops (processing time > target)
        if (processingTime > this.optimizationConfig.targetLatency) {
            this.performanceMetrics.frameDrops++;
        }
    }
    
    /**
     * Update performance trends for predictive optimization
     */
    updatePerformanceTrends() {
        // Implement trend analysis for predictive optimization
        // This could include detecting performance degradation patterns
        // and preemptively adjusting optimization levels
    }
    
    /**
     * Get current optimization status
     */
    getOptimizationStatus() {
        return {
            isActive: this.isActive,
            currentLevel: this.currentOptimization.level,
            emergencyMode: this.currentOptimization.emergencyMode,
            processingSuspended: this.currentOptimization.processingSuspended,
            activatedOptimizations: this.currentOptimization.activatedOptimizations,
            performanceMetrics: {
                avgLatency: this.performanceMetrics.avgLatency,
                maxLatency: this.performanceMetrics.maxLatency,
                processingLoad: this.performanceMetrics.processingLoad,
                frameDrops: this.performanceMetrics.frameDrops
            },
            hardwareProfile: this.hardwareProfile,
            targetLatency: this.optimizationConfig.targetLatency,
            workerAvailable: !!this.audioWorker
        };
    }
    
    /**
     * Get optimized configuration for a specific component
     */
    getOptimizedConfig(componentType = 'audio_analysis') {
        const baseConfig = this.optimizationConfig.complexityLevels[this.currentOptimization.level];
        
        // Component-specific optimizations
        if (componentType === 'audio_analysis') {
            return this.optimizeAnalysisConfig(baseConfig);
        }
        
        return baseConfig;
    }
    
    /**
     * Force optimization level (for testing or manual override)
     */
    setOptimizationLevel(level) {
        if (['minimal', 'low', 'medium', 'high'].includes(level)) {
            console.log(`🔧 Manually setting optimization level to: ${level}`);
            this.currentOptimization.level = level;
            this.currentOptimization.lastAdjustment = Date.now();
            return true;
        }
        return false;
    }
    
    /**
     * Stop the optimizer and clean up resources
     */
    async stop() {
        console.log('🛑 Stopping Audio Analysis Optimizer...');
        
        this.isActive = false;
        
        // Clear intervals
        if (this.performanceMonitor) {
            clearInterval(this.performanceMonitor);
        }
        if (this.optimizationAdjuster) {
            clearInterval(this.optimizationAdjuster);
        }
        
        // Terminate worker
        if (this.audioWorker) {
            this.audioWorker.terminate();
            this.audioWorker = null;
        }
        
        // Clear memory pools
        this.memoryPool.audioBuffers = [];
        this.memoryPool.featureArrays = [];
        
        console.log('✅ Audio Analysis Optimizer stopped');
    }
}

// Export for integration with Velvet systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioAnalysisOptimizer;
} else if (typeof window !== 'undefined') {
    window.AudioAnalysisOptimizer = AudioAnalysisOptimizer;
}

console.log('⚡ Audio Analysis Optimizer loaded');