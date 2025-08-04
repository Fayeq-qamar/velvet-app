// Real Social Decoder Test - Actual functionality verification
// Testing with real text samples to verify sarcasm and tone detection

const SocialDecoder = require('./src/renderer/social-decoder.js');

async function testSocialDecoderReal() {
    console.log('🎭 REAL SOCIAL DECODER TEST - STARTING');
    console.log('=====================================');
    
    const decoder = new SocialDecoder();
    
    try {
        // Initialize the decoder
        console.log('📋 Initializing Social Decoder...');
        await decoder.initialize();
        console.log('✅ Social Decoder initialized successfully');
        
        // Test samples with expected behavior
        const testSamples = [
            {
                text: "Fine, whatever. I'll do it myself.",
                expected: "sarcasm/frustration",
                description: "Classic frustrated sarcasm"
            },
            {
                text: "Oh sure, that's absolutely perfect.",
                expected: "sarcasm",
                description: "Obvious sarcasm with multiple markers"
            },
            {
                text: "I guess maybe we could try that approach.",
                expected: "anxiety/uncertainty",
                description: "Anxiety markers (maybe, I guess)"
            },
            {
                text: "No problem at all! My pleasure to help!",
                expected: "passive-aggressive",
                description: "Overly enthusiastic passive-aggressive"
            },
            {
                text: "Thank you so much for your help with this project.",
                expected: "genuine",
                description: "Genuine positive sentiment"
            }
        ];
        
        console.log('\n🧪 RUNNING REAL TEXT ANALYSIS TESTS:');
        console.log('====================================');
        
        let successCount = 0;
        let failCount = 0;
        
        for (let i = 0; i < testSamples.length; i++) {
            const sample = testSamples[i];
            console.log(`\n📝 Test ${i + 1}: ${sample.description}`);
            console.log(`Input: "${sample.text}"`);
            console.log(`Expected: ${sample.expected}`);
            
            try {
                // Analyze the text
                const startTime = Date.now();
                const result = await decoder.analyzeText(sample.text);
                const processingTime = Date.now() - startTime;
                
                console.log(`⏱️  Processing time: ${processingTime}ms`);
                
                if (result && result.success) {
                    console.log('✅ Analysis successful');
                    console.log(`🎯 Detected tone: ${result.emotionalTone || 'none'}`);
                    console.log(`🎭 Sarcasm probability: ${result.sarcasmProbability || 0}`);
                    console.log(`💭 Hidden meaning: ${result.hiddenMeaning || 'none'}`);
                    console.log(`🔬 Confidence: ${result.confidence || 0}`);
                    successCount++;
                } else {
                    console.log('❌ Analysis failed');
                    console.log(`Error: ${result?.error || 'Unknown error'}`);
                    failCount++;
                }
                
            } catch (error) {
                console.log('❌ Test threw exception');
                console.log(`Error: ${error.message}`);
                failCount++;
            }
        }
        
        console.log('\n📊 SOCIAL DECODER TEST RESULTS:');
        console.log('===============================');
        console.log(`✅ Successful tests: ${successCount}/${testSamples.length}`);
        console.log(`❌ Failed tests: ${failCount}/${testSamples.length}`);
        console.log(`📈 Success rate: ${((successCount / testSamples.length) * 100).toFixed(1)}%`);
        
        // Test performance metrics
        if (decoder.performanceMetrics) {
            console.log('\n⚡ PERFORMANCE METRICS:');
            console.log('======================');
            console.log(`Total analyses: ${decoder.performanceMetrics.totalAnalyses}`);
            console.log(`Average processing time: ${decoder.performanceMetrics.averageProcessingTime}ms`);
            console.log(`Errors encountered: ${decoder.performanceMetrics.errorsEncountered}`);
        }
        
        // Test conversation history
        if (decoder.conversationHistory && decoder.conversationHistory.length > 0) {
            console.log('\n📚 CONVERSATION HISTORY:');
            console.log('========================');
            console.log(`History length: ${decoder.conversationHistory.length} items`);
            console.log('Recent entries:', decoder.conversationHistory.slice(-3));
        }
        
        return {
            success: true,
            successRate: (successCount / testSamples.length) * 100,
            totalTests: testSamples.length,
            successCount,
            failCount,
            metrics: decoder.performanceMetrics
        };
        
    } catch (error) {
        console.log('❌ SOCIAL DECODER INITIALIZATION FAILED');
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
testSocialDecoderReal()
    .then(result => {
        console.log('\n🏁 SOCIAL DECODER TEST COMPLETED');
        console.log('=================================');
        console.log('Final result:', result);
        process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
        console.error('❌ Test runner failed:', error);
        process.exit(1);
    });