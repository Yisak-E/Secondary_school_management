// components/Dashboard/Dashboard.jsx
import { useNavigate } from 'react-router-dom'

function Dashboard({ user }) {
  const navigate = useNavigate()

  const getWelcomeMessage = () => {
    return `Welcome, ${user.name}`
  }

  const getDashboardCards = () => {
    const baseCards = [
      { title: 'Class Schedule', path: '/student/schedule', icon: '📅', color: 'bg-blue-500' },
      { title: 'Textbooks', path: '/books', icon: '📚', color: 'bg-green-500' },
      { title: 'Announcements', path: '/announcements', icon: '📢', color: 'bg-yellow-500' }
    ]

    if (user.role === 'student') {
      return [...baseCards,
        { title: 'My Grades', path: '/student/grades', icon: '📊', color: 'bg-purple-500' }
      ]
    }

    if (user.role === 'teacher') {
      return [...baseCards,
        { title: 'Enter Grades', path: '/teacher/grades', icon: '✏️', color: 'bg-red-500' },
        { title: 'Attendance', path: '/teacher/attendance', icon: '✅', color: 'bg-indigo-500' }
      ]
    }

    if (user.role === 'director') {
      return [...baseCards,
        { title: 'Reports', path: '/director/reports', icon: '📈', color: 'bg-pink-500' },
        { title: 'All Students', path: '/director/students', icon: '👥', color: 'bg-teal-500' }
      ]
    }

    return baseCards
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{getWelcomeMessage()}</h1>
        <p className="text-gray-600">{user.school} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {getDashboardCards().map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform hover:scale-105 transition duration-200"
            onClick={() => navigate(card.path)}
          >
            <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
            <p className="text-gray-600 text-sm mt-2">Click to view</p>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4">
            <strong className="text-gray-900">Addis Ababa Day Celebration</strong>
            <p className="text-gray-600 text-sm">Starts at 10:00 AM in the main hall</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <strong className="text-gray-900">Parent-Teacher Meeting</strong>
            <p className="text-gray-600 text-sm">Scheduled for Friday this week</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard