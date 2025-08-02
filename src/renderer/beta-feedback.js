/**
 * Beta Feedback System for Velvet AI Assistant
 * Collects user feedback and usage data for product improvement
 */

class BetaFeedbackSystem {
  constructor() {
    this.isInitialized = false;
    this.feedbackQueue = [];
    this.usageStats = {
      sessionStart: Date.now(),
      interactions: 0,
      features: new Set(),
      errors: []
    };
    
    this.init();
  }

  async init() {
    try {
      this.createFeedbackUI();
      this.setupEventListeners();
      this.startUsageTracking();
      this.isInitialized = true;
      
      console.log('✅ Beta feedback system initialized');
    } catch (error) {
      console.error('❌ Failed to initialize beta feedback system:', error);
    }
  }

  createFeedbackUI() {
    // Create floating feedback button
    const feedbackButton = document.createElement('div');
    feedbackButton.id = 'beta-feedback-btn';
    feedbackButton.innerHTML = `
      <div class="feedback-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>Beta Feedback</span>
      </div>
    `;
    
    feedbackButton.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: rgba(99, 102, 241, 0.9);
      color: white;
      border-radius: 20px;
      padding: 8px 16px;
      cursor: pointer;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    `;

    feedbackButton.addEventListener('mouseenter', () => {
      feedbackButton.style.background = 'rgba(99, 102, 241, 1)';
      feedbackButton.style.transform = 'scale(1.05)';
    });

    feedbackButton.addEventListener('mouseleave', () => {
      feedbackButton.style.background = 'rgba(99, 102, 241, 0.9)';
      feedbackButton.style.transform = 'scale(1)';
    });

    feedbackButton.addEventListener('click', () => {
      this.showFeedbackModal();
    });

    document.body.appendChild(feedbackButton);

    // Create feedback modal
    this.createFeedbackModal();
  }

  createFeedbackModal() {
    const modal = document.createElement('div');
    modal.id = 'beta-feedback-modal';
    modal.innerHTML = `
      <div class="feedback-modal-backdrop" onclick="document.getElementById('beta-feedback-modal').style.display='none'">
        <div class="feedback-modal-content" onclick="event.stopPropagation()">
          <div class="feedback-modal-header">
            <h2>Help Improve Velvet!</h2>
            <button class="feedback-close-btn" onclick="document.getElementById('beta-feedback-modal').style.display='none'">×</button>
          </div>
          
          <div class="feedback-form">
            <div class="feedback-section">
              <h3>How's your experience so far?</h3>
              <div class="rating-container">
                <button class="rating-btn" data-rating="1">😤</button>
                <button class="rating-btn" data-rating="2">😕</button>
                <button class="rating-btn" data-rating="3">😐</button>
                <button class="rating-btn" data-rating="4">🙂</button>
                <button class="rating-btn" data-rating="5">🤩</button>
              </div>
            </div>

            <div class="feedback-section">
              <h3>What features have you tried?</h3>
              <div class="features-checklist">
                <label><input type="checkbox" value="social-decoder"> Social Decoder</label>
                <label><input type="checkbox" value="screen-intelligence"> Screen Intelligence</label>
                <label><input type="checkbox" value="voice-assistant"> Voice Assistant</label>
                <label><input type="checkbox" value="task-coaching"> Task Coaching</label>
                <label><input type="checkbox" value="meeting-assistant"> Meeting Assistant</label>
              </div>
            </div>

            <div class="feedback-section">
              <h3>Tell us more (optional)</h3>
              <textarea id="feedback-text" placeholder="What works well? What's confusing? Any bugs or suggestions?"></textarea>
            </div>

            <div class="feedback-section">
              <h3>Contact (optional)</h3>
              <input type="email" id="feedback-email" placeholder="your@email.com - for follow-up only">
            </div>

            <div class="feedback-actions">
              <button class="btn-secondary" onclick="document.getElementById('beta-feedback-modal').style.display='none'">Skip</button>
              <button class="btn-primary" onclick="window.betaFeedback.submitFeedback()">Send Feedback</button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10001;
    `;

    // Add CSS styles
    const styles = document.createElement('style');
    styles.textContent = `
      .feedback-modal-backdrop {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(4px);
      }
      
      .feedback-modal-content {
        background: rgba(26, 32, 44, 0.95);
        border-radius: 16px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }
      
      .feedback-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 16px;
      }
      
