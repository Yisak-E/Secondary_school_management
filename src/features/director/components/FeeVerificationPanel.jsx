// features/director/components/FeeVerificationPanel.jsx
function FeeVerificationPanel({ students, onClose, onVerifyFee }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Fee Verification Panel</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {students.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎉</div>
              <p className="text-gray-500 text-lg">No pending fee verifications</p>
              <p className="text-gray-400 text-sm mt-2">All fees have been verified</p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map(student => (
                <div key={student.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {student.grade} - {student.section} | Fayda ID: {student.faydaId}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mt-2">
                      Amount: ETB {student.fees.amount}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onVerifyFee(student.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                    >
                      Verify Payment
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm border border-gray-300">
                      Request Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeeVerificationPanel;