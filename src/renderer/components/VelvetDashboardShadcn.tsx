import React from 'react';
import { Button } from './ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/Card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/Tabs';

// Custom dashboard components (simplified versions for now)
const DateRangePicker = () => (
  <Button variant="outline" size="sm">
    📅 Last 30 days
  </Button>
);

const MainNav = () => (
  <nav className="velvet-main-nav">
    <a href="#" className="velvet-nav-item velvet-nav-item-active">Overview</a>
    <a href="#" className="velvet-nav-item">Analytics</a>
    <a href="#" className="velvet-nav-item">Reports</a>
    <a href="#" className="velvet-nav-item">Notifications</a>
  </nav>
);

const TeamSwitcher = () => (
  <Button variant="ghost" size="sm">
    🧠 Velvet Brain
  </Button>
);

const UserNav = () => (
  <Button variant="ghost" size="sm">
    👤 Profile
  </Button>
);

const Search = () => (
  <div className="velvet-search">
    <input 
      type="text" 
      placeholder="Search neurodivergent patterns..." 
      className="velvet-search-input"
    />
  </div>
);

const Overview = () => (
  <div className="velvet-overview">
    <div className="velvet-chart-placeholder">
      <h4>📊 ADHD Pattern Analytics</h4>
      <div className="velvet-chart-mock">
        <div className="chart-bar" style={{height: '60%'}}></div>
        <div className="chart-bar" style={{height: '80%'}}></div>
        <div className="chart-bar" style={{height: '45%'}}></div>
        <div className="chart-bar" style={{height: '90%'}}></div>
        <div className="chart-bar" style={{height: '70%'}}></div>
        <div className="chart-bar" style={{height: '55%'}}></div>
      </div>
      <p>Hyperfocus sessions detected: +25% this week</p>
    </div>
  </div>
);

const RecentSales = () => (
  <div className="velvet-recent-activity">
    <h4>🎯 Recent Achievements</h4>
    <div className="velvet-activity-list">
      <div className="velvet-activity-item">
        <div className="velvet-activity-avatar">🎉</div>
        <div className="velvet-activity-details">
          <p className="velvet-activity-name">Deep Focus Session</p>
          <p className="velvet-activity-meta">Completed 2.5h coding session</p>
        </div>
        <div className="velvet-activity-value">+50 focus points</div>
      </div>
      <div className="velvet-activity-item">
        <div className="velvet-activity-avatar">🧘</div>
        <div className="velvet-activity-details">
          <p className="velvet-activity-name">Mindful Break</p>
          <p className="velvet-activity-meta">Prevented burnout</p>
        </div>
        <div className="velvet-activity-value">+25 wellness</div>
      </div>
      <div className="velvet-activity-item">
        <div className="velvet-activity-avatar">✅</div>
        <div className="velvet-activity-details">
          <p className="velvet-activity-name">Task Completion</p>
          <p className="velvet-activity-meta">Finished 8/10 daily goals</p>
        </div>
        <div className="velvet-activity-value">+75 productivity</div>
      </div>
    </div>
  </div>
);

