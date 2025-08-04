// Real Velvet Brain Test - Consciousness loop and sensory integration
// Testing the 6-step thinking process and unified AI consciousness

const VelvetBrain = require('./src/brain/VelvetBrain.js');

async function testVelvetBrainReal() {
    console.log('🧠 REAL VELVET BRAIN TEST - STARTING');
    console.log('====================================');
    
    const brain = new VelvetBrain();
    
    try {
        // Test brain initialization
        console.log('📋 Initializing Velvet Brain...');
        await brain.initialize();
        console.log('✅ Velvet Brain initialized successfully');
        
        console.log('\n🔬 BRAIN ARCHITECTURE ANALYSIS:');
        console.log('==============================');
        
        // Check brain components
        console.log(`Sensory Input: ${brain.sensoryInput ? '✅ Connected' : '❌ Missing'}`);
        console.log(`Memory System: ${brain.memory ? '✅ Connected' : '❌ Missing'}`);
        console.log(`Personality: ${brain.personality ? '✅ Connected' : '❌ Missing'}`);
        console.log(`Action Decider: ${brain.actionDecider ? '✅ Connected' : '❌ Missing'}`);
        console.log(`Consciousness Level: ${brain.consciousnessLevel}`);
        console.log(`Active Status: ${brain.isActive ? '✅ Active' : '❌ Inactive'}`);
        
        // Test consciousness metrics
        console.log('\n⚡ CONSCIOUSNESS METRICS:');
        console.log('========================');
        if (brain.metrics) {
            console.log(`Thought cycles: ${brain.metrics.thoughtCycles}`);
            console.log(`Successful predictions: ${brain.metrics.successfulPredictions}`);
            console.log(`User interactions: ${brain.metrics.userInteractions}`);
            console.log(`Learning accuracy: ${brain.metrics.learningAccuracy}`);
            console.log(`Response relevance: ${brain.metrics.responseRelevance}`);
        }
        
        // Test configuration
        console.log('\n⚙️ BRAIN CONFIGURATION:');
        console.log('=======================');
        if (brain.config) {
            console.log(`Thinking interval: ${brain.config.thinkingIntervalMs}ms`);
            console.log(`Min consciousness level: ${brain.config.minConsciousnessLevel}`);
            console.log(`Max memory items: ${brain.config.maxMemoryItems}`);
            console.log(`Learning rate: ${brain.config.learningRate}`);
            console.log(`Personality strength: ${brain.config.personalityStrength}`);
        }
        
        // Test thinking process
        console.log('\n🤔 TESTING CONSCIOUSNESS THINKING LOOP:');
        console.log('=======================================');
        
        let thinkingResults = [];
        const testDuration = 10000; // 10 seconds
        
        console.log(`Running consciousness for ${testDuration/1000} seconds...`);
        
        // Start consciousness
        brain.startThinking();
        console.log('✅ Consciousness loop started');
        
        // Monitor thinking for test duration
        const startTime = Date.now();
        let thoughtCount = 0;
        
        const thinkingMonitor = setInterval(() => {
            thoughtCount++;
            const currentMetrics = brain.getConsciousnessStatus();
            thinkingResults.push({
                timestamp: Date.now() - startTime,
                consciousnessLevel: currentMetrics.consciousnessLevel,
                thoughtCycles: currentMetrics.thoughtCycles,
                isActive: currentMetrics.isActive
            });
            
            console.log(`💭 Thought ${thoughtCount}: Level=${currentMetrics.consciousnessLevel}, Cycles=${currentMetrics.thoughtCycles}`);
        }, 3000); // Monitor every 3 seconds
        
        // Wait for test duration
        await new Promise(resolve => setTimeout(resolve, testDuration));
        
        // Stop consciousness and monitoring
        clearInterval(thinkingMonitor);
        brain.pauseThinking();
        console.log('⏸️  Consciousness paused for analysis');
        
        // Analyze thinking results
        console.log('\n📊 CONSCIOUSNESS ANALYSIS RESULTS:');
        console.log('==================================');
        console.log(`Total thought observations: ${thinkingResults.length}`);
        
        if (thinkingResults.length > 0) {
            const avgConsciousness = thinkingResults.reduce((sum, r) => sum + r.consciousnessLevel, 0) / thinkingResults.length;
            const finalCycles = thinkingResults[thinkingResults.length - 1].thoughtCycles;
            const initialCycles = thinkingResults[0].thoughtCycles;
            const cycleIncrease = finalCycles - initialCycles;
            
            console.log(`Average consciousness level: ${avgConsciousness.toFixed(3)}`);
            console.log(`Total thought cycles during test: ${cycleIncrease}`);
            console.log(`Thinking consistency: ${thinkingResults.every(r => r.isActive) ? '✅ Stable' : '❌ Unstable'}`);
        }
        
        // Test brain state methods
        console.log('\n🔍 TESTING BRAIN STATE METHODS:');
        console.log('===============================');
        
        try {
            const status = brain.getConsciousnessStatus();
            console.log('✅ getConsciousnessStatus() works');
            console.log(`Current status:`, {
                isActive: status.isActive,
                consciousnessLevel: status.consciousnessLevel,
                thoughtCycles: status.thoughtCycles,
                lastThoughtTime: status.lastThoughtTime
            });
        } catch (error) {
            console.log('❌ getConsciousnessStatus() failed:', error.message);
        }
        
        try {
            const currentLevel = brain.getConsciousnessLevel();
            console.log(`✅ getConsciousnessLevel(): ${currentLevel}`);
        } catch (error) {
            console.log('❌ getConsciousnessLevel() failed:', error.message);
        }
        
        // Test memory integration
        console.log('\n🧠 TESTING MEMORY INTEGRATION:');
        console.log('==============================');
        
        if (brain.memory) {
            try {
                // Test memory storage
                console.log('Testing memory storage...');
                const testMemory = {
                    type: 'user_interaction',
                    content: 'User tested Velvet Brain consciousness',
                    timestamp: Date.now(),
                    importance: 0.7
                };
                
                brain.memory.store(testMemory);
                console.log('✅ Memory storage successful');
                
                // Test memory retrieval
                const memories = brain.memory.recall('user_interaction');
                console.log(`✅ Memory recall successful: ${memories ? memories.length : 0} memories found`);
                
            } catch (error) {
                console.log('❌ Memory integration failed:', error.message);
            }
        } else {
            console.log('⚠️  Memory system not connected');
        }
        
        // Clean shutdown
        brain.stop();
        console.log('🛑 Brain consciousness stopped');
        
        return {
            success: true,
            initialized: true,
            componentsConnected: {
                sensoryInput: !!brain.sensoryInput,
                memory: !!brain.memory,
                personality: !!brain.personality,
                actionDecider: !!brain.actionDecider
            },
            consciousnessLevel: brain.consciousnessLevel,
            thinkingResults: thinkingResults,
            finalMetrics: brain.metrics
        };
        
    } catch (error) {
        console.log('❌ VELVET BRAIN TEST FAILED');
        console.log(`Error: ${error.message}`);
        console.log(`Stack: ${error.stack}`);
        
        return {
            success: false,
            error: error.message,
            initialized: false
        };
    }
}

// Run the test
testVelvetBrainReal()
    .then(result => {
        console.log('\n🏁 VELVET BRAIN TEST COMPLETED');
        console.log('==============================');
        console.log('Final result:', result);
        process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Test runner failed:', error);
        process.exit(1);
    });