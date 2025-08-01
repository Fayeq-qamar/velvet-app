// Velvet Stream Client - gRPC integration for real-time brain consciousness
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { EventEmitter } = require('events');

class VelvetStreamClient extends EventEmitter {
    constructor() {
        super();
        this.client = null;
        this.streams = new Map();
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        
        console.log('🧠 Velvet Stream Client initializing...');
    }

    async initialize() {
        try {
            // Load the proto file
            const protoPath = path.join(__dirname, '../../proto/velvet_capture.proto');
            const packageDefinition = protoLoader.loadSync(protoPath, {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });

            const velvetCapture = grpc.loadPackageDefinition(packageDefinition).velvet_capture;
            
            // Create gRPC client
            this.client = new velvetCapture.VelvetCaptureService(
                '127.0.0.1:50051',
                grpc.credentials.createInsecure()
            );

            console.log('✅ Velvet Stream Client initialized');
            return true;

        } catch (error) {
            console.error('❌ Failed to initialize Velvet Stream Client:', error);
            return false;
        }
    }

    async startBrainContextStream(options = {}) {
        if (!this.client) {
            throw new Error('Client not initialized');
        }

        const request = {
            include_audio: options.includeAudio || true,
            include_patterns: options.includePatterns || true,
            confidence_threshold: options.confidenceThreshold || 0.6
        };

        console.log('🧠 Starting brain context stream with options:', request);

        try {
            const stream = this.client.streamBrainContext(request);
            this.streams.set('brain_context', stream);

            // Handle incoming brain context updates
            stream.on('data', (contextUpdate) => {
                this.handleBrainContextUpdate(contextUpdate);
            });

            stream.on('error', (error) => {
                console.error('❌ Brain context stream error:', error);
                this.emit('stream_error', { type: 'brain_context', error });
                this.handleStreamError('brain_context', error);
            });

            stream.on('end', () => {
                console.log('🔚 Brain context stream ended');
                this.emit('stream_end', { type: 'brain_context' });
                this.streams.delete('brain_context');
            });

            this.isConnected = true;
            this.reconnectAttempts = 0;
            console.log('✅ Brain context stream started successfully');
            
            return true;

        } catch (error) {
            console.error('❌ Failed to start brain context stream:', error);
            throw error;
        }
    }

    handleBrainContextUpdate(contextUpdate) {
        const timestamp = new Date().toISOString();
        
        console.log(`🧠 [${timestamp}] Brain Context Update:`);
        console.log(`   📖 Screen Text: ${contextUpdate.screen_text.substring(0, 100)}${contextUpdate.screen_text.length > 100 ? '...' : ''}`);
        console.log(`   🎤 Audio: ${contextUpdate.audio_transcript.substring(0, 50)}${contextUpdate.audio_transcript.length > 50 ? '...' : ''}`);
        console.log(`   📊 OCR Confidence: ${contextUpdate.ocr_confidence.toFixed(2)}`);
        console.log(`   🔍 Patterns: ${contextUpdate.patterns.length} detected`);

        // Emit structured brain context for other components
        const brainContext = {
            timestamp: contextUpdate.timestamp,
            screenText: contextUpdate.screen_text,
            audioTranscript: contextUpdate.audio_transcript,
            ocrConfidence: contextUpdate.ocr_confidence,
            asrConfidence: contextUpdate.asr_confidence,
            patterns: contextUpdate.patterns,
            metadata: contextUpdate.metadata
        };

        this.emit('brain_context_update', brainContext);

        // Store in global context for AI access
        if (global.velvetBrainContext) {
            global.velvetBrainContext.updateContext(brainContext);
        }
    }

    async startScreenStream(options = {}) {
        if (!this.client) {
            throw new Error('Client not initialized');
        }

        const request = {
            fps: options.fps || 10,
            high_quality: options.highQuality || false
        };

        console.log('📺 Starting screen stream with options:', request);

        try {
            const stream = this.client.streamScreen(request);
            this.streams.set('screen', stream);

            stream.on('data', (screenFrame) => {
                this.emit('screen_frame', {
                    timestamp: screenFrame.timestamp,
                    width: screenFrame.width,
                    height: screenFrame.height,
                    dataSize: screenFrame.data.length
                });
            });

            stream.on('error', (error) => {
                console.error('❌ Screen stream error:', error);
                this.handleStreamError('screen', error);
            });

            stream.on('end', () => {
                console.log('🔚 Screen stream ended');
                this.streams.delete('screen');
            });

            console.log('✅ Screen stream started successfully');
            return true;

        } catch (error) {
            console.error('❌ Failed to start screen stream:', error);
            throw error;
        }
    }

    async startAudioStream(options = {}) {
        if (!this.client) {
            throw new Error('Client not initialized');
        }

        const request = {
            device_name: options.deviceName || "Aggregate Device",
            sample_rate: options.sampleRate || 48000
        };

        console.log('🎤 Starting audio stream with options:', request);

        try {
            const stream = this.client.streamAudio(request);
            this.streams.set('audio', stream);

            stream.on('data', (audioChunk) => {
                this.emit('audio_chunk', {
                    timestamp: audioChunk.timestamp,
                    duration: audioChunk.duration_ms,
                    dataSize: audioChunk.data.length
                });
            });

            stream.on('error', (error) => {
                console.error('❌ Audio stream error:', error);
                this.handleStreamError('audio', error);
            });

            stream.on('end', () => {
                console.log('🔚 Audio stream ended');
                this.streams.delete('audio');
            });

            console.log('✅ Audio stream started successfully');
            return true;

        } catch (error) {
            console.error('❌ Failed to start audio stream:', error);
            throw error;
        }
    }

