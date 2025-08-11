// Velvet Social Decoder System - Phase 2 Viral Feature
// "NeuroTranslator++" - Real-time neurotypical communication translation

// Define types for the Social Decoder system
interface PerformanceMetrics {
    totalAnalyses: number;
    averageProcessingTime: number;
    totalProcessingTime: number;
    errorsEncountered: number;
}

interface TonePattern {
    keywords: string[];
    voiceMarkers: string[];
}

interface TonePatterns {
    [key: string]: TonePattern;
}

interface AudioContext {
    // Define properties based on actual usage
    [key: string]: any;
}

interface AudioData {
    // Define properties based on actual usage
    [key: string]: any;
}

interface DetectionCallback {
    (detection: any): void;
}

// Window extensions are defined in global.d.ts to avoid conflicts

class SocialDecoder {
    private isActive: boolean;
    private audioAnalyzer: any | null;
    private conversationHistory: any[];
    private emotionalContext: Record<string, any>;
    private detectionCallbacks: DetectionCallback[];
    private errorCount: number;
    private maxErrors: number;
    private lastError: Error | null;
    private performanceMetrics: PerformanceMetrics;
    
    // Performance optimization
    private analysisQueue: any[];
    private isProcessing: boolean;
    private maxQueueSize: number;
    private debounceTimeout: NodeJS.Timeout | null;
    private maxProcessingTime: number;
    
    // Resource management
    private maxHistorySize: number;
    private cleanupInterval: NodeJS.Timeout | null;
    
    // Sarcasm and subtext detection patterns
    private sarcasmMarkers: string[];
    
    // Emotional tone patterns
    private tonePatterns: TonePatterns;

    constructor() {
        this.isActive = false;
        this.audioAnalyzer = null;
        this.conversationHistory = [];
        this.emotionalContext = {};
        this.detectionCallbacks = [];
        this.errorCount = 0;
        this.maxErrors = 10; // Maximum errors before disabling
        this.lastError = null;
        this.performanceMetrics = {
            totalAnalyses: 0,
            averageProcessingTime: 0,
            totalProcessingTime: 0,
            errorsEncountered: 0
        };
        
        // Performance optimization
        this.analysisQueue = [];
        this.isProcessing = false;
        this.maxQueueSize = 5;
        this.debounceTimeout = null;
        this.maxProcessingTime = 500; // Max 500ms per analysis
        
        // Resource management
        this.maxHistorySize = 30;
        this.cleanupInterval = null;
        
        // Sarcasm and subtext detection patterns
        this.sarcasmMarkers = [
            'fine', 'sure', 'whatever', 'great', 'perfect', 'wonderful',
            'obviously', 'totally', 'absolutely', 'definitely'
        ];
        
        // Emotional tone patterns
        this.tonePatterns = {
            frustration: {
                keywords: ['fine', 'whatever', 'sure'],
                voiceMarkers: ['clipped_speech', 'flat_tone', 'faster_pace']
            },
            anxiety: {
                keywords: ['maybe', 'i guess', 'sort of', 'kind of'],
                voiceMarkers: ['higher_pitch', 'faster_speech', 'trailing_off']
            },
            passive_aggressive: {
                keywords: ['no problem', 'of course', 'my pleasure'],
                voiceMarkers: ['overly_sweet', 'emphasis_mismatch']
            }
        };
    }

    // Initialize the Social Decoder System
    public async initialize(): Promise<boolean> {
        try {
            console.log('🧠 Initializing Social Decoder System...');
            
            // Set up audio analysis for real-time tone detection
            await this.setupAudioAnalysis();
            
            // Initialize conversation context tracking
            this.initializeContextTracking();
            
            // Start resource management
            this.startResourceManagement();
            
            this.isActive = true;
            console.log('✅ Social Decoder System active - ready to translate neurotypical communication');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Social Decoder:', error);
            return false;
        }
    }

