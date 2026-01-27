import React from 'react';
import { Card, Container } from 'react-bootstrap';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import './LeadSourceChart.css';

const LeadSourceChart = ({ sources = [] }) => {
  const COLORS = ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'];

  return (
    <div className="lead-source-section">
      <Container fluid>
        <h3 className="section-subtitle">Lead Source Breakdown</h3>

        <div className="sources-container">
          <Card className="chart-card pie-card">
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ source, value }) => `${source}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="leads"
                  >
                    {sources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>

          <div className="sources-details">
            <h6 className="details-title">Conversion Rates by Source</h6>
            <div className="sources-list">
              {sources.map((source, idx) => (
                <div key={source.source} className="source-item">
                  <div className="source-header">
                    <div className="source-info">
                      <span
                        className="source-color"
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                      ></span>
                      <div className="source-text">
                        <span className="source-name">{source.source}</span>
                        <span className="source-count">{source.leads} leads</span>
                      </div>
                    </div>
                    <span className="source-conversion">{source.conversion}%</span>
                  </div>
                  <div className="conversion-bar">
                    <div
                      className="conversion-fill"
                      style={{
                        width: `${source.conversion}%`,
                        backgroundColor: COLORS[idx % COLORS.length],
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="insights-card">
          <Card.Body>
            <h6 className="chart-title">Source Performance Insights</h6>
            <ul className="insights-list">
              <li>
                <strong>Best Performer:</strong> Referrals (94% conversion) - encourage happy
                customers to refer friends
              </li>
              <li>
                <strong>Largest Volume:</strong> Google Search (45 leads) - maintain SEO and
                local search visibility
              </li>
              <li>
                <strong>Opportunity:</strong> Social Media (50% conversion) - consider boosting
                engagement and targeting
              </li>
              <li>
                <strong>Improvement Area:</strong> Website Direct (68% conversion) - improve site
                CTA and lead form
              </li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LeadSourceChart;
