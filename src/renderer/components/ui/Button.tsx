import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClass = 'velvet-button';
  const variantClass = `velvet-button-${variant}`;
  const sizeClass = `velvet-button-${size}`;
  const disabledClass = disabled ? 'velvet-button-disabled' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

// Add the CSS styles for Velvet's glassmorphism buttons
const buttonStyles = `
.velvet-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  outline: none;
  user-select: none;
  white-space: nowrap;
}

.velvet-button:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: 2px;
}

/* Primary variant - main action buttons */
.velvet-button-primary {
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.9) 0%,
    rgba(59, 130, 246, 0.8) 50%,
    rgba(37, 99, 235, 0.9) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 4px 16px rgba(37, 99, 235, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.velvet-button-primary:hover:not(.velvet-button-disabled) {
  transform: translateY(-1px);
  box-shadow: 
    0 6px 20px rgba(37, 99, 235, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border-color: rgba(59, 130, 246, 0.4);
}

.velvet-button-primary:active:not(.velvet-button-disabled) {
  transform: translateY(0);
  box-shadow: 
    0 2px 8px rgba(37, 99, 235, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* Secondary variant - less prominent actions */
.velvet-button-secondary {
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.8) 0%,
    rgba(30, 41, 59, 0.7) 50%,
    rgba(15, 23, 42, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.velvet-button-secondary:hover:not(.velvet-button-disabled) {
  transform: translateY(-1px);
  border-color: rgba(148, 163, 184, 0.3);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* Ghost variant - minimal styling */
.velvet-button-ghost {
  background: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: none;
}

.velvet-button-ghost:hover:not(.velvet-button-disabled) {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
  color: rgba(255, 255, 255, 0.95);
}

/* Outline variant - bordered but transparent */
.velvet-button-outline {
  background: transparent;
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: rgba(59, 130, 246, 0.9);
  backdrop-filter: blur(5px);
}

.velvet-button-outline:hover:not(.velvet-button-disabled) {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.6);
  color: rgba(255, 255, 255, 0.95);
}

/* Size variants */
.velvet-button-sm {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 36px;
}

.velvet-button-md {
  padding: 12px 20px;
  font-size: 15px;
  min-height: 44px;
}

.velvet-button-lg {
  padding: 16px 28px;
  font-size: 16px;
  min-height: 52px;
}

/* Disabled state */
.velvet-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.velvet-button-disabled:hover {
  transform: none !important;
}

/* Icon support */
.velvet-button .velvet-button-icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}

.velvet-button-sm .velvet-button-icon {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

.velvet-button-lg .velvet-button-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

/* Loading state */
.velvet-button-loading {
  pointer-events: none;
}

.velvet-button-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: velvet-button-spin 1s linear infinite;
}

@keyframes velvet-button-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .velvet-button-lg {
    padding: 14px 24px;
    font-size: 15px;
    min-height: 48px;
  }
  
  .velvet-button-md {
    padding: 10px 18px;
    font-size: 14px;
    min-height: 40px;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = buttonStyles;
  document.head.appendChild(styleSheet);
}