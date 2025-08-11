// 🧠 AI-Powered Task Breakdown Engine (JS Version)
// "Making big tasks feel doable" - Intelligent task analysis and micro-step generation

console.log('🧠 Loading Task Breakdown Engine (JS)...');

/**
 * TaskBreakdownEngine: Advanced AI-powered task analysis system
 * 
 * Core Features:
 * - Natural language intention detection ("I need to..." parsing)
 * - GPT-4 powered task analysis and breakdown
 * - Neurodivergent-friendly micro-step generation (2-5 minutes each)
 * - Context-aware app suggestions for each step
 * - Real-time progress tracking with screen intelligence
 * - Learning system for user preferences and patterns
 */

class TaskBreakdownEngine {
    constructor() {
        console.log('🧠 Initializing AI-Powered Task Breakdown Engine...');
        
        // Default user patterns - will learn and adapt
        this.patterns = {
            preferredStepDuration: 5, // 5-minute default
            commonApps: ['Chrome', 'Safari', 'VSCode', 'Word', 'Notes', 'Finder'],
            optimalTimes: ['morning', 'afternoon'],
            completionStyle: 'sequential',
            motivationTypes: ['progress', 'gentle_nudge']
        };
        
        this.taskHistory = [];
        this.isActive = false;
        this.aiAnalysisCache = new Map();
        
        this.loadPatterns();
    }

    /**
     * Initialize the engine with required dependencies
     */
    async initialize() {
        try {
            console.log('🚀 Starting Task Breakdown Engine initialization...');
            
            // Check for required APIs
            if (!window.electronAPI) {
                throw new Error('Electron API not available');
            }
            
            // Load user patterns from storage
            await this.loadPatterns();
            
            // Initialize AI system connection
            await this.testAIConnection();
            
            this.isActive = true;
            console.log('✅ Task Breakdown Engine fully operational');
            
            return true;
            
        } catch (error) {
            console.error('❌ Task Breakdown Engine initialization failed:', error);
            this.isActive = false;
            return false;
        }
    }

    /**
     * CORE METHOD: Detect intentions from user input and create task breakdown
     */
    async analyzeAndBreakdownTask(userInput) {
        if (!this.isActive) {
            console.warn('⚠️ Task Breakdown Engine not active');
            return null;
        }

        try {
            console.log('🧠 Analyzing task intention:', userInput.substring(0, 50) + '...');
            
            // 1. Detect if this is a task intention
            const intention = await this.detectIntention(userInput);
            if (!intention.isTask) {
                console.log('💭 Not a task intention, skipping breakdown');
                return null;
            }

            // 2. AI-powered task analysis
            const analysis = await this.performAIAnalysis(userInput);
            
            // 3. Generate intelligent breakdown
            const breakdown = await this.generateTaskBreakdown(userInput, analysis);
            
            // 4. Create structured task object
            const task = this.createTaskFromBreakdown(userInput, analysis, breakdown);
            
            // 5. Store for learning
            this.taskHistory.push(task);
            await this.saveTaskHistory();
            
            console.log('✅ Task breakdown completed:', {
                title: task.title,
                steps: task.steps.length,
                estimatedDuration: task.estimatedDuration,
                complexity: task.complexity
            });
            
            return task;
            
        } catch (error) {
            console.error('❌ Task analysis failed:', error);
            return null;
        }
    }

    /**
     * Detect if user input contains task intention
     */
    async detectIntention(input) {
        const taskIndicators = [
            'i need to', 'i have to', 'i should', 'i want to', 'i must',
            'need to', 'have to', 'should do', 'going to',
            'planning to', 'trying to', 'working on',
            'help me', 'can you help', 'how do i'
        ];
        
        const lowerInput = input.toLowerCase();
        
        // Check for explicit task indicators
        const hasIndicator = taskIndicators.some(indicator => lowerInput.includes(indicator));
        
        if (hasIndicator) {
            // Use AI for more nuanced detection
            try {
                const analysis = await this.performIntentionAnalysis(input);
                return {
                    isTask: analysis.isTask,
                    confidence: analysis.confidence,
                    type: analysis.taskType
                };
            } catch {
                return { isTask: true, confidence: 0.7, type: 'general' };
            }
        }
        
        return { isTask: false, confidence: 0, type: 'none' };
    }

