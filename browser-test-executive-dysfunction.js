// Browser Test Script for Executive Dysfunction Emergency Mode
// Paste this into Velvet DevTools Console (F12)

console.log('🚨 EXECUTIVE DYSFUNCTION BROWSER TEST - STARTING');
console.log('===============================================');

async function testExecutiveDysfunctionBrowser() {
    try {
        // Check if Executive Dysfunction features are available in renderer
        console.log('🔍 Checking Executive Dysfunction availability...');
        
        // Check for IPC access to main process
        if (typeof window.electronAPI === 'undefined' && typeof require === 'undefined') {
            console.log('❌ No IPC access to main process Executive Dysfunction features');
            return { success: false, error: 'No IPC access' };
        }
        
        // Test IPC handlers for Executive Dysfunction
        console.log('\n🧪 TESTING IPC HANDLERS:');
        console.log('========================');
        
        let results = [];
        
        // Test 1: Get Executive Function Status
        console.log('📋 Test 1: Executive Function Status');
        try {
            const statusResult = await window.electronAPI.invoke('executive-function-status');
            console.log('✅ Status retrieved:', statusResult);
            results.push({ test: 'status', success: true, result: statusResult });
        } catch (error) {
            console.log('❌ Status failed:', error.message);
            results.push({ test: 'status', success: false, error: error.message });
        }
        
        // Test 2: Activate Safe Space
        console.log('\n🏠 Test 2: Safe Space Activation');
        try {
            const safeSpaceResult = await window.electronAPI.invoke('executive-function-safe-space');
            console.log('✅ Safe space activated:', safeSpaceResult);
            results.push({ test: 'safe-space', success: true, result: safeSpaceResult });
        } catch (error) {
            console.log('❌ Safe space failed:', error.message);
            results.push({ test: 'safe-space', success: false, error: error.message });
        }
        
        // Test 3: Get Available Test Functions
        console.log('\n🧪 Test 3: Available Test Functions');
        try {
            const testListResult = await window.electronAPI.invoke('executive-function-test-list');
            console.log('✅ Test functions retrieved:', testListResult);
            results.push({ test: 'test-list', success: true, result: testListResult });
            
            // If test functions are available, try running them
            if (testListResult.success && testListResult.tests && testListResult.tests.length > 0) {
                console.log('\n🎯 Testing Pattern Detection Functions:');
                
                for (const testType of testListResult.tests.slice(0, 3)) { // Test first 3
                    console.log(`\n🔬 Running ${testType} test...`);
                    try {
                        const testResult = await window.electronAPI.invoke('executive-function-test', testType);
                        console.log(`✅ ${testType} test:`, testResult);
                        results.push({ test: `pattern-${testType}`, success: true, result: testResult });
                    } catch (error) {
                        console.log(`❌ ${testType} test failed:`, error.message);
                        results.push({ test: `pattern-${testType}`, success: false, error: error.message });
                    }
                }
            }
            
        } catch (error) {
            console.log('❌ Test list failed:', error.message);
            results.push({ test: 'test-list', success: false, error: error.message });
        }
        
        // Test 4: Check for UI Integration
        console.log('\n🎨 Test 4: UI Integration Check');
        try {
            // Check if ExecutiveDysfunctionUI is available
            if (typeof ExecutiveDysfunctionUI !== 'undefined') {
                console.log('✅ ExecutiveDysfunctionUI class found');
                const ui = new ExecutiveDysfunctionUI();
                await ui.initialize();
                console.log('✅ UI initialized successfully');
                results.push({ test: 'ui-integration', success: true, result: 'UI available and initialized' });
            } else {
                console.log('⚠️ ExecutiveDysfunctionUI not found in global scope');
                results.push({ test: 'ui-integration', success: false, error: 'UI class not available' });
            }
        } catch (error) {
            console.log('❌ UI integration failed:', error.message);
            results.push({ test: 'ui-integration', success: false, error: error.message });
        }
        
        // Test 5: Manual Pattern Simulation
        console.log('\n🔄 Test 5: Manual Pattern Simulation');
        try {
            // Simulate user behavior patterns that should trigger interventions
            console.log('Simulating distraction spiral...');
            
            // Multiple rapid window focus changes
            for (let i = 0; i < 10; i++) {
                window.focus();
                window.blur();
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            console.log('✅ Pattern simulation completed');
            results.push({ test: 'pattern-simulation', success: true, result: 'Distraction spiral simulated' });
            
        } catch (error) {
            console.log('❌ Pattern simulation failed:', error.message);
            results.push({ test: 'pattern-simulation', success: false, error: error.message });
        }
        
        const successCount = results.filter(r => r.success).length;
        const successRate = (successCount / results.length) * 100;
        
        console.log('\n🏁 EXECUTIVE DYSFUNCTION BROWSER TEST COMPLETED');
        console.log('==============================================');
        console.log(`Success rate: ${successRate.toFixed(1)}% (${successCount}/${results.length})`);
        
        return {
            success: true,
            successRate,
            totalTests: results.length,
            results,
            summary: {
                ipcAvailable: typeof window.electronAPI !== 'undefined',
                uiAvailable: typeof ExecutiveDysfunctionUI !== 'undefined',
                testsRun: results.length,
                successfulTests: successCount
            }
        };
        
    } catch (error) {
        console.log('❌ EXECUTIVE DYSFUNCTION BROWSER TEST FAILED');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
        
        return {
            success: false,
            error: error.message
        };
    }
}

// Auto-run the test
testExecutiveDysfunctionBrowser().then(result => {
    console.log('\n📋 FINAL EXECUTIVE DYSFUNCTION TEST RESULT:');
    console.log('==========================================');
    console.log(result);
    
    // Store result globally for inspection
    window.executiveDysfunctionTestResult = result;
    console.log('💾 Result stored in window.executiveDysfunctionTestResult');
});