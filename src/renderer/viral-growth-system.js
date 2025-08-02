/**
 * Viral Growth System for Velvet AI Assistant
 * Detects breakthrough moments and facilitates authentic sharing
 */

class ViralGrowthSystem {
  constructor() {
    this.isInitialized = false;
    this.breakthroughMoments = [];
    this.sharingPrompts = [];
    this.referralCodes = new Set();
    this.viralMetrics = {
      breakthroughsDetected: 0,
      sharesTriggered: 0,
      sharesCompleted: 0,
      referralsGenerated: 0,
      viralScore: 0
    };
    
    this.init();
  }

  async init() {
    try {
      this.setupBreakthroughDetection();
      this.createSharingUI();
      this.setupReferralSystem();
      this.initializeViralTracking();
      this.isInitialized = true;
      
      console.log('✅ Viral growth system initialized');
    } catch (error) {
      console.error('❌ Failed to initialize viral growth system:', error);
    }
  }

  setupBreakthroughDetection() {
    // Listen for feature breakthrough events
    window.addEventListener('velvet-breakthrough', (event) => {
      this.handleBreakthroughMoment(event.detail);
    });

    // Track high-impact positive feedback
    window.addEventListener('velvet-positive-outcome', (event) => {
      this.analyzeForBreakthrough(event.detail);
    });

    // Monitor sustained engagement patterns
    setInterval(() => {
      this.detectEngagementBreakthroughs();
    }, 30000); // Check every 30 seconds
  }

  handleBreakthroughMoment(momentData) {
    const breakthrough = {
      id: Date.now() + Math.random(),
      type: momentData.type,
      feature: momentData.feature,
      impact: momentData.impact,
      userEmotion: momentData.emotion || 'positive',
      description: momentData.description,
      timestamp: Date.now(),
      shared: false
    };

    this.breakthroughMoments.push(breakthrough);
    this.viralMetrics.breakthroughsDetected++;

    // Show sharing prompt based on breakthrough type
    if (this.shouldPromptSharing(breakthrough)) {
      setTimeout(() => {
        this.showSharingPrompt(breakthrough);
      }, 2000); // Wait 2 seconds to let user process the moment
    }

    // Track for analytics
    this.trackViralEvent('breakthrough_detected', {
      type: breakthrough.type,
      feature: breakthrough.feature,
      impact: breakthrough.impact
    });
  }

  shouldPromptSharing(breakthrough) {
    // Only prompt for high-impact breakthroughs
    if (breakthrough.impact < 7) return false;

    // Don't overwhelm users with too many sharing prompts
    const recentPrompts = this.sharingPrompts.filter(
      prompt => Date.now() - prompt.timestamp < 24 * 60 * 60 * 1000
    ).length;
    
    if (recentPrompts >= 2) return false;

    // Specific breakthrough types that are highly shareable
    const shareableTypes = [
      'social-decoder-revelation',
      'task-breakdown-success',
      'hyperfocus-protection',
      'masking-fatigue-recognition',
      'executive-function-assist'
    ];

    return shareableTypes.includes(breakthrough.type);
  }

