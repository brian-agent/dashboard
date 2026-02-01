import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Badge, Modal } from 'react-bootstrap';
import { Target, TrendingUp, FileText, ChevronRight, Download } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';
import { exportToPDF } from '../utils/pdfExport';
import './SalesCloser.css';

const SalesCloser = ({ clientData = {}, onClose }) => {
  const [showProposal, setShowProposal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Extract critical metrics
  const biggestLeak = clientData.revenueLeak?.reduce((max, l) => 
    (l.estimatedRevenue || 0) > (max.estimatedRevenue || 0) ? l : max
  ) || {};

  const topLeaks = clientData.revenueLeak
    ?.sort((a, b) => (b.estimatedRevenue || 0) - (a.estimatedRevenue || 0))
    .slice(0, 3) || [];

  const totalLeak = clientData.totalRevenueLeak || 0;
  const monthlyRevenueLoss = totalLeak;
  const annualRevenueLoss = monthlyRevenueLoss * 12;

  // Calculate potential impact
  const potentialMonthlyRecovery = Math.round(monthlyRevenueLoss * 0.6); // 60% recovery realistic
  const potentialAnnualRecovery = potentialMonthlyRecovery * 12;

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('sales-closer-content');
      const filename = `${clientData.businessName}_Revenue_Recovery_${new Date().toLocaleDateString()}`;
      const title = `Revenue Recovery Proposal\n${clientData.businessName}`;
      await exportToPDF(element, filename, title);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="sales-closer">
      <Container>
        <div id="sales-closer-content">
        {/* BIG HEADLINE - REVENUE LOSS */}
        <Row className="mb-4">
          <Col>
            <Card className="revenue-impact-card">
              <Card.Body className="text-center">
                <h2 className="impact-subtitle">Current Revenue Leaking:</h2>
                <h1 className="impact-amount">{formatCurrency(monthlyRevenueLoss)}</h1>
                <p className="impact-subtext">Lost every month from preventable issues</p>
                <p className="impact-annual">That's {formatCurrency(annualRevenueLoss)} per year</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* TOP 3 REVENUE LEAKS */}
        <Row className="mb-4">
          <Col>
            <h3 className="section-title">🔴 Top 3 Revenue Leaks</h3>
          </Col>
        </Row>

        <Row className="mb-5">
          {topLeaks.map((leak, idx) => (
            <Col md={4} key={leak.id} className="mb-3">
              <Card className="leak-card">
                <Card.Body>
                  <div className="leak-rank">#{idx + 1}</div>
                  <h5 className="leak-name">{leak.name}</h5>
                  <div className="leak-amount">
                    {formatCurrency(leak.estimatedRevenue)}/mo
                  </div>
                  <small className="text-muted d-block mb-2">
                    {leak.description}
                  </small>
                  <Badge bg={leak.status === 'critical' ? 'danger' : 'warning'}>
                    {leak.status}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* FIX IT - POTENTIAL RECOVERY */}
        <Row className="mb-4">
          <Col>
            <Card className="opportunity-card">
              <Card.Body>
                <div className="d-flex align-items-start mb-3">
                  <TrendingUp className="opportunity-icon" />
                  <div>
                    <h4>Fix These 3 Issues = More Revenue</h4>
                    <p className="mb-0 text-muted">
                      Implementing solutions can recover up to:
                    </p>
                  </div>
                </div>
                <div className="recovery-breakdown">
                  <div className="recovery-stat">
                    <div className="recovery-label">Monthly Recovery</div>
                    <div className="recovery-value">{formatCurrency(potentialMonthlyRecovery)}</div>
                  </div>
                  <div className="recovery-stat">
                    <div className="recovery-label">Annual Recovery</div>
                    <div className="recovery-value">{formatCurrency(potentialAnnualRecovery)}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ACTIONABLE FIXES */}
        <Row className="mb-5">
          <Col>
            <h3 className="section-title">✓ What To Fix First</h3>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={12}>
            {topLeaks.slice(0, 3).map((leak, idx) => (
              <Card key={leak.id} className="action-card mb-3">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{idx + 1}. Fix "{leak.name}"</h5>
                    <p className="mb-0 text-muted small">
                      {leak.description}
                    </p>
                  </div>
                  <div className="action-amount">
                    <div className="amount-label">Recover:</div>
                    <div className="amount-value">
                      {formatCurrency(Math.round(leak.estimatedRevenue * 0.6))}
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-muted" />
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>

        {/* CLOSE BUTTON */}
        <Row className="mb-4">
          <Col>
            <Button 
              size="lg" 
              className="close-deal-btn w-100 mb-2"
              onClick={() => setShowProposal(true)}
            >
              <FileText size={20} className="me-2" />
              Generate Proposal
            </Button>
            <Button 
              size="lg" 
              variant="success" 
              className="w-100 mb-2"
              onClick={handleExportPDF}
              disabled={isExporting}
            >
              <Download size={20} className="me-2" />
              {isExporting ? 'Exporting...' : 'Export as PDF'}
            </Button>
            <Button 
              size="lg" 
              variant="outline-primary" 
              className="w-100"
              onClick={onClose}
            >
              Back to Full Dashboard
            </Button>
          </Col>
        </Row>

        {/* PROPOSAL MODAL */}
        <Modal show={showProposal} onHide={() => setShowProposal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Revenue Recovery Proposal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="proposal-content">
              <h5>Summary for {clientData.businessName}</h5>
              <p>Current monthly revenue leaking: <strong>{formatCurrency(monthlyRevenueLoss)}</strong></p>
              <p>Annual impact: <strong>{formatCurrency(annualRevenueLoss)}</strong></p>
              
              <h6 className="mt-4">Recommended Actions:</h6>
              <ul>
                {topLeaks.map((leak, idx) => (
                  <li key={leak.id}>
                    {leak.name}: {leak.description}
                  </li>
                ))}
              </ul>

              <h6 className="mt-4">Expected Outcome:</h6>
              <p>Monthly Recovery: <strong>{formatCurrency(potentialMonthlyRecovery)}</strong></p>
              <p>Annual Recovery: <strong>{formatCurrency(potentialAnnualRecovery)}</strong></p>
              
              <div className="proposal-cta mt-4">
                <p><strong>Ready to capture this revenue?</strong></p>
                <p>Click "Export Proposal" to download and share with your team.</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProposal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => {
              // Export proposal as text/PDF
              const proposalText = `
REVENUE RECOVERY PROPOSAL
${clientData.businessName}

CURRENT SITUATION:
Monthly Revenue Leak: ${formatCurrency(monthlyRevenueLoss)}
Annual Revenue Loss: ${formatCurrency(annualRevenueLoss)}

TOP 3 LEAKS:
${topLeaks.map((l, i) => `${i+1}. ${l.name} - ${formatCurrency(l.estimatedRevenue)}/month`).join('\n')}

OPPORTUNITY:
Potential Monthly Recovery: ${formatCurrency(potentialMonthlyRecovery)}
Potential Annual Recovery: ${formatCurrency(potentialAnnualRecovery)}

Let's fix this together.
              `;
              const blob = new Blob([proposalText], { type: 'text/plain' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${clientData.businessName}_Revenue_Proposal.txt`;
              a.click();
              window.URL.revokeObjectURL(url);
              setShowProposal(false);
              alert('Proposal exported!');
            }}>
              Export Proposal
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </Container>
    </div>
  );
};

export default SalesCloser;
