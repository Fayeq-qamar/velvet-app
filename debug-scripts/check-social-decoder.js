// Social Decoder Status Check Script
// Run this in the browser console or Node.js environment

console.log('🔍 SOCIAL DECODER STATUS CHECK');
console.log('============================');

async function checkSocialDecoderStatus() {
  console.log('\n1️⃣ Checking if Social Decoder is available...');
  
  // Check if SocialDecoder class exists
  if (typeof SocialDecoder === 'undefined') {
    console.log('❌ SocialDecoder class not found in global scope');
    return { success: false, error: 'Social Decoder not available' };
  }
  
  console.log('✅ SocialDecoder class found');
  
  // Create instance and initialize
  console.log('\n2️⃣ Initializing Social Decoder...');
  const decoder = new SocialDecoder();
  
  try {
    await decoder.initialize();
    console.log('✅ Social Decoder initialized successfully');
  } catch (error) {
    console.log(`❌ Failed to initialize Social Decoder: ${error}`);
    return { success: false, error: 'Initialization failed' };
  }
  
  // Check if it's active
  console.log('\n3️⃣ Checking Social Decoder status...');
  console.log(`🧠 Social Decoder Active: ${decoder.isActive || false}`);
  
  // Check integration status
  console.log('\n4️⃣ Checking integration status...');
  if (typeof socialDecoderIntegration !== 'undefined') {
    const status = socialDecoderIntegration.getStatus();
    console.log(`🔌 Integration Connected: ${status.isConnected}`);
    console.log('🔗 Active Integrations:', status.activeIntegrations);
    console.log(`🕒 Last Sync: ${status.lastSyncTime ? new Date(status.lastSyncTime).toLocaleString() : 'Never'}`);
  } else {
    console.log('⚠️ Social Decoder Integration not available');
  }
  
  // Check store status
  console.log('\n5️⃣ Checking store status...');
  if (typeof useSocialDecoderStore !== 'undefined') {
    const store = useSocialDecoderStore.getState();
    console.log(`🧠 Store Active: ${store.isActive}`);
    console.log(`🎤 Listening: ${store.isListening}`);
    console.log(`📊 Total Detections: ${store.metrics.totalDetections}`);
    console.log(`🎭 Sarcasm Detections: ${store.metrics.sarcasmDetections}`);
    console.log(`😊 Emotion Detections: ${store.metrics.emotionDetections}`);
  } else {
    console.log('⚠️ Social Decoder Store not available');
  }
  
  // Run a test analysis
  console.log('\n6️⃣ Running test analysis...');
  try {
    const testText = "Oh sure, that's absolutely perfect.";
    console.log(`🧪 Test text: "${testText}"`);
    
    const result = decoder.analyzeConversation(testText, null);
    console.log('✅ Analysis completed successfully');
    console.log(`🎯 Analysis:`, result.translation);
    console.log(`📊 Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    
    if (result.translation.isSarcasm) {
      console.log('✅ Sarcasm correctly detected');
    }
    
    return { success: true };
  } catch (error) {
    console.log(`❌ Analysis failed: ${error}`);
    return { success: false, error: 'Analysis failed' };
  }
}

// Run the check
checkSocialDecoderStatus()
  .then(result => {
    console.log('\n🏁 SOCIAL DECODER STATUS CHECK COMPLETED');
    console.log('======================================');
    console.log(`Final result: ${result.success ? '✅ WORKING' : '❌ NOT WORKING'}`);
    if (result.error) {
      console.log(`Error: ${result.error}`);
    }
  })
  .catch(error => {
    console.error('❌ Check failed:', error);
  });

// If you want to run the built-in tests
console.log('\n💡 You can also run these built-in tests:');
console.log('- window.testSocial.detectSarcasm() - Test sarcasm detection');
console.log('- window.testSocial.suggestResponse() - Test response suggestions');
console.log('- window.testSocial.analyzeTone() - Test emotional tone analysis');
console.log('- window.testSocialDecoderSystem.checkStatus() - Check system status');
console.log('- window.testSocialDecoderSystem.runProductionReadinessTest() - Run full production test');