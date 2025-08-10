/**
 * ENABLE SCREEN READING - Paste in Console
 * This will make Velvet actually read your screen content
 */

console.log('👁️ ENABLING VELVET SCREEN READING');
console.log('==================================');

async function enableScreenReading() {
    try {
        console.log('🔧 Setting up screen reading system...');
        
        // Check if we have the necessary APIs
        if (!window.electronAPI?.desktopCapturer) {
            console.error('❌ Desktop capturer API not available');
            return false;
        }
        
        // Load Tesseract for OCR if not already loaded
        if (typeof Tesseract === 'undefined') {
            console.log('📥 Loading Tesseract.js for OCR...');
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js';
            document.head.appendChild(script);
            
            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
                setTimeout(reject, 10000); // 10 second timeout
            });
            
            console.log('✅ Tesseract.js loaded successfully');
        }
        
        // Initialize OCR worker
        console.log('🔧 Initializing OCR worker...');
        const worker = Tesseract.createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        console.log('✅ OCR worker ready');
        
        // Create screen reading function
        async function captureAndReadScreen() {
            try {
                console.log('📸 Capturing screen for reading...');
                
                // Get screen sources
                const sourcesResult = await window.electronAPI.desktopCapturer.getSources({ types: ['screen'] });
                if (!sourcesResult.success || sourcesResult.sources.length === 0) {
                    console.error('❌ No screen sources available');
                    return null;
                }
                
                // Use the first (primary) screen
                const primarySource = sourcesResult.sources[0];
                console.log('📺 Using screen:', primarySource.name);
                
                // Capture screen
                const captureResult = await window.electronAPI.desktopCapturer.captureScreenForOCR(primarySource.id);
                if (!captureResult.imageDataUrl) {
                    console.error('❌ Screen capture failed');
                    return null;
                }
                
                console.log('📷 Screen captured, processing with OCR...');
                
                // Process with OCR
                const { data: { text, confidence } } = await worker.recognize(captureResult.imageDataUrl);
                
                // Clean up the text
                const cleanText = text.replace(/\s+/g, ' ').trim();
                const wordCount = cleanText.split(' ').length;
                
                console.log(`✅ Screen read successfully!`);
                console.log(`📊 OCR Confidence: ${Math.round(confidence)}%`);
                console.log(`📝 Extracted ${cleanText.length} characters, ${wordCount} words`);
                
                if (cleanText.length > 100) {
                    console.log(`📄 Screen content preview: "${cleanText.substring(0, 150)}..."`);
                } else if (cleanText.length > 0) {
                    console.log(`📄 Screen content: "${cleanText}"`);
                } else {
                    console.log('📄 No readable text found on screen');
                }
                
                // Store in global for Velvet AI to access
                window.currentScreenText = cleanText;
                window.lastScreenCapture = {
                    text: cleanText,
                    confidence: confidence,
                    timestamp: Date.now(),
                    wordCount: wordCount
                };
                
                // Notify Velvet brain if available
                if (window.velvetBrain && typeof window.velvetBrain.updateScreenContext === 'function') {
                    window.velvetBrain.updateScreenContext({
                        text: cleanText,
                        confidence: confidence,
                        timestamp: Date.now()
                    });
                    console.log('🧠 Updated Velvet brain with screen context');
                }
                
                return {
                    text: cleanText,
                    confidence: confidence,
                    timestamp: Date.now()
                };
                
            } catch (error) {
                console.error('❌ Screen capture/OCR failed:', error);
                return null;
            }
        }
        
        // Start periodic screen reading
        console.log('⏰ Starting periodic screen reading (every 10 seconds)...');
        
        // Initial capture
        await captureAndReadScreen();
        
        // Set up interval
        const screenReadingInterval = setInterval(async () => {
            await captureAndReadScreen();
        }, 10000); // Every 10 seconds
        
        // Store controls globally
        window.stopScreenReading = () => {
            clearInterval(screenReadingInterval);
            worker.terminate();
            console.log('🛑 Screen reading stopped');
        };
        
        window.readScreenNow = () => {
            return captureAndReadScreen();
        };
        
        window.getLastScreenText = () => {
            return window.lastScreenCapture;
        };
        
        console.log('✅ SCREEN READING IS NOW ACTIVE!');
        console.log('📖 Velvet will read your screen every 10 seconds');
        console.log('');
        console.log('🎮 Controls:');
        console.log('  • Read now: window.readScreenNow()');
        console.log('  • Stop reading: window.stopScreenReading()');
        console.log('  • Get last text: window.getLastScreenText()');
        console.log('');
        console.log('💡 Try saying "Velvet, what\'s on my screen?" after a few seconds!');
        
        return true;
        
    } catch (error) {
        console.error('❌ Failed to enable screen reading:', error);
        return false;
    }
}

// Auto-start screen reading
console.log('🚀 Starting screen reading in 2 seconds...');
setTimeout(async () => {
    const success = await enableScreenReading();
    if (success) {
        console.log('');
        console.log('🎉 SUCCESS! Velvet can now read your screen!');
        console.log('🎯 Perfect for your YC demo - Velvet will now understand screen context');
    } else {
        console.log('');
        console.log('❌ Screen reading setup failed');
        console.log('💡 Try refreshing and running the script again');
    }
}, 2000);