    async startPatternStream(patternTypes = ['hyperfocus', 'distraction', 'task_avoidance']) {
        if (!this.client) {
            throw new Error('Client not initialized');
        }

        const request = {
            pattern_types: patternTypes
        };

        console.log('🔍 Starting pattern detection stream for:', patternTypes);

        try {
            const stream = this.client.streamPatterns(request);
            this.streams.set('patterns', stream);

            stream.on('data', (pattern) => {
                console.log(`🚨 Pattern Detected: ${pattern.pattern_type} (confidence: ${pattern.confidence.toFixed(2)})`);
                console.log(`   Description: ${pattern.description}`);
                console.log(`   Evidence: ${pattern.evidence.join(', ')}`);
                
                this.emit('pattern_detected', {
                    type: pattern.pattern_type,
                    confidence: pattern.confidence,
                    description: pattern.description,
                    evidence: pattern.evidence,
                    timestamp: pattern.timestamp
                });
            });

            stream.on('error', (error) => {
                console.error('❌ Pattern stream error:', error);
                this.handleStreamError('patterns', error);
            });

            stream.on('end', () => {
                console.log('🔚 Pattern stream ended');
                this.streams.delete('patterns');
            });

            console.log('✅ Pattern detection stream started successfully');
            return true;

        } catch (error) {
            console.error('❌ Failed to start pattern stream:', error);
            throw error;
        }
    }

    handleStreamError(streamType, error) {
        console.error(`❌ Stream error for ${streamType}:`, error);
        
        // Remove failed stream
        this.streams.delete(streamType);
        
        // Attempt reconnection if appropriate
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts} for ${streamType}...`);
            
            setTimeout(() => {
                this.reconnectStream(streamType);
            }, 2000 * this.reconnectAttempts); // Exponential backoff
        } else {
            console.error(`❌ Max reconnection attempts reached for ${streamType}`);
            this.emit('max_reconnects_reached', { streamType });
        }
    }

    async reconnectStream(streamType) {
        try {
            switch (streamType) {
                case 'brain_context':
                    await this.startBrainContextStream();
                    break;
                case 'screen':
                    await this.startScreenStream();
                    break;
                case 'audio':
                    await this.startAudioStream();
                    break;
                case 'patterns':
                    await this.startPatternStream();
                    break;
            }
            console.log(`✅ Successfully reconnected ${streamType} stream`);
        } catch (error) {
            console.error(`❌ Failed to reconnect ${streamType} stream:`, error);
        }
    }

    stopStream(streamType) {
        const stream = this.streams.get(streamType);
        if (stream) {
            stream.cancel();
            this.streams.delete(streamType);
            console.log(`🛑 Stopped ${streamType} stream`);
        }
    }

    stopAllStreams() {
        console.log('🛑 Stopping all streams...');
        for (const [streamType, stream] of this.streams) {
            stream.cancel();
            console.log(`   Stopped ${streamType} stream`);
        }
        this.streams.clear();
        this.isConnected = false;
    }

    getStreamStatus() {
        return {
            connected: this.isConnected,
            activeStreams: Array.from(this.streams.keys()),
            reconnectAttempts: this.reconnectAttempts
        };
    }
}

// Global context manager for brain data
class VelvetBrainContext {
    constructor() {
        this.currentContext = null;
        this.contextHistory = [];
        this.maxHistory = 10;
    }

    updateContext(brainContext) {
        this.currentContext = brainContext;
        this.contextHistory.push(brainContext);
        
        // Maintain history limit
        if (this.contextHistory.length > this.maxHistory) {
            this.contextHistory.shift();
        }
    }

    getCurrentContext() {
        return this.currentContext;
    }

    getContextHistory() {
        return this.contextHistory;
    }

    getFormattedContextForAI() {
        if (!this.currentContext) {
            return "No brain context available";
        }

        const ctx = this.currentContext;
        let formatted = "🧠 VELVET BRAIN CONTEXT:\n\n";
        
        if (ctx.screenText && ctx.screenText.length > 0) {
            formatted += `📖 SCREEN CONTENT:\n"${ctx.screenText.substring(0, 300)}${ctx.screenText.length > 300 ? '...' : ''}"\n\n`;
        }
        
        if (ctx.audioTranscript && ctx.audioTranscript.length > 0) {
            formatted += `🎤 AUDIO TRANSCRIPT:\n"${ctx.audioTranscript}"\n\n`;
        }
        
        formatted += `📊 CONFIDENCE: OCR ${(ctx.ocrConfidence * 100).toFixed(0)}%, ASR ${(ctx.asrConfidence * 100).toFixed(0)}%\n`;
        formatted += `⏰ TIMESTAMP: ${new Date(ctx.timestamp).toLocaleTimeString()}\n`;
        
        if (ctx.metadata) {
            formatted += `📋 CONTEXT: ${ctx.metadata.is_communication ? 'Communication' : ''} ${ctx.metadata.is_code ? 'Code' : ''} ${ctx.metadata.is_document ? 'Document' : ''}\n`;
        }

        return formatted;
    }
}

// Export for use in main process
module.exports = { VelvetStreamClient, VelvetBrainContext };