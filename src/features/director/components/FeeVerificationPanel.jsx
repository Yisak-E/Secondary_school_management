// features/director/components/FeeVerificationPanel.jsx
function FeeVerificationPanel({ students, onClose, onVerifyFee }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h3>Fee Verification Panel</h3>
          <button onClick={onClose} className="btn-close">×</button>
        </div>

        <div className="modal-body">
          {students.length === 0 ? (
            <div className="empty-state">
              <p>No pending fee verifications</p>
            </div>
          ) : (
            <div className="pending-fees-list">
              {students.map(student => (
                <div key={student.id} className="fee-item">
                  <div className="fee-student-info">
                    <div className="student-name">{student.name}</div>
                    <div className="student-details">
                      {student.grade} - {student.section} | Fayda ID: {student.faydaId}
                    </div>
                    <div className="fee-amount">
                      Amount: ETB {student.fees.amount}
                    </div>
                  </div>

                  <div className="fee-actions">
                    <button
                      onClick={() => onVerifyFee(student.id)}
                      className="btn btn-success"
                    >
                      Verify Payment
                    </button>
                    <button className="btn btn-outline">
                      Request Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default FeeVerificationPanel;
