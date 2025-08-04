// Browser Test Script for Velvet Brain Architecture
// Paste this into Velvet DevTools Console (F12)

console.log('🧠 VELVET BRAIN BROWSER TEST - STARTING');
console.log('=======================================');

async function testVelvetBrainBrowser() {
    try {
        console.log('🔍 Checking Velvet Brain availability...');
        
        // Check if Velvet Brain is available
        if (typeof VelvetBrain === 'undefined') {
            console.log('❌ VelvetBrain not found in global scope');
            console.log('🔍 Checking for brain context or integration...');
            
            // Check for brain context in global scope
            if (typeof window.velvetBrainContext !== 'undefined') {
                console.log('✅ velvetBrainContext found:', window.velvetBrainContext);
            }
            
            // Check for brain integration
            if (typeof window.velvetBrain !== 'undefined') {
                console.log('✅ velvetBrain instance found:', window.velvetBrain);
            }
            
            return { success: false, error: 'VelvetBrain class not available in browser' };
        }
        
        console.log('✅ VelvetBrain found, initializing...');
        const brain = new VelvetBrain();
        
        let results = [];
        
        // Test 1: Brain Initialization
        console.log('\n🧠 Test 1: Brain Initialization');
        try {
            await brain.initialize();
            console.log('✅ Brain initialized successfully');
            console.log('Brain state:', {
                isActive: brain.isActive,
                consciousnessLevel: brain.consciousnessLevel,
                hasMemory: !!brain.memory,
                hasPersonality: !!brain.personality,
                hasSensoryInput: !!brain.sensoryInput
            });
            results.push({ test: 'initialization', success: true, result: 'Brain initialized' });
        } catch (error) {
            console.log('❌ Brain initialization failed:', error.message);
            results.push({ test: 'initialization', success: false, error: error.message });
        }
        
        // Test 2: Consciousness Status
        console.log('\n🌟 Test 2: Consciousness Status');
        try {
            const status = brain.getConsciousnessStatus();
            console.log('✅ Consciousness status retrieved:', status);
            results.push({ test: 'consciousness-status', success: true, result: status });
        } catch (error) {
            console.log('❌ Consciousness status failed:', error.message);
            results.push({ test: 'consciousness-status', success: false, error: error.message });
        }
        
        // Test 3: Start Thinking Process
        console.log('\n💭 Test 3: Thinking Process');
        try {
            // Find the correct method name for starting consciousness
            let thinkingStarted = false;
            
            if (typeof brain.startThinking === 'function') {
                brain.startThinking();
                thinkingStarted = true;
            } else if (typeof brain.beginThinking === 'function') {
                brain.beginThinking();
                thinkingStarted = true;
            } else if (typeof brain.start === 'function') {
                brain.start();
                thinkingStarted = true;
            } else if (brain.isActive) {
                console.log('✅ Brain already thinking (isActive: true)');
                thinkingStarted = true;
            }
            
            if (thinkingStarted) {
                console.log('✅ Thinking process started');
                
                // Monitor thinking for 5 seconds
                console.log('📊 Monitoring consciousness for 5 seconds...');
                const startMetrics = brain.metrics ? { ...brain.metrics } : {};
                
                await new Promise(resolve => setTimeout(resolve, 5000));
                
                const endMetrics = brain.metrics ? { ...brain.metrics } : {};
                console.log('📈 Metrics comparison:');
                console.log('Start:', startMetrics);
                console.log('End:', endMetrics);
                
                results.push({ test: 'thinking-process', success: true, result: { startMetrics, endMetrics } });
            } else {
                console.log('❌ Could not start thinking process');
                results.push({ test: 'thinking-process', success: false, error: 'No start method found' });
            }
            
        } catch (error) {
            console.log('❌ Thinking process failed:', error.message);
            results.push({ test: 'thinking-process', success: false, error: error.message });
        }
        
        // Test 4: Memory System
        console.log('\n🧩 Test 4: Memory System');
        try {
            if (brain.memory) {
                // Test memory storage
                const testMemory = {
                    type: 'browser_test',
                    content: 'Testing memory system from browser',
                    timestamp: Date.now(),
                    importance: 0.8
                };
                
                brain.memory.store(testMemory);
                console.log('✅ Memory stored successfully');
                
                // Test memory recall
                const recalled = brain.memory.recall('browser_test');
                console.log('✅ Memory recalled:', recalled);
                
                results.push({ test: 'memory-system', success: true, result: 'Memory storage and recall working' });
            } else {
                console.log('⚠️ Memory system not connected');
                results.push({ test: 'memory-system', success: false, error: 'Memory system not available' });
            }
        } catch (error) {
            console.log('❌ Memory system failed:', error.message);
            results.push({ test: 'memory-system', success: false, error: error.message });
        }
        
        // Test 5: Sensory Input
        console.log('\n📡 Test 5: Sensory Input System');
        try {
            if (brain.sensoryInput) {
                console.log('✅ Sensory input system connected');
                console.log('Sensor status:', brain.sensoryInput.sensorStatus);
                results.push({ test: 'sensory-input', success: true, result: brain.sensoryInput.sensorStatus });
            } else {
                console.log('⚠️ Sensory input system not connected');
                results.push({ test: 'sensory-input', success: false, error: 'Sensory input not available' });
            }
        } catch (error) {
            console.log('❌ Sensory input failed:', error.message);
            results.push({ test: 'sensory-input', success: false, error: error.message });
        }
        
        // Test 6: Brain Configuration
        console.log('\n⚙️ Test 6: Brain Configuration');
        try {
            if (brain.config) {
                console.log('✅ Brain configuration:', brain.config);
                results.push({ test: 'configuration', success: true, result: brain.config });
            } else {
                console.log('⚠️ Brain configuration not available');
                results.push({ test: 'configuration', success: false, error: 'Configuration not available' });
            }
        } catch (error) {
            console.log('❌ Configuration test failed:', error.message);
            results.push({ test: 'configuration', success: false, error: error.message });
        }
        
        // Cleanup
        try {
            if (typeof brain.stop === 'function') {
                brain.stop();
                console.log('🛑 Brain stopped cleanly');
            } else if (typeof brain.pauseThinking === 'function') {
                brain.pauseThinking();
                console.log('⏸️ Brain paused cleanly');
            }
        } catch (error) {
            console.log('⚠️ Cleanup warning:', error.message);
        }
        
        const successCount = results.filter(r => r.success).length;
        const successRate = (successCount / results.length) * 100;
        
        console.log('\n🏁 VELVET BRAIN BROWSER TEST COMPLETED');
        console.log('====================================');
        console.log(`Success rate: ${successRate.toFixed(1)}% (${successCount}/${results.length})`);
        
        return {
            success: true,
            successRate,
            totalTests: results.length,
            results,
            brainState: {
                isActive: brain.isActive,
                consciousnessLevel: brain.consciousnessLevel,
                hasSubsystems: {
                    memory: !!brain.memory,
                    personality: !!brain.personality,
                    sensoryInput: !!brain.sensoryInput,
                    actionDecider: !!brain.actionDecider
                },
                configuration: brain.config,
                metrics: brain.metrics
            }
        };
        
    } catch (error) {
        console.log('❌ VELVET BRAIN BROWSER TEST FAILED');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
        
        return {
            success: false,
            error: error.message
        };
    }
}

// Auto-run the test
testVelvetBrainBrowser().then(result => {
    console.log('\n📋 FINAL VELVET BRAIN TEST RESULT:');
    console.log('=================================');
    console.log(result);
    
    // Store result globally for inspection
    window.velvetBrainTestResult = result;
    console.log('💾 Result stored in window.velvetBrainTestResult');
});