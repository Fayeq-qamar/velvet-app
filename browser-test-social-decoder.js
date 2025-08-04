// Browser Test Script for Social Decoder
// Paste this into Velvet DevTools Console (F12)

console.log('🎭 SOCIAL DECODER BROWSER TEST - STARTING');
console.log('==========================================');

async function testSocialDecoderBrowser() {
    try {
        // Check if Social Decoder is available
        if (typeof SocialDecoder === 'undefined') {
            console.log('❌ SocialDecoder not found in global scope');
            console.log('🔍 Checking if it needs to be loaded...');
            
            // Try to load from script tag or import
            const scripts = document.querySelectorAll('script');
            let socialDecoderLoaded = false;
            
            scripts.forEach(script => {
                if (script.src && script.src.includes('social-decoder')) {
                    socialDecoderLoaded = true;
                }
            });
            
            if (!socialDecoderLoaded) {
                console.log('⚠️ Social Decoder script not loaded. Attempting to load...');
                return { success: false, error: 'Social Decoder not available' };
            }
        }
        
        console.log('✅ SocialDecoder found, initializing...');
        const decoder = new SocialDecoder();
        
        // Initialize
        await decoder.initialize();
        console.log('✅ Social Decoder initialized successfully');
        
        // Test built-in test functions
        console.log('\n🧪 RUNNING BUILT-IN TEST FUNCTIONS:');
        console.log('===================================');
        
        if (typeof window.testSocial !== 'undefined') {
            console.log('✅ Built-in test functions found');
            
            // Run sarcasm detection test
            console.log('\n🎭 Testing Sarcasm Detection:');
            window.testSocial.detectSarcasm();
            
            // Run tone analysis test
            console.log('\n😊 Testing Tone Analysis:');
            window.testSocial.analyzeTone();
            
        } else {
            console.log('⚠️ Built-in test functions not available');
        }
        
        // Manual analysis tests
        console.log('\n🔬 MANUAL ANALYSIS TESTS:');
        console.log('=========================');
        
        const testSamples = [
            "Fine, whatever. I'll do it myself.",
            "Oh sure, that's absolutely perfect.",
            "I guess maybe we could try that approach.",
            "No problem at all! My pleasure to help!",
            "Thank you so much for your help."
        ];
        
        let results = [];
        
        for (let i = 0; i < testSamples.length; i++) {
            const text = testSamples[i];
            console.log(`\n📝 Test ${i + 1}: "${text}"`);
            
            try {
                // Try different method names
                let result = null;
                
                if (typeof decoder.analyzeConversation === 'function') {
                    result = decoder.analyzeConversation(text, null);
                } else if (typeof decoder.performAnalysis === 'function') {
                    result = await decoder.performAnalysis(text, null);
                } else if (typeof decoder.analyzeText === 'function') {
                    result = await decoder.analyzeText(text);
                }
                
                if (result) {
                    console.log('✅ Analysis successful');
                    console.log('Result:', result);
                    results.push({ text, result, success: true });
                } else {
                    console.log('❌ No analysis result returned');
                    results.push({ text, result: null, success: false });
                }
                
            } catch (error) {
                console.log('❌ Analysis failed:', error.message);
                results.push({ text, error: error.message, success: false });
            }
        }
        
        // Performance metrics
        console.log('\n📊 PERFORMANCE METRICS:');
        console.log('=======================');
        if (decoder.performanceMetrics) {
            console.log('Metrics:', decoder.performanceMetrics);
        }
        
        // Conversation history
        console.log('\n📚 CONVERSATION HISTORY:');
        console.log('========================');
        if (decoder.conversationHistory) {
            console.log(`History length: ${decoder.conversationHistory.length}`);
            console.log('Recent entries:', decoder.conversationHistory.slice(-3));
        }
        
        const successCount = results.filter(r => r.success).length;
        const successRate = (successCount / results.length) * 100;
        
        console.log('\n🏁 SOCIAL DECODER BROWSER TEST COMPLETED');
        console.log('========================================');
        console.log(`Success rate: ${successRate.toFixed(1)}% (${successCount}/${results.length})`);
        
        return {
            success: true,
            successRate,
            totalTests: results.length,
            results,
            decoder: {
                isActive: decoder.isActive,
                metrics: decoder.performanceMetrics,
                historyLength: decoder.conversationHistory?.length || 0
            }
        };
        
    } catch (error) {
        console.log('❌ BROWSER TEST FAILED');
        console.log('Error:', error.message);
        console.log('Stack:', error.stack);
        
        return {
            success: false,
            error: error.message
        };
    }
}

// Auto-run the test
testSocialDecoderBrowser().then(result => {
    console.log('\n📋 FINAL BROWSER TEST RESULT:');
    console.log('=============================');
    console.log(result);
    
    // Store result globally for inspection
    window.socialDecoderTestResult = result;
    console.log('💾 Result stored in window.socialDecoderTestResult');
});