      .feedback-modal-header h2 {
        margin: 0;
        color: #60A5FA;
        font-size: 20px;
      }
      
      .feedback-close-btn {
        background: none;
        border: none;
        color: #9CA3AF;
        font-size: 24px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
      }
      
      .feedback-close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .feedback-section {
        margin-bottom: 20px;
      }
      
      .feedback-section h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        color: #E5E7EB;
      }
      
      .rating-container {
        display: flex;
        gap: 8px;
        justify-content: center;
        margin: 16px 0;
      }
      
      .rating-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid transparent;
        border-radius: 50px;
        padding: 12px;
        cursor: pointer;
        font-size: 24px;
        transition: all 0.2s ease;
      }
      
      .rating-btn:hover, .rating-btn.selected {
        background: rgba(99, 102, 241, 0.3);
        border-color: #6366F1;
        transform: scale(1.1);
      }
      
      .features-checklist {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      
      .features-checklist label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: background 0.2s ease;
      }
      
      .features-checklist label:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .features-checklist input[type="checkbox"] {
        accent-color: #6366F1;
      }
      
      #feedback-text {
        width: 100%;
        height: 80px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 12px;
        color: white;
        font-family: inherit;
        resize: vertical;
      }
      
      #feedback-text::placeholder {
        color: #9CA3AF;
      }
      
      #feedback-email {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 12px;
        color: white;
        font-family: inherit;
      }
      
      #feedback-email::placeholder {
        color: #9CA3AF;
      }
      
      .feedback-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .btn-secondary, .btn-primary {
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        font-family: inherit;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: #9CA3AF;
      }
      
      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .btn-primary {
        background: #6366F1;
        color: white;
      }
      
      .btn-primary:hover {
        background: #5B5FCF;
        transform: translateY(-1px);
      }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(modal);

    // Setup rating buttons
    modal.querySelectorAll('.rating-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }

  showFeedbackModal() {
    document.getElementById('beta-feedback-modal').style.display = 'block';
    
    // Track feedback modal opened
    this.trackEvent('feedback_modal_opened');
  }

  async submitFeedback() {
    try {
      const modal = document.getElementById('beta-feedback-modal');
      
      // Collect feedback data
      const rating = modal.querySelector('.rating-btn.selected')?.dataset.rating;
      const features = Array.from(modal.querySelectorAll('.features-checklist input:checked'))
        .map(input => input.value);
      const text = modal.querySelector('#feedback-text').value;
      const email = modal.querySelector('#feedback-email').value;
      
      const feedbackData = {
        rating: rating ? parseInt(rating) : null,
        features,
        text,
        email,
        usageStats: this.usageStats,
        timestamp: Date.now()
      };

      // Submit via IPC
      const result = await window.electronAPI.submitFeedback(feedbackData);
      
      if (result.success) {
        this.showThankYou();
        this.trackEvent('feedback_submitted', { rating, features: features.length });
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  }

  showThankYou() {
    const modal = document.getElementById('beta-feedback-modal');
    
    // Check if this was a high-rating feedback (4-5 stars)
    const rating = modal.querySelector('.rating-btn.selected')?.dataset.rating;
    const isHighRating = rating && parseInt(rating) >= 4;
    
    modal.innerHTML = `
      <div class="feedback-modal-backdrop" onclick="document.getElementById('beta-feedback-modal').style.display='none'">
        <div class="feedback-modal-content" onclick="event.stopPropagation()">
          <div class="thank-you-content">
            <div style="text-align: center; padding: 40px 20px;">
              <div style="font-size: 48px; margin-bottom: 16px;">🙏</div>
              <h2 style="color: #60A5FA; margin-bottom: 16px;">Thank You!</h2>
              <p style="color: #E5E7EB; margin-bottom: 24px;">
                Your feedback helps us make Velvet better for the neurodivergent community.
              </p>
              
              ${isHighRating ? `
                <div style="background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #22C55E;">
                  <h3 style="color: #22C55E; margin: 0 0 12px 0; font-size: 18px;">Love Velvet? Help Others Find It!</h3>
                  <p style="color: #E5E7EB; margin: 0 0 16px 0; font-size: 14px;">
                    Your positive experience could help other neurodivergent minds discover tools that actually work.
                  </p>
                  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                    <button class="btn-secondary" onclick="window.betaFeedback.shareToSocial('twitter')" style="background: rgba(29, 161, 242, 0.2); border-color: #1DA1F2;">
                      Share on Twitter
                    </button>
                    <button class="btn-secondary" onclick="window.betaFeedback.shareToSocial('linkedin')" style="background: rgba(10, 102, 194, 0.2); border-color: #0A66C2;">
                      Share on LinkedIn
                    </button>
                    <button class="btn-secondary" onclick="window.betaFeedback.generateReferralCode()">
                      Invite a Friend
                    </button>
                  </div>
                </div>
              ` : ''}
              
              <button class="btn-primary" onclick="document.getElementById('beta-feedback-modal').style.display='none'">
                Continue Using Velvet
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Auto-close after 5 seconds (longer if high rating to allow sharing)
    setTimeout(() => {
      modal.style.display = 'none';
    }, isHighRating ? 8000 : 3000);
  }

  setupEventListeners() {
    // Track interactions
    document.addEventListener('click', () => {
      this.usageStats.interactions++;
    });

    // Track feature usage
    window.addEventListener('velvet-feature-used', (event) => {
      this.usageStats.features.add(event.detail.feature);
      this.trackEvent('feature_used', { feature: event.detail.feature });
    });

    // Track errors
    window.addEventListener('error', (event) => {
      this.usageStats.errors.push({
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        timestamp: Date.now()
      });
    });
  }

  startUsageTracking() {
    // Send usage stats every 5 minutes
    setInterval(() => {
      this.sendUsageStats();
    }, 5 * 60 * 1000);

    // Prompt for feedback after 10 minutes of usage
    setTimeout(() => {
      if (this.usageStats.interactions > 10) {
        this.showFeedbackPrompt();
      }
    }, 10 * 60 * 1000);
  }

  showFeedbackPrompt() {
    // Show a subtle prompt to provide feedback
    const prompt = document.createElement('div');
    prompt.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(99, 102, 241, 0.95);
      color: white;
      padding: 16px;
      border-radius: 12px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      z-index: 10000;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      max-width: 300px;
      animation: slideIn 0.3s ease;
    `;

    prompt.innerHTML = `
      <div style="margin-bottom: 12px;">
        <strong>How's Velvet working for you?</strong>
      </div>
      <div style="font-size: 12px; opacity: 0.9; margin-bottom: 12px;">
        Help us improve by sharing your experience
      </div>
      <div style="display: flex; gap: 8px;">
        <button onclick="this.parentElement.parentElement.remove()" 
                style="padding: 6px 12px; background: rgba(255,255,255,0.2); border: none; border-radius: 6px; color: white; cursor: pointer; font-size: 12px;">
          Later
        </button>
        <button onclick="window.betaFeedback.showFeedbackModal(); this.parentElement.parentElement.remove()" 
                style="padding: 6px 12px; background: white; border: none; border-radius: 6px; color: #6366F1; cursor: pointer; font-size: 12px; font-weight: 500;">
          Share Feedback
        </button>
      </div>
    `;

    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(prompt);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (prompt.parentNode) {
        prompt.remove();
      }
    }, 10000);
  }

  trackEvent(eventName, data = {}) {
    console.log(`📊 Beta Event: ${eventName}`, data);
    
    // Could send to analytics service in the future
    // For now, just log locally
  }

  async sendUsageStats() {
    try {
      const stats = {
        ...this.usageStats,
        features: Array.from(this.usageStats.features),
        sessionDuration: Date.now() - this.usageStats.sessionStart
      };
      
      console.log('📊 Usage stats:', stats);
      
      // In production, this could send anonymized stats to a service
      
    } catch (error) {
      console.error('Failed to send usage stats:', error);
    }
  }

  // Utility method for components to track feature usage
  static trackFeatureUsage(featureName) {
    window.dispatchEvent(new CustomEvent('velvet-feature-used', {
      detail: { feature: featureName }
    }));
  }

  // Social sharing methods
  shareToSocial(platform) {
    const shareMessages = {
      twitter: `🧠 Just gave feedback to @VelvetAI - the first AI assistant that truly gets how neurodivergent minds work! Social decoder, gentle task coaching, hyperfocus protection... finally, technology that understands us! #VelvetAI #NeurodivergentTech #ADHD #Autism`,
      linkedin: `I'm beta testing Velvet AI - an assistant designed specifically for neurodivergent minds. Features like social communication decoding and executive function support are game-changers for ADHD/autistic professionals. This is the future of inclusive technology. #Neurodiversity #AssistiveTech #WorkplaceInclusion`
    };

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessages.twitter)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://velvet-ai.app')}&summary=${encodeURIComponent(shareMessages.linkedin)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
      this.trackEvent('social_share', { platform, context: 'feedback_thankyou' });
    }
  }

  generateReferralCode() {
    const referralCode = 'VELVET' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // Create referral modal
    const referralModal = document.createElement('div');
    referralModal.innerHTML = `
      <div class="feedback-modal-backdrop">
        <div class="feedback-modal-content">
          <div class="feedback-modal-header">
            <h2>Invite a Friend to Velvet</h2>
            <button class="feedback-close-btn" onclick="this.closest('.feedback-modal-backdrop').remove()">×</button>
          </div>
          
          <div style="padding: 24px; text-align: center;">
            <p style="color: #E5E7EB; margin-bottom: 24px;">
              Share Velvet with someone who could benefit from neurodivergent-friendly AI support.
            </p>
            
            <div style="background: rgba(99, 102, 241, 0.1); padding: 16px; border-radius: 8px; margin: 16px 0;">
              <label style="color: #A78BFA; font-size: 14px; display: block; margin-bottom: 8px;">Your Referral Code:</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="text" value="${referralCode}" readonly style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 8px; color: white; text-align: center; font-weight: bold;" onclick="this.select()">
                <button onclick="navigator.clipboard.writeText('${referralCode}'); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy', 2000)" style="background: #6366F1; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Copy</button>
              </div>
            </div>
            
            <p style="color: #CBD5E1; font-size: 14px; margin-bottom: 24px;">
              "Hey! I've been beta testing Velvet AI - an assistant made specifically for neurodivergent minds. It's been a game-changer for understanding social cues and managing executive dysfunction. Use code <strong>${referralCode}</strong> for early access!"
            </p>
            
            <div style="display: flex; gap: 12px; justify-content: center;">
              <button onclick="window.open('mailto:?subject=Try Velvet AI&body=' + encodeURIComponent('Hey! I\\'ve been beta testing Velvet AI - an assistant made specifically for neurodivergent minds. It\\'s been a game-changer for understanding social cues and managing executive dysfunction. Use code ${referralCode} for early access! https://velvet-ai.app'))" class="btn-secondary">
                📧 Email
              </button>
              <button onclick="navigator.clipboard.writeText('Hey! I\\'ve been beta testing Velvet AI - an assistant made specifically for neurodivergent minds. It\\'s been a game-changer for understanding social cues and managing executive dysfunction. Use code ${referralCode} for early access! https://velvet-ai.app'); alert('Message copied to clipboard!')" class="btn-secondary">
                📋 Copy Message
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    referralModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10003;
    `;
    
    document.body.appendChild(referralModal);
    this.trackEvent('referral_generated', { code: referralCode });
  }
}

// Initialize beta feedback system (DISABLED - menu access only)
// window.betaFeedback = new BetaFeedbackSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BetaFeedbackSystem;
}