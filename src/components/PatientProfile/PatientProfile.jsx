import React, { useState, useEffect } from 'react';
import EditProfileModal from './EditProfileModel'; // Make sure this component exists and works
import Header from '../Home/Header';
import { useNavigate, useParams } from 'react-router-dom';
import {
  User, Calendar, Phone, Mail, MapPin, Heart, History, Users,
  Edit, Clock, X, RefreshCw, MoreVertical, Stethoscope, UserCheck
} from 'lucide-react';

const PatientProfile = () => {
  const navigate = useNavigate();
  const { patientId } = useParams(); // Get patientId from route params

  const [patientData, setPatientData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Hardcoded upcoming appointments example
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      date: "Jan 15, 2025",
      time: "10:30 AM",
      provider: "Dr. Johnson",
      department: "Endocrinology",
      type: "Follow-up",
      status: "Confirmed"
    },
    {
      id: 2,
      date: "Feb 2, 2025",
      time: "2:15 PM",
      provider: "Dr. Wilson",
      department: "Primary Care",
      type: "Routine Check-up",
      status: "Pending"
    },
    {
      id: 3,
      date: "Feb 10, 2025",
      time: "9:00 AM",
      provider: "Dr. Smith",
      department: "Cardiology",
      type: "Consultation",
      status: "Pending"
    }
  ]);

 useEffect(() => {
  // Early return if patientId is not available
  if (!patientId) return;

  // Safely get currentUser from localStorage
  const currentUserStr = localStorage.getItem('currentUser');
  if (!currentUserStr) {
    alert("No user session found. Please log in.");
    return;
  }

  // Parse the stored user data
  let currentUser;
  try {
    currentUser = JSON.parse(currentUserStr);
  } catch (error) {
    console.error("Failed to parse user data:", error);
    alert("Invalid user data. Please log in again.");
    return;
  }

  // Verify userId exists
  if (!currentUser?.userId) {
    alert("User ID missing. Please log in again.");
    return;
  }

  // Fetch patient data
  fetch(`https://patient-service-ntk0.onrender.com/api/patient/${currentUser.userId}`)
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

  if (!patientData) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading patient data...</p>
        </div>
      </>
    );
  }
