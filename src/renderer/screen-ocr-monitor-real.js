// REAL Screen OCR Monitor - No Simulation
// Actual screen capture + Tesseract.js OCR implementation

class RealScreenOCRMonitor {
    constructor() {
        this.isActive = false;
        this.ocrWorker = null;
        this.captureInterval = null;
        this.textHistory = [];
        this.currentScreenText = '';
        this.lastCaptureTime = 0;
        this.contextCallbacks = [];
        this.screenSourceId = null;
        
        // Configuration
        this.config = {
            captureIntervalMs: 5000, // Capture every 5 seconds (OCR is expensive)
            maxHistoryEntries: 50,    // Reduced for real implementation
            confidenceThreshold: 0.6, // Tesseract confidence threshold
            enableSmartFiltering: true,
            ocrLanguage: 'eng'
        };
        
        // Text filtering patterns for relevance
        this.relevantPatterns = [
            /messages?|chat|email|slack|discord|teams|zoom/i,
            /document|report|presentation|spreadsheet|code|script/i,
            /https?:\/\/|www\.|\.com|\.org|search|google/i,
            /todo|task|deadline|meeting|calendar|schedule/i,
            /fine|sure|whatever|great|perfect|okay|yes|no/i
        ];
    }

    // Initialize the REAL Screen OCR Monitor
    async initialize() {
        try {
            console.log('👁️ Initializing REAL Screen OCR Monitor...');
            console.log('🔍 Current environment check:');
            console.log('  • Browser:', navigator.userAgent.includes('Electron') ? 'Electron' : 'Regular browser');
            console.log('  • Electron desktopCapturer API:', typeof window.electronAPI?.desktopCapturer);
            console.log('  • Tesseract availability:', typeof Tesseract);
            
            // Initialize Tesseract.js OCR worker
            console.log('📚 Step 1: Initialize OCR engine...');
            await this.initializeRealOCR();
            
            // Verify screen capture capabilities
            console.log('📺 Step 2: Verify screen capture...');
            await this.verifyScreenCaptureSupport();
            
            this.isActive = true;
            console.log('✅ REAL Screen OCR Monitor initialized successfully!');
            console.log('💡 To start monitoring, call startMonitoring() method');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize REAL Screen OCR Monitor:', error);
            console.error('💡 Troubleshooting:');
            console.error('  • Check internet connection (Tesseract.js loads from CDN)');
            console.error('  • Ensure browser supports screen capture API');
            console.error('  • Try running in Electron environment');
            return false;
        }
    }

    // Initialize Tesseract.js OCR worker
    async initializeRealOCR() {
        try {
            console.log('🔍 Initializing Tesseract.js OCR worker...');
            
            // Wait for Tesseract to be available (up to 10 seconds)
            let attempts = 0;
            const maxAttempts = 20; // 10 seconds with 500ms intervals
            
            while (typeof Tesseract === 'undefined' && attempts < maxAttempts) {
                console.log(`⏳ Waiting for Tesseract.js to load... (attempt ${attempts + 1}/${maxAttempts})`);
                await new Promise(resolve => setTimeout(resolve, 500));
                attempts++;
            }
            
            // Check if Tesseract is available globally
            if (typeof Tesseract === 'undefined') {
                throw new Error('Tesseract.js failed to load after 10 seconds. Check internet connection or CDN availability.');
            }
            
            console.log('✅ Tesseract.js loaded successfully');
            
            // Create OCR worker
            console.log('📦 Creating Tesseract worker...');
            this.ocrWorker = await Tesseract.createWorker();
            
            console.log('📚 Loading language data...');
            await this.ocrWorker.loadLanguage(this.config.ocrLanguage);
            
            console.log('🔧 Initializing OCR engine...');
            await this.ocrWorker.initialize(this.config.ocrLanguage);
            
            console.log('✅ Tesseract.js OCR worker initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize OCR worker:', error);
            console.error('Error details:', error.message);
            throw error;
        }
    }

    // Verify screen capture support using Electron APIs
    async verifyScreenCaptureSupport() {
        if (!window.electronAPI || !window.electronAPI.desktopCapturer) {
            throw new Error('Electron desktopCapturer API not available - ensure you are running in Electron');
        }
        
        console.log('📺 Electron screen capture support verified');
    }

