/**
 * Breakthrough Feedback System for Velvet AI Assistant
 * Captures life-changing moments and viral testimonials
 */

class BreakthroughFeedbackSystem {
  constructor() {
    this.isInitialized = false;
    this.breakthroughQueue = [];
    this.testimonials = [];
    this.feedbackTriggers = {
      highEngagement: 15, // Minutes of active use
      featureSuccessCount: 3, // Successful feature uses in session
      positivePattern: 5, // Consecutive positive interactions
      timeInApp: 30, // Total minutes across sessions
      returningUser: 3 // Number of separate sessions
    };
    
    this.currentSession = {
      startTime: Date.now(),
      positiveInteractions: 0,
      featuresUsed: new Set(),
      breakthroughMoments: []
    };
    
    this.init();
  }

  async init() {
    try {
      this.setupBreakthroughListeners();
      this.createBreakthroughUI();
      this.startSessionTracking();
      this.loadStoredTestimonials();
      this.isInitialized = true;
      
      console.log('✅ Breakthrough feedback system initialized');
    } catch (error) {
      console.error('❌ Failed to initialize breakthrough feedback system:', error);
    }
  }

  setupBreakthroughListeners() {
    // Listen for feature breakthrough events
    window.addEventListener('velvet-breakthrough', (event) => {
      this.captureBreakthrough(event.detail);
    });

    // Listen for positive outcomes that might indicate breakthroughs
    window.addEventListener('velvet-positive-outcome', (event) => {
      this.trackPositiveOutcome(event.detail);
    });

    // Listen for feature success events
    window.addEventListener('velvet-feature-success', (event) => {
      this.trackFeatureSuccess(event.detail);
    });

    // Track engagement patterns
    document.addEventListener('click', () => {
      this.trackEngagement();
    });

    // Voice interaction success
    window.addEventListener('velvet-voice-success', (event) => {
      this.trackVoiceSuccess(event.detail);
    });
  }

  captureBreakthrough(breakthroughData) {
    const breakthrough = {
      id: Date.now() + Math.random(),
      ...breakthroughData,
      timestamp: Date.now(),
      sessionId: this.currentSession.startTime,
      captured: false
    };

    this.currentSession.breakthroughMoments.push(breakthrough);
    this.breakthroughQueue.push(breakthrough);

    // Trigger immediate feedback collection for high-impact breakthroughs
    if (breakthrough.impact >= 8) {
      setTimeout(() => {
        this.showBreakthroughFeedbackModal(breakthrough);
      }, 3000); // Wait 3 seconds to let the moment sink in
    }

    console.log('🌟 Breakthrough captured:', breakthrough);
  }

  trackPositiveOutcome(outcomeData) {
    this.currentSession.positiveInteractions++;
    
    // Check if this pattern suggests a breakthrough
    if (this.currentSession.positiveInteractions >= this.feedbackTriggers.positivePattern) {
      this.suggestBreakthrough(outcomeData);
    }
  }

  trackFeatureSuccess(successData) {
    this.currentSession.featuresUsed.add(successData.feature);
    
    // Multiple feature successes might indicate a breakthrough experience
    if (this.currentSession.featuresUsed.size >= this.feedbackTriggers.featureSuccessCount) {
      this.checkForMultiFeatureBreakthrough();
    }
  }

  trackEngagement() {
    // Simple engagement tracking - could be enhanced with more sophisticated metrics
    const sessionTime = (Date.now() - this.currentSession.startTime) / (1000 * 60);
    
    if (sessionTime >= this.feedbackTriggers.highEngagement && !this.currentSession.engagementFeedbackShown) {
      this.currentSession.engagementFeedbackShown = true;
      this.showEngagementFeedback();
    }
  }

  suggestBreakthrough(context) {
    // AI-like analysis to suggest this might be a breakthrough moment
    const possibleBreakthrough = {
      type: 'pattern-detected',
      feature: context.feature || 'multiple',
      impact: 7, // Moderate impact, needs user confirmation
      description: 'Multiple positive interactions detected - this session seems really productive!',
      suggestedBy: 'system',
      context
    };

    this.showBreakthroughSuggestion(possibleBreakthrough);
  }

