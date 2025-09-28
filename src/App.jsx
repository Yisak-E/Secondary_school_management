// App.jsx
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Navigation from './components/Shared/Navigation'
import StudentGrades from './components/StudentPortal/StudentGrades'
import StudentSchedule from './components/StudentPortal/StudentSchedule'
import TeacherGrades from './components/TeacherPortal/TeacherGrades'
import DirectorReports from './components/DirectorPortal/DirectorReports'
import StudentBooks from "./components/StudentPortal/StudentBooks.jsx";
import Landing from './components/Landing'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('schoolUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('schoolUser', JSON.stringify(userData))
    navigate('/dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('schoolUser')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navigation user={user} onLogout={handleLogout} />}

      <main className={user ? "pt-16" : ""}>
        <Routes>
          <Route path='/' element={<Landing />}/>

          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          } />

          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/student/grades" element={
            user?.role === 'student' ? <StudentGrades user={user} /> : <Navigate to="/login" />
          } />

           <Route path="/student/books" element={
            user?.role === 'student' ? <StudentBooks user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/student/schedule" element={
            user?.role === 'student' ? <StudentSchedule user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/teacher/grades" element={
            user?.role === 'teacher' ? <TeacherGrades user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/director/reports" element={
            user?.role === 'director' ? <DirectorReports user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/" element={<Navigate to={user ? "/" : "/login"} />} />

          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App