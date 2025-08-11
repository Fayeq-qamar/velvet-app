import React, { useState, useEffect } from 'react';
import SocialDecoderComponent from '../components/SocialDecoderComponent';
import socialDecoderIntegration from '../integrations/social-decoder-integration';
import { useSocialDecoderStore } from '../stores/social-decoder-store';
import type { SocialDecoderAnalysis } from '../stores/social-decoder-store';
import './SocialDecoderExample.css';

/**
 * Example component demonstrating how to use the Social Decoder feature
 * in the Velvet application.
 */
const SocialDecoderExample: React.FC = () => {
  // State for integration status
  const [integrationStatus, setIntegrationStatus] = useState<{
    isConnected: boolean;
    activeIntegrations: string[];
  }>({ isConnected: false, activeIntegrations: [] });
  
  // State for detected insights
  const [detectedInsights, setDetectedInsights] = useState<SocialDecoderAnalysis[]>([]);
  
  // Get state from the store
  const { isActive, metrics } = useSocialDecoderStore();
  
  // Initialize the integration when the component mounts
  useEffect(() => {
    const initializeIntegration = async () => {
      try {
        // Initialize with custom options
        await socialDecoderIntegration.initialize({
          enableConsciousnessIntegration: true,
          enableNotifications: true,
          enableWhisperMode: true,
          sensitivityLevel: 75,
          debugMode: true
        });
        
        // Update status
        const status = socialDecoderIntegration.getStatus();
        setIntegrationStatus({
          isConnected: status.isConnected,
          activeIntegrations: status.activeIntegrations
        });
      } catch (error) {
        console.error('Failed to initialize Social Decoder integration:', error);
      }
    };
    
    initializeIntegration();
    
    // Cleanup when the component unmounts
    return () => {
      socialDecoderIntegration.cleanup();
    };
  }, []);
  
  // Handle new detections from the Social Decoder
  const handleDetection = (analysis: SocialDecoderAnalysis) => {
    // Add to our local state
    setDetectedInsights(prev => [analysis, ...prev].slice(0, 5));
    
    // Log for demonstration purposes
    console.log('New social insight detected:', analysis);
  };
  
  return (
    <div className="social-decoder-example">
      <div className="example-header">
        <h2>Social Decoder Example</h2>
        <p className="description">
          This example demonstrates how to integrate the Social Decoder feature
          into your Velvet application. The Social Decoder helps users understand
          subtle social cues and subtext in conversations.
        </p>
      </div>
      
      <div className="integration-status">
        <h3>Integration Status</h3>
        <div className="status-indicator">
          <span className={`status-dot ${integrationStatus.isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="status-text">
            {integrationStatus.isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        
        {integrationStatus.activeIntegrations.length > 0 && (
          <div className="active-integrations">
            <p>Active Integrations:</p>
            <ul>
              {integrationStatus.activeIntegrations.map((integration, index) => (
                <li key={index}>{integration}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Social Decoder Component */}
      <div className="decoder-container">
        <SocialDecoderComponent 
          autoActivate={false}
          showControls={true}
          showAnalysis={true}
          onDetection={handleDetection}
        />
      </div>
      
      {/* Insights Panel */}
      {isActive && detectedInsights.length > 0 && (
        <div className="insights-panel">
          <h3>Recent Social Insights</h3>
          <div className="insights-list">
            {detectedInsights.map((insight, index) => (
              <div key={index} className="insight-card">
                <div className="insight-header">
                  <span className="timestamp">
                    {new Date(insight.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="confidence">
                    {Math.round(insight.confidence * 100)}% confidence
                  </span>
                </div>
                
                <p className="insight-text">{insight.text}</p>
                
                {insight.detectedEmotion && (
                  <div className="emotion-tag">
                    Emotion: {insight.detectedEmotion}
                  </div>
                )}
                
                {insight.isSarcasm && (
                  <div className="sarcasm-tag">
                    Sarcasm detected
                    {insight.subtext && (
                      <p className="subtext">Likely meaning: "{insight.subtext}"</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Performance Metrics */}
      {isActive && (
        <div className="performance-metrics">
          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-label">Total Detections</span>
              <span className="metric-value">{metrics.totalDetections}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Sarcasm Detections</span>
              <span className="metric-value">{metrics.sarcasmDetections}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Emotion Detections</span>
              <span className="metric-value">{metrics.emotionDetections}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Interventions</span>
              <span className="metric-value">{metrics.interventionsTrigger}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Avg. Confidence</span>
              <span className="metric-value">{Math.round(metrics.averageConfidence * 100)}%</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Documentation */}
      <div className="documentation">
        <h3>How to Use</h3>
        <ol>
          <li>Click "Activate Social Decoder" to enable the feature</li>
          <li>Click "Start Listening" to begin analyzing conversation</li>
          <li>The decoder will detect emotional tones, sarcasm, and subtext</li>
          <li>Notifications will appear for significant detections</li>
          <li>Use the insights to better understand social communication</li>
        </ol>
        
        <h3>Integration Options</h3>
        <p>
          The Social Decoder can be integrated with other Velvet systems:
        </p>
        <ul>
          <li><strong>Consciousness Integration:</strong> Feeds social insights into the Velvet consciousness system</li>
          <li><strong>Notification System:</strong> Displays alerts for significant detections</li>
          <li><strong>Whisper Mode:</strong> Provides subtle notifications that only the user can see</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialDecoderExample;