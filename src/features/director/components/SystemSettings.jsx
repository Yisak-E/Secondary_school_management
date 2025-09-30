// features/director/components/SystemSettings.jsx
import { useState } from 'react';

function SystemSettings() {
  const [settings, setSettings] = useState({
    academicYear: '2025-2026',
    maxClassSize: 40,
    attendanceThreshold: 75,
    feeDeadline: '2025-12-31',
    systemMaintenance: false,
    automaticBackups: true,
    emailNotifications: true
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'academic' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('academic')}
          >
            Academic
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'general' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <input
                type="text"
                value={settings.academicYear}
                onChange={(e) => handleSettingChange('academicYear', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Class Size</label>
              <input
                type="number"
                value={settings.maxClassSize}
                onChange={(e) => handleSettingChange('maxClassSize', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="20"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fee Payment Deadline</label>
              <input
                type="date"
                value={settings.feeDeadline}
                onChange={(e) => handleSettingChange('feeDeadline', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Attendance Percentage</label>
              <input
                type="number"
                value={settings.attendanceThreshold}
                onChange={(e) => handleSettingChange('attendanceThreshold', parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50"
                max="100"
              />
              <p className="mt-1 text-sm text-gray-500">Students below this percentage will be flagged</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grading Scale</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" defaultValue="percentage">
                <option value="percentage">Percentage (0-100%)</option>
                <option value="letter">Letter Grade (A-F)</option>
                <option value="gpa">GPA (4.0 Scale)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">Enable Email Notifications</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={settings.automaticBackups}
                onChange={(e) => handleSettingChange('automaticBackups', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-700">Automatic Daily Backups</label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                checked={settings.systemMaintenance}
                onChange={(e) => handleSettingChange('systemMaintenance', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <div className="ml-3">
                <label className="text-sm text-gray-700">System Maintenance Mode</label>
                <p className="text-sm text-gray-500">When enabled, only administrators can access the system</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button onClick={handleSaveSettings} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Save Settings
          </button>
          <button
            onClick={() => setSettings({
              academicYear: '2025-2026',
              maxClassSize: 40,
              attendanceThreshold: 75,
              feeDeadline: '2025-12-31',
              systemMaintenance: false,
              automaticBackups: true,
              emailNotifications: true
            })}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;