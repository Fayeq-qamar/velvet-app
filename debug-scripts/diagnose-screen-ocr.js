// Quick diagnostic script to check Screen OCR Monitor status
// Run this in the browser console to diagnose the issue

console.log('🔍 DIAGNOSING SCREEN OCR ISSUE');
console.log('================================');

async function diagnoseScreenOCR() {
    console.log('\n📊 Step 1: Check if monitor exists...');
    
    if (typeof window.screenOCRMonitor !== 'undefined' && window.screenOCRMonitor) {
        console.log('✅ Screen OCR Monitor exists');
        console.log('📋 Monitor details:');
        console.log('  • isActive:', window.screenOCRMonitor.isActive);
        console.log('  • displayStream:', !!window.screenOCRMonitor.displayStream);
        console.log('  • captureInterval:', !!window.screenOCRMonitor.captureInterval);
        console.log('  • ocrWorker:', !!window.screenOCRMonitor.ocrWorker);
        console.log('  • currentScreenText:', window.screenOCRMonitor.currentScreenText?.length || 0, 'characters');
        console.log('  • textHistory:', window.screenOCRMonitor.textHistory?.length || 0, 'entries');
        console.log('  • lastCaptureTime:', new Date(window.screenOCRMonitor.lastCaptureTime || 0).toLocaleTimeString());
        
        // Check context
        const context = window.screenOCRMonitor.getCurrentContext();
        console.log('  • currentContext:', context ? 'Available' : 'None');
        if (context) {
            console.log('    - recentCaptures:', context.recentCaptures?.length || 0);
            console.log('    - context type:', context.context?.type || 'unknown');
        }
        
    } else {
        console.log('❌ Screen OCR Monitor not found');
        console.log('💡 Try running: await initializeContextAwarenessSystem()');
        return;
    }
    
    console.log('\n📊 Step 2: Check Unified Context Engine...');
    
    if (typeof window.unifiedContextEngine !== 'undefined' && window.unifiedContextEngine) {
        console.log('✅ Unified Context Engine exists');
        console.log('📋 Context details:');
        console.log('  • isActive:', window.unifiedContextEngine.isActive);
        console.log('  • screenMonitor:', !!window.unifiedContextEngine.screenMonitor);
        console.log('  • audioMonitor:', !!window.unifiedContextEngine.audioMonitor);
        
        const completeContext = window.unifiedContextEngine.getCurrentCompleteContext();
        console.log('  • current context:', completeContext.current?.type || 'None');
        console.log('  • screen context:', completeContext.screen ? 'Available' : 'None');
        console.log('  • audio context:', completeContext.audio ? 'Available' : 'None');
        
    } else {
        console.log('❌ Unified Context Engine not found');
    }
    
    console.log('\n🔧 Step 3: Quick fix attempts...');
    
    if (window.screenOCRMonitor && !window.screenOCRMonitor.displayStream) {
        console.log('⚠️ No display stream - screen capture permission likely denied');
        console.log('💡 Attempting to restart screen monitoring...');
        
        try {
            const started = await window.screenOCRMonitor.startMonitoring();
            if (started) {
                console.log('✅ Screen monitoring restarted successfully');
                console.log('📸 Should see "📸 Capturing real screen..." logs every 5 seconds now');
            } else {
                console.log('❌ Failed to restart screen monitoring');
                console.log('💡 You need to allow screen sharing when prompted');
            }
        } catch (error) {
            console.log('❌ Error restarting screen monitoring:', error.message);
            if (error.name === 'NotAllowedError') {
                console.log('💡 Screen sharing permission denied - reload page and allow when prompted');
            }
        }
    }
    
    console.log('\n📋 DIAGNOSIS COMPLETE');
    console.log('💡 If screen context is still null after allowing permission:');
    console.log('   1. Reload the page');
    console.log('   2. Allow screen sharing when prompted');
    console.log('   3. Wait 5-10 seconds for first OCR capture');
    console.log('   4. Check console for "📸 Capturing real screen..." messages');
}

// Run the diagnosis
diagnoseScreenOCR().catch(console.error);