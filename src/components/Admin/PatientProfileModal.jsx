import { HiUserCircle, HiPhone, HiMail, HiHome, HiClipboardList, HiShieldExclamation, HiUser } from 'react-icons/hi';

const PatientProfileModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Patient Profile</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <HiUserCircle className="w-32 h-32 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
                <div className="flex items-center mt-2 space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    patient.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                    patient.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {patient.gender}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                    Age: {patient.age}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    {patient.bloodType}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <HiMail className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-600">{patient.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiPhone className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <p className="text-gray-600">{patient.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiHome className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Address</p>
                    <p className="text-gray-600">{patient.address || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiUser className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Assigned Doctor</p>
                    <p className="text-gray-600">{patient.assignedDoctor || 'Not assigned'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiClipboardList className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Medical History</p>
                    <p className="text-gray-600">{patient.medicalHistory || 'No significant medical history'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiShieldExclamation className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Allergies</p>
                    <p className="text-gray-600">{patient.allergies || 'No known allergies'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="mt-1 mr-3 text-blue-600 flex-shrink-0 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-700">Last Visit</p>
                    <p className="text-gray-600">{patient.lastVisit || 'No visit recorded'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileModal;