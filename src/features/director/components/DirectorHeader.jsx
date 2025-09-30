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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Director Dashboard</h1>
            <p className="text-gray-600">Manage school operations and analytics</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{systemStats.totalStudents}</div>
                <div className="text-sm text-gray-500">Total Students</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{systemStats.totalTeachers}</div>
                <div className="text-sm text-gray-500">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-yellow-600">{systemStats.pendingRegistrations}</div>
                <div className="text-sm text-gray-500">Pending Registrations</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-red-600">{systemStats.pendingFeeVerifications}</div>
                <div className="text-sm text-gray-500">Pending Fees</div>
              </div>
            </div>

            <button
              onClick={() => setShowAnnouncementModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              New Announcement
            </button>
          </div>
        </div>
      </div>

      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Announcement</h3>
            <form onSubmit={handleSubmitAnnouncement}>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Enter announcement message..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
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