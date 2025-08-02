import React, { useState, useEffect } from 'react';
import { useConsciousnessStore, useBrainContext, useUserState } from '../stores/consciousness-store';
import { Sidebar, getVelvetSidebarItems } from './ui/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Progress, CircularProgress } from './ui/Progress';
import { Badge, MoodBadge, StatusBadge } from './ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TaskTable } from './ui/Table';
import { Alert, PatternAlert, GentleNotification } from './ui/Alert';
import { Chart, FocusPatternChart, EnergyChart } from './ui/Chart';

interface VelvetDashboardProps {
  className?: string;
}

// Main Dashboard Component
const DashboardHome: React.FC = () => {
  const userState = useUserState();
  const brainContext = useBrainContext();
  const { generateInsights, analyzePatterns } = useConsciousnessStore();
  
  // Mock data - in real implementation, this would come from the consciousness store
  const [currentTasks] = useState([
    {
      id: '1',
      description: 'Write project documentation',
      status: 'in_progress' as const,
      steps: ['Outline structure', 'Write introduction', 'Add examples', 'Review and polish'],
      currentStep: 1,
      timeSpent: 45,
      estimatedTime: 120
    },
    {
      id: '2', 
      description: 'Review team feedback',
      status: 'pending' as const,
      steps: ['Read comments', 'Categorize feedback', 'Plan responses'],
      currentStep: 0,
      estimatedTime: 30
    }
  ]);

  const [recentPatterns] = useState([
    {
      type: 'hyperfocus' as const,
      confidence: 0.85,
      duration: 2700000, // 45 minutes in ms
      context: 'Sustained focus on code editing in VS Code',
      suggestion: 'You\'ve been coding for 45 minutes straight! Maybe time for a gentle break?'
    }
  ]);

  const quickActions = [
    { id: 'break', title: 'Take Break', icon: '🧘', description: 'Guided breathing' },
    { id: 'focus', title: 'Focus Mode', icon: '🎯', description: 'Block distractions' },
    { id: 'task', title: 'Add Task', icon: '✨', description: 'Break it down' },
    { id: 'mood', title: 'Check Mood', icon: '💭', description: 'How are we feeling?' }
  ];

  // Mock focus pattern data for demo
  const [focusPatterns] = useState([
    { time: '9:00', focusLevel: 70, type: 'focused' as const },
    { time: '10:00', focusLevel: 85, type: 'focused' as const },
    { time: '11:00', focusLevel: 95, type: 'hyperfocus' as const },
    { time: '12:00', focusLevel: 40, type: 'idle' as const },
    { time: '13:00', focusLevel: 60, type: 'distracted' as const },
    { time: '14:00', focusLevel: 80, type: 'focused' as const }
  ]);

  // Mock energy data for demo
  const [energyData] = useState([
    { time: '9:00', level: 65, mood: 'calm' },
    { time: '11:00', level: 85, mood: 'focused' },
    { time: '13:00', level: 45, mood: 'tired' },
    { time: '15:00', level: 70, mood: 'renewed' },
    { time: '17:00', level: 60, mood: 'calm' }
  ]);

  // Energy calculation based on user state and patterns
  const calculateEnergyLevel = (): number => {
    const baseEnergy = userState.energyLevel === 'high' ? 80 : 
                      userState.energyLevel === 'medium' ? 60 : 40;
    
    // Adjust based on focus state
    const focusAdjustment = userState.focusState === 'hyperfocus' ? 10 :
                           userState.focusState === 'focused' ? 5 :
                           userState.focusState === 'distracted' ? -10 : 0;
    
    return Math.max(0, Math.min(100, baseEnergy + focusAdjustment));
  };

  return (
    <div className="velvet-dashboard-home">
      {/* Welcome Section */}
      <div className="velvet-dashboard-welcome">
        <h1 className="velvet-dashboard-title">
          Welcome back! 💝
        </h1>
        <p className="velvet-dashboard-subtitle">
          Let's see how you're doing today, yaar. Remember, progress over perfection! 
        </p>
      </div>

      {/* Main Grid */}
      <div className="velvet-dashboard-grid">
        {/* Today's Energy Card */}
        <Card className="velvet-energy-card" hover>
          <CardHeader>
            <CardTitle>Today's Energy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="velvet-energy-display">
              <CircularProgress 
                value={calculateEnergyLevel()}
                size={120}
                variant={userState.energyLevel === 'high' ? 'success' : 
                        userState.energyLevel === 'medium' ? 'warning' : 'danger'}
                label={`${userState.energyLevel.toUpperCase()}`}
              />
              <div className="velvet-energy-stats">
                <div className="velvet-energy-stat">
                  <span className="velvet-energy-stat-label">Focus</span>
                  <MoodBadge mood={userState.focusState === 'hyperfocus' ? 'focused' : 
                                  userState.focusState === 'focused' ? 'focused' : 'distracted'} />
                </div>
                <div className="velvet-energy-stat">
                  <span className="velvet-energy-stat-label">Mood</span>
                  <MoodBadge mood={userState.emotionalState} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Tasks Card */}
        <Card className="velvet-tasks-card" hover>
          <CardHeader>
            <CardTitle>
              Active Tasks 
              <Badge variant="primary" size="sm">{currentTasks.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentTasks.length > 0 ? (
              <TaskTable 
                tasks={currentTasks} 
                onTaskClick={(taskId) => console.log('Task clicked:', taskId)}
              />
            ) : (
              <div className="velvet-empty-state">
                <span className="velvet-empty-icon">✨</span>
                <p>No active tasks. Time to plan something amazing!</p>
                <Button variant="outline" size="sm">Add Your First Task</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pattern Alerts */}
        <Card className="velvet-patterns-card">
          <CardHeader>
            <CardTitle>Pattern Insights</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPatterns.length > 0 ? (
              <div className="velvet-patterns-list">
                {recentPatterns.map((pattern, index) => (
                  <PatternAlert 
                    key={index}
                    pattern={pattern}
                    onDismiss={() => console.log('Pattern dismissed')}
                    onAction={() => console.log('Pattern action')}
                  />
                ))}
              </div>
            ) : (
              <div className="velvet-empty-state">
                <span className="velvet-empty-icon">📊</span>
                <p>Building understanding of your patterns...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Focus Patterns Chart */}
        <Card className="velvet-focus-chart-card" hover>
          <CardHeader>
            <CardTitle>Focus Patterns Today</CardTitle>
          </CardHeader>
          <CardContent>
            <FocusPatternChart patterns={focusPatterns} />
          </CardContent>
        </Card>

        {/* Energy Levels Chart */}
        <Card className="velvet-energy-chart-card" hover>
          <CardHeader>
            <CardTitle>Energy Throughout Day</CardTitle>
          </CardHeader>
          <CardContent>
            <EnergyChart energyData={energyData} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="velvet-actions-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="velvet-actions-grid">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="ghost"
                  className="velvet-action-button"
                  onClick={() => console.log('Action:', action.id)}
                >
                  <div className="velvet-action-content">
                    <span className="velvet-action-icon">{action.icon}</span>
                    <div className="velvet-action-text">
                      <span className="velvet-action-title">{action.title}</span>
                      <span className="velvet-action-description">{action.description}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gentle Notifications */}
      <div className="velvet-notifications">
        <GentleNotification 
          message="Bas 10 minutes mein great progress! You're doing amazing 🌟"
          type="encouragement"
          hinglish={true}
          onDismiss={() => console.log('Notification dismissed')}
        />
      </div>
    </div>
  );
};

