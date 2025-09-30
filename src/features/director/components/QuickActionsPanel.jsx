// features/director/components/QuickActionsPanel.jsx
function QuickActionsPanel({ onAction }) {
  const quickActions = [
    {
      id: 'initiateRegistration',
      label: 'Initiate Annual Registration',
      description: 'Start the registration process for new academic year',
      icon: '📋',
      color: 'primary'
    },
    {
      id: 'generateReport',
      label: 'Generate Quarterly Report',
      description: 'Create comprehensive quarterly performance report',
      icon: '📊',
      color: 'info'
    },
    {
      id: 'manageUsers',
      label: 'Manage User Accounts',
      description: 'Add, edit, or deactivate user accounts',
      icon: '👥',
      color: 'secondary'
    },
    {
      id: 'systemBackup',
      label: 'System Backup',
      description: 'Create immediate system backup',
      icon: '💾',
      color: 'warning'
    }
  ];

  return (
    <div className="quick-actions-panel">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {quickActions.map(action => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className={`action-card ${action.color}`}
          >
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <div className="action-label">{action.label}</div>
              <div className="action-description">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActionsPanel;