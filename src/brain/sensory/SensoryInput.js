// 📡 Velvet Sensory Input System
// Unified input processing from all Velvet sensors

/**
 * SensoryInput: Unified sensory data collection and processing
 * 
 * Combines all input sources into one coherent data stream:
 * - Visual: Screen OCR, window tracking, UI changes
 * - Auditory: Microphone, system audio, voice analysis
 * - Behavioral: Mouse/keyboard patterns, app usage, typing rhythms
 */

class SensoryInput {
    constructor() {
        console.log('📡 Initializing Velvet Sensory Input System...');
        
        // Sensory subsystems
        this.visualCortex = null;        // Screen OCR, window tracking
        this.auditoryCortex = null;      // Audio processing
        this.behavioralCortex = null;    // User behavior patterns
        
        // State tracking
        this.isActive = false;
        this.lastInputTime = 0;
        this.inputHistory = [];
        this.sensorStatus = {
            visual: false,
            auditory: false,
            behavioral: false
        };
        
        // Configuration
        this.config = {
            maxHistoryEntries: 100,      // Keep last 100 input snapshots
            inputTimeoutMs: 30000,       // Consider sensors stale after 30s
            correlationWindowMs: 5000,   // Correlate inputs within 5s window
            minimumConfidence: 0.3       // Minimum confidence for valid inputs
        };
        
        // Performance metrics
        this.metrics = {
            totalInputs: 0,
            visualInputs: 0,
            auditoryInputs: 0,
            behavioralInputs: 0,
            correlatedInputs: 0,
            averageConfidence: 0
        };
        
        console.log('📡 Sensory Input System core initialized');
    }

    /**
     * Initialize all sensory subsystems
     */
    async initialize() {
        try {
            console.log('📡 Starting sensory subsystem initialization...');
            
            // Initialize Visual Cortex (Screen OCR + Window Tracking)
            console.log('👁️ Initializing Visual Cortex...');
            await this.initializeVisualCortex();
            
            // Initialize Auditory Cortex (Audio Processing)
            console.log('🎧 Initializing Auditory Cortex...');
            await this.initializeAuditoryCortex();
            
            // Initialize Behavioral Cortex (User Behavior)
            console.log('⌨️ Initializing Behavioral Cortex...');
            await this.initializeBehavioralCortex();
            
            this.isActive = true;
            console.log('✅ All sensory systems online');
            
            // Start continuous input monitoring
            await this.beginInputMonitoring();
            
            return true;
            
        } catch (error) {
            console.error('❌ Sensory input initialization failed:', error);
            this.isActive = false;
            return false;
        }
    }

    /**
     * Gather all current inputs from all sensory systems
     * This is the main method called by the Velvet Brain
     */
    async gatherAllInputs() {
        const timestamp = Date.now();
        
        try {
            console.log('📡 Gathering all sensory inputs...');
            
            const inputs = {
                timestamp: timestamp,
                visual: null,
                auditory: null,
                behavioral: null,
                correlation: null,
                confidence: 0
            };
            
            // Gather from each sensory system in parallel
            const inputPromises = [];
            
            if (this.visualCortex && this.sensorStatus.visual) {
                inputPromises.push(
                    Promise.resolve().then(() => {
                        // Use the correct method from screen OCR monitor
                        const context = this.visualCortex.getCurrentContext?.() || null;
                        return {
                            text: this.visualCortex.currentScreenText || '',
                            context: context,
                            confidence: 0.8,
                            timestamp: Date.now(),
                            source: 'screen_ocr'
                        };
                    })
                        .then(data => ({ type: 'visual', data }))
                        .catch(error => ({ type: 'visual', data: null, error }))
                );
            }
            
            if (this.auditoryCortex && this.sensorStatus.auditory) {
                inputPromises.push(
                    Promise.resolve().then(() => {
                        // Use the correct method from audio environment monitor
                        const context = this.auditoryCortex.getCurrentAudioContext?.() || null;
                        return {
                            type: context?.current?.primaryType || 'unknown',
                            source: context?.current?.source || 'unknown',
                            confidence: context?.current?.confidence || 0.5,
                            details: context?.current?.details || {},
                            timestamp: Date.now(),
                            audioSource: 'audio_monitor'
                        };
                    })
                        .then(data => ({ type: 'auditory', data }))
                        .catch(error => ({ type: 'auditory', data: null, error }))
                );
            }
            
            if (this.behavioralCortex && this.sensorStatus.behavioral) {
                inputPromises.push(
                    Promise.resolve().then(() => {
                        // Placeholder behavioral data - to be connected to real behavior tracking
                        return {
                            activity: 'unknown',
                            pattern: 'baseline',
                            confidence: 0.3,
                            timestamp: Date.now(),
                            source: 'behavioral_placeholder'
                        };
                    })
                        .then(data => ({ type: 'behavioral', data }))
                        .catch(error => ({ type: 'behavioral', data: null, error }))
                );
            }
            
            // Wait for all inputs
            const results = await Promise.all(inputPromises);
            
            // Process results
            results.forEach(result => {
                if (result.data && !result.error) {
                    inputs[result.type] = result.data;
                    this.metrics[`${result.type}Inputs`]++;
                } else if (result.error) {
                    console.warn(`⚠️ ${result.type} input error:`, result.error);
                }
            });
            
            // Correlate inputs across modalities
            inputs.correlation = await this.correlateInputs(inputs);
            
            // Calculate overall confidence
            inputs.confidence = this.calculateInputConfidence(inputs);
            
            // Store in history
            this.inputHistory.push(inputs);
            if (this.inputHistory.length > this.config.maxHistoryEntries) {
                this.inputHistory.shift();
            }
            
            this.lastInputTime = timestamp;
            this.metrics.totalInputs++;
            
            console.log('📡 Input gathering complete:', {
                hasVisual: !!inputs.visual,
                hasAuditory: !!inputs.auditory,
                hasBehavioral: !!inputs.behavioral,
                confidence: inputs.confidence.toFixed(2),
                correlationScore: inputs.correlation?.score || 0
            });
            
            return inputs;
            
        } catch (error) {
            console.error('❌ Input gathering failed:', error);
            return {
                timestamp: timestamp,
                visual: null,
                auditory: null,
                behavioral: null,
                correlation: null,
                confidence: 0,
                error: error.message
            };
        }
    }

