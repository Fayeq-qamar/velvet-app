// 🧠 Task Breakdown State Management
// "Gentle state for sharp minds" - Zustand store for task breakdown system

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Task, TaskStep, taskBreakdownEngine } from '../engines/TaskBreakdownEngine';

/**
 * Task Breakdown Store: Centralized state management for task system
 * 
 * Features:
 * - Active task tracking with real-time progress
 * - Task history and learning patterns
 * - UI state management (expanded, minimized, etc.)
 * - Screen intelligence integration for automatic progress
 * - Celebration and motivation tracking
 * - Persistence to local storage
 */

export interface TaskBreakdownState {
  // Active Task State
  activeTask: Task | null;
  isTaskUIVisible: boolean;
  isTaskUIExpanded: boolean;
  isTaskUIMinimized: boolean;
  
  // Task History & Learning
  recentTasks: Task[];
  taskHistory: Task[];
  completedTasksToday: number;
  totalTasksCompleted: number;
  
  // Progress & Motivation
  currentStreak: number; // consecutive days with completed tasks
  weeklyProgress: number; // 0-1 scale
  celebrationQueue: string[]; // pending celebrations
  
  // User Preferences (learned over time)
  preferredStepSize: number; // minutes
  optimalWorkTimes: string[];
  motivationStyle: 'celebration' | 'progress' | 'gentle' | 'mixed';
  
  // UI Interaction State
  lastInteractionTime: number;
  isEngineInitialized: boolean;
  engineMetrics: any | null;
  
  // Actions
  setActiveTask: (task: Task | null) => void;
  updateTaskProgress: (taskId: string, stepId: string, completed: boolean, autoCompleted?: boolean) => Promise<void>;
  completeTask: (taskId: string) => Promise<void>;
  createTaskFromInput: (input: string) => Promise<Task | null>;
  
  // UI Actions
  showTaskUI: () => void;
  hideTaskUI: () => void;
  expandTaskUI: () => void;
  minimizeTaskUI: () => void;
  toggleTaskUI: () => void;
  
  // Progress Actions
  markStepCompleted: (taskId: string, stepId: string, autoDetected?: boolean) => Promise<void>;
  celebrateProgress: (message: string) => void;
  processCelebrationQueue: () => void;
  
  // Learning & Analytics
  updateUserPreferences: (preferences: Partial<TaskBreakdownState>) => void;
  getTaskAnalytics: () => TaskAnalytics;
  resetDailyProgress: () => void;
  
  // Engine Integration
  initializeEngine: () => Promise<boolean>;
  refreshEngineMetrics: () => void;
  shutdownEngine: () => Promise<void>;
  
  // Helper Methods (internal)
  updateDailyStreak: () => void;
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
}

export interface TaskAnalytics {
  tasksCompletedToday: number;
  averageTaskDuration: number;
  mostProductiveTime: string;
  preferredTaskTypes: string[];
  completionRate: number; // percentage of started tasks that get completed
  averageStepsPerTask: number;
  topAppsUsed: string[];
}

