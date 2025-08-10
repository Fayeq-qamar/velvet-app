/**
 * VELVET DEMO FEATURES SCRIPT
 * Paste this in browser console to demonstrate all key features with visual pop-ups
 * Perfect for YC demo recordings
 */

// Demo Feature Controller
const VelvetDemo = {
    currentDemo: null,
    demoIndex: 0,
    
    // Feature demonstration queue
    features: [
        {
            name: "Social Decoder",
            description: "Neurotypical translation & sarcasm detection",
            trigger: () => VelvetDemo.showSocialDecoder()
        },
        {
            name: "Executive Dysfunction Support",
            description: "Task avoidance & hyperfocus detection",
            trigger: () => VelvetDemo.showExecutiveSupport()
        },
        {
            name: "Pattern Recognition",
            description: "ADHD/Autism behavioral patterns",
            trigger: () => VelvetDemo.showPatternRecognition()
        },
        {
            name: "Screen Intelligence",
            description: "Real-time OCR & context awareness",
            trigger: () => VelvetDemo.showScreenIntelligence()
        },
        {
            name: "Gentle Interventions",
            description: "4-type nudge system (visual, audio, haptic, text)",
            trigger: () => VelvetDemo.showGentleInterventions()
        },
        {
            name: "Task Breakdown System",
            description: "AI-powered micro-steps with progress tracking",
            trigger: () => VelvetDemo.showTaskBreakdown()
        },
        {
            name: "Meeting Assistant",
            description: "Live co-pilot with professional personality",
            trigger: () => VelvetDemo.showMeetingAssistant()
        },
        {
            name: "Brain Consciousness",
            description: "Unified real-time context awareness",
            trigger: () => VelvetDemo.showBrainConsciousness()
        }
    ],
    
    // Show all features in sequence
    async startDemo() {
        console.log('🎬 Starting Velvet Features Demo...');
        
        // Show demo controller
        this.showDemoController();
        
        // Add position shortcuts
        this.addPositionShortcuts();
        
        // Auto-start first feature after 2 seconds
        setTimeout(() => {
            this.nextFeature();
        }, 2000);
    },
    
    // Show demo controller overlay
    showDemoController() {
        const controller = document.createElement('div');
        controller.id = 'velvet-demo-controller';
        controller.style.cssText = `
            position: fixed;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            z-index: 99999;
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95));
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 2px solid rgba(59, 130, 246, 0.4);
            border-radius: 16px;
            padding: 16px 20px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
            font-size: 14px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            min-width: 280px;
            pointer-events: all;
            user-select: none;
            cursor: move;
        `;
        
        controller.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                ">🧠</div>
                <div>
                    <div style="font-weight: 600; font-size: 16px;">Velvet Features Demo</div>
                    <div style="font-size: 12px; color: #94a3b8;">YC Demo Controller</div>
                </div>
            </div>
            
            <div style="margin-bottom: 16px;">
                <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">Progress</div>
                <div style="
                    background: rgba(255, 255, 255, 0.1);
                    height: 4px;
                    border-radius: 2px;
                    overflow: hidden;
                ">
                    <div id="demo-progress" style="
                        background: linear-gradient(90deg, #2563eb, #06b6d4);
                        height: 100%;
                        width: 0%;
                        transition: width 0.5s ease;
                    "></div>
                </div>
                <div id="demo-status" style="font-size: 11px; color: #06b6d4; margin-top: 4px;">
                    Ready to start demo...
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Main Controls -->
                <div style="display: flex; gap: 8px;">
                    <button id="next-feature-btn" style="
                        background: linear-gradient(135deg, #2563eb, #1d4ed8);
                        border: none;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 8px;
                        font-size: 12px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        pointer-events: all;
                    ">
                        Next Feature
                    </button>
                    <button id="stop-demo-btn" style="
                        background: rgba(239, 68, 68, 0.8);
                        border: none;
                        color: white;
                        padding: 8px 16px;
                        border-radius: 8px;
                        font-size: 12px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s ease;  
                        pointer-events: all;
                    ">
                        Stop Demo
                    </button>
                </div>
                
                <!-- Position Controls -->
                <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 8px;">
                    <div style="font-size: 10px; color: #94a3b8; margin-bottom: 6px; text-align: center;">Quick Position</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;">
                        <button class="position-btn" data-position="top-left" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: none;
                            color: white;
                            padding: 4px 6px;
                            border-radius: 4px;
                            font-size: 9px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            pointer-events: all;
                        ">↖ TL</button>
                        <button class="position-btn" data-position="center" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: none;
                            color: white;
                            padding: 4px 6px;
                            border-radius: 4px;
                            font-size: 9px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            pointer-events: all;
                        ">⊙ C</button>
                        <button class="position-btn" data-position="top-right" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: none;
                            color: white;
                            padding: 4px 6px;
                            border-radius: 4px;
                            font-size: 9px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            pointer-events: all;
                        ">↗ TR</button>
                        <button class="position-btn" data-position="bottom-left" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: none;
                            color: white;
                            padding: 4px 6px;
                            border-radius: 4px;
                            font-size: 9px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            pointer-events: all;
                        ">↙ BL</button>
                        <button class="position-btn" data-position="left" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: none;
                            color: white;
                            padding: 4px 6px;
                            border-radius: 4px;
                            font-size: 9px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            pointer-events: all;
                        ">← L</button>
                        <button class="position-btn" data-position="bottom-right" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: none;
                            color: white;
                            padding: 4px 6px;
                            border-radius: 4px;
                            font-size: 9px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            pointer-events: all;
                        ">↘ BR</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(controller);
        
        // Make controller draggable
        this.makeDraggable(controller);
        
        // Add proper event listeners instead of inline onclick
        const nextBtn = document.getElementById('next-feature-btn');
        const stopBtn = document.getElementById('stop-demo-btn');
        const positionBtns = document.querySelectorAll('.position-btn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.nextFeature();
            });
            nextBtn.addEventListener('mouseover', () => {
                nextBtn.style.transform = 'translateY(-1px)';
                nextBtn.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
            });
            nextBtn.addEventListener('mouseout', () => {
                nextBtn.style.transform = 'translateY(0)';
                nextBtn.style.boxShadow = 'none';
            });
        }
        
        if (stopBtn) {
            stopBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.stopDemo();
            });
            stopBtn.addEventListener('mouseover', () => {
                stopBtn.style.transform = 'translateY(-1px)';
                stopBtn.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
            });
            stopBtn.addEventListener('mouseout', () => {
                stopBtn.style.transform = 'translateY(0)';
                stopBtn.style.boxShadow = 'none';
            });
        }
        
        // Add position button listeners
        positionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const position = btn.getAttribute('data-position');
                this.moveToCorner(position);
                
                // Visual feedback
                btn.style.background = 'rgba(37, 99, 235, 0.6)';
                setTimeout(() => {
                    btn.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 200);
            });
            
            btn.addEventListener('mouseover', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.2)';
            });
            
            btn.addEventListener('mouseout', () => {
                btn.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
    },
    
    // Show next feature
    nextFeature() {
        if (this.demoIndex >= this.features.length) {
            this.completeDemo();
            return;
        }
        
        const feature = this.features[this.demoIndex];
        console.log(`🎯 Demonstrating: ${feature.name}`);
        
        // Update progress
        const progress = ((this.demoIndex + 1) / this.features.length) * 100;
        const progressBar = document.getElementById('demo-progress');
        const statusText = document.getElementById('demo-status');
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (statusText) statusText.textContent = `${this.demoIndex + 1}/${this.features.length}: ${feature.name}`;
        
        // Clear previous demo
        this.clearCurrentDemo();
        
        // Show feature
        feature.trigger();
        this.demoIndex++;
    },
    
    // Clear current demo overlay
    clearCurrentDemo() {
        if (this.currentDemo) {
            this.currentDemo.remove();
            this.currentDemo = null;
        }
    },
    
    // Complete demo
    completeDemo() {
        this.clearCurrentDemo();
        const statusText = document.getElementById('demo-status');
        if (statusText) statusText.textContent = '✅ Demo Complete!';
        
        console.log('🎉 Velvet Features Demo Complete!');
        
        // Show completion message
        setTimeout(() => {
            this.showCompletionMessage();
        }, 1000);
    },
    
    // Stop demo
    stopDemo() {
        this.clearCurrentDemo();
        const controller = document.getElementById('velvet-demo-controller');
        if (controller) controller.remove();
        console.log('⏹️ Demo stopped');
    },
    
    // Show completion message
    showCompletionMessage() {
        const completion = document.createElement('div');
        completion.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10001;
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.92));
                backdrop-filter: blur(24px);
                border: 1px solid rgba(59, 130, 246, 0.3);
                border-radius: 20px;
                padding: 32px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                text-align: center;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
                animation: slideInUp 0.5s ease;
            ">
                <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
                <div style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Demo Complete!</div>
                <div style="font-size: 16px; color: #94a3b8; margin-bottom: 24px;">
                    "Soft support for sharp minds"
                </div>
                <div style="font-size: 14px; color: #06b6d4;">
                    Velvet: Neurodivergent AI Assistant
                </div>
            </div>
        `;
        
        document.body.appendChild(completion);
        
        setTimeout(() => {
            completion.remove();
            this.stopDemo();
        }, 4000);
    },
    
    // FEATURE DEMONSTRATIONS
    
    // Social Decoder Demo
    showSocialDecoder() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(124, 58, 237, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 350px;
                box-shadow: 0 20px 40px rgba(147, 51, 234, 0.3);
                animation: slideInRight 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="font-size: 24px;">🧩</div>
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">Social Decoder</div>
                        <div style="font-size: 12px; opacity: 0.8;">Neurotypical Translation</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 4px;">Original Message:</div>
                    <div style="font-size: 14px;">"Fine, whatever works for you."</div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 4px;">🎯 Decoded Meaning:</div>
                    <div style="font-size: 14px;">
                        <div>• <strong>Tone:</strong> Passive-aggressive, frustrated</div>
                        <div>• <strong>Subtext:</strong> "I disagree but won't argue"</div>
                        <div>• <strong>Suggestion:</strong> Ask clarifying questions</div>
                    </div>
                </div>
                
                <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6); text-align: center;">
                    ✨ Real-time communication analysis for neurodivergent minds
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100px); }
                to { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    },
    
    // Executive Dysfunction Support Demo
    showExecutiveSupport() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 380px;
                box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
                animation: slideInLeft 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="font-size: 24px;">⚡</div>
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">Executive Dysfunction Alert</div>
                        <div style="font-size: 12px; opacity: 0.8;">Task Avoidance Detected</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 4px;">Pattern Detected:</div>
                    <div style="font-size: 14px;">Opened/closed document 7 times in 3 minutes</div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 8px;">🎯 Gentle Intervention:</div>
                    <div style="font-size: 14px; margin-bottom: 12px;">
                        "This task feels big, doesn't it? Let's break it into tiny steps."
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button style="
                            background: rgba(255, 255, 255, 0.2);
                            border: none;
                            color: white;
                            padding: 6px 12px;
                            border-radius: 6px;
                            font-size: 11px;
                            cursor: pointer;
                        ">Break it down</button>
                        <button style="
                            background: rgba(255, 255, 255, 0.1);
                            border: none;
                            color: white;
                            padding: 6px 12px;
                            border-radius: 6px;
                            font-size: 11px;
                            cursor: pointer;
                        ">Take a break</button>
                    </div>
                </div>
                
                <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6); text-align: center;">
                    💙 Understanding executive dysfunction patterns
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-100px); }
                to { opacity: 1; transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    },
    
    // Pattern Recognition Demo
    showPatternRecognition() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10000;
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 20px;
                padding: 24px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 400px;
                box-shadow: 0 25px 50px rgba(16, 185, 129, 0.3);
                animation: scaleIn 0.5s ease;
                text-align: center;
            ">
                <div style="font-size: 32px; margin-bottom: 16px;">🧠</div>
                <div style="font-weight: 600; font-size: 18px; margin-bottom: 8px;">Pattern Recognition Active</div>
                <div style="font-size: 14px; opacity: 0.8; margin-bottom: 20px;">Real-time behavioral analysis</div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px;">
                        <div style="font-size: 12px; opacity: 0.7;">Hyperfocus</div>
                        <div style="font-size: 16px; font-weight: 600;">47 min</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px;">
                        <div style="font-size: 12px; opacity: 0.7;">Tab Switches</div>
                        <div style="font-size: 16px; font-weight: 600;">23</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px;">
                        <div style="font-size: 12px; opacity: 0.7;">Idle Time</div>
                        <div style="font-size: 16px; font-weight: 600;">3 min</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px;">
                        <div style="font-size: 12px; opacity: 0.7;">Focus Score</div>
                        <div style="font-size: 16px; font-weight: 600;">8.7/10</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 16px;">
                    <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px;">
                        🎯 Current State: Deep Focus
                    </div>
                    <div style="font-size: 12px; opacity: 0.8;">
                        You've been coding for 47 minutes. Consider a quick stretch break soon!
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scaleIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    },
    
    // Screen Intelligence Demo
    showScreenIntelligence() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10000;
                background: linear-gradient(135deg, rgba(6, 182, 212, 0.9), rgba(14, 165, 233, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 450px;
                box-shadow: 0 20px 40px rgba(6, 182, 212, 0.3);
                animation: slideInDown 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="font-size: 24px;">👁️</div>
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">Screen Intelligence</div>
                        <div style="font-size: 12px; opacity: 0.8;">Real-time OCR & Context Analysis</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 4px;">Currently Reading:</div>
                    <div style="font-size: 14px;">"function processAudio() { const blob = new Blob..."</div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 8px;">🎯 Context Analysis:</div>
                    <div style="font-size: 13px;">
                        <div>• <strong>Type:</strong> JavaScript Code</div>
                        <div>• <strong>Topic:</strong> Audio Processing</div>
                        <div>• <strong>Complexity:</strong> Intermediate</div>
                        <div>• <strong>Suggestion:</strong> Add error handling</div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 11px; opacity: 0.6;">
                        📸 Capturing at 10 FPS
                    </div>
                    <div style="display: flex; gap: 4px;">
                        <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.8); border-radius: 50%; animation: blink 1s infinite;"></div>
                        <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: blink 1s infinite 0.2s;"></div>
                        <div style="width: 6px; height: 6px; background: rgba(255,255,255,0.4); border-radius: 50%; animation: blink 1s infinite 0.4s;"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInDown {
                from { opacity: 0; transform: translateX(-50%) translateY(-50px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes blink {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    },
    
    // Gentle Interventions Demo
    showGentleInterventions() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                bottom: 80px;
                right: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(139, 92, 246, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 320px;
                box-shadow: 0 20px 40px rgba(168, 85, 247, 0.3);
                animation: fadeInUp 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="font-size: 24px;">🌸</div>
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">Gentle Intervention</div>
                        <div style="font-size: 12px; opacity: 0.8;">4-Type Nudge System</div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 8px; text-align: center;">
                        <div style="font-size: 16px; margin-bottom: 4px;">👁️</div>
                        <div style="font-size: 11px;">Visual</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 8px; text-align: center;">
                        <div style="font-size: 16px; margin-bottom: 4px;">🔊</div>
                        <div style="font-size: 11px;">Audio</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 8px; text-align: center;">
                        <div style="font-size: 16px; margin-bottom: 4px;">📳</div>
                        <div style="font-size: 11px;">Haptic</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 8px; text-align: center;">
                        <div style="font-size: 16px; margin-bottom: 4px;">💬</div>
                        <div style="font-size: 11px;">Text</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="font-size: 13px; font-weight: 500; margin-bottom: 6px;">
                        💙 "You're in the zone! I'll hold notifications."
                    </div>
                    <div style="font-size: 11px; opacity: 0.7;">
                        Focus Protection Mode Active
                    </div>
                </div>
                
                <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6); text-align: center;">
                    ✨ Never overwhelming, always supportive
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    },
    
    // Task Breakdown Demo
    showTaskBreakdown() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                top: 200px;
                left: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, rgba(251, 146, 60, 0.9), rgba(249, 115, 22, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 340px;
                box-shadow: 0 20px 40px rgba(251, 146, 60, 0.3);
                animation: slideInLeft 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="font-size: 24px;">🎯</div>
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">Task Breakdown</div>
                        <div style="font-size: 12px; opacity: 0.8;">AI-Powered Micro-Steps</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 4px;">Goal Detected:</div>
                    <div style="font-size: 14px; font-weight: 500;">"I need to write the project documentation"</div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 8px;">🎯 Micro-Steps (2-5 min each):</div>
                    <div style="font-size: 13px; line-height: 1.4;">
                        <div style="margin-bottom: 4px;">✅ 1. Open VS Code</div>
                        <div style="margin-bottom: 4px;">⏳ 2. Create README.md file</div>
                        <div style="margin-bottom: 4px;">⏸️ 3. Add project title</div>
                        <div style="margin-bottom: 4px;">⏸️ 4. Write one-line description</div>
                        <div style="margin-bottom: 4px;">⏸️ 5. Add installation steps</div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 11px; opacity: 0.6;">
                        Progress: 1/5 complete
                    </div>
                    <div style="
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 10px;
                        height: 4px; 
                        width: 80px;
                        overflow: hidden;
                    ">
                        <div style="
                            background: white;
                            height: 100%;
                            width: 20%;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
    },
    
    // Meeting Assistant Demo
    showMeetingAssistant() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                top: 120px;
                right: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 380px;
                box-shadow: 0 20px 40px rgba(34, 197, 94, 0.3);
                animation: slideInRight 0.5s ease;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="font-size: 24px;">🎤</div>
                    <div>
                        <div style="font-weight: 600; font-size: 16px;">Meeting Co-Pilot</div>
                        <div style="font-size: 12px; opacity: 0.8;">Professional AI Personality</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 4px;">Question Detected:</div>
                    <div style="font-size: 14px;">"What's the capital of Uttar Pradesh?"</div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
                    <div style="font-size: 12px; opacity: 0.7; margin-bottom: 8px;">🎯 Professional Response:</div>
                    <div style="font-size: 13px; line-height: 1.4;">
                        <div style="font-weight: 600; margin-bottom: 6px;">• Lucknow - Historical Administrative Center</div>
                        <div style="margin-bottom: 4px;">• Major cultural hub of North India</div>
                        <div style="margin-bottom: 4px;">• Known for Nawabi heritage and cuisine</div>
                        <div style="font-size: 11px; opacity: 0.8; margin-top: 8px;">
                            Population ~3.2M, established as capital in 1775
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; opacity: 0.7;">
                    <div>🎧 Live transcription active</div>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <div style="width: 4px; height: 4px; background: white; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                        <span>Recording</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
    },
    
    // Brain Consciousness Demo
    showBrainConsciousness() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                right: 50px;
                transform: translateY(-50%);
                z-index: 10000;
                background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 20px;
                padding: 24px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 360px;
                box-shadow: 0 25px 50px rgba(59, 130, 246, 0.4);
                animation: pulseGlow 0.8s ease;
            ">
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 48px; margin-bottom: 8px; animation: brainPulse 2s infinite;">🧠</div>
                    <div style="font-weight: 600; font-size: 18px;">Velvet Brain</div>
                    <div style="font-size: 12px; opacity: 0.8;">Unified AI Consciousness</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.7;">Screen</div>
                        <div style="font-size: 14px; font-weight: 600;">✅ Active</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.7;">Audio</div>
                        <div style="font-size: 14px; font-weight: 600;">✅ Listening</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.7;">Patterns</div>
                        <div style="font-size: 14px; font-weight: 600;">✅ Learning</div>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 10px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.7;">Context</div>
                        <div style="font-size: 14px; font-weight: 600;">✅ Aware</div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                    <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px;">
                        🎯 Current Awareness:
                    </div>
                    <div style="font-size: 12px; line-height: 1.4; opacity: 0.9;">
                        User is coding in JavaScript, focused for 47 minutes. Screen shows audio processing function. Recommend break soon. No distractions detected.
                    </div>
                </div>
                
                <div style="text-align: center; font-size: 11px; opacity: 0.6;">
                    ✨ "Soft support for sharp minds" ✨
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulseGlow {
                0% { 
                    opacity: 0; 
                    transform: translateY(-50%) scale(0.9);
                    box-shadow: 0 25px 50px rgba(59, 130, 246, 0.4);
                }
                100% { 
                    opacity: 1; 
                    transform: translateY(-50%) scale(1);
                    box-shadow: 0 25px 50px rgba(59, 130, 246, 0.4), 0 0 100px rgba(59, 130, 246, 0.2);
                }
            }
            @keyframes brainPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    },
    
    // Make element draggable
    makeDraggable(element) {
        let isDragging = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;
        let xOffset = 0;
        let yOffset = 0;
        
        element.addEventListener('mousedown', (e) => {
            // Don't drag if clicking on buttons
            if (e.target.tagName === 'BUTTON') return;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === element || e.target.closest('#velvet-demo-controller')) {
                isDragging = true;
                element.style.cursor = 'grabbing';
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                xOffset = currentX;
                yOffset = currentY;
                
                // Keep element within viewport bounds
                const rect = element.getBoundingClientRect();
                const maxX = window.innerWidth - rect.width;
                const maxY = window.innerHeight - rect.height;
                
                currentX = Math.max(0, Math.min(currentX, maxX));
                currentY = Math.max(0, Math.min(currentY, maxY));
                
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
                element.style.left = '0px';
                element.style.top = '0px';
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'move';
            }
        });
        
        // Touch events for mobile
        element.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            const touch = e.touches[0];
            initialX = touch.clientX - xOffset;
            initialY = touch.clientY - yOffset;
            
            if (e.target === element || e.target.closest('#velvet-demo-controller')) {
                isDragging = true;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                e.preventDefault();
                
                const touch = e.touches[0];
                currentX = touch.clientX - initialX;
                currentY = touch.clientY - initialY;
                
                xOffset = currentX;
                yOffset = currentY;
                
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
                element.style.left = '0px';
                element.style.top = '0px';
            }
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    },
    
    // Add position shortcuts
    addPositionShortcuts() {
        console.log('📍 Position shortcuts available:');
        console.log('  • VelvetDemo.moveToCorner("top-left")');
        console.log('  • VelvetDemo.moveToCorner("top-right")'); 
        console.log('  • VelvetDemo.moveToCorner("bottom-left")');
        console.log('  • VelvetDemo.moveToCorner("bottom-right")');
        console.log('  • VelvetDemo.moveToCorner("center")');
    },
    
    // Move controller to specific positions
    moveToCorner(position) {
        const controller = document.getElementById('velvet-demo-controller');
        if (!controller) return;
        
        const margin = 20;
        const rect = controller.getBoundingClientRect();
        let x = 0, y = 0;
        
        switch(position) {
            case 'top-left':
                x = margin;
                y = margin;
                break;
            case 'top-right':
                x = window.innerWidth - rect.width - margin;
                y = margin;
                break;
            case 'bottom-left':
                x = margin;
                y = window.innerHeight - rect.height - margin;
                break;
            case 'bottom-right':
                x = window.innerWidth - rect.width - margin;
                y = window.innerHeight - rect.height - margin;
                break;
            case 'center':
                x = (window.innerWidth - rect.width) / 2;
                y = (window.innerHeight - rect.height) / 2;
                break;
            case 'left':
                x = margin;
                y = (window.innerHeight - rect.height) / 2;
                break;
            default:
                console.log('Available positions: top-left, top-right, bottom-left, bottom-right, center, left');
                return;
        }
        
        controller.style.transform = `translate(${x}px, ${y}px)`;
        controller.style.left = '0px';
        controller.style.top = '0px';
        
        console.log(`📍 Controller moved to ${position}`);
    }
};

// Auto-start demo
console.log('🎬 Velvet Demo Features Script Loaded!');
console.log('🎯 Run VelvetDemo.startDemo() to begin the features demonstration');
console.log('📝 Perfect for YC demo recordings!');

// Auto-start after 1 second
setTimeout(() => {
    VelvetDemo.startDemo();
}, 1000);