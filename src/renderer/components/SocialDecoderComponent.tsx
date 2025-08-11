import React, { useEffect, useState, useRef } from 'react';
import { useSocialDecoderStore } from '../stores/social-decoder-store';
import SocialDecoder from '../social-decoder';
import './SocialDecoderComponent.css';

interface SocialDecoderComponentProps {
  autoActivate?: boolean;
  showControls?: boolean;
  showAnalysis?: boolean;
  onDetection?: (analysis: any) => void;
}

const SocialDecoderComponent: React.FC<SocialDecoderComponentProps> = ({
  autoActivate = false,
  showControls = true,
  showAnalysis = true,
  onDetection
}) => {
  // Get state and actions from the store
  const {
    isActive,
    isListening,
    currentAnalysis,
    recentAnalyses,
    metrics,
    uiState,
    toggleActive,
    toggleListening,
    updateUIState
  } = useSocialDecoderStore();

  // Reference to the SocialDecoder instance
  const decoderRef = useRef<SocialDecoder | null>(null);
  
  // Local state for initialization status
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the social decoder on component mount
  useEffect(() => {
    const initializeDecoder = async () => {
      if (!decoderRef.current && !isInitializing && !isInitialized) {
        try {
          setIsInitializing(true);
          setError(null);
          
          // Create and initialize the SocialDecoder
          const decoder = new SocialDecoder();
          const success = await decoder.initialize();
          
          if (success) {
            decoderRef.current = decoder;
            setIsInitialized(true);
            
            // Auto-activate if specified
            if (autoActivate) {
              toggleActive();
              toggleListening();
            }
          } else {
            setError('Failed to initialize Social Decoder');
          }
        } catch (err) {
          setError(`Error initializing Social Decoder: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
          setIsInitializing(false);
        }
      }
    };
    
    initializeDecoder();
    
    // Cleanup on unmount
    return () => {
      // Cleanup code for the decoder if needed
    };
  }, [autoActivate, toggleActive, toggleListening]);

  // Handle new detections
  useEffect(() => {
    if (currentAnalysis && onDetection) {
      onDetection(currentAnalysis);
    }
  }, [currentAnalysis, onDetection]);

  // Toggle whisper notifications
  const toggleWhisperNotifications = () => {
    updateUIState({
      whisperNotificationsEnabled: !uiState.whisperNotificationsEnabled
    });
  };

  // Render loading state
  if (isInitializing) {
    return (
      <div className="social-decoder-component loading">
        <div className="loading-spinner"></div>
        <p>Initializing Social Decoder...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="social-decoder-component error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className={`social-decoder-component ${isActive ? 'active' : 'inactive'}`}>
      {showControls && (
        <div className="decoder-controls">
          <button 
            className={`toggle-button ${isActive ? 'active' : ''}`}
            onClick={toggleActive}
          >
            {isActive ? 'Deactivate' : 'Activate'} Social Decoder
          </button>
          
          {isActive && (
            <>
              <button 
                className={`listen-button ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                disabled={!isActive}
              >
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </button>
              
              <button
                className={`whisper-button ${uiState.whisperNotificationsEnabled ? 'enabled' : 'disabled'}`}
                onClick={toggleWhisperNotifications}
                disabled={!isActive}
              >
                {uiState.whisperNotificationsEnabled ? 'Disable' : 'Enable'} Whispers
              </button>
            </>
          )}
        </div>
      )}
      
      {showAnalysis && isActive && (
        <div className="decoder-analysis">
          <div className="status-indicator">
            <div className={`indicator-light ${isListening ? 'listening' : 'idle'}`}></div>
            <span>{isListening ? 'Listening...' : 'Ready'}</span>
          </div>
          
          {currentAnalysis && (
            <div className="current-analysis">
              <h4>Current Analysis</h4>
              <p className="analysis-text">{currentAnalysis.text}</p>
              
              {currentAnalysis.detectedEmotion && (
                <div className="emotion-detection">
                  <span className="label">Detected Emotion:</span>
                  <span className="value">{currentAnalysis.detectedEmotion}</span>
                  <span className="confidence">{Math.round(currentAnalysis.confidence * 100)}%</span>
                </div>
              )}
              
              {currentAnalysis.isSarcasm && (
                <div className="sarcasm-detection">
                  <span className="label">Sarcasm Detected</span>
                  {currentAnalysis.subtext && (
                    <p className="subtext">Likely meaning: "{currentAnalysis.subtext}"</p>
                  )}
                </div>
              )}
            </div>
          )}
          
          {recentAnalyses.length > 0 && (
            <div className="recent-analyses">
              <h4>Recent Analyses</h4>
              <ul>
                {recentAnalyses.slice(0, 3).map((analysis, index) => (
                  <li key={index} className="analysis-item">
                    <span className="analysis-text">{analysis.text}</span>
                    {analysis.detectedEmotion && (
                      <span className="emotion-tag">{analysis.detectedEmotion}</span>
                    )}
                    {analysis.isSarcasm && (
                      <span className="sarcasm-tag">Sarcasm</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="metrics-summary">
            <p>Session Duration: {formatDuration(Date.now() - metrics.sessionStart)}</p>
            <p>Detections: {metrics.totalDetections}</p>
            <p>Avg. Confidence: {Math.round(metrics.averageConfidence * 100)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to format duration
const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

export default SocialDecoderComponent;