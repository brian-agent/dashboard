import React, { useState } from 'react';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency, formatPercent, getStatusColor, getTrendColor } from '../utils/calculations';
import './LeakAnalysis.css';

const LeakAnalysis = ({ leakItems, totalRevenue }) => {
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
            Revenue Leak Analysis
          </h2>
          <div className="total-leak">
            <span className="leak-label">Total Monthly Leak:</span>
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
                    <span className="metric-label">Lost Opportunities</span>
                    <span className="metric-value">{leak.lostOpportunities}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Est. Revenue Impact</span>
                    <span className="metric-value revenue">{formatCurrency(leak.estimatedRevenue)}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">% of Total Leaks</span>
                    <span className="metric-value">{formatPercent(leak.percentage)}</span>
                  </div>
                </div>

                {selectedLeak?.id === leak.id && (
                  <div className="leak-details">
                    <p className="leak-description">{leak.description}</p>
                    <div className="action-button">
                      <button className="btn-action">See Detailed Breakdown</button>
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
                  <strong>Biggest Leak:</strong> Missed calls during jobs (
                  {formatCurrency(leakItems.find(l => l.id === 'missed-calls').estimatedRevenue)}/month)
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
