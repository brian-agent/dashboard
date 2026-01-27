import React from 'react';
import { Card, Container } from 'react-bootstrap';
import {
  Funnel,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { BarChart, Bar } from 'recharts';
import { formatPercent } from '../utils/calculations';
import './ConversionFunnel.css';

const ConversionFunnel = ({ funnelData = [] }) => {
  const FUNNEL_COLORS = ['#1e3a8a', '#2563eb', '#3b82f6', '#10b981'];

  // Calculate conversion rates between stages
  const conversionRates = [];
  for (let i = 1; i < funnelData.length; i++) {
    const rate = (funnelData[i].count / funnelData[i - 1].count) * 100;
    conversionRates.push(rate);
  }

  return (
    <div className="conversion-funnel-section">
      <Container fluid>
        <h3 className="section-subtitle">How Jobs Get Booked</h3>

        <div className="funnel-container">
          <Card className="funnel-card">
            <Card.Body>
              <div className="funnel-chart">
                {funnelData.map((stage, idx) => (
                  <div key={idx} className="funnel-stage">
                    <div
                      className="stage-bar"
                      style={{
                        width: `${stage.conversion}%`,
                        backgroundColor: FUNNEL_COLORS[idx],
                      }}
                    >
                      <div className="stage-content">
                        <span className="stage-name">{stage.stage}</span>
                        <span className="stage-count">{stage.count}</span>
                      </div>
                    </div>
                    {idx < funnelData.length - 1 && (
                      <div className="funnel-drop">
                        ↓ {formatPercent(conversionRates[idx])} conversion
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="funnel-metrics-card">
            <Card.Body>
              <h6 className="chart-title">Stage Performance</h6>
              <div className="metrics-breakdown">
                {funnelData.map((stage, idx) => (
                  <div key={idx} className="breakdown-item">
                    <div className="item-left">
                      <div
                        className="color-dot"
                        style={{ backgroundColor: FUNNEL_COLORS[idx] }}
                      ></div>
                      <div>
                        <span className="item-stage">{stage.stage}</span>
                        <span className="item-metric">{stage.count} leads</span>
                      </div>
                    </div>
                    <span className="item-percent">{formatPercent(stage.conversion)}</span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>

        <Card className="funnel-insights-card">
          <Card.Body>
<h6 className="chart-title">Your Booking Performance</h6>
            <ul className="analysis-list">
              <li>
                <strong>Calls to Real Leads:</strong> 83.1% - Great job filtering out spam
              </li>
              <li>
                <strong>Leads to Quotes:</strong> 79.7% - Good follow-up rate
              </li>
              <li>
                <strong>Quotes to Booked Jobs:</strong> 80.9% - Excellent! Customers trust you
              </li>
              <li>
                <strong>Overall:</strong> 53.5% of calls become actual jobs booked
              </li>
            </ul>

            <div className="optimization-box">
              <h6 className="optimization-title">Optimization Opportunities</h6>
              <ul className="optimization-list">
                <li>
                  <span className="opp-num">1</span>
                  <span>Add chat support to capture more inquiries early</span>
                </li>
                <li>
                  <span className="opp-num">2</span>
                  <span>Follow up with unquoted leads within 2 hours</span>
                </li>
                <li>
                  <span className="opp-num">3</span>
                  <span>Send quotes within 4 hours of inquiry</span>
                </li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ConversionFunnel;
