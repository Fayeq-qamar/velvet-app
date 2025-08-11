# How to Check the Social Decoder Feature

This guide provides several methods to verify that the Social Decoder feature is working correctly in the Velvet application.

## Method 1: Using the Example Component

The easiest way to check the Social Decoder is through the example component:

1. Navigate to the Social Decoder Example page in the application
2. Check the "Integration Status" section to verify if it shows "Connected"
3. Look for active integrations listed below the status
4. Click "Activate Social Decoder" to enable the feature
5. Click "Start Listening" to begin analyzing conversation
6. Speak or type text with sarcastic or emotional content to test detection
7. Check the "Recent Social Insights" panel for detected insights
8. Review the "Performance Metrics" section to see detection counts

## Method 2: Using the Debug Script

For a more technical verification, use the provided debug script:

1. Open the browser console in the Velvet application (F12 or Right-click > Inspect > Console)
2. Run the check script by executing:

```javascript
const script = document.createElement('script');
script.src = '/debug-scripts/check-social-decoder.js';
document.body.appendChild(script);
```

Or navigate to the debug scripts directory and run:

```bash
node check-social-decoder.js
```

The script will perform the following checks:
- Verify if the Social Decoder class is available
- Initialize the Social Decoder
- Check if it's active
- Verify integration status
- Check store status
- Run a test analysis

## Method 3: Using the Built-in Test Functions

The Social Decoder includes built-in test functions that can be run from the console:

```javascript
// Test sarcasm detection
window.testSocial.detectSarcasm();

// Test response suggestions
window.testSocial.suggestResponse();

// Test emotional tone analysis
window.testSocial.analyzeTone();

// Check system status
window.testSocialDecoderSystem.checkStatus();

// Run full production readiness test
window.testSocialDecoderSystem.runProductionReadinessTest();
```

## Method 4: Using the Demo Page

A standalone demo page is available to test the Social Decoder:

1. Open `/examples/social-decoder-demo.html` in a browser
2. Click "Check Status" to verify availability
3. Click "Initialize" to set up the Social Decoder
4. Use "Toggle Active" to activate/deactivate
5. Enter text in the test area and click "Analyze Text"
6. Review the results to see detected emotions, sarcasm, and suggestions

## Troubleshooting

If the Social Decoder is not working correctly:

1. Check browser console for errors
2. Verify that all required dependencies are loaded
3. Ensure the Social Decoder integration is properly initialized
4. Check if the store is connected and active
5. Try reloading the application

## Expected Behavior

When functioning correctly, the Social Decoder should:

- Detect sarcasm in phrases like "Oh sure, that's absolutely perfect"
- Identify emotional tones such as frustration, anxiety, or passive-aggressiveness
- Provide suggestions for appropriate responses
- Show confidence levels for detections
- Update metrics in real-time

## Integration Status

The Social Decoder can integrate with several Velvet systems:

- Consciousness Integration: Feeds social insights into the Velvet consciousness system
- Notification System: Displays alerts for significant detections
- Whisper Mode: Provides subtle notifications that only the user can see

Verify that these integrations are active in the status panel.