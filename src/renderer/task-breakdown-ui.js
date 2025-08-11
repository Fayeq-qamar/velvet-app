// 🎨 Task Breakdown UI System
// "Visual structure for sharp minds" - Clean UI for task management

console.log('🎨 Loading Task Breakdown UI...');

/**
 * TaskBreakdownUI: Interactive task breakdown interface
 * 
 * Features:
 * - Glassmorphism design matching Velvet aesthetic
 * - Drag-to-reposition with smart placement
 * - Expandable/collapsible with smooth animations
 * - Real-time progress tracking
 * - Celebration animations for completed steps
 * - Neurodivergent-friendly interaction patterns
 */

class TaskBreakdownUI {
    constructor() {
        console.log('🎨 Initializing Task Breakdown UI...');
        
        this.activeTask = null;
        this.isVisible = false;
        this.isMinimized = false;
        this.isDragging = false;
        this.element = null;
        this.dragOffset = { x: 0, y: 0 };
        
        // State tracking
        this.celebrationQueue = [];
        this.lastUpdateTime = 0;
        
        this.createUI();
        this.setupEventListeners();
    }

    createUI() {
        console.log('🎨 Creating task breakdown UI elements...');
        
        // Main container
        this.element = document.createElement('div');
        this.element.id = 'taskBreakdownUI';
        this.element.className = 'task-breakdown-ui';
        this.element.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 420px;
            max-height: calc(100vh - 40px);
            background: linear-gradient(135deg, 
                rgba(15, 23, 42, 0.95) 0%, 
                rgba(30, 41, 59, 0.93) 50%,
                rgba(51, 65, 85, 0.90) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 16px;
            box-shadow: 
                0 8px 32px rgba(37, 99, 235, 0.3),
                0 2px 8px rgba(0, 0, 0, 0.4);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: auto;
            overflow: hidden;
            display: none;
        `;
        
        document.body.appendChild(this.element);
        
        // Add styles to document head if not already added
        this.addStyles();
        
        console.log('✅ Task breakdown UI elements created');
    }

    setupEventListeners() {
        // Listen for task creation events
        document.addEventListener('taskBreakdownTaskCreated', (event) => {
            this.setActiveTask(event.detail.task);
        });
        
        document.addEventListener('taskBreakdownTaskCompleted', (event) => {
            this.celebrateCompletion(event.detail.task);
        });
        
        document.addEventListener('taskBreakdownStepCompleted', (event) => {
            this.updateStepProgress(event.detail.step);
        });
        
        console.log('✅ Task breakdown UI event listeners set up');
    }

    setActiveTask(task) {
        console.log('🎯 Setting active task in UI:', task.title);
        
        this.activeTask = task;
        this.render();
        this.show();
    }

    show() {
        if (this.isVisible) return;
        
        console.log('👁️ Showing task breakdown UI');
        
        this.isVisible = true;
        this.element.style.display = 'block';
        
        // Animate in
        setTimeout(() => {
            this.element.style.transform = 'translateX(0)';
            this.element.style.opacity = '1';
        }, 10);
        
        // Make body interactive
        document.body.classList.add('interface-open');
    }

    hide() {
        if (!this.isVisible) return;
        
        console.log('🫥 Hiding task breakdown UI');
        
        this.isVisible = false;
        
        // Animate out
        this.element.style.transform = 'translateX(100%)';
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            this.element.style.display = 'none';
        }, 300);
        
        // Check if we should make body non-interactive
        if (!document.querySelector('.velvet-interface.open')) {
            document.body.classList.remove('interface-open');
        }
    }

    minimize() {
        console.log('⬇️ Minimizing task breakdown UI');
        
        this.isMinimized = true;
        this.element.classList.add('minimized');
        this.element.style.height = '80px';
    }

    expand() {
        console.log('⬆️ Expanding task breakdown UI');
        
        this.isMinimized = false;
        this.element.classList.remove('minimized');
        this.element.style.height = 'auto';
    }

    render() {
        if (!this.activeTask) {
            this.element.innerHTML = '<div class="task-empty">No active task</div>';
            return;
        }

        const task = this.activeTask;
        const completedSteps = task.steps.filter(step => step.isCompleted).length;
        const progressPercentage = Math.round(task.progress * 100);
        const isCompleted = progressPercentage >= 100;

        this.element.innerHTML = `
            <div class="task-header">
                <div class="task-title-section">
                    <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    <div class="task-meta">
                        <span class="task-complexity">${task.complexity}</span>
                        <span class="task-duration">${task.estimatedDuration} min</span>
                        <span class="task-type">${task.type}</span>
                    </div>
                </div>
                
                <div class="task-controls">
                    <button class="control-button minimize" title="Minimize">
                        ${this.isMinimized ? '⬆️' : '⬇️'}
                    </button>
                    <button class="control-button close" title="Close">✕</button>
                </div>
            </div>

            <div class="task-content ${this.isMinimized ? 'hidden' : ''}">
                <div class="task-progress-container">
                    <div class="task-progress-bar">
                        <div class="task-progress-fill ${isCompleted ? 'completed' : ''}" 
                             style="width: ${progressPercentage}%"></div>
                    </div>
                    <span class="task-progress-text">
                        ${completedSteps}/${task.steps.length} steps • ${progressPercentage}%
                    </span>
                </div>

                ${task.description ? `
                    <div class="task-description">
                        <p>${this.escapeHtml(task.description)}</p>
                    </div>
                ` : ''}

                ${task.aiAnalysis ? `
                    <div class="task-insights">
                        <div class="insight-item">
                            <span class="insight-label">💡 Focus:</span>
                            <span class="insight-text">${this.escapeHtml(task.aiAnalysis.detectedIntention)}</span>
                        </div>
                        
                        ${task.aiAnalysis.difficultyAssessment ? `
                            <div class="insight-item">
                                <span class="insight-label">🎯 Approach:</span>
                                <span class="insight-text">${this.escapeHtml(task.aiAnalysis.difficultyAssessment)}</span>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                <div class="task-steps">
                    <h4 class="steps-title">Steps to Complete</h4>
                    ${task.steps.map((step, index) => this.renderStep(step, index)).join('')}
                </div>

                ${isCompleted ? `
                    <div class="task-completion">
                        <div class="completion-message">
                            🎉 Amazing work! You completed this task! 🎉
                        </div>
                        <div class="completion-stats">
                            Finished in ~${Math.ceil(task.estimatedDuration)} minutes
                        </div>
                    </div>
                ` : ''}

                <div class="task-analytics">
                    <div class="analytics-item">
                        <span class="analytics-label">Progress:</span>
                        <span class="analytics-value">${progressPercentage}%</span>
                    </div>
                    <div class="analytics-item">
                        <span class="analytics-label">Steps:</span>
                        <span class="analytics-value">${completedSteps}/${task.steps.length}</span>
                    </div>
                </div>
            </div>
        `;

        this.attachEventListeners();
        this.lastUpdateTime = Date.now();
    }

    renderStep(step, index) {
        const stepClass = [
            'task-step',
            step.isCompleted ? 'completed' : '',
            step.autoCompleted ? 'auto-completed' : ''
        ].filter(Boolean).join(' ');

        return `
            <div class="${stepClass}" data-step-id="${step.id}">
                <div class="step-main">
                    <label class="step-checkbox-container">
                        <input type="checkbox" 
                               class="step-checkbox" 
                               ${step.isCompleted ? 'checked' : ''}
                               data-step-id="${step.id}">
                        <span class="step-checkmark"></span>
                    </label>
                    
                    <div class="step-content">
                        <div class="step-header">
                            <span class="step-number">${index + 1}.</span>
                            <h5 class="step-title">${this.escapeHtml(step.title)}</h5>
                            <div class="step-meta">
                                <span class="step-duration">${step.expectedDuration}m</span>
                                ${step.autoCompleted ? '<span class="step-auto-badge" title="Automatically detected">🤖</span>' : ''}
                            </div>
                        </div>
                        
                        <p class="step-description">${this.escapeHtml(step.description)}</p>
                        
                        ${step.expectedApps.length > 0 ? `
                            <div class="step-apps">
                                <span class="apps-label">Apps:</span>
                                ${step.expectedApps.map(app => `<span class="app-badge">${this.escapeHtml(app)}</span>`).join('')}
                            </div>
                        ` : ''}
                        
                        ${step.completedAt ? `
                            <div class="step-completed-at">
                                ✅ Completed at ${new Date(step.completedAt).toLocaleTimeString()}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Header dragging
        const header = this.element.querySelector('.task-header');
        if (header) {
            header.addEventListener('mousedown', this.handleDragStart.bind(this));
        }

        // Control buttons
        const minimizeButton = this.element.querySelector('.control-button.minimize');
        if (minimizeButton) {
            minimizeButton.addEventListener('click', () => {
                if (this.isMinimized) {
                    this.expand();
                } else {
                    this.minimize();
                }
            });
        }

        const closeButton = this.element.querySelector('.control-button.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.hide();
            });
        }

        // Step checkboxes
        const checkboxes = this.element.querySelectorAll('.step-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const stepId = event.target.dataset.stepId;
                const completed = event.target.checked;
                this.handleStepToggle(stepId, completed);
            });
        });
    }

    async handleStepToggle(stepId, completed) {
        console.log('✅ Step toggled:', stepId, completed);
        
        try {
            // Update via engine if available
            if (window.taskBreakdownEngine && this.activeTask) {
                await window.taskBreakdownEngine.updateTaskProgress(
                    this.activeTask.id, 
                    stepId, 
                    completed, 
                    false // not auto-completed
                );
                
                // Refresh the task data
                this.activeTask = window.taskBreakdownEngine.getActiveTask();
                this.render();
                
                if (completed) {
                    const step = this.activeTask.steps.find(s => s.id === stepId);
                    if (step) {
                        this.celebrateStep(step);
                    }
                }
            }
        } catch (error) {
            console.error('❌ Failed to update step:', error);
        }
    }

    celebrateStep(step) {
        console.log('🎉 Celebrating step completion:', step.title);
        
        // Show temporary celebration message
        const celebration = document.createElement('div');
        celebration.className = 'step-celebration';
        celebration.textContent = `✅ Great job on "${step.title}"!`;
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(52, 211, 153, 0.9));
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
            pointer-events: none;
        `;
        
        document.body.appendChild(celebration);
        
        // Animate in and out
        celebration.style.opacity = '0';
        celebration.style.transform = 'translate(-50%, -60%) scale(0.8)';
        
        setTimeout(() => {
            celebration.style.transition = 'all 0.3s ease';
            celebration.style.opacity = '1';
            celebration.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        setTimeout(() => {
            celebration.style.opacity = '0';
            celebration.style.transform = 'translate(-50%, -40%) scale(0.9)';
        }, 2000);
        
        setTimeout(() => {
            celebration.remove();
        }, 2300);
    }

    celebrateCompletion(task) {
        console.log('🎉 Celebrating task completion:', task.title);
        
        // Show major celebration
        const celebration = document.createElement('div');
        celebration.className = 'task-completion-celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-emoji">🎉</div>
                <div class="celebration-title">Amazing!</div>
                <div class="celebration-message">You completed "${this.escapeHtml(task.title)}"!</div>
                <div class="celebration-subtitle">That's real accomplishment! ✨</div>
            </div>
        `;
        celebration.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10002;
            pointer-events: auto;
        `;
        
        const content = celebration.querySelector('.celebration-content');
        content.style.cssText = `
            background: linear-gradient(135deg, 
                rgba(16, 185, 129, 0.95) 0%, 
                rgba(52, 211, 153, 0.9) 50%,
                rgba(34, 197, 94, 0.85) 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(16, 185, 129, 0.5);
            max-width: 400px;
        `;
        
        // Style celebration elements
        const emoji = celebration.querySelector('.celebration-emoji');
        emoji.style.fontSize = '4rem';
        emoji.style.marginBottom = '16px';
        
        const title = celebration.querySelector('.celebration-title');
        title.style.cssText = 'font-size: 2rem; font-weight: bold; margin-bottom: 8px;';
        
        const message = celebration.querySelector('.celebration-message');
        message.style.cssText = 'font-size: 1.2rem; margin-bottom: 8px;';
        
        const subtitle = celebration.querySelector('.celebration-subtitle');
        subtitle.style.cssText = 'font-size: 1rem; opacity: 0.9;';
        
        document.body.appendChild(celebration);
        
        // Animate in
        celebration.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            celebration.style.transition = 'opacity 0.3s ease';
            celebration.style.opacity = '1';
            content.style.transition = 'transform 0.3s ease';
            content.style.transform = 'scale(1)';
        }, 10);
        
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            celebration.style.opacity = '0';
            content.style.transform = 'scale(0.9)';
        }, 3000);
        
        setTimeout(() => {
            celebration.remove();
        }, 3300);
        
        // Click to dismiss
        celebration.addEventListener('click', () => {
            celebration.style.opacity = '0';
            content.style.transform = 'scale(0.9)';
            setTimeout(() => celebration.remove(), 300);
        });
    }

    updateStepProgress(step) {
        if (!this.activeTask || !this.isVisible) return;
        
        // Find and update the step in the UI
        const stepElement = this.element.querySelector(`[data-step-id="${step.id}"]`);
        if (stepElement) {
            const checkbox = stepElement.querySelector('.step-checkbox');
            if (checkbox) {
                checkbox.checked = step.isCompleted;
                
                if (step.isCompleted) {
                    stepElement.classList.add('completed');
                    if (step.autoCompleted) {
                        stepElement.classList.add('auto-completed');
                    }
                }
            }
        }
        
        // Update progress bar
        this.updateProgressBar();
    }

    updateProgressBar() {
        if (!this.activeTask) return;
        
        const progressFill = this.element.querySelector('.task-progress-fill');
        const progressText = this.element.querySelector('.task-progress-text');
        
        if (progressFill && progressText) {
            const completedSteps = this.activeTask.steps.filter(s => s.isCompleted).length;
            const progressPercentage = Math.round(this.activeTask.progress * 100);
            
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${completedSteps}/${this.activeTask.steps.length} steps • ${progressPercentage}%`;
            
            if (progressPercentage >= 100) {
                progressFill.classList.add('completed');
            }
        }
    }

    handleDragStart(event) {
        this.isDragging = true;
        const rect = this.element.getBoundingClientRect();
        this.dragOffset = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        
        document.addEventListener('mousemove', this.handleDragMove.bind(this));
        document.addEventListener('mouseup', this.handleDragEnd.bind(this));
        
        event.preventDefault();
    }

    handleDragMove(event) {
        if (!this.isDragging) return;
        
        const x = event.clientX - this.dragOffset.x;
        const y = event.clientY - this.dragOffset.y;
        
        // Constrain to viewport
        const maxX = window.innerWidth - this.element.offsetWidth;
        const maxY = window.innerHeight - this.element.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(x, maxX));
        const constrainedY = Math.max(0, Math.min(y, maxY));
        
        this.element.style.left = `${constrainedX}px`;
        this.element.style.top = `${constrainedY}px`;
        this.element.style.right = 'auto';
        this.element.style.transform = 'none';
    }

    handleDragEnd() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.handleDragMove.bind(this));
        document.removeEventListener('mouseup', this.handleDragEnd.bind(this));
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    addStyles() {
        const existingStyles = document.getElementById('task-breakdown-ui-styles');
        if (existingStyles) return;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'task-breakdown-ui-styles';
        styleSheet.textContent = `
            .task-breakdown-ui.minimized .task-content {
                display: none;
            }
            
            .task-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                padding: 20px;
                margin: -1px -1px 0 -1px;
                background: linear-gradient(135deg, 
                    rgba(59, 130, 246, 0.15) 0%,
                    rgba(37, 99, 235, 0.1) 100%);
                border-radius: 16px 16px 0 0;
                border-bottom: 1px solid rgba(59, 130, 246, 0.3);
                cursor: move;
                user-select: none;
            }
            
            .task-title-section {
                flex: 1;
                min-width: 0;
            }
            
            .task-title {
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 8px 0;
                color: #e2e8f0;
                line-height: 1.3;
            }
            
            .task-meta {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .task-meta span {
                background: rgba(59, 130, 246, 0.2);
                color: #93c5fd;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
            }
            
            .task-controls {
                display: flex;
                gap: 8px;
                margin-left: 12px;
            }
            
            .control-button {
                width: 32px;
                height: 32px;
                border: none;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                transition: all 0.2s ease;
            }
            
            .control-button:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }
            
            .task-content {
                padding: 0 20px 20px 20px;
            }
            
            .task-content.hidden {
                display: none;
            }
            
            .task-progress-container {
                margin-bottom: 20px;
            }
            
            .task-progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 8px;
            }
            
            .task-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3b82f6, #06b6d4);
                border-radius: 4px;
                transition: width 0.5s ease;
            }
            
