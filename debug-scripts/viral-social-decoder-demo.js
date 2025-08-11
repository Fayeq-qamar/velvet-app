// VIRAL SOCIAL DECODER DEMO - Interactive Demonstration System
// Showcases breakthrough neurodivergent features with realistic scenarios

/**
 * ViralSocialDecoderDemo
 * 
 * Interactive demo system that showcases the viral social decoder's capabilities:
 * - Real-time sarcasm detection with breakthrough moments
 * - Emotional subtext translation
 * - Live meeting interventions
 * - Response suggestion templates
 * - Social confidence building scenarios
 * 
 * Designed to create "finally, someone gets it!" moments for users
 */

class ViralSocialDecoderDemo {
    constructor() {
        console.log('🎭 Initializing Viral Social Decoder Demo System...');
        
        this.demoScenarios = {
            sarcasm: [
                {
                    title: 'Workplace Sarcasm',
                    text: "Sure, that deadline is totally realistic. No problem at all.",
                    context: 'Team meeting about impossible timeline',
                    expectedDetection: 'sarcasm',
                    breakthroughMoment: 'Reveals frustration hidden behind polite agreement'
                },
                {
                    title: 'Passive-Aggressive Response',
                    text: "Fine, whatever you think is best. I'm sure it'll work out great.",
                    context: 'Project decision disagreement',
                    expectedDetection: 'sarcasm',
                    breakthroughMoment: 'Exposes reluctant compliance and underlying concerns'
                },
                {
                    title: 'Subtle Dismissal',
                    text: "Oh wonderful, another meeting to discuss the last meeting.",
                    context: 'Calendar invite response',
                    expectedDetection: 'sarcasm',
                    breakthroughMoment: 'Shows frustration with meeting culture'
                }
            ],
            
            emotion: [
                {
                    title: 'Hidden Anxiety',
                    text: "I guess I could try to handle that... maybe it'll be okay.",
                    context: 'Being assigned new responsibility',
                    expectedDetection: 'anxiety',
                    breakthroughMoment: 'Reveals uncertainty masked as willingness'
                },
                {
                    title: 'Overwhelm Signal',
                    text: "I suppose I can fit that in somehow with everything else.",
                    context: 'Additional task request',
                    expectedDetection: 'stress',
                    breakthroughMoment: 'Shows capacity concerns hidden in polite acceptance'
                },
                {
                    title: 'Confidence Mask',
                    text: "No problem, I'm totally on top of this... it's all under control.",
                    context: 'Status update during crisis',
                    expectedDetection: 'false_confidence',
                    breakthroughMoment: 'Reveals stress behind professional facade'
                }
            ],
            
            meeting: [
                {
                    title: 'Team Standup Tension',
                    text: "Everything's going perfectly. No blockers at all.",
                    context: 'Daily standup with known issues',
                    expectedDetection: 'sarcasm',
                    breakthroughMoment: 'Uncovers reluctance to report problems'
                },
                {
                    title: 'Client Call Diplomacy',
                    text: "That's an... interesting approach. I'm sure we can make it work.",
                    context: 'Client suggesting problematic solution',
                    expectedDetection: 'diplomatic_concern',
                    breakthroughMoment: 'Professional disagreement detection'
                },
                {
                    title: 'Performance Review Subtext',
                    text: "I appreciate all the feedback. Very helpful insights.",
                    context: 'Receiving critical performance feedback',
                    expectedDetection: 'defensive_politeness',
                    breakthroughMoment: 'Shows emotional processing behind professional response'
                }
            ]
        };
        
        this.demoState = {
            currentScenario: null,
            demoActive: false,
            realTimeMode: false,
            breakthroughMoments: 0,
            scenariosCompleted: 0
        };
        
        console.log('🎭 Demo system loaded with scenarios:', {
            sarcasm: this.demoScenarios.sarcasm.length,
            emotion: this.demoScenarios.emotion.length,
            meeting: this.demoScenarios.meeting.length
        });
    }
    
    /**
     * Initialize the demo system
     */
    async initialize() {
        if (!window.viralSocialDecoder) {
            console.error('❌ Viral Social Decoder not available - initialize first');
            return false;
        }
        
        console.log('🎭 Initializing Viral Social Decoder Demo...');
        
        // Add demo UI controls
        this.addDemoControls();
        
        // Set up demo event handlers
        this.setupDemoEventHandlers();
        
        console.log('✅ 🎭 Viral Social Decoder Demo ready');
        return true;
    }
    
