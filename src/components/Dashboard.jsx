import React, { useState } from 'react';
import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { Download, RotateCcw, Zap, FileDown, Eye, EyeOff } from 'lucide-react';
import mockData from '../data/mockData';
import { exportToPDF } from '../utils/pdfExport';
import Header from './Header';
import ClientDataForm from './ClientDataForm';
import DemoModeToggle from './DemoModeToggle';
import SalesCloser from './SalesCloser';
import LeakAnalysis from './LeakAnalysis';
import PerformanceChart from './PerformanceChart';
import LeadSourceChart from './LeadSourceChart';
import ResponseTimeMetrics from './ResponseTimeMetrics';
import ReviewTracker from './ReviewTracker';
import ConversionFunnel from './ConversionFunnel';
import WeeklySummary from './WeeklySummary';
import ActionItems from './ActionItems';
import TierIndicator from './TierIndicator';
import RevenueProtectionScore from './RevenueProtectionScore';
import RecommendedActions from './RecommendedActions';
import ProjectionView from './ProjectionView';
import WhatIfCalculator from './WhatIfCalculator';
import JobBoard from './JobBoard';
import SettingsPanel from './SettingsPanel';
import './Dashboard.css';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('30');
  const [viewMode, setViewMode] = useState('full'); // 'full' or 'sales'
  const [isExporting, setIsExporting] = useState(false);
  const [showForm, setShowForm] = useState(true); // Toggle form visibility
  // clientData holds real client data when loaded; falls back to mockData
  const [clientData, setClientData] = useState(() => {
    try {
      const saved = localStorage.getItem('clientData');
      return saved ? JSON.parse(saved) : mockData;
    } catch (e) {
      return mockData;
    }
  });

  const handleRefresh = () => {
    // Simulate refresh
    alert('Dashboard refreshed! (Mock data loaded)');
  };

  const handleExport = () => {
    // Simulate export
    alert('Exporting dashboard data to CSV...');
  };

  const handleExportDashboardPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('dashboard-content');
      const filename = `${clientData.businessName}_Dashboard_${new Date().toLocaleDateString()}`;
      const title = `Revenue Protection Dashboard\n${clientData.businessName}`;
      await exportToPDF(element, filename, title);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const handleLoadClientData = (data) => {
    // Basic validation: must be an object
    if (data && typeof data === 'object') {
      setClientData(data);
      try { localStorage.setItem('clientData', JSON.stringify(data)); } catch (e) {}
      alert('Client data loaded');
    } else {
      alert('Invalid data');
    }
  };

  return (
    <div className="dashboard-container">
      <Header
        businessName={clientData.businessName}
        currentMonth={clientData.currentMonth}
        stats={clientData.headerStats}
      />

      {/* Sales Closer View */}
      {viewMode === 'sales' && (
        <SalesCloser 
          clientData={clientData}
          onClose={() => setViewMode('full')}
        />
      )}

      {/* Full Dashboard View */}
      {viewMode === 'full' && (
        <Container fluid className="dashboard-content">
        <div id="dashboard-content">
        {/* Client Data Loader */}
        {showForm && <ClientDataForm onLoad={handleLoadClientData} />}

        {/* Demo Mode Toggle */}
        <div className="demo-mode-section">
          <DemoModeToggle onModeChange={(profile) => {
            // Mode change handler would update dashboard state
            console.log('Profile selected:', profile);
          }} />
        </div>

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
            <Button 
              variant="warning" 
              className="ms-2 control-btn"
              onClick={() => setViewMode('sales')}
            >
              <Zap size={18} />
              Sales Mode
            </Button>
          </div>

          <div className="controls-right">
            <Button 
              variant="light" 
              className="control-btn" 
              onClick={() => setShowForm(!showForm)}
              title={showForm ? 'Hide form' : 'Show form'}
            >
              {showForm ? <Eye size={18} /> : <EyeOff size={18} />}
              {showForm ? 'Hide Form' : 'Show Form'}
            </Button>
            <Button 
              variant="light" 
              className="control-btn" 
              onClick={handleExportDashboardPDF}
              disabled={isExporting}
              title="Export dashboard as PDF"
            >
              <FileDown size={18} />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
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
          leakItems={clientData.revenueLeak}
          totalRevenue={clientData.totalRevenueLeak}
        />

        {/* Revenue Protection Score */}
        <RevenueProtectionScore leakData={clientData.revenueLeak} />

        {/* Recommended Actions */}
        <RecommendedActions leakData={clientData.revenueLeak} />

        {/* Projection View - Show impact if actions taken */}
        <ProjectionView clientData={clientData} />

        <PerformanceChart
          data={clientData.monthlyPerformance}
          monthlyComparison={clientData.monthlyComparison}
        />

        <LeadSourceChart sources={clientData.leadSources} />

        <ResponseTimeMetrics responseTimeData={clientData.responseTime} />

        <ReviewTracker reviewData={clientData.reviews} />

        <ConversionFunnel funnelData={clientData.conversionFunnel} />

        <WeeklySummary summaryCards={clientData.weeklySummary} />

        <ActionItems alerts={clientData.actionItems} />

        <TierIndicator tierData={clientData.tierStatus} />

        {/* What-If Calculator */}
        <WhatIfCalculator currentMetrics={{
          avgResponseTime: clientData.responseTime?.phoneCalls?.average ?? 0,
          reviewCount: clientData.reviews?.current ?? 0,
          websiteConversion: clientData.leadSources && clientData.leadSources.length ? (clientData.leadSources[0].conversion || 0) / 100 : 0.08
        }} />

        {/* Job Board */}
        <JobBoard />

        {/* Settings Panel */}
        <SettingsPanel />

        {/* Footer */}
        <div className="dashboard-footer">
          <p>
            Revenue Protection Dashboard © 2024 | Data updates every 15 minutes | For support, contact support@example.com
          </p>
        </div>
        </div>
      </Container>
      )}
    </div>
  );
};

export default Dashboard;
