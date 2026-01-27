import React from 'react';
import { Card } from 'react-bootstrap';
import './StatCard.css';
import { formatCurrency, formatPercent } from '../utils/calculations';

const StatCard = ({ title, value, unit = '', icon: Icon = null, subtext = '', onClick = null }) => {
  return (
    <Card className="stat-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <Card.Body className="stat-card-body">
        <div className="stat-content">
          <div className="stat-text">
            <div className="stat-title">{title}</div>
            <div className="stat-value">
              {typeof value === 'number' && title.includes('$') 
                ? formatCurrency(value)
                : typeof value === 'number' && unit === '%'
                ? formatPercent(value)
                : value}
              {unit && !title.includes('$') && <span className="stat-unit">{unit}</span>}
            </div>
            {subtext && <div className="stat-subtext">{subtext}</div>}
          </div>
          {Icon && <div className="stat-icon"><Icon size={32} /></div>}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;
