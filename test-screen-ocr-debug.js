// Debug Script for Screen OCR Issues
// Run this in the browser console to diagnose screen OCR problems

console.log('🔍 SCREEN OCR DEBUG SCRIPT');
console.log('==========================');

async function debugScreenOCR() {
    console.log('\n🔍 STEP 1: Environment Check');
    console.log('============================');
    
    // Check if we're in Electron
    const isElectron = navigator.userAgent.includes('Electron');
    console.log('• Environment:', isElectron ? 'Electron ✅' : 'Regular Browser ⚠️');
    
    // Check screen capture API
    const hasScreenCapture = typeof navigator.mediaDevices?.getDisplayMedia === 'function';
    console.log('• Screen Capture API:', hasScreenCapture ? 'Available ✅' : 'Not Available ❌');
    
    // Check Tesseract
    const hasTesseract = typeof Tesseract !== 'undefined';
    console.log('• Tesseract.js:', hasTesseract ? 'Loaded ✅' : 'Not Loaded ❌');
    
    if (hasTesseract) {
        console.log('• Tesseract version:', Tesseract?.version || 'Unknown');
    }
    
    // Check RealScreenOCRMonitor class
    const hasMonitorClass = typeof RealScreenOCRMonitor !== 'undefined';
    console.log('• RealScreenOCRMonitor class:', hasMonitorClass ? 'Available ✅' : 'Not Loaded ❌');
    
    console.log('\n🔍 STEP 2: Test Tesseract.js Directly');
    console.log('=====================================');
    
    if (!hasTesseract) {
        console.error('❌ Tesseract.js not loaded - cannot continue');
        console.error('💡 Make sure the CDN script is loaded: https://unpkg.com/tesseract.js@4.1.1/dist/tesseract.min.js');
        return;
    }
    
    try {
        console.log('🔧 Creating Tesseract worker...');
        const worker = await Tesseract.createWorker();
        console.log('✅ Tesseract worker created successfully');
        
        console.log('📚 Loading language data...');
        await worker.loadLanguage('eng');
        console.log('✅ Language data loaded');
        
        console.log('🔧 Initializing engine...');
        await worker.initialize('eng');
        console.log('✅ Tesseract engine initialized');
        
        console.log('🧪 Testing OCR with sample text...');
        // Create a simple image with text for testing
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 300, 100);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Hello World Test', 50, 50);
        
        const imageData = canvas.toDataURL();
        
        const result = await worker.recognize(imageData);
        console.log('✅ OCR Test Result:', result.data.text.trim());
        console.log('✅ OCR Confidence:', (result.data.confidence / 100).toFixed(2));
        
        await worker.terminate();
        console.log('✅ Tesseract worker terminated');
        
    } catch (error) {
        console.error('❌ Tesseract test failed:', error);
        return;
    }
    
    console.log('\n🔍 STEP 3: Test Screen Capture Permission');
    console.log('==========================================');
    
    if (!hasScreenCapture) {
        console.error('❌ Screen capture API not available');
        console.error('💡 This browser/environment does not support screen capture');
        return;
    }
    
    try {
        console.log('🔐 Requesting screen capture permission...');
        console.log('💡 A dialog should appear - please allow screen sharing');
        
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen',
                width: { ideal: 1920, max: 1920 },
                height: { ideal: 1080, max: 1080 }
            }
        });
        
        console.log('✅ Screen capture permission granted');
        console.log('📊 Stream details:', {
            id: stream.id,
            active: stream.active,
            tracks: stream.getTracks().length
        });
        
        // Stop the stream
        stream.getTracks().forEach(track => track.stop());
        console.log('✅ Screen capture stream stopped');
        
    } catch (error) {
        console.error('❌ Screen capture permission failed:', error);
        if (error.name === 'NotAllowedError') {
            console.error('💡 User denied permission - try again and allow when prompted');
        } else if (error.name === 'NotSupportedError') {
            console.error('💡 Screen capture not supported in this browser');
        }
        return;
    }
    
    console.log('\n🔍 STEP 4: Test RealScreenOCRMonitor');
    console.log('====================================');
    
    if (!hasMonitorClass) {
        console.error('❌ RealScreenOCRMonitor class not available');
        console.error('💡 Make sure screen-ocr-monitor-real.js is loaded');
        return;
    }
    
    try {
        console.log('🔧 Creating RealScreenOCRMonitor instance...');
        const monitor = new RealScreenOCRMonitor();
        
        console.log('🔧 Initializing monitor...');
        const initialized = await monitor.initialize();
        
        if (!initialized) {
            console.error('❌ Monitor initialization failed');
            return;
        }
        
        console.log('✅ Monitor initialized successfully');
        console.log('🚀 Starting monitor (this will request permission again)...');
        
        const started = await monitor.startMonitoring();
        
        if (started) {
            console.log('✅ Monitor started successfully!');
            console.log('💡 Screen OCR should now be running');
            console.log('💡 Watch for "📸 Capturing real screen..." logs every 5 seconds');
            
            // Store reference for manual control
            window.debugScreenMonitor = monitor;
            
            console.log('\n🎯 MANUAL CONTROLS:');
            console.log('==================');
            console.log('• Stop monitoring: window.debugScreenMonitor.stopMonitoring()');
            console.log('• View history: window.debugScreenMonitor.textHistory');
            console.log('• Current text: window.debugScreenMonitor.currentScreenText');
            
        } else {
            console.error('❌ Monitor failed to start');
        }
        
    } catch (error) {
        console.error('❌ RealScreenOCRMonitor test failed:', error);
    }
    
    console.log('\n✅ DEBUG COMPLETE');
    console.log('=================');
    console.log('If everything shows ✅, screen OCR should be working');
    console.log('If you see ❌, check the errors above for solutions');
}

// Export for manual use
window.debugScreenOCR = debugScreenOCR;

console.log('💡 Run: debugScreenOCR() to start comprehensive testing');