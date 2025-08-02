# Velvet Dashboard Components

A complete neurodivergent-friendly dashboard system for the Velvet AI assistant desktop app, built with React, TypeScript, and Velvet's signature glassmorphism design system.

## Features

- **🎭 Neurodivergent-Friendly Design**: Calm colors, large touch targets, clear visual hierarchy
- **✨ Glassmorphism UI**: Transparent backgrounds with blur effects and gentle animations
- **🧠 AI Context Integration**: Real-time data from Velvet's consciousness store
- **📊 Data Visualization**: Charts for focus patterns and energy levels
- **🔄 Real-time Updates**: Live pattern detection and gentle notifications
- **♿ Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **📱 Responsive**: Works across different screen sizes and DPI settings

## Quick Start

### Basic Integration

```typescript
import { mountVelvetDashboard } from './components/VelvetDashboardIntegration';

// Mount the dashboard in a new container
const dashboardRoot = mountVelvetDashboard();
```

### Auto-Integration with Existing Velvet System

```typescript
import { autoIntegrateVelvetDashboard } from './components/VelvetDashboardIntegration';

// Automatically integrates with existing Velvet orb and AI system
autoIntegrateVelvetDashboard();
```

### Using Individual Components

```typescript
import { Card, Button, Progress, Badge } from './components/ui';

function MyComponent() {
  return (
    <Card hover>
      <CardHeader>
        <CardTitle>Energy Level</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={75} variant="success" showLabel />
        <Badge variant="primary">High Energy</Badge>
      </CardContent>
    </Card>
  );
}
```

## Component Library

### Layout & Navigation
- **Sidebar**: Collapsible navigation with glassmorphism styling
- **Card**: Content containers with hover effects and proper spacing

### Interactive Elements
- **Button**: Multiple variants (primary, secondary, ghost, outline) with hover states
- **Progress**: Linear and circular progress indicators with energy-level styling
- **Badge**: Status indicators with mood and pattern-specific variants

### Data Display
- **Table**: Task tables with progress bars and status indicators
- **Chart**: Line, bar, and area charts for focus patterns and energy tracking
- **TaskTable**: Specialized table for displaying micro-tasks with progress

### Feedback & Notifications
- **Alert**: System alerts with dismissible actions
- **PatternAlert**: Specialized alerts for ADHD/autism pattern detection
- **GentleNotification**: Supportive messages with Hinglish personality

## Dashboard Sections

### 🏠 Home Dashboard
- **Today's Energy**: Circular progress with mood indicators
- **Active Tasks**: Table with micro-steps and progress tracking
- **Pattern Insights**: Real-time behavioral pattern alerts
- **Quick Actions**: Grid of common actions (break, focus mode, etc.)
- **Focus Patterns**: Chart showing concentration levels throughout the day
- **Energy Chart**: Timeline of energy levels with mood correlation

### 🎭 Social Intelligence
- Social decoder for neurotypical communication patterns
- Masking fatigue detection and safe space monitoring
- Real-time sarcasm and subtext translation

### ✅ Task Support
- Executive function tools for task breakdown
- Time estimation and progress tracking
- Dopamine reward system for completed tasks

### 🎤 Meeting Assistant
- Real-time transcription and communication coaching
- Social cue detection and response suggestions

### 📊 Pattern Insights
- Behavioral analysis dashboard
- Hyperfocus, distraction, and task avoidance detection
- Personalized intervention suggestions

### ⚙️ Settings
- Customization options for neurodivergent preferences
- Accessibility settings and personality tuning

## Design System

### Colors
```css
:root {
  --primary-blue: #2563eb;
  --secondary-blue: #1d4ed8;
  --accent-cyan: #06b6d4;
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.6);
}
```

### Glassmorphism Effects
```css
.velvet-glassmorphism {
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.90) 50%,
    rgba(15, 23, 42, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.1);
}
```

### Typography
- **Display**: SF Pro Display for headings and titles
- **Body**: SF Pro Text for content and interfaces
- **Sizes**: Responsive scaling from 10px to 32px
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## Velvet Personality

