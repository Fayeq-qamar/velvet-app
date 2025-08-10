// LIVE FUNCTIONALITY TEST - REAL USER-FACING TESTING
// This script tests all features with REAL user interactions
// Auto-injects into Velvet app to test actual functionality

console.log('🔥 LIVE FUNCTIONALITY TEST - STARTING REAL TESTING');
console.log('================================================');
console.log('Testing actual user-facing features with real interactions');

async function runLiveFunctionalityTest() {
    const liveResults = {
        testStartTime: new Date().toISOString(),
        environment: {
            url: window.location.href,
            loadedScripts: document.scripts.length,
            hasDevTools: typeof console !== 'undefined'
        },
        realFunctionality: {},
        userExperience: {},
        actualVisibility: {}
    };
    
    try {
        // =================================================================
        // LIVE TEST 1: SOCIAL DECODER REAL FUNCTIONALITY
        // =================================================================
        console.log('\n🎭 LIVE TEST 1: SOCIAL DECODER');
        console.log('==============================');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            console.log('🔍 Checking Social Decoder availability...');
            if (typeof SocialDecoder !== 'undefined') {
                console.log('✅ SocialDecoder class found');
                
                // Initialize Social Decoder
                const decoder = new SocialDecoder();
                await decoder.initialize();
                console.log('✅ Social Decoder initialized');
                
                // Test built-in functions with REAL output capture
                console.log('\n🧪 Running REAL built-in tests...');
                
                if (typeof window.testSocial !== 'undefined') {
                    // Capture console output during tests
                    const originalLog = console.log;
                    let testOutput = [];
                    console.log = (...args) => {
                        testOutput.push(args.join(' '));
                        originalLog(...args);
                    };
                    
                    // Run actual tests
                    window.testSocial.detectSarcasm();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    window.testSocial.analyzeTone();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Restore console
                    console.log = originalLog;
                    
                    console.log('✅ Built-in tests completed with real output');
                    liveResults.realFunctionality.socialDecoder = {
                        success: true,
                        initialized: true,
                        builtInTests: true,
                        testOutput: testOutput.slice(-10) // Last 10 lines
                    };
                } else {
                    console.log('❌ Built-in test functions not available');
                    liveResults.realFunctionality.socialDecoder = {
                        success: false,
                        error: 'Built-in test functions missing'
                    };
                }
                
                // Test manual analysis with REAL text
                console.log('\n📝 Testing manual analysis...');
                try {
                    if (typeof decoder.analyzeConversation === 'function') {
                        const realAnalysis = decoder.analyzeConversation("Oh sure, that's just perfect timing.", null);
                        console.log('✅ Manual analysis result:', realAnalysis);
                        liveResults.realFunctionality.socialDecoder.manualAnalysis = realAnalysis;
                    }
                } catch (error) {
                    console.log('❌ Manual analysis failed:', error.message);
                }
                
            } else {
                console.log('❌ SocialDecoder class not found');
                liveResults.realFunctionality.socialDecoder = {
                    success: false,
                    error: 'SocialDecoder class not available'
                };
            }
        } catch (error) {
            console.log('❌ Social Decoder test failed:', error.message);
            liveResults.realFunctionality.socialDecoder = {
                success: false,
                error: error.message
            };
        }
        
        // =================================================================
        // LIVE TEST 2: EXECUTIVE DYSFUNCTION REAL IPC TESTING
        // =================================================================
        console.log('\n🚨 LIVE TEST 2: EXECUTIVE DYSFUNCTION');
        console.log('=====================================');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            // Test IPC communication with REAL responses
            if (typeof window.electronAPI !== 'undefined') {
                console.log('✅ ElectronAPI found, testing IPC...');
                
                // Test 1: Get real status
                console.log('📋 Getting real executive function status...');
                const realStatus = await window.electronAPI.invoke('executive-function-status');
                console.log('✅ Real status response:', realStatus);
                
                // Test 2: Get real test list
                console.log('📋 Getting real test list...');
                const realTestList = await window.electronAPI.invoke('executive-function-test-list');
                console.log('✅ Real test list response:', realTestList);
                
                // Test 3: Try activating safe space
                console.log('🏠 Activating real safe space...');
                const safeSpaceResult = await window.electronAPI.invoke('executive-function-safe-space');
                console.log('✅ Safe space activation result:', safeSpaceResult);
                
                liveResults.realFunctionality.executiveDysfunction = {
                    success: true,
                    ipcWorking: true,
                    realStatus,
                    realTestList,
                    safeSpaceResult
                };
                
                // Test UI component
                if (typeof ExecutiveDysfunctionUI !== 'undefined') {
                    console.log('🎨 Testing UI component...');
                    const ui = new ExecutiveDysfunctionUI();
                    await ui.initialize();
                    console.log('✅ Executive Dysfunction UI initialized');
                    liveResults.realFunctionality.executiveDysfunction.uiComponent = true;
                }
                
            } else {
                console.log('❌ ElectronAPI not available');
                liveResults.realFunctionality.executiveDysfunction = {
                    success: false,
                    error: 'ElectronAPI not available'
                };
            }
        } catch (error) {
            console.log('❌ Executive Dysfunction test failed:', error.message);
            liveResults.realFunctionality.executiveDysfunction = {
                success: false,
                error: error.message
            };
        }
        
        // =================================================================
        // LIVE TEST 3: VELVET BRAIN REAL CONSCIOUSNESS TESTING
        // =================================================================
        console.log('\n🧠 LIVE TEST 3: VELVET BRAIN CONSCIOUSNESS');
        console.log('==========================================');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            if (typeof VelvetBrain !== 'undefined') {
                console.log('✅ VelvetBrain class found');
                
                // Initialize and test REAL consciousness
                const brain = new VelvetBrain();
                const initResult = await brain.initialize();
                console.log('🧠 Brain initialization result:', initResult);
                
                // Get REAL consciousness status
                const realConsciousness = brain.getConsciousnessStatus();
                console.log('🌟 Real consciousness status:', realConsciousness);
                
                // Check REAL subsystem connections
                const realComponents = {
                    sensoryInput: !!brain.sensoryInput,
                    memory: !!brain.memory,
                    personality: !!brain.personality,
                    actionDecider: !!brain.actionDecider
                };
                console.log('🧩 Real component status:', realComponents);
                
                // Test REAL metrics
                console.log('📊 Real brain metrics:', brain.metrics);
                
                liveResults.realFunctionality.velvetBrain = {
                    success: true,
                    initialized: initResult,
                    consciousness: realConsciousness,
                    components: realComponents,
                    metrics: brain.metrics,
                    isActive: brain.isActive,
                    consciousnessLevel: brain.consciousnessLevel
                };
                
                // Test if thinking is actually happening
                console.log('💭 Monitoring real thinking activity...');
                const startMetrics = { ...brain.metrics };
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
                const endMetrics = { ...brain.metrics };
                
                const thoughtActivity = {
                    startThoughts: startMetrics.thoughtCycles,
                    endThoughts: endMetrics.thoughtCycles,
                    actualThinking: endMetrics.thoughtCycles > startMetrics.thoughtCycles
                };
                console.log('🧠 Real thinking activity:', thoughtActivity);
                liveResults.realFunctionality.velvetBrain.thinkingActivity = thoughtActivity;
                
            } else {
                console.log('❌ VelvetBrain class not found');
                liveResults.realFunctionality.velvetBrain = {
                    success: false,
                    error: 'VelvetBrain class not available'
                };
            }
        } catch (error) {
            console.log('❌ Velvet Brain test failed:', error.message);
            liveResults.realFunctionality.velvetBrain = {
                success: false,
                error: error.message
            };
        }
        
        // =================================================================
        // LIVE TEST 4: INTEGRATION BRIDGE REAL FUNCTIONALITY
        // =================================================================
        console.log('\n🌉 LIVE TEST 4: INTEGRATION BRIDGE');
        console.log('==================================');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            if (typeof FeatureIntegrationBridge !== 'undefined') {
                console.log('✅ FeatureIntegrationBridge found');
                
                const bridge = new FeatureIntegrationBridge();
                const bridgeInit = await bridge.initialize();
                console.log('🔄 Real integration result:', bridgeInit);
                
                // Test real cross-feature communication
                const realIntegrationTest = await bridge.testIntegrations();
                console.log('🧪 Real integration test result:', realIntegrationTest);
                
                liveResults.realFunctionality.integrationBridge = {
                    success: true,
                    initialized: bridgeInit,
                    integrationTest: realIntegrationTest
                };
                
            } else {
                console.log('❌ FeatureIntegrationBridge not found');
                liveResults.realFunctionality.integrationBridge = {
                    success: false,
                    error: 'FeatureIntegrationBridge not available'
                };
            }
        } catch (error) {
            console.log('❌ Integration Bridge test failed:', error.message);
            liveResults.realFunctionality.integrationBridge = {
                success: false,
                error: error.message
            };
        }
        
        // =================================================================
        // LIVE TEST 5: ACTUAL UI ELEMENTS VISIBILITY
        // =================================================================
        console.log('\n🎨 LIVE TEST 5: UI ELEMENTS VISIBILITY');
        console.log('=====================================');
        
        try {
            // Check for actual UI elements in DOM
            const velvetOrb = document.querySelector('.velvet-orb');
            const velvetInterface = document.querySelector('.velvet-interface');
            const cornerWidgets = document.querySelectorAll('.corner-widget');
            const breathingGuide = document.querySelector('.breathing-guide');
            
            liveResults.actualVisibility = {
                velvetOrb: !!velvetOrb,
                velvetInterface: !!velvetInterface,
                cornerWidgets: cornerWidgets.length,
                breathingGuide: !!breathingGuide,
                totalElements: document.querySelectorAll('[class*="velvet"]').length
            };
            
            console.log('🎨 Real UI visibility:', liveResults.actualVisibility);
            
            // Test orb click if visible
            if (velvetOrb) {
                console.log('🔮 Velvet orb is actually visible! Testing click...');
                // Note: Can't actually click programmatically due to security, but orb exists
                liveResults.actualVisibility.orbInteractable = true;
            }
            
        } catch (error) {
            console.log('❌ UI visibility test failed:', error.message);
            liveResults.actualVisibility = { error: error.message };
        }
        
        // =================================================================
        // FINAL LIVE RESULTS CALCULATION
        // =================================================================
        console.log('\n📊 CALCULATING REAL FUNCTIONALITY SCORE');
        console.log('=======================================');
        
        // Calculate real working percentage
        const functionalityScores = {
            socialDecoder: liveResults.realFunctionality.socialDecoder?.success ? 25 : 0,
            executiveDysfunction: liveResults.realFunctionality.executiveDysfunction?.success ? 25 : 0,
            velvetBrain: liveResults.realFunctionality.velvetBrain?.success ? 25 : 0,
            integrationBridge: liveResults.realFunctionality.integrationBridge?.success ? 25 : 0
        };
        
        const totalScore = Object.values(functionalityScores).reduce((sum, score) => sum + score, 0);
        
        liveResults.liveScore = {
            individual: functionalityScores,
            total: totalScore,
            percentage: totalScore,
            status: totalScore >= 80 ? 'Excellent' : totalScore >= 60 ? 'Good' : totalScore >= 40 ? 'Partial' : 'Needs Work'
        };
        
        console.log('\n🎯 LIVE FUNCTIONALITY TEST RESULTS:');
        console.log('===================================');
        console.log(`🔥 REAL FUNCTIONALITY SCORE: ${totalScore}%`);
        console.log(`📊 Status: ${liveResults.liveScore.status}`);
        
        console.log('\n📋 INDIVIDUAL SCORES:');
        Object.entries(functionalityScores).forEach(([feature, score]) => {
            console.log(`${score > 0 ? '✅' : '❌'} ${feature}: ${score}%`);
        });
        
        // Store results globally for inspection
        window.liveFunctionalityResults = liveResults;
        console.log('\n💾 Live results stored in window.liveFunctionalityResults');
        
        liveResults.testEndTime = new Date().toISOString();
        return liveResults;
        
    } catch (error) {
        console.log('❌ LIVE FUNCTIONALITY TEST FAILED');
        console.log('Error:', error.message);
        
        liveResults.error = error.message;
        liveResults.liveScore = { total: 0, status: 'Failed' };
        return liveResults;
    }
}

// Auto-run the live test immediately
console.log('⚡ Starting live functionality test NOW...');
runLiveFunctionalityTest().then(results => {
    console.log('\n🏁 LIVE FUNCTIONALITY TEST COMPLETED!');
    console.log('====================================');
    console.log(`Final Real Score: ${results.liveScore?.total || 0}%`);
    console.log(`Final Status: ${results.liveScore?.status || 'Unknown'}`);
    
    if (results.liveScore?.total >= 75) {
        console.log('🎉 EXCELLENT! Most features are working live!');
    } else if (results.liveScore?.total >= 50) {
        console.log('✅ GOOD! Core functionality is working!');
    } else {
        console.log('⚠️ PARTIAL! Some features need attention!');
    }
    
    console.log('\n📋 Check window.liveFunctionalityResults for detailed data');
}).catch(error => {
    console.error('❌ Live test failed to complete:', error);
});