    /**
     * Correlate inputs across different sensory modalities
     * This helps create unified understanding of what's happening
     */
    async correlateInputs(inputs) {
        try {
            const correlation = {
                score: 0,
                patterns: [],
                confidence: 0,
                insights: []
            };
            
            const { visual, auditory, behavioral } = inputs;
            
            // Visual + Auditory correlation
            if (visual && auditory) {
                const vaCorrelation = await this.correlateVisualAuditory(visual, auditory);
                correlation.patterns.push(vaCorrelation);
                correlation.score += vaCorrelation.strength || 0;
            }
            
            // Visual + Behavioral correlation
            if (visual && behavioral) {
                const vbCorrelation = await this.correlateVisualBehavioral(visual, behavioral);
                correlation.patterns.push(vbCorrelation);
                correlation.score += vbCorrelation.strength || 0;
            }
            
            // Auditory + Behavioral correlation
            if (auditory && behavioral) {
                const abCorrelation = await this.correlateAuditoryBehavioral(auditory, behavioral);
                correlation.patterns.push(abCorrelation);
                correlation.score += abCorrelation.strength || 0;
            }
            
            // Normalize correlation score
            const numCorrelations = correlation.patterns.length;
            if (numCorrelations > 0) {
                correlation.score = correlation.score / numCorrelations;
                correlation.confidence = Math.min(1.0, correlation.score);
            }
            
            // Generate insights from correlations
            correlation.insights = this.generateCorrelationInsights(correlation.patterns);
            
            if (correlation.score > 0.5) {
                this.metrics.correlatedInputs++;
            }
            
            return correlation;
            
        } catch (error) {
            console.error('❌ Input correlation failed:', error);
            return { score: 0, patterns: [], confidence: 0, insights: [] };
        }
    }

    /**
     * Calculate overall confidence score for input set
     */
    calculateInputConfidence(inputs) {
        let totalConfidence = 0;
        let inputCount = 0;
        
        if (inputs.visual && inputs.visual.confidence) {
            totalConfidence += inputs.visual.confidence;
            inputCount++;
        }
        
        if (inputs.auditory && inputs.auditory.confidence) {
            totalConfidence += inputs.auditory.confidence;
            inputCount++;
        }
        
        if (inputs.behavioral && inputs.behavioral.confidence) {
            totalConfidence += inputs.behavioral.confidence;
            inputCount++;
        }
        
        // Factor in correlation confidence
        if (inputs.correlation && inputs.correlation.confidence) {
            totalConfidence += inputs.correlation.confidence * 0.5; // Weight correlation lower
            inputCount += 0.5;
        }
        
        const confidence = inputCount > 0 ? totalConfidence / inputCount : 0;
        
        // Update running average
        this.metrics.averageConfidence = (this.metrics.averageConfidence + confidence) / 2;
        
        return confidence;
    }

    /**
     * Get recent input history for pattern analysis
     */
    getRecentInputs(windowMs = 30000) {
        const cutoffTime = Date.now() - windowMs;
        return this.inputHistory.filter(input => input.timestamp >= cutoffTime);
    }

    /**
     * Begin continuous input monitoring
     */
    async beginInputMonitoring() {
        console.log('📡 Beginning continuous input monitoring...');
        
        // Each sensory system will monitor continuously and store current state
        // The brain will call gatherAllInputs() when it needs the current snapshot
        
        // Start any background monitoring processes here
        if (this.visualCortex) {
            await this.visualCortex.startContinuousMonitoring?.();
        }
        
        if (this.auditoryCortex) {
            await this.auditoryCortex.startContinuousMonitoring?.();
        }
        
        if (this.behavioralCortex) {
            await this.behavioralCortex.startContinuousMonitoring?.();
        }
    }

