import React, { useState } from 'react';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency, formatPercent, getStatusColor, getTrendColor } from '../utils/calculations';
import './LeakAnalysis.css';

const LeakAnalysis = ({ leakItems = [], totalRevenue = 0, isDashboard = false }) => {
  const [selectedLeak, setSelectedLeak] = useState(null);

  const getTrendArrow = (trend, trendPercent) => {
    if (trend === 'improving') {
      return <TrendingDown size={16} color={getTrendColor(trend)} style={{ marginRight: '4px' }} />;
    } else if (trend === 'declining') {
      return <TrendingUp size={16} color={getTrendColor(trend)} style={{ marginRight: '4px' }} />;
    }
    return <Minus size={16} color={getTrendColor(trend)} style={{ marginRight: '4px' }} />;
  };

  const getStatusBadge = (status) => {
    const variants = {
      critical: 'danger',
      warning: 'warning',
      good: 'success',
      info: 'info'
    };
    const labels = {
      critical: 'Critical',
      warning: 'Warning',
      good: 'Good',
      info: 'Info'
    };
    return (
      <Badge bg={variants[status]} className="status-badge">
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="leak-analysis-section">
      <Container fluid>
        <div className="section-header">
          <h2 className="section-title">
            <AlertCircle size={28} className="section-icon" />
            Where We're Losing Money
          </h2>
          <div className="total-leak">
            <span className="leak-label">Extra Money We Could Make This Month:</span>
            <span className="leak-amount">{formatCurrency(totalRevenue)}</span>
          </div>
        </div>

        <div className="leaks-grid">
          {leakItems.map((leak) => (
            <Card
              key={leak.id}
              className={`leak-card ${selectedLeak?.id === leak.id ? 'selected' : ''}`}
              onClick={() => setSelectedLeak(selectedLeak?.id === leak.id ? null : leak)}
            >
              <Card.Body className="leak-card-body">
                <div className="leak-header">
                  <div className="leak-title-section">
                    <h5 className="leak-name">{leak.name}</h5>
                    {getStatusBadge(leak.status)}
                  </div>
                  <div className="leak-trend">
                    <span className="trend-item">
                      {getTrendArrow(leak.trend, leak.trendPercent)}
                      <span style={{ color: getTrendColor(leak.trend), fontSize: '0.85rem' }}>
                        {leak.trend === 'improving' ? '-' : '+'}{Math.abs(leak.trendPercent)}%
                      </span>
                    </span>
                  </div>
                </div>

                <div className="leak-metrics">
                  <div className="metric">
                    <span className="metric-label">Missed Jobs</span>
                    <span className="metric-value">{leak.lostOpportunities}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Extra Money We Could Make</span>
                    <span className="metric-value revenue">{formatCurrency(leak.estimatedRevenue)}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">% of Total Lost Money</span>
                    <span className="metric-value">{formatPercent(leak.percentage)}</span>
                  </div>
                </div>

                {selectedLeak?.id === leak.id && (
                  <div className="leak-details">
                    <p className="leak-description">{leak.description}</p>
                    <div className="action-button">
                      <button className="btn-action">How to Fix This →</button>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>

        <div className="leak-summary">
          <Card className="summary-card">
            <Card.Body>
              <h6 className="summary-title">Key Insights</h6>
              <ul className="insights-list">
                <li>
                  <strong>Biggest Leak:</strong> {leakItems && leakItems.length > 0 ? leakItems.reduce((max, l) => (l.estimatedRevenue > max.estimatedRevenue ? l : max)).name : 'N/A'} (
                  {leakItems && leakItems.length > 0 ? formatCurrency(leakItems.reduce((max, l) => (l.estimatedRevenue > max.estimatedRevenue ? l : max)).estimatedRevenue) : '$0'}/month)
                </li>
                <li>
                  <strong>Most Improved:</strong> Review gap impact (↓4.5% this month)
                </li>
                <li>
                  <strong>Immediate Action:</strong> After-hours inquiries - consider call forwarding service
                </li>
                <li>
                  <strong>Quick Win:</strong> Improve follow-up process - 8 leads waiting for contact
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default LeakAnalysis;