    /**
     * Add demo controls to the UI
     */
    addDemoControls() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        const demoSection = document.createElement('div');
        demoSection.innerHTML = `
            <div style="margin: 16px 0; padding: 16px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1)); border-radius: 8px; border: 1px solid rgba(34, 197, 94, 0.2);">
                <h4 style="margin: 0 0 12px 0; color: #22c55e; font-size: 14px; font-weight: 600;">🎭 Interactive Demo</h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <button id="demo-sarcasm-scenarios" class="test-button" style="font-size: 12px; padding: 8px 12px;">
                        🎭 Sarcasm Detection Demo
                    </button>
                    <button id="demo-emotion-scenarios" class="test-button" style="font-size: 12px; padding: 8px 12px;">
                        😊 Emotion Analysis Demo
                    </button>
                    <button id="demo-meeting-scenarios" class="test-button" style="font-size: 12px; padding: 8px 12px;">
                        📹 Meeting Context Demo
                    </button>
                    <button id="demo-real-time-mode" class="test-button" style="font-size: 12px; padding: 8px 12px;">
                        ⚡ Real-Time Demo Mode
                    </button>
                    <button id="demo-breakthrough-moments" class="test-button" style="font-size: 12px; padding: 8px 12px;">
                        🎉 Show Breakthrough Stats
                    </button>
                </div>
            </div>
        `;
        
        // Insert after viral social decoder section
        const viralSection = sidebar.querySelector('#viral-social-status')?.closest('div')?.parentElement;
        if (viralSection) {
            viralSection.parentNode.insertBefore(demoSection, viralSection.nextSibling);
        } else {
            sidebar.appendChild(demoSection);
        }
        
