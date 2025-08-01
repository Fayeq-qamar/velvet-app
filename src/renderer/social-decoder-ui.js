// Social Decoder UI Integration - Phase 2 Viral Feature
// Provides real-time neurotypical translation interface

class SocialDecoderUI {
    constructor() {
        this.socialDecoder = null;
        this.isVisible = false;
        this.currentAnalysis = null;
        this.notificationElement = null;
        this.detailsPanelElement = null;
        
        // UI Configuration
        this.config = {
            showNotifications: true,
            autoHideDelay: 8000, // 8 seconds
            minimumConfidence: 0.6, // Only show high-confidence detections
            enableSuggestions: true,
            whisperMode: true // Gentle, non-intrusive notifications
        };
    }

    // Initialize the Social Decoder UI
    async initialize(socialDecoderInstance) {
        try {
            console.log('🎭 Initializing Social Decoder UI...');
            
            this.socialDecoder = socialDecoderInstance;
            
            // Create UI elements
            this.createNotificationElement();
            this.createDetailsPanelElement();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Register with Social Decoder for callbacks
            this.socialDecoder.onSocialCueDetected((analysis) => {
                this.handleSocialCueDetection(analysis);
            });
            
            console.log('✅ Social Decoder UI initialized');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to initialize Social Decoder UI:', error);
            return false;
        }
    }