  showSharingPrompt(breakthrough) {
    const prompt = document.createElement('div');
    prompt.id = 'viral-sharing-prompt';
    prompt.innerHTML = `
      <div class="sharing-prompt-backdrop">
        <div class="sharing-prompt-content">
          <div class="breakthrough-celebration">
            <div class="celebration-icon">${this.getBreakthroughIcon(breakthrough.type)}</div>
            <h3>Amazing breakthrough!</h3>
            <p class="breakthrough-description">${breakthrough.description}</p>
          </div>
          
          <div class="sharing-section">
            <h4>Want to help other neurodivergent minds discover this?</h4>
            <p class="sharing-explanation">
              Sharing your breakthrough helps other people like you find tools that actually work.
              Your story could be the spark someone needs! ✨
            </p>
            
            <div class="sharing-options">
              <button class="share-btn twitter" onclick="window.viralGrowth.shareToTwitter('${breakthrough.id}')">
                <span class="share-icon">🐦</span>
                Share on Twitter
              </button>
              <button class="share-btn linkedin" onclick="window.viralGrowth.shareToLinkedIn('${breakthrough.id}')">
                <span class="share-icon">💼</span>
                Share on LinkedIn
              </button>
              <button class="share-btn generic" onclick="window.viralGrowth.copyShareText('${breakthrough.id}')">
                <span class="share-icon">📋</span>
                Copy Share Text
              </button>
            </div>
            
            <div class="privacy-note">
              <small>🔒 You can edit the message before sharing. No personal data included.</small>
            </div>
          </div>
          
          <div class="prompt-actions">
            <button class="btn-skip" onclick="window.viralGrowth.dismissSharingPrompt()">
              Maybe Later
            </button>
            <button class="btn-refer" onclick="window.viralGrowth.showReferralOptions('${breakthrough.id}')">
              Invite a Friend Instead
            </button>
          </div>
        </div>
      </div>
    `;

    prompt.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10002;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;

    this.addSharingStyles();
    document.body.appendChild(prompt);

    // Track sharing prompt shown
    this.viralMetrics.sharesTriggered++;
    this.sharingPrompts.push({
      breakthroughId: breakthrough.id,
      timestamp: Date.now(),
      dismissed: false
    });

    this.trackViralEvent('sharing_prompt_shown', {
      breakthroughType: breakthrough.type,
      breakthroughImpact: breakthrough.impact
    });
  }