// Social Intelligence Section
const SocialIntelligence: React.FC = () => {
  return (
    <div className="velvet-dashboard-section">
      <div className="velvet-dashboard-welcome">
        <h1 className="velvet-dashboard-title">Social Intelligence 🎭</h1>
        <p className="velvet-dashboard-subtitle">
          Understanding neurotypical communication patterns and managing masking fatigue.
        </p>
      </div>
      
      <div className="velvet-dashboard-grid">
        <Card hover>
          <CardHeader>
            <CardTitle>Social Decoder</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Real-time translation of neurotypical communication coming soon...</p>
            <Badge variant="warning">Beta Feature</Badge>
          </CardContent>
        </Card>
        
        <Card hover>
          <CardHeader>
            <CardTitle>Masking Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <p>AI-powered masking fatigue monitoring and safe space detection.</p>
            <Badge variant="primary">In Development</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Task Support Section
const TaskSupport: React.FC = () => {
  return (
    <div className="velvet-dashboard-section">
      <div className="velvet-dashboard-welcome">
        <h1 className="velvet-dashboard-title">Task Support ✅</h1>
        <p className="velvet-dashboard-subtitle">
          Executive function tools to break down overwhelming tasks into manageable steps.
        </p>
      </div>
      
      <Card hover>
        <CardHeader>
          <CardTitle>Executive Function Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Task breakdown, time estimation, and progress tracking tools.</p>
          <Button variant="primary">Explore Tools</Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Settings Section
const Settings: React.FC = () => {
  return (
    <div className="velvet-dashboard-section">
      <div className="velvet-dashboard-welcome">
        <h1 className="velvet-dashboard-title">Settings ⚙️</h1>
        <p className="velvet-dashboard-subtitle">
          Customize Velvet to work perfectly with your brain.
        </p>
      </div>
      
      <Card hover>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Personalization options and accessibility settings.</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Dashboard Component
export const VelvetDashboard: React.FC<VelvetDashboardProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const streamStatus = useConsciousnessStore(state => state.streamStatus);

  const sidebarItems = getVelvetSidebarItems();

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'social':
        return <SocialIntelligence />;
      case 'tasks':
        return <TaskSupport />;
      case 'meeting':
        return (
          <div className="velvet-dashboard-section">
            <h1>Meeting Assistant 🎤</h1>
            <p>Communication tools coming soon...</p>
          </div>
        );
      case 'patterns':
        return (
          <div className="velvet-dashboard-section">
            <h1>Pattern Insights 📊</h1>
            <p>Behavioral analysis dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className={`velvet-dashboard ${className}`}>
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeSection}
        onItemClick={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main className="velvet-dashboard-main">
        <div className="velvet-dashboard-content">
          {renderActiveSection()}
        </div>
      </main>

      {/* Connection Status Indicator */}
      {!streamStatus.connected && (
        <div className="velvet-connection-status">
          <Alert variant="warning" title="⚠️ Connection Issue">
            Velvet consciousness is reconnecting... Your data is safe.
          </Alert>
        </div>
      )}
    </div>
  );
};

// Add comprehensive styles for the dashboard
const dashboardStyles = `
.velvet-dashboard {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.98) 0%,
    rgba(30, 41, 59, 0.96) 50%,
    rgba(15, 23, 42, 0.98) 100%
  );
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
  color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
}

.velvet-dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.velvet-dashboard-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  background: transparent;
}

.velvet-dashboard-welcome {
  margin-bottom: 32px;
}

.velvet-dashboard-title {
  font-size: 32px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 8px 0;
  line-height: 1.2;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
}

.velvet-dashboard-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.5;
  max-width: 600px;
}

.velvet-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.velvet-dashboard-section {
  animation: velvet-section-fade-in 0.6s ease-out;
}

@keyframes velvet-section-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Energy Card Specific Styles */
.velvet-energy-card {
  grid-column: span 1;
}

.velvet-energy-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.velvet-energy-stats {
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: center;
}

.velvet-energy-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.velvet-energy-stat-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Tasks Card Specific Styles */
.velvet-tasks-card {
  grid-column: span 2;
  min-height: 300px;
}

/* Pattern Alerts */
.velvet-patterns-card {
  grid-column: span 1;
}

/* Chart Cards */
.velvet-focus-chart-card {
  grid-column: span 2;
}

.velvet-energy-chart-card {
  grid-column: span 1;
}

.velvet-patterns-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Quick Actions */
.velvet-actions-card {
  grid-column: span 1;
}

.velvet-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.velvet-action-button {
  height: auto;
  padding: 16px;
  justify-content: flex-start;
  text-align: left;
}

.velvet-action-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.velvet-action-icon {
  font-size: 24px;
  line-height: 1;
}

.velvet-action-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.velvet-action-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.velvet-action-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Empty States */
.velvet-empty-state {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
}

.velvet-empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
  opacity: 0.7;
}

.velvet-empty-state p {
  margin: 0 0 16px 0;
  font-size: 15px;
  line-height: 1.5;
}

/* Notifications */
.velvet-notifications {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  max-width: 400px;
}

/* Connection Status */
.velvet-connection-status {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  max-width: 300px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .velvet-dashboard-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .velvet-tasks-card,
  .velvet-patterns-card,
  .velvet-actions-card,
  .velvet-energy-card {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .velvet-dashboard {
    flex-direction: column;
  }
  
  .velvet-dashboard-content {
    padding: 20px 16px;
  }
  
  .velvet-dashboard-title {
    font-size: 28px;
  }
  
  .velvet-dashboard-subtitle {
    font-size: 15px;
  }
  
  .velvet-dashboard-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .velvet-actions-grid {
    grid-template-columns: 1fr;
  }
  
  .velvet-energy-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .velvet-notifications,
  .velvet-connection-status {
    position: fixed;
    left: 16px;
    right: 16px;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .velvet-dashboard-content {
    padding: 16px 12px;
  }
  
  .velvet-dashboard-title {
    font-size: 24px;
  }
  
  .velvet-energy-display {
    gap: 16px;
  }
  
  .velvet-action-content {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}

/* Dark theme consistency */
.velvet-dashboard-home {
  width: 100%;
}

/* Smooth scrolling */
.velvet-dashboard-content {
  scroll-behavior: smooth;
}

.velvet-dashboard-content::-webkit-scrollbar {
  width: 8px;
}

.velvet-dashboard-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.velvet-dashboard-content::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
}

.velvet-dashboard-content::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* Loading states */
.velvet-dashboard-loading {
  opacity: 0.6;
  pointer-events: none;
}

.velvet-dashboard-loading .velvet-card {
  animation: velvet-dashboard-pulse 1.5s ease-in-out infinite;
}

@keyframes velvet-dashboard-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.8; }
}

/* Focus management for accessibility */
.velvet-dashboard-content:focus {
  outline: none;
}

.velvet-dashboard [tabindex="-1"]:focus {
  outline: none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .velvet-dashboard {
    background: #000;
  }
  
  .velvet-dashboard-title,
  .velvet-dashboard-subtitle {
    color: #fff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .velvet-dashboard * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = dashboardStyles;
  document.head.appendChild(styleSheet);
}

export default VelvetDashboard;