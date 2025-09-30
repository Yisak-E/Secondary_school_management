// components/Dashboard/Dashboard.jsx
import { Link } from 'react-router-dom';

function Dashboard({ user }) {
  const getDashboardCards = () => {
    if (user.role === 'student') {
      return [
        {
          title: 'My Grades',
          description: 'View your current grades and academic performance',
          path: '/student/grades',
          icon: '📊',
          color: 'bg-blue-500'
        },
        {
          title: 'Class Schedule',
          description: 'Check your daily class timetable',
          path: '/student/schedule',
          icon: '📅',
          color: 'bg-green-500'
        },
        {
          title: 'Learning Materials',
          description: 'Access textbooks and study materials',
          path: '/student/books',
          icon: '📚',
          color: 'bg-purple-500'
        }
      ];
    }

    if (user.role === 'teacher') {
      return [
        {
          title: 'Grade Management',
          description: 'Enter and manage student grades',
          path: '/teacher/grades',
          icon: '📝',
          color: 'bg-blue-500'
        },
        {
          title: 'Attendance',
          description: 'Take and manage student attendance',
          path: '/teacher/attendance',
          icon: '✅',
          color: 'bg-green-500'
        },
        {
          title: 'Class Management',
          description: 'Manage your classes and students',
          path: '/teacher/classes',
          icon: '👥',
          color: 'bg-purple-500'
        }
      ];
    }

    if (user.role === 'director') {
      return [
        {
          title: 'Student Management',
          description: 'Manage all student records and registrations',
          path: '/director/students',
          icon: '👨‍🎓',
          color: 'bg-blue-500'
        },
        {
          title: 'Reports & Analytics',
          description: 'Generate comprehensive system reports',
          path: '/director/reports',
          icon: '📈',
          color: 'bg-green-500'
        },
        {
          title: 'System Settings',
          description: 'Configure school and system settings',
          path: '/director/settings',
          icon: '⚙️',
          color: 'bg-purple-500'
        },
        {
          title: 'Staff Management',
          description: 'Manage teachers and administrative staff',
          path: '/director/staff',
          icon: '👨‍🏫',
          color: 'bg-orange-500'
        }
      ];
    }

    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.displayName || user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user.role === 'student' && 'Check your academic progress and schedule'}
            {user.role === 'teacher' && 'Manage your classes and student performance'}
            {user.role === 'director' && 'Oversee school operations and analytics'}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getDashboardCards().map((card, index) => (
            <Link
              key={index}
              to={card.path}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center text-white text-xl`}>
                    {card.icon}
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900">{card.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats Section for Director */}
        {user.role === 'director' && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="text-2xl font-bold text-gray-900">1,524</div>
                <div className="text-gray-600">Total Students</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="text-2xl font-bold text-gray-900">87</div>
                <div className="text-gray-600">Teaching Staff</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                <div className="text-2xl font-bold text-gray-900">23</div>
                <div className="text-gray-600">Pending Registrations</div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                <div className="text-2xl font-bold text-gray-900">45</div>
                <div className="text-gray-600">Fee Verifications</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;