The dashboard incorporates Velvet's warm, supportive personality:

### Language Guidelines
- ✅ Warm, conversational language acknowledging emotions first
- ✅ Celebrate every small win, validate struggles
- ✅ Break tasks into micro-steps, use "we" for collaboration
- ✅ Mix of English (70%) and Hindi (30%) for cultural warmth
- ❌ Never use "just focus/do it", clinical language, shame/guilt

### Example Messages
- "Bas 10 minutes mein great progress! You're doing amazing 🌟"
- "Big task feeling overwhelming? Let's break it into smaller chunks, yaar."
- "You've been in the zone! I'll hold notifications for you."
- "Lots of mental tabs open! Want to brain dump, then pick ONE thing?"

## Integration with Existing Velvet System

### Consciousness Store Integration
```typescript
// The dashboard automatically syncs with the existing consciousness store
import { useConsciousnessStore } from '../stores/consciousness-store';

// Access real-time brain context
const brainContext = useConsciousnessStore(state => state.brainContext);
const userState = useConsciousnessStore(state => state.userState);
```

### AI System Enhancement
```typescript
// Dashboard enhances existing AI responses with context
if (window.velvetAI && window.velvetAI.getBrainContext) {
  window.velvetAI.getBrainContext = async function() {
    const unifiedContext = await consciousnessBridge.getBrainContextForLegacyAI();
    return unifiedContext;
  };
}
```

## Development Examples

### Creating a Custom Card
```typescript
import { Card, CardHeader, CardTitle, CardContent, Badge } from './ui';

function CustomEnergyCard({ energyLevel, mood }) {
  return (
    <Card hover className="my-custom-card">
      <CardHeader>
        <CardTitle>
          Energy Status
          <Badge variant={energyLevel === 'high' ? 'success' : 'warning'}>
            {energyLevel.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CircularProgress 
          value={energyLevel === 'high' ? 80 : 60}
          variant="success"
          showLabel
        />
        <MoodBadge mood={mood} />
      </CardContent>
    </Card>
  );
}
```

### Adding a Custom Alert
```typescript
import { PatternAlert } from './ui';

function MyComponent() {
  const handlePatternDetected = (pattern) => {
    return (
      <PatternAlert
        pattern={{
          type: 'hyperfocus',
          confidence: 0.85,
          duration: 2700000, // 45 minutes
          context: 'Deep work session detected',
          suggestion: 'You\'ve been focused for a while! Consider a gentle break.'
        }}
        onAction={() => suggestBreak()}
        onDismiss={() => dismissAlert()}
      />
    );
  };
}
```

### Creating a Custom Chart
```typescript
import { Chart, FocusPatternChart } from './ui';

function MyFocusChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Focus Patterns</CardTitle>
      </CardHeader>
      <CardContent>
        <FocusPatternChart 
          patterns={data.map(d => ({
            time: d.timestamp,
            focusLevel: d.concentration,
            type: d.state
          }))}
        />
      </CardContent>
    </Card>
  );
}
```

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast Mode**: Automatic adaptation for high contrast preferences
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators and logical tab order
- **Large Touch Targets**: Minimum 44px touch targets for mobile accessibility

## Performance Considerations

- **Code Splitting**: Components are lazily loaded
- **Memoization**: React.memo and useMemo for expensive calculations
- **Virtualization**: Large lists use virtual scrolling
- **Debounced Updates**: Real-time data updates are debounced
- **CSS-in-JS Optimization**: Styles are injected only when components are used

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Contributing

When adding new components or features:

1. Follow Velvet's design system and personality guidelines
2. Ensure accessibility compliance (WCAG 2.1 AA)
3. Add proper TypeScript types
4. Include usage examples in component documentation
5. Test on different screen sizes and with assistive technologies

## License

This component library is part of the Velvet AI assistant and follows the project's license terms.

---

**Velvet**: "Soft support for sharp minds" - A gentle companion that understands your brain. 💝