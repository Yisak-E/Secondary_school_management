// features/director/components/AnalyticsSummary.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function AnalyticsSummary({ stats }) {
  // Mock data for charts
  const enrollmentData = [
    { month: 'Jan', students: 1200 },
    { month: 'Feb', students: 1250 },
    { month: 'Mar', students: 1300 },
    { month: 'Apr', students: 1350 },
    { month: 'May', students: 1400 },
    { month: 'Jun', students: 1450 },
    { month: 'Jul', students: 1500 },
    { month: 'Aug', students: 1524 }
  ];

  const gradeDistribution = [
    { grade: 'Grade 9', students: 400 },
    { grade: 'Grade 10', students: 380 },
    { grade: 'Grade 11', students: 375 },
    { grade: 'Grade 12', students: 369 }
  ];

  return (
    <div className="analytics-summary">
      <h2>Analytics Overview</h2>
      
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Average Attendance</h4>
          <div className="metric-value">94.2%</div>
          <div className="metric-trend positive">+2.1% from last month</div>
        </div>
        
        <div className="metric-card">
          <h4>Fee Collection Rate</h4>
          <div className="metric-value">87.5%</div>
          <div className="metric-trend positive">+5.3% from last month</div>
        </div>
        
        <div className="metric-card">
          <h4>Teacher Retention</h4>
          <div className="metric-value">96.8%</div>
          <div className="metric-trend positive">+1.2% from last quarter</div>
        </div>
        
        <div className="metric-card">
          <h4>System Uptime</h4>
          <div className="metric-value">99.9%</div>
          <div className="metric-trend neutral">Stable</div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsSummary;