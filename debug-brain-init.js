// Debug script to test brain initialization manually
// Run this in the browser console of the Velvet app

console.log('🔍 BRAIN INITIALIZATION DEBUG SCRIPT');
console.log('=====================================');

// Check if all brain components are loaded
console.log('1. Checking brain component availability:');
console.log('   VelvetBrain:', typeof window.VelvetBrain);
console.log('   VelvetMemory:', typeof window.VelvetMemory);
console.log('   VelvetPersonality:', typeof window.VelvetPersonality);
console.log('   ActionDecider:', typeof window.ActionDecider);
console.log('   SensoryInput:', typeof window.SensoryInput);

// Check if brain integration is available
console.log('2. Checking brain integration:');
console.log('   brainIntegration:', typeof window.brainIntegration);
console.log('   initializeVelvetBrain:', typeof window.initializeVelvetBrain);

// Check if brain is already initialized
console.log('3. Checking brain status:');
console.log('   velvetBrain:', typeof window.velvetBrain);
console.log('   velvetBrain.isActive:', window.velvetBrain?.isActive);

// Check if supporting systems are available
console.log('4. Checking supporting systems:');
console.log('   screenOCRMonitor:', typeof window.screenOCRMonitor);
console.log('   screenOCRMonitor.isActive:', window.screenOCRMonitor?.isActive);
console.log('   screenOCRMonitor.currentScreenText length:', window.screenOCRMonitor?.currentScreenText?.length);

// Test manual brain initialization
console.log('5. Testing manual brain initialization...');
if (typeof window.initializeVelvetBrain === 'function') {
    window.initializeVelvetBrain().then(result => {
        console.log('✅ Manual brain initialization result:', result);
        
        // Test brain context
        if (window.velvetAI && window.velvetAI.getBrainContext) {
            window.velvetAI.getBrainContext().then(context => {
                console.log('🧠 Brain context test result:', context.substring(0, 300) + '...');
            });
        }
    }).catch(error => {
        console.error('❌ Manual brain initialization failed:', error);
    });
} else {
    console.error('❌ initializeVelvetBrain function not available');
}

console.log('=====================================');
console.log('🔍 Debug script complete. Check results above.');