import { useState } from 'react';
import AppointmentCard from '../../components/Admin/AppointmentCard';
import FormModal from '../../components/Admin/FormModal';

const Appointments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', time: '10:00 AM', date: '2023-07-20', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', time: '11:30 AM', date: '2023-07-20', status: 'Pending' },
    { id: 3, patient: 'Robert Brown', doctor: 'Dr. Emily Wilson', time: '2:15 PM', date: '2023-07-20', status: 'Confirmed' },
    { id: 4, patient: 'Emily Davis', doctor: 'Dr. David Kim', time: '4:45 PM', date: '2023-07-21', status: 'Pending' },
  ]);

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Appointment
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search appointments..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
              <option value="">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} {...appointment} />
        ))}
      </div>

      {/* Add Appointment Modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAppointment}
        title="Schedule New Appointment"
        fields={[
          { name: 'patient', label: 'Patient Name', type: 'text', required: true },
          { name: 'doctor', label: 'Doctor', type: 'select', options: ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Wilson', 'Dr. David Kim'], required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'time', label: 'Time', type: 'time', required: true },
          { name: 'status', label: 'Status', type: 'select', options: ['Confirmed', 'Pending'], required: true },
        ]}
      />
    </div>
  );
};

export default Appointments;