    // Create the notification element for social cue alerts
    createNotificationElement() {
        this.notificationElement = document.createElement('div');
        this.notificationElement.id = 'socialDecoderNotification';
        this.notificationElement.className = 'social-decoder-notification hidden';
        
        this.notificationElement.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <span class="icon">🧠</span>
                    <span class="title">Social Decoder</span>
                    <button class="close-btn" onclick="socialDecoderUI.hideNotification()">×</button>
                </div>
                <div class="notification-body">
                    <div class="original-text"></div>
                    <div class="translation"></div>
                    <div class="confidence-indicator"></div>
                </div>
                <div class="notification-actions">
                    <button class="suggestion-btn" onclick="socialDecoderUI.showSuggestions()">
                        💡 See Suggestions
                    </button>
                    <button class="details-btn" onclick="socialDecoderUI.showDetails()">
                        📊 Details
                    </button>
                </div>
            </div>
        `;

        // Add CSS styles for the notification
        this.addNotificationStyles();
        
        // Append to body
        document.body.appendChild(this.notificationElement);
    }

    // Create the detailed analysis panel
    createDetailsPanelElement() {
        this.detailsPanelElement = document.createElement('div');
        this.detailsPanelElement.id = 'socialDecoderDetails';
        this.detailsPanelElement.className = 'social-decoder-details hidden';
        
        this.detailsPanelElement.innerHTML = `
            <div class="details-panel">
                <div class="panel-header">
                    <h3>🧠 Social Analysis</h3>
                    <button class="close-btn" onclick="socialDecoderUI.hideDetails()">×</button>
                </div>
                <div class="panel-content">
                    <div class="analysis-section">
                        <h4>Original Message</h4>
                        <div class="original-message"></div>
                    </div>
                    <div class="analysis-section">
                        <h4>Neurotypical Translation</h4>
                        <div class="translation-details"></div>
                    </div>
                    <div class="analysis-section">
                        <h4>Emotional Subtext</h4>
                        <div class="emotional-analysis"></div>
                    </div>
                    <div class="analysis-section">
                        <h4>Suggested Responses</h4>
                        <div class="response-suggestions"></div>
                    </div>
                    <div class="analysis-section">
                        <h4>Confidence & Markers</h4>
                        <div class="confidence-breakdown"></div>
                    </div>
                </div>
            </div>
        `;

        // Add CSS styles for the details panel
        this.addDetailsPanelStyles();
        
        // Append to body
        document.body.appendChild(this.detailsPanelElement);
    }

    // Handle social cue detection from the decoder
    handleSocialCueDetection(analysis) {
        if (!analysis || analysis.confidence < this.config.minimumConfidence) {
            return; // Skip low-confidence detections
        }

        this.currentAnalysis = analysis;
        
        // Show notification in whisper mode
        if (this.config.showNotifications && this.config.whisperMode) {
            this.showWhisperNotification(analysis);
        }
        
        // Log for debugging
        console.log('🎭 Social cue detected:', {
            confidence: (analysis.confidence * 100).toFixed(1) + '%',
            translation: analysis.translation.directMeaning,
            suggestions: analysis.suggestions.length
        });
    }

    // Show gentle whisper notification
    showWhisperNotification(analysis) {
        const notification = this.notificationElement;
        
        // Populate notification content
        notification.querySelector('.original-text').textContent = 
            `"${analysis.original}"`;
        
        notification.querySelector('.translation').innerHTML = 
            `💭 ${analysis.translation.directMeaning}`;
        
        notification.querySelector('.confidence-indicator').innerHTML = 
            `🎯 ${(analysis.confidence * 100).toFixed(0)}% confident`;

        // Show the notification with gentle animation
        notification.classList.remove('hidden');
        notification.classList.add('visible');
        
        // Auto-hide after delay
        if (this.config.autoHideDelay > 0) {
            setTimeout(() => {
                this.hideNotification();
            }, this.config.autoHideDelay);
        }
        
        this.isVisible = true;
    }

    // Show response suggestions
    showSuggestions() {
        if (!this.currentAnalysis || !this.currentAnalysis.suggestions) return;
        
        const suggestions = this.currentAnalysis.suggestions;
        let suggestionsHtml = '';
        
        suggestions.forEach((suggestion, index) => {
            suggestionsHtml += `
                <div class="suggestion-item" onclick="socialDecoderUI.copySuggestion('${suggestion.text}')">
                    <div class="suggestion-text">"${suggestion.text}"</div>
                    <div class="suggestion-explanation">${suggestion.explanation}</div>
                </div>
            `;
        });
        
        // Update the details panel with suggestions
        this.detailsPanelElement.querySelector('.response-suggestions').innerHTML = suggestionsHtml;
        this.showDetails();
    }

    // Show detailed analysis panel
    showDetails() {
        if (!this.currentAnalysis) return;
        
        const details = this.detailsPanelElement;
        const analysis = this.currentAnalysis;
        
        // Populate details
        details.querySelector('.original-message').textContent = analysis.original;
        details.querySelector('.translation-details').innerHTML = `
            <p><strong>Direct meaning:</strong> ${analysis.translation.directMeaning}</p>
            ${analysis.translation.hiddenMeaning ? 
                `<p><strong>Hidden meaning:</strong> ${analysis.translation.hiddenMeaning}</p>` : ''
            }
            ${analysis.translation.actionNeeded ? 
                `<p><strong>Suggested action:</strong> ${analysis.translation.actionNeeded}</p>` : ''
            }
        `;
        
        details.querySelector('.emotional-analysis').innerHTML = 
            analysis.translation.emotionalSubtext || 'No strong emotional markers detected';
        
        // Show confidence breakdown
        details.querySelector('.confidence-breakdown').innerHTML = `
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${analysis.confidence * 100}%"></div>
            </div>
            <p>Overall confidence: ${(analysis.confidence * 100).toFixed(1)}%</p>
        `;
        
        // Show the details panel
        details.classList.remove('hidden');
        details.classList.add('visible');
    }

    // Copy suggestion to clipboard and provide feedback
    copySuggestion(text) {
        navigator.clipboard.writeText(text).then(() => {
            // Show brief feedback
            const feedback = document.createElement('div');
            feedback.className = 'copy-feedback';
            feedback.textContent = '✅ Copied to clipboard!';
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(37, 99, 235, 0.9);
                color: white;
                padding: 12px 24px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
                z-index: 10000;
                pointer-events: none;
                backdrop-filter: blur(10px);
            `;
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 2000);
            
        }).catch(err => {
            console.error('Failed to copy text:', err);
        });
    }

    // Hide notification
    hideNotification() {
        this.notificationElement.classList.remove('visible');
        this.notificationElement.classList.add('hidden');
        this.isVisible = false;
    }

    // Hide details panel
    hideDetails() {
        this.detailsPanelElement.classList.remove('visible');
        this.detailsPanelElement.classList.add('hidden');
    }

    // Add CSS styles for notifications
    addNotificationStyles() {
        if (document.getElementById('socialDecoderStyles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'socialDecoderStyles';
        styles.textContent = `
            .social-decoder-notification {
                position: fixed;
                top: 100px;
                right: 30px;
                width: 380px;
                background: linear-gradient(135deg, 
                    rgba(15, 23, 42, 0.97) 0%,
                    rgba(30, 41, 59, 0.92) 50%,
                    rgba(15, 23, 42, 0.97) 100%
                );
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 20px;
                backdrop-filter: blur(24px);
                -webkit-backdrop-filter: blur(24px);
                box-shadow: 
                    0 25px 50px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                color: rgba(255, 255, 255, 0.95);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0;
                transform: translateX(100px) scale(0.9);
                pointer-events: auto;
            }
            
            .social-decoder-notification.visible {
                opacity: 1;
                transform: translateX(0) scale(1);
            }
            
            .social-decoder-notification.hidden {
                opacity: 0;
                transform: translateX(100px) scale(0.9);
                pointer-events: none;
            }
            
            .notification-content {
                padding: 24px;
            }
            
            .notification-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid rgba(59, 130, 246, 0.2);
            }
            
            .notification-header .icon {
                font-size: 20px;
                margin-right: 10px;
                filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
            }
            
            .notification-header .title {
                font-weight: 600;
                color: rgba(96, 165, 250, 0.95);
                flex: 1;
                font-size: 16px;
                letter-spacing: -0.02em;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: #94a3b8;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }
            
            .close-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .notification-body {
                margin-bottom: 16px;
            }
            
            .original-text {
                font-style: italic;
                color: #94a3b8;
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .translation {
                font-weight: 500;
                margin-bottom: 8px;
                line-height: 1.4;
            }
            
            .confidence-indicator {
                font-size: 12px;
                color: #60a5fa;
            }
            
            .notification-actions {
                display: flex;
                gap: 8px;
            }
            
            .suggestion-btn, .details-btn {
                background: linear-gradient(135deg, 
                    rgba(37, 99, 235, 0.25) 0%, 
                    rgba(6, 182, 212, 0.2) 100%
                );
                border: 1px solid rgba(59, 130, 246, 0.3);
                color: rgba(255, 255, 255, 0.9);
                padding: 10px 16px;
                border-radius: 12px;
                font-size: 13px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                white-space: nowrap;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }
            
            .suggestion-btn:hover, .details-btn:hover {
                background: linear-gradient(135deg, 
                    rgba(37, 99, 235, 0.35) 0%, 
                    rgba(6, 182, 212, 0.3) 100%
                );
                border-color: rgba(59, 130, 246, 0.5);
                transform: translateY(-1px);
                box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
            }
        `;
        
        document.head.appendChild(styles);
    }

    // Add CSS styles for details panel
    addDetailsPanelStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .social-decoder-details {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                width: 520px;
                max-height: 650px;
                background: linear-gradient(135deg, 
                    rgba(15, 23, 42, 0.97) 0%,
                    rgba(30, 41, 59, 0.92) 50%,
                    rgba(15, 23, 42, 0.97) 100%
                );
                border: 2px solid rgba(59, 130, 246, 0.4);
                border-radius: 24px;
                backdrop-filter: blur(32px);
                -webkit-backdrop-filter: blur(32px);
                box-shadow: 
                    0 40px 80px rgba(0, 0, 0, 0.6),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                color: rgba(255, 255, 255, 0.95);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                opacity: 0;
                pointer-events: auto;
            }
            
            .social-decoder-details.visible {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            
            .social-decoder-details.hidden {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
                pointer-events: none;
            }
            
            .details-panel {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            
            .panel-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 24px;
                border-bottom: 1px solid rgba(37, 99, 235, 0.2);
            }
            
            .panel-header h3 {
                margin: 0;
                color: #60a5fa;
                font-size: 18px;
                font-weight: 600;
            }
            
            .panel-content {
                flex: 1;
                padding: 24px;
                overflow-y: auto;
            }
            
            .analysis-section {
                margin-bottom: 24px;
            }
            
            .analysis-section h4 {
                margin: 0 0 12px 0;
                color: #94a3b8;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .analysis-section > div {
                background: rgba(37, 99, 235, 0.1);
                border: 1px solid rgba(37, 99, 235, 0.2);
                border-radius: 12px;
                padding: 16px;
                line-height: 1.5;
            }
            
            .suggestion-item {
                background: rgba(6, 182, 212, 0.1);
                border: 1px solid rgba(6, 182, 212, 0.2);
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .suggestion-item:hover {
                background: rgba(6, 182, 212, 0.2);
                border-color: rgba(6, 182, 212, 0.3);
            }
            
            .suggestion-text {
                font-weight: 500;
                margin-bottom: 8px;
                color: #67e8f9;
            }
            
            .suggestion-explanation {
                font-size: 13px;
                color: #94a3b8;
                font-style: italic;
            }
            
            .confidence-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 8px;
            }
            
            .confidence-fill {
                height: 100%;
                background: linear-gradient(90deg, #ef4444, #eab308, #22c55e);
                transition: width 0.3s ease;
            }
        `;
        
        document.head.appendChild(styles);
    }

    // Setup event listeners
    setupEventListeners() {
        // Listen for escape key to close panels
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideNotification();
                this.hideDetails();
            }
        });
        
        // Close panels when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isVisible && !this.notificationElement.contains(e.target)) {
                // Don't auto-close if user is interacting with details panel
                if (!this.detailsPanelElement.contains(e.target)) {
                    this.hideNotification();
                }
            }
        });
    }

    // Public API methods
    enable() {
        this.config.showNotifications = true;
        console.log('🎭 Social Decoder UI enabled');
    }

    disable() {
        this.config.showNotifications = false;
        this.hideNotification();
        this.hideDetails();
        console.log('🎭 Social Decoder UI disabled');
    }

    setConfidenceThreshold(threshold) {
        this.config.minimumConfidence = Math.max(0, Math.min(1, threshold));
        console.log(`🎭 Confidence threshold set to ${(threshold * 100).toFixed(0)}%`);
    }

    toggleWhisperMode() {
        this.config.whisperMode = !this.config.whisperMode;
        console.log(`🎭 Whisper mode ${this.config.whisperMode ? 'enabled' : 'disabled'}`);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SocialDecoderUI;
} else {
    window.SocialDecoderUI = SocialDecoderUI;
}

// Global instance for easy access
if (typeof window !== 'undefined') {
    window.socialDecoderUI = null; // Will be initialized when Social Decoder is ready
}