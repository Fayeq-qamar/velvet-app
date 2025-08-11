// Global type definitions for Velvet App
// Extends window object with Velvet-specific properties and methods

declare global {
  interface Window {
    // Core Velvet APIs
    electronAPI: {
      invoke: (channel: string, ...args: any[]) => Promise<any>;
      storage?: {
        get: (key: string) => Promise<any>;
        set: (key: string, value: any) => Promise<void>;
      };
    };
    
    // Velvet Core Systems
    VelvetBrain?: any;
    velvetBrainInstance?: any;
    
    // Task Breakdown System
    taskBreakdownEngine?: any;
    taskBreakdownBridge?: any;
    useTaskBreakdownStore?: any;
    showTaskBreakdownUI?: (task: any) => void;
    hideTaskBreakdownUI?: () => void;
    getActiveTaskBreakdown?: () => any;
    
    // Social Decoder System
    socialDecoderBridge?: any;
    screenOCRMonitorReal?: any;
    audioEnvironmentMonitorReal?: any;
    realScreenOCRMonitor?: {
      onTextDetected: (callback: (text: string) => void) => void;
    };
    realAudioEnvironmentMonitor?: {
      onContextUpdate: (callback: (audioContext: any) => void) => void;
      onMicrophoneData: (callback: (audioData: any) => void) => void;
    };
    socialDecoder?: any;
    velvetAI?: any;
    
    // UI Integration
    addMessage: (message: string, sender: string) => void;
    updateVelvetOrbState: (state: string, tone?: string) => void;
    
    // Chat Integration
    getVelvetResponse?: (message: string, options?: any) => Promise<string>;
    getRecentChatMessage?: () => string;
    
    // Action Executors
    ActionDecider?: any;
    
    // Diagnostic Functions
    taskDiagnostics?: () => void;
    
    // Event Handlers
    onTaskCreated?: (data: any) => void;
    onTaskCompleted?: (data: any) => void;
    onStepCompleted?: (data: any) => void;
    
    // Voice Input System
    velvetVoiceInput?: {
      startListening: () => Promise<boolean>;
      stopListening: () => void;
      isListening: boolean;
    };
    
    // Voice Output System  
    velvetVoice?: {
      speak: (text: string) => Promise<void>;
    };
    
    // Legacy globals for compatibility
    isInterfaceOpen?: boolean;
    voiceOutputEnabled?: boolean;
    getVelvetResponse?: (message: string) => Promise<string>;
    initializeVoiceInput?: () => void;
  }
}

// Velvet UI Types for React Components
export interface VelvetOrbState {
  state: 'normal' | 'listening' | 'speaking' | 'thinking';
  isInterfaceOpen: boolean;
}

export interface VelvetChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'velvet';
  timestamp: Date;
}

export interface VelvetUIState {
  isInterfaceOpen: boolean;
  orbState: 'normal' | 'listening' | 'speaking' | 'thinking';
  messages: VelvetChatMessage[];
  isVoiceInputActive: boolean;
  voiceOutputEnabled: boolean;
}

export interface VelvetOrbProps {
  state: 'normal' | 'listening' | 'speaking' | 'thinking';
  onClick: () => void;
  className?: string;
}

export interface VelvetChatInterfaceProps {
  isOpen: boolean;
  messages: VelvetChatMessage[];
  onClose: () => void;
  onSendMessage: (message: string) => Promise<void>;
  onVoiceToggle: () => Promise<void>;
  isVoiceInputActive: boolean;
  voiceOutputEnabled: boolean;
  onVoiceOutputToggle: () => void;
  onControlPanelOpen: () => void;
}

export interface VelvetAppProps {
  className?: string;
}

export {};