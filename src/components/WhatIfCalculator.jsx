import React, { useState, useMemo } from 'react';
import { Zap } from 'lucide-react';
import './WhatIfCalculator.css';

const WhatIfCalculator = ({ currentMetrics = {} }) => {
  // Default values based on typical contractor business
  const defaults = {
    avgJobValue: 1500,
    closeRate: 0.35,
    responseTime: 8, // minutes
    reviewGoal: 45,
    websiteConversion: 0.08
  };

  const [state, useState_] = useState({
    responseTime: currentMetrics.avgResponseTime || defaults.responseTime,
    reviewCount: currentMetrics.reviewCount || defaults.reviewGoal,
    websiteConversion: (currentMetrics.websiteConversion || defaults.websiteConversion) * 100
  });

  // Calculate impacts
  const calculations = useMemo(() => {
    const monthlyLeads = 142; // From mock data
    const baseConversion = 0.35;
    const baseRevenue = monthlyLeads * baseConversion * defaults.avgJobValue;

    // Response time impact: every 5 min delay = -8% conversion
    const responseImpact = state.responseTime <= 5 ? 1.12 : 
                          state.responseTime <= 15 ? 1.0 : 
                          state.responseTime <= 30 ? 0.92 : 0.85;

    // Review count impact: each review = +1.5% conversion
    const reviewTarget = defaults.reviewGoal;
    const reviewImpact = 1 + ((state.reviewCount - reviewTarget) / reviewTarget) * 0.15;

    // Website conversion impact
    const websiteBase = monthlyLeads * 0.22; // ~22% of leads from website
    const websiteRevenue = websiteBase * (state.websiteConversion / 100) * defaults.avgJobValue;

    const projectedConversion = baseConversion * responseImpact * reviewImpact;
    const projectedLeads = monthlyLeads * (state.websiteConversion / 8); // as % improvement
    const projectedRevenue = (monthlyLeads * projectedConversion * defaults.avgJobValue) + 
                            (websiteRevenue * (state.websiteConversion / defaults.websiteConversion / 100));

    const improvement = projectedRevenue - baseRevenue;
    const improvementPercent = ((improvement / baseRevenue) * 100).toFixed(1);

    return {
      baseRevenue: baseRevenue,
      projectedRevenue: projectedRevenue,
      improvement: improvement,
      improvementPercent: improvementPercent,
      responseMultiplier: responseImpact,
      reviewMultiplier: reviewImpact
    };
  }, [state]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="whatif-section">
      <div className="whatif-header">
        <h2 className="whatif-title">
          <Zap size={28} color="#1e3a8a" />
          What-If Calculator
        </h2>
        <p className="whatif-subtitle">
          See how changes impact your monthly revenue
        </p>
      </div>

      <div className="whatif-container">
        <div className="whatif-controls">
          {/* Response Time Slider */}
          <div className="control-group">
            <label className="control-label">
              Average Response Time: <span className="control-value">{state.responseTime} min</span>
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="2"
                max="60"
                step="1"
                value={state.responseTime}
                onChange={(e) => useState_({ ...state, responseTime: parseInt(e.target.value) })}
                className="slider"
              />
              <div className="slider-marks">
                <span className="mark" style={{ left: '0%' }}>2m</span>
                <span className="mark" style={{ left: '50%' }}>30m</span>
                <span className="mark" style={{ left: '100%' }}>60m</span>
              </div>
            </div>
            <p className="control-hint">
              {state.responseTime <= 5 && '🎯 Excellent! Top 10% of contractors'}
              {state.responseTime > 5 && state.responseTime <= 15 && '✓ Good response time'}
              {state.responseTime > 15 && state.responseTime <= 30 && '⚠️ Room for improvement'}
              {state.responseTime > 30 && '❌ Critical - losing leads'}
            </p>
            <div className="impact-badge">
              {(calculations.responseMultiplier * 100 - 100).toFixed(0)}% conversion impact
            </div>
          </div>

          {/* Review Goal Slider */}
          <div className="control-group">
            <label className="control-label">
              Google Reviews: <span className="control-value">{state.reviewCount}</span>
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="10"
                max="200"
                step="1"
                value={state.reviewCount}
                onChange={(e) => useState_({ ...state, reviewCount: parseInt(e.target.value) })}
                className="slider"
              />
              <div className="slider-marks">
                <span className="mark" style={{ left: '0%' }}>10</span>
                <span className="mark" style={{ left: '50%' }}>105</span>
                <span className="mark" style={{ left: '100%' }}>200</span>
              </div>
            </div>
            <p className="control-hint">
              {state.reviewCount < 20 && '⚠️ Low visibility - build review count'}
              {state.reviewCount >= 20 && state.reviewCount < 50 && '✓ Competitive position'}
              {state.reviewCount >= 50 && state.reviewCount < 100 && '🎯 Strong authority'}
              {state.reviewCount >= 100 && '⭐ Market leader!'}
            </p>
            <div className="impact-badge">
              {((calculations.reviewMultiplier - 1) * 100).toFixed(0)}% conversion bonus
            </div>
          </div>

          {/* Website Conversion Slider */}
          <div className="control-group">
            <label className="control-label">
              Website Conversion Rate: <span className="control-value">{state.websiteConversion.toFixed(1)}%</span>
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={state.websiteConversion}
                onChange={(e) => useState_({ ...state, websiteConversion: parseFloat(e.target.value) })}
                className="slider"
              />
              <div className="slider-marks">
                <span className="mark" style={{ left: '0%' }}>2%</span>
                <span className="mark" style={{ left: '50%' }}>11%</span>
                <span className="mark" style={{ left: '100%' }}>20%</span>
              </div>
            </div>
            <p className="control-hint">
              {state.websiteConversion < 5 && '⚠️ Poor CTA - update landing page'}
              {state.websiteConversion >= 5 && state.websiteConversion < 10 && '✓ Average performance'}
              {state.websiteConversion >= 10 && state.websiteConversion < 15 && '🎯 Above average'}
              {state.websiteConversion >= 15 && '⭐ Excellent conversion!'}
            </p>
          </div>
        </div>

        {/* Results Box */}
        <div className="whatif-results">
          <div className="results-title">Projected Monthly Impact</div>

          <div className="results-comparison">
            <div className="comparison-item current">
              <div className="comparison-label">Current Revenue</div>
              <div className="comparison-value baseline">
                {formatCurrency(calculations.baseRevenue)}
              </div>
            </div>

            <div className="comparison-arrow">→</div>

            <div className="comparison-item projected">
              <div className="comparison-label">Projected Revenue</div>
              <div className="comparison-value">
                {formatCurrency(calculations.projectedRevenue)}
              </div>
            </div>
          </div>

          <div className="results-summary">
            <div className="summary-item improvement">
              <span className="summary-label">Monthly Increase</span>
              <span className="summary-value">
                {formatCurrency(calculations.improvement)}
              </span>
            </div>
            <div className="summary-item percentage">
              <span className="summary-label">Growth Rate</span>
              <span className="summary-value">
                +{calculations.improvementPercent}%
              </span>
            </div>
            <div className="summary-item annual">
              <span className="summary-label">Annual Impact</span>
              <span className="summary-value">
                {formatCurrency(calculations.improvement * 12)}
              </span>
            </div>
          </div>

          <div className="results-cta">
            <button className="btn-primary-whatif">
              Create Action Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIfCalculator;
