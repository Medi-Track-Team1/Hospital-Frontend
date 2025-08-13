import React, { useState, useEffect } from "react";
import EditProfileModal from "./EditProfileModel";
import Header from "../Home/Header";
import { useNavigate, useParams } from "react-router-dom";
import PatientHistory from "./PatientHistory";
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
  AlertCircle,
  FileText,
} from "lucide-react";

const PatientProfile = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  localStorage.setItem('currentUser', patientId);

  const [patientData, setPatientData] = useState(null);
  const [patientLoading, setPatientLoading] = useState(true);
  const [patientError, setPatientError] = useState(null);
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

    const fetchPatientData = async () => {
      setPatientLoading(true);
      setPatientError(null);
      
      try {
        const currentUserStr = localStorage.getItem('currentUser');
        const response = await fetch(`https://patient-service-ntk0.onrender.com/api/patient/${currentUserStr}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Patient not found');
          } else if (response.status === 401) {
            throw new Error('Unauthorized access');
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        
        const data = await response.json();
        
        if (data.success && data.data) {
          setPatientData(data.data);
        } else {
          throw new Error(data.message || "Patient data not available");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setPatientError(error.message);
      } finally {
        setPatientLoading(false);
      }
    };

    fetchPatientData();
  }, [patientId]);

  // Fetch appointments when appointments tab is clicked
  useEffect(() => {
    if (activeTab === 'appointments' && patientId && patientData) {
      fetchAppointments();
    }
  }, [activeTab, patientId, patientData]);

  // Helper function to format date from backend
  const formatAppointmentDate = (dateInput) => {
    if (!dateInput) return 'TBD';
    
    try {
      let date;
      
      // Handle array format [year, month, day, hour, minute]
      if (Array.isArray(dateInput) && dateInput.length >= 3) {
        // Month in array is 1-based, but Date constructor expects 0-based
        date = new Date(dateInput[0], dateInput[1] - 1, dateInput[2]);
      }
      // Handle string format
      else if (typeof dateInput === 'string') {
        date = new Date(dateInput);
      }
      // Handle direct date object
      else if (dateInput instanceof Date) {
        date = dateInput;
      }
      else {
        return dateInput.toString(); // Return original if can't parse
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateInput.toString(); // Return original if can't parse
      }
      
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateInput ? dateInput.toString() : 'TBD';
    }
  };

  // Helper function to format time from backend
  const formatAppointmentTime = (timeInput, dateTimeArray) => {
    if (!timeInput && !dateTimeArray) return 'TBD';
    
    try {
      // If we have a dateTimeArray, use the hour and minute from it
      if (Array.isArray(dateTimeArray) && dateTimeArray.length >= 5) {
        const hour = dateTimeArray[3];
        const minute = dateTimeArray[4];
        
        const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedMinute = minute.toString().padStart(2, '0');
        
        return `${hour12}:${formattedMinute} ${ampm}`;
      }
      
      // Handle string input
      if (typeof timeInput === 'string') {
        // If it's already in format like "10:30 AM", return as is
        if (timeInput.includes('AM') || timeInput.includes('PM')) {
          return timeInput;
        }
        
        // Handle full datetime string (e.g., "2025-08-20T05:30:00")
        if (timeInput.includes('T')) {
          const date = new Date(timeInput);
          if (!isNaN(date.getTime())) {
            return date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            });
          }
        }
        
        // If it's in 24-hour format like "14:30" or "05:30"
        if (timeInput.includes(':') && timeInput.length <= 8) {
          const [hours, minutes] = timeInput.split(':');
          const hour24 = parseInt(hours);
          if (!isNaN(hour24)) {
            const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
            const ampm = hour24 >= 12 ? 'PM' : 'AM';
            return `${hour12}:${minutes || '00'} ${ampm}`;
          }
        }
      }
      
      return timeInput ? timeInput.toString() : 'TBD';
    } catch (error) {
      console.error("Error formatting time:", error);
      return timeInput ? timeInput.toString() : 'TBD';
    }
  };

  const fetchAppointments = async () => {
    setAppointmentsLoading(true);
    setAppointmentsError(null);
    
    try {
      // FIXED: Use consistent domain name
      const response = await fetch(`https://appoitment-backend.onrender.com/api/appointments/patient/${patientId}/upcoming`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      });
      
      console.log('Fetch appointments response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 404) {
          // No appointments found - this is not an error, just empty state
          setUpcomingAppointments([]);
          return;
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      // Handle different response structures
      let appointmentsArray = [];
      
      if (Array.isArray(data)) {
        appointmentsArray = data;
      } else if (data.success && Array.isArray(data.data)) {
        appointmentsArray = data.data;
      } else if (data.data && Array.isArray(data.data)) {
        appointmentsArray = data.data;
      } else if (typeof data === 'object' && data !== null) {
        appointmentsArray = [data];
      }
      
      console.log("Appointments Array:", appointmentsArray);
      
      if (appointmentsArray.length > 0) {
        // Transform and filter out cancelled appointments for upcoming view
        const transformedAppointments = appointmentsArray
          .filter(appointment => appointment.status !== 'CANCELLED')
          .map(appointment => {
            console.log("Processing appointment:", appointment);
            
            let appointmentDate, appointmentTime;
            
            // Handle different date/time formats from API
            if (appointment.appointmentDateTime) {
              if (Array.isArray(appointment.appointmentDateTime)) {
                // Handle array format [year, month, day, hour, minute]
                appointmentDate = appointment.appointmentDateTime;
                appointmentTime = appointment.appointmentDateTime;
              } else {
                // Handle string format
                const dateTime = new Date(appointment.appointmentDateTime);
                appointmentDate = dateTime.toISOString().split('T')[0];
                appointmentTime = dateTime.toTimeString().split(' ')[0].substring(0, 5);
              }
            } else {
              // Fallback to separate date/time fields
              appointmentDate = appointment.appointmentDate || appointment.date;
              appointmentTime = appointment.appointmentTime || appointment.time;
            }
            
            return {
              id: appointment._id || appointment.id || Math.random().toString(),
              appointmentId: appointment.appointmentId,
              date: formatAppointmentDate(appointmentDate),
              time: formatAppointmentTime(appointmentTime, Array.isArray(appointment.appointmentDateTime) ? appointment.appointmentDateTime : null),
              provider: appointment.doctorName || appointment.doctorId || appointment.provider || 'Dr. Unknown',
              department: appointment.department || appointment.specialty || 'General',
              type: appointment.reason || appointment.appointmentType || appointment.type || 'Consultation',
              status: appointment.status || 'PENDING',
              duration: appointment.duration,
              symptoms: appointment.symptoms,
              additionalNotes: appointment.additionalNotes,
              emergency: appointment.emergency,
              originalData: appointment
            };
          });
        
        console.log("Transformed Appointments:", transformedAppointments);
        setUpcomingAppointments(transformedAppointments);
      } else {
        console.log("No appointments found");
        setUpcomingAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointmentsError(error.message);
      setUpcomingAppointments([]);
    } finally {
      setAppointmentsLoading(false);
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

  const handleSaveProfile = (updatedData) => {
    setPatientData((prev) => ({ ...prev, ...updatedData }));
    setShowEditModal(false);
  };

  // Updated Medical History navigation handler
  const handleMedicalHistoryClick = () => {
    // Navigate to patient history page with patientId
    navigate(`/patient/${patientId}/history`);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowRescheduleModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelModal(true);
  };

  const handleConfirmReschedule = async (appointmentId, newDate, newTime) => {
    console.log(`Attempting to reschedule appointment: ${appointmentId} to ${newDate} ${newTime}`);
    
    try {
      // Find the appointment to get the correct appointmentId format
      const selectedAppointment = upcomingAppointments.find(apt => apt.id === appointmentId);
      
      // Use the formatted appointmentId (APP-XXXX) instead of MongoDB _id
      const apiAppointmentId = selectedAppointment?.appointmentId || appointmentId;
      
      console.log('Using appointment ID for API:', apiAppointmentId);
      
      // Convert date and time to LocalDateTime format expected by backend
      const dateTimeString = `${newDate}T${newTime}:00`; // Format: 2025-08-20T14:30:00
      console.log('DateTime string:', dateTimeString);
      
      const url = `https://appoitment-backend.onrender.com/api/appointments/${apiAppointmentId}/reschedule?newDateTime=${encodeURIComponent(dateTimeString)}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        let errorMessage = `Failed to reschedule appointment (Status: ${response.status})`;
        
        try {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (jsonError) {
              errorMessage = errorText || errorMessage;
            }
          }
        } catch (textError) {
          console.log('Could not read error response');
        }
        
        throw new Error(errorMessage);
      }

      const updatedAppointment = await response.json();
      console.log('Reschedule successful:', updatedAppointment);

      // Update local state with the response from backend
      setUpcomingAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? {
                ...a,
                // Handle both array and string formats for appointmentDateTime
                date: Array.isArray(updatedAppointment.appointmentDateTime) 
                  ? formatAppointmentDate(updatedAppointment.appointmentDateTime)
                  : formatAppointmentDate(updatedAppointment.appointmentDateTime),
                time: Array.isArray(updatedAppointment.appointmentDateTime)
                  ? formatAppointmentTime(null, updatedAppointment.appointmentDateTime)
                  : formatAppointmentTime(updatedAppointment.appointmentDateTime),
                status: updatedAppointment.status || "RESCHEDULED"
              }
            : a
        )
      );

      // Show success message
      alert('Appointment rescheduled successfully! A confirmation email has been sent.');
      
      // Refetch appointments to get updated data from server
      await fetchAppointments();
      
    } catch (error) {
      console.error("Full error details:", error);
      
      // Handle different types of errors
      let userMessage = 'Failed to reschedule appointment';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        userMessage = 'Network error: Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error.message.includes('CORS')) {
        userMessage = 'Server configuration error. Please contact support.';
      } else if (error.message) {
        userMessage = `Failed to reschedule appointment: ${error.message}`;
      }
      
      alert(userMessage);
      
      // Don't close modal on error so user can try again
      return;
    }
    
    // Close modal and reset state only on success
    setShowRescheduleModal(false);
    setSelectedAppointmentId(null);
  };

  const handleConfirmCancel = async (appointmentId, reason) => {
    console.log(`Attempting to cancel appointment: ${appointmentId}`);
    
    try {
      // Find the appointment to get the correct appointmentId format
      const selectedAppointment = upcomingAppointments.find(apt => apt.id === appointmentId);
      
      // Use the formatted appointmentId (APP-XXXX) instead of MongoDB _id
      const apiAppointmentId = selectedAppointment?.appointmentId || appointmentId;
      
      console.log('Using appointment ID for API:', apiAppointmentId);
      
      const url = `https://appoitment-backend.onrender.com/api/appointments/cancel/${apiAppointmentId}`;
      console.log('Request URL:', url);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          cancellationReason: reason || 'No reason provided',
          status: 'CANCELLED'
        }),
        mode: 'cors',
        credentials: 'omit'
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        console.log('Cancellation successful - Response OK');
        
        // Parse the response to get updated appointment data
        let updatedAppointment = null;
        try {
          const responseData = await response.json();
          updatedAppointment = responseData;
          console.log('Updated appointment data:', updatedAppointment);
        } catch (parseError) {
          console.log('No JSON response body or parsing failed:', parseError.message);
        }

        // Update local state - remove the appointment from upcoming list
        setUpcomingAppointments((prev) =>
          prev.filter(a => a.id !== appointmentId)
        );

        // Show success message
        alert('Appointment cancelled successfully! A cancellation email has been sent.');
        
        // Refetch appointments to get updated data from server
        await fetchAppointments();
        
      } else {
        // Handle error responses
        let errorMessage = `Failed to cancel appointment (Status: ${response.status})`;
        
        try {
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          
          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (jsonError) {
              errorMessage = errorText || errorMessage;
            }
          }
        } catch (textError) {
          console.log('Could not read error response');
        }
        
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Full error details:", error);
      
      // Handle different types of errors
      let userMessage = 'Failed to cancel appointment';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        userMessage = 'Network error: Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error.message.includes('CORS')) {
        userMessage = 'Server configuration error. Please contact support.';
      } else if (error.message) {
        userMessage = `Failed to cancel appointment: ${error.message}`;
      }
      
      alert(userMessage);
      
      // Don't close modal on error so user can try again
      return;
    }
    
    // Close modal and reset state only on success
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
            <p className="text-xs text-gray-500 font-mono">ID: {selectedAppointment?.appointmentId || selectedAppointment?.id}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
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
                  handleConfirmReschedule(selectedAppointmentId, newDate, newTime);
                  setNewDate('');
                  setNewTime('');
                }
              }}
              disabled={!newDate || !newTime}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
            >
              Confirm Reschedule
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
            <p className="text-xs text-gray-500 font-mono">ID: {selectedAppointment?.appointmentId || selectedAppointment?.id}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Cancellation <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a reason for cancelling this appointment (optional)..."
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
                handleConfirmCancel(selectedAppointmentId, reason || 'No reason provided');
                setReason('');
              }}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state for patient data
  if (patientLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-4 animate-spin" />
            <p className="text-lg font-medium text-gray-600">Loading patient data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state for patient data
  if (patientError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 text-center">
              <div className="mb-6">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-600 mb-2">Patient Not Found</h2>
                <p className="text-gray-600 mb-6">
                  {patientError === 'Patient not found' 
                    ? `No patient found with ID: ${patientId}`
                    : `Error loading patient data: ${patientError}`
                  }
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Go to Home
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                onClick={handleMedicalHistoryClick}
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

            {/* Appointments List or Empty State */}
            {!appointmentsLoading && !appointmentsError && (
              <div className="space-y-3 sm:space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {/* Appointment Header with ID */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{appointment.type}</h4>
                              <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-mono w-fit">
                                ID: {appointment.appointmentId || appointment.id}
                              </span>
                            </div>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </div>
                          
                          {/* Appointment Details */}
                          <div className="space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {appointment.date} at {appointment.time}
                            </p>
                            <p className="flex items-center gap-2">
                              <Stethoscope className="w-4 h-4" />
                              {appointment.provider} - {appointment.department}
                            </p>
                            {/* Additional appointment details if available */}
                            {appointment.duration && (
                              <p className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Duration: {appointment.duration} minutes
                              </p>
                            )}
                            {appointment.symptoms && (
                              <p className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5" />
                                <span><strong>Symptoms:</strong> {appointment.symptoms}</span>
                              </p>
                            )}
                            {appointment.additionalNotes && (
                              <p className="flex items-start gap-2">
                                <FileText className="w-4 h-4 mt-0.5" />
                                <span><strong>Notes:</strong> {appointment.additionalNotes}</span>
                              </p>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
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
                    <p className="text-gray-600">You don't have any scheduled appointments for patient ID: {patientId}</p>
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