// features/director/components/DirectorHeader.jsx
import { useState } from 'react';

function DirectorHeader({ onNewAnnouncement, systemStats }) {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');

  const handleSubmitAnnouncement = (e) => {
    e.preventDefault();
    if (announcementText.trim()) {
      onNewAnnouncement(announcementText.trim());
      setAnnouncementText('');
      setShowAnnouncementModal(false);
    }
  };

  return (
    <header className="director-header">
      <div className="header-content">
        <div className="header-title">
          <h1>Director Dashboard</h1>
          <p>Manage school operations and analytics</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{systemStats.totalStudents}</span>
            <span className="stat-label">Total Students</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{systemStats.totalTeachers}</span>
            <span className="stat-label">Teachers</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-number">{systemStats.pendingRegistrations}</span>
            <span className="stat-label">Pending Registrations</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-number">{systemStats.pendingFeeVerifications}</span>
            <span className="stat-label">Pending Fees</span>
          </div>
        </div>

        <div className="header-actions">
          <button 
            onClick={() => setShowAnnouncementModal(true)}
            className="btn btn-primary"
          >
            New Announcement
          </button>
        </div>
      </div>

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create New Announcement</h3>
            <form onSubmit={handleSubmitAnnouncement}>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Enter announcement message..."
                rows="4"
                className="announcement-textarea"
                required
              />
              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowAnnouncementModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

export default DirectorHeader;