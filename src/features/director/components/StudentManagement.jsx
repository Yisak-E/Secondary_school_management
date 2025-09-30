// features/director/components/StudentManagement.jsx
import { useState, useEffect } from 'react';
import StudentDetailsModal from './StudentDetailsModal';
import FeeVerificationPanel from './FeeVerificationPanel';

function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showFeePanel, setShowFeePanel] = useState(false);
  const [filters, setFilters] = useState({
    grade: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: 'Abebe Kebede',
        grade: 'Grade 10',
        section: 'A',
        faydaId: 'F123456',
        status: 'active',
        fees: { paid: true, amount: 2500, verified: true },
        attendance: '95%',
        guardian: { name: 'Kebede Worku', phone: '+251911223344' }
      },
      {
        id: 2,
        name: 'Meron Alemu',
        grade: 'Grade 9',
        section: 'B',
        faydaId: 'F123457',
        status: 'pending',
        fees: { paid: false, amount: 2500, verified: false },
        attendance: '92%',
        guardian: { name: 'Alemu Tesfaye', phone: '+251922334455' }
      },
    ];

    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    let filtered = students;

    if (newFilters.grade) {
      filtered = filtered.filter(s => s.grade === newFilters.grade);
    }

    if (newFilters.status) {
      filtered = filtered.filter(s => s.status === newFilters.status);
    }

    if (newFilters.search) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        s.faydaId.includes(newFilters.search)
      );
    }

    setFilteredStudents(filtered);
  };

  const handleVerifyFee = (studentId) => {
    setStudents(prev => prev.map(s =>
      s.id === studentId
        ? { ...s, fees: { ...s.fees, verified: true } }
        : s
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <button
            onClick={() => setShowFeePanel(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
          >
            Manage Fee Verifications ({students.filter(s => !s.fees.verified).length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or Fayda ID..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <select
            value={filters.grade}
            onChange={(e) => handleFilterChange('grade', e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Grades</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fayda ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade & Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.faydaId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade} - {student.section}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.status === 'active' ? 'bg-green-100 text-green-800' :
                    student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    student.fees.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.fees.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.attendance}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowStudentModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showStudentModal && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setShowStudentModal(false)}
          onVerifyFee={handleVerifyFee}
        />
      )}

      {showFeePanel && (
        <FeeVerificationPanel
          students={students.filter(s => !s.fees.verified)}
          onClose={() => setShowFeePanel(false)}
          onVerifyFee={handleVerifyFee}
        />
      )}
    </div>
  );
}

export default StudentManagement;