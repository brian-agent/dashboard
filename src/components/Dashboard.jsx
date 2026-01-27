import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Download, RotateCcw } from 'lucide-react';
import mockData from '../data/mockData';
import Header from './Header';
import LeakAnalysis from './LeakAnalysis';
import PerformanceChart from './PerformanceChart';
import LeadSourceChart from './LeadSourceChart';
import ResponseTimeMetrics from './ResponseTimeMetrics';
import ReviewTracker from './ReviewTracker';
import ConversionFunnel from './ConversionFunnel';
import WeeklySummary from './WeeklySummary';
import ActionItems from './ActionItems';
import TierIndicator from './TierIndicator';
import './Dashboard.css';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('30');

  const handleRefresh = () => {
    // Simulate refresh
    alert('Dashboard refreshed! (Mock data loaded)');
  };

  const handleExport = () => {
    // Simulate export
    alert('Exporting dashboard data to CSV...');
  };

  return (
    <div className="dashboard-container">
      <Header
        businessName={mockData.businessName}
        currentMonth={mockData.currentMonth}
        stats={mockData.headerStats}
      />

      <Container fluid className="dashboard-content">
        {/* Controls Bar */}
        <div className="controls-bar">
          <div className="controls-left">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="date-range-btn">
                {dateRange === '7' ? 'Last 7 Days' : dateRange === '30' ? 'Last 30 Days' : 'Last 90 Days'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setDateRange('7')}>
                  Last 7 Days
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDateRange('30')}>
                  Last 30 Days
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDateRange('90')}>
                  Last 90 Days
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="controls-right">
            <Button variant="light" className="control-btn" onClick={handleRefresh}>
              <RotateCcw size={18} />
              Refresh
            </Button>
            <Button variant="light" className="control-btn" onClick={handleExport}>
              <Download size={18} />
              Export
            </Button>
          </div>
        </div>

        {/* Main Dashboard Sections */}
        <LeakAnalysis
          leakItems={mockData.revenueLeak}
          totalRevenue={mockData.totalRevenueLeak}
        />

        <PerformanceChart
          data={mockData.monthlyPerformance}
          monthlyComparison={mockData.monthlyComparison}
        />

        <LeadSourceChart sources={mockData.leadSources} />

        <ResponseTimeMetrics responseTimeData={mockData.responseTime} />

        <ReviewTracker reviewData={mockData.reviews} />

        <ConversionFunnel funnelData={mockData.conversionFunnel} />

        <WeeklySummary summaryCards={mockData.weeklySummary} />

        <ActionItems alerts={mockData.actionItems} />

        <TierIndicator tierData={mockData.tierStatus} />

        {/* Footer */}
        <div className="dashboard-footer">
          <p>
            Revenue Protection Dashboard © 2024 | Data updates every 15 minutes | For support, contact support@example.com
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
