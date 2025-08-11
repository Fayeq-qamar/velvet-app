// 🚀 Velvet React Entry Point
// "Gentle companion that understands your brain" - React app initialization

import React from 'react';
import { createRoot } from 'react-dom/client';
import VelvetApp from './VelvetApp';

// Initialize React app when DOM is ready
const initializeVelvetReact = () => {
  console.log('🚀 Initializing Velvet React components...');
  
  // Create React root container
  let reactContainer = document.getElementById('velvet-react-root');
  if (!reactContainer) {
    reactContainer = document.createElement('div');
    reactContainer.id = 'velvet-react-root';
    document.body.appendChild(reactContainer);
  }

  // Create React root and render app
  const root = createRoot(reactContainer);
  root.render(<VelvetApp />);
  
  console.log('✅ Velvet React app rendered');
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeVelvetReact);
} else {
  initializeVelvetReact();
}

export default VelvetApp;