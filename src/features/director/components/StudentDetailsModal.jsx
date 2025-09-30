// features/director/components/StudentDetailsModal.jsx
function StudentDetailsModal({ student, onClose, onVerifyFee }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Student Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Full Name</label>
                  <p className="mt-1 text-sm text-gray-900">{student.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Fayda ID</label>
                  <p className="mt-1 text-sm text-gray-900">{student.faydaId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Grade & Section</label>
                  <p className="mt-1 text-sm text-gray-900">{student.grade} - {student.section}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex mt-1 px-2 py-1 text-xs font-semibold rounded-full ${
                    student.status === 'active' ? 'bg-green-100 text-green-800' :
                    student.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {student.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Guardian Name</label>
                  <p className="mt-1 text-sm text-gray-900">{student.guardian.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="mt-1 text-sm text-gray-900">{student.guardian.phone}</p>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Attendance Rate</label>
                  <p className="mt-1 text-sm text-gray-900">{student.attendance}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Fee Status</label>
                  <div className="mt-1 flex items-center space-x-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.fees.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.fees.verified ? 'Verified' : 'Pending Verification'}
                    </span>
                    {!student.fees.verified && (
                      <button
                        onClick={() => onVerifyFee(student.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-200"
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

export default StudentDetailsModal;