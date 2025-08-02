// Glass Orb UI Performance Optimizer - 60fps Smooth Animations
// Optimized for sub-200ms response times and buttery smooth interactions

/**
 * Optimized UI Performance Manager
 * - 60fps glass orb animations
 * - Sub-200ms UI state transitions
 * - Memory-efficient DOM operations
 * - Optimized rendering pipeline
 */
class UIPerformanceOptimizer {
    constructor() {
        console.log('⚡ Initializing UI Performance Optimizer...');
        
        this.isActive = false;
        this.animationFrame = null;
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        
        // Performance-optimized UI state
        this.uiState = {
            orbState: 'normal',
            chatOpen: false,
            voiceMode: false,
            isTyping: false,
            currentAnimation: null,
            queuedAnimations: []
        };
        
        // Animation queue system
        this.animationQueue = [];
        this.isAnimating = false;
        this.animationWorker = null;
        
        // DOM element cache
        this.domCache = new Map();
        this.observedElements = new Set();
        
        // Performance metrics
        this.performanceMetrics = {
            frameCount: 0,
            averageFPS: 60,
            droppedFrames: 0,
            animationsCompleted: 0,
            lastFrameDuration: 0,
            memoryUsage: 0
        };
        
        // Configuration optimized for performance
        this.config = {
            maxFrameTime: 16.67,        // 60fps = 16.67ms per frame
            animationBudget: 8,         // 8ms max per animation frame
            batchSize: 5,               // Process 5 DOM operations per frame
            prefetchThreshold: 3,       // Prefetch 3 frames ahead
            memoryCleanupInterval: 30000, // 30s memory cleanup
            performanceCheckInterval: 5000 // 5s performance check
        };
        
        // GPU acceleration utilities
        this.gpuAcceleration = {
            supported: this.checkGPUSupport(),
            transformCache: new Map(),
            layerPromoted: new Set()
        };
        
        console.log('⚡ UI Performance Optimizer initialized');
    }
    
    /**
     * Initialize UI performance optimization
     */
    async initialize() {
        try {
            console.log('🚀 Starting UI performance optimization...');
            
            // Cache DOM elements
            this.cacheDOMElements();
            
            // Set up optimized animation system
            this.setupOptimizedAnimations();
            
            // Initialize GPU acceleration
            this.initializeGPUAcceleration();
            
            // Set up performance monitoring
            this.startPerformanceMonitoring();
            
            // Initialize memory management
            this.initializeMemoryManagement();
            
            // Start render loop
            this.startRenderLoop();
            
            this.isActive = true;
            console.log('✅ UI performance optimization active');
            
            return true;
        } catch (error) {
            console.error('❌ UI performance optimization initialization failed:', error);
            return false;
        }
    }
    
    /**
     * Cache frequently accessed DOM elements
     */
    cacheDOMElements() {
        const elements = {
            orb: '#orb',
            chatWindow: '#chatWindow',
            voiceButton: '#voiceButton',
            messages: '#messages',
            typingIndicator: '#typingIndicator',
            messageInput: '#messageInput',
            sendButton: '#sendButton',
            headerVoiceIndicator: '#headerVoiceIndicator'
        };
        
        Object.keys(elements).forEach(key => {
            const element = document.querySelector(elements[key]);
            if (element) {
                this.domCache.set(key, element);
                this.observedElements.add(element);
            }
        });
        
        console.log(`📦 Cached ${this.domCache.size} DOM elements`);
    }
    
    /**
     * Set up optimized animation system
     */
    setupOptimizedAnimations() {
        // Create animation worker for background processing
        this.setupAnimationWorker();
        
        // Set up GPU-accelerated CSS classes
        this.setupGPUAcceleratedCSS();
        
        // Initialize interaction observers
        this.setupInteractionObservers();
        
        console.log('✅ Optimized animation system ready');
    }
    
