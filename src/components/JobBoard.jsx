import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Zap } from 'lucide-react';
import './JobBoard.css';

const JobBoard = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');

  // Mock data for jobs
  const weekData = {
    current: {
      week: 'This Week',
      dates: 'Jan 13 - 19',
      stats: { booked: 12, completed: 8, pending: 4 },
      jobs: [
        { id: 1, date: 'Mon 13', service: 'Water Heater Repair', status: 'completed', revenue: 450 },
        { id: 2, date: 'Mon 13', service: 'Drain Cleaning', status: 'completed', revenue: 280 },
        { id: 3, date: 'Tue 14', service: 'Leak Inspection', status: 'completed', revenue: 350 },
        { id: 4, date: 'Tue 14', service: 'Pipe Repair', status: 'in-progress', revenue: 520 },
        { id: 5, date: 'Wed 15', service: 'Faucet Installation', status: 'scheduled', revenue: 380 },
        { id: 6, date: 'Wed 15', service: 'Water Softener Install', status: 'scheduled', revenue: 1200 },
        { id: 7, date: 'Thu 16', service: 'Pressure Tank Replace', status: 'pending', revenue: 950 },
        { id: 8, date: 'Fri 17', service: 'Emergency Leak Fix', status: 'completed', revenue: 600 },
        { id: 9, date: 'Sat 18', service: 'Toilet Replacement', status: 'in-progress', revenue: 480 },
        { id: 10, date: 'Sat 18', service: 'Sump Pump Install', status: 'pending', revenue: 2100 },
        { id: 11, date: 'Sun 19', service: 'Inspection Call', status: 'pending', revenue: 200 },
        { id: 12, date: 'Sun 19', service: 'Follow-up Quote', status: 'scheduled', revenue: 0 }
      ]
    },
    next: {
      week: 'Next Week',
      dates: 'Jan 20 - 26',
      stats: { booked: 9, completed: 0, pending: 9 },
      jobs: [
        { id: 13, date: 'Mon 20', service: 'Bathroom Remodel Quote', status: 'pending', revenue: 0 },
        { id: 14, date: 'Tue 21', service: 'Kitchen Sink Install', status: 'scheduled', revenue: 450 },
        { id: 15, date: 'Wed 22', service: 'Emergency Service Call', status: 'pending', revenue: 0 },
        { id: 16, date: 'Thu 23', service: 'Water Main Replacement', status: 'scheduled', revenue: 3200 },
        { id: 17, date: 'Fri 24', service: 'Slab Leak Repair', status: 'pending', revenue: 0 },
        { id: 18, date: 'Sat 25', service: 'Yard Hydrant Service', status: 'scheduled', revenue: 350 },
        { id: 19, date: 'Sat 25', service: 'Septic Service', status: 'pending', revenue: 0 },
        { id: 20, date: 'Sun 26', service: 'Follow-up Inspection', status: 'pending', revenue: 0 },
        { id: 21, date: 'Sun 26', service: 'Customer Call', status: 'scheduled', revenue: 0 }
      ]
    }
  };

  const data = weekData[selectedWeek];
  const totalRevenue = data.jobs.reduce((sum, job) => sum + job.revenue, 0);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 size={20} color="#10b981" />;
      case 'in-progress':
        return <Zap size={20} color="#f59e0b" />;
      case 'scheduled':
        return <Calendar size={20} color="#1e3a8a" />;
      case 'pending':
        return <Clock size={20} color="#ef4444" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(val);
  };

  // Group jobs by date
  const jobsByDate = {};
  data.jobs.forEach(job => {
    if (!jobsByDate[job.date]) {
      jobsByDate[job.date] = [];
    }
    jobsByDate[job.date].push(job);
  });

  const dates = Object.keys(jobsByDate).sort((a, b) => {
    const dayA = parseInt(a.split(' ')[1]);
    const dayB = parseInt(b.split(' ')[1]);
    return dayA - dayB;
  });

  return (
    <section className="jobboard-section">
      <div className="jobboard-header">
        <h2 className="jobboard-title">
          <Calendar size={28} color="#1e3a8a" />
          Weekly Job Board
        </h2>
        <p className="jobboard-subtitle">Track scheduled jobs and revenue pipeline</p>
      </div>

      {/* Week Toggle */}
      <div className="week-toggle">
        <button 
          className={`toggle-btn ${selectedWeek === 'current' ? 'active' : ''}`}
          onClick={() => setSelectedWeek('current')}
        >
          This Week
        </button>
        <button 
          className={`toggle-btn ${selectedWeek === 'next' ? 'active' : ''}`}
          onClick={() => setSelectedWeek('next')}
        >
          Next Week
        </button>
      </div>

      {/* Stats Cards */}
      <div className="week-stats">
        <div className="stat-card booked">
          <div className="stat-label">Booked Jobs</div>
          <div className="stat-value">{data.stats.booked}</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{data.stats.completed}</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-label">Pending</div>
          <div className="stat-value">{data.stats.pending}</div>
        </div>
        <div className="stat-card revenue">
          <div className="stat-label">Week Revenue</div>
          <div className="stat-value revenue-text">{formatCurrency(totalRevenue)}</div>
        </div>
      </div>

      {/* Job Calendar */}
      <div className="job-calendar">
        {dates.map((dateLabel) => (
          <div key={dateLabel} className="date-section">
            <h3 className="date-header">{dateLabel}</h3>
            <div className="jobs-list">
              {jobsByDate[dateLabel].map((job) => (
                <div key={job.id} className={`job-item status-${job.status}`}>
                  <div className="job-icon">
                    {getStatusIcon(job.status)}
                  </div>
                  <div className="job-info">
                    <div className="job-service">{job.service}</div>
                    <div className="job-status">{getStatusLabel(job.status)}</div>
                  </div>
                  <div className="job-revenue">
                    {job.revenue > 0 ? formatCurrency(job.revenue) : <span className="no-revenue">–</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="jobboard-cta">
        <button className="btn-jobboard">
          Add New Job
        </button>
        <button className="btn-jobboard secondary">
          View Full Calendar
        </button>
      </div>
    </section>
  );
};

export default JobBoard;