    // Start REAL monitoring with actual screen capture
    async startMonitoring() {
        if (!this.isActive) {
            console.error('❌ Screen OCR Monitor not initialized - call initialize() first');
            return false;
        }

        try {
            console.log('👁️ Starting REAL screen monitoring...');
            console.log('🔐 Requesting screen capture permission from user...');
            console.log('💡 A browser dialog will appear - please allow screen sharing');
            
            // Request screen capture permission
            await this.requestScreenCapturePermission();
            console.log('✅ Screen capture permission granted!');
            
            // Start periodic screen capture and OCR
            console.log(`⏰ Setting up capture interval: every ${this.config.captureIntervalMs}ms`);
            this.captureInterval = setInterval(() => {
                this.captureAndAnalyzeRealScreen();
            }, this.config.captureIntervalMs);
            
            // Initial capture
            console.log('📸 Performing initial screen capture...');
            await this.captureAndAnalyzeRealScreen();
            
            console.log(`✅ REAL screen monitoring ACTIVE!`);
            console.log(`📊 Monitor status:`);
            console.log(`  • Capture interval: ${this.config.captureIntervalMs}ms`);
            console.log(`  • OCR language: ${this.config.ocrLanguage}`);
            console.log(`  • Confidence threshold: ${this.config.confidenceThreshold}`);
            console.log(`  • Max history: ${this.config.maxHistoryEntries} entries`);
            console.log('💡 Watch for "📸 Capturing real screen..." logs every 5 seconds');
            
            return true;
            
        } catch (error) {
            console.error('❌ Failed to start REAL screen monitoring:', error);
            if (error.name === 'NotAllowedError') {
                console.error('💡 User denied screen capture permission');
                console.error('💡 To fix: Reload and allow screen sharing when prompted');
            } else if (error.name === 'NotSupportedError') {
                console.error('💡 Screen capture not supported in this browser');
                console.error('💡 Try using a modern browser (Chrome, Firefox, Edge)');
            }
            return false;
        }
    }

    // Get available screen sources using Electron desktopCapturer
    async requestScreenCapturePermission() {
        try {
            console.log('🔐 Getting available screen sources...');
            console.log('🔍 Electron API available:', typeof window.electronAPI);
            console.log('🔍 DesktopCapturer API available:', typeof window.electronAPI?.desktopCapturer);
            
            // Get available screen sources using Electron API
            const sources = await window.electronAPI.desktopCapturer.getSources({
                types: ['screen'],
                thumbnailSize: { width: 1920, height: 1080 }
            });
            
            console.log('📺 Raw sources response:', sources);
            console.log('📺 Sources type:', typeof sources);
            console.log('📺 Sources length:', sources?.length);
            
            // Handle different response formats
            let sourcesList = sources;
            if (sources && sources.sources) {
                sourcesList = sources.sources; // If wrapped in {sources: [...]}
            }
            
            if (!sourcesList || !Array.isArray(sourcesList) || sourcesList.length === 0) {
                console.error('❌ No valid screen sources found');
                console.error('  • Sources raw:', sources);
                console.error('  • SourcesList:', sourcesList);
                throw new Error('No screen sources available - check macOS screen recording permissions');
            }
            
            // Use the primary screen (first source)
            const firstSource = sourcesList[0];
            console.log('📺 First source:', firstSource);
            
            if (!firstSource || !firstSource.id) {
                console.error('❌ First source invalid:', firstSource);
                throw new Error('Invalid screen source format');
            }
            
            this.screenSourceId = firstSource.id;
            console.log(`✅ Selected screen source: ${firstSource.name || 'Unknown'} (${this.screenSourceId})`);
            
        } catch (error) {
            console.error('❌ Failed to get screen sources:', error);
            console.error('💡 Check System Settings > Privacy & Security > Screen Recording');
            console.error('💡 Make sure Electron/Velvet is allowed to record screen');
            throw error;
        }
    }