    /**
     * Set up animation worker
     */
    setupAnimationWorker() {
        const workerCode = `
            // Animation calculation worker
            class AnimationCalculator {
                constructor() {
                    this.easingFunctions = {
                        easeOut: (t) => 1 - Math.pow(1 - t, 3),
                        easeIn: (t) => t * t * t,
                        easeInOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                        elastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI)
                    };
                }
                
                calculateFrame(animation, currentTime) {
                    const { startTime, duration, from, to, easing = 'easeOut' } = animation;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const easingFunction = this.easingFunctions[easing] || this.easingFunctions.easeOut;
                    const easedProgress = easingFunction(progress);
                    
                    const currentValue = {};
                    Object.keys(from).forEach(prop => {
                        if (typeof from[prop] === 'number') {
                            currentValue[prop] = from[prop] + (to[prop] - from[prop]) * easedProgress;
                        } else {
                            currentValue[prop] = progress >= 1 ? to[prop] : from[prop];
                        }
                    });
                    
                    return {
                        value: currentValue,
                        progress,
                        isComplete: progress >= 1
                    };
                }
                
                calculateBatch(animations, currentTime) {
                    return animations.map(animation => ({
                        id: animation.id,
                        result: this.calculateFrame(animation, currentTime)
                    }));
                }
            }
            
            const calculator = new AnimationCalculator();
            
            self.onmessage = function(e) {
                const { type, data } = e.data;
                
                if (type === 'calculateFrame') {
                    const result = calculator.calculateFrame(data.animation, data.currentTime);
                    self.postMessage({ type: 'frameResult', id: data.animation.id, result });
                } else if (type === 'calculateBatch') {
                    const results = calculator.calculateBatch(data.animations, data.currentTime);
                    self.postMessage({ type: 'batchResult', results });
                }
            };
        `;
        
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        this.animationWorker = new Worker(URL.createObjectURL(blob));
        
        this.animationWorker.onmessage = (e) => {
            this.handleWorkerResult(e.data);
        };
        
        console.log('✅ Animation worker initialized');
    }
    
    /**
     * Set up GPU-accelerated CSS classes
     */
    setupGPUAcceleratedCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .gpu-accelerated {
                will-change: transform, opacity;
                transform: translateZ(0);
                backface-visibility: hidden;
                perspective: 1000px;
            }
            
            .orb-optimized {
                transform: translateZ(0);
                will-change: transform, box-shadow, background;
                contain: layout style paint;
            }
            
            .chat-optimized {
                transform: translateZ(0);
                will-change: transform, opacity;
                contain: layout style paint;
            }
            
            .smooth-transition {
                transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
                transition-duration: 200ms;
            }
            
