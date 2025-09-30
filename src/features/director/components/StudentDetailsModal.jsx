// features/director/components/StudentDetailsModal.jsx
function StudentDetailsModal({ student, onClose, onVerifyFee }) {
  if (!student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h3>Student Details</h3>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <div className="modal-body">
          <div className="student-profile">
            <div className="profile-section">
              <h4>Personal Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Full Name:</label>
                  <span>{student.name}</span>
                </div>
                <div className="info-item">
                  <label>Fayda ID:</label>
                  <span>{student.faydaId}</span>
                </div>
                <div className="info-item">
                  <label>Grade & Section:</label>
                  <span>{student.grade} - {student.section}</span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span className={`status-badge ${student.status}`}>
                    {student.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h4>Guardian Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Guardian Name:</label>
                  <span>{student.guardian.name}</span>
                </div>
                <div className="info-item">
                  <label>Phone Number:</label>
                  <span>{student.guardian.phone}</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h4>Academic Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Attendance Rate:</label>
                  <span>{student.attendance}</span>
                </div>
                <div className="info-item">
                  <label>Fee Status:</label>
                  <div className="fee-info">
                    <span className={`fee-status ${student.fees.verified ? 'verified' : 'pending'}`}>
                      {student.fees.verified ? 'Verified' : 'Pending Verification'}
                    </span>
                    {!student.fees.verified && (
                      <button
                        onClick={() => onVerifyFee(student.id)}
                        className="btn btn-sm btn-success"
                      >
                        Verify Fee
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailsModal;