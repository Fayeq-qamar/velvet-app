/**
 * Velvet AI Assistant - Beta Onboarding System
 * Guides new users through setup and permissions
 */

class VelvetOnboarding {
  constructor() {
    this.currentStep = 0;
    this.isFirstLaunch = false;
    this.permissionsGranted = {
      screen: false,
      microphone: false
    };
    
    this.steps = [
      {
        id: 'welcome',
        title: 'Welcome to Velvet! 👋',
        content: this.getWelcomeContent(),
        action: 'Continue'
      },
      {
        id: 'permissions',
        title: 'Grant Permissions 🔐',
        content: this.getPermissionsContent(),
        action: 'Open Settings',
        skipText: 'Skip for now'
      },
      {
        id: 'features',
        title: 'Key Features 🚀',
        content: this.getFeaturesContent(),
        action: 'Explore Velvet'
      }
    ];
    
    this.init();
  }

  async init() {
    // Check if this is first launch
    this.isFirstLaunch = await this.checkFirstLaunch();
    
    if (this.isFirstLaunch) {
      await this.startOnboarding();
    } else {
      // Check permissions for existing users
      await this.checkPermissions();
    }
  }

  async checkFirstLaunch() {
    try {
      const hasLaunched = localStorage.getItem('velvet-has-launched');
      return !hasLaunched;
    } catch (error) {
      return true; // Assume first launch if we can't check
    }
  }

  async startOnboarding() {
    this.createOnboardingUI();
    this.showStep(0);
  }

  createOnboardingUI() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'velvet-onboarding';
    overlay.innerHTML = `
      <div class="onboarding-backdrop">
        <div class="onboarding-modal">
          <div class="onboarding-header">
            <div class="onboarding-progress">
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              <span class="progress-text">Step 1 of ${this.steps.length}</span>
            </div>
          </div>
          
          <div class="onboarding-content">
            <h2 class="step-title"></h2>
            <div class="step-content"></div>
          </div>
          
          <div class="onboarding-actions">
            <button class="btn-skip" style="display: none;">Skip</button>
            <button class="btn-primary step-action">Continue</button>
          </div>
        </div>
      </div>
    `;

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
      #velvet-onboarding {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      
      .onboarding-backdrop {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
      }
      
      .onboarding-modal {
        background: linear-gradient(135deg, rgba(26, 32, 44, 0.98), rgba(45, 55, 72, 0.95));
        border-radius: 20px;
        padding: 0;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      }
      
