/**
 * CLEAN FLOATING YC DEMO CONTROLLER
 * Ultra-compact, draggable, edge-snapping demo controller
 */

console.log('🚀 CLEAN FLOATING YC DEMO CONTROLLER');
console.log('===================================');

const CleanFloatingDemo = {
    currentDemo: null,
    demoIndex: 0,
    controller: null,
    
    features: [
        { name: "Social Decoder", color: "rgba(147, 51, 234, 0.9)" },
        { name: "Executive Dysfunction", color: "rgba(239, 68, 68, 0.9)" },
        { name: "Pattern Recognition", color: "rgba(16, 185, 129, 0.9)" },
        { name: "Screen Intelligence", color: "rgba(6, 182, 212, 0.9)" },
        { name: "Gentle Interventions", color: "rgba(168, 85, 247, 0.9)" },
        { name: "Task Breakdown", color: "rgba(251, 146, 60, 0.9)" },
        { name: "Meeting Assistant", color: "rgba(34, 197, 94, 0.9)" },
        { name: "Brain Consciousness", color: "rgba(59, 130, 246, 0.9)" }
    ],
    
    createController() {
        const controller = document.createElement('div');
        controller.id = 'clean-floating-demo';
        
        // Set styles
        controller.style.position = 'fixed';
        controller.style.top = '20px';
        controller.style.right = '20px';
        controller.style.zIndex = '999999';
        controller.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(15, 23, 42, 0.95))';
        controller.style.backdropFilter = 'blur(20px)';
        controller.style.border = '2px solid rgba(59, 130, 246, 0.6)';
        controller.style.borderRadius = '12px';
        controller.style.padding = '12px';
        controller.style.color = 'white';
        controller.style.fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';
        controller.style.fontSize = '11px';
        controller.style.width = '180px';
        controller.style.cursor = 'move';
        controller.style.userSelect = 'none';
        controller.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.8)';
        
        // Create HTML content
        controller.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 20px; height: 20px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px;">🧠</div>
                <div>
                    <div style="font-weight: 600; font-size: 11px;">YC Demo</div>
                    <div style="font-size: 8px; color: #94a3b8;">Velvet Features</div>
                </div>
                <button id="mini-btn" style="margin-left: auto; width: 16px; height: 16px; border: none; background: rgba(255, 255, 255, 0.2); color: white; border-radius: 3px; cursor: pointer; font-size: 8px;">−</button>
            </div>
            
            <div id="demo-content">
                <div style="margin-bottom: 8px;">
                    <div style="background: rgba(255, 255, 255, 0.1); height: 3px; border-radius: 2px; overflow: hidden;">
                        <div id="clean-progress" style="background: linear-gradient(90deg, #2563eb, #06b6d4); height: 100%; width: 0%; transition: width 0.5s ease;"></div>
                    </div>
                    <div id="clean-status" style="font-size: 8px; color: #06b6d4; margin-top: 2px;">Ready...</div>
                </div>
                
                <div style="display: flex; gap: 4px; margin-bottom: 8px;">
                    <button id="clean-next" style="flex: 1; background: linear-gradient(135deg, #2563eb, #1d4ed8); border: none; color: white; padding: 6px 8px; border-radius: 6px; font-size: 9px; cursor: pointer;">Next</button>
                    <button id="clean-stop" style="background: rgba(239, 68, 68, 0.8); border: none; color: white; padding: 6px 8px; border-radius: 6px; font-size: 9px; cursor: pointer;">Stop</button>
                </div>
                
                <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px;">
                    <div style="font-size: 7px; color: #94a3b8; margin-bottom: 4px; text-align: center;">Snap to Edge</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 2px;">
                        <button class="edge-btn" data-edge="top" style="background: rgba(255, 255, 255, 0.1); border: none; color: white; padding: 3px; border-radius: 3px; font-size: 7px; cursor: pointer;">T</button>
                        <button class="edge-btn" data-edge="right" style="background: rgba(255, 255, 255, 0.1); border: none; color: white; padding: 3px; border-radius: 3px; font-size: 7px; cursor: pointer;">R</button>
                        <button class="edge-btn" data-edge="bottom" style="background: rgba(255, 255, 255, 0.1); border: none; color: white; padding: 3px; border-radius: 3px; font-size: 7px; cursor: pointer;">B</button>
                        <button class="edge-btn" data-edge="left" style="background: rgba(255, 255, 255, 0.1); border: none; color: white; padding: 3px; border-radius: 3px; font-size: 7px; cursor: pointer;">L</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(controller);
        this.controller = controller;
        
        this.addEventListeners();
        this.makeDraggable();
        
        return controller;
    },
    
    addEventListeners() {
        const nextBtn = document.getElementById('clean-next');
        const stopBtn = document.getElementById('clean-stop');
        const miniBtn = document.getElementById('mini-btn');
        const edgeBtns = document.querySelectorAll('.edge-btn');
        
        nextBtn.onclick = () => this.nextFeature();
        stopBtn.onclick = () => this.stopDemo();
        
        let isMinimized = false;
        miniBtn.onclick = () => {
            const content = document.getElementById('demo-content');
            isMinimized = !isMinimized;
            content.style.display = isMinimized ? 'none' : 'block';
            miniBtn.textContent = isMinimized ? '+' : '−';
        };
        
        edgeBtns.forEach(btn => {
            btn.onclick = () => {
                const edge = btn.getAttribute('data-edge');
                this.snapToEdge(edge);
            };
        });
    },
    
    makeDraggable() {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        this.controller.onmousedown = (e) => {
            if (e.target.tagName === 'BUTTON') return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            
            const rect = this.controller.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            
            this.controller.style.cursor = 'grabbing';
        };
        
        document.onmousemove = (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            let newX = initialX + deltaX;
            let newY = initialY + deltaY;
            
            const rect = this.controller.getBoundingClientRect();
            newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
            newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));
            
            this.controller.style.left = newX + 'px';
            this.controller.style.top = newY + 'px';
            this.controller.style.right = 'auto';
            this.controller.style.transform = 'none';
        };
        
        document.onmouseup = () => {
            if (isDragging) {
                isDragging = false;
                this.controller.style.cursor = 'move';
            }
        };
    },
    
    snapToEdge(edge) {
        const rect = this.controller.getBoundingClientRect();
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
        
        this.controller.style.left = x + 'px';
        this.controller.style.top = y + 'px';
        this.controller.style.right = 'auto';
        this.controller.style.transform = 'none';
    },
    
    startDemo() {
        console.log('🎬 Starting Clean Floating Demo...');
        this.createController();
        
        setTimeout(() => {
            this.nextFeature();
        }, 2000);
    },
    
    nextFeature() {
        if (this.demoIndex >= this.features.length) {
            this.completeDemo();
            return;
        }
        
        const feature = this.features[this.demoIndex];
        console.log('🎯 Demonstrating: ' + feature.name);
        
        // Update progress
        const progress = ((this.demoIndex + 1) / this.features.length) * 100;
        const progressBar = document.getElementById('clean-progress');
        const statusText = document.getElementById('clean-status');
        
        if (progressBar) progressBar.style.width = progress + '%';
        if (statusText) statusText.textContent = (this.demoIndex + 1) + '/' + this.features.length + ': ' + feature.name;
        
        // Clear previous demo
        this.clearCurrentDemo();
        
        // Show feature
        this.showFeature(feature);
        this.demoIndex++;
    },
    
    showFeature(feature) {
        const demo = document.createElement('div');
        demo.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            background: linear-gradient(135deg, ${feature.color}, rgba(0, 0, 0, 0.1));
            backdrop-filter: blur(20px);
            border-radius: 16px;
            padding: 24px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 400px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
            text-align: center;
        `;
        
        demo.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 16px;">🎯</div>
            <div style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">${feature.name}</div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 20px;">
                Demonstrating ${feature.name.toLowerCase()} functionality
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 16px;">
                <div style="font-size: 12px; opacity: 0.8;">
                    This feature provides intelligent support for neurodivergent users with real-time analysis and gentle interventions.
                </div>
            </div>
        `;
        
        document.body.appendChild(demo);
        this.currentDemo = demo;
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (this.currentDemo === demo) {
                this.clearCurrentDemo();
            }
        }, 4000);
    },
    
    clearCurrentDemo() {
        if (this.currentDemo) {
            this.currentDemo.remove();
            this.currentDemo = null;
        }
    },
    
    completeDemo() {
        this.clearCurrentDemo();
        const statusText = document.getElementById('clean-status');
        if (statusText) statusText.textContent = '✅ Demo Complete!';
        
        console.log('🎉 Clean Floating Demo Complete!');
    },
    
    stopDemo() {
        this.clearCurrentDemo();
        if (this.controller) this.controller.remove();
        console.log('⏹️ Demo stopped');
    }
};

// Auto-start
console.log('🚀 Clean Floating Demo Ready!');
console.log('💡 Ultra-compact, draggable, edge-snapping');

setTimeout(() => {
    CleanFloatingDemo.startDemo();
}, 1000);