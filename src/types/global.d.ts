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
  }
}

export {};