    // Capture screen and perform REAL OCR analysis using Electron
    async captureAndAnalyzeRealScreen() {
        if (!this.screenSourceId) {
            console.error('❌ No screen source available');
            return;
        }

        try {
            const startTime = Date.now();
            console.log('📸 Capturing real screen using Electron desktopCapturer...');
            
            // Capture screen using Electron API
            const captureResult = await window.electronAPI.desktopCapturer.captureScreenForOCR(this.screenSourceId);
            
            console.log('📷 Capture result:', captureResult);
            console.log('📷 Capture result type:', typeof captureResult);
            
            if (!captureResult) {
                console.error('❌ Failed to capture screen - no result returned');
                return;
            }
            
            // Extract imageDataUrl from the response (it might be wrapped in an object)
            let imageDataUrl = captureResult;
            if (captureResult && typeof captureResult === 'object') {
                imageDataUrl = captureResult.imageDataUrl || captureResult.dataUrl || captureResult.image;
            }
            
            console.log('📷 Extracted imageDataUrl:', typeof imageDataUrl);
            console.log('📷 ImageDataUrl length:', imageDataUrl?.length);
            
            if (!imageDataUrl) {
                console.error('❌ Failed to extract image data from result:', captureResult);
                return;
            }
            
            // Validate image data before OCR
            console.log('🔍 Validating image data...');
            console.log('  • Image data type:', typeof imageDataUrl);
            console.log('  • Image data length:', imageDataUrl?.length);
            console.log('  • Image data prefix:', imageDataUrl?.substring?.(0, 50));
            
            if (!imageDataUrl || typeof imageDataUrl !== 'string' || !imageDataUrl.startsWith('data:image/')) {
                console.error('❌ Invalid image data format:', {
                    type: typeof imageDataUrl,
                    isString: typeof imageDataUrl === 'string',
                    startsWithData: imageDataUrl?.startsWith?.('data:image/'),
                    preview: imageDataUrl?.substring?.(0, 100)
                });
                return;
            }
            
            // Perform REAL OCR on the captured screen
            console.log('🔍 Running Tesseract OCR...');
            const ocrResult = await this.performRealOCR(imageDataUrl);
            
            console.log('📊 OCR Result Details:');
            console.log('  • Confidence:', ocrResult?.confidence?.toFixed(2) || 'N/A');
            console.log('  • Text length:', ocrResult?.text?.length || 0);
            console.log('  • Text preview:', ocrResult?.text?.substring(0, 200) || 'No text');
            console.log('  • Confidence threshold:', this.config.confidenceThreshold);
            
            if (ocrResult && ocrResult.confidence > this.config.confidenceThreshold) {
                console.log('✅ OCR confidence acceptable, processing text...');
                // Process and analyze the extracted text
                await this.processExtractedRealText(ocrResult.text, ocrResult.confidence);
            } else {
                console.log(`⚠️ OCR confidence too low: ${ocrResult?.confidence?.toFixed(2) || 'N/A'} (threshold: ${this.config.confidenceThreshold})`);
                if (ocrResult?.text && ocrResult.text.length > 0) {
                    console.log('📝 Low-confidence text preview:', ocrResult.text.substring(0, 300));
                }
            }
            
            this.lastCaptureTime = Date.now();
            const processingTime = this.lastCaptureTime - startTime;
            
            console.log(`✅ Real screen OCR completed in ${processingTime}ms - confidence: ${ocrResult?.confidence?.toFixed(2) || 'N/A'}`);
            
        } catch (error) {
            console.error('❌ Real screen capture and OCR failed:', error);
        }
    }

