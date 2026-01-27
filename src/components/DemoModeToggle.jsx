import React, { useState } from 'react';
import { Play, User, TrendingUp, AlertCircle } from 'lucide-react';
import './DemoModeToggle.css';

const DemoModeToggle = ({ onModeChange = () => {} }) => {
  const [selectedMode, setSelectedMode] = useState('established');
  const [isExpanded, setIsExpanded] = useState(false);

  const profiles = {
    new: {
      name: 'New Client',
      description: 'Just started business (1 month in)',
      metrics: {
        monthlyLeads: 45,
        captureRate: 0.62,
        avgJobValue: 900,
        leakSeverity: 'critical',
        reviewCount: 3,
        responseTime: 22
      },
      subtitle: 'Early stage - need systems',
      color: '#3b82f6'
    },
    established: {
      name: 'Established',
      description: 'Growing steady (2-3 years in)',
      metrics: {
        monthlyLeads: 142,
        captureRate: 0.831,
        avgJobValue: 1500,
        leakSeverity: 'moderate',
        reviewCount: 45,
        responseTime: 8
      },
      subtitle: 'Solid foundation - fine-tuning',
      color: '#10b981'
    },
    struggling: {
      name: 'Struggling Client',
      description: 'Losing revenue (seasonal downturn)',
      metrics: {
        monthlyLeads: 78,
        captureRate: 0.58,
        avgJobValue: 1200,
        leakSeverity: 'critical',
        reviewCount: 18,
        responseTime: 35
      },
      subtitle: 'Many leaks - urgent fixes needed',
      color: '#ef4444'
    }
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    onModeChange(profiles[mode].metrics);
  };

  const currentProfile = profiles[selectedMode];

  return (
    <div className="demo-toggle-container">
      <button 
        className="demo-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <User size={20} />
        <span>{currentProfile.name}</span>
        <span className="toggle-arrow">{isExpanded ? '▲' : '▼'}</span>
      </button>

      {isExpanded && (
        <div className="demo-expanded">
          <div className="demo-intro">
            <h3>View Different Contractor Scenarios</h3>
            <p>See how the dashboard changes for different business stages</p>
          </div>

          <div className="profile-grid">
            {Object.entries(profiles).map(([key, profile]) => (
              <div 
                key={key}
                className={`profile-card ${selectedMode === key ? 'active' : ''}`}
                style={{ borderLeftColor: profile.color }}
              >
                <div className="profile-header">
                  <div className="profile-icon" style={{ background: profile.color }}>
                    <User size={24} color="white" />
                  </div>
                </div>

                <h4 className="profile-name">{profile.name}</h4>
                <p className="profile-description">{profile.description}</p>

                <div className="profile-metrics">
                  <div className="metric-mini">
                    <span className="metric-label">Leads/month</span>
                    <span className="metric-value">{profile.metrics.monthlyLeads}</span>
                  </div>
                  <div className="metric-mini">
                    <span className="metric-label">Capture</span>
                    <span className="metric-value">{(profile.metrics.captureRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="metric-mini">
                    <span className="metric-label">Avg Job</span>
                    <span className="metric-value">${profile.metrics.avgJobValue}</span>
                  </div>
                </div>

                <button 
                  className={`btn-select ${selectedMode === key ? 'selected' : ''}`}
                  onClick={() => handleModeChange(key)}
                >
                  {selectedMode === key ? '✓ Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <div className="demo-info">
            <div className="info-box">
              <Play size={16} color="#1e3a8a" />
              <span>Switch profiles to see real-time dashboard updates</span>
            </div>
            <div className="info-box">
              <AlertCircle size={16} color="#f59e0b" />
              <span>Use "Struggling" profile to see action recommendations</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoModeToggle;
