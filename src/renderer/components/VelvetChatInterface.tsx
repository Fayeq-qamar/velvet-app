// 💬 Velvet Chat Interface Component - Tailwind Edition
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
      className={`
        fixed bottom-[100px] right-5 z-[999]
        w-[420px] max-h-[480px] min-h-[350px] max-w-[calc(100vw-40px)]
        rounded-[20px] p-7 relative
        ${isOpen ? 'block visible opacity-100 transform-none pointer-events-auto' : 'hidden invisible opacity-0 translate-x-5 scale-95 pointer-events-none'}
        transition-all duration-500 ease-out
        text-white backdrop-blur-[20px] border border-blue-500/30
      `}
      style={{
        background: isOpen ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 50%, rgba(51, 65, 85, 0.90) 100%)' : 'transparent',
        boxShadow: isOpen ? '0 20px 60px rgba(37, 99, 235, 0.3), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' : 'none'
      }}
      role="dialog"
      aria-label="Velvet AI Chat Interface"
    >
      {/* Chat Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-xl font-semibold text-white/90 border-2 border-white/10 backdrop-blur-sm bg-gradient-to-br from-blue-500/80 to-cyan-500/60" aria-hidden="true">
          V
        </div>
        <div className="flex-1">
          <h3 className="m-0 mb-1 text-xl font-semibold text-white/95" style={{textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'}}>Velvet</h3>
          <p className="m-0 text-sm text-white/60 font-normal">Your AI companion</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className={`
              w-9 h-9 border-0 rounded-lg cursor-pointer flex items-center justify-center
              transition-all duration-200 ease-out relative
              bg-white/10 text-white/70 hover:bg-white/15 hover:text-white/90 hover:scale-105
              ${voiceOutputEnabled ? 'bg-blue-500/30 text-blue-400' : ''}
            `}
            onClick={onVoiceOutputToggle}
            data-tooltip="Toggle voice responses"
            aria-label="Toggle voice output"
          >
            <svg className="w-4 h-4 stroke-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.59V9.51c0-.97.71-1.76 1.59-1.76h2.24Z" />
            </svg>
          </button>
          
          <button 
            className="
              w-9 h-9 border-0 rounded-lg cursor-pointer flex items-center justify-center
              transition-all duration-200 ease-out relative
              bg-white/10 text-white/70 hover:bg-white/15 hover:text-white/90 hover:scale-105
            "
            onClick={onControlPanelOpen}
            data-tooltip="Open Velvet Control Panel"
            aria-label="Open control panel"
          >
            <svg className="w-4 h-4 stroke-2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div 
        className="max-h-[280px] overflow-y-auto mb-5 pr-2 relative z-10" 
        ref={messagesRef}
      >
        {messages.length === 0 ? (
          <div className="text-center py-10 px-5 text-slate-400">
            <h4 className="m-0 mb-3 text-white text-lg font-semibold" style={{textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'}}>Hey there! 👋</h4>
            <p className="m-0 text-sm leading-relaxed opacity-90">I'm Velvet, your neurodivergent-friendly AI companion. Ready to chat!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className={`
                px-4 py-3 rounded-2xl max-w-[85%] relative break-words
                ${message.sender === 'user' 
                  ? 'ml-auto rounded-br-md' 
                  : 'border border-blue-200/20 rounded-bl-md'
                }
              `}
              style={{
                background: message.sender === 'user' 
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(29, 78, 216, 0.8))'
                  : 'linear-gradient(135deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.8))',
                boxShadow: message.sender === 'user'
                  ? '0 4px 16px rgba(37, 99, 235, 0.3)'
                  : '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}>
                <div className="text-sm leading-relaxed text-white/95 mb-1">
                  {message.text}
                </div>
                <div className={`text-xs text-white/50 ${message.sender === 'velvet' ? 'text-left' : 'text-right'}`}>
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="mb-4">
            <div className="px-4 py-3 rounded-2xl max-w-[85%] relative break-words border border-blue-200/20 rounded-bl-md"
              style={{
                background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.8))',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}>
              <div className="text-sm leading-relaxed text-white/95 mb-1">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse [animation-delay:150ms]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse [animation-delay:300ms]"></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat Input Area */}
      <div className="flex gap-3 items-center relative z-10">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-out outline-0 
                     text-white/95 placeholder-slate-400 backdrop-blur-sm border border-blue-500/20"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)'
          }}
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        
        <button 
          className={`
            w-11 h-11 border rounded-xl cursor-pointer flex items-center justify-center
            transition-all duration-200 ease-out relative backdrop-blur-sm border-blue-500/30
            text-white/80 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
            ${isVoiceInputActive ? 'text-[#ff453a] border-red-500/50' : 'hover:border-blue-400/40'}
          `}
          style={{
            background: isVoiceInputActive 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(249, 115, 22, 0.3) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
          }}
          onClick={handleVoiceToggle}
          data-tooltip={isVoiceInputActive ? 'Stop listening' : 'Press to speak'}
          aria-label="Voice input"
          disabled={isLoading}
        >
          <svg 
            className={`
              w-5 h-5 stroke-2 transition-transform duration-300 ease-out
              ${isVoiceInputActive ? 'animate-pulse' : ''}
            `}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

VelvetChatInterface.displayName = 'VelvetChatInterface';

export default VelvetChatInterface;