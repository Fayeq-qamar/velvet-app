// Screen OCR Monitor - Phase 2 Foundation
// Real-time text extraction from entire screen for complete context awareness

class ScreenOCRMonitor {
    constructor() {
        this.isActive = false;
        this.ocrEngine = null;
        this.captureInterval = null;
        this.textHistory = [];
        this.currentScreenText = '';
        this.lastCaptureTime = 0;
        this.contextCallbacks = [];
        
        // Configuration
        this.config = {
            captureIntervalMs: 2000, // Capture every 2 seconds
            maxHistoryEntries: 100,   // Keep last 100 text captures
            confidenceThreshold: 0.6, // Minimum OCR confidence
            enableSmartFiltering: true, // Filter out irrelevant text
            focusedWindowOnly: false,   // false = entire screen, true = active window only
            enableContentAnalysis: true // Analyze text for context
        };
        
        // Text filtering patterns
        this.relevantPatterns = [
            // Communication apps
            /messages?|chat|email|slack|discord|teams|zoom/i,
            // Work content
            /document|report|presentation|spreadsheet|code|script/i,
            // Browser content
            /https?:\/\/|www\.|\.com|\.org|search|google|article/i,
            // Task-related
            /todo|task|deadline|meeting|calendar|schedule/i,
            // Social indicators
            /fine|sure|whatever|great|perfect|okay|yes|no/i
        ];
    }

    // Initialize the Screen OCR Monitor
    async initialize() {
        try {
            console.log('👁️ Initializing Screen OCR Monitor...');
            
            // Initialize OCR engine (using Tesseract.js for client-side OCR)
            await this.initializeOCREngine();
            
            // Set up screen capture capabilities
            await this.setupScreenCapture();
            
            // Initialize text analysis
            this.initializeTextAnalysis();
            
            this.isActive = true;
            console.log('✅ Screen OCR Monitor initialized - ready to read everything!');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Screen OCR Monitor:', error);
            return false;
        }
    }

    // Initialize OCR engine
    async initializeOCREngine() {
        // For now, we'll use a simulated OCR engine
        // In real implementation, this would use Tesseract.js or similar
        this.ocrEngine = {
            recognize: async (imageData) => {
                // Simulate OCR processing time
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Return simulated text extraction
                return this.simulateOCRResult(imageData);
            }
        };
        
        console.log('🔍 OCR engine initialized (simulation mode)');
    }

    // Set up screen capture capabilities
    async setupScreenCapture() {
        // Check if we have screen capture permissions
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
            throw new Error('Screen capture not supported in this browser');
        }
        
