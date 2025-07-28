import React, { useState } from 'react';
import { Search, Filter, Edit, Eye, Trash2, Phone, Mail, MapPin, X, Save, User, Calendar, Heart } from 'lucide-react';

const mockPatients = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    phone: '+1 234-567-8900',
    email: 'john.doe@email.com',
    address: '123 Main St, City, State',
    registrationDate: '2024-01-15',
    lastVisit: '2024-07-10',
    status: 'Active',
    bloodGroup: 'A+',
    emergencyContact: '+1 234-567-8901'
  },
  {
    id: 'P002',
    name: 'Sarah Johnson',
    age: 32,
    gender: 'Female',
    phone: '+1 234-567-8902',
    email: 'sarah.j@email.com',
    address: '456 Oak Ave, City, State',
    registrationDate: '2024-02-20',
    lastVisit: '2024-07-15',
    status: 'Active',
    bloodGroup: 'B+',
    emergencyContact: '+1 234-567-8903'
  },
  {
    id: 'P003',
    name: 'Michael Chen',
    age: 28,
    gender: 'Male',
    phone: '+1 234-567-8904',
    email: 'mike.chen@email.com',
    address: '789 Pine St, City, State',
    registrationDate: '2024-03-10',
    lastVisit: '2024-07-18',
    status: 'Critical',
    bloodGroup: 'O-',
    emergencyContact: '+1 234-567-8905'
  },
  {
    id: 'P004',
    name: 'Emily Davis',
    age: 38,
    gender: 'Female',
    phone: '+1 234-567-8906',
    email: 'emily.davis@email.com',
    address: '321 Elm St, City, State',
    registrationDate: '2024-01-25',
    lastVisit: '2024-06-30',
    status: 'Inactive',
    bloodGroup: 'AB+',
    emergencyContact: '+1 234-567-8907'
  }
];

const PatientManagement = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isViewPatientOpen, setIsViewPatientOpen] = useState(false);
  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 text-white';
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'Inactive':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsViewPatientOpen(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setEditFormData({ ...patient });
    setIsEditPatientOpen(true);
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSavePatient = () => {
    if (validateForm()) {
      setPatients(patients.map(p => 
        p.id === editFormData.id ? editFormData : p
      ));
      setIsEditPatientOpen(false);
      alert('Patient information updated successfully!');
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'age', 'gender', 'phone', 'email', 'address', 'bloodGroup', 'emergencyContact', 'status'];
    for (let field of requiredFields) {
      if (!editFormData[field] || editFormData[field].toString().trim() === '') {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editFormData.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    
    // Age validation
    if (editFormData.age < 0 || editFormData.age > 150) {
      alert('Please enter a valid age between 0 and 150.');
      return false;
    }
    
    return true;
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== patientId));
      alert('Patient deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-600">Manage patient records and information</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">{patients.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {patients.filter(p => p.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">
                  {patients.filter(p => p.status === 'Critical').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-600">
                  {patients.filter(p => p.status === 'Inactive').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name, ID, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="critical">Critical</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Patient Records Table */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewPatient(patient)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Patient"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditPatient(patient)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Edit Patient"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Patient"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <User className="h-12 w-12 text-gray-300 mb-2" />
                        <p>No patients found matching your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Patient Modal */}
        {isEditPatientOpen && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Edit className="h-6 w-6" />
                  <div>
                    <h2 className="text-xl font-bold">Edit Patient Information</h2>
                    <p className="text-blue-100 text-sm">Update patient medical record</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditPatientOpen(false)}
                  className="text-white hover:bg-blue-700 rounded-lg p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Patient Header */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Patient ID: {editFormData.id}</h3>
                      <p className="text-gray-600">Edit patient information below</p>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-600" />
                        Personal Information
                      </h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={editFormData.name || ''}
                          onChange={(e) => handleEditFormChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                          <input
                            type="number"
                            value={editFormData.age || ''}
                            onChange={(e) => handleEditFormChange('age', parseInt(e.target.value) || '')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Age"
                            min="0"
                            max="150"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                          <select
                            value={editFormData.gender || ''}
                            onChange={(e) => handleEditFormChange('gender', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                        <select
                          value={editFormData.status || ''}
                          onChange={(e) => handleEditFormChange('status', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Critical">Critical</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group *</label>
                        <select
                          value={editFormData.bloodGroup || ''}
                          onChange={(e) => handleEditFormChange('bloodGroup', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-gray-600" />
                        Contact Information
                      </h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          value={editFormData.phone || ''}
                          onChange={(e) => handleEditFormChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 234-567-8900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          value={editFormData.email || ''}
                          onChange={(e) => handleEditFormChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="patient@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Home Address *</label>
                        <textarea
                          value={editFormData.address || ''}
                          onChange={(e) => handleEditFormChange('address', e.target.value)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter complete address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact *</label>
                        <input
                          type="tel"
                          value={editFormData.emergencyContact || ''}
                          onChange={(e) => handleEditFormChange('emergencyContact', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 234-567-8900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Dates */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      Medical History Dates
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Registration Date</label>
                        <input
                          type="date"
                          value={editFormData.registrationDate || ''}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                          readOnly
                        />
                        <p className="text-xs text-gray-500 mt-1">Registration date cannot be changed</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit Date</label>
                        <input
                          type="date"
                          value={editFormData.lastVisit || ''}
                          onChange={(e) => handleEditFormChange('lastVisit', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Note */}
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="text-sm text-yellow-800">
                        <span className="font-medium">Note:</span> Fields marked with * are required. Please ensure all information is accurate before saving changes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setIsEditPatientOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSavePatient}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Patient Details Modal (View) */}
        {isViewPatientOpen && selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h2 className="text-xl font-bold">Patient Medical Record</h2>
                    <p className="text-blue-100 text-sm">Electronic Health Record System</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewPatientOpen(false)}
                  className="text-white hover:bg-blue-700 rounded-lg p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Patient Header Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h3>
                        <p className="text-gray-600">Patient ID: {selectedPatient.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedPatient.status)}`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedPatient.age} years</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedPatient.gender}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Blood Type</p>
                      <p className="text-lg font-semibold text-red-600">{selectedPatient.bloodGroup}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Demographics & Contact */}
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Demographics & Contact
                      </h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Primary Phone</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedPatient.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Email Address</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedPatient.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Home Address</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedPatient.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Emergency Contact</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedPatient.emergencyContact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medical History & Dates */}
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Medical History
                      </h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Registration Date</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedPatient.registrationDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Last Visit</p>
                            <p className="text-sm font-semibold text-gray-900">{selectedPatient.lastVisit}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <Heart className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Blood Group</p>
                            <p className="text-sm font-semibold text-red-600">{selectedPatient.bloodGroup}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Print Record
                  </button>
                  <button 
                    onClick={() => {
                      setIsViewPatientOpen(false);
                      handleEditPatient(selectedPatient);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Edit Patient
                  </button>
                  <button 
                    onClick={() => setIsViewPatientOpen(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;