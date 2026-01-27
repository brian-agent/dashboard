# AI Agent Instructions for Revenue Protection Dashboard

## Project Overview

This is a React-based Revenue Protection Dashboard for contractor businesses (plumbers, HVAC, electricians). The dashboard visualizes revenue leaks, performance metrics, and actionable insights in a mobile-responsive, contractor-friendly interface.

## Architecture

### Core Components

The dashboard is composed of 12 specialized components in `src/components/`:

1. **Dashboard.jsx** - Main orchestrator component that assembles all sections
2. **Header.jsx** - Business info and quick stat cards (calls, capture rate)
3. **LeakAnalysis.jsx** - Core value prop: visualizes 7 revenue leak categories with impact metrics
4. **PerformanceChart.jsx** - Recharts line/bar charts showing 6-month trends
5. **LeadSourceChart.jsx** - Pie chart breakdown of lead sources with conversion rates
6. **ResponseTimeMetrics.jsx** - Response time by channel (phone, text, form, after-hours)
7. **ReviewTracker.jsx** - Review goal progress with strategy steps
8. **ConversionFunnel.jsx** - Visual funnel of inquiry → quote → booking
9. **WeeklySummary.jsx** - Week-over-week comparison cards
10. **ActionItems.jsx** - Alert cards with severity levels and actions
11. **TierIndicator.jsx** - Subscription tier display with upgrade CTA
12. **StatCard.jsx** - Reusable card for displaying single metrics

### Data Layer

- **mockData.js** - Centralized mock data with realistic contractor business metrics (100-150 calls/month, $500-2000 job values, 6-month trends)
- **calculations.js** - Utility functions: formatCurrency, formatPercent, getStatusColor, getResponseTimeStatus, etc.

## Design System

**Color Palette:**
- Primary: #1e3a8a (Navy blue) - for CTAs and main UI
- Success: #10b981 (Green) - for positive metrics
- Warning: #f59e0b (Orange) - for caution
- Danger: #ef4444 (Red) - for critical issues
- Background: #f3f4f6 (Light gray)

**Typography:**
- Large, readable text (good for 50-60 year olds)
- Font sizes: 16px+ for body, 18px+ for section titles
- Font weights: 500 (regular), 600 (semibold), 700 (bold)

**Layout:**
- Card-based design with subtle shadows (1-4px)
- 1.5-2rem spacing between sections
- CSS Grid for responsive multi-column layouts with `minmax()`
- Mobile-first approach with `@media (max-width: 768px)`

## State Management

Currently **no state management** beyond React hooks in Dashboard.jsx:
- `dateRange` state for date range selector (7/30/90 days)
- Alert/action handlers are mock (show `alert()` messages)

**If adding real state later**, consider Redux or Zustand.

## Mock Data Strategy

Mock data tells a story of a successful business with room for improvement:

1. **Positive trends**: Leads captured increasing 82% over 6 months, reviews improving
2. **Problem areas**: After-hours inquiries leaking $21.6K/month, slow response time
3. **Realistic numbers**: 142 calls/month, 118 answered (83.1% capture rate)
4. **Actionable insights**: "3 leads need follow-up", "Call forwarding could save $21.6K"

Update mockData.js if testing different scenarios - all metrics cascade through components via props.

## Key Patterns

### Formatting Utilities
All formatting is centralized in `calculations.js`:
```javascript
formatCurrency(99600) // → "$99,600"
formatPercent(12.7)   // → "12.7%"
getStatusColor('critical') // → "#ef4444"
getResponseTimeStatus(45) // → "warning" (>5 min but <30 min)
```

### Component Props Pattern
Each component receives structured data from Dashboard:
```jsx
<LeakAnalysis leakItems={mockData.revenueLeak} totalRevenue={mockData.totalRevenueLeak} />
```

### CSS Organization
- Each component has companion `.css` file with same name
- Utility classes (`text-center`, `flex`, `gap-1`) NOT used - all inline CSS
- Responsive breakpoints at 768px (mobile) and 1024px (tablet)
- Transitions/animations are subtle: `transition: all 0.3s ease`

## Developer Workflows

### Running Locally
```bash
npm run dev    # Start Vite dev server on port 3000
npm run build  # Vite build to dist/
npm run preview # Preview production build
```

### Adding New Metrics
1. Add data to `mockData.revenueLeak` or appropriate array
2. Create component or modify existing to display
3. Use `calculations.js` for any formatting
4. Import and use in Dashboard.jsx
5. Test mobile responsiveness (768px breakpoint)

### Styling New Components
1. Create `.css` file alongside `.jsx`
2. Import in component
3. Follow naming: `.section-title`, `.card`, `.metric-value`
4. Include mobile breakpoint: `@media (max-width: 768px)`
5. Use CSS Grid with `minmax()` for responsive layouts

### Updating Mock Data Story
Edit specific arrays in `mockData.js`:
- `revenueLeak[]` - Add/modify leak categories (8+ categories supported)
- `monthlyPerformance[]` - Change 6-month trends
- `leadSources[]` - Adjust lead source mix
- `actionItems[]` - Add/remove alerts

## Testing & Validation

**No automated tests currently.** Manual checks:

1. **Mobile (375px)**: Check all cards stack, text readable, charts scale
2. **Tablet (768px)**: Verify layout transitions from mobile to desktop
3. **Desktop (1280px+)**: Confirm grid layouts spread properly
4. **Dark mode**: Not currently supported (future enhancement)

Browser dev tools testing is sufficient for prototyping.

## Integration Points & Future Connections

Currently **all data is mocked**. To connect real data:

1. **API Integration**: Replace mockData import with API calls in Dashboard.jsx
   ```javascript
   const [data, setData] = useState(mockData);
   useEffect(() => {
     fetchDashboardData().then(setData);
   }, []);
   ```

2. **Authentication**: Wrap Dashboard in PrivateRoute component
3. **Export**: Button in controls-bar → generateCSV(mockData)
4. **Real-time updates**: WebSocket connection for live metrics

## Common Gotchas

1. **Recharts charts**: Must have fixed height (300px) in Card body
2. **Bootstrap classes**: Grid system uses `row` and `col-*`, not custom classes
3. **Status colors**: Always use helper functions, don't hardcode hex colors
4. **Mobile text size**: Min 16px for body text (avoid <14px)
5. **Spacing**: Use rem units, never fixed px for margins/padding

## Performance Considerations

- No heavy computations (all < 100ms)
- Recharts with 6 data points (minimal re-renders)
- No animations on component mount (only hover/interaction)
- CSS Grid preferred over flexbox for complex layouts
- Images: None currently (icons via lucide-react)

## Contractor Language Guide

- ✓ "Jobs" not "Conversions"
- ✓ "Calls" not "Inbound Requests"
- ✓ "Lost Revenue" not "Opportunity Cost"
- ✓ "Response Time" not "SLA"
- ✓ "Follow-up" not "Lead nurturing"
- ✓ Plain numbers: "45 leads" not "45.0 inquiries"

## File Naming Conventions

- Components: PascalCase (Header.jsx, LeakAnalysis.jsx)
- CSS files: kebab-case matching component (leak-analysis.css)
- Data/Utils: camelCase (mockData.js, calculations.js)
- Constants: SCREAMING_SNAKE_CASE (COLORS, BREAKPOINTS)

## Next Steps for Enhancement

1. Connect to real backend API (replace mockData)
2. Add date range filtering (state already exists)
3. Implement export functionality (to CSV/PDF)
4. Add drill-down views for leak categories
5. Real-time notifications for critical alerts
6. User authentication and multi-business support
