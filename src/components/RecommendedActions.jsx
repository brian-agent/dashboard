import React from 'react';
import { AlertTriangle, TrendingUp, BarChart3, Target } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';
import './RecommendedActions.css';

const RecommendedActions = ({ leakData = [] }) => {
  // Action recommendations mapped to leak types
  const actionMap = {
    'lead-response': {
      title: 'Improve Lead Response Time',
      description: 'Quick response to leads increases conversion rates significantly. Speed matters.',
      impact: '18% revenue lift',
      icon: <TrendingUp size={24} color="#1e3a8a" />
    },
    'review-strategy': {
      title: 'Boost Google & Reviews',
      description: 'More reviews = higher ranking in search results. Target 5 new reviews this month.',
      impact: '24% lead growth',
      icon: <BarChart3 size={24} color="#10b981" />
    },
    'scheduling': {
      title: 'Implement Online Booking',
      description: 'Reduce friction in scheduling with self-service online calendar.',
      impact: '$8,400/month',
      icon: <Target size={24} color="#f59e0b" />
    },
    'quote-process': {
      title: 'Streamline Quote Process',
      description: 'Faster quotes = faster conversions. Train team on speed benchmarks.',
      impact: '14% quote-to-booking',
      icon: <TrendingUp size={24} color="#1e3a8a" />
    },
    'website-conversion': {
      title: 'Optimize Website CTA',
      description: 'Update homepage with clear, prominent call-to-action buttons.',
      impact: '12% form submissions',
      icon: <BarChart3 size={24} color="#10b981" />
    },
    'offline-leads': {
      title: 'Capture Walk-In/Phone Leads',
      description: 'Implement lead qualification system for phone & in-person inquiries.',
      impact: '$6,200/month',
      icon: <Target size={24} color="#f59e0b" />
    }
  };

  // Calculate recommended actions based on leak data
  const getRecommendedActions = () => {
    const recommendations = [];

    if (leakData && Array.isArray(leakData)) {
      leakData.forEach(leak => {
        const monthlyLoss = leak.monthlyLoss ?? leak.estimatedRevenue ?? 0;
        if (monthlyLoss > 5000 && actionMap[leak.id]) {
          recommendations.push({
            id: leak.id,
            leakType: leak.name,
            monthlyLoss,
            ...actionMap[leak.id]
          });
        }
      });
    }

    // If no data provided, return default recommendations
    if (recommendations.length === 0) {
      return [
        {
          id: 'lead-response',
          leakType: 'Lead Response Time',
          monthlyLoss: 18800,
          ...actionMap['lead-response']
        },
        {
          id: 'review-strategy',
          leakType: 'Review Count',
          monthlyLoss: 14600,
          ...actionMap['review-strategy']
        },
        {
          id: 'scheduling',
          leakType: 'Scheduling Friction',
          monthlyLoss: 12400,
          ...actionMap['scheduling']
        }
      ];
    }

    // Sort by impact (monthly loss) and return top 3
    return recommendations.sort((a, b) => b.monthlyLoss - a.monthlyLoss).slice(0, 3);
  };

  const actions = getRecommendedActions();

  return (
    <section className="recommended-actions-section">
      <h2 className="section-subtitle">
        <AlertTriangle size={28} color="#dc2626" />
        Top 3 Revenue Recovery Actions
      </h2>

      <div className="actions-grid">
        {actions.map((action, index) => (
          <div key={action.id} className="action-card">
            <div className="card-body">
              <div className="action-rank">#{index + 1}</div>
              
              <div className="action-icon">
                {action.icon}
              </div>

              <h3 className="action-title">{action.title}</h3>

              <div className="action-from">
                Based on: <strong>{action.leakType}</strong>
              </div>

              <p className="action-description">
                {action.description}
              </p>

              <div className="action-impact">
                <span className="impact-label">Potential Impact</span>
                <span className="impact-value">{action.monthlyLoss && action.monthlyLoss > 0 ? formatCurrency(action.monthlyLoss) : action.impact}</span>
              </div>

              <button className="btn-action-cta">
                Start Action
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedActions;
