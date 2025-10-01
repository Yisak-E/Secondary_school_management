// components/TeacherPortal/TeacherAttendance.jsx
import { useState, useEffect } from 'react';

export default function TeacherAttendance({ user }) {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('grade10A');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  const mockClasses = [
    { id: 'grade10A', name: 'Grade 10A' },
    { id: 'grade10B', name: 'Grade 10B' },
    { id: 'grade11A', name: 'Grade 11A' },
  ];

  const mockStudents = [
    { id: 1, name: 'Alice Johnson', studentId: 'S1001', status: 'present' },
    { id: 2, name: 'Bob Smith', studentId: 'S1002', status: 'absent' },
    { id: 3, name: 'Carol Davis', studentId: 'S1003', status: 'present' },
    { id: 4, name: 'David Wilson', studentId: 'S1004', status: 'late' },
    { id: 5, name: 'Eva Brown', studentId: 'S1005', status: 'present' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setStudents(mockStudents);
      setLoading(false);
    }, 800);
  }, [selectedClass]);

  const handleStatusChange = (studentId, status) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const getStatusCount = (status) => {
    return students.filter(student => student.status === status).length;
  };

  const saveAttendance = () => {
    // Simulate API call to save attendance
    alert('Attendance saved successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance Management</h1>
          <p className="text-gray-600">Track and manage student attendance</p>
        </div>

        {/* Filters and Date */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {mockClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={saveAttendance}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2">{students.length}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{getStatusCount('present')}</div>
              <div className="text-sm text-green-600">Present</div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{getStatusCount('absent')}</div>
              <div className="text-sm text-red-600">Absent</div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">{getStatusCount('late')}</div>
              <div className="text-sm text-yellow-600">Late</div>
            </div>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Attendance for {mockClasses.find(cls => cls.id === selectedClass)?.name}
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {students.map((student) => (
              <div key={student.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-gray-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.studentId}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleStatusChange(student.id, 'present')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        student.status === 'present'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'absent')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        student.status === 'absent'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'late')}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        student.status === 'late'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Late
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}