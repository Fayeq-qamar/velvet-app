// SCREEN OCR FIX - Paste this into browser console
// This will force screen OCR to start working

console.log('📸 SCREEN OCR FIX');
console.log('==================');

async function forceScreenOCRWorking() {
    console.log('👁️ Forcing Screen OCR to work...');
    
    // Check if Tesseract is loaded
    if (typeof Tesseract === 'undefined') {
        console.error('❌ Tesseract.js not loaded - cannot do OCR');
        return false;
    }
    
    try {
        console.log('🔐 Requesting screen capture permission...');
        
        // Force request screen sharing permission
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        });
        
        console.log('✅ Screen sharing permission granted!');
        console.log('📊 Stream details:', {
            id: stream.id,
            active: stream.active,
            tracks: stream.getTracks().length
        });
        
        // Create OCR worker
        console.log('🔧 Creating Tesseract OCR worker...');
        const worker = await Tesseract.createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        console.log('✅ OCR worker ready');
        
        // Create screen capture and OCR function
        async function captureAndAnalyzeScreen() {
            try {
                console.log('📸 Capturing screen for OCR...');
                
                const video = document.createElement('video');
                video.srcObject = stream;
                video.style.display = 'none';
                document.body.appendChild(video);
                video.play();
                
                return new Promise((resolve) => {
                    video.addEventListener('loadedmetadata', async () => {
                        try {
                            const canvas = document.createElement('canvas');
                            canvas.width = video.videoWidth;
                            canvas.height = video.videoHeight;
                            
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(video, 0, 0);
                            
                            const imageData = canvas.toDataURL();
                            
                            console.log('🔍 Running OCR on captured screen...');
                            const result = await worker.recognize(imageData);
                            
                            const confidence = result.data.confidence / 100;
                            const text = result.data.text.trim();
                            
                            // Clean up
                            document.body.removeChild(video);
                            
                            if (text.length > 10 && confidence > 0.3) {
                                console.log('📝 SCREEN TEXT DETECTED:');
                                console.log(`   Text: "${text.substring(0, 100)}..."`);
                                console.log(`   Confidence: ${confidence.toFixed(2)}`);
                                console.log(`   Length: ${text.length} characters`);
                                
                                // Create screen context object
                                const screenContext = {
                                    text: text,
                                    confidence: confidence,
                                    context: {
                                        type: detectContextType(text),
                                        app: 'screen_capture'
                                    },
                                    relevance: {
                                        score: calculateRelevance(text),
                                        isRelevant: true
                                    },
                                    timestamp: Date.now(),
                                    source: 'real_screen_ocr'
                                };
                                
                                // Store in global history
                                if (!window.screenTextHistory) window.screenTextHistory = [];
                                window.screenTextHistory.push(screenContext);
                                
                                console.log(`📚 Total screen captures: ${window.screenTextHistory.length}`);
                                
                                // Update unified context engine if it exists
                                if (window.unifiedContextEngine) {
                                    window.unifiedContextEngine.lastScreenContext = {
                                        ...screenContext,
                                        timestamp: Date.now(),
                                        source: 'screen'
                                    };
                                    console.log('🔗 Updated unified context engine with screen data');
                                }
                                
                                resolve(screenContext);
                            } else {
                                console.log('⚠️ No significant text detected (confidence too low or text too short)');
                                resolve(null);
                            }
                            
                        } catch (error) {
                            console.error('❌ OCR processing failed:', error);
                            document.body.removeChild(video);
                            resolve(null);
                        }
                    });
                });
                
            } catch (error) {
                console.error('❌ Screen capture failed:', error);
                return null;
            }
        }
        
        // Helper function to detect context type from text
        function detectContextType(text) {
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('function') || lowerText.includes('const') || lowerText.includes('import')) {
                return 'code';
            } else if (lowerText.includes('email') || lowerText.includes('from:') || lowerText.includes('subject:')) {
                return 'email';
            } else if (lowerText.includes('http') || lowerText.includes('www.') || lowerText.includes('.com')) {
                return 'web';
            } else if (lowerText.includes('chat') || lowerText.includes('message') || lowerText.includes('discord')) {
                return 'chat';
            } else {
                return 'document';
            }
        }
        
        // Helper function to calculate relevance
        function calculateRelevance(text) {
            const lowerText = text.toLowerCase();
            let score = 0.3; // Base score
            
            // Check for relevant patterns
            if (lowerText.match(/email|message|chat|discord|slack/)) score += 0.4;
            if (lowerText.match(/code|function|class|import|const/)) score += 0.3;
            if (lowerText.match(/document|report|presentation/)) score += 0.2;
            if (lowerText.match(/https?:\/\/|www\.|\.com/)) score += 0.2;
            
            return Math.min(score, 1.0);
        }
        
        // Start periodic screen capture
        console.log('⏰ Starting periodic screen OCR (every 8 seconds)...');
        
        // Initial capture
        await captureAndAnalyzeScreen();
        
        // Set up interval
        const interval = setInterval(async () => {
            await captureAndAnalyzeScreen();
        }, 8000);
        
        // Store cleanup function
        window.stopScreenOCR = () => {
            clearInterval(interval);
            stream.getTracks().forEach(track => track.stop());
            worker.terminate();
            console.log('🛑 Screen OCR stopped');
        };
        
        console.log('✅ SCREEN OCR IS NOW WORKING!');
        console.log('==============================');
        console.log('📸 Capturing screen every 8 seconds');
        console.log('🔍 Running OCR to extract text');
        console.log('📝 Watch for "SCREEN TEXT DETECTED" logs');
        console.log('');
        console.log('💡 Controls:');
        console.log('  • Stop: window.stopScreenOCR()');
        console.log('  • View history: window.screenTextHistory');
        console.log('  • History count: window.screenTextHistory?.length');
        
        return true;
        
    } catch (error) {
        console.error('❌ Screen OCR setup failed:', error);
        if (error.name === 'NotAllowedError') {
            console.error('💡 User denied screen sharing permission');
            console.error('💡 Refresh page and allow screen sharing when prompted');
        }
        return false;
    }
}

// Auto-run the screen OCR fix
console.log('📸 Starting Screen OCR fix in 2 seconds...');
console.log('💡 ALLOW screen sharing when prompted!');

setTimeout(() => {
    forceScreenOCRWorking().catch(error => {
        console.error('❌ Screen OCR fix failed:', error);
    });
}, 2000);