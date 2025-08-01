// Test script to verify brain-chat integration
// Open developer console in Velvet app and run this script

console.log('🧪 TESTING BRAIN-CHAT INTEGRATION');
console.log('=================================');

async function testBrainChatIntegration() {
    console.log('📋 1. Testing chat AI system...');
    
    if (typeof window.getVelvetResponse === 'function') {
        console.log('✅ getVelvetResponse function available');
        
        try {
            console.log('📤 Sending test message to AI...');
            const testMessage = "Hi, can you see what's on my screen right now?";
            const response = await window.getVelvetResponse(testMessage);
            
            console.log('📥 AI Response received:', response);
            
            // Check if response indicates screen awareness
            const hasScreenAwareness = response.toLowerCase().includes('screen') || 
                                     response.toLowerCase().includes('see') ||
                                     response.toLowerCase().includes('aware') ||
                                     response.toLowerCase().includes('monitor');
                                     
            if (hasScreenAwareness) {
                console.log('✅ AI shows screen awareness in response');
            } else {
                console.log('⚠️ AI response doesn\'t indicate screen awareness');
            }
            
        } catch (error) {
            console.error('❌ Chat AI test failed:', error);
        }
    } else {
        console.error('❌ getVelvetResponse function not available');
    }
    
    console.log('\n📋 2. Testing brain status...');
    console.log('   Brain available:', typeof window.velvetBrain);
    console.log('   Brain active:', window.velvetBrain?.isActive);
    console.log('   Screen OCR available:', typeof window.screenOCRMonitor);
    console.log('   Screen OCR active:', window.screenOCRMonitor?.isActive);
    console.log('   Current screen text length:', window.screenOCRMonitor?.currentScreenText?.length);
    
    console.log('\n📋 3. Testing brain context method...');
    if (window.velvetAI && typeof window.velvetAI.getBrainContext === 'function') {
        try {
            const context = await window.velvetAI.getBrainContext();
            console.log('✅ getBrainContext method works');
            console.log('   Context preview:', context.substring(0, 200) + '...');
            
            if (context.includes('SCREEN CONTENT') || context.includes('SCREEN AWARENESS')) {
                console.log('✅ Brain context includes screen data');
            } else {
                console.log('⚠️ Brain context missing screen data');
            }
        } catch (error) {
            console.error('❌ getBrainContext test failed:', error);
        }
    } else {
        console.error('❌ getBrainContext method not available');
    }
    
    console.log('\n=================================');
    console.log('🧪 Integration test complete');
    console.log('Check the logs above for any issues');
}

testBrainChatIntegration();