// 🧠 Task Breakdown Engine - AI-Powered Task Analysis & Micro-Step Generation
// "Breaking big overwhelm into tiny wins" - Intelligent task decomposition for neurodivergent minds

/**
 * TaskBreakdownEngine: AI-powered system for intelligent task analysis and breakdown
 * 
 * Purpose: Transform overwhelming tasks into manageable 2-5 minute micro-steps
 * 
 * Features:
 * - OpenAI GPT-4 powered task analysis
 * - Neurodivergent-optimized micro-step generation
 * - ADHD-friendly time estimation (realistic 2-5 minute chunks)
 * - Expected application suggestions for each step
 * - Intention detection from natural language
 * - Context-aware task difficulty assessment
 * - Executive dysfunction-friendly progress tracking
 */

export interface TaskStep {
    id: string;
    title: string;
    description: string;
    estimatedMinutes: number;
    expectedApps: string[];
    difficulty: 'easy' | 'medium' | 'challenging';
    completed: boolean;
    completedAt?: Date;
    tips?: string[];
    completionConfidence?: number; // How confident we are this step is done (0-1)
}

export interface TaskBreakdown {
    id: string;
    title: string;
    originalInput: string;
    description: string;
    totalEstimatedMinutes: number;
    steps: TaskStep[];
    priority: 'low' | 'medium' | 'high' | 'urgent';
    category: string;
    createdAt: Date;
    completedSteps: number;
    isCompleted: boolean;
    completedAt?: Date;
    executiveDysfunction: {
        overwhelmRisk: number; // 0-1 scale
        procrastinationLikely: boolean;
        focusRequirement: 'low' | 'medium' | 'high';
        energyRequirement: 'low' | 'medium' | 'high';
        dopamineReward: 'immediate' | 'delayed' | 'cumulative';
    };
}

export interface TaskAnalysis {
    isTask: boolean;
    confidence: number;
    taskType?: 'work' | 'personal' | 'creative' | 'admin' | 'learning' | 'health';
    complexity?: 'simple' | 'moderate' | 'complex' | 'overwhelming';
    urgency?: 'low' | 'medium' | 'high' | 'critical';
    emotionalTone?: 'excited' | 'anxious' | 'neutral' | 'overwhelmed' | 'procrastinating';
    keywords?: string[];
}

class TaskBreakdownEngine {
    private aiEndpoint: string = '/api/openai'; // Will use main process IPC
    private isInitialized: boolean = false;
    private taskHistory: TaskBreakdown[] = [];
    
    // Executive dysfunction-aware prompts
    private readonly ANALYSIS_PROMPT = `
You are Velvet, a gentle AI assistant specializing in helping neurodivergent minds (ADHD, autism, executive dysfunction).

Analyze the following user input and determine if it contains a task that needs to be broken down:

User input: "{{INPUT}}"

Consider:
- Does this express intention to do something?
- Is it a task, project, or goal?
- Would breaking it down help someone with ADHD/executive dysfunction?
- Look for phrases like "I need to", "I have to", "I should", "help me", "how do I"

Respond in JSON format:
{
  "isTask": boolean,
  "confidence": 0-1,
  "taskType": "work|personal|creative|admin|learning|health",
  "complexity": "simple|moderate|complex|overwhelming", 
  "urgency": "low|medium|high|critical",
  "emotionalTone": "excited|anxious|neutral|overwhelmed|procrastinating",
  "keywords": ["key", "words", "extracted"]
}
`;

