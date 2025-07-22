import { useState } from 'react';
import DoctorCard from '../../components/Admin/DoctorCard';
import FormModal from '../../components/Admin/FormModal';
import DoctorProfileModal from '../../components/Admin/DoctorProfileModal';

const Doctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  const [doctors, setDoctors] = useState([
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      specialty: 'Cardiology', 
      email: 's.johnson@hospital.com', 
      phone: '(555) 123-4567', 
      status: 'active',
      bio: 'Board-certified cardiologist with 10 years of experience specializing in interventional cardiology.',
      education: 'MD from Harvard Medical School, Fellowship in Cardiology at Mayo Clinic',
      experience: 'Chief of Cardiology at City Hospital (2015-2020), Senior Cardiologist at Metro Medical Center',
      languages: ['English', 'Spanish'],
      joinDate: '2012-05-15'
    },
    { 
      id: 2, 
      name: 'Dr. Michael Chen', 
      specialty: 'Neurology', 
      email: 'm.chen@hospital.com', 
      phone: '(555) 234-5678', 
      status: 'on leave',
      bio: 'Neurology specialist focusing on movement disorders and neurodegenerative diseases.',
      education: 'PhD in Neuroscience from Stanford University, MD from Johns Hopkins',
      experience: 'Researcher at National Neurology Institute, Clinical Neurologist at Brain Health Center',
      languages: ['English', 'Mandarin', 'Cantonese'],
      joinDate: '2015-08-22'
    },
    { 
      id: 3, 
      name: 'Dr. Emily Wilson', 
      specialty: 'Pediatrics', 
      email: 'e.wilson@hospital.com', 
      phone: '(555) 345-6789', 
      status: 'active',
      bio: 'Pediatrician dedicated to child wellness, development, and preventive care.',
      education: 'MD from Johns Hopkins University, Residency at Boston Children\'s Hospital',
      experience: 'Pediatric Resident at Children\'s Hospital, Private Practice at Kids Care Clinic',
      languages: ['English', 'French', 'German'],
      joinDate: '2018-03-10'
    },
    { 
      id: 4, 
      name: 'Dr. David Kim', 
      specialty: 'Orthopedics', 
      email: 'd.kim@hospital.com', 
      phone: '(555) 456-7890', 
      status: 'inactive',
      bio: 'Orthopedic surgeon specializing in sports injuries and joint replacement surgeries.',
      education: 'MD from UCLA Medical School, Fellowship in Sports Medicine',
      experience: 'Team physician for LA Lakers (2016-2020), Orthopedic Surgeon at SportsMed Center',
      languages: ['English', 'Korean', 'Japanese'],
      joinDate: '2014-11-05'
    }
  ]);

  const handleAddDoctor = (newDoctor) => {
    const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
    setDoctors([...doctors, { 
      ...newDoctor, 
      id: newId,
      languages: newDoctor.languages ? newDoctor.languages.split(',').map(lang => lang.trim()) : []
    }]);
    setIsModalOpen(false);
  };

  const handleUpdateDoctor = (updatedDoctor) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === updatedDoctor.id ? { 
        ...updatedDoctor,
        languages: updatedDoctor.languages ? updatedDoctor.languages.split(',').map(lang => lang.trim()) : []
      } : doctor
    ));
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedDoctor(null);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor({
      ...doctor,
      languages: doctor.languages ? doctor.languages.join(', ') : ''
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setIsProfileModalOpen(true);
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase() : true;
    const matchesStatus = selectedStatus ? doctor.status.toLowerCase() === selectedStatus.toLowerCase() : true;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors Management</h1>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedDoctor(null);
            setIsModalOpen(true);
          }}
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
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
            <input
              type="text"
              placeholder="Search doctors..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              <option value="Orthopedics">Orthopedics</option>
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
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200 font-medium text-gray-700">
          <div className="col-span-3">Name</div>
          <div className="col-span-2">Specialty</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="grid grid-cols-12 p-4 border-b border-gray-200 items-center hover:bg-gray-50">
              <div className="col-span-3 font-medium">{doctor.name}</div>
              <div className="col-span-2 text-gray-600">{doctor.specialty}</div>
              <div className="col-span-3">
                <div className="text-gray-600">{doctor.email}</div>
                <div className="text-sm text-gray-500">{doctor.phone}</div>
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doctor.status === 'active' ? 'bg-green-100 text-green-800' :
                  doctor.status === 'on leave' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {doctor.status}
                </span>
              </div>
              <div className="col-span-2 flex justify-end space-x-2">
                <button 
                  onClick={() => handleViewProfile(doctor)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="View Profile"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleEditDoctor(doctor)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleDeleteDoctor(doctor.id)}
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
            No doctors found matching your criteria
          </div>
        )}
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
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'specialty', label: 'Specialty', type: 'select', options: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'], required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['active', 'on leave', 'inactive'], required: true },
          { name: 'bio', label: 'Bio', type: 'textarea', required: false },
          { name: 'education', label: 'Education', type: 'textarea', required: false },
          { name: 'experience', label: 'Experience', type: 'textarea', required: false },
          { name: 'languages', label: 'Languages (comma separated)', type: 'text', required: false },
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
    </div>
  );
};

export default Doctors;