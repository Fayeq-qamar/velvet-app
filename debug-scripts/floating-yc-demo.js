/**
 * FLOATING YC DEMO CONTROLLER - Maximum Freedom Version
 * Creates a separate floating window that can be positioned anywhere
 */

console.log('🚀 FLOATING YC DEMO CONTROLLER');
console.log('===============================');

// Create floating demo controller that feels like it's outside the window
const FloatingYCDemo = {
    currentDemo: null,
    demoIndex: 0,
    
    features: [
        {
            name: "Social Decoder",
            description: "Neurotypical translation & sarcasm detection",
            trigger: () => FloatingYCDemo.showSocialDecoder()
        },
        {
            name: "Executive Dysfunction Support", 
            description: "Task avoidance & hyperfocus detection",
            trigger: () => FloatingYCDemo.showExecutiveSupport()
        },
        {
            name: "Pattern Recognition",
            description: "ADHD/Autism behavioral patterns", 
            trigger: () => FloatingYCDemo.showPatternRecognition()
        },
        {
            name: "Screen Intelligence",
            description: "Real-time OCR & context awareness",
            trigger: () => FloatingYCDemo.showScreenIntelligence()
        },
        {
            name: "Gentle Interventions",
            description: "4-type nudge system",
            trigger: () => FloatingYCDemo.showGentleInterventions()
        },
        {
            name: "Task Breakdown System",
            description: "AI-powered micro-steps",
            trigger: () => FloatingYCDemo.showTaskBreakdown()
        },
        {
            name: "Meeting Assistant",
            description: "Live co-pilot personality",
            trigger: () => FloatingYCDemo.showMeetingAssistant()
        },
        {
            name: "Brain Consciousness",
            description: "Unified AI awareness",
            trigger: () => FloatingYCDemo.showBrainConsciousness()
        }
    ],
    
    // Create ultra-compact floating controller
    createFloatingController() {
        const controller = document.createElement('div');
        controller.id = 'floating-yc-demo';
        controller.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999999;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 23, 42, 0.95));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 2px solid rgba(59, 130, 246, 0.6);
            border-radius: 12px;
            padding: 12px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
            font-size: 11px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            width: 200px;
            cursor: move;
            user-select: none;
            pointer-events: all;
        `;
        
        controller.innerHTML = `
            <!-- Compact Header -->
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                ">🧠</div>
                <div>
                    <div style="font-weight: 600; font-size: 11px;">YC Demo</div>
                    <div style="font-size: 8px; color: #94a3b8;">Velvet Features</div>
                </div>
                <button id="minimize-btn" style="
                    margin-left: auto;
                    width: 16px;
                    height: 16px;
                    border: none;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border-radius: 3px;
                    cursor: pointer;
                    font-size: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">−</button>
            </div>
            
            <!-- Progress Bar -->
            <div style="margin-bottom: 8px;">
                <div style="
                    background: rgba(255, 255, 255, 0.1);
                    height: 3px;
                    border-radius: 2px;
                    overflow: hidden;
                ">
                    <div id="floating-progress" style="
                        background: linear-gradient(90deg, #2563eb, #06b6d4);
                        height: 100%;
                        width: 0%;
                        transition: width 0.5s ease;
                    "></div>
                </div>
                <div id="floating-status" style="font-size: 8px; color: #06b6d4; margin-top: 2px;">
                    Ready...
                </div>
            </div>
            
            <!-- Main Controls -->
            <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                <button id="floating-next-btn" style="
                    flex: 1;
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    border: none;
                    color: white;
                    padding: 6px 8px;
                    border-radius: 6px;
                    font-size: 9px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">
                    Next
                </button>
                <button id="floating-stop-btn" style="
                    background: rgba(239, 68, 68, 0.8);
                    border: none;
                    color: white;
                    padding: 6px 8px;
                    border-radius: 6px;
                    font-size: 9px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">
                    Stop
                </button>
            </div>
            
            <!-- Edge Snap Buttons -->
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px;">
                <div style="font-size: 7px; color: #94a3b8; margin-bottom: 4px; text-align: center;">Snap to Edge</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2px;">
                    <button class="edge-btn" data-edge="top" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: none;
                        color: white;
                        padding: 3px;
                        border-radius: 3px;
                        font-size: 7px;
                        cursor: pointer;
                    ">T</button>
                    <button class="edge-btn" data-edge="right" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: none;
                        color: white;
                        padding: 3px;
                        border-radius: 3px;
                        font-size: 7px;
                        cursor: pointer;
                    ">R</button>
                    <button class="edge-btn" data-edge="bottom" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: none;
                        color: white;
                        padding: 3px;
                        border-radius: 3px;
                        font-size: 7px;
                        cursor: pointer;
                    ">B</button>
                    <button class="edge-btn" data-edge="left" style="
                        background: rgba(255, 255, 255, 0.1);
                        border: none;
                        color: white;
                        padding: 3px;
                        border-radius: 3px;
                        font-size: 7px;
                        cursor: pointer;
                    ">L</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(controller);
        
        // Make it draggable
        this.makeUltraDraggable(controller);
        
        // Add event listeners
        this.addFloatingEventListeners(controller);
        
        return controller;
    },
    
    // Ultra-smooth dragging that hugs window edges
    makeUltraDraggable(element) {
        let isDragging = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;
        let xOffset = 0;
        let yOffset = 0;
        
        element.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            isDragging = true;
            element.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                xOffset = currentX;
                yOffset = currentY;
                
                // Magnetic edge snapping
                const rect = element.getBoundingClientRect();
                const snapDistance = 20;
                
                // Snap to edges
                if (currentX < snapDistance) currentX = 0;
                if (currentY < snapDistance) currentY = 0;
                if (currentX > window.innerWidth - rect.width - snapDistance) {
                    currentX = window.innerWidth - rect.width;
                }
                if (currentY > window.innerHeight - rect.height - snapDistance) {
                    currentY = window.innerHeight - rect.height;
                }
                
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
    },
    
    // Add all event listeners
    addFloatingEventListeners(controller) {
        const nextBtn = controller.querySelector('#floating-next-btn');
        const stopBtn = controller.querySelector('#floating-stop-btn');
        const edgeBtns = controller.querySelectorAll('.edge-btn');
        const minimizeBtn = controller.querySelector('#minimize-btn');
        
        // Main controls
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextFeature();
        });
        
        stopBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.stopDemo();
        });
        
        // Edge snapping
        edgeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const edge = btn.getAttribute('data-edge');
                this.snapToEdge(controller, edge);
            });
        });
        
        // Minimize button
        let isMinimized = false;
        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const content = controller.children;
            isMinimized = !isMinimized;
            
            for (let i = 1; i < content.length; i++) {
                content[i].style.display = isMinimized ? 'none' : 'block';
            }
            
            minimizeBtn.textContent = isMinimized ? '+' : '−';
            controller.style.height = isMinimized ? 'auto' : 'auto';
        });
    },
    
    // Snap to window edges
    snapToEdge(controller, edge) {
        const rect = controller.getBoundingClientRect();
        let x = 0, y = 0;
        
        switch(edge) {
            case 'top':
                x = (window.innerWidth - rect.width) / 2;
                y = 0;
                break;
            case 'right': 
                x = window.innerWidth - rect.width;
                y = (window.innerHeight - rect.height) / 2;
                break;
            case 'bottom':
                x = (window.innerWidth - rect.width) / 2;
                y = window.innerHeight - rect.height;
                break;
            case 'left':
                x = 0;
                y = (window.innerHeight - rect.height) / 2;
                break;
        }
        
        controller.style.transform = `translate(${x}px, ${y}px)`;
        controller.style.left = '0px';
        controller.style.top = '0px';
    },
    
    // Start the demo
    startDemo() {
        console.log('🎬 Starting Floating YC Demo...');
        this.controller = this.createFloatingController();
        
        setTimeout(() => {
            this.nextFeature();
        }, 2000);
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
        const progressBar = document.getElementById('floating-progress');
        const statusText = document.getElementById('floating-status');
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (statusText) statusText.textContent = `${this.demoIndex + 1}/${this.features.length}: ${feature.name}`;
        
        // Clear previous demo
        this.clearCurrentDemo();
        
        // Show feature
        feature.trigger();
        this.demoIndex++;
    },
    
    // Clear current demo
    clearCurrentDemo() {
        if (this.currentDemo) {
            this.currentDemo.remove();
            this.currentDemo = null;
        }
    },
    
    // Complete demo
    completeDemo() {
        this.clearCurrentDemo();
        const statusText = document.getElementById('floating-status');
        if (statusText) statusText.textContent = '✅ Demo Complete!';
        
        console.log('🎉 Floating YC Demo Complete!');
    },
    
    // Stop demo
    stopDemo() {
        this.clearCurrentDemo();
        if (this.controller) this.controller.remove();
        console.log('⏹️ Floating demo stopped');
    },
    
    // DEMO FEATURES (same as before but adapted)
    showSocialDecoder() {
        const demo = document.createElement('div');
        demo.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10000;
                background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(124, 58, 237, 0.85));
                backdrop-filter: blur(20px);
                border-radius: 16px;
                padding: 20px;
                color: white;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                max-width: 350px;
                box-shadow: 0 20px 40px rgba(147, 51, 234, 0.3);
                animation: slideInDown 0.5s ease;
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
        
        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInDown {
                from { opacity: 0; transform: translateX(-50%) translateY(-50px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
        `;
        document.head.appendChild(style);
    },
    
    // Add other demo methods here (shortened for brevity)
    showExecutiveSupport() { /* Similar implementation */ },
    showPatternRecognition() { /* Similar implementation */ },
    showScreenIntelligence() { /* Similar implementation */ },
    showGentleInterventions() { /* Similar implementation */ },
    showTaskBreakdown() { /* Similar implementation */ },
    showMeetingAssistant() { /* Similar implementation */ },
    showBrainConsciousness() { /* Similar implementation */ }
};

// Auto-start
console.log('🚀 Floating YC Demo Controller Ready!');
console.log('💡 Ultra-compact, edge-snapping, minimizable');
console.log('📱 Run: FloatingYCDemo.startDemo()');

// Auto-start after 1 second
setTimeout(() => {
    FloatingYCDemo.startDemo();
}, 1000);