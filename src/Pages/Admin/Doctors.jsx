import { useState } from 'react';
import { 
  HiMail, 
  HiPhone, 
  HiStatusOnline,
  HiUserCircle,
  HiAcademicCap,
  HiBriefcase,
  HiGlobe,
  HiSearch,
  HiTrash,
  HiPencil,
  HiEye,
  HiPhotograph
} from 'react-icons/hi';
import FormModal from '../../components/Admin/FormModal';
import DoctorProfileModal from '../../components/Admin/DoctorProfileModal';
import DeleteConfirmationModal from '../../components/Admin/DeleteConfirmationModal';

const Doctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  
  // Sample doctor data with profile photos
  const [doctors, setDoctors] = useState([
    { 
      id: 1, 
      name: 'Dr. Subeer', 
      specialty: 'Cardiology', 
      availability: 'Available',
      nmrId: 'NMR-98403',
      email: 's.johnson@hospital.com',
      phone: '(555) 123-4567',
      bio: 'Board-certified cardiologist with 10 years of experience. Specializes in interventional cardiology.',
      education: 'MD from Harvard Medical School',
      experience: 'Chief of Cardiology at City Hospital (2015-Present)',
      languages: ['English', 'Spanish'],
      status: 'active',
      profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
        password: 'meditrack' 
    },
    { 
      id: 2, 
      name: 'Dr. Darshan', 
      specialty: 'Neurology', 
      availability: 'Available',
      nmrId: 'NMR-78251',
      email: 'm.chen@hospital.com',
      phone: '(555) 234-5678',
      bio: 'Neurologist specializing in movement disorders and neurodegenerative diseases.',
      education: 'MD from Johns Hopkins University, Fellowship in Movement Disorders',
      experience: '15 years at NeuroCare Center',
      languages: ['English', 'Mandarin'],
      status: 'active',
      profilePhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
       password: 'meditrack' 
    },
    { 
      id: 3, 
      name: 'Dr. Guna', 
      specialty: 'Pediatrics', 
      availability: 'On Leave',
     nmrId: 'NMR-63942',
      email: 'p.patel@hospital.com',
      phone: '(555) 345-6789',
      bio: 'Pediatrician with special interest in childhood immunology and allergies.',
      education: 'MD from Stanford University, Pediatric Residency at Boston Children\'s',
      experience: '8 years in pediatric practice',
      languages: ['English', 'Hindi', 'Gujarati'],
      status: 'on leave',
      profilePhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
       password: 'meditrack' 
    },
    { 
      id: 4, 
      name: 'Dr. Pojith', 
      specialty: 'Orthopedics', 
      availability: 'Busy',
      nmrId: 'NMR-45781',
      email: 'r.williams@hospital.com',
      phone: '(555) 456-7890',
      bio: 'Orthopedic surgeon specializing in sports medicine and joint replacements.',
      education: 'MD from Duke University, Orthopedic Surgery Residency at Mayo Clinic',
      experience: '12 years in orthopedic surgery',
      languages: ['English', 'French'],
      status: 'active',
      profilePhoto: 'https://randomuser.me/api/portraits/men/4.jpg',
       password: 'meditrack' 
    },
    { 
      id: 5, 
      name: 'Dr. Lisa Rodriguez', 
      specialty: 'Dermatology', 
      availability: 'Available',
      nmrId: 'NMR-56823',
      email: 'l.rodriguez@hospital.com',
      phone: '(555) 567-8901',
      bio: 'Cosmetic dermatologist with expertise in laser treatments and skin rejuvenation.',
      education: 'MD from UCLA, Dermatology Residency at NYU Langone',
      experience: '7 years in dermatology practice',
      languages: ['English', 'Spanish', 'Portuguese'],
      status: 'active',
      profilePhoto: 'https://randomuser.me/api/portraits/women/5.jpg',
       password: 'meditrack' 
    }
  ]);

 const handleAddDoctor = (newDoctor) => {
  const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;

  // Remove confirmPassword before saving (it's only for validation)
  const {  ...doctorData } = newDoctor;

  const profilePhoto = newDoctor.profilePhoto instanceof File 
    ? URL.createObjectURL(newDoctor.profilePhoto) 
    : newDoctor.profilePhoto || 'https://randomuser.me/api/portraits/lego/1.jpg';

  setDoctors([...doctors, { 
    ...doctorData, // Use the cleaned data without confirmPassword
    id: newId,
    status: 'active',
    profilePhoto,
    languages: typeof newDoctor.languages === 'string' ? 
      newDoctor.languages.split(',').map(lang => lang.trim()) : 
      newDoctor.languages || []
  }]);
  setIsModalOpen(false);
};
  const handleUpdateDoctor = (updatedDoctor) => {
     setDoctors(doctors.map(doctor => 
    doctor.id === updatedDoctor.id ? { 
      ...updatedDoctor,
      profilePhoto: updatedDoctor.profilePhoto instanceof File 
        ? URL.createObjectURL(updatedDoctor.profilePhoto) 
        : updatedDoctor.profilePhoto || doctor.profilePhoto,
      languages: typeof updatedDoctor.languages === 'string' ? 
        updatedDoctor.languages.split(',').map(lang => lang.trim()) : 
        updatedDoctor.languages || []
    } : doctor
  ));
  setIsModalOpen(false);
  setIsEditMode(false);
  setSelectedDoctor(null);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor({
      ...doctor,
      // Convert languages array to comma-separated string for the form
      languages: Array.isArray(doctor.languages) ? doctor.languages.join(', ') : doctor.languages
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setIsProfileModalOpen(true);
  };

  const handleDeleteDoctor = (id) => {
    const doctor = doctors.find(d => d.id === id);
    setDoctorToDelete(doctor);
    setDeleteModalOpen(true);
  };

  const confirmDeleteDoctor = () => {
    setDoctors(doctors.filter(doctor => doctor.id !== doctorToDelete.id));
    setDeleteModalOpen(false);
    setDoctorToDelete(null);
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase() : true;
    const matchesStatus = selectedStatus ? doctor.status.toLowerCase() === selectedStatus.toLowerCase() : true;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Doctors Management</h1>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedDoctor(null);
            setIsModalOpen(true);
          }}
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Doctor
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
                placeholder="Search doctors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Hepatology">Hepatology</option>
              <option value="Psychology">Psychology</option>
              <option value="Dental">Dental</option>
              <option value="Eye Care">Eye Care</option>
              <option value="Fertility">Fertility</option>
              
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="on leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex items-center space-x-3">
              {doctor.profilePhoto ? (
                <img 
                  src={doctor.profilePhoto} 
                  alt={doctor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <HiUserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{doctor.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    doctor.status === 'active' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doctor.status}
                  </span>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <span>{doctor.specialty}</span>
                  <span>{doctor.availability}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <button 
                onClick={() => handleViewProfile(doctor)}
                className="text-blue-600 text-sm font-medium"
              >
                View
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditDoctor(doctor)}
                  className="text-gray-600 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteDoctor(doctor.id)}
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
          <div className="col-span-2">Photo</div>
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Doc-Id</div>
          <div className="col-span-2">Specialty</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-1 text-left">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="grid grid-cols-12 p-4 border-b border-gray-200 items-center hover:bg-gray-50 text-sm"
          >
            {/* Photo */}
            <div className="col-span-2">
              {doctor.profilePhoto ? (
                <img 
                  src={doctor.profilePhoto} 
                  alt={doctor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <HiUserCircle className="w-10 h-10 text-gray-400" />
              )}
            </div>

            {/* Name */}
            <div className="col-span-2 font-medium truncate">{doctor.name}</div>

            {/* Doctor ID */}
            <div className="col-span-2 text-gray-600 truncate">{doctor.docId}</div>

            {/* Specialty */}
            <div className="col-span-2 text-gray-600 truncate">{doctor.specialty}</div>

            {/* Email and Phone */}
            <div className="col-span-2">
              <div className="text-gray-600 truncate">{doctor.email}</div>
              <div className="text-sm text-gray-500 truncate">{doctor.phone}</div>
            </div>

            {/* Status */}
            <div className="col-span-1 text-left">
              <span
                className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                  doctor.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {doctor.status}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end space-x-2">
              <button
                onClick={() => handleViewProfile(doctor)}
                className="p-1 text-blue-600 hover:text-blue-800"
                title="View Profile"
              >
                <HiEye className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleEditDoctor(doctor)}
                className="p-1 text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <HiPencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteDoctor(doctor.id)}
                className="p-1 text-red-600 hover:text-red-800"
                title="Delete"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Doctor Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditMode(false);
          setSelectedDoctor(null);
        }}
        onSubmit={isEditMode ? handleUpdateDoctor : handleAddDoctor}
        title={isEditMode ? "Edit Doctor" : "Add New Doctor"}
        fields={[
          { 
            name: 'profilePhoto', 
            label: 'Profile Photo', 
            type: 'file', 
            required: false,
            accept: 'image/*',
            icon: <HiPhotograph className="mr-2" />,
            currentValue: isEditMode ? selectedDoctor?.profilePhoto : null
          },
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'specialty', label: 'Specialty', type: 'select', 
            options: ['Cardiology', 'Neurology', 'Pediatrics', 'Hepatology', 'Psychology', 'Dental', 'Eye Care','Fertility'], 
            required: true 
          },
          {
            name: 'nmrId',
            label: 'NMR-ID',
            type: 'text',
            required: true,
          },
          { name: 'email', label: 'Email', type: 'email', required: true },
          
          {
            name: 'password',
            label: 'Password',
            type: 'password',
            required: true,
            pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", // Minimum 8 chars, at least 1 letter and 1 number
            title: "Password must be at least 8 characters with at least 1 letter and 1 number",
            placeholder: "Enter password (min 8 characters)"
          },
          {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            required: true,
            validate: (value, formData) => value === formData.password,
            errorMessage: "Passwords must match",
            placeholder: "Re-enter your password"
          },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'bio', label: 'Bio', type: 'textarea', required: false },
          { name: 'education', label: 'Education', type: 'text', required: false },
          { name: 'experience', label: 'Experience', type: 'textarea', required: false },
          { name: 'languages', label: 'Languages (comma separated)', type: 'text', required: false },
          { name: 'availability', label: 'Availability', type: 'select', 
            options: ['Available', 'On Leave', 'Busy'], 
            required: true 
          },
        ]}
        initialData={isEditMode ? selectedDoctor : {}}
      />

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <DoctorProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          doctor={selectedDoctor}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteDoctor}
        itemType="doctor"
        itemName={doctorToDelete?.name || ''}
      />
    </div>
  );
};

export default Doctors;