    /**
     * AI-powered intention analysis
     */
    async performIntentionAnalysis(input) {
        const cacheKey = `intention_${input.substring(0, 50)}`;
        if (this.aiAnalysisCache.has(cacheKey)) {
            return this.aiAnalysisCache.get(cacheKey);
        }

        try {
            const prompt = `Analyze this user input for task intention:

Input: "${input}"

Respond with JSON:
{
  "isTask": boolean,
  "confidence": 0-1,
  "taskType": "writing|coding|research|creative|admin|communication|learning|other",
  "urgency": "low|medium|high",
  "complexity": "simple|medium|complex",
  "detectedIntention": "brief description of what user wants to do"
}

Look for:
- Explicit task statements ("I need to write...")
- Requests for help ("Help me create...")
- Planning language ("I'm going to...")
- Problem descriptions that imply action needed

For neurodivergent users, be especially attentive to:
- Overwhelming language ("this huge project")
- Avoidance indicators ("I keep putting off...")
- Perfectionism concerns ("it needs to be perfect")`;

            const response = await this.callOpenAI(prompt, {
                maxTokens: 150,
                temperature: 0.3
            });

            const analysis = JSON.parse(response);
            this.aiAnalysisCache.set(cacheKey, analysis);
            
            return analysis;
            
        } catch (error) {
            console.error('❌ Intention analysis failed:', error);
            return {
                isTask: true,
                confidence: 0.5,
                taskType: 'other',
                urgency: 'medium',
                complexity: 'medium',
                detectedIntention: 'Task detected but analysis failed'
            };
        }
    }

    /**
     * Comprehensive AI analysis of the task
     */
    async performAIAnalysis(input) {
        try {
            const currentTime = new Date();
            const timeContext = {
                time: currentTime.toLocaleTimeString(),
                day: currentTime.toLocaleDateString(),
                isWorkHours: currentTime.getHours() >= 9 && currentTime.getHours() <= 17
            };

            const prompt = `As a neurodivergent-friendly AI assistant, analyze this task request:

Input: "${input}"

Context: ${JSON.stringify(timeContext)}
User patterns: ${JSON.stringify(this.patterns)}

Provide a comprehensive analysis in JSON:
{
  "title": "Clear, friendly task title",
  "description": "Brief, encouraging description",
  "type": "writing|coding|research|creative|admin|communication|learning|other",
  "complexity": "simple|medium|complex",
  "urgency": "low|medium|high",
  "estimatedDuration": minutes_total,
  "contextualFactors": ["factor1", "factor2"],
  "personalizedSuggestions": ["suggestion1", "suggestion2"],
  "difficultyAssessment": "honest assessment of challenges"
}

Guidelines for neurodivergent support:
- Break overwhelming tasks into tiny, specific steps
- Suggest concrete starting points
- Account for hyperfocus vs. distractibility patterns
- Include transition time between different types of activities
- Celebrate every small win
- Be honest about difficulty while staying encouraging`;

            const response = await this.callOpenAI(prompt, {
                maxTokens: 400,
                temperature: 0.4
            });

            return JSON.parse(response);
            
        } catch (error) {
            console.error('❌ AI analysis failed:', error);
            // Fallback analysis
            return {
                title: 'Task to Complete',
                description: 'Let\\'s break this down together',
                type: 'other',
                complexity: 'medium',
                urgency: 'medium',
                estimatedDuration: 30,
                contextualFactors: [],
                personalizedSuggestions: [],
                difficultyAssessment: 'We\\'ll take it step by step'
            };
        }
    }

    /**
     * Generate detailed task breakdown with micro-steps
     */
    async generateTaskBreakdown(input, analysis) {
        try {
            const prompt = `Create a detailed breakdown for this task:

Task: "${input}"
Analysis: ${JSON.stringify(analysis)}

Create 3-7 micro-steps, each 2-5 minutes long. Return JSON array:
[
  {
    "title": "Clear, actionable step title",
    "description": "Specific instructions for this step", 
    "expectedDuration": minutes,
    "expectedApps": ["app1", "app2"],
    "confidence": 0.8
  }
]

Micro-step principles:
- Each step should feel completely doable
- Start with the absolute easiest thing
- Include prep steps (opening apps, finding files)
- Be specific about what "done" looks like
- Suggest specific apps/tools for each step
- Account for executive function challenges
- Include transition buffers for complex steps

Common apps to suggest:
- Writing: Word, Google Docs, Notes, Notion
- Coding: VSCode, Terminal, Chrome (for testing)
- Research: Chrome, Safari, Notes, Obsidian
- Creative: Figma, Photoshop, Canva, Sketch
- Admin: Email, Calendar, Finder, Excel
- Communication: Slack, Email, Messages, Zoom

Example good micro-step:
"Open Google Docs and create a new document with your name and today's date as the title. Just type one sentence about what you want to accomplish. (3 minutes)"`;

            const response = await this.callOpenAI(prompt, {
                maxTokens: 600,
                temperature: 0.5
            });

            const steps = JSON.parse(response);
            
            return steps.map((step, index) => ({
                id: `step_${Date.now()}_${index}`,
                title: step.title,
                description: step.description,
                expectedDuration: step.expectedDuration || 5,
                expectedApps: step.expectedApps || [],
                isCompleted: false,
                autoCompleted: false,
                confidence: step.confidence || 0.8
            }));
            
        } catch (error) {
            console.error('❌ Task breakdown generation failed:', error);
            // Fallback breakdown
            return this.generateFallbackBreakdown(input, analysis);
        }
    }