export const VelvetDashboardShadcn: React.FC = () => {
  return (
    <div className="velvet-dashboard-container">
      {/* Mobile view - show images */}
      <div className="velvet-dashboard-mobile md:hidden">
        <div className="velvet-mobile-placeholder">
          <h2>📱 Velvet Dashboard</h2>
          <p>Optimized mobile view coming soon...</p>
        </div>
      </div>

      {/* Desktop view */}
      <div className="velvet-dashboard-desktop hidden md:flex">
        {/* Header */}
        <div className="velvet-dashboard-header">
          <div className="velvet-header-content">
            <TeamSwitcher />
            <MainNav />
            <div className="velvet-header-actions">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="velvet-dashboard-main">
          <div className="velvet-dashboard-content">
            {/* Page Header */}
            <div className="velvet-page-header">
              <div>
                <h1 className="velvet-page-title">🧠 Neurodivergent Dashboard</h1>
                <p className="velvet-page-description">
                  Your gentle companion for ADHD, autism, and executive function support
                </p>
              </div>
              <div className="velvet-page-actions">
                <DateRangePicker />
                <Button variant="primary">✨ Add Goal</Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="velvet-dashboard-tabs">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="velvet-tab-content">
                {/* KPI Cards */}
                <div className="velvet-kpi-grid">
                  <Card>
                    <CardHeader>
                      <CardTitle className="velvet-kpi-title">
                        <span>💰 Focus Revenue</span>
                      </CardTitle>
                      <CardDescription>
                        Value created during deep focus sessions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="velvet-kpi-value">$3,247.00</div>
                      <p className="velvet-kpi-change positive">+20.1% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="velvet-kpi-title">
                        <span>🎯 Goals Completed</span>
                      </CardTitle>
                      <CardDescription>
                        Daily and weekly objectives achieved
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="velvet-kpi-value">127</div>
                      <p className="velvet-kpi-change positive">+12.5% this week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="velvet-kpi-title">
                        <span>⚡ Energy Level</span>
                      </CardTitle>
                      <CardDescription>
                        Current cognitive capacity and well-being
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="velvet-kpi-value">87%</div>
                      <p className="velvet-kpi-change positive">+8.2% from yesterday</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="velvet-kpi-title">
                        <span>🧘 Mindful Moments</span>
                      </CardTitle>
                      <CardDescription>
                        Prevented burnout and stress episodes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="velvet-kpi-value">23</div>
                      <p className="velvet-kpi-change positive">+15.7% this week</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts and Activity */}
                <div className="velvet-dashboard-grid">
                  <Card className="velvet-chart-card">
                    <CardHeader>
                      <CardTitle>📈 Pattern Analytics</CardTitle>
                      <CardDescription>
                        ADHD patterns and productivity insights over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Overview />
                    </CardContent>
                  </Card>

                  <Card className="velvet-activity-card">
                    <CardHeader>
                      <CardTitle>🌟 Recent Achievements</CardTitle>
                      <CardDescription>
                        Latest wins and positive patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentSales />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>📊 Deep Analytics</CardTitle>
                    <CardDescription>
                      Comprehensive neurodivergent pattern analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Advanced analytics dashboard coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>📋 Progress Reports</CardTitle>
                    <CardDescription>
                      Weekly and monthly progress summaries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Detailed reporting system in development...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>🔔 Gentle Notifications</CardTitle>
                    <CardDescription>
                      Mindful reminders and supportive nudges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Notification center coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add the CSS styles for the dashboard layout
const dashboardStyles = `
.velvet-dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.90) 25%,
    rgba(37, 99, 235, 0.05) 50%,
    rgba(30, 41, 59, 0.90) 75%,
    rgba(15, 23, 42, 0.95) 100%
  );
  color: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif;
}

.velvet-dashboard-mobile {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.velvet-mobile-placeholder {
  text-align: center;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 40px;
}

.velvet-dashboard-desktop {
  flex-direction: column;
  min-height: 100vh;
}

.velvet-dashboard-header {
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.velvet-header-content {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  gap: 24px;
}

.velvet-main-nav {
  display: flex;
  gap: 24px;
  margin-left: 24px;
}

.velvet-nav-item {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.velvet-nav-item:hover {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(59, 130, 246, 0.1);
}

.velvet-nav-item-active {
  color: rgba(255, 255, 255, 0.95);
  background: rgba(59, 130, 246, 0.2);
}

.velvet-header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.velvet-search {
  position: relative;
}

.velvet-search-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  width: 300px;
  transition: all 0.3s ease;
}

.velvet-search-input:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.velvet-search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.velvet-dashboard-main {
  flex: 1;
  padding: 32px 24px;
}

.velvet-dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
}

.velvet-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.velvet-page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%,
    rgba(59, 130, 246, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.velvet-page-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.velvet-page-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.velvet-dashboard-tabs {
  width: 100%;
}

.velvet-tab-content {
  margin-top: 0;
}

.velvet-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.velvet-kpi-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.velvet-kpi-value {
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 8px 0;
}

.velvet-kpi-change {
  font-size: 13px;
  font-weight: 500;
}

.velvet-kpi-change.positive {
  color: rgba(34, 197, 94, 0.9);
}

.velvet-kpi-change.negative {
  color: rgba(239, 68, 68, 0.9);
}

.velvet-dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.velvet-chart-card {
  min-height: 400px;
}

.velvet-activity-card {
  min-height: 400px;
}

.velvet-overview {
  width: 100%;
  height: 300px;
}

.velvet-chart-placeholder {
  text-align: center;
  padding: 20px;
}

.velvet-chart-mock {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 8px;
  height: 200px;
  margin: 20px 0;
}

.chart-bar {
  width: 40px;
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.8) 0%,
    rgba(59, 130, 246, 0.6) 100%
  );
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.9) 0%,
    rgba(59, 130, 246, 0.7) 100%
  );
}

.velvet-recent-activity {
  width: 100%;
}

.velvet-activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.velvet-activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(15, 23, 42, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.velvet-activity-item:hover {
  background: rgba(15, 23, 42, 0.5);
  border-color: rgba(59, 130, 246, 0.2);
  transform: translateY(-1px);
}

.velvet-activity-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
}

.velvet-activity-details {
  flex: 1;
}

.velvet-activity-name {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 4px 0;
  font-size: 14px;
}

.velvet-activity-meta {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.velvet-activity-value {
  font-weight: 600;
  color: rgba(34, 197, 94, 0.9);
  font-size: 13px;
}

/* Responsive design */
@media (max-width: 1200px) {
  .velvet-dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .velvet-kpi-grid {
    grid-template-columns: 1fr;
  }
  
  .velvet-page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .velvet-search-input {
    width: 200px;
  }
  
  .velvet-dashboard-main {
    padding: 16px;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = dashboardStyles;
  document.head.appendChild(styleSheet);
}