    private readonly BREAKDOWN_PROMPT = `
You are Velvet, a caring AI assistant specialized in helping neurodivergent minds break down overwhelming tasks.

Your user has executive dysfunction, ADHD, and/or autism. They need:
- Tasks broken into 2-5 minute micro-steps
- Clear, specific actions (no vague instructions)
- Realistic time estimates
- Gentle, encouraging language
- Expected applications/tools for each step
- Tips for common obstacles

CRITICAL RULES:
1. Each step must be completable in 2-5 minutes
2. Use encouraging, gentle language
3. Never overwhelm - if task is big, focus on getting started
4. Include specific app/tool suggestions
5. Consider energy levels and dopamine hits

Task to break down: "{{TASK}}"
Context: {{CONTEXT}}

Create a JSON response:
{
  "title": "Clear, non-overwhelming task title",
  "description": "Gentle, encouraging description", 
  "totalEstimatedMinutes": realistic_total,
  "priority": "low|medium|high|urgent",
  "category": "descriptive category",
  "steps": [
    {
      "title": "Specific 2-5 min action",
      "description": "Clear what to do",
      "estimatedMinutes": 2-5,
      "expectedApps": ["app1", "app2"],
      "difficulty": "easy|medium|challenging", 
      "tips": ["helpful tip if needed"]
    }
  ],
  "executiveDysfunction": {
    "overwhelmRisk": 0-1,
    "procrastinationLikely": boolean,
    "focusRequirement": "low|medium|high",
    "energyRequirement": "low|medium|high", 
    "dopamineReward": "immediate|delayed|cumulative"
  }
}
`;

    constructor() {
        console.log('🧠 Initializing Task Breakdown Engine...');
    }

    /**
     * Initialize the task breakdown engine
     */
    async initialize(): Promise<boolean> {
        try {
            console.log('🧠 Starting Task Breakdown Engine initialization...');
            
            // Test connection to main process OpenAI API
            const testResponse = await this.testOpenAIConnection();
            
            if (!testResponse.success) {
                console.error('❌ OpenAI connection test failed:', testResponse.error);
                return false;
            }
            
            // Load any persisted task history
            await this.loadTaskHistory();
            
            this.isInitialized = true;
            console.log('✅ Task Breakdown Engine fully operational');
            
            // Make engine globally available
            if (typeof window !== 'undefined') {
                (window as any).taskBreakdownEngine = this;
            }
            
            return true;
            
        } catch (error) {
            console.error('❌ Task Breakdown Engine initialization failed:', error);
            this.isInitialized = false;
            return false;
        }
    }

    /**
     * Test connection to OpenAI via main process
     */
    private async testOpenAIConnection(): Promise<{ success: boolean; error?: string }> {
        try {
            // Simple test prompt
            const testPrompt = "Respond with just 'OK' to test the connection.";
            
            if (typeof window !== 'undefined' && (window as any).electronAPI?.openai) {
                const response = await (window as any).electronAPI.openai.chat(testPrompt, {
                    maxTokens: 10,
                    temperature: 0
                });
                
                if (response && response.includes('OK')) {
                    return { success: true };
                }
            }
            
            // Fallback to direct fetch if electronAPI not available
            if (typeof window !== 'undefined' && window.fetch) {
                const response = await fetch('/api/test-openai', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: testPrompt })
                });
                
