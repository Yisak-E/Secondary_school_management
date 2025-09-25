// components/Shared/Navigation.jsx
import { Link, useLocation } from 'react-router-dom'

function Navigation({ user, onLogout }) {
  const location = useLocation()

  const getNavLinks = () => {
    if (user.role === 'student') {
      return [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/student/schedule', label: 'Schedule' },
        { path: '/student/grades', label: 'Grades' },
        { path: '/student/books', label: 'Books' }
      ]
    }

    if (user.role === 'teacher') {
      return [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/teacher/grades', label: 'Grades' },
        { path: '/teacher/attendance', label: 'Attendance' }
      ]
    }

    if (user.role === 'director') {
      return [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/director/reports', label: 'Reports' },
        { path: '/director/students', label: 'Students' }
      ]
    }

    return []
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              EduManage
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {getNavLinks().map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path) 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center space-x-2 ml-4">
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation