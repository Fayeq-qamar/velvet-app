import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  pulse = false
}) => {
  const baseClass = 'velvet-badge';
  const variantClass = `velvet-badge-${variant}`;
  const sizeClass = `velvet-badge-${size}`;
  const pulseClass = pulse ? 'velvet-badge-pulse' : '';
  
  return (
    <span className={`${baseClass} ${variantClass} ${sizeClass} ${pulseClass} ${className}`}>
      {children}
    </span>
  );
};

// Mood Badge with emoji support
interface MoodBadgeProps {
  mood: 'calm' | 'anxious' | 'excited' | 'overwhelmed' | 'focused' | 'distracted';
  showEmoji?: boolean;
  className?: string;
}

export const MoodBadge: React.FC<MoodBadgeProps> = ({
  mood,
  showEmoji = true,
  className = ''
}) => {
  const moodConfig = {
    calm: { emoji: '😌', label: 'Calm', variant: 'success' as const },
    anxious: { emoji: '😰', label: 'Anxious', variant: 'warning' as const },
    excited: { emoji: '🤩', label: 'Excited', variant: 'primary' as const },
    overwhelmed: { emoji: '😵‍💫', label: 'Overwhelmed', variant: 'danger' as const },
    focused: { emoji: '🎯', label: 'Focused', variant: 'success' as const },
    distracted: { emoji: '🤔', label: 'Distracted', variant: 'secondary' as const }
  };
  
  const config = moodConfig[mood];
  
  return (
    <Badge variant={config.variant} className={`velvet-mood-badge ${className}`}>
      {showEmoji && <span className="velvet-badge-emoji">{config.emoji}</span>}
      <span>{config.label}</span>
    </Badge>
  );
};

// Status Badge for patterns and tasks
interface StatusBadgeProps {
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = ''
}) => {
  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const },
    in_progress: { label: 'In Progress', variant: 'primary' as const, pulse: true },
    completed: { label: 'Completed', variant: 'success' as const },
    blocked: { label: 'Blocked', variant: 'danger' as const },
    cancelled: { label: 'Cancelled', variant: 'secondary' as const }
  };
  
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant} 
      pulse={config.pulse}
      className={`velvet-status-badge ${className}`}
    >
      {config.label}
    </Badge>
  );
};

// Add the CSS styles for Velvet's glassmorphism badges
const badgeStyles = `
.velvet-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

/* Size variants */
.velvet-badge-sm {
  padding: 4px 8px;
  font-size: 11px;
  line-height: 1.2;
}

.velvet-badge-md {
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1.3;
}

.velvet-badge-lg {
  padding: 8px 16px;
  font-size: 14px;
  line-height: 1.4;
}

/* Color variants */
.velvet-badge-default {
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(148, 163, 184, 0.3);
  color: rgba(255, 255, 255, 0.9);
}

.velvet-badge-primary {
  background: rgba(37, 99, 235, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
  color: rgba(147, 197, 253, 0.95);
}

.velvet-badge-success {
  background: rgba(16, 185, 129, 0.2);
  border-color: rgba(34, 197, 94, 0.4);
  color: rgba(134, 239, 172, 0.95);
}

.velvet-badge-warning {
  background: rgba(245, 158, 11, 0.2);
  border-color: rgba(251, 191, 36, 0.4);
  color: rgba(253, 224, 71, 0.95);
}

.velvet-badge-danger {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(248, 113, 113, 0.4);
  color: rgba(252, 165, 165, 0.95);
}

.velvet-badge-secondary {
  background: rgba(71, 85, 105, 0.3);
  border-color: rgba(100, 116, 139, 0.4);
  color: rgba(203, 213, 225, 0.95);
}

/* Pulse animation for active states */
.velvet-badge-pulse {
  animation: velvet-badge-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes velvet-badge-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* Emoji spacing */
.velvet-badge-emoji {
  font-size: 1.1em;
  line-height: 1;
}

/* Mood badge specific styles */
.velvet-mood-badge {
  font-weight: 600;
  letter-spacing: 0.025em;
}

.velvet-mood-badge .velvet-badge-emoji {
  margin-right: 2px;
}

/* Status badge specific styles */
.velvet-status-badge {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 10px;
  font-weight: 600;
}

/* Hover effects */
.velvet-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Special Hindi/Hinglish support */
.velvet-badge-hinglish {
  font-style: italic;
  opacity: 0.9;
}

/* Energy level badges */
.velvet-badge-energy-low {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(248, 113, 113, 0.3);
  color: rgba(252, 165, 165, 0.9);
}

.velvet-badge-energy-medium {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(251, 191, 36, 0.3);
  color: rgba(253, 224, 71, 0.9);
}

.velvet-badge-energy-high {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(34, 197, 94, 0.3);
  color: rgba(134, 239, 172, 0.9);
}

/* Focus state badges */
.velvet-badge-focus-hyperfocus {
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(196, 181, 253, 0.4);
  color: rgba(221, 214, 254, 0.95);
  animation: velvet-badge-pulse 1.5s ease-in-out infinite;
}

.velvet-badge-focus-focused {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(74, 222, 128, 0.4);
  color: rgba(134, 239, 172, 0.95);
}

.velvet-badge-focus-distracted {
  background: rgba(251, 146, 60, 0.2);
  border-color: rgba(253, 186, 116, 0.4);
  color: rgba(254, 215, 170, 0.95);
}

.velvet-badge-focus-idle {
  background: rgba(107, 114, 128, 0.2);
  border-color: rgba(156, 163, 175, 0.4);
  color: rgba(209, 213, 219, 0.95);
}

/* Responsive design */
@media (max-width: 768px) {
  .velvet-badge-lg {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .velvet-badge-md {
    padding: 5px 10px;
    font-size: 11px;
  }
  
  .velvet-badge-sm {
    padding: 3px 6px;
    font-size: 10px;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = badgeStyles;
  document.head.appendChild(styleSheet);
}