        console.log('📺 Screen capture capabilities verified');
    }

    // Initialize text analysis engine
    initializeTextAnalysis() {
        this.textAnalyzer = {
            analyzeRelevance: (text) => {
                return this.analyzeTextRelevance(text);
            },
            
            extractContext: (text) => {
                return this.extractContextualInformation(text);
            },
            
            detectChanges: (currentText, previousText) => {
                return this.detectTextChanges(currentText, previousText);
            }
        };
    }

    // Start monitoring screen text
    async startMonitoring() {
        if (!this.isActive) {
            console.log('❌ Screen OCR Monitor not initialized');
            return false;
        }

        try {
            console.log('👁️ Starting screen text monitoring...');
            
            // Start periodic screen capture and OCR
            this.captureInterval = setInterval(() => {
                this.captureAndAnalyzeScreen();
            }, this.config.captureIntervalMs);
            
            // Initial capture
            await this.captureAndAnalyzeScreen();
            
            console.log(`✅ Screen monitoring active - capturing every ${this.config.captureIntervalMs}ms`);
            return true;
            
        } catch (error) {
            console.error('❌ Failed to start screen monitoring:', error);
            return false;
        }
    }

    // Capture screen and perform OCR analysis
    async captureAndAnalyzeScreen() {
        try {
            const startTime = Date.now();
            
            // Get screen capture (simulated for now)
            const screenData = await this.captureScreen();
            
            // Perform OCR on the captured screen
            const ocrResult = await this.ocrEngine.recognize(screenData);
            
            if (ocrResult && ocrResult.confidence > this.config.confidenceThreshold) {
                // Process and analyze the extracted text
                await this.processExtractedText(ocrResult.text, ocrResult.confidence);
            }
            
            this.lastCaptureTime = Date.now();
            const processingTime = this.lastCaptureTime - startTime;
            
            console.log(`👁️ Screen OCR completed in ${processingTime}ms - ${ocrResult?.text?.length || 0} characters extracted`);
            
        } catch (error) {
            console.error('❌ Screen capture and OCR failed:', error);
        }
    }

    // Capture screen (simulated implementation)
    async captureScreen() {
        // In real implementation, this would use:
        // const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
        // const video = document.createElement('video');
        // const canvas = document.createElement('canvas');
        // ... capture frame to canvas and return image data
        
        // For now, simulate screen content based on current context
        return this.simulateScreenContent();
    }

    // Simulate screen content for testing
    simulateScreenContent() {
        const timeOfDay = new Date().getHours();
        const scenarios = [
            // Work scenarios
            {
                text: `Subject: Project Update\nFrom: sarah@company.com\nHi team, just wanted to check in on the deadline. Let me know if you need any help.\nBest regards,\nSarah`,
                context: 'email',
                relevance: 0.9
            },
            {
                text: `// React component for user profile\nfunction UserProfile({ user }) {\n  return (\n    <div className="profile">\n      <h1>{user.name}</h1>\n      <p>{user.email}</p>\n    </div>\n  );\n}`,
                context: 'code',
                relevance: 0.8
            },
            {
                text: `Meeting Notes - Q1 Planning\n• Discuss new features\n• Review timeline\n• Address team concerns\n• Sarah mentioned budget constraints`,
                context: 'document',
                relevance: 0.9
            },
            // Social scenarios
            {
                text: `John: "Sure, that works fine for me."\nYou: "Great! Thanks for being flexible."\nJohn: "No problem at all."`,
                context: 'chat',
                relevance: 0.95
            },
            // Distraction scenarios
            {
                text: `Top 10 React Hooks You MUST Know\n1. useState - Manage state\n2. useEffect - Side effects\n3. useContext - Share data\n[Continue reading...]`,
                context: 'article',
                relevance: 0.7
            }
        ];
        
        // Return random scenario weighted by time of day
        const workHours = timeOfDay >= 9 && timeOfDay <= 17;
        const workScenarios = scenarios.filter(s => ['email', 'code', 'document'].includes(s.context));
        const casualScenarios = scenarios.filter(s => ['chat', 'article'].includes(s.context));
        
        const availableScenarios = workHours ? [...workScenarios, ...casualScenarios] : casualScenarios;
        return availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
    }

    // Simulate OCR result
    simulateOCRResult(screenData) {
        return {
            text: screenData.text,
            confidence: screenData.relevance * 0.9 + 0.1, // Convert relevance to OCR confidence
            context: screenData.context,
            timestamp: Date.now()
        };
    }

    // Process extracted text and analyze for context
    async processExtractedText(text, confidence) {
        try {
            // Clean and normalize text
            const cleanText = this.cleanExtractedText(text);
            
            // Check if text has changed significantly
            const hasSignificantChange = this.detectSignificantChange(cleanText);
            
            if (!hasSignificantChange && this.textHistory.length > 0) {
                return; // Skip if no meaningful change
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
                source: 'screen_ocr'
            };
            
            // Store in history
            this.addToHistory(textCapture);
            
            // Update current screen text
            this.currentScreenText = cleanText;
            
            // Trigger context awareness callbacks
            this.triggerContextCallbacks(textCapture);
            
            console.log(`📝 Processed screen text: ${cleanText.substring(0, 100)}...`);
            console.log(`🎯 Relevance: ${relevanceAnalysis.score.toFixed(2)}, Context: ${contextAnalysis.type}`);
            
        } catch (error) {
            console.error('❌ Text processing failed:', error);
        }
    }

    // Clean extracted text
    cleanExtractedText(text) {
        return text
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/[^\w\s.,!?@#$%^&*()_+=\-\[\]{}|\\:";'<>,.?/]/g, '') // Remove weird OCR artifacts
            .trim();
    }

    // Detect significant text changes
    detectSignificantChange(newText) {
        if (this.textHistory.length === 0) return true;
        
        const lastText = this.textHistory[this.textHistory.length - 1].text;
        
        // Calculate text similarity (simple approach)
        const similarity = this.calculateTextSimilarity(newText, lastText);
        
        // Consider it significant if less than 70% similar
        return similarity < 0.7;
    }

    // Calculate text similarity
    calculateTextSimilarity(text1, text2) {
        const words1 = new Set(text1.toLowerCase().split(/\s+/));
        const words2 = new Set(text2.toLowerCase().split(/\s+/));
        
        const intersection = new Set([...words1].filter(x => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        
        return intersection.size / union.size;
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
                reasons.push(`Matches pattern: ${pattern.source}`);
            }
        });
        
        // Communication content
        if (text.match(/said|replied|wrote|messaged|emailed/i)) {
            score += 0.3;
            categories.push('communication');
            reasons.push('Contains communication indicators');
        }
        
        // Work/task content
        if (text.match(/deadline|meeting|project|task|todo|complete|finish/i)) {
            score += 0.4;
            categories.push('work');
            reasons.push('Contains work/task indicators');
        }
        
        // Social cues
        if (text.match(/fine|sure|whatever|great|perfect|okay|thanks|sorry/i)) {
            score += 0.5;
            categories.push('social');
            reasons.push('Contains social interaction cues');
        }
        
        // Emotional indicators
        if (text.match(/frustrated|angry|excited|happy|sad|worried|anxious/i)) {
            score += 0.3;
            categories.push('emotional');
            reasons.push('Contains emotional indicators');
        }
        
        return {
            score: Math.min(score, 1.0),
            categories: categories,
            reasons: reasons,
            isRelevant: score > 0.3
        };
    }

    // Extract contextual information
    extractContextualInformation(text) {
        const context = {
            type: 'unknown',
            app: 'unknown',
            contentType: 'text',
            metadata: {}
        };
        
        // Detect application context
        if (text.match(/from:|to:|subject:/i)) {
            context.type = 'email';
            context.app = 'email_client';
        } else if (text.match(/function|class|import|export|const|let|var/)) {
            context.type = 'code';
            context.app = 'code_editor';
        } else if (text.match(/https?:\/\/|www\.|\.com/)) {
            context.type = 'web';
            context.app = 'browser';
        } else if (text.match(/said|replied|typing|online/i)) {
            context.type = 'chat';
            context.app = 'messaging';
        } else if (text.match(/document|report|presentation/i)) {
            context.type = 'document';
            context.app = 'office';
        }
        
        // Extract specific metadata based on type
        switch (context.type) {
            case 'email':
                const fromMatch = text.match(/from:\s*([^\n]+)/i);
                const subjectMatch = text.match(/subject:\s*([^\n]+)/i);
                if (fromMatch) context.metadata.sender = fromMatch[1].trim();
                if (subjectMatch) context.metadata.subject = subjectMatch[1].trim();
                break;
                
            case 'chat':
                const speakerMatch = text.match(/(\w+):\s*["']?([^"'\n]+)["']?/);
                if (speakerMatch) {
                    context.metadata.speaker = speakerMatch[1];
                    context.metadata.message = speakerMatch[2];
                }
                break;
                
            case 'web':
                const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
                if (urlMatch) context.metadata.url = urlMatch[1];
                break;
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
        
        const recentCaptures = this.textHistory.slice(-5); // Last 5 captures
        const relevantCaptures = recentCaptures.filter(c => c.relevance.isRelevant);
        
        return {
            currentText: this.currentScreenText,
            recentCaptures: relevantCaptures,
            context: relevantCaptures.length > 0 ? relevantCaptures[relevantCaptures.length - 1].context : null,
            lastUpdate: this.lastCaptureTime
        };
    }

    // Search text history
    searchHistory(query, options = {}) {
        const maxResults = options.maxResults || 10;
        const timeRange = options.timeRange || (24 * 60 * 60 * 1000); // 24 hours
        const minRelevance = options.minRelevance || 0.3;
        
        const cutoffTime = Date.now() - timeRange;
        
        return this.textHistory
            .filter(capture => {
                return capture.timestamp > cutoffTime &&
                       capture.relevance.score >= minRelevance &&
                       capture.text.toLowerCase().includes(query.toLowerCase());
            })
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, maxResults);
    }

    // Stop monitoring
    stopMonitoring() {
        if (this.captureInterval) {
            clearInterval(this.captureInterval);
            this.captureInterval = null;
        }
        console.log('👁️ Screen OCR monitoring stopped');
    }

    // Deactivate the monitor
    deactivate() {
        this.stopMonitoring();
        this.isActive = false;
        this.contextCallbacks = [];
        console.log('👁️ Screen OCR Monitor deactivated');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScreenOCRMonitor;
} else {
    window.ScreenOCRMonitor = ScreenOCRMonitor;
}

