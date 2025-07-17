import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  Activity, 
  Thermometer, 
  Scale, 
  Pill, 
  AlertTriangle, 
  Edit, 
  CalendarPlus, 
  History, 
  Presentation as Prescription, 
  Users, 
  FileText, 
  CreditCard, 
  Filter, 
  Search, 
  X, 
  Clock, 
  Download, 
  Printer as Print, 
  Share, 
  ChevronRight, 
  TestTube, 
  Stethoscope, 
  Eye, 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  UserCheck,
  ArrowLeft
} from 'lucide-react';

const PatientProfile = ({ onBackToHome }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const patientData = {
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    dateOfBirth: "March 15, 1990",
    id: "PT-2024-001",
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Main Street, Springfield, IL 62701",
    bloodType: "A+",
    height: "5'6\"",
    weight: "135 lbs",
    bmi: "21.8",
    maritalStatus: "Married",
    occupation: "Software Engineer",
    preferredLanguage: "English",
    profileImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  };

  const insurance = {
    provider: "Blue Cross Blue Shield",
    planType: "PPO",
    policyNumber: "BC123456789",
    groupNumber: "GRP001",
    effectiveDate: "Jan 1, 2024",
    copay: {
      primaryCare: "$25",
      specialist: "$50",
      emergency: "$200"
    }
  };

  const emergencyContacts = [
    { 
      name: "Michael Johnson", 
      relationship: "Spouse", 
      phone: "(555) 234-5678",
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
      category: "visit"
    },
    {
      date: "Dec 20, 2024",
      type: "Annual Physical",
      provider: "Dr. Wilson",
      department: "Primary Care",
      description: "Complete physical examination - All systems normal",
      category: "visit"
    },
    {
      date: "Nov 20, 2024",
      type: "Follow-up Visit",
      provider: "Dr. Smith",
      department: "Cardiology",
      description: "Blood pressure check - Well controlled with current medication",
      category: "visit"
    },
    {
      date: "Oct 15, 2024",
      type: "Follow-up",
      provider: "Dr. Johnson",
      department: "Endocrinology",
      description: "Diabetes management - Metformin dosage maintained",
      category: "visit"
    },
    {
      date: "Sep 10, 2024",
      type: "Prescription",
      provider: "Dr. Smith",
      department: "Primary Care",
      description: "Vitamin D3 1000 IU prescribed for deficiency",
      category: "prescription"
    },
    {
      date: "Aug 5, 2024",
      type: "Imaging",
      provider: "Dr. Wilson",
      department: "Radiology",
      description: "Chest X-ray - Normal cardiac and pulmonary findings",
      category: "imaging"
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'lab': return TestTube;
      case 'visit': return Stethoscope;
      case 'prescription': return Pill;
      case 'imaging': return Eye;
      default: return FileText;
    }
  };

  const filteredHistory = medicalHistory.filter(item => {
    const matchesFilter = historyFilter === 'all' || item.category === historyFilter;
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">Patient Profile</h1>
              <p className="text-blue-100 text-lg">{patientData.name} - {patientData.id}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md"
            >
              <History className="w-5 h-5" />
              View Patient History
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors font-medium">
              <Edit className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Patient Info Enhanced */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex gap-8 items-start">
          <div className="relative">
            <img
              src={patientData.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{patientData.name}</h2>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">Patient ID:</span> {patientData.id}</p>
                  <p><span className="font-medium">Date of Birth:</span> {patientData.dateOfBirth} ({patientData.age} years old)</p>
                  <p><span className="font-medium">Gender:</span> {patientData.gender}</p>
                  <p><span className="font-medium">Blood Type:</span> {patientData.bloodType}</p>
                  <p><span className="font-medium">Marital Status:</span> {patientData.maritalStatus}</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {patientData.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {patientData.email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {patientData.address}
                </p>
                <p><span className="font-medium">Occupation:</span> {patientData.occupation}</p>
                <p><span className="font-medium">Language:</span> {patientData.preferredLanguage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-blue-500" />
          Insurance Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Plan Details</h4>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Provider:</span> {insurance.provider}</p>
              <p><span className="font-medium">Plan Type:</span> {insurance.planType}</p>
              <p><span className="font-medium">Policy Number:</span> {insurance.policyNumber}</p>
              <p><span className="font-medium">Group Number:</span> {insurance.groupNumber}</p>
              <p><span className="font-medium">Effective Date:</span> {insurance.effectiveDate}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Copay Information</h4>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Primary Care:</span> {insurance.copay.primaryCare}</p>
              <p><span className="font-medium">Specialist:</span> {insurance.copay.specialist}</p>
              <p><span className="font-medium">Emergency:</span> {insurance.copay.emergency}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Enhanced */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <Users className="w-6 h-6 text-cyan-600" />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyContacts.map((c, idx) => (
            <div key={idx} className="p-6 bg-cyan-50 rounded-xl border border-cyan-200 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-lg text-gray-900 mb-2">{c.name}</h4>
              <div className="space-y-1 text-gray-600">
                <p><span className="font-medium">Relationship:</span> {c.relationship}</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {c.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {c.email}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {c.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
  );
};

      

export default PatientProfile;