    // Capture current frame from display stream
    async captureCurrentFrame() {
        return new Promise((resolve) => {
            // Create video element to capture the stream
            const video = document.createElement('video');
            video.style.display = 'none';
            document.body.appendChild(video);
            
            video.srcObject = this.displayStream;
            video.play();
            
            video.addEventListener('loadedmetadata', () => {
                // Create canvas to capture frame
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);
                
                // Convert to data URL
                const imageDataUrl = canvas.toDataURL('image/png');
                
                // Cleanup
                document.body.removeChild(video);
                video.srcObject = null;
                
                resolve(imageDataUrl);
            });
        });
    }

    // Perform REAL OCR using Tesseract.js
    async performRealOCR(imageDataUrl) {
        try {
            // Run OCR on the captured image
            const result = await this.ocrWorker.recognize(imageDataUrl);
            
            return {
                text: result.data.text,
                confidence: result.data.confidence / 100, // Convert to 0-1 scale
                words: result.data.words,
                lines: result.data.lines,
                paragraphs: result.data.paragraphs
            };
            
        } catch (error) {
            console.error('❌ Tesseract OCR failed:', error);
            return null;
        }
    }

    // Process REAL extracted text
    async processExtractedRealText(text, confidence) {
        try {
            // Clean and normalize text
            const cleanText = this.cleanExtractedText(text);
            
            if (!cleanText || cleanText.length < 10) {
                console.log('⚠️ Extracted text too short, skipping');
                return;
            }
            
            // Check if text has changed significantly
            const hasSignificantChange = this.detectSignificantChange(cleanText);
            
            if (!hasSignificantChange && this.textHistory.length > 0) {
                console.log('⚠️ No significant text change detected, but processing anyway for testing...');
                // Temporarily continue processing instead of returning
            }
            
            // Analyze text relevance
            const relevanceAnalysis = this.analyzeTextRelevance(cleanText);
            
            // Extract contextual information
            const contextAnalysis = this.extractContextualInformation(cleanText);
            
            // Create text capture entry
            const textCapture = {
                timestamp: Date.now(),
                text: cleanText,
                confidence: confidence,
                relevance: relevanceAnalysis,
                context: contextAnalysis,
                wordCount: cleanText.split(/\s+/).length,
                source: 'real_screen_ocr'
            };
            
            // Store in history
            this.addToHistory(textCapture);
            
            // Update current screen text
            this.currentScreenText = cleanText;
            
            // Trigger context awareness callbacks
            this.triggerContextCallbacks(textCapture);
            
            console.log(`📝 REAL screen text processed: ${cleanText.substring(0, 100)}...`);
            console.log(`🎯 Relevance: ${relevanceAnalysis.score.toFixed(2)}, Context: ${contextAnalysis.type}`);
            
        } catch (error) {
            console.error('❌ Real text processing failed:', error);
        }
    }

    // Clean extracted text from OCR
    cleanExtractedText(text) {
        if (!text) return '';
        
        return text
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/[^\w\s.,!?@#$%^&*()_+=\-\[\]{}|\\:";'<>,.?/]/g, '') // Remove OCR artifacts
            .replace(/(.)\1{4,}/g, '$1') // Remove repeated characters (OCR errors)
            .trim();
    }

    // Detect significant text changes
    detectSignificantChange(newText) {
        if (this.textHistory.length === 0) return true;
        
        const lastText = this.textHistory[this.textHistory.length - 1].text;
        
        // Calculate text similarity using Jaccard index
        const similarity = this.calculateJaccardSimilarity(newText, lastText);
        
        // Consider it significant if less than 50% similar
        return similarity < 0.5;
    }

    // Calculate Jaccard similarity between two texts
    calculateJaccardSimilarity(text1, text2) {
        const words1 = new Set(text1.toLowerCase().split(/\s+/));
        const words2 = new Set(text2.toLowerCase().split(/\s+/));
        
        const intersection = new Set([...words1].filter(x => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        
        return union.size === 0 ? 0 : intersection.size / union.size;
    }

    // Analyze text relevance for neurodivergent assistance
    analyzeTextRelevance(text) {
        let score = 0;
        let reasons = [];
        let categories = [];
        
        // Check against relevant patterns
        this.relevantPatterns.forEach(pattern => {
            if (pattern.test(text)) {
                score += 0.2;
                reasons.push(`Matches pattern: ${pattern.source.substring(0, 20)}...`);
            }
        });
        
        // Communication content (high priority for social decoder)
        if (text.match(/said|replied|wrote|messaged|emailed|from:|to:|subject:/i)) {
            score += 0.4;
            categories.push('communication');
            reasons.push('Contains communication indicators');
        }
        
        // Work/task content
        if (text.match(/deadline|meeting|project|task|todo|complete|finish|urgent|asap/i)) {
            score += 0.5;
            categories.push('work');
            reasons.push('Contains work/task indicators');
        }
        
        // Social cues (critical for neurodivergent support)
        if (text.match(/fine|sure|whatever|great|perfect|okay|thanks|sorry|frustrated|angry/i)) {
            score += 0.6;
            categories.push('social');
            reasons.push('Contains social interaction cues');
        }
        
        // Code/technical content
        if (text.match(/function|class|import|export|const|let|var|def|print|console|error/i)) {
            score += 0.3;
            categories.push('technical');
            reasons.push('Contains code/technical content');
        }
        
        return {
            score: Math.min(score, 1.0),
            categories: categories,
            reasons: reasons,
            isRelevant: score > 0.3
        };
    }

    // Extract contextual information from real text
    extractContextualInformation(text) {
        const context = {
            type: 'unknown',
            app: 'unknown',
            contentType: 'text',
            metadata: {},
            confidence: 0.5
        };
        
        // Email detection
        if (text.match(/from:|to:|subject:|reply|inbox|compose/i)) {
            context.type = 'email';
            context.app = 'email_client';
            context.confidence = 0.9;
            
            const fromMatch = text.match(/from:\s*([^\n\r]+)/i);
            const subjectMatch = text.match(/subject:\s*([^\n\r]+)/i);
            if (fromMatch) context.metadata.sender = fromMatch[1].trim();
            if (subjectMatch) context.metadata.subject = subjectMatch[1].trim();
        }
        
        // Code detection
        else if (text.match(/function|class|import|export|const|let|var|def|\{|\}|\/\/|\/\*/)) {
            context.type = 'code';
            context.app = 'code_editor';
            context.confidence = 0.8;
            
            // Detect programming language
            if (text.match(/function|const|let|var|import|export/)) {
                context.metadata.language = 'javascript';
            } else if (text.match(/def|import|class.*:/)) {
                context.metadata.language = 'python';
            } else if (text.match(/public|private|class.*\{/)) {
                context.metadata.language = 'java';
            }
        }
        
        // Web browser detection
        else if (text.match(/https?:\/\/|www\.|\.com|\.org|search|google|chrome|firefox|safari/i)) {
            context.type = 'web';
            context.app = 'browser';
            context.confidence = 0.7;
            
            const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
            if (urlMatch) context.metadata.url = urlMatch[1];
        }
        
        // Chat/messaging detection
        else if (text.match(/said|replied|typing|online|discord|slack|teams|zoom|messages/i)) {
            context.type = 'chat';
            context.app = 'messaging';
            context.confidence = 0.8;
            
            // Extract speaker and message if possible
            const speakerMatch = text.match(/(\w+):\s*["']?([^"'\n\r]+)["']?/);
            if (speakerMatch) {
                context.metadata.speaker = speakerMatch[1];
                context.metadata.message = speakerMatch[2];
            }
        }
        
        // Document detection
        else if (text.match(/document|report|presentation|page \d+|word|pdf|doc/i)) {
            context.type = 'document';
            context.app = 'office';
            context.confidence = 0.7;
        }
        
        return context;
    }

    // Add text capture to history
    addToHistory(textCapture) {
        this.textHistory.push(textCapture);
        
        // Maintain history size limit
        if (this.textHistory.length > this.config.maxHistoryEntries) {
            this.textHistory.shift();
        }
    }

    // Register callback for context awareness
    onContextDetected(callback) {
        this.contextCallbacks.push(callback);
    }

    // Trigger all context callbacks
    triggerContextCallbacks(textCapture) {
        this.contextCallbacks.forEach(callback => {
            try {
                callback(textCapture);
            } catch (error) {
                console.error('❌ Context callback error:', error);
            }
        });
    }

    // Get current screen context
    getCurrentContext() {
        if (this.textHistory.length === 0) return null;
        
        const recentCaptures = this.textHistory.slice(-3); // Last 3 captures
        const relevantCaptures = recentCaptures.filter(c => c.relevance.isRelevant);
        
        return {
            currentText: this.currentScreenText,
            recentCaptures: relevantCaptures,
            context: relevantCaptures.length > 0 ? relevantCaptures[relevantCaptures.length - 1].context : null,
            lastUpdate: this.lastCaptureTime
        };
    }

    // Stop monitoring
    stopMonitoring() {
        if (this.captureInterval) {
            clearInterval(this.captureInterval);
            this.captureInterval = null;
        }
        
        // Stop display stream
        if (this.displayStream) {
            this.displayStream.getTracks().forEach(track => track.stop());
            this.displayStream = null;
        }
        
        console.log('👁️ REAL screen OCR monitoring stopped');
    }

    // Deactivate the monitor
    async deactivate() {
        this.stopMonitoring();
        this.isActive = false;
        this.contextCallbacks = [];
        
        // Terminate OCR worker
        if (this.ocrWorker) {
            await this.ocrWorker.terminate();
            this.ocrWorker = null;
        }
        
        console.log('👁️ REAL Screen OCR Monitor deactivated');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealScreenOCRMonitor;
} else {
    window.RealScreenOCRMonitor = RealScreenOCRMonitor;
}

// Testing functions for development
if (typeof window !== 'undefined') {
    window.testRealScreenOCR = {
        async startTest() {
            const monitor = new RealScreenOCRMonitor();
            const initialized = await monitor.initialize();
            
            if (initialized) {
                console.log('✅ Real Screen OCR Monitor initialized successfully');
                
                const started = await monitor.startMonitoring();
                if (started) {
                    console.log('✅ Real screen monitoring started - check console for OCR results');
                    
                    // Store reference for manual testing
                    window.realScreenOCRMonitor = monitor;
                }
            }
        },
        
        async stopTest() {
            if (window.realScreenOCRMonitor) {
                await window.realScreenOCRMonitor.deactivate();
                console.log('✅ Real screen monitoring stopped');
            }
        }
    };
}