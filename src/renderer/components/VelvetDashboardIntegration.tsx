import React from 'react';
import { createRoot } from 'react-dom/client';
import VelvetDashboard from './VelvetDashboard';

/**
 * VelvetDashboardIntegration
 * 
 * This file provides integration examples and utilities for mounting the Velvet Dashboard
 * into the existing Electron application.
 * 
 * Usage Examples:
 * 
 * 1. Mount as a separate window/modal:
 *    mountVelvetDashboard('dashboard-container');
 * 
 * 2. Mount as part of the existing UI:
 *    mountVelvetDashboardInline('existing-container');
 * 
 * 3. Replace the existing chat interface:
 *    replaceWithDashboard();
 */

// Function to mount the dashboard in a dedicated container
export function mountVelvetDashboard(containerId: string = 'velvet-dashboard-container') {
  console.log('🚀 Mounting Velvet Dashboard...');
  
  // Create container if it doesn't exist
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      pointer-events: auto;
    `;
    document.body.appendChild(container);
  }

  const root = createRoot(container);
  root.render(<VelvetDashboard />);
  
  console.log('✅ Velvet Dashboard mounted successfully');
  return root;
}

// Function to mount the dashboard inline within existing UI
export function mountVelvetDashboardInline(containerId: string) {
  console.log('🚀 Mounting Velvet Dashboard inline...');
  
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`❌ Container with ID '${containerId}' not found`);
    return null;
  }

  const root = createRoot(container);
  root.render(<VelvetDashboard />);
  
  console.log('✅ Velvet Dashboard mounted inline successfully');
  return root;
}

// Function to replace the existing chat interface with the dashboard
export function replaceWithDashboard() {
  console.log('🔄 Replacing existing interface with Velvet Dashboard...');
  
  // Hide the existing orb and chat interface
  const orb = document.querySelector('.velvet-orb');
  const chatInterface = document.querySelector('.velvet-interface');
  
  if (orb) {
    (orb as HTMLElement).style.display = 'none';
  }
  
  if (chatInterface) {
    (chatInterface as HTMLElement).style.display = 'none';
  }
  
  // Mount the dashboard
  return mountVelvetDashboard();
}

// Function to create a dashboard toggle button
export function createDashboardToggle(parentSelector: string = 'body') {
  const parent = document.querySelector(parentSelector);
  if (!parent) {
    console.error(`❌ Parent element '${parentSelector}' not found`);
    return;
  }

  // Create toggle button
  const toggleButton = document.createElement('button');
  toggleButton.innerHTML = '📊';
  toggleButton.title = 'Open Velvet Dashboard';
  toggleButton.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, 
      rgba(37, 99, 235, 0.9) 0%,
      rgba(59, 130, 246, 0.8) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(59, 130, 246, 0.3);
    color: white;
    font-size: 20px;
    cursor: pointer;
    z-index: 1500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
  `;

  let dashboardRoot: any = null;
  let isOpen = false;

  toggleButton.addEventListener('click', () => {
    if (isOpen) {
      // Close dashboard
      const container = document.getElementById('velvet-dashboard-container');
      if (container) {
        container.remove();
      }
      dashboardRoot = null;
      isOpen = false;
      toggleButton.innerHTML = '📊';
      toggleButton.title = 'Open Velvet Dashboard';
    } else {
      // Open dashboard
      dashboardRoot = mountVelvetDashboard();
      isOpen = true;
      toggleButton.innerHTML = '✕';
      toggleButton.title = 'Close Velvet Dashboard';
    }
  });

  // Hover effects
  toggleButton.addEventListener('mouseenter', () => {
    toggleButton.style.transform = 'translateY(-2px)';
    toggleButton.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
  });

  toggleButton.addEventListener('mouseleave', () => {
    toggleButton.style.transform = 'translateY(0)';
    toggleButton.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.3)';
  });

  parent.appendChild(toggleButton);
  
  console.log('✅ Dashboard toggle button created');
  return toggleButton;
}

