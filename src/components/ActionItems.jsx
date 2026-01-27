import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import './ActionItems.css';

const ActionItems = ({ alerts = [] }) => {
  const getSeverityIcon = (severity) => {
    const icons = {
      critical: <AlertCircle size={24} color="#ef4444" />,
      warning: <AlertTriangle size={24} color="#f59e0b" />,
      info: <Info size={24} color="#3b82f6" />,
    };
    return icons[severity] || <CheckCircle2 size={24} color="#10b981" />;
  };

  const getSeverityBg = (severity) => {
    const colors = {
      critical: 'alert-critical',
      warning: 'alert-warning',
      info: 'alert-info',
    };
    return colors[severity] || 'alert-success';
  };

  const getSeverityLabel = (severity) => {
    const labels = {
      critical: 'Critical',
      warning: 'Warning',
      info: 'Suggestion',
    };
    return labels[severity] || 'Success';
  };

  return (
    <div className="action-items-section">
      <Container fluid>
        <h3 className="section-subtitle">What You Should Do Right Now</h3>

        <div className="alerts-grid">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`alert-card ${getSeverityBg(alert.severity)}`}>
              <Card.Body>
                <div className="alert-header">
                  <div className="alert-icon-wrapper">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="alert-title-section">
                    <h6 className="alert-title">{alert.title}</h6>
                    <span className="severity-badge">{getSeverityLabel(alert.severity)}</span>
                  </div>
                </div>

                <p className="alert-description">{alert.description}</p>

                <button className="alert-action-btn">
                  {alert.action}
                  <span className="arrow">→</span>
                </button>
              </Card.Body>
            </Card>
          ))}
        </div>

        <Card className="summary-box">
          <Card.Body>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-number">
                  {alerts.filter((a) => a.severity === 'critical').length}
                </span>
                <span className="stat-label">Critical</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {alerts.filter((a) => a.severity === 'warning').length}
                </span>
                <span className="stat-label">Warnings</span>
              </div>
              <div className="stat">
                <span className="stat-number">
                  {alerts.filter((a) => a.severity === 'info').length}
                </span>
                <span className="stat-label">Suggestions</span>
              </div>
            </div>

            <div className="action-summary">
              <h6 className="summary-title">Next Steps</h6>
              <ol className="action-list">
                <li>Follow up with 3 leads immediately (quick wins)</li>
                <li>Review and improve response time this week</li>
                <li>Send review requests to recent customers</li>
                <li>Set up call forwarding for after-hours calls</li>
              </ol>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ActionItems;
