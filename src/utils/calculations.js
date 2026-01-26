// Utility functions for calculations and formatting

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const calculateRevenueImpact = (opportunities, closeRate, avgJobValue) => {
  return opportunities * closeRate * avgJobValue;
};

export const getStatusColor = (status) => {
  const colors = {
    critical: '#ef4444',
    warning: '#f59e0b',
    good: '#10b981',
    info: '#3b82f6'
  };
  return colors[status] || '#6b7280';
};

export const getStatusBg = (status) => {
  const colors = {
    critical: '#fee2e2',
    warning: '#fef3c7',
    good: '#d1fae5',
    info: '#dbeafe'
  };
  return colors[status] || '#f3f4f6';
};

export const getStatusBorder = (status) => {
  const colors = {
    critical: '#fecaca',
    warning: '#fcd34d',
    good: '#a7f3d0',
    info: '#bfdbfe'
  };
  return colors[status] || '#e5e7eb';
};

export const getTrendIcon = (trend) => {
  return trend === 'improving' ? '↓' : trend === 'declining' ? '↑' : '→';
};

export const getTrendColor = (trend) => {
  if (trend === 'improving') return '#10b981';
  if (trend === 'declining') return '#ef4444';
  return '#6b7280';
};

export const getResponseTimeStatus = (minutes) => {
  if (minutes < 5) return 'good';
  if (minutes < 30) return 'warning';
  return 'critical';
};

export const getResponseTimeColor = (minutes) => {
  const status = getResponseTimeStatus(minutes);
  return getStatusColor(status);
};

export const formatTime = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.round(minutes / 60);
  return `${hours}h`;
};

export const calculateTierSavings = (leakItems) => {
  return leakItems.reduce((sum, item) => sum + item.estimatedRevenue, 0);
};

export default {
  formatCurrency,
  formatPercent,
  calculateRevenueImpact,
  getStatusColor,
  getStatusBg,
  getStatusBorder,
  getTrendIcon,
  getTrendColor,
  getResponseTimeStatus,
  getResponseTimeColor,
  formatTime,
  calculateTierSavings
};
