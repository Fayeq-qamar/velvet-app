/**
 * Social Decoder Integration
 * 
 * This file handles the integration of the Social Decoder feature with the main Velvet application.
 * It connects the Social Decoder component with other parts of the application like the
 * consciousness system, notification system, and user preferences.
 */

import { useSocialDecoderStore } from '../stores/social-decoder-store';
import type { SocialDecoderAnalysis } from '../stores/social-decoder-store';

// Define integration interfaces
interface IntegrationOptions {
  enableConsciousnessIntegration?: boolean;
  enableNotifications?: boolean;
  enableWhisperMode?: boolean;
  sensitivityLevel?: number; // 0-100
  debugMode?: boolean;
}

interface IntegrationStatus {
  isConnected: boolean;
  activeIntegrations: string[];
  lastSyncTime: number | null;
}

// Default integration options
const defaultOptions: IntegrationOptions = {
  enableConsciousnessIntegration: true,
  enableNotifications: true,
  enableWhisperMode: true,
  sensitivityLevel: 70,
  debugMode: false
};

/**
 * Social Decoder Integration Manager
 * Handles connecting the Social Decoder with other Velvet systems
 */
class SocialDecoderIntegration {
  private options: IntegrationOptions;
  private status: IntegrationStatus;
  private unsubscribeFunctions: Array<() => void>;
  private consciousnessConnection: any | null;
  private notificationSystem: any | null;
  
  constructor(options: IntegrationOptions = {}) {
    this.options = { ...defaultOptions, ...options };
    this.status = {
      isConnected: false,
      activeIntegrations: [],
      lastSyncTime: null
    };
    this.unsubscribeFunctions = [];
    this.consciousnessConnection = null;
    this.notificationSystem = null;
  }
  
  /**
   * Initialize the integration with the main application
   */
  public async initialize(): Promise<boolean> {
    try {
      console.log('🔄 Initializing Social Decoder integration...');
      
      // Connect to the store
      this.connectToStore();
      
      // Connect to consciousness system if enabled
      if (this.options.enableConsciousnessIntegration) {
        await this.connectToConsciousness();
      }
      
      // Connect to notification system if enabled
      if (this.options.enableNotifications) {
        this.connectToNotifications();
      }
      
      // Update status
      this.status.isConnected = true;
      this.status.lastSyncTime = Date.now();
      
      console.log('✅ Social Decoder integration complete');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Social Decoder integration:', error);
      return false;
    }
  }
  
  /**
   * Connect to the Social Decoder store and set up subscriptions
   */
  private connectToStore(): void {
    const store = useSocialDecoderStore;
    
    // Subscribe to analysis updates
    const unsubscribeAnalysis = store.subscribe(
      (state) => state.currentAnalysis,
      (currentAnalysis) => {
        if (currentAnalysis) {
          this.handleNewAnalysis(currentAnalysis);
        }
      }
    );
    
    // Subscribe to active state changes
    const unsubscribeActive = store.subscribe(
      (state) => state.isActive,
      (isActive) => {
        console.log(`Social Decoder is now ${isActive ? 'active' : 'inactive'}`);
        // Update other systems about the state change
        this.notifyStateChange(isActive);
      }
    );
    
    // Add unsubscribe functions for cleanup
    this.unsubscribeFunctions.push(unsubscribeAnalysis);
    this.unsubscribeFunctions.push(unsubscribeActive);
    
    // Add to active integrations
    this.status.activeIntegrations.push('store');
  }
  
  /**
   * Connect to the Velvet Consciousness system
   */
  private async connectToConsciousness(): Promise<void> {
    try {
      // Check if the consciousness system is available
      if (window.velvetAI?.consciousness) {
        this.consciousnessConnection = window.velvetAI.consciousness;
        
        // Register the Social Decoder as a consciousness input source
        await this.consciousnessConnection.registerInputSource({
          id: 'social-decoder',
          name: 'Social Decoder',
          priority: 'medium',
          contextType: 'social'
        });
        
        // Add to active integrations
        this.status.activeIntegrations.push('consciousness');
        console.log('✅ Connected to Velvet Consciousness system');
      } else {
        console.warn('⚠️ Velvet Consciousness system not available');
      }
    } catch (error) {
      console.error('❌ Failed to connect to Consciousness system:', error);
      throw error;
    }
  }
  
