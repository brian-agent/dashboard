import React from 'react';
import { Card, Container } from 'react-bootstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChart, Bar } from 'recharts';
import './PerformanceChart.css';

const PerformanceChart = ({ data, monthlyComparison }) => {
  return (
    <div className="performance-section">
      <Container fluid>
        <h3 className="section-subtitle">6-Month Performance Trends</h3>

        <div className="charts-container">
          <Card className="chart-card">
            <Card.Body>
              <h6 className="chart-title">Leads Captured</h6>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="leadsCapture"
                    stroke="#1e3a8a"
                    strokeWidth={3}
                    dot={{ fill: '#1e3a8a', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="chart-insight">
                ↑ <strong>+82%</strong> leads captured over 6 months
              </p>
            </Card.Body>
          </Card>

          <Card className="chart-card">
            <Card.Body>
              <h6 className="chart-title">Response Time (minutes)</h6>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="chart-insight">
                ↓ Response time improved to <strong>11 minutes</strong> average
              </p>
            </Card.Body>
          </Card>

          <Card className="chart-card">
            <Card.Body>
              <h6 className="chart-title">Review Count Growth</h6>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="reviews" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <p className="chart-insight">
                ↑ <strong>+192%</strong> reviews added in past 6 months
              </p>
            </Card.Body>
          </Card>
        </div>

        <Card className="comparison-card">
          <Card.Body>
            <h6 className="chart-title">Month-over-Month Comparison</h6>
            <div className="comparison-content">
              <div className="comparison-item">
                <span className="comparison-label">Last Month</span>
                <span className="comparison-value">{monthlyComparison.lastMonth} leads</span>
              </div>
              <div className="comparison-arrow">→</div>
              <div className="comparison-item highlight">
                <span className="comparison-label">This Month</span>
                <span className="comparison-value">{monthlyComparison.thisMonth} leads</span>
              </div>
              <div className="comparison-change">
                <span className="change-badge">
                  +{monthlyComparison.change.toFixed(1)}%
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PerformanceChart;
