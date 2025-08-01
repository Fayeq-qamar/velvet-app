import React, { useEffect, useState } from 'react';
import { useConsciousnessStore, useBrainContext, useStreamStatus, useUserState, useConsciousnessLevel } from '../stores/consciousness-store';

interface ConsciousnessVisualizerProps {
  isExpanded: boolean;
}

export const ConsciousnessVisualizer: React.FC<ConsciousnessVisualizerProps> = ({ isExpanded }) => {
  const consciousnessLevel = useConsciousnessLevel();
  const streamStatus = useStreamStatus();
  const brainContext = useBrainContext();
  const userState = useUserState();
  const [pulseIntensity, setPulseIntensity] = useState(0.5);

  // Update pulse intensity based on consciousness level and brain activity
  useEffect(() => {
    const baseIntensity = {
      minimal: 0.2,
      aware: 0.4,
      conscious: 0.7,
      transcendent: 1.0
    }[consciousnessLevel];

    // Add variability based on OCR confidence and stream activity
    const activityBoost = brainContext.ocrConfidence * 0.3;
    const streamBoost = streamStatus.connected ? 0.2 : 0;
    
    setPulseIntensity(Math.min(1.0, baseIntensity + activityBoost + streamBoost));
  }, [consciousnessLevel, brainContext.ocrConfidence, streamStatus.connected]);

  const getConsciousnessColor = () => {
    switch (consciousnessLevel) {
      case 'minimal': return 'rgba(100, 100, 100, 0.6)';
      case 'aware': return 'rgba(59, 130, 246, 0.7)';
      case 'conscious': return 'rgba(16, 185, 129, 0.8)';
      case 'transcendent': return 'rgba(236, 72, 153, 0.9)';
      default: return 'rgba(100, 100, 100, 0.6)';
    }
  };

  const getFocusStateIndicator = () => {
    const indicators = {
      idle: '💤',
      focused: '🎯',
      distracted: '🌀',
      hyperfocus: '🔥'
    };
    return indicators[userState.focusState] || '💤';
  };

  if (!isExpanded) {
    // Compact orb mode - show just the consciousness state
    return (
      <div className="consciousness-orb-compact">
        <div 
          className="consciousness-pulse"
          style={{
            background: `radial-gradient(circle, ${getConsciousnessColor()}, transparent)`,
            animation: `consciousnessPulse ${2 - pulseIntensity}s ease-in-out infinite alternate`,
            width: '100%',
            height: '100%',
            borderRadius: '50%'
          }}
        >
          <div className="consciousness-center">
            {getFocusStateIndicator()}
          </div>
        </div>
      </div>
    );
  }

  // Expanded mode - full consciousness dashboard
  return (
    <div className="consciousness-dashboard">
      <div className="consciousness-header">
        <h3>🧠 Unified Consciousness</h3>
        <div className="consciousness-level">
          Level: <span className={`level-${consciousnessLevel}`}>{consciousnessLevel.toUpperCase()}</span>
        </div>
      </div>

      <div className="consciousness-grid">
        {/* Stream Status */}
        <div className="consciousness-card">
          <h4>📡 Stream Status</h4>
          <div className={`stream-indicator ${streamStatus.connected ? 'connected' : 'disconnected'}`}>
            {streamStatus.connected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
          <div className="active-streams">
            Active: {streamStatus.activeStreams.join(', ') || 'None'}
          </div>
          {streamStatus.errors.length > 0 && (
            <div className="stream-errors">
              Errors: {streamStatus.errors[streamStatus.errors.length - 1]}
            </div>
          )}
        </div>

        {/* User State */}
        <div className="consciousness-card">
          <h4>{getFocusStateIndicator()} User State</h4>
          <div className="user-metrics">
            <div>Focus: <span className={`focus-${userState.focusState}`}>{userState.focusState}</span></div>
            <div>Energy: <span className={`energy-${userState.energyLevel}`}>{userState.energyLevel}</span></div>
            <div>Emotion: <span className={`emotion-${userState.emotionalState}`}>{userState.emotionalState}</span></div>
          </div>
          {userState.currentTask && (
            <div className="current-task">
              Task: {userState.currentTask.description}
              <div className="task-progress">
                Step {userState.currentTask.currentStep + 1} of {userState.currentTask.steps.length}
              </div>
            </div>
          )}
        </div>

        {/* Brain Context */}
        <div className="consciousness-card">
          <h4>👁️ Screen Awareness</h4>
          <div className="ocr-confidence">
            Confidence: <span className={brainContext.ocrConfidence > 0.7 ? 'high' : brainContext.ocrConfidence > 0.4 ? 'medium' : 'low'}>
              {Math.round(brainContext.ocrConfidence * 100)}%
            </span>
          </div>
          <div className="screen-preview">
            {brainContext.screenText ? (
              <div className="screen-text">
                {brainContext.screenText.substring(0, 100)}
                {brainContext.screenText.length > 100 && '...'}
              </div>
            ) : (
              <div className="no-text">No screen text detected</div>
            )}
          </div>
          <div className="timestamp">
            Last update: {new Date(brainContext.timestamp).toLocaleTimeString()}
          </div>
        </div>

        {/* Pattern Detection */}
        <div className="consciousness-card">
          <h4>🔍 Pattern Detection</h4>
          {brainContext.patterns && brainContext.patterns.length > 0 ? (
            <div className="detected-patterns">
              {brainContext.patterns.map((pattern, index) => (
                <div key={index} className={`pattern pattern-${pattern.type}`}>
                  <span className="pattern-type">{pattern.type}</span>
                  <span className="pattern-confidence">{Math.round(pattern.confidence * 100)}%</span>
                  <div className="pattern-context">{pattern.context}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-patterns">No patterns detected</div>
          )}
        </div>
      </div>

      {/* Consciousness Pulse Visualization */}
      <div className="consciousness-pulse-container">
        <div 
          className="consciousness-pulse-wave"
          style={{
            background: `radial-gradient(circle, ${getConsciousnessColor()}, transparent)`,
            animation: `consciousnessPulse ${2 - pulseIntensity}s ease-in-out infinite alternate`,
            opacity: pulseIntensity
          }}
        />
      </div>
    </div>
  );
};

// CSS styles (would normally be in a separate file)
const styles = `
.consciousness-orb-compact {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.consciousness-pulse {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.consciousness-center {
  font-size: 24px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.consciousness-dashboard {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.consciousness-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.consciousness-level {
  font-size: 12px;
  opacity: 0.8;
}

.level-minimal { color: #666; }
.level-aware { color: #3b82f6; }
.level-conscious { color: #10b981; }
.level-transcendent { color: #ec4899; }

.consciousness-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.consciousness-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.consciousness-card h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  opacity: 0.9;
}

.stream-indicator.connected { color: #10b981; }
.stream-indicator.disconnected { color: #ef4444; }

.focus-focused { color: #10b981; }
.focus-distracted { color: #f59e0b; }
.focus-hyperfocus { color: #ec4899; }
.focus-idle { color: #6b7280; }

.energy-high { color: #ec4899; }
.energy-medium { color: #10b981; }
.energy-low { color: #6b7280; }

.screen-text {
  font-family: monospace;
  font-size: 11px;
  background: rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 5px;
  margin: 5px 0;
  max-height: 60px;
  overflow-y: auto;
}

.pattern {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 12px;
}

.pattern-type {
  text-transform: capitalize;
}

.pattern-confidence {
  opacity: 0.7;
  font-size: 11px;
}

.consciousness-pulse-container {
  position: relative;
  height: 30px;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}

.consciousness-pulse-wave {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

@keyframes consciousnessPulse {
  0% { opacity: 0.3; transform: scale(0.95); }
  100% { opacity: 0.8; transform: scale(1.05); }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}