  /**
   * Connect to the notification system
   */
  private connectToNotifications(): void {
    try {
      // Check if the notification system is available
      if (window.velvetAI?.notifications) {
        this.notificationSystem = window.velvetAI.notifications;
        
        // Register the Social Decoder as a notification source
        this.notificationSystem.registerSource({
          id: 'social-decoder',
          name: 'Social Decoder',
          icon: 'brain',
          color: '#785aff'
        });
        
        // Add to active integrations
        this.status.activeIntegrations.push('notifications');
        console.log('✅ Connected to Velvet Notification system');
      } else {
        console.warn('⚠️ Velvet Notification system not available');
      }
    } catch (error) {
      console.error('❌ Failed to connect to Notification system:', error);
    }
  }
  
  /**
   * Handle new analysis from the Social Decoder
   */
  private handleNewAnalysis(analysis: SocialDecoderAnalysis): void {
    // Send to consciousness system if connected
    if (this.consciousnessConnection && this.options.enableConsciousnessIntegration) {
      this.consciousnessConnection.addContext({
        source: 'social-decoder',
        type: 'social_insight',
        content: {
          text: analysis.text,
          emotion: analysis.detectedEmotion,
          isSarcasm: analysis.isSarcasm,
          subtext: analysis.subtext,
          confidence: analysis.confidence
        },
        timestamp: analysis.timestamp
      });
    }
    
    // Send notification if significant detection and notifications are enabled
    if (this.notificationSystem && this.options.enableNotifications) {
      // Only notify for high confidence detections or sarcasm
      if (analysis.confidence > 0.8 || analysis.isSarcasm) {
        this.sendNotification(analysis);
      }
    }
    
    // Debug logging if enabled
    if (this.options.debugMode) {
      console.log('Social Decoder Analysis:', analysis);
    }
  }
  
  /**
   * Send a notification about a significant detection
   */
  private sendNotification(analysis: SocialDecoderAnalysis): void {
    if (!this.notificationSystem) return;
    
    let title = 'Social Insight Detected';
    let message = analysis.text;
    let type = 'info';
    
    // Customize based on the type of detection
    if (analysis.isSarcasm) {
      title = 'Sarcasm Detected';
      message = analysis.subtext ? `Likely meaning: "${analysis.subtext}"` : analysis.text;
      type = 'warning';
    } else if (analysis.detectedEmotion) {
      title = `${analysis.detectedEmotion} Tone Detected`;
      type = analysis.detectedEmotion.toLowerCase().includes('frustration') ||
             analysis.detectedEmotion.toLowerCase().includes('anger') ?
             'warning' : 'info';
    }
    
    // Send the notification
    this.notificationSystem.show({
      source: 'social-decoder',
      title,
      message,
      type,
      duration: 5000,
      whisperMode: this.options.enableWhisperMode
    });
  }
  
  /**
   * Notify other systems about state changes
   */
  private notifyStateChange(isActive: boolean): void {
    // Notify consciousness system if connected
    if (this.consciousnessConnection) {
      this.consciousnessConnection.updateSourceStatus({
        id: 'social-decoder',
        active: isActive
      });
    }
  }
  
  /**
   * Update integration options
   */
  public updateOptions(newOptions: Partial<IntegrationOptions>): void {
    this.options = { ...this.options, ...newOptions };
    console.log('Social Decoder integration options updated:', this.options);
  }
  
  /**
   * Get the current integration status
   */
  public getStatus(): IntegrationStatus {
    return { ...this.status, lastSyncTime: Date.now() };
  }
  
  /**
   * Clean up all connections and subscriptions
   */
  public cleanup(): void {
    // Unsubscribe from all store subscriptions
    this.unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    this.unsubscribeFunctions = [];
    
    // Disconnect from consciousness system
    if (this.consciousnessConnection) {
      try {
        this.consciousnessConnection.unregisterInputSource('social-decoder');
      } catch (error) {
        console.error('Error unregistering from consciousness system:', error);
      }
      this.consciousnessConnection = null;
    }
    
    // Disconnect from notification system
    if (this.notificationSystem) {
      try {
        this.notificationSystem.unregisterSource('social-decoder');
      } catch (error) {
        console.error('Error unregistering from notification system:', error);
      }
      this.notificationSystem = null;
    }
    
    // Update status
    this.status.isConnected = false;
    this.status.activeIntegrations = [];
    
    console.log('Social Decoder integration cleaned up');
  }
}

// Create and export a singleton instance
const socialDecoderIntegration = new SocialDecoderIntegration();
export default socialDecoderIntegration;

// Also export the class for custom instances
export { SocialDecoderIntegration };