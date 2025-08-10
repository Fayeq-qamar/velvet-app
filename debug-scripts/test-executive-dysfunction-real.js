// Real Executive Dysfunction Emergency Mode Test
// Testing actual pattern detection and intervention logic

const ExecutiveDysfunctionEmergencyMode = require('./src/main/executive-dysfunction-emergency.js');

async function testExecutiveDysfunctionReal() {
    console.log('🚨 REAL EXECUTIVE DYSFUNCTION TEST - STARTING');
    console.log('=============================================');
    
    const emergencyMode = new ExecutiveDysfunctionEmergencyMode();
    
    try {
        // Initialize the emergency mode
        console.log('📋 Initializing Executive Dysfunction Emergency Mode...');
        const initResult = await emergencyMode.initialize(null); // No screen intelligence for basic test
        console.log(`✅ Emergency Mode initialized: ${initResult ? 'SUCCESS' : 'FAILED'}`);
        
        // Test crisis pattern detection
        console.log('\n🧪 TESTING CRISIS PATTERN DETECTION:');
        console.log('====================================');
        
        const testPatterns = [
            {
                type: 'distractionSpiral',
                data: { count: 15, timeWindow: 120000 }, // 15 switches in 2 minutes
                description: 'Severe distraction spiral - 15 app switches in 2 minutes'
            },
            {
                type: 'taskAvoidance', 
                data: { app: 'Word', openCloseCount: 8, timeWindow: 300000 }, // 8 opens/closes in 5 minutes
                description: 'Task avoidance - document opened/closed 8 times'
            },
            {
                type: 'hyperfocus',
                data: { app: 'VS Code', duration: 3600000, noBreaks: true }, // 1 hour no breaks
                description: 'Hyperfocus session - 1 hour coding without breaks'
            },
            {
                type: 'mouseHoverParalysis',
                data: { duration: 45000, position: { x: 500, y: 300 } }, // 45 seconds hovering
                description: 'Mouse paralysis - hovering for 45 seconds'
            }
        ];
        
        let successCount = 0;
        let failCount = 0;
        
        for (let i = 0; i < testPatterns.length; i++) {
            const pattern = testPatterns[i];
            console.log(`\n🔍 Test ${i + 1}: ${pattern.description}`);
            console.log(`Pattern type: ${pattern.type}`);
            console.log(`Pattern data:`, pattern.data);
            
            try {
                // Detect the pattern
                const startTime = Date.now();
                const detection = emergencyMode.detectCrisisPattern(pattern.type, pattern.data);
                const processingTime = Date.now() - startTime;
                
                console.log(`⏱️  Processing time: ${processingTime}ms`);
                
                if (detection && detection.isEmergency !== undefined) {
                    console.log('✅ Pattern detection successful');
                    console.log(`🚨 Emergency level: ${detection.isEmergency ? 'YES' : 'NO'}`);
                    console.log(`📊 Crisis level: ${detection.crisisLevel || 'normal'}`);
                    console.log(`💭 Suggested intervention: ${detection.intervention?.level || 'none'}`);
                    console.log(`📝 Message: ${detection.intervention?.message || 'none'}`);
                    successCount++;
                } else {
                    console.log('❌ Pattern detection failed - no valid result');
                    failCount++;
                }
                
            } catch (error) {
                console.log('❌ Pattern detection threw exception');
                console.log(`Error: ${error.message}`);
                failCount++;
            }
        }
        
        // Test intervention system
        console.log('\n🛟 TESTING INTERVENTION SYSTEM:');
        console.log('===============================');
        
        try {
            // Test safe space activation
            console.log('🏠 Testing safe space activation...');
            emergencyMode.activateSafeSpace();
            const safeSpaceStatus = emergencyMode.getEmergencyStatus();
            console.log(`✅ Safe space active: ${safeSpaceStatus.safeSpaceActive}`);
            
            // Test emergency status
            console.log('\n📊 Testing emergency status retrieval...');
            const status = emergencyMode.getEmergencyStatus();
            console.log('Emergency status:', {
                currentLevel: status.currentLevel,
                safeSpaceActive: status.safeSpaceActive,
                activeInterventions: status.activeInterventions?.length || 0,
                lastTrigger: status.lastTrigger || 'none'
            });
            
            // Test testing functions availability
            console.log('\n🧪 Testing development functions...');
            const testFunctions = emergencyMode.getTestingFunctions();
            console.log(`Available test functions: ${Object.keys(testFunctions).length}`);
            console.log('Function names:', Object.keys(testFunctions));
            
        } catch (error) {
            console.log('❌ Intervention system test failed');
            console.log(`Error: ${error.message}`);
            failCount++;
        }
        
        console.log('\n📊 EXECUTIVE DYSFUNCTION TEST RESULTS:');
        console.log('=====================================');
        console.log(`✅ Successful tests: ${successCount}/${testPatterns.length}`);
        console.log(`❌ Failed tests: ${failCount}/${testPatterns.length}`);
        console.log(`📈 Success rate: ${((successCount / testPatterns.length) * 100).toFixed(1)}%`);
        
        // Performance and state info
        if (emergencyMode.crisisState) {
            console.log('\n⚡ CURRENT STATE:');
            console.log('================');
            console.log(`Crisis level: ${emergencyMode.crisisState.currentLevel}`);
            console.log(`Active interventions: ${emergencyMode.crisisState.activeInterventions?.length || 0}`);
            console.log(`Safe space active: ${emergencyMode.crisisState.safeSpaceActive}`);
        }
        
        return {
            success: true,
            successRate: (successCount / testPatterns.length) * 100,
            totalTests: testPatterns.length,
            successCount,
            failCount,
            emergencyMode: emergencyMode.getEmergencyStatus()
        };
        
    } catch (error) {
        console.log('❌ EXECUTIVE DYSFUNCTION INITIALIZATION FAILED');
        console.log(`Error: ${error.message}`);
        console.log(`Stack: ${error.stack}`);
        
        return {
            success: false,
            error: error.message,
            totalTests: 0,
            successCount: 0,
            failCount: 0
        };
    }
}

// Run the test
testExecutiveDysfunctionReal()
    .then(result => {
        console.log('\n🏁 EXECUTIVE DYSFUNCTION TEST COMPLETED');
        console.log('=======================================');
        console.log('Final result:', result);
        process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Test runner failed:', error);
        process.exit(1);
    });