    // Sensory subsystem initialization (to be connected to existing systems)
    async initializeVisualCortex() {
        try {
            // Connect to existing screen OCR and screen intelligence systems
            if (typeof window !== 'undefined') {
                // In browser - connect to existing systems
                if (window.screenOCRMonitor) {
                    console.log('👁️ Connecting to existing Screen OCR Monitor...');
                    this.visualCortex = window.screenOCRMonitor;
                    this.sensorStatus.visual = true;
                } else {
                    console.warn('⚠️ Screen OCR Monitor not available');
                }
            }
            
            console.log('👁️ Visual Cortex initialization complete');
            
        } catch (error) {
            console.error('❌ Visual Cortex initialization failed:', error);
            this.sensorStatus.visual = false;
        }
    }

    async initializeAuditoryCortex() {
        try {
            // Connect to existing audio monitoring systems
            if (typeof window !== 'undefined') {
                // In browser - connect to existing systems
                if (window.audioEnvironmentMonitor) {
                    console.log('🎧 Connecting to existing Audio Environment Monitor...');
                    this.auditoryCortex = window.audioEnvironmentMonitor;
                    this.sensorStatus.auditory = true;
                } else {
                    console.warn('⚠️ Audio Environment Monitor not available');
                }
            }
            
            console.log('🎧 Auditory Cortex initialization complete');
            
        } catch (error) {
            console.error('❌ Auditory Cortex initialization failed:', error);
            this.sensorStatus.auditory = false;
        }
    }

    async initializeBehavioralCortex() {
        try {
            // Connect to existing screen intelligence and behavior tracking
            if (typeof window !== 'undefined') {
                // In browser - connect to existing systems
                // This would connect to screen intelligence, task monitoring, etc.
                console.log('⌨️ Behavioral tracking placeholder - to be connected');
                this.sensorStatus.behavioral = true; // Placeholder
            }
            
            console.log('⌨️ Behavioral Cortex initialization complete');
            
        } catch (error) {
            console.error('❌ Behavioral Cortex initialization failed:', error);
            this.sensorStatus.behavioral = false;
        }
    }

    // Correlation methods (placeholder implementations)
    async correlateVisualAuditory(visual, auditory) {
        // Example: If screen shows coding and audio is focus music
        if (visual.context === 'code' && auditory.context === 'focus_music') {
            return {
                type: 'visual_auditory',
                pattern: 'focused_coding_session', 
                strength: 0.8,
                insight: 'User is in focused coding mode with appropriate background music'
            };
        }
        
        return { type: 'visual_auditory', pattern: 'none', strength: 0 };
    }

    async correlateVisualBehavioral(visual, behavioral) {
        // Example: Screen showing task + rapid app switching = task avoidance
        if (visual.context === 'task' && behavioral.pattern === 'rapid_switching') {
            return {
                type: 'visual_behavioral',
                pattern: 'task_avoidance',
                strength: 0.9,
                insight: 'User may be avoiding or stuck on current task'
            };
        }
        
        return { type: 'visual_behavioral', pattern: 'none', strength: 0 };
    }

    async correlateAuditoryBehavioral(auditory, behavioral) {
        // Example: Meeting audio + note-taking behavior = active participation
        if (auditory.context === 'meeting' && behavioral.pattern === 'note_taking') {
            return {
                type: 'auditory_behavioral',
                pattern: 'active_meeting_participation',
                strength: 0.7,
                insight: 'User is actively engaged in meeting'
            };
        }
        
        return { type: 'auditory_behavioral', pattern: 'none', strength: 0 };
    }

    generateCorrelationInsights(patterns) {
        const insights = [];
        
        patterns.forEach(pattern => {
            if (pattern.strength > 0.5 && pattern.insight) {
                insights.push({
                    type: pattern.type,
                    insight: pattern.insight,
                    confidence: pattern.strength
                });
            }
        });
        
        return insights;
    }

    // Utility methods
    getSensorStatus() {
        return { ...this.sensorStatus };
    }

    getMetrics() {
        return { ...this.metrics };
    }

    isHealthy() {
        const now = Date.now();
        const timeSinceLastInput = now - this.lastInputTime;
        const hasRecentInput = timeSinceLastInput < this.config.inputTimeoutMs;
        const hasActiveSensors = Object.values(this.sensorStatus).some(status => status);
        
        return this.isActive && hasRecentInput && hasActiveSensors;
    }

    async shutdown() {
        console.log('📡 Shutting down Sensory Input System...');
        
        this.isActive = false;
        
        // Shutdown subsystems
        if (this.visualCortex?.shutdown) {
            await this.visualCortex.shutdown();
        }
        
        if (this.auditoryCortex?.shutdown) {
            await this.auditoryCortex.shutdown();
        }
        
        if (this.behavioralCortex?.shutdown) {
            await this.behavioralCortex.shutdown();
        }
        
        console.log('📡 Sensory Input System shutdown complete');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SensoryInput;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.SensoryInput = SensoryInput;
}

console.log('📡 SensoryInput class definition loaded');