  addSharingStyles() {
    if (document.getElementById('viral-sharing-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'viral-sharing-styles';
    styles.textContent = `
      .sharing-prompt-backdrop {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        animation: fadeIn 0.3s ease;
      }
      
      .sharing-prompt-content {
        background: linear-gradient(135deg, rgba(26, 32, 44, 0.98), rgba(45, 55, 72, 0.95));
        border-radius: 20px;
        padding: 32px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        color: white;
        animation: slideUp 0.4s ease;
      }
      
      .breakthrough-celebration {
        text-align: center;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .celebration-icon {
        font-size: 48px;
        margin-bottom: 16px;
      }
      
      .breakthrough-celebration h3 {
        margin: 0 0 12px 0;
        color: #60A5FA;
        font-size: 24px;
        font-weight: 700;
      }
      
      .breakthrough-description {
        color: #E2E8F0;
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
      }
      
      .sharing-section h4 {
        color: #A78BFA;
        font-size: 18px;
        margin: 0 0 12px 0;
      }
      
      .sharing-explanation {
        color: #CBD5E1;
        font-size: 14px;
        line-height: 1.5;
        margin: 0 0 24px 0;
      }
      
      .sharing-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;
      }
      
      .share-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border: none;
        border-radius: 10px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .share-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }
      
      .share-btn.twitter:hover {
        background: rgba(29, 161, 242, 0.3);
        border-color: #1DA1F2;
      }
      
      .share-btn.linkedin:hover {
        background: rgba(10, 102, 194, 0.3);
        border-color: #0A66C2;
      }
      
      .share-icon {
        font-size: 18px;
      }
      
      .privacy-note {
        text-align: center;
        color: #9CA3AF;
        margin-bottom: 24px;
      }
      
      .prompt-actions {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding-top: 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .btn-skip, .btn-refer {
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        font-family: inherit;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      
      .btn-skip {
        background: rgba(255, 255, 255, 0.1);
        color: #9CA3AF;
        flex: 1;
      }
      
      .btn-skip:hover {
        background: rgba(255, 255, 255, 0.2);
        color: #CBD5E1;
      }
      
      .btn-refer {
        background: linear-gradient(135deg, #8B5CF6, #A78BFA);
        color: white;
        flex: 1;
      }
      
      .btn-refer:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
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
    `;

    document.head.appendChild(styles);
  }

  getBreakthroughIcon(type) {
    const icons = {
      'social-decoder-revelation': '🔍💡',
      'task-breakdown-success': '🎯✨',
      'hyperfocus-protection': '🛡️⏰',
      'masking-fatigue-recognition': '🎭💙',
      'executive-function-assist': '🧠💪',
      'productivity-breakthrough': '🚀📈',
      'emotional-support': '💖🤗',
      'clarity-moment': '💡🌟'
    };
    
    return icons[type] || '🎉✨';
  }

  shareToTwitter(breakthroughId) {
    const breakthrough = this.breakthroughMoments.find(b => b.id == breakthroughId);
    if (!breakthrough) return;

    const shareText = this.generateShareText(breakthrough, 'twitter');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    
    window.open(twitterUrl, '_blank');
    this.trackViralShare('twitter', breakthrough);
  }

  shareToLinkedIn(breakthroughId) {
    const breakthrough = this.breakthroughMoments.find(b => b.id == breakthroughId);
    if (!breakthrough) return;

    const shareText = this.generateShareText(breakthrough, 'linkedin');
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://velvet-ai.app')}&summary=${encodeURIComponent(shareText)}`;
    
    window.open(linkedInUrl, '_blank');
    this.trackViralShare('linkedin', breakthrough);
  }

  copyShareText(breakthroughId) {
    const breakthrough = this.breakthroughMoments.find(b => b.id == breakthroughId);
    if (!breakthrough) return;

    const shareText = this.generateShareText(breakthrough, 'generic');
    
    navigator.clipboard.writeText(shareText).then(() => {
      this.showCopySuccess();
      this.trackViralShare('copy', breakthrough);
    }).catch(() => {
      // Fallback for older browsers
      this.showShareTextModal(shareText);
    });
  }

  generateShareText(breakthrough, platform) {
    const templates = {
      'social-decoder-revelation': {
        twitter: `🤯 @VelvetAI just decoded a conversation for me and I finally understood what my coworker actually meant! This AI gets how neurodivergent brains process social cues. Game changer! #SocialDecoder #NeurodivergentTech #ADHD #Autism`,
        linkedin: `Breakthrough moment: Velvet AI's Social Decoder feature just helped me understand the subtext in a workplace conversation. As someone who's neurodivergent, this kind of assistive technology is exactly what we need to thrive in professional environments. #Neurodiversity #AssistiveTech #WorkplaceInclusion`,
        generic: `Mind blown! 🤯 Velvet AI just helped me decode a social interaction that would have left me confused for days. Finally, technology that understands how neurodivergent minds work! #VelvetAI #NeurodivergentTech`
      },
      'task-breakdown-success': {
        twitter: `✨ That overwhelming project that was paralyzing me? @VelvetAI broke it into 23 tiny steps I could actually do. Went from "impossible" to "done" in 2 hours! #TaskBreakdown #ExecutiveFunction #ADHD #ProductivityWin`,
        linkedin: `Professional breakthrough: Velvet AI transformed my task paralysis into actionable progress by breaking down complex projects into neurodivergent-friendly micro-steps. This is the future of inclusive productivity tools. #ExecutiveFunction #Neurodiversity #ProductivityTools`,
        generic: `🎯 Just conquered a project that felt impossible thanks to Velvet AI breaking it into bite-sized pieces. Finally, a tool that works WITH my ADHD brain! #VelvetAI #ExecutiveFunction`
      },
      'hyperfocus-protection': {
        twitter: `⏰ @VelvetAI just gently reminded me to eat after 3 hours of hyperfocus. It protected my flow while caring for my health. This is how assistive tech should work! #HyperfocusSupport #ADHD #SelfCare`,
        linkedin: `Velvet AI demonstrated something beautiful today: it protected my hyperfocus productivity while ensuring I didn't neglect basic self-care. This is assistive technology that truly understands neurodivergent needs. #ADHD #WorkplaceWellness #AssistiveTech`,
        generic: `🛡️ Velvet AI is the hyperfocus guardian I never knew I needed! Keeps me productive while making sure I don't forget to be human. #VelvetAI #HyperfocusSupport`
      }
    };

    const typeTemplates = templates[breakthrough.type];
    if (typeTemplates && typeTemplates[platform]) {
      return typeTemplates[platform];
    }

    // Fallback generic template
    return `🌟 Just had a breakthrough moment with @VelvetAI! ${breakthrough.description} Finally, technology that gets how neurodivergent minds work! #VelvetAI #NeurodivergentTech #BreakthroughMoment`;
  }

  showCopySuccess() {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10B981, #059669);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-weight: 500;
      z-index: 10003;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      animation: slideInRight 0.3s ease;
    `;

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 18px;">✅</span>
        <span>Share text copied! Ready to paste anywhere.</span>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  dismissSharingPrompt() {
    const prompt = document.getElementById('viral-sharing-prompt');
    if (prompt) {
      prompt.style.opacity = '0';
      prompt.style.transform = 'scale(0.95)';
      prompt.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        prompt.remove();
      }, 300);
    }

    this.trackViralEvent('sharing_prompt_dismissed');
  }

  showReferralOptions(breakthroughId) {
    // Close sharing prompt
    this.dismissSharingPrompt();
    
    // Show referral interface
    setTimeout(() => {
      this.showReferralModal(breakthroughId);
    }, 400);
  }

  showReferralModal(breakthroughId) {
    const referralCode = this.generateReferralCode();
    
    const modal = document.createElement('div');
    modal.id = 'viral-referral-modal';
    modal.innerHTML = `
      <div class="sharing-prompt-backdrop">
        <div class="sharing-prompt-content">
          <div class="breakthrough-celebration">
            <div class="celebration-icon">🤝</div>
            <h3>Invite a Friend to Velvet</h3>
            <p class="breakthrough-description">
              Share Velvet with someone who could benefit from neurodivergent-friendly AI support.
            </p>
          </div>
          
          <div class="referral-section">
            <div class="referral-code-container">
              <label>Your Referral Code:</label>
              <div class="referral-code">
                <input type="text" value="${referralCode}" readonly onclick="this.select()">
                <button onclick="window.viralGrowth.copyReferralCode('${referralCode}')">Copy</button>
              </div>
            </div>
            
            <div class="referral-message">
              <label>Personalized Message:</label>
              <textarea id="referral-message" placeholder="Hey! I've been trying this AI assistant called Velvet that's designed specifically for neurodivergent minds. It's been really helpful for [describe your experience]. Thought you might find it useful too! Use code ${referralCode} to get early access.">${this.getDefaultReferralMessage(breakthroughId, referralCode)}</textarea>
            </div>
            
            <div class="referral-actions">
              <button class="share-btn" onclick="window.viralGrowth.shareReferralEmail()">
                <span class="share-icon">📧</span>
                Send via Email
              </button>
              <button class="share-btn" onclick="window.viralGrowth.shareReferralText()">
                <span class="share-icon">💬</span>
                Send via Text
              </button>
              <button class="share-btn" onclick="window.viralGrowth.copyReferralMessage()">
                <span class="share-icon">📋</span>
                Copy Message
              </button>
            </div>
          </div>
          
          <div class="prompt-actions">
            <button class="btn-skip" onclick="window.viralGrowth.dismissReferralModal()">
              Close
            </button>
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
      z-index: 10002;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;

    document.body.appendChild(modal);
    this.referralCodes.add(referralCode);
  }

  generateReferralCode() {
    return 'VELVET' + Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  getDefaultReferralMessage(breakthroughId, referralCode) {
    const breakthrough = this.breakthroughMoments.find(b => b.id == breakthroughId);
    
    if (breakthrough) {
      return `Hey! I just had an amazing breakthrough with this AI assistant called Velvet. ${breakthrough.description} It's specifically designed for neurodivergent minds and actually "gets" how we think. Thought you might find it helpful too! Use code ${referralCode} for early access.`;
    }
    
    return `Hey! I've been trying this AI assistant called Velvet that's designed specifically for neurodivergent minds. It's been really helpful for understanding social cues, breaking down overwhelming tasks, and managing hyperfocus. Thought you might find it useful too! Use code ${referralCode} to get early access.`;
  }

  trackViralShare(platform, breakthrough) {
    this.viralMetrics.sharesCompleted++;
    breakthrough.shared = true;
    
    this.trackViralEvent('content_shared', {
      platform,
      breakthroughType: breakthrough.type,
      breakthroughImpact: breakthrough.impact
    });

    // Calculate viral score boost
    this.updateViralScore('share', platform, breakthrough.impact);
  }

  trackViralEvent(eventName, data = {}) {
    console.log(`🚀 Viral Event: ${eventName}`, data);
    
    // Dispatch event for other systems to listen
    window.dispatchEvent(new CustomEvent('velvet-viral-event', {
      detail: { event: eventName, data, timestamp: Date.now() }
    }));
  }

  updateViralScore(action, context, impact = 5) {
    const scoreMultipliers = {
      breakthrough: 10,
      share: 25,
      referral: 40,
      user_generated_content: 60
    };

    const platformMultipliers = {
      twitter: 1.5,
      linkedin: 1.3,
      copy: 1.0,
      email: 1.2,
      text: 1.1
    };

    const baseScore = scoreMultipliers[action] || 5;
    const platformMultiplier = platformMultipliers[context] || 1.0;
    const impactMultiplier = impact / 5; // Normalize to 1.0 for impact of 5

    const scoreIncrease = Math.round(baseScore * platformMultiplier * impactMultiplier);
    this.viralMetrics.viralScore += scoreIncrease;

    console.log(`📈 Viral score increased by ${scoreIncrease} (${action} on ${context})`);
  }

  // Static method for other components to trigger breakthrough moments
  static triggerBreakthrough(type, feature, impact, description, emotion = 'positive') {
    window.dispatchEvent(new CustomEvent('velvet-breakthrough', {
      detail: { type, feature, impact, description, emotion }
    }));
  }

  // Static method for other components to track positive outcomes
  static trackPositiveOutcome(feature, outcome, impact) {
    window.dispatchEvent(new CustomEvent('velvet-positive-outcome', {
      detail: { feature, outcome, impact }
    }));
  }

  // Utility methods for referral system
  copyReferralCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      this.showCopySuccess();
    });
  }