// Create the Zustand store with middleware for subscriptions
export const useTaskBreakdownStore = create<TaskBreakdownState>()(
  subscribeWithSelector((set, get) => ({
    // Initial State
    activeTask: null,
    isTaskUIVisible: false,
    isTaskUIExpanded: false,
    isTaskUIMinimized: false,
    
    recentTasks: [],
    taskHistory: [],
    completedTasksToday: 0,
    totalTasksCompleted: 0,
    
    currentStreak: 0,
    weeklyProgress: 0,
    celebrationQueue: [],
    
    preferredStepSize: 5,
    optimalWorkTimes: ['morning'],
    motivationStyle: 'mixed',
    
    lastInteractionTime: Date.now(),
    isEngineInitialized: false,
    engineMetrics: null,

    // Core Task Actions
    setActiveTask: (task: Task | null) => {
      console.log('📋 Setting active task:', task?.title || 'none');
      
      set((state) => {
        const newState = { 
          ...state, 
          activeTask: task,
          lastInteractionTime: Date.now()
        };
        
        // Auto-show UI when new task is set
        if (task && !state.isTaskUIVisible) {
          newState.isTaskUIVisible = true;
          newState.isTaskUIExpanded = true;
        }
        
        return newState;
      });
      
      // Save to persistence
      get().saveToStorage();
    },

    updateTaskProgress: async (taskId: string, stepId: string, completed: boolean, autoCompleted: boolean = false) => {
      console.log('📈 Updating task progress:', { taskId, stepId, completed, autoCompleted });
      
      try {
        // Update via engine
        await taskBreakdownEngine.updateTaskProgress(taskId, stepId, completed, autoCompleted);
        
        // Update local state
        set((state) => {
          if (state.activeTask?.id === taskId) {
            const updatedTask = { ...state.activeTask };
            const step = updatedTask.steps.find(s => s.id === stepId);
            
            if (step) {
              step.isCompleted = completed;
              step.autoCompleted = autoCompleted;
              if (completed) step.completedAt = Date.now();
              
              // Recalculate progress
              const completedSteps = updatedTask.steps.filter(s => s.isCompleted).length;
              updatedTask.progress = completedSteps / updatedTask.steps.length;
            }
            
            // Check if task is fully completed
            if (updatedTask.progress >= 1.0 && !updatedTask.completedAt) {
              get().completeTask(taskId);
            }
            
            return {
              ...state,
              activeTask: updatedTask,
              lastInteractionTime: Date.now()
            };
          }
          
          return state;
        });
        
        // Celebrate progress
        if (completed) {
          const step = get().activeTask?.steps.find(s => s.id === stepId);
          if (step) {
            const celebrationMessage = autoCompleted 
              ? `🎯 Nice! I noticed you completed "${step.title}"!`
              : `✅ Great job completing "${step.title}"!`;
            get().celebrateProgress(celebrationMessage);
          }
        }
        
      } catch (error) {
        console.error('❌ Failed to update task progress:', error);
      }
    },

    completeTask: async (taskId: string) => {
      console.log('🎉 Completing task:', taskId);
      
      set((state) => {
        if (state.activeTask?.id === taskId) {
          const completedTask = {
            ...state.activeTask,
            completedAt: Date.now(),
            isActive: false
          };
          
          // Add to history
          const updatedHistory = [...state.taskHistory, completedTask];
          const updatedRecent = [completedTask, ...state.recentTasks.slice(0, 9)];
          
          return {
            ...state,
            activeTask: null,
            taskHistory: updatedHistory,
            recentTasks: updatedRecent,
            completedTasksToday: state.completedTasksToday + 1,
            totalTasksCompleted: state.totalTasksCompleted + 1,
            lastInteractionTime: Date.now()
          };
        }
        
        return state;
      });
      
      // Major celebration for task completion
      get().celebrateProgress("🎉 AMAZING! You completed a full task! That's real accomplishment! ✨");
      
      // Update daily streak
      get().updateDailyStreak();
      
      // Save progress
      get().saveToStorage();
    },

    createTaskFromInput: async (input: string): Promise<Task | null> => {
      console.log('🧠 Creating task from input:', input.substring(0, 50) + '...');
      
      try {
        const task = await taskBreakdownEngine.analyzeAndBreakdownTask(input);
        
        if (task) {
          get().setActiveTask(task);
          console.log('✅ Task created and set as active');
          return task;
        }
        
        return null;
        
      } catch (error) {
        console.error('❌ Failed to create task from input:', error);
        return null;
      }
    },

    // UI Actions
    showTaskUI: () => {
      console.log('👁️ Showing task UI');
      set((state) => ({
        ...state,
        isTaskUIVisible: true,
        isTaskUIMinimized: false,
        lastInteractionTime: Date.now()
      }));
    },

    hideTaskUI: () => {
      console.log('🫥 Hiding task UI');
      set((state) => ({
        ...state,
        isTaskUIVisible: false,
        lastInteractionTime: Date.now()
      }));
    },

    expandTaskUI: () => {
      set((state) => ({
        ...state,
        isTaskUIExpanded: true,
        isTaskUIMinimized: false,
        lastInteractionTime: Date.now()
      }));
    },

    minimizeTaskUI: () => {
      set((state) => ({
        ...state,
        isTaskUIExpanded: false,
        isTaskUIMinimized: true,
        lastInteractionTime: Date.now()
      }));
    },

    toggleTaskUI: () => {
      set((state) => {
        const shouldShow = !state.isTaskUIVisible;
        return {
          ...state,
          isTaskUIVisible: shouldShow,
          isTaskUIExpanded: shouldShow,
          isTaskUIMinimized: false,
          lastInteractionTime: Date.now()
        };
      });
    },

    // Progress Actions
    markStepCompleted: async (taskId: string, stepId: string, autoDetected: boolean = false) => {
      await get().updateTaskProgress(taskId, stepId, true, autoDetected);
    },

    celebrateProgress: (message: string) => {
      console.log('🎉 Celebrating:', message);
      
      set((state) => ({
        ...state,
        celebrationQueue: [...state.celebrationQueue, message],
        lastInteractionTime: Date.now()
      }));
      
      // Process celebrations after a short delay
      setTimeout(() => {
        get().processCelebrationQueue();
      }, 500);
    },

    processCelebrationQueue: () => {
      const { celebrationQueue } = get();
      
      if (celebrationQueue.length === 0) return;
      
      // Show celebrations to user
      celebrationQueue.forEach((message, index) => {
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.addMessage) {
            window.addMessage(message, 'velvet');
          }
          
          // Trigger orb celebration animation
          if (window.updateVelvetOrbState) {
            window.updateVelvetOrbState('celebrating');
            setTimeout(() => {
              window.updateVelvetOrbState('normal');
            }, 2000);
          }
          
        }, index * 1000);
      });
      
      // Clear queue
      set((state) => ({
        ...state,
        celebrationQueue: []
      }));
    },

    // Learning & Analytics
    updateUserPreferences: (preferences: Partial<TaskBreakdownState>) => {
      console.log('📈 Updating user preferences:', Object.keys(preferences));
      
      set((state) => ({
        ...state,
        ...preferences,
        lastInteractionTime: Date.now()
      }));
      
      get().saveToStorage();
    },

    getTaskAnalytics: (): TaskAnalytics => {
      const state = get();
      const today = new Date().toDateString();
      
      const todaysTasks = state.taskHistory.filter(task => 
        new Date(task.completedAt || task.createdAt).toDateString() === today
      );
      
      const completedTasks = state.taskHistory.filter(task => task.completedAt);
      
      return {
        tasksCompletedToday: todaysTasks.length,
        averageTaskDuration: completedTasks.length > 0 
          ? completedTasks.reduce((sum, task) => sum + task.estimatedDuration, 0) / completedTasks.length
          : 0,
        mostProductiveTime: state.optimalWorkTimes[0] || 'morning',
        preferredTaskTypes: [...new Set(completedTasks.map(t => t.type))],
        completionRate: state.taskHistory.length > 0 
          ? (completedTasks.length / state.taskHistory.length) * 100
          : 0,
        averageStepsPerTask: completedTasks.length > 0
          ? completedTasks.reduce((sum, task) => sum + task.steps.length, 0) / completedTasks.length
          : 0,
        topAppsUsed: state.activeTask?.steps
          .flatMap(step => step.expectedApps)
          .reduce((acc: any, app) => {
            acc[app] = (acc[app] || 0) + 1;
            return acc;
          }, {}) || {}
      };
    },

    resetDailyProgress: () => {
      console.log('🌅 Resetting daily progress');
      set((state) => ({
        ...state,
        completedTasksToday: 0,
        celebrationQueue: [],
        lastInteractionTime: Date.now()
      }));
    },

    // Engine Integration
    initializeEngine: async (): Promise<boolean> => {
      console.log('🚀 Initializing task breakdown engine...');
      
      try {
        const initialized = await taskBreakdownEngine.initialize();
        
        set((state) => ({
          ...state,
          isEngineInitialized: initialized,
          engineMetrics: initialized ? taskBreakdownEngine.getMetrics() : null
        }));
        
        if (initialized) {
          // Load saved state
          await get().loadFromStorage();
          console.log('✅ Task breakdown engine initialized successfully');
        }
        
        return initialized;
        
      } catch (error) {
        console.error('❌ Engine initialization failed:', error);
        set((state) => ({
          ...state,
          isEngineInitialized: false,
          engineMetrics: null
        }));
        return false;
      }
    },

    refreshEngineMetrics: () => {
      if (get().isEngineInitialized) {
        set((state) => ({
          ...state,
          engineMetrics: taskBreakdownEngine.getMetrics()
        }));
      }
    },

    shutdownEngine: async () => {
      console.log('🛑 Shutting down task breakdown engine...');
      
      await get().saveToStorage();
      await taskBreakdownEngine.shutdown();
      
      set((state) => ({
        ...state,
        isEngineInitialized: false,
        engineMetrics: null
      }));
    },

    // Helper Methods (not exposed in interface)
    updateDailyStreak: () => {
      // Implementation for tracking daily completion streaks
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      
      // Check if user completed tasks yesterday to maintain streak
      // This would be more complex in a real implementation
      set((state) => ({
        ...state,
        currentStreak: state.completedTasksToday > 0 ? state.currentStreak + 1 : 0
      }));
    },

    saveToStorage: async () => {
      try {
        const state = get();
        const dataToSave = {
          recentTasks: state.recentTasks,
          completedTasksToday: state.completedTasksToday,
          totalTasksCompleted: state.totalTasksCompleted,
          currentStreak: state.currentStreak,
          preferredStepSize: state.preferredStepSize,
          optimalWorkTimes: state.optimalWorkTimes,
          motivationStyle: state.motivationStyle
        };
        
        if (typeof window !== 'undefined' && window.electronAPI?.storage) {
          await window.electronAPI.storage.set('task_breakdown_state', dataToSave);
          console.log('💾 Task breakdown state saved');
        }
      } catch (error) {
        console.warn('⚠️ Failed to save task breakdown state:', error);
      }
    },

    loadFromStorage: async () => {
      try {
        if (typeof window !== 'undefined' && window.electronAPI?.storage) {
          const saved = await window.electronAPI.storage.get('task_breakdown_state');
          
          if (saved) {
            set((state) => ({
              ...state,
              ...saved,
              lastInteractionTime: Date.now()
            }));
            console.log('📚 Task breakdown state loaded');
          }
        }
      } catch (error) {
        console.warn('⚠️ Failed to load task breakdown state:', error);
      }
    }
  }))
);

// Auto-save every 30 seconds
setInterval(() => {
  const store = useTaskBreakdownStore.getState();
  if (store.isEngineInitialized) {
    store.saveToStorage();
  }
}, 30000);

// Subscribe to active task changes for automatic UI updates
useTaskBreakdownStore.subscribe(
  (state) => state.activeTask,
  (activeTask) => {
    if (activeTask) {
      console.log('🎯 Active task changed:', activeTask.title);
      
      // Auto-show UI for new tasks
      const store = useTaskBreakdownStore.getState();
      if (!store.isTaskUIVisible) {
        store.showTaskUI();
      }
      
      // Refresh metrics
      store.refreshEngineMetrics();
    }
  }
);

// Initialize engine on store creation (in browser environment)
if (typeof window !== 'undefined') {
  // Initialize after a short delay to allow other systems to load
  setTimeout(() => {
    useTaskBreakdownStore.getState().initializeEngine();
  }, 2000);
}

console.log('📋 Task Breakdown Store initialized and ready');