import React, { useState } from 'react';

interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  description?: string;
  badge?: string | number;
  disabled?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  collapsed = false,
  onToggleCollapse,
  className = ''
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={`velvet-sidebar ${collapsed ? 'velvet-sidebar-collapsed' : ''} ${className}`}>
      {/* Sidebar Header */}
      <div className="velvet-sidebar-header">
        <div className="velvet-sidebar-logo">
          <span className="velvet-sidebar-logo-icon">V</span>
          {!collapsed && (
            <div className="velvet-sidebar-logo-text">
              <span className="velvet-sidebar-logo-title">Velvet</span>
              <span className="velvet-sidebar-logo-subtitle">Dashboard</span>
            </div>
          )}
        </div>
        {onToggleCollapse && (
          <button 
            className="velvet-sidebar-toggle"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '→' : '←'}
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="velvet-sidebar-nav">
        <ul className="velvet-sidebar-list">
          {items.map((item) => (
            <li key={item.id} className="velvet-sidebar-item">
              <button
                className={`velvet-sidebar-link ${activeItem === item.id ? 'velvet-sidebar-link-active' : ''} ${item.disabled ? 'velvet-sidebar-link-disabled' : ''}`}
                onClick={() => !item.disabled && onItemClick(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                disabled={item.disabled}
                title={collapsed ? item.title : undefined}
              >
                <span className="velvet-sidebar-icon">{item.icon}</span>
                {!collapsed && (
                  <>
                    <div className="velvet-sidebar-content">
                      <span className="velvet-sidebar-title">{item.title}</span>
                      {item.description && (
                        <span className="velvet-sidebar-description">{item.description}</span>
                      )}
                    </div>
                    {item.badge && (
                      <span className="velvet-sidebar-badge">{item.badge}</span>
                    )}
                  </>
                )}
              </button>
              
              {/* Tooltip for collapsed state */}
              {collapsed && hoveredItem === item.id && (
                <div className="velvet-sidebar-tooltip">
                  <div className="velvet-sidebar-tooltip-content">
                    <div className="velvet-sidebar-tooltip-title">{item.title}</div>
                    {item.description && (
                      <div className="velvet-sidebar-tooltip-description">{item.description}</div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="velvet-sidebar-footer">
        {!collapsed && (
          <div className="velvet-sidebar-status">
            <div className="velvet-sidebar-status-indicator">
              <span className="velvet-sidebar-status-dot"></span>
              <span className="velvet-sidebar-status-text">Consciousness Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Predefined sidebar items for Velvet Dashboard
export const getVelvetSidebarItems = (): SidebarItem[] => [
  {
    id: 'dashboard',
    title: 'Home Dashboard',
    icon: '🏠',
    description: 'Overview & today\'s energy'
  },
  {
    id: 'social',
    title: 'Social Intelligence',
    icon: '🎭',
    description: 'Social decoder & masking',
    badge: 'NEW'
  },
  {
    id: 'tasks',
    title: 'Task Support',
    icon: '✅',
    description: 'Executive function tools'
  },
  {
    id: 'meeting',
    title: 'Meeting Assistant',
    icon: '🎤',
    description: 'Communication tools'
  },
  {
    id: 'patterns',
    title: 'Pattern Insights',
    icon: '📊',
    description: 'Behavioral analysis'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: '⚙️',
    description: 'Customization & preferences'
  }
];

// Add the CSS styles for Velvet's glassmorphism sidebar
const sidebarStyles = `
.velvet-sidebar {
  width: 280px;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.90) 50%,
    rgba(15, 23, 42, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(59, 130, 246, 0.2);
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.velvet-sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, 
    rgba(59, 130, 246, 0.05) 0%,
    transparent 50%,
    rgba(59, 130, 246, 0.02) 100%);
  pointer-events: none;
}

.velvet-sidebar-collapsed {
  width: 80px;
}

/* Header */
.velvet-sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.velvet-sidebar-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.velvet-sidebar-logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.9) 0%,
    rgba(59, 130, 246, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
}

.velvet-sidebar-logo-text {
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.velvet-sidebar-logo-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.2;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
}

.velvet-sidebar-logo-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  line-height: 1.2;
}

.velvet-sidebar-toggle {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
}

.velvet-sidebar-toggle:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.95);
}

/* Navigation */
.velvet-sidebar-nav {
  flex: 1;
  padding: 12px 0;
  position: relative;
  z-index: 1;
}

.velvet-sidebar-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.velvet-sidebar-item {
  margin: 0;
  position: relative;
}

.velvet-sidebar-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
  position: relative;
  overflow: hidden;
  text-align: left;
}

.velvet-sidebar-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(59, 130, 246, 0.8);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.velvet-sidebar-link:hover:not(.velvet-sidebar-link-disabled) {
  background: rgba(59, 130, 246, 0.08);
  color: rgba(255, 255, 255, 0.95);
  transform: translateX(4px);
}

.velvet-sidebar-link-active {
  background: rgba(59, 130, 246, 0.12);
  color: rgba(255, 255, 255, 0.98);
}

.velvet-sidebar-link-active::before {
  transform: scaleY(1);
}

.velvet-sidebar-link-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.velvet-sidebar-icon {
  font-size: 20px;
  line-height: 1;
  min-width: 24px;
  text-align: center;
}

.velvet-sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.velvet-sidebar-title {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.3;
}

.velvet-sidebar-description {
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.2;
}

.velvet-sidebar-badge {
  background: rgba(37, 99, 235, 0.8);
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.3);
}

/* Tooltip for collapsed state */
.velvet-sidebar-tooltip {
  position: absolute;
  left: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  animation: velvet-tooltip-show 0.2s ease forwards;
  min-width: 180px;
}

@keyframes velvet-tooltip-show {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

.velvet-sidebar-tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 6px 0;
  border-color: transparent rgba(59, 130, 246, 0.3) transparent transparent;
}

.velvet-sidebar-tooltip-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 4px;
}

.velvet-sidebar-tooltip-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
}

/* Footer */
.velvet-sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  position: relative;
  z-index: 1;
}

.velvet-sidebar-status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.velvet-sidebar-status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.velvet-sidebar-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.8);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
  animation: velvet-status-pulse 2s ease-in-out infinite;
}

@keyframes velvet-status-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

.velvet-sidebar-status-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* Collapsed state adjustments */
.velvet-sidebar-collapsed .velvet-sidebar-header {
  padding: 24px 16px;
}

.velvet-sidebar-collapsed .velvet-sidebar-link {
  padding: 16px;
  justify-content: center;
}

.velvet-sidebar-collapsed .velvet-sidebar-icon {
  min-width: auto;
}

.velvet-sidebar-collapsed .velvet-sidebar-logo-text,
.velvet-sidebar-collapsed .velvet-sidebar-content,
.velvet-sidebar-collapsed .velvet-sidebar-badge,
.velvet-sidebar-collapsed .velvet-sidebar-toggle {
  opacity: 0;
  pointer-events: none;
}

.velvet-sidebar-collapsed .velvet-sidebar-footer {
  padding: 16px;
}

/* Responsive design */
@media (max-width: 768px) {
  .velvet-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transform: translateX(-100%);
  }
  
  .velvet-sidebar.velvet-sidebar-mobile-open {
    transform: translateX(0);
  }
  
  .velvet-sidebar-collapsed {
    width: 280px;
  }
}

/* Focus states for accessibility */
.velvet-sidebar-link:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: -2px;
}

.velvet-sidebar-toggle:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: 2px;
}

/* Special states */
.velvet-sidebar-link-loading {
  pointer-events: none;
  opacity: 0.6;
}

.velvet-sidebar-link-loading .velvet-sidebar-icon {
  animation: velvet-sidebar-spin 1s linear infinite;
}

@keyframes velvet-sidebar-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Dark theme support (already implemented in base colors) */
.velvet-sidebar-theme-dark {
  /* Additional dark theme adjustments if needed */
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = sidebarStyles;
  document.head.appendChild(styleSheet);
}