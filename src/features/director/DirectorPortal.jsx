// features/director/DirectorPortal.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DirectorHeader from './components/DirectorHeader';
import AnalyticsSummary from './components/AnalyticsSummary';
import StudentManagement from './components/StudentManagement';
import ReportGenerator from './components/ReportGenerator';
import SystemSettings from './components/SystemSettings';
import QuickActionsPanel from './components/QuickActionsPanel';

function DirectorPortal() {
  const [announcements, setAnnouncements] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    pendingRegistrations: 0,
    pendingFeeVerifications: 0
  });

  useEffect(() => {
    const fetchSystemStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSystemStats({
        totalStudents: 1524,
        totalTeachers: 87,
        pendingRegistrations: 23,
        pendingFeeVerifications: 45
      });
    };

    fetchSystemStats();
  }, []);

  const handleNewAnnouncement = (announcementText) => {
    const newAnnouncement = {
      id: Date.now(),
      text: announcementText,
      timestamp: new Date().toLocaleString(),
      priority: 'medium'
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'initiateRegistration':
        console.log('Initiating annual registration...');
        break;
      case 'generateReport':
        console.log('Generating quarterly report...');
        break;
      default:
        console.log('Action:', action);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DirectorHeader
        onNewAnnouncement={handleNewAnnouncement}
        systemStats={systemStats}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-80 flex-shrink-0">
            <QuickActionsPanel onAction={handleQuickAction} />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h3>
              {announcements.length === 0 ? (
                <p className="text-gray-500 text-sm italic text-center">No recent announcements</p>
              ) : (
                announcements.slice(0, 3).map(announcement => (
                  <div key={announcement.id} className="border-l-4 border-blue-500 bg-blue-50 p-3 mb-3 last:mb-0">
                    <p className="text-sm text-gray-800 mb-1">{announcement.text}</p>
                    <small className="text-xs text-gray-500">{announcement.timestamp}</small>
                  </div>
                ))
              )}
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <AnalyticsSummary stats={systemStats} />

            <Routes>
              <Route path="students" element={<StudentManagement />} />
              <Route path="reports" element={<ReportGenerator />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="/" element={
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Director Portal</h2>
                  <p className="text-gray-600">Use the navigation above to manage different aspects of the system.</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DirectorPortal;