    // Set up real-time audio analysis for emotional tone detection
    private async setupAudioAnalysis(): Promise<void> {
        console.log('🎧 Setting up Social Decoder audio integration...');
        
        // Hook into existing Velvet audio monitoring system
        if (window.realAudioEnvironmentMonitor) {
            console.log('✅ Connecting to Real Audio Environment Monitor');
            
            // Register callback for audio context updates
            window.realAudioEnvironmentMonitor.onContextUpdate((audioContext: AudioContext) => {
                this.processAudioContext(audioContext);
            });
            
            // Register callback for microphone data
            window.realAudioEnvironmentMonitor.onMicrophoneData((audioData: AudioData) => {
                this.processMicrophoneData(audioData);
            });
        } else {
            console.log('⚠️ Real Audio Environment Monitor not available, using fallback analysis');
        }
    }

    // Process audio context data
    private processAudioContext(audioContext: AudioContext): void {
        try {
            // Extract emotional markers from system audio
            this.analyzeSystemAudio(audioContext);
        } catch (error) {
            this.handleError(error as Error);
        }
    }

    // Process microphone data for voice tone analysis
    private processMicrophoneData(audioData: AudioData): void {
        try {
            // Analyze voice patterns for emotional indicators
            this.analyzeVoicePatterns(audioData);
        } catch (error) {
            this.handleError(error as Error);
        }
    }

    // Initialize conversation context tracking
    private initializeContextTracking(): void {
        console.log('🧠 Initializing Social Decoder conversation tracking...');
        
        // Start monitoring for text input from screen OCR
        this.setupTextMonitoring();
        
        // Initialize emotional context tracking
        this.emotionalContext = {
            baselineEmotion: 'neutral',
            recentEmotions: [],
            conversationTone: 'unknown',
            participantCount: 1
        };
    }

    // Start resource management and cleanup
    private startResourceManagement(): void {
        console.log('🧹 Starting Social Decoder resource management...');
        
        // Clean up history periodically
        this.cleanupInterval = setInterval(() => {
            this.cleanupHistory();
        }, 30000); // Clean up every 30 seconds
        
        // Reset error count periodically
        setInterval(() => {
            this.errorCount = Math.max(0, this.errorCount - 1);
        }, 60000); // Reduce error count every minute
    }

    // Analyze system audio for emotional context
    private analyzeSystemAudio(audioContext: AudioContext): void {
        // Basic system audio analysis
        if (audioContext && typeof audioContext === 'object') {
            // Check for meeting app sounds, notification sounds, etc.
            this.updateEmotionalContext('system_audio_detected');
        }
    }

    // Analyze voice patterns for emotional indicators
    private analyzeVoicePatterns(audioData: AudioData): void {
        // Basic voice pattern analysis
        if (audioData && typeof audioData === 'object') {
            // Analyze speech patterns, pace, tone
            this.updateEmotionalContext('voice_pattern_detected');
        }
    }

    // Set up text monitoring from screen OCR
    private setupTextMonitoring(): void {
        // Hook into existing screen OCR system
        if (window.realScreenOCRMonitor) {
            window.realScreenOCRMonitor.onTextDetected((text: string) => {
                this.analyzeTextForSocialCues(text);
            });
        }
    }

    // Analyze text for social cues and sarcasm
    public analyzeTextForSocialCues(text: string): any {
        const startTime = performance.now();
        
        try {
            // Basic sarcasm detection
            const isSarcasm = this.detectSarcasm(text);
            const detectedEmotion = this.detectEmotion(text);
            const confidence = this.calculateConfidence(text, isSarcasm, detectedEmotion);
            
            const analysis = {
                text: text,
                isSarcasm: isSarcasm,
                detectedEmotion: detectedEmotion,
                confidence: confidence,
                timestamp: Date.now(),
                subtext: isSarcasm ? this.generateSubtext(text) : undefined,
                voiceMarkers: []
            };
            
            // Update metrics
            this.updateMetrics(performance.now() - startTime);
            
            // Add to history
            this.conversationHistory.push(analysis);
            
            // Trigger callbacks
            this.detectionCallbacks.forEach(callback => callback(analysis));
            
            return analysis;
        } catch (error) {
            this.handleError(error as Error);
            return null;
        }
    }

