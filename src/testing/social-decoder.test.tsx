import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialDecoderComponent from '../renderer/components/SocialDecoderComponent';
import { useSocialDecoderStore } from '../renderer/stores/social-decoder-store';

// Mock the SocialDecoder class
jest.mock('../renderer/social-decoder', () => {
  return jest.fn().mockImplementation(() => {
    return {
      initialize: jest.fn().mockResolvedValue(true),
      processAudioContext: jest.fn(),
      processMicrophoneData: jest.fn(),
    };
  });
});

// Mock the store
jest.mock('../renderer/stores/social-decoder-store', () => {
  const actualStore = jest.requireActual('../renderer/stores/social-decoder-store');
  
  // Create a mock implementation of the store
  const mockStore = {
    isActive: false,
    isListening: false,
    currentAnalysis: null,
    recentAnalyses: [],
    metrics: {
      sessionStart: Date.now(),
      totalDetections: 0,
      sarcasmDetections: 0,
      emotionDetections: 0,
      interventionsTrigger: 0,
      averageConfidence: 0,
      processingTime: 0
    },
    uiState: {
      interventionUIVisible: false,
      responseTemplatesVisible: false,
      confidenceIndicatorLevel: 0,
      whisperNotificationsEnabled: true
    },
    toggleActive: jest.fn(() => {
      mockStore.isActive = !mockStore.isActive;
    }),
    toggleListening: jest.fn(() => {
      mockStore.isListening = !mockStore.isListening;
    }),
    updateUIState: jest.fn((updates) => {
      mockStore.uiState = { ...mockStore.uiState, ...updates };
    })
  };
  
  return {
    ...actualStore,
    useSocialDecoderStore: jest.fn(() => mockStore)
  };
});

// Mock window.velvetAI
const mockVelvetAI = {
  consciousness: {
    registerInputSource: jest.fn().mockResolvedValue(true),
    addContext: jest.fn(),
    updateSourceStatus: jest.fn()
  },
  notifications: {
    registerSource: jest.fn(),
    show: jest.fn(),
    unregisterSource: jest.fn()
  }
};

describe('SocialDecoderComponent', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup window.velvetAI mock
    Object.defineProperty(window, 'velvetAI', {
      value: mockVelvetAI,
      writable: true
    });
    
    // Reset store state
    const store = useSocialDecoderStore();
    store.isActive = false;
    store.isListening = false;
    store.currentAnalysis = null;
  });
  
  test('renders without crashing', () => {
    render(<SocialDecoderComponent />);
    expect(screen.getByText(/Activate Social Decoder/i)).toBeInTheDocument();
  });
  
  test('initializes with autoActivate prop', async () => {
    const store = useSocialDecoderStore();
    
    await act(async () => {
      render(<SocialDecoderComponent autoActivate={true} />);
    });
    
    // Check that toggleActive and toggleListening were called
    expect(store.toggleActive).toHaveBeenCalled();
    expect(store.toggleListening).toHaveBeenCalled();
  });
  
  test('toggles active state when button is clicked', () => {
    const store = useSocialDecoderStore();
    render(<SocialDecoderComponent />);
    
    // Click the activate button
    fireEvent.click(screen.getByText(/Activate Social Decoder/i));
    
    // Check that toggleActive was called
    expect(store.toggleActive).toHaveBeenCalled();
  });
  
  test('shows listening controls when active', () => {
    const store = useSocialDecoderStore();
    store.isActive = true;
    
    render(<SocialDecoderComponent />);
    
    // Check that listening button is visible
    expect(screen.getByText(/Start Listening/i)).toBeInTheDocument();
  });
  
  test('toggles listening state when button is clicked', () => {
    const store = useSocialDecoderStore();
    store.isActive = true;
    
    render(<SocialDecoderComponent />);
    
    // Click the listening button
    fireEvent.click(screen.getByText(/Start Listening/i));
    
    // Check that toggleListening was called
    expect(store.toggleListening).toHaveBeenCalled();
  });
  
  test('toggles whisper notifications when button is clicked', () => {
    const store = useSocialDecoderStore();
    store.isActive = true;
    
    render(<SocialDecoderComponent />);
    
    // Click the whisper button
    fireEvent.click(screen.getByText(/Disable Whispers/i));
    
    // Check that updateUIState was called with the correct parameter
    expect(store.updateUIState).toHaveBeenCalledWith({
      whisperNotificationsEnabled: false
    });
  });
  
  test('displays current analysis when available', () => {
    const store = useSocialDecoderStore();
    store.isActive = true;
    store.currentAnalysis = {
      text: 'This is a test analysis',
      detectedEmotion: 'Frustration',
      confidence: 0.85,
      timestamp: Date.now(),
      isSarcasm: true,
      subtext: 'They are actually upset'
    };
    
    render(<SocialDecoderComponent />);
    
    // Check that the analysis text is displayed
    expect(screen.getByText(/This is a test analysis/i)).toBeInTheDocument();
    
    // Check that the emotion is displayed
    expect(screen.getByText(/Frustration/i)).toBeInTheDocument();
    
    // Check that the confidence is displayed (85%)
    expect(screen.getByText(/85%/i)).toBeInTheDocument();
    
    // Check that sarcasm is detected
    expect(screen.getByText(/Sarcasm Detected/i)).toBeInTheDocument();
    
    // Check that subtext is displayed
    expect(screen.getByText(/Likely meaning: "They are actually upset"/i)).toBeInTheDocument();
  });
  
  test('calls onDetection prop when analysis is available', () => {
    const store = useSocialDecoderStore();
    const onDetection = jest.fn();
    store.isActive = true;
    
    render(<SocialDecoderComponent onDetection={onDetection} />);
    
    // Simulate a new analysis
    const analysis = {
      text: 'New analysis',
      confidence: 0.9,
      timestamp: Date.now()
    };
    
    act(() => {
      store.currentAnalysis = analysis;
      // Manually trigger the useEffect
      const { rerender } = render(<SocialDecoderComponent onDetection={onDetection} />);
      rerender(<SocialDecoderComponent onDetection={onDetection} />);
    });
    
    // Check that onDetection was called with the analysis
    expect(onDetection).toHaveBeenCalledWith(analysis);
  });
  
  test('hides controls when showControls is false', () => {
    render(<SocialDecoderComponent showControls={false} />);
    
    // Check that the controls are not visible
    expect(screen.queryByText(/Activate Social Decoder/i)).not.toBeInTheDocument();
  });
  
  test('hides analysis when showAnalysis is false', () => {
    const store = useSocialDecoderStore();
    store.isActive = true;
    store.currentAnalysis = {
      text: 'This is a test analysis',
      confidence: 0.9,
      timestamp: Date.now()
    };
    
    render(<SocialDecoderComponent showAnalysis={false} />);
    
    // Check that the analysis is not visible
    expect(screen.queryByText(/This is a test analysis/i)).not.toBeInTheDocument();
  });
});