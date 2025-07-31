import { useState, useEffect } from 'react';
import { 
  HiUserCircle, HiPhone, HiMail, HiHome, HiClipboardList, HiShieldExclamation,
  HiUser, HiCalendar, HiHeart, HiSearch, HiTrash, HiPencil, HiEye
} from 'react-icons/hi';
import PatientCard from '../../components/Admin/PatientCard';
import FormModal from '../../components/Admin/FormModal';
import PatientProfileModal from '../../components/Admin/PatientProfileModal';
import DeleteConfirmationModal from '../../components/Admin/DeleteConfirmationModal';

const Patients = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const [patients, setPatients] = useState([]);

  // 🔄 Fetch patients from API when component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients'); // 🔁 Replace with your real API URL
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
    setIsProfileModalOpen(true);
  };

  const handleDeletePatient = (id) => {
    const patient = patients.find(p => p.id === id);
    setPatientToDelete(patient);
    setDeleteModalOpen(true);
  };

  const confirmDeletePatient = async () => {
    try {
      await fetch(`/api/patients/${patientToDelete.id}`, {
        method: 'DELETE'
      });

      setPatients(patients.filter(patient => patient.id !== patientToDelete.id));
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }

    setDeleteModalOpen(false);
    setPatientToDelete(null);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.assignedDoctor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = selectedGender ? patient.gender?.toLowerCase() === selectedGender.toLowerCase() : true;
    const matchesBloodType = selectedBloodType ? patient.bloodType?.toLowerCase() === selectedBloodType.toLowerCase() : true;
    
    return matchesSearch && matchesGender && matchesBloodType;
  });

  return (
    <div className="p-4 md:p-6">
      {/* TITLE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Patients Management</h1>
      </div>

      {/* SEARCH & FILTER UI - same as before */}
      {/* ... keep your existing search and filters here ... */}

      {/* MOBILE VIEW */}
      {/* ... keep your mobile layout exactly the same ... */}

      {/* DESKTOP TABLE VIEW */}
      {/* ... same as your original, just reading from dynamic `patients` now ... */}

      {/* MODALS */}
      {selectedPatient && (
        <PatientProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          patient={selectedPatient}
        />
      )}
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
