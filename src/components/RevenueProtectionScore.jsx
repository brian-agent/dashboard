import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Gauge } from 'lucide-react';
import './RevenueProtectionScore.css';

const RevenueProtectionScore = ({ leakItems = [], totalRevenue = 0 }) => {
  // Calculate protection score (0-100)
  // Based on: low leaks (good), improving trends, fewer critical issues
  
  let score = 100;
  
  // Deduct for high revenue leaks
  const maxLeak = 99600; // From mock data
  const leakPenalty = (totalRevenue / maxLeak) * 40; // Up to 40 points
  score -= leakPenalty;
  
  // Deduct for critical issues
  const criticalCount = leakItems && Array.isArray(leakItems) ? leakItems.filter(l => l.status === 'critical').length : 0;
  score -= criticalCount * 5;
  
  // Add points for improvements
  const improvingCount = leakItems && Array.isArray(leakItems) ? leakItems.filter(l => l.trend === 'improving').length : 0;
  score += improvingCount * 2;
  
  // Ensure score is 0-100
  score = Math.max(0, Math.min(100, score));

  const getScoreColor = () => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Strong Protection';
    if (score >= 60) return 'Good Coverage';
    return 'Needs Attention';
  };

  return (
    <div className="revenue-score-section">
      <Container fluid>
        <Card className="score-card">
          <Card.Body>
            <div className="score-container">
              <div className="score-gauge">
                <div className="gauge-outer">
                  <div
                    className="gauge-inner"
                    style={{
                      background: `conic-gradient(${getScoreColor()} 0deg ${(score / 100) * 360}deg, #e5e7eb ${(score / 100) * 360}deg)`
                    }}
                  >
                    <div className="gauge-center">
                      <span className="score-number">{Math.round(score)}</span>
                      <span className="score-label">Score</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="score-details">
                <h6 className="score-title">Revenue Protection Score</h6>
                <p className="score-status" style={{ color: getScoreColor() }}>
                  {getScoreLabel()}
                </p>

                <div className="score-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">Leak Severity</span>
                    <span className="breakdown-value">-{leakPenalty.toFixed(0)} pts</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">Critical Issues</span>
                    <span className="breakdown-value">-{criticalCount * 5} pts</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">Improvements</span>
                    <span className="breakdown-value">+{improvingCount * 2} pts</span>
                  </div>
                </div>

                <p className="score-message">
                  {score >= 80 && "Excellent work! Your revenue protection is strong."}
                  {score >= 60 && score < 80 && "Good progress. Continue focusing on the top leaks."}
                  {score < 60 && "Significant opportunities to improve. Check recommended actions below."}
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RevenueProtectionScore;
