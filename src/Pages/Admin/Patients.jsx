import { useState } from 'react';
import FormModal from '../../components/Admin/FormModal';
import PatientProfileModal from '../../components/Admin/PatientProfileModal';

const Patients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  
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
    { 
      id: 2, 
      name: 'Jane Smith', 
      age: 32, 
      gender: 'Female', 
      bloodType: 'B-', 
      lastVisit: '2023-06-22',
      email: 'jane.smith@example.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Somewhere, USA',
      medicalHistory: 'Asthma, Migraines',
      allergies: 'None',
      assignedDoctor: 'Dr. Michael Chen'
    },
    { 
      id: 3, 
      name: 'Robert Brown', 
      age: 28, 
      gender: 'Male', 
      bloodType: 'O+', 
      lastVisit: '2023-07-10',
      email: 'robert.brown@example.com',
      phone: '(555) 345-6789',
      address: '789 Pine Rd, Nowhere, USA',
      medicalHistory: 'None',
      allergies: 'Shellfish',
      assignedDoctor: 'Dr. Emily Wilson'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      age: 60, 
      gender: 'Female', 
      bloodType: 'AB+', 
      lastVisit: '2023-06-05',
      email: 'emily.davis@example.com',
      phone: '(555) 456-7890',
      address: '101 Elm Blvd, Anywhere, USA',
      medicalHistory: 'Arthritis, Osteoporosis',
      allergies: 'Latex, Iodine',
      assignedDoctor: 'Dr. David Kim'
    }
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
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         patient.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender ? patient.gender.toLowerCase() === selectedGender.toLowerCase() : true;
    const matchesBloodType = selectedBloodType ? patient.bloodType.toLowerCase() === selectedBloodType.toLowerCase() : true;
    
    return matchesSearch && matchesGender && matchesBloodType;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patients Management</h1>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedPatient(null);
            setIsModalOpen(true);
          }}
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
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
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

      {/* Patients List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200 font-medium text-gray-700">
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Age</div>
          <div className="col-span-2">Gender</div>
          <div className="col-span-2">Blood Type</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="grid grid-cols-12 p-4 border-b border-gray-200 items-center hover:bg-gray-50">
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleEditPatient(patient)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleDeletePatient(patient.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            No patients found matching your criteria
          </div>
        )}
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
    </div>
  );
};

export default Patients;