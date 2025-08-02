import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className={`velvet-table-container ${className}`}>
      <table className="velvet-table">
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children, className = '' }) => {
  return (
    <thead className={`velvet-table-header ${className}`}>
      {children}
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  return (
    <tbody className={`velvet-table-body ${className}`}>
      {children}
    </tbody>
  );
};

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ 
  children, 
  className = '', 
  onClick,
  hover = true 
}) => {
  return (
    <tr 
      className={`velvet-table-row ${hover ? 'velvet-table-row-hover' : ''} ${onClick ? 'velvet-table-row-clickable' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
  sortable?: boolean;
  onSort?: () => void;
}

export const TableHead: React.FC<TableHeadProps> = ({ 
  children, 
  className = '',
  sortable = false,
  onSort
}) => {
  return (
    <th 
      className={`velvet-table-head ${sortable ? 'velvet-table-head-sortable' : ''} ${className}`}
      onClick={sortable ? onSort : undefined}
    >
      {children}
      {sortable && <span className="velvet-table-sort-icon">↕</span>}
    </th>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const TableCell: React.FC<TableCellProps> = ({ 
  children, 
  className = '',
  align = 'left'
}) => {
  return (
    <td className={`velvet-table-cell velvet-table-cell-${align} ${className}`}>
      {children}
    </td>
  );
};

// Specialized component for task table
interface TaskTableProps {
  tasks: Array<{
    id: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    steps: string[];
    currentStep: number;
    timeSpent?: number;
    estimatedTime?: number;
  }>;
  onTaskClick?: (taskId: string) => void;
  className?: string;
}

export const TaskTable: React.FC<TaskTableProps> = ({ 
  tasks, 
  onTaskClick, 
  className = '' 
}) => {
  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getProgressPercentage = (currentStep: number, totalSteps: number): number => {
    if (totalSteps === 0) return 0;
    return Math.round((currentStep / totalSteps) * 100);
  };

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow 
            key={task.id} 
            onClick={() => onTaskClick?.(task.id)}
            className="velvet-task-row"
          >
            <TableCell>
              <div className="velvet-task-cell">
                <div className="velvet-task-title">{task.description}</div>
                <div className="velvet-task-subtitle">
                  Step {task.currentStep + 1} of {task.steps.length}: {task.steps[task.currentStep] || 'Complete'}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="velvet-task-progress">
                <div 
                  className="velvet-task-progress-bar"
                  style={{ width: `${getProgressPercentage(task.currentStep, task.steps.length)}%` }}
                />
                <span className="velvet-task-progress-text">
                  {getProgressPercentage(task.currentStep, task.steps.length)}%
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`velvet-task-status velvet-task-status-${task.status}`}>
                {task.status.replace('_', ' ')}
              </span>
            </TableCell>
            <TableCell align="right">
              <div className="velvet-task-time">
                {task.timeSpent && <div>{formatTime(task.timeSpent)}</div>}
                {task.estimatedTime && (
                  <div className="velvet-task-estimate">
                    ~{formatTime(task.estimatedTime)}
                  </div>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Add the CSS styles for Velvet's glassmorphism table
const tableStyles = `
.velvet-table-container {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.velvet-table {
  width: 100%;
  border-collapse: collapse;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}

.velvet-table-header {
  background: rgba(59, 130, 246, 0.05);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

.velvet-table-head {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

.velvet-table-head-sortable {
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.velvet-table-head-sortable:hover {
  color: rgba(255, 255, 255, 0.95);
  background: rgba(59, 130, 246, 0.1);
}

.velvet-table-sort-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
  font-size: 12px;
}

.velvet-table-body {
  background: transparent;
}

.velvet-table-row {
  border-bottom: 1px solid rgba(59, 130, 246, 0.08);
  transition: all 0.3s ease;
}

.velvet-table-row:last-child {
  border-bottom: none;
}

.velvet-table-row-hover:hover {
  background: rgba(59, 130, 246, 0.05);
  backdrop-filter: blur(10px);
}

.velvet-table-row-clickable {
  cursor: pointer;
}

.velvet-table-row-clickable:hover {
  background: rgba(59, 130, 246, 0.08);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.velvet-table-cell {
  padding: 16px 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.5;
  vertical-align: middle;
}

.velvet-table-cell-left {
  text-align: left;
}

.velvet-table-cell-center {
  text-align: center;
}

.velvet-table-cell-right {
  text-align: right;
}

/* Task-specific styles */
.velvet-task-row {
  position: relative;
}

.velvet-task-cell {
  min-width: 200px;
}

.velvet-task-title {
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 4px;
  line-height: 1.4;
}

.velvet-task-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
}

.velvet-task-progress {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 120px;
}

.velvet-task-progress-bar {
  height: 6px;
  background: linear-gradient(90deg, 
    rgba(37, 99, 235, 0.8) 0%,
    rgba(59, 130, 246, 0.9) 100%);
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.3);
  flex: 1;
  min-width: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.velvet-task-progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.velvet-task-progress-text {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  min-width: 35px;
  text-align: right;
}

.velvet-task-status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.velvet-task-status-pending {
  background: rgba(107, 114, 128, 0.2);
  border: 1px solid rgba(156, 163, 175, 0.3);
  color: rgba(209, 213, 219, 0.9);
}

.velvet-task-status-in_progress {
  background: rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: rgba(147, 197, 253, 0.95);
  animation: velvet-status-pulse 2s ease-in-out infinite;
}

.velvet-task-status-completed {
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.4);
  color: rgba(134, 239, 172, 0.95);
}

@keyframes velvet-status-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.velvet-task-time {
  text-align: right;
  font-size: 13px;
}

.velvet-task-estimate {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

/* Empty state */
.velvet-table-empty {
  padding: 40px 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.velvet-table-empty-message {
  font-size: 16px;
  margin-bottom: 8px;
}

.velvet-table-empty-hint {
  font-size: 13px;
  opacity: 0.8;
}

/* Responsive design */
@media (max-width: 768px) {
  .velvet-table-head,
  .velvet-table-cell {
    padding: 12px 16px;
  }
  
  .velvet-task-title {
    font-size: 13px;
  }
  
  .velvet-task-subtitle {
    font-size: 11px;
  }
  
  .velvet-task-progress {
    min-width: 100px;
  }
  
  /* Stack table cells on very small screens */
  @media (max-width: 480px) {
    .velvet-table-container {
      overflow-x: auto;
    }
    
    .velvet-table {
      min-width: 600px;
    }
  }
}

/* Loading state for tasks */
.velvet-task-loading {
  opacity: 0.6;
  pointer-events: none;
}

.velvet-task-loading .velvet-task-progress-bar {
  background: repeating-linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.3),
    rgba(59, 130, 246, 0.3) 10px,
    rgba(59, 130, 246, 0.1) 10px,
    rgba(59, 130, 246, 0.1) 20px
  );
  animation: velvet-loading-slide 1.5s linear infinite;
}

@keyframes velvet-loading-slide {
  0% { background-position: 0% 0%; }
  100% { background-position: 20px 0%; }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = tableStyles;
  document.head.appendChild(styleSheet);
}