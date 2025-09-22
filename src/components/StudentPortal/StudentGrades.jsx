// components/StudentPortal/StudentGrades.jsx
function StudentGrades({ user }) {
  const mockGrades = [
    { subject: 'Mathematics', grade: 'A', percentage: 95, teacher: 'Mr. Alemayehu' },
    { subject: 'Physics', grade: 'B+', percentage: 88, teacher: 'Ms. Selam' },
    { subject: 'English', grade: 'A-', percentage: 92, teacher: 'Mr. John' },
    { subject: 'Chemistry', grade: 'A', percentage: 96, teacher: 'Ms. Tigist' }
  ]

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'A-': return 'bg-green-50 text-green-700';
      case 'B+': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Academic Grades</h1>
        <p className="text-gray-600">First Semester - 2024</p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 font-semibold text-gray-900">
          <div>Subject</div>
          <div>Grade</div>
          <div>Percentage</div>
          <div>Teacher</div>
        </div>

        {mockGrades.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 p-4 border-t border-gray-200 hover:bg-gray-50">
            <div className="font-medium text-gray-900">{item.subject}</div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(item.grade)}`}>
                {item.grade}
              </span>
            </div>
            <div className="text-gray-600">{item.percentage}%</div>
            <div className="text-gray-600">{item.teacher}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentGrades