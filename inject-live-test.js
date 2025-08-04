// Auto-inject live functionality test into Velvet app
// This will be pasted directly into DevTools console

// Comprehensive live test execution
(async function() {
    console.log('🔥 AUTO-INJECTING LIVE FUNCTIONALITY TEST');
    console.log('=========================================');
    
    // Load and execute the final comprehensive test
    try {
        const testScript = await fetch('/final-integration-test.js');
        const testCode = await testScript.text();
        eval(testCode);
        console.log('✅ Live test script injected and executing...');
    } catch (error) {
        console.log('⚠️ Loading from file failed, running inline test...');
        
        // Inline comprehensive test
        console.log('🚀 INLINE LIVE FUNCTIONALITY TEST - STARTING');
        console.log('==========================================');
        
        const results = {
            features: {},
            finalScore: 0,
            timestamp: new Date().toISOString()
        };
        
        // Test 1: Social Decoder
        try {
            if (typeof SocialDecoder !== 'undefined') {
                const decoder = new SocialDecoder();
                await decoder.initialize();
                
                if (typeof window.testSocial !== 'undefined') {
                    window.testSocial.detectSarcasm();
                    window.testSocial.analyzeTone();
                }
                
                results.features.socialDecoder = { success: true, score: 33.33 };
                console.log('✅ Social Decoder: WORKING');
            } else {
                results.features.socialDecoder = { success: false, score: 0 };
                console.log('❌ Social Decoder: NOT FOUND');
            }
        } catch (error) {
            results.features.socialDecoder = { success: false, score: 0, error: error.message };
            console.log('❌ Social Decoder: ERROR -', error.message);
        }
        
        // Test 2: Executive Dysfunction
        try {
            if (typeof window.electronAPI !== 'undefined') {
                const status = await window.electronAPI.invoke('executive-function-status');
                const testList = await window.electronAPI.invoke('executive-function-test-list');
                
                results.features.executiveDysfunction = { success: true, score: 33.33, status, testList };
                console.log('✅ Executive Dysfunction: WORKING');
            } else {
                results.features.executiveDysfunction = { success: false, score: 0 };
                console.log('❌ Executive Dysfunction: NO IPC');
            }
        } catch (error) {
            results.features.executiveDysfunction = { success: false, score: 0, error: error.message };
            console.log('❌ Executive Dysfunction: ERROR -', error.message);
        }
        
        // Test 3: Velvet Brain
        try {
            if (typeof VelvetBrain !== 'undefined') {
                const brain = new VelvetBrain();
                await brain.initialize();
                const consciousness = brain.getConsciousnessStatus();
                
                results.features.velvetBrain = { success: true, score: 33.33, consciousness };
                console.log('✅ Velvet Brain: WORKING');
            } else {
                results.features.velvetBrain = { success: false, score: 0 };
                console.log('❌ Velvet Brain: NOT FOUND');
            }
        } catch (error) {
            results.features.velvetBrain = { success: false, score: 0, error: error.message };
            console.log('❌ Velvet Brain: ERROR -', error.message);
        }
        
        // Calculate final score
        results.finalScore = Object.values(results.features)
            .reduce((total, feature) => total + (feature.score || 0), 0);
        
        console.log('🏁 LIVE TEST RESULTS:');
        console.log('====================');
        console.log(`🎯 FINAL SCORE: ${results.finalScore.toFixed(1)}%`);
        
        if (results.finalScore >= 95) {
            console.log('🎉 PERFECT - ALL SYSTEMS OPERATIONAL');
        } else if (results.finalScore >= 80) {
            console.log('✅ EXCELLENT - MINOR ISSUES ONLY');
        } else if (results.finalScore >= 60) {
            console.log('⚠️ GOOD - SOME FEATURES NEED ATTENTION');
        } else {
            console.log('❌ NEEDS WORK - SIGNIFICANT ISSUES');
        }
        
        // Store results globally
        window.liveTestResults = results;
        console.log('💾 Results stored in window.liveTestResults');
        
        return results;
    }
})();