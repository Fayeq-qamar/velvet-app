/**
 * Social Decoder Feature - Index File
 * 
 * This file exports all components and utilities related to the Social Decoder feature.
 * Import from this file to use the Social Decoder in your application.
 */

// Core Social Decoder class
import SocialDecoder from '../social-decoder';

// React component
import SocialDecoderComponent from '../components/SocialDecoderComponent';

// State management
import { useSocialDecoderStore } from '../stores/social-decoder-store';
import type { 
  SocialDecoderState,
  SocialDecoderAnalysis,
  SocialDecoderMetrics,
  SocialDecoderUIState,
  MeetingContext
} from '../stores/social-decoder-store';

// Integration utilities
import socialDecoderIntegration, { SocialDecoderIntegration } from '../integrations/social-decoder-integration';

// Example implementation
import SocialDecoderExample from '../examples/SocialDecoderExample';

// Export everything
export {
  // Core class
  SocialDecoder,
  
  // React component
  SocialDecoderComponent,
  
  // State management
  useSocialDecoderStore,
  
  // Types
  SocialDecoderState,
  SocialDecoderAnalysis,
  SocialDecoderMetrics,
  SocialDecoderUIState,
  MeetingContext,
  
  // Integration
  socialDecoderIntegration,
  SocialDecoderIntegration,
  
  // Example
  SocialDecoderExample
};

// Default export for convenience
export default SocialDecoderComponent;