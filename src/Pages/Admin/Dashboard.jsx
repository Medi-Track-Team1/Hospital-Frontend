import StatsCard from '../../components/Admin/StatsCard';
import DoctorCard from '../../components/Admin/DoctorCard';
import AppointmentCard from '../../components/Admin/AppointmentCard';

const Dashboard = () => {
  const stats = [
    { title: 'Total Patients', value: '1,245', change: '+12%', trend: 'up' },
    { title: 'Total Doctors', value: '48', change: '+5%', trend: 'up' },
    { title: 'Appointments', value: '326', change: '-8%', trend: 'down' },
    { title: 'Revenue', value: '$24,560', change: '+18%', trend: 'up' },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', image: '', availability: 'Available' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', image: '', availability: 'On Leave' },
    { id: 3, name: 'Dr. Emily Wilson', specialty: 'Pediatrics', image: '', availability: 'Available' },
  ];

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', time: '11:30 AM', status: 'Pending' },
    { id: 3, patient: 'Robert Brown', doctor: 'Dr. Emily Wilson', time: '2:15 PM', status: 'Confirmed' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      {/* Doctors and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Doctors */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Top Doctors</h2>
            <button className="text-[#2563eb] hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} {...doctor} />
            ))}
          </div>
        </div>
        
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
            <button className="text-[#2563eb] hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;