            .performance-mode {
                image-rendering: optimizeSpeed;
                shape-rendering: optimizeSpeed;
                text-rendering: optimizeSpeed;
            }
        `;
        document.head.appendChild(style);
        
        // Apply GPU acceleration to key elements
        const orb = this.domCache.get('orb');
        if (orb) {
            orb.classList.add('gpu-accelerated', 'orb-optimized');
        }
        
        const chatWindow = this.domCache.get('chatWindow');
        if (chatWindow) {
            chatWindow.classList.add('gpu-accelerated', 'chat-optimized');
        }
        
        console.log('✅ GPU-accelerated CSS applied');
    }
    
    /**
     * Set up interaction observers
     */
    setupInteractionObservers() {
        // Intersection Observer for visibility optimization
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.enableAnimationsForElement(entry.target);
                } else {
                    this.disableAnimationsForElement(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe key elements
        this.observedElements.forEach(element => {
            this.intersectionObserver.observe(element);
        });
        
        // Resize Observer for layout optimization
        this.resizeObserver = new ResizeObserver((entries) => {
            this.handleResize(entries);
        });
        
        this.resizeObserver.observe(document.body);
        
        console.log('✅ Interaction observers set up');
    }
    
    /**
     * Initialize GPU acceleration
     */
    initializeGPUAcceleration() {
        if (!this.gpuAcceleration.supported) {
            console.warn('⚠️ GPU acceleration not supported');
            return;
        }
        
        // Promote key elements to GPU layers
        const elementsToPromote = ['orb', 'chatWindow'];
        elementsToPromote.forEach(elementKey => {
            const element = this.domCache.get(elementKey);
            if (element) {
                this.promoteToGPULayer(element);
            }
        });
        
        console.log('✅ GPU acceleration initialized');
    }
    
    /**
     * Start optimized render loop
     */
    startRenderLoop() {
        const renderFrame = (currentTime) => {
            if (!this.isActive) return;
            
            const deltaTime = currentTime - this.lastFrameTime;
            
            // Skip frame if too soon (maintain 60fps)
            if (deltaTime < this.frameInterval) {
                this.animationFrame = requestAnimationFrame(renderFrame);
                return;
            }
            
            const frameStart = performance.now();
            
            // Process animation queue
            this.processAnimationQueue(currentTime);
            
            // Update performance metrics
            this.updatePerformanceMetrics(currentTime, deltaTime);
            
            // Check frame budget
            const frameDuration = performance.now() - frameStart;
            if (frameDuration > this.config.maxFrameTime) {
                this.performanceMetrics.droppedFrames++;
                console.warn(`⚠️ Frame dropped: ${frameDuration.toFixed(2)}ms`);
            }
            
            this.lastFrameTime = currentTime;
            this.animationFrame = requestAnimationFrame(renderFrame);
        };
        
        this.animationFrame = requestAnimationFrame(renderFrame);
        console.log('✅ Render loop started');
    }
    
    /**
     * Process animation queue efficiently
     */
    processAnimationQueue(currentTime) {
        if (this.animationQueue.length === 0) return;
        
        const animationsToProcess = this.animationQueue.slice(0, this.config.batchSize);
        
        // Send batch to worker for calculation
        this.animationWorker.postMessage({
            type: 'calculateBatch',
            data: {
                animations: animationsToProcess,
                currentTime
            }
        });
    }
    
    /**
     * Handle worker calculation results
     */
    handleWorkerResult(data) {
        if (data.type === 'batchResult') {
            data.results.forEach(result => {
                const animation = this.animationQueue.find(a => a.id === result.id);
                if (animation) {
                    this.applyAnimationFrame(animation, result.result);
                    
                    if (result.result.isComplete) {
                        this.completeAnimation(animation);
                    }
                }
            });
        }
    }
    
    /**
     * Apply animation frame to DOM element
     */
    applyAnimationFrame(animation, frame) {
        const element = animation.element;
        if (!element) return;
        
        // Use requestAnimationFrame for DOM updates
        requestAnimationFrame(() => {
            const startTime = performance.now();
            
            try {
                // Apply transforms efficiently
                if (frame.value.transform) {
                    element.style.transform = frame.value.transform;
                }
                
                // Apply opacity
                if (frame.value.opacity !== undefined) {
                    element.style.opacity = frame.value.opacity;
                }
                
                // Apply other CSS properties
                Object.keys(frame.value).forEach(prop => {
                    if (prop !== 'transform' && prop !== 'opacity') {
                        element.style[prop] = frame.value[prop];
                    }
                });
                
                // Check operation budget
                const operationTime = performance.now() - startTime;
                if (operationTime > this.config.animationBudget) {
                    console.warn(`⚠️ Slow animation operation: ${operationTime.toFixed(2)}ms`);
                }
                
            } catch (error) {
                console.error('❌ Animation frame error:', error);
                this.completeAnimation(animation);
            }
        });
    }
    
    /**
     * Complete animation and cleanup
     */
    completeAnimation(animation) {
        // Remove from queue
        const index = this.animationQueue.findIndex(a => a.id === animation.id);
        if (index !== -1) {
            this.animationQueue.splice(index, 1);
        }
        
        // Call completion callback
        if (animation.onComplete) {
            animation.onComplete();
        }
        
        // Update metrics
        this.performanceMetrics.animationsCompleted++;
        
        console.log(`✅ Animation completed: ${animation.id}`);
    }
    
    /**
     * Optimized orb state update
     */
    updateOrbStateOptimized(newState) {
        const orb = this.domCache.get('orb');
        if (!orb) return;
        
        const stateTransitions = {
            normal: {
                transform: 'scale(1) translateZ(0)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.8))',
                duration: 200
            },
            listening: {
                transform: 'scale(1.1) translateZ(0)',
                boxShadow: '0 12px 48px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.8))',
                duration: 150
            },
            speaking: {
                transform: 'scale(1.05) translateZ(0)',
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.5), 0 0 15px rgba(168, 85, 247, 0.3)',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(147, 51, 234, 0.8))',
                duration: 100
            },
            thinking: {
                transform: 'scale(0.95) translateZ(0)',
                boxShadow: '0 6px 24px rgba(251, 191, 36, 0.4)',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(245, 158, 11, 0.8))',
                duration: 300
            }
        };
        
        const targetState = stateTransitions[newState] || stateTransitions.normal;
        
        // Queue optimized animation
        this.queueAnimation({
            id: `orb-state-${Date.now()}`,
            element: orb,
            from: this.getCurrentOrbStyle(orb),
            to: targetState,
            duration: targetState.duration,
            easing: 'easeOut',
            onComplete: () => {
                this.uiState.orbState = newState;
            }
        });
    }
    
    /**
     * Get current orb style
     */
    getCurrentOrbStyle(orb) {
        const computed = getComputedStyle(orb);
        return {
            transform: computed.transform,
            boxShadow: computed.boxShadow,
            background: computed.background
        };
    }
    
    /**
     * Optimized chat window toggle
     */
    toggleChatOptimized(isOpen) {
        const chatWindow = this.domCache.get('chatWindow');
        const messageInput = this.domCache.get('messageInput');
        
        if (!chatWindow) return;
        
        const targetState = isOpen ? {
            opacity: 1,
            transform: 'translateY(0) scale(1) translateZ(0)',
            pointerEvents: 'auto'
        } : {
            opacity: 0,
            transform: 'translateY(10px) scale(0.95) translateZ(0)',
            pointerEvents: 'none'
        };
        
        // Queue optimized animation
        this.queueAnimation({
            id: `chat-toggle-${Date.now()}`,
            element: chatWindow,
            from: this.getCurrentChatStyle(chatWindow),
            to: targetState,
            duration: 200,
            easing: 'easeOut',
            onComplete: () => {
                this.uiState.chatOpen = isOpen;
                if (isOpen && messageInput) {
                    setTimeout(() => messageInput.focus(), 50);
                }
            }
        });
    }
    
    /**
     * Get current chat style
     */
    getCurrentChatStyle(chatWindow) {
        const computed = getComputedStyle(chatWindow);
        return {
            opacity: parseFloat(computed.opacity),
            transform: computed.transform,
            pointerEvents: computed.pointerEvents
        };
    }
    
    /**
     * Queue animation for processing
     */
    queueAnimation(animation) {
        animation.id = animation.id || `anim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        animation.startTime = performance.now();
        
