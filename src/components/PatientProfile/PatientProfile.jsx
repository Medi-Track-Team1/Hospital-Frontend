import React, { useState, useEffect } from "react";
import EditProfileModal from "./EditProfileModel";
import Header from "../Home/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Heart,
  History,
  Users,
  Edit,
  Clock,
  X,
  RefreshCw,
  MoreVertical,
  Stethoscope,
  UserCheck,
} from "lucide-react";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  localStorage.setItem('currentUser', patientId);

  const [patientData, setPatientData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState(null);

  useEffect(() => {
    if (!patientId) return;

    const currentUserStr = localStorage.getItem('currentUser');

    // Fetch patient data
    fetch(`https://patient-service-ntk0.onrender.com/api/patient/${currentUserStr}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.success && data.data) {
          setPatientData(data.data);
        } else {
          alert(data.message || "Patient data not available");
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        alert(`Failed to load patient data: ${error.message}`);
      });
  }, [patientId]);

  // Fetch appointments when appointments tab is clicked
  useEffect(() => {
    if (activeTab === 'appointments' && patientId) {
      fetchAppointments();
    }
  }, [activeTab, patientId]);

  const fetchAppointments = async () => {
    setAppointmentsLoading(true);
    setAppointmentsError(null);
    
    try {
      const response = await fetch(`https://appoitment-backend.onrender.com/api/appointments/patient/${patientId}/upcoming`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data); // Debug log
      
      // Handle different response structures
      let appointmentsArray = [];
      
      if (Array.isArray(data)) {
        // Direct array response
        appointmentsArray = data;
      } else if (data.success && Array.isArray(data.data)) {
        // Response with success wrapper
        appointmentsArray = data.data;
      } else if (data.data && Array.isArray(data.data)) {
        // Response with data wrapper but no success field
        appointmentsArray = data.data;
      } else if (typeof data === 'object' && data !== null) {
        // Single appointment object
        appointmentsArray = [data];
      }
      
      console.log("Appointments Array:", appointmentsArray); // Debug log
      
      if (appointmentsArray.length > 0) {
        // Transform the backend data to match your component's expected format
        const transformedAppointments = appointmentsArray.map(appointment => {
          console.log("Processing appointment:", appointment); // Debug log
          
          // Extract date and time from appointmentDateTime or separate fields
          let appointmentDate = appointment.appointmentDate || appointment.date;
          let appointmentTime = appointment.appointmentTime || appointment.time;
          
          // Handle appointmentDateTime field (e.g., "2025-08-20T05:30:00")
          if (appointment.appointmentDateTime && !appointmentDate) {
            const dateTime = new Date(appointment.appointmentDateTime);
            appointmentDate = dateTime.toISOString().split('T')[0]; // Get date part
            appointmentTime = dateTime.toTimeString().split(' ')[0].substring(0, 5); // Get time part HH:MM
          }
          
          return {
            id: appointment._id || appointment.id || Math.random().toString(),
            date: formatAppointmentDate(appointmentDate),
            time: formatAppointmentTime(appointmentTime),
            provider: appointment.doctorName || appointment.doctorId || appointment.provider || 'Dr. Unknown',
            department: appointment.department || appointment.specialty || 'General',
            type: appointment.reason || appointment.appointmentType || appointment.type || 'Consultation',
            status: appointment.status || 'PENDING',
            // Additional fields from your API
            duration: appointment.duration,
            symptoms: appointment.symptoms,
            additionalNotes: appointment.additionalNotes,
            emergency: appointment.emergency,
            // Include original data for reference
            originalData: appointment
          };
        });
        
        console.log("Transformed Appointments:", transformedAppointments); // Debug log
        setUpcomingAppointments(transformedAppointments);
      } else {
        console.log("No appointments found");
        setUpcomingAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointmentsError(`Failed to load appointments: ${error.message}`);
      setUpcomingAppointments([]);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // Helper function to format date from backend
  const formatAppointmentDate = (dateString) => {
    if (!dateString) return 'TBD';
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString; // Return original if can't parse
      }
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Helper function to format time from backend
  const formatAppointmentTime = (timeString) => {
    if (!timeString) return 'TBD';
    try {
      // If it's already in format like "10:30 AM", return as is
      if (timeString.includes('AM') || timeString.includes('PM')) {
        return timeString;
      }
      
      // Handle full datetime string (e.g., "2025-08-20T05:30:00")
      if (timeString.includes('T')) {
        const date = new Date(timeString);
        if (!isNaN(date.getTime())) {
          return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });
        }
      }
      
      // If it's in 24-hour format like "14:30" or "05:30"
      if (timeString.includes(':') && timeString.length <= 8) {
        const [hours, minutes] = timeString.split(':');
        const hour24 = parseInt(hours);
        if (!isNaN(hour24)) {
          const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
          const ampm = hour24 >= 12 ? 'PM' : 'AM';
          return `${hour12}:${minutes || '00'} ${ampm}`;
        }
      }
      
      return timeString; // Return original if can't parse
    } catch (error) {
      console.error("Error formatting time:", error);
      return timeString;
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(", ");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "active":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "scheduled":
        return "text-blue-600 bg-blue-100";
      case "rescheduled":
        return "text-purple-600 bg-purple-100";
      case "cancelled":
      case "canceled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const emergencyContacts = patientData?.emergencyContacts?.length
    ? patientData.emergencyContacts
    : [
        {
          name: "Emergency Contact",
          relationship: "N/A",
          phone: "N/A",
          email: "",
          address: "",
        },
      ];

  const handleSaveProfile = (updatedData) => {
    setPatientData((prev) => ({ ...prev, ...updatedData }));
    setShowEditModal(false);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = async (appointmentId, newDate, newTime) => {
    try {
      // You can implement the reschedule API call here
      // const response = await fetch(`https://appoitment-backend.onrender.com/api/appointments/${appointmentId}/reschedule`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ date: newDate, time: newTime })
      // });
      
      // For now, update locally and refetch
      setUpcomingAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? { ...a, date: newDate, time: newTime, status: "Rescheduled" }
            : a
        )
      );
      
      // Optionally refetch appointments to get updated data
      // await fetchAppointments();
      
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert("Failed to reschedule appointment. Please try again.");
    }
    
    setShowRescheduleModal(false);
    setSelectedAppointmentId(null);
  };

  const handleCancelAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async (appointmentId, reason) => {
    try {
      // Call the cancellation API - using DELETE method to match backend
      const response = await fetch(`https://appoitment-backend.onrender.com/api/appointments/cancel/${appointmentId}`, {
        method: 'DELETE', // Backend expects DELETE method
        headers: { 
          // Remove Content-Type since we're not sending a body
          // Add any authorization headers if needed
          // 'Authorization': `Bearer ${token}`
        },
        // Backend doesn't expect a request body, so remove it
      });

      if (!response.ok) {
        // For DELETE requests, response might be empty, so handle accordingly
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Response might not have JSON body for DELETE requests
          console.log("No JSON error response available");
        }
        throw new Error(errorMessage);
      }

      console.log('Cancellation successful');

      // Update local state - remove the cancelled appointment
      setUpcomingAppointments((prev) =>
        prev.filter((a) => a.id !== appointmentId)
      );

      // Show success message
      alert('Appointment cancelled successfully!');
      
      // Optionally refetch appointments to get updated data from server
      await fetchAppointments();
      
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert(`Failed to cancel appointment: ${error.message}`);
    }
    
    // Close modal and reset state
    setShowCancelModal(false);
    setSelectedAppointmentId(null);
    console.log("Appointment cancelled with reason:", reason);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'appointments', label: 'Appointments', icon: Calendar }
  ];

  const pendingAppointments = upcomingAppointments.filter(apt => apt.status.toLowerCase() === 'pending');

  const RescheduleModal = () => {
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    if (!showRescheduleModal || !selectedAppointmentId) return null;

    const selectedAppointment = upcomingAppointments.find(apt => apt.id === selectedAppointmentId);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Reschedule Appointment</h3>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold">{selectedAppointment?.type}</p>
            <p className="text-sm text-gray-600">{selectedAppointment?.provider} - {selectedAppointment?.department}</p>
            <p className="text-sm text-gray-600">Current: {selectedAppointment?.date} at {selectedAppointment?.time}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                setShowRescheduleModal(false);
                setSelectedAppointmentId(null);
                setNewDate('');
                setNewTime('');
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (newDate && newTime) {
                  const formattedDate = new Date(newDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  });
                  const formattedTime = new Date(`2000-01-01T${newTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  });
                  handleConfirmReschedule(selectedAppointmentId, formattedDate, formattedTime);
                  setNewDate('');
                  setNewTime('');
                }
              }}
              disabled={!newDate || !newTime}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CancelModal = () => {
    const [reason, setReason] = useState('');

    if (!showCancelModal || !selectedAppointmentId) return null;

    const selectedAppointment = upcomingAppointments.find(apt => apt.id === selectedAppointmentId);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Cancel Appointment</h3>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold">{selectedAppointment?.type}</p>
            <p className="text-sm text-gray-600">{selectedAppointment?.provider} - {selectedAppointment?.department}</p>
            <p className="text-sm text-gray-600">{selectedAppointment?.date} at {selectedAppointment?.time}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Cancellation</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for cancelling this appointment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                setShowCancelModal(false);
                setSelectedAppointmentId(null);
                setReason('');
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Keep Appointment
            </button>
            <button
              onClick={() => {
                if (reason.trim()) {
                  handleConfirmCancel(selectedAppointmentId, reason);
                  setReason('');
                }
              }}
              disabled={!reason.trim()}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 transition-colors"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <p className="text-lg font-medium text-gray-600">Loading patient data...</p>
        </div>
      </div>
    );
  }

  const {
    patientName = "",
    age = "",
    gender = "",
    dateOfBirth = "",
    patientId: id = patientId,
    contactNumber = "",
    patientEmail = "",
    bloodGroup = "",
    maritalStatus = "",
    city = "",
    state = "",
    zipCode = "",
    address = "",
  } = patientData;

  const addressObj = { street: address, city, state, zipCode };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-16 p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white border border-gray-200 text-gray-900 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Profile</h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span>{patientName}</span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm w-fit">{id}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
              <button
                onClick={() => navigate("/patient/history")}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-800 rounded-lg sm:rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Medical History</span>
                <span className="sm:hidden">History</span>
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white p-1 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-x-auto">
          <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">
                    {tab.id === 'overview' ? 'Info' : 'Appts'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Enhanced Patient Info Card */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl bg-blue-600 flex items-center justify-center border-2 sm:border-4 border-blue-200 shadow-xl mx-auto lg:mx-0">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-green-500 text-white rounded-full p-2 sm:p-3 shadow-lg">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center lg:text-left">{patientName}</h2>
                      <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                        <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="font-semibold">Patient ID:</span> 
                          <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-lg font-medium text-xs sm:text-sm w-fit">{id}</span>
                        </p>
                        <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          <span className="font-semibold">DOB:</span> 
                          {new Date(dateOfBirth).toLocaleDateString()} ({age} years old)
                        </p>
                        <p><span className="font-semibold">Gender:</span> {gender}</p>
                        <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                          <span className="font-semibold">Blood Type:</span> 
                          <span className="bg-red-50 text-red-700 px-2 sm:px-3 py-1 rounded-lg font-medium text-xs sm:text-sm w-fit">{bloodGroup}</span>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                      <p className="flex items-center gap-2 sm:gap-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        {contactNumber}
                      </p>
                      <p className="flex items-center gap-2 sm:gap-3 break-all">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                        {patientEmail}
                      </p>
                      <p className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        {formatAddress(addressObj)}
                      </p>
                      <p><span className="font-semibold">Marital Status:</span> {maritalStatus || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600" />
                Emergency Contacts
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3">{contact.name}</h4>
                    <div className="space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                      <p className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="font-medium">Relationship:</span> 
                        <span className="bg-cyan-100 text-cyan-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm w-fit">{contact.relationship}</span>
                      </p>
                      <p className="flex items-center gap-2 break-all">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">{contact.phone}</span>
                      </p>
                      {contact.email && (
                        <p className="flex items-center gap-2 break-all">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span>{contact.email}</span>
                        </p>
                      )}
                      {contact.address && (
                        <p className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm">{contact.address}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />
                  Upcoming Appointments
                </h3>
                <button
                  onClick={fetchAppointments}
                  disabled={appointmentsLoading}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${appointmentsLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
              
              {pendingAppointments.length > 0 && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {pendingAppointments.length} appointment{pendingAppointments.length > 1 ? 's' : ''} require{pendingAppointments.length === 1 ? 's' : ''} action
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Loading State */}
            {appointmentsLoading && (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-4 animate-spin" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">Loading Appointments...</h4>
                <p className="text-gray-600">Please wait while we fetch your appointment data.</p>
              </div>
            )}

            {/* Error State */}
            {appointmentsError && !appointmentsLoading && (
              <div className="text-center py-12">
                <X className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-red-600 mb-2">Failed to Load Appointments</h4>
                <p className="text-gray-600 mb-4">{appointmentsError}</p>
                <button
                  onClick={fetchAppointments}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Appointments List */}
            {!appointmentsLoading && !appointmentsError && (
              <div className="space-y-3 sm:space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                            <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{appointment.type}</h4>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          <div className="space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {appointment.date} at {appointment.time}
                            </p>
                            <p className="flex items-center gap-2">
                              <Stethoscope className="w-4 h-4" />
                              {appointment.provider} - {appointment.department}
                            </p>
                          </div>
                          
                          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <button
                              onClick={() => handleRescheduleAppointment(appointment.id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm"
                            >
                              <RefreshCw className="w-4 h-4" />
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium text-sm"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No Upcoming Appointments</h4>
                    <p className="text-gray-600">Contact your healthcare provider to schedule an appointment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        <EditProfileModal
          patient={patientData}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
        <RescheduleModal />
        <CancelModal />
      </div>
    </div>
  );
};

export default PatientProfile;