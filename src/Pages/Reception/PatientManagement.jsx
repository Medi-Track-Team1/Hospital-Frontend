import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Eye, Trash2, Phone, Mail, MapPin, X, Save, User, Calendar, Heart, Plus, Loader2, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isViewPatientOpen, setIsViewPatientOpen] = useState(false);
  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API base URL - adjust this to match your backend server
  const API_BASE_URL = 'http://localhost:8080/api/patient';

  // Fetch all patients from API
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/get`);
      const data = await response.json();
      
      if (data.success) {
        // Transform backend data to match frontend format
        const transformedPatients = data.data.map(patient => ({
          id: patient.patientId,
          name: patient.patientName,
          age: patient.age,
          gender: patient.gender,
          phone: patient.emergencyContacts?.[0]?.phoneNumber || 'N/A',
          email: patient.emergencyContacts?.[0]?.email || 'N/A',
          address: `${patient.address}, ${patient.city}, ${patient.state} ${patient.zipCode}`,
          registrationDate: patient.createdAt ? new Date(patient.createdAt).toISOString().split('T')[0] : 'N/A',
          lastVisit: patient.updatedAt ? new Date(patient.updatedAt).toISOString().split('T')[0] : 'N/A',
          status: 'Active', // You might want to add a status field to your backend model
          bloodGroup: patient.bloodGroup,
          emergencyContact: patient.emergencyContacts?.[0]?.phoneNumber || 'N/A',
          maritalStatus: patient.maritalStatus,
          city: patient.city,
          state: patient.state,
          zipCode: patient.zipCode,
          rawAddress: patient.address,
          emergencyContacts: patient.emergencyContacts || []
        }));
        setPatients(transformedPatients);
      } else {
        setError('Failed to fetch patients');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  // Load patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);

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
    setEditFormData({
      patientId: patient.id,
      patientName: patient.name,
      age: patient.age,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
      maritalStatus: patient.maritalStatus || '',
      city: patient.city || '',
      state: patient.state || '',
      zipCode: patient.zipCode || '',
      address: patient.rawAddress || '',
      emergencyContacts: patient.emergencyContacts.length > 0 
        ? patient.emergencyContacts.map(contact => ({
            phoneNumber: contact.phoneNumber || '',
            email: contact.email || '',
            name: contact.name || '',
            relation: contact.relation || ''
          }))
        : [{ phoneNumber: '', email: '', name: '', relation: '' }]
    });
    setIsEditPatientOpen(true);
    setSubmitStatus(null);
  };

  const handleAddPatient = () => {
    setEditFormData({
      patientName: '',
      age: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: '',
      city: '',
      state: '',
      zipCode: '',
      address: '',
      emergencyContacts: [{ phoneNumber: '', email: '', name: '', relation: '' }]
    });
    setIsAddPatientOpen(true);
    setSubmitStatus(null);
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear any previous status when user starts typing
    if (submitStatus) setSubmitStatus(null);
  };

  const handleEmergencyContactChange = (index, field, value) => {
    setEditFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
    if (submitStatus) setSubmitStatus(null);
  };

  const addEmergencyContact = () => {
    setEditFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { phoneNumber: '', email: '', name: '', relation: '' }]
    }));
  };

  const removeEmergencyContact = (index) => {
    if (editFormData.emergencyContacts.length > 1) {
      setEditFormData(prev => ({
        ...prev,
        emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
      }));
    }
  };

  const clearForm = () => {
    setEditFormData({
      patientName: '',
      age: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: '',
      city: '',
      state: '',
      zipCode: '',
      address: '',
      emergencyContacts: [{ phoneNumber: '', email: '', name: '', relation: '' }]
    });
    setSubmitStatus(null);
  };

  const validateForm = () => {
    const requiredFields = ['patientName', 'age', 'gender', 'bloodGroup', 'city', 'state', 'zipCode', 'address'];
    for (let field of requiredFields) {
      if (!editFormData[field] || editFormData[field].toString().trim() === '') {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }
    
    // Age validation
    if (editFormData.age < 0 || editFormData.age > 150) {
      alert('Please enter a valid age between 0 and 150.');
      return false;
    }

    // Emergency contact validation - ensure at least one contact has phone number
    const hasValidContact = editFormData.emergencyContacts.some(contact => 
      contact.phoneNumber && contact.phoneNumber.trim() !== ''
    );
    
    if (!hasValidContact) {
      alert('Please provide at least one emergency contact with a phone number.');
      return false;
    }

    // Email validation for emergency contacts
    for (let contact of editFormData.emergencyContacts) {
      if (contact.email && contact.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
          alert('Please enter a valid email address for emergency contact.');
          return false;
        }
      }
    }
    
    return true;
  };

  const handleSavePatient = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      // Clean up emergency contacts - remove empty ones and ensure proper structure
      const cleanedEmergencyContacts = editFormData.emergencyContacts
        .filter(contact => 
          // Keep contacts that have at least a phone number or email
          (contact.phoneNumber && contact.phoneNumber.trim() !== '') || 
          (contact.email && contact.email.trim() !== '')
        )
        .map(contact => {
          const cleanedContact = {
            name: contact.name?.trim() || '',
            relation: contact.relation?.trim() || '',
            email: contact.email?.trim() || ''
          };
          
          // Backend expects 'phone' field, not 'phoneNumber'
          if (contact.phoneNumber && contact.phoneNumber.trim() !== '') {
            cleanedContact.phone = contact.phoneNumber.trim();
          }
          
          return cleanedContact;
        });

      // Prepare the data to send to backend
      const dataToSend = {
        ...editFormData,
        emergencyContacts: cleanedEmergencyContacts,
        // Ensure numeric fields are properly formatted
        age: parseInt(editFormData.age) || 0,
        // Trim string fields
        patientName: editFormData.patientName?.trim(),
        address: editFormData.address?.trim(),
        city: editFormData.city?.trim(),
        state: editFormData.state?.trim(),
        zipCode: editFormData.zipCode?.trim(),
        maritalStatus: editFormData.maritalStatus?.trim()
      };

      console.log('Sending data to backend:', dataToSend);
      
      const url = isAddPatientOpen 
        ? `${API_BASE_URL}/registration`
        : `${API_BASE_URL}/update/${editFormData.patientId}`;
      
      const method = isAddPatientOpen ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();
      console.log('Backend response:', data); // Debug log
      
      if (data.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          setIsEditPatientOpen(false);
          setIsAddPatientOpen(false);
          fetchPatients(); // Refresh the patient list
        }, 1500);
      } else {
        setSubmitStatus('error');
        alert(`Operation failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error saving patient:', error);
      setSubmitStatus('error');
      alert('Error saving patient information');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/delete/${patientId}`, {
          method: 'DELETE'
        });

        const data = await response.json();
        
        if (data.success) {
          alert('Patient deleted successfully');
          await fetchPatients(); // Refresh the patient list
        } else {
          alert(`Delete failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Error deleting patient');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = async (searchValue) => {
    if (searchValue.trim() === '') {
      fetchPatients();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/search?name=${encodeURIComponent(searchValue)}`);
      const data = await response.json();
      
      if (data.success) {
        const transformedPatients = data.data.map(patient => ({
          id: patient.patientId,
          name: patient.patientName,
          age: patient.age,
          gender: patient.gender,
          phone: patient.emergencyContacts?.[0]?.phoneNumber || 'N/A',
          email: patient.emergencyContacts?.[0]?.email || 'N/A',
          address: `${patient.address}, ${patient.city}, ${patient.state} ${patient.zipCode}`,
          registrationDate: patient.createdAt ? new Date(patient.createdAt).toISOString().split('T')[0] : 'N/A',
          lastVisit: patient.updatedAt ? new Date(patient.updatedAt).toISOString().split('T')[0] : 'N/A',
          status: 'Active',
          bloodGroup: patient.bloodGroup,
          emergencyContact: patient.emergencyContacts?.[0]?.phoneNumber || 'N/A',
          maritalStatus: patient.maritalStatus,
          city: patient.city,
          state: patient.state,
          zipCode: patient.zipCode,
          rawAddress: patient.address,
          emergencyContacts: patient.emergencyContacts || []
        }));
        setPatients(transformedPatients);
      }
    } catch (error) {
      console.error('Error searching patients:', error);
      setError('Error searching patients');
    } finally {
      setLoading(false);
    }
  };

  if (loading && patients.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchPatients}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
            <p className="text-gray-600">Manage patient records and information</p>
          </div>
          <button
            onClick={handleAddPatient}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Patient
          </button>
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
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

        {/* Edit/Add Patient Modal */}
        {(isEditPatientOpen || isAddPatientOpen) && editFormData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {isAddPatientOpen ? <Plus className="h-6 w-6" /> : <Edit className="h-6 w-6" />}
                  <div>
                    <h2 className="text-xl font-bold">
                      {isAddPatientOpen ? 'Add New Patient' : 'Edit Patient Information'}
                    </h2>
                    <p className="text-blue-100 text-sm">
                      {isAddPatientOpen ? 'Register a new patient' : 'Update patient medical record'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsEditPatientOpen(false);
                    setIsAddPatientOpen(false);
                    setSubmitStatus(null);
                  }}
                  className="text-white hover:bg-blue-700 rounded-lg p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {/* Success/Error Status */}
                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {submitStatus === 'success' 
                        ? (isAddPatientOpen ? 'Patient registered successfully!' : 'Patient information updated successfully!')
                        : 'There was an error processing your request. Please try again.'
                      }
                    </span>
                  </div>
                )}

                {/* Patient Header */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {isAddPatientOpen ? 'New Patient Registration' : `Patient ID: ${editFormData.patientId}`}
                      </h3>
                      <p className="text-gray-600">
                        {isAddPatientOpen ? 'Fill in patient information below' : 'Edit patient information below'}
                      </p>
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
                          value={editFormData.patientName || ''}
                          onChange={(e) => handleEditFormChange('patientName', e.target.value)}
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
                      <div className="grid grid-cols-2 gap-4">
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
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                          <select
                            value={editFormData.maritalStatus || ''}
                            onChange={(e) => handleEditFormChange('maritalStatus', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-600" />
                        Address Information
                      </h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <textarea
                          value={editFormData.address || ''}
                          onChange={(e) => handleEditFormChange('address', e.target.value)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter complete address"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input
                            type="text"
                            value={editFormData.city || ''}
                            onChange={(e) => handleEditFormChange('city', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <input
                            type="text"
                            value={editFormData.state || ''}
                            onChange={(e) => handleEditFormChange('state', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="State"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                        <input
                          type="text"
                          value={editFormData.zipCode || ''}
                          onChange={(e) => handleEditFormChange('zipCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="ZIP Code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Phone className="h-5 w-5 text-gray-600" />
                      Emergency Contacts
                      <span className="text-sm font-normal text-gray-500">(At least one phone number required)</span>
                    </h4>
                    <button
                      type="button"
                      onClick={addEmergencyContact}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Add Contact
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    {editFormData.emergencyContacts?.map((contact, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="text-sm font-medium text-gray-700">Contact {index + 1}</h5>
                          {editFormData.emergencyContacts.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeEmergencyContact(index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                            <input
                              type="text"
                              value={contact.name || ''}
                              onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                            <select
                              value={contact.relation || ''}
                              onChange={(e) => handleEmergencyContactChange(index, 'relation', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select Relation</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Parent">Parent</option>
                              <option value="Child">Child</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Friend">Friend</option>
                              <option value="Guardian">Guardian</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number *
                              {index === 0 && <span className="text-red-500"> (Required)</span>}
                            </label>
                            <input
                              type="tel"
                              value={contact.phoneNumber || ''}
                              onChange={(e) => handleEmergencyContactChange(index, 'phoneNumber', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="+1 234-567-8900"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              value={contact.email || ''}
                              onChange={(e) => handleEmergencyContactChange(index, 'email', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="contact@email.com"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
                        <span className="font-medium">Note:</span> Fields marked with * are required. At least one emergency contact with a phone number must be provided. Please ensure all information is accurate before saving changes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        setIsEditPatientOpen(false);
                        setIsAddPatientOpen(false);
                        setSubmitStatus(null);
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    {isAddPatientOpen && (
                      <button 
                        onClick={clearForm}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Clear Form
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={handleSavePatient}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {isAddPatientOpen ? 'Registering...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {isAddPatientOpen ? 'Register Patient' : 'Save Changes'}
                      </>
                    )}
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
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
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Marital Status</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedPatient.maritalStatus || 'N/A'}</p>
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
                        Contact Information
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
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contacts */}
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-gray-600" />
                        Emergency Contacts
                      </h4>
                    </div>
                    <div className="p-4 space-y-3">
                      {selectedPatient.emergencyContacts && selectedPatient.emergencyContacts.length > 0 ? (
                        selectedPatient.emergencyContacts.map((contact, index) => (
                          <div key={index} className="border-l-4 border-red-500 pl-4">
                            <div className="mb-2">
                              <p className="text-xs font-medium text-gray-500 uppercase">Contact {index + 1}</p>
                              {contact.name && (
                                <p className="text-sm font-semibold text-gray-900">{contact.name}</p>
                              )}
                              {contact.relation && (
                                <p className="text-xs text-gray-500">({contact.relation})</p>
                              )}
                            </div>
                            {contact.phoneNumber && (
                              <div className="flex items-center gap-2 mb-1">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <p className="text-sm text-gray-900">{contact.phoneNumber}</p>
                              </div>
                            )}
                            {contact.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <p className="text-sm text-gray-900">{contact.email}</p>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">No emergency contacts available</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical History & Dates */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      Medical History
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-xl">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Processing...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;