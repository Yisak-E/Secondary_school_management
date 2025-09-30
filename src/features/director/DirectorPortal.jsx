// features/director/DirectorPortal.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DirectorHeader from './components/DirectorHeader';
import AnalyticsSummary from './components/AnalyticsSummary';
import StudentManagement from './components/StudentManagement';
import ReportGenerator from './components/ReportGenerator';
import SystemSettings from './components/SystemSettings';
import QuickActionsPanel from './components/QuickActionsPanel';
import './DirectorPortal.css';

function DirectorPortal() {
  const [announcements, setAnnouncements] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    pendingRegistrations: 0,
    pendingFeeVerifications: 0
  });

  // Mock data initialization
  useEffect(() => {
    // Simulate API call
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
        // Implementation would go here
        break;
      case 'generateReport':
        console.log('Generating quarterly report...');
        break;
      default:
        console.log('Action:', action);
    }
  };

  return (
    <div className="director-portal">
      <DirectorHeader
        onNewAnnouncement={handleNewAnnouncement}
        systemStats={systemStats}
      />

      <div className="portal-content">
        <aside className="portal-sidebar">
          <QuickActionsPanel onAction={handleQuickAction} />

          <div className="recent-announcements">
            <h3>Recent Announcements</h3>
            {announcements.length === 0 ? (
              <p className="no-announcements">No recent announcements</p>
            ) : (
              announcements.slice(0, 3).map(announcement => (
                <div key={announcement.id} className="announcement-item">
                  <p className="announcement-text">{announcement.text}</p>
                  <small className="announcement-time">{announcement.timestamp}</small>
                </div>
              ))
            )}
          </div>
        </aside>

        <main className="portal-main">
          <AnalyticsSummary stats={systemStats} />

          <Routes>
            <Route path="students" element={<StudentManagement />} />
            <Route path="reports" element={<ReportGenerator />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="/" element={
              <div className="welcome-message">
                <h2>Welcome to Director Portal</h2>
                <p>Use the navigation above to manage different aspects of the system.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default DirectorPortal;