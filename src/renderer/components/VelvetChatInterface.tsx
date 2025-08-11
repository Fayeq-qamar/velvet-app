// 💬 Velvet Chat Interface Component
// "Gentle companion that understands your brain" - Expandable chat interface

import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { VelvetChatInterfaceProps, VelvetChatMessage } from '../../types/global';

const VelvetChatInterface: React.FC<VelvetChatInterfaceProps> = ({
  isOpen,
  messages,
  onClose,
  onSendMessage,
  onVoiceToggle,
  isVoiceInputActive,
  voiceOutputEnabled,
  onVoiceOutputToggle,
  onControlPanelOpen
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Add CSS styles to document if not already present
  useEffect(() => {
    const styleId = 'velvet-chat-styles';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = chatInterfaceStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when interface opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 400); // Wait for animation to complete
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isOpen && 
          !target.closest('.velvet-interface') && 
          !target.closest('.velvet-orb')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle message submission
  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    const messageText = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      await onSendMessage(messageText);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, onSendMessage]);

  // Handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle voice input toggle
  const handleVoiceToggle = useCallback(async () => {
    try {
      await onVoiceToggle();
    } catch (error) {
      console.error('Voice toggle failed:', error);
    }
  }, [onVoiceToggle]);

  // Format timestamp for display
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className={`velvet-interface ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-label="Velvet AI Chat Interface"
    >
      {/* Chat Header */}
      <div className="velvet-header">
        <div className="velvet-avatar" aria-hidden="true"></div>
        <div className="velvet-title">
          <h3>Velvet</h3>
          <p>Your AI companion</p>
        </div>
        <div className="header-controls">
          <button 
            className={`voice-output-toggle tooltip ${voiceOutputEnabled ? 'active' : ''}`}
            onClick={onVoiceOutputToggle}
            data-tooltip="Toggle voice responses"
            aria-label="Toggle voice output"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.59V9.51c0-.97.71-1.76 1.59-1.76h2.24Z" />
            </svg>
          </button>
          
          <button 
            className="control-panel-button tooltip"
            onClick={onControlPanelOpen}
            data-tooltip="Open Velvet Control Panel"
            aria-label="Open control panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="chat-messages" ref={messagesRef}>
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h4>Hey there! 👋</h4>
            <p>I'm Velvet, your neurodivergent-friendly AI companion. Ready to chat!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="message">
              <div className={`message-content ${message.sender}`}>
                <div className="message-text">
                  {message.text}
                </div>
                <div className="message-timestamp">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message">
            <div className="message-content velvet">
              <div className="message-text">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat Input Area */}
      <div className="chat-input-area">
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        
        <button 
          className={`voice-button tooltip ${isVoiceInputActive ? 'listening' : ''}`}
          onClick={handleVoiceToggle}
          data-tooltip={isVoiceInputActive ? 'Stop listening' : 'Press to speak'}
          aria-label="Voice input"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// CSS Styles matching the original vanilla implementation
const chatInterfaceStyles = `
/* Velvet Chat Interface Styles */
.velvet-interface {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 420px;
  max-height: 480px;
  min-height: 350px;
  border-radius: 20px;
  padding: 28px;
  z-index: -1; /* Move behind everything when closed */
  max-width: calc(100vw - 40px);
  
  /* Initially hidden with no effects */
  display: none; /* Don't take up layout space when closed */
  visibility: hidden;
  opacity: 0;
  transform: translateX(20px) scale(0.95);
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;
  -webkit-app-region: drag;
}

.velvet-interface.open {
  /* WHEN OPEN: Show with all effects */
  display: block; /* Show in layout when open */
  z-index: 999; /* Bring to front when open */
  visibility: visible;
  opacity: 1;
  transform: translateX(0) scale(1);
  pointer-events: auto;
  
  /* Add all the beautiful glass effects only when open */
  background: 
    linear-gradient(135deg, 
      rgba(15, 23, 42, 0.98) 0%, 
      rgba(30, 41, 59, 0.96) 50%,
      rgba(51, 65, 85, 0.90) 100%
    );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  
  box-shadow: 
    0 20px 60px rgba(37, 99, 235, 0.3),
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Glass shine effects - only show when interface is open */
.velvet-interface::before,
.velvet-interface::after {
  content: '';
  position: absolute;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.velvet-interface::before {
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: 
    radial-gradient(circle at center, 
      rgba(59, 130, 246, 0.1) 0%, 
      transparent 70%
    );
  border-radius: 0 20px 0 100%;
}

.velvet-interface::after {
  bottom: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background: 
    radial-gradient(circle at center, 
      rgba(6, 182, 212, 0.08) 0%, 
      transparent 70%
    );
  border-radius: 100% 0 20px 0;
}

/* Show shine effects only when interface is open */
.velvet-interface.open::before,
.velvet-interface.open::after {
  opacity: 1;
  visibility: visible;
}

/* Header */
.velvet-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.velvet-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: 
    linear-gradient(135deg, 
      rgba(37, 99, 235, 0.8) 0%, 
      rgba(6, 182, 212, 0.6) 100%
    );
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  overflow: hidden;
}

.velvet-avatar::before {
  content: 'V';
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
  font-weight: 600;
  filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.5));
}

.velvet-title {
  flex: 1;
}

.velvet-title h3 {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.velvet-title p {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.voice-output-toggle,
.control-panel-button {
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-app-region: no-drag;
}

.voice-output-toggle:hover,
.control-panel-button:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.voice-output-toggle.active {
  background: rgba(37, 99, 235, 0.3);
  color: rgba(59, 130, 246, 1);
}

.voice-output-toggle svg,
.control-panel-button svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

/* Chat Messages */
.chat-messages {
  max-height: 280px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 8px;
  position: relative;
  z-index: 1;
  -webkit-app-region: no-drag;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border-radius: 2px;
}

.message {
  margin-bottom: 16px;
  animation: messageSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.message-content {
  padding: 14px 18px;
  border-radius: 16px;
  max-width: 85%;
  position: relative;
  word-wrap: break-word;
}

.message-content.user {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.8));
  margin-left: auto;
  border-bottom-right-radius: 6px;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
}

.message-content.velvet {
  background: linear-gradient(135deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.8));
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-bottom-left-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.message-text {
  font-size: 14.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 4px;
}

.message-timestamp {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-align: right;
}

.message-content.velvet .message-timestamp {
  text-align: left;
}

/* Welcome Message */
.welcome-message {
  text-align: center;
  padding: 40px 20px;
  color: rgba(148, 163, 184, 1);
}

.welcome-message h4 {
  margin: 0 0 12px 0;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.welcome-message p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  animation: typingBounce 1.4s infinite;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0ms;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 150ms;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 300ms;
}

/* Chat Input Area */
.chat-input-area {
  display: flex;
  gap: 12px;
  align-items: center;
  position: relative;
  z-index: 1;
  -webkit-app-region: no-drag;
}

.chat-input {
  flex: 1;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.08) 0%, 
      rgba(255, 255, 255, 0.04) 100%
    );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-input::placeholder {
  color: rgba(148, 163, 184, 1);
}

.chat-input:focus {
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.12) 0%, 
      rgba(255, 255, 255, 0.06) 100%
    );
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 
    0 0 0 3px rgba(37, 99, 235, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.voice-button {
  width: 44px;
  height: 44px;
  border: none;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 100%
    );
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.voice-button:hover {
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.15) 0%, 
      rgba(255, 255, 255, 0.08) 100%
    );
  border-color: rgba(59, 130, 246, 0.4);
  transform: scale(1.05);
}

.voice-button.listening {
  background: 
    linear-gradient(135deg, 
      rgba(239, 68, 68, 0.4) 0%, 
      rgba(249, 115, 22, 0.3) 100%
    );
  border-color: rgba(239, 68, 68, 0.5);
  color: #ff453a;
}

.voice-button.listening svg {
  animation: micPulse 1.2s infinite;
}

.voice-button svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

/* Animations */
@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typingBounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

@keyframes micPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Tooltip support */
.tooltip {
  position: relative;
}

.tooltip:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  z-index: 10000;
  opacity: 0;
  animation: tooltipFadeIn 0.2s ease-out forwards;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-8px);
  }
}
`;

VelvetChatInterface.displayName = 'VelvetChatInterface';

export default VelvetChatInterface;