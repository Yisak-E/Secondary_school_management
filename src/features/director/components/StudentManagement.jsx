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

  // Mock data
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
      // Add more mock students as needed
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
    <div className="student-management">
      <div className="section-header">
        <h2>Student Management</h2>
        <div className="header-actions">
          <button 
            onClick={() => setShowFeePanel(true)}
            className="btn btn-warning"
          >
            Manage Fee Verifications ({students.filter(s => !s.fees.verified).length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <input
          type="text"
          placeholder="Search by name or Fayda ID..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />
        
        <select 
          value={filters.grade}
          onChange={(e) => handleFilterChange('grade', e.target.value)}
          className="filter-select"
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
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Fayda ID</th>
              <th>Grade & Section</th>
              <th>Status</th>
              <th>Fee Status</th>
              <th>Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.faydaId}</td>
                <td>{student.grade} - {student.section}</td>
                <td>
                  <span className={`status-badge ${student.status}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <span className={`fee-status ${student.fees.verified ? 'verified' : 'pending'}`}>
                    {student.fees.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td>{student.attendance}</td>
                <td>
                  <button 
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowStudentModal(true);
                    }}
                    className="btn btn-sm btn-outline"
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