                if (response.ok) {
                    return { success: true };
                }
            }
            
            return { success: false, error: 'No OpenAI connection available' };
            
        } catch (error) {
            return { success: false, error: (error as Error).message };
        }
    }

    /**
     * Analyze user input to detect task intentions
     */
    async analyzeUserInput(input: string, context?: any): Promise<TaskAnalysis> {
        if (!this.isInitialized) {
            console.warn('⚠️ Task Breakdown Engine not initialized');
            return { isTask: false, confidence: 0 };
        }

        try {
            console.log('🧠 Analyzing user input for task intentions...');
            
            // Prepare the analysis prompt
            const prompt = this.ANALYSIS_PROMPT.replace('{{INPUT}}', input);
            
            // Get AI analysis
            const aiResponse = await this.callOpenAI(prompt, {
                maxTokens: 200,
                temperature: 0.3
            });
            
            if (!aiResponse) {
                throw new Error('No response from OpenAI');
            }
            
            // Parse JSON response
            let analysis: TaskAnalysis;
            try {
                analysis = JSON.parse(aiResponse);
            } catch (parseError) {
                console.warn('⚠️ Failed to parse AI analysis, using fallback detection');
                return this.fallbackTaskDetection(input);
            }
            
            // Validate and enhance analysis
            analysis.confidence = Math.max(0, Math.min(1, analysis.confidence || 0));
            
            console.log('🧠 Task analysis completed:', {
                isTask: analysis.isTask,
                confidence: analysis.confidence,
                taskType: analysis.taskType,
                complexity: analysis.complexity
            });
            
            return analysis;
            
        } catch (error) {
            console.error('❌ Task analysis failed:', error);
            
            // Fallback to pattern-based detection
            return this.fallbackTaskDetection(input);
        }
    }

    /**
     * Analyze AND breakdown task in one operation (most common use case)
     */
    async analyzeAndBreakdownTask(input: string, context?: any): Promise<TaskBreakdown | null> {
        try {
            console.log('🧠 Analyzing and breaking down task...');
            
            // First, analyze if this is a task
            const analysis = await this.analyzeUserInput(input, context);
            
            if (!analysis.isTask || analysis.confidence < 0.6) {
                console.log('🧠 Input does not appear to be a task (confidence: ' + analysis.confidence + ')');
                return null;
            }
            
            console.log('🧠 Task detected with ' + (analysis.confidence * 100).toFixed(0) + '% confidence, proceeding with breakdown...');
            
            // Create the breakdown
            return await this.createTaskBreakdown(input, analysis, context);
            
        } catch (error) {
            console.error('❌ Analyze and breakdown failed:', error);
            return null;
        }
    }

    /**
     * Create a detailed task breakdown using AI
     */
    async createTaskBreakdown(
        taskInput: string, 
        analysis?: TaskAnalysis, 
        context?: any
    ): Promise<TaskBreakdown> {
        if (!this.isInitialized) {
            throw new Error('Task Breakdown Engine not initialized');
        }

        try {
            console.log('🧠 Creating AI-powered task breakdown...');
            
            // Prepare context information
            const contextInfo = {
                taskType: analysis?.taskType || 'unknown',
                complexity: analysis?.complexity || 'moderate',
                urgency: analysis?.urgency || 'medium',
                emotionalTone: analysis?.emotionalTone || 'neutral',
                userContext: context || {}
            };
            
            // Prepare the breakdown prompt
            const prompt = this.BREAKDOWN_PROMPT
                .replace('{{TASK}}', taskInput)
                .replace('{{CONTEXT}}', JSON.stringify(contextInfo));
            
            // Get AI breakdown
            const aiResponse = await this.callOpenAI(prompt, {
                maxTokens: 1500,
                temperature: 0.7
            });
            
            if (!aiResponse) {
                throw new Error('No response from OpenAI for task breakdown');
            }
            
            // Parse and validate the breakdown
            let breakdown: any;
            try {
                breakdown = JSON.parse(aiResponse);
            } catch (parseError) {
                console.warn('⚠️ Failed to parse AI breakdown, creating fallback');
                return this.createFallbackBreakdown(taskInput, analysis);
            }
            
            // Create the full TaskBreakdown object
            const taskBreakdown: TaskBreakdown = {
                id: this.generateTaskId(),
                title: breakdown.title || taskInput,
                originalInput: taskInput,
                description: breakdown.description || "Let's break this down into manageable steps!",
                totalEstimatedMinutes: breakdown.totalEstimatedMinutes || 15,
                steps: this.processSteps(breakdown.steps || []),
                priority: breakdown.priority || 'medium',
                category: breakdown.category || 'General',
                createdAt: new Date(),
                completedSteps: 0,
                isCompleted: false,
                executiveDysfunction: breakdown.executiveDysfunction || {
                    overwhelmRisk: 0.3,
                    procrastinationLikely: false,
                    focusRequirement: 'medium',
                    energyRequirement: 'medium',
                    dopamineReward: 'cumulative'
                }
            };
            
            // Store in history
            this.taskHistory.push(taskBreakdown);
            await this.saveTaskHistory();
            
            console.log('✅ Task breakdown created:', {
                title: taskBreakdown.title,
                steps: taskBreakdown.steps.length,
                totalMinutes: taskBreakdown.totalEstimatedMinutes
            });
            
            return taskBreakdown;
            
        } catch (error) {
            console.error('❌ Task breakdown creation failed:', error);
            
            // Create a fallback breakdown
            return this.createFallbackBreakdown(taskInput, analysis);
        }
    }

    /**
     * Process and validate AI-generated steps
     */
    private processSteps(aiSteps: any[]): TaskStep[] {
        const steps: TaskStep[] = [];
        
        for (let i = 0; i < aiSteps.length; i++) {
            const aiStep = aiSteps[i];
            
            const step: TaskStep = {
                id: `step_${Date.now()}_${i}`,
                title: aiStep.title || `Step ${i + 1}`,
                description: aiStep.description || "Complete this step",
                estimatedMinutes: Math.max(1, Math.min(10, aiStep.estimatedMinutes || 3)), // Clamp to 1-10 minutes
                expectedApps: Array.isArray(aiStep.expectedApps) ? aiStep.expectedApps : [],
                difficulty: ['easy', 'medium', 'challenging'].includes(aiStep.difficulty) 
                    ? aiStep.difficulty : 'medium',
                completed: false,
                tips: Array.isArray(aiStep.tips) ? aiStep.tips : undefined
            };
            
            steps.push(step);
        }
        
        // Ensure we have at least one step
        if (steps.length === 0) {
            steps.push({
                id: `step_${Date.now()}_0`,
                title: "Get started",
                description: "Take the first small step toward this task",
                estimatedMinutes: 3,
                expectedApps: [],
                difficulty: 'easy',
                completed: false
            });
        }
        
        return steps;
    }

    /**
     * Mark a step as completed
     */
    completeStep(taskId: string, stepId: string): boolean {
        const task = this.taskHistory.find(t => t.id === taskId);
        if (!task) return false;
        
        const step = task.steps.find(s => s.id === stepId);
        if (!step) return false;
        
        if (!step.completed) {
            step.completed = true;
            step.completedAt = new Date();
            task.completedSteps++;
            
            // Check if task is fully completed
            if (task.completedSteps >= task.steps.length) {
                task.isCompleted = true;
                task.completedAt = new Date();
                console.log('🎉 Task completed:', task.title);
            }
            
            this.saveTaskHistory();
            console.log('✅ Step completed:', step.title);
            return true;
        }
        
        return false;
    }

    /**
     * Get active (incomplete) tasks
     */
    getActiveTasks(): TaskBreakdown[] {
        return this.taskHistory.filter(task => !task.isCompleted);
    }

    /**
     * Get recent task history
     */
    getTaskHistory(limit: number = 10): TaskBreakdown[] {
        return this.taskHistory
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, limit);
    }

    /**
     * Call OpenAI API via main process
     */
    private async callOpenAI(prompt: string, options: {
        maxTokens?: number;
        temperature?: number;
    } = {}): Promise<string | null> {
        try {
            // Try main process IPC first (preferred)
            if (typeof window !== 'undefined' && (window as any).electronAPI?.openai) {
                const response = await (window as any).electronAPI.openai.chat(prompt, {
                    max_tokens: options.maxTokens || 500,
                    temperature: options.temperature || 0.7
                });
                
                return response;
            }
            
            // Fallback to global AI system if available
            if (typeof window !== 'undefined' && (window as any).getVelvetResponse) {
                const response = await (window as any).getVelvetResponse(prompt, {
                    maxLength: options.maxTokens || 500,
                    temperature: options.temperature || 0.7
                });
                
                return response;
            }
            
            throw new Error('No OpenAI API connection available');
            
        } catch (error) {
            console.error('❌ OpenAI API call failed:', error);
            return null;
        }
    }

    /**
     * Fallback task detection using pattern matching
     */
    private fallbackTaskDetection(input: string): TaskAnalysis {
        const taskIndicators = [
            'i need to', 'i have to', 'i should', 'i want to', 'i must',
            'need to', 'have to', 'should do', 'going to',
            'planning to', 'trying to', 'working on',
            'help me', 'can you help', 'how do i', 'break down',
            'task', 'project', 'assignment', 'work on'
        ];
        
        const lowerInput = input.toLowerCase();
        const hasIndicator = taskIndicators.some(indicator => lowerInput.includes(indicator));
        
        return {
            isTask: hasIndicator,
            confidence: hasIndicator ? 0.7 : 0.2,
            taskType: hasIndicator ? 'work' : undefined,
            complexity: 'moderate',
            urgency: 'medium',
            emotionalTone: 'neutral'
        };
    }

    /**
     * Create a simple fallback breakdown when AI fails
     */
    private createFallbackBreakdown(taskInput: string, analysis?: TaskAnalysis): TaskBreakdown {
        console.log('🧠 Creating fallback task breakdown...');
        
        return {
            id: this.generateTaskId(),
            title: taskInput,
            originalInput: taskInput,
            description: "Let's break this down into smaller, manageable steps.",
            totalEstimatedMinutes: 15,
            steps: [
                {
                    id: `step_${Date.now()}_1`,
                    title: "Start with the easiest part",
                    description: "Begin with whatever feels most doable right now",
                    estimatedMinutes: 5,
                    expectedApps: [],
                    difficulty: 'easy',
                    completed: false
                },
                {
                    id: `step_${Date.now()}_2`,
                    title: "Take the next small step",
                    description: "Focus on just the next tiny piece",
                    estimatedMinutes: 5,
                    expectedApps: [],
                    difficulty: 'medium',
                    completed: false
                },
                {
                    id: `step_${Date.now()}_3`,
                    title: "Celebrate progress",
                    description: "Acknowledge what you've accomplished!",
                    estimatedMinutes: 2,
                    expectedApps: [],
                    difficulty: 'easy',
                    completed: false
                }
            ],
            priority: 'medium',
            category: 'General',
            createdAt: new Date(),
            completedSteps: 0,
            isCompleted: false,
            executiveDysfunction: {
                overwhelmRisk: 0.4,
                procrastinationLikely: true,
                focusRequirement: 'medium',
                energyRequirement: 'medium',
                dopamineReward: 'immediate'
            }
        };
    }

    /**
     * Generate a unique task ID
     */
    private generateTaskId(): string {
        return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Load persisted task history from localStorage
     */
    private async loadTaskHistory(): Promise<void> {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const saved = localStorage.getItem('velvet_task_history');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // Convert date strings back to Date objects
                    this.taskHistory = parsed.map((task: any) => ({
                        ...task,
                        createdAt: new Date(task.createdAt),
                        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
                        steps: task.steps.map((step: any) => ({
                            ...step,
                            completedAt: step.completedAt ? new Date(step.completedAt) : undefined
                        }))
                    }));
                    
                    console.log(`📚 Loaded ${this.taskHistory.length} tasks from history`);
                }
            }
        } catch (error) {
            console.warn('⚠️ Failed to load task history:', error);
            this.taskHistory = [];
        }
    }

    /**
     * Save task history to localStorage
     */
    private async saveTaskHistory(): Promise<void> {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('velvet_task_history', JSON.stringify(this.taskHistory));
            }
        } catch (error) {
            console.warn('⚠️ Failed to save task history:', error);
        }
    }

    /**
     * Get engine status
     */
    getStatus(): {
        initialized: boolean;
        totalTasks: number;
        activeTasks: number;
        completedTasks: number;
    } {
        return {
            initialized: this.isInitialized,
            totalTasks: this.taskHistory.length,
            activeTasks: this.getActiveTasks().length,
            completedTasks: this.taskHistory.filter(t => t.isCompleted).length
        };
    }

    /**
     * Shutdown the engine
     */
    async shutdown(): Promise<void> {
        console.log('🧠 Shutting down Task Breakdown Engine...');
        
        // Save any pending data
        await this.saveTaskHistory();
        
        this.isInitialized = false;
        console.log('🧠 Task Breakdown Engine shutdown complete');
    }
}

// Create and export the singleton instance
const taskBreakdownEngine = new TaskBreakdownEngine();

export default taskBreakdownEngine;
export { TaskBreakdownEngine };

// Make available globally in browser
if (typeof window !== 'undefined') {
    (window as any).taskBreakdownEngine = taskBreakdownEngine;
    (window as any).TaskBreakdownEngine = TaskBreakdownEngine;
}

console.log('🧠 Task Breakdown Engine loaded and ready');