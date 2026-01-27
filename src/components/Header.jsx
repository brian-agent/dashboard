import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Phone, Users, CheckCircle2 } from 'lucide-react';
import StatCard from './StatCard';
import './Header.css';

const Header = ({ businessName, currentMonth, stats }) => {
  return (
    <div className="header-section">
      <Container fluid>
        <div className="header-content">
          <div className="business-info">
            <h1 className="business-name">{businessName}</h1>
            <p className="current-month">{currentMonth}</p>
          </div>
          <div className="refresh-info">
            <small>Last updated: Just now</small>
          </div>
        </div>

        <Row className="stat-cards-row g-3 mt-2">
          <Col xs={12} sm={6} lg={3}>
            <StatCard 
              title="Total Calls"
              value={stats.totalCalls}
              icon={Phone}
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <StatCard 
              title="Calls Answered"
              value={stats.callsAnswered}
              icon={CheckCircle2}
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <StatCard 
              title="Calls Missed"
              value={stats.callsMissed}
              icon={Users}
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <StatCard 
              title="Pickup Rate"
              value={stats.captureRate}
              unit="%"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
