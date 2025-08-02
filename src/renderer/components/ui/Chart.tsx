import React from 'react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: DataPoint[];
  type: 'line' | 'bar' | 'area';
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  title?: string;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type = 'line',
  height = 200,
  className = '',
  showGrid = true,
  showLabels = true,
  title
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`velvet-chart-empty ${className}`} style={{ height }}>
        <span className="velvet-chart-empty-icon">📊</span>
        <p>No data to display</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  // SVG dimensions
  const padding = 40;
  const width = 100; // Will be set as percentage
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  // Calculate positions
  const getX = (index: number) => padding + (index / (data.length - 1)) * chartWidth;
  const getY = (value: number) => padding + ((maxValue - value) / range) * chartHeight;

  const renderLineChart = () => {
    const points = data.map((point, index) => `${getX(index)},${getY(point.value)}`).join(' ');
    
    return (
      <g>
        {/* Area fill */}
        {type === 'area' && (
          <path
            d={`M ${padding},${getY(minValue)} L ${points} L ${padding + chartWidth},${getY(minValue)} Z`}
            fill="url(#areaGradient)"
            opacity="0.3"
          />
        )}
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((point, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(point.value)}
            r="4"
            fill="rgba(59, 130, 246, 0.9)"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="2"
          />
        ))}
      </g>
    );
  };

  const renderBarChart = () => {
    const barWidth = chartWidth / data.length * 0.6;
    
    return (
      <g>
        {data.map((point, index) => {
          const x = getX(index) - barWidth / 2;
          const y = getY(point.value);
          const barHeight = getY(minValue) - y;
          
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={point.color || "rgba(59, 130, 246, 0.8)"}
              rx="4"
            />
          );
        })}
      </g>
    );
  };

  return (
    <div className={`velvet-chart ${className}`}>
      {title && <h4 className="velvet-chart-title">{title}</h4>}
      <div className="velvet-chart-container" style={{ height }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="velvet-chart-svg"
          preserveAspectRatio="none"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.8)" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {showGrid && (
            <g className="velvet-chart-grid">
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const y = padding + ratio * chartHeight;
                return (
                  <line
                    key={`h-${index}`}
                    x1={padding}
                    y1={y}
                    x2={padding + chartWidth}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                );
              })}
              
              {/* Vertical grid lines */}
              {data.map((_, index) => (
                <line
                  key={`v-${index}`}
                  x1={getX(index)}
                  y1={padding}
                  x2={getX(index)}
                  y2={padding + chartHeight}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
              ))}
            </g>
          )}
          
          {/* Chart content */}
          {type === 'bar' ? renderBarChart() : renderLineChart()}
        </svg>
        
        {/* Labels */}
        {showLabels && (
          <div className="velvet-chart-labels">
            {data.map((point, index) => (
              <div
                key={index}
                className="velvet-chart-label"
                style={{ left: `${(index / (data.length - 1)) * 100}%` }}
              >
                {point.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Focus Pattern Chart - specialized for Velvet
interface FocusPatternChartProps {
  patterns: Array<{
    time: string;
    focusLevel: number;
    type: 'focused' | 'distracted' | 'hyperfocus' | 'idle';
  }>;
  className?: string;
}

export const FocusPatternChart: React.FC<FocusPatternChartProps> = ({
  patterns,
  className = ''
}) => {
  const chartData: DataPoint[] = patterns.map(pattern => ({
    label: pattern.time,
    value: pattern.focusLevel,
    color: pattern.type === 'hyperfocus' ? 'rgba(168, 85, 247, 0.8)' :
           pattern.type === 'focused' ? 'rgba(34, 197, 94, 0.8)' :
           pattern.type === 'distracted' ? 'rgba(251, 146, 60, 0.8)' :
           'rgba(107, 114, 128, 0.8)'
  }));

  return (
    <div className={`velvet-focus-chart ${className}`}>
      <Chart
        data={chartData}
        type="area"
        title="Focus Patterns Today"
        height={180}
        showGrid={true}
        showLabels={true}
      />
      
      {/* Legend */}
      <div className="velvet-focus-legend">
        <div className="velvet-focus-legend-item">
          <span className="velvet-focus-legend-color" style={{ backgroundColor: 'rgba(168, 85, 247, 0.8)' }}></span>
          <span>Hyperfocus</span>
        </div>
        <div className="velvet-focus-legend-item">
          <span className="velvet-focus-legend-color" style={{ backgroundColor: 'rgba(34, 197, 94, 0.8)' }}></span>
          <span>Focused</span>
        </div>
        <div className="velvet-focus-legend-item">
          <span className="velvet-focus-legend-color" style={{ backgroundColor: 'rgba(251, 146, 60, 0.8)' }}></span>
          <span>Distracted</span>
        </div>
        <div className="velvet-focus-legend-item">
          <span className="velvet-focus-legend-color" style={{ backgroundColor: 'rgba(107, 114, 128, 0.8)' }}></span>
          <span>Idle</span>
        </div>
      </div>
    </div>
  );
};

// Energy Level Chart - specialized for daily energy tracking
interface EnergyChartProps {
  energyData: Array<{
    time: string;
    level: number;
    mood: string;
  }>;
  className?: string;
}

export const EnergyChart: React.FC<EnergyChartProps> = ({
  energyData,
  className = ''
}) => {
  const chartData: DataPoint[] = energyData.map(entry => ({
    label: entry.time,
    value: entry.level
  }));

  return (
    <Chart
      data={chartData}
      type="line"
      title="Energy Levels Today"
      height={160}
      className={`velvet-energy-chart ${className}`}
      showGrid={true}
      showLabels={true}
    />
  );
};

// Add the CSS styles for Velvet's glassmorphism charts
const chartStyles = `
.velvet-chart {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif;
}

.velvet-chart-title {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

.velvet-chart-container {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  overflow: hidden;
}

.velvet-chart-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.velvet-chart-grid line {
  opacity: 0.3;
}

.velvet-chart-labels {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.velvet-chart-label {
  position: absolute;
  transform: translateX(-50%);
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  white-space: nowrap;
}

.velvet-chart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

.velvet-chart-empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0.7;
}

.velvet-chart-empty p {
  margin: 0;
  font-size: 14px;
  font-style: italic;
}

/* Focus Pattern Chart Specific Styles */
.velvet-focus-chart {
  background: rgba(15, 23, 42, 0.3);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.velvet-focus-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.velvet-focus-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.velvet-focus-legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: block;
}

/* Energy Chart Specific Styles */
.velvet-energy-chart {
  background: rgba(15, 23, 42, 0.2);
  border-radius: 12px;
  padding: 16px;
}

/* Chart animations */
.velvet-chart-svg {
  animation: velvet-chart-fade-in 0.8s ease-out;
}

@keyframes velvet-chart-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.velvet-chart-svg polyline,
.velvet-chart-svg path {
  animation: velvet-chart-draw 1.5s ease-out;
}

@keyframes velvet-chart-draw {
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
}

.velvet-chart-svg circle {
  animation: velvet-chart-pop 0.6s ease-out backwards;
}

@keyframes velvet-chart-pop {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.velvet-chart-svg rect {
  animation: velvet-chart-grow 0.8s ease-out backwards;
}

@keyframes velvet-chart-grow {
  from {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  to {
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

/* Hover effects for interactive charts */
.velvet-chart-svg circle:hover {
  r: 6;
  stroke-width: 3;
  transition: all 0.2s ease;
}

.velvet-chart-svg rect:hover {
  opacity: 0.9;
  transition: opacity 0.2s ease;
}

/* Responsive design */
@media (max-width: 768px) {
  .velvet-chart-title {
    font-size: 14px;
  }
  
  .velvet-focus-legend {
    gap: 12px;
  }
  
  .velvet-focus-legend-item {
    font-size: 11px;
  }
  
  .velvet-chart-label {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .velvet-focus-legend {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .velvet-chart-container {
    border-radius: 8px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .velvet-chart-svg polyline,
  .velvet-chart-svg circle {
    stroke: #fff;
  }
  
  .velvet-chart-svg rect {
    fill: #fff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .velvet-chart-svg,
  .velvet-chart-svg * {
    animation: none !important;
    transition: none !important;
  }
}

/* Loading state */
.velvet-chart-loading {
  opacity: 0.6;
  pointer-events: none;
}

.velvet-chart-loading .velvet-chart-container {
  position: relative;
  overflow: hidden;
}

.velvet-chart-loading .velvet-chart-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent);
  animation: velvet-chart-shimmer 1.5s infinite;
}

@keyframes velvet-chart-shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Tooltip support (for future enhancement) */
.velvet-chart-tooltip {
  position: absolute;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  pointer-events: none;
  z-index: 1000;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.velvet-chart-tooltip::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: rgba(59, 130, 246, 0.3) transparent transparent transparent;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = chartStyles;
  document.head.appendChild(styleSheet);
}