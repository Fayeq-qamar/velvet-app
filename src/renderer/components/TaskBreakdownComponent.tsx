// 🧠 Task Breakdown UI Component
// "Gentle structure for sharp minds" - React component for task visualization

import React, { useState, useEffect, useCallback } from 'react';
import { useTaskBreakdownStore } from '../stores/task-breakdown-store';
import { Task, TaskStep } from '../engines/TaskBreakdownEngine';

interface TaskBreakdownComponentProps {
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
}

const TaskBreakdownComponent: React.FC<TaskBreakdownComponentProps> = ({
  className = '',
  onClose,
  onMinimize
}) => {
  const {
    activeTask,
    isTaskUIVisible,
    isTaskUIExpanded,
    isTaskUIMinimized,
    engineMetrics,
    markStepCompleted,
    hideTaskUI,
    expandTaskUI,
    minimizeTaskUI,
    getTaskAnalytics
  } = useTaskBreakdownStore();

  const [analytics, setAnalytics] = useState(getTaskAnalytics());
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  // Update analytics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(getTaskAnalytics());
    }, 10000);
    
    return () => clearInterval(interval);
  }, [getTaskAnalytics]);

  // Handle step completion with visual feedback
  const handleStepComplete = useCallback(async (stepId: string, completed: boolean) => {
    if (!activeTask) return;
    
    try {
      await markStepCompleted(activeTask.id, stepId, false);
      
      if (completed) {
        const step = activeTask.steps.find((s: TaskStep) => s.id === stepId);
        if (step) {
          setCelebrationMessage(`✅ Great job on "${step.title}"!`);
          setCelebrationVisible(true);
          setTimeout(() => setCelebrationVisible(false), 3000);
        }
      }
    } catch (error) {
      console.error('Failed to update step:', error);
    }
  }, [activeTask, markStepCompleted]);

  // Auto-hide after inactivity (optional)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTaskUIVisible && activeTask && activeTask.progress >= 1.0) {
      timeout = setTimeout(() => {
        hideTaskUI();
      }, 10000); // Hide 10 seconds after completion
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [activeTask, isTaskUIVisible, hideTaskUI]);

  // Don't render if not visible or no active task
  if (!isTaskUIVisible || !activeTask) {
    return null;
  }

  const completedSteps = activeTask.steps.filter(step => step.completed).length;
  const progressPercentage = Math.round(activeTask.progress * 100);
  const isCompleted = progressPercentage >= 100;

  return (
    <>
      {/* Main Task Breakdown Window */}
      <div className={`task-breakdown-component ${className} ${isTaskUIMinimized ? 'minimized' : ''}`}>
        {/* Glassmorphism Container */}
        <div className="task-breakdown-glass">
          {/* Header */}
          <div className="task-header">
            <div className="task-title-section">
              <h3 className="task-title">{activeTask.title}</h3>
              <div className="task-meta">
                <span className="task-complexity">{activeTask.complexity}</span>
                <span className="task-duration">{activeTask.estimatedDuration} min</span>
                <span className="task-type">{activeTask.type}</span>
              </div>
            </div>
            
            <div className="task-controls">
              <button 
                className="control-button minimize"
                onClick={() => isTaskUIMinimized ? expandTaskUI() : minimizeTaskUI()}
                title={isTaskUIMinimized ? 'Expand' : 'Minimize'}
              >
                {isTaskUIMinimized ? '⬆️' : '⬇️'}
              </button>
              
              <button 
                className="control-button close"
                onClick={() => onClose ? onClose() : hideTaskUI()}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="task-progress-container">
            <div className="task-progress-bar">
              <div 
                className={`task-progress-fill ${isCompleted ? 'completed' : ''}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="task-progress-text">
              {completedSteps}/{activeTask.steps.length} steps • {progressPercentage}%
            </span>
          </div>

          {/* Expanded Content */}
          {!isTaskUIMinimized && (
            <>
              {/* Task Description */}
              {activeTask.description && (
                <div className="task-description">
                  <p>{activeTask.description}</p>
                </div>
              )}

              {/* AI Analysis Insights */}
              {activeTask.aiAnalysis && (
                <div className="task-insights">
                  <div className="insight-item">
                    <span className="insight-label">💡 Focus:</span>
                    <span className="insight-text">{activeTask.aiAnalysis.detectedIntention}</span>
                  </div>
                  
                  {activeTask.aiAnalysis.difficultyAssessment && (
                    <div className="insight-item">
                      <span className="insight-label">🎯 Approach:</span>
                      <span className="insight-text">{activeTask.aiAnalysis.difficultyAssessment}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Task Steps */}
              <div className="task-steps">
                <h4 className="steps-title">Steps to Complete</h4>
                
                {activeTask.steps.map((step: TaskStep, index: number) => (
                  <TaskStepItem
                    key={step.id}
                    step={step}
                    index={index}
                    onToggleComplete={(completed) => handleStepComplete(step.id, completed)}
                  />
                ))}
              </div>

              {/* Completion Celebration */}
              {isCompleted && (
                <div className="task-completion">
                  <div className="completion-message">
                    🎉 Amazing work! You completed this task! 🎉
                  </div>
                  <div className="completion-stats">
                    Finished in ~{Math.ceil(activeTask.estimatedDuration)} minutes
                  </div>
                </div>
              )}

              {/* Quick Analytics */}
              <div className="task-analytics">
                <div className="analytics-item">
                  <span className="analytics-label">Today:</span>
                  <span className="analytics-value">{analytics.tasksCompletedToday} completed</span>
                </div>
                <div className="analytics-item">
                  <span className="analytics-label">Rate:</span>
                  <span className="analytics-value">{Math.round(analytics.completionRate)}% completion</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Celebration */}
      {celebrationVisible && (
        <div className="task-celebration">
          {celebrationMessage}
        </div>
      )}
    </>
  );
};

// Task Step Item Component
interface TaskStepItemProps {
  step: TaskStep;
  index: number;
  onToggleComplete: (completed: boolean) => void;
}

const TaskStepItem: React.FC<TaskStepItemProps> = ({ step, index, onToggleComplete }: TaskStepItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`task-step ${step.completed ? 'completed' : ''} ${(step as any).autoCompleted ? 'auto-completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="step-main">
        <label className="step-checkbox-container">
          <input
            type="checkbox"
            checked={step.completed}
            onChange={(e) => onToggleComplete(e.target.checked)}
            className="step-checkbox"
          />
          <span className="step-checkmark" />
        </label>
        
        <div className="step-content">
          <div className="step-header">
            <span className="step-number">{index + 1}.</span>
            <h5 className="step-title">{step.title}</h5>
            <div className="step-meta">
              <span className="step-duration">{step.estimatedMinutes}m</span>
              {(step as any).autoCompleted && (
                <span className="step-auto-badge" title="Automatically detected">🤖</span>
              )}
            </div>
          </div>
          
          <p className="step-description">{step.description}</p>
          
          {step.expectedApps.length > 0 && (
            <div className="step-apps">
              <span className="apps-label">Apps:</span>
              {step.expectedApps.map((app, i) => (
                <span key={i} className="app-badge">{app}</span>
              ))}
            </div>
          )}
          
          {step.completedAt && (
            <div className="step-completed-at">
              ✅ Completed at {new Date(step.completedAt).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBreakdownComponent;

// CSS Styles (would typically be in a separate .css file)
const styles = `
.task-breakdown-component {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 420px;
  max-height: calc(100vh - 40px);
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
  transition: all 0.3s ease;
  overflow: hidden;
}

.task-breakdown-component.minimized {
  height: 80px;
  max-height: 80px;
}

.task-breakdown-glass {
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
  padding: 20px;
  max-height: 100%;
  overflow-y: auto;
}

.task-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
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
  position: relative;
}

.task-progress-fill.completed {
  background: linear-gradient(90deg, #10b981, #34d399);
  animation: progressGlow 2s ease-in-out infinite alternate;
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
}

.step-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.step-checkmark {
  position: relative;
  top: 2px;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #64748b;
  border-radius: 4px;
  display: block;
  transition: all 0.2s ease;
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
  animation: celebrationPulse 1.5s ease-in-out infinite;
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

.task-celebration {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(52, 211, 153, 0.9));
  color: white;
  padding: 20px 30px;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 600;
  z-index: 10000;
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.4);
  animation: celebrationSlideIn 0.5s ease-out, celebrationSlideOut 0.5s ease-in 2.5s forwards;
}

@keyframes progressGlow {
  from { box-shadow: 0 0 5px rgba(16, 185, 129, 0.5); }
  to { box-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.4); }
}

@keyframes celebrationPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes celebrationSlideIn {
  from { transform: translate(-50%, -60%) scale(0.8); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

@keyframes celebrationSlideOut {
  from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  to { transform: translate(-50%, -40%) scale(0.9); opacity: 0; }
}

/* Custom scrollbar */
.task-breakdown-glass::-webkit-scrollbar {
  width: 8px;
}

.task-breakdown-glass::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.task-breakdown-glass::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

.task-breakdown-glass::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Export component with display name
TaskBreakdownComponent.displayName = 'TaskBreakdownComponent';

export { TaskBreakdownComponent };