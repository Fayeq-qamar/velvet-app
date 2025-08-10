// COPY-PASTE THIS ENTIRE SCRIPT IN VELVET'S DEVTOOLS CONSOLE
// TO VERIFY THE COMPLETE DATA FLOW FROM RUST -> PYTHON -> ELECTRON -> AI

console.log('🔍 VELVET DATA FLOW VERIFICATION');
console.log('===============================');

async function verifyDataFlow() {
    console.log('\n📋 1. TESTING PREPROCESSING WORKER HEALTH...');
    
    try {
        const health = await fetch('http://127.0.0.1:8001/health');
        const healthData = await health.json();
        console.log('✅ Python Worker:', healthData);
    } catch (error) {
        console.error('❌ Python Worker down:', error.message);
        return;
    }
    
    console.log('\n📋 2. TESTING BRAIN CONTEXT IPC...');
    
    if (typeof window.electronAPI !== 'undefined') {
        try {
            const brainContext = await window.electronAPI.invoke('get-brain-context');
            console.log('🧠 Brain Context from Main Process:');
            console.log(brainContext);
            
            const streamStatus = await window.electronAPI.invoke('get-stream-status');
            console.log('📡 Stream Status:', streamStatus);
            
        } catch (error) {
            console.error('❌ IPC test failed:', error);
        }
    } else {
        console.error('❌ electronAPI not available');
        return;
    }
    
    console.log('\n📋 3. TESTING AI INTEGRATION...');
    
    if (typeof window.getVelvetResponse !== 'undefined') {
        try {
            console.log('💬 Asking AI about screen content...');
            const response = await window.getVelvetResponse('What can you see on my screen right now? Be specific.');
            console.log('🤖 AI Response:', response);
            
            // Check if response contains streaming brain context
            if (response.includes('STREAMING BRAIN CONTEXT') || response.includes('REAL-TIME CONSCIOUSNESS')) {
                console.log('✅ AI is receiving streaming brain context!');
            } else {
                console.log('⚠️ AI might not be getting streaming brain context');
            }
            
        } catch (error) {
            console.error('❌ AI test failed:', error);
        }
    } else {
        console.error('❌ Velvet AI not available');
    }
    
    console.log('\n📋 4. SETTING UP LIVE MONITORING...');
    
    // Set up listener for brain context updates
    if (window.electronAPI && window.electronAPI.on) {
        try {
            window.electronAPI.on('brain-context-update', (context) => {
                console.log('🚨 LIVE BRAIN UPDATE RECEIVED:');
                console.log('   📖 Screen Text Length:', context.screenText.length);
                console.log('   📖 Screen Text Preview:', context.screenText.substring(0, 100));
                console.log('   📊 OCR Confidence:', context.ocrConfidence);
                console.log('   🕒 Timestamp:', new Date(context.timestamp).toLocaleTimeString());
            });
            console.log('✅ Live brain context monitoring enabled');
            console.log('   Watch for "🚨 LIVE BRAIN UPDATE RECEIVED" messages every few seconds');
        } catch (error) {
            console.log('⚠️ Could not set up live monitoring:', error);
        }
    }
    
    console.log('\n📋 5. CHECKING GLOBAL STATE...');
    
    console.log('Available globals:');
    const velvetGlobals = Object.keys(window).filter(key => 
        key.includes('velvet') || key.includes('brain') || key.includes('screen')
    );
    console.log('   Velvet-related:', velvetGlobals);
    
    console.log('\n===============================');
    console.log('🔍 Verification complete!');
    console.log('\n🎯 WHAT TO LOOK FOR:');
    console.log('1. ✅ Python Worker should be healthy');
    console.log('2. ✅ Stream status should show connected: true');
    console.log('3. ✅ AI should mention streaming brain context');
    console.log('4. ✅ Live brain updates should appear every few seconds');
    console.log('\nIf any step fails, the data pipeline has an issue!');
}

// Run verification
verifyDataFlow();

// Also test the AI brain context method directly
setTimeout(async () => {
    console.log('\n🧠 TESTING AI BRAIN CONTEXT METHOD DIRECTLY...');
    if (window.velvetAI && window.velvetAI.getBrainContext) {
        try {
            const aiContext = await window.velvetAI.getBrainContext();
            console.log('🤖 AI Brain Context Method Result:');
            console.log(aiContext);
            
            if (aiContext.includes('STREAMING BRAIN CONTEXT')) {
                console.log('✅ AI getBrainContext is working with streaming data!');
            } else {
                console.log('⚠️ AI getBrainContext might be using fallback mode');
            }
        } catch (error) {
            console.error('❌ AI getBrainContext failed:', error);
        }
    }
}, 2000);