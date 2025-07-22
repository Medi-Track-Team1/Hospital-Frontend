import { HiUserCircle, HiPhone, HiMail, HiAcademicCap, HiBriefcase, HiGlobe } from 'react-icons/hi';

const DoctorProfileModal = ({ isOpen, onClose, doctor }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Doctor Profile</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <HiUserCircle className="w-24 h-24 sm:w-32 sm:h-32 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-md sm:text-lg text-blue-600">{doctor.specialty}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs ${
                  doctor.status === 'active' ? 'bg-green-100 text-green-800' :
                  doctor.status === 'on leave' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {doctor.status}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <HiMail className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Email</p>
                    <p className="text-gray-600 break-all">{doctor.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiPhone className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Phone</p>
                    <p className="text-gray-600">{doctor.phone}</p>
                  </div>
                </div>

                {doctor.bio && (
                  <div className="flex items-start">
                    <div className="mt-1 mr-3 text-blue-600 flex-shrink-0">ℹ️</div>
                    <div>
                      <p className="font-medium text-gray-700">Bio</p>
                      <p className="text-gray-600">{doctor.bio}</p>
                    </div>
                  </div>
                )}

                {doctor.education && (
                  <div className="flex items-start">
                    <HiAcademicCap className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Education</p>
                      <p className="text-gray-600">{doctor.education}</p>
                    </div>
                  </div>
                )}

                {doctor.experience && (
                  <div className="flex items-start">
                    <HiBriefcase className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Experience</p>
                      <p className="text-gray-600">{doctor.experience}</p>
                    </div>
                  </div>
                )}

                {doctor.languages && doctor.languages.length > 0 && (
                  <div className="flex items-start">
                    <HiGlobe className="mt-1 mr-3 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Languages</p>
                      <p className="text-gray-600">{doctor.languages.join(', ')}</p>
                    </div>
                  </div>
                )}
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

export default DoctorProfileModal;