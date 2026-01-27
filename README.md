# Revenue Protection Dashboard

A professional revenue protection dashboard for contractor businesses (plumbers, HVAC, electricians).

## Features

- **Revenue Leak Analysis** - Track 7 key revenue leak categories with real-time metrics
- **Performance Metrics** - Monitor 6-month trends in leads, response time, and reviews
- **Lead Source Breakdown** - Visual analysis of where leads come from and conversion rates
- **Response Time Analysis** - Track phone, text, email, and after-hours response times
- **Review Tracker** - Monitor review generation progress with actionable strategies
- **Conversion Funnel** - Track the journey from inquiry to booked job
- **Weekly Summary** - Compare this week's metrics with last week
- **Action Items** - Get alerts and recommendations for immediate action
- **Tier Indicator** - View your subscription tier and benefits

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard component
│   ├── Header.jsx             # Business name, month, quick stats
│   ├── LeakAnalysis.jsx       # Revenue leak breakdown
│   ├── PerformanceChart.jsx   # 6-month performance trends
│   ├── LeadSourceChart.jsx    # Lead source pie chart
│   ├── ResponseTimeMetrics.jsx # Response time by channel
│   ├── ReviewTracker.jsx      # Review generation tracking
│   ├── ConversionFunnel.jsx   # Booking conversion flow
│   ├── WeeklySummary.jsx      # Week-over-week comparison
│   ├── ActionItems.jsx        # Alerts and action items
│   ├── TierIndicator.jsx      # Subscription tier info
│   └── StatCard.jsx           # Reusable stat card component
├── data/
│   └── mockData.js            # All mock data for the dashboard
├── utils/
│   └── calculations.js        # Utility functions for formatting and calculations
├── App.jsx                    # Root component
└── index.jsx                  # Entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/brian-agent/dashboard.git
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The dashboard will open at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design

**Color Scheme:**
- Primary: Navy Blue (#1e3a8a)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)
- Background: Light Gray (#f3f4f6)

**Features:**
- Mobile responsive design
- Professional contractor-friendly interface
- Large, readable text (suitable for 50-60 year olds)
- Minimal, professional animations
- Card-based layout with subtle shadows

## Mock Data

The dashboard uses realistic mock data for a plumbing business:
- 100-150 calls per month
- $500-2000 average job value
- 6-month historical trends
- Various lead sources and conversion rates
- Response time metrics by channel

## Technologies

- **React 19** - UI library
- **React Bootstrap** - UI components
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Vite** - Build tool

## Key Metrics

- **Total Calls Received**: Monthly inbound call volume
- **Capture Rate**: Percentage of calls answered
- **Revenue Leak**: Estimated lost revenue from 7 key leak categories
- **Lead Conversion**: Funnel conversion rates from inquiry to booking
- **Response Time**: Average response times by channel
- **Review Count**: Progress toward monthly review goal

## Contractor-Friendly Language

This dashboard uses language contractors understand:
- "Jobs" instead of "Conversions"
- "Calls" instead of "Inbound Requests"
- "Lost Revenue" instead of "Opportunity Cost"
- "Response Time" instead of "SLA"

## Future Enhancements

- Integration with real business data APIs
- Real-time notifications
- Custom alert settings
- Export to PDF/Excel
- Multi-business support
- Advanced analytics and AI insights

## Support

For issues or questions, please open an issue on the GitHub repository.

## License

ISC License - See LICENSE file for details
