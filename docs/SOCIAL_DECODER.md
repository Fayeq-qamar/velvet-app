# Social Decoder Feature Documentation

## Overview

The Social Decoder is a powerful feature in the Velvet application that helps users understand subtle social cues, emotional tones, and subtext in conversations. It uses real-time audio analysis and natural language processing to detect sarcasm, emotional states, and hidden meanings in communication.

## Key Features

- **Real-time Tone Detection**: Analyzes voice patterns and text to identify emotional tones
- **Sarcasm Detection**: Identifies sarcastic statements and provides likely actual meaning
- **Subtext Analysis**: Reveals hidden meanings in conversations
- **Meeting Context Awareness**: Adapts to different meeting environments and participants
- **Whisper Notifications**: Provides subtle, private insights during conversations
- **Consciousness Integration**: Feeds social insights into Velvet's consciousness system

## Technical Implementation

The Social Decoder feature has been implemented using TypeScript and follows modern React patterns:

- **TypeScript Classes**: Core functionality in strongly-typed classes
- **React Components**: UI components with TypeScript props and state
- **Zustand State Management**: Centralized state with actions and selectors
- **Integration Layer**: Connects with other Velvet systems

## Usage

### Basic Implementation

```tsx
import { SocialDecoderComponent } from '../renderer/social-decoder';

const MyComponent = () => {
  return (
    <div>
      <h2>My Application</h2>
      <SocialDecoderComponent 
        autoActivate={true}
        showControls={true}
        showAnalysis={true}
        onDetection={(analysis) => {
          console.log('New detection:', analysis);
        }}
      />
    </div>
  );
};
```

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoActivate` | boolean | `false` | Automatically activate and start listening when mounted |
| `showControls` | boolean | `true` | Show activation and listening controls |
| `showAnalysis` | boolean | `true` | Show analysis results and metrics |
| `onDetection` | function | - | Callback function when new analysis is detected |

### Using the Store

Access and update the Social Decoder state from anywhere in your application:

```tsx
import { useSocialDecoderStore } from '../renderer/social-decoder';

const MySocialInsightsComponent = () => {
  const { 
    isActive, 
    isListening, 
    currentAnalysis, 
    recentAnalyses,
    toggleActive, 
    toggleListening 
  } = useSocialDecoderStore();

  return (
    <div>
      <button onClick={toggleActive}>
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
      
      {isActive && (
        <button onClick={toggleListening}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      )}
      
      {currentAnalysis && (
        <div>
          <p>Current text: {currentAnalysis.text}</p>
          {currentAnalysis.detectedEmotion && (
            <p>Emotion: {currentAnalysis.detectedEmotion}</p>
          )}
        </div>
      )}
    </div>
  );
};
```

### Integration with Other Systems

Connect the Social Decoder with other Velvet systems:

```tsx
import { socialDecoderIntegration } from '../renderer/social-decoder';

// Initialize with custom options
await socialDecoderIntegration.initialize({
  enableConsciousnessIntegration: true,
  enableNotifications: true,
  enableWhisperMode: true,
  sensitivityLevel: 75,
  debugMode: process.env.NODE_ENV === 'development'
});

// Get current status
const status = socialDecoderIntegration.getStatus();
console.log('Integration status:', status);

// Update options
socialDecoderIntegration.updateOptions({
  sensitivityLevel: 85
});

// Clean up when done
socialDecoderIntegration.cleanup();
```

## Data Types

### SocialDecoderAnalysis

```typescript
interface SocialDecoderAnalysis {
  text: string;              // The analyzed text
  detectedEmotion?: string;  // Detected emotional tone (if any)
  confidence: number;        // Confidence level (0-1)
  timestamp: number;         // Unix timestamp
  isSarcasm?: boolean;       // Whether sarcasm was detected
  subtext?: string;          // Interpreted actual meaning
  voiceMarkers?: string[];   // Voice characteristics detected
}
```

### MeetingContext

```typescript
interface MeetingContext {
  participants: string[];    // List of participant names/ids
  duration: number;          // Meeting duration in seconds
  platform: string | null;   // Meeting platform (Zoom, Teams, etc.)
  isRecording: boolean;      // Whether meeting is being recorded
  socialTension: number;     // Detected social tension level (0-100)
  communicationStyle: string; // Formal, casual, etc.
}
```

## Best Practices

1. **User Privacy**: Always inform users when the Social Decoder is active and listening
2. **Sensitivity Settings**: Allow users to adjust sensitivity levels for different contexts
3. **Whisper Mode**: Use whisper notifications in group settings to avoid disruption
4. **Integration**: Connect with the consciousness system for more contextual awareness
5. **Error Handling**: Gracefully handle initialization failures and audio permission issues

## Example Implementation

See the `SocialDecoderExample` component for a complete implementation example:

```tsx
import { SocialDecoderExample } from '../renderer/social-decoder';

const MyApp = () => {
  return (
    <div className="app">
      <header>My Velvet App</header>
      <main>
        <SocialDecoderExample />
      </main>
    </div>
  );
};
```

## Troubleshooting

### Common Issues

1. **Microphone Access**: Ensure the application has permission to access the microphone
2. **Audio Context**: Browser policies may require user interaction before audio analysis works
3. **Performance**: If performance issues occur, adjust the sensitivity level or disable in background
4. **Integration Errors**: Check that required systems (consciousness, notifications) are available

### Debugging

Enable debug mode in the integration options to see detailed logs:

```typescript
await socialDecoderIntegration.initialize({
  debugMode: true
});
```

## Future Enhancements

1. **Multi-language Support**: Extend analysis capabilities to detect tones and subtext in multiple languages
2. **Cultural Context Awareness**: Adapt analysis based on different cultural communication norms
3. **Personalized Learning**: Improve detection accuracy by learning from user feedback and corrections
4. **Advanced Visualization**: Add visual representations of emotional patterns over time
5. **API Integration**: Allow third-party applications to access Social Decoder insights
6. **Offline Mode**: Enable core functionality without internet connection
7. **Enhanced Pattern Recognition**: Improve detection of complex emotional patterns
8. **Real-time Feedback System**: Provide immediate guidance for challenging social situations
9. **Integration with External Communication Platforms**: Connect with Zoom, Teams, Slack, and other platforms
10. **Machine Learning Improvements**: Enhance accuracy through advanced ML techniques
11. **Group Dynamics Analysis**: Provide insights into team interactions during meetings

## Conclusion

The Social Decoder feature provides Velvet users with powerful tools to understand the nuances of human communication. By detecting emotional tones, sarcasm, and subtext in real-time, it helps neurodivergent users navigate social interactions with greater confidence and understanding.