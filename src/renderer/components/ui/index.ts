/**
 * Velvet UI Components Index
 * 
 * This file exports all the reusable UI components that follow Velvet's design system.
 * All components are designed with glassmorphism styling and neurodivergent-friendly UX.
 */

// Core UI Components
export { Card, CardHeader, CardTitle, CardContent } from './Card';
export { Button } from './Button';
export { Progress, CircularProgress } from './Progress';
export { Badge, MoodBadge, StatusBadge } from './Badge';
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TaskTable } from './Table';
export { Alert, PatternAlert, GentleNotification } from './Alert';
export { Chart, FocusPatternChart, EnergyChart } from './Chart';
export { Sidebar, getVelvetSidebarItems } from './Sidebar';

// Type exports for developers
export type { DataPoint } from './Chart';

// Component categories for better organization
export const VelvetUI = {
  // Layout & Navigation
  Sidebar,
  getVelvetSidebarItems,
  
  // Content Containers
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  
  // Interactive Elements
  Button,
  
  // Data Display
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TaskTable,
  Chart,
  FocusPatternChart,
  EnergyChart,
  
  // Progress & Status
  Progress,
  CircularProgress,
  Badge,
  MoodBadge,
  StatusBadge,
  
  // Feedback & Notifications
  Alert,
  PatternAlert,
  GentleNotification
};

// Design tokens (for developers who want to match the styling)
export const VelvetDesignTokens = {
  colors: {
    primary: {
      blue: '#2563eb',
      secondary: '#1d4ed8',
      accent: '#06b6d4'
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)'
    },
    background: {
      primary: 'rgba(15, 23, 42, 0.95)',
      secondary: 'rgba(30, 41, 59, 0.90)',
      overlay: 'rgba(15, 23, 42, 0.8)'
    },
    borders: {
      primary: 'rgba(59, 130, 246, 0.2)',
      secondary: 'rgba(59, 130, 246, 0.1)',
      accent: 'rgba(59, 130, 246, 0.3)'
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px'
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%'
  },
  
  typography: {
    fontFamily: {
      display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
    },
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '18px',
      '2xl': '24px',
      '3xl': '32px'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  
  effects: {
    glassmorphism: {
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.90) 50%, rgba(15, 23, 42, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    },
    animation: {
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      hover: 'transform: translateY(-2px)',
      focus: 'outline: 2px solid rgba(59, 130, 246, 0.6)'
    }
  }
};

// Utility functions for developers
export const VelvetUtils = {
  // Generate glassmorphism CSS
  getGlassmorphismStyles: (opacity = 0.95) => ({
    background: `linear-gradient(135deg, rgba(15, 23, 42, ${opacity}) 0%, rgba(30, 41, 59, ${opacity - 0.05}) 50%, rgba(15, 23, 42, ${opacity}) 100%)`,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  }),
  
  // Generate neurodivergent-friendly focus styles
  getFocusStyles: () => ({
    outline: '2px solid rgba(59, 130, 246, 0.6)',
    outlineOffset: '2px'
  }),
  
  // Generate responsive font sizes
  getResponsiveFontSize: (base: number) => ({
    fontSize: `${base}px`,
    '@media (max-width: 768px)': {
      fontSize: `${Math.max(base - 2, 10)}px`
    },
    '@media (max-width: 480px)': {
      fontSize: `${Math.max(base - 3, 9)}px`
    }
  }),
  
  // Generate mood-based colors
  getMoodColor: (mood: string) => {
    const moodColors = {
      calm: 'rgba(16, 185, 129, 0.8)',
      anxious: 'rgba(245, 158, 11, 0.8)',
      excited: 'rgba(168, 85, 247, 0.8)',
      overwhelmed: 'rgba(239, 68, 68, 0.8)',
      focused: 'rgba(34, 197, 94, 0.8)',
      distracted: 'rgba(251, 146, 60, 0.8)'
    };
    return moodColors[mood as keyof typeof moodColors] || 'rgba(107, 114, 128, 0.8)';
  }
};

// Usage examples for developers
export const USAGE_EXAMPLES = {
  basicCard: `
    import { Card, CardHeader, CardTitle, CardContent } from './ui';
    
    <Card hover>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        Card content goes here
      </CardContent>
    </Card>
  `,
  
  energyDisplay: `
    import { CircularProgress, MoodBadge } from './ui';
    
    <CircularProgress 
      value={75} 
      variant="success" 
      label="HIGH"
    />
    <MoodBadge mood="focused" />
  `,
  
  taskTable: `
    import { TaskTable } from './ui';
    
    <TaskTable 
      tasks={myTasks}
      onTaskClick={(taskId) => handleTaskClick(taskId)}
    />
  `,
  
  patternAlert: `
    import { PatternAlert } from './ui';
    
    <PatternAlert 
      pattern={{
        type: 'hyperfocus',
        confidence: 0.85,
        duration: 2700000,
        context: 'Coding session detected',
        suggestion: 'Consider taking a break'
      }}
      onAction={() => takeBreak()}
    />
  `,
  
  focusChart: `
    import { FocusPatternChart } from './ui';
    
    <FocusPatternChart 
      patterns={todaysFocusData}
    />
  `
};

export default VelvetUI;