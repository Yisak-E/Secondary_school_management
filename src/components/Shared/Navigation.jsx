// components/Shared/NavigationBar.jsx
import { Link, useLocation } from 'react-router-dom';

function NavigationBar({ user, onLogout }) {
  const location = useLocation();

  const getNavLinks = () => {
    if (user.role === 'student') {
      return [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/student/schedule', label: 'Schedule' },
        { path: '/student/grades', label: 'Grades' },
        { path: '/student/books', label: 'Books' }
      ];
    }

    if (user.role === 'teacher') {
      return [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/teacher/grades', label: 'Grades' },
        { path: '/teacher/attendance', label: 'Attendance' }
      ];
    }

    if (user.role === 'director') {
      return [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/director/students', label: 'Students' },
        { path: '/director/reports', label: 'Reports' },
        { path: '/director/settings', label: 'Settings' }
      ];
    }

    return [];
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              EduManage
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {getNavLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* User Info and Logout */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-semibold">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700 hidden sm:block">
                  Welcome, {user.displayName || user.email.split('@')[0]}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 border border-gray-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;