import React, { useState } from 'react';
import EditProfileModal from './EditProfileModel';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Phone, Mail, MapPin, Heart, Activity, Thermometer, Scale, Pill, AlertTriangle, Edit, CalendarPlus, History, Users, FileText, CreditCard, Filter, Search, X, Clock, Download, Printer, Share, ChevronRight, TestTube, Stethoscope, Eye, Brain, Zap, TrendingUp, Shield, UserCheck, ArrowLeft, Plus, MoreVertical, BeefIcon as Pdf, Image, FileImage } from 'lucide-react';

const PatientProfile = ({ onBackToHome }) => {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
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

  const medicalHistory = [
    {
      date: "Jan 8, 2025",
      type: "Follow-up Visit",
      provider: "Dr. Johnson",
      department: "Endocrinology",
      description: "Diabetes management review - Good control maintained",
      category: "visit",
      status: "Completed"
    },
    {
      date: "Dec 20, 2024",
      type: "Annual Physical",
      provider: "Dr. Wilson",
      department: "Primary Care",
      description: "Complete physical examination - All systems normal",
      category: "visit",
      status: "Completed"
    },
    {
      date: "Nov 20, 2024",
      type: "Blood Pressure Check",
      provider: "Dr. Smith",
      department: "Cardiology",
      description: "Blood pressure well controlled with current medication",
      category: "visit",
      status: "Completed"
    },
    {
      date: "Oct 15, 2024",
      type: "HbA1c Test",
      provider: "Lab Services",
      department: "Laboratory",
      description: "HbA1c: 6.8% - Good diabetes control",
      category: "lab",
      status: "Completed"
    },
    {
      date: "Sep 10, 2024",
      type: "Vitamin D3 Prescription",
      provider: "Dr. Smith",
      department: "Primary Care",
      description: "Vitamin D3 1000 IU prescribed for deficiency",
      category: "prescription",
      status: "Active"
    },
    {
      date: "Aug 5, 2024",
      type: "Chest X-Ray",
      provider: "Radiology Dept",
      department: "Radiology",
      description: "Normal cardiac and pulmonary findings",
      category: "imaging",
      status: "Completed"
    }
  ];

  const vitalSigns = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", icon: Heart },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal", icon: Activity },
    { label: "Temperature", value: "98.6", unit: "°F", status: "normal", icon: Thermometer },
    { label: "BMI", value: patientData.bmi, unit: "", status: "normal", icon: Scale },
  ];

  const upcomingAppointments = [
    {
      date: "Jan 15, 2025",
      time: "10:30 AM",
      provider: "Dr. Johnson",
      department: "Endocrinology",
      type: "Follow-up",
      status: "Confirmed"
    },
    {
      date: "Feb 2, 2025",
      time: "2:15 PM",
      provider: "Dr. Wilson",
      department: "Primary Care",
      type: "Routine Check-up",
      status: "Pending"
    }
  ];

  const documents = [
    {
      id: 1,
      name: "Lab Results - HbA1c Test",
      type: "Lab Report",
      date: "Oct 15, 2024",
      size: "2.3 MB",
      format: "PDF",
      category: "lab",
      provider: "Lab Services",
      status: "Final"
    },
    {
      id: 2,
      name: "Chest X-Ray Images",
      type: "Medical Imaging",
      date: "Aug 5, 2024",
      size: "15.7 MB",
      format: "DICOM",
      category: "imaging",
      provider: "Radiology Dept",
      status: "Final"
    },
    {
      id: 3,
      name: "Annual Physical Report",
      type: "Medical Report",
      date: "Dec 20, 2024",
      size: "1.8 MB",
      format: "PDF",
      category: "report",
      provider: "Dr. Wilson",
      status: "Final"
    },
    {
      id: 4,
      name: "Prescription History",
      type: "Medication Record",
      date: "Jan 8, 2025",
      size: "0.9 MB",
      format: "PDF",
      category: "prescription",
      provider: "Dr. Johnson",
      status: "Current"
    },
    {
      id: 5,
      name: "Emergency Contact Form",
      type: "Administrative",
      date: "Mar 15, 2024",
      size: "0.3 MB",
      format: "PDF",
      category: "administrative",
      provider: "Patient Services",
      status: "Current"
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'lab': return TestTube;
      case 'visit': return Stethoscope;
      case 'prescription': return Pill;
      case 'imaging': return Eye;
      case 'report': return FileText;
      case 'insurance': return CreditCard;
      case 'administrative': return User;
      default: return FileText;
    }
  };

  const getDocumentIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'pdf': return FileText;
      case 'dicom': return FileImage;
      case 'jpg':
      case 'jpeg':
      case 'png': return Image;
      default: return FileText;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'final': return 'text-green-600 bg-green-100';
      case 'current': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getVitalStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'high': return 'text-red-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const filteredHistory = medicalHistory.filter(item => {
    const matchesFilter = historyFilter === 'all' || item.category === historyFilter;
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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

  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    // { id: 'documents', label: 'Documents', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6 space-y-4 sm:space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full lg:w-auto">
            <button 
              onClick={handleBackToHome}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg sm:rounded-xl hover:bg-opacity-30 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline"></span>
              <span className="sm:hidden">Back</span>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Patient Profile</h1>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span>{patientData.firstName} {patientData.lastName}</span>
                <span className="text-blue-300 hidden sm:inline">•</span>
                <span className="bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm w-fit">{patientData.id}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
            <button 
              onClick={handleViewHistory}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Medical History</span>
              <span className="sm:hidden">History</span>
            </button>
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg sm:rounded-xl hover:bg-blue-400 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-1 sm:p-2 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
        <div className="flex gap-1 sm:gap-2 min-w-max sm:min-w-0">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === 'overview' ? 'Info' : 
                   tab.id === 'appointments' ? 'Appts' : 'Docs'}
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
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 sm:border-4 border-blue-200 shadow-xl mx-auto lg:mx-0">
                  <User className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-green-500 text-white rounded-full p-2 sm:p-3 shadow-lg">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </div>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center lg:text-left">{patientData.firstName} {patientData.lastName}</h2>
                    <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="font-semibold">Patient ID:</span> 
                        <span className="bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-lg font-medium text-xs sm:text-sm w-fit">{patientData.id}</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
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
                  <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                    <p className="flex items-center gap-2 sm:gap-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                      {patientData.phone}
                    </p>
                    <p className="flex items-center gap-2 sm:gap-3 break-all">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                      {patientData.email}
                    </p>
                    <p className="flex items-start gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      {formatAddress(patientData.address)}
                    </p>
                    <p><span className="font-semibold">Occupation:</span> {patientData.occupation}</p>
                    <p><span className="font-semibold">Language:</span> {patientData.preferredLanguage}</p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                      <span className="font-semibold">Medications:</span> 
                      <span className="bg-indigo-50 text-indigo-700 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">{patientData.currentMedications}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance and Emergency Contacts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Insurance Information */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                Insurance Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-base sm:text-lg">Plan Details</h4>
                  <div className="space-y-2 sm:space-y-3 text-gray-600 text-sm sm:text-base">
                    <p className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="font-medium">Provider:</span> 
                      <span className="font-semibold">{insurance.provider}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="font-medium">Plan Type:</span> 
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs sm:text-sm w-fit">{insurance.planType}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="font-medium">Policy Number:</span> 
                      <span className="font-mono text-xs sm:text-sm">{insurance.policyNumber}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="font-medium">Group Number:</span> 
                      <span className="font-mono text-xs sm:text-sm">{insurance.groupNumber}</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="font-medium">Effective Date:</span> 
                      <span>{insurance.effectiveDate}</span>
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4 sm:pt-6">
                  <h4 className="font-semibold text-gray-700 mb-3 sm:mb-4 text-base sm:text-lg">Copay Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg sm:rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-green-600">{insurance.copay.primaryCare}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Primary Care</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg sm:rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">{insurance.copay.specialist}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Specialist</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg sm:rounded-xl">
                      <div className="text-xl sm:text-2xl font-bold text-red-600">{insurance.copay.emergency}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Emergency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-600" />
                Emergency Contacts
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="p-4 sm:p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
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
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />
              Upcoming Appointments
            </h3>
            <button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-lg sm:rounded-xl hover:bg-green-400 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Schedule New</span>
              <span className="sm:hidden">New Appointment</span>
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {upcomingAppointments.map((appointment, idx) => (
              <div key={idx} className="p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300">
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
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-purple-500" />
              Medical Documents
            </h3>
            <button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-500 text-white rounded-lg sm:rounded-xl hover:bg-purple-400 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Upload Document</span>
              <span className="sm:hidden">Upload</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {documents.map((doc) => {
              const IconComponent = getDocumentIcon(doc.format);
              return (
                <div key={doc.id} className="p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-purple-50 rounded-lg">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 truncate">{doc.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                    <p className="flex justify-between">
                      <span>Date:</span>
                      <span>{doc.date}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Size:</span>
                      <span>{doc.size}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Provider:</span>
                      <span className="truncate ml-2">{doc.provider}</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <span>Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      Download
                    </button>
                    <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Share className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal
        patient={patientData}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default PatientProfile;