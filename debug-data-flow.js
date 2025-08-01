// Debug script to test the complete data flow pipeline
// Run this in Velvet's developer console to trace data flow

console.log('🔍 DEBUGGING VELVET DATA FLOW PIPELINE');
console.log('=====================================');

async function debugDataFlow() {
    console.log('\n📋 1. TESTING PREPROCESSING WORKER DIRECTLY...');
    
    try {
        // Test preprocessing worker health
        const healthResponse = await fetch('http://127.0.0.1:8001/health');
        const healthData = await healthResponse.json();
        console.log('✅ Preprocessing Worker Health:', healthData);
        
        // Create a simple test image (1x1 pixel PNG)
        const testImage = new Blob([
            new Uint8Array([
                137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0, 144, 119, 83, 222, 0, 0, 0, 12, 73, 68, 65, 84, 8, 215, 99, 248, 15, 0, 0, 1, 0, 1, 0, 24, 221, 219, 219, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130
            ])
        ], { type: 'image/png' });
        
        const formData = new FormData();
        formData.append('image', testImage, 'test.png');
        
        console.log('🖼️ Sending test image to preprocessing worker...');
        const analyzeResponse = await fetch('http://127.0.0.1:8001/velvet/analyze/', {
            method: 'POST',
            body: formData
        });
        
        const analyzeData = await analyzeResponse.json();
        console.log('📊 Preprocessing Worker Response:', analyzeData);
        
    } catch (error) {
        console.error('❌ Direct preprocessing worker test failed:', error);
    }
    
    console.log('\n📋 2. TESTING GRPC STREAM CLIENT...');
    
    // Check if stream client exists
    if (typeof window.electronAPI === 'undefined') {
        console.error('❌ electronAPI not available - we\'re not in Electron renderer');
        return;
    }
    
    try {
        // Test brain context retrieval
        const brainContext = await window.electronAPI.invoke('get-brain-context');
        console.log('🧠 Brain Context from Main Process:', brainContext);
        
        const streamStatus = await window.electronAPI.invoke('get-stream-status');
        console.log('📡 Stream Status:', streamStatus);
        
    } catch (error) {
        console.error('❌ Stream client test failed:', error);
    }
    
    console.log('\n📋 3. TESTING AI INTEGRATION...');
    
    // Test if AI can access brain context
    if (typeof window.velvetAI !== 'undefined') {
        try {
            const aiContext = await window.velvetAI.getBrainContext();
            console.log('🤖 AI Brain Context:', aiContext.substring(0, 500) + '...');
            
            // Test actual AI message processing
            console.log('💬 Testing AI message processing...');
            const testResponse = await window.getVelvetResponse('What can you see on my screen right now?');
            console.log('🗣️ AI Response:', testResponse);
            
        } catch (error) {
            console.error('❌ AI integration test failed:', error);
        }
    } else {
        console.error('❌ velvetAI not available');
    }
    
    console.log('\n📋 4. CHECKING GLOBAL BRAIN CONTEXT...');
    
    // Check if global brain context is being updated
    const globals = Object.keys(window).filter(key => key.includes('brain') || key.includes('velvet'));
    console.log('🌐 Global Brain-related Objects:', globals);
    
    globals.forEach(key => {
        console.log(`   ${key}:`, typeof window[key], window[key]);
    });
    
    console.log('\n=====================================');
    console.log('🔍 Data flow debugging complete');
    console.log('Check the logs above to see where data is flowing or breaking');
}

// Run the debug
debugDataFlow();

// Also set up a listener for brain context updates if available
if (typeof window.electronAPI !== 'undefined') {
    try {
        window.electronAPI.on('brain-context-update', (context) => {
            console.log('🚨 LIVE BRAIN CONTEXT UPDATE RECEIVED:', context);
        });
        console.log('✅ Set up brain context update listener');
    } catch (error) {
        console.log('⚠️ Could not set up brain context listener:', error);
    }
}