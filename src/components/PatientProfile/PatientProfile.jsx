import React, { useState } from 'react';
import EditProfileModal from './EditProfileModel';
import Header from '../Home/Header';

import { useNavigate } from 'react-router-dom';
import { User, Calendar, Phone, Mail, MapPin, Heart, Activity, Thermometer, Scale, Pill, Edit, History, Users, FileText, CreditCard, ArrowLeft, MoreVertical, TestTube, Stethoscope, UserCheck, Clock, X, RefreshCw } from 'lucide-react';

const PatientProfile = ({ onBackToHome }) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const [patientData, setPatientData] = useState({
    firstName: "Sarah",
    lastName: "Johnson", 
    age: 34,
    gender: "Female",
    dateOfBirth: "1990-03-15",
    id: "PT-2024-001",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    bloodType: "A+",
    height: "5'6\"",
    weight: "135 lbs",
    bmi: "21.8",
    maritalStatus: "Married",
    occupation: "Software Engineer",
    preferredLanguage: "English",
    allergies: "Penicillin, Shellfish",
    currentMedications: "Metformin 500mg, Lisinopril 10mg",
    medicalHistory: "Type 2 Diabetes, Hypertension",
    address: {
      street: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701"
    },
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Spouse",
      phone: "(555) 234-5678"
    },
    insurance: {
      provider: "Blue Cross Blue Shield",
      policyNumber: "BC123456789",
      groupNumber: "GRP001",
      planType: "PPO"
    }
  });

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

  const insurance = {
    provider: patientData.insurance.provider,
    planType: patientData.insurance.planType,
    policyNumber: patientData.insurance.policyNumber,
    groupNumber: patientData.insurance.groupNumber,
    effectiveDate: "Jan 1, 2024",
    copay: {
      primaryCare: "$25",
      specialist: "$50",
      emergency: "$200"
    }
  };

  const emergencyContacts = [
    {
      name: patientData.emergencyContact.name,
      relationship: patientData.emergencyContact.relationship,
      phone: patientData.emergencyContact.phone,
      email: "michael.johnson@email.com",
      address: "Same as patient"
    },
    {
      name: "Linda Johnson",
      relationship: "Mother",
      phone: "(555) 345-6789",
      email: "linda.johnson@email.com",
      address: "456 Oak Street, Springfield, IL 62702"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewHistory = () => {
    navigate('/patient/history');
  };

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
      prev.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, date: newDate, time: newTime, status: "Rescheduled" }
          : appointment
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
      prev.filter(appointment => appointment.id !== appointmentId)
    );
    setShowCancelModal(false);
    setSelectedAppointmentId(null);
    // Here you could also save the cancellation reason if needed
    console.log('Appointment cancelled with reason:', reason);
  };

  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  const nextAppointment = upcomingAppointments.find(apt => apt.status.toLowerCase() === 'confirmed') || upcomingAppointments[0];
  const pendingAppointments = upcomingAppointments.filter(apt => apt.status.toLowerCase() === 'pending');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'appointments', label: 'Appointments', icon: Calendar }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header Component */}
      <Header />
      <br>
      </br>
      {/* Main Content with top padding to account for fixed header */}
      <div className="pt-16 p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Simplified Header without gradient colors */}
        <div className="bg-white border border-border text-foreground p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Profile</h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span>{patientData.firstName} {patientData.lastName}</span>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <span className="bg-secondary text-secondary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm w-fit">{patientData.id}</span>
              </p>
              {/* Next Appointment Display */}
             
            </div>
            {/* Appointment Summary and Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
              {/* Appointments Summary */}
              
              <button
                onClick={handleViewHistory}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Medical History</span>
                <span className="sm:hidden">History</span>
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg sm:rounded-xl hover:bg-primary/90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Edit Profile</span>
                <span className="sm:hidden">Edit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-card p-1 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg border border-border overflow-x-auto">
          <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:bg-muted'
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
            <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-border hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl bg-primary flex items-center justify-center border-2 sm:border-4 border-primary/20 shadow-xl mx-auto lg:mx-0">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-green-500 text-white rounded-full p-2 sm:p-3 shadow-lg">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4 text-center lg:text-left">{patientData.firstName} {patientData.lastName}</h2>
                      <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                        <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="font-semibold">Patient ID:</span> 
                          <span className="bg-secondary text-secondary-foreground px-2 sm:px-3 py-1 rounded-lg font-medium text-xs sm:text-sm w-fit">{patientData.id}</span>
                        </p>
                        <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                          <span className="font-semibold">DOB:</span> 
                          {new Date(patientData.dateOfBirth).toLocaleDateString()} ({patientData.age} years old)
                        </p>
                        <p><span className="font-semibold">Gender:</span> {patientData.gender}</p>
                        <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                          <span className="font-semibold">Blood Type:</span> 
                          <span className="bg-red-50 text-red-700 px-2 sm:px-3 py-1 rounded-lg font-medium text-xs sm:text-sm w-fit">{patientData.bloodType}</span>
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                      <p className="flex items-center gap-2 sm:gap-3">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        {patientData.phone}
                      </p>
                      <p className="flex items-center gap-2 sm:gap-3 break-all">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        {patientData.email}
                      </p>
                      <p className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        {formatAddress(patientData.address)}
                      </p>
                      {/* <p><span className="font-semibold">Occupation:</span> {patientData.occupation}</p> */}
                      {/* <p><span className="font-semibold">Language:</span> {patientData.preferredLanguage}</p> */}
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        {/* <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" /> */}
                        {/* <span className="font-semibold">Medications:</span> 
                        <span className="bg-indigo-50 text-indigo-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">{patientData.currentMedications}</span> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-border">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600" />
                Emergency Contacts
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="p-4 sm:p-6 bg-secondary rounded-xl sm:rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
                    <h4 className="font-bold text-lg sm:text-xl text-foreground mb-2 sm:mb-3">{contact.name}</h4>
                    <div className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                      <p className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="font-medium">Relationship:</span> 
                        <span className="bg-cyan-100 text-cyan-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm w-fit">{contact.relationship}</span>
                      </p>
                      <p className="flex items-center gap-2 break-all">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">{contact.phone}</span>
                      </p>
                      <p className="flex items-center gap-2 break-all">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span>{contact.email}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm">{contact.address}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-card p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-border">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />
                Upcoming Appointments
              </h3>
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
            <div className="space-y-3 sm:space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 sm:p-6 border border-border rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                          <h4 className="text-lg sm:text-xl font-semibold text-foreground">{appointment.type}</h4>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="flex items-center gap-2">
                            <Stethoscope className="w-4 h-4" />
                            {appointment.provider} - {appointment.department}
                          </p>
                        </div>
                        
                        {/* Dynamic action buttons */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <button
                            onClick={() => handleRescheduleAppointment(appointment.id)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium text-sm"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-all duration-300 font-medium text-sm"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-muted rounded-lg">
                        <MoreVertical className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-muted-foreground mb-2">No Upcoming Appointments</h4>
                  <p className="text-muted-foreground">Contact your healthcare provider to schedule an appointment.</p>
                </div>
              )}
            </div>
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