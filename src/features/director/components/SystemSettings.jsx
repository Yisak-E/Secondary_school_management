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
    // API call to save settings would go here
    alert('Settings saved successfully!');
  };

  return (
    <div className="system-settings">
      <h2>System Settings</h2>
      
      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button 
          className={`tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          Academic
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && (
          <div className="settings-group">
            <div className="setting-item">
              <label>Academic Year</label>
              <input
                type="text"
                value={settings.academicYear}
                onChange={(e) => handleSettingChange('academicYear', e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="setting-item">
              <label>Maximum Class Size</label>
              <input
                type="number"
                value={settings.maxClassSize}
                onChange={(e) => handleSettingChange('maxClassSize', parseInt(e.target.value))}
                className="form-input"
                min="20"
                max="50"
              />
            </div>
            
            <div className="setting-item">
              <label>Fee Payment Deadline</label>
              <input
                type="date"
                value={settings.feeDeadline}
                onChange={(e) => handleSettingChange('feeDeadline', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="settings-group">
            <div className="setting-item">
              <label>Minimum Attendance Percentage</label>
              <input
                type="number"
                value={settings.attendanceThreshold}
                onChange={(e) => handleSettingChange('attendanceThreshold', parseInt(e.target.value))}
                className="form-input"
                min="50"
                max="100"
              />
              <small>Students below this percentage will be flagged</small>
            </div>
            
            <div className="setting-item">
              <label>Grading Scale</label>
              <select className="form-select" defaultValue="percentage">
                <option value="percentage">Percentage (0-100%)</option>
                <option value="letter">Letter Grade (A-F)</option>
                <option value="gpa">GPA (4.0 Scale)</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="settings-group">
            <div className="setting-item checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                />
                Enable Email Notifications
              </label>
            </div>
            
            <div className="setting-item checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.automaticBackups}
                  onChange={(e) => handleSettingChange('automaticBackups', e.target.checked)}
                />
                Automatic Daily Backups
              </label>
            </div>
            
            <div className="setting-item checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={settings.systemMaintenance}
                  onChange={(e) => handleSettingChange('systemMaintenance', e.target.checked)}
                />
                System Maintenance Mode
              </label>
              <small>When enabled, only administrators can access the system</small>
            </div>
          </div>
        )}
      </div>

      <div className="settings-actions">
        <button onClick={handleSaveSettings} className="btn btn-primary">
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
          className="btn btn-secondary"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

export default SystemSettings;