        console.log('✅ Demo controls added to UI');
    }
    
    /**
     * Set up demo event handlers
     */
    setupDemoEventHandlers() {
        document.getElementById('demo-sarcasm-scenarios')?.addEventListener('click', () => {
            this.runSarcasmDemo();
        });
        
        document.getElementById('demo-emotion-scenarios')?.addEventListener('click', () => {
            this.runEmotionDemo();
        });
        
        document.getElementById('demo-meeting-scenarios')?.addEventListener('click', () => {
            this.runMeetingDemo();
        });
        
        document.getElementById('demo-real-time-mode')?.addEventListener('click', () => {
            this.toggleRealTimeDemo();
        });
        
        document.getElementById('demo-breakthrough-moments')?.addEventListener('click', () => {
            this.showBreakthroughStats();
        });
        
        console.log('✅ Demo event handlers set up');
    }
    
    /**
     * Run sarcasm detection demo
     */
    async runSarcasmDemo() {
        console.log('🎭 Running Sarcasm Detection Demo...');
        
        if (window.addMessage) {
            window.addMessage('🎭 Starting sarcasm detection demo - watch for breakthrough moments!', 'system');
        }
        
        for (const scenario of this.demoScenarios.sarcasm) {
            console.log(`\n🎭 SCENARIO: ${scenario.title}`);
            console.log(`📝 Context: ${scenario.context}`);
            console.log(`💬 Text: "${scenario.text}"`);
            console.log(`🎯 Expected: ${scenario.expectedDetection}`);
            
            const result = await window.viralSocialDecoder.analyzeText(scenario.text, {
                context: scenario.context,
                demo: true
            });
            
            if (result) {
                const confidence = Math.round((result.confidence || 0) * 100);
                const isSarcastic = result.translation?.hiddenMeaning ? true : false;
                
                console.log(`📊 ANALYSIS RESULT:`);
                console.log(`   - Confidence: ${confidence}%`);
                console.log(`   - Sarcastic: ${isSarcastic ? 'YES' : 'NO'}`);
                console.log(`   - Hidden meaning: ${result.translation?.hiddenMeaning || 'None detected'}`);
                console.log(`   - Emotional subtext: ${result.translation?.emotionalSubtext || 'None'}`);
                
                if (isSarcastic && confidence > 70) {
                    console.log(`🎉 BREAKTHROUGH MOMENT: ${scenario.breakthroughMoment}`);
                    this.recordBreakthroughMoment(scenario, result);
                    
                    if (window.addMessage) {
                        window.addMessage(`🎉 BREAKTHROUGH: ${scenario.title} - ${scenario.breakthroughMoment}`, 'velvet');
                    }
                }
                
                // Show response suggestions
                if (result.suggestions && result.suggestions.length > 0) {
                    console.log(`💡 SUGGESTED RESPONSES:`);
                    result.suggestions.forEach((suggestion, index) => {
                        console.log(`   ${index + 1}. ${suggestion.text}`);
                        console.log(`      (${suggestion.explanation})`);
                    });
                }
                
                console.log(`---`);
            }
            
            // Add delay between scenarios for better demonstration
            await this.sleep(2000);
        }
        
        this.demoState.scenariosCompleted++;
        console.log('✅ Sarcasm detection demo completed');
        
        if (window.addMessage) {
            window.addMessage(`✅ Sarcasm demo complete! ${this.demoState.breakthroughMoments} breakthrough moments detected`, 'system');
        }
    }
    
    /**
     * Run emotion analysis demo
     */
    async runEmotionDemo() {
        console.log('😊 Running Emotion Analysis Demo...');
        
        if (window.addMessage) {
            window.addMessage('😊 Starting emotion analysis demo - detecting hidden feelings!', 'system');
        }
        
        for (const scenario of this.demoScenarios.emotion) {
            console.log(`\n😊 SCENARIO: ${scenario.title}`);
            console.log(`📝 Context: ${scenario.context}`);
            console.log(`💬 Text: "${scenario.text}"`);
            console.log(`🎯 Expected: ${scenario.expectedDetection}`);
            
            const result = await window.viralSocialDecoder.analyzeText(scenario.text, {
                context: scenario.context,
                demo: true
            });
            
            if (result) {
                const confidence = Math.round((result.confidence || 0) * 100);
                
                console.log(`📊 EMOTION ANALYSIS:`);
                console.log(`   - Confidence: ${confidence}%`);
                console.log(`   - Emotional subtext: ${result.translation?.emotionalSubtext || 'None detected'}`);
                console.log(`   - Action needed: ${result.translation?.actionNeeded || 'None'}`);
                
                if (confidence > 65) {
                    console.log(`🎉 BREAKTHROUGH MOMENT: ${scenario.breakthroughMoment}`);
                    this.recordBreakthroughMoment(scenario, result);
                    
                    if (window.addMessage) {
                        window.addMessage(`🎉 EMOTION DETECTED: ${scenario.title} - ${scenario.breakthroughMoment}`, 'velvet');
                    }
                }
                
                console.log(`---`);
            }
            
            await this.sleep(2000);
        }
        
        this.demoState.scenariosCompleted++;
        console.log('✅ Emotion analysis demo completed');
        
        if (window.addMessage) {
            window.addMessage(`✅ Emotion demo complete! Understanding hidden emotional context`, 'system');
        }
    }
    
    /**
     * Run meeting context demo
     */
    async runMeetingDemo() {
        console.log('📹 Running Meeting Context Demo...');
        
        if (window.addMessage) {
            window.addMessage('📹 Starting meeting context demo - professional communication analysis!', 'system');
        }
        
        // Activate meeting mode for demo
        const mockMeetingContext = {
            primaryType: 'call',
            source: 'Demo Meeting',
            confidence: 0.95
        };
        
        await window.viralSocialDecoder.activateMeetingMode(mockMeetingContext);
        
        for (const scenario of this.demoScenarios.meeting) {
            console.log(`\n📹 MEETING SCENARIO: ${scenario.title}`);
            console.log(`📝 Context: ${scenario.context}`);
            console.log(`💬 Text: "${scenario.text}"`);
            console.log(`🎯 Expected: ${scenario.expectedDetection}`);
            
            const result = await window.viralSocialDecoder.analyzeText(scenario.text, {
                context: scenario.context,
                meetingMode: true,
                demo: true
            });
            
            if (result) {
                const confidence = Math.round((result.confidence || 0) * 100);
                
                console.log(`📊 MEETING ANALYSIS:`);
                console.log(`   - Confidence: ${confidence}%`);
                console.log(`   - Professional subtext: ${result.translation?.emotionalSubtext || 'Direct communication'}`);
                console.log(`   - Hidden meaning: ${result.translation?.hiddenMeaning || 'None detected'}`);
                
                if (confidence > 70) {
                    console.log(`🎉 PROFESSIONAL BREAKTHROUGH: ${scenario.breakthroughMoment}`);
                    this.recordBreakthroughMoment(scenario, result);
                    
                    if (window.addMessage) {
                        window.addMessage(`🎉 MEETING INSIGHT: ${scenario.title} - ${scenario.breakthroughMoment}`, 'velvet');
                    }
                }
                
                // Show meeting-specific response suggestions
                if (result.suggestions && result.suggestions.length > 0) {
                    console.log(`💼 PROFESSIONAL RESPONSES:`);
                    result.suggestions.forEach((suggestion, index) => {
                        console.log(`   ${index + 1}. ${suggestion.text}`);
                    });
                }
                
                console.log(`---`);
            }
            
            await this.sleep(2500);
        }
        
        // Deactivate meeting mode
        await window.viralSocialDecoder.deactivateMeetingMode();
        
        this.demoState.scenariosCompleted++;
        console.log('✅ Meeting context demo completed');
        
        if (window.addMessage) {
            window.addMessage(`✅ Meeting demo complete! Professional communication decoded`, 'system');
        }
    }
    
    /**
     * Toggle real-time demo mode
     */
    toggleRealTimeDemo() {
        this.demoState.realTimeMode = !this.demoState.realTimeMode;
        
        if (this.demoState.realTimeMode) {
            console.log('⚡ Real-time demo mode ACTIVATED');
            this.startRealTimeDemo();
            
            if (window.addMessage) {
                window.addMessage('⚡ Real-time demo mode ON - type messages to see live analysis!', 'system');
            }
        } else {
            console.log('⚡ Real-time demo mode DEACTIVATED');
            this.stopRealTimeDemo();
            
            if (window.addMessage) {
                window.addMessage('⚡ Real-time demo mode OFF', 'system');
            }
        }
        
        // Update button text
        const button = document.getElementById('demo-real-time-mode');
        if (button) {
            button.innerHTML = this.demoState.realTimeMode ? 
                '⚡ Real-Time Mode: ON' : 
                '⚡ Real-Time Demo Mode';
        }
    }
    
    /**
     * Start real-time demo mode
     */
    startRealTimeDemo() {
        // Hook into chat input for real-time analysis
        const chatInput = document.getElementById('user-input');
        if (chatInput) {
            this.originalInputHandler = chatInput.oninput;
            
            chatInput.oninput = (e) => {
                const text = e.target.value;
                if (text.length > 10) {
                    this.analyzeRealTimeInput(text);
                }
                
                // Call original handler if it exists
                if (this.originalInputHandler) {
                    this.originalInputHandler(e);
                }
            };
        }
        
        console.log('✅ Real-time demo mode started - type in chat to see live analysis');
    }
    
    /**
     * Stop real-time demo mode
     */
    stopRealTimeDemo() {
        const chatInput = document.getElementById('user-input');
        if (chatInput && this.originalInputHandler) {
            chatInput.oninput = this.originalInputHandler;
        }
    }
    
    /**
     * Analyze real-time input from user
     */
    async analyzeRealTimeInput(text) {
        if (!window.viralSocialDecoder || text.length < 10) return;
        
        try {
            const result = await window.viralSocialDecoder.analyzeText(text, {
                context: 'real_time_demo',
                timestamp: Date.now()
            });
            
            if (result && result.confidence > 0.6) {
                console.log('⚡ REAL-TIME ANALYSIS:', {
                    text: text.substring(0, 50) + '...',
                    confidence: Math.round((result.confidence || 0) * 100) + '%',
                    sarcasm: result.translation?.hiddenMeaning ? 'YES' : 'NO',
                    emotion: result.translation?.emotionalSubtext || 'neutral'
                });
                
                // Show real-time feedback in UI
                this.showRealTimeFeedback(result);
            }
            
        } catch (error) {
            console.error('❌ Real-time analysis error:', error);
        }
    }
    
    /**
     * Show real-time feedback in UI
     */
    showRealTimeFeedback(result) {
        // Create or update real-time feedback widget
        let feedbackWidget = document.getElementById('real-time-feedback');
        
        if (!feedbackWidget) {
            feedbackWidget = document.createElement('div');
            feedbackWidget.id = 'real-time-feedback';
            feedbackWidget.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                width: 280px;
                padding: 12px;
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.8));
                border-radius: 8px;
                color: white;
                font-size: 12px;
                z-index: 10002;
                opacity: 0;
                transform: translateX(20px);
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            document.body.appendChild(feedbackWidget);
        }
        
        const confidence = Math.round((result.confidence || 0) * 100);
        let content = `<strong>⚡ Real-Time Analysis</strong><br>`;
        content += `Confidence: ${confidence}%<br>`;
        
        if (result.translation?.hiddenMeaning) {
            content += `🎭 Sarcasm: ${result.translation.hiddenMeaning}<br>`;
        }
        
        if (result.translation?.emotionalSubtext) {
            content += `😊 Emotion: ${result.translation.emotionalSubtext}<br>`;
        }
        
        feedbackWidget.innerHTML = content;
        
        // Show widget
        feedbackWidget.style.opacity = '1';
        feedbackWidget.style.transform = 'translateX(0)';
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            feedbackWidget.style.opacity = '0';
            feedbackWidget.style.transform = 'translateX(20px)';
        }, 4000);
    }
    
    /**
     * Record breakthrough moments
     */
    recordBreakthroughMoment(scenario, result) {
        this.demoState.breakthroughMoments++;
        
        const moment = {
            timestamp: Date.now(),
            scenario: scenario.title,
            breakthrough: scenario.breakthroughMoment,
            confidence: result.confidence,
            type: scenario.expectedDetection
        };
        
        // Store breakthrough moments
        if (!this.breakthroughMoments) this.breakthroughMoments = [];
        this.breakthroughMoments.push(moment);
        
        console.log('🎉 BREAKTHROUGH MOMENT RECORDED:', moment);
    }
    
    /**
     * Show breakthrough statistics
     */
    showBreakthroughStats() {
        const stats = {
            totalBreakthroughs: this.demoState.breakthroughMoments,
            scenariosCompleted: this.demoState.scenariosCompleted,
            realTimeModeActive: this.demoState.realTimeMode,
            breakthroughRate: this.demoState.scenariosCompleted > 0 ? 
                Math.round((this.demoState.breakthroughMoments / this.demoState.scenariosCompleted) * 100) : 0
        };
        
        console.log('📊 BREAKTHROUGH STATISTICS:', stats);
        
        if (window.addMessage) {
            window.addMessage(
                `🎉 Breakthrough Stats: ${stats.totalBreakthroughs} moments across ${stats.scenariosCompleted} scenarios (${stats.breakthroughRate}% success rate)`,
                'system'
            );
        }
        
        // Show detailed breakdown if available
        if (this.breakthroughMoments && this.breakthroughMoments.length > 0) {
            console.log('🎉 RECENT BREAKTHROUGH MOMENTS:');
            this.breakthroughMoments.slice(-5).forEach((moment, index) => {
                console.log(`${index + 1}. ${moment.scenario}: ${moment.breakthrough} (${Math.round(moment.confidence * 100)}%)`);
            });
        }
        
        return stats;
    }
    
    /**
     * Sleep function for demo pacing
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Get demo status
     */
    getDemoStatus() {
        return {
            initialized: true,
            ...this.demoState,
            availableScenarios: {
                sarcasm: this.demoScenarios.sarcasm.length,
                emotion: this.demoScenarios.emotion.length,
                meeting: this.demoScenarios.meeting.length
            }
        };
    }
}

// Export for use in Velvet systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ViralSocialDecoderDemo;
} else if (typeof window !== 'undefined') {
    window.ViralSocialDecoderDemo = ViralSocialDecoderDemo;
}

// Auto-initialize demo system when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(async () => {
            if (window.viralSocialDecoder && window.viralSocialDecoder.isActive) {
                console.log('🎭 Auto-initializing Viral Social Decoder Demo...');
                
                window.viralSocialDecoderDemo = new ViralSocialDecoderDemo();
                const initialized = await window.viralSocialDecoderDemo.initialize();
                
                if (initialized) {
                    console.log('✅ 🎭 Viral Social Decoder Demo ready for breakthrough moments!');
                }
            }
        }, 4000); // Wait for systems to initialize
    });
}

console.log('🎭 Viral Social Decoder Demo system loaded - ready to create breakthrough moments!');