//console.log(localStorage.getItem('currentUser'));
  // Helper: Format patient address object to string
  const formatAddress = (address) => {
    if (!address) return '';
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    return parts.join(', ');
  };

  // Use real or fallback emergency contacts from patientData
  const emergencyContacts = patientData.emergencyContacts?.length > 0
    ? patientData.emergencyContacts
    : [{
      name: "Emergency Contact",
      relationship: "N/A",
      phone: "N/A",
      email: "",
      address: ""
    }];

  // Helper: Return text color classes by appointment status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'rescheduled': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Handlers
  const handleSaveProfile = (updatedData) => {
    setPatientData(prev => ({
      ...prev,
      ...updatedData
    }));
    setShowEditModal(false);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = (appointmentId, newDate, newTime) => {
    setUpcomingAppointments(prev =>
      prev.map(a =>
        a.id === appointmentId
          ? { ...a, date: newDate, time: newTime, status: "Rescheduled" }
          : a
      )
    );
    setShowRescheduleModal(false);
    setSelectedAppointmentId(null);
  };

  const handleCancelAppointment = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = (appointmentId, reason) => {
    setUpcomingAppointments(prev =>
      prev.filter(a => a.id !== appointmentId)
    );
    setShowCancelModal(false);
    setSelectedAppointmentId(null);
    console.log('Appointment cancelled with reason:', reason);
  };

  // Extract patient fields with fallback defaults
  const {
    patientName = '',
    age = '',
    gender = '',
    dateOfBirth = '',
    patientId: id = patientId,
    contactNumber = '',
    patientEmail = '',
    bloodGroup = '',
    maritalStatus = '',
    city = '',
    state = '',
    zipCode = '',
    address = ''
  } = patientData;

  const addressObj = { street: address, city, state, zipCode };

  // Modal components:

  const RescheduleModal = () => {
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    if (!showRescheduleModal || !selectedAppointmentId) return null;

    const appointment = upcomingAppointments.find(a => a.id === selectedAppointmentId);
    if (!appointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Reschedule Appointment</h3>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold">{appointment.type}</p>
            <p className="text-sm text-gray-600">{appointment.provider} - {appointment.department}</p>
            <p className="text-sm text-gray-600">Current: {appointment.date} at {appointment.time}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Date</label>
              <input
                type="date"
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Time</label>
              <input
                type="time"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (newDate && newTime) {
                  const formattedDate = new Date(newDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  const formattedTime = new Date(`2000-01-01T${newTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                  handleConfirmReschedule(selectedAppointmentId, formattedDate, formattedTime);
                  setNewDate('');
                  setNewTime('');
                }
              }}
              disabled={!newDate || !newTime}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
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

    const appointment = upcomingAppointments.find(a => a.id === selectedAppointmentId);
    if (!appointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Cancel Appointment</h3>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold">{appointment.type}</p>
            <p className="text-sm text-gray-600">{appointment.provider} - {appointment.department}</p>
            <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Cancellation</label>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Please provide a reason for cancelling this appointment..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
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
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
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
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 p-3 sm:p-6 space-y-4 sm:space-y-8">

        <div className="bg-white border border-border text-foreground p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Profile</h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span>{patientName}</span>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs sm:text-sm w-fit">{id}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => navigate('/patient/history')}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 font-medium shadow-lg"
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Medical History</span>
                <span className="sm:hidden">History</span>
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium shadow-lg"
              >
                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card p-1 sm:p-2 rounded-xl shadow-lg border border-border overflow-x-auto">
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'overview' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'appointments' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Appointments</span>
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Patient Info Card */}
            <div className="bg-card p-6 rounded-2xl shadow-xl border border-border hover:shadow-2xl transition-shadow duration-300">
              <div className="flex gap-8 items-center">
                <div className="w-32 h-32 rounded-2xl bg-primary flex items-center justify-center border-4 border-primary/20 shadow-xl">
                  <User className="w-16 h-16 text-primary-foreground" />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                    <UserCheck className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3">{patientName}</h2>
                  <p><strong>Patient ID:</strong> <span className="bg-secondary px-2 py-1 rounded-lg">{id}</span></p>
                  <p><strong>DOB:</strong> {new Date(dateOfBirth).toLocaleDateString()} ({age} years old)</p>
                  <p><strong>Gender:</strong> {gender}</p>
                  <p><strong>Blood Group:</strong> <span className="bg-red-50 text-red-700 px-2 py-1 rounded-lg">{bloodGroup}</span></p>
                  <p><strong>Phone:</strong> {contactNumber}</p>
                  <p><strong>Email:</strong> {patientEmail}</p>
                  <p><strong>Address:</strong> {formatAddress(addressObj)}</p>
                  <p><strong>Marital Status:</strong> {maritalStatus || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-7 h-7 text-cyan-600" /> Emergency Contacts
              </h3>
              <div className="space-y-6">
                {emergencyContacts.map((contact, i) => (
                  <div key={i} className="p-6 bg-secondary rounded-xl border border-border shadow hover:shadow-lg">
                    <h4 className="text-xl font-bold mb-2">{contact.name}</h4>
                    <p><strong>Relationship:</strong> {contact.relationship}</p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    {contact.email && <p><strong>Email:</strong> {contact.email}</p>}
                    {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-green-500" /> Upcoming Appointments
            </h3>

            {upcomingAppointments.length === 0 ? (
              <p>No Upcoming Appointments</p>
            ) : (
              upcomingAppointments.map(appt => (
                <div key={appt.id} className="mb-4 p-4 border border-border rounded-lg hover:shadow transition-shadow duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{appt.type}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                          {appt.status}
                        </span>
                      </div>
                      <p><Calendar className="inline w-4 h-4 mr-1 text-muted-foreground" />{appt.date} at {appt.time}</p>
                      <p><Stethoscope className="inline w-4 h-4 mr-1 text-muted-foreground" />{appt.provider} - {appt.department}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRescheduleAppointment(appt.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
                      >
                        <RefreshCw className="w-4 h-4" /> Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))
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
