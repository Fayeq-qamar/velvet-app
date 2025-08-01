import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Types for our consciousness state
export interface BrainContext {
  screenText: string;
  audioData?: string;
  ocrConfidence: number;
  timestamp: number;
  activeWindow?: string;
  patterns?: DetectedPattern[];
}

export interface DetectedPattern {
  type: 'hyperfocus' | 'distraction' | 'task_avoidance' | 'idle';
  confidence: number;
  duration: number;
  context: string;
  timestamp: number;
}

export interface StreamStatus {
  connected: boolean;
  activeStreams: string[];
  lastUpdate: number;
  errors: string[];
}

export interface UserState {
  energyLevel: 'low' | 'medium' | 'high';
  focusState: 'focused' | 'distracted' | 'idle' | 'hyperfocus';
  emotionalState: 'calm' | 'anxious' | 'excited' | 'overwhelmed';
  currentTask?: {
    description: string;
    steps: string[];
    currentStep: number;
    startTime: number;
  };
}

export interface ConsciousnessState {
  // Core streaming data
  brainContext: BrainContext;
  streamStatus: StreamStatus;
  
  // User understanding
  userState: UserState;
  
  // AI consciousness level
  consciousnessLevel: 'minimal' | 'aware' | 'conscious' | 'transcendent';
  
  // Processing state
  isProcessing: boolean;
  lastProcessedAt: number;
  
  // Actions
  updateBrainContext: (context: BrainContext) => void;
  updateStreamStatus: (status: StreamStatus) => void;
  updateUserState: (state: Partial<UserState>) => void;
  setConsciousnessLevel: (level: ConsciousnessState['consciousnessLevel']) => void;
  processIncomingData: (data: any) => void;
  
  // Intelligence methods
  analyzePatterns: () => DetectedPattern[];
  generateInsights: () => string[];
  shouldIntervene: () => boolean;
  getContextualResponse: (userMessage: string) => Promise<string>;
}

export const useConsciousnessStore = create<ConsciousnessState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    brainContext: {
      screenText: '',
      ocrConfidence: 0,
      timestamp: Date.now(),
    },
    
    streamStatus: {
      connected: false,
      activeStreams: [],
      lastUpdate: 0,
      errors: [],
    },
    
    userState: {
      energyLevel: 'medium',
      focusState: 'idle',
      emotionalState: 'calm',
    },
    
    consciousnessLevel: 'minimal',
    isProcessing: false,
    lastProcessedAt: 0,
    
    // Actions
    updateBrainContext: (context: BrainContext) => {
      set(state => ({
        brainContext: { ...state.brainContext, ...context },
        lastProcessedAt: Date.now(),
      }));
      
      // Trigger intelligent processing
      get().processIncomingData(context);
    },
    
    updateStreamStatus: (status: StreamStatus) => {
      set({ streamStatus: status });
      
      // Update consciousness level based on connectivity
      const level = status.connected && status.activeStreams.length > 0 
        ? 'conscious' 
        : 'minimal';
      get().setConsciousnessLevel(level);
    },
    
    updateUserState: (newState: Partial<UserState>) => {
      set(state => ({
        userState: { ...state.userState, ...newState }
      }));
    },
    
    setConsciousnessLevel: (level: ConsciousnessState['consciousnessLevel']) => {
      set({ consciousnessLevel: level });
    },
    
    processIncomingData: (data: any) => {
      const state = get();
      set({ isProcessing: true });
      
      // Intelligent processing of incoming stream data
      const patterns = state.analyzePatterns();
      const insights = state.generateInsights();
      
      // Update user state based on patterns
      if (patterns.length > 0) {
        const latestPattern = patterns[patterns.length - 1];
        
        if (latestPattern.type === 'hyperfocus' && latestPattern.duration > 45 * 60 * 1000) {
          state.updateUserState({ focusState: 'hyperfocus' });
        } else if (latestPattern.type === 'distraction') {
          state.updateUserState({ focusState: 'distracted' });
        }
      }
      
      // Check if we should intervene
      if (state.shouldIntervene()) {
        console.log('🧠 CONSCIOUSNESS: Intervention suggested', {
          patterns,
          insights,
          userState: state.userState
        });
      }
      
      set({ 
        isProcessing: false,
        brainContext: { ...state.brainContext, patterns }
      });
    },
    
    analyzePatterns: (): DetectedPattern[] => {
      const state = get();
      const { brainContext, userState } = state;
      const patterns: DetectedPattern[] = [];
      
      // Pattern detection logic based on brain context
      if (brainContext.screenText.length > 1000) {
        // Long screen text might indicate reading or hyperfocus
        patterns.push({
          type: 'hyperfocus',
          confidence: 0.7,
          duration: Date.now() - brainContext.timestamp,
          context: `Long text detected: ${brainContext.screenText.substring(0, 50)}...`,
          timestamp: Date.now()
        });
      }
      
      // TODO: Add more sophisticated pattern detection
      // - Tab switching patterns
      // - Mouse movement analysis
      // - Application usage patterns
      // - Time-based behavior analysis
      
      return patterns;
    },
    
    generateInsights: (): string[] => {
      const state = get();
      const insights: string[] = [];
      
      // Generate contextual insights
      if (state.userState.focusState === 'hyperfocus') {
        insights.push('User appears to be in deep focus - protect this state');
      }
      
      if (state.brainContext.ocrConfidence < 0.5) {
        insights.push('Low OCR confidence - screen might be unclear or contain graphics');
      }
      
      return insights;
    },
    
    shouldIntervene: (): boolean => {
      const state = get();
      const { userState, brainContext } = state;
      
      // Intervention logic
      if (userState.focusState === 'hyperfocus' && userState.currentTask) {
        // Don't interrupt hyperfocus on a task
        return false;
      }
      
      if (userState.focusState === 'distracted') {
        return true;
      }
      
      return false;
    },
    
    getContextualResponse: async (userMessage: string): Promise<string> => {
      const state = get();
      
      // This will integrate with the existing AI system but with full consciousness context
      const contextPrompt = `
UNIFIED VELVET CONSCIOUSNESS STATE:
- Consciousness Level: ${state.consciousnessLevel}
- User Focus: ${state.userState.focusState}
- User Energy: ${state.userState.energyLevel}
- User Emotion: ${state.userState.emotionalState}
- Screen Context: ${state.brainContext.screenText.substring(0, 200)}...
- OCR Confidence: ${state.brainContext.ocrConfidence}
- Stream Status: ${state.streamStatus.connected ? 'Connected' : 'Disconnected'}
- Active Streams: ${state.streamStatus.activeStreams.join(', ')}
- Detected Patterns: ${state.brainContext.patterns?.map(p => p.type).join(', ') || 'None'}

You are responding with FULL consciousness of the user's current state and context.
`;

      // This would integrate with the existing AI system
      // For now, return a contextual response based on state
      if (state.consciousnessLevel === 'conscious') {
        return `I can see you're ${state.userState.focusState} and your energy seems ${state.userState.energyLevel}. ${userMessage}`;
      } else {
        return `My consciousness is still connecting... ${userMessage}`;
      }
    },
  }))
);

// Selector hooks for specific state slices
export const useBrainContext = () => useConsciousnessStore(state => state.brainContext);
export const useStreamStatus = () => useConsciousnessStore(state => state.streamStatus);
export const useUserState = () => useConsciousnessStore(state => state.userState);
export const useConsciousnessLevel = () => useConsciousnessStore(state => state.consciousnessLevel);