// Testing functions for Phase 2 development
if (typeof window !== 'undefined') {
    window.testScreenOCR = {
        simulateEmail: () => {
            const monitor = new ScreenOCRMonitor();
            monitor.initialize();
            
            const emailText = `Subject: Urgent deadline update\nFrom: sarah@company.com\nHi team, just wanted to let you know the deadline has moved up to Friday. Let me know if this is going to be a problem.\nThanks,\nSarah`;
            
            monitor.processExtractedText(emailText, 0.95);
            console.log('📧 Email simulation complete - check context analysis');
        },
        
        simulateCode: () => {
            const monitor = new ScreenOCRMonitor();
            monitor.initialize();
            
            const codeText = `function handleSubmit() {\n  if (!isValid) {\n    showError("Please fix the errors");\n    return;\n  }\n  submitForm();\n}`;
            
            monitor.processExtractedText(codeText, 0.88);
            console.log('💻 Code simulation complete - check context analysis');
        },
        
        simulateChat: () => {
            const monitor = new ScreenOCRMonitor();
            monitor.initialize();
            
            const chatText = `John: "Sure, that sounds fine to me."\nYou: "Great! I'll get started on that."\nJohn: "Perfect, thanks for taking care of it."`;
            
            monitor.processExtractedText(chatText, 0.92);
            console.log('💬 Chat simulation complete - check for social cues');
        }
    };
}