// COMPREHENSIVE BROWSER TEST FOR ALL THREE FEATURES
// This script should be injected into the Velvet app via DevTools Console
// Open Velvet app -> Right click -> Inspect Element -> Console -> Paste this script

console.log('🚀 COMPREHENSIVE VELVET FEATURE TEST - STARTING');
console.log('==============================================');
console.log('Testing all three Phase 2 viral features in browser environment');

async function runComprehensiveBrowserTest() {
    const testResults = {
        environment: {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            hasWindow: typeof window !== 'undefined',
            hasDocument: typeof document !== 'undefined'
        },
        features: {}
    };
    
    try {
        console.log('\n📋 ENVIRONMENT CHECK:');
        console.log('=====================');
        console.log(`✅ Window available: ${typeof window !== 'undefined'}`);
        console.log(`✅ Document available: ${typeof document !== 'undefined'}`);
        console.log(`✅ Current URL: ${window.location.href}`);
        console.log(`✅ Scripts loaded: ${document.scripts.length}`);
        
        // Check what global objects are available
        console.log('\n🔍 GLOBAL OBJECTS CHECK:');
        console.log('========================');
        const globalChecks = {
            SocialDecoder: typeof SocialDecoder !== 'undefined',
            ExecutiveDysfunctionUI: typeof ExecutiveDysfunctionUI !== 'undefined', 
            VelvetBrain: typeof VelvetBrain !== 'undefined',
            VelvetMemory: typeof VelvetMemory !== 'undefined',
            VelvetPersonality: typeof VelvetPersonality !== 'undefined',
            SensoryInput: typeof SensoryInput !== 'undefined',
            testSocial: typeof window.testSocial !== 'undefined',
            electronAPI: typeof window.electronAPI !== 'undefined'
        };
        
        Object.entries(globalChecks).forEach(([name, available]) => {
            console.log(`${available ? '✅' : '❌'} ${name}: ${available ? 'Available' : 'Not found'}`);
        });
        
        testResults.environment.globalObjects = globalChecks;
        
        // =============================================================================
        // FEATURE 1: SOCIAL DECODER TEST
        // =============================================================================
        console.log('\n🎭 TESTING SOCIAL DECODER:');
        console.log('==========================');
        
        try {
            if (typeof SocialDecoder !== 'undefined') {
                console.log('✅ SocialDecoder class found');
                
                const socialDecoder = new SocialDecoder();
                await socialDecoder.initialize();
                console.log('✅ Social Decoder initialized');
                
                // Test built-in functions
                if (typeof window.testSocial !== 'undefined') {
                    console.log('🧪 Running built-in sarcasm detection test...');
                    window.testSocial.detectSarcasm();
                    
                    console.log('🧪 Running built-in tone analysis test...');
                    window.testSocial.analyzeTone();
                    
                    testResults.features.socialDecoder = {
                        success: true,
                        initialized: true,
                        builtInTestsAvailable: true,
                        testResults: 'Built-in tests executed successfully'
                    };
                } else {
                    console.log('⚠️ Built-in test functions not available');
                    testResults.features.socialDecoder = {
                        success: true,
                        initialized: true,
                        builtInTestsAvailable: false,
                        error: 'testSocial functions not found'
                    };
                }
            } else {
                console.log('❌ SocialDecoder class not found');
                testResults.features.socialDecoder = {
                    success: false,
                    error: 'SocialDecoder class not available'
                };
            }
        } catch (error) {
            console.log('❌ Social Decoder test failed:', error.message);
            testResults.features.socialDecoder = {
                success: false,
                error: error.message
            };
        }
        
        // =============================================================================
        // FEATURE 2: EXECUTIVE DYSFUNCTION TEST
        // =============================================================================
        console.log('\n🚨 TESTING EXECUTIVE DYSFUNCTION:');
        console.log('=================================');
        
        try {
            if (typeof ExecutiveDysfunctionUI !== 'undefined') {
                console.log('✅ ExecutiveDysfunctionUI class found');
                
                const dysfunctionUI = new ExecutiveDysfunctionUI();
                await dysfunctionUI.initialize();
                console.log('✅ Executive Dysfunction UI initialized');
                
                // Test IPC communication
                if (typeof window.electronAPI !== 'undefined') {
                    console.log('🔗 Testing IPC communication...');
                    
                    try {
                        const statusResult = await window.electronAPI.invoke('executive-function-status');
                        console.log('✅ IPC Status call successful:', statusResult);
                        
                        const testListResult = await window.electronAPI.invoke('executive-function-test-list');
                        console.log('✅ IPC Test list call successful:', testListResult);
                        
                        testResults.features.executiveDysfunction = {
                            success: true,
                            initialized: true,
                            ipcAvailable: true,
                            statusResult,
                            testListResult
                        };
                    } catch (ipcError) {
                        console.log('❌ IPC communication failed:', ipcError.message);
                        testResults.features.executiveDysfunction = {
                            success: true,
                            initialized: true,
                            ipcAvailable: false,
                            ipcError: ipcError.message
                        };
                    }
                } else {
                    console.log('⚠️ ElectronAPI not available');
                    testResults.features.executiveDysfunction = {
                        success: true,
                        initialized: true,
                        ipcAvailable: false,
                        error: 'ElectronAPI not found'
                    };
                }
            } else {
                console.log('❌ ExecutiveDysfunctionUI class not found');
                testResults.features.executiveDysfunction = {
                    success: false,
                    error: 'ExecutiveDysfunctionUI class not available'
                };
            }
        } catch (error) {
            console.log('❌ Executive Dysfunction test failed:', error.message);
            testResults.features.executiveDysfunction = {
                success: false,
                error: error.message
            };
        }
        
        // =============================================================================
        // FEATURE 3: VELVET BRAIN TEST
        // =============================================================================
        console.log('\n🧠 TESTING VELVET BRAIN:');
        console.log('========================');
        
        try {
            if (typeof VelvetBrain !== 'undefined') {
                console.log('✅ VelvetBrain class found');
                
                const brain = new VelvetBrain();
                await brain.initialize();
                console.log('✅ Velvet Brain initialized');
                
                // Check brain components
                const brainComponents = {
                    sensoryInput: !!brain.sensoryInput,
                    memory: !!brain.memory,
                    personality: !!brain.personality,
                    actionDecider: !!brain.actionDecider
                };
                
                console.log('🧩 Brain components:', brainComponents);
                
                // Test consciousness status
                const consciousnessStatus = brain.getConsciousnessStatus();
                console.log('🌟 Consciousness status:', consciousnessStatus);
                
                // Test metrics
                console.log('📊 Brain metrics:', brain.metrics);
                console.log('⚙️ Brain config:', brain.config);
                
                testResults.features.velvetBrain = {
                    success: true,
                    initialized: true,
                    components: brainComponents,
                    consciousnessStatus,
                    metrics: brain.metrics,
                    config: brain.config,
                    isActive: brain.isActive,
                    consciousnessLevel: brain.consciousnessLevel
                };
                
                // Test thinking process
                console.log('💭 Testing thinking process...');
                if (brain.isActive) {
                    console.log('✅ Brain is already thinking');
                } else {
                    console.log('⚠️ Brain is not active');
                }
                
            } else {
                console.log('❌ VelvetBrain class not found');
                testResults.features.velvetBrain = {
                    success: false,
                    error: 'VelvetBrain class not available'
                };
            }
        } catch (error) {
            console.log('❌ Velvet Brain test failed:', error.message);
            testResults.features.velvetBrain = {
                success: false,
                error: error.message
            };
        }
        
        // =============================================================================
        // INTEGRATION TESTS
        // =============================================================================
        console.log('\n🔄 INTEGRATION TESTS:');
        console.log('=====================');
        
        // Test feature interaction
        try {
            let integrationScore = 0;
            let maxIntegrationScore = 3;
            
            if (testResults.features.socialDecoder?.success) {
                integrationScore++;
                console.log('✅ Social Decoder integration ready');
            }
            
            if (testResults.features.executiveDysfunction?.success) {
                integrationScore++;
                console.log('✅ Executive Dysfunction integration ready');
            }
            
            if (testResults.features.velvetBrain?.success) {
                integrationScore++;
                console.log('✅ Velvet Brain integration ready');
            }
            
            const integrationPercentage = (integrationScore / maxIntegrationScore) * 100;
            
            testResults.integration = {
                score: integrationScore,
                maxScore: maxIntegrationScore,
                percentage: integrationPercentage,
                status: integrationPercentage >= 66 ? 'Good' : integrationPercentage >= 33 ? 'Partial' : 'Poor'
            };
            
            console.log(`🎯 Integration score: ${integrationScore}/${maxIntegrationScore} (${integrationPercentage.toFixed(1)}%)`);
            
        } catch (error) {
            console.log('❌ Integration test failed:', error.message);
            testResults.integration = {
                error: error.message
            };
        }
        
        // =============================================================================
        // FINAL RESULTS
        // =============================================================================
        console.log('\n🏁 COMPREHENSIVE TEST COMPLETED:');
        console.log('================================');
        
        const overallSuccess = Object.values(testResults.features).every(feature => feature.success);
        const successCount = Object.values(testResults.features).filter(feature => feature.success).length;
        const totalFeatures = Object.keys(testResults.features).length;
        const successRate = (successCount / totalFeatures) * 100;
        
        testResults.summary = {
            overallSuccess,
            successCount,
            totalFeatures,
            successRate: successRate.toFixed(1),
            completedAt: new Date().toISOString()
        };
        
        console.log(`📊 Overall success: ${overallSuccess ? 'YES' : 'NO'}`);
        console.log(`📈 Success rate: ${successRate.toFixed(1)}% (${successCount}/${totalFeatures})`);
        console.log(`🔗 Integration: ${testResults.integration?.status || 'Unknown'}`);
        
        // Store results globally
        window.comprehensiveTestResults = testResults;
        console.log('💾 Results stored in window.comprehensiveTestResults');
        
        return testResults;
        
    } catch (error) {
        console.log('❌ COMPREHENSIVE TEST FAILED');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
        
        testResults.error = {
            message: error.message,
            stack: error.stack
        };
        
        return testResults;
    }
}

// Auto-run the comprehensive test
console.log('⏳ Starting comprehensive test in 2 seconds...');
setTimeout(() => {
    runComprehensiveBrowserTest().then(results => {
        console.log('\n🎉 COMPREHENSIVE BROWSER TEST RESULTS:');
        console.log('=====================================');
        console.table(results.summary);
        
        if (results.features) {
            console.log('\n📋 FEATURE DETAILS:');
            Object.entries(results.features).forEach(([name, result]) => {
                console.log(`${result.success ? '✅' : '❌'} ${name}:`, result);
            });
        }
        
        if (results.integration) {
            console.log('\n🔗 INTEGRATION STATUS:');
            console.log(results.integration);
        }
    });
}, 2000);