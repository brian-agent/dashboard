import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Clock, MessageSquare, Mail, Moon } from 'lucide-react';
import { formatTime, getResponseTimeColor, getResponseTimeStatus } from '../utils/calculations';
import './ResponseTimeMetrics.css';

const ResponseTimeMetrics = ({ responseTimeData }) => {
  const getStatusLabel = (status) => {
    const labels = {
      good: 'Excellent',
      warning: 'Needs Improvement',
      critical: 'Critical',
    };
    return labels[status];
  };

  const metrics = [
    {
      label: 'Phone Calls',
      minutes: responseTimeData.phoneCalls.average,
      icon: Clock,
      description: 'Average time to answer',
    },
    {
      label: 'Text Messages',
      minutes: responseTimeData.textMessages.average,
      icon: MessageSquare,
      description: 'Average time to respond',
    },
    {
      label: 'Contact Forms',
      minutes: responseTimeData.contactForms.average,
      icon: Mail,
      description: 'Average time to reply',
    },
    {
      label: 'After-Hours Inquiries',
      minutes: responseTimeData.afterHours.average,
      icon: Moon,
      description: 'No direct response available',
    },
  ];

  return (
    <div className="response-time-section">
      <Container fluid>
        <h3 className="section-subtitle">Response Time Analysis</h3>

        <div className="metrics-grid">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const status = getResponseTimeStatus(metric.minutes);
            const statusLabel = getStatusLabel(status);

            return (
              <Card key={idx} className={`metric-card metric-${status}`}>
                <Card.Body>
                  <div className="metric-content">
                    <div className="metric-icon-wrapper">
                      <Icon size={32} color={getResponseTimeColor(metric.minutes)} />
                    </div>
                    <div className="metric-info">
                      <h6 className="metric-label">{metric.label}</h6>
                      <p className="metric-description">{metric.description}</p>
                    </div>
                  </div>

                  <div className="metric-main">
                    <div className="time-display">
                      <span className="time-value">{formatTime(metric.minutes)}</span>
                    </div>
                    <span className={`status-badge status-${status}`}>{statusLabel}</span>
                  </div>

                  <div className="target-indicator">
                    {status === 'good' && (
                      <span className="target-text">
                        <strong>✓</strong> Target achieved (under 5 min)
                      </span>
                    )}
                    {status === 'warning' && (
                      <span className="target-text">
                        <strong>⚠</strong> Target is 5-30 min
                      </span>
                    )}
                    {status === 'critical' && (
                      <span className="target-text">
                        <strong>✕</strong> Needs immediate attention
                      </span>
                    )}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>

        <Card className="response-summary-card">
          <Card.Body>
            <h6 className="chart-title">Response Time Recommendations</h6>
            <ul className="recommendations-list">
              <li>
                <strong>Phone Calls (3 min):</strong> Excellent! You're answering quickly and
                capturing hot leads.
              </li>
              <li>
                <strong>Text Messages (8 min):</strong> Good, but consider faster automation for
                appointments.
              </li>
              <li>
                <strong>Contact Forms (45 min):</strong> Opportunity - follow up within 15 min to
                improve conversions.
              </li>
              <li>
                <strong>After-Hours (480 min):</strong> Set up call forwarding or voicemail to
                capture after-hours leads.
              </li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResponseTimeMetrics;