    /**
     * Fallback breakdown when AI fails
     */
    generateFallbackBreakdown(input, analysis) {
        return [
            {
                id: `step_${Date.now()}_0`,
                title: 'Set up your workspace',
                description: 'Open the apps you\\'ll need and clear some mental space. Take a breath!',
                expectedDuration: 3,
                expectedApps: analysis.type === 'writing' ? ['Word', 'Google Docs'] : ['Chrome'],
                isCompleted: false,
                autoCompleted: false,
                confidence: 0.9
            },
            {
                id: `step_${Date.now()}_1`,
                title: 'Start with the smallest piece',
                description: 'Focus on just the first tiny step. Don\\'t worry about the whole thing yet.',
                expectedDuration: 5,
                expectedApps: [],
                isCompleted: false,
                autoCompleted: false,
                confidence: 0.8
            },
            {
                id: `step_${Date.now()}_2`,
                title: 'Check progress and celebrate',
                description: 'Look at what you\\'ve accomplished! Even small progress counts.',
                expectedDuration: 2,
                expectedApps: [],
                isCompleted: false,
                autoCompleted: false,
                confidence: 0.9
            }
        ];
    }

    /**
     * Create structured task object from breakdown
     */
    createTaskFromBreakdown(input, analysis, steps) {
        return {
            id: `task_${Date.now()}`,
            originalInput: input,
            title: analysis.title || 'Task to Complete',
            description: analysis.description || 'Let\\'s break this down together',
            complexity: analysis.complexity || 'medium',
            urgency: analysis.urgency || 'medium',
            type: analysis.type || 'other',
            estimatedDuration: steps.reduce((sum, step) => sum + step.expectedDuration, 0),
            steps: steps,
            createdAt: Date.now(),
            isActive: true,
            progress: 0,
            aiAnalysis: {
                detectedIntention: analysis.detectedIntention || 'Task breakdown requested',
                contextualFactors: analysis.contextualFactors || [],
                personalizedSuggestions: analysis.personalizedSuggestions || [],
                difficultyAssessment: analysis.difficultyAssessment || 'Let\\'s take it step by step'
            }
        };
    }

    /**
     * Update task progress when user completes steps
     */
    async updateTaskProgress(taskId, stepId, completed, autoCompleted = false) {
        const task = this.taskHistory.find(t => t.id === taskId);
        if (!task) return;

        const step = task.steps.find(s => s.id === stepId);
        if (!step) return;

        step.isCompleted = completed;
        step.autoCompleted = autoCompleted;
        if (completed) {
            step.completedAt = Date.now();
        }

        // Recalculate progress
        const completedSteps = task.steps.filter(s => s.isCompleted).length;
        task.progress = completedSteps / task.steps.length;

        // Check if task is fully completed
        if (task.progress >= 1.0 && !task.completedAt) {
            task.completedAt = Date.now();
            await this.celebrateCompletion(task);
        }

        await this.saveTaskHistory();
        console.log(`✅ Task progress updated: ${(task.progress * 100).toFixed(1)}%`);
    }

    /**
     * Celebrate task completion
     */
    async celebrateCompletion(task) {
        try {
            // Trigger celebration in UI
            if (window.addMessage) {
                const messages = [
                    `🎉 Amazing! You completed "${task.title}"! That took real effort and you did it! ✨`,
                    `💪 Look at you go! "${task.title}" is DONE! Every step you took mattered! 🌟`,
                    `🎯 YES! You just crushed "${task.title}"! Your brain is incredible! 💙`
                ];
                const message = messages[Math.floor(Math.random() * messages.length)];
                window.addMessage(message, 'velvet');
            }

            // Update user patterns based on completion
            await this.learnFromCompletion(task);
            
        } catch (error) {
            console.error('❌ Celebration failed:', error);
        }
    }

