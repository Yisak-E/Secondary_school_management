// components/student/StudentPortal.jsx
import { Routes, Route, Link, Outlet } from 'react-router-dom'

import StudentSchedule from './StudentSchedule.jsx'
import StudentGrades from './StudentGrades.jsx'
import StudentBooks from "./StudentBooks.jsx";

function StudentPortal({ user }) {
  return (
    <div className="student-portal">
      <h1>Welcome, {user.name}!</h1>

      {/* Nested navigation */}
      <nav className="student-nav">
        <Link to="/student">Dashboard</Link>
        <Link to="/student/schedule">Class Schedule</Link>
        <Link to="/student/grades">My Grades</Link>
        <Link to="/student/books">Textbooks</Link>
      </nav>

      {/* Nested routes */}
      <Routes>
        <Route path="/" element={<StudentPortal user={user} />} />
        <Route path="/schedule" element={<StudentSchedule user={user} />} />
        <Route path="/grades" element={<StudentGrades user={user} />} />
        <Route path="/books" element={<StudentBooks user={user} />} />
      </Routes>

      <Outlet /> {/* This renders the nested route components */}
    </div>
  )
}

export default StudentPortal