  copyReferralMessage() {
    const message = document.getElementById('referral-message').value;
    navigator.clipboard.writeText(message).then(() => {
      this.showCopySuccess();
    });
  }

  shareReferralEmail() {
    const message = document.getElementById('referral-message').value;
    const subject = 'Check out Velvet AI - Made for Neurodivergent Minds';
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl);
    
    this.viralMetrics.referralsGenerated++;
    this.trackViralEvent('referral_shared', { method: 'email' });
  }

  shareReferralText() {
    const message = document.getElementById('referral-message').value;
    // On mobile, try to open SMS app
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      window.open(`sms:?body=${encodeURIComponent(message)}`);
    } else {
      // On desktop, copy to clipboard
      this.copyReferralMessage();
    }
    
    this.viralMetrics.referralsGenerated++;
    this.trackViralEvent('referral_shared', { method: 'text' });
  }

  dismissReferralModal() {
    const modal = document.getElementById('viral-referral-modal');
    if (modal) {
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.95)';
      modal.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  }

  // Analytics and reporting
  getViralMetrics() {
    return {
      ...this.viralMetrics,
      breakthroughsShared: this.breakthroughMoments.filter(b => b.shared).length,
      averageBreakthroughImpact: this.breakthroughMoments.length > 0 
        ? this.breakthroughMoments.reduce((sum, b) => sum + b.impact, 0) / this.breakthroughMoments.length 
        : 0,
      topBreakthroughTypes: this.getTopBreakthroughTypes()
    };
  }

  getTopBreakthroughTypes() {
    const typeCounts = {};
    this.breakthroughMoments.forEach(b => {
      typeCounts[b.type] = (typeCounts[b.type] || 0) + 1;
    });
    
    return Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
  }
}

// Initialize viral growth system
window.viralGrowth = new ViralGrowthSystem();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ViralGrowthSystem;
}