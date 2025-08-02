import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
  className?: string;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  className = '',
  title,
  dismissible = false,
  onDismiss
}) => {
  const baseClass = 'velvet-alert';
  const variantClass = `velvet-alert-${variant}`;
  
  return (
    <div className={`${baseClass} ${variantClass} ${className}`}>
      <div className="velvet-alert-content">
        {title && <div className="velvet-alert-title">{title}</div>}
        <div className="velvet-alert-message">{children}</div>
      </div>
      {dismissible && (
        <button 
          className="velvet-alert-dismiss" 
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

// Pattern Alert - specialized for Velvet pattern detection
interface PatternAlertProps {
  pattern: {
    type: 'hyperfocus' | 'distraction' | 'task_avoidance' | 'idle';
    confidence: number;
    duration: number;
    context: string;
    suggestion?: string;
  };
  onDismiss?: () => void;
  onAction?: () => void;
  className?: string;
}

export const PatternAlert: React.FC<PatternAlertProps> = ({
  pattern,
  onDismiss,
  onAction,
  className = ''
}) => {
  const patternConfig = {
    hyperfocus: {
      variant: 'info' as const,
      emoji: '🎯',
      title: 'Deep Focus Detected',
      suggestion: 'You\'ve been focused for a while! Consider taking a gentle break soon.'
    },
    distraction: {
      variant: 'warning' as const,
      emoji: '🤔',
      title: 'Distraction Pattern',
      suggestion: 'Lots of tab switching happening. Want to save these for later?'
    },
    task_avoidance: {
      variant: 'warning' as const,
      emoji: '😅',
      title: 'Task Avoidance Detected',
      suggestion: 'Big task feeling overwhelming? Let\'s break it into smaller chunks.'
    },
    idle: {
      variant: 'default' as const,
      emoji: '😴',
      title: 'Taking a Break',
      suggestion: 'Rest is important too! When you\'re ready, we\'re here.'
    }
  };

  const config = patternConfig[pattern.type];
  const suggestion = pattern.suggestion || config.suggestion;

  return (
    <Alert 
      variant={config.variant}
      title={`${config.emoji} ${config.title}`}
      dismissible={true}
      onDismiss={onDismiss}
      className={`velvet-pattern-alert ${className}`}
    >
      <div className="velvet-pattern-details">
        <p className="velvet-pattern-suggestion">{suggestion}</p>
        <div className="velvet-pattern-meta">
          <span className="velvet-pattern-duration">
            Duration: {Math.round(pattern.duration / 1000 / 60)}m
          </span>
          <span className="velvet-pattern-confidence">
            Confidence: {Math.round(pattern.confidence * 100)}%
          </span>
        </div>
        {pattern.context && (
          <p className="velvet-pattern-context">
            Context: {pattern.context}
          </p>
        )}
        {onAction && (
          <button 
            className="velvet-pattern-action"
            onClick={onAction}
          >
            Help me with this
          </button>
        )}
      </div>
    </Alert>
  );
};

// Gentle notification for supportive messages
interface GentleNotificationProps {
  message: string;
  type?: 'encouragement' | 'reminder' | 'celebration';
  hinglish?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const GentleNotification: React.FC<GentleNotificationProps> = ({
  message,
  type = 'encouragement',
  hinglish = false,
  onDismiss,
  className = ''
}) => {
  const typeConfig = {
    encouragement: { emoji: '💝', variant: 'success' as const },
    reminder: { emoji: '🔔', variant: 'info' as const },
    celebration: { emoji: '🎉', variant: 'success' as const }
  };

  const config = typeConfig[type];

  return (
    <Alert 
      variant={config.variant}
      dismissible={true}
      onDismiss={onDismiss}
      className={`velvet-gentle-notification ${hinglish ? 'velvet-hinglish' : ''} ${className}`}
    >
      <div className="velvet-gentle-content">
        <span className="velvet-gentle-emoji">{config.emoji}</span>
        <span className="velvet-gentle-message">{message}</span>
      </div>
    </Alert>
  );
};

// Add the CSS styles for Velvet's glassmorphism alerts
const alertStyles = `
.velvet-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  margin-bottom: 12px;
}

.velvet-alert::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(255, 255, 255, 0.05) 100%);
  pointer-events: none;
}

.velvet-alert-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.velvet-alert-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
  line-height: 1.4;
}

.velvet-alert-message {
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.95;
}

.velvet-alert-dismiss {
  background: none;
  border: none;
  color: inherit;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: 0.7;
  position: relative;
  z-index: 1;
}

.velvet-alert-dismiss:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.1);
}

/* Variant styles */
.velvet-alert-default {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(148, 163, 184, 0.3);
  color: rgba(255, 255, 255, 0.9);
}

.velvet-alert-info {
  background: rgba(37, 99, 235, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
  color: rgba(147, 197, 253, 0.95);
}

.velvet-alert-success {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(34, 197, 94, 0.4);
  color: rgba(134, 239, 172, 0.95);
}

.velvet-alert-warning {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(251, 191, 36, 0.4);
  color: rgba(253, 224, 71, 0.95);
}

.velvet-alert-danger {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(248, 113, 113, 0.4);
  color: rgba(252, 165, 165, 0.95);
}

/* Pattern alert specific styles */
.velvet-pattern-alert {
  animation: velvet-pattern-slide-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes velvet-pattern-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.velvet-pattern-details {
  margin-top: 8px;
}

.velvet-pattern-suggestion {
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.5;
}

.velvet-pattern-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 12px;
}

.velvet-pattern-duration,
.velvet-pattern-confidence {
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.velvet-pattern-context {
  font-size: 12px;
  opacity: 0.7;
  font-style: italic;
  margin: 8px 0 0 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
}

.velvet-pattern-action {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: inherit;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.velvet-pattern-action:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

/* Gentle notification styles */
.velvet-gentle-notification {
  background: rgba(16, 185, 129, 0.1) !important;
  border-color: rgba(34, 197, 94, 0.3) !important;
  border-radius: 16px;
  animation: velvet-gentle-float-in 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes velvet-gentle-float-in {
  from {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.velvet-gentle-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.velvet-gentle-emoji {
  font-size: 20px;
  line-height: 1;
}

.velvet-gentle-message {
  font-size: 15px;
  line-height: 1.4;
  font-weight: 500;
}

/* Hinglish support */
.velvet-hinglish .velvet-gentle-message {
  font-style: italic;
  opacity: 0.95;
}

/* Hover effects */
.velvet-alert:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive design */
@media (max-width: 768px) {
  .velvet-alert {
    padding: 14px 16px;
    margin-bottom: 10px;
  }
  
  .velvet-alert-title {
    font-size: 14px;
  }
  
  .velvet-alert-message {
    font-size: 13px;
  }
  
  .velvet-pattern-meta {
    flex-direction: column;
    gap: 8px;
  }
  
  .velvet-gentle-emoji {
    font-size: 18px;
  }
  
  .velvet-gentle-message {
    font-size: 14px;
  }
}

/* Auto-dismiss animation */
.velvet-alert-auto-dismiss {
  animation: velvet-alert-fade-out 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes velvet-alert-fade-out {
  from {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
  to {
    transform: scale(0.95) translateY(-10px);
    opacity: 0;
  }
}

/* Focus state for accessibility */
.velvet-alert-dismiss:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: 2px;
}

.velvet-pattern-action:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: 2px;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = alertStyles;
  document.head.appendChild(styleSheet);
}