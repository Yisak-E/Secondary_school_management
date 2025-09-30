// features/director/components/QuickActionsPanel.jsx
function QuickActionsPanel({ onAction }) {
  const quickActions = [
    {
      id: 'initiateRegistration',
      label: 'Initiate Annual Registration',
      description: 'Start the registration process for new academic year',
      icon: '📋',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'generateReport',
      label: 'Generate Quarterly Report',
      description: 'Create comprehensive quarterly performance report',
      icon: '📊',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'manageUsers',
      label: 'Manage User Accounts',
      description: 'Add, edit, or deactivate user accounts',
      icon: '👥',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'systemBackup',
      label: 'System Backup',
      description: 'Create immediate system backup',
      icon: '💾',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white hover:bg-gray-50"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center text-white text-lg transition-colors duration-200`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {action.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {action.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActionsPanel;