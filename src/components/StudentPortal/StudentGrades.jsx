// components/StudentPortal/StudentGrades.jsx
import { useState, useEffect } from 'react';

export default function StudentGrades({ user }) {
  const [grades, setGrades] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('semester1');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockGrades = [
    { subject: 'Mathematics', semester1: 85, semester2: 88, teacher: 'Mr. Smith' },
    { subject: 'English', semester1: 92, semester2: 90, teacher: 'Ms. Johnson' },
    { subject: 'Science', semester1: 78, semester2: 85, teacher: 'Dr. Brown' },
    { subject: 'History', semester1: 88, semester2: 86, teacher: 'Mrs. Davis' },
    { subject: 'Geography', semester1: 91, semester2: 89, teacher: 'Mr. Wilson' },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGrades(mockGrades);
      setLoading(false);
    }, 1000);
  }, []);

  const calculateAverage = (semester) => {
    const total = grades.reduce((sum, grade) => sum + grade[semester], 0);
    return (total / grades.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading grades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">My Grades</h1>
          <p className="text-gray-600">View your academic performance and progress</p>
        </div>

        {/* Semester Selector */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedSemester('semester1')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedSemester === 'semester1'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semester 1
            </button>
            <button
              onClick={() => setSelectedSemester('semester2')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedSemester === 'semester2'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semester 2
            </button>
          </div>
        </div>

        {/* Average Grade */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm p-6 mb-6 text-white">
          <h2 className="text-lg font-semibold mb-2">Semester Average</h2>
          <div className="text-3xl font-bold">
            {calculateAverage(selectedSemester)}%
          </div>
          <p className="text-green-100 mt-2">Overall Performance</p>
        </div>

        {/* Grades Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {grades.map((grade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {grade.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {grade[selectedSemester]}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {grade.teacher}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          grade[selectedSemester] >= 80
                            ? 'bg-green-100 text-green-800'
                            : grade[selectedSemester] >= 70
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {grade[selectedSemester] >= 80
                          ? 'Excellent'
                          : grade[selectedSemester] >= 70
                          ? 'Good'
                          : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}