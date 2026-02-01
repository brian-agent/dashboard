import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Tabs, Tab, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './ClientDataForm.css';

const ClientDataForm = ({ onLoad }) => {
  const [formMode, setFormMode] = useState('smart');
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState(null);
  
  // Enhanced diagnostic form with ranges and call types
  const [smart, setSmart] = useState({
    businessName: 'My Service Business',
    currentMonth: 'January 2026',
    totalCalls: 142,
    callsAnswered: 118,
    avgJobValue: 1200,
    closeRate: 53.5,
    currentReviews: 38,
    reviewGoal: 50,
    avgResponseTime: 11,
    // NEW: Call diagnosis
    afterHoursCalls: 18,
    afterHoursPickupRate: 10, // what % do they pick up
    onJobCalls: 24, // missed calls while on jobs
    onJobPickupRate: 30, // what % do they pick up
    followUpRate: 75, // true/false - do they follow up, percentage
    noFollowUpLeads: 8,
    hasWebsite: true, // NEW: Does the business have a website
  });

  // Calculate money lost based on ranges and call types
  const calculateMoneyLost = () => {
    const afterHoursLost = Math.round(smart.afterHoursCalls * (1 - smart.afterHoursPickupRate / 100) * smart.avgJobValue * (smart.closeRate / 100));
    const onJobLost = Math.round(smart.onJobCalls * (1 - smart.onJobPickupRate / 100) * smart.avgJobValue * (smart.closeRate / 100));
    const followUpLost = Math.round(smart.noFollowUpLeads * smart.avgJobValue * (smart.closeRate / 100) * (1 - smart.followUpRate / 100));
    
    return { afterHoursLost, onJobLost, followUpLost, total: afterHoursLost + onJobLost + followUpLost };
  };

  const moneyLost = calculateMoneyLost();

  const generateDataFromSmart = () => {
    const callsMissed = smart.totalCalls - smart.callsAnswered;
    const captureRate = (smart.callsAnswered / smart.totalCalls * 100).toFixed(1);
    
    // Calculate revenue leaks based on DIAGNOSTIC data
    const leakData = [
      {
        id: 'after-hours',
        name: 'After-Hours Inquiries',
        lostOpportunities: Math.round(smart.afterHoursCalls * (1 - smart.afterHoursPickupRate / 100)),
        estimatedRevenue: moneyLost.afterHoursLost,
        percentage: (moneyLost.afterHoursLost / (moneyLost.total || 1) * 100).toFixed(1),
        status: moneyLost.afterHoursLost > 5000 ? 'critical' : 'warning',
        trend: 'declining',
        trendPercent: -2.3,
        description: `${smart.afterHoursCalls} after-hours calls, picking up ${smart.afterHoursPickupRate}% of them`
      },
      {
        id: 'missed-calls',
        name: 'Missed Calls During Jobs',
        lostOpportunities: Math.round(smart.onJobCalls * (1 - smart.onJobPickupRate / 100)),
        estimatedRevenue: moneyLost.onJobLost,
        percentage: (moneyLost.onJobLost / (moneyLost.total || 1) * 100).toFixed(1),
        status: 'critical',
        trend: 'declining',
        trendPercent: 1.5,
        description: `${smart.onJobCalls} calls while on jobs, picking up ${smart.onJobPickupRate}% of them`
      },
      {
        id: 'no-followup',
        name: 'No Follow-Up',
        lostOpportunities: Math.round(smart.noFollowUpLeads * (1 - smart.followUpRate / 100)),
        estimatedRevenue: moneyLost.followUpLost,
        percentage: (moneyLost.followUpLost / (moneyLost.total || 1) * 100).toFixed(1),
        status: smart.followUpRate > 80 ? 'good' : 'warning',
        trend: smart.followUpRate > 80 ? 'improving' : 'declining',
        trendPercent: smart.followUpRate > 80 ? -3.2 : 2.1,
        description: `Following up ${smart.followUpRate}% of the time on ${smart.noFollowUpLeads} leads`
      },
      {
        id: 'slow-response',
        name: 'Slow Response Time',
        lostOpportunities: Math.round(smart.callsAnswered * 0.08),
        estimatedRevenue: Math.round((smart.callsAnswered * 0.08) * smart.avgJobValue * (smart.closeRate / 100)),
        percentage: 8.5,
        status: smart.avgResponseTime > 15 ? 'critical' : 'warning',
        trend: 'stable',
        trendPercent: 0.2,
        description: `Average ${smart.avgResponseTime} minute response time`
      },
      {
        id: 'website-conversion',
        name: smart.hasWebsite ? 'Poor Website Conversion' : 'No Website - Missing Lead Source',
        lostOpportunities: Math.round(smart.callsAnswered * (smart.hasWebsite ? 0.1 : 0.25)),
        estimatedRevenue: Math.round((smart.callsAnswered * (smart.hasWebsite ? 0.1 : 0.25)) * smart.avgJobValue * (smart.closeRate / 100)),
        percentage: smart.hasWebsite ? 10.6 : 22,
        status: smart.hasWebsite ? 'warning' : 'critical',
        trend: 'declining',
        trendPercent: smart.hasWebsite ? -1.1 : -5.2,
        description: smart.hasWebsite ? 'Website visitors not converting to calls' : 'Not having a website means you are missing 20-30% of potential leads',
      },
      {
        id: 'review-gap',
        name: 'Review Gap Impact',
        lostOpportunities: Math.round((smart.reviewGoal - smart.currentReviews) * 0.3),
        estimatedRevenue: Math.round(((smart.reviewGoal - smart.currentReviews) * 0.3) * smart.avgJobValue * (smart.closeRate / 100)),
        percentage: 4.2,
        status: 'good',
        trend: 'improving',
        trendPercent: -4.5,
        description: `${smart.reviewGoal - smart.currentReviews} reviews short of goal`
      },
      {
        id: 'unqualified',
        name: 'Unqualified Leads',
        lostOpportunities: Math.round(smart.callsAnswered * 0.15),
        estimatedRevenue: 0,
        percentage: 15.5,
        status: 'warning',
        trend: 'stable',
        trendPercent: 0.1,
        description: 'Time wasted on non-qualified leads'
      }
    ];

    const totalRevenueLeak = moneyLost.total || leakData.reduce((sum, l) => sum + l.estimatedRevenue, 0);

    const jobsBooked = Math.round(smart.callsAnswered * (smart.closeRate / 100));

    return {
      businessName: smart.businessName,
      currentMonth: smart.currentMonth,
      headerStats: {
        totalCalls: smart.totalCalls,
        callsAnswered: smart.callsAnswered,
        callsMissed: callsMissed,
        captureRate: parseFloat(captureRate),
      },
      revenueLeak: leakData,
      totalRevenueLeak,
      monthlyPerformance: [
        { month: 'Aug', leadsCapture: Math.round(smart.totalCalls * 0.55), responseTime: 18, reviews: Math.round(smart.currentReviews * 0.34) },
        { month: 'Sep', leadsCapture: Math.round(smart.totalCalls * 0.65), responseTime: 16, reviews: Math.round(smart.currentReviews * 0.43) },
        { month: 'Oct', leadsCapture: Math.round(smart.totalCalls * 0.74), responseTime: 14, reviews: Math.round(smart.currentReviews * 0.54) },
        { month: 'Nov', leadsCapture: Math.round(smart.totalCalls * 0.83), responseTime: 12, reviews: Math.round(smart.currentReviews * 0.8) },
        { month: 'Dec', leadsCapture: Math.round(smart.totalCalls * 0.88), responseTime: 12, reviews: Math.round(smart.currentReviews * 0.92) },
        { month: 'Jan', leadsCapture: smart.totalCalls, responseTime: smart.avgResponseTime, reviews: smart.currentReviews }
      ],
      monthlyComparison: {
        thisMonth: smart.totalCalls,
        lastMonth: Math.round(smart.totalCalls * 0.88),
        change: 13.6
      },
      leadSources: [
        { source: 'Google Search', leads: Math.round(smart.callsAnswered * 0.38), conversion: 76 },
        { source: 'Google Maps', leads: Math.round(smart.callsAnswered * 0.32), conversion: 82 },
        { source: 'Website Direct', leads: Math.round(smart.callsAnswered * 0.24), conversion: 68 },
        { source: 'Referrals', leads: Math.round(smart.callsAnswered * 0.15), conversion: 94 },
        { source: 'Social Media', leads: Math.round(smart.callsAnswered * 0.07), conversion: 50 },
        { source: 'Other', leads: Math.round(smart.callsAnswered * 0.04), conversion: 60 }
      ],
      responseTime: {
        phoneCalls: { average: 3, status: 'good' },
        textMessages: { average: 8, status: 'good' },
        contactForms: { average: 45, status: 'warning' },
        afterHours: { average: 480, status: 'critical' },
      },
      reviews: {
        current: smart.currentReviews,
        newThisMonth: Math.round(smart.currentReviews * 0.21),
        requestsSent: Math.round(smart.currentReviews * 0.63),
        responseRate: 33,
        monthlyGoal: smart.reviewGoal,
        trend: 'improving'
      },
      conversionFunnel: [
        { stage: 'Total Inquiries', count: smart.callsAnswered, conversion: 100 },
        { stage: 'Qualified Leads', count: Math.round(smart.callsAnswered * 0.83), conversion: 83.1 },
        { stage: 'Quotes Sent', count: Math.round(smart.callsAnswered * 0.66), conversion: 79.7 },
        { stage: 'Jobs Booked', count: jobsBooked, conversion: 80.9 }
      ],
      weeklySummary: [
        {
          label: 'Calls This Week',
          thisWeek: Math.round(smart.totalCalls / 4),
          lastWeek: Math.round((smart.totalCalls / 4) * 0.8),
          change: 25,
          icon: 'Phone'
        },
        {
          label: 'Customers We Reached',
          thisWeek: Math.round(smart.callsAnswered / 4),
          lastWeek: Math.round((smart.callsAnswered / 4) * 0.83),
          change: 20.8,
          icon: 'TrendingUp'
        },
        {
          label: 'New Google Reviews',
          thisWeek: Math.round(smart.currentReviews * 0.08),
          lastWeek: Math.round(smart.currentReviews * 0.03),
          change: 200,
          icon: 'Star'
        },
        {
          label: 'Money Protected This Week',
          thisWeek: Math.round(totalRevenueLeak / 4),
          lastWeek: Math.round((totalRevenueLeak / 4) * 0.82),
          change: 22.5,
          icon: 'DollarSign'
        }
      ],
      actionItems: [
        {
          id: 'alert-1',
          title: `${callsMissed} customers are waiting for your call`,
          description: 'They called but you missed it - quick callbacks could turn them into jobs',
          severity: 'critical',
          action: 'Call Them Now'
        },
        {
          id: 'alert-2',
          title: `You are answering slower this week (${smart.avgResponseTime} min avg)`,
          description: 'Try to pick up phones faster - it is costing you jobs',
          severity: 'warning',
          action: 'Review'
        },
        {
          id: 'alert-3',
          title: `${smart.reviewGoal - smart.currentReviews} more reviews needed to hit your goal`,
          description: 'Send Google review requests to recent customers - takes 1 minute each',
          severity: 'info',
          action: 'Send Now'
        },
        {
          id: 'alert-4',
          title: 'Evening calls are missing - set up call forwarding',
          description: 'After-hours calls are going unanswered and costing revenue',
          severity: 'warning',
          action: 'Setup'
        }
      ],
      tierStatus: {
        currentTier: 'Protection',
        monthlyPrice: 99,
        features: [
          '24/7 Call Capture',
          'SMS Tracking',
          'Lead Follow-up Alerts',
          'Basic Analytics'
        ],
        availableUpgrades: [
          {
            tier: 'Intelligence',
            features: ['+ Lead Scoring', '+ Competitor Analysis', '+ Advanced Reports'],
            price: 199
          }
        ]
      },
      hasWebsite: smart.hasWebsite
    };
  };

  const handleSmartSubmit = () => {
    try {
      const data = generateDataFromSmart();
      setError(null);
      onLoad(data);
    } catch (e) {
      setError('Error generating data: ' + e.message);
    }
  };

  const handleSmartChange = (field, value) => {
    setSmart({ ...smart, [field]: isNaN(value) ? value : parseFloat(value) });
  };

  const handleJsonLoad = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setError(null);
      onLoad(parsed);
    } catch (e) {
      setError('Invalid JSON. Check the format.');
    }
  };

  return (
    <Card className="client-data-form">
      <Card.Body>
        <h5>📊 Sales Diagnostic Tool</h5>
        <Tabs defaultActiveKey="smart" className="mb-3">
          <Tab eventKey="smart" title="Diagnostic Form (Recommended)">
            <div className="smart-form-content">
              <p className="muted">Enter your call and sales data. We will calculate your money leaks automatically.</p>
              
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Business Name</Form.Label>
                      <Form.Control value={smart.businessName} onChange={(e) => handleSmartChange('businessName', e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Month</Form.Label>
                      <Form.Control value={smart.currentMonth} onChange={(e) => handleSmartChange('currentMonth', e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="form-section-title">📞 Call Volume</div>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Total Calls This Month</Form.Label>
                      <Form.Control type="number" value={smart.totalCalls} onChange={(e) => handleSmartChange('totalCalls', e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Calls You Answered</Form.Label>
                      <Form.Control type="number" value={smart.callsAnswered} onChange={(e) => handleSmartChange('callsAnswered', e.target.value)} />
                      <small className="text-muted">Missed: {smart.totalCalls - smart.callsAnswered} ({((smart.totalCalls - smart.callsAnswered) / smart.totalCalls * 100).toFixed(1)}%)</small>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="form-section-title">📍 Call Type Breakdown</div>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>After-Hours Calls (Missed)</Form.Label>
                      <Form.Range value={smart.afterHoursCalls} onChange={(e) => handleSmartChange('afterHoursCalls', e.target.value)} min="0" max="50" />
                      <small className="text-muted">{smart.afterHoursCalls} calls after 6 PM</small>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pick Up Rate (%)</Form.Label>
                      <Form.Range value={smart.afterHoursPickupRate} onChange={(e) => handleSmartChange('afterHoursPickupRate', e.target.value)} min="0" max="100" />
                      <small className="text-muted">You pick up {smart.afterHoursPickupRate}% of after-hours calls</small>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Calls While On Jobs (Missed)</Form.Label>
                      <Form.Range value={smart.onJobCalls} onChange={(e) => handleSmartChange('onJobCalls', e.target.value)} min="0" max="50" />
                      <small className="text-muted">{smart.onJobCalls} calls while you are out on jobs</small>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pick Up Rate (%)</Form.Label>
                      <Form.Range value={smart.onJobPickupRate} onChange={(e) => handleSmartChange('onJobPickupRate', e.target.value)} min="0" max="100" />
                      <small className="text-muted">You pick up {smart.onJobPickupRate}% while on jobs</small>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="form-section-title">💼 Business Metrics</div>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Average Job Value ($)</Form.Label>
                      <Form.Control type="number" value={smart.avgJobValue} onChange={(e) => handleSmartChange('avgJobValue', e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Close Rate (%)</Form.Label>
                      <Form.Control type="number" step="0.1" value={smart.closeRate} onChange={(e) => handleSmartChange('closeRate', e.target.value)} />
                      <small className="text-muted">Est. {Math.round(smart.callsAnswered * (smart.closeRate / 100))} jobs booked</small>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Avg Response Time (minutes)</Form.Label>
                      <Form.Range value={smart.avgResponseTime} onChange={(e) => handleSmartChange('avgResponseTime', e.target.value)} min="1" max="60" />
                      <small className="text-muted">{smart.avgResponseTime} minutes to respond</small>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Follow-Up Rate (%)</Form.Label>
                      <Form.Range value={smart.followUpRate} onChange={(e) => handleSmartChange('followUpRate', e.target.value)} min="0" max="100" />
                      <small className="text-muted">You follow up {smart.followUpRate}% of the time</small>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Leads Without Follow-Up</Form.Label>
                  <Form.Range value={smart.noFollowUpLeads} onChange={(e) => handleSmartChange('noFollowUpLeads', e.target.value)} min="0" max="30" />
                  <small className="text-muted">{smart.noFollowUpLeads} leads not followed up</small>
                </Form.Group>

                <div className="form-section-title">🌐 Online Presence</div>
                <Form.Group className="mb-3">
                  <Form.Label>Do You Have a Website?</Form.Label>
                  <div className="website-toggle">
                    <Form.Check
                      type="radio"
                      label="Yes, I have a website"
                      name="website"
                      id="website-yes"
                      checked={smart.hasWebsite}
                      onChange={() => handleSmartChange('hasWebsite', true)}
                    />
                    <Form.Check
                      type="radio"
                      label="No website"
                      name="website"
                      id="website-no"
                      checked={!smart.hasWebsite}
                      onChange={() => handleSmartChange('hasWebsite', false)}
                    />
                  </div>
                  {!smart.hasWebsite && (
                    <div className="alert alert-info mt-2">
                      <small>💡 Building a website can bring in 20-30% more leads from search and improve credibility</small>
                    </div>
                  )}
                </Form.Group>

                <div className="form-section-title">⭐ Reviews</div>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Reviews</Form.Label>
                      <Form.Control type="number" value={smart.currentReviews} onChange={(e) => handleSmartChange('currentReviews', e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Review Goal</Form.Label>
                      <Form.Control type="number" value={smart.reviewGoal} onChange={(e) => handleSmartChange('reviewGoal', e.target.value)} />
                      <small className="text-muted">Need {Math.max(0, smart.reviewGoal - smart.currentReviews)} more reviews</small>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Money Lost Summary */}
                <div className="money-lost-summary">
                  <h6>💰 Estimated Money Lost This Month</h6>
                  <Row className="loss-items">
                    <Col md={6}>
                      <div className="loss-item">
                        <span className="loss-label">After-Hours Calls:</span>
                        <span className="loss-value">${moneyLost.afterHoursLost.toLocaleString()}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="loss-item">
                        <span className="loss-label">On-Job Calls:</span>
                        <span className="loss-value">${moneyLost.onJobLost.toLocaleString()}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="loss-item">
                        <span className="loss-label">No Follow-Up:</span>
                        <span className="loss-value">${moneyLost.followUpLost.toLocaleString()}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="loss-item total">
                        <span className="loss-label">TOTAL:</span>
                        <span className="loss-value">${moneyLost.total.toLocaleString()}</span>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="form-actions mt-4">
                  <Button variant="success" onClick={handleSmartSubmit} className="me-2">✓ Load Diagnostic Data</Button>
                  <Button variant="light" onClick={() => setSmart({ businessName: 'My Service Business', currentMonth: 'January 2026', totalCalls: 142, callsAnswered: 118, avgJobValue: 1200, closeRate: 53.5, currentReviews: 38, reviewGoal: 50, avgResponseTime: 11, afterHoursCalls: 18, afterHoursPickupRate: 10, onJobCalls: 24, onJobPickupRate: 30, followUpRate: 75, noFollowUpLeads: 8, hasWebsite: true })}>Reset</Button>
                </div>
              </Form>
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
          </Tab>

          <Tab eventKey="json" title="JSON Import">
            <div className="json-form-content">
              <p className="muted">Paste raw JSON data (for advanced use)</p>
              <Form.Group>
                <Form.Control as="textarea" rows={8} value={jsonText} onChange={(e) => setJsonText(e.target.value)} placeholder='{"businessName": "...", ...}' />
              </Form.Group>
              {error && <div className="text-danger mt-2">{error}</div>}
              <div className="form-actions mt-3">
                <Button variant="primary" onClick={handleJsonLoad} className="me-2">Load JSON</Button>
                <Button variant="light" onClick={() => setJsonText('')}>Clear</Button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};

export default ClientDataForm;
