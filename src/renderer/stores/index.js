// Velvet Store System - Main Entry Point
// Unified state management for all viral neurodivergent features

// Core store and coordinator (available globally via script tags)
// Note: ES6 exports converted to global variables for script tag loading
console.log('📦 Store system loaded via script tags');

// Simple store verification
if (typeof window !== 'undefined') {
  setTimeout(() => {
    if (window.useVelvetStore) {
      console.log('✅ Velvet store system ready');
    } else {
      console.log('⚠️ Velvet store not found - fallback mode active');
    }
  }, 100);
}