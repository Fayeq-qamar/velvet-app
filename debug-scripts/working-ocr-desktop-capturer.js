// WORKING OCR WITH DESKTOP CAPTURER - Console Script
// This bypasses stealth mode using Electron's desktopCapturer API

console.log('🚀 WORKING OCR WITH DESKTOP CAPTURER');
console.log('===================================');

async function createWorkingOCRSystem() {
    console.log('📸 Creating OCR system using desktopCapturer API...');
    
    // Check if desktop capturer API is available
    if (!window.electronAPI?.desktopCapturer) {
        console.error('❌ Desktop capturer API not available');
        console.error('💡 Make sure preload.js is updated with desktopCapturer API');
        return false;
    }
    
    // Check if Tesseract is available
    if (typeof Tesseract === 'undefined') {
        console.error('❌ Tesseract.js not loaded');
        return false;
    }
    
    try {
        console.log('🔧 Initializing Tesseract OCR worker...');
        const worker = await Tesseract.createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        console.log('✅ Tesseract OCR worker ready');
        
        // Get available screen sources
        console.log('📺 Getting desktop sources...');
        const sourcesResult = await window.electronAPI.desktopCapturer.getSources({
            thumbnailSize: { width: 1920, height: 1080 }
        });
        
        if (sourcesResult.error) {
            throw new Error(`Desktop sources error: ${sourcesResult.error}`);
        }
        
        console.log(`✅ Found ${sourcesResult.sources.length} screen sources`);
        sourcesResult.sources.forEach((source, i) => {
            console.log(`  ${i + 1}. ${source.name} (ID: ${source.id})`);
        });
        
        // Use the first (primary) screen
        const primarySource = sourcesResult.sources[0];
        if (!primarySource) {
            throw new Error('No screen sources available');
        }
        
        console.log(`🎯 Using primary screen: ${primarySource.name}`);
        
        // Function to capture and perform OCR
        async function captureAndPerformOCR() {
            try {
                console.log('📸 Capturing screen using desktopCapturer...');
                
                const captureResult = await window.electronAPI.desktopCapturer.captureScreenForOCR(primarySource.id);
                
                if (captureResult.error) {
                    console.error('❌ Screen capture failed:', captureResult.error);
                    return null;
                }
                
                if (!captureResult.imageDataUrl) {
                    console.error('❌ No image data received');
                    return null;
                }
                
                console.log('🔍 Running OCR on captured screen...');
                const startTime = Date.now();
                
                const result = await worker.recognize(captureResult.imageDataUrl);
                const processingTime = Date.now() - startTime;
                
                const confidence = result.data.confidence / 100;
                const text = result.data.text.trim();
                
                if (text.length > 10 && confidence > 0.3) {
                    console.log('📝 SCREEN TEXT DETECTED:');
                    console.log(`   Source: ${captureResult.sourceName}`);
                    console.log(`   Text: "${text.substring(0, 150)}..."`);
                    console.log(`   Confidence: ${confidence.toFixed(2)}`);
                    console.log(`   Length: ${text.length} characters`);
                    console.log(`   Processing time: ${processingTime}ms`);
                    
                    // Analyze text context
                    const contextType = analyzeTextContext(text);
                    const relevance = calculateTextRelevance(text);
                    
                    console.log(`   Context: ${contextType}`);
                    console.log(`   Relevance: ${relevance.toFixed(2)}`);
                    
                    // Create OCR result object
                    const ocrResult = {
                        timestamp: Date.now(),
                        text: text,
                        confidence: confidence,
                        processingTime: processingTime,
                        context: contextType,
                        relevance: relevance,
                        source: captureResult.sourceName,
                        wordCount: text.split(/\s+/).length
                    };
                    
                    // Store in history
                    if (!window.screenOCRHistory) window.screenOCRHistory = [];
                    window.screenOCRHistory.push(ocrResult);
                    
                    // Keep only last 50 entries
                    if (window.screenOCRHistory.length > 50) {
                        window.screenOCRHistory.shift();
                    }
                    
                    console.log(`📚 Total OCR captures: ${window.screenOCRHistory.length}`);
                    
                    // Update unified context if available
                    if (window.unifiedContextEngine) {
                        const screenContext = {
                            text: text,
                            confidence: confidence,
                            context: { type: contextType },
                            relevance: { score: relevance, isRelevant: relevance > 0.4 },
                            timestamp: Date.now(),
                            source: 'desktop_capturer_ocr'
                        };
                        
                        window.unifiedContextEngine.lastScreenContext = screenContext;
                        console.log('🔗 Updated unified context with OCR data');
                    }
                    
                    return ocrResult;
                    
                } else {
                    console.log('⚠️ No significant text detected or confidence too low');
                    console.log(`   Confidence: ${confidence.toFixed(2)}, Length: ${text.length}`);
                    return null;
                }
                
            } catch (error) {
                console.error('❌ OCR capture failed:', error);
                return null;
            }
        }
        
        // Helper function to analyze text context
        function analyzeTextContext(text) {
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('function') || lowerText.includes('const') || lowerText.includes('import') || lowerText.includes('class')) {
                return 'code';
            } else if (lowerText.includes('email') || lowerText.includes('from:') || lowerText.includes('subject:') || lowerText.includes('inbox')) {
                return 'email';
            } else if (lowerText.includes('http') || lowerText.includes('www.') || lowerText.includes('.com') || lowerText.includes('search')) {
                return 'web';
            } else if (lowerText.includes('chat') || lowerText.includes('message') || lowerText.includes('discord') || lowerText.includes('slack')) {
                return 'chat';
            } else if (lowerText.includes('terminal') || lowerText.includes('$') || lowerText.includes('bash') || lowerText.includes('command')) {
                return 'terminal';
            } else {
                return 'document';
            }
        }
        
        // Helper function to calculate relevance
        function calculateTextRelevance(text) {
            const lowerText = text.toLowerCase();
            let score = 0.2; // Base score
            
            // High relevance patterns
            if (lowerText.match(/function|class|import|const|let|var/)) score += 0.4;
            if (lowerText.match(/email|message|from:|to:|subject/)) score += 0.5;
            if (lowerText.match(/error|warning|exception|failed/)) score += 0.3;
            if (lowerText.match(/todo|task|deadline|meeting/)) score += 0.4;
            if (lowerText.match(/https?:\/\/|www\.|\.com/)) score += 0.2;
            
            return Math.min(score, 1.0);
        }
        
        // Start periodic OCR
        console.log('⏰ Starting periodic OCR capture every 8 seconds...');
        
        // Initial capture
        await captureAndPerformOCR();
        
        // Set up interval
        const interval = setInterval(async () => {
            await captureAndPerformOCR();
        }, 8000);
        
        // Store cleanup functions
        window.stopDesktopCapturerOCR = async () => {
            clearInterval(interval);
            await worker.terminate();
            console.log('🛑 Desktop capturer OCR stopped');
        };
        
        console.log('✅ DESKTOP CAPTURER OCR IS NOW WORKING!');
        console.log('======================================');
        console.log('📸 Capturing screen every 8 seconds using desktopCapturer');
        console.log('🔍 Running OCR to extract text (bypasses stealth mode)');
        console.log('📝 Watch for "SCREEN TEXT DETECTED" logs');
        console.log('');
        console.log('💡 This method works because:');
        console.log('  • Uses Electron desktopCapturer API (main process)');
        console.log('  • Bypasses browser getDisplayMedia restrictions');
        console.log('  • Works even with stealth mode active');
        console.log('');
        console.log('🎯 Controls:');
        console.log('  • Stop: window.stopDesktopCapturerOCR()');
        console.log('  • View history: window.screenOCRHistory');
        console.log('  • History count: window.screenOCRHistory?.length');
        
        return true;
        
    } catch (error) {
        console.error('❌ Desktop capturer OCR setup failed:', error);
        return false;
    }
}

// Auto-run the working OCR system
console.log('🚀 Starting desktop capturer OCR in 2 seconds...');

setTimeout(() => {
    createWorkingOCRSystem().catch(error => {
        console.error('❌ Desktop capturer OCR failed:', error);
    });
}, 2000);