  showBreakthroughSuggestion(suggestion) {
    const suggestionModal = document.createElement('div');
    suggestionModal.id = 'breakthrough-suggestion';
    suggestionModal.innerHTML = `
      <div class="breakthrough-suggestion-backdrop">
        <div class="breakthrough-suggestion-content">
          <div class="suggestion-header">
            <div class="suggestion-icon">✨</div>
            <h3>Having a breakthrough moment?</h3>
          </div>
          
          <p class="suggestion-text">
            It looks like this session is going really well! Are you experiencing any "aha!" moments or life-changing insights with Velvet?
          </p>
          
          <div class="suggestion-actions">
            <button class="btn-no" onclick="document.getElementById('breakthrough-suggestion').remove()">
              Just regular use
            </button>
            <button class="btn-yes" onclick="window.breakthroughFeedback.confirmBreakthrough()">
              Yes, tell me more!
            </button>
          </div>
        </div>
      </div>
    `;

    suggestionModal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10004;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;

    this.addBreakthroughStyles();
    document.body.appendChild(suggestionModal);

    // Auto-dismiss after 15 seconds
    setTimeout(() => {
      if (document.getElementById('breakthrough-suggestion')) {
        suggestionModal.remove();
      }
    }, 15000);
  }

  confirmBreakthrough() {
    document.getElementById('breakthrough-suggestion')?.remove();
    
    // Show the full breakthrough feedback modal
    this.showBreakthroughFeedbackModal({
      type: 'user-confirmed',
      feature: 'session-flow',
      impact: 8,
      description: 'User confirmed breakthrough experience during session'
    });
  }

  showBreakthroughFeedbackModal(breakthrough) {
    const modal = document.createElement('div');
    modal.id = 'breakthrough-feedback-modal';
    modal.innerHTML = `
      <div class="breakthrough-modal-backdrop">
        <div class="breakthrough-modal-content">
          <div class="breakthrough-header">
            <div class="breakthrough-celebration">
              <div class="celebration-animation">🎉✨🌟</div>
              <h2>Amazing Breakthrough!</h2>
              <p class="breakthrough-description">${breakthrough.description}</p>
            </div>
          </div>
          
          <div class="breakthrough-form">
            <div class="form-section">
              <h3>Tell us about this moment!</h3>
              <p class="form-description">Your story could help other neurodivergent minds discover tools that actually work.</p>
              
              <div class="impact-rating">
                <label>How life-changing was this moment?</label>
                <div class="impact-buttons">
                  <button class="impact-btn" data-impact="6">🙂 Helpful</button>
                  <button class="impact-btn" data-impact="7">😊 Great</button>
                  <button class="impact-btn" data-impact="8">🤩 Amazing</button>
                  <button class="impact-btn" data-impact="9">🤯 Mind-blown</button>
                  <button class="impact-btn" data-impact="10">💫 Life-changing</button>
                </div>
              </div>
              
              <div class="testimonial-section">
                <label>What happened? (Your words, your way)</label>
                <textarea id="breakthrough-story" placeholder="Example: 'Velvet just helped me understand that my coworker wasn't being rude - they were actually stressed about a deadline. This social decoder feature is incredible for someone like me who struggles with reading between the lines...'" rows="4"></textarea>
              </div>
              
              <div class="context-questions">
                <h4>Help us understand the context:</h4>
                <div class="context-grid">
                  <label class="context-item">
                    <input type="checkbox" value="work-situation"> Work/professional setting
                  </label>
                  <label class="context-item">
                    <input type="checkbox" value="social-interaction"> Social interaction
                  </label>
                  <label class="context-item">
                    <input type="checkbox" value="task-management"> Task/project management
                  </label>
                  <label class="context-item">
                    <input type="checkbox" value="communication"> Communication challenge
                  </label>
                  <label class="context-item">
                    <input type="checkbox" value="focus-attention"> Focus/attention issue
                  </label>
                  <label class="context-item">
                    <input type="checkbox" value="overwhelm-anxiety"> Overwhelm/anxiety relief
                  </label>
                </div>
              </div>
              
              <div class="sharing-permission">
                <h4>Would you be comfortable sharing this story?</h4>
                <p class="sharing-description">Your breakthrough could inspire other neurodivergent minds to try Velvet.</p>
                <div class="sharing-options">
                  <label class="sharing-option">
                    <input type="radio" name="sharing" value="anonymous"> 
                    <span>Share anonymously (no personal info)</span>
                  </label>
                  <label class="sharing-option">
                    <input type="radio" name="sharing" value="attributed"> 
                    <span>Share with first name only</span>
                  </label>
                  <label class="sharing-option">
                    <input type="radio" name="sharing" value="full"> 
                    <span>I'm happy to be quoted publicly</span>
                  </label>
                  <label class="sharing-option">
                    <input type="radio" name="sharing" value="private"> 
                    <span>Keep this feedback private</span>
                  </label>
                </div>
              </div>
              
              <div class="contact-info" style="display: none;">
                <label>Contact info for follow-up (optional)</label>
                <input type="email" id="breakthrough-email" placeholder="your@email.com">
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn-skip" onclick="window.breakthroughFeedback.dismissBreakthroughModal()">
                Skip for now
              </button>
              <button class="btn-submit" onclick="window.breakthroughFeedback.submitBreakthrough('${breakthrough.id}')">
                Share My Story
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10005;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;

    this.addBreakthroughStyles();
    document.body.appendChild(modal);

    // Setup interactive elements
    this.setupBreakthroughModalInteractions(modal);
  }

  setupBreakthroughModalInteractions(modal) {
    // Impact rating buttons
    modal.querySelectorAll('.impact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.impact-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    // Sharing permission radio buttons
    modal.querySelectorAll('input[name="sharing"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const contactInfo = modal.querySelector('.contact-info');
        if (radio.value === 'attributed' || radio.value === 'full') {
          contactInfo.style.display = 'block';
        } else {
          contactInfo.style.display = 'none';
        }
      });
    });
  }

  addBreakthroughStyles() {
    if (document.getElementById('breakthrough-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'breakthrough-styles';
    styles.textContent = `
      .breakthrough-suggestion-backdrop, .breakthrough-modal-backdrop {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        animation: fadeIn 0.3s ease;
      }
      
      .breakthrough-suggestion-content {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(99, 102, 241, 0.95));
        border-radius: 16px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        color: white;
        text-align: center;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideUp 0.4s ease;
      }
      
