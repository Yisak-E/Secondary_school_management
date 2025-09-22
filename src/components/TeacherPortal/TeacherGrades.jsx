// components/TeacherPortal/TeacherGrades.jsx
import { useState } from 'react'
import './TeacherGrades.css'

function TeacherGrades({ user }) {
  const [students] = useState([
    { id: 1, name: 'Yonas Mekonnen', math: 85, english: 92, physics: 78 },
    { id: 2, name: 'Selamawit Abebe', math: 92, english: 88, physics: 95 },
    { id: 3, name: 'Mikias Getachew', math: 76, english: 85, physics: 82 }
  ])

  const [editing, setEditing] = useState(null)

  const t = {
    title: user.language === 'am' ? 'ነጥብ ማስገባት' : 'Grade Management',
    student: user.language === 'am' ? 'ተማሪ' : 'Student',
    math: 'Mathematics',
    english: 'English',
    physics: 'Physics',
    actions: user.language === 'am' ? 'ድርጊቶች' : 'Actions',
    save: user.language === 'am' ? 'አስቀምጥ' : 'Save',
    edit: user.language === 'am' ? 'አስተካክል' : 'Edit'
  }

  const handleGradeChange = (studentId, subject, value) => {
    // Update grade logic here
    console.log(`Updating ${subject} for student ${studentId}: ${value}`)
  }

  return (
    <div className="teacher-grades">
      <h1>{t.title}</h1>
      <p>Grade 11 - Section A</p>

      <div className="grades-table">
        <div className="table-header">
          <span>{t.student}</span>
          <span>{t.math}</span>
          <span>{t.english}</span>
          <span>{t.physics}</span>
          <span>{t.actions}</span>
        </div>

        {students.map((student) => (
          <div key={student.id} className="table-row">
            <span>{student.name}</span>
            <input
              type="number"
              defaultValue={student.math}
              onChange={(e) => handleGradeChange(student.id, 'math', e.target.value)}
              disabled={editing !== student.id}
            />
            <input
              type="number"
              defaultValue={student.english}
              onChange={(e) => handleGradeChange(student.id, 'english', e.target.value)}
              disabled={editing !== student.id}
            />
            <input
              type="number"
              defaultValue={student.physics}
              onChange={(e) => handleGradeChange(student.id, 'physics', e.target.value)}
              disabled={editing !== student.id}
            />
            <button
              onClick={() => setEditing(editing === student.id ? null : student.id)}
              className="edit-btn"
            >
              {editing === student.id ? t.save : t.edit}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeacherGrades