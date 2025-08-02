import React from 'react';

interface ProgressProps {
  value: number; // 0-100
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  className = '',
  showLabel = false,
  label,
  size = 'md',
  variant = 'primary'
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const baseClass = 'velvet-progress';
  const sizeClass = `velvet-progress-${size}`;
  const variantClass = `velvet-progress-${variant}`;
  
  return (
    <div className={`${baseClass} ${sizeClass} ${className}`}>
      {(showLabel || label) && (
        <div className="velvet-progress-label">
          <span>{label || `${Math.round(percentage)}%`}</span>
          {!label && <span className="velvet-progress-value">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="velvet-progress-track">
        <div 
          className={`velvet-progress-fill ${variantClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Circular progress variant for energy levels
interface CircularProgressProps {
  value: number; // 0-100
  size?: number; // diameter in pixels
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  className = '',
  showLabel = true,
  label,
  variant = 'primary'
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const variantClass = `velvet-circular-progress-${variant}`;
  
  return (
    <div className={`velvet-circular-progress ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="velvet-circular-progress-svg">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="velvet-circular-progress-background"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`velvet-circular-progress-circle ${variantClass}`}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {showLabel && (
        <div className="velvet-circular-progress-label">
          <span className="velvet-circular-progress-value">
            {label || `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
    </div>
  );
};

// Add the CSS styles for Velvet's glassmorphism progress
const progressStyles = `
/* Linear Progress */
.velvet-progress {
  width: 100%;
  margin-bottom: 4px;
}

.velvet-progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}

.velvet-progress-value {
  font-size: 13px;
  opacity: 0.8;
  font-weight: 400;
}

.velvet-progress-track {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
}

.velvet-progress-fill {
  height: 100%;
  border-radius: 7px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.velvet-progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    transparent 100%);
  animation: velvet-progress-shine 2s infinite;
}

@keyframes velvet-progress-shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Size variants */
.velvet-progress-sm .velvet-progress-track {
  height: 6px;
}

.velvet-progress-md .velvet-progress-track {
  height: 8px;
}

.velvet-progress-lg .velvet-progress-track {
  height: 12px;
}

/* Color variants */
.velvet-progress-primary {
  background: linear-gradient(90deg, 
    rgba(37, 99, 235, 0.8) 0%,
    rgba(59, 130, 246, 0.9) 50%,
    rgba(37, 99, 235, 0.8) 100%);
  box-shadow: 0 0 12px rgba(37, 99, 235, 0.3);
}

.velvet-progress-success {
  background: linear-gradient(90deg, 
    rgba(16, 185, 129, 0.8) 0%,
    rgba(34, 197, 94, 0.9) 50%,
    rgba(16, 185, 129, 0.8) 100%);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
}

.velvet-progress-warning {
  background: linear-gradient(90deg, 
    rgba(245, 158, 11, 0.8) 0%,
    rgba(251, 191, 36, 0.9) 50%,
    rgba(245, 158, 11, 0.8) 100%);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
}

.velvet-progress-danger {
  background: linear-gradient(90deg, 
    rgba(239, 68, 68, 0.8) 0%,
    rgba(248, 113, 113, 0.9) 50%,
    rgba(239, 68, 68, 0.8) 100%);
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.3);
}

/* Circular Progress */
.velvet-circular-progress {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.velvet-circular-progress-svg {
  transform: rotate(-90deg);
}

.velvet-circular-progress-background {
  fill: none;
  stroke: rgba(0, 0, 0, 0.2);
  stroke-linecap: round;
}

.velvet-circular-progress-circle {
  fill: none;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.velvet-circular-progress-primary {
  stroke: url(#velvet-gradient-primary);
}

.velvet-circular-progress-success {
  stroke: url(#velvet-gradient-success);
}

.velvet-circular-progress-warning {
  stroke: url(#velvet-gradient-warning);
}

.velvet-circular-progress-danger {
  stroke: url(#velvet-gradient-danger);
}

.velvet-circular-progress-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.velvet-circular-progress-value {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
}

/* SVG Gradients for circular progress */
svg.velvet-circular-progress-svg {
  filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.3));
}

/* Energy level specific styles */
.energy-progress-low .velvet-circular-progress-circle {
  stroke: #ef4444;
  filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.4));
}

.energy-progress-medium .velvet-circular-progress-circle {
  stroke: #f59e0b;
  filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4));
}

.energy-progress-high .velvet-circular-progress-circle {
  stroke: #10b981;
  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.4));
}

/* Responsive design */
@media (max-width: 768px) {
  .velvet-progress-label {
    font-size: 13px;
  }
  
  .velvet-circular-progress-value {
    font-size: 16px;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = progressStyles;
  document.head.appendChild(styleSheet);
}