// Function to integrate with existing Velvet AI system
export function integrateWithVelvetAI() {
  console.log('🔗 Integrating dashboard with existing Velvet AI...');
  
  // Override the existing chat toggle to show dashboard instead
  if (typeof window !== 'undefined' && window.document) {
    // Look for existing orb click handler
    const orb = document.querySelector('.velvet-orb');
    if (orb) {
      // Store original click handler
      const originalHandler = (orb as any).onclick;
      
      // Add dashboard option
      (orb as HTMLElement).addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        // Create context menu
        const menu = document.createElement('div');
        menu.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
          padding: 8px 0;
          z-index: 3000;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;
        
        const chatOption = document.createElement('div');
        chatOption.textContent = '💬 Chat Interface';
        chatOption.style.cssText = `
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s ease;
        `;
        chatOption.addEventListener('mouseenter', () => {
          chatOption.style.background = 'rgba(59, 130, 246, 0.1)';
        });
        chatOption.addEventListener('mouseleave', () => {
          chatOption.style.background = 'transparent';
        });
        chatOption.addEventListener('click', () => {
          if (originalHandler) originalHandler();
          menu.remove();
        });
        
        const dashboardOption = document.createElement('div');
        dashboardOption.textContent = '📊 Dashboard View';
        dashboardOption.style.cssText = chatOption.style.cssText;
        dashboardOption.addEventListener('mouseenter', () => {
          dashboardOption.style.background = 'rgba(59, 130, 246, 0.1)';
        });
        dashboardOption.addEventListener('mouseleave', () => {
          dashboardOption.style.background = 'transparent';
        });
        dashboardOption.addEventListener('click', () => {
          mountVelvetDashboard();
          menu.remove();
        });
        
        menu.appendChild(chatOption);
        menu.appendChild(dashboardOption);
        document.body.appendChild(menu);
        
        // Remove menu on click outside
        setTimeout(() => {
          const removeMenu = () => {
            menu.remove();
            document.removeEventListener('click', removeMenu);
          };
          document.addEventListener('click', removeMenu);
        }, 100);
      });
      
      console.log('✅ Right-click context menu added to Velvet orb');
    }
  }
}

// Function to sync dashboard state with consciousness store
export function setupDashboardSync() {
  console.log('⚡ Setting up dashboard sync with consciousness store...');
  
  // This function would set up real-time sync between the dashboard
  // and the existing consciousness store data
  if (typeof window !== 'undefined' && (window as any).velvetAI) {
    const velvetAI = (window as any).velvetAI;
    
    // Enhance the existing AI context with dashboard data
    const originalGetBrainContext = velvetAI.getBrainContext;
    
    velvetAI.getBrainContext = async function() {
      const originalContext = await originalGetBrainContext.call(this);
      
      // Add dashboard state to context
      const dashboardContext = {
        ...originalContext,
        dashboardActive: !!document.getElementById('velvet-dashboard-container'),
        timestamp: Date.now()
      };
      
      return dashboardContext;
    };
    
    console.log('✅ Dashboard sync established');
  }
}

// Auto-integration function that can be called from existing code
export function autoIntegrateVelvetDashboard() {
  console.log('🚀 Auto-integrating Velvet Dashboard...');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      integrateWithVelvetAI();
      setupDashboardSync();
      createDashboardToggle();
    });
  } else {
    integrateWithVelvetAI();
    setupDashboardSync();
    createDashboardToggle();
  }
  
  console.log('✅ Auto-integration complete');
}

// Usage examples for developers
export const INTEGRATION_EXAMPLES = {
  // Basic mounting
  basic: `
    import { mountVelvetDashboard } from './VelvetDashboardIntegration';
    
    // Mount the dashboard
    const dashboardRoot = mountVelvetDashboard();
  `,
  
  // Toggle functionality
  toggle: `
    import { createDashboardToggle } from './VelvetDashboardIntegration';
    
    // Add a toggle button to the body
    createDashboardToggle('body');
  `,
  
  // Full integration
  fullIntegration: `
    import { autoIntegrateVelvetDashboard } from './VelvetDashboardIntegration';
    
    // Auto-integrate with existing Velvet system
    autoIntegrateVelvetDashboard();
  `,
  
  // Inline mounting
  inline: `
    import { mountVelvetDashboardInline } from './VelvetDashboardIntegration';
    
    // Mount dashboard in existing container
    mountVelvetDashboardInline('my-container');
  `
};

// Export a ready-to-use integration function
export default autoIntegrateVelvetDashboard;