    /**
     * Learn from completed tasks to improve future breakdowns
     */
    async learnFromCompletion(task) {
        try {
            // Analyze completion patterns
            const actualDuration = task.completedAt - task.createdAt;
            const estimatedDuration = task.estimatedDuration * 60 * 1000; // convert to ms
            
            // Update patterns based on what worked
            if (actualDuration < estimatedDuration * 1.2) {
                // Task completed on time or early - good estimation
                console.log('📈 Learning: Good time estimation for', task.type);
            } else {
                // Task took longer - adjust future estimates
                console.log('📈 Learning: Adjust time estimates for', task.type);
            }

            // Learn app usage patterns
            const completedSteps = task.steps.filter(s => s.isCompleted);
            const commonApps = completedSteps.flatMap(s => s.expectedApps);
            
            // Update user patterns
            this.patterns.commonApps = [...new Set([...this.patterns.commonApps, ...commonApps])];
            
            await this.savePatterns();
            
        } catch (error) {
            console.error('❌ Learning from completion failed:', error);
        }
    }

    /**
     * Get active task for UI display
     */
    getActiveTask() {
        return this.taskHistory.find(t => t.isActive && !t.completedAt) || null;
    }

    /**
     * Get recent tasks for context
     */
    getRecentTasks(limit = 10) {
        return this.taskHistory
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, limit);
    }

    /**
     * Call OpenAI API for AI analysis
     */
    async callOpenAI(prompt, options = {}) {
        try {
            if (!window.electronAPI) {
                throw new Error('Electron API not available');
            }

            const messages = [
                {
                    role: 'system',
                    content: 'You are Velvet, a neurodivergent-friendly AI assistant. You help break down overwhelming tasks into manageable micro-steps. You are warm, encouraging, and understand executive dysfunction. Always respond with valid JSON when requested.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ];

            const response = await window.electronAPI.invoke('openai-completion', {
                model: 'gpt-4',
                messages: messages,
                max_tokens: options.maxTokens || 300,
                temperature: options.temperature || 0.4
            });

            return response.choices?.[0]?.message?.content || '';
            
        } catch (error) {
            console.error('❌ OpenAI call failed:', error);
            throw error;
        }
    }

    /**
     * Test AI connection
     */
    async testAIConnection() {
        try {
            const testResponse = await this.callOpenAI('Respond with: {"status": "connected"}');
            const parsed = JSON.parse(testResponse);
            if (parsed.status === 'connected') {
                console.log('✅ AI connection verified');
            } else {
                throw new Error('Unexpected AI response');
            }
        } catch (error) {
            console.warn('⚠️ AI connection test failed:', error);
            // Don't throw - allow engine to work with fallbacks
        }
    }

    /**
     * Load user patterns from storage
     */
    async loadPatterns() {
        try {
            if (window.electronAPI?.storage) {
                const saved = await window.electronAPI.storage.get('task_patterns');
                if (saved) {
                    this.patterns = { ...this.patterns, ...saved };
                    console.log('📈 User patterns loaded');
                }
            }
        } catch (error) {
            console.warn('⚠️ Could not load patterns:', error);
        }
    }

    /**
     * Save user patterns to storage
     */
    async savePatterns() {
        try {
            if (window.electronAPI?.storage) {
                await window.electronAPI.storage.set('task_patterns', this.patterns);
                console.log('💾 User patterns saved');
            }
        } catch (error) {
            console.warn('⚠️ Could not save patterns:', error);
        }
    }

    /**
     * Save task history to storage
     */
    async saveTaskHistory() {
        try {
            if (window.electronAPI?.storage) {
                // Keep only recent tasks to avoid storage bloat
                const recentTasks = this.taskHistory.slice(-50);
                await window.electronAPI.storage.set('task_history', recentTasks);
                console.log('💾 Task history saved');
            }
        } catch (error) {
            console.warn('⚠️ Could not save task history:', error);
        }
    }

    /**
     * Get engine metrics and status
     */
    getMetrics() {
        const activeTask = this.getActiveTask();
        const completedTasks = this.taskHistory.filter(t => t.completedAt);
        
        return {
            isActive: this.isActive,
            totalTasks: this.taskHistory.length,
            completedTasks: completedTasks.length,
            activeTask: activeTask ? {
                id: activeTask.id,
                title: activeTask.title,
                progress: activeTask.progress,
                stepsCompleted: activeTask.steps.filter(s => s.isCompleted).length,
                totalSteps: activeTask.steps.length
            } : null,
            userPatterns: this.patterns,
            cacheSize: this.aiAnalysisCache.size
        };
    }

    /**
     * Shutdown engine
     */
    async shutdown() {
        console.log('🧠 Shutting down Task Breakdown Engine...');
        
        this.isActive = false;
        await this.saveTaskHistory();
        await this.savePatterns();
        this.aiAnalysisCache.clear();
        
        console.log('✅ Task Breakdown Engine shutdown complete');
    }
}

// Create singleton instance
const taskBreakdownEngine = new TaskBreakdownEngine();

// Make available globally
window.taskBreakdownEngine = taskBreakdownEngine;

console.log('🧠 TaskBreakdownEngine (JS) loaded and ready');