      .onboarding-header {
        padding: 24px 32px 0;
        background: rgba(99, 102, 241, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .onboarding-progress {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
      }
      
      .progress-bar {
        flex: 1;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
      }
      
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #6366F1, #8B5CF6);
        border-radius: 3px;
        transition: width 0.5s ease;
        width: 33%;
      }
      
      .progress-text {
        color: #94A3B8;
        font-size: 14px;
        font-weight: 500;
      }
      
      .onboarding-content {
        padding: 32px;
        color: white;
        text-align: center;
      }
      
      .step-title {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 24px 0;
        background: linear-gradient(135deg, #60A5FA, #A78BFA);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .step-content {
        font-size: 16px;
        line-height: 1.6;
        color: #E2E8F0;
      }
      
      .onboarding-actions {
        padding: 24px 32px 32px;
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        background: rgba(0, 0, 0, 0.2);
      }
      
      .btn-skip, .btn-primary {
        padding: 12px 24px;
        border-radius: 10px;
        border: none;
        font-family: inherit;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      
      .btn-skip {
        background: rgba(255, 255, 255, 0.1);
        color: #94A3B8;
      }
      
      .btn-skip:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #CBD5E1;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #6366F1, #8B5CF6);
        color: white;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
      }
      
      .feature-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 24px 0;
        text-align: left;
      }
      
      .feature-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 20px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .feature-card h4 {
        color: #60A5FA;
        margin: 0 0 8px 0;
        font-size: 16px;
      }
      
      .feature-card p {
        color: #CBD5E1;
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
      }
      
      .permission-status {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        margin: 8px 0;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .permission-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .permission-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      }
      
      .permission-icon.screen {
        background: rgba(34, 197, 94, 0.2);
      }
      
      .permission-icon.microphone {
        background: rgba(239, 68, 68, 0.2);
      }
      
      .permission-details h4 {
        margin: 0;
        color: white;
        font-size: 16px;
      }
      
      .permission-details p {
        margin: 4px 0 0 0;
        color: #94A3B8;
        font-size: 14px;
      }
      
      .permission-badge {
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
      }
      
      .permission-badge.granted {
        background: rgba(34, 197, 94, 0.2);
        color: #22C55E;
      }
      
      .permission-badge.needed {
        background: rgba(239, 68, 68, 0.2);
        color: #EF4444;
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(overlay);

    // Setup event listeners
    overlay.querySelector('.step-action').addEventListener('click', () => this.handleStepAction());
    overlay.querySelector('.btn-skip').addEventListener('click', () => this.skipStep());
  }

  showStep(stepIndex) {
    this.currentStep = stepIndex;
    const step = this.steps[stepIndex];
    const modal = document.querySelector('#velvet-onboarding');
    
    // Update progress
    const progressFill = modal.querySelector('.progress-fill');
    const progressText = modal.querySelector('.progress-text');
    const progress = ((stepIndex + 1) / this.steps.length) * 100;
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Step ${stepIndex + 1} of ${this.steps.length}`;
    
    // Update content
    modal.querySelector('.step-title').textContent = step.title;
    modal.querySelector('.step-content').innerHTML = step.content;
    modal.querySelector('.step-action').textContent = step.action;
    
    // Show/hide skip button
    const skipBtn = modal.querySelector('.btn-skip');
    if (step.skipText) {
      skipBtn.textContent = step.skipText;
      skipBtn.style.display = 'block';
    } else {
      skipBtn.style.display = 'none';
    }
  }

  async handleStepAction() {
    const step = this.steps[this.currentStep];
    
    switch (step.id) {
      case 'welcome':
        this.nextStep();
        break;
        
      case 'permissions':
        await this.handlePermissionsStep();
        break;
        
      case 'features':
        this.completeOnboarding();
        break;
    }
  }

  async handlePermissionsStep() {
    try {
      // Request permissions through IPC
      if (window.electronAPI?.requestPermissions) {
        const granted = await window.electronAPI.requestPermissions();
        if (granted) {
          // Check permissions again
          await this.checkPermissions();
          this.updatePermissionsUI();
        }
      }
      
      // Auto-advance after a moment to let user see the result
      setTimeout(() => {
        this.nextStep();
      }, 2000);
      
    } catch (error) {
      console.error('Failed to handle permissions:', error);
      this.nextStep(); // Continue anyway
    }
  }

  async checkPermissions() {
    try {
      if (window.electronAPI?.checkPermissions) {
        this.permissionsGranted = await window.electronAPI.checkPermissions();
      }
    } catch (error) {
      console.error('Failed to check permissions:', error);
    }
  }

  updatePermissionsUI() {
    const permissionsContent = document.querySelector('.step-content');
    if (permissionsContent && this.currentStep === 1) {
      permissionsContent.innerHTML = this.getPermissionsContent();
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.showStep(this.currentStep + 1);
    } else {
      this.completeOnboarding();
    }
  }

  skipStep() {
    this.nextStep();
  }

  completeOnboarding() {
    // Mark as completed
    localStorage.setItem('velvet-has-launched', 'true');
    localStorage.setItem('velvet-onboarding-completed', Date.now().toString());
    
    // Remove onboarding UI
    const overlay = document.querySelector('#velvet-onboarding');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(0.95)';
      overlay.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
    
    // Show welcome message
    this.showWelcomeComplete();
  }

  showWelcomeComplete() {
    // Create a subtle welcome complete message
    const welcome = document.createElement('div');
    welcome.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.95));
      color: white;
      padding: 32px;
      border-radius: 16px;
      text-align: center;
      z-index: 10001;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;

    welcome.innerHTML = `
      <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
      <h2 style="margin: 0 0 16px 0; font-size: 24px;">Welcome to Velvet!</h2>
      <p style="margin: 0; font-size: 16px; opacity: 0.9;">
        Your gentle AI companion is ready to support you.
      </p>
    `;

    document.body.appendChild(welcome);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      welcome.style.opacity = '0';
      welcome.style.transform = 'translate(-50%, -50%) scale(0.95)';
      welcome.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        welcome.remove();
      }, 300);
    }, 3000);
  }

  getWelcomeContent() {
    return `
      <div style="text-align: left; max-width: 500px; margin: 0 auto;">
        <p style="font-size: 18px; margin-bottom: 24px;">
          Welcome to <strong>Velvet</strong> - your gentle AI companion designed specifically for neurodivergent minds.
        </p>
        
        <div style="background: rgba(99, 102, 241, 0.1); padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #6366F1;">
          <p style="margin: 0; font-style: italic;">
            "Finally, someone who gets it!" - That's our goal for every interaction.
          </p>
        </div>
        
        <p>
          Velvet understands ADHD, autism, and executive dysfunction. We provide:
        </p>
        
        <ul style="text-align: left; padding-left: 20px; line-height: 1.8;">
          <li><strong>Social Decoder</strong> - Translates neurotypical communication</li>
          <li><strong>Gentle Nudges</strong> - Supportive reminders, never pushy</li>
          <li><strong>Pattern Recognition</strong> - Spots distractions and hyperfocus</li>
          <li><strong>Task Coaching</strong> - Breaks big tasks into tiny steps</li>
        </ul>
        
        <p style="margin-top: 24px;">
          Let's get you set up in just a few steps!
        </p>
      </div>
    `;
  }

  getPermissionsContent() {
    return `
      <div style="text-align: left; max-width: 500px; margin: 0 auto;">
        <p style="margin-bottom: 24px;">
          Velvet needs a couple of permissions to work its magic. Don't worry - everything stays private on your device!
        </p>
        
        <div class="permission-status">
          <div class="permission-info">
            <div class="permission-icon screen">🖥️</div>
            <div class="permission-details">
              <h4>Screen Recording</h4>
              <p>To read your screen and provide contextual help</p>
            </div>
          </div>
          <div class="permission-badge ${this.permissionsGranted.screen ? 'granted' : 'needed'}">
            ${this.permissionsGranted.screen ? 'Granted' : 'Needed'}
          </div>
        </div>
        
        <div class="permission-status">
          <div class="permission-info">
            <div class="permission-icon microphone">🎤</div>
            <div class="permission-details">
              <h4>Microphone Access</h4>
              <p>For voice commands and meeting assistance</p>
            </div>
          </div>
          <div class="permission-badge ${this.permissionsGranted.microphone ? 'granted' : 'needed'}">
            ${this.permissionsGranted.microphone ? 'Granted' : 'Needed'}
          </div>
        </div>
        
        <div style="background: rgba(34, 197, 94, 0.1); padding: 16px; border-radius: 10px; margin: 24px 0; border-left: 4px solid #22C55E;">
          <p style="margin: 0; font-size: 14px;">
            <strong>🔒 Privacy First:</strong> All data processing happens locally. Nothing leaves your device without explicit permission.
          </p>
        </div>
        
        <p style="font-size: 14px; color: #94A3B8; margin-top: 16px;">
          Click "Open Settings" to grant permissions in System Preferences.
        </p>
      </div>
    `;
  }

  getFeaturesContent() {
    return `
      <div style="text-align: left; max-width: 500px; margin: 0 auto;">
        <p style="margin-bottom: 24px; text-align: center;">
          Here's what makes Velvet special for neurodivergent minds:
        </p>
        
        <div class="feature-grid">
          <div class="feature-card">
            <h4>🧠 Social Decoder</h4>
            <p>Translates neurotypical communication patterns, detects sarcasm, and explains implicit social cues.</p>
          </div>
          
          <div class="feature-card">
            <h4>👁️ Screen Intelligence</h4>
            <p>Monitors your workflow patterns and gently intervenes when it detects distraction spirals or hyperfocus.</p>
          </div>
          
          <div class="feature-card">
            <h4>🎯 Task Coaching</h4>
            <p>Breaks overwhelming tasks into 2-5 minute micro-steps and celebrates every small win.</p>
          </div>
          
          <div class="feature-card">
            <h4>💬 Voice Companion</h4>
            <p>Conversational AI that understands executive dysfunction and responds with empathy, not judgment.</p>
          </div>
        </div>
        
        <div style="background: rgba(139, 92, 246, 0.1); padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
          <p style="margin: 0;">
            <strong>🚀 You're all set!</strong> Velvet will appear as a gentle orb in the bottom-right corner. Click it anytime for support.
          </p>
        </div>
      </div>
    `;
  }
}

// Initialize onboarding when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.velvetOnboarding = new VelvetOnboarding();
  });
} else {
  window.velvetOnboarding = new VelvetOnboarding();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VelvetOnboarding;
}