import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';
import './WeeklySummary.css';

const WeeklySummary = ({ summaryCards = [] }) => {
  const getIcon = (iconName) => {
    const icons = {
      Phone: '☎️',
      TrendingUp: '📈',
      Star: '⭐',
      DollarSign: '💰',
    };
    return icons[iconName] || '→';
  };

  return (
    <div className="weekly-summary-section">
      <Container fluid>
        <h3 className="section-subtitle">This Week vs Last Week</h3>

        <div className="summary-cards-grid">
          {summaryCards.map((card, idx) => {
            const isPositive = card.change > 0;
            const isCurrency = card.label.includes('Revenue');

            return (
              <Card key={idx} className="summary-card">
                <Card.Body>
                  <div className="summary-header">
                    <span className="summary-icon">{getIcon(card.icon)}</span>
                    <h6 className="summary-label">{card.label}</h6>
                  </div>

                  <div className="summary-values">
                    <div className="value-section">
                      <span className="value-label">This Week</span>
                      <span className="value-amount">
                        {isCurrency ? formatCurrency(card.thisWeek) : card.thisWeek}
                      </span>
                    </div>

                    <div className="value-divider">vs</div>

                    <div className="value-section">
                      <span className="value-label">Last Week</span>
                      <span className="value-amount">
                        {isCurrency ? formatCurrency(card.lastWeek) : card.lastWeek}
                      </span>
                    </div>
                  </div>

                  <div className={`summary-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                    <span>
                      {isPositive ? '+' : '-'}
                      {Math.abs(card.change).toFixed(1)}%
                    </span>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default WeeklySummary;
