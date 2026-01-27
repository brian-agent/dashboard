// Mock data for Revenue Protection Dashboard
// All data represents a plumbing business over the last month

export const mockData = {
  businessName: "ABC Plumbing",
  currentMonth: "January 2026",
  
  // Header Stats
  headerStats: {
    totalCalls: 142,
    callsAnswered: 118,
    callsMissed: 24,
    captureRate: 83.1,
  },

  // Revenue Leak Analysis - 7 categories
  revenueLeak: [
    {
      id: "after-hours",
      name: "After-Hours Inquiries",
      lostOpportunities: 18,
      estimatedRevenue: 21600,
      percentage: 12.7,
      status: "warning",
      trend: "declining", // improving/declining/stable
      trendPercent: -2.3,
      description: "Calls received after 6 PM"
    },
    {
      id: "missed-calls",
      name: "Missed Calls During Jobs",
      lostOpportunities: 24,
      estimatedRevenue: 28800,
      percentage: 16.9,
      status: "critical",
      trend: "declining",
      trendPercent: 1.5,
      description: "Couldn't pick up while on other jobs"
    },
    {
      id: "no-followup",
      name: "No Follow-Up",
      lostOpportunities: 8,
      estimatedRevenue: 9600,
      percentage: 5.6,
      status: "good",
      trend: "improving",
      trendPercent: -3.2,
      description: "Leads that weren't contacted within 24 hours"
    },
    {
      id: "slow-response",
      name: "Slow Response Time",
      lostOpportunities: 12,
      estimatedRevenue: 14400,
      percentage: 8.5,
      status: "warning",
      trend: "stable",
      trendPercent: 0.2,
      description: "Responded over 30 minutes after initial contact"
    },
    {
      id: "website-conversion",
      name: "Poor Website Conversion",
      lostOpportunities: 15,
      estimatedRevenue: 18000,
      percentage: 10.6,
      status: "warning",
      trend: "declining",
      trendPercent: -1.1,
      description: "Website visitors who didn't convert to calls"
    },
    {
      id: "review-gap",
      name: "Review Gap Impact",
      lostOpportunities: 6,
      estimatedRevenue: 7200,
      percentage: 4.2,
      status: "good",
      trend: "improving",
      trendPercent: -4.5,
      description: "Lost referrals due to low review count"
    },
    {
      id: "unqualified",
      name: "Unqualified Leads",
      lostOpportunities: 22,
      estimatedRevenue: 0,
      percentage: 15.5,
      status: "warning",
      trend: "stable",
      trendPercent: 0.1,
      description: "Time wasted on non-qualified leads"
    }
  ],

  totalRevenueLeak: 99600, // sum of all revenue impacts

  // Monthly Performance - 6 month trend
  monthlyPerformance: [
    { month: "Aug", leadsCapture: 78, responseTime: 18, reviews: 12 },
    { month: "Sep", leadsCapture: 92, responseTime: 16, reviews: 15 },
    { month: "Oct", leadsCapture: 105, responseTime: 14, reviews: 19 },
    { month: "Nov", leadsCapture: 118, responseTime: 13, reviews: 24 },
    { month: "Dec", leadsCapture: 125, responseTime: 12, reviews: 28 },
    { month: "Jan", leadsCapture: 142, responseTime: 11, reviews: 35 }
  ],

  monthlyComparison: {
    thisMonth: 142,
    lastMonth: 125,
    change: 13.6
  },

  // Lead Source Breakdown
  leadSources: [
    { source: "Google Search", leads: 45, conversion: 76 },
    { source: "Google Maps", leads: 38, conversion: 82 },
    { source: "Website Direct", leads: 28, conversion: 68 },
    { source: "Referrals", leads: 18, conversion: 94 },
    { source: "Social Media", leads: 8, conversion: 50 },
    { source: "Other", leads: 5, conversion: 60 }
  ],

  // Response Time Analysis
  responseTime: {
    phoneCalls: { average: 3, status: "good" }, // minutes
    textMessages: { average: 8, status: "good" },
    contactForms: { average: 45, status: "warning" },
    afterHours: { average: 480, status: "critical" }, // minutes (8 hours)
  },

  // Review Tracker
  reviews: {
    current: 38,
    newThisMonth: 8,
    requestsSent: 24,
    responseRate: 33,
    monthlyGoal: 50,
    trend: "improving"
  },

  // Booking Conversion Funnel
  conversionFunnel: [
    { stage: "Total Inquiries", count: 142, conversion: 100 },
    { stage: "Qualified Leads", count: 118, conversion: 83.1 },
    { stage: "Quotes Sent", count: 94, conversion: 79.7 },
    { stage: "Jobs Booked", count: 76, conversion: 80.9 }
  ],

  // Weekly Summary
  weeklySummary: [
    {
      label: "Calls This Week",
      thisWeek: 35,
      lastWeek: 28,
      change: 25,
      icon: "Phone"
    },
    {
      label: "Customers We Reached",
      thisWeek: 29,
      lastWeek: 24,
      change: 20.8,
      icon: "TrendingUp"
    },
    {
      label: "New Google Reviews",
      thisWeek: 3,
      lastWeek: 1,
      change: 200,
      icon: "Star"
    },
    {
      label: "Money Protected This Week",
      thisWeek: 34800,
      lastWeek: 28400,
      change: 22.5,
      icon: "DollarSign"
    }
  ],

  // Action Items / Alerts
  actionItems: [
    {
      id: "alert-1",
      title: "3 customers are waiting for your call",
      description: "They called yesterday - quick callbacks could turn them into jobs",
      severity: "critical",
      action: "Call Them Now"
    },
    {
      id: "alert-2",
      title: "You're answering slower this week",
      description: "Try to pick up phones within 2 rings - it's costing you jobs",
      severity: "warning",
      action: "Review"
    },
    {
      id: "alert-3",
      title: "5 recent customers should be asked for reviews",
      description: "Send them a Google review request - takes 1 minute per customer",
      severity: "info",
      action: "Send Now"
    },
    {
      id: "alert-4",
      title: "Evening calls are up 23% - but you're not picking up",
      description: "Set up call forwarding after 6 PM so you don't miss jobs",
      severity: "warning",
      action: "Setup"
    }
  ],

  // Tier Status
  tierStatus: {
    currentTier: "Protection",
    monthlyPrice: 99,
    features: [
      "24/7 Call Capture",
      "SMS Tracking",
      "Lead Follow-up Alerts",
      "Basic Analytics"
    ],
    availableUpgrades: [
      {
        tier: "Intelligence",
        features: ["+ Lead Scoring", "+ Competitor Analysis", "+ Advanced Reports"],
        price: 199
      }
    ]
  }
};

export default mockData;
