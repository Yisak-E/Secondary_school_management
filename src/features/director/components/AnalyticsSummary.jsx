// features/director/components/AnalyticsSummary.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

function AnalyticsSummary({ stats }) {
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
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Average Attendance</h4>
          <div className="text-2xl font-bold text-gray-900">94.2%</div>
          <div className="text-sm text-green-600 mt-1">+2.1% from last month</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Fee Collection Rate</h4>
          <div className="text-2xl font-bold text-gray-900">87.5%</div>
          <div className="text-sm text-green-600 mt-1">+5.3% from last month</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Teacher Retention</h4>
          <div className="text-2xl font-bold text-gray-900">96.8%</div>
          <div className="text-sm text-green-600 mt-1">+1.2% from last quarter</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">System Uptime</h4>
          <div className="text-2xl font-bold text-gray-900">99.9%</div>
          <div className="text-sm text-gray-600 mt-1">Stable</div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsSummary;