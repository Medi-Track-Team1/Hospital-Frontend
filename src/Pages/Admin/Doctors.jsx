import { useState } from 'react';
import DoctorCard from '../../components/Admin/DoctorCard';
import FormModal from '../../components/Admin/FormModal';

const Doctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', email: 's.johnson@hospital.com', phone: '(555) 123-4567', status: 'active' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', email: 'm.chen@hospital.com', phone: '(555) 234-5678', status: 'on leave' },
    { id: 3, name: 'Dr. Emily Wilson', specialty: 'Pediatrics', email: 'e.wilson@hospital.com', phone: '(555) 345-6789', status: 'active' },
    { id: 4, name: 'Dr. David Kim', specialty: 'Orthopedics', email: 'd.kim@hospital.com', phone: '(555) 456-7890', status: 'inactive' },
  ]);

  const handleAddDoctor = (newDoctor) => {
    setDoctors([...doctors, { ...newDoctor, id: doctors.length + 1 }]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
              <option value="">All Specialties</option>
              <option value="cardiology">Cardiology</option>
              <option value="neurology">Neurology</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="orthopedics">Orthopedics</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
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
        {doctors.map((doctor) => (
          <div key={doctor.id} className="grid grid-cols-12 p-4 border-b border-gray-200 items-center">
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
              <button className="p-1 text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button className="p-1 text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button className="p-1 text-red-600 hover:text-red-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Doctor Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDoctor}
        title="Add New Doctor"
        fields={[
          { name: 'name', label: 'Full Name', type: 'text', required: true },
          { name: 'specialty', label: 'Specialty', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          { name: 'phone', label: 'Phone', type: 'tel', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['active', 'on leave', 'inactive'], required: true },
        ]}
      />
    </div>
  );
};

export default Doctors;