import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { TrendingUp, Target, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/calculations';
import './ProjectionView.css';

const ProjectionView = ({ clientData = {} }) => {
  const [showProjection, setShowProjection] = useState(false);

  // Extract current metrics from clientData
  const current = {
    calls: clientData.headerStats?.totalCalls || 142,
    answered: clientData.headerStats?.callsAnswered || 118,
    captureRate: clientData.headerStats?.captureRate || 83.1,
    reviews: clientData.reviews?.current || 38,
    responseTime: clientData.responseTime?.phoneCalls?.average || 11,
    totalLeak: clientData.totalRevenueLeak || 99600,
    hasWebsite: clientData.hasWebsite !== false, // default true unless explicitly false
  };

  // Calculate projections if client takes recommended actions
  const projections = {
    // If they answer missed calls (reduce missed by 30%)
    improvedAnswerRate: {
      captured: Math.round(current.answered * 1.15),
      improved: Math.round(current.answered * 0.15),
      revenue: Math.round(current.answered * 0.15 * 1200 * 0.535) // assuming $1200 avg job, 53.5% close rate
    },
    // If they improve response time by 50%
    fasterResponse: {
      responseTime: Math.round(current.responseTime * 0.5),
      conversionLift: 0.12, // 12% conversion uplift
      revenue: Math.round(current.calls * 0.535 * 1200 * 0.12)
    },
    // If they get more reviews
    moreReviews: {
      target: 50,
      needed: Math.max(0, 50 - current.reviews),
      conversionLift: 0.24, // 24% lead growth from better ranking
      revenue: Math.round(current.calls * 0.24 * 1200 * 0.535)
    },
    // If they improve website conversion (only if they have a website)
    betterWebsite: current.hasWebsite ? {
      current: 0.08,
      improved: 0.12,
      uplift: 0.04,
      revenue: Math.round(current.calls * 0.22 * (0.12 - 0.08) * 1200)
    } : null,
    // Combined impact if all actions taken
    combined: {
      captureRateImproved: Math.min(95, current.captureRate + 8),
      reviewsImproved: 50,
      responseTimeImproved: Math.round(current.responseTime * 0.4),
      leaksReduced: Math.round(current.totalLeak * 0.6),
      monthlyRevenueLift: 0,
    }
  };

  // Calculate combined revenue impact - only include website if they have one
  projections.combined.monthlyRevenueLift = 
    projections.improvedAnswerRate.revenue +
    projections.fasterResponse.revenue +
    projections.moreReviews.revenue +
    (projections.betterWebsite?.revenue || 0);

  const currentMonthlyRevenue = current.calls * 0.535 * 1200; // estimate

  return (
    <div className="projection-section">
      <Container fluid>
        <Card className="projection-card">
          <Card.Body>
            <div className="projection-header">
              <div>
                <h2 className="projection-title">
                  <Target size={32} className="title-icon" />
                  What If You Take Action?
                </h2>
                <p className="projection-subtitle">
                  See what your metrics could look like if you implement the recommended actions
                </p>
              </div>
              <Button
                variant={showProjection ? 'outline-primary' : 'primary'}
                onClick={() => setShowProjection(!showProjection)}
                className="toggle-btn"
              >
                <TrendingUp size={18} />
                {showProjection ? 'Hide Projections' : 'Show Projections'}
              </Button>
            </div>

            {showProjection && (
              <div className="projection-content">
                <Row className="projection-grid">
                  {/* Answer More Calls */}
                  <Col lg={6} className="mb-4">
                    <Card className="action-projection">
                      <Card.Body>
                        <h6 className="action-title">
                          <CheckCircle2 size={20} />
                          Answer Missed Calls Better
                        </h6>
                        <div className="action-current">
                          <span className="label">Currently answering:</span>
                          <span className="value">{current.answered} calls</span>
                        </div>
                        <div className="action-projected">
                          <span className="label">If you pick up 15% more:</span>
                          <span className="value highlight">{projections.improvedAnswerRate.captured} calls</span>
                        </div>
                        <div className="action-impact">
                          <Badge bg="success" className="impact-badge">
                            +{formatCurrency(projections.improvedAnswerRate.revenue)}/month
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Faster Response */}
                  <Col lg={6} className="mb-4">
                    <Card className="action-projection">
                      <Card.Body>
                        <h6 className="action-title">
                          <CheckCircle2 size={20} />
                          Respond Faster to Inquiries
                        </h6>
                        <div className="action-current">
                          <span className="label">Currently:</span>
                          <span className="value">{current.responseTime} min average</span>
                        </div>
                        <div className="action-projected">
                          <span className="label">If you cut response time in half:</span>
                          <span className="value highlight">{projections.fasterResponse.responseTime} min</span>
                        </div>
                        <div className="action-impact">
                          <Badge bg="success" className="impact-badge">
                            +{formatCurrency(projections.fasterResponse.revenue)}/month
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Get More Reviews */}
                  <Col lg={6} className="mb-4">
                    <Card className="action-projection">
                      <Card.Body>
                        <h6 className="action-title">
                          <CheckCircle2 size={20} />
                          Build Your Reputation
                        </h6>
                        <div className="action-current">
                          <span className="label">Currently have:</span>
                          <span className="value">{current.reviews} reviews</span>
                        </div>
                        <div className="action-projected">
                          <span className="label">If you reach your goal:</span>
                          <span className="value highlight">{projections.moreReviews.target} reviews</span>
                        </div>
                        <div className="action-impact">
                          <Badge bg="success" className="impact-badge">
                            +{formatCurrency(projections.moreReviews.revenue)}/month
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Better Website - Only show if they have a website */}
                  {current.hasWebsite && (
                  <Col lg={6} className="mb-4">
                    <Card className="action-projection">
                      <Card.Body>
                        <h6 className="action-title">
                          <CheckCircle2 size={20} />
                          Improve Website Conversion
                        </h6>
                        <div className="action-current">
                          <span className="label">Currently converting:</span>
                          <span className="value">{formatPercent(projections.betterWebsite.current * 100)}</span>
                        </div>
                        <div className="action-projected">
                          <span className="label">If you optimize CTA buttons:</span>
                          <span className="value highlight">{formatPercent(projections.betterWebsite.improved * 100)}</span>
                        </div>
                        <div className="action-impact">
                          <Badge bg="success" className="impact-badge">
                            +{formatCurrency(projections.betterWebsite.revenue)}/month
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  )}
                </Row>

                {/* Combined Impact Summary */}
                <Card className="combined-impact-card">
                  <Card.Body>
                    <div className="combined-header">
                      <h5 className="combined-title">If You Take All These Actions...</h5>
                    </div>
                    <Row className="combined-metrics">
                      <Col md={4} className="metric-item">
                        <div className="metric-box">
                          <span className="metric-label">Monthly Revenue Lift</span>
                          <span className="metric-value">{formatCurrency(projections.combined.monthlyRevenueLift)}</span>
                          <span className="metric-note">
                            {((projections.combined.monthlyRevenueLift / currentMonthlyRevenue) * 100).toFixed(0)}% increase
                          </span>
                        </div>
                      </Col>
                      <Col md={4} className="metric-item">
                        <div className="metric-box">
                          <span className="metric-label">Annual Revenue Lift</span>
                          <span className="metric-value">{formatCurrency(projections.combined.monthlyRevenueLift * 12)}</span>
                          <span className="metric-note">That's serious money!</span>
                        </div>
                      </Col>
                      <Col md={4} className="metric-item">
                        <div className="metric-box">
                          <span className="metric-label">Leak Reduction</span>
                          <span className="metric-value">{formatCurrency(projections.combined.leaksReduced)}</span>
                          <span className="metric-note">Monthly opportunities recovered</span>
                        </div>
                      </Col>
                    </Row>
                    <div className="combined-cta">
                      <p>
                        <strong>Start with:</strong> The top 3 actions above that give you the biggest bang for your buck. 
                        Quick wins = faster results.
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ProjectionView;