            .task-progress-fill.completed {
                background: linear-gradient(90deg, #10b981, #34d399);
            }
            
            .task-progress-text {
                font-size: 14px;
                color: #94a3b8;
                font-weight: 500;
            }
            
            .task-description {
                margin-bottom: 16px;
                padding: 12px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                border-left: 3px solid #3b82f6;
            }
            
            .task-description p {
                margin: 0;
                color: #cbd5e1;
                line-height: 1.5;
            }
            
            .task-insights {
                margin-bottom: 20px;
                padding: 12px;
                background: rgba(59, 130, 246, 0.1);
                border-radius: 8px;
                border: 1px solid rgba(59, 130, 246, 0.2);
            }
            
            .insight-item {
                display: flex;
                margin-bottom: 8px;
                align-items: flex-start;
            }
            
            .insight-item:last-child {
                margin-bottom: 0;
            }
            
            .insight-label {
                font-weight: 600;
                color: #93c5fd;
                margin-right: 8px;
                flex-shrink: 0;
            }
            
            .insight-text {
                color: #e2e8f0;
                line-height: 1.4;
            }
            
            .task-steps {
                margin-bottom: 20px;
            }
            
            .steps-title {
                font-size: 16px;
                font-weight: 600;
                margin: 0 0 16px 0;
                color: #e2e8f0;
            }
            
            .task-step {
                margin-bottom: 16px;
                padding: 16px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.2s ease;
            }
            
            .task-step:hover {
                background: rgba(255, 255, 255, 0.08);
                border-color: rgba(59, 130, 246, 0.3);
            }
            
            .task-step.completed {
                background: rgba(16, 185, 129, 0.1);
                border-color: rgba(16, 185, 129, 0.3);
            }
            
            .task-step.auto-completed {
                background: rgba(168, 85, 247, 0.1);
                border-color: rgba(168, 85, 247, 0.3);
            }
            
            .step-main {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }
            
            .step-checkbox-container {
                position: relative;
                cursor: pointer;
                user-select: none;
                flex-shrink: 0;
                margin-top: 2px;
            }
            
            .step-checkbox {
                position: absolute;
                opacity: 0;
                cursor: pointer;
            }
            
            .step-checkmark {
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid #64748b;
                border-radius: 4px;
                display: block;
                transition: all 0.2s ease;
                position: relative;
            }
            
            .step-checkbox:checked ~ .step-checkmark {
                background: #10b981;
                border-color: #10b981;
            }
            
            .step-checkmark:after {
                content: "";
                position: absolute;
                display: none;
                left: 6px;
                top: 2px;
                width: 6px;
                height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
            
            .step-checkbox:checked ~ .step-checkmark:after {
                display: block;
            }
            
            .step-content {
                flex: 1;
                min-width: 0;
            }
            
            .step-header {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                gap: 8px;
            }
            
            .step-number {
                color: #64748b;
                font-weight: 600;
                font-size: 14px;
            }
            
            .step-title {
                font-size: 15px;
                font-weight: 600;
                margin: 0;
                color: #e2e8f0;
                flex: 1;
                line-height: 1.3;
            }
            
            .step-meta {
                display: flex;
                gap: 6px;
                align-items: center;
            }
            
            .step-duration {
                background: rgba(59, 130, 246, 0.2);
                color: #93c5fd;
                padding: 2px 6px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 500;
            }
            
            .step-auto-badge {
                font-size: 12px;
                opacity: 0.8;
            }
            
            .step-description {
                color: #94a3b8;
                margin: 0 0 12px 0;
                line-height: 1.4;
                font-size: 14px;
            }
            
            .step-apps {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                flex-wrap: wrap;
            }
            
            .apps-label {
                font-size: 12px;
                color: #64748b;
                font-weight: 500;
            }
            
            .app-badge {
                background: rgba(168, 85, 247, 0.2);
                color: #c4b5fd;
                padding: 2px 6px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 500;
            }
            
            .step-completed-at {
                font-size: 12px;
                color: #10b981;
                font-weight: 500;
            }
            
            .task-completion {
                text-align: center;
                padding: 20px;
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(52, 211, 153, 0.1));
                border-radius: 12px;
                border: 1px solid rgba(16, 185, 129, 0.3);
                margin-bottom: 16px;
            }
            
            .completion-message {
                font-size: 18px;
                font-weight: 600;
                color: #34d399;
                margin-bottom: 8px;
            }
            
            .completion-stats {
                font-size: 14px;
                color: #94a3b8;
            }
            
            .task-analytics {
                display: flex;
                justify-content: space-between;
                padding: 12px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                border-top: 2px solid rgba(59, 130, 246, 0.3);
            }
            
            .analytics-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
            }
            
            .analytics-label {
                font-size: 12px;
                color: #64748b;
                font-weight: 500;
            }
            
            .analytics-value {
                font-size: 14px;
                color: #e2e8f0;
                font-weight: 600;
            }
            
            .task-empty {
                padding: 40px 20px;
                text-align: center;
                color: #64748b;
                font-size: 16px;
            }
        `;
        
        document.head.appendChild(styleSheet);
    }
}

// Create singleton instance
const taskBreakdownUI = new TaskBreakdownUI();

// Make available globally
window.taskBreakdownUI = taskBreakdownUI;

// Global interface methods for compatibility
window.showTaskBreakdownUI = (task) => {
    taskBreakdownUI.setActiveTask(task);
};

window.hideTaskBreakdownUI = () => {
    taskBreakdownUI.hide();
};

window.getActiveTaskBreakdown = () => {
    return taskBreakdownUI.activeTask;
};

console.log('✅ Task Breakdown UI loaded and ready');