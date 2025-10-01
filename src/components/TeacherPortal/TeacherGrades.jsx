// components/TeacherPortal/TeacherGrades.jsx
import { useState, useEffect } from 'react';

export default function TeacherGrades({ user }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('grade10A');
  const [selectedSubject, setSelectedSubject] = useState('mathematics');
  const [loading, setLoading] = useState(true);
  const [editingGrade, setEditingGrade] = useState(null);

  // Mock data - replace with actual API calls
  const mockClasses = [
    { id: 'grade10A', name: 'Grade 10A', subjects: ['mathematics', 'physics', 'chemistry'] },
    { id: 'grade10B', name: 'Grade 10B', subjects: ['mathematics', 'biology'] },
    { id: 'grade11A', name: 'Grade 11A', subjects: ['physics', 'chemistry'] },
  ];

  const mockStudents = [
    {
      id: 1,
      name: 'Alice Johnson',
      studentId: 'S1001',
      grades: { mathematics: 85, physics: 78, chemistry: 92 },
      attendance: '95%'
    },
    {
      id: 2,
      name: 'Bob Smith',
      studentId: 'S1002',
      grades: { mathematics: 72, physics: 85, chemistry: 68 },
      attendance: '88%'
    },
    {
      id: 3,
      name: 'Carol Davis',
      studentId: 'S1003',
      grades: { mathematics: 91, physics: 89, chemistry: 94 },
      attendance: '97%'
    },
    {
      id: 4,
      name: 'David Wilson',
      studentId: 'S1004',
      grades: { mathematics: 68, physics: 72, chemistry: 65 },
      attendance: '82%'
    },
    {
      id: 5,
      name: 'Eva Brown',
      studentId: 'S1005',
      grades: { mathematics: 88, physics: 84, chemistry: 79 },
      attendance: '91%'
    },
  ];

  const subjects = {
    mathematics: 'Mathematics',
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology'
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, [selectedClass, selectedSubject]);

  const handleGradeUpdate = (studentId, newGrade) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId
        ? { ...student, grades: { ...student.grades, [selectedSubject]: newGrade } }
        : student
    ));
    setEditingGrade(null);
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600 bg-green-100';
    if (grade >= 80) return 'text-blue-600 bg-blue-100';
    if (grade >= 70) return 'text-yellow-600 bg-yellow-100';
    if (grade >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const calculateClassAverage = () => {
    const grades = students.map(student => student.grades[selectedSubject] || 0);
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    return average.toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Grade Management</h1>
              <p className="text-gray-600">Manage and update student grades</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {user?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {mockClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {mockClasses.find(cls => cls.id === selectedClass)?.subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subjects[subject]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">{students.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-green-600 text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Class Average</p>
                <p className="text-2xl font-bold text-gray-800">{calculateClassAverage()}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-yellow-600 text-2xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Top Student</p>
                <p className="text-lg font-bold text-gray-800">
                  {students.reduce((top, student) =>
                    (student.grades[selectedSubject] > (top.grade || 0))
                      ? { name: student.name.split(' ')[0], grade: student.grades[selectedSubject] }
                      : top, { name: '', grade: 0 }).name}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-red-600 text-2xl">📉</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Need Help</p>
                <p className="text-2xl font-bold text-gray-800">
                  {students.filter(s => s.grades[selectedSubject] < 70).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {subjects[selectedSubject]} - {mockClasses.find(cls => cls.id === selectedClass)?.name}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.attendance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingGrade === student.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            defaultValue={student.grades[selectedSubject]}
                            onBlur={(e) => handleGradeUpdate(student.id, parseInt(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                            autoFocus
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      ) : (
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getGradeColor(student.grades[selectedSubject])}`}>
                          {student.grades[selectedSubject]}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.grades[selectedSubject] >= 80
                          ? 'bg-green-100 text-green-800'
                          : student.grades[selectedSubject] >= 70
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.grades[selectedSubject] >= 80
                          ? 'Excellent'
                          : student.grades[selectedSubject] >= 70
                          ? 'Good'
                          : 'Needs Help'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setEditingGrade(student.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Edit
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Bulk Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Export to Excel
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Print Grades
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Send Progress Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}