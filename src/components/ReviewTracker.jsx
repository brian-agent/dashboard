import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Star, Send, MessageCircle } from 'lucide-react';
import { formatPercent } from '../utils/calculations';
import './ReviewTracker.css';

const ReviewTracker = ({ reviewData = {} }) => {
  const progressPercent = (reviewData.current / reviewData.monthlyGoal) * 100;

  return (
    <div className="review-tracker-section">
      <Container fluid>
        <h3 className="section-subtitle">Google Reviews (Customer Trust)</h3>

        <div className="review-grid">
          <Card className="review-stat-card">
            <Card.Body>
              <div className="stat-header">
                <div className="stat-icon" style={{ color: '#fbbf24' }}>
                  <Star size={24} fill="#fbbf24" />
                </div>
                <h6 className="stat-title">Current Reviews</h6>
              </div>
              <div className="stat-large">{reviewData.current}</div>
              <p className="stat-detail">
                +{reviewData.newThisMonth} this month
              </p>
            </Card.Body>
          </Card>

          <Card className="review-stat-card">
            <Card.Body>
              <div className="stat-header">
                <div className="stat-icon" style={{ color: '#3b82f6' }}>
                  <Send size={24} />
                </div>
                <h6 className="stat-title">Asked to Leave Reviews</h6>
              </div>
              <div className="stat-large">{reviewData.requestsSent}</div>
              <p className="stat-detail">
                {reviewData.responseRate}% response rate
              </p>
            </Card.Body>
          </Card>

          <Card className="review-stat-card">
            <Card.Body>
              <div className="stat-header">
                <div className="stat-icon" style={{ color: '#10b981' }}>
                  <MessageCircle size={24} />
                </div>
                <h6 className="stat-title">Monthly Goal</h6>
              </div>
              <div className="goal-progress">
                <div className="progress-bar-wrapper">
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="goal-text">
                  <strong>{reviewData.current}</strong>/{reviewData.monthlyGoal}
                </div>
              </div>
              <p className="stat-detail">
                {(100 - progressPercent).toFixed(0)}% away from goal
              </p>
            </Card.Body>
          </Card>
        </div>

        <Card className="review-insights-card">
          <Card.Body>
            <h6 className="chart-title">How to Get More Reviews</h6>
            <div className="strategy-content">
              <div className="strategy-item">
                <div className="strategy-step">1</div>
                <div className="strategy-info">
                  <h6 className="strategy-title">Send Requests</h6>
                  <p className="strategy-detail">
                    Follow up with customers within 48 hours of completing work
                  </p>
                </div>
              </div>

              <div className="strategy-item">
                <div className="strategy-step">2</div>
                <div className="strategy-info">
                  <h6 className="strategy-title">Make it Easy</h6>
                  <p className="strategy-detail">
                    Use direct links to Google, Yelp, and Facebook for quick reviews
                  </p>
                </div>
              </div>

              <div className="strategy-item">
                <div className="strategy-step">3</div>
                <div className="strategy-info">
                  <h6 className="strategy-title">Respond & Engage</h6>
                  <p className="strategy-detail">
                    Thank reviewers and address any concerns professionally
                  </p>
                </div>
              </div>
            </div>

            <div className="goal-impact">
              <h6 className="impact-title">Impact of Reviews</h6>
              <ul className="impact-list">
                <li>
                  <span className="impact-stat">38 reviews</span> = More visibility in local search
                </li>
                <li>
                  <span className="impact-stat">4.8 rating</span> = Higher call volume from
                  prospects
                </li>
                <li>
                  <span className="impact-stat">50+ goal</span> = Competitive advantage in your
                  area
                </li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ReviewTracker;
