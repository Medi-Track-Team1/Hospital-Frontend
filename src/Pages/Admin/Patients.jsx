import { useState } from 'react';
import { 
  HiUserCircle, 
  HiPhone, 
  HiMail,
  HiHome,
  HiClipboardList,
  HiShieldExclamation,
  HiUser,
  HiCalendar,
  HiHeart,
  HiSearch,
  HiTrash,
  HiPencil,
  HiEye
} from 'react-icons/hi';
import PatientCard from '../../components/Admin/PatientCard';
import FormModal from '../../components/Admin/FormModal';
import PatientProfileModal from '../../components/Admin/PatientProfileModal';
import DeleteConfirmationModal from '../../components/Admin/DeleteConfirmationModal';

const Patients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  
  const [patients, setPatients] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      age: 45, 
      gender: 'Male', 
      bloodType: 'A+', 
      lastVisit: '2023-05-15',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, USA',
      medicalHistory: 'Hypertension, Type 2 Diabetes',
      allergies: 'Penicillin, Peanuts',
      assignedDoctor: 'Dr. Sarah Johnson'
    },
  ]);

  const handleAddPatient = (newPatient) => {
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    setPatients([...patients, { ...newPatient, id: newId }]);
    setIsModalOpen(false);
  };

  const handleUpdatePatient = (updatedPatient) => {
    setPatients(patients.map(patient => 
      patient.id === updatedPatient.id ? updatedPatient : patient
    ));
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedPatient(null);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
    setIsProfileModalOpen(true);
  };

  const handleDeletePatient = (id) => {
    const patient = patients.find(p => p.id === id);
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  };

  const confirmDeletePatient = () => {
    setPatients(patients.filter(patient => patient.id !== patientToDelete.id));
    setDeleteModalOpen(false);
    setPatientToDelete(null);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.assignedDoctor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender ? patient.gender.toLowerCase() === selectedGender.toLowerCase() : true;
    const matchesBloodType = selectedBloodType ? patient.bloodType.toLowerCase() === selectedBloodType.toLowerCase() : true;
    
    return matchesSearch && matchesGender && matchesBloodType;
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Patients Management</h1>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedPatient(null);
            setIsModalOpen(true);
          }}
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Patient
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              <HiUserCircle className="w-10 h-10 text-gray-400" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{patient.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    patient.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 
                    'bg-pink-100 text-pink-800'
                  }`}>
                    {patient.gender}
                </span>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <span>Age: {patient.age}</span>
                  <span>Blood: {patient.bloodType}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <button 
                onClick={() => handleViewProfile(patient)}
                className="text-blue-600 text-sm font-medium"
              >
                View Details
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleEditPatient(patient)}
                  className="text-gray-600 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePatient(patient.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200 font-medium text-gray-700 text-sm">
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Age</div>
          <div className="col-span-2">Gender</div>
          <div className="col-span-2">Blood Type</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="grid grid-cols-12 p-4 border-b border-gray-200 items-center hover:bg-gray-50 text-sm">
            <div className="col-span-3 font-medium">{patient.name}</div>
            <div className="col-span-2 text-gray-600">{patient.age}</div>
            <div className="col-span-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                patient.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                patient.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {patient.gender}
              </span>
            </div>
            <div className="col-span-2 text-gray-600">{patient.bloodType}</div>
            <div className="col-span-3 flex justify-end space-x-2">
              <button 
                onClick={() => handleViewProfile(patient)}
                className="p-1 text-blue-600 hover:text-blue-800"
                title="View Profile"
              >
                <HiEye className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleEditPatient(patient)}
                className="p-1 text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <HiPencil className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDeletePatient(patient.id)}
                className="p-1 text-red-600 hover:text-red-800"
                title="Delete"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Patient Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedPatient(null);
        }}
        onSubmit={isEditMode ? handleUpdatePatient : handleAddPatient}
        title={isEditMode ? "Edit Patient" : "Add New Patient"}
        fields={[
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'age', label: 'Age', type: 'number', required: true },
          { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
          { name: 'bloodType', label: 'Blood Type', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], required: true },
          { name: 'lastVisit', label: 'Last Visit', type: 'date', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'address', label: 'Address', type: 'text', required: false },
          { name: 'medicalHistory', label: 'Medical History', type: 'textarea', required: false },
          { name: 'allergies', label: 'Allergies', type: 'textarea', required: false },
          { name: 'assignedDoctor', label: 'Assigned Doctor', type: 'text', required: false },
        ]}
        initialData={isEditMode ? selectedPatient : {}}
      />

      {/* Patient Profile Modal */}
      {selectedPatient && (
        <PatientProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          patient={selectedPatient}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeletePatient}
        itemType="patient"
        itemName={patientToDelete?.name || ''}
      />
    </div>
  );
};

export default Patients;