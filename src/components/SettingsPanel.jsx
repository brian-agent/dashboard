import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Settings, ChevronDown } from 'lucide-react';
import './SettingsPanel.css';

const SettingsPanel = ({ onSettingsChange, currentSettings }) => {
  const [expanded, setExpanded] = useState(false);
  const [settings, setSettings] = useState(currentSettings || {
    avgJobValue: 1200,
    closeRate: 40,
    operatingHours: '8:00 AM - 6:00 PM'
  });

  const handleChange = (field, value) => {
    const updated = { ...settings, [field]: value };
    setSettings(updated);
    if (onSettingsChange) onSettingsChange(updated);
  };

  return (
    <Card className="settings-panel">
      <Card.Header
        className="settings-header"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="settings-title">
          <Settings size={20} />
          <span>Revenue Calculations Settings</span>
        </div>
        <ChevronDown size={20} className={`chevron ${expanded ? 'open' : ''}`} />
      </Card.Header>

      {expanded && (
        <Card.Body className="settings-body">
          <div className="settings-group">
            <label>Average Job Value</label>
            <div className="input-group">
              <span className="currency">$</span>
              <input
                type="number"
                value={settings.avgJobValue}
                onChange={(e) => handleChange('avgJobValue', Number(e.target.value))}
                min="100"
                step="100"
              />
            </div>
            <small>Used to calculate revenue impact of lost opportunities</small>
          </div>

          <div className="settings-group">
            <label>Close Rate (%)</label>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                value={settings.closeRate}
                onChange={(e) => handleChange('closeRate', Number(e.target.value))}
                className="slider"
              />
              <span className="value">{settings.closeRate}%</span>
            </div>
            <small>Percentage of leads that typically convert to jobs</small>
          </div>

          <div className="settings-group">
            <label>Operating Hours</label>
            <input
              type="text"
              value={settings.operatingHours}
              onChange={(e) => handleChange('operatingHours', e.target.value)}
              placeholder="e.g., 8:00 AM - 6:00 PM"
            />
            <small>Used to identify after-hours opportunities</small>
          </div>

          <button className="btn-reset" onClick={() => {
            const defaults = { avgJobValue: 1200, closeRate: 40, operatingHours: '8:00 AM - 6:00 PM' };
            setSettings(defaults);
            if (onSettingsChange) onSettingsChange(defaults);
          }}>
            Reset to Defaults
          </button>
        </Card.Body>
      )}
    </Card>
  );
};

export default SettingsPanel;
