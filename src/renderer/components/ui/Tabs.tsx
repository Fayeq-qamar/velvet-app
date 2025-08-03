import React, { createContext, useContext, useState } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ 
  children, 
  defaultValue, 
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`velvet-tabs ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`velvet-tabs-list ${className}`}>
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  children, 
  value, 
  className = '' 
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      className={`velvet-tabs-trigger ${isActive ? 'velvet-tabs-trigger-active' : ''} ${className}`}
      onClick={() => setActiveTab(value)}
      type="button"
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ 
  children, 
  value, 
  className = '' 
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }

  const { activeTab } = context;
  
  if (activeTab !== value) {
    return null;
  }

  return (
    <div className={`velvet-tabs-content ${className}`}>
      {children}
    </div>
  );
};

// Add the CSS styles for Velvet's glassmorphism tabs
const tabsStyles = `
.velvet-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.velvet-tabs-list {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.7) 0%,
    rgba(30, 41, 59, 0.6) 50%,
    rgba(15, 23, 42, 0.7) 100%
  );
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
  margin-bottom: 24px;
}

.velvet-tabs-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  min-height: 44px;
}

.velvet-tabs-trigger:hover:not(.velvet-tabs-trigger-active) {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(59, 130, 246, 0.08);
}

.velvet-tabs-trigger-active {
  color: rgba(255, 255, 255, 0.95);
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.8) 0%,
    rgba(59, 130, 246, 0.7) 50%,
    rgba(37, 99, 235, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 
    0 2px 12px rgba(37, 99, 235, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.velvet-tabs-trigger:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.6);
  outline-offset: 2px;
}

.velvet-tabs-content {
  margin-top: 0;
  outline: none;
  animation: velvet-tabs-fade-in 0.3s ease-out;
}

@keyframes velvet-tabs-fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .velvet-tabs-list {
    flex-wrap: wrap;
    gap: 2px;
    padding: 3px;
  }
  
  .velvet-tabs-trigger {
    padding: 10px 16px;
    font-size: 13px;
    min-height: 40px;
  }
}

/* Small screen optimization */
@media (max-width: 640px) {
  .velvet-tabs-list {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    flex-wrap: nowrap;
  }
  
  .velvet-tabs-list::-webkit-scrollbar {
    display: none;
  }
  
  .velvet-tabs-trigger {
    flex-shrink: 0;
    padding: 8px 14px;
    min-width: fit-content;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .velvet-tabs-trigger-active {
    border: 2px solid rgba(59, 130, 246, 0.8);
  }
  
  .velvet-tabs-list {
    border: 2px solid rgba(59, 130, 246, 0.3);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .velvet-tabs-trigger,
  .velvet-tabs-content {
    transition: none;
    animation: none;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = tabsStyles;
  document.head.appendChild(styleSheet);
}