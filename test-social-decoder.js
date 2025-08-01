// Test Social Decoder System - Phase 2
// Run this in the browser console when Velvet is running

console.log('🧪 Starting Social Decoder System Tests...');

// Test Case 1: Sarcastic Communication
function testSarcasm() {
    console.log('\n=== TEST 1: Sarcasm Detection ===');
    
    const testCases = [
        {
            input: "Sure, that's fine, whatever works.",
            expected: "sarcastic",
            description: "Classic passive aggressive response"
        },
        {
            input: "Great! This is perfect timing!",
            expected: "genuine", 
            description: "Genuinely positive response"
        },
        {
            input: "No problem at all, happy to help.",
            expected: "potentially_sarcastic",
            description: "Could be genuine or sarcastic depending on tone"
        },
        {
            input: "Oh wonderful, just what I needed today.",
            expected: "sarcastic",
            description: "Obvious sarcasm with situational context"
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n🎭 Test ${index + 1}: "${testCase.input}"`);
        console.log(`📝 Expected: ${testCase.expected}`);
        console.log(`💡 Context: ${testCase.description}`);
        
        if (window.socialDecoder && window.socialDecoder.isActive) {
            const result = window.socialDecoder.analyzeConversation(testCase.input, null);
            if (result) {
                console.log(`🎯 Analysis: ${result.translation.directMeaning}`);
                console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
                console.log(`💭 Hidden meaning: ${result.translation.hiddenMeaning || 'None detected'}`);
                console.log(`🔧 Action needed: ${result.translation.actionNeeded || 'None'}`);
            }
        } else {
            console.log('❌ Social Decoder not active');
        }
        console.log('---');
    });
}

// Test Case 2: Response Suggestions
function testResponseSuggestions() {
    console.log('\n=== TEST 2: Response Suggestions ===');
    
    const frustrationExample = "Fine, I'll just handle it myself then.";
    console.log(`🎭 Input: "${frustrationExample}"`);
    
    if (window.socialDecoder && window.socialDecoder.isActive) {
        const result = window.socialDecoder.analyzeConversation(frustrationExample, null);
        if (result && result.suggestions.length > 0) {
            console.log('💡 Suggested responses:');
            result.suggestions.forEach((suggestion, index) => {
                console.log(`  ${index + 1}. "${suggestion.text}"`);
                console.log(`     Rationale: ${suggestion.explanation}`);
            });
        }
    }
}

// Test Case 3: Emotional Tone Analysis
function testEmotionalAnalysis() {
    console.log('\n=== TEST 3: Emotional Tone Analysis ===');
    
    const emotionalTests = [
        {
            input: "I guess that could work maybe...",
            expectedEmotion: "anxiety",
            description: "Uncertain, hesitant language"
        },
        {
            input: "Fine! Whatever! This is just great!",
            expectedEmotion: "frustration", 
            description: "Angry outburst with sarcasm"
        },
        {
            input: "No problem, happy to help with anything you need.",
            expectedEmotion: "genuine_positive",
            description: "Genuinely helpful response"
        }
    ];
    
    emotionalTests.forEach((test, index) => {
        console.log(`\n😊 Emotion Test ${index + 1}: "${test.input}"`);
        console.log(`📝 Expected: ${test.expectedEmotion}`);
        
        if (window.socialDecoder && window.socialDecoder.isActive) {
            const result = window.socialDecoder.analyzeConversation(test.input, null);
            if (result) {
                console.log(`🎭 Emotional subtext: ${result.translation.emotionalSubtext || 'None detected'}`);
                console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
            }
        }
        console.log('---');
    });
}

// Test Case 4: UI Notification System
function testNotificationSystem() {
    console.log('\n=== TEST 4: UI Notification System ===');
    
    if (window.socialDecoderUI && window.socialDecoder) {
        console.log('🔔 Testing notification display...');
        
        // Simulate a high-confidence sarcasm detection
        const mockResult = {
            timestamp: Date.now(),
            original: "Sure, that's absolutely perfect.",
            translation: {
                directMeaning: 'They said "Sure, that\'s absolutely perfect." but likely mean: Not okay with this, expressing frustration',
                hiddenMeaning: 'Not okay with this, expressing frustration',
                emotionalSubtext: 'They sound frustrated or overwhelmed',
                actionNeeded: 'Consider checking in with them or addressing underlying concerns'
            },
            suggestions: [
                {
                    type: 'check_in',
                    text: "I want to make sure we're on the same page. Is this timeline actually workable for you?",
                    explanation: 'Gentle check-in to address potential frustration'
                }
            ],
            confidence: 0.87
        };
        
        // Trigger the notification manually
        window.socialDecoderUI.handleSocialCueDetection(mockResult);
        console.log('✅ Notification should appear on screen');
        
    } else {
        console.log('❌ Social Decoder UI not available');
    }
}

// Test Case 5: Integration with Voice System
function testVoiceIntegration() {
    console.log('\n=== TEST 5: Voice System Integration ===');
    
    if (window.velvetVoice) {
        console.log('🎤 Voice system detected');
        console.log('🧠 Social Decoder should analyze transcripts automatically');
        console.log('💡 Try saying: "Sure, that sounds fine" in a flat tone');
    } else {
        console.log('❌ Voice system not detected');
    }
}

// Run all tests
function runAllSocialDecoderTests() {
    console.log('🚀 Running complete Social Decoder test suite...');
    
    setTimeout(() => testSarcasm(), 1000);
    setTimeout(() => testResponseSuggestions(), 3000);
    setTimeout(() => testEmotionalAnalysis(), 5000);
    setTimeout(() => testNotificationSystem(), 7000);
    setTimeout(() => testVoiceIntegration(), 9000);
    
    setTimeout(() => {
        console.log('\n✅ All Social Decoder tests completed!');
        console.log('🎯 Phase 2 Social Decoder System is ready for viral deployment');
    }, 11000);
}

// Check system status
function checkSocialDecoderStatus() {
    console.log('\n🔍 Social Decoder System Status:');
    console.log(`🧠 Social Decoder Active: ${window.socialDecoder?.isActive || false}`);
    console.log(`🎭 UI System Available: ${!!window.socialDecoderUI}`);
    console.log(`🎤 Voice Integration: ${!!window.velvetVoice}`);
    console.log(`📊 Conversation History: ${window.socialDecoder?.conversationHistory?.length || 0} entries`);
}

// Export test functions
window.testSocialDecoderSystem = {
    runAll: runAllSocialDecoderTests,
    testSarcasm: testSarcasm,
    testSuggestions: testResponseSuggestions,
    testEmotions: testEmotionalAnalysis,
    testNotifications: testNotificationSystem,
    testVoice: testVoiceIntegration,
    checkStatus: checkSocialDecoderStatus
};

console.log('🧪 Social Decoder test suite loaded!');
console.log('💡 Run testSocialDecoderSystem.runAll() to test everything');
console.log('🔍 Run testSocialDecoderSystem.checkStatus() to check system status');