// 🚀 Velvet App Component
// "Gentle companion that understands your brain" - Root React application component

import React, { useState, useEffect, useCallback } from 'react';
import VelvetOrbComponent from './VelvetOrbComponent';
import VelvetChatInterface from './VelvetChatInterface';
import { VelvetAppProps, VelvetUIState, VelvetChatMessage } from '../../types/global';

const VelvetApp: React.FC<VelvetAppProps> = ({ className = '' }) => {
  // Main UI state
  const [uiState, setUIState] = useState<VelvetUIState>({
    isInterfaceOpen: false,
    orbState: 'normal',
    messages: [],
    isVoiceInputActive: false,
    voiceOutputEnabled: false
  });

  // Initialize app and connect to existing global systems
  useEffect(() => {
    console.log('🚀 Velvet React App initializing...');
    
    // Sync with existing global state if available
    if (typeof window !== 'undefined') {
      // Sync interface state
      if (window.isInterfaceOpen !== undefined) {
        setUIState(prev => ({ ...prev, isInterfaceOpen: window.isInterfaceOpen || false }));
      }
      
      // Sync voice output state
      if (window.voiceOutputEnabled !== undefined) {
        setUIState(prev => ({ ...prev, voiceOutputEnabled: window.voiceOutputEnabled || false }));
      }

      // Expose React state to global scope for compatibility
      window.updateVelvetOrbState = (state: string, tone?: string) => {
        if (['normal', 'listening', 'speaking', 'thinking'].includes(state)) {
          setUIState(prev => ({ ...prev, orbState: state as any }));
        }
      };

      // Expose message adding function
      window.addMessage = (message: string, sender: string) => {
        const newMessage: VelvetChatMessage = {
          id: Date.now().toString(),
          text: message,
          sender: sender === 'velvet' ? 'velvet' : 'user',
          timestamp: new Date()
        };
        
        setUIState(prev => ({
          ...prev,
          messages: [...prev.messages, newMessage]
        }));
      };
    }

    console.log('✅ Velvet React App initialized');

    return () => {
      // Cleanup global references
      if (typeof window !== 'undefined') {
        delete (window as any).updateVelvetOrbState;
        delete (window as any).addMessage;
      }
    };
  }, []);

  // Handle orb click to toggle interface
  const handleOrbClick = useCallback(() => {
    console.log('🔮 Orb clicked!');
    
    setUIState(prev => {
      const newIsOpen = !prev.isInterfaceOpen;
      
      // Sync with global state
      if (typeof window !== 'undefined') {
        window.isInterfaceOpen = newIsOpen;
        
        // Update body class for pointer events
        if (newIsOpen) {
          document.body.classList.add('interface-open');
        } else {
          document.body.classList.remove('interface-open');
        }
      }
      
      return {
        ...prev,
        isInterfaceOpen: newIsOpen
      };
    });
  }, []);

  // Handle chat interface close
  const handleInterfaceClose = useCallback(() => {
    setUIState(prev => ({ ...prev, isInterfaceOpen: false }));
    
    // Sync with global state
    if (typeof window !== 'undefined') {
      window.isInterfaceOpen = false;
      document.body.classList.remove('interface-open');
    }
  }, []);

  // Handle message sending
  const handleSendMessage = useCallback(async (messageText: string) => {
    // Add user message immediately
    const userMessage: VelvetChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setUIState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      orbState: 'thinking'
    }));

    try {
      // Get AI response using existing system
      let response = "I'm here to help! 💫";
      
      if (typeof window !== 'undefined' && window.getVelvetResponse) {
        response = await window.getVelvetResponse(messageText);
      }
      
      // Add Velvet response
      const velvetMessage: VelvetChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'velvet',
        timestamp: new Date()
      };
      
      setUIState(prev => ({
        ...prev,
        messages: [...prev.messages, velvetMessage],
        orbState: uiState.voiceOutputEnabled ? 'speaking' : 'normal'
      }));

      // Handle voice output if enabled
      if (uiState.voiceOutputEnabled && typeof window !== 'undefined' && window.velvetVoice) {
        try {
          setUIState(prev => ({ ...prev, orbState: 'speaking' }));
          await window.velvetVoice.speak(response);
          setUIState(prev => ({ ...prev, orbState: 'normal' }));
        } catch (error) {
          console.error('Voice output error:', error);
          setUIState(prev => ({ ...prev, orbState: 'normal' }));
        }
      } else {
        setUIState(prev => ({ ...prev, orbState: 'normal' }));
      }

    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      const errorMessage: VelvetChatMessage = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, I'm having trouble connecting right now. 🔮",
        sender: 'velvet',
        timestamp: new Date()
      };
      
      setUIState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        orbState: 'normal'
      }));
    }
  }, [uiState.voiceOutputEnabled]);

  // Handle voice input toggle
  const handleVoiceToggle = useCallback(async () => {
    if (typeof window === 'undefined' || !window.velvetVoiceInput) {
      console.error('Voice input system not available');
      return;
    }

    try {
      if (uiState.isVoiceInputActive) {
        // Stop listening
        window.velvetVoiceInput.stopListening();
        setUIState(prev => ({
          ...prev,
          isVoiceInputActive: false,
          orbState: 'normal'
        }));
        console.log('Stopped listening');
      } else {
        // Start listening
        const success = await window.velvetVoiceInput.startListening();
        if (success) {
          setUIState(prev => ({
            ...prev,
            isVoiceInputActive: true,
            orbState: 'listening'
          }));
          console.log('Started listening');
        } else {
          console.error('Failed to start voice input');
          // Add error message
          const errorMessage: VelvetChatMessage = {
            id: Date.now().toString(),
            text: "Could not access microphone. Please check permissions.",
            sender: 'velvet',
            timestamp: new Date()
          };
          setUIState(prev => ({
            ...prev,
            messages: [...prev.messages, errorMessage]
          }));
        }
      }
    } catch (error) {
      console.error('Voice toggle error:', error);
      setUIState(prev => ({
        ...prev,
        isVoiceInputActive: false,
        orbState: 'normal'
      }));
    }
  }, [uiState.isVoiceInputActive]);

  // Handle voice output toggle
  const handleVoiceOutputToggle = useCallback(() => {
    setUIState(prev => {
      const newEnabled = !prev.voiceOutputEnabled;
      
      // Sync with global state
      if (typeof window !== 'undefined') {
        window.voiceOutputEnabled = newEnabled;
      }
      
      return { ...prev, voiceOutputEnabled: newEnabled };
    });
  }, []);

  // Handle control panel open
  const handleControlPanelOpen = useCallback(() => {
    console.log('🎛️ Opening Velvet Control Panel...');
    // This would open the control panel - integrate with existing system
    if (typeof window !== 'undefined' && (window as any).showControlPanel) {
      (window as any).showControlPanel();
    }
  }, []);

  // Set up voice input event handling
  useEffect(() => {
    if (typeof window === 'undefined' || !window.velvetVoiceInput) return;

    // Listen for voice input results
    const originalOnTranscript = (window.velvetVoiceInput as any).onTranscript;
    
    (window.velvetVoiceInput as any).onTranscript = async (transcript: string) => {
      console.log('🎤 Voice transcript received:', transcript);
      
      // Stop listening state
      setUIState(prev => ({
        ...prev,
        isVoiceInputActive: false,
        orbState: 'normal'
      }));

      // Send the transcript as a message
      await handleSendMessage(transcript);
    };

    return () => {
      // Restore original handler
      if ((window.velvetVoiceInput as any).onTranscript) {
        (window.velvetVoiceInput as any).onTranscript = originalOnTranscript;
      }
    };
  }, [handleSendMessage]);

  // Initialize voice input system if not already done
  useEffect(() => {
    if (typeof window !== 'undefined' && window.initializeVoiceInput && !window.velvetVoiceInput) {
      console.log('🎤 Initializing voice input system...');
      window.initializeVoiceInput();
    }
  }, []);

  return (
    <div className={`velvet-app ${className}`}>
      {/* Main glassmorphism orb */}
      <VelvetOrbComponent
        state={uiState.orbState}
        onClick={handleOrbClick}
      />
      
      {/* Expandable chat interface */}
      <VelvetChatInterface
        isOpen={uiState.isInterfaceOpen}
        messages={uiState.messages}
        onClose={handleInterfaceClose}
        onSendMessage={handleSendMessage}
        onVoiceToggle={handleVoiceToggle}
        isVoiceInputActive={uiState.isVoiceInputActive}
        voiceOutputEnabled={uiState.voiceOutputEnabled}
        onVoiceOutputToggle={handleVoiceOutputToggle}
        onControlPanelOpen={handleControlPanelOpen}
      />
    </div>
  );
};

VelvetApp.displayName = 'VelvetApp';

export default VelvetApp;