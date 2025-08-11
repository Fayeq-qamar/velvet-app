import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Types for social decoder state
export interface SocialDecoderAnalysis {
  text: string;
  detectedEmotion?: string;
  confidence: number;
  timestamp: number;
  isSarcasm?: boolean;
  subtext?: string;
  voiceMarkers?: string[];
}

export interface MeetingContext {
  participants: string[];
  duration: number;
  platform: string | null;
  isRecording: boolean;
  socialTension: number;
  communicationStyle: string;
}

export interface SocialDecoderMetrics {
  sessionStart: number;
  totalDetections: number;
  sarcasmDetections: number;
  emotionDetections: number;
  interventionsTrigger: number;
  averageConfidence: number;
  processingTime: number;
}

export interface SocialDecoderUIState {
  interventionUIVisible: boolean;
  responseTemplatesVisible: boolean;
  confidenceIndicatorLevel: number;
  whisperNotificationsEnabled: boolean;
}

export interface SocialDecoderState {
  // Feature state
  isActive: boolean;
  isMeetingMode: boolean;
  isListening: boolean;
  currentMeeting: MeetingContext | null;
  
  // Real-time analysis state
  currentAnalysis: SocialDecoderAnalysis | null;
  analysisQueue: SocialDecoderAnalysis[];
  recentAnalyses: SocialDecoderAnalysis[];
  
  // Intervention state
  activeIntervention: any | null;
  interventionHistory: any[];
  
  // Performance metrics
  metrics: SocialDecoderMetrics;
  
  // UI state
  uiState: SocialDecoderUIState;
  
  // Actions
  toggleActive: () => void;
  toggleMeetingMode: () => void;
  toggleListening: () => void;
  addAnalysis: (analysis: SocialDecoderAnalysis) => void;
  clearAnalysisQueue: () => void;
  setCurrentMeeting: (meeting: MeetingContext | null) => void;
  triggerIntervention: (intervention: any) => void;
  clearIntervention: () => void;
  updateUIState: (updates: Partial<SocialDecoderUIState>) => void;
  resetMetrics: () => void;
}

export const useSocialDecoderStore = create<SocialDecoderState>()(
  subscribeWithSelector((set, get) => ({
    // Feature state
    isActive: false,
    isMeetingMode: false,
    isListening: false,
    currentMeeting: null,
    
    // Real-time analysis state
    currentAnalysis: null,
    analysisQueue: [],
    recentAnalyses: [],
    
    // Intervention state
    activeIntervention: null,
    interventionHistory: [],
    
    // Performance metrics
    metrics: {
      sessionStart: Date.now(),
      totalDetections: 0,
      sarcasmDetections: 0,
      emotionDetections: 0,
      interventionsTrigger: 0,
      averageConfidence: 0,
      processingTime: 0
    },
    
    // UI state
    uiState: {
      interventionUIVisible: false,
      responseTemplatesVisible: false,
      confidenceIndicatorLevel: 0,
      whisperNotificationsEnabled: true
    },
    
    // Actions
    toggleActive: () => set(state => ({ isActive: !state.isActive })),
    
    toggleMeetingMode: () => set(state => ({ isMeetingMode: !state.isMeetingMode })),
    
    toggleListening: () => set(state => ({ isListening: !state.isListening })),
    
    addAnalysis: (analysis: SocialDecoderAnalysis) => set(state => {
      // Update metrics
      const newMetrics = { ...state.metrics };
      newMetrics.totalDetections++;
      
      if (analysis.isSarcasm) {
        newMetrics.sarcasmDetections++;
      }
      
      if (analysis.detectedEmotion) {
        newMetrics.emotionDetections++;
      }
      
      // Calculate new average confidence
      const totalConfidence = (newMetrics.averageConfidence * (newMetrics.totalDetections - 1)) + analysis.confidence;
      newMetrics.averageConfidence = totalConfidence / newMetrics.totalDetections;
      
      // Keep only the last 10 analyses
      const newRecentAnalyses = [analysis, ...state.recentAnalyses].slice(0, 10);
      
      return {
        currentAnalysis: analysis,
        analysisQueue: [...state.analysisQueue, analysis],
        recentAnalyses: newRecentAnalyses,
        metrics: newMetrics
      };
    }),
    
    clearAnalysisQueue: () => set({ analysisQueue: [] }),
    
    setCurrentMeeting: (meeting: MeetingContext | null) => set({ currentMeeting: meeting }),
    
    triggerIntervention: (intervention: any) => set(state => ({
      activeIntervention: intervention,
      interventionHistory: [...state.interventionHistory, intervention],
      metrics: {
        ...state.metrics,
        interventionsTrigger: state.metrics.interventionsTrigger + 1
      },
      uiState: {
        ...state.uiState,
        interventionUIVisible: true
      }
    })),
    
    clearIntervention: () => set(state => ({
      activeIntervention: null,
      uiState: {
        ...state.uiState,
        interventionUIVisible: false
      }
    })),
    
    updateUIState: (updates: Partial<SocialDecoderUIState>) => set(state => ({
      uiState: {
        ...state.uiState,
        ...updates
      }
    })),
    
    resetMetrics: () => set({
      metrics: {
        sessionStart: Date.now(),
        totalDetections: 0,
        sarcasmDetections: 0,
        emotionDetections: 0,
        interventionsTrigger: 0,
        averageConfidence: 0,
        processingTime: 0
      }
    })
  }))
);