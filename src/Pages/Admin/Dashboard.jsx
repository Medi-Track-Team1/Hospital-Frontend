import { useState, useEffect } from 'react';
import StatsCard from '../../components/Admin/StatsCard';
import DoctorCard from '../../components/Admin/DoctorCard';
import AppointmentCard from '../../components/Admin/AppointmentCard';
import DoctorProfileModal from '../../components/Admin/DoctorProfileModal';

const Dashboard = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [stats, setStats] = useState([
    { title: 'Total Patients', value: '1,245', change: '+12%', trend: 'up' },
    { title: 'Total Doctors', value: 'Loading...', change: '+5%', trend: 'up' },
    { title: 'Appointments', value: '326', change: '-8%', trend: 'down' },
    { title: 'Revenue', value: '$24,560', change: '+18%', trend: 'up' },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      specialty: 'Cardiology', 
      availability: 'Available',
      email: 's.johnson@hospital.com',
      phone: '(555) 123-4567',
      bio: 'Board-certified cardiologist with 10 years of experience.',
      education: 'MD from Harvard Medical School',
      experience: 'Chief of Cardiology at City Hospital',
      languages: ['English', 'Spanish'],
      status: 'active'
    },
    // ... other doctors
  ];

  const appointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', time: '10:00 AM', status: 'Confirmed' },
    // ... other appointments
  ];

  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const response = await fetch('https://doctorpanel-backend.onrender.com/api/doctor/count');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if the response has the expected data
        if (typeof data === 'number') {
          // If the API returns just a number
          updateDoctorCount(data);
        } else if (data && typeof data.count === 'number') {
          // If the API returns an object with count property
          updateDoctorCount(data.count);
        } else if (data && typeof data.total === 'number') {
          // If the API returns an object with total property
          updateDoctorCount(data.total);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        console.error('Error fetching doctor count:', err);
        setError(err.message);
        updateDoctorCount('Error');
      } finally {
        setIsLoading(false);
      }
    };

    const updateDoctorCount = (count) => {
      setStats(prevStats => {
        const newStats = [...prevStats];
        newStats[1] = { 
          ...newStats[1], 
          value: typeof count === 'number' ? count.toString() : count
        };
        return newStats;
      });
    };

    fetchDoctorCount();
  }, []);

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      {/* Display error message if there's an error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error loading doctor count: {error}
        </div>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="text-blue-500 mb-4">Loading doctor data...</div>
      )}
      
      {/* Doctors and Appointments */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        {/* Top Doctors */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Top Doctors</h2>
          </div>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id} 
                {...doctor} 
                onViewProfile={() => handleViewProfile(doctor)}
              />
            ))}
          </div>
        </div>
        
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Appointments</h2>
          </div>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
          </div>
        </div>
      </div>

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

export default Dashboard;