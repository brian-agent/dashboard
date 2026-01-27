import React from 'react';
import { Card, Container, Badge } from 'react-bootstrap';
import { TrendingUp, Lock } from 'lucide-react';
import './TierIndicator.css';

const TierIndicator = ({ tierData }) => {
  return (
    <div className="tier-section">
      <Container fluid>
        <Card className="tier-card">
          <Card.Body>
            <div className="tier-content">
              <div className="tier-info">
                <div className="tier-badge">
                  <Lock size={24} />
                  <span>{tierData.currentTier}</span>
                </div>

                <div className="tier-details">
                  <h6 className="tier-title">
                    Protection Tier
                    <Badge bg="success" className="tier-tag">Active</Badge>
                  </h6>
                  <p className="tier-description">
                    Your current subscription protects you from revenue leaks with
                    comprehensive call tracking and lead management.
                  </p>

                  <div className="features-list">
                    <h6 className="features-title">Active Features</h6>
                    <ul className="features">
                      {tierData.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className="check">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="tier-pricing">
                <div className="price-box">
                  <span className="price-label">Monthly</span>
                  <span className="price-amount">${tierData.monthlyPrice}</span>
                  <span className="price-unit">/month</span>
                </div>

                {tierData.availableUpgrades && tierData.availableUpgrades.length > 0 && (
                  <div className="upgrade-section">
                    <h6 className="upgrade-title">Upgrade Available</h6>
                    {tierData.availableUpgrades.map((upgrade, idx) => (
                      <div key={idx} className="upgrade-option">
                        <div className="upgrade-header">
                          <span className="upgrade-name">{upgrade.tier}</span>
                          <span className="upgrade-price">${upgrade.price}/mo</span>
                        </div>
                        <ul className="upgrade-features">
                          {upgrade.features.map((feature, fIdx) => (
                            <li key={fIdx}>
                              <span className="plus">+</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button className="btn-upgrade">Learn More</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="value-proposition">
              <h6 className="prop-title">
                <TrendingUp size={20} />
                Your Monthly Protection Value
              </h6>
              <div className="prop-stats">
                <div className="prop-stat">
                  <span className="prop-value">$99,600</span>
                  <span className="prop-label">Revenue Leak Prevented</span>
                </div>
                <div className="prop-stat">
                  <span className="prop-value">11 min</span>
                  <span className="prop-label">Avg Response Time</span>
                </div>
                <div className="prop-stat">
                  <span className="prop-value">83.1%</span>
                  <span className="prop-label">Lead Capture Rate</span>
                </div>
              </div>
              <p className="prop-cta">
                Your Protection tier is saving you <strong>$99,600 per month</strong>. Consider upgrading to Intelligence tier for predictive insights.
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default TierIndicator;