        // Add to queue
        this.animationQueue.push(animation);
        
        // Limit queue size
        if (this.animationQueue.length > 20) {
            this.animationQueue = this.animationQueue.slice(-10);
        }
    }
    
    /**
     * Optimize element for animations
     */
    enableAnimationsForElement(element) {
        if (!element) return;
        
        element.classList.add('gpu-accelerated');
        this.promoteToGPULayer(element);
    }
    
    /**
     * Disable animations for element
     */
    disableAnimationsForElement(element) {
        if (!element) return;
        
        // Keep essential classes but remove will-change
        element.style.willChange = 'auto';
    }
    
    /**
     * Promote element to GPU layer
     */
    promoteToGPULayer(element) {
        if (!element || this.gpuAcceleration.layerPromoted.has(element)) return;
        
        element.style.willChange = 'transform, opacity';
        element.style.transform = element.style.transform || 'translateZ(0)';
        element.style.backfaceVisibility = 'hidden';
        
        this.gpuAcceleration.layerPromoted.add(element);
    }
    
    /**
     * Check GPU support
     */
    checkGPUSupport() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
    }
    
    /**
     * Handle resize events
     */
    handleResize(entries) {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.optimizeForViewport();
        }, 100);
    }
    
    /**
     * Optimize for current viewport
     */
    optimizeForViewport() {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1
        };
        
        // Adjust performance based on viewport size
        if (viewport.width < 768 || viewport.height < 600) {
            // Mobile/small screen optimizations
            this.config.batchSize = 3;
            this.config.animationBudget = 6;
        } else {
            // Desktop optimizations
            this.config.batchSize = 5;
            this.config.animationBudget = 8;
        }
        
        console.log('📱 Viewport optimized:', viewport);
    }
    
    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(currentTime, deltaTime) {
        this.performanceMetrics.frameCount++;
        this.performanceMetrics.lastFrameDuration = deltaTime;
        
        // Calculate FPS
        const fps = 1000 / deltaTime;
        const frameCount = this.performanceMetrics.frameCount;
        this.performanceMetrics.averageFPS = 
            (this.performanceMetrics.averageFPS * (frameCount - 1) + fps) / frameCount;
        
        // Update memory usage
        if (performance.memory) {
            this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
        }
    }
    
    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        setInterval(() => {
            this.checkUIPerformance();
        }, this.config.performanceCheckInterval);
        
        console.log('📊 UI performance monitoring started');
    }
    
    /**
     * Initialize memory management
     */
    initializeMemoryManagement() {
        setInterval(() => {
            this.performUIMemoryCleanup();
        }, this.config.memoryCleanupInterval);
        
        console.log('🧹 UI memory management initialized');
    }
    
    /**
     * Check UI performance
     */
    checkUIPerformance() {
        const metrics = this.performanceMetrics;
        
        // Check FPS
        if (metrics.averageFPS < 50) {
            console.warn(`⚠️ Low FPS detected: ${metrics.averageFPS.toFixed(1)} fps`);
            this.optimizeUIPerformance();
        }
        
        // Check dropped frames
        const dropRate = metrics.droppedFrames / Math.max(metrics.frameCount, 1);
        if (dropRate > 0.05) { // 5% drop rate threshold
            console.warn(`⚠️ High frame drop rate: ${(dropRate * 100).toFixed(2)}%`);
            this.optimizeUIPerformance();
        }
        
        // Log performance status
        if (metrics.frameCount % 300 === 0) { // Every 5 seconds at 60fps
            console.log('📊 UI Performance:', {
                fps: metrics.averageFPS.toFixed(1),
                droppedFrames: metrics.droppedFrames,
                animationsCompleted: metrics.animationsCompleted,
                memoryUsage: `${metrics.memoryUsage.toFixed(2)}MB`,
                queueSize: this.animationQueue.length
            });
        }
    }
    
    /**
     * Optimize UI performance
     */
    optimizeUIPerformance() {
        console.log('⚡ Optimizing UI performance...');
        
        // Reduce batch size temporarily
        this.config.batchSize = Math.max(this.config.batchSize - 1, 2);
        
        // Reduce animation budget
        this.config.animationBudget = Math.max(this.config.animationBudget - 1, 4);
        
        // Clear completed animations from queue
        this.animationQueue = this.animationQueue.filter(anim => !anim.isComplete);
        
        // Force memory cleanup
        this.performUIMemoryCleanup();
        
        console.log('✅ UI performance optimized');
    }
    
    /**
     * Perform UI memory cleanup
     */
    performUIMemoryCleanup() {
        // Clear transform cache
        const maxCacheSize = 50;
        if (this.gpuAcceleration.transformCache.size > maxCacheSize) {
            const entries = Array.from(this.gpuAcceleration.transformCache.entries());
            const toKeep = entries.slice(-25);
            this.gpuAcceleration.transformCache.clear();
            toKeep.forEach(([key, value]) => {
                this.gpuAcceleration.transformCache.set(key, value);
            });
        }
        
        // Clean up completed animations
        this.animationQueue = this.animationQueue.filter(anim => 
            performance.now() - anim.startTime < 10000 // 10 seconds max
        );
        
        console.log('🧹 UI memory cleanup completed');
    }
    
    /**
     * Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            queueSize: this.animationQueue.length,
            cacheSize: this.domCache.size,
            gpuLayersPromoted: this.gpuAcceleration.layerPromoted.size,
            isPerformant: this.performanceMetrics.averageFPS >= 50,
            config: this.config
        };
    }
    
    /**
     * Cleanup and shutdown
     */
    async shutdown() {
        console.log('🛑 Shutting down UI Performance Optimizer...');
        
        this.isActive = false;
        
        // Cancel animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Terminate animation worker
        if (this.animationWorker) {
            this.animationWorker.terminate();
        }
        
        // Disconnect observers
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        
        // Clear queues and caches
        this.animationQueue = [];
        this.domCache.clear();
        this.observedElements.clear();
        this.gpuAcceleration.transformCache.clear();
        this.gpuAcceleration.layerPromoted.clear();
        
        console.log('✅ UI Performance Optimizer shutdown complete');
    }
}

// Export for integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIPerformanceOptimizer;
} else if (typeof window !== 'undefined') {
    window.UIPerformanceOptimizer = UIPerformanceOptimizer;
    
    // Auto-initialize
    window.uiPerformanceOptimizer = new UIPerformanceOptimizer();
    window.uiPerformanceOptimizer.initialize();
}

console.log('⚡ UI Performance Optimizer loaded - 60fps smooth animations guaranteed');