      .breakthrough-modal-content {
        background: linear-gradient(135deg, rgba(26, 32, 44, 0.98), rgba(45, 55, 72, 0.95));
        border-radius: 20px;
        padding: 0;
        max-width: 600px;
        width: 90%;
        max-height: 85vh;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        color: white;
        animation: slideUp 0.4s ease;
      }
      
      .suggestion-header {
        margin-bottom: 20px;
      }
      
      .suggestion-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      
      .suggestion-header h3 {
        margin: 0 0 12px 0;
        font-size: 20px;
        color: white;
      }
      
      .suggestion-text {
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.5;
        margin-bottom: 24px;
      }
      
      .suggestion-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
      }
      
      .btn-no, .btn-yes {
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        font-family: inherit;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .btn-no {
        background: rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
      }
      
      .btn-no:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .btn-yes {
        background: rgba(255, 255, 255, 0.9);
        color: #6366F1;
      }
      
      .btn-yes:hover {
        background: white;
        transform: translateY(-2px);
      }
      
      .breakthrough-header {
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2));
        padding: 32px;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .celebration-animation {
        font-size: 48px;
        margin-bottom: 16px;
        animation: pulse 2s infinite;
      }
      
      .breakthrough-header h2 {
        margin: 0 0 12px 0;
        color: #A78BFA;
        font-size: 28px;
        font-weight: 700;
      }
      
      .breakthrough-description {
        color: #E2E8F0;
        font-size: 16px;
        margin: 0;
        line-height: 1.5;
      }
      
      .breakthrough-form {
        padding: 32px;
      }
      
      .form-section h3 {
        margin: 0 0 8px 0;
        color: #60A5FA;
        font-size: 20px;
      }
      
      .form-description {
        color: #CBD5E1;
        margin-bottom: 24px;
        font-size: 14px;
        line-height: 1.5;
      }
      
      .form-section {
        margin-bottom: 24px;
      }
      
      .form-section label {
        display: block;
        color: #E2E8F0;
        font-weight: 500;
        margin-bottom: 12px;
      }
      
      .impact-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 8px;
        margin-bottom: 24px;
      }
      
      .impact-btn {
        padding: 12px 8px;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        color: white;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
      }
      
      .impact-btn:hover, .impact-btn.selected {
        background: rgba(139, 92, 246, 0.3);
        border-color: #8B5CF6;
        transform: scale(1.05);
      }
      
      #breakthrough-story {
        width: 100%;
        min-height: 120px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 16px;
        color: white;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.5;
        resize: vertical;
      }
      
      #breakthrough-story::placeholder {
        color: #9CA3AF;
      }
      
      .context-questions h4 {
        color: #A78BFA;
        margin: 0 0 16px 0;
        font-size: 16px;
      }
      
      .context-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 24px;
      }
      
      .context-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        font-size: 14px;
        margin: 0;
      }
      
      .context-item:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .context-item input[type="checkbox"] {
        accent-color: #8B5CF6;
      }
      
      .sharing-permission h4 {
        color: #22C55E;
        margin: 0 0 8px 0;
        font-size: 16px;
      }
      
      .sharing-description {
        color: #CBD5E1;
        font-size: 14px;
        margin-bottom: 16px;
      }
      
      .sharing-options {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
      }
      
      .sharing-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        margin: 0;
        font-size: 14px;
      }
      
      .sharing-option:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .sharing-option input[type="radio"] {
        accent-color: #22C55E;
      }
      
      #breakthrough-email {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 12px;
        color: white;
        font-family: inherit;
      }
      
      #breakthrough-email::placeholder {
        color: #9CA3AF;
      }
      
      .modal-actions {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        padding-top: 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .btn-skip, .btn-submit {
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
        color: #9CA3AF;
      }
      
      .btn-skip:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #CBD5E1;
      }
      
      .btn-submit {
        background: linear-gradient(135deg, #22C55E, #16A34A);
        color: white;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
      }
      
      .btn-submit:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `;

    document.head.appendChild(styles);
  }

  async submitBreakthrough(breakthroughId) {
    try {
      const modal = document.getElementById('breakthrough-feedback-modal');
      
      // Collect all form data
      const selectedImpact = modal.querySelector('.impact-btn.selected')?.dataset.impact;
      const story = modal.querySelector('#breakthrough-story').value;
      const contexts = Array.from(modal.querySelectorAll('.context-item input:checked'))
        .map(input => input.value);
      const sharing = modal.querySelector('input[name="sharing"]:checked')?.value;
      const email = modal.querySelector('#breakthrough-email').value;
      
      const testimonial = {
        id: Date.now() + Math.random(),
        breakthroughId,
        impact: selectedImpact ? parseInt(selectedImpact) : null,
        story,
        contexts,
        sharingPermission: sharing,
        email,
        timestamp: Date.now(),
        sessionId: this.currentSession.startTime
      };

      // Store locally
      this.testimonials.push(testimonial);
      this.saveTestimonials();

      // Submit via IPC if available
      if (window.electronAPI?.submitBreakthroughTestimonial) {
        await window.electronAPI.submitBreakthroughTestimonial(testimonial);
      }

      // Mark breakthrough as captured
      const breakthrough = this.breakthroughQueue.find(b => b.id == breakthroughId);
      if (breakthrough) {
        breakthrough.captured = true;
      }

      // Show thank you and potential viral sharing
      this.showBreakthroughThankYou(testimonial);

      console.log('📝 Breakthrough testimonial submitted:', testimonial);

    } catch (error) {
      console.error('Failed to submit breakthrough testimonial:', error);
      alert('Failed to submit testimonial. Please try again.');
    }
  }

  showBreakthroughThankYou(testimonial) {
    const modal = document.getElementById('breakthrough-feedback-modal');
    
    modal.innerHTML = `
      <div class="breakthrough-modal-backdrop">
        <div class="breakthrough-modal-content">
          <div class="breakthrough-header">
            <div class="celebration-animation">🙏💫✨</div>
            <h2>Thank You for Sharing!</h2>
            <p class="breakthrough-description">
              Your story helps other neurodivergent minds discover tools that actually work.
            </p>
          </div>
          
          <div class="breakthrough-form">
            ${testimonial.impact >= 8 ? `
              <div style="background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #22C55E;">
                <h3 style="color: #22C55E; margin: 0 0 12px 0;">Help Others Discover Velvet!</h3>
                <p style="color: #E5E7EB; margin: 0 0 16px 0; font-size: 14px;">
                  Your breakthrough could inspire other neurodivergent minds. Want to share your story?
                </p>
                <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                  <button class="btn-secondary" onclick="window.breakthroughFeedback.shareBreakthroughToSocial('twitter', '${testimonial.id}')" style="background: rgba(29, 161, 242, 0.2); border-color: #1DA1F2;">
                    Share on Twitter
                  </button>
                  <button class="btn-secondary" onclick="window.breakthroughFeedback.shareBreakthroughToSocial('linkedin', '${testimonial.id}')" style="background: rgba(10, 102, 194, 0.2); border-color: #0A66C2;">
                    Share on LinkedIn
                  </button>
                  <button class="btn-secondary" onclick="window.breakthroughFeedback.generateBreakthroughReferral('${testimonial.id}')">
                    Invite a Friend
                  </button>
                </div>
              </div>
            ` : ''}
            
            <div style="text-align: center; padding: 20px;">
              <p style="color: #CBD5E1; margin-bottom: 24px;">
                Your feedback helps us make Velvet better for the entire neurodivergent community.
              </p>
              <button class="btn-submit" onclick="document.getElementById('breakthrough-feedback-modal').remove()">
                Continue Using Velvet
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Auto-close after 8 seconds
    setTimeout(() => {
      if (document.getElementById('breakthrough-feedback-modal')) {
        modal.remove();
      }
    }, 8000);
  }

  shareBreakthroughToSocial(platform, testimonialId) {
    const testimonial = this.testimonials.find(t => t.id == testimonialId);
    if (!testimonial || testimonial.sharingPermission === 'private') return;

    const shareMessages = {
      twitter: `🤯 Just had a breakthrough with @VelvetAI! ${testimonial.story.substring(0, 200)}... Finally, AI that gets how neurodivergent minds work! #VelvetAI #NeurodivergentTech #BreakthroughMoment`,
      linkedin: `Breakthrough moment with Velvet AI: ${testimonial.story.substring(0, 300)}... This is the future of neurodivergent-inclusive technology. #Neurodiversity #AssistiveTech #BreakthroughMoment`
    };

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessages[platform])}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://velvet-ai.app')}&summary=${encodeURIComponent(shareMessages[platform])}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
      this.trackBreakthroughShare(platform, testimonial);
    }
  }

  dismissBreakthroughModal() {
    const modal = document.getElementById('breakthrough-feedback-modal');
    if (modal) {
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.95)';
      modal.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  }

  saveTestimonials() {
    try {
      localStorage.setItem('velvet-breakthrough-testimonials', JSON.stringify(this.testimonials));
    } catch (error) {
      console.error('Failed to save testimonials:', error);
    }
  }

  loadStoredTestimonials() {
    try {
      const stored = localStorage.getItem('velvet-breakthrough-testimonials');
      if (stored) {
        this.testimonials = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load stored testimonials:', error);
    }
  }

  // Static methods for triggering breakthroughs from other components
  static triggerBreakthrough(type, feature, impact, description, emotion = 'positive') {
    window.dispatchEvent(new CustomEvent('velvet-breakthrough', {
      detail: { type, feature, impact, description, emotion }
    }));
  }

  static trackPositiveOutcome(feature, outcome, impact = 7) {
    window.dispatchEvent(new CustomEvent('velvet-positive-outcome', {
      detail: { feature, outcome, impact }
    }));
  }

  static trackFeatureSuccess(feature, successType, details) {
    window.dispatchEvent(new CustomEvent('velvet-feature-success', {
      detail: { feature, successType, details }
    }));
  }

  // Analytics
  getBreakthroughMetrics() {
    return {
      totalBreakthroughs: this.breakthroughQueue.length,
      capturedBreakthroughs: this.breakthroughQueue.filter(b => b.captured).length,
      totalTestimonials: this.testimonials.length,
      shareableTestimonials: this.testimonials.filter(t => t.sharingPermission !== 'private').length,
      averageImpact: this.testimonials.length > 0 
        ? this.testimonials.reduce((sum, t) => sum + (t.impact || 0), 0) / this.testimonials.length 
        : 0,
      topContexts: this.getTopContexts()
    };
  }

  getTopContexts() {
    const contextCounts = {};
    this.testimonials.forEach(t => {
      t.contexts?.forEach(context => {
        contextCounts[context] = (contextCounts[context] || 0) + 1;
      });
    });
    
    return Object.entries(contextCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([context, count]) => ({ context, count }));
  }
}

// Initialize breakthrough feedback system
window.breakthroughFeedback = new BreakthroughFeedbackSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BreakthroughFeedbackSystem;
}