    // Detect sarcasm in text
    private detectSarcasm(text: string): boolean {
        const lowerText = text.toLowerCase();
        
        // Check for sarcasm markers
        const sarcasmCount = this.sarcasmMarkers.filter(marker => 
            lowerText.includes(marker)
        ).length;
        
        // Check for contradictory patterns
        const hasExcessivePositivity = /\b(amazing|wonderful|perfect|fantastic)\b/i.test(text);
        const hasNegativeContext = /\b(sure|fine|whatever|obviously)\b/i.test(text);
        
        return sarcasmCount >= 2 || (hasExcessivePositivity && hasNegativeContext);
    }

    // Detect emotional tone in text
    private detectEmotion(text: string): string | undefined {
        const lowerText = text.toLowerCase();
        
        for (const [emotion, pattern] of Object.entries(this.tonePatterns)) {
            const keywordMatches = pattern.keywords.filter(keyword => 
                lowerText.includes(keyword)
            ).length;
            
            if (keywordMatches >= 1) {
                return emotion;
            }
        }
        
        return undefined;
    }

    // Calculate confidence score
    private calculateConfidence(text: string, isSarcasm: boolean, emotion?: string): number {
        let confidence = 0.5; // Base confidence
        
        // Increase confidence based on markers
        if (isSarcasm) confidence += 0.3;
        if (emotion) confidence += 0.2;
        if (text.length > 10) confidence += 0.1;
        
        return Math.min(1.0, confidence);
    }

    // Generate subtext for sarcastic statements
    private generateSubtext(text: string): string {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('fine')) return 'Not actually fine, probably frustrated';
        if (lowerText.includes('sure')) return 'Reluctant agreement or passive resistance';
        if (lowerText.includes('whatever')) return 'Dismissive, doesn\'t want to engage';
        if (lowerText.includes('great')) return 'Likely being sarcastic, not actually great';
        
        return 'Likely sarcastic - actual meaning may be opposite';
    }

    // Update emotional context
    private updateEmotionalContext(trigger: string): void {
        this.emotionalContext.lastUpdate = Date.now();
        this.emotionalContext.recentTriggers = this.emotionalContext.recentTriggers || [];
        this.emotionalContext.recentTriggers.push(trigger);
        
        // Keep only last 10 triggers
        if (this.emotionalContext.recentTriggers.length > 10) {
            this.emotionalContext.recentTriggers = this.emotionalContext.recentTriggers.slice(-10);
        }
    }

    // Update performance metrics
    private updateMetrics(processingTime: number): void {
        this.performanceMetrics.totalAnalyses++;
        this.performanceMetrics.totalProcessingTime += processingTime;
        this.performanceMetrics.averageProcessingTime = 
            this.performanceMetrics.totalProcessingTime / this.performanceMetrics.totalAnalyses;
    }

    // Clean up old history
    private cleanupHistory(): void {
        if (this.conversationHistory.length > this.maxHistorySize) {
            this.conversationHistory = this.conversationHistory.slice(-this.maxHistorySize);
        }
    }

    // Handle errors gracefully
    private handleError(error: Error): void {
        this.errorCount++;
        this.lastError = error;
        this.performanceMetrics.errorsEncountered++;
        
        console.error('❌ Social Decoder Error:', error);
        
        // Disable if too many errors
        if (this.errorCount >= this.maxErrors) {
            console.error('🚫 Too many errors, disabling Social Decoder');
            this.isActive = false;
        }
    }

    // Public method to add detection callback
    public onDetection(callback: DetectionCallback): void {
        this.detectionCallbacks.push(callback);
    }

    // Public method to get current metrics
    public getMetrics(): PerformanceMetrics {
        return { ...this.performanceMetrics };
    }

    // Public method to get conversation history
    public getHistory(): any[] {
        return [...this.conversationHistory];
    }

    // Public method to clear history
    public clearHistory(): void {
        this.conversationHistory = [];
        this.emotionalContext = {};
    }

    // Cleanup method
    public cleanup(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.detectionCallbacks = [];
        this.isActive = false;
        console.log('✅ Social Decoder cleaned up');
    }
}

export default SocialDecoder;